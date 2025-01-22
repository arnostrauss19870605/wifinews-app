import { revalidatePath } from 'next/cache';
import { type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

interface WebhookPayload {
  _type: string;
  slug?: { current: string };
  // Add other properties as necessary
}

export async function POST(req: NextRequest) {
  try {
    console.log('Webhook received at:', new Date().toISOString());

    const { isValidSignature, body } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    if (!isValidSignature) {
      return new Response(JSON.stringify({ message: 'Invalid signature' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!body?._type) {
      return new Response(
        JSON.stringify({ message: 'Bad Request: Missing _type in body' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Revalidate individual article page if slug is provided
    if (body.slug?.current) {
      const articlePath = `/news/${body.slug.current}`;
      console.log(`Revalidating individual article path: ${articlePath}`);
      await revalidatePath(articlePath);
    }

    // Revalidate the /news page
    console.log('Revalidating /news page');
    await revalidatePath('/news');

    // Revalidate the home page
    console.log('Revalidating home page');
    await revalidatePath('/');

    return new Response(
      JSON.stringify({
        success: true,
        revalidated: [
          '/news',
          body.slug ? `/news/${body.slug.current}` : null,
          '/',
        ].filter(Boolean),
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    console.error('Webhook processing error:', err);
    return new Response(
      JSON.stringify({ error: err.message || 'Internal Server Error' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

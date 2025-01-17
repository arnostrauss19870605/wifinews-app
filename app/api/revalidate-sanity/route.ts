import { revalidateTag } from 'next/cache';
import { type NextRequest } from 'next/server';
import { parseBody } from 'next-sanity/webhook';

export async function POST(req: NextRequest) {
  try {
    // Log that the webhook has been received
    console.log('Webhook received at:', new Date().toISOString());

    // Parse the request body and validate the signature
    const { isValidSignature, body } = await parseBody<{ _type: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    );

    // Log the raw body and signature validity
    console.log('Webhook body:', body);
    console.log('Is signature valid?', isValidSignature);

    if (!isValidSignature) {
      const message = 'Invalid signature';
      console.warn('Invalid webhook signature:', { body });
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (!body?._type) {
      const message = 'Bad Request: Missing _type in body';
      console.warn('Webhook missing _type:', { body });
      return new Response(JSON.stringify({ message, body }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // Log the revalidation request
    console.log(`Revalidating tag: ${body._type}`);
    await revalidateTag(body._type);

    console.log(`Successfully revalidated tag: ${body._type}`);
    return new Response(
      JSON.stringify({ success: true, revalidatedType: body._type }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (err: any) {
    // Log the error for debugging
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

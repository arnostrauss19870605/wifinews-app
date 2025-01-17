import React from 'react';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { FaCalendarAlt } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import { sanityClient, urlFor } from '@/app/_cms';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';

const query = `*[_type == "news" && slug.current == $slug][0]{
  title,
  content,
  date,
  category,
  image
}`;

type ArticlePageProps = {
  params: {
    slug: string;
  };
};

const portableTextComponents: PortableTextComponents = {
  types: {
    code: ({ value }: any) => (
      <pre className='overflow-x-auto rounded-md bg-gray-100 p-4'>
        <code>{value.code}</code>
      </pre>
    ),
  },
  block: {
    normal: ({ children }) => <p className='mb-4'>{children}</p>,
    h1: ({ children }) => (
      <h1 className='mb-4 text-2xl font-bold'>{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className='mb-3 text-xl font-bold'>{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className='mb-2 text-lg font-bold'>{children}</h3>
    ),
  },
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
  const article = await sanityClient.fetch(query, { slug });

  if (!article) {
    notFound();
  }

  return (
    <>
      <Script id='gpt-home-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };

          window.googletag.cmd.push(function () {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("homepage utm params =>",utmParams);

      // Set the targeting key for Medium as requested by the client
      if (utmParams['Medium']) {
        googletag.pubads().setTargeting('Medium', utmParams['Medium']);
      }

            // Define size mappings
            const mapping1 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 250], [320, 100], [300, 100]])
              .addSize([600, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 100], [320, 100], [300, 250]])
              .addSize([400, 0], [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 100]])
              .addSize([300, 0], [[320, 50], [300, 250], [320, 100], [300, 50], [300, 100], 'fluid'])
              .build();

            const mapping3 = googletag.sizeMapping()
              .addSize([1400, 0], ['fluid', [728, 90], [300, 250], [300, 600], [468, 60]])
              .addSize([1200, 0], ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]])
              .addSize([1000, 0], ['fluid', [728, 90], [468, 60], [300, 250], [300, 600]])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250], [300, 600]])
              .build();

            const mapping4 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .build();

            // Define ad slots and display them
            googletag.defineSlot('/22047902240/wifinews/homepage_top_leaderboard', ['fluid', [320, 100], [320, 50], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-6641866-1')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/homepage_mpu_hpa', ['fluid', [300, 250], [300, 600], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-2')
              .defineSizeMapping(mapping3)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/homepage_mpu_hpa_2', ['fluid', [300, 250], [300, 600], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-3')
              .defineSizeMapping(mapping3)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/Homepage_bottom_1', ['fluid', [300, 250], [320, 100], [320, 50], [468, 60], [728, 90]], 'div-gpt-ad-6641866-4')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/Homepage_bottom_2', ['fluid', [300, 250], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-5')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/homepage_sticky', ['fluid', [320, 50], [320, 100], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-6641866-6')
              .defineSizeMapping(mapping4)
              .addService(googletag.pubads());

            // Enable services and set targeting
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            // Display the ad slots
            googletag.display('div-gpt-ad-6641866-1');
            googletag.display('div-gpt-ad-6641866-2');
            googletag.display('div-gpt-ad-6641866-3');
            googletag.display('div-gpt-ad-6641866-4');
            googletag.display('div-gpt-ad-6641866-5');
            googletag.display('div-gpt-ad-6641866-6');
          });
        `}
      </Script>
      <div>
        <div className='my-6 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-1'></div>
        </div>
        <header className='py-6'>
          <div className='container mx-auto max-w-4xl px-4'>
            <h1 className='text-3xl font-bold'>{article.title}</h1>
            <div className='mt-2 flex items-center text-sm text-gray-600'>
              <FaCalendarAlt className='mr-2' />
              <span>{new Date(article.date).toLocaleDateString()}</span>
              <span className='ml-4 rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white'>
                {article.category}
              </span>
            </div>
          </div>
        </header>
        <main className='container mx-auto max-w-4xl px-4 py-8'>
          <div className='relative h-64 w-full md:h-96'>
            <Image
              src={urlFor(article.image).url()}
              alt={article.title}
              layout='fill'
              objectFit='cover'
              className='rounded-lg'
            />
          </div>
          <article className='mt-8 text-gray-800'>
            <PortableText
              value={article.content}
              components={portableTextComponents}
            />
          </article>
        </main>
      </div>
      {/* Bottom Ad */}
      <div className='fixed bottom-12 left-0 right-0 z-50 flex justify-center'>
        <div id='div-gpt-ad-6641866-6' className='w-full max-w-lg'></div>
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const articles = await sanityClient.fetch(`*[_type == "news"]{slug}`);
  return articles.map((article: { slug: { current: string } }) => ({
    slug: article.slug.current,
  }));
}

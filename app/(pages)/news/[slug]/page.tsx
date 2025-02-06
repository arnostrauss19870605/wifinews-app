import React from 'react';
import Image from 'next/image';
import { PortableText, PortableTextComponents } from '@portabletext/react';
import { FaCalendarAlt } from 'react-icons/fa';
import { notFound } from 'next/navigation';
import { sanityClient, urlFor } from '@/app/_cms';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';

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

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const article = await sanityClient.fetch(
    `*[_type == "news" && slug.current == $slug][0]`,
    { slug: params.slug }
  );
  if (!article) {
    return { title: 'Not Found', description: 'Article not found.' };
  }
  return {
    title: `${article.title} | Wifi News`,
    description: article.description || 'Read the latest news and updates.',
    openGraph: {
      title: article.title,
      description: article.description || 'Read the latest news and updates.',
      url: `https://wifinews.co.za/news/${params.slug}`,
      images: [{ url: urlFor(article.image).url(), alt: article.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description || 'Read the latest news and updates.',
      images: [urlFor(article.image).url()],
    },
  };
}

const query = `*[_type == "news" && slug.current == $slug][0]{
  _id,
  title,
  content,
  date,
  "category": {
    "title": select(
      category == "breaking" => "Breaking News",
      category == "world" => "World",
      category == "sports" => "Sports",
      category == "entertainment" => "Entertainment",
      category == "technology" => "Technology",
      category == "mzansi-trends" => "Mzansi Trends",
      category == "gossip-celebs" => "Gossip & Celebs",
      category == "eish-moments" => "Eish Moments",
      category == "money-matters" => "Money Matters",
      category == "lifestyle-vibes" => "Lifestyle & Vibes",
      category == "community-news" => "Community News",
      category == "street-politics" => "Street Politics",
      category == "sport-kasi-action" => "Sport & Kasi Action",
      category == "tech-gadgets" => "Tech & Gadgets",
      category == "mzansi-stories" => "Mzansi Stories",
      category == "world-news" => "World News"
    ),
    "value": category
  },
  image,
  views
}`;

type ArticlePageProps = {
  params: { slug: string };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
  const article = await sanityClient.fetch(query, { slug });
  if (!article) {
    notFound();
  }
  return (
    <div style={{ minHeight: 'calc(100vh - 220px)' }}>
      <Script
        src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'
        strategy='afterInteractive'
        async
      />
      <Script id='gpt-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            var mapping1 = googletag.sizeMapping()
              .addSize([0, 0], [[0, 0]])
              .addSize([300, 0], [[300,50],[300,100],[320,50],[320,100],[300,250],'fluid',[300,600]])
              .addSize([400, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[300,600]])
              .addSize([600, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[300,600]])
              .addSize([700, 0], ['fluid',[300,50],[300,0],[320,50],[320,100],[300,250],[336,280],[468,60],[300,600]])
              .addSize([1000, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[300,600],[468,60],[728,90]])
              .addSize([1200, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[300,600],[336,280],[468,60],[728,90]])
              .addSize([1400, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[300,600],[468,60],[728,90]])
              .addSize([1600, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[300,600],[336,280],[468,60],[728,90]])
              .addSize([2000, 0], ['fluid',[300,50],[300,250],[300,600],[300,100],[320,50],[320,100],[336,280],[468,60],[728,90]])
              .build();
            var mapping3 = googletag.sizeMapping()
              .addSize([0, 0], [[0, 0]])
              .addSize([300, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250]])
              .addSize([400, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280]])
              .addSize([600, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60]])
              .addSize([700, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60]])
              .addSize([1000, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]])
              .addSize([1200, 0], ['fluid',[300,250],[300,50],[300,100],[320,50],[320,100],[336,280],[468,60],[728,90]])
              .addSize([1400, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]])
              .addSize([1600, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]])
              .addSize([2000, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]])
              .build();
            var utmParams = ${JSON.stringify(getUtmParams())};
            var utm_medium = utmParams.medium || "";
            googletag.defineSlot('/22047902240/wifinews/topics_middle300x250', ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[300,600],[336,280],[468,60],[728,90]], 'div-gpt-ad-2159374-3')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/topics_top300x250', ['fluid',[300,50],[300,100],[320,50],[320,100],[336,280],[468,60],[728,90],[300,250],[300,600]], 'div-gpt-ad-2159374-2')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/topics_top320x50', ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]], 'div-gpt-ad-2159374-1')
              .defineSizeMapping(mapping3)
              .addService(googletag.pubads());
            googletag.pubads().enableSingleRequest();
            googletag.pubads().setTargeting('Medium', [utm_medium]);
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();
          });
        `}
      </Script>
      <div
        className='fixed bottom-5 left-1/2 z-50 hidden -translate-x-1/2 transform lg:block'
        style={{ marginBottom: '20px' }}
      >
        <div id='div-gpt-ad-2159374-2' className='mx-auto'>
          <Script id='display-slot-2' strategy='afterInteractive'>
            {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-2'); });`}
          </Script>
        </div>
      </div>
      <div className='my-2 flex justify-center'>
        <div id='div-gpt-ad-2159374-1'>
          <Script id='display-slot-1-top' strategy='afterInteractive'>
            {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-1'); });`}
          </Script>
        </div>
      </div>
      <header className='py-6'>
        <div className='container mx-auto max-w-4xl px-4'>
          <h1 className='text-3xl font-bold'>{article.title}</h1>
          <div className='mt-2 flex items-center text-sm text-gray-600'>
            <FaCalendarAlt className='mr-2' />
            <span>{new Date(article.date).toLocaleDateString()}</span>
            <span className='ml-4 rounded bg-red-500 px-2 py-1 text-xs font-semibold uppercase text-white'>
              {article.category.title}
            </span>
          </div>
        </div>
      </header>
      <main className='container mx-auto max-w-4xl px-4 py-8'>
        <div className='relative h-64 w-full md:h-96'>
          <Image
            src={urlFor(article.image).url()}
            alt={article.title}
            fill
            style={{ objectFit: 'cover' }}
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
      <div className='my-6 flex justify-center'>
        <div id='div-gpt-ad-2159374-3'>
          <Script id='display-slot-3' strategy='afterInteractive'>
            {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-3'); });`}
          </Script>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const articles = await sanityClient.fetch(`*[_type == "news"]{slug}`);
  return articles.map((article: { slug: { current: string } }) => ({
    slug: article.slug.current,
  }));
}

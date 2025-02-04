import React from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';
import { sanityClient, urlFor } from '@/app/_cms';
import { getUtmParams } from '@/app/_utils/utm.util';
import { Metadata } from 'next';

const ITEMS_PER_PAGE = 6;

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Latest News | Wifi News',
    description:
      'Stay updated with the latest news, stories, and events across various categories.',
    openGraph: {
      title: 'Latest News | Wifi News',
      description:
        'Explore breaking news, technology updates, sports highlights, and more.',
      url: 'https://wifinews.co.za/news/news',
      siteName: 'Wifi News',
      images: [
        {
          url: 'https://wifinews.co.za/news/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'News',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'News | My News Site',
      description:
        'Explore breaking news, technology updates, sports highlights, and more.',
      images: ['https://wifinews.co.za/news/twitter-image.jpg'],
    },
  };
}

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  // Query to fetch paginated news articles
  const query = `*[_type == "news"] | order(date desc) [${start}...${end}] {
    _id,
    title,
    description,
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
    slug
  }`;

  // Total articles count (for pagination)
  const totalQuery = `count(*[_type == "news"])`;
  const totalCount = await sanityClient.fetch(totalQuery);
  const newsArticles = await sanityClient.fetch(query);
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  // For inserting an ad mid-way, split the articles into two batches.
  // (Assuming a two‑column layout on large screens, two rows = 4 articles.)
  const firstBatch = newsArticles.slice(0, 4);
  const secondBatch = newsArticles.slice(4);

  return (
    <div style={{ minHeight: 'calc(100vh - 220px)' }}>
      {/* 1. Load the GPT Library */}
      <Script
        src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'
        strategy='afterInteractive'
        async
      />

      {/* 2. GPT Setup Script – define size mappings and ad slots */}
      <Script id='gpt-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};
          googletag.cmd.push(function() {
            var mapping1 = googletag.sizeMapping()
              .addSize([0, 0], [[0, 0]])
              .addSize([300, 0], [[300, 50], [300, 100], [320, 50], [320, 100], [300, 250], 'fluid', [300, 600]])
              .addSize([400, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [300, 600]])
              .addSize([600, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [468, 60], [300, 600]])
              .addSize([700, 0], ['fluid', [300, 50], [300, 0], [320, 50], [320, 100], [300, 250], [336, 280], [468, 60], [300, 600]])
              .addSize([1000, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [300, 600], [468, 60], [728, 90]])
              .addSize([1200, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [300, 600], [336, 280], [468, 60], [728, 90]])
              .addSize([1400, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [300, 600], [468, 60], [728, 90]])
              .addSize([1600, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [300, 600], [336, 280], [468, 60], [728, 90]])
              .addSize([2000, 0], ['fluid', [300, 50], [300, 250], [300, 600], [300, 100], [320, 50], [320, 100], [336, 280], [468, 60], [728, 90]])
              .build();
              
            var mapping3 = googletag.sizeMapping()
              .addSize([0, 0], [[0, 0]])
              .addSize([300, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250]])
              .addSize([400, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280]])
              .addSize([600, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [468, 60]])
              .addSize([700, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [468, 60]])
              .addSize([1000, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [468, 60], [728, 90]])
              .addSize([1200, 0], ['fluid', [300, 250], [300, 50], [300, 100], [320, 50], [320, 100], [336, 280], [468, 60], [728, 90]])
              .addSize([1400, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [468, 60], [728, 90]])
              .addSize([1600, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [468, 60], [728, 90]])
              .addSize([2000, 0], ['fluid', [300, 50], [300, 100], [320, 50], [320, 100], [300, 250], [336, 280], [468, 60], [728, 90]])
              .build();
              
            var utmParams = ${JSON.stringify(getUtmParams())};
            var utm_medium = utmParams.medium || "";
            
            // Define the three ad slots:
            // Slot for topics_middle300x250:
            googletag.defineSlot('/22047902240/wifinews/topics_middle300x250', 
              ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[300,600],[336,280],[468,60],[728,90]],
              'div-gpt-ad-2159374-3')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
              
            // Slot for topics_top300x250:
            googletag.defineSlot('/22047902240/wifinews/topics_top300x250', 
              ['fluid',[300,50],[300,100],[320,50],[320,100],[336,280],[468,60],[728,90],[300,250],[300,600]],
              'div-gpt-ad-2159374-2')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
              
            // Slot for topics_top320x50:
            googletag.defineSlot('/22047902240/wifinews/topics_top320x50', 
              ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]],
              'div-gpt-ad-2159374-1')
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

      {/* --- Sticky Ad Slot 2 (for all screens lg and up) --- */}
      <div className='fixed right-0 top-1/3 z-50 hidden lg:block'>
        <div id='div-gpt-ad-2159374-2'>
          <Script id='display-slot-2' strategy='afterInteractive'>
            {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-2'); });`}
          </Script>
        </div>
      </div>

      {/* --- Top Ad Slot 1 --- */}
      <div className='my-6 flex justify-center'>
        <div id='div-gpt-ad-2159374-1'>
          <Script id='display-slot-1-top' strategy='afterInteractive'>
            {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-1'); });`}
          </Script>
        </div>
      </div>

      <div className='mx-auto max-w-6xl px-4 py-8'>
        {/* --- News Articles Section --- */}
        <section className='latest-posts'>
          <div className='container mx-auto max-w-4xl px-4'>
            <h2 className='mb-8 flex items-center text-3xl font-bold'>
              <BsFire color='#FB4543' className='mr-2' />
              <span className='mr-2 text-[#FB4543]'>Latest</span> News
            </h2>
            <div className='grid gap-8 sm:grid-cols-1 lg:grid-cols-2'>
              {/* Render first batch of articles */}
              {firstBatch.map((article: any) => (
                <a
                  key={article._id}
                  href={`/news/${article?.slug?.current}`}
                  className='news-card group flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-lg'
                >
                  <div className='relative h-48 w-full'>
                    <Image
                      src={urlFor(article.image).url()}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className='rounded-t-lg'
                    />
                  </div>
                  <div className='flex flex-col justify-between p-4'>
                    <div>
                      <div className='mb-2 inline-block rounded bg-red-500 px-3 py-1 text-xs font-bold uppercase text-white'>
                        {article.category.title}
                      </div>
                      <h3 className='mb-3 text-lg font-semibold text-gray-800 transition-colors group-hover:text-[#FB4543]'>
                        {article.title}
                      </h3>
                      <p className='line-clamp-3 text-gray-700'>
                        {article.description}
                      </p>
                    </div>
                    <div className='mt-4 flex items-center text-sm text-gray-500'>
                      <FaCalendarAlt className='mr-2' />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                  </div>
                </a>
              ))}

              {/* --- Insert Mid-Page Ad Slot 3 (after the first two rows) --- */}
              <div className='col-span-full flex justify-center'>
                <div id='div-gpt-ad-2159374-3'>
                  <Script id='display-slot-3' strategy='afterInteractive'>
                    {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-3'); });`}
                  </Script>
                </div>
              </div>

              {/* Render remaining articles */}
              {secondBatch.map((article: any) => (
                <a
                  key={article._id}
                  href={`/news/${article?.slug?.current}`}
                  className='news-card group flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-lg'
                >
                  <div className='relative h-48 w-full'>
                    <Image
                      src={urlFor(article.image).url()}
                      alt={article.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className='rounded-t-lg'
                    />
                  </div>
                  <div className='flex flex-col justify-between p-4'>
                    <div>
                      <div className='mb-2 inline-block rounded bg-red-500 px-3 py-1 text-xs font-bold uppercase text-white'>
                        {article.category.title}
                      </div>
                      <h3 className='mb-3 text-lg font-semibold text-gray-800 transition-colors group-hover:text-[#FB4543]'>
                        {article.title}
                      </h3>
                      <p className='line-clamp-3 text-gray-700'>
                        {article.description}
                      </p>
                    </div>
                    <div className='mt-4 flex items-center text-sm text-gray-500'>
                      <FaCalendarAlt className='mr-2' />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* --- Pagination Controls --- */}
            <div className='mt-16 flex justify-center space-x-4'>
              {currentPage > 1 && (
                <Link href={`?page=${currentPage - 1}`}>
                  <button className='rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'>
                    Previous
                  </button>
                </Link>
              )}
              {Array.from({ length: totalPages }, (_, i) => (
                <Link key={i} href={`?page=${i + 1}`}>
                  <button
                    className={`rounded px-4 py-2 ${
                      currentPage === i + 1
                        ? 'bg-black text-white'
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                </Link>
              ))}
              {currentPage < totalPages && (
                <Link href={`?page=${currentPage + 1}`}>
                  <button className='rounded bg-gray-200 px-4 py-2 hover:bg-gray-300'>
                    Next
                  </button>
                </Link>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* --- Bottom Ad Slot 1 --- */}
      <div className='my-6 flex justify-center'>
        <div id='div-gpt-ad-2159374-1'>
          <Script id='display-slot-1-bottom' strategy='afterInteractive'>
            {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-1'); });`}
          </Script>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';
import { sanityClient, urlFor } from '@/app/_cms';
import { getUtmParams } from '@/app/_utils/utm.util';

const ITEMS_PER_PAGE = 6;

export default async function NewsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const currentPage = parseInt(searchParams.page || '1', 10);

  // Compute the range for pagination
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const end = start + ITEMS_PER_PAGE;

  // GROQ query with slicing
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

  // Fetch total count for pagination
  const totalQuery = `count(*[_type == "news"])`;
  const totalCount = await sanityClient.fetch(totalQuery);

  // Fetch paginated news articles
  const newsArticles = await sanityClient.fetch(query);

  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

  return (
    <div style={{ minHeight: 'calc(100vh - 220px)' }}>
      {/* Ad Setup Script */}
      <Script id='gpt-news-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };

          window.googletag.cmd.push(function () {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("News Page UTM params =>", utmParams);

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

            googletag.defineSlot('/22047902240/wifinews/news_top_leaderboard', ['fluid', [320, 100], [320, 50], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-6641866-1')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/news_mpu_hpa', ['fluid', [300, 250], [300, 600], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-2')
              .defineSizeMapping(mapping3)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/news_bottom_1', ['fluid', [300, 250], [320, 100], [320, 50], [468, 60], [728, 90]], 'div-gpt-ad-6641866-3')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/news_bottom_2', ['fluid', [300, 250], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-6641866-4')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            googletag.display('div-gpt-ad-6641866-1');
            googletag.display('div-gpt-ad-6641866-2');
            googletag.display('div-gpt-ad-6641866-3');
            googletag.display('div-gpt-ad-6641866-4');
          });
        `}
      </Script>

      <div className='mx-auto max-w-6xl px-4 py-8'>
        {/* Top Ad */}
        <div className='my-6 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-1'></div>
        </div>

        {/* Latest News Section */}
        <section className='latest-posts'>
          <div className='container mx-auto max-w-4xl px-4'>
            <h2 className='mb-8 flex items-center text-3xl font-bold'>
              <BsFire color='#FB4543' className='mr-2' />
              <span className='mr-2 text-[#FB4543]'>Latest</span> News
            </h2>
            <div className='grid gap-8 sm:grid-cols-1 lg:grid-cols-2'>
              {newsArticles.map((article: any) => (
                <Link
                  key={article._id}
                  href={`/news/${article?.slug?.current}`}
                  className='news-card group flex flex-col overflow-hidden rounded-lg border border-gray-200 shadow-sm transition-shadow hover:shadow-lg'
                >
                  {/* Image Section */}
                  <div className='relative h-48 w-full'>
                    <Image
                      src={urlFor(article.image).url()}
                      alt={article.title}
                      fill={true}
                      style={{ objectFit: 'cover' }}
                      className='rounded-t-lg'
                    />
                  </div>

                  {/* Content Section */}
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
                </Link>
              ))}
            </div>

            {/* Pagination Controls */}
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

      {/* Bottom Ads */}
      <div className='my-6 flex justify-center'>
        <div id='div-gpt-ad-6641866-3'></div>
      </div>
      <div className='my-6 flex justify-center'>
        <div id='div-gpt-ad-6641866-4'></div>
      </div>

      {/* Sticky Ad */}
      <div className='fixed bottom-12 left-0 right-0 z-50 flex justify-center'>
        <div id='div-gpt-ad-6641866-2' className='w-full max-w-lg'></div>
      </div>
    </div>
  );
}

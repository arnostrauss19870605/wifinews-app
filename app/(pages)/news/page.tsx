import React from 'react';
import Script from 'next/script';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';
import { sanityClient, urlFor } from '@/app/cms';

const query = `*[_type == "news"]{
  _id,
  title,
  "description": content[0].children[0].text,
  date,
  category,
  image
}`;

export default async function NewsPage() {
  const newsArticles = await sanityClient.fetch(query);

  return (
    <>
      <Script id='gpt-home-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };
          window.googletag.cmd.push(function () {
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();
          });
        `}
      </Script>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-1'></div>
        </div>
        <section className='latest-posts py-8'>
          <div className='container mx-auto max-w-4xl px-4'>
            <h2 className='mb-6 flex text-3xl font-bold'>
              <BsFire color={'#FB4543'} className='mr-2' />
              <span className='mr-2 text-[#FB4543]'>Latest</span> News
            </h2>
            <div className='flex flex-col gap-6'>
              {newsArticles.map((article: any) => (
                <div
                  key={article._id}
                  className='news-card flex flex-col items-start overflow-hidden rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg md:flex-row'
                >
                  <div className='relative h-48 w-full md:h-64 md:w-1/3'>
                    <Image
                      src={urlFor(article.image).url()}
                      alt={article.title}
                      layout='fill'
                      objectFit='cover'
                      className='rounded-t-lg md:rounded-l-lg md:rounded-t-none'
                    />
                  </div>
                  <div className='flex flex-col justify-between p-4 md:w-2/3'>
                    <div>
                      <div className='mb-2 inline-block rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white'>
                        {article.category}
                      </div>
                      <h3 className='mb-2 text-xl font-semibold transition-colors hover:text-[#FB4543]'>
                        <Link href={`/news/${article._id}`}>
                          {article.title}
                        </Link>
                      </h3>
                      <p className='mb-4 text-gray-700'>
                        {article.description}
                      </p>
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaCalendarAlt className='mr-2' />
                      {new Date(article.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className='mt-6 flex justify-center'>
              <button className='rounded bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-[#FB4543]'>
                Load More
              </button>
            </div>
          </div>
        </section>
      </div>
      <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
        <div id='div-gpt-ad-6641866-6' className='w-full max-w-[768px]'></div>
      </div>
    </>
  );
}

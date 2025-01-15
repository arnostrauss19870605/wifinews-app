import React from 'react';
import Script from 'next/script';
import Image from 'next/image';
import { getUtmParams } from '@/app/_utils/utm.util';
import { FaCalendarAlt } from 'react-icons/fa';
import { BsFire } from 'react-icons/bs';

export default function News() {
  const newsArticles = [
    {
      id: 1,
      title: 'Bose Line of Products on the Show: Showroom Open Now in Dubai',
      description:
        'To understand the new smart watched and other pro devices of recent focus, we should look to Silicon Valley and the...',
      date: 'January 14, 2021',
      category: 'Gadgets',
      imageUrl: 'https://picsum.photos/400/300?random=1', // Picsum placeholder
    },
    {
      id: 2,
      title:
        'Airlines Face Billions in Losses As COVID Will Wipe Out Even More Flights',
      description:
        'To understand the new smart watched and other pro devices of recent focus, we should look to Silicon Valley and the...',
      date: 'January 14, 2021',
      category: 'Technology',
      imageUrl: 'https://picsum.photos/400/300?random=2', // Picsum placeholder
    },
    {
      id: 3,
      title: 'Asimo Robot Unveils a New Tool For Simple Robot Programming',
      description:
        'To understand the new smart watched and other pro devices of recent focus, we should look to Silicon Valley and the...',
      date: 'January 14, 2021',
      category: 'Robotics',
      imageUrl: 'https://picsum.photos/400/300?random=3', // Picsum placeholder
    },
    {
      id: 4,
      title:
        'Our Review: Tesla’s Sales Goals Focus for Fourth-Quarter Earnings',
      description:
        'To understand the new smart watched and other pro devices of recent focus, we should look to Silicon Valley and the...',
      date: 'January 14, 2021',
      category: 'Finance',
      imageUrl: 'https://picsum.photos/400/300?random=4', // Picsum placeholder
    },
  ];

  return (
    <>
      {/* GPT Configuration and Ad Display */}
      <Script id='gpt-home-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };
          window.googletag.cmd.push(function () {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("homepage utm params =>", utmParams);

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
        {/*News Page Design Here*/}
        <section className='latest-posts py-8'>
          <div className='container mx-auto max-w-4xl px-4'>
            <h2 className='mb-6 flex text-3xl font-bold'>
              <BsFire color={'#FB4543'} className='mr-2' />
              <span className='mr-2 text-[#FB4543]'>Latest</span> News
            </h2>
            <div className='flex flex-col gap-6'>
              {newsArticles.map((article) => (
                <div
                  key={article.id}
                  className='news-card flex flex-col items-start overflow-hidden rounded-lg border shadow-md transition-shadow duration-300 hover:shadow-lg md:flex-row'
                >
                  {/* Image Section */}
                  <div className='relative h-48 w-full md:h-64 md:w-1/3'>
                    <Image
                      src={article.imageUrl}
                      alt={article.title}
                      layout='fill'
                      objectFit='cover'
                      className='rounded-t-lg md:rounded-l-lg md:rounded-t-none'
                    />
                  </div>
                  {/* Content Section */}
                  <div className='flex flex-col justify-between p-4 md:w-2/3'>
                    <div>
                      <div className='mb-2 inline-block rounded bg-red-500 px-2 py-1 text-xs font-semibold text-white'>
                        {article.category}
                      </div>
                      <h3 className='mb-2 text-xl font-semibold transition-colors hover:text-[#FB4543]'>
                        {article.title}
                      </h3>
                      <p className='mb-4 text-gray-700'>
                        {article.description}
                      </p>
                    </div>
                    <div className='flex items-center text-sm text-gray-500'>
                      <FaCalendarAlt className='mr-2' />
                      {article.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Load More Button */}
            <div className='mt-6 flex justify-center'>
              <button className='rounded bg-black px-6 py-3 font-semibold text-white transition-colors hover:bg-[#FB4543]'>
                Load More
              </button>
            </div>
          </div>
        </section>
      </div>
      {/* Sticky Ad */}
      <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
        <div id='div-gpt-ad-6641866-6' className='w-full max-w-[768px]'></div>
      </div>
    </>
  );
}

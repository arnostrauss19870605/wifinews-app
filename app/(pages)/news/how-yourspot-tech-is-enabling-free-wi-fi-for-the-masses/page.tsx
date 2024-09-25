import React from 'react';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';

export default function BlogPost() {
  return (
    <>
      {/* GPT Configuration and Ad Display */}
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
      <div className='mx-auto max-w-4xl px-6 py-10'>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-1'></div>
        </div>
        <article className='rounded-lg bg-white p-8 shadow-md'>
          <header>
            <h1 className='mb-6 text-3xl font-bold'>
              How YourSpot.tech is Enabling Free Wi-Fi for the Masses
            </h1>
          </header>

          <section className='mb-8'>
            <p className='text-lg leading-7'>
              In an era where internet access is crucial, YourSpot.tech is
              making significant strides in providing free Wi-Fi to the masses
              in South Africa. Their approach combines technological innovation
              with strategic partnerships to deliver reliable and accessible
              Wi-Fi solutions across various public spaces, such as shopping
              malls, parks, and transportation hubs.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Monetization as a Service
            </h2>
            <p className='text-lg leading-7'>
              YourSpot.tech has developed a unique &quot;Monetization as a
              Service&quot; model, which allows public Wi-Fi providers to
              generate revenue through advertising. This model involves using a
              captive portal where users log in to access free Wi-Fi. This
              portal serves as a platform for displaying targeted
              advertisements, promotions, and vouchers, ensuring that the
              service remains free for users while generating income for the
              provider.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Enhancing User Experience
            </h2>
            <p className='text-lg leading-7'>
              By focusing on user satisfaction, YourSpot.tech ensures that the
              Wi-Fi service provided is fast, secure, and reliable. This
              approach not only attracts more users but also encourages them to
              spend more time in the areas where the Wi-Fi is available,
              benefiting local businesses and service providers.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Data Collection and Utilization
            </h2>
            <p className='text-lg leading-7'>
              The platform also facilitates the collection of valuable user
              data, such as email addresses and browsing habits, in compliance
              with the Protection of Personal Information Act. This data helps
              businesses tailor their marketing strategies and improve customer
              engagement. Additionally, it provides insights into user behavior
              and foot traffic, which can inform decisions about store layouts
              and merchandising.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Cost Management and Control
            </h2>
            <p className='text-lg leading-7'>
              YourSpot.tech&apos;s solution offers tight control over Wi-Fi
              usage, allowing providers to manage access parameters such as
              time, data, and bandwidth. This ensures optimal cost management
              and maintains the quality of the Wi-Fi service, making it
              sustainable in the long term.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>Future Prospects</h2>
            <p className='text-lg leading-7'>
              As YourSpot.tech continues to expand its services, it is poised to
              play a significant role in bridging the digital divide in South
              Africa. By providing free Wi-Fi through innovative monetization
              strategies, YourSpot.tech not only enhances connectivity but also
              supports the growth of the digital economy and improves access to
              essential online services for all South Africans.
            </p>
          </section>

          <p className='text-lg leading-7'>
            For more information, visit{' '}
            <a
              href='https://yourspot.tech'
              className='text-blue-600 hover:underline'
            >
              YourSpot.tech
            </a>
            .
          </p>
        </article>
      </div>
      {/* Sticky Ad */}
      <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
        <div id='div-gpt-ad-6641866-6' className='w-full max-w-[768px]'></div>
      </div>
    </>
  );
}

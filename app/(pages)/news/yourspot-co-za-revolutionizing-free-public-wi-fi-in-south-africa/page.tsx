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
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-6641866-1'></div>
        </div>
        <article className='rounded-lg bg-white p-8 shadow-md'>
          <header>
            <h1 className='mb-6 text-3xl font-bold'>
              Yourspot.co.za: Revolutionizing Free Public Wi-Fi in South Africa
            </h1>
          </header>

          <section className='mb-8'>
            <p className='text-lg leading-7'>
              Yourspot.co.za is at the forefront of providing free public Wi-Fi
              across South Africa, ensuring that everyone, regardless of their
              socio-economic status, can access the internet. By leveraging
              innovative technology and strategic partnerships, Yourspot.co.za
              offers high-speed internet in various public spaces, including
              parks, transportation hubs, and educational institutions.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Monetization Strategy
            </h2>
            <p className='text-lg leading-7'>
              Yourspot.co.za employs a unique monetization strategy to keep its
              Wi-Fi services free. The platform integrates advertising into its
              service model, displaying targeted ads and promotions to users
              upon login. This approach generates revenue that supports the
              maintenance and expansion of the network while keeping user costs
              at zero. Advertisers benefit from direct engagement with a broad
              audience, creating a win-win situation.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Enhancing Community Connectivity
            </h2>
            <p className='text-lg leading-7'>
              The provision of free Wi-Fi by Yourspot.co.za significantly
              enhances community connectivity. It enables students to access
              educational resources, supports remote working, and allows small
              businesses to engage with digital platforms. This initiative is
              particularly impactful in underserved areas, where internet access
              can be limited.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Security and Reliability
            </h2>
            <p className='text-lg leading-7'>
              Yourspot.co.za places a strong emphasis on security and
              reliability. Users can trust that their data is protected, and the
              network is designed to provide consistent, high-speed internet
              access. Regular updates and maintenance ensure that the service
              remains robust and dependable.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Challenges and Future Plans
            </h2>
            <p className='text-lg leading-7'>
              While Yourspot.co.za has made remarkable progress, it continues to
              address challenges such as expanding coverage to more remote areas
              and managing the high demand for bandwidth. Future plans include
              integrating more advanced technologies to improve service quality
              and extending the network to cover more locations.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>Conclusion</h2>
            <p className='text-lg leading-7'>
              Yourspot.co.za is playing a crucial role in democratizing internet
              access in South Africa. By providing free public Wi-Fi through an
              innovative monetization model, it is bridging the digital divide,
              supporting education and economic growth, and fostering greater
              community connectivity. As it continues to expand and innovate,
              Yourspot.co.za is set to make an even greater impact on the
              digital landscape of South Africa.
            </p>
            <p className='mt-4 text-lg leading-7'>
              For more information, visit{' '}
              <a
                href='https://yourspot.co.za'
                className='text-blue-600 hover:underline'
              >
                Yourspot.co.za
              </a>
              .
            </p>
          </section>
        </article>
      </div>
    </>
  );
}

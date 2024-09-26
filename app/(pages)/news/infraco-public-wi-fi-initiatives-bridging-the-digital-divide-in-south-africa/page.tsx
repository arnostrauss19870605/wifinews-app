import React from 'react';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';

export default function BlogPost() {
  return (
    <>
      {/* GPT Configuration and Ad Display */}
      <Script id='gpt-home-setup' strategy='beforeInteractive'>
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
              InfraCo&apos;s Public Wi-Fi Initiatives in South Africa
            </h1>
          </header>

          <section className='mb-8'>
            <p className='text-lg leading-7'>
              InfraCo, a prominent player in South Africa&apos;s
              telecommunications landscape, is making significant strides in
              enhancing public Wi-Fi accessibility across the country. Their
              initiatives are centered around providing reliable, high-speed
              internet access in public spaces, aiming to bridge the digital
              divide and foster digital inclusion.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Expanding Connectivity
            </h2>
            <p className='text-lg leading-7'>
              InfraCo&apos;s public Wi-Fi projects are strategically deployed in
              key areas such as schools, libraries, community centers, and
              public transport hubs. By focusing on high-traffic areas, InfraCo
              ensures that a broad segment of the population, including
              underserved and rural communities, gains access to the internet.
              This initiative not only enhances connectivity but also provides
              essential online services to those who might otherwise be
              excluded.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Promoting Education and Economic Growth
            </h2>
            <p className='text-lg leading-7'>
              One of the critical impacts of InfraCo&apos;s public Wi-Fi
              initiatives is on education. By providing students with free
              access to the internet, InfraCo empowers them with the resources
              needed for research, online learning, and digital literacy. This
              access is vital for students in rural areas, where educational
              resources are often limited.
            </p>
            <p className='mt-4 text-lg leading-7'>
              Moreover, InfraCo&apos;s initiatives support local businesses and
              entrepreneurs by providing them with the internet access needed to
              connect with broader markets, utilize digital tools, and
              participate in the digital economy. This connectivity is crucial
              for fostering economic growth and innovation at the grassroots
              level.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Ensuring Sustainability
            </h2>
            <p className='text-lg leading-7'>
              To ensure the sustainability of their public Wi-Fi initiatives,
              InfraCo employs various models, including partnerships with local
              governments and private sector stakeholders. These collaborations
              help share the costs and responsibilities associated with
              maintaining and expanding the network. InfraCo also explores
              innovative funding mechanisms, such as advertising and
              sponsorship, to support the free Wi-Fi services.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>
              Overcoming Challenges
            </h2>
            <p className='text-lg leading-7'>
              While InfraCo has made significant progress, challenges remain.
              Infrastructure development, especially in remote and rural areas,
              requires substantial investment and logistical planning.
              Additionally, ensuring consistent quality of service and managing
              high demand are ongoing tasks that InfraCo addresses through
              continuous upgrades and maintenance.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>Future Prospects</h2>
            <p className='text-lg leading-7'>
              Looking ahead, InfraCo aims to further expand its public Wi-Fi
              footprint, with plans to introduce more advanced technologies and
              increase network capacity. Their long-term vision includes
              integrating smart technologies and IoT solutions to create more
              connected and intelligent public spaces.
            </p>
          </section>

          <section className='mb-8'>
            <h2 className='mb-4 text-2xl font-semibold'>Conclusion</h2>
            <p className='text-lg leading-7'>
              InfraCo&apos;s public Wi-Fi initiatives are a testament to their
              commitment to digital inclusion and empowerment. By providing free
              and reliable internet access to underserved communities, InfraCo
              is helping to bridge the digital divide, promote education, and
              stimulate economic growth in South Africa. Through strategic
              partnerships and innovative approaches, InfraCo is paving the way
              for a more connected and inclusive digital future.
            </p>
            <p className='mt-4 text-lg leading-7'>
              For more information, visit{' '}
              <a
                href='https://infraco.co.za'
                className='text-blue-600 hover:underline'
              >
                InfraCo&apos;s official website
              </a>
              .
            </p>
          </section>
        </article>
      </div>
      {/* Sticky Ad */}
      <div className='fixed bottom-12 left-0 right-0 z-[9999] flex justify-center'>
        <div id='div-gpt-ad-6641866-6' className='w-full max-w-[768px]'></div>
      </div>
    </>
  );
}

'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { getUtmParams, appendUtmParams } from '@/app/_utils/utm.util';
import { FaSearch } from 'react-icons/fa';

function Exit_1() {
  const [isRewardModalVisible, setIsRewardModalVisible] = useState(false);

  useEffect(() => {
    const initializeRewardedAd = () => {
      (window as any).googletag = (window as any).googletag || { cmd: [] };
      (window as any).googletag.cmd.push(() => {
        const googletag = (window as any).googletag;
        let rewardedSlot = googletag
          .defineOutOfPageSlot(
            '147246189,22047902240/wifinews.co.za_rewarded',
            googletag.enums.OutOfPageFormat.REWARDED
          )
          .addService(googletag.pubads());
        rewardedSlot.setForceSafeFrame(true);
        googletag.pubads().enableAsyncRendering();
        googletag.enableServices();

        let rewardedSlotReady = false;
        let grantedState = false;

        googletag.pubads().addEventListener('rewardedSlotReady', (evt: any) => {
          rewardedSlotReady = true;
          setIsRewardModalVisible(true);
          const trigger = document.getElementById('rewardModal');
          if (trigger) {
            trigger.style.display = 'flex';
            document.body.style.overflow = 'hidden';

            const watchAdButton = document.getElementById('watchAdBtn');
            const noThanksButton = document.getElementById('noThanksBtn');

            const makeVisibleFn = (e: Event) => {
              evt.makeRewardedVisible();
              e.preventDefault();
              watchAdButton?.removeEventListener('click', makeVisibleFn);
              noThanksButton?.removeEventListener('click', closeModalFn);
              trigger.style.display = 'none';
              document.body.style.overflow = '';
              setIsRewardModalVisible(false);
            };

            const closeModalFn = () => {
              trigger.style.display = 'none';
              document.body.style.overflow = '';
              googletag.destroySlots([rewardedSlot]);
              setIsRewardModalVisible(false);
            };

            watchAdButton?.addEventListener('click', makeVisibleFn);
            noThanksButton?.addEventListener('click', closeModalFn);
          }
        });

        googletag.pubads().addEventListener('rewardedSlotGranted', function () {
          grantedState = true;
          console.log('Rewarded Ad Granted Event');
        });

        googletag
          .pubads()
          .addEventListener('rewardedSlotClosed', (event: any) => {
            const slot = event.slot;
            console.log(
              'Rewarded ad slot',
              slot.getSlotElementId(),
              'has been closed.'
            );
            if (!grantedState) {
              console.log('Rewarded Slot was not granted.');
              window.location.href = appendUtmParams('/cancel');
            } else {
              googletag.destroySlots([rewardedSlot]);
              window.location.href = appendUtmParams('/search');
            }
          });

        googletag.display(rewardedSlot);
      });
    };

    initializeRewardedAd();
  }, []);

  const cancelPage = () => {
    window.location.href = appendUtmParams('/');
  };

  const handleConnect = () => {
    window.location.href = appendUtmParams('/search');
  };

  return (
    <>
      <Script id='gpt-rewarded-ad-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};
        `}
      </Script>

      <Script id='gpt-exit-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || {cmd: []};

          googletag.cmd.push(function() {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("exit utm params =>", utmParams);

            if (utmParams['Medium']) {
              googletag.pubads().setTargeting('Medium', utmParams['Medium']);
            }

            const mapping = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 250], [320, 100], [300, 100]])
              .addSize([600, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 100], [320, 100], [300, 250]])
              .addSize([400, 0], [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 100]])
              .addSize([300, 0], [[320, 50], [300, 250], [320, 100], [300, 50], [300, 100], 'fluid'])
              .build();

            const mappingMiddle = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], [300, 250], [300, 600], 'fluid'])
              .addSize([1200, 0], [[728, 90], [300, 250], [300, 600], 'fluid'])
              .addSize([1000, 0], [[728, 90], [300, 250], [300, 600], 'fluid'])
              .addSize([700, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 250], [300, 600], [320, 100], [300, 100]])
              .addSize([600, 0], [[468, 60], [320, 50], [300, 50], 'fluid', [300, 100], [320, 100], [300, 250], [300, 600]])
              .addSize([400, 0], [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 600], [300, 100]])
              .addSize([300, 0], [[320, 50], [300, 250], [300, 600], [320, 100], [300, 50], [300, 100], 'fluid'])
              .build();

            googletag.defineSlot('/22047902240/wifinews/exit_top', ['fluid', [300,250], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-1')
              .defineSizeMapping(mapping)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_middle', ['fluid', [300,250], [300,600], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-2')
              .defineSizeMapping(mappingMiddle)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_middle2', ['fluid', [300,250], [300,600], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-3')
              .defineSizeMapping(mappingMiddle)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_bottom1', ['fluid', [300,250], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-4')
              .defineSizeMapping(mapping)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_bottom2', ['fluid', [300,250], [320,50], [320,100], [468,60], [728,90]], 'div-gpt-ad-5795880-5')
              .defineSizeMapping(mapping)
              .addService(googletag.pubads());
            googletag.defineSlot('/22047902240/wifinews/exit_sticky', ['fluid', [320,50], [320,100], [300,250], [468,60], [728,90]], 'div-gpt-ad-5795880-6')
              .defineSizeMapping(mapping)
              .addService(googletag.pubads());

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            googletag.display('div-gpt-ad-5795880-1');
            googletag.display('div-gpt-ad-5795880-2');
            googletag.display('div-gpt-ad-5795880-3');
            googletag.display('div-gpt-ad-5795880-4');
            googletag.display('div-gpt-ad-5795880-5');
            googletag.display('div-gpt-ad-5795880-6');
          });
        `}
      </Script>

      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-5795880-1'></div>
      </div>

      <div className='flex min-h-screen flex-col items-center px-4 py-4'>
        <p className='mb-4'>You are now connected to the internet</p>
        <div className='flex justify-center'>
          {!isRewardModalVisible && (
            <div role='status'>
              <svg
                aria-hidden='true'
                className='h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                  fill='#FE464450'
                />
                <path
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                  fill='#FE4644'
                />
              </svg>
              <span className='sr-only'>Loading...</span>
            </div>
          )}
          {isRewardModalVisible && (
            <button
              type='button'
              className='mb-6 mt-2 flex items-center rounded-lg bg-slate-950 px-6 py-3 font-medium text-white focus:outline-none lg:px-10'
              onClick={handleConnect}
            >
              <FaSearch className='mr-2' /> Click Here To Browse
            </button>
          )}
        </div>

        {/* Sticky Ad */}
        <div
          className='fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transform'
          style={{ marginBottom: '20px' }}
        >
          <div id='div-gpt-ad-5795880-6' className='mx-auto'></div>
        </div>

        {/* Divs for Ad Slots */}
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-5795880-2'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-5795880-3'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-5795880-4'></div>
        </div>
        <div className='my-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-5795880-5'></div>
        </div>
      </div>

      {/* Reward Modal */}
      <div
        id='rewardModal'
        className='fixed bottom-0 left-0 right-0 top-0 z-[9000] flex items-center justify-center bg-black bg-opacity-50 p-4'
        style={{
          display: isRewardModalVisible ? 'flex' : 'none',
          paddingBottom: '60px',
        }}
      >
        <div
          className='rounded-lg bg-white p-6 text-center shadow-lg'
          style={{ maxWidth: '500px', maxHeight: '80vh', width: '100%' }}
        >
          <p className='mb-4'>You are now connected to the internet</p>
          <input
            type='button'
            className='lg_btn my-2 mr-2 cursor-pointer rounded-lg bg-black px-4 py-2 text-white'
            id='watchAdBtn'
            value='Click Here to Browse'
          />
          <input
            type='button'
            className='btn my-2 cursor-pointer rounded-lg bg-gray-500 px-4 py-2 text-white'
            id='noThanksBtn'
            value='No Thanks'
            onClick={cancelPage}
          />
          <p className='mt-4'>I would Like to remain on Wifi-News.</p>
        </div>
      </div>
    </>
  );
}

export default Exit_1;

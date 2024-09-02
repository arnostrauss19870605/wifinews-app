'use client';
import { useEffect } from 'react';

export default function Advertisement() {
  useEffect(() => {
    // Ensure ads only load in production
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production'
    ) {
      console.info(
        'Advertisements are disabled in non-production environments.'
      );
      return;
    }

    // Initialize googletag if not already initialized
    window.googletag = window.googletag || { cmd: [] };

    // Push commands to googletag
    window.googletag.cmd.push(() => {
      // Retrieve UTM Medium or default to 'NULL'
      const urlParams = new URLSearchParams(window.location.search);
      const utm_medium = urlParams.get('utm_medium') || 'NULL';

      // Define size mappings
      const mapping1 = window.googletag
        .sizeMapping()
        .addSize([1400, 0], [[728, 90], 'fluid'])
        .addSize([1200, 0], [[728, 90], 'fluid'])
        .addSize([1000, 0], [[728, 90], 'fluid'])
        .addSize(
          [700, 0],
          [
            [468, 60],
            [320, 50],
            [300, 50],
            'fluid',
            [300, 250],
            [320, 100],
            [300, 100],
          ]
        )
        .addSize(
          [600, 0],
          [
            [468, 60],
            [320, 50],
            [300, 50],
            'fluid',
            [300, 100],
            [320, 100],
            [300, 250],
          ]
        )
        .addSize(
          [400, 0],
          [[320, 50], [300, 50], 'fluid', [320, 100], [300, 250], [300, 100]]
        )
        .addSize(
          [300, 0],
          [[320, 50], [300, 250], [320, 100], [300, 50], [300, 100], 'fluid']
        )
        .build();

      const mapping2 = window.googletag
        .sizeMapping()
        .addSize([1400, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([1200, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([1000, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([700, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([600, 0], [[320, 480], [300, 250], [300, 600], 'fluid'])
        .addSize([400, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
        .addSize([300, 0], [[300, 250], [300, 600], [320, 480], 'fluid'])
        .build();

      const mapping4 = window.googletag
        .sizeMapping()
        .addSize([1400, 0], [[728, 90], 'fluid'])
        .addSize([1200, 0], [[728, 90], 'fluid'])
        .addSize([1000, 0], [[728, 90], 'fluid'])
        .addSize(
          [700, 0],
          ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]]
        )
        .addSize(
          [600, 0],
          ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100]]
        )
        .addSize(
          [400, 0],
          ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]]
        )
        .addSize(
          [300, 0],
          ['fluid', [320, 50], [300, 50], [320, 100], [300, 100]]
        )
        .build();

      // Define the ad slots with the correct ad unit paths and sizes
      window.googletag
        .defineSlot(
          '/22047902240/wifinews/landing_interstitial',
          ['fluid', [320, 480], [300, 250], [300, 600]],
          'div-gpt-ad-7092085-1'
        )
        .defineSizeMapping(mapping2)
        .addService(window.googletag.pubads());

      window.googletag
        .defineSlot(
          '/22047902240/wifinews/landing_top320x50',
          ['fluid', [300, 250], [320, 50], [320, 100], [468, 60], [728, 90]],
          'div-gpt-ad-7092085-2'
        )
        .defineSizeMapping(mapping1)
        .addService(window.googletag.pubads());

      window.googletag
        .defineSlot(
          '/22047902240/wifinews/landing_sticky',
          ['fluid', [320, 50], [320, 100], [468, 60], [728, 90]],
          'div-gpt-ad-7092085-3'
        )
        .defineSizeMapping(mapping4)
        .addService(window.googletag.pubads());

      // Define the rewarded ad slot
      let rewardedSlot = window.googletag
        .defineOutOfPageSlot(
          '147246189,22047902240/wifinews.co.za_rewarded',
          window.googletag.enums.OutOfPageFormat.REWARDED
        )
        ?.addService(window.googletag.pubads());

      if (rewardedSlot) {
        rewardedSlot.setForceSafeFrame(true); // Force SafeFrame for this ad slot
      }

      // Enable Single Request Architecture (SRA) and collapse empty divs
      window.googletag.pubads().enableSingleRequest();
      window.googletag.pubads().collapseEmptyDivs();
      window.googletag.pubads().enableAsyncRendering(); // Enable async rendering for faster page loads
      window.googletag.enableServices();
    });

    // Load the Google Publisher Tag library asynchronously
    const script = document.createElement('script');
    script.src = 'https://www.googletagservices.com/tag/js/gpt.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <>
      {/* Ad Slot Containers */}
      <div id='div-gpt-ad-7092085-1' style={{ marginBottom: '20px' }}></div>
      <div id='div-gpt-ad-7092085-2' style={{ marginBottom: '20px' }}></div>
      <div id='div-gpt-ad-7092085-3' style={{ marginBottom: '20px' }}></div>
    </>
  );
}

'use client';
import { useEffect } from 'react';

export default function Advertisement() {
  useEffect(() => {
    // Ensure ads only load in production
    if (process.env.NODE_ENV !== 'production') {
      console.info(
        'Advertisements are disabled in non-production environments.'
      );
      return;
    }

    // Ensure that googletag is available and initialized by gtag.js in GTag component
    if (typeof window.googletag === 'undefined') {
      console.warn('Google Tag Manager is not loaded.');
      return;
    }

    // Ensure that googletag.cmd exists and is initialized
    window.googletag = window.googletag || { cmd: [] };

    // Execute commands once googletag is ready
    window.googletag.cmd.push(() => {
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

      window.googletag
        .defineSlot(
          '/22047902240/wifinews/landing_interstitial',
          ['fluid', [320, 480], [300, 250], [300, 600]],
          'div-gpt-ad-7092085-1'
        )
        .defineSizeMapping(mapping1)
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
        .defineSizeMapping(mapping1)
        .addService(window.googletag.pubads());

      window.googletag.pubads().enableSingleRequest();
      window.googletag.pubads().collapseEmptyDivs();
      window.googletag.enableServices();
    });
  }, []);

  return (
    <>
      {/* Ad Slots */}
      <div id='div-gpt-ad-7092085-1' style={{ marginBottom: '20px' }}></div>
      <div id='div-gpt-ad-7092085-2' style={{ marginBottom: '20px' }}></div>
      <div id='div-gpt-ad-7092085-3' style={{ marginBottom: '20px' }}></div>
    </>
  );
}

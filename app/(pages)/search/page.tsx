'use client';
import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';
import { FaSearch } from 'react-icons/fa';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Load the Google Custom Search Engine script
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=207b2db6653094381';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (window.google) {
      window.google.search.cse.element.go();
    }
  };

  return (
    <div
      className='flex w-full flex-col items-center text-black'
      style={{ minHeight: 'calc(100vh - 220px)' }}
    >
      {/* GPT Configuration and Ad Display */}
      <Script id='gpt-search-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };

          window.googletag.cmd.push(function () {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("search page utm params =>", utmParams);
            Object.entries(utmParams).forEach(([key, value]) => {
              googletag.pubads().setTargeting(key, value);
            });

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
            googletag.defineSlot('/22047902240/wifinews/search_top320x50', ['fluid', [300, 250], [320, 50], [320, 100], [468, 60], [728, 90]], 'div-gpt-ad-2121612-1')
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());

            googletag.defineSlot('/22047902240/wifinews/search_sticky', ['fluid', [320, 50], [320, 100], [300, 250], [468, 60], [728, 90]], 'div-gpt-ad-2121612-2')
              .defineSizeMapping(mapping4)
              .addService(googletag.pubads());

            // Enable services and set targeting
            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            // Display the ad slots
            googletag.display('div-gpt-ad-2121612-1');
            googletag.display('div-gpt-ad-2121612-2');
          });
        `}
      </Script>

      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-2121612-1'></div>
      </div>

      {/* Enhanced Google Custom Search Box */}
      <div className='my-8 w-full max-w-2xl px-4'>
        <form onSubmit={handleSearch} className='relative'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full rounded-full border-2 border-black py-3 pl-6 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-black'
            placeholder='Search...'
          />
          <button
            type='submit'
            className='absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black p-3 text-white transition-transform hover:scale-105 focus:outline-none'
          >
            <FaSearch size={20} />
          </button>
        </form>
        {/* Google Custom Search results */}
        <div className='gcse-searchresults-only mt-8'></div>
      </div>

      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-2121612-2'></div>
      </div>
    </div>
  );
}

export default Search;

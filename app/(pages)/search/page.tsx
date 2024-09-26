'use client';
import React, { useState, useEffect, useRef } from 'react';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';
import { FaSearch } from 'react-icons/fa';

function Search() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isGoogleCseLoaded, setIsGoogleCseLoaded] = useState(false);
  const searchElementRef = useRef(null);

  useEffect(() => {
    const handleError = (event: any) => {
      console.error('Caught error:', event.error);
    };
    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  useEffect(() => {
    if (isGoogleCseLoaded && searchElementRef.current) {
      const initializeSearch = () => {
        if (
          window.google &&
          window.google.search &&
          window.google.search.cse &&
          window.google.search.cse.element
        ) {
          window.google.search.cse.element.render({
            div: searchElementRef.current,
            tag: 'searchresults-only',
            gname: 'searchresults-only0',
          });
          console.log('Search element initialized');
        } else {
          console.log('Google CSE not yet available, retrying...');
          setTimeout(initializeSearch, 100); // Retry after 100ms
        }
      };

      initializeSearch();
    }
  }, [isGoogleCseLoaded]);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      window.google &&
      window.google.search &&
      window.google.search.cse &&
      window.google.search.cse.element
    ) {
      const element = window.google.search.cse.element.getElement(
        'searchresults-only0'
      );
      if (element) {
        element.execute(searchTerm);
      } else {
        console.error('Search element not found');
      }
    } else {
      console.error('Google CSE not initialized');
    }
  };

  return (
    <div
      className='flex w-full flex-col items-center text-black'
      style={{ minHeight: 'calc(100vh - 220px)' }}
    >
      <Script
        src='https://cse.google.com/cse.js?cx=207b2db6653094381'
        strategy='beforeInteractive'
        onLoad={() => {
          console.log('Google CSE script loaded successfully');
          setIsGoogleCseLoaded(true);
        }}
        onError={(e) => console.error('Error loading Google CSE script:', e)}
      />

      <Script id='gpt-search-setup' strategy='beforeInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };

          window.googletag.cmd.push(function () {
            const utmParams = ${JSON.stringify(getUtmParams())};
            console.log("search page utm params =>", utmParams);

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

            googletag.pubads().enableSingleRequest();
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();

            googletag.display('div-gpt-ad-2121612-1');
            googletag.display('div-gpt-ad-2121612-2');
          });
        `}
      </Script>

      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-2121612-1'></div>
      </div>

      <div className='my-8 w-full max-w-2xl px-4'>
        <form onSubmit={handleSearch} className='relative mb-8'>
          <input
            type='text'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full rounded-full border-2 border-black py-3 pl-6 pr-12 text-lg focus:outline-none focus:ring-2 focus:ring-gray-300'
            placeholder='Search...'
          />
          <button
            type='submit'
            className='absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-black p-3 text-white transition-transform hover:scale-105 hover:bg-gray-600 focus:outline-none'
          >
            <FaSearch size={20} />
          </button>
        </form>

        <div ref={searchElementRef}></div>

        <style jsx global>{`
          .gsc-control-cse.gsc-control-cse-en {
            background-color: white !important;
            border: none !important;
          }
          .gsc-result {
            border-bottom: 1px solid #e0e0e0;
            padding: 15px 0;
          }
          .gs-title {
            color: #1a0dab;
            text-decoration: none;
            font-size: 18px;
          }
          .gs-snippet {
            color: #545454;
            font-size: 14px;
            line-height: 1.4;
          }
          .gsc-url-top {
            color: #006621;
            font-size: 13px;
          }
          .gsc-cursor-page {
            color: #1a0dab;
            padding: 5px 10px;
            border: 1px solid #ccc;
            margin-right: 5px;
            cursor: pointer;
          }
          .gsc-cursor-current-page {
            color: #000;
            font-weight: bold;
          }
          .gsc-search-box {
            display: none !important;
          }
        `}</style>
      </div>

      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-2121612-2'></div>
      </div>
    </div>
  );
}

export default Search;

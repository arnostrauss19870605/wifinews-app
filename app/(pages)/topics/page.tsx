'use client';
import React, { useEffect, useState } from 'react';
import {
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaCommentDots,
  FaSort,
  FaSortAmountDownAlt,
  FaSortAmountUp,
} from 'react-icons/fa';
import { BiSolidCategory } from 'react-icons/bi';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';

export interface Category {
  id: number;
  name: string;
}

export interface Topic {
  id: number;
  title: string;
  createdAt: string;
  category: Category;
}

const TopicsMainScreen = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [order, setOrder] = useState('desc');
  const topicsPerPage = 10;

  const fetchTopics = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics?search=${searchTerm}&categoryId=${selectedCategory}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${topicsPerPage}`
      );
      const data = await response.json();

      setTimeout(() => {
        if (data?.topics && typeof data.totalCount === 'number') {
          setTopics(data.topics);
          setTotalPages(Math.ceil(data.totalCount / topicsPerPage));
        } else {
          setTopics([]);
          setTotalPages(1);
        }
        setIsLoading(false);
      }, 0);
    } catch (error) {
      setTopics([]);
      setTotalPages(1);
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/categories`
      );
      const data = await response.json();
      if (data) {
        setCategories(data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      setCategories([]);
    }
  };

  const handleSearchClick = () => {
    fetchTopics();
  };

  useEffect(() => {
    fetchTopics();
  }, [selectedCategory, currentPage, sortBy, order]);

  useEffect(() => {
    if (searchTerm === '') {
      fetchTopics();
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      {/* --- Load GPT Library --- */}
      <Script
        src='https://securepubads.g.doubleclick.net/tag/js/gpt.js'
        strategy='afterInteractive'
        async
      />

      {/* --- GPT Topics Configuration --- */}
      <Script id='gpt-topics-setup' strategy='afterInteractive'>
        {`
          window.googletag = window.googletag || { cmd: [] };
          googletag.cmd.push(function () {
            const utmParams = ${JSON.stringify(getUtmParams())};
            const utm_medium = utmParams['Medium'] || "";
            
            var mapping1 = googletag.sizeMapping()
              .addSize([0, 0], [[0, 0]])
              .addSize([300, 0], [[300,50],[300,100],[320,50],[320,100],[300,250],'fluid',[300,600]])
              .addSize([400, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[300,600]])
              .addSize([600, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[300,600]])
              .addSize([700, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[300,600]])
              .addSize([1000, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[300,600],[468,60],[728,90]])
              .addSize([1200, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[300,600],[336,280],[468,60],[728,90]])
              .addSize([1400, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[300,600],[468,60],[728,90]])
              .addSize([1600, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[300,600],[336,280],[468,60],[728,90]])
              .addSize([2000, 0], ['fluid',[300,50],[300,250],[300,600],[300,100],[320,50],[320,100],[336,280],[468,60],[728,90]])
              .build();
              
            var mapping3 = googletag.sizeMapping()
              .addSize([0, 0], [[0, 0]])
              .addSize([300, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250]])
              .addSize([400, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280]])
              .addSize([600, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60]])
              .addSize([700, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60]])
              .addSize([1000, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]])
              .addSize([1200, 0], ['fluid',[300,250],[300,50],[300,100],[320,50],[320,100],[336,280],[468,60],[728,90]])
              .addSize([1400, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]])
              .addSize([1600, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]])
              .addSize([2000, 0], ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]])
              .build();
            
            // Define the Topics ad slots:
            // 1. Topics Middle300x250 slot:
            googletag.defineSlot(
              '/22047902240/wifinews/topics_middle300x250',
              ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[300,600],[336,280],[468,60],[728,90]],
              'div-gpt-ad-2159374-3'
            )
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
            
            // 2. Topics Top300x250 slot:
            googletag.defineSlot(
              '/22047902240/wifinews/topics_top300x250',
              ['fluid', [320, 50], [320, 100], [300, 250], [468, 60], [728, 90]],
              'div-gpt-ad-2159374-2'
            )
              .defineSizeMapping(mapping1)
              .addService(googletag.pubads());
            
            // 3. Topics Top320x50 slot:
            googletag.defineSlot(
              '/22047902240/wifinews/topics_top320x50',
              ['fluid',[300,50],[300,100],[320,50],[320,100],[300,250],[336,280],[468,60],[728,90]],
              'div-gpt-ad-2159374-1'
            )
              .defineSizeMapping(mapping3)
              .addService(googletag.pubads());
            
            googletag.pubads().enableSingleRequest();
            googletag.pubads().setTargeting('Medium', [utm_medium]);
            googletag.pubads().collapseEmptyDivs();
            googletag.pubads().setCentering(true);
            googletag.enableServices();
          });
        `}
      </Script>

      {/* --- Top Ad Slot (Topics Top320x50) placed above the header --- */}
      <div className='my-4 flex w-full items-center justify-center'>
        <div id='div-gpt-ad-2159374-1'>
          <Script id='display-slot-2159374-1-top' strategy='afterInteractive'>
            {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-1'); });`}
          </Script>
        </div>
      </div>

      <div className='min-h-screen px-4 pb-8 pt-2'>
        <h1 className='mb-12 mt-2 text-center text-4xl font-bold text-gray-800'>
          Discussion Topics
        </h1>
        <div className='mb-4 w-full'>
          <div className='relative flex items-center'>
            <input
              type='text'
              placeholder='Search topics...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className='w-full rounded-full border border-gray-300 py-3 pl-4 pr-4 text-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black'
            />
            <button
              onClick={handleSearchClick}
              className='ml-2 flex items-center justify-center rounded-full bg-black p-4 text-white hover:bg-gray-800'
            >
              <FaSearch />
            </button>
          </div>
        </div>
        <div className='mb-8 flex flex-wrap items-center justify-center gap-4 sm:flex-nowrap'>
          <div className='relative w-full'>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className='w-full appearance-none rounded-full border border-gray-300 py-3 pl-4 pr-10 text-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black'
            >
              <option value=''>All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <BiSolidCategory className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400' />
          </div>
          <div className='relative w-full'>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className='w-full appearance-none rounded-full border border-gray-300 py-3 pl-4 pr-10 text-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black'
            >
              <option value='date'>Sort by Date</option>
              <option value='name'>Sort by Name</option>
              <option value='category'>Sort by Category</option>
            </select>
            <FaSort className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400' />
          </div>
          <div className='relative w-full'>
            <select
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className='w-full appearance-none rounded-full border border-gray-300 py-3 pl-4 pr-10 text-gray-700 shadow-sm focus:border-black focus:outline-none focus:ring-2 focus:ring-black'
            >
              <option value='asc'>Ascending</option>
              <option value='desc'>Descending</option>
            </select>
            {order === 'asc' ? (
              <FaSortAmountUp className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400' />
            ) : (
              <FaSortAmountDownAlt className='pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400' />
            )}
          </div>
        </div>

        {/* --- Insert Mid Ad Slot (Topics Middle300x250) above the topics table --- */}
        <div className='mb-4 flex w-full items-center justify-center'>
          <div id='div-gpt-ad-2159374-3'>
            <Script id='display-slot-2159374-3' strategy='afterInteractive'>
              {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-3'); });`}
            </Script>
          </div>
        </div>

        <div className='overflow-hidden rounded-lg shadow-md'>
          <div className='overflow-x-auto'>
            <table className='min-w-full table-fixed border-collapse bg-white'>
              <thead>
                <tr className='bg-gray-200'>
                  <th className='min-w-[350px] border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                    Topic Name
                  </th>
                  <th className='w-1/4 border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                    Category
                  </th>
                  <th className='w-1/4 border-b-2 border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700'>
                    Date Created
                  </th>
                  <th className='sticky right-0 border-b-2 border-gray-300 bg-black px-4 py-3 text-center text-sm font-semibold text-white'>
                    Comment
                  </th>
                </tr>
              </thead>
              <tbody>
                {isLoading
                  ? Array.from({ length: 10 }, (_, i) => (
                      <tr key={i} className='transition-colors duration-200'>
                        <td className='border-b border-gray-300 px-4 py-4'>
                          <div className='h-4 w-full rounded bg-gray-200'></div>
                        </td>
                        <td className='border-b border-gray-300 px-4 py-4'>
                          <div className='h-4 w-full rounded bg-gray-200'></div>
                        </td>
                        <td className='border-b border-gray-300 px-4 py-4'>
                          <div className='h-4 w-full rounded bg-gray-200'></div>
                        </td>
                        <td className='sticky right-0 border-b border-gray-300 bg-black px-4 py-4'>
                          <FaCommentDots className='mx-auto text-lg text-white' />
                        </td>
                      </tr>
                    ))
                  : topics.map((topic) => (
                      <tr
                        key={topic.id}
                        className='cursor-pointer transition-colors duration-200 hover:bg-gray-100'
                        onClick={() =>
                          (window.location.href = `/topics/${topic.id}`)
                        }
                      >
                        <td
                          className={`border-b border-gray-300 px-4 py-4 text-sm text-gray-800 ${
                            topic.title.length > 40
                              ? 'max-w-[240px] overflow-hidden text-ellipsis whitespace-nowrap'
                              : ''
                          }`}
                        >
                          {topic.title}
                        </td>
                        <td className='border-b border-gray-300 px-4 py-4 text-sm text-gray-800'>
                          {topic.category.name}
                        </td>
                        <td className='border-b border-gray-300 px-4 py-4 text-sm text-gray-800'>
                          {new Date(topic.createdAt).toLocaleDateString()}
                        </td>
                        <td className='sticky right-0 border-b border-gray-300 bg-black px-4 py-4 text-center'>
                          <FaCommentDots className='mx-auto text-lg text-white' />
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className='mt-8 flex items-center justify-between'>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className='flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-white transition-colors duration-200 hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400'
          >
            <FaChevronLeft /> Previous
          </button>
          <span className='text-sm text-gray-700'>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className='flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-white transition-colors duration-200 hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400'
          >
            Next <FaChevronRight />
          </button>
        </div>
      </div>

      {/* --- Sticky Ad Slot (Topics Top300x250) placed at the bottom --- */}
      <div
        className='fixed bottom-5 left-1/2 z-50 -translate-x-1/2 transform'
        style={{ marginBottom: '0px' }}
      >
        <div id='div-gpt-ad-2159374-2' className='mx-auto'>
          <Script id='display-slot-2159374-2' strategy='afterInteractive'>
            {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-2'); });`}
          </Script>
        </div>
      </div>
    </>
  );
};

export default TopicsMainScreen;

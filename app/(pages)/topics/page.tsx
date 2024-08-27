'use client';
import React, { useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import mockTopics from '@/app/_data/mock-topics';

const TopicsMainScreen = () => {
  const [topics, setTopics] = useState(mockTopics);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const topicsPerPage = 10;

  const filteredTopics = topics.filter(
    (topic) =>
      topic.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedCategory || topic.category === selectedCategory)
  );

  const indexOfLastTopic = currentPage * topicsPerPage;
  const indexOfFirstTopic = indexOfLastTopic - topicsPerPage;
  const currentTopics = filteredTopics.slice(
    indexOfFirstTopic,
    indexOfLastTopic
  );

  const totalPages = Math.ceil(filteredTopics.length / topicsPerPage);

  return (
    <div className='min-h-screen px-4 py-8'>
      <h1 className='mb-6 text-3xl font-extrabold text-gray-900'>
        Discussion Topics
      </h1>

      {/* Search and Filter Section */}
      <div className='mb-6 flex flex-col justify-between space-y-4 sm:flex-row sm:space-x-6 sm:space-y-0'>
        <div className='relative flex-1'>
          <input
            type='text'
            placeholder='Search topics...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-gray-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black'
          />
          <FaSearch className='absolute left-4 top-1/2 -translate-y-1/2 transform text-gray-500' />
        </div>

        <div className='relative w-full sm:w-1/3'>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='w-full rounded-lg border border-gray-300 py-3 pl-4 pr-10 text-gray-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black'
          >
            <option value=''>All Categories</option>
            <option value='Environment'>Environment</option>
            <option value='Technology'>Technology</option>
            <option value='Finance'>Finance</option>
          </select>
        </div>
      </div>

      {/* Topics Table */}
      <div className='overflow-x-auto rounded-lg shadow-sm'>
        <table className='min-w-full border-collapse rounded-lg bg-white'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border-b-2 border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                Topic Name
              </th>
              <th className='border-b-2 border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                Date Created
              </th>
              <th className='border-b-2 border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                Comments
              </th>
              <th className='border-b-2 border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                Category
              </th>
            </tr>
          </thead>
          <tbody>
            {currentTopics.map((topic) => (
              <tr
                key={topic.id}
                className='cursor-pointer transition-colors duration-200 hover:bg-gray-100'
                onClick={() => {
                  /* Navigate to topic detail page */
                }}
              >
                <td className='border-b border-gray-300 px-6 py-4 text-sm text-gray-800'>
                  {topic.name}
                </td>
                <td className='border-b border-gray-300 px-6 py-4 text-sm text-gray-800'>
                  {topic.dateCreated}
                </td>
                <td className='border-b border-gray-300 px-6 py-4 text-sm text-gray-800'>
                  {topic.commentsCount}
                </td>
                <td className='border-b border-gray-300 px-6 py-4 text-sm text-gray-800'>
                  {topic.category}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className='mt-6 flex items-center justify-between'>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className='rounded-lg bg-gray-900 px-5 py-2 text-white transition-colors duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400'
        >
          <FaChevronLeft className='mr-2 inline' /> Previous
        </button>
        <span className='text-sm text-gray-700'>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className='rounded-lg bg-gray-900 px-5 py-2 text-white transition-colors duration-200 hover:bg-gray-700 disabled:cursor-not-allowed disabled:bg-gray-400'
        >
          Next <FaChevronRight className='ml-2 inline' />
        </button>
      </div>
    </div>
  );
};

export default TopicsMainScreen;

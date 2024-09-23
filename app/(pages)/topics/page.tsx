'use client';
import React, { useEffect, useState } from 'react';
import { FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export interface Category {
  id: number;
  name: string;
}

export interface Topic {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  category: Category;
}

const TopicsMainScreen = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('date');
  const [order, setOrder] = useState('asc');
  const topicsPerPage = 10;
  const router = useRouter();

  const fetchTopics = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics?search=${searchTerm}&categoryId=${selectedCategory}&sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${topicsPerPage}`
      );
      const data = await response.json();
      if (Array.isArray(data)) {
        setTopics(data);
      } else {
        setTopics([]); // Fallback to an empty array if data is not in the expected format
      }
      const totalItems = response.headers.get('x-total-count') || data.length;
      setTotalPages(Math.ceil(totalItems / topicsPerPage));
    } catch (error) {
      console.error('Failed to fetch topics:', error);
      setTopics([]); // Set to an empty array in case of error
    }
  };

  useEffect(() => {
    fetchTopics();
  }, [searchTerm, selectedCategory, currentPage, sortBy, order]);

  const handleRowClick = (id: number) => {
    router.push(`/topics/${id}`);
  };

  return (
    <div className='min-h-screen px-4 py-8'>
      <h1 className='mb-6 text-3xl font-extrabold text-gray-900'>
        Discussion Topics
      </h1>
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
            <option value='1'>Environment</option>
            <option value='2'>Technology</option>
            <option value='3'>Finance</option>
          </select>
        </div>
      </div>
      <div className='mb-4 flex items-center space-x-4'>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className='w-40 rounded-lg border border-gray-300 py-2 pl-4 text-gray-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black'
        >
          <option value='date'>Sort by Date</option>
          <option value='name'>Sort by Name</option>
          <option value='category'>Sort by Category</option>
        </select>
        <select
          value={order}
          onChange={(e) => setOrder(e.target.value)}
          className='w-40 rounded-lg border border-gray-300 py-2 pl-4 text-gray-800 focus:border-black focus:outline-none focus:ring-2 focus:ring-black'
        >
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
      <div className='overflow-x-auto rounded-lg shadow-sm'>
        <table className='min-w-full border-collapse rounded-lg bg-white'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='border-b-2 border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                Topic Name
              </th>
              <th className='border-b-2 border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                Category
              </th>
              <th className='border-b-2 border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                Date Created
              </th>
              <th className='border-b-2 border-gray-300 px-6 py-4 text-left text-sm font-semibold text-gray-700'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {topics.map((topic) => (
              <tr
                key={topic.id}
                className='cursor-pointer transition-colors duration-200 hover:bg-gray-100'
              >
                <td className='border-b border-gray-300 px-6 py-4 text-sm text-gray-800'>
                  {topic.title}
                </td>
                <td className='border-b border-gray-300 px-6 py-4 text-sm text-gray-800'>
                  {topic.category.name}
                </td>
                <td className='border-b border-gray-300 px-6 py-4 text-sm text-gray-800'>
                  {new Date(topic.createdAt).toLocaleDateString()}
                </td>
                <td className='border-b border-gray-300 px-6 py-4 text-sm text-gray-800'>
                  <button
                    className='rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600'
                    onClick={() => handleRowClick(topic.id)}
                  >
                    Comment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
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

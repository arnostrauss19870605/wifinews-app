'use client';
import React, { useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';

export interface Topic {
  id: number;
  title: string;
  createdAt: string;
  category: { id: number; name: string };
}

const RecentTopics = () => {
  const [isLoading, setIsLoading] = useState(false);
  const topics: Topic[] = [
    {
      id: 1,
      title: 'Understanding React Hooks in Depth',
      createdAt: '2023-09-25T10:00:00Z',
      category: { id: 1, name: 'React' },
    },
    {
      id: 2,
      title: 'Exploring Next.js 13 Features',
      createdAt: '2023-09-20T12:00:00Z',
      category: { id: 2, name: 'Next.js' },
    },
    {
      id: 3,
      title: 'Understanding React Hooks in Depth',
      createdAt: '2023-09-25T10:00:00Z',
      category: { id: 1, name: 'React' },
    },
    {
      id: 4,
      title: 'Exploring Next.js 13 Features',
      createdAt: '2023-09-20T12:00:00Z',
      category: { id: 2, name: 'Next.js' },
    },
    {
      id: 5,
      title: 'Understanding React Hooks in Depth',
      createdAt: '2023-09-25T10:00:00Z',
      category: { id: 1, name: 'React' },
    },
  ];

  const handleRowClick = (id: number) => {
    console.log(`Navigated to topic with id: ${id}`);
  };

  return (
    <div className='overflow-hidden rounded-t-lg shadow-md'>
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
                    onClick={() => handleRowClick(topic.id)}
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
  );
};

export default RecentTopics;

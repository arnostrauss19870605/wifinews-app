'use client';
import React, { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';

export interface Topic {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  category: { id: number; name: string };
}

interface RecentTopicsProps {
  howMany?: number;
}

const RecentTopics: React.FC<RecentTopicsProps> = ({ howMany = 5 }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchRecentTopics = async (count: number) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/recent/${count}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch recent topics');
      }
      const data: Topic[] = await response.json();
      setTopics(data);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentTopics(howMany);
  }, [howMany]);

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
            {isLoading ? (
              Array.from({ length: 5 }, (_, i) => (
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
            ) : error ? (
              <tr>
                <td colSpan={4} className='px-4 py-4 text-center text-red-500'>
                  {error}
                </td>
              </tr>
            ) : (
              topics.map((topic) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentTopics;

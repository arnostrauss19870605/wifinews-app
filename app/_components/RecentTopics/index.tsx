'use client';
import React, { useEffect, useState } from 'react';
import { FaCommentDots } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();

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
    router.push(`/topics/${id}`);
  };

  return (
    <div className='overflow-hidden rounded-md shadow'>
      <div className='overflow-x-auto'>
        <table className='min-w-full table-fixed border-collapse bg-white'>
          <thead>
            <tr className='bg-gray-200'>
              <th className='min-w-[250px] border-b border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700'>
                Topic Name
              </th>
              <th className='w-1/4 border-b border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700'>
                Category
              </th>
              <th className='w-1/4 border-b border-gray-300 px-3 py-2 text-left text-xs font-semibold text-gray-700'>
                Date Created
              </th>
              <th className='sticky right-0 border-b border-gray-300 bg-black px-3 py-2 text-center text-xs font-semibold text-white'>
                Comment
              </th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array.from({ length: 5 }, (_, i) => (
                <tr key={i} className='transition-colors duration-200'>
                  <td className='border-b border-gray-300 px-3 py-3'>
                    <div className='h-3 w-full rounded bg-gray-200'></div>
                  </td>
                  <td className='border-b border-gray-300 px-3 py-3'>
                    <div className='h-3 w-full rounded bg-gray-200'></div>
                  </td>
                  <td className='border-b border-gray-300 px-3 py-3'>
                    <div className='h-3 w-full rounded bg-gray-200'></div>
                  </td>
                  <td className='sticky right-0 border-b border-gray-300 bg-black px-3 py-3'>
                    <FaCommentDots className='mx-auto text-sm text-white' />
                  </td>
                </tr>
              ))
            ) : error ? (
              <tr>
                <td colSpan={4} className='px-3 py-3 text-center text-red-500'>
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
                    className={`border-b border-gray-300 px-3 py-3 text-xs text-gray-800 ${
                      topic.title.length > 40
                        ? 'max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap'
                        : ''
                    }`}
                  >
                    {topic.title}
                  </td>
                  <td className='border-b border-gray-300 px-3 py-3 text-xs text-gray-800'>
                    {topic.category.name}
                  </td>
                  <td className='border-b border-gray-300 px-3 py-3 text-xs text-gray-800'>
                    {new Date(topic.createdAt).toLocaleDateString()}
                  </td>
                  <td className='sticky right-0 border-b border-gray-300 bg-black px-3 py-3 text-center'>
                    <FaCommentDots className='mx-auto text-sm text-white' />
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

'use client';
import React, { useState, useEffect } from 'react';
import {
  FaThumbsUp,
  FaThumbsDown,
  FaUser,
  FaSort,
  FaSortAmountUp,
  FaSortAmountDown,
} from 'react-icons/fa';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/_context/authContext';
import Link from 'next/link';
import Script from 'next/script';
import { getUtmParams } from '@/app/_utils/utm.util';
import isLocalStorageAvailable from '@/app/_utils/local-storage.util';

type UserResponseDto = {
  id: number;
  email: string;
  firstname: string;
  lastname: string;
};

type Comment = {
  id: number;
  content: string;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  user: UserResponseDto;
  topicId: number;
};

type CommentResponseDto = {
  comments: Comment[];
  count: number;
};

export interface Category {
  id: number;
  name: string;
}

type TopicDetailDto = {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  category: Category;
};

const TopicDetailPage = () => {
  const { user, isAuthenticated } = useAuth();
  const [topic, setTopic] = useState<TopicDetailDto | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'upvotes' | 'downvotes'>(
    'date'
  );
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const commentsPerPage = 10;

  const params = useParams();
  const topicId = params.id;

  useEffect(() => {
    if (topicId) {
      fetchTopicDetails();
      fetchComments();
    }
  }, [topicId, sortBy, order, currentPage]);

  const fetchTopicDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/topics/${topicId}`
      );
      const data: TopicDetailDto = await response.json();
      setTopic(data);
    } catch (error) {
      setTopic(null);
    } finally {
      setLoading(false);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${topicId}?sortBy=${sortBy}&order=${order}&page=${currentPage}&limit=${commentsPerPage}`
      );
      const data: CommentResponseDto = await response.json();
      setComments(data.comments);
      setTotalPages(Math.ceil(data.count / commentsPerPage));
    } catch (error) {
      setComments([]);
    }
  };

  const handleAddComment = async () => {
    if (isLocalStorageAvailable() && newComment.trim() && topicId) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/${topicId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ content: newComment }),
          }
        );
        if (response.ok) {
          setNewComment('');
          fetchComments();
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    }
  };

  const handleVote = async (commentId: number, type: 'upvote' | 'downvote') => {
    try {
      if (isLocalStorageAvailable()) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/comments/vote/${commentId}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ type }),
          }
        );
        if (response.ok) {
          fetchComments();
        }
      }
    } catch (error) {
      console.error('Error voting on comment:', error);
    }
  };

  const handleSort = (key: 'date' | 'upvotes' | 'downvotes') => {
    if (sortBy === key) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setOrder('desc');
    }
  };

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
              
            var mapping4 = googletag.sizeMapping()
              .addSize([1400, 0], [[728, 90], 'fluid'])
              .addSize([1200, 0], [[728, 90], 'fluid'])
              .addSize([1000, 0], [[728, 90], 'fluid'])
              .addSize([700, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([600, 0], ['fluid', [468, 60], [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([400, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
              .addSize([300, 0], ['fluid', [320, 50], [300, 50], [320, 100], [300, 100], [300, 250]])
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
              .defineSizeMapping(mapping4)
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
          <Script id='display-slot-2159374-1' strategy='afterInteractive'>
            {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-1'); });`}
          </Script>
        </div>
      </div>

      <div style={{ minHeight: 'calc(100vh - 220px)', padding: '16px' }}>
        {loading ? (
          <div className='space-y-6'>
            <div className='animate-pulse space-y-4'>
              <div className='h-8 w-3/4 rounded bg-gray-300'></div>
              <div className='h-4 w-1/2 rounded bg-gray-300'></div>
              <div className='h-6 w-full rounded bg-gray-300'></div>
              <div className='h-6 w-full rounded bg-gray-300'></div>
              <div className='h-6 w-full rounded bg-gray-300'></div>
            </div>
            <div className='animate-pulse space-y-4'>
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className='rounded-lg border border-gray-300 p-4'
                >
                  <div className='flex items-center space-x-4'>
                    <div className='h-8 w-8 rounded-full bg-gray-300'></div>
                    <div className='h-4 w-1/4 rounded bg-gray-300'></div>
                  </div>
                  <div className='mt-4 h-4 w-3/4 rounded bg-gray-300'></div>
                  <div className='mt-2 h-4 w-1/2 rounded bg-gray-300'></div>
                </div>
              ))}
            </div>
          </div>
        ) : topic ? (
          <>
            <h1 className='mb-6 text-3xl font-extrabold'>{topic.title}</h1>
            <div className='mb-6 rounded-lg border border-gray-300 p-6'>
              <div className='mb-4'>
                <span className='font-semibold'>Category:</span>{' '}
                {topic.category.name}
              </div>
              <div className='mb-4'>
                <span className='font-semibold'>Created on:</span>{' '}
                {new Date(topic.createdAt).toLocaleDateString()}
              </div>
              <p className='leading-relaxed text-gray-700'>
                {topic.description}
              </p>
            </div>

            {/* --- Insert Mid Ad Slot (Topics Middle300x250) after the topic details --- */}
            <div className='mb-4 flex w-full items-center justify-center'>
              <div id='div-gpt-ad-2159374-3'>
                <Script id='display-slot-2159374-3' strategy='afterInteractive'>
                  {`googletag.cmd.push(function() { googletag.display('div-gpt-ad-2159374-3'); });`}
                </Script>
              </div>
            </div>

            {!isAuthenticated ? (
              <div
                className='mb-6 border-l-4 border-gray-500 bg-gray-100 p-4 text-gray-700'
                role='alert'
              >
                <p className='mb-2 font-bold'>Login Request</p>
                <p>
                  If you want to take part in the discussion, please{' '}
                  <Link
                    href='/login'
                    className='text-[#FF4644] hover:underline'
                  >
                    Log In
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className='mb-6'>
                <h3 className='mb-4 text-xl font-semibold'>Add a Comment</h3>
                <textarea
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder='Type your comment here...'
                  className='mb-4 w-full rounded-lg border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-black'
                  rows={4}
                />
                <button
                  onClick={handleAddComment}
                  className='rounded-lg bg-black px-5 py-2 text-white transition duration-200 hover:bg-gray-800'
                >
                  Post Comment
                </button>
              </div>
            )}

            {Array.isArray(comments) && comments.length > 0 && (
              <>
                <h2 className='mb-4 text-2xl font-semibold'>Comments</h2>
                <div className='mb-4 flex flex-row items-center space-x-4 space-y-0'>
                  <div className='relative inline-flex w-full items-center md:w-auto'>
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        handleSort(
                          e.target.value as 'date' | 'upvotes' | 'downvotes'
                        )
                      }
                      className='w-full appearance-none rounded-lg border border-gray-300 p-2 pr-8 text-sm transition duration-200 focus:outline-none focus:ring-2 focus:ring-black md:w-auto'
                    >
                      <option value='date'>Sort by Date</option>
                      <option value='upvotes'>Sort by Upvotes</option>
                      <option value='downvotes'>Sort by Downvotes</option>
                    </select>
                    <FaSort className='pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-600' />
                  </div>
                  <button
                    onClick={() => handleSort(sortBy)}
                    className='flex min-h-[37px] items-center gap-2 rounded-lg bg-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-300'
                  >
                    {order === 'asc' ? (
                      <FaSortAmountUp size={16} />
                    ) : (
                      <FaSortAmountDown size={16} />
                    )}
                  </button>
                </div>

                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className='mb-4 rounded-lg border border-gray-300 p-4 md:p-6'
                  >
                    <div className='mb-3 flex items-center'>
                      <FaUser className='mr-2 text-gray-600' />
                      <span className='font-semibold'>
                        {comment.user.firstname} {comment.user.lastname}
                      </span>
                      <span className='ml-4 text-sm text-gray-500'>
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className='mb-4 leading-relaxed text-gray-700'>
                      {comment.content}
                    </p>
                    <div className='flex flex-col items-start space-y-2 md:flex-row md:items-center md:justify-between md:space-y-0'>
                      <div className='flex space-x-3'>
                        <button
                          onClick={() => handleVote(comment.id, 'upvote')}
                          className='flex items-center justify-center rounded-lg bg-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-300'
                        >
                          <FaThumbsUp className='mr-2' /> Upvote (
                          {comment.upvotes})
                        </button>
                        <button
                          onClick={() => handleVote(comment.id, 'downvote')}
                          className='flex items-center justify-center rounded-lg bg-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-300'
                        >
                          <FaThumbsDown className='mr-2' /> Downvote (
                          {comment.downvotes})
                        </button>
                      </div>
                      <span className='text-gray-600'>
                        Upvotes: {comment.upvotes} | Downvotes:{' '}
                        {comment.downvotes}
                      </span>
                    </div>
                  </div>
                ))}
              </>
            )}

            {Array.isArray(comments) && comments.length > 0 && (
              <div className='mt-8 flex items-center justify-between'>
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className='flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2 text-white transition-colors duration-200 hover:bg-black disabled:cursor-not-allowed disabled:bg-gray-400'
                >
                  Previous
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
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className='text-center text-2xl font-bold text-black'>
            404 Error - No Topic Found
          </div>
        )}
      </div>

      {/* --- Sticky Ad Slot (Topics Top300x250) placed at the bottom --- */}
      <div
        className='fixed bottom-0 left-1/2 z-50 -translate-x-1/2 transform'
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

export default TopicDetailPage;

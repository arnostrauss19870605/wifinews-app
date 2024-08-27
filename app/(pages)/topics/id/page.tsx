'use client';
import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaUser } from 'react-icons/fa';
import mockTopic from '@/app/_data/mock-single-topic';

const SingleTopicPage = () => {
  const [topic, setTopic] = useState(mockTopic);
  const [newComment, setNewComment] = useState('');

  const handleVote = (commentId: any, increment: any) => {
    setTopic((prevTopic) => ({
      ...prevTopic,
      comments: prevTopic.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, votes: comment.votes + increment }
          : comment
      ),
    }));
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: topic.comments.length + 1,
        user: 'CurrentUser', // Replace with actual user data
        content: newComment,
        votes: 0,
      };
      setTopic((prevTopic) => ({
        ...prevTopic,
        comments: [...prevTopic.comments, newCommentObj],
      }));
      setNewComment('');
    }
  };

  return (
    <div style={{ minHeight: 'calc(100vh - 220px)', padding: '16px' }}>
      <h1 className='mb-6 text-3xl font-extrabold'>{topic.name}</h1>

      {/* Topic Details */}
      <div className='mb-6 rounded-lg border border-gray-300 p-6'>
        <div className='mb-4'>
          <span className='font-semibold'>Category:</span> {topic.category}
        </div>
        <div className='mb-4'>
          <span className='font-semibold'>Created on:</span> {topic.dateCreated}
        </div>
        <p className='leading-relaxed text-gray-700'>{topic.content}</p>
      </div>

      {/* Add Comment Section */}
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

      {/* Comments Section */}
      <h2 className='mb-4 text-2xl font-semibold'>Comments</h2>
      {topic.comments.map((comment) => (
        <div
          key={comment.id}
          className='mb-4 rounded-lg border border-gray-300 p-6'
        >
          <div className='mb-3 flex items-center'>
            <FaUser className='mr-2 text-gray-600' />
            <span className='font-semibold'>{comment.user}</span>
          </div>
          <p className='mb-4 leading-relaxed text-gray-700'>
            {comment.content}
          </p>
          <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
            <div className='mb-4 space-y-3 sm:mb-0 sm:flex sm:space-x-3 sm:space-y-0'>
              <button
                onClick={() => handleVote(comment.id, 1)}
                className='flex items-center justify-center rounded-lg bg-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-300'
              >
                <FaThumbsUp className='mr-2' /> Upvote
              </button>
              <button
                onClick={() => handleVote(comment.id, -1)}
                className='flex items-center justify-center rounded-lg bg-gray-200 px-4 py-2 transition duration-200 hover:bg-gray-300'
              >
                <FaThumbsDown className='mr-2' /> Downvote
              </button>
            </div>
            <span className='text-gray-600'>Votes: {comment.votes}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SingleTopicPage;

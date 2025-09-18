import React from 'react';

function PostList({ posts, onSelectPost, onLikePost }) {
  if (posts.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-xl font-medium text-gray-600">لا توجد منشورات بعد</h3>
        <p className="text-gray-500">كن أول من ينشر في المجتمع!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200">
          <h2 className="text-xl font-semibold mb-2 text-gray-800 leading-relaxed break-all">{post.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{post.content}</p>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onLikePost(post.id)}
                className="flex items-center text-gray-500 hover:text-red-500 transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill={post.liked ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>{post.likes || 0}</span>
              </button>
              <button 
                onClick={() => onSelectPost(post.id)}
                className="flex items-center text-gray-500 hover:text-blue-500 transition duration-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span>{post.comments ? post.comments.length : 0}</span>
              </button>
            </div>
            <button
              onClick={() => onSelectPost(post.id)}
              className="bg-indigo-100 py-2 px-4 rounded-lg hover:bg-emerald-200 transition duration-200"
            >
              قراءة المزيد
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostList;
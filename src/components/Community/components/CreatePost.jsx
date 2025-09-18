import React, { useState } from 'react';

function CreatePost({ onSubmit, onCancel }) {
  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPost.title && newPost.content) {
      onSubmit(newPost);
    }
  };

  return (
    <div>
      <button
        onClick={onCancel}
        className="flex items-center text-gray-600 hover:text-indigo-600 mb-6 transition duration-200"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        العودة إلى القائمة
      </button>

      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">إنشاء منشور جديد</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-medium mb-2">عنوان المنشور</label>
            <input
              type="text"
              id="title"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="أدخل عنوانًا جذابًا..."
              value={newPost.title}
              onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="content" className="block text-gray-700 font-medium mb-2">محتوى المنشور</label>
            <textarea
              id="content"
              rows="6"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="ماذا تريد أن تقول للمجتمع؟"
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
            ></textarea>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-200 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-300 transition duration-200"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition duration-200"
            >
              نشر
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
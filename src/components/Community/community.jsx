import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import CreatePost from './components/CreatePost';
import { getPosts, getPost, createPost, addComment, likePost } from './api';

export default function Community() {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'detail', 'create'

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const postsData = await getPosts();
      setPosts(postsData);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSelectPost = async (postId) => {
    try {
      const post = await getPost(postId);
      setSelectedPost(post);
      setView('detail');
    } catch (error) {
      console.error('Error fetching post:', error);
    }
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedPost(null);
  };

  const handleCreatePost = async (newPost) => {
    try {
      await createPost(newPost);
      fetchPosts(); // Refresh the list
      setView('list');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleAddComment = async (postId, comment) => {
    try {
      await addComment(postId, comment);
      // Refresh the post details
      if (selectedPost && selectedPost.id === postId) {
        const updatedPost = await getPost(postId);
        setSelectedPost(updatedPost);
      }
      // Refresh the list to update comment counts
      fetchPosts();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  const handleLikePost = async (postId) => {
    try {
      await likePost(postId);
      // Refresh the post details
      if (selectedPost && selectedPost.id === postId) {
        const updatedPost = await getPost(postId);
        setSelectedPost(updatedPost);
      }
      // Refresh the list to update like counts
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <header className="text-center mb-8">
          <br></br><br></br>
          <h1 className="text-4xl font-bold text-emerald-900 mb-2">مجتمعنا</h1>
          <p className="text-gray-600">مكان لتبادل الأفكار والمناقشات</p>
        </header>

        {view === 'list' && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">أحدث المنشورات</h2>
              <button
                onClick={() => setView('create')}
                className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-900 transition duration-200 flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                منشور جديد
              </button>
            </div>
            <PostList 
              posts={posts} 
              onSelectPost={handleSelectPost}
              onLikePost={handleLikePost}
            />
          </div>
        )}

        {view === 'detail' && (
          <PostDetail 
            post={selectedPost}
            onBack={handleBackToList}
            onAddComment={handleAddComment}
            onLikePost={handleLikePost}
          />
        )}

        {view === 'create' && (
          <CreatePost 
            onSubmit={handleCreatePost}
            onCancel={handleBackToList}
          />
        )}
      </div>
    </div>
  );
}
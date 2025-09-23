// // import React, { useState, useEffect } from 'react';
// // import PostList from './components/PostList';
// // import PostDetail from './components/PostDetail';
// // import CreatePost from './components/CreatePost';
// // import { getPosts, getPost, createPost, addComment, likePost } from './api';

// // export default function Community() {
// //   const [posts, setPosts] = useState([]);
// //   const [selectedPost, setSelectedPost] = useState(null);
// //   const [view, setView] = useState('list'); // 'list', 'detail', 'create'

// //   useEffect(() => {
// //     fetchPosts();
// //   }, []);

// //   const fetchPosts = async () => {
// //     try {
// //       const postsData = await getPosts();
// //       setPosts(postsData);
// //     } catch (error) {
// //       console.error('Error fetching posts:', error);
// //     }
// //   };

// //   const handleSelectPost = async (postId) => {
// //     try {
// //       const post = await getPost(postId);
// //       setSelectedPost(post);
// //       setView('detail');
// //     } catch (error) {
// //       console.error('Error fetching post:', error);
// //     }
// //   };

// //   const handleBackToList = () => {
// //     setView('list');
// //     setSelectedPost(null);
// //   };

// //   const handleCreatePost = async (newPost) => {
// //     try {
// //       await createPost(newPost);
// //       fetchPosts(); // Refresh the list
// //       setView('list');
// //     } catch (error) {
// //       console.error('Error creating post:', error);
// //     }
// //   };

// //   const handleAddComment = async (postId, comment) => {
// //     try {
// //       await addComment(postId, comment);
// //       // Refresh the post details
// //       if (selectedPost && selectedPost.id === postId) {
// //         const updatedPost = await getPost(postId);
// //         setSelectedPost(updatedPost);
// //       }
// //       // Refresh the list to update comment counts
// //       fetchPosts();
// //     } catch (error) {
// //       console.error('Error adding comment:', error);
// //     }
// //   };

// //   const handleLikePost = async (postId) => {
// //     try {
// //       await likePost(postId);
// //       // Refresh the post details
// //       if (selectedPost && selectedPost.id === postId) {
// //         const updatedPost = await getPost(postId);
// //         setSelectedPost(updatedPost);
// //       }
// //       // Refresh the list to update like counts
// //       fetchPosts();
// //     } catch (error) {
// //       console.error('Error liking post:', error);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
// //       <div className="max-w-4xl mx-auto px-4">
// //         <header className="text-center mb-8">
// //           <br></br><br></br>
// //           <h1 className="text-4xl font-bold text-emerald-900 mb-2">مجتمعنا</h1>
// //           <p className="text-gray-600">مكان لتبادل الأفكار والمناقشات</p>
// //         </header>

// //         {view === 'list' && (
// //           <div>
// //             <div className="flex justify-between items-center mb-6">
// //               <h2 className="text-2xl font-semibold text-gray-800">أحدث المنشورات</h2>
// //               <button
// //                 onClick={() => setView('create')}
// //                 className="bg-emerald-500 text-white py-2 px-4 rounded-lg hover:bg-emerald-900 transition duration-200 flex items-center"
// //               >
// //                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
// //                 </svg>
// //                 منشور جديد
// //               </button>
// //             </div>
// //             <PostList 
// //               posts={posts} 
// //               onSelectPost={handleSelectPost}
// //               onLikePost={handleLikePost}
// //             />
// //           </div>
// //         )}

// //         {view === 'detail' && (
// //           <PostDetail 
// //             post={selectedPost}
// //             onBack={handleBackToList}
// //             onAddComment={handleAddComment}
// //             onLikePost={handleLikePost}
// //           />
// //         )}

// //         {view === 'create' && (
// //           <CreatePost 
// //             onSubmit={handleCreatePost}
// //             onCancel={handleBackToList}
// //           />
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useContext, useEffect } from 'react'
// import api from '../utils/axiosInstance'
// import { userContext } from '../../context/UserContext';
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import Loader from '../Loader/Loader';
// export default function Community() {
//   let { userTokenAccess } = useContext(userContext);
//   const [recipe, setRecipe] = useState([])
//   async function getRecipe() {
//     let { data } = await api.get(`/community/recipes/`, {
//       headers: {
//         Authorization: `Bearer ${userTokenAccess}`,
//       },

//     });
//     console.log();
//     setRecipe(data.recipes)
//   }
//   useEffect(() => {
//     getRecipe()
//   }, [])
//   return (
//     <>
//     {recipe.length == 0 ? <Loader/> :   <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
//         <div className="max-w-4xl mx-auto px-4">
//           <header className="text-center mb-8">
//             <br></br><br></br>
//             <h1 className="text-4xl font-bold text-emerald-900 mb-2">مجتمعنا</h1>
//             <p className="text-gray-600">مكان لتبادل الأفكار والمناقشات</p>
//             <Link to={'/createPost'}>اضف وصفة</Link>
//           </header>
//           {recipe.map((rec) => ( <div
//                 key={rec.id}
//                 className="bg-white shadow-md rounded-2xl p-4 border border-green-200 hover:shadow-lg transition"
//               >
//                 <h3 className="text-xl font-semibold text-green-800">{rec.title}</h3>
//                 <p className="text-gray-600 mt-2">{rec.description}</p>
//                 <div className="mt-3">
//                   <p className="font-semibold text-gray-800">🧾 Ingredients:</p>
//                   <pre className="bg-gray-100 rounded-lg p-2 text-sm whitespace-pre-wrap">
//                     {rec.ingredients}
//                   </pre>
//                 </div>
//                 <div className="mt-3">
//                   <p className="font-semibold text-gray-800">👨‍🍳 Instructions:</p>
//                   <p className="bg-gray-100 rounded-lg p-2 text-sm">{rec.instructions}</p>
//                 </div>
//               </div>))}
//         </div>
//       </div>}
    

//     </>
//   )
// }
import React, { useContext, useEffect, useState } from "react";
import api from "../utils/axiosInstance";
import { userContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import Loader from "../Loader/Loader";

export default function Recipe() {
  let { userTokenAccess } = useContext(userContext);
  const [recipes, setRecipes] = useState([]);

  async function getRecipes() {
    let { data } = await api.get(`/community/recipes/`, {
      headers: {
        Authorization: `Bearer ${userTokenAccess}`,
      },
    });
    setRecipes(data.recipes);
  }

  useEffect(() => {
    getRecipes();
  }, []);

  // أول n كلمات من الوصف
  function firstNWords(text, n = 10) {
    if (!text) return "";
    const words = text.split(/\s+/);
    if (words.length <= n) return text;
    return words.slice(0, n).join(" ") + "…";
  }

  return (
    <>
      {recipes.length === 0 ? (
        <Loader />
      ) : (
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-12 px-6 font-cairo" style={{marginTop: '-80px'}}>
          <div className="max-w-4xl mx-auto">
            <header className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-emerald-700 mb-4">
                مجتمعنا
              </h1>
              <p className="text-lg text-gray-600 mb-6">مكان لتبادل الأفكار والمناقشات حول الطب الطبيعي</p>
              <Link
                to={"/createPost"}
                className="inline-block bg-emerald-600 text-white px-8 py-3 rounded-xl shadow-lg hover:bg-emerald-700 transition-all duration-300 font-semibold"
              >
                أضف وصفة جديدة 🌿
              </Link>
            </header>

            <div className="grid gap-6">
              {recipes.map((rec) => (
                <Link
                  key={rec.id}
                  to={`/community/recipes/${rec.id}`}
                  className="block bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 border border-emerald-100 hover:border-emerald-200 p-6"
                >
                  <h3 className="text-xl font-semibold text-emerald-800 mb-3">
                    {rec.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {firstNWords(rec.description, 10)}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-600 font-medium">{rec.author}</span>
                    <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">
                      اقرأ المزيد
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}



let posts = [
  {
    id: 1,
    title: 'مرحبًا بالجميع في مجتمعنا!',
    content: 'هذا هو أول منشور في مجتمعنا الجديد. نحن سعداء بانضمامكم إلينا ونتطلع لرؤية مشاركاتكم القيمة.',
    likes: 15,
    liked: false,
    comments: [
      { id: 1, author: 'أحمد', content: 'أهلاً وسهلاً! مجتمع رائع.', timestamp: 'منذ ساعتين' },
      { id: 2, author: 'سارة', content: 'أنا متحمسة للانضمام إليكم!', timestamp: 'منذ ساعة' }
    ]
  },
  {
    id: 2,
    title: 'نصائح لتعلم React بشكل أسرع',
    content: 'في هذا المنشور سأشارك معكم بعض النصائح التي ساعدتني في تعلم React بفعالية أكبر. أولاً، ابدأ بالأساسيات ثم تقدم تدريجياً إلى المفاهيم المتقدمة.',
    likes: 32,
    liked: true,
    comments: [
      { id: 1, author: 'محمد', content: 'شكراً على النصائح القيمة!', timestamp: 'منذ 3 أيام' }
    ]
  },
  {
    id: 3,
    title: 'أفضل ممارسات Tailwind CSS',
    content: 'Tailwind CSS هي أداة رائعة لبناء واجهات المستخدم بسرعة. في هذا المنشور سأشارك أفضل الممارسات لاستخدامها بشكل فعال.',
    likes: 21,
    liked: false,
    comments: []
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getPosts = async () => {
  await delay(500);
  return posts.map(({ comments, ...post }) => ({
    ...post,
    comments: comments.slice(0, 2) 
  }));
};

export const getPost = async (id) => {
  await delay(300);
  const post = posts.find(p => p.id === parseInt(id));
  if (!post) {
    throw new Error('Post not found');
  }
  return post;
};

export const createPost = async (postData) => {
  await delay(400);
  const newPost = {
    id: Math.max(...posts.map(p => p.id)) + 1,
    title: postData.title,
    content: postData.content,
    likes: 0,
    liked: false,
    comments: []
  };
  posts.unshift(newPost);
  return newPost;
};

export const addComment = async (postId, commentContent) => {
  await delay(400);
  const post = posts.find(p => p.id === parseInt(postId));
  if (!post) {
    throw new Error('Post not found');
  }
  
  const newComment = {
    id: Math.max(...post.comments.map(c => c.id), 0) + 1,
    author: 'أنت',
    content: commentContent,
    timestamp: 'الآن'
  };
  
  post.comments.push(newComment);
  return newComment;
};

export const likePost = async (postId) => {
  await delay(300);
  const post = posts.find(p => p.id === parseInt(postId));
  if (!post) {
    throw new Error('Post not found');
  }
  
  if (post.liked) {
    post.likes--;
    post.liked = false;
  } else {
    post.likes++;
    post.liked = true;
  }
  
  return post;
};
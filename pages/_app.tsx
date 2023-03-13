import { useEffect, useState } from 'react';
import { PostContent, PostContext } from '../components/homework03/PostContent';
import '../styles/global.scss';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}



export default function App({ Component, pageProps }: AppProps) {
  const [posts, setPosts] = useState<PostContent[]>([]);

  useEffect(() => {
    console.log("posts has been updated:", posts);
  }, [posts]);

  const handleSetPosts = (value: PostContent) => {
    setPosts(prevPosts => [...prevPosts, value]);
  };

  // 刪掉最後一個 post
  const handleRemoveLastPost = () => {
    if (posts.length > 0) {
      const updatedPosts = posts.slice(0, posts.length - 1);
      setPosts(updatedPosts);
    }
  };

  const updatePost = (id: string, updatedPost: PostContent) => {
    const index = posts.findIndex(post => post.id === id);
    if (index !== -1) {
      const newPosts = [...posts];
      newPosts[index] = updatedPost;
      setPosts(newPosts);
    }
  }

  return (
    <PostContext.Provider value={{ posts, handleSetPosts, handleRemoveLastPost, updatePost }}>
      <Component {...pageProps} />
    </PostContext.Provider>

  )
}

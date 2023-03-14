import { useEffect, useState } from 'react';
import { PostContent, PostContext } from '../components/homework03/PostContent';
import '../styles/global.scss';

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}

/*
app.tsx 是 Next.js 框架中一個特殊的文件，其作用是在應用程序的上下文中包裝你的應用程序組件 AppComponent。
透過撰寫自定義 _app.tsx 文件，您可以覆蓋 Next.js 的預設行為以供於許多功能，例如：自定義頁面外觀（佈局、主題、背景...等），引入Globa CSS (共用css)，管理應用程式中的全域狀態等等。
此檔案也是整個應用程式中最高層級的元件，所有其他索取在此被包裝，例如頁面与layouts，因此此資產应包含在整个应用程序生命周期期间存在的任何全局组件。
*/

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

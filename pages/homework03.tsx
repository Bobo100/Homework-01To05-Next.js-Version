import Head from 'next/head'
import Link from 'next/link';
import Layout from '../components/layout'
import index from "../styles/index.module.scss";
import style_homework03 from "../styles/homework03.module.scss";

import { RemovePostButton } from '../components/homework03/RemovePostButton';
import { useContext, useState } from 'react';
import { PostContent, PostContext } from '../components/homework03/PostContent';
import uuid from "react-uuid";

export default function homework03() {
    const [posts, setPosts] = useState<PostContent[]>([]);

    const handleSetPosts = (value: PostContent) => {
        // const updatedPosts = [...posts, value];
        // setPosts(updatedPosts);
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
    // const { posts } = useContext(PostContext)
    return (
        <Layout>
            <Head>
                <title>Homework 03</title>
            </Head>
            <PostContext.Provider value={{ posts, handleSetPosts, handleRemoveLastPost, updatePost }}>
                <div className={`${index.App}`} >
                    <div className={`${style_homework03.home}`} >
                        <h1>homework03</h1>
                        <div className={`${style_homework03.btn_containter}`}>

                            <div>
                                <Link href="/homework03/newPost" className={`${style_homework03.post_btn}`}>
                                    Add Post
                                </Link>
                            </div>
                            <div>
                                <RemovePostButton />
                            </div>
                        </div>

                        <div className={style_homework03.post_containter}>
                            {posts && posts.map((post, index) => {
                                console.log(post.id)
                                return (
                                    <div className={`${style_homework03.post}`} key={(uuid())}>
                                        <div className={`${style_homework03.post_title}`}>{post.title}</div>
                                        <div className={`${style_homework03.post_content}`}>{post.content}</div>
                                        {post.image && <img className={`${style_homework03.post_image} ${style_homework03.imagePreivew}`} src={post.image} alt="123" />}
                                        <div>
                                            <Link href={`/homework03/modify-post/${post.id}`} className={`${style_homework03.post_btn}`}>
                                                Modify
                                            </Link>
                                        </div>
                                    </div>
                                )
                            })
                            }
                        </div>

                        <div>
                            <Link href="/">
                                Home
                            </Link>
                        </div>
                    </div>
                </div>
            </PostContext.Provider>
        </Layout>
    )
}
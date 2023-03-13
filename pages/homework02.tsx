import Head from 'next/head'
import Link from 'next/link';
import { useState } from 'react';
import uuid from 'react-uuid';
import Layout from '../components/layout'
import index from "../styles/index.module.scss";
import style_homework02 from "../styles/homework02.module.scss";
export default function homework02() {
    const [count, setCount] = useState(3);

    const handleAddClick = () => {
        setCount(prevState => prevState + 1);
    };

    const handleRemoveClick = () => {
        setCount(prevState => {
            if (prevState > 0) {
                return prevState - 1;
            }
            return prevState;
        });
    };

    return (
        <Layout>
            <Head>
                <title>Homework 02</title>
            </Head>
            <div className={`${index.App}`}>
                <div className={`${style_homework02.font_size} ${style_homework02.page_styles}`} >
                    <div>
                        <h1>homework02</h1>
                    </div>
                    <div>
                        <button onClick={handleAddClick}>Add</button>
                        <button onClick={handleRemoveClick}>Remove</button>
                    </div>
                    {Array.from({ length: count }, (_, index) => (
                        <div key={uuid()} className="border">Option {index + 1}</div>
                    ))}
                    <div>
                        <Link href="/">
                            Home
                        </Link>
                        <Link href="/homework02/moveItemList">
                            Move Item List
                        </Link>
                        <Link href="/homework02/dragAndDropList">
                            Drag And Drop List
                        </Link>
                        <Link href="/homework02/dragAndDropListLocalStorage">
                            Drag And Drop List Local Storage
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
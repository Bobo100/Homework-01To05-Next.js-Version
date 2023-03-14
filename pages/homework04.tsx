import Head from 'next/head'
import Link from 'next/link';
import { useState } from 'react';
import InputFile from '../components/InputFile';
import Canvas from '../components/homework04/Canvas';
import Layout from '../components/layout'
import index from "../styles/index.module.scss";
export default function homework04() {
    const [imageData, setImageData] = useState("");
    const handleFileChange = (value: string) => {
        setImageData(value);
    };

    return (
        <Layout>
            <Head>
                <title>Homework 04</title>
            </Head>
            <div className={`${index.App}`} >
                <div>
                    <div>
                        <h1>homework04</h1>
                    </div>

                    <div>
                        <InputFile labelId="file" placeholderText="Choose a file" onChange={handleFileChange} />
                        {imageData && <Canvas src={imageData} />}
                    </div>

                    <div className='margin'>
                        <Link href="/">
                            Home
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
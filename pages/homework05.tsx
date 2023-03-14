import Head from 'next/head'
import Link from 'next/link';
import Layout from '../components/layout'
import index from "../styles/index.module.scss";
import style_homework05 from "../styles/homework05.module.scss";
import { useState } from 'react';
import Canvas from '../components/homework05/Canvas';
import InputFile from '../components/InputFile';
import CanvasMousePositionMove from '../components/homework05/CanvasMousePositionMove';
import CanvasDrag from '../components/homework05/CanvasDrag';
export default function homework04() {
    const [imageData, setImageData] = useState("");
    const handleFileChange = (value: string) => {
        setImageData(value);
    };

    return (
        <Layout>
            <Head>
                <title>Homework 05</title>
            </Head>
            <div className={`${index.App}`} >
                <div className={style_homework05.home}>
                    <div>
                        <h1>homework05</h1>
                    </div>

                    {imageData && <h1>中心點縮放</h1>}
                    {imageData &&
                        <Canvas src={imageData} />}
                    {imageData && <h1>根據滑鼠位置縮放</h1>}
                    {imageData && <CanvasMousePositionMove src={imageData} />}
                    {imageData && <h1>可拖曳</h1>}
                    {imageData && <CanvasDrag src={imageData} />}

                    {!imageData && <div className="home__placeholder">Please select an image</div>}
                    <InputFile labelId="file" placeholderText="Choose a file" onChange={handleFileChange} />


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
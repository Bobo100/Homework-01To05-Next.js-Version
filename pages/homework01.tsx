import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { InputText } from "../components/InputText";
import { BtnSubmitInputText } from "../components/BtnSubmitInputText";
import Layout from '../components/layout';
import index from "../styles/index.module.scss";
export default function homework01() {
    const [labelText, setLabelText] = useState('');
    const handleSubmit = (value: string) => {
        setLabelText(value);
    };

    const [inputText, setInputText] = useState('');
    const handleInputChange = (value: string) => {
        setInputText(value);
    };
    // 設定Enter可以觸發更改label的文字
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSubmit(inputText);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Homework 01</title>
            </Head>
            <div className={`${index.App}`} >
                <h1>homework01</h1>
                <label htmlFor="search">Welcom {labelText}</label>
                <InputText value={inputText} onChange={handleInputChange} onKeyPress={handleKeyDown} />
                <BtnSubmitInputText value={inputText} onClick={handleSubmit} />
                <Link href="/">
                    Home
                </Link>
            </div>
        </Layout>
    )
}

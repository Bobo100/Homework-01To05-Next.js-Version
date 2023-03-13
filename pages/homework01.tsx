import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { InputText } from "../components/InputText";
import { BtnSubmitInputText } from "../components/BtnSubmitInputText";
import { InputTextLimitLength, InputTextOnlyAlphabet, InputTextOnlyNumber, InputTextSpecialRule } from "../components/InputTextWithRegex";
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

    // Regex的部分，請參考InputTextWithRegex.tsx
    const [inputTextOnlyNumber, setInputTextOnlyNumber] = useState('');
    const handleInputTextOnlyNumber = (value: string) => {
        setInputTextOnlyNumber(value);
    };

    const [inputTextOnlyAlphabet, setInputTextOnlyAlphabet] = useState('');
    const handleInputTextOnlyAlphabet = (value: string) => {
        setInputTextOnlyAlphabet(value);
    };

    const [inputTextLimitLength, setInputTextLimitLength] = useState('');
    const handleInputTextLimitLength = (value: string) => {
        setInputTextLimitLength(value);
    };

    const [inputTextSpecialRule, setInputTextSpecialRule] = useState('');
    const handleInputTextSpecialRule = (value: string) => {
        setInputTextSpecialRule(value);
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

                <h3>測試輸入限制</h3>
                <p>Only數字</p>
                <InputTextOnlyNumber value={inputTextOnlyNumber} onChange={handleInputTextOnlyNumber} onKeyPress={handleKeyDown} />
                <p>Only英文</p>
                <InputTextOnlyAlphabet value={inputTextOnlyAlphabet} onChange={handleInputTextOnlyAlphabet} onKeyPress={handleKeyDown} />
                <p>限制字數</p>
                <InputTextLimitLength value={inputTextLimitLength} onChange={handleInputTextLimitLength} onKeyPress={handleKeyDown} />
                <p>特殊規則，第一個字英文(大小寫沒限制)，第二個字要數字，第三個字要英文小寫，並且我們限制只能輸入三個字</p>
                <InputTextSpecialRule value={inputTextSpecialRule} onChange={handleInputTextSpecialRule} onKeyPress={handleKeyDown} />

                <Link href="/">
                    Home
                </Link>
            </div>
        </Layout>
    )
}

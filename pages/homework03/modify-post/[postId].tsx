// 修改內容頁面 要接收參數 (id) 透過id去取得該筆資料的資料
import { useState, useEffect, useContext } from "react";

import InputText from "../../../components/homework03/InputText";
import LabelText from "../../../components/homework03/LabelText";

import TextArea from "../../../components/homework03/TextArea";
import InputFile from "../../../components/homework03/InputFile";
import { PostContext } from "../../../components/homework03/PostContent";
import ModifyButton from "../../../components/homework03/ModifyButton";
import { useRouter } from "next/router";
import style_homework03 from "../../../styles/homework03.module.scss";

export const ModifyPost = () => {

    // 接收參數
    const router = useRouter();
    const { postId } = router.query;

    const { posts } = useContext(PostContext);
    // 當posts的id跟參數id一樣時，就把該筆資料的資料取出來
    const filteredPost = posts.find(post => post.id === postId);
    console.log(filteredPost)

    const [titleInputText, setTitleInputText] = useState('');
    const handleInput = (value: string) => {
        setTitleInputText(value);
    };

    const [contentTextArea, setContentTextArea] = useState('');
    const handleTextArea = (value: string) => {
        setContentTextArea(value);
    };

    const [imageData, setImageData] = useState("");
    const handleFileChange = (value: string) => {
        setImageData(value);
    };

    useEffect(() => {
        if (filteredPost) { // 判斷 filteredPost 是否有值
            setTitleInputText(filteredPost.title);
            setContentTextArea(filteredPost.content)
            setImageData(filteredPost.image)
        }
    }, [filteredPost]);


    return (
        <div className="App">
            <div className={style_homework03.newpost}>
                <LabelText label="title" text="Title" />
                <InputText labelId="name" value={titleInputText} placeholderText="Enter your name" onChange={handleInput} />

                <LabelText label="content" text="Content" />
                <TextArea labelId="content" value={contentTextArea} placeholderText="Enter your content" onChange={handleTextArea} />

                <div className={style_homework03.uploadImageContent}>
                    {imageData && <img className={style_homework03.imagePreivew} src={imageData} alt="123" />}
                    <InputFile labelId="image" placeholderText="Upload image" onChange={handleFileChange} />
                </div>

                {/* 這邊要有一個修改確認修改按鈕 */}
                <ModifyButton id={postId as string} title={titleInputText} content={contentTextArea} image={imageData} />
            </div>
        </div>
    )
}

export default ModifyPost;
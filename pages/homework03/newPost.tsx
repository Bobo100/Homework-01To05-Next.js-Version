import { useState } from "react";
import InputText from "../../components/homework03/InputText";
import LabelText from "../../components/homework03/LabelText";
import SubmitButton from "../../components/homework03/SubmitButton";
import TextArea from "../../components/homework03/TextArea";
import InputFile from "../../components/InputFile";
import uuid from "react-uuid";
import index from "../../styles/index.module.scss";
import style_homework03 from "../../styles/homework03.module.scss";
// import "./css/newPost.css"
export const newPost = () => {
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

    return (
        <div className={index.App}>
            <div className={style_homework03.newpost}>
                <LabelText label="title" text="Title" />
                <InputText labelId="name" value={titleInputText} placeholderText="Enter your name" onChange={handleInput} />

                <LabelText label="content" text="Content" />
                <TextArea labelId="content" value={contentTextArea} placeholderText="Enter your content" onChange={handleTextArea} />

                <div className={style_homework03.uploadImageContent}>
                    {imageData && <img className={style_homework03.imagePreivew} src={imageData} alt="123" />}
                    <InputFile labelId="image" placeholderText="Upload image" onChange={handleFileChange} />
                </div>

                <SubmitButton id={uuid()} title={titleInputText} content={contentTextArea} image={imageData} />
            </div>
        </div>
    );
};

export default newPost;
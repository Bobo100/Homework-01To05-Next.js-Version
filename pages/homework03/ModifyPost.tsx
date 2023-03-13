// // 修改內容頁面 要接收參數 (id) 透過id去取得該筆資料的資料

// // src\pages\ModifyPost.tsx

// import { useState, useEffect, useContext } from "react";
// import { useParams } from "react-router-dom";

// import InputText from "./component/InputText";
// import LabelText from "./component/LabelText";

// import TextArea from "./component/TextArea";
// import InputFile from "./component/InputFile";
// import { PostContext } from "./component/PostContent";

// import ModifyButton from "./component/ModifyButton";

// export const ModifyPost = () => {

//     // 接收參數
//     const { id } = useParams();

//     const { posts } = useContext(PostContext);
//     // 當posts的id跟參數id一樣時，就把該筆資料的資料取出來
//     const filteredPost = posts.find(post => post.id === id);

//     const [titleInputText, setTitleInputText] = useState('');
//     const handleInput = (value: string) => {
//         setTitleInputText(value);
//     };

//     const [contentTextArea, setContentTextArea] = useState('');
//     const handleTextArea = (value: string) => {
//         setContentTextArea(value);
//     };

//     const [imageData, setImageData] = useState("");
//     const handleFileChange = (value: string) => {
//         setImageData(value);
//     };

//     useEffect(() => {
//         if (filteredPost) { // 判斷 filteredPost 是否有值
//             setTitleInputText(filteredPost.title);
//             setContentTextArea(filteredPost.content)
//             setImageData(filteredPost.image)
//         }
//     }, [filteredPost]);


//     return (
//         <div className="newpost">
//             <LabelText label="title" text="Title" />
//             <InputText labelId="name" value={titleInputText} placeholderText="Enter your name" onChange={handleInput} />

//             <LabelText label="content" text="Content" />
//             <TextArea labelId="content" value={contentTextArea} placeholderText="Enter your content" onChange={handleTextArea} />

//             <div className="uploadImageContent">
//                 {imageData && <img className="imagePreivew" src={imageData} alt="123" />}
//                 <InputFile labelId="image" placeholderText="Upload image" onChange={handleFileChange} />
//             </div>

//             {/* 這邊要有一個修改確認修改按鈕 */}
//             <ModifyButton id={filteredPost!.id} title={titleInputText} content={contentTextArea} image={imageData} />


//         </div>
//     )

// }
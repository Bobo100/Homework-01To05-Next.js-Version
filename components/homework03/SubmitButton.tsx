// Submit Button Component
import { useContext } from "react";
import { PostContext } from "./PostContent";
import { PostContent } from "./PostContent";
import Link from "next/link";
import style_homework03 from "../../styles/homework03.module.scss";

const SubmitButton: React.FC<PostContent> = ({ id, title, content, image }) => {

    const { handleSetPosts } = useContext(PostContext);
    const handleSubmit = () => {
        const data = {
            id: id,
            title: title,
            content: content,
            image: image
        }

        console.log("data", data)

        // 如果只有圖片，不要新增
        if (!title && !content) {
            return;
        }
        handleSetPosts(data)
    }

    // const handleSubmit = useCallback(() => {
    //     const data = {
    //         id: id,
    //         title: title,
    //         content: content,
    //         image: image
    //     };

    //     console.log("data", data);

    //     // 如果只有圖片，不要新增
    //     if (!title && !content) {
    //         return;
    //     }

    //     handleSetPosts(data);
    // }, [id, title, content, image, handleSetPosts]);

    return (
        <Link href="/homework03" className="background-init">
            <button className={`${style_homework03.post_btn} ${style_homework03.submitButton}`} onClick={handleSubmit}>Submit</button>
        </Link>
    )
}

export default SubmitButton;
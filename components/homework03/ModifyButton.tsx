// Submit Button Component
import { useContext } from "react";
import { PostContext } from "./PostContent";
import { PostContent } from "./PostContent";
import Link from "next/link";
import style_homework03 from "../../styles/homework03.module.scss";

const ModifyButton: React.FC<PostContent> = ({ id, title, content, image }) => {

    const { updatePost } = useContext(PostContext);

    const handleModify = () => {
        const updatedPost = {
            id: id,
            title: title,
            content: content,
            image: image,
        };
        // 要把修改的資料傳回去
        updatePost(id, updatedPost);

    };

    return (
        <Link href="/homework03" className="background-init">
            <button className={style_homework03.post_btn} onClick={handleModify}>Submit</button>
        </Link>
    )
}

export default ModifyButton;
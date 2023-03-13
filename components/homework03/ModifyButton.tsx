// Submit Button Component
import { useContext } from "react";
import { PostContext } from "./PostContent";
import { PostContent } from "./PostContent";
import Link from "next/link";
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
        // <NavLink to="/" className="post_btn" onClick={handleModify}>Submit</NavLink>
        <Link href="/homework03">
            <button className="post_btn" onClick={handleModify}>Submit</button>
        </Link>
    )
}

export default ModifyButton;
// Remove Post Button Component
import { useContext } from "react";
import { PostContext } from "./PostContent";
import style_homework03 from "../../styles/homework03.module.scss";

export const RemovePostButton = () => {
    const { handleRemoveLastPost } = useContext(PostContext);
    return (
        <button className={`${style_homework03.post_btn}`} onClick={handleRemoveLastPost}>Remove</button>
    );
};

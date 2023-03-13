// 修改 按鈕 點擊後，會跳到修改頁面，並且帶入該筆資料的 id，以便修改頁面可以取得該筆資料的資料

import React from 'react';
// import { NavLink } from 'react-router-dom';

interface ModifyButtonProps {
    id: number;
}

const ToModifyPageButton: React.FC<ModifyButtonProps> = ({ id }) => {
    return (
        // <NavLink to={`/modify-post/${id}`} className="post_btn modifyButton">Modify</NavLink>
        <a href={`/homework03/modify-post/${id}`} className="post_btn modifyButton">Modify</a>
    )
}

export default ToModifyPageButton;
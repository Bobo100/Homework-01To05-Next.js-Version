import React from 'react';


// 建立一個Submit的元件
interface SubmitProps {
    value: string;
    onClick: (value: string) => void;
}

export const BtnSubmitInputText: React.FC<SubmitProps> = ({ value, onClick }) => {
    const handleBtnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        onClick(event.currentTarget.value);
    };

    return (
        <button type="button" value={value} onClick={handleBtnClick}>Submit</button>
    );
};
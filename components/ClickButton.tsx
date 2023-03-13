import React from 'react';

interface AddButtonProps {
    text: string;
    onClick: () => void;
}

export const ClickButton: React.FC<AddButtonProps> = ({ text, onClick }) => {
    return <button onClick={onClick}>{text}</button>;
};
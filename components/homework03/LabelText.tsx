// Label component
import React from 'react';

interface LabelTextProps {
    label: string;
    text: string;
}

const LabelText: React.FC<LabelTextProps> = ({ label, text }) => {
    return (
        <label htmlFor={label}>{text}</label>
    );
};

export default LabelText;

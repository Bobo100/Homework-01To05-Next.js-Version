// 子組件
import React, { useState } from 'react';

function ChildComponent(props) {
    const [inputName, setInputName] = useState('');

    const handleInputChange = (event) => {
        setInputName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        props.onNameChange(inputName);
        setInputName('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Type your name:
                <input type="text" value={inputName} onChange={handleInputChange} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ChildComponent;

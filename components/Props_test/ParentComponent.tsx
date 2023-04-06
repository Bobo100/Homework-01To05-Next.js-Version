// 父組件
import React, { useState } from 'react';
import ChildComponent from './ChildComponent';

function ParentComponent() {
    const [name, setName] = useState('World');

    const handleNameChange = (newName) => {
        setName(newName);
    };

    return (
        <div>
            <h1>Hello, {name}!</h1>
            <ChildComponent name={name} onNameChange={handleNameChange} />
        </div>
    );
}

export default ParentComponent;
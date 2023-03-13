import React, { useState } from "react";
import uuid from "react-uuid";
import { ClickButton } from "../../components/ClickButton";
import Link from 'next/link';
import index from "../../styles/index.module.scss";
import style_homework02 from "../../styles/homework02.module.scss";

type Item = {
    id: string;
    text: string;
};

const moveItemList = () => {
    // 這個state是用來記錄每個item的內容
    const [items, setItems] = useState<Item[]>([
        { id: "1", text: "Option 1" },
        { id: "2", text: "Option 2" },
        { id: "3", text: "Option 3" }
    ]);
    // 這個state是用來記錄每個item的index，並且用來移動item的位置
    const [itemIndexes, setItemIndexes] = useState<number[]>(
        items.map((_, index) => index)
    );

    const moveItem = (fromIndex: number, toIndex: number) => {
        if (fromIndex === toIndex) return;

        // 這裡的newItems和newItemIndexes是為了避免直接修改state
        // 這樣做的好處是可以讓React知道state有變化，並且重新渲染畫面        
        const newItems = [...items];
        const newItemIndexes = [...itemIndexes];

        newItems.splice(toIndex, 0, newItems.splice(fromIndex, 1)[0]);
        newItemIndexes.splice(toIndex, 0, newItemIndexes.splice(fromIndex, 1)[0]);

        // 更新state        
        setItems(newItems);
        setItemIndexes(newItemIndexes);
    };

    const handleAddClick = () => {
        setItems(prevState => [
            ...prevState,
            { id: uuid(), text: `Option ${prevState.length + 1}` }
        ]);

        // 這裡的prevState.length就是新的item的index
        setItemIndexes(prevState => [...prevState, prevState.length]);
    };

    const handleRemoveClick = () => {
        if (items.length === 0) return;
        // 把最後一個item移除
        setItems(prevState => prevState.slice(0, -1));
        setItemIndexes(prevState => prevState.slice(0, -1));
    };

    const handleMoveUpClick = (index: number) => () => {
        const newIndex = index - 1;
        if (newIndex < 0) return;

        moveItem(index, newIndex);
    };

    const handleMoveDownClick = (index: number) => () => {
        const newIndex = index + 1;
        if (newIndex >= items.length) return;

        moveItem(index, newIndex);
    };

    // 移除當前的item
    const handleRemoveItemClick = (index: number) => () => {
        // 把非當前的item過濾出來
        setItems(prevState => prevState.filter((_, i) => i !== index));
        setItemIndexes(prevState => prevState.filter((_, i) => i !== index));
    };

    // 每個div都有兩個button去移動當前的div
    // 如果第一個div的button被點擊，則不會有任何反應
    // 如果最後一個div的button被點擊，則不會有任何反應
    return (
        <div className={`${index.App}`}>
            <div className={`${style_homework02.font_size} ${style_homework02.page_styles}`}>
                <ClickButton text="add" onClick={handleAddClick} />
                <ClickButton text="remove" onClick={handleRemoveClick} />

                {items.map((item, index) => (
                    <div key={uuid()} className="border padding flex justify-center">
                        <div>{item.text}</div>
                        <button disabled={index === 0} onClick={handleMoveUpClick(index)}>
                            Move Up
                        </button>
                        <button
                            disabled={index === items.length - 1}
                            onClick={handleMoveDownClick(index)}
                        >
                            Move Down
                        </button>
                        <button onClick={handleRemoveItemClick(index)} className={`${style_homework02.remove_btn}`}>Remove item</button>
                    </div>
                ))}

                <div>
                    <Link href="/homework02">
                        Back
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default moveItemList;
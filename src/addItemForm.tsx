import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem:(title: string) => void
}

const AddItemForm:FC<AddItemFormPropsType> = (props) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<boolean>(false)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)}

    const addItem = () => {
        const trimmedTitle = newTaskTitle.trim()
        if (trimmedTitle !== ""){
            props.addItem(trimmedTitle);
        } else {
            setError(true);
        }
        setNewTaskTitle("");
    }
    const errorMessage = error && <div className="error-message">{error}</div>
    const inputErrorClass = error ? "error" : ""
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addItem()
    }
    return (
        <div className={"addItemForm"}>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={inputErrorClass}
            />
            <button onClick={addItem}>+</button>
            {errorMessage}
        </div>
    );
};

export default AddItemForm;
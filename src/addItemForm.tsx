import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

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
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.key === "Enter" && addItem()
    }
    return (
        <div className={"addItemForm"}>
            <TextField
                id="outlined-basic"
                label="EnterTitle"
                variant="outlined"
                size={"small"}
                value={newTaskTitle}
                onChange={onNewTitleChangeHandler}
                onKeyDown={onKeyPressHandler}
                error={error}
                helperText={error && "Title is required!"}
            />
            <Button
                style={{"marginTop": "5px"}}
                onClick={addItem}
                size={"small"}
                color={"primary"}
                endIcon={<AddCircleIcon/>}

            >
                Add
            </Button>
            {errorMessage}
        </div>
    );
};

export default AddItemForm;
import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (value: FilterValuesType, todoListId: string) => void
    RemoveTodoList: (todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus:(taskId:string, isDone:boolean, todoListId: string) => void
    filter: FilterValuesType
}

export const Todolist: FC<TodoListPropsType> = (props:TodoListPropsType) => {
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [error, setError] = useState<string | false>(false)

    const addTask = () => {
        if (newTaskTitle.trim() !== ""){
        props.addTask(newTaskTitle.trim(), props.todoListId);
    } else {
            setError("Title is required");
        }
        setNewTaskTitle("");
    }
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            props.addTask(newTaskTitle, props.todoListId);
            setNewTaskTitle("");
        }
    }
    const removeTodoListClickHandler = () => props.RemoveTodoList(props.todoListId)
    const onAllClickHandler = () => props.changeTodoListFilter("all", props.todoListId)
    const onActiveClickHandler = () => props.changeTodoListFilter("active", props.todoListId)
    const onCompletedClickHandler = () => props.changeTodoListFilter("completed", props.todoListId)
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={newTaskTitle}
                   onChange={onNewTitleChangeHandler}
                   onKeyDown={onKeyPressHandler}
                className={error ? "error" : ""}
            />
            <button onClick={addTask}>+</button>
            {error && <div className="error-message">{error}</div>}
        </div>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {props.removeTask(t.id, props.todoListId)}
                    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(t.id, e.currentTarget.checked,props.todoListId)
                    }
                    return <li key={t.id} className={t.isDone ? "is-done" : ""}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={onRemoveHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <button onClick={removeTodoListClickHandler}>Remove TodoList</button>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={onAllClickHandler}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={onActiveClickHandler}>Active</button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={onCompletedClickHandler}>Completed</button>
        </div>
    </div>
}


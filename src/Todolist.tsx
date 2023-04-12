import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./addItemForm";
import EditableSpan from "./EditableSpan";
import {Button, ButtonGroup, Checkbox, IconButton} from "@mui/material";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

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
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, title: string, todoListId: string) => void
    changeTodoListTitle: (title: string, todoListId: string) => void
}

export const Todolist: FC<TodoListPropsType> = (props: TodoListPropsType) => {
    let tasksList = props.tasks.length
        ? props.tasks.map((task) => {
            const removeTask = () => props.removeTask(task.id, props.todoListId)
            const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus
            (task.id, e.currentTarget.checked, props.todoListId)
            const taskClasses = [""]
            task.isDone && taskClasses.push("is-done")
            const changeTaskTitle = (title: string) => props.changeTaskTitle(task.id, title, props.todoListId)
            return <li key={task.id}
                       className={taskClasses.join("")}>
                <Checkbox onChange={changeTaskStatus}
                          checked={task.isDone}/>
                <EditableSpan
                    title={task.title}
                     changeTitle={changeTaskTitle}/>
                <IconButton size={"small"} color={"primary"}>
                    <RemoveCircleIcon onClick={removeTask}/>
                </IconButton>
            </li>
        })
        : <span>Your task list is empty</span>

    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)
    }
    const removeTodoListClickHandler = () => props.RemoveTodoList(props.todoListId)
    const handlerCreator = (filter: FilterValuesType): () => void => (): void => props.changeTodoListFilter(filter, props.todoListId)
    const changeTodoListTitle = (title: string) => props.changeTodoListTitle(title, props.todoListId)

    return <div>
        <h3>
            <EditableSpan title={props.title}
                          changeTitle={changeTodoListTitle}/>
            <IconButton size={"small"} color={"primary"}>
                <RemoveCircleIcon onClick={removeTodoListClickHandler}/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {tasksList}
        </ul>
        <div>
            <ButtonGroup
                fullWidth>
            <Button variant={props.filter === "all" ? "contained" : "outlined"}
                    color={props.filter === "all" ? "secondary" : "primary"}
                    size="small"
                    onClick={handlerCreator("all")}>All</Button>
            <Button variant={props.filter === "active" ? "contained" : "outlined"}
                    color={props.filter === "active" ? "secondary" : "primary"}
                    size="small"
                    onClick={handlerCreator("active")}>Active</Button>
            <Button variant={props.filter === "completed" ? "contained" : "outlined"}
                    color={props.filter === "completed" ? "secondary" : "primary"}
                    size="small"
                    onClick={handlerCreator("completed")}>Completed</Button>
            </ButtonGroup>
        </div>
    </div>
}


import React, {ChangeEvent, FC} from 'react';
import {FilterValuesType} from './App';
import AddItemForm from "./addItemForm";
import EditableSpan from "./EditableSpan";

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
    changeTaskTitle: (taskId: string, title:string, todoListId: string) => void
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
            const changeTaskTitle = (title:string) => props.changeTaskTitle(task.id, title, props.todoListId)
            return <li key={task.id} className={taskClasses.join("")}>
                <input type="checkbox" onChange={changeTaskStatus} checked={task.isDone}/>
                     <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                <button onClick={removeTask}>x</button>
            </li>
        })
        : <span>Your task list is empty</span>

    const addTask = (title:string) => {
        props.addTask(title, props.todoListId)
    }
    const removeTodoListClickHandler = () => props.RemoveTodoList(props.todoListId)
    const handlerCreator = (filter:FilterValuesType): () => void => (): void => props.changeTodoListFilter(filter,props.todoListId)
    const changeTodoListTitle = (title:string) => props.changeTodoListTitle(title, props.todoListId)

    return <div>
        <h3><EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
            <button onClick={removeTodoListClickHandler}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {tasksList}
        </ul>
        <div>
            <button className={props.filter === "all" ? "active-filter" : ""} onClick={handlerCreator("all")}>All</button>
            <button className={props.filter === "active" ? "active-filter" : ""} onClick={handlerCreator("active")}>Active
            </button>
            <button className={props.filter === "completed" ? "active-filter" : ""} onClick={handlerCreator("completed")}>Completed
            </button>
        </div>
    </div>
}


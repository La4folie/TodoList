import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListAT = {
    type: "REMOVE-TODOLIST",
    payload: {
        todoListId: string
    }
}
export type AddTodoListAT = {
    type: "ADD-TODOLIST"
    payload: {
        title: string,
    }
    todolistId: string
}
export type ChangeToDoListTitleAT = {
    type: "CHANGE-TODOLIST-TITLE",
    payload: {
        title: string
        todolistId: string,
    }
}
export type ChangeToDoListFilterAT = {
    type: "CHANGE-TODOLIST-FILTER",
    payload: {
        filter: FilterValuesType,
        todolistId: string
    }
}
type ActionType = RemoveTodoListAT | AddTodoListAT | ChangeToDoListTitleAT | ChangeToDoListFilterAT

export const todoListsReducer = (todolists: Array<TodoListType>, action: ActionType): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter((tl) => tl.id !== action.payload.todoListId)

        case "ADD-TODOLIST":
            const newTodoListId = v1()
            const newTodo: TodoListType = {
                id: newTodoListId,
                title: action.payload.title,
                filter: "all"
            }
            return [...todolists, newTodo]

        case "CHANGE-TODOLIST-TITLE":
            return todolists.map((tl) => tl.id === action.payload.todolistId ? {
                ...tl,
                title: action.payload.title
            } : tl)

        case "CHANGE-TODOLIST-FILTER":
            return todolists.map((tl) => tl.id === action.payload.todolistId ? {
                ...tl,
                filter: action.payload.filter
            } : tl)


        default:
            return todolists
    }
}
export const RemoveTodoListAC = (id: string): RemoveTodoListAT => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            todoListId: id
        }
    }
}
export const AddTodoListAC = (title: string): AddTodoListAT => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            title
        },
        todolistId: v1()
    }
}
export const ChangeToDoListTitleAC = (id: string, title: string): ChangeToDoListTitleAT => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        payload: {
            title: title,
            todolistId: id,
        }
    }
}
export const ChangeToDoListFilterAC = (id:string,filter:FilterValuesType):ChangeToDoListFilterAT => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            filter: filter,
            todolistId: id
        }
    }
}
import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from "uuid";
import AddItemForm from "./addItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@mui/material";
import {Menu} from "@mui/icons-material";


export type FilterValuesType = "all" | "active" | "completed";


export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [todoListId: string]: Array<TaskType>
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>
    ([
        {id: todoListId_1, title: "What to learn ", filter: "all"},
        {id: todoListId_2, title: "What to buy ", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TasksStateType>(
        {
            [todoListId_1]: [
                {id: v1(), title: "HTML&CSS", isDone: true},
                {id: v1(), title: "JS", isDone: false},
                {id: v1(), title: "ReactJS", isDone: false},
            ],
            [todoListId_2]: [
                {id: v1(), title: "Coca-Cola", isDone: true},
                {id: v1(), title: "Whiskey", isDone: false},
                {id: v1(), title: "ACE", isDone: false},
            ],

        }
    )
    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map((tl) => tl.id === todoListId ? {...tl, filter: filter} : tl))
    }
    const changeTodoListTitle = (title: string, todoListId: string) => {
        setTodoLists(todoLists.map((tl) => tl.id === todoListId ? {...tl, title} : tl))
    }

    const addTask = (title: string, todoListId: string) => {
        let newTask: TaskType = {
            id: v1(),
            title: title,
            isDone: false
        };
        setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})
    }
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const updatedTasks = tasks[todoListId].map((t) => t.id === taskId ? {
            ...t,
            isDone: isDone
        } : t)
        setTasks({...tasks,[todoListId]:updatedTasks})
    }
    const changeTaskTitle = (taskId: string, title:string, todoListId: string) => {
        const updatedTasks = tasks[todoListId].map((t) => t.id === taskId ? {
            ...t,
            title:title
        } : t)
        setTasks({...tasks,[todoListId]:updatedTasks})
    }

    const removeTask = (id: string, todoListId: string) => {
        // const tasksForUpdate = tasks[todoListId]
        // const updatedTasks = tasksForUpdate.filter(t => t.id !== id)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = updatedTasks
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter(task => task.id !== id)})
    }
    const RemoveTodoList = (todoListId: string) => {
        const updatedTodoList = todoLists.filter((tl) => tl.id !== todoListId)
        setTodoLists(updatedTodoList)
    }
    const addTodoList= (title:string) => {
        const newTodoListId = v1()
        const newTodo:TodoListType = {
            id: newTodoListId,
            title,
            filter: "all"
        }
            setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodoListId] : []})
    }

    const getFilteredTasksForRender =
        (tasks: Array<TaskType>, filter: FilterValuesType): Array<TaskType> => {
            switch (filter) {
                case "active":
                    return tasks.filter(t => !t.isDone)
                case "completed":
                    return tasks.filter(t => t.isDone)
                default:
                    return tasks;
            }
        }

    const todoListComponents = todoLists.length
        ? todoLists.map((tl) => {
        const filteredTasksForRender = getFilteredTasksForRender(tasks[tl.id], tl.filter)
        return (
            <Grid item>
            <Paper
                variant="outlined"
                sx={{p: "20px"}}
            >
            <Todolist
                todoListId={tl.id}
                title={tl.title}
                tasks={filteredTasksForRender}
                removeTask={removeTask}
                changeTodoListFilter={changeTodoListFilter}
                RemoveTodoList={RemoveTodoList}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={tl.filter}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle = {changeTodoListTitle}
            />
        </Paper>
            </Grid>
        )
    })
        : <span>Create your first todolist!</span>
    return (
        <div className="App">
            <AppBar position={"static"}>
                <Toolbar>
                    <IconButton
                        size={"large"}
                        edge={"start"}
                        color={"inherit"}
                        aria-label={"menu"}
                        sx={{mr: 2}}
                        ><Menu/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        Todolists
                    </Typography>
                    <Button color={"inherit"}>Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container
                      sx={{p: "10px 0"}}>
           <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid
                    container spacing={3}
                >
            {todoListComponents}
                </Grid>
            </Container>
        </div>
    );
}

export default App;

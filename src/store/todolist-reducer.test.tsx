import {v1} from "uuid";
import {FilterValuesType, TodoListType} from "../App";
import {
    AddTodoListAC,
    AddTodoListAT, ChangeToDoListFilterAC,
    ChangeToDoListFilterAT, ChangeToDoListTitleAC,
    ChangeToDoListTitleAT,
    RemoveTodoListAC,
    todoListsReducer
} from "./todolist-reducer";


test("correct todolist should be removed",
    () => {

        let todolistId1 = v1();
        let todolistId2 = v1();

        const startState: Array<TodoListType> = [
            {id: todolistId1, title: "What to learn", filter: "all"},
            {id: todolistId2, title: "What to buy", filter: "all"}
        ]
        const endState = todoListsReducer(startState, RemoveTodoListAC(todolistId1))

        expect(endState.length).toBe(1);
        expect(endState[0].id).toBe(todolistId2);
    })

test("correct todolist should be added", () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: AddTodoListAT = AddTodoListAC(newTodoListTitle)
    const endState = todoListsReducer(startState, action);

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodoListTitle);
})
test("correct todolist should change its name", () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodoListTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ChangeToDoListTitleAT = ChangeToDoListTitleAC(todolistId2,newTodoListTitle)
    const endState = todoListsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodoListTitle);
})

test("correct filter of todolist should be changed", () => {

    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ChangeToDoListFilterAT = ChangeToDoListFilterAC(todolistId2,newFilter)
    const endState = todoListsReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
})
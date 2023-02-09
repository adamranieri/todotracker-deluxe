import { TodoForm } from "../components/todo-form"

// type
export type Todo ={
    todoId: number 
    title: string
    desc: string 
    isComplete: boolean
}

// 1. state
export type TodoState ={
    todos: Todo[]
}

//2. actions that interact with the state
export type AddTodoAction = {type:"ADD_TODO", payload:Todo};
export type MarkTodoCompleteAction = {type:"MARK_COMPLETE", todoId: number}
export type SetTodosAction = {type:"SET_TODOS",todos:Todo[]}

//Saga Actions
export type CreateTodoFromFormAction = {type:"CREATE_TODO_FROM_FORM", payload:TodoForm}
export type RequestPopulateTodosAction = {type:"REQUEST_POPULATE_TODOS"};
export type RequestSaveTodosAction = {type:"REQUEST_SAVE_TODOS"};

export type TodoAction = AddTodoAction | MarkTodoCompleteAction | CreateTodoFromFormAction | SetTodosAction | RequestPopulateTodosAction | RequestSaveTodosAction

//3. reducer function
//3.5 to make the reducer redux compliant we set a default state
const intialState: TodoState = {todos:[
    {todoId:101, isComplete:true,  title:"dishes", desc:"Dirty dishes to wash"},
    {todoId:202, isComplete:false,  title:"Laundry", desc:"Towels that need a rinse"}
]};

//REDUCERS CANNOT HANDLE ASYNCHRONOUS CODE
export function todoReducer(state: TodoState = intialState, action: TodoAction): TodoState{
    const nextState: TodoState = JSON.parse(JSON.stringify(state));

    switch(action.type){
        case "ADD_TODO":{
            nextState.todos.push(action.payload);
            return nextState;
        }
        case "MARK_COMPLETE":{

           const todo = nextState.todos.find(t => t.todoId === action.todoId);
           if(todo){
            todo.isComplete = true;
           }
           return nextState;
        }
        case "SET_TODOS":{ // I am not going to use this set todos directly
            nextState.todos = action.todos;
            return nextState;
        }

        default: // DO NOT FORGET TO WRITE A DEFAULT CASE THAT RETURNS NEXT STATE
            return nextState;
        
    }
}



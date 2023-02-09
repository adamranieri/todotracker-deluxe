// Sagas are generator functions
// 1. root saga
// 2. watcher saga
// 3. working saga
// Saga's secret super power is the ability to work with asynchronous code and integrate it into our reducer
// unless you are doing asynchronous coding. Saga is likely overkill

import { takeEvery, put, all, select } from "@redux-saga/core/effects";
import { retrieveAllTodos, saveTodos } from "../api/todo-requests";
import { CreateTodoFromFormAction, RequestPopulateTodosAction, Todo } from "../reducers/todo-reducer";


//worker sagas will take in an action process it and typically send another action to the actual reducer
export function* createTodoFromFormData(action:CreateTodoFromFormAction):any{
    const todo: Todo = {
        todoId: Math.round(Math.random()*1000),
        title:action.payload.title,
        desc:action.payload.desc,
        isComplete:false
    }
    yield put({type:"ADD_TODO", payload:todo});// sends a DIFFERENT action to the reducer 
}

export function* populateTodos(action:RequestPopulateTodosAction){
    const todos:Todo[] = yield retrieveAllTodos();// we can yield promises and saga waits for it to be resolved
    yield put({type:"SET_TODOS", todos:todos})// send action to the reducer
}

export function* updateTodos(){
    //we can get values from the store using select
    const todos:Todo[] = yield select(store => store.todos); // no intellisense =(
    const savedTodos:Todo[] = yield saveTodos(todos);
    yield put({type:"SET_TODOS", todos:savedTodos})
}


//Watcher sagas will intercept an action and pass it to a worker sag
export function* watchCreateFromFormData(){
    yield takeEvery("CREATE_TODO_FROM_FORM", createTodoFromFormData)
}

export function* watchPopulateWithTodos(){
    yield takeEvery("REQUEST_POPULATE_TODOS",populateTodos)
}

export function* watchSaveTodos(){
    yield takeEvery("REQUEST_SAVE_TODOS", updateTodos)
}

//Root saga a generator function that contains all the watcher saga your created
export function* rootSaga(){
    yield all([watchCreateFromFormData(), watchPopulateWithTodos(),watchSaveTodos()]) // an array of watcher sagas
}

// dispatch({type:"CREATE_TODO_FROM_FORM", payload:{title:"something", desc:"fsdf"}}) => watchCreateFromFormData =>
// createTodoFromFormData => dispatch({type:"ADD_TODO", payload:todo})
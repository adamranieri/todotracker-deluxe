import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { TodoAction, TodoState } from "../reducers/todo-reducer"


export function TodoList(){

    const todos = useSelector((store:TodoState) => store.todos);// the callback your return the specific property or properties you want
    const dispatch = useDispatch()<TodoAction>;

    
    return <>
    <button onClick={()=>dispatch({type:"REQUEST_POPULATE_TODOS"})}>Get Todos from Server</button>
       <ul>
            {todos.map(t => <li key={t.todoId}> <b>{t.title}</b> {t.desc} {t.isComplete ? <></> : 
            <button onClick={()=> dispatch({type:"MARK_COMPLETE", todoId:t.todoId})}>Mark Complete</button>}</li>)}
       </ul>
    <button onClick={()=>dispatch({type:"REQUEST_SAVE_TODOS"})}>Save Todos</button>
    </>

}
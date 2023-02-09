import { useDispatch, useSelector } from "react-redux"
import { TodoAction, TodoState } from "../reducers/todo-reducer"


export function TodoList(){

    const todos = useSelector((state:TodoState) => state.todos);// the callback your return the specific property or properties you want
    const dispatch = useDispatch()<TodoAction>;
    
    return <>
       <ul>
            {todos.map(t => <li key={t.todoId}> <b>{t.title}</b> {t.desc} {t.isComplete ? <></> : 
            <button onClick={()=> dispatch({type:"MARK_COMPLETE", todoId:t.todoId})}>Mark Complete</button>}</li>)}
       </ul>
    </>

}
import { useSelector } from "react-redux"
import { TodoState } from "../reducers/todo-reducer"


export function TodoList(){

    const todos = useSelector((state:TodoState) => state.todos);// the callback your return the specific property or properties you want
    // console.log(todos)

    return <>
    <h1>Hello</h1>
       <ul>
            {/* {todos.map(t => <li key={t.todoId}> <b>{t.title}</b> {t.desc} {t.isComplete ? <></> : <button>Mark Complete</button>}</li>)} */}
       </ul>
    </>

}
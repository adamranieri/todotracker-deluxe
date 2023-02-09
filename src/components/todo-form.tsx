import { useState } from "react"
import { useDispatch } from "react-redux"
import { Todo, TodoAction } from "../reducers/todo-reducer"

export type TodoForm ={
    title: string
    desc: string
}

export function TodoForm(){

    const[form,setForm] = useState<TodoForm>({title:"", desc:""})
    const dispatch = useDispatch()<TodoAction>;

    function createTodo(){
        dispatch({type:"CREATE_TODO_FROM_FORM", payload:form})// will be intercepted by saga
    }
    

    return <>

        <input type="text" placeholder="title" onChange={e => setForm({...form, title:e.target.value})} />
        <input type="text" placeholder="desc" onChange={e => setForm({...form, desc:e.target.value})} />
        <button onClick={createTodo}>Create</button>
    </>
}
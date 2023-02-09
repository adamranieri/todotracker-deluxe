import { useState } from "react"
import { useDispatch } from "react-redux"
import { Todo, TodoAction } from "../reducers/todo-reducer"

type TodoForm ={
    title: string
    desc: string
}

export function TodoForm(){

    const[form,setForm] = useState<TodoForm>({title:"", desc:""})
    const dispatch = useDispatch()<TodoAction>;

    function createTodo(){
        const todo:Todo = {
            todoId:Math.random(),
            title:form.title,
            desc: form.desc,
            isComplete:false
        }
        dispatch({type:"ADD_TODO", payload:todo})
    }
    

    return <>

        <input type="text" placeholder="title" onChange={e => setForm({...form, title:e.target.value})} />
        <input type="text" placeholder="desc" onChange={e => setForm({...form, desc:e.target.value})} />
        <button onClick={createTodo}>Create</button>
    </>
}
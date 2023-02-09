import { Todo } from "../reducers/todo-reducer";



export async function saveTodos(todos:Todo[]):Promise<Todo[]>{

    const query = `mutation UpdateTodos($newTodos:UpdateTodosInput!){
  
      updateTodos(input:$newTodos){
        title
        desc
        isComplete
        todoId
      }
    }`

    const variables = {newTodos:{updatedTodos:todos}};

    const requestBody = JSON.stringify({query,variables});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody,headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const savedTodos:Todo[] = responseBody.data.updateTodos
    return savedTodos;
}

export async function retrieveAllTodos():Promise<Todo[]>{
    
    const query = `query todos {
        todos{
          title
          todoId
          desc
          isComplete
        }
      }`
    
    const requestBody = JSON.stringify({query});
    const httpResponse = await fetch("http://127.0.0.1:8000/graphql", {method:"POST", body:requestBody,headers:{"Content-Type":"application/json"}});
    const responseBody = await httpResponse.json();
    const todos:Todo[] = responseBody.data.todos;
    return todos;

}
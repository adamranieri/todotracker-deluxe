import { createStore } from '@reduxjs/toolkit';
import React from 'react';
import { Provider } from 'react-redux';

import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { todoReducer } from './reducers/todo-reducer';


const store = createStore(todoReducer);


function App() {
  // unlike useReducer. Having a provider wrap components will allow us to use the same reducer function everywhere
  // greatly simplifies passing data bewteen components
  return <>
  <Provider store={store}>
    <TodoList/>
    <TodoForm/>
  </Provider>
  </>
}

export default App;

import { createStore, applyMiddleware } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import React from 'react';


import { TodoForm } from './components/todo-form';
import { TodoList } from './components/todo-list';
import { todoReducer } from './reducers/todo-reducer';
import createSagaMiddleware from '@redux-saga/core';
import { rootSaga } from './sagas/todo-sagas';

const sagaMiddleware = createSagaMiddleware()
const todoStore = createStore(todoReducer, applyMiddleware(sagaMiddleware));// now the sagas will watch over the dispatch actions
sagaMiddleware.run(rootSaga)

function App() {
  // unlike useReducer. Having a provider wrap components will allow us to use the same reducer function everywhere
  // greatly simplifies passing data bewteen components
  return <>
  <Provider store={todoStore}>
    <TodoList/>
    <TodoForm/>
  </Provider>
  </>
}

export default App;

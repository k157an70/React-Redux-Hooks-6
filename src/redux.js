import { createStore, combineReducers, applyMiddleware } from 'redux';
import navigationService from './navigationServices';
import thunk from 'redux-thunk';
import { Alert } from 'react-native';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
// actions, reducers, store
//acionTypes
const ADD_TODO = 'ADD_TODO';
const NEW_NAME_TODO = 'NEW_NAME_TODO';
const UPDATE_TODO = 'UPDATE_TODO';
const DELETE_TODO = 'DELETE_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const SET_VISIBLE_FILTER = 'SET_VISIBLE_FILTER';
//action
const addTodo= () => ({
   type: ADD_TODO
})

// async
export const addTodoAction = () => dispatch =>{
   setTimeout(() => {
      dispatch(addTodo());
      navigationService.navigate('HOME_NAV');
   }, 3000);
}
export const changeNameTodoAction = name => ({
   type: NEW_NAME_TODO,
   payload: name
})

const updateTodo = id => ({
   type: UPDATE_TODO,
   payload: id
})

export const updateTodoAction = id => dispatch=> {
   setTimeout(() => {
      dispatch(updateTodo(id));
      navigationService.navigate('HOME_NAV');
   }, 4000);
}
export const deleteTodoAction = id => (dispatch, getState) => {
   const { myTodos } = getState();
   const todoDelete = myTodos.todos.find(_td => _td.id === id);

   Alert.alert('Confirm Delete', `Are You sure delete\n "${todoDelete.name}"?`,[
      { text: 'OK', onPress: () => {
         dispatch({
            type: DELETE_TODO,
            payload: id
         })
      }},
      { text: 'Cancel', onPress: () => null}
   ])
}
export const toggleTodoAction = id => ({
   type: TOGGLE_TODO,
   payload: id
})
// filter
export const setVisibleFilterAction = filter => {
   navigationService.back();
   return {
      type: SET_VISIBLE_FILTER,
      payload: filter
   }
}
export const visibiltyFilters = {
   SHOW_ALL: 'SHOW_ALL',
   SHOW_ACTIVE: 'SHOW_ACTIVE',
   SHOW_COMPLETED: 'SHOW_COMPLETED'
}
//reducers
const initialState = {
   todos: [
      { id: 1, name: 'Learn Redux', completed: false },
      { id: 2, name: 'Learn React Redux', completed: true },
   ],
   name: 'NEW NAME'
}
const todoReducer = (state = initialState, action) => {
   switch (action.type) {
      case ADD_TODO:
         let newTodo = { id: (new Date()).getTime(), name: state.name, completed: false }
         return {
            ...state,
            todos: [...state.todos, newTodo]
         }
      case NEW_NAME_TODO:
         return {
            ...state,
            name: action.payload
         }
      case UPDATE_TODO:
         return {
            ...state,
            todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, name: state.name } : todo)
         }
      case DELETE_TODO:
         return {
            ...state,
            todos: state.todos.filter(todo => todo.id !== action.payload)
         }
      case TOGGLE_TODO:
         return {
            ...state,
            todos: state.todos.map(todo => todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo)
         }
      default:
         return state;
   }
}

const filterReducer = (state = visibiltyFilters.SHOW_ALL, action) => {
   return action.type === SET_VISIBLE_FILTER ? action.payload : state
}

const rootReducer = combineReducers({
   myTodos: todoReducer,
   filter: filterReducer
})
// middleware redux-persist config
const persistConfig = {
   key: 'Root',
   storage: AsyncStorage,
   whitelist:[
      'myTodos'
   ],
   blacklist: [
      'filter'
   ]
}
//store
//export const store = createStore(rootReducer, applyMiddleware(thunk));
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);

import React from 'react';
import { View, TextInput, Button } from 'react-native';
import { useTodoAction, useTodoEdit }from '../hooks';

const MyInput = ({ id }) => {
   console.warn('Render MyInput');
   const { name,onChangeName } = useTodoEdit(id);

   return (
      <TextInput
         value={name}
         onChangeText={val => onChangeName(val)}
         placeholder={'Name of Todo'}
         underlineColorAndroid={'darkblue'}
         style={{ paddingHorizontal: 10, fontSize: 25 }}
      />
   )
}
const AddTodoScreen = ({ navigation }) => {
   console.warn('Render AddTodoScreen');
   const id = navigation.getParam('id', null);
   const {
      //todoEdit,
      //name,
      addTodo,
      updateTodo,
      //onChangeName
   }= useTodoAction();

   // useEffect(() => {
   //    id && onChangeName(todoEdit.name);
   //    return () => {
   //       onChangeName('');
   //    }
   // }, [])

   return (
      <View style={{ flex: 1, justifyContent: 'space-between' }}>
         <MyInput id={id} />
         <Button
            title={id ? 'UPDATE' : 'SAVE'}
            onPress={() => {
               if(id){
                  updateTodo(id)
               }else{
                  addTodo()
               }
            }}
      />
      </View>
   )
}

AddTodoScreen.navigationOptions = ({ navigation }) => {
   const isAdd = navigation.getParam('isAdd', false);
   const title = (isAdd ? 'ADD' : 'EDIT') + ' TODO';
   return {
      title
   }
}

export default AddTodoScreen;
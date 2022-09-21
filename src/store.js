import { configureStore, createSlice } from '@reduxjs/toolkit'


let user = createSlice({
  name : 'user',
  initialState : {uid : 'empty'},
  reducers : {
    changeUid(state,action){ 
        if(action.payload){            
           state.uid = action.payload;
        }
        else {
            state.uid = 'empty'
        }                
    }
  }
});


export let { changeUid } =  user.actions

export default configureStore({
  reducer: {
    user : user.reducer
   }
}) 


import { createSlice } from '@reduxjs/toolkit';

let user = createSlice({
  name : 'user',
  initialState: {name : "Kim", age : 20},
  reducers : {
    changeName(state) { // 여기 파라미터 넣으면 기존 state이다.
      state.name = "Park"
    },
    plusAge(state, action){
      state.age += action.payload;
    }
  }
})


export let {changeName, plusAge} = user.actions; // state 변경함수가 여기에 남는다.
export default user;
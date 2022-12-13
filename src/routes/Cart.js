import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { changeName, plusAge } from './../store/userSlice';
import { increase } from './../store';
import { memo, useState } from 'react';

let Child = memo( function(){
  console.log('재렌더링됨')
  return <div>자식임</div>
})

function Cart(){

  let state = useSelector((state)=>{return state});

  let disPatch = useDispatch();

  let [count, setCount] = useState(0)

  return (
    <div>
      <Child count={count} />
      <button onClick={()=>{ setCount(count+1) }}> + </button>
      <br /><br />

      {state.user.name}{state.user.age}의 장바구니
      <button onClick={()=>{
        disPatch(plusAge(100));
      }}>나이더하기버튼</button>
      <button onClick={()=>{
        disPatch(changeName())
      }}>이름변경버튼</button>

      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        <tbody>
          {
            state.cart.map(function(elem, i){
              return (
                <tr key={i}>
                  <td>{state.cart[i].id}</td>
                  <td>{state.cart[i].name}</td>
                  <td>{state.cart[i].count}</td>
                  <td>
                    <button onClick={()=>{
                      disPatch(increase(state.cart[i].id))
                    }}>+</button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </Table>
      
    </div>
  )
}

export default Cart;
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Detail(props) {

  useEffect(()=>{
    setTimeout(()=>{

    },2000)
  })
  

  let [count, setCount] = useState(0);

  let {id} = useParams(); 
  let shoes = props.shoes.find((element)=> element.id == id);

  return (
    <div className="container">
      <div className='alert alert-warning'>
        2초 이내 구매시 할인
      </div>
      {count}
      <button onClick={()=>{setCount(count+1)}}>버튼</button>
      <div className="row">
        <div className="col-md-6">
          <img src= {`https://codingapple1.github.io/shop/shoes${shoes.id+1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <h4 className="pt-5">{shoes.title}</h4>
          <p>{shoes.price}</p>
          <p>{shoes.content}</p>
          <button className="btn btn-danger">주문하기</button> 
        </div>
      </div>
    </div> 
  )
}

export default Detail;
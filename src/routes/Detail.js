import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function Detail(props) {

  let [count, setCount] = useState(0);
  let [pop, setPop] = useState(true);
  let [num, setNum] = useState('')

  let {id} = useParams(); 
  let shoes = props.shoes.find((element)=> element.id == id);


  useEffect(()=>{
    setTimeout(()=>{setPop(false)},2000);
  })

  useEffect(()=>{
    if (isNaN(num) == true){
      alert('숫자를 입력하세요')
    }
  }, [num])

  return (
    <div className="container">
      {
        pop == true
        ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
        : null
      }
      {count}
      <button onClick={()=>{setCount(count+1)}}>버튼</button>
      <div className="row">
        <div className="col-md-6">
          <img src= {`https://codingapple1.github.io/shop/shoes${shoes.id+1}.jpg`} width="100%" />
        </div>
        <div className="col-md-6">
          <input onChange = { (e) => { setNum(e.target.value) }} /> 
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
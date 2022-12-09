import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import {Context1} from './../App.js';

function Detail(props) {


  let {재고} = useContext(Context1)
  
  

  let [count, setCount] = useState(0);
  let [pop, setPop] = useState(true);
  let [num, setNum] = useState('');
  let [tab, setTab] = useState(0);

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

  let [fade2, setFade2] = useState('');

  useEffect(()=>{
    setFade2('end');
    return ()=> {
      setFade2(''); // useEffect 실행하기 전에 end를 뗐다가
    }
  },[])

  return (
    <div className={`container start ${fade2}`}>
      {
        pop == true
        ? <div className="alert alert-warning">
            2초이내 구매시 할인
          </div>
        : null
      }
      {count}
      {재고}
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

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(0)}} eventKey="link0">버튼0</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(1)}} eventKey="link1">버튼1</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={()=>{setTab(2)}} eventKey="link2">버튼2</Nav.Link>
        </Nav.Item>
      </Nav>
      <TabContent tab={tab} shoes={props.shoes} />

    </div> 
  )
}

function TabContent({tab,shoes}){

  let [fade, setFade] = useState('');
  let {재고} = useContext(Context1);

  useEffect(()=>{
    setTimeout(()=>{ setFade('end'); },100) // 0.1초 후에 부착
    return ()=> {
      setFade(''); // useEffect 실행하기 전에 end를 뗐다가
    }
  },[tab]) // tab state가 변할 때 end 를 뗐다가 부착

  return (
    <div className= {`start ${fade}`}>
      { [<div>내용0 {shoes[0].title} {재고}</div>, <div>내용1</div>, <div>내용2</div>][tab] }
    </div>
  ) 

  // if(tab == 0){
  //   return <div>내용0</div>
  // }
  // if(tab == 1){
  //   return <div>내용1</div>
  // }
  // if(tab == 2){
  //   return <div>내용2</div>
  // }
}

export default Detail;
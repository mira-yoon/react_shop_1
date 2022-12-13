import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Container, Nav} from 'react-bootstrap';
import bg from './img/bg.png';
import data from './data'
import { lazy, Suspense, useState, useEffect } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import axios from 'axios';
// import Detail from './routes/Detail';
// import Cart from './routes/Cart';

const Detail = lazy( () => import('./routes/Detail.js') )
const Cart = lazy( () => import('./routes/Cart.js') )

function App() {

  let [shoesId, setShoesId] = useState([]); // 초기값을 ""으로 하면 재랜더링시 에러난다.

  let [shoes, setShoes] = useState(data);

  let navigate = useNavigate();

  useEffect(()=>{
    let watchedItemId = localStorage.getItem('watched');
    if(watchedItemId !== null) {
      watchedItemId = JSON.parse(watchedItemId);
      setShoesId(watchedItemId);
    }else {
      localStorage.setItem('watched', JSON.stringify( [] ))
    }
  },[]) 

  
  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      
      <Suspense fallback={ <div>로딩중임</div> }>
        <Routes>
          <Route path="/" element={<Home shoes={shoes} setShoes={setShoes} navigate={navigate} shoesId = {shoesId} />}></Route>
          <Route path="/detail/:id" element={
            <Detail shoes={shoes} />
          }></Route>
          <Route path="/cart" element={ <Cart />}></Route>
          <Route path="*" element={<div>없는 페이지 입니다.</div>}></Route>
        </Routes>
      </Suspense>

    </div>
  );
}

function Home(props) {

  return (
    <>
      <div className='main-bg' style={{backgroundImage : 'url('+bg+')'}}></div>

      <div className='container'>
        <div className='row'>
        {
          props.shoes.map(function(elem, i){
            return (
              <Card shoes={props.shoes} i={i} key={i} navigate={props.navigate} />
            )
          })
        }
        </div>
      </div>
      <button onClick={()=>{
        axios.get('https://codingapple1.github.io/shop/data2.json')
        .then((result)=>{
          console.log(result.data)
          console.log(props.shoes)
          let copy = [...props.shoes, ...result.data];
          props.setShoes(copy);
        })
        .catch(()=>{
          console.log("실패함");
        })
      }}>버튼</button>


      {
        props.shoesId.length !== 0
        ? <div className='watched-item'>
            <h3>최근 본 상품</h3>  
            {  
              props.shoesId.map(function(elem, i){
                let watchedShoes = props.shoes.find((element)=> element.id == elem);
                return (
                  <div key={i}>
                    <h4>{watchedShoes.title}</h4>
                    <p>{watchedShoes.price}원</p>
                  </div>
                )
              })
            }
          </div>
        : null  
      }

      

    </>
  )
}


function Card(props) {
  return (
    <div className='col-md-4' onClick={()=>{ props.navigate(`/detail/${props.i}`) }}>
      <img src={`https://codingapple1.github.io/shop/shoes${props.i+1}.jpg`} width="80%" alt="상품이미지" />
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].price}원</p>
    </div>
  )
}

export default App;

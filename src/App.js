import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Container, Nav} from 'react-bootstrap';
import bg from './img/bg.png';
import data from './data'
import { useState } from 'react';
import {Routes, Route, useNavigate} from "react-router-dom";
import Detail from './routes/Detail';
import axios from 'axios';
import Cart from './routes/Cart';

function App() {

  let [shoes, setShoes] = useState(data);

  let navigate = useNavigate();
  
  return (
    <div className="App">

      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{ navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/detail/0') }}>상세페이지</Nav.Link>
            <Nav.Link onClick={()=>{ navigate('/cart') }}>Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home shoes={shoes} setShoes={setShoes} />}></Route>
        <Route path="/detail/:id" element={
          <Detail shoes={shoes} />
        }></Route>
        <Route path="/cart" element={ <Cart />}></Route>
        <Route path="*" element={<div>없는 페이지 입니다.</div>}></Route>
      </Routes>

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
              <Card shoes={props.shoes} i={i} key={i} />
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
    </>
  )
}


function Card(props) {
  return (
    <div className='col-md-4'>
      <img src={`https://codingapple1.github.io/shop/shoes${props.i+1}.jpg`} width="80%" alt="상품이미지" />
      <h4>{props.shoes[props.i].title}</h4>
      <p>{props.shoes[props.i].price}원</p>
    </div>
  )
}

export default App;

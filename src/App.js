import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Container, Nav} from 'react-bootstrap';
import bg from './img/bg.png';
import data from './data'
import { useState } from 'react';

function App() {

  let [shoes, setShoes] = useState(data);

  return (
    <div className="App">
      <Navbar bg="light" variant="light">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className='main-bg' style={{backgroundImage : 'url('+bg+')'}}></div>

      <div className='container'>
        <div className='row'>

          {
            shoes.map(function(elem, i){
              return (
                <div className='col-md-4'>
                  <img src={process.env.PUBLIC_URL + `/img/shoes${i+1}.jpg`} width="80%" />
                  <h4>{shoes[i].title}</h4>
                  <p>{shoes[i].content}</p>
                </div>
              )
            })
          }


          {/* <div className='col-md-4'>
            <img src={process.env.PUBLIC_URL + '/img/shoes1.jpg'} alt="" width="80%" />
            <h4>{shoes[0].title}</h4>
            <p>설명</p>
          </div>
          <div className='col-md-4'>
            <img src={process.env.PUBLIC_URL + '/img/shoes2.jpg'} alt="" width="80%" />
            <h4>상품명</h4>
            <p>설명</p>
          </div>
          <div className='col-md-4'>
            <img src={process.env.PUBLIC_URL + '/img/shoes3.jpg'} alt="" width="80%" />
            <h4>상품명</h4>
            <p>설명</p>
          </div> */}
        </div>
      </div>

    </div>
  );
}

export default App;

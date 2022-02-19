import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  const [inputValues, setInputValues]= useState({
    age:20,
    sex:1,
    trestbps:145,
    fbs:1,
    restecg:1,
    thal:1,
    slope:0,
    cp:3,
    oldpeak:2.3,
    exang:1,
    feature1:2.4,
    ca:5,
    thalach:2,
    chol:200,
  });
  const[respon,setRespon]=useState('op')
  require('react-dom');
  window.React2 = require('react');
  console.log(window.React1 === window.React2);
  const[isLoading,setLoading]=useState(false)
  const[result,setResult]=useState('Hi')


  const handleChange=(event)=>{
    const {name,value}=event.target;
    setInputValues((prevState)=>{
      return{
        ...prevState,
        [name]:parseFloat(value),
      };
    });
    
    }
 


  const handleSubmit=(event)=>{
    
    setRespon('po');
    const userData=inputValues;
    console.log(userData);
    setLoading(true);
    fetch('https://heart-disease-p.herokuapp.com/prediction/',
    {
      headers:{

        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      method:'POST',
      body:JSON.stringify(userData)
    })
    .then(response=>response.json())
    .then(response=>{
      console.log('Got response',response)
      setRespon(response)
      setResult(response.result)
      
    });
    event.preventDefault();
    setLoading(false);
  };
    /*fetch('/time').then(res=>res.json()).then(data=>{
      setResult(data.time)
    });
    event.preventDefault();
    setLoading=false

  };
  const {age,sex,cp}=inputValues;

  /*useEffect(()=>{
    fetch('/time').then(res=> res.json()).then(data=>{
      setCurrentTime(data.time);
    });
  });
  handleChange=(event)=>{

  }*/

  
  return (
    <div className="App">
      <div className='App-header'>
        <h2>Heart Disease Prediction</h2>
        <p>Note: This project is made just to practice. If you think you have a heart problem,
          please visit your doctor.
        </p>
      </div>
        
        
      <div className="form-container">
        <Form onSubmit={handleSubmit}> 
          
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Row><Col>
          <Form.Label>Age</Form.Label>
          <Form.Control name='age' value={inputValues.age} onChange={handleChange} type="number" placeholder="Enter Your Age" />
          </Col><Col>
          <Form.Label>Sex</Form.Label>
          <Form.Select name='sex' value={inputValues.sex} onChange={handleChange}> 
            <option value={1} >Male</option>
            <option value={0} >Female</option>
          </Form.Select>
          </Col></Row>
          <Row><Col>
          <Form.Label>Chest Pain Type</Form.Label>
          <Form.Select name='cp' value={inputValues.cp} onChange={handleChange}>
            <option value={0} >0</option>
            <option value={1}>1</option>
            <option value={2} >2</option>
            <option value={3} >3</option>
          </Form.Select>
          </Col><Col>
          <Form.Label>Resting Blood Pressure</Form.Label>
          <Form.Control name='trestbps' value={inputValues.trestbps} onChange={handleChange} type="number" placeholder="In mm Hg" />
          </Col></Row></Form.Group>
          <Form.Group>
          <Row>
            <Col>
            <Form.Label>Serum Cholestrol Amount</Form.Label>
            <Form.Control name='chol' value={inputValues.chol} onChange={handleChange} type="number" placeholder="In mg/dl" />
            </Col>
            <Col>
            <Form.Label>Fasting Blood Sugar</Form.Label>
            <Form.Select name='fbs' type='number' value={inputValues.fbs} onChange={handleChange} >
              <option value={1} >True</option>
              <option value={0} >False</option>
            </Form.Select>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
            <Form.Label>Slope of the Peak Exercise ST segment</Form.Label>
            <Form.Select name='slope' value={inputValues.slope} onChange={handleChange}>
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
            </Form.Select>
            </Col>
            <Col>
            <Form.Label>Thal</Form.Label>
            <Form.Select name='thal'  value={inputValues.thal} onChange={handleChange} >
              <option value={0}>0</option>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
            </Form.Select>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
            <Form.Label>Resting Electrocardiographic Results</Form.Label>
            <Form.Select name='restecg' value={inputValues.restecg} onChange={handleChange} >
              <option value={0} >0</option>
              <option value={1} >1</option>
              <option value={2} >2</option>
            </Form.Select>
            </Col>
            <Col>
            <Form.Label>Maximum Heart Achieved</Form.Label>
            <Form.Control name='thalach' value={inputValues.thalach} onChange={handleChange} type="number" placeholder="Enter Max Heart rate"></Form.Control>
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Row>
            <Col>
            <Form.Label>Exercise Induced Angina</Form.Label>
            <Form.Select name='exang' value={inputValues.exang} onChange={handleChange} >
              <option value={1}>Yes</option>
              <option value={0}>No</option>
            </Form.Select>
            </Col>
            <Col>
            <Form.Label>St Depression Induced by Exercise Relative to Rest</Form.Label>
            <Form.Control name='oldpeak' value={inputValues.oldpeak} onChange={handleChange} type="number" placeholder="ST Depression" />
            </Col>
          </Row>
        </Form.Group>
        <Form.Group>
          <Form.Label>Number of major vessels colored by flourosopy</Form.Label>
          <Form.Select name='ca' value={inputValues.ca} onChange={handleChange}>
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
          </Form.Select>
        </Form.Group>
        {result}
        <Form.Group>
        <Popup trigger={<Button variant="primary" type="submit">
          Submit
        </Button>}
        modal
        nested>
          <p>{result}</p>
        </Popup>
        </Form.Group>
      </Form>
        </div>
    
    </div>
  );
}

export default App;

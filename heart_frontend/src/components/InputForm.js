import React, {useEffect, useState} from 'react';
import {TextField, Grid, InputLabel,MenuItem,FormControl,Select} from '@mui/material';
import Button from 'react-bootstrap/Button';
import {Container, Row, Col} from 'react-bootstrap';
import Popup from 'reactjs-popup';
function InputForm(){
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
       
    
      
      return (
        <div className="Form">
    
       
        
            <form className='input-form' onSubmit={handleSubmit}> 
            <Row>
              <Col>
                <TextField sx={{m:1}} onChange={handleChange} value={inputValues.age} required  label='Age' variant='standard' />
              </Col>
              <Col>
                <FormControl variant='standard'>
                  <InputLabel>Sex</InputLabel>
                  <Select
                    value={inputValues.sex}
                    onChange={handleChange}
                    label='Sex'
                  >
                    <MenuItem value={0}>Female</MenuItem>
                    <MenuItem value={1}>Male</MenuItem>

                  </Select>

                </FormControl>
              </Col>
            </Row>
            <Row>
              <Col>
              <FormControl sx={{m:1}} xs={6} variant='standard'>
                <InputLabel>Chest Pain Type</InputLabel>
                <Select
                  autowidth
                  value={inputValues.cp}
                  onChange={handleChange}
                  label='Chest Pain Type'
                >
                  <MenuItem value={0}>0</MenuItem>
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                </Select>
              </FormControl>
              
              </Col>
              <Col>
                <TextField required value={inputValues.chol} label='Serum Cholestrol Amount' variant='standard' onChange={handleChange} />
              
              </Col>

            </Row>
            
            
            <TextField required value={inputValues.trestbps} label='Fasting Blood Sugar' variant='standard' onChange={handleChange} />

            <FormControl variant='standard'>
              <InputLabel>Fasting Blood Pressure</InputLabel>
              <Select
                value={inputValues.fbs}
                onChange={handleChange}
                label='Fasting Blood Sugar'
              >
                <MenuItem value={0}>False</MenuItem>
                <MenuItem value={1}>True</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant='standard'>
              <InputLabel>Slope of the Peak Exercise</InputLabel>
              <Select
                value={inputValues.slope}
                onChange={handleChange}
                label='Slope'
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant='standard'>
              <InputLabel>Thal</InputLabel>
              <Select
                value={inputValues.thal}
                onChange={handleChange}
                label='Thal'
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant='standard'>
              <InputLabel>Resting Electrocardiographic Results</InputLabel>
              <Select
                value={inputValues.restecg}
                onChange={handleChange}
                label='Rest Ecg'
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
               
              </Select>
            </FormControl>
            <TextField type='number' required value={inputValues.thalach} variant='standard' onChange={handleChange} />
            <FormControl variant='standard'>
              <InputLabel>Exercise Induced Angina</InputLabel>
              <Select
                value={inputValues.exang}
                onChange={handleChange}
                label='Exang'
              >
                <MenuItem value={0}>No</MenuItem>
                <MenuItem value={1}>Yes</MenuItem>
             
              </Select>
            </FormControl>

            <TextField
              required
              value={inputValues.oldpeak}
              type='number'
              onChange={handleChange}
              label='St Depression Induced w.r.t Rest'
              varian='standard'
            />
            <FormControl variant='standard'>
              <InputLabel>Number of major vessels colored by flourosopy</InputLabel>
              <Select
                value={inputValues.ca}
                onChange={handleChange}
                label='ca'
              >
                <MenuItem value={0}>0</MenuItem>
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
              </Select>
            </FormControl>
            <Popup trigger={<Button variant="primary" type="submit">
              Submit
            </Button>}
            modal
            nested>
              <p>{result}</p>
            </Popup>
         
          </form>
          
            
            
            
        </div>
      );

}
 export default InputForm;
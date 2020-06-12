import React ,{useState, Component} from 'react';
import {  TextField,FormControlLabel, Button,Grid,Link,Checkbox ,Container, styled} from '@material-ui/core';
import axios from '../utils/axios';
import Header from '../components/Header/Header'
import Draggable from '../components/Dnd/Draggable'
import Droppable from '../components/Dnd/Droppable'
import { getPatientsPorAtender } from '../api/user'

const Wrapper = {
    
    padding: '32px',
    display: 'flex',
    justifyContent: 'center'
};

const Item = {
    padding: '8px',
    color: '#555',
    backgroundColor: 'white',
    borderRadius: '3px'
}

const droppableStyle = {
    background: '#ebecf0',
    width: '250px',
    heigth: '400px',
    margin: '32px'
};




export default class Home extends Component{

    state = {
        porAtender: [],
        Atendidos: []
    }
    //console.log("pacientes", items);
    
    
    componentDidMount() {
    
        this.getDataPorAnteder()
        this.getDataAtendido()
        
    }
    
    getDataPorAnteder(){
        return axios({
            method: 'get',
            url : 'patient/porAtender',
        }).then(response => {
            console.log(response.data);
            this.setState({porAtender: response.data})
            
        })
    }

    getDataAtendido(){
        return axios({
            method: 'get',
            url : 'patient/Atendidos',
        }).then(response => {
            console.log(response.data);
            this.setState({Atendidos: response.data})
            
        })
    }
   
   
    
    render(){
        function Listar(props) {
            const patient = props.patients;
            const listItems = patient.map((patient) =>
        <Draggable key={patient.patient_id} state_patient_id={patient.state_patient_id} id={`${patient.patient_id}`} style={{margin: '8px'}}><div style={Item}>{patient.firstNamePatient}</div></Draggable>
            );
            return listItems;
          }
        
        return(
            <div>
                <Header></Header>
                <div style={Wrapper}>
                    <Droppable id="1" style={droppableStyle}>
                        <div style={{margin:'5px',padding:'5px', fontSize:'20px',fontWeight:'bold'}}>Pacientes</div>
                        <Listar patients={this.state.porAtender}></Listar>
                    </Droppable>
                    <Droppable id="2" style={droppableStyle}>
                        <div style={{margin:'5px',padding:'5px', fontSize:'20px',fontWeight:'bold'}}>Enfermeria</div>
                        <Listar patients={this.state.Atendidos}></Listar>
                    </Droppable>
                    <Droppable id="3" style={droppableStyle}>
                        <div style={{margin:'5px',padding:'5px', fontSize:'20px',fontWeight:'bold'}}>Despacho</div>
                    {/* <Listar patients={this.state.Atendidos}></Listar> */}
                    </Droppable>
                    
                    
                </div>
            </div>
        );
    }
}

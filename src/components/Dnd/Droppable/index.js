import  React, {Component} from "react";
import {cambiarAtendido} from '../../../api/patient'
import SimpleModal from '../../Modal/ModalCreate'



export default class Droppable extends Component{

    
    drop = e => {
        e.preventDefault();
        const patient_id = e.dataTransfer.getData('patient_id')
        const state_patient_id = e.dataTransfer.getData('state_patient_id')
        const patient = document.getElementById(patient_id)

        patient.style.display = 'block'

        
        
        
        e.target.appendChild(patient);

        
        console.log("haciendo drop");
        console.log("mi id",patient_id ,"mi estado",state_patient_id, "cambiando a ", this.props.id );

        if(state_patient_id === this.props.id){
            console.log("esta en el mismo estado")
        }else{
            cambiarAtendido(patient_id,"cambiando oa",this.props.id).then((result) => {
                console.log("paciente cambio estado a ",this.props.id);
                
            }).catch((err) => {
                console.log("error en cambio de esstado");
            });
        }

        
           
        
    }

    allowDrop = e => {
        e.preventDefault()
    }

    render(){
        function Agregar(props){
    
            return <SimpleModal></SimpleModal>
        }
        return(
            <div id={this.props.id}  onDrop={this.drop} onDragOver={this.allowDrop} style={this.props.style}>
                
                {this.props.children}
                {
                    this.props.id === "1" ?
                     <Agregar miestado={this.props.id} estado={this.props.estado}></Agregar>:
                     <p></p>
                }
            </div>
        );
    }

    
}

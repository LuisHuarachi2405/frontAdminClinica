import  React, {Component} from "react";
import PropTypes from 'prop-types';

export default class Draggable extends Component{

    constructor(props) {
        super(props)
        this.state = { patients: [] }
      }
    
    drag = e => {
        e.dataTransfer.setData('patient_id', e.target.id)
        e.dataTransfer.setData('state_patient_id', this.props.state_patient_id)
        console.log("haciendo drag");
 
    }

    noAllowDrop = e => {
        e.stopPropagation()
    }

    render(){
        
        return(
            
            <div id={this.props.id} state_patient_id={this.props.state_patient_id} draggable="true" onDragStart={this.drag} onDragOver={this.noAllowDrop} style={this.props.style}>
                {this.props.children}
            </div>
        );
    }

    
}

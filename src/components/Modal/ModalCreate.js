import  React  from "react";
import { makeStyles } from '@material-ui/core/styles';
import {  TextField,FormControlLabel, Button,Grid,Link,Checkbox ,Container} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import axios from '../../utils/axios';

function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

  
const styleButton = ({
    backgrounColor:'red',
    border: 'none',
    cursor:'pointer',
    outline:'none',
    margin :'8px',
    hover:'hidden',
    height: '15px',
});

export default function SimpleModal(props) {
    const classes = useStyles();

    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);
    const [open, setOpen] = React.useState(false);

    const [nombre, setNombre] = React.useState()
    const [apellido, setApellido] = React.useState()
    const [celular, setCelular] = React.useState()
    const [seguro, setSeguro] = React.useState()
    const [doctor, setDoctor] = React.useState()
    const [oa, setOa] = React.useState()

    const handleNombre = (e) =>{
        setNombre(e.target.value)
    }
    const handleApellido = (e) =>{
        setApellido(e.target.value)
    }
    const handleCelular = (e) =>{
        setCelular(e.target.value)
    }
    const handleSeguro = (e) =>{
        setSeguro(e.target.value)
    }
    const handleDoctor = (e) =>{
        setDoctor(e.target.value)
    }
    const handleOa = (e) =>{
        setOa(e.target.value)
    }

    const handleSubmit = (e) => {
        const id_usuario = localStorage.getItem("usuario_id");

        e.preventDefault();
        axios({
            method: 'post',
            url : 'patient/createPatient',
            data: {
                firstNamePatient: nombre,
                lastNamePatient: apellido,
                cellphone: celular,
                sure: seguro,
                doctor: doctor,
                oa: oa,
                type_patient_id: 1,
                user_delivery_id: 1,
                usuario_id:id_usuario,
                state_patient_id:1,
                estado:1
            }
        }).then(response => {
            console.log('Paciente creado', response)
            window.location.reload(); 
        }).catch(error => {
            console.log('hubo un error en registro', error);
            
        })
        
        
    }

  
    const handleOpen = () => {
      setOpen(true);
        };
  
    const handleClose = () => {
      setOpen(false);
    };



  
    const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">Agregando Paciente</h2>
        <Container component="main" maxWidth="xs">
            <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="nombre"
            name="nombre"
            label="Nombres"
            fullWidth
            value= {nombre}
            onChange= {handleNombre}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="apellido"
            name="apellido"
            label="Apellidos"
            fullWidth
            value= {apellido}
            onChange= {handleApellido}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            type='number'
            required
            id="celular"
            name="celular"
            label="Celular"
            value= {celular}
            onChange= {handleCelular}
            fullWidth
          />
          </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="seguro"
            name="seguro"
            label="Seguro"
            fullWidth
            value= {seguro}
            onChange= {handleSeguro}
          />
        </Grid>
        
        <Grid item xs={12} >
          <TextField
            id="doctor"
            name="doctor"
            label="Doctor"
            fullWidth
            value= {doctor}
            onChange= {handleDoctor}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="oa"
            name="oa"
            label="Codigo OA"
            fullWidth
            value= {oa}
            onChange= {handleOa}
          />
        </Grid>
        
      </Grid>
        <Grid container justify="space-around"  spacing={5}>
            <Grid item xs={12} sm={6}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    //className={classes.submit}
                    >
                    Crear
                </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Button
                    onClick= {handleClose}
                    fullWidth
                    variant="contained"
                    color="primary"
                    //className={classes.submit}
                    >
                    Cancelar
                </Button>
            </Grid>
        </Grid>
     
        </form>
        </Container>
        
      </div>
    );
  
    return (
      <div>
        <button style={styleButton} type="button" onClick={handleOpen}>
          + Agregar Paciente
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    );
  }
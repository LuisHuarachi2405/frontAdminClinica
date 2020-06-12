import React ,{Component} from 'react';
import {  TextField,FormControlLabel, Button,Grid,Link,Checkbox ,Container} from '@material-ui/core';
import axios from '../utils/axios';


class Login extends Component{

    state = {
        usuario: '',
        password: ''
    }

    usuarioHandler = e => this.setState({usuario: e.target.value})
    passwordHandler = e => this.setState({password: e.target.value})

    submitHandler = e => {
        e.preventDefault();
        axios({
            method: 'post',
            url : 'user/login',
            data: {
                username: this.state.usuario,
                password: this.state.password
            }
        }).then(response => {
            console.log('mi data', response)
            localStorage.setItem('usuario_id', response.data.usuario_id)
            this.props.history.push('/panel')
        }).catch(error => {
            console.log('hubo un error en logeo', error);
            
        })
        
    }

    render(){
    return (
        <div>
            <div style={{height:'100px'}}></div>
            <Container component="main" maxWidth="xs">
            <form onSubmit = {this.submitHandler}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            label="Usuario"
            name="usuario"
            autoFocus
            value={this.state.usuario}
            onChange = {this.usuarioHandler}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={this.state.password}
            onChange = {this.passwordHandler}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            //className={classes.submit}
          >
            Iniciar Sesion
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                No recuerda su contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"No tiene cuenta? Registrese"}
              </Link>
            </Grid>
          </Grid>
        </form>
        </Container>
        </div>
    );
    }
}

export default Login
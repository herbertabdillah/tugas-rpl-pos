import React, { Component } from 'react';
import {
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  withStyles
} from '@material-ui/core';
import axios from 'axios';
import NavBar from '../components/NavBar';
// import PropTypes, { instanceOf } from 'prop-types';

import Cookies from "js-cookie";
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
const styles = theme => ({
    back: {
        backgroundColor: 'black'
    }
})
class Register extends Component {
    // static propTypes = {
    //     Cookies: instanceOf(Cookies).isRequired
    //   };
    
    constructor(props){
        super(props);
        this.state={
            username:'',
            name:'',
            password:'',
            auth:{
                status:'error'
            },
            isLogin:''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    authCheck = () => {
        let test;
        try {
            // test = typeof Cookies.get('login');
        test = Cookies.get('login');
        //  test = Cookies.get('login');
        }catch(err){
        //  test=false;
        }
        if(typeof test != 'undefined'){
            this.setState({
                isLogin:true
            });
        } else {
            this.setState({
                isLogin:false
            });
        }
    };
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        // console.log(this.state.email);
        // console.log(this.state.password);
    }
    handleSubmit(e){
        e.preventDefault();
        axios.post('/api/users/register', {name: this.state.name, email: this.state.email, password: this.state.password}).then(
          response => {
            //   console.log(response);
              this.setState({
                  auth: response.data
              });
              console.log(this.state.auth);
              
                if(this.state.auth.status !== 'error') {
                    // console.log('login berhasil');
         
                    // Cookies.set('token', this.state.auth.data.token, {path:'/'});
                    // Cookies.set('name', this.state.auth.data.user.name, {path:'/'});
                    // Cookies.set('login', 'true', {path:'/'});
                    // this.infoLogin = null;
                    // this.setState({isLogin:true});
                    alert('Register Berhasil');
                    window.location.href='/signin';                
                }else {
                    this.infoLogin =
                    <Paper className='paper48'>   
                        <Typography variant='display1' align='center' gutterBottom>
                            Daftar Gagal
                        </Typography>
                    </Paper>;
                    // console.log('login gagal');
                    this.setState({isLogin:false});
                   
                }
          }
        ).catch(
            function(error){
                console.log(error);
            }
        );
        
      }

    
    render(props) {

      return (
          <div className="container" >
<div style={{width:'100%',margin:'auto', backgroundColor:'rgb(67, 160, 71)'}}>
        <div className='header80'>
          <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
          Register
          </Typography>
          {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
            Isi formulir dibawah untuk menambahkan taman.
          </Typography> */}
        </div>
      </div>


        <div style={{marginTop:'24px'}}>
            <Grid container style={{height:'80%', display:'flex', justifyContent:'center', alignItems:'center'}}>
                
                <Grid item xs={12} sm={8} lg={8} xl={8} >
                    {this.infoLogin}
                    <Paper className='paper48'>
                        <Typography variant='display1' align='center' gutterBottom>
                        Daftar
                        </Typography>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                            name='email'
                            label='E-Mail'
                            value={this.state.email}
                            onChange={this.handleChange}
                            margin='normal'
                            type='email'
                            style={{width:'100%'}}
                            
                            />
                            <TextField
                            name='name'
                            label='Nama'
                            value={this.state.name}
                            onChange={this.handleChange}
                            margin='normal'
                            type='text'
                            style={{width:'100%'}}
                            
                            />
                            <br/>
                            <TextField
                            name='password'
                            label='Password'
                            value={this.state.password}
                            onChange={this.handleChange}
                            margin='normal'
                            type='password'
                            style={{width:'100%', height:36}}
                            
                            />
                            <br/>
                            <Button
                            type='submit'
                            color='primary'
                            variant="contained"
                            align='center'
                            style={{width: '100%', marginTop:'30px'}}
                            >
                                Daftar
                            </Button>
                        </form>
                    </Paper>
                </Grid>
            </Grid>
        </div>
        </div>
      );
    }
}

// export default SignIn

export default withStyles(styles)(Register);

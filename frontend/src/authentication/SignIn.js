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
import { BrowserRouter as Redirect } from "react-router-dom";
import Auth from '../function/Auth';

// import PropTypes, { instanceOf } from 'prop-types';

// import Cookies from "js-cookie";
const styles = theme => ({
    back: {
        backgroundColor: 'black'
    }
})
class SignIn extends Component {
    
    constructor(props){
        super(props);
        this.state={
            username:'',
            name:'',
            password:'',
            auth:{
                status:'error'
            },
            isLogin:false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount(){
        this.authCheck();
    }
    authCheck = () => {
        let test;
        try {
        test = Auth.isLogin();
        }catch(err){
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
    }
    handleSubmit(e){
        e.preventDefault();
        axios.post('/api/users/login', {email: this.state.email, password: this.state.password}).then(
          response => {
            //   console.log(response);
              this.setState({
                  auth: response.data
              });
              console.log(this.state.auth);

                if(this.state.auth.status !== 'error') {
                    console.log('login berhasil');
                    Auth.setLogin(this.state.auth.data);
                    // Cookies.set('token', this.state.auth.data.token, {path:'/'});
                    // Cookies.set('name', this.state.auth.data.user.name, {path:'/'});
                    // Cookies.set('role', this.state.auth.data.user.role, {path:'/'});
                    // Cookies.set('login', 'true', {path:'/'});
                    this.infoLogin = null;
                    // window.location.reload();
                    window.location.href='/';
                    // this.setState({isLogin:true});
                    // alert('Login Berhasil');
                    
                }else {
                    this.infoLogin =
                    <Paper className='paper48'>
                        <Typography variant='display1' align='center' gutterBottom>
                            Login Gagal
                        </Typography>
                    </Paper>;
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
            <div style={{
                backgroundImage:'url("/img/loginback.jpeg")',
                height: '100%',
                flex:1,
                'background-repeat':'no-repeat',
                'background-size':'cover'
            }}>
           
                <div className="container">
                <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(67, 160, 71)'}}>
        <div className='header80'>
          <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
          Masuk
          </Typography>
          {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
            Isi formulir dibawah untuk menambahkan taman.
          </Typography> */}
        </div>
      </div>
                    <Grid container style={{height:'80%', display:'flex', justifyContent:'center', alignItems:'center',marginTop:'24px'}}>
                        
                        <Grid item xs={12} sm={4} lg={3} xl={2} >
                            {this.infoLogin}
                            <Paper className='paper48'>
                                {/* <Typography variant='display1' align='center' gutterBottom>
                                Masuk
                                </Typography> */}
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
                                    <br/>
                                    <TextField
                                    name='password'
                                    label='Password'
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    margin='normal'
                                    type='password'
                                    style={{width:'100%'}}
                                    
                                    />
                                    <br/>
                                    <br/>
                                    <div style={{textAlign:'center', color:'#656565'}}>
                                        Lupa Password - Buat Akun Baru
                                    </div>
                                    
                                    <Button
                                    type='submit'
                                    color='primary'
                                    variant="contained"
                                    align='center'
                                    style={{width: '100%', marginTop:'30px'}}
                                    >
                                        Masuk
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

export default withStyles(styles)(SignIn);

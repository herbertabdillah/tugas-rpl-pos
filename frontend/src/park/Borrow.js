import React, { Component } from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  Stepper,
  Step,
  StepLabel,
  TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { BrowserRouter as Redirect } from "react-router-dom";
import queryString from 'query-string';
import PropTypes from 'prop-types';

// import PropTypes, { instanceOf } from 'prop-types';

import Cookies from "js-cookie";
  const styles = theme => ({
    root: {
      maxWidth: '100%',
      flexGrow: 1,
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      height: 50,
      paddingLeft: theme.spacing.unit * 4,
      backgroundColor: theme.palette.background.default,
    },
    img: {
      height: 255,
      display: 'block',
      maxWidth: 400,
      overflow: 'hidden',
      width: '100%',
    },
  });
class Borrow extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'z',
            name:'',
            parkData:{
                id:'',
                name:'', 
                photo:['https://i.stack.imgur.com/181Qp.gif'],
                facility:[''],
                address:{
                    city:'',
                    district:'',
                    street:'',
                    zipcode:'',
                    coordinate:''
                }
            },
            auth:{
                status:'error'
            },
            namaKegiatan: '',
            jenisKegiatan: '',
            jumlahPeserta: '',
            deskripsiKegiatan: '',
            tanggalMulai: '',
            jamMulai: '',
            tanggalSelesai: '',
            jamSelesai: '',
            proposal: '',
            isLogin:'',
            namaInstansi:'',
            jenisInstansi:'',
            alamatInstansi:'',
            emailInstansi:'',
            activeStep: 0,
            skipped: new Set()
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount(){
        let id = queryString.parse(this.props.location.search).id;
        console.log(id)
        this.setState({
            id:id
        },
        () => {
            this.fetchPark();
        });

    }
    getSteps = () => {
        return ['Profil Peminjam', 'Tujuan Peminjaman', 'Pembayaran'];
      };
      
    getStepContent = (step) => {
        switch (step) {
          case 0:
            return(<div>
                <Paper className='paper48'>
                    <Typography variant="h6">
                        Profil Instansi
                    </Typography>      
                    <TextField
                    required
                    name='namaInstansi'
                    label="Nama Instansi"
                    style={{ margin: 8, width:"100%" }}
                    helperText="Contoh : 'Himpunan Mahasiswa Teknik Informatika UIN Jakarta'"
                    margin="normal"
                    value={this.state.namaInstansi}
                    onChange={this.handleChange}
                    />
                    <TextField
                    required
                    name='jenisInstansi'
                    label="Jenis Instansi"
                    style={{ margin: 8, width:"100%" }}
                    helperText="Contoh : 'Badan Eksekutif Mahasiswa Jurusan'"
                    margin="normal"
                    value={this.state.jenisInstansi}
                    onChange={this.handleChange}
                    />                    
                    <TextField
                    required
                    name='alamatInstansi'
                    label="Alamat Instansi"
                    style={{ margin: 8, width:"100%" }}
                    helperText="Contoh : 'Jl. Raya Bogor No. 34'"
                    margin="normal"
                    value={this.state.alamatInstansi}
                    onChange={this.handleChange}
                    />
                    <TextField
                    required
                    type='email'
                    name='emailInstansi'
                    label="Email Instansi"
                    style={{ margin: 8, width:"100%" }}
                    helperText="Contoh : 'himti@uinjkt.ac.id'"
                    margin="normal"
                    value={this.state.emailInstansi}
                    onChange={this.handleChange}
                    />                                        
                </Paper>
            </div>
            );
          case 1:
            return(<div>
                <Paper className='paper48'>
                    <TextField
                    required
                    name='namaKegiatan'
                    label="Nama Kegiatan"
                    style={{ margin: 8, width:"100%" }}
                    helperText="Contoh : 'Kopdar Pulsar 200NS'"
                    margin="normal"
                    value={this.state.namaKegiatan}
                    onChange={this.handleChange}
                    />
                    </Paper>
                    <Paper className='paper48'>
                    <Typography variant="h6">
                        Keterangan Kegiatan
                    </Typography>                    
                    <TextField
                    required
                    name='jenisKegiatan'
                    label="Jenis Kegiatan"
                    style={{ margin: 8, width:'40%' }}
                    helperText="Jika kegiatan tidak ada di daftar, pilih lainnya"
                    margin="normal"
                    value={this.state.jenisKegiatan}
                    onChange={this.handleChange}
                    />
                    <TextField
                    required
                    name='jumlahPeserta'
                    label="Perkiraan Jumlah Peserta"
                    style={{ margin: 8, width:'40%' }}
                    helperText="Contoh : 50"
                    margin="normal"
                    value={this.state.jumlahPeserta}
                    onChange={this.handleChange}
                    />                
                    <br/>
                    <TextField
                    required
                    name='deskripsiKegiatan'
                    label="Deskripsi Kegiatan"
                    style={{ margin: 8, width:"100%" }}
                    helperText="Masukan deskripsi singkat kegiatan"
                    margin="normal"
                    value={this.state.deskripsiKegiatan}
                    onChange={this.handleChange}
                    />
                    <br/>    
                    <TextField
                    name="tanggalMulai"
                    value={this.state.tanggalMulai}
                    onChange={this.handleChange}
                    label="Tanggal Mulai"
                    type="date"
                    defaultValue="2017-05-24"
                    style={{ margin: 8, width:'40%' }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    />
                    <TextField
                    name="jamMulai"
                    value={this.state.jamMulai}       
                    onChange={this.handleChange}             
                    label="Jam Mulai"
                    type="time"
                    defaultValue="07:30"
                    style={{ margin: 8, width:'40%' }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                    />
                    <br/>                
                    <TextField
                    name="tanggalSelesai"
                    value={this.state.tanggalSelesai}
                    onChange={this.handleChange}
                    label="Tanggal Selesai"
                    type="date"
                    defaultValue="2017-05-24"
                    style={{ margin: 8, width:'40%' }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    />
                    <TextField
                    name="jamSelesai"
                    value={this.state.jamSelesai}
                    onChange={this.handleChange}
                    label="Jam Selesai"
                    type="time"
                    defaultValue="07:30"
                    style={{ margin: 8, width:'40%' }}
                    InputLabelProps={{
                    shrink: true,
                    }}
                    inputProps={{
                    step: 300, // 5 min
                    }}
                    />                 
                    <br/>
                    {this.state.tanggalMulai}
                    <br/>
                    {this.state.jamMulai}
                    <Typography variant="h6">
                        Proposal Kegiatan
                    </Typography>  
                    <Button
                    color='primary'
                    variant='outlined'
                    align='center'
                    style={{width: '100%', marginTop:'30px'}}
                    onClick={e => {
                        this.refs['file-upload'].click()
                    }}
                    >Upload proposal
                    <input ref={'file-upload'} style={{display:'none'}} type="file" name="myImage" onChange= {this.onPhotosChange} multiple />
                    </Button>                       
                </Paper>
            </div>
            );
          case 2:
            return 'Pembayaran';
          default:
            return 'Unknown step';
        }
      };
    handleNext = () => {
    this.setState(prevState => ({
        activeStep: prevState.activeStep + 1,
    }));
    };

    handleBack = () => {
    this.setState(prevState => ({
        activeStep: prevState.activeStep - 1,
    }));
    };

    handleStepChange = activeStep => {
    this.setState({ activeStep });
    };
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
    fetchPark = () => {
        console.log(this.state.id);
        let postData = {
            
                parkId: this.state.id
            
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
                'x-access-token': Cookies.get('token')
            }
        };
        axios.post('/api/parks/get',
        postData, axiosConfig).then(
            response => {
                console.log(response);
                this.setState({
                    parkData: response.data.data.park
                });
                console.log(this.state.parkData);
  //z
                  if(response.data.status !== 'error') {
                      console.log('fetch berhasil');
                      // const { Cookies } = this.props;
                    //   Cookies.set('token', this.state.auth.data.token, {path:'/'});
                    //   Cookies.set('name', this.state.auth.data.user.name, {path:'/'});
                    //   Cookies.set('login', 'true', {path:'/'});
                    //   this.infoLogin = null;
                    //   this.setState({isLogin:true});
                    //   window.location.reload();
                    //   alert('Login Berhasil');
                    //   return(
                    //       <Redirect to='/' />
                    //   );
                  }else {
                    console.log('fetch gagal');
                    //   this.infoLogin =
                    //   <Paper style={{padding: 24, marginBottom: '10px'}}>   
                    //       <Typography variant='display1' align='center' gutterBottom>
                    //           Login Gagal
                    //       </Typography>
                    //   </Paper>;
                    //   // console.log('login gagal');
                    //   this.setState({isLogin:false});
                     
                  }
            }
          ).catch(
              function(error){
                  console.log(error);
              }
          );
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
        axios.post('/api/users/login', {email: this.state.email, password: this.state.password}).then(
          response => {
            //   console.log(response);
              this.setState({
                  auth: response.data
              });
              console.log(this.state.auth);

                if(this.state.auth.status !== 'error') {
                    console.log('login berhasil');
                    // const { Cookies } = this.props;
                    Cookies.set('token', this.state.auth.data.token, {path:'/'});
                    Cookies.set('name', this.state.auth.data.user.name, {path:'/'});
                    Cookies.set('login', 'true', {path:'/'});
                    this.infoLogin = null;
                    this.setState({isLogin:true});
                    window.location.reload();
                    alert('Login Berhasil');
                    return(
                        <Redirect to='/' />
                    );
                }else {
                    this.infoLogin =
                    <Paper className='paper48'>
                        <Typography variant='display1' align='center' gutterBottom>
                            Login Gagal
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

      isStepOptional = step => {
        return step === 1;
      };
    
      handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        if (this.isStepSkipped(activeStep)) {
          skipped = new Set(skipped.values());
          skipped.delete(activeStep);
        }
        this.setState({
          activeStep: activeStep + 1,
          skipped,
        });
      };
    
      handleBack = () => {
        this.setState(state => ({
          activeStep: state.activeStep - 1,
        }));
      };
    
      handleSkip = () => {
        const { activeStep } = this.state;
        if (!this.isStepOptional(activeStep)) {
          // You probably want to guard against something like this,
          // it should never occur unless someone's actively trying to break something.
          throw new Error("You can't skip a step that isn't optional.");
        }
    
        this.setState(state => {
          const skipped = new Set(state.skipped.values());
          skipped.add(activeStep);
          return {
            activeStep: state.activeStep + 1,
            skipped,
          };
        });
      };
    
      handleReset = () => {
        this.setState({
          activeStep: 0,
        });
      };
    
      isStepSkipped = (step) => {
        return this.state.skipped.has(step);
      }
    render(props) {
    const { classes, theme } = this.props;
    const steps = this.getSteps();
    const { activeStep } = this.state;

 
      return (
         <div className="container">
            <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(67, 160, 71)'}}>
                <div className='header80'>
                    <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
                    Peminjaman Taman {this.state.parkData.name}
                    </Typography>
                    {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
                        Isi formulir dibawah untuk menambahkan taman.
                    </Typography> */}
                </div>
            </div>
            <div className='content80' center={1}>
                <Stepper activeStep={activeStep}>
                    {steps.map((label, index) => {
                        const props = {};
                        const labelProps = {};
                        if (this.isStepOptional(index)) {
                            labelProps.optional = <Typography variant="caption">Optional</Typography>;
                        }
                        if (this.isStepSkipped(index)) {
                            props.completed = false;
                        }
                        return (<Step key={label} {...props}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>);
                    })}
                </Stepper>
                <div>
                {activeStep === steps.length ? (
                    <div>
                    <Typography className={classes.instructions}>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={this.handleReset} className={classes.button}>
                        Reset
                    </Button>
                    </div>
                ) : (
                    <div>
                        <Typography className={classes.instructions}>{this.getStepContent(activeStep)}</Typography>
                    <div>
                        <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                        >
                        Back
                        </Button>
                        {this.isStepOptional(activeStep) && (
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={this.handleSkip}
                            className={classes.button}
                        >
                            Skip
                        </Button>
                        )}
                        <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                        >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
              </div>
            </div>
          )}
        </div>
            </div>
        </div>
      );
    }
}

// export default SignIn
Borrow.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
export default withStyles(styles, { withTheme: true })(Borrow);

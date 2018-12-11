import React, { Component } from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Chip,
  AppBar,
  Tabs,
  Tab,
  TextField,
  RadioGroup,
  Radio,
  FormControlLabel
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { BrowserRouter as Redirect, Link } from "react-router-dom";
import queryString from 'query-string';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';
import Auth from '../function/Auth';
// import PropTypes, { instanceOf } from 'prop-types';

import Cookies from "js-cookie";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
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
class View extends Component {
    constructor(props){
        super(props);
        this.state={
            id:'',
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
                },
                description: '',
                review: []
            },
            auth:{
                status:'error'
            },
            review:'',
            isLogin:'',
            value: 0,
            estField:'',
            est: {}
        };
        this.handleChange = this.handleChange.bind(this);
        this.TabContainer.propTypes = {
            children: PropTypes.node.isRequired,
        };
        // this.state.est = {};
        
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

        // this.state.est.end= false;
        // this.state.est.input= 'textField';
        // this.state.est.next= 'fJenisTaman';
        // this.state.est.desc= 'Jumlah hari';
        // this.state.est.name= 'hari';
        this.ulangEstimasi();
    }
    ulangEstimasi = () => {
        let est = {...this.state.est};
        est.end = false;
        est.input = 'textField';
        est.next = 'fJenisTaman';
        est.desc = 'Jumlah hari';
        est.name = 'hari';
        this.setState({
            est
        });
    }
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
                 if(response.data.status !== 'error') {
                      console.log('fetch berhasil');
                  }else {
                    console.log('fetch gagal');
                  }
            }
          ).catch(
              function(error){
                  console.log(error);
              }
          );
    };
    handlePostReview = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
                'x-access-token': Cookies.get('token')
            }
        };
        axios.post('/api/parks/review',
        {parkId: this.state.id, data: this.state.review}, axiosConfig).then(
            response => {
                console.log(response);
                 if(response.data.status !== 'error') {
                      console.log('fetch berhasil');
                      window.location.reload();
                  }else {
                    console.log('fetch gagal');
                  }
            }
          ).catch(
              function(error){
                  console.log(error);
              }
          );
    }
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    handleTabChange = (event, value) => {
        this.setState({ value });
      };
      handleChangeIndex = index => {
        this.setState({ value: index });
      };    
    TabContainer = (props) => {
        return(<div>
            {props.children}
        </div>);        
    }
    PostReviewInput = () => {
        if(Auth.isLogin()){
            return(<div>
                <TextField
                required
                name='review'
                label="Ulasan"
                multiline
                style={{ width:'100%' }}
                helperText="Tulis ulasan disini"
                margin="normal"
                value={this.state.review}
                onChange={this.handleChange}
                />                               
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    onClick={this.handlePostReview}
                    style={{width: '100%'}}
                >
                    Submit Ulasan
                </Button>                                   
            </div>);        
        }else return(null);
    };
    TombolEdit = () => {
        if(Auth.getUserData().role === 'admin'){
            return(
                <Link to={"/admin/park/add?edit=" + this.state.id}>
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={{width: '100%', margin:5}}
                >
                    Edit Taman
                </Button>   
            </Link>
            );
        } else {
            return null;
        }
    }
    estimasiOnClick = () => {
        let est = {...this.state.est};
        est[this.state.est.name] = this.state.estField;
        est.parkId = this.state.id;
        this.setState({
            est
        },
            ()=>{
                let axiosConfig = {
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8',
                        // "Access-Control-Allow-Origin": "*",
                        'x-access-token': Cookies.get('token')
                    }
                };
                // console.log('jkl');
                // console.log(this.state.est);
                axios.post('/api/parks/price',
                this.state.est, axiosConfig).then(
                    response => {

                        est = {...this.state.est};
                        if(response.data.end){
                            est.harga = response.data.harga;
                        }

                            est.input = response.data.input;
                            est.next = response.data.next;
                            est.desc = response.data.desc;
                            est.name = response.data.name;
                            est.end = response.data.end;
                            this.setState({est});
                            this.setState({estField: ''});                            
                            // this.state.est.input = response.data.input;
                            // this.state.est.next = response.data.next;
                            // this.state.est.desc = response.data.desc;
                            // this.state.est.name = response.data.name;
                            // console.log('est state');
                            // console.log(this.state.est);
                                                console.log('afte rpost');
                        console.log(response.data);
                        console.log('state');
                        console.log(this.state.est);
                        
                    }
                    ).catch(
                        function(error){
                            console.log(error);
                        }
                    );                
            }
        );
        // this.state.est[this.state.est.name] = this.state.estField;
        
    }
    EstimasiHarga = () => {
        let retVal = null;
        // if(typeof this.state.est.input === 'undefined') return null;
        if(!this.state.est.end) {
            if(this.state.est.input === 'textField'){

                retVal = (
                    <TextField
                    required
                    name='estField'
                    label={this.state.est.desc}
                    // helperText="Masukan tanpa kata 'Kecamatan', Contoh : 'Fatmawati'"
                    margin="normal"
                    value={this.state.estField}
                    onChange={this.handleChange}
                  />
                );
            } else {
                retVal = (<div>
                    {this.state.est.desc}
                    <RadioGroup name='estField' onChange={this.handleChange} value={this.state.estField}>
                        {this.state.est.input.map((input) => {
                            return(<FormControlLabel
                                    value={input}
                                    control={<Radio />}
                                    label={input}
                                />);
                        })}
                    </RadioGroup>

                </div>);
            }
            retVal = <div>
                {retVal}
                <Button
                                color='primary'
                                variant="contained"
                                style={{width: '100%'}}
                                onClick={this.estimasiOnClick}
                            >
                                Lanjutkan
                            </Button>                   
            </div>
        } else {
            retVal = (<div>
                {this.state.est.harga}
                <Button
                                color='primary'
                                variant="contained"
                                style={{width: '100%'}}
                                onClick={this.ulangEstimasi}
                            >
                                Ulang
                            </Button>                   
            </div>)
        }
        return retVal;
    }
    render(props) {
    const { classes, theme } = this.props;
    const { activeStep } = this.state;
    const maxSteps = this.state.parkData.photo.length;
        let slide =       <div className={classes.root}>
        {/* <Paper square elevation={0} className={classes.header}>
          <Typography>{tutorialSteps[activeStep].label}</Typography>
        </Paper> */}
        <AutoPlaySwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={activeStep}
          onChangeIndex={this.handleStepChange}
          enableMouseEvents
        >
          {this.state.parkData.photo.map((step, index) => (
            <div key={step}>
              {Math.abs(activeStep - index) <= 2 ? (
                <img className={classes.img} src={step} alt='gambar' />
              ) : null}
            </div>
          ))}
        </AutoPlaySwipeableViews>
        {/* <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          className={classes.mobileStepper}
          nextButton={
            <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          }
          backButton={
            <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          }
        /> */}
      </div>;

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
            {/* <Typography variant='display1' gutterBottom>
                Taman {this.state.parkData.name}
            </Typography> */}
            <Paper className='paper48'>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={8} lg={8} xl={8} >
                        {slide}
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} xl={4} >
                        <Typography variant='h5' gutterBottom>
                            Alamat
                        </Typography>
                        Jalan {this.state.parkData.address.street} Kelurahan {this.state.parkData.address.district} Jakarta {this.state.parkData.address.city} {this.state.parkData.address.zipcode}
                        <Typography variant='h5' gutterBottom>
                            Luas
                        </Typography>
                        {this.state.parkData.area} hektar
                        <Link to={"/park/borrow?id=" + this.state.id}>
                            <Button
                                type='submit'
                                color='primary'
                                variant="contained"
                                style={{width: '100%', margin:5}}
                            >
                                Pinjam Taman
                            </Button>   
                        </Link>
                        <this.TombolEdit />

                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={4} lg={4} xl={4} >
                        <Typography variant='h5' gutterBottom>
                            Fasilitas
                        </Typography>
                        {this.state.parkData.facility.map(facility => 
                            <Chip
                                label = {facility.facility}
                            />)}
                    </Grid>
                    <Grid item xs={12} sm={8} lg={8} xl={8} >
                        <Typography variant='h5' gutterBottom>
                            Peta
                        </Typography>
                        <iframe src={this.state.parkData.address.coordinate} frameborder="0" style={{width:'100%',height:'300px',border:0}} allowfullscreen></iframe>
                        {/* <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d991.3276124249534!2d106.90828260379168!3d-6.35384211337451!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x793fa2dc9e4d1b32!2sTaman+Salix!5e0!3m2!1sid!2sid!4v1543456192334" frameborder="0" style={{width:'100%',height:'300px',border:0}} allowfullscreen></iframe> */}
                    </Grid>
                </Grid>
            </Paper>
            <Paper style={{marginTop:'24px'}}>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.value}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        scrollable
                        scrollButtons="auto"
                    >
                        <Tab label="Deskripsi" />
                        <Tab label="Ulasan" />
                        <Tab label="Estimasi Harga Pinjam" />
                    </Tabs>
                </AppBar>
            <div className='paper48'>

                <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >                
                {this.state.value === 0 && <this.TabContainer>{this.state.parkData.description}</this.TabContainer>}
                {this.state.value === 1 && <this.TabContainer>
                    {this.state.parkData.review.map((r) => {
                        return(
                            <div style={{marginLeft: 24, marginRight: 24, marginTop: 8}}>
                                <strong>{r.user.name}</strong> <div style={{color:'gray', display:'inline'}}>{new Date(parseInt(r._id.substring(0, 8), 16) * 1000).toDateString()}</div><br/>
                                {r.data}
                            </div>
                        )
                    })}
                    <this.PostReviewInput />
                </this.TabContainer>}
                {this.state.value === 2 && <this.TabContainer>
                    <this.EstimasiHarga />          
                </this.TabContainer>}
                          
                </SwipeableViews>            
            </div>            
            </Paper>

        </div>
        </div>
      );
    }
}

// export default SignIn
View.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };

  
export default withStyles(styles, { withTheme: true })(View);

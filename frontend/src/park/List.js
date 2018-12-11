import React, { Component } from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Chip,
  SwipeableDrawer
} from '@material-ui/core';
// import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { BrowserRouter as Redirect, Link } from "react-router-dom";
import queryString from 'query-string';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';

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
    // img: {
    //   height: 255,
    //   display: 'block',
    //   maxWidth: 400,
    //   overflow: 'hidden',
    //   width: '100%',
    // },
    card: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 151,
    },
  });
class View extends Component {
    constructor(props){
        super(props);
        this.state={
            parkData:null,
            auth:{
                status:'error'
            },
            isLogin:'',
            name:'',
            address:'',
            minArea:'',
            maxArea:'',
            city:'',
            district:'',
            street:'',
            zipcode:'',
            facility: [{
                isSelected:false,
                index: 0,
                data:{facility:'loading'}
            }],
            filterFacility:'',
            right: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadFacility = this.loadFacility.bind(this);
        this.allFacility = this.allFacility.bind(this);
        this.selectFacility = this.selectFacility.bind(this);
    }
    componentDidMount(){
        this.fetchPark();
        this.loadFacility();
        // let id = queryString.parse(this.props.location.search).id;
        // console.log(id)
        // this.setState({
        //     id:id
        // },
        // () => {
        //     this.fetchPark();
        // });

    }
    state = {
        activeStep: 0,
      };
      toggleDrawer = (side, open) => () => {
        this.setState({
          [side]: open,
        });
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
        // console.log(this.state.id);
        // let postData = {
            
        //         parkId: this.state.id
            
        // };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
                'x-access-token': Cookies.get('token')
            }
        };
        axios.post('/api/parks/all',
        {}, axiosConfig).then(
            response => {
                console.log(response);
                this.setState({
                    parkData: response.data.data.parks
                });
                console.log(this.state);
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
    loadFacility(){
        axios.defaults.withCredentials = true;
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'x-access-token': Cookies.get('token')
          }
        };
        let tempFacility = [];
        axios.post("/api/parks/facility/all",{},config)
            .then((response) => {
                // this.setState({allFacility:response.data.data.facility});
                response.data.data.facility.map((facility, index) => {
                  tempFacility.push({
                    index: index,
                    isSelected: false,
                    data: facility
                  });
                });
                this.setState({facility:tempFacility});
            }).catch((error) => {
        });
      }
      selectFacility(){
        return(
          <div>
            {this.state.facility.filter(facility => {
              return(facility.isSelected);
            }).map((facility) => {
              return(
                <Chip
                label={facility.data.facility}
                onDelete={() => {
                  let tempArrEl = this.state.facility;
                  tempArrEl[facility.index].isSelected = false;
                  this.setState({tempArrEl,});
                }}
                color="primary"
                style={{margin:4}}
              />
              );
            })}
          </div>
        );
      } 
      allFacility(){
        return(
          <div>
            {this.state.facility.filter((facility) => {
              if(facility.data.facility.toLowerCase().search(this.state.filterFacility.toLowerCase()) !== -1 && facility.isSelected === false){
                return true;
              }
              return false;
            }).map((facility) => {
              return(
                <Chip
                  // avatar={<Avatar>MB</Avatar>}
                  label={facility.data.facility}
                  onClick={() => {
                    let tempArrEl = this.state.facility;
                    tempArrEl[facility.index].isSelected = true;
                    this.setState({tempArrEl,});
                  }}
                  style={{margin:4}}
                  // className={classes.chip}
                />
              );
            })}
          </div>
        );
      }
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
        // console.log(this.state.email);
        // console.log(this.state.password);
    }
    handleSubmit(e){
        e.preventDefault();
        this.setState({right:false});
        axios.defaults.withCredentials = true;
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': Cookies.get('token')
          }
        };
        // let tempFacility = [];
        let postData = {};
        postData.name = this.state.name;
        postData.minArea = this.state.minArea;
        postData.maxArea = this.state.maxArea;
        postData.city = this.state.city;
        postData.district = this.state.district;
        postData.zipcode = this.state.zipcode;
        postData.street = this.state.street;
        postData.isFilter = true;
        postData.facility = [];
        this.state.facility.filter(f => f.isSelected).map(f => {
          typeof f.data.id === 'undefined' ? postData.facility.push(f.data._id) : postData.facility.push(f.data.id);
        });
        console.log('postdat');
        console.log(postData);
        axios.post("/api/parks/all",postData,config)
            .then((response) => {
              this.setState({
                parkData: response.data.data.parks
              });
              console.log(response.data.data.parks);
              // this.fetchPark();
            }).catch((error) => {
        });      
        
      }
      reset = () => {    
        let p = {...this.state};
        p.isLogin = '';
        p.name = '';
        p.address = '';
        p.minArea = '';
        p.maxArea = '';
        p.city = '';
        p.district = '';
        p.street = '';
        p.zipcode = '';
        p.filterFacility = '';
        p.facility.map(f => {
          f.isSelected = false;
        });
        this.setState({p});
      }

    FilterForm = () => (<div>
      <TextField
      name='name'
      label="Nama Taman"
      style={{ width:'100%' }}
      helperText="Masukan tanpa kata 'Taman', Contoh : 'Suropati'"
      margin="normal"
      value={this.state.namaTaman}
      onChange={this.handleChange}
      />
      <TextField
      name='city'
      label="Kota"
      style={{ width:'100%' }}
      helperText="Masukan tanpa kata 'Jakarta', Contoh : 'Selatan'"
      margin="normal"
      value={this.state.city}
      onChange={this.handleChange}
      />
      <TextField
      name='district'
      label="Kecamatan"
      style={{ width:'100%'}}
      helperText="Masukan tanpa kata 'Kecamatan', Contoh : 'Fatmawati'"
      margin="normal"
      value={this.state.distrct}
      onChange={this.handleChange}
      />
      <TextField
      name='street'
      label="Jalan"
      style={{ width:'100%' }}
      helperText="Masukan tanpa kata 'Jalan', Contoh : 'Pegangsaan Timur No. 56'"
      margin="normal"
      value={this.state.street}
      onChange={this.handleChange}
      multiline
      />
      <TextField
      name='zipcode'
      label="Kode Pos"
      style={{ width:'100%' }}
      helperText="Contoh : 16511"
      margin="normal"
      value={this.state.zipcode}
      onChange={this.handleChange}
      />
      <TextField
      name='minArea'
      label="Luas min."
      helperText="Dalam Satuan Hektar"
      id="luas-taman"
      // className={classNames(classes.margin, classes.textField)}
      style={{width:'45%'}}
      value={this.state.minArea}
      onChange={this.handleChange}
      />
      <div style={{width:'10%', display:'inline-grid'}}></div>
      <TextField
      name='maxArea'
      label="Luas max."
      helperText="Dalam Satuan Hektar"
      id="luas-taman"
      // className={classNames(classes.margin, classes.textField)}
      style={{width:'45%'}}
      value={this.state.maxArea}
      onChange={this.handleChange}
      />
      <Typography variant="h5" color="textSecondary">
          Fasilitas
      </Typography>
      <this.selectFacility />
      <TextField
      name='filterFacility'
      label="Filter Fasilitas"
      id="luas-taman"
      // className={classNames(classes.margin, classes.textField)}
      value={this.state.filterFacility}
      onChange={this.handleChange}
      />
      <this.allFacility />
      <Button
      variant="contained"          
      type='submit'
      color='primary'
      align='center'
      style={{width: '100%', marginTop:'30px'}}
      onClick={this.handleSubmit}
      >Cari</Button>
      <Button
      variant="outlined"          
      type='submit'
      color='primary'
      align='center'
      onClick={this.reset}
      style={{width: '100%', marginTop:'30px'}}
      >Reset Filter</Button>
    </div>);
    Qwer = () =>{
      if(!window.matchMedia("(min-width: 500px)").matches) { 
        return(
          <Grid item xs={12} sm={false} lg={false} xl={false} >
          <SwipeableDrawer
          anchor="right"
    open={this.state.right}
    onClose={this.toggleDrawer('right', false)}
    onOpen={this.toggleDrawer('right', true)}
    >
    <div
      tabIndex={0}
      role="button"
      onClick={this.toggleDrawer('left', false)}
      onKeyDown={this.toggleDrawer('left', false)}
      style={{width:200, padding:8}}
    >
       <this.FilterForm />
    </div>
    </SwipeableDrawer>
              <Button  variant="contained" color="secondary" size="large" style={{    margin: '0px',
    top: 'auto',
    right: '20px',
    bottom: '20px',
    left: 'auto',
    position: 'fixed',
    borderRadius: '24px'
  }}
              onClick={this.toggleDrawer('right', true)}>
    {/* <NavigationIcon className={classes.extendedIcon} /> */}
    Filter
    </Button>
               
          </Grid>      
        );
    } else {
      return(
        <Grid item xs={false} sm={3} lg={3} xl={3} >
        <Typography variant="h5" color="textSecondary">
            Filter
        </Typography>
        <Paper style={{padding:24}}>
          <this.FilterForm />
        </Paper>
    </Grid>
      );
    }
    }
    render(props) {
    const { classes, theme } = this.props;
    // const { activeStep } = this.state;
    // const maxSteps = this.state.parkData.photo.length;
    //     let slide =       <div className={classes.root}>

    //     <AutoPlaySwipeableViews
    //       axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
    //       index={activeStep}
    //       onChangeIndex={this.handleStepChange}
    //       enableMouseEvents
    //     >
    //       {this.state.parkData.photo.map((step, index) => (
    //         <div key={step}>
    //           {Math.abs(activeStep - index) <= 2 ? (
    //             <img className={classes.img} src={step} alt='gambar' />
    //           ) : null}
    //         </div>
    //       ))}
    //     </AutoPlaySwipeableViews>

    //   </div>;
    let parkCard = null;
    if(this.state.parkData) {
        parkCard = <div>
            {
                this.state.parkData.map((park, index) => {
                    console.log(park);
                    return(
                        <Link to={"/park/view?id="+park.id }>
                        <Card className={classes.card} style={{margin:'8px 8px 8px 8px'}}>
                          <CardMedia
                          className={classes.cover}
                          image={park.photo[0]}
                          title="Gambar taman"
                        />
                        <div className={classes.details}>
                          <CardContent className={classes.content}>
                            <Typography component="h5" variant="h5">
                             {park.name}
                            </Typography>
                            <Typography variant="subtitle1" color="textSecondary">
                              Jalan {park.address.street}
                            </Typography>
                          </CardContent>
                        </div>
        
                      </Card>
                      </Link>
                    );
                })
            }
        </div>;
        
    }
      return (
        <div className="container">
            <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(67, 160, 71)'}}>
        <div className='header80'>
          <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
            Cari Taman
          </Typography>
          <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
            Gunakan filter disamping untuk hasil yang lebih akurat.
          </Typography>
        </div>
      </div>
        <div className='content80'>
            <Grid container spacing={24}>
                <this.Qwer />
                <Grid item xs={12} sm={9} lg={9} xl={9} >
                    <Typography variant="h5" color="textSecondary">
                        Hasil Pencarian
                    </Typography>
                    {parkCard}
                </Grid>
            </Grid>
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

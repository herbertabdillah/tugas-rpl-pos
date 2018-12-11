import React, { Component } from 'react';
import {
  Paper,
  Typography,
  Button,
  Grid,
  Chip
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import axios from 'axios';
import { BrowserRouter as Redirect, Link } from "react-router-dom";
import queryString from 'query-string';
import SwipeableLists from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import PropTypes from 'prop-types';

// import PropTypes, { instanceOf } from 'prop-types';

import Cookies from "js-cookie";
const AutoPlaySwipeableLists = autoPlay(SwipeableLists);
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
class List extends Component {
    constructor(props){
        super(props);
        this.state={
            services:null
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount(){
        this.fetchService();
    }
    fetchService = () => {
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'x-access-token': Cookies.get('token')
            }
        };
        axios.post('/api/service/all',
        {}, axiosConfig).then(
            response => {
                console.log(response);
                this.setState({
                    service: response.data.data
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
    handleChange(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    // PrintService = () => {
    //     this.state.services.map((service, index) => {
    //         let retVal = <Typography variant="h5">
    //             {service.name}
    //         </Typography>;         
    //         let harga = 1;
    //         let satuan ='';
    //         let ukuran = service.priceName.length;
    //         service.price.map((p) =>{
    //             let a = <Typography variant="h5">
    //                 Parameter {index + 1} : {this.state.services.priceName[index]}
    //             </Typography>;
    //             p.price.map((fff) => {
    //                 let qwe = <div>
    //                     {fff.name}<br/>
    //                     {fff.name}<br/>
    //                     {fff.name}<br/>
    //                 </div>
    //             });  
    //         });
    //         // this.dfs(service, harga, satuan, 0, ukuran);            
    //     });
    // };
    // dfs = (service, harga, satuan, index, ukuran) => { 
    //     if(index == ukuran) {
    //         // harga = harga * posisi.price;
    //         // satuan = satuan + '/' + posisi.by + ' ' + posisi.unit;
    //     } else {
    //         // posisi.map(()=> {
    //         //     this.dfs(posisi.price, harga, satuan);
    //         // });
    //         posisi.price[index].map(() => {
    //             this.dfs(service, harga, satuan, index + 1, ukuran); 
    //         });
    //     }
    // };
    // permute = (posisi, harga, satuan) => {
    //     if(true) {
    //         if(true) {

    //         }else {

    //         }
    //     }else {
    //         harga = harga * posisi.price;
    //         satuan = satuan + '/' + posisi.by + ' ' + posisi.unit;
    //         posisi.map((posisi, harga, satuan) => {
    //             this.permute(posisi.price, harga, satuan);
    //         });
    //     }
    // };
    render(props) {
        const { classes, theme } = this.props;
        return (<div className="container">
            <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(67, 160, 71)'}}>
                <div className='header80'>
                    <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
                        Daftar Layanan
                    </Typography>
                    {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
                        Isi formulir dibawah untuk menambahkan taman.
                    </Typography> */}
                </div>
            </div>
            <div className='content80' center={1}>
            <Paper className='paper48'>

                </Paper>
            </div>
        </div>);
    }
}

// export default SignIn
List.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  };
  
export default withStyles(styles, { withTheme: true })(List);

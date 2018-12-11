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
  FormControlLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
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

class View extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemArr: [{}],
            selectedItemArr: [{}]
        }
    }
    componentDidMount(){
        let itemArr = [
            {
                "sku": 123,
                "name": "Kopi Liong Gula 20 Sachet",
                "price": 21000,
            },
            {
                "sku": 124,
                "name": "Kopi Liong Pahit 20 Sachet",
                "price": 21000,
            },
            {
                "sku": 234,
                "name": "Kapal Api 20 Sachet",
                "price": 23000,
            },
            {
                "sku": 456,
                "name": "Roti Pandan",
                "price": 1000,
            }    
        ];
        this.setState(itemArr);
    }
    ListAdd = () => {
        return(
            <div>
                <TextField
                required
                name='selectedFilter'
                label="Nama Instansi"
                style={{ margin: 8, width:"100%" }}
                margin="normal"
                value={this.state.namaInstansi}
                onChange={this.handleChange}
                />
                <Button
                    type='submit'
                    color='primary'
                    variant="contained"
                    style={{width: '100%', margin:5}}
                >
                    Tambah Barang
                </Button>     
            </div>  
        );     
    }
    ItemTable = () => {
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>

                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.selectedItemArr.filter(
                        (item) => {
                            
                        }
                    ).map(
                        (item) => {
                            let asdf = this.state.itemArr[item.index];
                            return(
                                <TableRow key={item.id}>
                                    <TableCell>{asdf.sku}</TableCell>
                                    <TableCell>{asdf.name}</TableCell>
                                    <TableCell>{asdf.price}</TableCell>
                                    <TableCell>{item.qty}</TableCell>
                                    <TableCell>{item.qty * asdf.price}</TableCell>
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        );
    }
    render(props){
      

        return(
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

                </div>
            </div>  
        );
    }

}
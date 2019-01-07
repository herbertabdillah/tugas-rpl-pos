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
  TableBody,
  Dialog,
  DialogTitle
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

class Cashier extends Component {
    constructor(props){
        super(props);
        this.state = {
            itemArr: [{"sku":0,"name":"loading","price":0}],
            selectedItemArr: [{"index":0,"qty":0}],
            open: false,
            qtyOpen: false,
            dialogType: 'add',
            qty:0,
            index: 0,
            newItemFind: ''
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
        this.setState({itemArr:itemArr});
        let selectedItemArr = [
            {
                "index": 0,
                "qty": 2
            },
            {
                "index": 1,
                "qty": 3
            }
        ];
        this.setState({selectedItemArr:selectedItemArr});
    }
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
        // console.log(this.state.email);
        // console.log(this.state.password);
    }
    handleClickOpen = () => {
        this.setState({
          open: true,
        });
      };
    
      handleClose = value => {
        this.setState({ open: false });
      };
      handleQtyClickOpen = () => {
        this.setState({
          qtyOpen: true,
        });
      };
    
      handleQtyClose = value => {
        this.setState({ qtyOpen: false });
      };      
    tambahBarang = (index, qty) => {
        let selectedItemArr = this.state.selectedItemArr;
        let isFound = false;
        selectedItemArr.filter((item) => {
            if(item.index === index){
                isFound = true;
                return true;
            }
            return false;
        }).map((item) => {
            item.qty = item.qty + qty;
        });
        if(!isFound){
            selectedItemArr.push({index:index,qty:qty});
        }
        this.setState({selectedItemArr: selectedItemArr});
    }
    deleteItem = (index)=>{
        let selectedItemArr = this.state.selectedItemArr;
        selectedItemArr.splice(index, 1);
        this.setState({selectedItemArr:selectedItemArr});
    }
    changeQty = () => {
        let selectedItemArr = this.state.selectedItemArr;
        selectedItemArr.filter((item) => {
            if(item.index === this.state.index){
                return true;
            }
            return false;
        }).map((item) => {
            item.qty = Number.parseInt(this.state.qty);
        });
        this.setState({selectedItemArr:selectedItemArr});
    }
    DialogQty = (props) => {
        return (
<Dialog onClose={this.handleQtyClose} open={this.state.qtyOpen} aria-labelledby="simple-dialog-title">
                    <DialogTitle id="simple-dialog-title">Ubah Qty</DialogTitle>
                    <div>
                <TextField
                required
                name='qty'
                label="qty"
                style={{ margin: 8, width:"100%" }}
                margin="normal"
                value={this.state.qty}
                onChange={this.handleChange}
                />         
                                <Button
                    type='submit'
                    color='secondary'
                    variant="contained"
                    style={{width: '20%'}}
                    onClick={()=>{this.changeQty();this.handleQtyClose();}}
                >
                    Hapus/Ubah Jumlah Barang
                </Button> 
                    </div>
                </Dialog>
        );
    }
    ListAdd = () => {
        return(
            <div>
                {/* <TextField
                required
                name='selectedFilter'
                label="Nama Instansi"
                style={{ margin: 8, width:"100%" }}
                margin="normal"
                value={this.state.namaInstansi}
                onChange={this.handleChange}
                /> */}
                <Grid container spacing={8}>
                    <Grid item xl={4} md={4} sm={4} xs={4}>
                        <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{this.setState({dialogType:'add'});this.handleClickOpen();}}
                        >
                            Tambah Barang
                        </Button>                     
                    </Grid>
                    <Grid item xl={4} md={4} sm={4} xs={4}>
                        <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{this.setState({dialogType:'void'});this.handleClickOpen();}}
                        >
                            Hapus/Ubah Jumlah Barang
                        </Button>                      
                    </Grid>
                    <Grid item xl={4} md={4} sm={4} xs={4}>
                        <Button
                        type='submit'
                        color='secondary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{this.setState({dialogType:'void'});this.handleClickOpen();}}
                        >
                            Lanjutkan Pembayaran
                        </Button>                           
                    </Grid>                                        
                </Grid>
    
 
            </div>  
        );     
    }
    ItemTable = () => {
        return(
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            SKU
                        </TableCell>
                        <TableCell>
                            Nama
                        </TableCell>
                        <TableCell>
                            Harga
                        </TableCell>
                        <TableCell>
                            Qty
                        </TableCell>         
                        <TableCell>
                            Total
                        </TableCell>                                                                                       
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.selectedItemArr.filter(
                        (item) => {
                            return true;
                        }
                    ).map(
                        (item) => {
                            console.log(this.state);
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
    Total = () => {
        let total = 0;
        this.state.selectedItemArr.filter(
            (item) => {
                return true;
            }
        ).map(
            (item) => {
                let asdf = this.state.itemArr[item.index];
                total = total + (asdf.price * item.qty);
            }
        )
        return (
            <div>
                      <Typography variant="h5" style={{textShadow:'1px 1px #0200004d', color:'black'}}>
                      Total : {total}
                      </Typography>            
            </div>
        );
    }
    DialogTambahBarang = () => {
        let d = null;
        if(this.state.dialogType === 'add'){
            d = <Dialog onClose={this.handleClose} open={this.state.open} aria-labelledby="simple-dialog-title" style={{maxWidth:"90%",minWidth:"80%"}}>
                    <DialogTitle id="simple-dialog-title">Tambah Barang</DialogTitle>
                    <div>
                        <div> 
                            <TextField
                            required
                            name='newItemFind'
                            label="Filter Nama"
                            style={{ margin: 8, width:'40%' }}
                            margin="normal"
                            value={this.state.newItemFind}
                            onChange={this.handleChange}
                            />                            
                        </div>
                        <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                SKU
                            </TableCell>
                            <TableCell>
                                Nama
                            </TableCell>
                            <TableCell>
                                Harga
                            </TableCell>                                                                                    
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.state.itemArr.filter(
                            (item) => {
                                let regex = new RegExp(this.state.newItemFind, 'i');
                                return regex.test(item.name);
                            }
                        ).map(
                            (item, index) => {
                                return(
                                    <TableRow key={item.id} onClick={() => {
                                        // let selectedItemArr = this.state.selectedItemArr;
                                        // selectedItemArr.push({index: index, qty: 1});
                                        // this.setState({selectedItemArr: selectedItemArr});
                                        this.tambahBarang(index, 1);
                                        this.handleClose();
                                    }}>
                                        <TableCell>{item.sku}</TableCell>
                                        <TableCell>{item.name}</TableCell>
                                        <TableCell>{item.price}</TableCell>
                                    </TableRow>
                                );
                            }
                        )}
                    </TableBody>
                </Table>                    
                    </div>
                </Dialog>;
        } else {
            d =
            <Dialog onClose={this.handleClose} open={this.state.open} aria-labelledby="simple-dialog-title">   
                    <DialogTitle id="simple-dialog-title">Tambah Barang</DialogTitle>
                    <div>
                        <div> </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        SKU
                                    </TableCell>
                                    <TableCell>
                                        Nama
                                    </TableCell>
                                    <TableCell>
                                        Harga
                                    </TableCell>
                                    <TableCell>
                                        Qty
                                    </TableCell>         
                                    <TableCell>
                                        Total
                                    </TableCell>   
                                    <TableCell>
                                        Action
                                    </TableCell>                                                                                          
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.selectedItemArr.filter(
                                    (item) => {
                                        return true;
                                    }
                                ).map(
                                    (item) => {
                                        console.log(this.state);
                                        let asdf = this.state.itemArr[item.index];
                                        let qty = item.qty;
                                        return(
                                            <TableRow key={item.id}>
                                                <TableCell>{asdf.sku}</TableCell>
                                                <TableCell>{asdf.name}</TableCell>
                                                <TableCell>{asdf.price}</TableCell>
                                                <TableCell>
                                                    {/* <TextField
                                                    required
                                                    name='qty'
                                                    label="qty"
                                                    style={{width:'40%'}}
                                                    margin="normal"
                                                    value={this.state.qty}
                                                    onChange={this.handleChange}
                                                    />  */}
                                                    {item.qty}
                                                </TableCell>
                                                <TableCell>{item.qty * asdf.price}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        type='submit'
                                                        color='primary'
                                                        variant="contained"
                                                        style={{width: '20%'}}
                                                        onClick={()=>{this.setState({qty:item.qty,index:item.index});this.handleQtyClickOpen();this.handleClose();}}
                                                    >
                                                        Ubah Jumlah
                                                    </Button>                                                     
                                                    <Button
                                                        type='submit'
                                                        color='secondary'
                                                        variant="contained"
                                                        style={{width: '20%'}}
                                                        onClick={()=>{this.deleteItem(item.index);this.handleClose();}}
                                                    >
                                                        Hapus
                                                    </Button> 
                                                </TableCell>
                                            </TableRow>
                                        );
                                    }
                                )}
                            </TableBody>
                        </Table>             
                    </div>
                </Dialog>;
        }
        return d;
    }
    render(props){
      

        return(
            <div className="container">
                <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(34, 52, 150)'}}>
                    <div className='header80'>
                      <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
                      Kasir
                      </Typography>
                      {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
                        Isi formulir dibawah untuk menambahkan taman.
                      </Typography> */}
                    </div>
                </div>        
                <div className='content80' center={1}>        
                      <this.DialogTambahBarang />
                      <this.DialogQty />
                      <this.Total />
                      <this.ListAdd />
                      <this.ItemTable />
                </div>
            </div>  
        );
    }

}
export default Cashier;
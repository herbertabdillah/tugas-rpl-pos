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
            itemArr: [{"sku":0,"nama":"loading","harga":0, "index":0}],
            selectedItemArr: [],
            open: false,
            qtyOpen: false,
            dialogType: 'add',
            qty:0,
            index: 0,
            newItemFind: '',
            filterNama: '',
            tambahQty: 0,
            total:0,
            kasihUang:0,
            dialogPembayaran: false,
            dialogStruk: false,
            // strukTotal: 0,
            // strukKembali: 0,
            // strukBayar: 0
        }
    }
    componentDidMount(){
        // let itemArr = [
        //     {
        //         "sku": 123,
        //         "name": "Kopi Liong Gula 20 Sachet",
        //         "price": 21000,
        //         "index": 0
        //     },
        //     {
        //         "sku": 124,
        //         "name": "Kopi Liong Pahit 20 Sachet",
        //         "price": 21000,
        //         "index": 1
        //     },
        //     {
        //         "sku": 234,
        //         "name": "Kapal Api 20 Sachet",
        //         "price": 23000,
        //         "index": 2
        //     },
        //     {
        //         "sku": 456,
        //         "name": "Roti Pandan",
        //         "price": 1000,
        //         "index": 3
        //     }    
        // ];
        // this.setState({itemArr:itemArr});
        // let selectedItemArr = [
        //     {
        //         "index": 0,
        //         "qty": 2
        //     },
        //     {
        //         "index": 1,
        //         "qty": 3
        //     }
        // ];
        // this.setState({selectedItemArr:selectedItemArr});
        this.fetchBarang();
    }
    transaksi = () => {
        let laporan = [];
        this.state.selectedItemArr.map((item)=>{
            let barangLengkap = this.state.itemArr[item.index];
            laporan.push({
                "idBarang":barangLengkap.sku,
                "jumlahBarang":item.qty,
                "totalHarga": (item.qty * barangLengkap.harga)
            });
        });
        let postData = {
            laporan:laporan
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post('tugas-rpl-pos/api/beli.php',
        postData, axiosConfig).then(
            response => {
                // console.log(response);
                // this.setState({
                //     itemArr: response.data.records
                // });
                // console.log(this.state.suppliers);
            }
        ).catch(
            function(error){
                console.log(error);
            }
        );        
    }
    fetchBarang = () => {
        let postData = {
        
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post('tugas-rpl-pos/api/lihat.php',
        postData, axiosConfig).then(
            response => {
                console.log(response);
                this.setState({
                    itemArr: response.data.records
                });
                console.log(this.state.suppliers);
            }
        ).catch(
            function(error){
                console.log(error);
            }
        );
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
      handlePembayaranClickOpen = () => {
        this.setState({
            dialogPembayaran: true,
        });
      };    
      handlePembayaranClose = value => {
        this.setState({ dialogPembayaran: false });
      };       
      handleStrukClickOpen = () => {
        this.setState({
          dialogStruk: true,
        });
      };    
      handleStrukClose = value => {
        this.setState({ dialogStruk: false });
      };  
      strukTotal = 0;
      strukKembali = 0;
      strukBayar = 0;
      Struk = () => {
        let objToday = new Date(),
        weekday = new Array('Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'),
        dayOfWeek = weekday[objToday.getDay()],
        domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
        dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate(),
        months = new Array('Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'),
        curMonth = months[objToday.getMonth()],
        curYear = objToday.getFullYear(),
        curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
        curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
        curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
        curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
        let today = curHour + ":" + curMinute + "." + curSeconds + " " + curMeridiem + " " + dayOfMonth + " " + curMonth + " " + curYear;

        return <div id ="printableArea">
            Minimarket 112<br/>
            Jl. Raya Mukhtar No. 112<br/>
            Sawangan, Kota Depok 16511<br/>
            <br/>
            {today}
            <br/>
            <br/>
            {this.state.selectedItemArr.map((selectedItem) => {
                let item = this.state.itemArr[selectedItem.index];
                let nama = item.nama;
                let harga = item.harga;
                let qty = selectedItem.qty;
                let total = harga * qty;
                return <div>        
            {nama}<br/>
            {harga} x {qty} = {total}<br/><br/>
                </div>;
            })}
            <br/>
            Total : {this.strukTotal}<br/>
            Bayar : {this.strukBayar}<br/>
            Kembali : {this.strukKembali}<br/>
            <br/>
            Terimakasih atas kunjungannya

        </div>;
      }      
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
        let indexHapus;
        selectedItemArr.map((item, indexSelected)=>{
            if(item.index === index){
                indexHapus = indexSelected;
            }
        })
        selectedItemArr.splice(indexHapus, 1);
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
            <Dialog fullWidth={true} maxWidth = {'md'} onClose={this.handleQtyClose} open={this.state.qtyOpen} aria-labelledby="simple-dialog-title">
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
                <Grid container spacing={8}>
                    <Grid item xl={3} md={3} sm={3} xs={3}>
                        <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{
                            this.setState({editQty:1});
                            this.setState({dialogType:'add'});this.handleClickOpen();}}
                        >
                            Tambah
                        </Button>                     
                    </Grid>
                    <Grid item xl={3} md={3} sm={3} xs={3}>
                        <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{
                            this.deleteItem(this.state.index);
                        }}
                        >
                            Hapus
                        </Button>                      
                    </Grid>
                    <Grid item xl={3} md={3} sm={3} xs={3}>
                        <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{
                            this.handleQtyClickOpen();
                        }}
                        >
                            Ubah Jumlah
                        </Button>                      
                    </Grid>
                    <Grid item xl={3} md={3} sm={3} xs={3}>
                        <Button
                        type='submit'
                        color='secondary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{this.handlePembayaranClickOpen();}}
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
                            let patternNama = new RegExp(this.state.filterNama, 'i')
                            return patternNama.test(this.state.itemArr[item.index].nama);
                        }
                    ).map(
                        (item) => {
                            console.log(this.state);
                            let asdf = this.state.itemArr[item.index];
                            return(
                                <TableRow key={item.index} onClick={()=>{
                                    this.setState({
                                        qty: item.qty,
                                        index: item.index
                                    })
                                }}>
                                    <TableCell>{asdf.sku}</TableCell>
                                    <TableCell>{asdf.nama}</TableCell>
                                    <TableCell>{asdf.harga}</TableCell>
                                    <TableCell>{item.qty}</TableCell>
                                    <TableCell>{item.qty * asdf.harga}</TableCell>
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        );
    }
    hitungTotal = () => {
        if(this.state.selectedItemArr.length === 0) return 0;
        else{
            let total = 0;
            this.state.selectedItemArr.filter(
                (item) => {
                    return true;
                }
            ).map(
                (item) => {
                    let asdf = this.state.itemArr[item.index];
                    total = total + (asdf.harga * item.qty);
                }
            )
            return total;        
        }

    }
    Total = () => {
        let total = this.hitungTotal()
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
            d = <Dialog fullWidth={true} maxWidth = {'md'} onClose={this.handleClose} open={this.state.open} aria-labelledby="simple-dialog-title">
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
                        <TextField
                            required
                            name='tambahQty'
                            label="Qty"
                            style={{ margin: 8, width:'40%' }}
                            margin="normal"
                            value={this.state.tambahQty}
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
                                return regex.test(item.nama);
                            }
                        ).map(
                            (item) => {
                                return(
                                    <TableRow key={item.index} onClick={() => {
                                        // let selectedItemArr = this.state.selectedItemArr;
                                        // selectedItemArr.push({index: index, qty: 1});
                                        // this.setState({selectedItemArr: selectedItemArr});
                                        this.tambahBarang(item.index, Number.parseInt(this.state.tambahQty));
                                        this.handleClose();
                                    }}>
                                        <TableCell>{item.sku}</TableCell>
                                        <TableCell>{item.nama}</TableCell>
                                        <TableCell>{item.harga}</TableCell>
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
    DialogPembayaran = () => {
        let total = this.hitungTotal();
        let kembali = this.state.kasihUang - total;
        this.strukTotal =total;
        this.strukKembali = kembali;
        return <Dialog fullWidth={true} maxWidth = {'md'} onClose={this.handlePembayaranClose} open={this.state.dialogPembayaran} aria-labelledby="simple-dialog-title">
        
            <DialogTitle id="simple-dialog-title">Pembayaran</DialogTitle> 
                <Button
                    type='submit'
                    color='secondary'
                    variant="contained"
                    style={{width: '20%'}}
                    onClick={()=>{
                        this.handlePembayaranClose();
                        this.handleStrukClickOpen();
                        this.transaksi();
                        this.strukBayar = this.state.kasihUang;
                    }}
                >
                    Lanjut
                </Button> 
                <Typography variant="h5" style={{textShadow:'1px 1px #0200004d', color:'black'}}>
                    Total : {total}
                </Typography>   
                <Typography variant="h5" style={{textShadow:'1px 1px #0200004d', color:'black'}}>
                    Kembali : {kembali}
                </Typography>
                <TextField
                    required
                    name='kasihUang'
                    label="Filter Nama"
                    style={{ margin: 8, width:'40%' }}
                    margin="normal"
                    value={this.state.kasihUang}
                    onChange={this.handleChange}
                />            

        </Dialog>;
    } 
    DialogStruk = () => {        
        return <Dialog fullWidth={true} maxWidth = {'md'} onClose={this.handleStrukClose} open={this.state.dialogStruk} aria-labelledby="simple-dialog-title">
                <Button
                    type='submit'
                    color='secondary'
                    variant="contained"
                    style={{width: '20%'}}
                    onClick={()=>{
                        var printContents = document.getElementById("printableArea").innerHTML;
                        var originalContents = document.body.innerHTML;
                   
                        document.body.innerHTML = printContents;
                   
                        window.print();
                   
                        document.body.innerHTML = originalContents;
                    }}
                >
                    Print
                </Button>         
            <DialogTitle id="simple-dialog-title">Pembayaran</DialogTitle> 
                <this.Struk />
        </Dialog>;
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
                        <this.DialogStruk />    
                        <this.DialogTambahBarang />
                        <this.DialogPembayaran />
                        <this.DialogQty />
                        <this.Total />
                        <this.ListAdd />
                        <TextField
                            name='filterNama'
                            label="Filter nama barang"
                            style={{ margin: 8, width:"100%" }}
                            margin="normal"
                            value={this.state.filterNama}
                            onChange={this.handleChange}
                        />
                        <Paper>
                            <this.ItemTable />
                        </Paper>
                </div>
            </div>  
        );
    }

}
export default Cashier;
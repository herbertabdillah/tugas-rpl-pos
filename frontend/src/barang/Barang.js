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
            suppliersArr: [{"kode":0,"nama":"loading","alamat":"loading","kontak":"loading", index:0}],
            barangArr: [{"sku": 0, "nama": "loading", harga: 0, "stok": 0, "supplier": 0}],
            open: false,
            qtyOpen: false,   
            stokOpen: false,     
            index: 0,
            newItemFind: '',
            selected: 0,
            tambahSku: '',
            tambahNama: '',
            tambahHarga: '',
            tambahStok: '',
            tambahSupplier: '',
            editStok: 0,
            mode:'',
            filterNama: '',
            selectedSupplierIndex: 0
        }
    }
    componentDidMount(){
        let suppliersArr = [
            {
                "kode": 1,
                "nama": "Bakti Karya",
                "alamat": "Jalan Abdul Wahab",
                "kontak": "021 77881122",
                "index": 0
            },
            {
                "kode": 2,
                "nama": "Indogrosir",
                "alamat": "Jalan Raya Parung",
                "kontak": "021 77992233",
                "index": 1
            } 
        ];
        let barangArr = [
            {
                "sku": 123,
                "nama": "Kopi Liong Gula 20 Sachet",
                "harga": 21000,
                "stok": 20,
                "supplier": 1,
                "index": 0
            },
            {
                "sku": 124,
                "nama": "Kopi Liong Pahit 20 Sachet",
                "harga": 21000,
                "stok": 20,
                "supplier": 1,
                "index": 1
            },
            {
                "sku": 234,
                "nama": "Kapal Api 20 Sachet",
                "harga": 23000,
                "stok": 20,
                "supplier": 0,
                "index": 2
            },
            {
                "sku": 456,
                "nama": "Roti Pandan",
                "harga": 1000,
                "stok": 20,
                "supplier": 0,
                "index": 3
            }  
        ];
        this.setState({suppliersArr: suppliersArr, barangArr: barangArr});    
    }
    prosesTambahBarang = () => {
        let barangArr = this.state.barangArr;
        let j = this.state.barangArr[this.state.barangArr.length - 1].index + 1;
        barangArr.push({
            "sku": this.state.tambahSku,
            "nama": this.state.tambahNama,
            "harga": this.state.tambahHarga,
            "stok": this.state.tambahStok,
            "supplier": this.state.selectedSupplierIndex,
            "index": j
        });
        this.setState({barangArr: barangArr});
    }
    prosesEditBarang = () => {
        let barangArr = this.state.barangArr;
        barangArr[this.state.selected] = {
            "sku": this.state.tambahSku,
            "nama": this.state.tambahNama,
            "harga": this.state.tambahHarga,
            "stok": this.state.tambahStok,
            "supplier": this.state.selectedSupplierIndex
        };
        this.setState({barangArr: barangArr});
    }
    prosesHapusBarang = () => {
        let barangArr = this.state.barangArr;
        barangArr.splice(this.state.selected, 1);
        this.setState({barangArr: barangArr, selected:0});
    }        
    handleChange = (e) => {
        this.setState({
          [e.target.name]: e.target.value
        });
        // console.log(this.state.email);
        // console.log(this.state.password);
    }
      handleQtyClickOpen = () => {
        this.setState({
          qtyOpen: true,
        });
      };
      handleQtyClose = value => {
        this.setState({ qtyOpen: false });
      };      
      handleStokClickOpen = () => {
        this.setState({
          stokOpen: true,
        });
      };
      handleStokClose = value => {
        this.setState({ stokOpen: false });
      };
      prosesTambahStok = () => {
          let barangArr = this.state.barangArr;
          let stokSebelum = barangArr[this.state.selected].stok;
          let stokTambah = Number.parseInt(this.state.editStok);
          barangArr[this.state.selected].stok = stokSebelum + stokTambah;
          this.setState({barangArr: barangArr});
      }
      DialogStok = (props) => {

        return (
            <Dialog fullWidth={true} maxWidth = {'md'} onClose={this.handleStokClose} open={this.state.stokOpen} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">Tambah Stok</DialogTitle>
                <TextField
                required
                name='editStok'
                label="Stok"
                style={{ margin: 8, width:"100%" }}
                margin="normal"
                value={this.state.editStok}
                onChange={this.handleChange}
                />                                                                  
                <Button
                type='submit'
                color='secondary'
                variant="contained"
                style={{width: '20%'}}  
                onClick={()=>{this.prosesTambahStok()}}
                >
                    Tambah
                </Button> 
            </Dialog>
        );
    }      
    DialogBarang = (props) => {
        let aksi;
        if(this.state.mode === 'add') {
            aksi = () => {this.prosesTambahBarang()};
        } else if(this.state.mode === 'edit'){
            // let selectedBarang = this.state.barangArr[this.state.selected];
            // this.setState({
            //     tambahNama: selectedBarang.nama,
            //     tambahAlamat: selectedBarang.alamat,
            //     tambahKontak: selectedBarang.kontak
            // });
            aksi = () => {this.prosesEditBarang()};
        }
        return (
            <Dialog fullWidth={true} maxWidth = {'md'} onClose={this.handleQtyClose} open={this.state.qtyOpen} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">Ubah/Tambah Barang</DialogTitle>
                <Button
                type='submit'
                color='secondary'
                variant="contained"
                style={{width: '20%'}}
                onClick={()=>{aksi()}}
                >
                    Simpan
                </Button> 
                <Grid container>
                    <Grid item xs={6} sm={6} md={6} xl={6}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Kode
                                    </TableCell>
                                    <TableCell>
                                        Nama
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.suppliersArr.filter(
                                    (supplier) => {
                                        let patternNama = new RegExp(this.state.filterNama, 'i')
                                        return patternNama.test(supplier.nama);
                                    }
                                ).map(
                                    (supplier) => {
                                        console.log(this.state);
                                        return(
                                            <TableRow key={supplier.kode} onClick={()=> {
                                                let index = supplier.index;
                                                this.setState({selectedSupplierIndex:index}); 
                                            }}>
                                                <TableCell>{supplier.kode}</TableCell>
                                                <TableCell>{supplier.nama}</TableCell>
                                            </TableRow>
                                        );
                                    }
                                )}
                            </TableBody>
                        </Table>                        
                    </Grid>
                    <Grid item xs={6} sm={6} md={6} xl={6}>
                        <TextField
                        required
                        name='tambahSku'
                        label="SKU"
                        style={{ margin: 8, width:"100%" }}
                        margin="normal"
                        value={this.state.tambahSku}
                        onChange={this.handleChange}
                        />                  
                        <TextField
                        required
                        name='tambahNama'
                        label="Nama"
                        style={{ margin: 8, width:"100%" }}
                        margin="normal"
                        value={this.state.tambahNama}
                        onChange={this.handleChange}
                        />         
                        <TextField
                        required
                        name='tambahHarga'
                        label="Harga"
                        style={{ margin: 8, width:"100%" }}
                        margin="normal"
                        value={this.state.tambahHarga}
                        onChange={this.handleChange}
                        />         
                        <TextField
                        required
                        name='tambahStok'
                        label="Stok"
                        style={{ margin: 8, width:"100%" }}
                        margin="normal"
                        value={this.state.tambahStok}
                        onChange={this.handleChange}
                        />
                        Supplier : {this.state.suppliersArr[this.state.selectedSupplierIndex].nama} <br/> 
                    </Grid>
                </Grid>            
            </Dialog>
        );
    }
    TombolAtas = () => {
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
                            this.setState({
                                mode:'add',
                                tambahNama: '',
                                tambahKontak: '',
                                tambahAlamat: ''
                            });
                            this.handleQtyClickOpen();
                        }}
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
                        onClick={()=>{this.prosesHapusBarang();}}
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
                        onClick={()=>{this.setState({mode:'edit'});this.handleQtyClickOpen();}}
                        >
                            Edit
                        </Button>                           
                    </Grid>                 
                    <Grid item xl={3} md={3} sm={3} xs={3}>
                        <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{this.handleStokClickOpen();}}
                        >
                            Tambah Stok
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
                            Stok
                        </TableCell>
                        <TableCell>
                            Harga
                        </TableCell>
                        <TableCell>
                            Supplier
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.barangArr.filter(
                        (barang) => {
                            let patternNama = new RegExp(this.state.filterNama, 'i')
                            return patternNama.test(barang.nama);
                        }
                    ).map(
                        (barang) => {
                            console.log(this.state);
                            return(
                                <TableRow key={barang.index} onClick={()=> {
                                    let index = barang.index;
                                    this.setState({selected:index});
                                    let selectedBarang = this.state.barangArr[index];
                                    this.setState({
                                        tambahNama: selectedBarang.nama,
                                        tambahSku: selectedBarang.sku,
                                        tambahStok: selectedBarang.stok,
                                        tambahHarga: selectedBarang.harga,
                                        tambahSupplier: selectedBarang.supplier
                                    });
                                }}>
                                    <TableCell>{barang.sku}</TableCell>
                                    <TableCell>{barang.nama}</TableCell>
                                    <TableCell>{barang.stok}</TableCell>
                                    <TableCell>{barang.harga}</TableCell>
                                    <TableCell>{this.state.suppliersArr[barang.supplier].nama}</TableCell>
                                </TableRow>
                            );
                        }
                    )}
                </TableBody>
            </Table>
        );
    }
    PanelKanan = () => {
        var selected = this.state.selected;
        var indexSupplier = this.state.barangArr[selected].supplier;
        return <div>
            <Typography variant="h5">
                Info Barang
            </Typography>
            Nama :  {this.state.barangArr[selected].nama} <br/>
            SKU : {this.state.barangArr[selected].sku} <br/>
            Stok : {this.state.barangArr[selected].stok} <br/>
            Harga : {this.state.barangArr[selected].harga} <br/>
            <br/>
            <Typography variant="h5">
                Info Supplier
            </Typography>
            Nama :  {this.state.suppliersArr[indexSupplier].nama} <br/>
            Kode : {this.state.suppliersArr[indexSupplier].kode} <br/>
            Alamat : {this.state.suppliersArr[indexSupplier].alamat} <br/>
            Kontak : {this.state.suppliersArr[indexSupplier].kontak} <br/>
        </div>;
    }

    render(props){
      

        return(
            <div className="container">
                <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(34, 52, 150)'}}>
                    <div className='header80'>
                      <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
                      Barang
                      </Typography>
                      {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
                        Isi formulir dibawah untuk menambahkan taman.
                      </Typography> */}
                    </div>
                </div>        
                <div className='content80' center={1}> 
                      <this.DialogBarang />
                      <this.DialogStok />
                      <this.TombolAtas />
                      <TextField
                            name='filterNama'
                            label="Filter nama barang"
                            style={{ margin: 8, width:"100%" }}
                            margin="normal"
                            value={this.state.filterNama}
                            onChange={this.handleChange}
                        />                      
                      <Grid container spacing={24} style={{marginTop:'16px'}}>
                        <Grid item xs={6} sm={6} md={6} xl={6}>
                            <Paper>
                                <this.ItemTable />
                            </Paper>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} xl={6}>
                            <Paper style={{padding:24}}>                              
                                <this.PanelKanan />  
                            </Paper>
                        </Grid>
                      </Grid>
                      
                      
                </div>
            </div>  
        );
    }

}
export default Cashier;
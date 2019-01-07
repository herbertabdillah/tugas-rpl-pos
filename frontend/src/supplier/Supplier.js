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
            suppliers: [{"kode":0,"nama":"loading","alamat":"loading","kontak":"loading", index:0}],
            open: false,
            qtyOpen: false,        
            index: 0,
            newItemFind: '',
            selected: 0,
            tambahNama: '',
            tambahKontak: '',
            tambahAlamat: '',
            filterNama: '',
            mode:''
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
        this.setState({suppliers:suppliersArr});    
    }
    prosesTambahSupplier = () => {
        let suppliersArr = this.state.suppliers;
        var i = suppliersArr[suppliersArr.length - 1].kode + 1;
        var j = suppliersArr[suppliersArr.length - 1].index + 1;
        suppliersArr.push({
            "kode": i,
            "nama": this.state.tambahNama,
            "alamat": this.state.tambahAlamat,
            "kontak": this.state.tambahKontak,
            "index": j
        });
        this.setState({suppliers: suppliersArr});
    }
    prosesEditSupplier = () => {
        let suppliersArr = this.state.suppliers;
        suppliersArr[this.state.selected] = {
            "kode": suppliersArr[this.state.selected].kode,
            "nama": this.state.tambahNama,
            "alamat": this.state.tambahAlamat,
            "kontak": this.state.tambahKontak,
        };
        this.setState({suppliers: suppliersArr});
    }
    prosesHapusSupplier = () => {
        let suppliersArr = this.state.suppliers;
        suppliersArr.splice(this.state.selected, 1);
        this.setState({suppliers: suppliersArr, selected:0});
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
 
    DialogQty = (props) => {
        let aksi;
        if(this.state.mode === 'add') {
            aksi = () => {this.prosesTambahSupplier()};
        } else if(this.state.mode === 'edit'){
            // let selectedSupplier = this.state.suppliers[this.state.selected];
            // this.setState({
            //     tambahNama: selectedSupplier.nama,
            //     tambahAlamat: selectedSupplier.alamat,
            //     tambahKontak: selectedSupplier.kontak
            // });
            aksi = () => {this.prosesEditSupplier()};
        }
        return (
            <Dialog fullWidth={true} maxWidth = {'md'} onClose={this.handleQtyClose} open={this.state.qtyOpen} aria-labelledby="simple-dialog-title">
                <DialogTitle id="simple-dialog-title">Ubah Tambah Supplier</DialogTitle>
                <TextField
                required
                name='tambahNama'
                label="Nama"
                style={{ margin: 8, width:"80%" }}
                margin="normal"
                value={this.state.tambahNama}
                onChange={this.handleChange}
                />         
                <TextField
                required
                name='tambahAlamat'
                label="Alamat"
                style={{ margin: 8, width:"80%" }}
                margin="normal"
                value={this.state.tambahAlamat}
                onChange={this.handleChange}
                />         
                <TextField
                required
                name='tambahKontak'
                label="Kontak"
                style={{ margin: 8, width:"80%" }}
                margin="normal"
                value={this.state.tambahKontak}
                onChange={this.handleChange}
                />                                                 
                <Button
                type='submit'
                color='secondary'
                variant="contained"
                style={{width: '20%'}}
                onClick={()=>{aksi()}}
                >
                    Simpan
                </Button> 
            </Dialog>
        );
    }
    TombolAtas = () => {
        return(
            <div>
                {/* <TextField
                required
                name='selectedFilter'
                label="Nama Instansi"
                style={{ margin: 8, width:"80%" }}
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
                    <Grid item xl={4} md={4} sm={4} xs={4}>
                        <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{this.prosesHapusSupplier();}}
                        >
                            Hapus
                        </Button>                      
                    </Grid>
                    <Grid item xl={4} md={4} sm={4} xs={4}>
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
                            Kode
                        </TableCell>
                        <TableCell>
                            Nama
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.suppliers.filter(
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
                                    this.setState({selected:index});
                                    let selectedSupplier = this.state.suppliers[index];
                                    this.setState({
                                        tambahNama: selectedSupplier.nama,
                                        tambahAlamat: selectedSupplier.alamat,
                                        tambahKontak: selectedSupplier.kontak
                                    });
                                }}>
                                    <TableCell>{supplier.kode}</TableCell>
                                    <TableCell>{supplier.nama}</TableCell>
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
        return <div>
            <Typography variant="h5">
                {this.state.suppliers[selected].nama}
            </Typography>
            Kode : {this.state.suppliers[selected].kode} <br/>
            Alamat : {this.state.suppliers[selected].alamat} <br/>
            Kontak : {this.state.suppliers[selected].kontak} <br/>
            <br/>
        </div>;
    }

    render(props){
      

        return(
            <div className="container">
                <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(34, 52, 150)'}}>
                    <div className='header80'>
                      <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
                      Supplier
                      </Typography>
                      {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
                        Isi formulir dibawah untuk menambahkan taman.
                      </Typography> */}
                    </div>
                </div>        
                <div className='content80' center={1}> 
                      <this.DialogQty />
                      <this.TombolAtas />
                        <TextField
                            name='filterNama'
                            label="Filter nama supplier"
                            style={{ margin: 8, width:"80%" }}
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
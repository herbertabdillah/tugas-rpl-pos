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
import {Bar} from 'react-chartjs-2';
// import PropTypes, { instanceOf } from 'prop-types';

import Cookies from "js-cookie";

class Cashier extends Component {
    constructor(props){
        super(props);
        this.state = {
            laporanArr: [{"tanggal":"loading","pendapatan":0}],
            open: false,
            qtyOpen: false,        
            index: 0,
            newItemFind: '',
            selected: 0,
            tambahNama: '',
            tambahKontak: '',
            tambahAlamat: '',
            filterNama: '',
            mode:'',
            awal:'2018-01-01',
            akhir: '2020-01-08',
            pendapatan: 0,
            rata:0,
            listTanggal: [],
            listPendapatan: []
        }
    }
    componentDidMount(){
        this.fetchLaporan();
        // let laporanArr = [
        //     {
        //         "tanggal": "2017-01-01",
        //         "pendapatan": 60000
        //     },
        //     {
        //         "tanggal": "2017-01-02",
        //         "pendapatan": 95000
        //     }
        // ];

    // this.setState({pendapatan:total});
    //     this.setState({laporanArr:laporanArr});    
    }
    fetchLaporan = () => {
        let listTanggal = [];
        let listPendapatan = [];
        let postData = {
            awal:this.state.awal,
            akhir:this.state.akhir
        };
        let axiosConfig = {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                // "Access-Control-Allow-Origin": "*",
            }
        };
        axios.post('tugas-rpl-pos/api/laporan.php',
        postData, axiosConfig).then(
            response => {
                // console.log(response);
                // this.setState({
                //     itemArr: response.data.records
                // });
                // console.log(this.state.suppliers);
                let total = 0;
                let rata = 0;
                this.setState({laporanArr:response.data}, ()=>{
                    
                    this.state.laporanArr.map((laporan)=>{
                        listTanggal.push(laporan.tanggal);
                        listPendapatan.push(laporan.pendapatan);
                        total += Number.parseFloat(laporan.pendapatan);
                    });
                });
                rata = total / this.state.laporanArr.length;
                this.setState({pendapatan:total,rata:rata, listTanggal: listTanggal, listPendapatan: listPendapatan})
            }
        ).catch(
            function(error){
                console.log(error);
            }
        );             
    }
    prosesTambahSupplier = () => {
        let laporanArr = this.state.laporanArr;
        var i = laporanArr[laporanArr.length - 1].kode + 1;
        var j = laporanArr[laporanArr.length - 1].index + 1;
        laporanArr.push({
            "kode": i,
            "nama": this.state.tambahNama,
            "alamat": this.state.tambahAlamat,
            "kontak": this.state.tambahKontak,
            "index": j
        });
        this.setState({laporanArr: laporanArr});
    }
    prosesEditSupplier = () => {
        let laporanArr = this.state.laporanArr;
        laporanArr[this.state.selected] = {
            "kode": laporanArr[this.state.selected].kode,
            "nama": this.state.tambahNama,
            "alamat": this.state.tambahAlamat,
            "kontak": this.state.tambahKontak,
        };
        this.setState({laporanArr: laporanArr});
    }
    prosesHapusSupplier = () => {
        let laporanArr = this.state.laporanArr;
        laporanArr.splice(this.state.selected, 1);
        this.setState({laporanArr: laporanArr, selected:0});
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
            // let selectedSupplier = this.state.laporanArr[this.state.selected];
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
                    <Grid item xl={6} md={6} sm={6} xs={6}>
                        <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{
                            this.fetchLaporan();
                        }}
                        >
                            Proses Laporan
                        </Button>                     
                    </Grid>
                    <Grid item xl={6} md={6} sm={6} xs={6}>
                        <Button
                        type='submit'
                        color='primary'
                        variant="contained"
                        fullWidth
                        onClick={()=>{
                            this.fetchLaporan();
                            var printContents = document.getElementById("printableArea").innerHTML;
                            var originalContents = document.body.innerHTML;
                       
                            document.body.innerHTML = printContents;
                       
                            window.print();
                       
                            document.body.innerHTML = originalContents;
                        }}
                        >
                            Cetak Laporan
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
                            Tanggal
                        </TableCell>
                        <TableCell>
                            pendapatan
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {this.state.laporanArr.map(
                        (supplier) => {
                            console.log(this.state);
                            return(
                                <TableRow>
                                    <TableCell>{supplier.tanggal}</TableCell>
                                    <TableCell>{supplier.pendapatan}</TableCell>
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
                Jangka Waktu
            </Typography>
            <TextField
                name="awal"
                value={this.state.awal}
                onChange={this.handleChange}
                label="awal"
                type="date"
                defaultValue="2017-05-24"
            />
            <br/>
            <TextField
                name="akhir"
                value={this.state.akhir}
                onChange={this.handleChange}
                label="akhir"
                type="date"
                defaultValue="2017-05-25"
            />
            <br/><br/>
            <Typography variant="h5">
                Pendapatan
            </Typography>
            <Typography variant="h6">
                {this.state.pendapatan}
            </Typography>
            <br/>
            <Typography variant="h5">
                Rata-rata per Hari
            </Typography>
            <Typography variant="h6">
                {this.state.rata}
            </Typography>
        </div>;
    }
    Grafik = () => {

        return <div>
            <Bar data={{
                 labels: this.state.listTanggal,
                 datasets: [{
                     label: 'penapatan',
                     data: this.state.listPendapatan
                 }]
            }} options={
                {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero:true
                            }
                        }]
                    }
                }
            }/>
        </div>
    }
    render(props){
      

        return(
            <div className="container">
                <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(34, 52, 150)'}}>
                    <div className='header80'>
                      <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
                      Laporan
                      </Typography>
                      {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
                        Isi formulir dibawah untuk menambahkan taman.
                      </Typography> */}
                    </div>
                </div>        
                <div className='content80' center={1}> 
                      <this.DialogQty />
                      <this.TombolAtas />             
                      <div id="printableArea">
                        <Grid container spacing={24} style={{marginTop:'16px'}}>
                            <Grid item xs={8} sm={8} md={8} xl={8}>
                                <Paper>
                                    <this.Grafik />
                                </Paper>
                                <Paper style={{marginTop:'24px'}}>
                                    <this.ItemTable />
                                </Paper>
                            </Grid>
                            <Grid item xs={4} sm={4} md={4} xl={4}>
                                <Paper style={{padding:24}}>
                                    <this.PanelKanan />
                                </Paper>
                            </Grid>
                        </Grid>                      
                      </div>

                      
                      
                </div>
            </div>  
        );
    }

}
export default Cashier;
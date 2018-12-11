import React, { Component } from 'react';
// import {
//   Paper,
//   Typography,
//   TextField,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Grid
// } from '@material-ui/core';
import {Typography, Button} from '@material-ui/core/';
import {Link} from 'react-router-dom';
// import axios from 'axios';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {

  };
    
  }
  
  render() {
    return (<div className='container'>
      {/* <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(67, 160, 71)'}}>
        <div className='header80'>
          <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
            Home
          </Typography>
          <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
          Public Park Application for all Jakartans
          </Typography>
        </div>
      </div>
      
      <div className='content80'>
        <p>Halo</p>
        <Link to="/park/list">Daftar Layanan</Link><br/>
        <Link to="/park/list">Daftar Taman</Link><br/>
        <Link to="/park/list">Instansi Saya</Link><br/>
        <Link to="/park/list">Peminjaman</Link><br/>
        Admin<br/>
        <Link to="/admin/park/add">Menu Admin</Link><br/>
        <Link to="/admin/park/add">Edit Taman</Link><br/>
        <Link to="/admin/park/add">Tambah Taman</Link><br/>
        Moderator<br/>
        <Link to="/admin/park/add">Terima Ulasan</Link><br/>
      </div> */}
      <p>Halo</p>
    </div>);
  }
}

export default App;

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
import axios from 'axios';
import Cookies from 'js-cookie';
import {Typography} from '@material-ui/core';
class Admin extends Component {

  constructor(props){
    super(props);
    this.state = {

    };
    this.submitFiles = this.submitFiles.bind(this);
  }
submitFiles(event){
  let formData = new FormData();
  
  // for( var i = 0; i < event.target.length; i++ ){
  //   alert(event.target.length);
  //   let file = event.target.files[i];

  //   formData.append('uploadfile[' + i + ']', file);
  // }
  axios.defaults.withCredentials = true;
  let axiosConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
      'x-access-token': Cookies.get('token')
    }
  };
  axios.post('/api/file/upload',formData, axiosConfig).then(
    response => {
        console.log(response);
    }
  ).catch(
      function(error){
          console.log(error);
      }
  );
}

handleFilesUpload(){
  // this.files = this.$refs.files.files;
}

  render() {
    return (
      <div className="container">
      <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(67, 160, 71)'}}>
        <div className='header80'>
          <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
            Menu Administrator
          </Typography>
          {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
            Isi formulir dibawah untuk menambahkan taman.
          </Typography> */}
        </div>
      </div>
        <p>Halo Admin!</p>
        {Cookies.get('token')}
        <form action="/api/file/upload" method="post" enctype="multipart/form-data">
          <label>Pilih FIle</label>
          <input name="uploadfile" id="uploadfile" type="file" class="file" multiple/>
          <button onClick={this.submitFiles} />
        </form>
      </div>
    );
  }
}

export default Admin;

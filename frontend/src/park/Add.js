import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import {Paper, Typography, Grid, InputAdornment, TextField, Button, Chip, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core/';
import axios from 'axios';
import Cookies from 'js-cookie';
import DeleteIcon from '@material-ui/icons/Delete';
import queryString from 'query-string';
const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  judul: {
    flexGrow: 1,
    padding: theme.spacing.unit * 4,
    marginTop:30
  },
  paper: {
    padding: theme.spacing.unit * 12,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    justify: 'center',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width:200,
  },
  margin: {
    margin: theme.spacing.unit,
  },
});

class Add extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      editMode: false,
      parkId: null,
      name:'',
      address:'',
      area:'',
      city:'',
      district:'',
      street:'',
      zipcode:'',
      coordinate:'',
      description:'',
      file:[],
      photoArr:[],
      facility: [{
        // isSelected:false,
        // index: 0,
        // data:{facility:'loading'}
        facility:'',
        id:'',
      }],
      selectedFacility:[],
      isPhotoUploaded:false,
      isPhotoSelected:false,
      filterFacility:'',
      newFacility:'',
      open:false
  };

    this.submitPhotos = this.submitPhotos.bind(this);
    this.onPhotosChange = this.onPhotosChange.bind(this);
    this.PrintImg = this.PrintImg.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.loadFacility = this.loadFacility.bind(this);
    this.allFacility = this.allFacility.bind(this);
    this.selectFacility = this.selectFacility.bind(this);
    this.submitNewFacility = this.submitNewFacility.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount(){
    this.loadFacility();
    if(typeof queryString.parse(this.props.location.search).edit !== 'undefined'){
      this.setState({parkId: queryString.parse(this.props.location.search).edit, editMode:true },
      ()=>{
        this.fetchPark();
      });
      
    }
  }
  fetchPark = () => {
    let postData = {
        
            parkId: this.state.parkId
        
    };
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            // "Access-Control-Allow-Origin": "*",
            'x-access-token': Cookies.get('token')
        }
    };
    axios.post('/api/parks/get',
    postData, axiosConfig).then(
        response => {
            console.log(response);
            let parkData = response.data.data.park;
            this.setState({
                name: parkData.name,
                area: parkData.area,
                // facility: parkData.facility,
                city: parkData.address.city,
                zipcode: parkData.address.zipcode,
                street: parkData.address.street,
                coordinate: parkData.address.coordinate,
                photoArr: parkData.photo,
                district: parkData.address.district,
                description: parkData.description
            });
            let qwe = [];
            parkData.facility.map((f) => {
              console.log('zzzzzzz');
              console.log(f._id);
              qwe.push(f._id);
            });
            this.setState({selectedFacility: qwe});
            console.log(this.state.selectedFacility);
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
  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  submitEdit = (e) => {
    e.preventDefault();
    // await this.submitPhotos();
    console.log('state');
    console.log(this.state.photoArr);
    axios.defaults.withCredentials = true;
    let tempFacility = [];
    // this.state.facility.filter(facility => facility.isSelected).map(facility=>{
    //   tempFacility.push(facility.id);
    // });
    this.state.selectedFacility.map(id=>{
      tempFacility.push(id);
    });    
    let postData = {
      name: this.state.name,
      address: {
        city: this.state.city,
        district: this.state.district,
        street: this.state.street,
        zipcode: this.state.zipcode,
        area: this.state.area,
        coordinate: this.state.coordinate,
      },
      facility: tempFacility,
      photo: this.state.photoArr,
      description: this.state.description
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Cookies.get('token')
      }
    };
    axios.post("/api/admin/park/edit",{parkId:this.state.parkId, update: postData},config)
        .then((response) => {
            alert("Submit Success");
        }).catch((error) => {
    });
  }
  async submitForm(e){
    e.preventDefault();
    // await this.submitPhotos();
    console.log('state');
    console.log(this.state.photoArr);
    axios.defaults.withCredentials = true;
    let tempFacility = [];
    // this.state.facility.filter(facility => facility.isSelected).map(facility=>{
    //   tempFacility.push(facility.id);
    // });
    this.state.selectedFacility.map(id=>{
      tempFacility.push(id);
    });    
    let postData = {
      name: this.state.name,
      address: {
        city: this.state.city,
        district: this.state.district,
        street: this.state.street,
        zipcode: this.state.zipcode,
        area: this.state.area,
        coordinate: this.state.coordinate,
      },
      facility: tempFacility,
      photo: this.state.photoArr,
      description: this.state.description
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Cookies.get('token')
      }
    };
    axios.post("/api/admin/park/add",postData,config)
        .then((response) => {
            alert("Submit Success");
        }).catch((error) => {
    });
  }
  submitNewFacility(e){
    e.preventDefault();
    axios.defaults.withCredentials = true;
    let postData = {
      facility: this.state.newFacility
    }
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': Cookies.get('token')
      }
    };
    axios.post("/api/admin/park/facility/add",postData,config)
        .then((response) => {
            alert("Submit Success");    
            this.setState({open:false});
            this.loadFacility();
        }).catch((error) => {
    });
  }  
  submitPhotos = () => {
      const formData = new FormData();
      console.log(this.state.file);
      let asdf = [];
      for(let i = 0; i < this.state.file.length; i++){
        formData.append('uploadfile', this.state.file[i]);
        // asdf.push(this.state.file[i]);
      }
      // this.setState({photoArr:asdf});
      // formData.append('uploadfile',this.state.file);
      axios.defaults.withCredentials = true;
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          'x-access-token': Cookies.get('token')
        }
      };
      axios.post("/api/file/upload",formData,config)
          .then((response) => {
              //let arrPhotoUrl = [];
              this.setState({isPhotoUploaded:true});
              console.log(response.data.file);
              response.data.file.map((f,i) => {
                let zxcv = '/api/getImg/' + f.filename;
                this.setState({photoArr: this.state.photoArr.concat([zxcv])});
              });
              // this.setState({photoArr: this.state.photoArr.concat(response.data.file)});
              //console.log('arrphotourl');
              //console.log(arrPhotoUrl);
              //this.setState({photoArr:arrPhotoUrl});
          }).catch((error) => {
            console.log('ERRRORRRR');
            console.log(error);
      });
    };
deleteFile(index){
  let url = this.state.photoArr[index];
  this.setState({photoArr: this.state.photoArr.filter((_, i) => i !== index)});
  let fileName=url.substring(12);
  axios.defaults.withCredentials = true;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': Cookies.get('token')
    }
  };
  axios.post("/api/file/delete",{fileName:fileName},config)
      .then((response) => {
          //let arrPhotoUrl = [];
          console.log(fileName);

      }).catch((error) => {
        console.log('ERRRORRRR');
        console.log(error);
  });  
}
onPhotosChange(e) {
  e.preventDefault(); 
    console.log(e.target.files);
    this.setState({file: e.target.files}, ()=>{
      this.submitPhotos();
    });

}
/*
  Handles a change on the file upload
*/
handleChange(e) {
  e.preventDefault();
  this.setState({
    [e.target.name]: e.target.value
  });
}
PrintImg(){
  const { classes } = this.props;
  if(this.state.photoArr.length !== 0){
    return(
      <Paper className='paper48'>
        {this.state.photoArr.map((url, index) => {
        return(<div>
          <img src={url} style={{padding:'4px', display:'inline-block'}} alt='' />
          <DeleteIcon onClick={() => {this.deleteFile(index)}} />
        </div>);
      })}
      </Paper>
    );
  // } else if(this.state.isPhotoSelected){
  //   return(
  //     <Paper className={classes.judul} elevation={1}>
  //       {this.state.photoArr.map((url, index) => {
  //       return(<div>
  //         <img src={url} style={{padding:'4px', display:'inline-block'}} alt='' />
  //       </div>);
  //     })}
  //     </Paper>
  //   );

  }else {
    return(
      <div>
        <Paper className='paper48'>Klik "Tambah Gambar" untuk menambah gambar</Paper>
      </div>
    );
  }
}
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
            tempFacility.push(facility);
          });
          this.setState({facility:tempFacility});
      }).catch((error) => {
  });
}
selectFacility(){
  return(
    <div>
      {this.state.facility.filter(facility => {
        return(this.state.selectedFacility.includes(facility.id));
      }).map((facility) => {
        return(
          <Chip
          label={facility.facility}
          onDelete={() => {
            let tempArrEl = this.state.facility;
            // tempArrEl[facility.index].isSelected = false;
            this.setState({selectedFacility: this.state.selectedFacility.filter(function(ele){
              return ele != facility.id;
          })
        });
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
        if(facility.facility.toLowerCase().search(this.state.filterFacility.toLowerCase()) !== -1 && !this.state.selectedFacility.includes(facility.id)){
          return true;
        }
        return false;
      }).map((facility) => {
        return(
          <Chip
            // avatar={<Avatar>MB</Avatar>}
            label={facility.facility}
            onClick={() => {
              console.log(facility.id);
              //let tempArrEl = this.state.selectedFacility;
              // tempArrEl[facility.index].isSelected = true;
              // tempArrEl.push(facility.id);
              this.setState({selectedFacility: this.state.selectedFacility.concat([facility.id])});
            }}
            style={{margin:4}}
            // className={classes.chip}
          />
        );
      })}
    </div>
  );
}
render() {
  const { classes } = this.props;
  let SubmitButton =       <Button
  variant="contained"          
  type='submit'
  color='primary'
  align='center'
  style={{width: '100%', marginTop:'30px'}}
  onClick={this.submitForm}
  >Tambah Taman</Button>
  if(this.state.editMode){
    SubmitButton =       <Button
    variant="contained"          
    type='submit'
    color='primary'
    align='center'
    style={{width: '100%', marginTop:'30px'}}
    onClick={this.submitEdit}
    >Ubah Taman</Button>
  }
  return (
    <div className="container">
      <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(67, 160, 71)'}}>
        <div className='header80'>
          <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
            {/* Tambah Taman */}
            {this.state.isEdit? ('Edit Taman' + this.state.name) : ('Tambah Taman' + this.state.name)}
          </Typography>
          <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
            Isi formulir dibawah untuk menambahkan taman.
          </Typography>
        </div>
      </div>
    <div className='content80'>
      {/* <Typography variant="h4">
        Tambah Taman
      </Typography>
      <Typography variant="h5">
        Isi formulir dibawah untuk menambahkan taman.
      </Typography> */}
      <Grid container spacing={24}>
        <Grid item xs={12} sm={8} lg={8} xl={8} >
        <Paper className='paper48'>
          <TextField
              required
              name='name'
              label="Nama Taman"
              style={{ margin: 8 }}
              fullWidth
              helperText="Masukan tanpa kata 'Taman', Contoh : 'Suropati'"
              margin="normal"
              value={this.state.name}
              onChange={this.handleChange}
            />
          </Paper>
          <Paper className='paper48'>
            <Typography variant="h5">
              Alamat Taman
            </Typography>
            <TextField
              required
              name='city'
              label="Kota"
              style={{ margin: 8, width:'40%' }}
              helperText="Masukan tanpa kata 'Jakarta', Contoh : 'Selatan'"
              margin="normal"
              value={this.state.city}
              onChange={this.handleChange}
            />
            <TextField
              required
              name='district'
              label="Kecamatan"
              style={{ margin: 8, width:'40%' }}
              helperText="Masukan tanpa kata 'Kecamatan', Contoh : 'Fatmawati'"
              margin="normal"
              value={this.state.distrct}
              onChange={this.handleChange}
            />
            <br/>
            <TextField
              required
              name='street'
              label="Jalan"
              style={{ margin: 8, width:'80%' }}
              helperText="Masukan tanpa kata 'Jalan', Contoh : 'Pegangsaan Timur No. 56'"
              margin="normal"
              value={this.state.street}
              onChange={this.handleChange}
              multiline
            />
            <br/>
            <TextField
              required
              name='zipcode'
              label="Kode Pos"
              style={{ margin: 8, width:'40%' }}
              helperText="Contoh : 16511"
              margin="normal"
              value={this.state.zipcode}
              onChange={this.handleChange}
            />
            <TextField
              required
              name='coordinate'
              label="Kordinat"
              style={{ margin: 8, width:'40%' }}
              helperText="Contoh : asdf"
              margin="normal"
              value={this.state.coordinate}
              onChange={this.handleChange}
            />
          </Paper>
          <Paper className='paper48'>
            <Typography variant="h5">
              Keterangan Taman
            </Typography>
            <TextField
              required
              name='area'
              label="Luas Taman"
              helperText="Dalam Satuan Hektar"
              id="luas-taman"
              className={classNames(classes.margin, classes.textField)}
              InputProps={{
                endAdornment: <InputAdornment position="end">Hektar</InputAdornment>,
              }}
              value={this.state.area}
              onChange={this.handleChange}
            />
            <Grid container>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <Typography variant="h6">
                  Fasilitas Taman Ini
                  <this.selectFacility />
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6} lg={6} xl={6}>
                <Typography variant="h6">
                  List Fasilitas
                </Typography>
                  <TextField
                  required
                  name='filterFacility'
                  label="Filter Fasilitas"
                  id="luas-taman"
                  className={classNames(classes.margin, classes.textField)}
                  value={this.state.filterFacility}
                  onChange={this.handleChange}
                  />
                  <Button
                  color='primary'
                  variant='outlined'
                  align='center'
                  style={{width: '100%', marginTop:'30px'}}
                  onClick={this.handleClickOpen}
                  >Tambah Fasilitas Lain
                  </Button>
                  <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                  >
                    <DialogTitle id="form-dialog-title">Tambah Fasilitas Baru</DialogTitle>
                    <DialogContent>
                      <DialogContentText>
                        Masukan fasilitas baru
                      </DialogContentText>
                      <TextField
                        autoFocus
                        margin="dense"
                        name="newFacility"
                        label="Fasilitas baru"
                        value={this.state.newFacility}
                        onChange={this.handleChange}
                        fullWidth
                      />
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={this.handleClose} color="primary">
                        Batal
                      </Button>
                      <Button onClick={this.submitNewFacility} color="primary">
                        Tambah Fasilitas
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <this.allFacility />
              </Grid>
                  <TextField
                    required
                    name='description'
                    label="Deskripsi taman"
                    style={{ margin: 8 }}
                    fullWidth
                    helperText="Masukan deskripsi/sejarah/dsb taman"
                    margin="normal"
                    value={this.state.description}
                    onChange={this.handleChange}
                    multiline
                  />              
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={4} lg={4} xl={4} >
          <Button
          color='primary'
          variant='outlined'
          align='center'
          style={{width: '100%', marginTop:'30px'}}
          onClick={e => {
            this.refs['file-upload'].click()
          }}
          >Tambah Gambar
          <input ref={'file-upload'} style={{display:'none'}} type="file" name="myImage" onChange= {this.onPhotosChange} multiple />
          </Button>
          <br/>
          <this.PrintImg />
        </Grid>
      </Grid>
      {SubmitButton}
    </div>
    </div>
  );
}
}

Add.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Add);
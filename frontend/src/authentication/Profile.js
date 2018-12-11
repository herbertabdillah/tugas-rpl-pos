import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, TextField, Button} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  active:{
    backgroundColor:'rgba(0, 0, 0, 0.08)'
  }
});

class Profile extends React.Component {
//   state = {
//     value: 0,
//   };
  constructor(props){
      super(props);
    this.state = {
        value: 0,
        name: '',
        email: '',
        password: '',
        checkGroup:{
            notifEmail:false,
            notifPhone:false
        }
      };
  }
  handleChange = (event, value) => {
    this.setState({ value });
    // event.target.style = {{backgroundColor:'rgba(0, 0, 0, 0.08)'}};
  };
  handleCheckChange = name => event => {
    this.setState({
        checkGroup:{
            [name]:event.target.checked
        }
    });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
        <div className="container" >
          <div style={{width:'100%',margin:'auto', backgroundColor:'rgb(67, 160, 71)'}}>
        <div className='header80'>
          <Typography variant="h4" style={{textShadow:'1px 1px #0200004d', color:'white'}}>
            Profil
          </Typography>
          {/* <Typography variant="h6" style={{textShadow:'1px 1px #0200004d', color:'#eee'}}>
            Isi formulir dibawah untuk menambahkan taman.
          </Typography> */}
        </div>
      </div>



      <div className={[classes.root, 'back']} style={{height:'100%'}}>
        <Grid container style={{height:'80%', display:'flex', justifyContent:'center', alignItems:'center'}}>
            
            <Grid item xs={12} sm={10} lg={10} xl={10} >
                <Paper className='paper48'>
                    {/* <Typography variant='display1' align='center' gutterBottom>
                        Profil
                    </Typography> */}
                    <Grid container spacing={16}>
                        <Grid item xs={12} sm={2} lg={2} xl={2} >
                        <List component="nav">
                                <ListItem button className={value === 0 && classes.active} onClick={(event)=>this.handleChange(event,0)}>
                                <ListItemText primary="Akun" />
                                </ListItem>
                                <Divider />
                                <ListItem button className={value === 1 && classes.active} onClick={(event)=>this.handleChange(event,1)} divider>
                                <ListItemText primary="Notifikasi" />
                                </ListItem>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={8} lg={8} xl={8} >
                        {value === 0 && 
                            <div>
                                <TextField
                                name='email'
                                label='E-Mail'
                                value={this.state.email}
                                onChange={this.handleChange}
                                margin='normal'
                                type='email'
                                style={{width:'100%'}}
                                
                                />
                                <TextField
                                name='name'
                                label='Nama'
                                value={this.state.name}
                                onChange={this.handleChange}
                                margin='normal'
                                type='text'
                                style={{width:'100%'}}
                                
                                />
                                <br/>
                                <TextField
                                name='password'
                                label='Password'
                                value={this.state.password}
                                onChange={this.handleChange}
                                margin='normal'
                                type='password'
                                style={{width:'100%', height:36}}
                                
                                />
                            </div>
                        }
                        {value === 1 && 
                            <div>
                                <FormControl component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Assign responsibility</FormLabel>
                                <FormGroup>
                             
                                    <FormControlLabel
                                    control={
                                        <Checkbox checked={this.state.checkGroup.notifEmail} onChange={this.handleCheckChange('notifEmail')} value="notifEmail" />
                                    }
                                    label="Notify Email"
                                    />
                                    <FormControlLabel
                                    control={
                                        <Checkbox
                                        checked={this.state.checkGroup.notifPhone}
                                        onChange={this.handleCheckChange('notifPhone')}
                                        value="notifPhone"
                                        />
                                    }
                                    label="Notify phone"
                                    />
                                </FormGroup>
                                <FormHelperText>Be careful</FormHelperText>
                                </FormControl>
                            </div>
                        }
                        <form style={{width: '100%', marginTop:'30px'}}onSubmit={this.handleSubmit}>
                            <Button
                            type='submit'
                            color='primary'
                            variant="contained"
                       
                            style={{width: '40%', margin:5}}
                            >
                                Simpan Perubahan
                            </Button>
                            <Button
                            type='submit'
                            color='primary'
                            variant="outlined"
                           
                            style={{width: '30%', margin:5}}
                            >
                                Revert
                            </Button>
                        </form>
                        </Grid>
                        
                    </Grid>
                </Paper>
            </Grid>
        </Grid>

        </div>
        
      </div>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Profile);
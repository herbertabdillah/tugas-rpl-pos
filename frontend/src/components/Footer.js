import React, { Component } from "react";
import { Grid } from "@material-ui/core";

class Footer extends Component {
  render() {
		if(!window.matchMedia("(min-width: 500px)").matches){
			return null;
		}
    return (
      <div style={{ 
	  backgroundColor:'rgba(0, 0, 0, 0.08)'
	  }}>
	  	<div style={{
			  padding:'16px'
		  }}>
		  	<Grid container>
				<Grid item xs={12} sm={1} lg={1} xl={1} >
					<a href='https://hackjak.jakarta.go.id/'><img src="/img/hackjacklogo.png" alt="hackjacklogo" style={{width:'100%', paddingTop:'4px'}}/></a>
				</Grid>
				<Grid item xs={12} sm={11} lg={11} xl={11} 
				style={{paddingLeft:16, color:'#656565'}}>
					&copy; 2018 Radya Playground. Dibuat untuk program inkubasi <a href='https://hackjak.jakarta.go.id/'>HACKJACK 2017</a> <br/>
					<a href='/'>Syarat dan Ketentuan</a> - <a href='/'>Hubungi Kami</a> - <a href='/'>Kirim Umpan Balik</a>
				</Grid>
		  	</Grid>
		</div>        
      </div>
    );
  }
}

export default Footer;
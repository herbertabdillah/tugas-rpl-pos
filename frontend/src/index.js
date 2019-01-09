import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Cookies from "js-cookie";
import Cashier from './cashier/Cashier';
import Supplier from './supplier/Supplier';
import Barang from './barang/Barang';
const theme = createMuiTheme({
    // palette: {
    //     primary: {
    //       main: '#43a047',
    //     },
    //     secondary: {
    //       main: '#ffab00',
    //     },
    // },
    overrides: {
        MuiAppBar:{
            root:{
                height:48,
                boxShadow:'0px 1px 1px -1px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14),0px 1px 5px 0px rgba(0, 0, 0, 0.12)'
            }
        },
        MuiToolbar:{
            regular:{
                minHeight:48,
                height:48,
                '@media (min-width: 600px)': {
                    height:48,
                    minHeight:48
                },
                '@media (min-width: 0) and (orientation: landscape)': {
                    height:48,
                    minHeight:48
                },
                // backgroundColor:'white',
                // color:'gray'
            }
        }
    }
});

function checkAuth(authorized){
    let test;
    try {
        test = Cookies.get('role');
    }catch(err){
    //  test=false;
    }
    if(typeof test != 'undefined' && test === authorized){
        return true;
    } else if(typeof test != 'undefined' && test === 'admin'){
        return true;
    } else {
        return false;
    }
}
function PrivateRoute({ component: Component, ...rest }) {

    return (
      <Route
        {...rest}
        render={props =>
          checkAuth(rest.authorized) ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/signin",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
ReactDOM.render(
    <MuiThemeProvider theme={theme}>
        <Router>
        <Switch>
            <div className='root2'>
                
                    <NavBar />
                    <Route exact path="/" component={App} />
                    <Route path="/cashier" component={Cashier} />
                    <Route path="/supplier" component={Supplier} />
                    <Route path="/barang" component={Barang} />
                    {/* <Route path="/signin" component={SignIn} />
                    <Route path="/register" component={Register} />
                    <Route path="/park/view" component={View} />
                    <Route path="/park/list" component={List} />
                    <Route path="/service/list" component={ServiceList} />
                    <PrivateRoute path="/profile" authorized='user' component={Profile} />
                    <PrivateRoute path="/park/borrow" authorized='user' component={Borrow} />
                    <PrivateRoute exact path="/admin" authorized='admin' component={Admin} />
                    <PrivateRoute path="/admin/park/add" authorized='admin' component={Add} /> */}
                    {/* <Footer />  */}
                
            </div>
            </Switch>
        </Router>
    </MuiThemeProvider>
       
    ,
    document.getElementById('root'));
 
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA

if(module.hot){
    module.hot.accept();
}

serviceWorker.unregister();
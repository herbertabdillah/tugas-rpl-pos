import Cookies from 'js-cookie';
import axios from 'axios';
function isLogin(){
    if(typeof Cookies.get('token') !== 'undefined'){
        return true;
    } else {
        return false;
    }    
}
function getUserData(){
    return {
        token: Cookies.get('token'),
        name:  Cookies.get('name'),
        role: Cookies.get('role')
    };
}
function setLogin(data){
    Cookies.set('token', data.token, {path:'/'});
    Cookies.set('name', data.user.name, {path:'/'});
    Cookies.set('role', data.user.role, {path:'/'});    
}
function setLogout(){
    Cookies.remove('name',{path:'/'});
    Cookies.remove('token',{path:'/'});
    Cookies.remove('role',{path:'/'});
}
async function check(){
    let promise = new Promise((resolve, reject) => {
        const config = {
            headers: {
            'x-access-token': Cookies.get('token')
            }
        };
        axios.post("/api/users/authenticate",{},config)
        .then((response) => {
            if(response.data.status === "error"){
                resolve(false);
            } else {
                resolve(true);
            }
        });        
      });    
    return await promise;
}
export default {isLogin, getUserData, setLogin, setLogout, check};



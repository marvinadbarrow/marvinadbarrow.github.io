
const signIn = () =>{

    let oauth2EndPoint = "https://accounts.google.com/o/oauth2/auth";
    let form = document.createElement('form');
    form.setAttribute('method', 'GET');
    form.setAttribute('action', oauth2EndPoint);

let params = {
    "client_id": "222927874129-nbraflgfsb88pn0u4fritjevi90gk4tf.apps.googleusercontent.com", 
    "redirect_uri": "",
    "response_type": "token",
    "scope": "https://oauth2.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/youtube.readonly", 
    "include_granted_scopes": "true", 
    "state": "pass-through-value"


}

for(var p in params){
    let input = document.createElement('input');
    input.setAttribute('type', 'hidden');
    input.setAttribute('name', p);
    input.setAttribute('value', params[p]);
    form.appendChild(input);
}
document.body.appendChild(form)
form.submit()
}


//signIn()
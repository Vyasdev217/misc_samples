//-----INITIALIZATION-----

var sample_account={
    "qwerty@asdf.com":"qwerty123",
    "qwerty":"qwerty123",
    "lolman":"hahaha@123",
    "username":"password"
};
var entered_userid;
var signup_validation=[0,1,1,0,0];
var signup_email;
var signup_username;
var signup_name;
var signup_pw1;
var signup_pw2;
document.getElementById('reset_div').onclick=reset;
document.getElementById('reset_div2').onclick=reset;
document.getElementById('button0').onclick=login_or_signup;
document.getElementById('button_signup').onclick=signup;

document.getElementById('input0').addEventListener('keyup',function(event){
    if (event.keyCode === 13){
        document.getElementById('button0').click();
        if(document.getElementById('input0').getAttribute('placeholder')=='Password'&&
        document.getElementById('input0').value!='')
        document.activeElement.blur();
    }
})

//-----VALIDATION OF INPUTS-----

function signup_validation_func(){
    if(signup_validation.includes(0)==false) document.getElementById('button_signup').disabled=false;
    else document.getElementById('button_signup').disabled=true;
}
signup_validation_func()

document.getElementById('input0').oninput=function(){ //login_user id
    if(document.getElementById('input0').getAttribute('placeholder')=='Password') return;
    entered_userid=document.getElementById('input0').value;
    if(entered_userid in sample_account==false && entered_userid==entered_userid.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/))
        document.getElementById('button0').innerText='Sign up'; 
    else
        document.getElementById('button0').innerText='Next'; 
}

document.getElementById('signup_email').oninput=function(){ //signup_email
    signup_email=document.getElementById('signup_email').value;
    document.getElementById('signup_email_warning').style.color='transparent';
    if(signup_email!=signup_email.match(/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/)){ // Invalid email id
        document.getElementById('signup_email').style.backgroundColor='#ffaaaa';
        signup_validation[1]=0;
    }
    else{
        if(signup_email in sample_account==false){ // Valid email id
            document.getElementById('signup_email').style.backgroundColor='#aaffaa';
            signup_email_valid=1;
            signup_validation[1]=1;
        }
        else{ // Account exists
            document.getElementById('signup_email').style.backgroundColor='#ffaaaa';
            signup_email_valid=0;
            document.getElementById('signup_email_warning').style.color='red';
            signup_validation[1]=0;
        }
    }
    signup_validation_func();
}

document.getElementById('signup_username').oninput=function(){ // signup_username
    signup_username=document.getElementById('signup_username').value;
    if(signup_username in sample_account==false){ // Valid username
        document.getElementById('signup_username').style.backgroundColor='#aaffaa';
        document.getElementById('signup_username_warning').style.color='transparent';
        signup_validation[2]=1;
    }
    else{ // Invalid username
        document.getElementById('signup_username').style.backgroundColor='#ffaaaa';
        document.getElementById('signup_username_warning').style.color='red';
        signup_validation[2]=0;
    }
    signup_validation_func();
}

document.getElementById('signup_name').oninput=function(){ // sugnup_name
    signup_name=document.getElementById('signup_name').value;
    if(signup_name!=''){
        document.getElementById('signup_name').style.backgroundColor='#aaffaa';
        signup_validation[0]=1;
    }
    else{
        document.getElementById('signup_name').style.backgroundColor='#ffaaaa';
        signup_validation[0]=0;
    }
    signup_validation_func();
}

document.getElementById('signup_pw1').oninput=function(){ // sugnup_name
    signup_pw1=document.getElementById('signup_pw1').value;
    if(signup_pw1!=''){
        document.getElementById('signup_pw1').style.backgroundColor='#aaffaa';
        signup_validation[3]=1;
    }
    else{
        document.getElementById('signup_pw1').style.backgroundColor='#ffaaaa';
        signup_validation[3]=0;
    }
    document.getElementById('signup_pw2').oninput();
    signup_validation_func();
}

document.getElementById('signup_pw2').oninput=function(){ // sugnup_name
    signup_pw1=document.getElementById('signup_pw1').value;
    signup_pw2=document.getElementById('signup_pw2').value;
    if(signup_pw1==signup_pw2){
        document.getElementById('signup_pw2').style.backgroundColor='#aaffaa';
        document.getElementById('signup_pw_warning').style.color='transparent';
        signup_validation[4]=1;
    }
    else{
        document.getElementById('signup_pw2').style.backgroundColor='#ffaaaa';
        document.getElementById('signup_pw_warning').style.color='red';
        signup_validation[4]=0;
    }
    signup_validation_func();
}

//-----FUNCTIONS-----
function login_or_signup(){
    if(document.getElementById('input0').getAttribute('placeholder')=='Password'){
        login();
        return;
    }
    entered_userid=document.getElementById('input0').value;
    if(entered_userid in sample_account){
        document.getElementById('username_label').innerText=entered_userid;
        document.getElementById('username_label').style.color='#000000';
        document.getElementById('input0').value='';
        document.getElementById('input0').setAttribute('placeholder','Password');
        document.getElementById('input0').setAttribute('type','password');
        document.getElementById('label0').innerText='Login';
        document.getElementById('button0').innerText='Login';
    }
    else if(document.getElementById('button0').innerText=='Next'){
        document.getElementById('username_label').innerText='The entered account does not exist.\nEnter your email id to sign up.';
        document.getElementById('username_label').style.color='#ff0000';
    }
    else{
        document.getElementById('login-box').style.display='none';
        document.getElementById('signup-box').style.display='block';
        document.getElementById('signup_email').value=entered_userid;
        signup_email=entered_userid;
        document.getElementById('signup_email').style.backgroundColor='#aaffaa';
    }
}

function signup(){
    sample_account[signup_email]=signup_pw1;
    if(signup_username!=''){
        sample_account[signup_username]=signup_pw1
    }
    var a=document.getElementsByClassName('input');
    for(var i=0;i<a.length;i++){
        a[i].value='';
        a[i].style.backgroundColor='transparent';
    }
    signup_validation=[0,1,1,0,0];
    confirm('Account created successfully!');
    reset();
}

function login(){
    if(sample_account[entered_userid]==document.getElementById('input0').value) alert('Login successful :)');
    else alert('Wrong password :(');
}

function reset(){ // Reset UI
    document.getElementById('username_label').innerText='';
    document.getElementById('input0').value='';
    document.getElementById('input0').setAttribute('placeholder','Username or Email ID');
    document.getElementById('input0').setAttribute('type','text');
    document.getElementById('label0').innerText='Login / Signup';
    document.getElementById('button0').innerText='Next';
    document.getElementById('signup-box').style.display='none';
    document.getElementById('login-box').style.display='block';
    signup_validation=[0,1,1,0,0];
    var a=document.getElementsByClassName('input');
    for(var i=0;i<a.length;i++){
        a[i].value='';
        a[i].style.backgroundColor='transparent';
    }
}

reset();

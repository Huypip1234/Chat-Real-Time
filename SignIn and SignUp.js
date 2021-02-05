var firebaseConfig = {
    apiKey: "AIzaSyBF23vY3ovSgvfoPr8k8PgYEb5eel0lfHs",
    authDomain: "bruhchatt.firebaseapp.com",
    projectId: "bruhchatt",
    storageBucket: "bruhchatt.appspot.com",
    messagingSenderId: "836575476310",
    appId: "1:836575476310:web:578c1b8b6e501b8fc519f7",
    measurementId: "G-1JEMB07XWV"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

function sendRegistrationn() {
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var gender;
    var checkMale = document.getElementById("male").checked;
    if(checkMale) {gender = document.getElementById("male").value}
    else {gender = document.getElementById("female").value}

       firebase.auth().createUserWithEmailAndPassword(email,password).then(function(){
        // alert('User Register successfully');
        var id=firebase.auth().currentUser.uid;
        firebase.database().ref('Users Information/'+id).set({
            "FullName": name,
            "Email": email,
            "Password": password,
            "gender": gender,
        });
    
    
    
       }).catch(function(error){
    
        var errorcode=error.code;
        var errormsg=error.message;
    
       });
       alert("Đăng kí thành công! mời bạn đăng nhập")
    return false;
}

function Login(){
    var email=document.getElementById('email_Login').value;
    var password=document.getElementById('password_Login').value;
    firebase.auth().signInWithEmailAndPassword(email,password).then(function(){
 
 
     var id=firebase.auth().currentUser.uid;
     window.location.replace("ChatRoom.html");
     localStorage.setItem('id',id);
     
    }).catch(function(error){
 
     var errorCode=error.code;
     var errorMsg=error.message;
     window.alert("Sai mật khẩu hoặc tài khoản không tồn tại");
    });
    return false;
}

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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

var check = false;

//2 cau duoi de truy xuat vao tai khoan
var userId=localStorage.getItem('id'); //lay id tu localstorage
firebase.database().ref('Users Information/'+userId).once('value').then(function(snapshot){ //truy xuat id
var name =(snapshot.val() && snapshot.val().FullName);
document.getElementById('name').innerHTML = name;
document.getElementById("name").value = name;
});

function sendMessage() {
    var sender = document.getElementById("name").value;
    var message = document.getElementById("message").value;
    if(message==="Bruh" || message==="bruh" || message==="Brủh" || message==="brủh" || message==="Bủh" || message==="bủh") {check=true;} 
    
    if (check) {
      firebase.database().ref("message").push().set({
          "sender": sender,
          "message": message,
      })
    } else {
      alert("Brủh trước đã");
    }
    return false;
}

//listen for incoming message
firebase.database().ref("message").on("child_added", function (snapshot) {
  var html = "";
  html += "<li>";
  html += snapshot.val().sender + ": " + snapshot.val().message;
  html += "</li>";

  document.getElementById("messages").innerHTML += html;
});

function logout(){
  firebase.auth().signOut(); //ko co tac dung
  window.location.replace("SignIn and SignUp.html");
}
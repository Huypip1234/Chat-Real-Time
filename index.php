<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js"></script>

<!-- include firebase database -->
<script src="https://www.gstatic.com/firebasejs/8.2.5/firebase-database.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/8.2.5/firebase-analytics.js"></script>

<script>
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

  var myName = prompt("Enter your name");

  function sendMessage() {
      var message = document.getElementById("message").value;
      //save in database
      firebase.database().ref("message").push().set({
          "sender": myName,
          "message": message,
      })
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

</script>

<form onsubmit="return sendMessage();">
  <input id="message" placeholder="Enter message" autocomplete="off">
  <input type="submit">
</form>

<ul id="messages"></ul>

function login(){
  var email =  $("#username").val();
 var password = $("#password").val();
 firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;

  document.querySelector(".before-login").style.display = "none";
  document.querySelector(".after-login").style.display = "flex";

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorCode,errorMessage)
  });

}
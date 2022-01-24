function signup(){
  var trial_password = $("#password-1").val();
  var username = $("#create-username").val();
  var email = $("#email").val();
  var password = $("#n-password").val();
  if(trial_password === password ){
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
   console.log(userCredential);

   var uid = userCredential.user.uid
firebase.database().ref("/").child("users").child(uid).set({
 username:username
    });

      swal({
  title: "Account created succcesfully",
  text: "Hi "+ username+" , welcome to novacloud",
  icon: "success",
    });


  })

  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    swal({
  title: "Error !" + "(code:"+errorCode+")",
  text: errorMessage,
  icon: "error",
    });
  });
  }
  else{
    
    swal({
  title: "Error !",
  text: "Your passwords do not match ",
  icon: "error",
    });

  }
  


}
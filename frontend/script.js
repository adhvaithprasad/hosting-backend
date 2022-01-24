$(window).on('hashchange', function() {
  //.. work ..
  location.reload();
});



firebase.auth().onAuthStateChanged((user) => {
  if (user) {
document.querySelector(".loading-screen").style.display="none";
    var uid = user.uid;

    firebase.database().ref("/").child("users").child(uid).get().then((snapshot) => {
  if (snapshot.exists()) {
    var name = snapshot.val().username;
   console.log(name);
   document.getElementById("ud").textContent = name;
        var link = "https://avatars.dicebear.com/api/micah/"+name+".svg?background=white";
document.getElementById("svg-display").setAttribute("src",link);


  } else {
    console.log("No data available");
  }
}).catch((error) => {
  console.error(error);
});


    document.querySelector(".before-login").style.display = "none";
  document.querySelector(".after-login").style.display = "flex";



    var hash = window.location.hash.replace(/#/g, '');

    // take a look at hashes


    if (hash) {

      var wrapperid = hash.split("/")[0]; 
      
if(document.getElementById(wrapperid)){
   
  

    document.getElementById(wrapperid).style.display="block";

    document.getElementById("inavailable").style.display="none";

    






} else {
    document.getElementById("inavailable").style.display="flex"
}




    }

    // hash does not Exist
         else {
       
document.getElementById("inavailable").style.display = "flex"; 
       


      }


  
  } else {
    document.querySelector(".loading-screen").style.display="none";
      document.querySelector(".before-login").style.display = "flex";
  document.querySelector(".after-login").style.display = "none";
  }
});



function create_ac(){
  document.querySelector(".sign-in-div").style.display = "none";
  document.querySelector(".sign-up-div").style.display = "flex";
}
function login_ac(){
  document.querySelector(".sign-up-div").style.display = "none";
  document.querySelector(".sign-in-div").style.display = "flex";
}


function logout(){
  firebase.auth().signOut().then(() => {
  // Sign-out successful.
  swal({
  title: "Logged out Succesfully",
  text: "Hey you got logged out Succesfully",
  icon: "success",
    });

}).catch((error) => {
  // An error happened.
   swal({
  title: "Logged out Unsuccesfull",
  text: error,
  icon: "error",
    });
});

}
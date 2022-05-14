//const M = require("minimatch");

//const { default: firebase } = require("@firebase/app-compat");
//const { FirebaseApp } = require("@firebase/app-types");

const myModel = document.querySelectorAll('.modal');

async function signup(e){
    e.preventDefault();
    const email = document.querySelector("#signupEmail");
    const password = document.querySelector("#signupPassword");
   // console.log(email.value,password.value);

    try{
        const result = await firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
        await result.user.updateProfile({
            displayName:"User"
        })
        createUserCollection(result.user)
       // toast({html:`Welcome ${result.user.email}`,classes:"red"});
        console.log(result);
    

    }catch(err){
        console.log(err);
        //toast({html:'Password should have atleast 6 characters'});
    }
    email.value = ""
    password.value = ""
    M.Modal.getInstance(myModel[0]).close();
   

}

async function login(e){
    e.preventDefault();
    const email = document.querySelector("#loginEmail");
    const password = document.querySelector("#loginPassword");
   // console.log(email.value,password.value);

    try{
        const result = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
       // toast({html:`Welcome ${result.user.email}`,classes:"red"});
        console.log(result);


    }catch(err){
        console.log(err);
        //toast({html:'Password should have atleast 6 characters'});
    } 
  
    email.value = ""
    password.value = ""
    M.Modal.getInstance(myModel[1]).close();
   

}

function logout(){
    firebase.auth().signOut();
}

const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
    if(user) {
        console.log(user)
        getuserInfo(user.uid)
    } 
    else {
        getuserInfo(null)
        console.log('signout unsuccessful')
    }
})

firebase.auth().onAuthStateChanged((user)=>{
    if(user){
        console.log(user);
    }
    else{
        console.log('signout success');
    }
});

var user = firebase.auth().currentUser;



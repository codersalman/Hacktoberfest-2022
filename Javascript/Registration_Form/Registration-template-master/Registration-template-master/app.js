// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: "AIzaSyDlCd1hVZu2Z4UGApdV06ufnGyJWm6jke8",
  authDomain: "user-interface-eeb5d.firebaseapp.com",
  databaseURL: "https://user-interface-eeb5d-default-rtdb.firebaseio.com",
  projectId: "user-interface-eeb5d",
  storageBucket: "user-interface-eeb5d.appspot.com",
  messagingSenderId: "930137568837",
  appId: "1:930137568837:web:5c19c33ec3e1d69f9c552c"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Refernece contactInfo collections
let contactInfo = firebase.database().ref("infos");

// Listen for a submit
document.querySelector(".contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();

  //   Get input Values
  let fname = document.querySelector(".fname").value;
  let lname = document.querySelector(".lname").value;
  let email = document.querySelector(".email").value;
  let gender = document.querySelector(".gender").value;
  console.log(fname,lname, email, gender);

  saveContactInfo(fname,lname, email, gender);

  document.querySelector(".contact-form").reset();
}

// Save infos to Firebase
function saveContactInfo(fname,lname, email, gender) {
  let newContactInfo = contactInfo.push();

  newContactInfo.set({
    fname: fname,
    lname: lname,
    email: email,
    gender: gender,
  });
}

//retrive infos
function retrieveInfos() {
  let ref = firebase.database().ref("infos");
  ref.on("value", gotData);
}

function gotData(data) {
  let info = data.val();
  let keys = Object.keys(info);

  for (let i = 0; i < keys.length; i++) {
    let infoData = keys[i];
    let fname = info[infoData].fname;
    let lname = info[infoData].lname;
    let email = info[infoData].email;
    let gender = info[infoData].gender;
    console.log(fname, email, gender);

    let infosResults = document.querySelector(".infosResults");

    infosResults.innerHTML += `<div>
  <p> First-Name: ${fname}<br>
  Last-Name: ${lname}<br>

  <a> Email: ${email}</a><br>
  <a>Account: ${gender}</a>
  </p><div>`;
  }
}

retrieveInfos();
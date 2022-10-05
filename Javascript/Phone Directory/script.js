let user=prompt('Enter your First name!');
let a=document.getElementById('a');
a.innerHTML=user;
let contanier=document.getElementById('contanier');
contanier.style.display="block";
showContacts();
//On click on the button add contact
let addCon = document.getElementById('addCon');
addCon.addEventListener('click', function (e) {
    let addName = document.getElementById('name');
    let addPhone = document.getElementById('phone');
    let name = localStorage.getItem("name");
    let phone = localStorage.getItem("phone");
    if (name == null || phone == null) {
        nameObj = [];
        phoneObj = [];
    }
    else {
        nameObj = JSON.parse(name);
        phoneObj = JSON.parse(phone);
    }
    nameObj.push(addName.value);
    phoneObj.push(addPhone.value);
    localStorage.setItem("name", JSON.stringify(nameObj));
    localStorage.setItem("phone", JSON.stringify(phoneObj));
    addName.value = "";
    addPhone.value = "";
    //Total count++
    let totalCon=localStorage.getItem('totalCon');
    parseInt(totalCon++);
    localStorage.setItem('totalCon',totalCon);
    showContacts();
})
//Show Contacts
function showContacts() {
    //print total
    let totalConInner=document.getElementById("totalCon");
    let totalConFi=localStorage.getItem('totalCon');
    totalConInner.innerHTML=`Total Contacts = ${totalConFi}`
    //Del
    let name = localStorage.getItem("name");
    let phone = localStorage.getItem("phone");
    if (name == null || phone == null) {
        nameObj = [];
        phoneObj = [];
    }
    else {
        nameObj = JSON.parse(name);
        phoneObj = JSON.parse(phone);
    }
    let html = "";
    nameObj.forEach(function (element, index) {
        const phoneIndex = phoneObj[index];
        html += `
        <table class="contacts">
        <tr>
        <td style="width: 15%;">${index + 1}</td>
        <td style="width: 20%;">${element}</td>
        <td style="width: 20%;">${phoneIndex}</td>
        <td style="width: 20%;"><button id="${index}" onclick="delCon(this.id)">Delete</button></td>
        </table>
    </tr>`
    });
    let saveCon = document.getElementById("tabledd");
    if (nameObj.length != 0 || phoneObj.length != 0) {
        saveCon.innerHTML = html;
    }
    else {
        saveCon.innerHTML = `Please Saved any Contact!`;
    }

}
function delCon(index) {

    let name = localStorage.getItem("name");
    let phone = localStorage.getItem("phone");
    if (name == null || phone == null) {
        nameObj = [];
        phoneObj = [];
    }
    else {
        nameObj = JSON.parse(name);
        phoneObj = JSON.parse(phone);
    }
    nameObj.splice(index, 1);
    phoneObj.splice(index, 1);
    localStorage.setItem("name", JSON.stringify(nameObj));
    localStorage.setItem("phone", JSON.stringify(phoneObj));
 //Total count --
    let totalCon=localStorage.getItem('totalCon');
    parseInt(totalCon--);
    localStorage.setItem('totalCon',totalCon);
    showContacts();

}
//Searc Engine
let inp = document.getElementById('search');
inp.addEventListener("input", function () {
    let inpval = inp.value.toLowerCase();
    let contacts = document.getElementsByClassName("contacts");
    for (i = 0; i < contacts.length; i++) {
        if (!contacts[i].innerHTML.toLowerCase().includes(inpval)) {
            contacts[i].style.display = "none";
        }
        else {
            contacts[i].style.display = "block";
        }
    }
})






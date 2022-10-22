var quote,auth;
var url='https://api.quotable.io/random';
function qget(){
fetch(url)
.then((apidata)=>{
    console.log(apidata);
    return apidata.json();
})
.then((actualdata)=>{
        quote=actualdata.content;
        auth=actualdata.author;
        console.log(quote);
        document.getElementById('here').innerHTML=quote;
        document.getElementById('author').innerHTML=auth;
    })
    .catch((err)=>{
        console.log(error);
    })
}


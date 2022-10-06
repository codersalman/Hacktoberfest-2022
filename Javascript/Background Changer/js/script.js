
// FOR STICKY NAVBAR 


// Alternative of 
// CSS property
//             #menu-bar { 
//                     position: sticky;
//                     top: 0;
//              }



// window.addEventListener('scroll',function(){
    
//     let navbar = this.document.getElementById('menu-bar')
    
//     if(window.pageYOffset >= 255){
//         navbar.classList.add('sticky')
//     }
//     else{
//         navbar.classList.remove('sticky')
//     }
// })


// TO CHANGE BACKGROUND COLOR 

function changeBG(color){
    document.body.style.backgroundColor = color;
    let text = document.getElementsByTagName('body')
    if(color == "#000000cc"){
        for(let elm of text){
            elm.style.color = "#ffffff"
        }
    }
    else{
        for(let elm of text){
            elm.style.color = "#000000"
        }
    }
}
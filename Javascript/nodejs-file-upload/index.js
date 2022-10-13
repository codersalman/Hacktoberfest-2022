const express = require('express');
const app = express();
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
const fs = require('fs');

const PORT  = 8080;
const imageDB = []; // don't use this in real project;
// It should be in Database

app.use(express.static('public'));
app.use(express.static('uploads'));


app.post('/image', upload.single('avatar'), function (req, res, next) {
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
    console.log(req.file.filename);
    console.log(req.body);

    fs.rename(`uploads/${req.file.filename}`,`uploads/${req.body.fullname}`,
    (err) => {
        if(err) {throw err}
        else{
            imageDB.push(req.body.fullname);
            res.send(`<image width="50%" src='/${req.body.fullname}'></image>`);
        
        }
    })

  })
app.get('/images',(req,res)=>{
    let html = "";
    imageDB.forEach(image=>{
        html += `<image width="50%" src='/${image}'></image>`
    })
    res.send(html);
})


app.listen(PORT,()=>{
    console.log('server started at ' + PORT )
})




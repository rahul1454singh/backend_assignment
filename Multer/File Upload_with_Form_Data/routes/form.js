const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');
const path = require('path');
  

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
        console.log('PDF uploaded..!');
    } else {
        cb(new Error('Only .pdf is allowed'), false);
        console.log('Not a PDF');
    }
};

const upload = multer({ dest: 'uploads/resumes', fileFilter });

router.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/form.html'));
});

router.post('/form', (req, res) => {
  upload.single('resume')(req, res, (err) => {

    if (err) return res.status(400).send(err.message);

    const { name, email, number } = req.body;
    const file = req.file.path;
    //   console.log(file);
    // res.send('Your data received!');
    
    let obj={
        name,
        email,
        number,
        file
    }
      let filepath=path.join(__dirname, '../submissions.json');
    fs.readFile(filepath,'utf-8',(err,data)=>{
        if(!err){
        data=JSON.parse(data);

        data.push(obj);

        fs.writeFile(filepath,JSON.stringify(data),(err)=>{
            if(!err){
                console.log('successfully saved');
            }
        })
        }
       
        
    })

  });
  res.send('your data successfully saved')
});


module.exports=router;
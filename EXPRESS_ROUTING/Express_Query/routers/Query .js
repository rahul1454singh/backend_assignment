const express= require('express');
const router = express.Router();


/* ************************one way **********************************/
app.get('/greet',(req,res)=>{
    
    let lang = req.query.lang;
    let Great;
    switch(lang){
        case 'en':
            Great:'Hello';
            break;
        
             case 'fr':
            Great:'Bonjour';
            break;

            case 'hi':
            Great:'Namaste';
            break;
            default:
                Great = 'hello (Default)';
    }
    res.send(Great)
})


/* ************************another way **********************************/
router.get('/greet',(req,res)=>{

    const greetings = {

    en: 'Hello',
     fr: 'Bonjour',
      hi: 'Namaste'

    }

    const lang= req.query.lang;
    const greeting = greetings[lang] || 'Hello(Default)';


    res.send(greeting);










})















module.exports= router;






















module.exports =router
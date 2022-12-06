const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');
const Contact = require('./models/contact');


const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

// //MiddleWare1:-
// app.use(function(req,res,next){
//     req.myname = "Devanshi";
//     //console.log('Middleware1 is called');
//     next();
// })


// //MiddleWare2:-
// app.use(function(req,res,next){
//     console.log('My name from Mw1',req.myname);
//     //console.log('Middleware2 is called');
//     next();
// })


var contactList = [
    {
        name:'Devanshi',
        phone:'1111111111'
    },
    {
        name:'Abhay',
        phone:'22222222222'
    },
    {
        name:'Prerna',
        phone:'33333333333'
    }
]

app.get('/',function(req,res){
    //console.log(req.myname);
    Contact.find({},function(err,contacts){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{title:'Contact List', contact_list : contacts });

    });
});



app.get('/practice',function(req,res){
    return res.render('practice',{title:'practicing the ejs.'});
});


app.post('/create_contact',function(req,res){
    // contactList.push({
    //     name:req.body.name,
    //     phone:req.body.phone
    // });
    // return res.redirect('/');

    // contactList.push(req.body);
    // return res.redirect('back');

    Contact.create({
        name : req.body.name,
        phone : req.body.phone
    },
    function(err,newContact){
        if(err){
            console.log('Error in creating new contact');
            return;
        }
        console.log('********',newContact);
        return res.redirect('back');
    }    
    )
});

app.get('/delete-contact/',function(req,res){
    //console.log(req.query);

    // get the id from query in the ul

    // let phone = req.query.phone;
    let id = req.query.id;

    // find the contact in the database using id and delete

    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log('error in deleting an object from database');
            return;
        }
        return res.redirect('back');
    });

    // let contactIndex = contactList.findIndex(contact => contact.phone == phone);

    // if(contactIndex!=-1){
    //     contactList.splice(contactIndex,1);
    // }

    //return res.redirect('back');
});

app.listen(port,function(err){
    if(err){
        console.log('Error is running the server',err);
        return;
    }
    console.log('Yup my server is running on port:',port);
})
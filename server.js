const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 4000;

//Registrering a fragment, here it is called a partial
hbs.registerPartials(__dirname + '/views/partials');

//Seeting up the view engine
app.set('view engine', 'hbs');

//------------------------------------------Middleware-----------------------------
//Middleware || Setting a static folder

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// })

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method}  ${req.url}`;

    // console.log(log);
    fs.appendFile('Server.log', log + '\n', (err) => {
        if (err)
            console.log('Unable to append to server.log');
    });

    next();
});

//----------------------------- Registering helper function to use in handlebars ---------------------
//Registering a helper function that we can pass in handlebars
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});


//---------------------------------------API configuration -------------------------------
app.get('/', (req, res) => {
    // res.send({
    //     name: 'Arsene',
    //     likes: [
    //         'Biking',
    //         'Cities'
    //     ]
    // });

    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMsg: 'Welcome to my website',
    });
});

app.get('/about', (req, res) => {
    // res.send('About page');

    //This is awesome, you can just pass data in the second parameter after the name in that object
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to request'
    });
});

app.listen(port, console.log(`Listening on ${port}`));
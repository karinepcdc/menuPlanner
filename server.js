"use strict";

const express = require('express');
const path = require('path');

/** memory database **/
const db = require('./db');
db.populate();


const app = express();
const port = 8080;

// file utility modules
const fs = require('fs');
const multer = require('multer');

const bodyParser = require('body-parser');
const {usersDB, recepiesDB, cardapiosDB} = require("./db");

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }));

const server = app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});


/******** pages *********/
// home
app.get('/', function (req, res) {
    res.redirect('login');
    //res.sendFile(path.join(__dirname, 'static', 'home.html'));
});

// login/ cadastro
app.get('/login', function (req, res) {
    res.sendFile(path.join(__dirname, 'static', 'login.html'));
});

app.post('/login', function (req, res) {

    authenticate(req.body.username, req.body.passwd, function(err, user){
        if (err) return res.status(401).send('Usuário não encontrado. Realize o cadastro!');
        if (user) {
                console.log('usuário encontrado!');
                res.redirect('/receitas');
            }
        }
    );

})

app.get('/cadastroForm', function (req, res) {
    res.sendFile( path.join(__dirname, 'static', 'cadastroForm.html'));
});

app.post('/cadastro', function (req, res) {

    let user = {};

    user.username = req.body.username;
    user.passwd = req.body.passwd;
    user.email = req.body.userEmail;

    const validationErr = userValidation(user);
    if(validationErr.length !== 0) {
        console.log(validationErr);
        return res.send(validationErr);
    }

    usersDB.set(user.username, user);
    console.log(usersDB);

    res.redirect('/login');

});

/** receitas */
app.get('/receitas', function (req, res) {
    res.sendFile( path.join(__dirname, 'static', 'listagemReceitas.html'));
});

app.get('/all/receitas', function (req, res) {
    res.json(recepiesDB);
});

app.get('/receita', function (req, res) {
    res.sendFile( path.join(__dirname, 'static', 'receita.html'));
});

app.get('/receitaForm', function (req, res) {
    res.sendFile( path.join(__dirname, 'static', 'receitaForm.html'));
});

/** cardápios */
app.get('/cardapios', function (req, res) {
    res.sendFile( path.join(__dirname, 'static', 'listagemCardapios.html'));
});

app.get('/all/cardapios', function (req, res) {
    res.json(cardapiosDB);
});

/** erros */
app.use(function(req, res, next) {
    res.status(404).send('Página não encontrada!');
});


/*** validações ***/
function userValidation(user) {
    let err = []
    if (!user.username || !user.passwd || !user.email) {
        err.push("Preencha os campos obrigatórios!");

    } else if(usersDB.get(user.username)) {
        err.push("Nome de usuário já cadastrado!")
    }

    return err;
}

function authenticate(username, passwd, ret) {

    const user = usersDB.get(username);

    if(user && user.passwd === passwd) {
        return ret(null, user);
    }

    return ret('usuário não encontrado');
}
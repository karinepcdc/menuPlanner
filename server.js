"use strict";

const express = require('express');
const path = require('path');

/** memory database **/
let { usersDB, recepiesDB, populate, getCardapiosDB, setFavorito, removeMenu } = require('./db');

if(usersDB.size === 0 && recepiesDB.length === 0 && getCardapiosDB().length === 0) {
    populate();
}


const app = express();
const port = 8080;

// file utility modules
const fs = require('fs');
const multer = require('multer');

const bodyParser = require('body-parser');


app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'static/')));
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

app.get('/api/all/receitas', function (req, res) {
    res.json(recepiesDB);
});

app.get('/receita/:id', function (req, res) {
    const r = recepiesDB.find(r => r.id == req.params.id);

    if(r) {
        res.sendFile( path.join(__dirname, 'static', 'receita.html'));
    } else {
        res.status(404).send("Receita não encontrada.");
    }
});

app.get('/api/receita/:id', function (req, res) {
    const r = recepiesDB.find(r => r.id == req.params.id);
    res.json(r);
});

app.get('/receitaForm/:id?', function (req, res) {

    res.sendFile(path.join(__dirname, 'static', 'receitaForm.html'));

    if(req.params.id) {
        const r = recepiesDB.find(r => r.id == req.params.id);
        if (!r) {
            res.status(404).send("Receita não encontrada.");
        }
    }
});

/** cardápios */
app.get('/cardapios', function (req, res) {
    res.sendFile( path.join(__dirname, 'static', 'listagemCardapios.html'));
});

app.get('/all/cardapios', function (req, res) {
    res.json(getCardapiosDB());
    console.log(getCardapiosDB())
});

app.get('/home/cardapio/:id', function (req, res) {
    res.sendFile(path.join(__dirname, 'static', 'home.html')); // TODO fazer página
});

app.get('/cardapio/:id', function (req, res) {
    const c = getCardapiosDB().findIndex(c => c.id == req.params.id);

    if(c !== -1 && req.query.favorito) {
        setFavorito(c, req.query.favorito === "true");
        res.status(200).send("sucesso");
    } else {
        res.status(404).send("Cardápio não encontrado.");
    }
});

app.delete('/cardapio/:id', function (req, res) {
    const c = getCardapiosDB().find(c => c.id == req.params.id);

    if(c) {
        removeMenu(req.params.id);
        res.status(200).send("sucesso");
    } else {
        res.status(404).send("Cardápio não encontrado.");
    }
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
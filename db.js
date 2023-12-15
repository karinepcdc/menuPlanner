"use strict";

let usersDB = exports.usersDB = new Map();

let recepiesDB = exports.recepiesDB = [];

exports.populate = function () {
    console.log('iniciando banco de dados dummy');
    usersDB.set("karine", {username: "karine", passwd: "123", email: "karine@gmail.com"});

    recepiesDB.push({
        titulo: 'MOLHO VERMELHO',
        ingredientes: [
            '1 lata de tomate pelati',
            '4 Tomates'
        ],
        img: null,
        preparo: [
            'Bater os tomates no liquidificador com um pouco de água',
            'Refogar a cebola, alho e cubo de tempero.',
            'Acrescentar a cenoura',
        ]
    });
}
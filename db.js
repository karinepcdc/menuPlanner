"use strict";

let usersDB = exports.usersDB = new Map();

let recepiesDB = exports.recepiesDB = [];

let cardapiosDB = exports.cardapiosDB = [];

exports.populate = function () {
    console.log('iniciando banco de dados dummy');
    usersDB.set("karine", {username: "karine", passwd: "123", email: "karine@gmail.com"});

    recepiesDB.push({
        id: 1,
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

    recepiesDB.push({
        id: 2,
        titulo: 'MACARRÃO AO MOLHO SUGO',
        ingredientes: [],
        img: null,
        preparo: []
    });

    recepiesDB.push({
        id: 3,
        titulo: 'LASANHA',
        ingredientes: [],
        img: null,
        preparo: []
    });

    cardapiosDB.push({
        id: 1,
        nome: "CARDÁPIO BÁSICO I",
        favorito: true,
    });

    cardapiosDB.push({
        id: 2,
        nome: "CARDÁPIO ESPECIAL",
        favorito: true,
    });

    cardapiosDB.push({
        id: 3,
        nome: "CARDÁPIO ESCOLAR",
        favorito: false,
    });

    cardapiosDB.push({
        id: 4,
        nome: "CARDÁPIO BÁSICO II",
        favorito: true,
    });
}
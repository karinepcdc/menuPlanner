"use strict";

let usersDB = exports.usersDB = new Map();

let recepiesDB = exports.recepiesDB = [];

let cardapiosDB = exports.cardapiosDB = [];


exports.setFavorito = function (ind, isFavorito) {
    cardapiosDB[ind].favorito = isFavorito;
}

exports.populate = function () {
    console.log('iniciando banco de dados dummy');
    usersDB.set("karine", {username: "karine", passwd: "123", email: "karine@gmail.com"});

    recepiesDB.push({
        id: 1,
        titulo: 'MOLHO VERMELHO',
        ingredientes: [
            '1 lata de tomate pelati',
            '4 Tomates',
            '1 dente de alho grande picado',
            '1 cebola picada pequena',
            '⅓ de cenoura ralada',
            '1 cubo de tempero',
            '1 cubo de biomassa de verde',
        ],
        img: null,
        preparo: [
            'Bater os tomates no liquidificador com um pouco de água',
            'Refogar a cebola, alho e cubo de tempero.',
            'Acrescentar a cenoura',
            'Refogar um pouco, os tomates e cozinhar até o molho de tomate perder a acidez.',
            'Acrescentar água quando necessário.',
            'Temperar com sal e pimenta a gosto.',
        ],
        compras: [
            '1 lata de tomate pelati',
            '4 Tomates',
            '1 dente de alho grande picado',
            '1 cebola',
            '⅓ de cenoura',
        ],
    });

    recepiesDB.push({
        id: 2,
        titulo: 'MACARRÃO AO MOLHO SUGO',
        ingredientes: [],
        img: null,
        preparo: [],
        compras: [],
    });

    recepiesDB.push({
        id: 3,
        titulo: 'LASANHA',
        ingredientes: [],
        img: null,
        preparo: [],
        compras: [],
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
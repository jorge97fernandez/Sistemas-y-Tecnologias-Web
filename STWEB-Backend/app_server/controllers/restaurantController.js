/*
 * restaurantController.js
 * Controlador de las operaciones de las entradas de tipo
 * restaurante.
 */

var express = require('express');
var url = require('url');
var Restaurant = require('../models/restaurante');
var restaurantController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un listado de 20 restaurantes, indicando
 * que 20 de ellos se quieren del listado total.
 */
restaurantController.getRestaurants = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        const restaurants = await Restaurant.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(restaurants);
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de restaurantes.
 */
restaurantController.countRestaurants = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        await Restaurant.count({}, function(err, result) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(result);
            }
        });
    } catch (err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un restuarante por su id.
 */
restaurantController.getRestaurant = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var queryData = url.parse(req.url, true).query;
        var id = queryData.id;
        const restaurant = await Restaurant.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(restaurant);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de restuarantes por provincia, comarca, municipio y
 * rango de categoría, indicando los 20 que se quieren del listado total 
 * que se obtiene.
 */
restaurantController.searchRestaurants = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        var province = queryData.province;
        var region = queryData.region;
        var municipality = queryData.municipality;
        var minCategory = queryData.minCategory;
        var maxCategory = queryData.maxCategory;

        const restaurants = await Restaurant.find({provincia: new RegExp(province,'i'), 
                                                   comarca: new RegExp(region, 'i'), 
                                                   municipio: new RegExp(municipality, 'i'),
                                                   categoria: {$gte: minCategory, $lte: maxCategory}},
                                                   function(err) {
                                                        if (err) {
                                                            res.status(400);
                                                            res.json({error: err.message}); 
                                                        }
                                                   }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(restaurants);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = restaurantController;

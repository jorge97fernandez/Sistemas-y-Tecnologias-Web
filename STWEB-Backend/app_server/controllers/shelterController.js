/*
 * shelterController.js
 * Controlador de las operaciones de las entradas de tipo
 * refugio.
 */

var express = require('express');
var url = require('url');
var Shelter = require('../models/refugio');
var shelterController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un listado de 20 refugios, indicando
 * que 20 de ellos se quieren del listado total.
 */
shelterController.getShelters = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        const shelter = await Shelter.find(function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.json(shelter);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de refugios.
 */
shelterController.countShelters = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        await Shelter.count({}, function(err, result) {
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
 * Obtener un refugio por su id.
 */
shelterController.getShelter = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var queryData = url.parse(req.url, true).query;
        var id = queryData.id;
        const shelter = await Shelter.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(shelter);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de refugios por provincia, comarca y municipio,
 * indicando los 20 que se quieren del listado total que se obtiene.
 */
shelterController.searchShelters = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        var province = queryData.province;
        var region = queryData.region;
        var municipality = queryData.municipality;

        const shelters = await Shelter.find({'comun.provincia': new RegExp(province,'i'), 
                                            'comun.comarca': new RegExp(region, 'i'), 
                                            'comun.municipio': new RegExp(municipality, 'i')},
                                            function(err) {
                                                if (err) {
                                                    res.status(400);
                                                    res.json({error: err.message}); 
                                                }
                                            }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(shelters);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = shelterController;

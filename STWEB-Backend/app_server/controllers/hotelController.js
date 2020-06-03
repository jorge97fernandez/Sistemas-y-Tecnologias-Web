var express = require('express');
var url = require("url");
var Hotel = require('../models/hotel');
var hotelController = {};

hotelController.getHotels = async function(req, res) {
    const hotels = Hotel.find(function(err) {
        if (err) {
            res.status(500);
            res.json({error: 'search error'});
        }
    });
    res.status(200);
    res.json(hotels);
}

hotelController.addHotel = async function(req, res) {
    var hotel = new Hotel(req.body);
    await hotel.save(function (err, newHotel) {
        if (err) {
            res.status(500);
            res.json({error: 'Hotel not saved'});
        } else {
            res.status(200);
            res.json(newHotel);
        }
    });
}

hotelController.getHotel = async function(req, res) {
    var id = req.params.id;
    const hotel = await Hotel.findById(id, function(err) {
        if (err) {
            res.status(500);
            res.json({error: 'Hotel not found'});
        }
    });
    res.status(200);
    res.json(hotel);
}

hotelController.searchHotel = async function(req, res) {
    var queryData = url.parse(req.url, true).query;
    var province = queryData.province;
    var region = queryData.region;
    var municipality = queryData.municipality;
    var stars = queryData.stars;

    if (province === "null") {
        province = '^[a-z].*';
    } else if (region === "null") {
        region = '^[a-z].*';
    } else if (municipality === "null") {
        municipality = '^[a-z].*';
    }

    const hotels = await Hotel.find({provincia: new RegExp(province,'i'), 
                                   comcarca: new RegExp(region, 'i'), 
                                   municipio: new RegExp(municipality, 'i'),
                                   estrellas: stars},
                                   function(err) {
                                       if (err) {
                                            res.status(400);
                                            res.json({error: 'search error'}); 
                                       }
                                   });
    res.status(200);
    res.json(hotels);
}

module.exports = hotelController;
/*
 * userController.js
 * Controlador de las operaciones de los usuarios.
 */

var express = require('express');
var url = require('url');
var User = require('../models/usuario');
var jwtinterface = require('../jsonwebtoken')
var userController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

/*
 * Obtener un usuario a partir del token de sesión.
 */
userController.getUserToken = async function(req,res) {
    try {
        //checkToken(req.headers.authentication);
        var queryData = url.parse(req.url, true).query;
        var token = queryData.token;
        var email = jwtinterface.decodetoken(token).email;
        var user = await User.find({ email: email }, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        })
        res.json(user);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de 20 usuarios, indicando
 * que 20 de ellos se quieren del listado total.
 */
userController.getUsers = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        const users = await User.find({ admin: false }, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        }).skip(perPage*page).limit(perPage);
        res.json(users);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número total de usuarios.
 */
userController.countUsers = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        await User.count({ admin: false }, function(err, result) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(result);
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Contar el número de usuarios con un determinado email.
 */
userController.countByEmail = async function(req, res) {
    try {
        var queryData = url.parse(req.url, true).query;
        var email = queryData.email;
        await User.count({ email: email }, function(err, result) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(result);
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Añadir un nuevo usuario.
 */
userController.addUser = async function(req, res) {
    try {
        var user = new User(req.body);
        user.baneado = false;
        user.activo = true;
        user.admin = false;
        await user.save(function (err, newUser) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(newUser);
            }
        });
    }
    catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un usuario por su id.
 */
userController.getUser = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var queryData = url.parse(req.url, true).query;
        var id = queryData.id;
        const user = await User.findById(id, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(user);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Actualizar un usuario por su id.
 */
userController.updateUser = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var user = new User(req.body);
        const filter = { email: user.email };
        await User.findOneAndUpdate(filter, req.body, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(user);
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Obtener un listado de usuarios por nombre, apellidos e email,
 * indicando los 20 que se quieren del listado total que se obtiene.
 */
userController.searchUsers = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var perPage = 20;
        var queryData = url.parse(req.url, true).query;
        var page = Math.max(0, queryData.page);
        var name = queryData.name;
        var surname = queryData.surname;
        var email = queryData.email;

        const users = await User.find({nombre: new RegExp(name, 'i'), 
                                       apellidos: new RegExp(surname, 'i'), 
                                       email: new RegExp(email, 'i'),
                                       admin: false},
                                       function(err) {
                                            if (err) {
                                                res.status(400);
                                                res.json({error: err.message}); 
                                            }
                                       }).skip(perPage*page).limit(perPage);
        res.status(200);
        res.json(users);
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Enviar un email a un usuario.
 */
userController.sendMail = async function(req, res) {
    try {
        checkToken(req.headers.authentication);
        var userMail = req.body.email;
        var text = req.body.text;
        const send = require('gmail-send')({
            user: 'descubrearagonSTW@gmail.com',
            pass: 'STW-1920',
            to: userMail,
            subject: 'Descubre Aragon',
            text: text
        });
        await send({}, function (err, response) {
            if (err) {
                res.status(500);
                res.json(err.message);
            } else {
                res.status(200);
                res.json(response);
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

/*
 * Añadir un nuevo administrador.
 * Operación para desarrollo, en producción no debe estar.
 */
userController.addAdmin = async function(req, res) {
    try {
        var user = new User(req.body);
        user.baneado = false;
        user.activo = true;
        user.admin = true;
        await user.save(function (err, newUser) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                res.status(200);
                res.json(newUser);
            }
        });
    }
    catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

module.exports = userController;

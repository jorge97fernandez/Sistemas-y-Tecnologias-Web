var express = require('express');
var url = require('url');
var Chat = require('../models/chat');
var jwtinterface = require('../jsonwebtoken')
var chatController = {};

checkToken = function(token) {
    jwtinterface.verifytoken(token);
}

chatController.addChat = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var chat = new Chat(req.body);
        await chat.save(function(err, newChat) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                var text = "Tiene un nuevo mensaje en la aplicacion, " +
                "puede verlo a traves del siguiente enlace: " +
                "https://turismoaragon.herokuapp.com/chat-entry?id=" +
                newChat.id;
                const send = require('gmail-send')({
                    user: 'descubrearagonSTW@gmail.com',
                    pass: 'STW-1920',
                    to: newChat.emailEntrada,
                    subject: 'Descubre Aragon',
                    text: text
                });
                send({}, function (err) {
                    if (err) {
                        res.status(500);
                        res.json(err.message);
                    } else {
                        res.status(200);
                        res.json(newChat);
                    }
                });
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

chatController.updateChatEntry = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var chat = new Chat(req.body);
        await Chat.findOneAndUpdate(chat.id, chat, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            } else {
                var text = "Tiene un nuevo mensaje en la aplicacion, " +
                "puede verlo a traves del siguiente enlace: " +
                "https://turismoaragon.herokuapp.com/chat-entry?id=" +
                chat.id;
                const send = require('gmail-send')({
                    user: 'descubrearagonSTW@gmail.com',
                    pass: 'STW-1920',
                    to: chat.emailEntrada,
                    subject: 'Descubre Aragon',
                    text: text
                });
                send({}, function (err) {
                    if (err) {
                        res.status(500);
                        res.json(err.message);
                    } else {
                        res.status(200);
                        res.json(chat);
                    }
                });
            }
        });
    } catch(err) {
        res.status(500);
        res.json({error: err.message});
    }
}

chatController.updateChatUser = async function(req, res) {
    var chat = new Chat(req.body);
    await Chat.findOneAndUpdate(chat.id, chat, function(err) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        } else {
            var text = "Tiene un nuevo mensaje en la aplicacion."
            const send = require('gmail-send')({
                user: 'descubrearagonSTW@gmail.com',
                pass: 'STW-1920',
                to: chat.emailUsuario,
                subject: 'Descubre Aragon',
                text: text
            });
            send({}, function (err) {
                if (err) {
                    res.status(500);
                    res.json(err.message);
                } else {
                    res.status(200);
                    res.json(chat);
                }
            });
        }
    });
}

chatController.getChatsUser = async function(req, res) {
    try {
        //checkToken(req.headers.authentication);
        var user = req.param('user');
        const chats = await Chat.find({emailUsuario: user}, function(err) {
            if (err) {
                res.status(500);
                res.json({error: err.message});
            }
        });
        res.status(200);
        res.json(chats);
    } catch(err) {
        res.status(200);
        res.json({error: err.message});
    }
}

chatController.getChat = async function(req, res) {
    var id = req.param('id');
    const chat = await Chat.findById(id, function(err) {
        if (err) {
            res.status(500);
            res.json({error: err.message});
        }
    });
    res.status(200);
    res.json(chat);
}

module.exports = chatController;
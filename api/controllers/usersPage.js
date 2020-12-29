const express = require('express');
const sq = require('sequelize');
const router = express.Router();
const db = require('../models');
const { Users } = db;
const op = sq.Op;

router.get('/',(req,res) => {
    if(req["user"]){
        Users.findAll({attributes: [
         "userName",
         "userEmail",
         "imageURL"
         ],where: {id:{[op.not]:req["user"].id}}})
        .then(user => res.status(200).json(user));
    }
    else{
        Users.findAll({attributes: [
            "userName",
            "userEmail",
            "imageURL"
            ]})
        .then(user => res.status(200).json(user));
    }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const db = require('../models');
const sq = require('sequelize');
const { Inventory } = db;
const op = sq.Op;
router.get('/', (req,res) => {
   
    if (req["user"]) {
      
        let id = req["user"].id; 
        console.log(req["user"].id + " recentAdded")
        Inventory.findAll({where: {public: true,OwnerId:{[op.not]:id}}, order: [[ 'createdAt' , 'DESC']]})
        .then(inv => res.status(200).json(inv));
    } 
    else{
    Inventory.findAll({where: {public: true}, order: [[ 'createdAt' , 'DESC']]})
    .then(inv => res.status(200).json(inv));
    }
});
module.exports = router;
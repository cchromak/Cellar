const express = require('express');
const sq = require('sequelize');
const router = express.Router();
const db = require('../models');
const { Inventory } = db;
const op = sq.Op;

router.get('/', (req,res) => {
    //convert URL string param into boolean val
   
    if (req["user"]) {
      
        let id = req["user"].id; 
        Inventory.findAll({where: {public: true, OwnerId:{[op.not]:id}}, order: [[ 'currentPrice' , 'DESC']]})
        .then(inv => res.json(inv));
    }
     else {
        Inventory.findAll({where: {public: true}, order: [[ 'currentPrice' , 'DESC']]})
        .then(inv => res.json(inv));
    }
    
});

module.exports = router;

// src/modules/Trainers/TrainersList/trainersList.routes.js
const express = require('express');
const router = express.Router();

// default export ettiğin authMiddleware’i al:
const authMiddleware = require('../../../middlewares/auth.middleware');

// controller’da exports.getTrainerList = … yaptığını varsayıyorum:
const { getTrainerList } = require('./trainersList.controller');

// GET /home/trainers
//  ↑ burada ikisi de kesinlikle function olmalı:
router.get('/', authMiddleware, getTrainerList);

module.exports = router;

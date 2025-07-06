const router = require('express').Router();

// Importing the auth routes

router.use('/auth', require('../modules/Auth/auth.routes'));
router.use(
    '/home/trainers',
    require('../modules/Trainers/TrainersList/trainersList.routes')
  );


module.exports = router;

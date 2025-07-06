// src/modules/Trainers/TrainersList/controller.js
const Trainer = require('./trainersList.model'); // Trainer model'ını içe aktar

exports.getTrainerList = async (req, res, next) => {
  try {
    const trainers = await Trainer
      .find({ active: true })    // filtre gerekiyorsa
      .lean();

    // Son olarak API cevabını hazırla
    res.json({ trainerList: trainers });
  } catch (err) {
    next(err);
  }
};

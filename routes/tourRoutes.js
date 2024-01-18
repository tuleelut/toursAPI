const express = require('express');
const tourControler = require('../controlers/tourControler');

const { getAllTours, getTour, createTour, updateTour, deleteTour} =
  tourControler;

// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

//params middleware, suveikia tik esant tam tikram parametrui, pvz. :id
// val yra id parametro reikšmė
// router.param('id', (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);
//   next();
// });

// deklaruojame, aprašome tour routes
router.route('/').get(getAllTours).post(createTour);
router
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

module.exports = router;

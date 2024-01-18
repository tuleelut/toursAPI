const express = require('express');
const userControler = require('../controlers/userControler');
const { getAllUsers, getUser, createUser, updateUser, deleteUser } =
  userControler;

// sukuriame ir pervardiname tourRouter tiesiog į router
const router = express.Router();

// deklaruojame, aprašome user routes
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;

/* eslint-disable require-jsdoc */
const router = require('express').Router();

const accountsController = require('../../controllers/accounts-controller.js');
const httpStatusCode = require('../../utils/http-status-code.js');

router.get('/', async (req, res) => {
  try {
    const allUsers = await accountsController.findAllAccounts();
    res.status(httpStatusCode.OK).json({ users: allUsers });
  } catch (err) {
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json(err.message);
  }
});

module.exports = router;

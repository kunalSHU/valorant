/* eslint-disable require-jsdoc */
const router = require('express').Router();

const accountsController = require('../../controllers/accounts-controller.js');
const httpStatusCode = require('../../utils/http-status-code.js');

router.get('/all', async (req, res) => {
  try {
    const allUsers = await accountsController.findAllAccounts();
    res.status(httpStatusCode.OK).json({ data: allUsers });
  } catch (err) {
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json(err.message);
  }
});

router.get('/findWithEmail', async (req, res) => {
  const { email } = req.query;

  try {
    const singleUser = await accountsController.findAccountByEmail(email);
    res.status(httpStatusCode.OK).json({ data: singleUser });
  } catch (err) {
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json(err.message);
  }
});

module.exports = router;

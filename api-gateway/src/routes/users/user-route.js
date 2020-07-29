/* eslint-disable require-jsdoc */
const router = require('express').Router();

const logger = require('../../logger/logger.js');

const accountsController = require('../../controllers/accounts-controller.js');
const httpStatusCode = require('../../utils/http-status-code.js');

router.get('/all', async (req, res) => {
  try {
    const allUsers = await accountsController.findAllAccounts();
    res.status(httpStatusCode.OK).json({ data: allUsers });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ err: err.message });
  }
});

router.get('/findWithEmail', async (req, res) => {
  const { email } = req.query;

  try {
    const singleUser = await accountsController.findAccountByEmail(email);
    res.status(httpStatusCode.OK).json({ data: singleUser });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ err: err.message });
  }
});

router.post('/create', async (req, res) => {
  const { firstName, lastName, emailAddress, password } = req.body;

  try {
    const createdUserJwtSessionToken = await accountsController.addAccount({
      firstName,
      lastName,
      emailAddress,
      password
    });
    res.status(httpStatusCode.OK).json({ data: createdUserJwtSessionToken });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ err: err.message });
  }
});

module.exports = router;

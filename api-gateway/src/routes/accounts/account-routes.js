const router = require('express').Router();

const logger = require('../../logger/logger.js');

const accountsController = require('../../controllers/accounts-controller.js');
const authenticationMiddleware = require('../../middlewares/authentication-middleware.js');

const httpStatusCode = require('../../network-utils/http-status-code.js');

router.get('/all', async (req, res) => {
  try {
    const allAccounts = await accountsController.findAllAccounts();
    res.status(httpStatusCode.OK).json({ data: { allAccounts } });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ err: err.message });
  }
});

router.get('/find', async (req, res) => {
  const { email } = req.query;

  try {
    const foundAccount = await accountsController.findAccountByEmail(email);
    res.status(httpStatusCode.OK).json({ data: { foundAccount } });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ err: err.message });
  }
});

router.get('/role', async (req, res) => {
  const { email } = req.query;

  try {
    const accountRole = await accountsController.getAccountRoleByEmaill(email);
    res.status(httpStatusCode.OK).json({ data: { accountRole } });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ err: err.message });
  }
});

router.post('/create', async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const createdAccountTokenRole = await accountsController.addAccount(emailAddress, password);
    res.status(httpStatusCode.OK).json({ data: createdAccountTokenRole });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ err: err.message });
  }
});

router.delete('/delete', authenticationMiddleware, async (req, res) => {
  const { email } = req.query;

  try {
    const deletedAccount = await accountsController.deleteAccountByEmail(email);
    res.status(httpStatusCode.OK).json({ data: { deletedAccount } });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ err: err.message });
  }
});

router.post('/auth', async (req, res) => {
  const { emailAddress, password } = req.body;

  try {
    const verifiedUserJwtSessionToken = await accountsController.verifyAccount(emailAddress, password);
    const foundAccount = await accountsController.findAccountByEmail(emailAddress);
    const { account_role } = await accountsController.getAccountRoleByEmaill(emailAddress);
    res.status(httpStatusCode.OK).json({
      data: {
        ...foundAccount,
        jwt_token: verifiedUserJwtSessionToken,
        account_role
      }
    });
  } catch (err) {
    logger.error(err.message);
    res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ err: err.message });
  }
});

module.exports = router;

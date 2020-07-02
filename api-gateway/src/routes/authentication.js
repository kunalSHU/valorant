const router = require('express').Router();
const { validationResult, body } = require('express-validator');

const accountsController = require('../controllers/accounts-controller.js');

const httpStatusCode = require('../utils/http-status-code.js');
const validateNewUserInput = require('../input-validators/new-user-validator.js');

router.post('/register', validateNewUserInput, (req, res) => {
  const inputValidationErrors = validationResult(req);
  if (inputValidationErrors.errors.length !== 0) {
    res.status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY).json({ errors: inputValidationErrors.array() });
  } else {
    const { firstName, lastName, email, password } = req.body;

    accountsController
      .addUser(firstName, lastName, email, password)
      .then((result) => {
        const { sessionJwtToken } = result;
        if (sessionJwtToken) {
          res.status(httpStatusCode.CREATED).json({ message: `User ${email} has been registered`, sessionJwtToken });
        } else {
          res.status(httpStatusCode.OK).json({ message: `User ${email} already exists in DB` });
        }
      })
      .catch((err) => {
        res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ message: 'Something went wrong', err });
      });
  }
});

router.get('/findAll', (req, res) => {
  const { email } = req.body;
  accountsController
    .findAll(email)
    .then((allAccounts) => {
      res.status(httpStatusCode.OK).json(allAccounts);
    })
    .catch((err) => {
      res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ message: 'Something went wrong', err });
    });
});

router.get(
  '/find',
  [body('email', 'Please provide a valid email address').notEmpty().withMessage('Email should not be empty').isEmail()],
  (req, res) => {
    const inputValidationErrors = validationResult(req);

    if (inputValidationErrors.errors.length !== 0) {
      res.status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY).json({ errors: inputValidationErrors.array() });
    } else {
      const { email } = req.body;
      accountsController
        .findUserViaEmail(email)
        .then((foundUser) => {
          res.status(httpStatusCode.OK).json(foundUser);
        })
        .catch((err) => {
          res.status(httpStatusCode.CLIENT_NOT_FOUND).json({ message: `User with ${email} not found`, err });
        });
    }
  }
);

router.delete('/delete', [body('email', 'Please provide a valid email address').notEmpty().isEmail()], (req, res) => {
  const inputValidationErrors = validationResult(req);

  if (inputValidationErrors.errors.length !== 0) {
    res.status(httpStatusCode.CLIENT_UNPROCESSABLE_ENTINTY).json({ errors: inputValidationErrors.array() });
  } else {
    const { email } = req.body;

    accountsController
      .deleteUserViaEmail(email)
      .then((result) => {
        const { message } = result;
        res.status(httpStatusCode.OK).json(message);
      })
      .catch((err) => {
        res.status(httpStatusCode.SERVER_INTERNAL_ERROR).json({ message: 'Something went wrong', err });
      });
  }
});

module.exports = router;


const { validationResult } = require('express-validator');

const registerUser = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map(error => error.msg);
    req.flash('errorMessages', {errorMessages});
    req.flash('errorColor', 'red');
    return res.redirect('/RegisterationForm');
  }

  const { Firstname, Lastname, email, Password } = req.body;
}
module.exports = {
  registerUser
};
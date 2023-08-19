module.exports = {
  Authenticator: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next()
    }
    req.flash('warning_msg', '登入後使用!')
    res.redirect('/users/login')
  }
}

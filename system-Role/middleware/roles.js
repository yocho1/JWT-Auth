const checkRole = (roles) => (req, res, next) => {
  console.log(req.user.role)
  if (roles == req.user.role) {
    return next()
  }
  return res.status(401).json({
    message: 'Unauthorized',
    success: false,
  })
}

module.exports = checkRole

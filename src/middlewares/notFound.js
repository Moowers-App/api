const error404 = (req, res, next) => {
  res.status(404)
  res.json({error: 'Not Found'})
  return next()
}

module.exports = error404
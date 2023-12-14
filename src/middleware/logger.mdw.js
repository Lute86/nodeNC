function loggingMdw(req, res, next) {
  console.log(`Request made to ${req.url} with method: ${req.method}.`);
  next();
}
module.exports = loggingMdw

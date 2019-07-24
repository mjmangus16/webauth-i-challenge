module.exports = (req, res, next) => {
  const { username } = req.session;

  if (req.session && username) {
    next();
  } else {
    res.status(400).json({ message: "No credentials provided" });
  }
};

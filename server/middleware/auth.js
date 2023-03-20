import jwt from 'jsonwebtoken';

export async function auth(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];

    const decodeToken = await jwt.verify(token, 'secret');

    req.user = decodeToken;

    next();
  } catch (err) {
    return res.status(404).send({ error: 'Authentication Error' });
  }
}

export async function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}

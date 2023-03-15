import { User } from '../model/User.model';
import bcrypt from 'bcrypt';

export default async function register(req, res) {
  try {
    const { username, email, profile, password } = req.body;

    //check if user exists
    const existsUsername = new Promise((resolve, reject) => {
      User.findOne({ username }, (err, user) => {
        if (err) reject(new Error(err));
        if (user) reject({ error: 'Please choose another username' });

        return resolve();
      });
    });

    //check if email exists
    const existsEmail = new Promise((resolve, reject) => {
      User.findOne({ email }, (err, email) => {
        if (err) reject(new Error(err));
        if (email) reject({ error: 'Please choose another email' });

        return resolve();
      });
    });

    Promise.all([existsUsername, existsEmail])
      .then(() => {
        if (password) {
          bcrypt.hash(password, 10).then((hash) => {
            const user = new User({
              username,
              email,
              profile: profile || '',
              password: hash,
            });
            user
              .save()
              .then((user) => {
                res.status(200).json(user);
              })
              .catch((err) => {
                res.status(500).json(err);
              });
          });
        }
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
}

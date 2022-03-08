import { genSaltSync, hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';

export function hashPassword(pass) {
  const salt = genSaltSync(10, 'b');

  return hashSync(pass, salt);
}

export function generateToken(email, expiresIn) {
  // var token = jwt.sign({ email }, process.env.SECRETE_KEY, { expiresIn });
  const payload = { username, email };
  const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn: '24h' });
  return token;
}

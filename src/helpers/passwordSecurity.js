import bcrypt from 'bcrypt';

const salt = bcrypt.genSaltSync(10, 'b');

export const hashPassword = async (plainPassword) => {
  const hash = await bcrypt.hash(plainPassword, salt);
  return hash;
};

export const comparePassword = async (plainPassword, hash) => {
  const result = await bcrypt.compare(plainPassword, hash);
  return result;
};

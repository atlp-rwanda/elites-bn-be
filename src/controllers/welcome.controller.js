export const welcome = (req, res) => {
  res
    .status(200)
    .json({ status: 200, message: 'Welcome to barefoot api', payload: '' });
};
/**
 * Generates a random string that consists of numbers and letters
 * @param  {number} length the length of the string
 * @return {string} the string this function generates
 */

const generateRandomString = (length) =>
{
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for(let i = 0; i < length; i++)
  {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

module.exports = {
    generateRandomString: generateRandomString
};
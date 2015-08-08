/*
 * Generates a random string of 5 characters to make a unique name
 *
 * You can import it from another modules like this:
 * var mod = require('randomname'); // -> 'a thing'
 */
module.exports = function () {
  return Math.random().toString(36).substr(2, 5);
}
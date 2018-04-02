const cors = require('micro-cors')();
// const sponsor = require('./static/index.json');

const codefund = require('./codefund');

/**
 * Exports expects:
 *
 * {
 *   url: String, // click through
 *   description: String // displayed subtext
 *   title: String, // link text
 *   pixels: String[] // tracking images
 * }
 */
module.exports = cors(async req => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return await codefund(ip);
});

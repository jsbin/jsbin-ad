const fetch = require('node-fetch');
const cors = require('micro-cors')();
const sponsor = require('./static/index.json');

async function buySellAds(ip) {
  const adURL = 'https://srv.buysellads.com/ads/CVADL2JJ.json';

  if (ip === '::1') {
    ip = '86.13.179.215';
  }

  const request = await fetch(`${adURL}?forwardedip=${ip}&ignore=yes`);
  const data = await request.json();

  console.log(`${adURL}?forwardedip=${ip}&ignore=yes`);

  const ads = data.ads.filter(ad => ad.active);
  const ad = ads[(ads.length * Math.random()) | 0];

  const pixelsUrls = (ad.pixel || '').split('||');
  const time = Math.round(Date.now() / 10000) | 0;
  const pixels = pixelsUrls.map(pixel => pixel.replace('[timestamp]', time));

  const { title, description, statlink: url } = ad;

  return {
    url,
    description,
    title,
    pixels,
  };
}

async function codesponsor() {
  return sponsor;
}

module.exports = cors(async req => {
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  return await codesponsor(ip);
});

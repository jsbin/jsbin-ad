const fetch = require('node-fetch');

module.exports = codefund;

async function codefund() {
  const request = await fetch(
    'https://codefund.io/t/s/22e88dc3-30f2-451b-a14e-d257c1395ef1/details.json'
  );
  const data = await request.json();

  const { title, description, link: url, pixel } = data;

  return {
    title,
    description,
    url,
    pixels: [pixel],
  };
}

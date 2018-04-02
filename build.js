const fs = require('fs');
const ad = require('./codefund');

ad().then(json =>
  fs.writeFileSync(__dirname + '/static/index.json', JSON.stringify(json))
);

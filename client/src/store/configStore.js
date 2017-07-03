const configStoreProd = require('./configStore.prod');
const configStoreDev = require('./configStore.dev');

if (process.env.NODE_ENV === 'production') {
  module.exports = configStoreProd;
} else {
  module.exports = configStoreDev;
}

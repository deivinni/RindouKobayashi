require('moment-duration-format');
const moment = require('moment');

moment.locale('pt-BR');

module.exports = (duration) => moment.duration(duration).format('`D`[ d], `H`[ h], `m`[ min], `s`[ segs]');

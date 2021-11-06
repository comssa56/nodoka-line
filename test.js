'use strict';

require('dotenv').config();
const conf = require('./src/util/config.js'); 
conf.init();

const test = require('./src/test/test.js');
test.Test();

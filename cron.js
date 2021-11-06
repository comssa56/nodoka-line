'use strict';


require('dotenv').config();
const conf = require('./src/util/config.js'); 
conf.init();

const nodoka_cron = require('./src/nodoka-line/nodoka-cron.js');
const moment = require("moment");

const m = moment().add(1, 'days'); 
nodoka_cron.DailyCron(m);


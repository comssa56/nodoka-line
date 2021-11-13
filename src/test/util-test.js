const util = require('../util/util.js');
const moment = require("moment");

function shortStrDateTest(str, r) {
    const a = util.ShortStrDate(str);
    console.assert(((a==null)&&(r==null)) || (a.get().format('YYYYMMDD')==r), `failed to assert ${str}and${r}`);
}


exports.Test = () => {
    shortStrDateTest('202', null);
    shortStrDateTest('2021', "20210101");
    shortStrDateTest('20210', null);
    shortStrDateTest('202102', "20210201");
    shortStrDateTest('2021020', null);
    shortStrDateTest('20210203', "20210203");
    shortStrDateTest('202102031', null);
}


/**
 * Created by lotuslwb on 16/5/26.
 */

//log 里面的颜色~~
var chalk = require('chalk');
// /log 里面的一些图标在这里~~
var logSymbols = require('log-symbols');


var successLog = function (str) {
    return console.log(logSymbols.success, chalk.green.bold('[Success] ') + chalk.green.bold(str));
};
var errorLog = function (str) {
    return console.log(logSymbols.error, chalk.red.bold('[Fail] ') + chalk.red.bold(str));
};
var warnLog = function (str) {
    return console.log(logSymbols.warning, chalk.red.bold('[Error] ') + chalk.red.bold(str));
}
var infoLog = function (str) {
    return console.log(logSymbols.info, chalk.yellow.bold('[Info] ') + chalk.yellow.bold(str));
}
module.exports = {
    ok: successLog,
    error: errorLog,
    warn: warnLog,
    info: infoLog
}





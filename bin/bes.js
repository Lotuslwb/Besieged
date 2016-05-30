#!/usr/bin/env node


var program = require('commander');
var packageInfo = require('../package.json');
var log = require('../utils/info');

//commander
program
    .version(packageInfo.version)
    .option('-l, --list', '查看支持的checklist')

program.command('test <url>')
    .description('检测url')
    .action(function (url, options) {
        //验证一下url~~~
        if (IsURL(url)) {
            require('../main.js')(url);
        } else {
            log.error('你输入的不是一个网址,记得加上http协议,严肃一点~~');
        }


    });

program.parse(process.argv);


if (program.list) {
    console.log('你不会真的以为有这样的功能吧? 傻逼~~~');
}


function IsURL(str_url) {
    var strRegex = /^((http|https|ftp):\/\/)+(\w(\:\w)?@)?([0-9a-z_-]+\.)*?([a-z0-9-]+\.[a-z]{2,6}(\.[a-z]{2})?(\:[0-9]{2,6})?)((\/[^?#<>\/\\*":]*)+(\?[^#]*)?(#.*)?)?$/i;
    var re = new RegExp(strRegex);

    if (re.test(str_url)) {
        return (true);
    } else {
        return (false);
    }
}

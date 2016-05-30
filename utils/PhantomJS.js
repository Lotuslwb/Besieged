/**
 * Created by lotuslwb on 16/5/26.
 */

var path = require('path');
var fs = require('fs-extra');

var resourceHandle = require('./resourceHandle');

// nodejs的重要模块，实现多线程
var childProcess = require('child_process');

/**PhantomJS doc
 * http://javascript.ruanyifeng.com/tool/phantomjs.html
 * phantomjs  请使用1.9.19版本 之后的新版本有问题~~
 */
var phantomjs = require('phantomjs');


var binpath = phantomjs.path;

module.exports = function (url) {

    /*spawn是最基本的创建子进程的函数
     * command: 只执行的命令
     * args: 参数列表，可输入多的参数
     * options: 环境变量对象
     * */

    var url = url;
    var childArgs = [
        path.join(__dirname, 'spawn.js'),
        url
    ];

    var cp = childProcess.spawn(binpath, childArgs, {stdio: 'inherit'});
    cp.on('close', function () {
        console.log('spawn is closed');
        var str = fs.readFileSync('info.log', 'utf8')
        resourceHandle(str);
    })
}
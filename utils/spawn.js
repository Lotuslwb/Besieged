/**
 * Created by lotuslwb on 16/5/26.
 */

/*
 *  debug 的时候 ,不能在Besieged 这个目录下面debug~不然会unsafe js~~这是什么原因???
 * */
var fs = require('fs');

var page = require('webpage').create();

var system = require('system');

var address = system.args[1];

var phantom = phantom;

page.viewportSize = {
    width: 480,
    height: 800
};

// 5s内没有第二个请求发出或者接到，认为加载完毕
var TIMEOUT = 5000;
var timer = setTimeout(function () {

}, 1);

var logObj = {
    startTime: new Date(), loadTime: 0,
    viewportSize: page.viewportSize,
    address: address,
    requests: new Array(),
    response: new Array(),
    errRes: new Array()
}


console.log('正在打开虚拟浏览器...')

page.open(address, function (s) {
    if (s == 'success') {
        console.log('成功打开浏览器,开始加载...', s);
        //render  截图保存,顺便保存一下~~以后可以做其他用途
        page.render('test.jpeg', {format: 'jpeg', quality: '100'});
        //phantom.exit();

    } else {
        console.log('浏览器开启失败,请检查网络(可能需要你关闭vnp)或者其他原因', s);
        phantom.exit();
    }
});

page.onResourceRequested = function (request) {
    logObj.requests.push(request);
    console.log('[Resource:request ]', request);
    tryExit();
}

page.onResourceReceived = function (response) {
    logObj.response.push(response);
    console.log('[Resource:received ]', response);
    tryExit();
}

page.onResourceError = function (errRes) {
    logObj.errRes.push(errRes);
    tryExit();
}

page.onResourceTimeout = function (e) {
    tryExit();
}

page.onLoadStarted = function (e) {
    tryExit();
}
page.onLoadFinished = function () {
    logObj.loadTime = new Date() - logObj.startTime;

    tryExit();
}


function tryExit() {
    clearTimeout(timer);
    timer = setTimeout(function () {
        beforeExit();
        phantom.exit();
    }, TIMEOUT);
}

function beforeExit() {
    console.log('加载完成,开始解析...');
    fs.write('info.log', JSON.stringify(logObj));
}









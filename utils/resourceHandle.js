//工具库
var _ = require('lodash');

//引入提示
var log = require('../utils/info');
// log.ok('耶耶耶,成功第一步');
// log.error('我擦 竟然错了!!');

var cl = require('../checklist.json');


module.exports = function (data) {
    if (!data.length) {
        console.log('没有获取到资源数据!');
    } else {
        try {
            data = JSON.parse(data);
        } catch (e) {
            console.log(e);
        }
        var obj = dataHandle(data);
        showInfo(obj);
    }


}


function dataHandle(data) {
    var obj = {
        loadTime: 0, // 加载时间
        totalSize: 0, //资源总大小
        singleImg: new Array(), //单个图片大小
        cssNumber: 0, //css 数量
        jsNumber: 0, //js 数量
        IconFontFormat: 0, //字体格式是否为ttf
        IconFontNumber: 0, //字体数量
        _20xRequest: 0, //20x 请求数
        _30xRequest: {number: 0, url: new Array()}, //30x 请求数
        _40xRequest: {number: 0, url: new Array()}, //40x 请求数
        _50xRequest: {number: 0, url: new Array()}, // 50x 请求数
        gifImg: {number: 0, url: new Array()} // gif 数量
    }

    obj.loadTime = data.loadTime;

    var response = _.filter(data.response, function (rsp) {
        return rsp.bodySize;
    });

    _(response).forEach(function (rsp) {
        obj.totalSize += b2kb(rsp.bodySize) * 1 || 0;
        var contentType = rsp.contentType;
        var status = rsp.status;

        //判断资源数量等
        if (/css/.test(contentType)) {
            obj.cssNumber++;
        }
        if (/javascript/.test(contentType)) {
            obj.jsNumber++;
        }
        if (/gif|jpg|jpeg|png/.test(contentType)) {

            obj.singleImg.push({size: b2kb(rsp.bodySize), url: rsp.url});

        }
        if (/gif/.test(contentType)) {
            obj.gifImg.number++;
            obj.gifImg.url.push(rsp.url);
        }

        //判断请求状态
        if (/20/.test(status)) {
            obj._20xRequest++;
        }
        if (/30/.test(status)) {
            obj._30xRequest.number++;
            obj._30xRequest.url(rsp.url);
        }
        if (/40/.test(status)) {
            obj._40xRequest.number++;
            obj._40xRequest.url(rsp.url);
        }
        if (/50/.test(status)) {
            obj._50xRequest.number++;
            obj._50xRequest.url(rsp.url);
        }


    })

    // console.log(obj);
    console.log('解析成功!! 开启装逼模式!!!');

    return obj;
}

function showInfo(obj) {


    checklog(obj.totalSize * 1 > cl.totalSize * 1, '资源加载总大小控制: 首屏资源不大于' + cl.totalSize + 'kb:现在为' + obj.totalSize.toFixed(2) + 'kb');

    checklog(obj.loadTime * 1 > cl.loadTime * 1, '页面总响应时间不超过' + cl.loadTime + 'ms:现在为' + obj.loadTime + 'ms');


    var singleImgcheck = true;
    _.forEach(obj.singleImg, function (img) {
        if (img.size * 1 > cl.singleImgSize) {
            log.error('单张图片不要大于' + cl.cssNumber + 'kb:' + img.url);
            singleImgcheck = false;
        }
    });
    if (singleImgcheck) {
        log.ok('单张图片不要大于50kb');
    }

    checklog(obj.singleImg.length > cl.imgNumber, '首屏图片个数不大于' + cl.imgNumber + '个:现在为:' + obj.singleImg.length + '个');

    checklog(obj.cssNumber * 1 > cl.cssNumber * 1, 'css请求数不大于' + cl.cssNumber + ':现在cssNumber为' + obj.cssNumber);
    checklog(obj.jsNumber * 1 > cl.jsNumber * 1, 'js请求数不大于' + cl.cssNumber + ':现在jsNumber为' + obj.cssNumber);


    if (cl._30xRequest) {
        checklog(obj._30xRequest.number > 0, '不要有30x的请求');
        if (obj._30xRequest.url.length > 0) {
            _.forEach(obj._30xRequest.url, function (url) {
                log.error(url);
            });
        }
    }
    if (cl._40xRequest) {
        checklog(obj._40xRequest.number > 0, '不要有40x的请求');

        if (obj._40xRequest.url.length > 0) {
            _.forEach(obj._40xRequest.url, function (url) {
                log.error(url);
            });
        }
    }
    if (cl._50xRequest) {
        checklog(obj._50xRequest.number > 0, '不要有50x的请求');
        if (obj._50xRequest.url.length > 0) {
            _.forEach(obj._50xRequest.url, function (url) {
                log.error(url);
            });
        }
    }

    if (cl.gifImgCheck) {
        checklog(obj.gifImg.number > 0, '正常情况禁止使用gif图片');
        if (obj.gifImg.url.length > 0) {
            _.forEach(obj.gifImg.url, function (url) {
                log.error(url);
            })
        }
    }

}


//tools
function b2kb(size) {
    return (size / 1024).toFixed(2);
}

function checklog(flag, msg) {
    if (flag) {
        log.error(msg);
    } else {
        log.ok(msg);
    }
}
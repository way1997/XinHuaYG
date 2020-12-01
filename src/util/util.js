
'use strict';
let util = {

};
//判断是不是app
util.isApp = function () {
    let url = window.location.href;
    let substr = url.split('?')[1];

    if (substr != undefined) {
        let arr = substr.split('&');
        if (arr.indexOf('isApp') != -1) {
            return {
                status: true,
                type: "andirod"
            }
        } else if (arr.indexOf('i_isApp') != -1) {
            return {
                status: true,
                type: "ios"
            }
        } else {
            return {
                status: false,
                type: ''
            }
        }
    } else {
        return {
            status: false,
            type: ''
        }
    }
}
//时间戳转换
export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    }
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + ''
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str))
        }
    }
    return fmt
}

function padLeftZero(str) {
    return ('00' + str).substr(str.length)
}

export default util;
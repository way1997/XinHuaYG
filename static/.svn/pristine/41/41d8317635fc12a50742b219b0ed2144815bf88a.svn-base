
const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  const ul = "https://www.mfzhosp.com/";
  //const ul = "http://192.168.7.212:8090/";
  //const ul = "http://192.168.7.213:8090/";
  //const ul = "http://127.0.0.1:9999/";
  module.exports = {
    formatTime: formatTime,
    home: ul
  }
  
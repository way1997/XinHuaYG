import Vue from 'vue'


Vue.filter('strFilter', function(str) {
	// console.log(str.replace(/<[^>]+>/g,"").substring(0,100))
	return str.replace(/<[^>]+>/g,"").substring(0,100);          // 替换所有标签为空
})

// 时间
Vue.filter('formatTime', function(value) {
   var d = new Date(value);
   var year = d.getFullYear();
   var month = d.getMonth() + 1;
   var day = d.getDate() <10 ? '0' + d.getDate() : '' + d.getDate();
   var hour = d.getHours();
   var minutes = d.getMinutes();
   var seconds = d.getSeconds();
   return  year+ '-' + month + '-' + day + ' ' + hour + ':' + minutes + ':' + seconds;
})
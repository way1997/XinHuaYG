
'use strict';
let util = {

};
//判断是不是app
util.isApp = function(){
    let url = window.location.href ;
    let substr = url.split('?')[1] ;

    if(substr != undefined){
        let arr = substr.split('&');
        if(arr.indexOf('isApp')!=-1){
            return {
                status :true ,
                type : "andirod"
            } 
        }else if(arr.indexOf('i_isApp')!=-1){
            return {
                status :true ,
                type : "ios"
            }             
        }else{
            return {
                status :false ,
                type :''
            }
        }
    }else{
        return {
            status :false ,
            type :''
        }
    }
}

export default util;
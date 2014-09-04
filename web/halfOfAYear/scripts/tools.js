/*
*   autor:  Carson
*   on   :  
*
*
* */
var C = Carson = {
    /*
    *   role : to get System;
    *   parm : lang ::> 1.zh 以中文方式反馈时间
    *                   2.en 以英文方式反馈时间
    *                   3.default 反馈精简24小时制度时间
    *   why use it : 因为获得时间的必要性,以及该方法处理时间的便捷性，简单性
    *   cite : [stackoverflow](http://t.cn/Rh4GZmj)  [MDN](http://t.cn/zRlkebn)
    * */
    formatTime:function(o) {
        var o = (typeof o === "undefined")? {} : o;
            _time = (typeof o.time === "undefined")? new Date() : new Date(o.time);
            _local = "",
            options = {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            year: "numeric",
            month: "short",
            day: "2-digit",
            hour12: false,
            //timeZoneName: "short",
            weekday: "short"
        };


        switch (o.lang) {
            case "zh":
                _local = "zh-ch";
                break;
            case "en":
                _local = "en-us";
                break;
            default:
                _local = "en-gb";
                options.month = "2-digit";
                options.weekday = null;
                delete options.weekday;
                break;
        }
        
        return _time.toLocaleDateString(_local,options);
    },

    /* TODO:根据指定的日期做倒计时 */
    countdown:function(o) {
        var _o = {},
            me = this,
            _startTime; //like this 05/09/2014 00:38:19 

        try {
            _startTime = o.startTime;
        }
        catch (err) {
            console.log(err.stack)
            return "0X000";
        };
        /* TODO:和现在的时间差*/
        var _diffTime = function() {
            var _d1=new Date(_startTime),
                _d2=new Date();
                _d1.setHours(_d1.getHours()-8);
            var _diff=(me.formatTime({time:new Date(_d1 - _d2)})).split(" "),
                _diff1=_diff[0].split("/");
            return (_diff1[2]-1970)+"年"+(_diff1[1]-1)+"月"+(_diff1[0]-1)+"日"+" "+_diff[1];
        };

        /* TODO:开始倒计时*/
        var _start = function(fn){
            fn(_diffTime());
            setInterval(function(){
                fn(_diffTime());
            },1000)
        }

        _o.diffTime=_diffTime;
        _o.start=_start;

        return _o;
    }
}

define(["require","exports","module","lodash"],function(e,t,n){function i(e){return e.replace(/^-ms-/,"ms-").replace(/-([a-z]|[0-9])/ig,function(e,t){return(t+"").toUpperCase()})}var r=e("lodash"),s=/\s+/;n.exports=function(t){if(!r.isString(t))return[];var n=t.split(s);return r(n).map(i).compact().value()}});
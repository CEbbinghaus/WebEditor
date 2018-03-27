const byId = i => document.getElementById(i);
const getUrlParam = key => new URLSearchParams(location.search).get(key);
const generateId = (l = 8) => {
    return l.loop(() => randChar(100));
}
const randChar = (n = 26, sn) => {
    let a = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJLLMNOPQRSTUVWXYZ";
    let t = sn ? a.slice(n, sn) : a.slice(0, n);
    return t.split("").splice(Math.random() * t.length | 0)[0];
}
Object.prototype.forEach = function(c, r){
    let k = Object.keys(this);
    k.forEach((kn, i) => {
        this [kn] = c(this[kn], kn, i)
    })
}
Object.prototype.keys = function(){
    return Object.keys(this);
}
Object.prototype.keyLength = function(){
    return Object.keys(this).length;
}
Object.prototype.test = this.keys();
Number.prototype.loop = function(c){
    if(!c)throw "Needs a Callback";
    let r;
    for(i = 0; i < this; i++){
        i == 0 ? r = c(i) : r += c(i);
    }
    return r;
}

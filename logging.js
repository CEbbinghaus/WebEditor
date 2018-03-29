let trueLog = console.log;

console.log = function(){
    let l = document.createElement("li");
    let m = document.createElement("span");
    let args = [];
    for(argIndex = 0; argIndex < arguments.length; argIndex++){
        args.push(arguments[argIndex])
    }
    m.innerHTML = args.join(", ");
    l.appendChild(m);
    byId("log").appendChild(l);
    trueLog.apply(console, arguments)
}

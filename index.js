let current = "css";
let logs = [];
let log = console.log;
const byId = i => document.getElementById(i);
console.log = function(){
    logs.push(arguments);
    let args = [];
    for(argIndex = 0; argIndex < arguments.length; argIndex++){
        args.push(arguments[argIndex])
    }
    if(byId("exec").classList.contains("cs"))byId("edit").value += args.join(", ") + "\n";
    log.apply(console, arguments);
}
window.addEventListener("keydown", (e) => {
    if(e.keyCode == 9){
        event.preventDefault();
    }
})
window.addEventListener('storage', function (e) {
    byId("edit").value = e.storageArea[current];
    update(e.storageArea[current]);
    ["html", "js", "css"].forEach(e => {
        update(e.storageArea[e]);
    })
})
const changeEdit = i => {
    document.getElementsByClassName("cs")[0].classList.remove("cs")
    byId(i).parentElement.classList.add("cs")
    byId("edit").classList = byId(i).parentElement.classList.toString().replace("h", "")
    if(i == "Out"){
        byId("edit").disabled = true;
    }else{
        byId("edit").disabled = false;
        current = i.toLowerCase();
        let j = document.getElementsByClassName("exec");
        for(s = 0; s < j.length; s++){
            current == "js" ? j[s].classList.remove("exh") : j[s].classList.add("exh");
        }
        load();
    }
}
const update = c => {
    byId(current).innerHTML = c;
    byId("edit").value = c;
    save();
}
const reset = () => {
    ["html", "js", "css"].forEach(e => {
        localStorage.removeItem(e);
        location.reload();
    })
}
const save = () => {
    localStorage.setItem(current, byId("edit").value);
}
const load = () => {
    if(localStorage.getItem(current) == undefined){
        localStorage.setItem(current, byId(current).innerHTML)
    }
    byId("edit").value = localStorage.getItem(current);
}
if (localStorage.getItem(current)) {
    byId("edit").value = localStorage.getItem(current);
    update(byId("edit").value)
};
const run = () => {
    byId("edit").value = "";
    logs = [];
    try{
        eval(localStorage.getItem("js"))
    }catch(err){
        byId("edit").value = err.toString();
    }
}
["html", "js", "css"].forEach(e => {
    current = e;
    update(localStorage.getItem(current) == undefined ?  byId(e).innerHTML.trim():localStorage.getItem(current))
})
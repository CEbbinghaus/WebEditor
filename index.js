let currentEdit = "css";
const BowserStorage = new Storage(localStorage);
const switchEditor = e => {
    currentEdit = e.id.toLowerCase();
    document.getElementsByClassName("cs")[0].classList.remove("cs");
    byId("editor").classList = e.parentElement.classList.toString().replace("h", "");
    e.parentElement.classList.add("cs")
    if(currentEdit == "out"){
        byId("TxtA").style.display = "none"
        byId("log").style.display = "block"
    }else{
        byId("TxtA").style.display = "inline"
        byId("TxtA").value = BowserStorage.data.current[currentEdit];
        currentEdit == "js" ? byId("exec").classList.remove("exh") : byId("exec").classList.add("exh");
    }
}
const load = () => {
    byId("TxtA").value = BowserStorage.data.current[currentEdit];
}
const update = (v, n) => {
    byId(currentEdit).innerHTML = v;
    BowserStorage.data.current[n ? n : currentEdit] = v;
}
const save = () => {
    let name = BowserStorage.data.current.name ? BowserStorage.data.current.name : prompt("Please Enter A Name for the current Project");
    if(name){
        BowserStorage.data.current.name = name;
        BowserStorage.data.saved[name] = {id: generateId(), css: BowserStorage.data.current.css, html: BowserStorage.data.current.html, js: BowserStorage.data.current.js}
    }else alert("you must enter a name");
    alert("Saved as " + name)
}
const run = () => {
    let code = BowserStorage.data.current.js;
    try{
        let r = eval(code);
        console.log(r);
    }catch(err){
        console.log(err.toString());
    }
}
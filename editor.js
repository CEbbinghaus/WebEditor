window.addEventListener("keydown", e => {
    if(e.keyCode == 83 && e.ctrlKey){
        e.preventDefault();
        let s = BowserStorage.data.current;
        let a = [btoa(s.html), btoa(s.js), btoa(s.css)];
        let c = new Clipboard();
        c.copy(location.origin + location.pathname + "?data=" + a.join("|"))
    }
})
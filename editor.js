window.addEventListener("keydown", e => {
    if(e.keyCode == 83 && e.ctrlKey){
        e.preventDefault();
        let s = BowserStorage.data.current;
        let a = [{name: "html", value: btoa(s.html)},{name: "js", value: btoa(s.js)},{name: "css", value: btoa(s.css)}]
        let c = new Clipboard();
        c.copy(location.origin + location.pathname + "?" + a.map(v => (v.name + "=" + v.value)).join("&"))
    }
})
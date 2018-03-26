window.addEventListener("keydown", e => {
    console.log(e.which, e.ctrlKey, e.shiftKey, e.altKey)
    switch(e.keyCode){
        case 83:
            if(!e.ctrlKey)return;
            e.preventDefault();
            let s = BowserStorage.data.current;
            let a = [btoa(s.html), btoa(s.js), btoa(s.css)];
            let c = new Clipboard();
            c.copy(location.origin + location.pathname + "?data=" + a.join("|"))
        break;
        case 76:
            if(!e.ctrlKey)return;   
            e.preventDefault();
            let u = prompt("enterUrl");
            if(!u)return alert("No Url Provided");
            BowserStorage.loadURL(u);
        break;
    }

})
window.addEventListener("keydown", e => {
    console.log(e.which, e.ctrlKey, e.shiftKey, e.altKey)
    switch(e.keyCode){
        case 9:
            event.preventDefault();
            if(document.activeElement != byId("TxtA"))return;
            let t = byId("TxtA");
            let start = t.selectionStart, end = t.selectionEnd;
            if(e.shiftKey){
				let newL = t.value.indexBefore(start, "\n"), tab = t.value.indexBefore(start, "	");
                if(newL < tab){
                    let a = t.value.split("")
                    a.splice(tab, 1);
					t.value = a.join("")
					t.selectionStart = t.selectionEnd = start - 1;
                }
                console.log(t.value.indexBefore(start, "\n"), t.value.indexBefore(start, "	"))
            }else{
                if(start == end){
                    t.value = t.value.insert(start, "	")
					t.selectionStart = t.selectionEnd = start + "	".length;
                }
            }
        break; 
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
window.addEventListener("keydown", e => {
	//console.log(e.which, e.ctrlKey, e.shiftKey, e.altKey)
	switch(e.keyCode){
		case 9:
			event.preventDefault();
			if(document.activeElement != byId("TxtA"))return;
			let t = byId("TxtA");
			let start = t.selectionStart, end = t.selectionEnd;
			if(e.shiftKey){
				if(start == end){
					let newL = t.value.indexBefore(start, "\n"), tab = t.value.indexBefore(start, "	");
					if(newL < tab){
						let a = t.value.split("")
						a.splice(tab, 1);
						t.value = a.join("")
						t.selectionStart = t.selectionEnd = start - 1;
					}
				}else{
					let trueStart = t.value.lastIndexOf("\n", start) + 1;
					let parts = t.value.slice(trueStart, end).split("\n");
					let didIndent = false;
					parts = parts.map(v => {
						didIndent = v.split("")[0] != "	" ? true : didIndent;
						return v.split("")[0] == "	" ? v.replace("	", "") : v;
					});
					t.value = t.value.slice(0, trueStart) + parts.join("\n") + t.value.slice(end);
					console.log(start, end, (start - didIndent ?  1 : 0), end + 1)
					t.selectionStart = (start - didIndent ?  1 : 0); t.selectionEnd = end + 1;
				}
			}else{
				if(start == end){
					t.value = t.value.insert(start, "	")
					t.selectionStart = t.selectionEnd = start + "	".length;
				}else{
					let trueStart = t.value.lastIndexOf("\n", start) + 1
					let text = t.value.slice(trueStart, end);
					let parts = text.split("\n");
					parts = parts.map(v => "	" + v);
					t.value = t.value.slice(0, trueStart) + parts.join("\n") + t.value.slice(end);
					t.selectionStart = start; t.selectionEnd = end  + parts.length;
				}
			}
		break; 
		case 83:
			if(!e.ctrlKey)return;
			e.preventDefault();
			let s = JSON.stringify(BowserStorage.data.current);
			let c = new Clipboard();
			c.copy(location.origin + location.pathname + "?data=" + btoa(s));
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
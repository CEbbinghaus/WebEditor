class Storage{
    constructor(s){
        this.types = ["css", "js", "html"]
        this.storageLocker = s;
        this.data = {};
        this.current;
        if(getUrlParam("data")){
            this.loadURL()
        }else{
            let d = localStorage.getItem("data");
            if(d)this.init();
            else this.loadCfg();
        }
    }
    async init(){
        let r = await fetch("https://api.myjson.com/bins/ttuhb");
        let j = await r.json();
        this.data = j;
        this.types.forEach(v => {update(this.data.current[v], v)})
        switchEditor(document.getElementById("css"))
        //update(this.data.current[currentEdit])
        return j;
    }
    loadDefault(){
        if(!this.data.current)
        this.data.current = {css: "", html: "", js: ""};
        if(!this.data.saved)
        this.data.saved = {};
        if(!this.data.settings)
        this.data.settins = {};
        
    }
    loadData(){
        let d = false;
        ["current", "saved", "history", "settings"].forEach(v => {
            if(this.storageLocker.getItem(v) != undefined){
                this.data[v] = JSON.parse(this.storageLocker.getItem(v));
            }else{d = true;}
        })
        d && this.loadDefault()
    }
    loadCfg(t = true){
        t && this.loadData();
        if(!this.data.current || !this.data.saved)return this.init();
        if(!this.data.current.keyLength()){
            this.data.current = this.data.history[0] || {};
        }
        this.types.forEach(t => {
            byId(t).innerHTML = this.data.current[t]
        })
        byId("TxtA").innerHTML = this.data.current[currentEdit]
    }
    save(){
        this.data.forEach((d, n) => {
            this.storageLocker.setItem(n, JSON.stringify(d))
        })
    }
    loadProj(id){
        if(!id){
        }else{

        }
    }
    loadURL(str){
        this.loadData();
        this.backup()
        try{
            let d = (str ? str : getUrlParam("data"));
            let decodedObj = JSON.parse(atob(d));
            this.data.current = decodedObj;
        }catch(err){
            console.error(err)
            alert("Whoops Something Went Wrong. soz")
        }
        this.loadCfg();
    }
    restoreFromCurrent(){
        
    }
    backup(){
        if(!this.data.history){
            return this.data.history = [];
        }
        if(this.data.history.map(v => v.id).indexOf(this.data.current.id) == -1){
            this.data.history.push(this.data.current)
        }else{
            this.data.history[this.data.history.map(v => v.id).indexOf(this.data.current.id)] = this.data.current
        }
        this.save();
    }
}
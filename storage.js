class storage{
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
        let r = await fetch("https://api.myjson.com/bins/nn7nz");
        let j = await r.json();
        this.data = j;
        return j;
    }
    loadData(){
        ["current", "saved", "history", "settings"].forEach(v => {
            this.data[v] = JSON.parse(this.storageLocker.getItem(v));
        })
    }
    loadCfg(t = true){
        t && this.loadData();
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
    loadURL(url){
        this.loadData();
        this.backup()
        try{
            this.data.current.name = "temp"; 
            let d = (url ? url : getUrlParam("data")).split("|").map(v => atob(v));
            this.data.current.html = d[0];
            this.data.current.js = d[1];
            this.data.current.css = d[2];
        }catch(err){
            console.log()
            console.error(err.stack)
            alert("Whoops Something Went Wrong. soz")
        }
        this.loadCfg(false);
    }
    restoreFromCurrent(){
        
    }
    backup(){
        if(this.data.history.map(v => v.id).indexOf(this.data.current.id) == -1){
            this.data.history.push(this.data.current)
        }else{
            this.data.history[this.data.history.map(v => v.id).indexOf(this.data.current.id)] = this.data.current
        }
        this.save();
    }
}
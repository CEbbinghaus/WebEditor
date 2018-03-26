class storage{
    constructor(s){
        this.types = ["css", "js", "html"]
        this.storageLocker = s;
        this.data = {};
        this.current;
        let d = localStorage.getItem("data");
        if(d)this.init();
        else this.loadCfg();
    }
    async init(){
        let r = await fetch("https://api.myjson.com/bins/nn7nz");
        let j = await r.json();
        this.data = j;
        return j;
    }
    loadCfg(){
        ["current", "saved", "history", "settings"].forEach(v => {
            this.data[v] = JSON.parse(this.storageLocker.getItem(v));
        })
        if(!this.data.current.keyLength()){
            this.data.current = this.data.history[0];
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
    restoreFromCurrent(){
        
    }
    backup(){

    }
}
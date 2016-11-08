class Pokemon {
    constructor(name,level) {
        this.name = name;
        this.level = level;
    }
    show(){
        console.log("Pokemon %s level %d",this.name,this.level);
    }
}

module.exports=Pokemon;

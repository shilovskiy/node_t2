var Pokemon = require("./pokemon.js");
class PokemonList extends Array {
    constructor(...args) {
        super(...args);
    }
    last() {
        return this[this.length - 1];
    }
    add(name,level){
        this.push(new Pokemon(name,level));
    }
    addpok(pok){
        this.push(pok);
    }
    //общее количество и список
    show(){
        for(let pok of this){
            pok.show();
            //console.log("Pokemon %s level %d",pok.name,pok.level);
        }
        console.log(`Total amount: ${this.length}`);

    }

    getPokemon(){
        return this.pop();
    }
    max(){
        //return  Math.max.apply(null, this.map(item => item.level));
        return this.reduce((prev,curr)=>{
            return prev.level>curr.level ? prev : curr} )
    }
}

module.exports = PokemonList;
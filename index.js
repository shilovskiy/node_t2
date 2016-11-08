/**
 * Created by Олег Шиловский on 05.11.2016.
 */
var PokemonList = require("./pokemonlist.js");
var hs = require("./hidenseek.js");
var allpoks = new PokemonList();

// allpoks.add("Crotine",12);
// allpoks.add("Barrados",17);
// allpoks.add("Turteler",22);
// allpoks.add("Hippopoom",27);
// allpoks.add("Stunhopper",32);
// allpoks.add("Hypepie",37);
// allpoks.add("Bellibia",42);
// allpoks.add("Venomeleon",47);
// allpoks.add("Magmeleon",52);
// allpoks.add("Dinoscythe",57);
// allpoks.add("Venom",48);
// allpoks.add("Magmel",53);
// allpoks.add("Dinos",58);

//-------------------------------
//
// hidep("Field",allpoks)
//     .then(showHidden)
//     .then(showlost("Field"));
//     //.then(showlost );
//-------------------------------

var myArgs = process.argv.slice(2);
//console.log('myArgs: ', myArgs);

switch (myArgs[0]) {
    case 'hide':
        var PokemonListFromJson = require("./"+myArgs[2]);
        PokemonListFromJson.PokemonList.map(x=>{
            allpoks.add(x.name,x.level);
        });

        hs.hide(`./${myArgs[1]}`,allpoks).then((x)=>x.show()); //xPokemonlist

        break;
    case 'seek':

        hs.seek(`./${myArgs[1]}`).then((p)=>p.show()); //PokemonList
        break;
    default:
        console.log('Краткая памятка');
        console.log('***************');
        console.log('node index - информация о командах');
        console.log('node index hide field pokemons.json - брался путь к папке и данные о покемонах и приложение их прятало');
        console.log('node index seek field - берется путь к папке c данными о покемонах, ищуься покемоны, выводится информацияо них');

}


var fs = require('fs');
const foldersAmount=10;
var PokemonList = require("./pokemonlist.js");
var Pokemon = require("./pokemon.js");
//var hidden = new PokemonList();


class randomFolder {
    constructor(max){
        this.max = max;
    }
    valueOf(){
        let rnd = Math.floor(Math.random()*this.max+1);
        rnd = rnd==0 ? 1 : rnd;
        return rnd<10? ('0'+rnd.toString()):rnd.toString();
    }
}


//прячет в папку pokpath покемонов из pokemons
var makedirs=function(pokinfo){
    return new Promise((resolve, reject)=> {
        var ff = foldersAmount;
        while (ff > 0) {
            //fs.exists(pokpath+"/"+(ff<10?'0'+ff.toString():ff.toString()), (ff,exists) => {
            //   if (exists){
            fs.mkdir(pokinfo.path + "/" + (ff < 10 ? '0' + ff.toString() : ff.toString()), (err)=> {
                //if (err && err.code=='EEXIST') {console.error('Папка уже существует %s', err)}
                //else {console.log("created")}
            });


            ff--;
        }
        resolve(pokinfo);

    });

};
var getRandomPokemon=function(pokinfo){
    return new Promise((resolve, reject)=> {
    //максимум Х случайных покемонов и не более 3
    var elect = new PokemonList();
    let min = Math.min(3, Math.floor(Math.random() * pokinfo.lost.length+1));
    //    min = min==0 ? 1:min;
    //console.log('amount to hide'+min);

    while (min > 0) {
        elect.addpok(pokinfo.lost[Math.floor(Math.random() * pokinfo.lost.length+1)]);
        min--;
    }

    resolve({pokinfo, elect});
});
};

var saveToRandomFolders =function(rndPoks){
    return new Promise((resolve,reject)=> {

        let rn = new randomFolder(foldersAmount);
        //console.log(rndPoks.elect);
        rndPoks.elect.map(pok=>{
            let fullpath = rndPoks.pokinfo.path + '/' + rn + '/' + 'pokemon.txt';
            //куда, кого, ошибка
            fs.writeFile(fullpath, pok.name + '|' + pok.level, (err) => {
                if (err) throw err;
            });
        });

        resolve(rndPoks.elect);

    });
};

exports.hide = function(path='Field',lost){
   var s1= makedirs({path,lost});
    var s2 = s1.then(getRandomPokemon);
    return s2.then(saveToRandomFolders);
};

//////////////////////////////////////////////////////////////////////
//////////////////для seek ///////////////////////////////////////////
//////////////////////////////////////////////////////////////////////

function isFileExists(filepath){
    return new Promise((resolve, reject) => {
        fs.access(filepath, fs.F_OK, error => {
            //if (!error) {
                resolve({result:!error,path:filepath});
            //    console.log(filepath);
            // }else{
            //
            // }
            // resolve(error?{result:true,path:filepath}:{result:true,path:filepath})

        });
    });
}



function readfile(filepath){
    return new Promise((resolve,reject)=>{
        fs.readFile(filepath, function (err, data) {
            if (err) throw err;
            //console.log(data.toString());
            resolve(new Pokemon(data.toString().split('|')[0],data.toString().split('|')[1]));

            });

    });

}

var getPokemondirs = function(path){

    return new Promise((resolve,reject)=>{
      fs.readdir(path,(err,dirs)=>{
          if (err) reject(err)
          resolve({path,dirs});
      });
    })};

var getPokemonFiles= function(result){

        return new Promise((resolve,reject)=> {
            let fullpath;
            var promises = [];
            //console.log(result.dirs);

            for(let pp in result.dirs) {
                fullpath = `${result.path}/${result.dirs[pp]}/pokemon.txt`;
                promises.push(isFileExists(fullpath));
            }
            Promise.all(promises).then((results)=> {
                //Все найденые поки
                //console.log('results'+results.filter((x)=>{return x.result==true}));
                resolve(results.filter((x)=>{return x.result==true}));
            });

        }).then(
            dirs=>{
                //читать файлы
                var lost = new PokemonList();
                var Pokspromises = [];
                //console.log('dirs'+dirs);
                dirs.map(v=>{
                    Pokspromises.push(readfile(v.path));
                });

                return Promise.all(Pokspromises).then((reslt)=>{
                  //console.log(reslt);
                    return new Promise((resolve,reject)=>{
                        reslt.map(p=>{
                            //p.show();
                            lost.addpok(p);
                        });
                        resolve(lost);

                    });

                });

            }
        )
};



exports.seek = function seek(path){
   return getPokemondirs(path)
        .then(getPokemonFiles)
        .catch(err=>{
            console.log(err);
        });


};

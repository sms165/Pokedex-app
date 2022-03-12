let pokemonList = [];

let  bulbasaur = {
    name: 'Bulbasaur',
    height: 7,
    types: ['grass', ' poison'],
    abilities: ['chlorophyll', ' overgrow']
};

let  charmander = {
    name: 'Charmander',
    height: 6,
    types: ['fire'],
    abilities: ['blaze', ' solar-power']
};

let  squirtle = {
    name: 'Squirtle',
    height: 5,
    types: ['water'],
    abilities: ['rain-dish', ' torrent']
};

let  pikachu = {
    name: 'Pikachu',
    height: 4,
    types: ['electric'],
    abilities: ['static', ' lightningrod']
};

pokemonList= [bulbasaur, charmander, squirtle, pikachu];

console.log(pokemonList[0]);
console.log(pokemonList.includes(charmander));

// let pl =[
//     {
//         name: 'Bulbasaur',
//         height: 7,
//         types: ['grass', 'poison'],
//         abilities: ['chlorophyll', 'overgrow']
//     },
//     {
//         name: 'Charmander',
//         height: 6,
//         types: ['fire'],
//         abilities: ['blaze', 'solar-power']
//     },
//     {
//         name: 'Squirtle',
//         height: 5,
//         types: ['water'],
//         abilities: ['rain-dish', 'torrent']
//     },
//     {
//         name: 'Pikachu',
//         height: 4,
//         types: ['electric'],
//         abilities: ['static', 'lightningrod']
//     }


// ];
// console.log(pl[0]);


// for (let i = 0; i < pl.length; i++) {
    
//     console.log(pl[i].name);
    
// }
document.write('<div class=\'card-main\'>')
for (let i = 0; i < pokemonList.length; i++) {
    document.write('<div class=\'card\'><h2>' +pokemonList[i].name + '</h2><br>');
    document.write('Height: '+pokemonList[i].height);
    if (pokemonList[i].height>6) {
        document.write('<span class=\'size\'> -Wow, that\'s big </span><br>');
    }else{
        document.write('<br>');
    }
    document.write('Types: '+ pokemonList[i].types + '<br>');
    document.write('Abilities: ' + pokemonList[i].abilities+ '<br> </div>');
}
document.write('</div>')

    

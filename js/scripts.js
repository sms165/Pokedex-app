let pokemonList = [];

let  bulbasaur = {
    name: 'Bulbasaur',
    height: 7,
    types: ['grass', 'poison'],
    abilities: ['chlorophyll', 'overgrow']
};

let  charmander = {
    name: 'Charmander',
    height: 6,
    types: ['fire'],
    abilities: ['blaze', 'solar-power']
};

let  squirtle = {
    name: 'Squirtle',
    height: 5,
    types: ['water'],
    abilities: ['rain-dish', 'torrent']
};

let  pikachu = {
    name: 'Pikachu',
    height: 4,
    types: ['electric'],
    abilities: ['static', 'lightningrod']
};

pokemonList= [bulbasaur, charmander, squirtle, pikachu];

console.log(pokemonList[0]);
console.log(pokemonList.includes(charmander));
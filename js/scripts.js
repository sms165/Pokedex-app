//IIFE
let pokemonRepository= (function () {
    let pokemonList = [];

    //pokemon objects
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

    //functions
    function add (pokemon) {
        //check if item is in correct format
        if (typeof pokemon === 'object') {
            if (Object.keys(pokemon).includes('name')&& Object.keys(pokemon).includes('height') && Object.keys(pokemon).includes('types') && Object.keys(pokemon).includes('abilities') ) {
                pokemonList.push(pokemon);
                console.log(true);    
            }  else{
                console.log(false);
            }
        } 
    }

    function eventListenerBtn(button, pokemon) {
        button.addEventListener('click', function() {
            showDetails(pokemon);
            
        });
    }

    function addListItem(pokemon) {
        let pokemonListHtml = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText= pokemon.name;
        button.classList.add('btn')
        listItem.appendChild(button);
        pokemonListHtml.appendChild(listItem);
        eventListenerBtn(button, pokemon);
    }

    function showDetails(pokemon) {
        console.log(pokemon);
    }

    function find(value) {
        let pokemonCharacter = pokemonList.filter(pokemon => pokemon.name === value);
        console.log(pokemonCharacter);
    }
    
    function getAll () {
        return pokemonList
        
    }
    
    return{
        add: add,
        getAll:getAll,
        find: find,
        addListItem: addListItem
    };

  
})();


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

//add new pokemon
pokemonRepository.add({name: 'Jigglypuff', height: 1.08, types: 'normal, fairy', abilities: 'cute charm, competitive'});

//find pokemon by name
pokemonRepository.find('Bulbasaur');

//use of IIFE
let pokemonList =pokemonRepository.getAll();


//for each function go through object array and add them to the list for output using addLisrItem function
pokemonList.forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);  
});





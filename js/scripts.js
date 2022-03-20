//IIFE
let pokemonRepository= (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    //add a new pokemon
    function add (pokemon) {
        pokemonList.push(pokemon);
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
        loadDetails(pokemon).then(function (){
            console.log(pokemon);
        })
    }

    function find(value) {
        let pokemonCharacter = pokemonList.filter(pokemon => pokemon.name === value);
        console.log(pokemonCharacter);
    }
    
    function getAll () {
        return pokemonList
        
    }

    //fetches pokemons from api then add them to the pokemon list using the add function
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();    
        }).then(function (json){
            json.results.forEach(function(item){
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function(e){
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response){
            return response.json();
        }).then(function (details){
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e){
            console.error(e);
        });
    }

    
    return{
        add: add,
        getAll:getAll,
        find: find,
        addListItem: addListItem,
        loadList:loadList,
        loadDetails:loadDetails
    };

  
})();

pokemonRepository.loadList().then(function(){
    pokemonRepository.getAll().forEach(function(pokemon){
        pokemonRepository.addListItem(pokemon);
    })
})


//find pokemon by name
pokemonRepository.find('Bulbasaur');

//use of IIFE
let pokemonList =pokemonRepository.getAll();


//for each function go through object array and add them to the list for output using addLisrItem function
pokemonList.forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);  
});





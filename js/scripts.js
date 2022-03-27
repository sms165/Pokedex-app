//IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');


    //add a new pokemon
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    function eventListenerBtn(button, pokemon) {
        button.addEventListener('click', function () {
            showDetails(pokemon);

        });
    }

    function addListItem(pokemon) {
        let pokemonListHtml = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn')
        listItem.appendChild(button);
        pokemonListHtml.appendChild(listItem);
        eventListenerBtn(button, pokemon);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        })
    }

    function find(value) {
        let pokemonCharacter = pokemonList.filter(pokemon => pokemon.name === value);
        console.log(pokemonCharacter);
    }

    function getAll() {
        return pokemonList

    }

    //fetches pokemons from api then add them to the pokemon list using the add function
    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //modal
    function showModal(title, text) {

        //clear all content inside of modal
        modalContainer.innerHTML = ''

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');

    };

    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    //close modal with the esc key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    //close the modal when the user clicks inside of it
    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content');
    });

    return {
        add: add,
        getAll: getAll,
        find: find,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showModal: showModal,
        hideModal: hideModal
    };


})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    })
})


//find pokemon by name
pokemonRepository.find('Bulbasaur');

//use of IIFE
let pokemonList = pokemonRepository.getAll();


//for each function go through object array and add them to the list for output using addLisrItem function
pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});
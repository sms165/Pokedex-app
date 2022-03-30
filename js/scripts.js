//IIFE
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#pokemon-modal');


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
        listItem.classList.add('group-list-item');
        listItem.classList.add('col-lg-4', 'col-sm-12', 'col-md-6');
        listItem.classList.add(pokemon.name);
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn', 'btn-primary');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#pokemonModal');

        listItem.appendChild(button);
        pokemonListHtml.appendChild(listItem);
        eventListenerBtn(button, pokemon);
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon)
        })
    }

    // Search for Pokemon with input search box
    function find(value) {

        console.log(value);
        v = value.toLowerCase();
        $(".pokemon-list").empty();

        // console.log(pokemonList);

        pokemonList.forEach((pokemon) => {
            if (pokemon.name.indexOf(v) > -1) {
                console.log(pokemon.name);
                addListItem(pokemon);
            } else {
                console.log(false);
            }
        })
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
            item.imageUrl = details.sprites.other.dream_world.front_default;
            item.imageUrlArtwork = details.sprites.other.home.front_default;
            item.height = details.height;
            item.types = details.types;
            item.weight = details.weight;
            item.abilities = details.abilities;
            console.log(item.detailsUrl)
            item.detailsUrl;

        }).catch(function (e) {
            console.error(e);
        });
    }


    //modal
    function showModal(pokemon) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        let modalHeader = $('.modal-header');

        modalTitle.empty();
        modalHeader.empty();
        modalBody.empty();

        let namePokemon = $('<h1>' + pokemon.name + '</h1>');

        // Loop through Pokemon Characters from list
        let forwardCharacterButton = document.createElement('button');
        forwardCharacterButton.classList.add('forward-arrow')
        forwardCharacterButton.innerText = '>';

        let backwardCharacterButton = document.createElement('button');
        backwardCharacterButton.classList.add('backward-arrow')
        backwardCharacterButton.innerText = '<';


        forwardCharacterButton.addEventListener('click', function () {

            for (let i = 0; i < pokemonList.length; i++) {
                const element = pokemonList[i];
                // console.log(element);
                let index = pokemonList.indexOf(pokemon) + 1;
                // console.log(index);
                // console.log(pokemonList[index]);
                let next = pokemonList[index];

                if (index == pokemonList.length) {
                    showDetails(pokemonList[0])

                } else {
                    showDetails(next);
                }
            }

        })

        backwardCharacterButton.addEventListener('click', function () {

            for (let i = 0; i < pokemonList.length; i++) {
                const element = pokemonList[i];
                // console.log(element);
                let index = pokemonList.indexOf(pokemon) - 1;
                console.log(index);
                //console.log(pokemonList[index]);
                let next = pokemonList[index];
                let num = parseInt((pokemonList.length) - 1);
                console.log(num)
                let last = pokemonList[num];
                console.log(last)
                console.log(pokemonList[0])

                if (index <= -1) {
                    showDetails(pokemonList[num])

                } else {
                    showDetails(next);
                }
            }

        })


        // Pokemon Character Images
        let imagePokemon = document.createElement('img');
        imagePokemon.src = pokemon.imageUrl;
        imagePokemon.classList.add('pokemon-image');

        let forwardImageButton = document.createElement('button');
        forwardImageButton.classList.add('forward-arrow')
        forwardImageButton.innerText = '>';

        forwardImageButton.addEventListener('click', function () {
            if (imagePokemon.src == pokemon.imageUrl) {
                imagePokemon.src = pokemon.imageUrlArtwork;

            } else {
                imagePokemon.src = pokemon.imageUrl
            }
        })

        let backwardImageButton = document.createElement('button');
        backwardImageButton.classList.add('backward-arrow');
        backwardImageButton.innerText = '<';

        backwardImageButton.addEventListener('click', function () {
            if (imagePokemon.src == pokemon.imageUrlArtwork) {
                imagePokemon.src = pokemon.imageUrl;

            } else {
                imagePokemon.src = pokemon.imageUrlArtwork
            }
        })


        //modal content for body
        let heightPokemonn = $('<p>' + 'Height: ' + pokemon.height + ' cm' + '</p>');

        let weightPokemon = $('<p>' + 'Weight: ' + pokemon.weight + ' kg' + '</p>');

        let typePokemon = ('<p>' + 'Types: ')

        let type = pokemon.types;
        //console.log(pokemon.types)

        for (let i = 0; i < type.length; i++) {
            const element = type[i];
            if (i > 0) {
                typePokemon += ', ' + element.type.name;

            } else {
                typePokemon += element.type.name + ' ';
            }

        }
        typePokemon += ('</p>');

        let abilityPokemon = ('<p>' + 'Abilities: ')
        let ability = pokemon.abilities;


        for (let i = 0; i < ability.length; i++) {
            const element = ability[i];
            if (i > 0) {
                abilityPokemon += ', ' + element.ability.name;

            } else {
                abilityPokemon += element.ability.name + ' ';
            }

        }
        abilityPokemon += ('</p>');

        // Add everything to the modal
        modalTitle.append(namePokemon);
        modalHeader.append(backwardCharacterButton);
        modalHeader.append(namePokemon);
        modalHeader.append(forwardCharacterButton);
        modalBody.append(heightPokemonn);
        modalBody.append(weightPokemon);
        modalBody.append(typePokemon);
        modalBody.append(abilityPokemon);
        modalBody.append(backwardImageButton);
        modalBody.append(imagePokemon);
        modalBody.append(forwardImageButton);

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


//use of IIFE
let pokemonList = pokemonRepository.getAll();


//for each function go through object array and add them to the list for output using addLisrItem function
pokemonList.forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
});

let mybutton = document.getElementById("btn-back-to-top");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
scrollFunction();
};

function scrollFunction() {
if (
document.body.scrollTop > 20 ||
document.documentElement.scrollTop > 20
) {
mybutton.style.display = "block";
} else {
mybutton.style.display = "none";
}
}
// When the user clicks on the button, scroll to the top of the document
mybutton.addEventListener("click", backToTop);

function backToTop() {
document.body.scrollTop = 0;
document.documentElement.scrollTop = 0;
}
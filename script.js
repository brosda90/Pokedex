let pokemonArray = [];
let currentIndex = 0;
let currentStep = 30;
let cardColor = [];
let cardBackground = ['img/fire.jpg', 'img/forest.jpg', 'img/gras.jpg', 'img/lightning.jpg', 'img/rocks.jpg', 'img/water.jpg'];



async function loadAllPokemon() {

  document.getElementById('loadingBar').style.visibility = 'visible';
    let step = 30;
    for (let i = 1; i <= step; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        let speciesUrl = currentPokemon.species.url;
        let speciesResponse = await fetch(speciesUrl);
        let species = await speciesResponse.json();
        currentPokemon.color = species.color.name;
        pokemonArray.push(currentPokemon);
        displayPokemon(currentPokemon);
        console.log(currentPokemon)
    }
    document.getElementById('loadingBar').style.visibility = 'hidden';
}

function displayPokemon(pokemon) {
    let pokemonContainer = document.getElementById('showAllPokemons');
    let pokemonImage = pokemon.sprites.other.dream_world.front_default;
    let pokemonColor = pokemon.color;
    
    pokemonContainer.innerHTML += htmlpokemonreturn(pokemon.id,pokemon.name,pokemon.types[0].type.name,pokemonColor,pokemonImage);
}

function htmlpokemonreturn(id,name,type,color,image){
  return `
  <div class="pokemon-card" style="border: 3px solid ${color};" onclick = "showDetails(${id})">
      <div class="pokemon-name"><p>${name}</p> </div>
      <div>
          <img src="${image}" alt="${name}">
      </div>   
      <div class="pokemon-typ">${type}</div>
  </div>
  `;
}

function showDetails(pokemonId) {
    let pokemon = pokemonArray.find(p => p.id === pokemonId);
    currentIndex = pokemonArray.findIndex(p => p.id === pokemonId);

    let pokemonContainer = document.getElementById('showPokemonDetails');
    pokemonContainer.style.display = "flex";
    pokemonContainer.innerHTML = ''; 

    let pokemonImage = pokemon.sprites.other.dream_world.front_default;
    let pokemonHp = pokemon.stats[0].base_stat;
    let pokemonAttack = pokemon.stats[1].base_stat;
    let pokemonDefense = pokemon.stats[2].base_stat;
    let pokemonSpAttack = pokemon.stats[3].base_stat;
    let pokemonSpDefense = pokemon.stats[4].base_stat;
    let pokemonSpeed = pokemon.stats[5].base_stat;

    let detailedCardplus = document.createElement('div');
    detailedCardplus.className = 'detailed-card';
   

    detailedCardplus.innerHTML = htmlreturn(pokemon.name,pokemonImage,pokemonHp,pokemonAttack,pokemonDefense,pokemonSpAttack);


    function htmlreturn(pokemonName,pokemonImage,pokemonHp,pokemonAttack,pokemonDefense,pokemonSpAttack){
      return `
    <div class="pokemon-detail-card">
    <img src="img/back arrow.png" id="leftBtn" onclick= "prevPokemon()">
    <div class="maincard">
        <div class="detail-card-name"><h2>${pokemonName}</h2></div>
        <div class="element-type"><img  src="img/element-water.png" alt=""></div>
        <div class="detail-image">
          <img
            src="${pokemonImage}"
          />
        </div>

        <div class="stats-border">
          <div class="progress-line">
            <p>HB</p>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped"
                role="progressbar"
                style="width: ${pokemonHp}%"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <hr />
          <div class="progress-line">
            <p>attack</p>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped"
                role="progressbar"
                style="width: ${pokemonAttack}%"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <hr />
          <div class="progress-line">
            <p>defense</p>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped"
                role="progressbar"
                style="width: ${pokemonDefense}%"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <hr />
          <div class="progress-line">
            <p>special-attack</p>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped"
                role="progressbar"
                style="width: ${pokemonSpAttack}%"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <hr />
          <div class="progress-line">
            <p>special-defense</p>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped"
                role="progressbar"
                style="width: ${pokemonSpDefense}%"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <hr />
          <div class="progress-line">
            <p>Speed</p>
            <div class="progress">
              <div
                class="progress-bar progress-bar-striped"
                role="progressbar"
                style="width: ${pokemonSpeed}%"
                aria-valuenow="10"
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
          </div>
          <hr />
        </div>
      </div>
      <img src="img/forward arrow.png" id="rightBtn" onclick="nextPokemon()">
    </div>
    </div>`;
      
    }

    pokemonContainer.appendChild(detailedCardplus);

    // Add event listener to close the detailed card
    pokemonContainer.addEventListener('click', hideDetails);

    updateBackground(pokemon.types[0].type.name);
}

function hideDetails(event) {
    // Check if the click was outside of the detailed card
    if(event.target.id === "showPokemonDetails") {
        let pokemonContainer = document.getElementById('showPokemonDetails');
        pokemonContainer.style.display = "none";
        
        // Remove the event listener
        pokemonContainer.removeEventListener('click', hideDetails);
    }
}

function nextPokemon(){
  if(currentIndex < pokemonArray.length ) {
      currentIndex++;
      showDetails(pokemonArray[currentIndex].id);
  }
}

function prevPokemon(){
  if(currentIndex < pokemonArray.length ){
    currentIndex--;
    showDetails(pokemonArray[currentIndex].id);
  }
}

async function loadMorePokemon() {
  document.getElementById('loadingBar').style.visibility = 'visible';
  let newStep = currentStep + 30;
  for (let i = currentStep + 1; i <= newStep; i++) {
      let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
      let response = await fetch(url);
      let currentPokemon = await response.json();
      let speciesUrl = currentPokemon.species.url;
      let speciesResponse = await fetch(speciesUrl);
      let species = await speciesResponse.json();
      currentPokemon.color = species.color.name;
      pokemonArray.push(currentPokemon);
      displayPokemon(currentPokemon);
      console.log(currentPokemon)
  }
  document.getElementById('loadingBar').style.visibility = 'hidden';
  currentStep = newStep;
}

function searchPokemon() {
  // Get the value of the search bar
  let searchBar = document.getElementById('searchBar');
  let searchText = searchBar.value.toLowerCase();

  // Clear the current display
  let pokemonContainer = document.getElementById('showAllPokemons');
  pokemonContainer.innerHTML = '';

  // Loop through all the pokemon
  for(let pokemon of pokemonArray) {
      // If the pokemon's name includes the search text, display it
      if(pokemon.name.includes(searchText)) {
          displayPokemon(pokemon);
      }
  }
}

function updateBackground(pokemonColor) {
  let background;

  if (pokemonColor === 'fire') {
    background = 'img/fire.jpg';
  } else if (pokemonColor === 'water') {
    background = 'img/water.jpg';
  } else if (pokemonColor === 'poison') {
    background = 'img/poison.jpg';
  } else if (pokemonColor === 'normal') {
    background = 'img/street.jpg';
  } else if (pokemonColor === 'electric') {
    background = 'img/lightning.jpg';
  } else if (pokemonColor === 'grass', 'bug', 'yellow', 'brown') {
    background = 'img/gras.jpg';
  }

  if (background) {
    let nameElements = document.getElementsByClassName('detail-card-name');
    let imageElements = document.getElementsByClassName('detail-image');

    for (let element of nameElements) {
      element.style.backgroundImage = `url(${background})`;
    }

    for (let element of imageElements) {
      element.style.backgroundImage = `url(${background})`;
    }
  }
}

let pokemons = [];
let pokeIndex = 1;
let pokeLimit = 16;
const pokeList = document.getElementById("poke-list");

function fetchPokemons() {
  pokeList.innerHTML = "";
  for (let i = 1; i < pokeLimit; i++) {
    pokeIndex++;
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeIndex}`)
      .then((response) => response.json())
      .then((response) => pokemons.push(response));
  }
  pokeLimit += 9;

  pokemons.forEach((pokemon, index) => {
    const pokeCard = document.createElement("div");
    pokeCard.setAttribute("class", "card col-md-4");
    pokeCard.setAttribute("style", "width: 18rem;");
    pokeCard.innerHTML = `
      <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${pokemon.name}</h5>
        <button data-bs-toggle="modal" data-bs-target="#modal${index}" class="btn btn-primary w-100">
          Statistics
        </button>
      </div>

      <div class="modal fade" id="modal${index}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">${pokemon.name} Statistics</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <img src="${pokemon.sprites.front_default}" class="card-img-top float-start" id="modal-img" alt="..." />
            <div class="text-start">
              <strong>Abilities</strong>
              ${pokemon.abilities.map(a => '<li>'+a.ability.name+'</li>').join(' ')}
              <p><strong>Experience:</strong> ${pokemon.base_experience}</p>
              <p><strong>Height:</strong> ${pokemon.height}</p>
              <p><strong>Weight:</strong> ${pokemon.weight}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    pokeList.appendChild(pokeCard);
  });
}

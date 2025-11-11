const pokemonContainer = document.getElementById('pokemonContainer');
const searchInput = document.getElementById('searchInput');
const maxPokemon = 50;

async function fetchPokemon(id) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();
        displayPokemon(data);
    } catch (error) {
        console.error('Error fetching Pokemon:', error);
    }
}

function displayPokemon(pokemon) {
    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    card.innerHTML = `
        <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}" />
        <h2>${pokemon.name}</h2>
        <p><strong>ID:</strong> #${pokemon.id}</p>
        <p><strong>Type:</strong> ${pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}</p>
        <p><strong>Weight:</strong> ${pokemon.weight}</p>
    `;

    pokemonContainer.appendChild(card);
}

function clearDisplay() {
    pokemonContainer.innerHTML = '';
}

function fetchAllPokemon() {
    clearDisplay();
    for (let i = 1; i <= maxPokemon; i++) {
        fetchPokemon(i);
    }
}

searchInput.addEventListener('input', async () => {
    const query = searchInput.value.toLowerCase().trim();
    if (!query) {
        fetchAllPokemon();
    } else {
        clearDisplay();
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
            if (!res.ok) throw new Error('No Pokémon found.');
            const data = await res.json();
            displayPokemon(data);
        } catch (error) {
            console.error(error);
        }
    }
});

fetchAllPokemon();

const output = document.getElementById('output');
const btn = document.getElementById('searchPokemon');

async function searching(inp) {
    const url = "https://pokeapi.co/api/v2/pokemon/";
    const response = await fetch(`${url}${inp}`);
    const data = await response.json();

    console.log(data);

    output.innerHTML = `
        <img src=${data.sprites.front_default} height="200px" width="200px">
        <p>Name: ${data.forms[0].name}</p>
        <p>Height: ${data.height}</p>
    `;
}

btn.addEventListener('click', (e) => {
    const input = document.getElementById('pokeSearch').value.trim();
    e.preventDefault();
    // console.log(input);

    searching(input);
});
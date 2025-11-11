
const button = document.getElementById("btn");
const output = document.getElementById("output");
async function fetchFood(text) {
    const appid = "9f3a1774";
    const appkey = "f7f33ef8d4256c8800ef156d80648861";
    user_id = "vamsipaidi123"
    const base_url = "https://api.edamam.com/api/recipes/v2?type=public&q=";
    const promise = await fetch(`${base_url}${text}&app_id=${appid}&app_key=${appkey}`, {
        method: 'GET',
        headers: {
            'Edamam-Account-User': user_id
        }
    });

    const response = await promise.json();
    const data = response.hits;
    console.log(data);
    data.forEach(element => {
        output.innerHTML += `
    <p>Data:${element.recipe.label}</p>`

    });




}

button.addEventListener("click", (e) => {
    const text = document.getElementById("text").value.trim();
    e.preventDefault();
    fetchFood(text);

})

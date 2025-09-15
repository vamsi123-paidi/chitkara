let card_container = document.getElementById("card_container");
let error = document.getElementById("error");
let fav_page = document.getElementById("fav_page");
let def = document.getElementById("default");
let popup = document.getElementById("popup");

let base_url = "https://api.edamam.com/api/recipes/v2?type=public&q=";
let app_id = "7dd6019a";
let app_key = "6590950a2feb62b72643c867b30b3802";

async function check(recipes) {
    try {
        def.innerHTML = "";
        error.innerHTML = "";
        let response = await fetch(`${base_url}${recipes}&app_id=${app_id}&app_key=${app_key}`);
        let data = await response.json();
        let matches = data.hits;
        console.log(data)

        card_container.innerHTML = "";

        for (let i = 0; i < matches.length; i++) {
            let card = document.createElement("div");
            card.setAttribute("class", "card_items");
            card.setAttribute("data-value", `${i}`);
            let imgurl = matches[i].recipe.image;
            card.innerHTML = `
                <div class="image">
                    <img src="${imgurl}" alt="wait"> 
                </div>
                <div class="calories">
                    <h2 class="heading">${matches[i].recipe.label}</h2>
                    <h4 class="details"><strong>Calories:-</strong>${matches[i].recipe.calories.toFixed(3)}</h4>
                    <h4 class="details"><strong>CuisineType:-</strong>${matches[i].recipe.cuisineType[0]}</h4>
                </div>
                <div class="buttons">
                    <button class="instructions">Instructions</button>
                    <button type="button" class="ingredients" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Ingredients</button>
                </div>
            `;
            card_container.appendChild(card);
        }

        document.querySelectorAll(".instructions").forEach((button) => {
            button.addEventListener("click", function () {
                let key = this.parentElement.parentElement.getAttribute("data-value");
                let instruction_link = matches[key].recipe.url;
                window.location.href = `${instruction_link}`;
            });
        });

        // fav_page.addEventListener("click", () => {
        //     window.location.href = "favorites.html";
        // });

        document.querySelectorAll(".ingredients").forEach((button) => {
            button.addEventListener("click", function (e) {
                e.preventDefault();
                let key = this.parentElement.parentElement.getAttribute("data-value");
                let ingredients = matches[key].recipe.ingredients;
                popup.innerHTML = "";
                for (let i = 0; i < ingredients.length; i++) {
                    popup.innerHTML += `<div><strong>${ingredients[i].food}:-</strong> ${ingredients[i].text}</div>`;
                }
            });
        });

    } catch {
        card_container.innerHTML = "";
        def.innerHTML = "";
        error.innerHTML = "";
        let error_data = document.createElement("div");
        error_data.setAttribute("id", "error_div");
        error_data.innerHTML = `
            <h3>Something</h3>
            <img src="img/th-removebg-preview.png" alt="Error Image" width="400" height="400">
            <h3>Went wrong</h3>
        `;
        error.appendChild(error_data);
    }
}

let searched_data = document.getElementById("search_input");
let search_btn = document.getElementById("search");

search_btn.addEventListener("click", (e) => {
    e.preventDefault();
    let ext_data = searched_data.value;
    check(ext_data);
});

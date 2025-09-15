const inputButton = document.getElementById("inputButton")
const apiKey = "28933cea050d87745f7a78373b5af88a"
async function HandleFetch(weather){
    const output = document.getElementById("output")
    const response =await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${weather}&appid=${apiKey}`)
    const data =await response.json();
    console.log(data)
    output.innerHTML=`
        <p>${data.main.temp}</p>
    `
}

inputButton.addEventListener("click",(e)=>{
    e.preventDefault();
const weather=document.getElementById("cityName").value.trim();
   HandleFetch(weather)
})
let button = document.getElementById("submit-button");
let showContainer = document.getElementById("show-container");
let input = document.getElementById("input-box");

let heroes = null;
let favourites = [];
let favID = null;


document.addEventListener("click", function (e){
    
    console.log(e.target)

    if(e.target.id == "close"){
        console.log("close")
    popup[0].style.display = "none";
    }
    
    if(e.target.tagName == "IMG"){
        let currHeroId = e.target.id;
        popup[0].style.display = "flex";
        let currHero = heroes.data.results.filter(function (hero){
            return hero.id == currHeroId;
        });
        console.log(currHero[0]);
        popup[0].innerHTML = `<div id = "close">Close</div>`
        popup[0].innerHTML += `<div class = "hero-card"}>
        <img class = "hero-image" id = ${currHero[0].id.toString()} src = ${currHero[0].thumbnail.path.toString()}.${currHero[0].thumbnail.extension.toString()}></img>
        <p>${currHero[0].name}</p><p>Description: ${currHero[0].description}</p><p>No. of Comics: ${currHero[0].comics.items.length}</p>
        </div>`
        console.log(currHero[0])
    }

    if(e.target.innerHTML == "Add to Favourites"){
    console.log(e.target.innerHTML);
    e.target.innerHTML = "Remove from Favourites";
    favID = e.target.id;
    let newFav = heroes.data.results.filter(function(hero){
        return hero.id == favID;
    })
    favourites.push(newFav[0]);
    newFav = [];
    return;
}

if(e.target.innerHTML == "Remove from Favourites"){
    console.log("remove");
    e.target.innerHTML = "Add to Favourites";
    let newFavourites = favourites.filter(function(hero){
        return hero.id != e.target.id;
    });
    favourites = newFavourites;
    return;
}

    if(e.target.id == "render-favs"){
        showContainer.innerHTML = "";
        for(let i = 0; i < favourites.length; i++){
            showContainer.innerHTML += `<div class = "hero-card"}>
        <img class = "hero-image" id = ${favourites[i].id.toString()} src = ${favourites[i].thumbnail.path.toString()}.${favourites[0].thumbnail.extension.toString()}></img>
        <p>${favourites[i].name}</p><p class = "fav" id = ${favourites[i].id.toString()}>Remove from Favourites</p>
        </div>`
        }
        return;
    }
})

let date = new Date();

const [timestamp, apiKey, hashValue] = [ts, publicKey, hashVal];

function getHeroes(search){
fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${search}&ts=1695094539863&apikey=151656caad48b4d2f1b22806c28ff549&hash=0f7bd6992211fa571f2319e1c5a4bb25`)
.then(function(response){
    return response.json();
}).then(function (data){
    console.log(data);
    heroes = data;
    renderHeroes(heroes);
})}

button.addEventListener("click", function(){
    let search = input.value;
    showContainer.innerHTML = ""
    getHeroes(search);
})

function renderHeroes(heroes){
    for(let i = 0; i < heroes.data.results.length; i++){
    showContainer.innerHTML += `<div class = "hero-card"}>
        <img class = "hero-image" id = ${heroes.data.results[i].id.toString()} src = ${heroes.data.results[i].thumbnail.path.toString()}.${heroes.data.results[0].thumbnail.extension.toString()}></img>
        <p>${heroes.data.results[i].name}</p><p class = "fav" id = ${heroes.data.results[i].id.toString()}>Add to Favourites</p>
        </div>`
    }

    let lol = document.getElementsByClassName("fav");
    for(let i = 0; i < lol.length; i++){
        if(favourites.some(obj => obj.id == lol[i].id) == true){
            lol[i].innerHTML = "Remove from Favourites"
        }
    }
}

// popup

let close = document.getElementById("close");
let popup = document.getElementsByClassName("popup");
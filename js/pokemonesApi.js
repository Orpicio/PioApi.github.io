const API_ALBUM = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=60";


function getAlbum(api) {
    fetch(api)
    .then((response) => response.json())
    .then((json) => {
// Llamo a fillData con los detalles de cada Pokémon porq si no, Solo llama los Nombres
            const pokemonDetails = json.results.map((pokemon) => fetch(pokemon.url).then((res) => res.json()));
            Promise.all(pokemonDetails).then((details) => fillData(details));
            pagination(json);
})


.catch((error) => {
// Para informar que ocurre un error 7u7
    console.error("Error consumiendo la API", error);
});


}
function fillData(pokemonDetails) {
    let cards = "";
    pokemonDetails.forEach((pokemon) => {
        cards += `
        <div class="col">
            <div class="card h-100" style="width: 12rem; display: flex; flex-direction: column; justify-content: space-between;">
                <div class="card-body">
                    <h2 class="card-title">${pokemon.name}</h2>
                    <h5 class="card-title">Status: ${pokemon.stats[0].base_stat} LV </h5>
                    <h5 class="card-title">Species: ${pokemon.species.name} </h5>
                    <h5 class="card-title">PokeDex ID: ${pokemon.id} </h5>
                </div>
                <img src="${pokemon.sprites.front_default}" class="card-img-bottom" alt="img-pokemon">
            </div>
        </div>`;
    });
    document.getElementById("dataAlbum").innerHTML = cards;
}


function pagination(info) {
    let prevDisabled = "";
    let nextDisabled = "";

    if (!info.previous) {
        prevDisabled = "disabled";
    }
    if (!info.next) {
        nextDisabled = "disabled";
}


let html = `
    <li class="page-item ${prevDisabled}">
        <a class="page-link" onclick="getAlbum('${info.previous}')">Prev</a>
    </li>
    <li class="page-item ${nextDisabled}">
        <a class="page-link" onclick="getAlbum('${info.next}')">Next</a>
    </li>`;
    document.getElementById("pagination").innerHTML = html;
}


getAlbum(API_ALBUM);
// Yasta se logro yeiii
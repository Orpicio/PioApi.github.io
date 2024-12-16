//Java para los animes
const API_BASE = "https://api.jikan.moe/v4/anime";

function getAlbum(api) {
    fetch(api)
        .then((response) => response.json())
        .then((json) => {
            fillData(json.data);
            pagination(json.pagination);
        })
        .catch((error) => {
            console.error("Error consumiendo la API", error);
        });
}

function fillData(animeList) {
    let cards = "";
    animeList.forEach((anime) => {
        cards += `
            <div class="col">
                <div class="card h-100" style="width: 14rem;">
                    <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}">
                    <div class="card-body">
                        <h5 class="card-title">${anime.title}</h5>
                        <p class="card-text">Episodios: ${anime.episodes || "Desconocido"}</p>
                        <a href="${anime.url}" class="btn btn-primary" target="_blank">Más info aquí</a>
                    </div>
                </div>
            </div>`;
    });
    document.getElementById("dataAlbum").innerHTML = cards;
}

function pagination(info) {
    let prevDisabled = info.prev_page ? "" : "disabled";
    let nextDisabled = info.has_next_page ? "" : "disabled";

    let html = `
        <li class="page-item ${prevDisabled}">
            <a class="page-link" onclick="getAlbum('${API_BASE}?page=${info.current_page - 1}')">Prev</a>
        </li>
        <li class="page-item ${nextDisabled}">
            <a class="page-link" onclick="getAlbum('${API_BASE}?page=${info.current_page + 1}')">Next</a>
        </li>`;
    document.getElementById("pagination").innerHTML = html;
}

function searchAnime(event) {
    event.preventDefault(); // Evita que la página se recargue
    const query = document.getElementById("searchInput").value.trim(); // Obtén el texto de búsqueda
    if (query) {
        getAlbum(`${API_BASE}?q=${query}`); // Realiza la búsqueda en la API
    } else {
        alert("Por favor, ingresa un nombre para buscar.");
    }
}

// Carga inicial
getAlbum(API_BASE);

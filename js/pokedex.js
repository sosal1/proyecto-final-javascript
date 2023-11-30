const pokeNombre = document.querySelector(".poke-pokedex-pokemon-nombre");
const pokeNro = document.querySelector(".poke-pokedex-pokemon-numero");
const pokeImg = document.querySelector(".pokemon-pkx");
const pokeMas = document.querySelector(".poke-pokedex-pokemon-descripcion");

const formulario = document.querySelector(".formulario");
const buscadorPokedex = document.querySelector(".buscador-pokedex");
const btnPrev = document.querySelector(".anterior");
const btnNext = document.querySelector(".siguiente");

let buscarPokemon = 1;

let nombre = localStorage.getItem("nombre");

    if (nombre) {
        let nombreLink = document.getElementById("nombreLink");
        nombreLink.textContent = nombre;
    }

const fetchPokemon = async (pokemon) => {
    const API = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

    if (API.status === 200) {
        const data = await API.json();
        return data;
    }
}

const verPokemon = async (pokemon) => {

    pokeNombre.innerHTML = 'Cargando...';
    pokeNro.innerHTML = '';

    const data = await fetchPokemon(pokemon);

    if (data) {
        pokeNombre.innerHTML = data.name;
        pokeNro.innerHTML = data.id;
        pokeMas.innerHTML = '';

        if (data.abilities.length > 0) {
            const primeraHabilidad = data.abilities[0];
            const habilidadDetalle = await fetch(primeraHabilidad.ability.url);
            if (habilidadDetalle.status === 200) {
                const habilidadData = await habilidadDetalle.json();
                let descripcion = "No se encontró una descripción en español para la primera habilidad.";

                const descripcionEspanol = habilidadData.flavor_text_entries.find(entry => entry.language.name === "es");
                if (descripcionEspanol) {
                    descripcion = `${descripcionEspanol.flavor_text}`;
                }

                const nombreHabilidad = habilidadData.names.find(name => name.language.name === "es");
                pokeMas.innerHTML = `<p class="poke-pokedex-pokemon-habilidad">${nombreHabilidad.name}: </p> ${descripcion}`;
            } else {
                pokeMas.innerHTML = "Error al cargar la descripción de la habilidad.";
            }
        }


        pokeImg.src = data.sprites.versions["generation-v"]["black-white"]["animated"]["front_default"];
        buscadorPokedex.value = "";
        buscarPokemon = data.id;
    } else {
        pokeNombre.innerHTML = "Pokemon no encontrado";
        pokeNro.innerHTML = "";
        pokeImg.setAttribute('src', '../img/unown.png');
        pokeMas.innerHTML = "";
    }
}



formulario.addEventListener("submit", (evt) => {
    evt.preventDefault();
    verPokemon(buscadorPokedex.value.toLowerCase());
});


btnPrev.addEventListener("click", () => {
    if (buscarPokemon > 1) {
        buscarPokemon -= 1;
        verPokemon(buscarPokemon);
    }
});

btnNext.addEventListener("click", () => {
    if (buscarPokemon < 649) {
        buscarPokemon += 1;
        verPokemon(buscarPokemon);
    }
});

verPokemon(buscarPokemon);
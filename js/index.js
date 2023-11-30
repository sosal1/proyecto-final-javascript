document.addEventListener("DOMContentLoaded", function () {
    const mostrarMenuBtn = document.querySelector(".mostrar-menu");
    const menuRetractil = document.querySelector(".menu-retractil");

    mostrarMenuBtn.addEventListener("click", function () {
        menuRetractil.classList.toggle("busqueda-avanzada-activada");
    });
});


const btnTipos = document.querySelectorAll(".btn-tipo");

btnTipos.forEach(btnTipo => {
    btnTipo.addEventListener("click", () => {
        const tipoPoke = btnTipo.classList[1];

        if (tipoPoke === "all") {
            tarjetaPokemon.innerHTML = "";
            pokemonData.forEach(pokemon => mostrarPokemon(pokemon));
        } else {
            const resultados = pokemonData.filter(pokemon => {
                const tipos = pokemon.types.map(type => type.type.name);
                return tipos.includes(tipoPoke);
            });

            tarjetaPokemon.innerHTML = "";
            resultados.forEach(pokemon => mostrarPokemon(pokemon));
        }
    });
});

const buscadorIndex = document.querySelector(".buscador-pokemon-index");
const formIndex = document.querySelector(".buscador-pokemon");

buscadorIndex.addEventListener('keydown', (evt) => {
    if (evt.key === "Enter") {
        evt.preventDefault();
        const busquedaIndex = buscadorIndex.value.toLowerCase();
        const resultado = pokemonData.filter(pokemon => {
            const nomrbrePokemon = pokemon.name.toLowerCase();
            const numeroPokemon = pokemon.id.toString();
            return nomrbrePokemon.includes(busquedaIndex) || numeroPokemon.includes(busquedaIndex);
        });
        tarjetaPokemon.innerHTML = "";
        if (resultado.length > 0) {
            resultado.forEach(pokemon => mostrarPokemon(pokemon));
        } else {
            const h2 = document.createElement("h2");
            h2.classList.add("poke-card");
            h2.innerHTML = `<h2>Error, no hay coincidencias con su búsqueda.</h2>`
            tarjetaPokemon.append(h2);
        }
    }
});
formIndex.addEventListener('submit', (evt) => {
    evt.preventDefault();
});



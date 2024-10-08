const fetchItems = async (API_URL) => {
    try {
        const respuesta = await fetch(API_URL);
        return await respuesta.json();
    } catch (error) {
        console.log(error);
    }
};

//Enter en la barra de busqueda
var input = document.getElementById("inputBuscar");
input.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("btnBuscar").click();
    }
});


//funcionalidad Buscador
document.getElementById("btnBuscar").addEventListener("click", (e) => {
    inputBuscar = document.getElementById("inputBuscar").value
    const API_URL = `https://images-api.nasa.gov/search?q=${inputBuscar}`
    fetchItems(API_URL).then((data) => {
        searchData = data;
        console.log(searchData);
        showItem(searchData);
    });
})


//Muestra resultados
const showItem = (searchData) => {
    const contenedor = document.getElementById("contenedor");
    contenedor.innerHTML = "";
    console.log(searchData)
    let item = searchData.collection.items

    for (let i = 0; i < searchData.collection.metadata.total_hits; i++) {
        //Cambia el formato 
        const dateCreated = item[i].data[0].date_created;
        const date = new Date(dateCreated);
        const options = {
            year: "numeric",
            month: "long",
            day: "numeric",
        };
        const readableDate = date.toLocaleDateString("es-ES", options);

        const card = document.createElement("div");
        card.classList.add("col-md-4","col-sm-12");
        card.innerHTML = `
          <div class="card mb-4 shadow">
            <img src="http://images-assets.nasa.gov/image/${item[i].data[0].nasa_id}/${item[i].data[0].nasa_id}~thumb.jpg" alt="${item[i].data[0].title}" style="height: 12rem" class="card-img-top object-fit-scale border rounded">
            <div class="card-body">
              <h5 class="card-title">${item[i].data[0].title.length > 20 ? item[i].data[0].title.substring(0, 36) + "..." : item[i].data[0].title}</h5>
              <p class="overflow-auto" style="height: 10rem">${item[i].data[0].description}</p>
            </div>
            <div class="card-footer">
                <small class="text-muted">${readableDate}</small>
            </div>
          </div>
        `;

        contenedor.appendChild(card);
    };
}
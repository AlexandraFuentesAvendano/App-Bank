const input = document.querySelector(".filter");

$(() => {

    getCategories().then((data) => {


        const categorySelect = $("#category")

        data.forEach(category => {
            const option = $(`
                <option value="${category.id}">${category.name}</option>
            `)
            categorySelect.append(option)
        });
    })
})

const getCategories = async() => {
    const response = await fetch("http://localhost:3000/categories")

    if (!response.ok) {
        throw new Error("something gone wrong while getting categories")
    }

    return response.json()
}

const filter = document.getElementById("filter");
const accountSelect = document.getElementById("accountSelect");
const transTypeSelect = document.getElementById("transTypeSelect");
const categorySelect = document.getElementById("categorySelect");
const transactionRows = document.querySelectorAll("#transactionTable tbody tr");

filter.addEventListener("change", function() {
    const selectedValue = filter.value;

    // Mostrar o ocultar los botones según la opción seleccionada
    if (selectedValue === "Username") {
        accountButton.style.display = "block";
        transTypeButton.style.display = "none";
        categoryButton.style.display = "none";
    } else if (selectedValue === "transType") {
        accountButton.style.display = "none";
        transTypeButton.style.display = "block";
        categoryButton.style.display = "none";
    } else if (selectedValue === "category") {
        accountButton.style.display = "none";
        transTypeButton.style.display = "none";
        categoryButton.style.display = "block";
    } else {
        // En caso de que se seleccione la opción "All"
        accountButton.style.display = "none";
        transTypeButton.style.display = "none";
        categoryButton.style.display = "none";
    }
    filterTable();
});
accountSelect.addEventListener("change", function() {
    // Llamar a la función filterTable() después de cambiar el filtro de cuenta
    filterTable();
});

transTypeSelect.addEventListener("change", function() {
    // Llamar a la función filterTable() después de cambiar el filtro de tipo de transacción
    filterTable();
});

categorySelect.addEventListener("change", function() {
    // Llamar a la función filterTable() después de cambiar el filtro de categoría
    filterTable();
});

function filterTable() {
    const accountValue = accountSelect.value;
    const transTypeValue = transTypeSelect.value;
    const categoryValue = categorySelect.value;

    // Iterar sobre todas las filas de la tabla
    transactionRows.forEach(row => {
        const username = row.cells[1].textContent;
        const transType = row.cells[2].textContent;
        const category = row.cells[3].textContent;

        // Verificar si la fila cumple con los criterios de filtro
        const accountMatch = accountValue === "" || username === accountValue;
        const transTypeMatch = transTypeValue === "" || transType === transTypeValue;
        const categoryMatch = categoryValue === "" || category === categoryValue;

        // Mostrar u ocultar la fila según los criterios de filtro
        if (accountMatch && transTypeMatch && categoryMatch) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
}
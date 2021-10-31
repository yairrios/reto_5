/*********** Inicio funciones Categorias *************/
//// GET
function traerInformacionCategorias() {
    $.ajax({
        url: "http://132.226.246.98:8081/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta) {

    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr class='table-active'>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Descripcion</th>";
    myTable += "<th>Acciones</th>";
    myTable += "</tr>";
    myTable += "</thead>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td>" +
        "<button id='btnEliminar' class='btn btn-danger' onclick='borrarElementoCate(" + respuesta[i].id + ")'><b>Eliminar</b></button>"
        +" "+
        "<button id='btnActualizar' class='btn btn-warning' onclick='editarInformacionCate(" + respuesta[i].id + ")''><b>Editar</b></button>"
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoCategoria").html(myTable);
}//// Fin GET

//// Post
function guardarInformacionCategorias() {
    let var2 = {
        name: $("#Catename").val(),
        description: $("#Catedescription").val()
    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),

        url: "http://132.226.246.98:8081/api/Category/save",


        success: function (response) {
            console.log(response);
            traerInformacionCategorias();
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");
        }
    });
} //// fin Post

//// DELETE
function borrarElementoCate(idCategoria) {
    let var2 = {
        id: idCategoria
    };
    $.ajax({
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var2),

        url: "http://132.226.246.98:8081/api/Category/"+idCategoria,


        success: function (response) {
            console.log(response);
            traerInformacionCategorias();
            console.log("Se elimino correctamente");
            alert("Se elimino correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se elimino, validar");
        }
    });
}//// Fin DELETE


//// PUT
function editarInformacionCate(idCategoria) {
    let var2 = {
        id : idCategoria,
        name: $("#Catename").val(),
        description: $("#Catedescription").val(),
    };

    console.log(var2);
    let dataToSend = JSON.stringify(var2);
    $.ajax({
        url: "http://132.226.246.98:8081/api/Category/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (response) {
            $("#resultadoCategoria").empty();
            $("#Catename").val("");
            $("#Catedescription").val("");
            traerInformacionCategorias();
            alert("se ha actualizado correctamente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se actualizó, por favor valide");
        }
    });   
}//// Fin PUT

/*************** fin funciones categorias ****************/


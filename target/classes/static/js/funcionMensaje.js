/******************inicio funciones Mensajes ***************/

//// GET
function traerInformacionMensaje() {
    $.ajax({
        url: "http://132.226.246.98:8081/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaMensaje(respuesta);
        }
    });
}

function pintarRespuestaMensaje(respuesta) {

    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr class='table-active'>";
    myTable += "<th>Mensaje</th>";
    myTable += "</tr>";
    myTable += "</thead>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].messageText + "</td>";
        myTable += "<td>" +
        "<button id='btnEliminar' class='btn btn-danger' onclick='borrarElementoMensaje(" + respuesta[i].idMessage + ")'><b>Eliminar</b></button>"
        +" "+
        "<button id='btnActualizar' class='btn btn-warning' onclick='editarInformacionMensaje(" + respuesta[i].idMessage + ")''><b>Editar</b></button>"
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoMensaje").html(myTable);
}//// Fin GET

//// POST
function guardarInformacionMensaje() {
    let var5 = {
        messageText: $("#MessageText").val(),
    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var5),

        url: "http://132.226.246.98:8081/api/Message/save",


        success: function (response) {
            console.log(response);
            traerInformacionMensaje();
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");


        }
    });

}//// Fin POST

//// DELETE
function borrarElementoMensaje(idMensaje) {
    let var5 = {
        idMessage: idMensaje
    };
    $.ajax({
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var5),

        url: "http://132.226.246.98:8081/api/Message/"+idMensaje,


        success: function (response) {
            console.log(response);
            traerInformacionMensaje();
            console.log("Se elimino correctamente");
            alert("Se elimino correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se elimino, por favor valide");
        }
    });
}//// Fin DELETE


//// PUT
function editarInformacionMensaje(idMensaje) {
    let var5 = {
        idMessage : idMensaje,
        messageText: $("#MessageText").val(),
    };

    console.log(var5);
    let dataToSend = JSON.stringify(var5);
    $.ajax({
        url: "http://132.226.246.98:8081/api/Message/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (response) {
            $("#resultadoMensaje").empty();         
            $("#MessageText").val("");
            traerInformacionMensaje();
            alert("se ha actualizado correctamente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se actualizó, validar");
        }
    });   
}//// Fin PUT

/******************** fin funciones mensajes **********************/

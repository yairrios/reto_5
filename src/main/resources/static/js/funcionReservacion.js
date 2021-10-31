/******************inicio funciones Reservaciones ***************/

//// GET
function traerInformacionReservacion() {
    $.ajax({
        url: "http://132.226.246.98:8081/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaReservacion(respuesta);
        }
    });
}

function pintarRespuestaReservacion(respuesta) {

    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr class='table-active'>";
    myTable += "<th>Fecha de Inicio</th>";
    myTable += "<th>Fecha de devolución</th>";
    myTable += "</tr>";
    myTable += "</thead>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].startDate + "</td>";
        myTable += "<td>" + respuesta[i].devolutionDate + "</td>";
        myTable += "<td>" +
        "<button id='btnEliminar' class='btn btn-danger' onclick='borrarElementoReserva(" + respuesta[i].idReservation + ")'><b>Eliminar</b></button>"
        +" "+
        "<button id='btnActualizar' class='btn btn-warning' onclick='editarInformacionReserva(" + respuesta[i].idReservation + ")''><b>Editar</b></button>"
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoReserva").html(myTable);
}//// FIn GET

//// POST
function guardarInformacionReservacion() {
    let var6 = {
        startDate: $("#ReservaStartdate").val(),
        devolutionDate: $("#ReservaDevolution").val(),
    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var6),

        url: "http://132.226.246.98:8081/api/Reservation/save",


        success: function (response) {
            console.log(response);
            traerInformacionReservacion();
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
function borrarElementoReserva(idReserva) {
    let var6 = {
        idReservation: idReserva
    };
    $.ajax({
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var6),

        url: "http://132.226.246.98:8081/api/Reservation/"+idReserva,


        success: function (response) {
            console.log(response);
            traerInformacionReservacion();
            console.log("Se elimino correctamente");
            alert("Se elimino correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se elimino, por favor valide");
        }
    });
}//// Fin DELETE

//// PUT
function editarInformacionReserva(idReserva) {
    let var6 = {
        idReservation : idReserva,        
        startDate: $("#ReservaStartdate").val(),
        devolutionDate: $("#ReservaDevolution").val(),
    };

    console.log(var6);
    let dataToSend = JSON.stringify(var6);
    $.ajax({
        url: "http://132.226.246.98:8081/api/Reservation/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (response) {
            $("#resultadoReserva").empty();
            $("#ReservaStartdate").val("");
            $("#ReservaDevolution").val("");
            traerInformacionReservacion();
            alert("se ha actualizado correctamente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se actualizó, validar");
        }
    });   
}//// Fin PUT


/******************** fin funciones Reservaciones **********************/

/******************inicio funciones clientes ***************/
function traerInformacionClientes() {
    $.ajax({
        url: "http://132.226.246.98:8081/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaClientes(respuesta);
        }
    });
}

function pintarRespuestaClientes(respuesta) {

    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr class='table-active'>";
    myTable += "<th>Correo Electronico</th>";
    myTable += "<th>Contraseña</th>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Edad</th>";
    myTable += "<th>Acciones</th>";
    myTable += "</tr>";
    myTable += "</thead>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].email + "</td>";
        myTable += "<td>" + respuesta[i].password + "</td>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].age + "</td>";
        myTable += "<td>" +
        "<button id='btnEliminar' class='btn btn-danger' onclick='borrarElementoClientes(" + respuesta[i].idClient + ")'><b>Eliminar</b></button>"
        +" "+
        "<button id='btnActualizar' class='btn btn-warning' onclick='editarInformacionClientes(" + respuesta[i].idClient + ")''><b>Editar</b></button>"
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoCliente").html(myTable);
}//// fin GET


//// POST
function guardarInformacionClientes() {
    let var4 = {
        email: $("#CLemail").val(),
        password: $("#CLpassword").val(),
        name: $("#CLname").val(),
        age: $("#CLage").val(),
    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var4),

        url: "http://132.226.246.98:8081/api/Client/save",


        success: function (response) {
            console.log(response);
            traerInformacionClientes();
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
function borrarElementoClientes(idCli) {
    let var4 = {
        idClient: idCli
    };
    $.ajax({
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var4),

        url: "http://132.226.246.98:8081/api/Client/"+idCli,


        success: function (response) {
            console.log(response);
            traerInformacionClientes();
            console.log("Se elimino correctamente");
            alert("Se elimino correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se elimino, por favor valide");
        }
    });
}//// Fin DELETE


//// PUT
function editarInformacionClientes(idCli) {
    let var4 = {
        idClient : idCli,        
        email: $("#CLemail").val(),
        password: $("#CLpassword").val(),
        name: $("#CLname").val(),
        age: $("#CLage").val(),
    };

    console.log(var4);
    let dataToSend = JSON.stringify(var4);
    $.ajax({
        url: "http://132.226.246.98:8081/api/Client/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (response) {
            $("#resultadoCliente").empty();
            $("#CLemail").val("");
            $("#CLpassword").val("");            
            $("#CLname").val("");            
            $("#CLage").val("");
            traerInformacionClientes();
            alert("se ha actualizado correctamente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se actualizó, validar");
        }
    });   
}//// Fin PUT



/******************** fin funciones clientes **********************/

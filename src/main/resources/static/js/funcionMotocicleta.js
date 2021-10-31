/********** inicio funciones Motorbike **************/

function traerInformacionMotorbike() {
    $.ajax({
        url: "http://132.226.246.98:8081/api/Motorbike/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            pintarRespuestaMotorbike(respuesta);
        }
    });
}

function pintarRespuestaMotorbike(respuesta) {

    let myTable = "<table>";
    myTable += "<thead>";
    myTable += "<tr class='table-active'>";
    myTable += "<th>Nombre</th>";
    myTable += "<th>Marca</th>";
    myTable += "<th>Año</th>";
    myTable += "<th>Descripcion</th>";
    myTable += "<th>Acciones</th>";
    myTable += "</tr>";
    myTable += "</thead>";
    for (i = 0; i < respuesta.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + respuesta[i].name + "</td>";
        myTable += "<td>" + respuesta[i].brand + "</td>";
        myTable += "<td>" + respuesta[i].year + "</td>";
        myTable += "<td>" + respuesta[i].description + "</td>";
        myTable += "<td>" +
        "<button id='btnEliminar' class='btn btn-danger' onclick='borrarElementoMoto(" + respuesta[i].id + ")'><b>Eliminar</b></button>"
        +" "+
        "<button id='btnActualizar' class='btn btn-warning' onclick='editarInformacionMoto(" + respuesta[i].id + ")''><b>Editar</b></button>"
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#resultadoMoto").html(myTable);
}//// FIN GET


//// POST
function guardarInformacionMotorbike() {
    let var3 = {
        name: $("#Motoname").val(),
        brand: $("#Motobrand").val(),
        year: $("#Motoyear").val(),
        description: $("#Motodescription").val(),
    };

    $.ajax({
        type: 'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),

        url: "http://132.226.246.98:8081/api/Motorbike/save",


        success: function (response) {
            console.log(response);
            traerInformacionMotorbike();
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se guardo correctamente");


        }
    });
}//// fin POST


//// DELETE
function borrarElementoMoto(idMoto) {
    let var3 = {
        id: idMoto
    };
    $.ajax({
        type: 'DELETE',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(var3),

        url: "http://132.226.246.98:8081/api/Motorbike/"+idMoto,


        success: function (response) {
            console.log(response);
            traerInformacionMotorbike();
            console.log("Se elimino correctamente");
            alert("Se elimino correctamente");

        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se elimino, por favor valide");
        }
    });
}//// Fin DELETE


//// PUT
function editarInformacionMoto(idMoto) {
    let var3 = {
        id : idMoto,        
        name: $("#Motoname").val(),
        brand: $("#Motobrand").val(),
        year: $("#Motoyear").val(),
        description: $("#Motodescription").val(),
    };

    console.log(var3);
    let dataToSend = JSON.stringify(var3);
    $.ajax({
        url: "http://132.226.246.98:8081/api/Motorbike/update",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (response) {
            $("#resultadoMoto").empty();
            $("#Motoname").val("");
            $("#Motobrand").val("");            
            $("#Motoyear").val("");            
            $("#Motodescription").val("");
            traerInformacionMotorbike();
            alert("se ha actualizado correctamente")
        },
        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se actualizó, validar");
        }
    });   
}//// Fin PUT

/******************** fin funciones motorbike ****************/




function CargarCategorias(){
    var datos;
    $.ajax({
        url:"http://132.226.246.98:8081/api/Category/all",
        type:"GET",
        async: false,
        datatype:"JSON",
        success:function(respuesta){
            
            const $select = document.querySelector("#Categorias");
            for (let i = $select.options.length; i >= 0; i--) {
                 $select.remove(i);
                }
            datos=respuesta;
            console.log(datos.length);
            for(let i=0;i<datos.length;i++){
                console.log(datos[i].id);
                const option = document.createElement('option');
                option.value = datos[i].id;
                  option.text = datos[i].name;
                   $select.appendChild(option);
            }
        }
        });
}   
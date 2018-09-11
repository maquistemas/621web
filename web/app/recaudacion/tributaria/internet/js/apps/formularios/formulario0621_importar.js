

//*****************************************************************************************
//******************************* FUNCIONALIDAD CASILLA 685-687 ***************************
//*****************************************************************************************



//*** jDelacruz
$("#btnAceptar685").click(function () {
    var c685 = document.getElementById('casilla685').value;
    var c684 = document.getElementById('casilla684').value;
    var c171 = 0.00;
    c171 = (Number(c684) + Number(c685));
    document.getElementById('casilla171').value = c171;
});

$("#btnAceptar687").click(function () {
    var c686 = document.getElementById('casilla686').value;
    var c687 = document.getElementById('casilla687').value;
    var c179 = 0.00;
    c179 = (Number(c686) + Number(c687));
    document.getElementById('casilla179').value = c179;
});


$("#btnGuardar171").click(function () {
    sumar_totales(identificador);
    document.getElementById('casilla685').value = suma_total_cas685;
    $('#modal685').modal('hide');
});

$("#download171").click(function () {
    uso179 = false;
    descargarArchivo();
});

$("#btnGuardar179").click(function () {
    sumar_totales(identificador);
    document.getElementById('casilla687').value = suma_total_cas687;
    $('#modal687').modal('hide');

});

$("#download179").click(function () {
    uso179 = true;
    descargarArchivo();
});

//******

//*** jDelacruz VARIABLES DE INICIO
var selectedFile;
var identificador;
var nombreArchivo;
var rucDeclarante;
var ruta;

var matriz = [];
var listaMap = [];

var suma_total_cas685 = 0.0;
var suma_total_cas687 = 0.0;
var rechazados;
var contenidoP = "", contenidoPI = "", contenidoR = "";


var RUC_USUARIO = null;
var PERIODO_DECLARADO = null;
var ANIO_PERIODO_DECLARADO = null;
var MES_PERIODO_DECLARADO = null;

var nombreArchivoCorrecto = true;
var estructuraDeFilasCorrectas = true;
var filasError = [];
var mesPeriodoDeclarado;
var uso179 = false;
//******





var formulario0621_importar = (function () {

    _limpiarVariables = function () {
        console.log('>>>>>>>>>>>>>_limpiarVariables');

        selectedFile = null;
        identificador = null;
        nombreArchivo = null;
        rucDeclarante = null;
        ruta = null;

        matriz.length = 0;
        listaMap.length = 0;
        formulario0621.listaMap_Temp_P.length = 0;
        formulario0621.listaMap_Temp_PI.length = 0;
        formulario0621.listaMap_Temp_R.length = 0;
        contenidoP = "", contenidoPI = "", contenidoR = "";
        formulario0621.nombreArchivoP = "";
        formulario0621.nombreArchivoPI = "";
        formulario0621.nombreArchivoR = "";
        formulario0621.Total_montoComprobantePercepcion = 0.00;
        formulario0621.Total_montoComprobantePago = 0.00;
        formulario0621.Total_montoComprobanteRetencion = 0.00;
        suma_total_cas685 = 0.0;
        suma_total_cas687 = 0.0;
        rechazados = null;

        RUC_USUARIO = null;
        PERIODO_DECLARADO = null;
        ANIO_PERIODO_DECLARADO = null;
        MES_PERIODO_DECLARADO = null;

        nombreArchivoCorrecto = true;
        estructuraDeFilasCorrectas = true;
        filasError.length = 0;
        mesPeriodoDeclarado = null;
        uso179 = false;
        limpiarEtiquetas_171();
        limpiarEtiquetas_179();
        self_171.items_171.removeAll();//limpiar tabla 171
        self_179.items_179.removeAll();//limpiar tabla 179
        console.log('>>>>>>>>>>>>>_limpiarVariables fin');
    };

    _extraerContenidoArreglo = function (arreglo) {
        var contenido = [];
        arreglo.forEach(function (v, k) {
            var res = {};
            var agrega = 0;
            v.forEach(function (v1, k1) {
                res[k1] = v1;
                if (v1 != null && v1 != undefined && v1 != '') {
                    agrega = agrega + 1;
                }
            });
            if (agrega > 2) {
                contenido.push(res);
            }
        });
        return contenido;
    };

    return {
        clonarList: function (lista) {
            var nueva_lista = [];
            lista.forEach(function (k, v) {
                nueva_lista.push(k);
            });
            return nueva_lista;
        },
        extraerContenido: function (arreglo) {
            /* lista de map  a lista de objetos */
            if (arreglo != null && arreglo.length > 0) {
                return _extraerContenidoArreglo(arreglo);
            }
            return arreglo;
        },
        convertirConenido: function (arreglo) {
            /* lista de objetos a lista de map */
            var resultado = [];
            console.log("\n\narreglo: ");
            console.log(arreglo);
            if (arreglo != null && arreglo.length > 0) {
                arreglo.forEach(function (v, k) {
                    var m = new Map();
                    for (var i in v) {
                        m.set(i, v[i]);
                    }
                    resultado.push(m);
                });
                console.log("::resultado");
                console.log(resultado);
                return resultado;
            }
            return arreglo;
        },
        limpiarVariables: function () {
            return   _limpiarVariables();
        }
    };
})();











document.getElementById('pdffile').onchange = function () {
    if (this.files[0].name.substring(21) == "R.txt") {
        //alert("Error al seleccionar el archivo");
        formulario0621.mostrarMensajeGeneral("Error al seleccionar el archivo");
        return;
    }

    uso179 = false;
    selectedFile = null;
    matriz.length = 0;
    listaMap.length = 0;

    selectedFile = this.files[0];
    nombreArchivo = selectedFile.name;
    identificador = nombreArchivo.substring(21);

    rucDeclarante = nombreArchivo.substring(4, 15);
    ruta = $(this).val();

    var reader = new FileReader();
    reader.onload = function (progressEvent) {
        var lines = this.result.split('\n');
        for (var line = 0; line < lines.length; line++) {
            matriz.push(lines[line]);
        }

        pushMapToArray(identificador, matriz, listaMap);
        seleccionarArchivo(selectedFile, ruta);
    };

    reader.readAsText(selectedFile);
    $("#pdffile").val('');//limpiar evento
};


document.getElementById('pdffile2').onchange = function () {

    if ((this.files[0].name.substring(21) == "P.txt") || (this.files[0].name.substring(21) == "PI.txt")) {
        //alert("Error al seleccionar el archivo");
        formulario0621.mostrarMensajeGeneral("Error al seleccionar el archivo");
        return;
    }

    uso179 = true;
    selectedFile = null;
    matriz.length = 0;
    listaMap.length = 0;

    selectedFile = this.files[0];
    nombreArchivo = selectedFile.name;
    identificador = nombreArchivo.substring(21);

    rucDeclarante = nombreArchivo.substring(4, 15);
    ruta = $(this).val();

    var reader = new FileReader();
    reader.onload = function (progressEvent) {
        var lines = this.result.split('\n');
        for (var line = 0; line < lines.length; line++) {
            matriz.push(lines[line]);
        }

        pushMapToArray(identificador, matriz, listaMap);
        seleccionarArchivo(selectedFile, ruta);
    };

    reader.readAsText(selectedFile);
    $("#pdffile2").val('');//limpiar evento
};




var self_171 = this;
self_171.items_171 = ko.observableArray([
]);

var self_179 = this;
self_179.items_179 = ko.observableArray([
]);


function modelo() {
    self_171.items_171 = ko.observableArray([
    ]);

    self_179.items_179 = ko.observableArray([
    ]);
}

$(document).ready(function () {
    ko.applyBindings(new modelo());
});


function llenarTabla(array) {

    if (uso179 == true) {
        self_179.items_179.removeAll();
        for (var i = 0; i < array.length; i++) {
            self_179.items_179.push({Fila: array[i].Fila, Detalle: array[i].Detalle});
        }

    } else {
        self_171.items_171.removeAll();
        for (var i = 0; i < array.length; i++) {
            self_171.items_171.push({Fila: array[i].Fila, Detalle: array[i].Detalle});
        }
    }

}

function getPeriodo_YYYYMM() {
    return comunLibreria.formatearPeriodoaCadena(formulario0621.obtenerValorCasilla("7"));
}


function seleccionarArchivo(selectedFile, ruta) {
    console.log('>>> ruc: ' + sessionStorage.getItem("RUC_Login"));
    PERIODO_DECLARADO = getPeriodo_YYYYMM();
    ANIO_PERIODO_DECLARADO = PERIODO_DECLARADO.substring(0, 4);
    MES_PERIODO_DECLARADO = PERIODO_DECLARADO.substring(4, 6);
    RUC_USUARIO = sessionStorage.getItem("RUC_Login");

    if (selectedFile != null) {
        nombreArchivoCorrecto = true;
        estructuraDeFilasCorrectas = true;

        var lengthNombreArchivo = selectedFile.name.length;
        if (lengthNombreArchivo < 26 || lengthNombreArchivo > 27) {
            //alert('Error al seleccionar el archivo", "Nombre del archivo incorrecto');
            formulario0621.mostrarMensajeGeneral('Error al seleccionar el archivo", "Nombre del archivo incorrecto');
            return;
        } else {
            validarNombreArchivo(selectedFile, selectedFile.name.substring(21));

            if (nombreArchivoCorrecto) {
                mesPeriodoDeclarado = parseInt(nombreArchivo.substring(19, 21).toString());
                if (seleccionRadioCorrecta(identificador)) {
                    leerArchivo_ValidarEstructura(matriz, identificador);//VALIDAR ESTRUCTURA DE FILAS

                    if (estructuraDeFilasCorrectas) {//ESTRUCTURAS CORRECTAS
                        llenarTabla_DetalleErrores(identificador);

                        if (rechazados < 1) {
                            if (identificador == "P.txt") {
                                //formulario0621.listaMap_Temp_P = [];
                                formulario0621.listaMap_Temp_P = formulario0621_importar.clonarList(listaMap);
                                sumar_montoComprobantePercepcion_P();
                                formulario0621.nombreArchivoP = nombreArchivo;
                                generarContenidoP();
                                $('#subfile').val(ruta);

                            } else if (identificador == "PI.txt") {
                                //formulario0621.listaMap_Temp_PI = [];
                                formulario0621.listaMap_Temp_PI = formulario0621_importar.clonarList(listaMap);
                                sumar_montoComprobantePago_PI();
                                formulario0621.nombreArchivoPI = nombreArchivo;
                                generarContenidoPI();
                                $('#subfile').val(ruta);

                            } else if (identificador == "R.txt") {
                                //formulario0621.listaMap_Temp_R = [];
                                formulario0621.listaMap_Temp_R = formulario0621_importar.clonarList(listaMap);
                                sumar_montoComprobanteRetencion_R();
                                formulario0621.nombreArchivoR = nombreArchivo;
                                generarContenidoR();

                                $('#subfile2').val(ruta);

                            }


                        }
                    }

                } else {
                    //alert('Error al seleccionar el archivo, Nombre del archivo incorrecto');
                    formulario0621.mostrarMensajeGeneral('Error al seleccionar el archivo, Nombre del archivo incorrecto');

                    return;

                }

            }
        }


    }

}//end seleccionarArchivo

function pushMapToArray(identificador, array, lista_Map) {

    if (uso179 == true) {

        for (var i = 0; i < array.length; i++) {
            var bar = array[i].split("|");
            for (var j = 0; j < bar.length; j++) {

                if (bar[j] != "" || bar[j] != null) {
                    var map = new Map();
                    map.set("ruc", bar[j]);
                    j++;
                    map.set("serieComprobanteRetencion", bar[j]);
                    j++;
                    map.set("numeroComprobanteRetencion", bar[j]);
                    j++;
                    map.set("fechEmiComprobanteRetencion", bar[j]);
                    j++;
                    map.set("montoComprobanteRetencion", bar[j]);
                    j++;
                    map.set("tipoComprobantePago", bar[j]);
                    j++;
                    map.set("serieComprobantePago", bar[j]);
                    j++;
                    map.set("numeroComprobantePago", bar[j]);
                    j++;
                    map.set("fechEmiComprobantePago", bar[j]);
                    j++;
                    map.set("valorTotalComprobantePago", bar[j]);
                    j++;
                    lista_Map.push(map);
                }
            }
        }

    } else {

        if (identificador == "P.txt") {

            for (var i = 0; i < array.length; i++) {
                var bar = array[i].split("|");
                for (var j = 0; j < bar.length; j++) {

                    if (bar[j] != "" || bar[j] != null) {
                        var map = new Map();
                        map.set("ruc", bar[j]);
                        j++;
                        map.set("serieComprobantePercepcion", bar[j]);
                        j++;
                        map.set("numeroComprobantePercepcion", bar[j]);
                        j++;
                        map.set("fechEmiComprobantePercepcion", bar[j]);
                        j++;
                        map.set("montoComprobantePercepcion", bar[j]);
                        j++;
                        map.set("tipoComprobantePago", bar[j]);
                        j++;
                        map.set("serieComprobantePago", bar[j]);
                        j++;
                        map.set("numeroComprobantePago", bar[j]);
                        j++;
                        map.set("fechEmiComprobantePago", bar[j]);
                        j++;
                        map.set("valorTotalComprobantePago", bar[j]);
                        j++;
                        lista_Map.push(map);
                    }
                }
            }


        } else if (identificador == "PI.txt") {

            for (var i = 0; i < array.length; i++) {
                var bar = array[i].split("|");
                for (var j = 0; j < bar.length; j++) {

                    if (bar[j] != "" || bar[j] != null) {
                        var map = new Map();
                        map.set("ruc", bar[j]);
                        j++;
                        map.set("tipoComprobantePago", bar[j]);
                        j++;
                        map.set("serieComprobantePago", bar[j]);
                        j++;
                        map.set("numeroComprobantePago", bar[j]);
                        j++;
                        map.set("fechEmiComprobantePago", bar[j]);
                        j++;
                        map.set("montoComprobantePago", bar[j]);
                        j++;
                        lista_Map.push(map);
                    }
                }
            }

        }

    }






}
;//end pushMapToArray

function validarNombreArchivo(selectedFile, identificador) {
    //Nombre del archivo: "0621" + RUC del declarante + período de la declaración + "P" + ".TXT"
    //En el periodo el mes no debe ser mayor al periodo de declaración

    var v0621 = selectedFile.name.substring(0, 4);
    var vPeriodoDeclaracion = selectedFile.name.substring(15, 21);

    var mensajeBasico = "Error al seleccionar el archivo. Nombre del archivo incorrecto";
    nombreArchivoCorrecto = true;


    if (identificador == "P.txt" || identificador == "PI.txt" || identificador == "R.txt") {
    } else {
        nombreArchivoCorrecto = false;
        //alert('Error al seleccionar el archivo. Nombre del archivo incorrecto 1');
        formulario0621.mostrarMensajeGeneral('Error al seleccionar el archivo. Nombre del archivo incorrecto 1');
        return;
    }
    if (v0621 != "0621") {
        nombreArchivoCorrecto = false;
        //alert('Error al seleccionar el archivo. Nombre del archivo incorrecto 2');
        formulario0621.mostrarMensajeGeneral('Error al seleccionar el archivo. Nombre del archivo incorrecto 2');
        return;
    }

    var lengthRucDeclarante = rucDeclarante.length;
    var inicioRucDeclarante = rucDeclarante.substring(0, 2);
    if (lengthRucDeclarante != 11) {
        nombreArchivoCorrecto = false;
        //alert('Error al seleccionar el archivo. Nombre del archivo incorrecto 3');
        formulario0621.mostrarMensajeGeneral('Error al seleccionar el archivo. Nombre del archivo incorrecto 3');
        return;
    }
    if (inicioRucDeclarante == "10" || inicioRucDeclarante == "20") {
    } else {
        nombreArchivoCorrecto = false;
        //alert('Error al seleccionar el archivo. Nombre del archivo incorrecto 3');
        formulario0621.mostrarMensajeGeneral('Error al seleccionar el archivo. Nombre del archivo incorrecto 3');
        return;
    }

    if (RUC_USUARIO != rucDeclarante) {
        nombreArchivoCorrecto = false;
        //alert('Error al seleccionar el archivo. Nombre del archivo incorrecto 4');
        formulario0621.mostrarMensajeGeneral('Error al seleccionar el archivo. Nombre del archivo incorrecto 4');
        return;
    }


    var vanio = vPeriodoDeclaracion.substring(0, 4);
    var vmes = parseInt(vPeriodoDeclaracion.substring(4, 6));


    if (vPeriodoDeclaracion != PERIODO_DECLARADO) {
        nombreArchivoCorrecto = false;
        //alert('Error al seleccionar el archivo. Nombre del archivo incorrecto 4');
        formulario0621.mostrarMensajeGeneral('Error al seleccionar el archivo. Nombre del archivo incorrecto 4');
        return;
    }


}//end validarNombreArchivo

function seleccionRadioCorrecta(identificador) {
    var flag = true;
    var cont = 0;

    if (uso179 == true) {

    } else {
        if (identificador == "R.txt" && ($("input[name=percepcion]:checked").val() == "P" || $("input[name=percepcion]:checked").val() == "PI")) {
            cont++;
        } else {
            if ($("input[name=percepcion]:checked").val() == "P" && identificador == "PI.txt") {
                cont++;
            }

            if ($("input[name=percepcion]:checked").val() == "PI" && identificador == "P.txt") {
                cont++;
            }
        }


    }


//        if(!$("input[name=percepcion]:checked").val()){
//            flag = false;
//        }  

    if (cont > 0) {
        flag = false;
    }

    return flag;
}//end seleccionRadioCorrecta

function leerArchivo_ValidarEstructura(array, identificador) {

    if (identificador == "P.txt" || identificador == "PI.txt") {
        limpiarEtiquetas_171();
    } else if (identificador == "R.txt") {
        limpiarEtiquetas_179();
    }

    var estructurasIncompletas = 0;
    var estructurasCompletas = 0;

    var filaArchivo = 1;

    var tamano_Array = array.length - 1;

    for (var i = 0; i < array.length; i++) {
        var NumeroCampos = array[i].split("|");

        if (i == tamano_Array && NumeroCampos.length - 1 == 0) {
            break;
        }

        if (identificador == "P.txt" || identificador == "R.txt") {
            if ((NumeroCampos.length - 1) != 10) {
                filasError.push(filaArchivo);
                estructurasIncompletas++;
            } else {
                estructurasCompletas++;
            }

        } else if (identificador == "PI.txt") {
            if ((NumeroCampos.length - 1) != 6) {
                filasError.push(filaArchivo);
                estructurasIncompletas++;
            } else {
                estructurasCompletas++;
            }

        }

        filaArchivo++;
    }

    var arr = []
    for (var i = 0; i < filasError.length; i++) {
        arr.push({Fila: filasError[i], Detalle: "Estructura de la fila con error"});
    }
    if (uso179 == true) {
        llenarTabla(arr);
        // llenarTablaRetenciones(arr);
    } else {
        llenarTabla(arr);
    }

    llenarRegistros_Cargados_Rechazados(estructurasCompletas, estructurasIncompletas)

    if (estructurasIncompletas > 0) {
        estructuraDeFilasCorrectas = false;
    }

}//end leerArchivo_ValidarEstructura

function limpiarEtiquetas_171() {
    filasError.length = 0;

    $(document).ready(function () {
        $('#lblRegistCargados171').text(0);
    });

    $(document).ready(function () {
        $('#lblRegistRechazados171').text(0);
    });


}


function limpiarEtiquetas_179() {
    filasError.length = 0;

    $(document).ready(function () {
        $('#lblRegistCargados179').text(0);
    });

    $(document).ready(function () {
        $('#lblRegistRechazados179').text(0);
    });

}

function llenarRegistros_Cargados_Rechazados(cargados, rechazados) {


    if (uso179 == true) {
        $(document).ready(function () {
            $('#lblRegistCargados179').text(cargados);
        });

        $(document).ready(function () {
            $('#lblRegistRechazados179').text(rechazados);
        });
    } else {
        $(document).ready(function () {
            $('#lblRegistCargados171').text(cargados);
        });

        $(document).ready(function () {
            $('#lblRegistRechazados171').text(rechazados);
        });
    }


}

function llenarTabla_DetalleErrores(identificador) {

    var fila = 1;
    var indiceRechazado;
    rechazados = 0;
    var total_Lista = listaMap.length;
    if (identificador == "P.txt") {
        limpiarEtiquetas_171();

        for (var i = 0; i < total_Lista; i++) {
            if (i == total_Lista - 1 && listaMap[i].get('ruc') == "") {//ultima fila limpia
                break;
            }

            var ruc = listaMap[i].get("ruc");
            var serieCompPerc = listaMap[i].get("serieComprobantePercepcion");
            var numeroCompPerc = listaMap[i].get("numeroComprobantePercepcion");
            var fechEmiCompPerc = listaMap[i].get("fechEmiComprobantePercepcion");
            var montoCompPerc = listaMap[i].get("montoComprobantePercepcion");
            var tipoCompPago = listaMap[i].get("tipoComprobantePago");
            var serieCompPago = listaMap[i].get("serieComprobantePago");
            var numeroCompPago = listaMap[i].get("numeroComprobantePago");
            var fechEmiCompPago = listaMap[i].get("fechEmiComprobantePago");
            var valTotalCompPago = listaMap[i].get("valorTotalComprobantePago");


            if (!validarRuc(ruc)) {
                filasError.push({Fila: fila, Detalle: "Número de RUC Invalido"});
                indiceRechazado = i;
            }

            if (!validarRucAgPercVsRucDeclarante(ruc)) {
                filasError.push({Fila: fila, Detalle: "RUC del agente igual a RUC del declarante"});
                indiceRechazado = i;
            }


            if (!validarFechEmiCompPerc(fechEmiCompPerc)) {

            } else if (!validarSerieCompPerc(serieCompPerc, fechEmiCompPerc)) {
                filasError.push({Fila: fila, Detalle: "La serie del comprobante de percepción no es válida"});
                indiceRechazado = i;
            }

            if (!validarNumeroCompPerc(numeroCompPerc)) {
                filasError.push({Fila: fila, Detalle: "El número del comprobante de percepción no es válido"});
                indiceRechazado = i;
            }

            if (!validarFechEmiCompPerc(fechEmiCompPerc)) {
                filasError.push({Fila: fila, Detalle: "La fecha de emisión del comprobante de percepción no es válida"});
                indiceRechazado = i;
            }

            if (!validarFechEmiCompPerc(fechEmiCompPerc)) {//Primero validar la fecha
            } else {
                if (!validarFechEmiCompPercMayor14_10_2002(fechEmiCompPerc)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del comprobante de percepción no puede ser menor al 14/10/2002"});
                    indiceRechazado = i;
                }

                if (!validarFechEmiCompPercMayorFechSistema(fechEmiCompPerc)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del sistema es menor a la del comprobante de percepción"});
                    indiceRechazado = i;
                }

                if (!validarFechEmiCompPercMes(fechEmiCompPerc)) {
                    filasError.push({Fila: fila, Detalle: "El mes de la fecha de emisión del comprobante de percepción es mayor que el período declarado"});
                    indiceRechazado = i;
                }

            }

//                    
//                    /*El importe del comprobante de percepción contiene letras o caracteres no validos
//                      El importe del comprobante de percepción contiene más de un punto decimal
//                      El importe del comprobante de percepción es demasiado grande
//                     */
            if (!validarMontoCompPercUnPuntoDec(montoCompPerc)) {//Un punto decimal máximo 15 Digitos(12 enteros 2 decimales)
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de percepción contiene letras o caracteres no validos, \ncontiene más de un punto decimal ó es demasiado grande"});
                indiceRechazado = i;

            } else if (!validarMontoCompPerc(montoCompPerc)) {//Cuando el importe es menor a 0.01
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de percepción no es válido"});
                indiceRechazado = i;
            }

            if (!validarFechEmiCompPago(fechEmiCompPago)) {
            } else if (!validarSerieCompPago(serieCompPago, fechEmiCompPago, tipoCompPago)) {
                filasError.push({Fila: fila, Detalle: "La serie del comprobante de pago no es válida"});
                indiceRechazado = i;
            }


            if (!validarTipoDocumento(tipoCompPago, ruc)) {
                filasError.push({Fila: fila, Detalle: "No existe el tipo de documento del comprobante de pago"});
                indiceRechazado = i;
            }

            if (!validarNumeroCompPago(numeroCompPago, tipoCompPago)) {
                filasError.push({Fila: fila, Detalle: "El número del comprobante de pago no es válido"});
                indiceRechazado = i;
            }

            if (!validarFechEmiCompPago(fechEmiCompPago)) {
                filasError.push({Fila: fila, Detalle: "La fecha de emisión del comprobante de pago no es válida"});
                indiceRechazado = i;
            }


            if (!validarFechEmiCompPago(fechEmiCompPago)) {

            } else {
                if (!validarFechEmiCompPagoMenor01_01_2005(fechEmiCompPago)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del comprobante de pago usado como comprobante de percepción no puede ser menor al 01/01/2005"});
                    indiceRechazado = i;
                }

                if (!validarFechEmiCompPagoMayorFechSistema(fechEmiCompPago)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del sistema es menor a la del comprobante de pago"});
                    indiceRechazado = i;
                }

                if (!validarFechEmiCompPagoMes(fechEmiCompPago)) {
                    filasError.push({Fila: fila, Detalle: "La fecha de emisión del doc. origen es mayor que el período declarado"});
                    indiceRechazado = i;
                }
            }

            if (!validarTipoComprobRucAgenteSunat(tipoCompPago, ruc)) {
                filasError.push({Fila: fila, Detalle: "Tipo de comprobante de pago inválido para el agente SUNAT"});
                indiceRechazado = i;
            }

            if (!validarValTotalCompPago(valTotalCompPago)) {
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de pago contiene letras o caracteres no validos, \ncontiene más de un punto decimal ó es demasiado grande"});
                indiceRechazado = i;
            } else if (!validarValTotalCompPagoMay(valTotalCompPago)) {
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de pago no es válido"});
                indiceRechazado = i;
            }



            if (indiceRechazado == i) {
                rechazados++;
            }

            fila++;
        }//end for

    } else if (identificador == "PI.txt") {
        limpiarEtiquetas_171();

        for (var i = 0; i < total_Lista; i++) {

            if (i == total_Lista - 1 && listaMap[i].get('ruc') == "") {//ultima fila limpia
                break;
            }

            var ruc = listaMap[i].get("ruc").toString();
            var tipoCompPago = listaMap[i].get("tipoComprobantePago");
            var serieCompPago = listaMap[i].get("serieComprobantePago");
            var numeroCompPago = listaMap[i].get("numeroComprobantePago");
            var fechEmiCompPago = listaMap[i].get("fechEmiComprobantePago");
            var valTotalCompPago = listaMap[i].get("montoComprobantePago");


            if (!validarRuc(ruc)) {
                filasError.push({Fila: fila, Detalle: "Número de RUC Invalido"});
                indiceRechazado = i;
            }

            if (!validarRucAgPercVsRucDeclarante(ruc)) {
                filasError.push({Fila: fila, Detalle: "RUC del agente igual a RUC del declarante"});
                indiceRechazado = i;
            }

            if (!validarRucAgPercIgualRucSunat(ruc)) {
                filasError.push({Fila: fila, Detalle: "No puede declarar el RUC de SUNAT en percepciones de ventas internas"});
                indiceRechazado = i;
            }

            if (!validarTipoComprobEnParametro(tipoCompPago)) {
                filasError.push({Fila: fila, Detalle: "No existe este tipo de comprobante para percepciones de ventas internas"});
                indiceRechazado = i;
            }



            if (!validarFechEmiCompPago(fechEmiCompPago)) {

            } else if (!validarSerieCompPago(serieCompPago, fechEmiCompPago, tipoCompPago)) {
                filasError.push({Fila: fila, Detalle: "La serie del comprobante de pago no es válida"});
                indiceRechazado = i;
            }

            if (!validarNumeroCompPago(numeroCompPago, tipoCompPago)) {
                filasError.push({Fila: fila, Detalle: "El número del comprobante de pago no es válido"});
                indiceRechazado = i;
            }

            if (!validarFechEmiCompPago(fechEmiCompPago)) {
                filasError.push({Fila: fila, Detalle: "La fecha de emisión del comprobante de pago no es válida"});
                indiceRechazado = i;
            }




            if (!validarFechEmiCompPago(fechEmiCompPago)) {

            } else {
                if (!validarFechEmiCompPagoMenor01_01_2005(fechEmiCompPago)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del comprobante de pago usado como comprobante de percepción no puede ser menor al 01/01/2005"});
                    indiceRechazado = i;
                }

                if (!validarFechEmiCompPagoMayorFechSistema(fechEmiCompPago)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del sistema es menor a la del comprobante de pago"});
                    indiceRechazado = i;
                }

                if (!validarFechEmiCompPagoMes(fechEmiCompPago)) {
                    filasError.push({Fila: fila, Detalle: "El mes de la fecha de emisión del comprobante de pago es mayor que el período declarado"});
                    indiceRechazado = i;
                }
            }

            if (!validarValTotalCompPago(valTotalCompPago)) {
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de pago contiene letras o caracteres no validos, \ncontiene más de un punto decimal ó es demasiado grande"});
                indiceRechazado = i;
            } else if (!validarValTotalCompPagoMay(valTotalCompPago)) {
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de pago no es válido"});
                indiceRechazado = i;
            }






            if (indiceRechazado == i) {
                rechazados++;
            }

            fila++;
        }

    } else if (identificador == "R.txt") {
        limpiarEtiquetas_179();

        for (var i = 0; i < total_Lista; i++) {

            if (i == total_Lista - 1 && listaMap[i].get('ruc') == "") {//ultima fila limpia
                break;
            }


            var ruc = listaMap[i].get("ruc");
            var serieCompRete = listaMap[i].get("serieComprobanteRetencion");
            var numeroCompRete = listaMap[i].get("numeroComprobanteRetencion");
            var fechEmiCompRete = listaMap[i].get("fechEmiComprobanteRetencion").toString();
            var montoCompRete = listaMap[i].get("montoComprobanteRetencion");
            var tipoCompPago = listaMap[i].get("tipoComprobantePago");
            var serieCompPago = listaMap[i].get("serieComprobantePago");
            var numeroCompPago = listaMap[i].get("numeroComprobantePago");
            var fechEmiCompPago = listaMap[i].get("fechEmiComprobantePago").toString();
            var valTotalCompPago = listaMap[i].get("valorTotalComprobantePago");


            if (!validarRuc(ruc)) {
                filasError.push({Fila: fila, Detalle: "Número de RUC Invalido"});
                indiceRechazado = i;
            }

            if (!validarRucAgPercVsRucDeclarante(ruc)) {
                filasError.push({Fila: fila, Detalle: "RUC del agente igual a RUC del declarante"});
                indiceRechazado = i;
            }


            if (!validarRucAgPercIgualRucSunat(ruc)) {
                filasError.push({Fila: fila, Detalle: "No puede declarar el RUC de SUNAT en percepciones de ventas internas"});
                indiceRechazado = i;
            }

            if (!validarTipoComprobEnParametro(tipoCompPago)) {
                filasError.push({Fila: fila, Detalle: "No existe este tipo de comprobante para percepciones de ventas internas"});
                indiceRechazado = i;
            }


            if (!validarFechEmiCompPerc(fechEmiCompRete)) {//Primero validar la fecha
            } else if (!validarSerieCompPerc(serieCompRete, fechEmiCompRete)) {
                filasError.push({Fila: fila, Detalle: "La serie del comprobante de retención no es válida"});
                indiceRechazado = i;
            }

            if (!validarNumeroCompPerc(numeroCompRete)) {
                filasError.push({Fila: fila, Detalle: "El número del comprobante de retención no es válido"});
                indiceRechazado = i;
            }

            if (!validarFechEmiCompPerc(fechEmiCompRete)) {
                filasError.push({Fila: fila, Detalle: "La fecha de emisión del comprobante de retención no es válida"});
                indiceRechazado = i;
            }



            if (!validarFechEmiCompPerc(fechEmiCompRete)) {//Primero validar la fecha
            } else {
                if (!validarFechEmiCompPercMayor14_10_2002(fechEmiCompRete)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del comprobante de retención no puede ser menor al 14/10/2002"});
                    indiceRechazado = i;
                }

                if (!validarFechEmiCompPercMayorFechSistema(fechEmiCompRete)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del sistema es menor a la del comprobante de retención"});
                    indiceRechazado = i;
                }

                if (!validarFechEmiCompPercMes(fechEmiCompRete)) {
                    filasError.push({Fila: fila, Detalle: "El mes de la fecha de emisión del comprobante de retención es mayor que el período declarado"});
                    indiceRechazado = i;
                }

            }



            /*El importe del comprobante de retención contiene letras o caracteres no validos
             El importe del comprobante de retención contiene más de un punto decimal
             El importe del comprobante de retención es demasiado grande
             */
            if (!validarMontoCompPercUnPuntoDec(montoCompRete)) {//Un punto decimal máximo 15 Digitos(12 enteros 2 decimales)
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de retención contiene letras o caracteres no validos, \ncontiene más de un punto decimal ó es demasiado grande"});
                indiceRechazado = i;

            } else if (!validarMontoCompPerc(montoCompRete)) {//Cuando el importe es menor a 0.01
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de retención no es válido"});
                indiceRechazado = i;
            }

            if (!validarFechEmiCompPago(fechEmiCompPago)) {
            } else if (!validarSerieCompPago(serieCompPago, fechEmiCompPago, tipoCompPago)) {
                filasError.push({Fila: fila, Detalle: "La serie del comprobante de pago no es válida"});
                indiceRechazado = i;
            }

            if (!validarNumeroCompPago(numeroCompPago, tipoCompPago)) {
                filasError.push({Fila: fila, Detalle: "El número del comprobante de pago no es válido"});
                indiceRechazado = i;
            }



            if (!validarFechEmiCompPago(fechEmiCompPago)) {
                filasError.push({Fila: fila, Detalle: "La fecha de emisión del comprobante de pago no es válida"});
                indiceRechazado = i;
            }

            if (!validarFechEmiCompPago(fechEmiCompPago)) {

            } else {
                if (!validarFechEmiCompPagoMenor01_01_2005(fechEmiCompPago)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del comprobante de pago usado como comprobante de retención no puede ser menor al 01/01/2005"});
                    indiceRechazado = i;

                }

                if (!validarFechEmiCompPagoMayorFechSistema(fechEmiCompPago)) {
                    filasError.push({Fila: fila, Detalle: "La fecha del sistema es menor a la del comprobante de pago"});
                    indiceRechazado = i;
                }

                if (!validarFechEmiCompPagoMes(fechEmiCompPago)) {
                    filasError.push({Fila: fila, Detalle: "La fecha de emisión del doc. origen es mayor que el período declarado"});
                    indiceRechazado = i;
                }
            }



            if (!validarTipoComprobRucAgenteSunat(tipoCompPago, ruc)) {
                filasError.push({Fila: fila, Detalle: "Tipo de comprobante de pago inválido para el agente SUNAT"});
                indiceRechazado = i;
            }

            if (!validarValTotalCompPago(valTotalCompPago)) {
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de pago contiene letras o caracteres no validos, \ncontiene más de un punto decimal ó es demasiado grande"});
                indiceRechazado = i;

            } else if (!validarValTotalCompPagoMay(valTotalCompPago)) {
                filasError.push({Fila: fila, Detalle: "El importe del comprobante de pago no es válido"});
                indiceRechazado = i;
            }



            if (indiceRechazado == i) {
                rechazados++;
            }

            fila++;
        }

    }


    if (identificador == "P.txt") {
        validar_4_PrimerosCamposIguales_P();
        validar_8_PrimerosCamposIguales_P();
    } else if (identificador == "PI.txt") {
        validar_4_PrimerosCamposIguales_PI();
    } else if (identificador == "R.txt") {
        validar_4_PrimerosCamposIguales_R();
        validar_8_PrimerosCamposIguales_R();
    }

    var total_rechazados = getFilasRechazadas();

    filasError = filasError.sort((a, b) => Number(a.Fila) - Number(b.Fila));// ordenar ascendente

    llenarTabla(filasError);
    llenarRegistros_Cargados_Rechazados(((total_Lista - 1) - total_rechazados), total_rechazados);


}//end llenarTabla_DetalleErrores


function sumar_totales(identificador) {
    if (uso179 == true) {
        suma_total_cas687 = formulario0621.Total_montoComprobanteRetencion;
    } else {
        if (formulario0621.Total_montoComprobantePercepcion == null
                || formulario0621.Total_montoComprobantePercepcion == undefined
                || formulario0621.Total_montoComprobantePercepcion == "") {
            formulario0621.Total_montoComprobantePercepcion = 0;
        }

        if (formulario0621.Total_montoComprobantePago == null
                || formulario0621.Total_montoComprobantePago == undefined
                || formulario0621.Total_montoComprobantePago == "") {
            formulario0621.Total_montoComprobantePago = 0;
        }


        suma_total_cas685 = formulario0621.Total_montoComprobantePercepcion + formulario0621.Total_montoComprobantePago;
    }
}


function sumar_montoComprobantePercepcion_P() {
    formulario0621.Total_montoComprobantePercepcion = 0.00;
    if (formulario0621.listaMap_Temp_P.length > 0) {
        for (var i = 0; i < formulario0621.listaMap_Temp_P.length; i++) {
            if (formulario0621.listaMap_Temp_P[i].get('ruc') == "") {
                break;
            }
            formulario0621.Total_montoComprobantePercepcion = formulario0621.Total_montoComprobantePercepcion + Number(formulario0621.listaMap_Temp_P[i].get('montoComprobantePercepcion'));
        }
    }
}


function sumar_montoComprobantePago_PI() {

    if (formulario0621.listaMap_Temp_PI.length > 0) {
        formulario0621.Total_montoComprobantePago = 0.00;
        for (var i = 0; i < formulario0621.listaMap_Temp_PI.length; i++) {
            if (formulario0621.listaMap_Temp_PI[i].get('ruc') == "") {
                break;
            }
            formulario0621.Total_montoComprobantePago = formulario0621.Total_montoComprobantePago + Number(formulario0621.listaMap_Temp_PI[i].get('montoComprobantePago'));
        }
    }

}

function sumar_montoComprobanteRetencion_R() {
    formulario0621.Total_montoComprobanteRetencion = 0.00;
    if (formulario0621.listaMap_Temp_R.length > 0) {
        for (var i = 0; i < formulario0621.listaMap_Temp_R.length; i++) {
            if (formulario0621.listaMap_Temp_R[i].get('ruc') == "") {
                break;
            }
            formulario0621.Total_montoComprobanteRetencion = formulario0621.Total_montoComprobanteRetencion + Number(formulario0621.listaMap_Temp_R[i].get('montoComprobanteRetencion'));
        }
    }
}

function crearArchivo_Txt(nombreArchivo, contenidoArchivo) {
    var blob = new Blob([contenidoArchivo], {type: "text/plain;charset=utf-8"});
    saveAs(blob, nombreArchivo);
}
function create_zip(nombreArchivoP, nombreArchivoPI, nombreArchivoR, contenidoP, contenidoPI, contenidoR) {
    var zip = new JSZip();
    var nombreZIP;

    if (uso179 == true) {
        nombreZIP = formulario0621.nombreArchivoR.substring(0, 21) + "R";
        zip.file(formulario0621.nombreArchivoR, contenidoR);
    } else {
        zip.file(formulario0621.nombreArchivoP, contenidoP);
        zip.file(formulario0621.nombreArchivoPI, contenidoPI);
        //var img = zip.folder("images");
        //img.file("smile.gif", imgData, {base64: true});
        nombreZIP = formulario0621.nombreArchivoP.substring(0, 21) + "T";
    }

    zip.generateAsync({type: "blob"})
            .then(function (content) {
                saveAs(content, nombreZIP);
            });
}

function descargarArchivo() {
    if (uso179 == true) {
        create_zip(formulario0621.nombreArchivoP, formulario0621.nombreArchivoPI, formulario0621.nombreArchivoR, contenidoP, contenidoPI, contenidoR);
    } else {

        if (formulario0621.listaMap_Temp_P.length > 0 && formulario0621.listaMap_Temp_PI.length < 1) {
            crearArchivo_Txt(formulario0621.nombreArchivoP, contenidoP);
        } else if (formulario0621.listaMap_Temp_PI.length > 0 && formulario0621.listaMap_Temp_P.length < 1) {
            crearArchivo_Txt(formulario0621.nombreArchivoPI, contenidoPI);

        } else if (formulario0621.listaMap_Temp_P.length > 0 && formulario0621.listaMap_Temp_PI.length > 0) {
            create_zip(formulario0621.nombreArchivoP, formulario0621.nombreArchivoPI, formulario0621.nombreArchivoR, contenidoP, contenidoPI, contenidoR);
        }
    }

}

function generarContenidoP() {
    contenidoP = "";
    for (var i = 0; i < formulario0621.listaMap_Temp_P.length; i++) {
        if (formulario0621.listaMap_Temp_P[i].get('ruc') == "") {
            break;
        }

        contenidoP +=
                formulario0621.listaMap_Temp_P[i].get('ruc') + "|" +
                formulario0621.listaMap_Temp_P[i].get('serieComprobantePercepcion') + "|" +
                formulario0621.listaMap_Temp_P[i].get('numeroComprobantePercepcion') + "|" +
                formulario0621.listaMap_Temp_P[i].get('fechEmiComprobantePercepcion') + "|" +
                formulario0621.listaMap_Temp_P[i].get('montoComprobantePercepcion') + "|" +
                formulario0621.listaMap_Temp_P[i].get('tipoComprobantePago') + "|" +
                formulario0621.listaMap_Temp_P[i].get('serieComprobantePago') + "|" +
                formulario0621.listaMap_Temp_P[i].get('numeroComprobantePago') + "|" +
                formulario0621.listaMap_Temp_P[i].get('fechEmiComprobantePago') + "|" +
                formulario0621.listaMap_Temp_P[i].get('valorTotalComprobantePago') + "|" +
                "\r\n";
    }
}


function generarContenidoPI() {
    contenidoPI = "";
    for (var i = 0; i < formulario0621.listaMap_Temp_PI.length; i++) {
        if (formulario0621.listaMap_Temp_PI[i].get('ruc') == "") {
            break;
        }

        contenidoPI +=
                formulario0621.listaMap_Temp_PI[i].get('ruc') + "|" +
                formulario0621.listaMap_Temp_PI[i].get('tipoComprobantePago') + "|" +
                formulario0621.listaMap_Temp_PI[i].get('serieComprobantePago') + "|" +
                formulario0621.listaMap_Temp_PI[i].get('numeroComprobantePago') + "|" +
                formulario0621.listaMap_Temp_PI[i].get('fechEmiComprobantePago') + "|" +
                formulario0621.listaMap_Temp_PI[i].get('montoComprobantePago') + "|" +
                "\r\n";
    }
}



function generarContenidoR() {
    contenidoR = "";
    for (var i = 0; i < formulario0621.listaMap_Temp_R.length; i++) {
        if (formulario0621.listaMap_Temp_R[i].get('ruc') == "") {
            break;
        }

        contenidoR +=
                formulario0621.listaMap_Temp_R[i].get('ruc') + "|" +
                formulario0621.listaMap_Temp_R[i].get('serieComprobanteRetencion') + "|" +
                formulario0621.listaMap_Temp_R[i].get('numeroComprobanteRetencion') + "|" +
                formulario0621.listaMap_Temp_R[i].get('fechEmiComprobanteRetencion') + "|" +
                formulario0621.listaMap_Temp_R[i].get('montoComprobanteRetencion') + "|" +
                formulario0621.listaMap_Temp_R[i].get('tipoComprobantePago') + "|" +
                formulario0621.listaMap_Temp_R[i].get('serieComprobantePago') + "|" +
                formulario0621.listaMap_Temp_R[i].get('numeroComprobantePago') + "|" +
                formulario0621.listaMap_Temp_R[i].get('fechEmiComprobantePago') + "|" +
                formulario0621.listaMap_Temp_R[i].get('valorTotalComprobantePago') + "|" +
                "\r\n";
    }
}




//************ VALIDACIONES ***********


function convertir_dmy_To_mdy(dmy) {
    var datearray = dmy.split("/");
    var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];
    return newdate;
}


function validarRuc(ruc) {//correcto
    var expreg1 = /^1\d{10}$/;
    var expreg2 = /^2\d{10}$/;

    if (expreg1.test(ruc)) {
        return true;
    } else if (expreg2.test(ruc)) {
        return true;
    } else {
        return false;
    }
}


function validarRucAgPercVsRucDeclarante(rucAgentePercepcion) {//ok
    var flag = true;

    if (rucAgentePercepcion == rucDeclarante) {
        flag = false;
    }
    return flag;
}

function validarRucAgPercIgualRucSunat(rucAgentePercepcion) {//ok
    var flag = true;

    if (rucAgentePercepcion == "20131312955") {
        flag = false;
    }
    return flag;
}

function validarSerieCompPerc(serieCompPerc, fechEmiCompPercepcion) {//ok corregir desktop
    var flag = true;
    var cont = 0;
    try {
        var patron1 = /^\d{4}$/;//numerico 4 digitos
        var patron2 = /^E\d{3}$/;//numerico comienza con E 4 digitos..........^9[0-9]{8}$
        var patron3 = /^F[a-zA-Z0-9_ ]{3}$/;//Alfanumerico comienza con F 4 digitos

        var fecha1 = "19/07/2010";
        var fecha2 = "01/12/2012";
        var localDateFECP = new Date(convertir_dmy_To_mdy(fechEmiCompPercepcion));

        var localDateFecha1 = new Date(convertir_dmy_To_mdy(fecha1));
        var localDateFecha2 = new Date(convertir_dmy_To_mdy(fecha2));

        var iniSerieCompPerc = serieCompPerc.substring(0, 1);

        if (((localDateFECP > localDateFecha2) || (localDateFECP.getTime() == localDateFecha2.getTime())) && iniSerieCompPerc == "F") {

            if (!patron3.test(serieCompPerc)) {
                cont++;
            }

        } else if (((localDateFECP > localDateFecha1) || (localDateFECP.getTime() == localDateFecha1.getTime())) && iniSerieCompPerc == "E") {
            if (!patron2.test(serieCompPerc)) {
                cont++;
            }


        } else if (!patron1.test(serieCompPerc)) {
            cont++;
        }

    } catch (err) {
        return false;
    }

    if (cont > 0) {
        flag = false;
    }

    return flag;
}



function validarNumeroCompPerc(numeroCompPerc) {//ok
    var flag = true;

    var patron1 = /^\d{8}$/;//Numérico de 8 posiciones 

    if (!patron1.test(numeroCompPerc)) {
        flag = false;
    }

    return flag;
}



function validarFechEmiCompPerc(fechEmiCompPerc) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if ((fechEmiCompPerc.match(RegExPattern)) && (fechEmiCompPerc != '')) {

        var fech = new Date(convertir_dmy_To_mdy(fechEmiCompPerc));
        var anio = fech.getFullYear();

        if (anioBisiesto(anio)) {// VALIDACION AÑO BISIESTO
            if (daysInFebruary(anio) == 29) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }


    } else {
        return false;
    }
}





function validarFechEmiCompPercMayor14_10_2002(fechEmiCompPerc) {//ok
    var flag = true;
    var localDateFECP = new Date(convertir_dmy_To_mdy(fechEmiCompPerc));
    var localDateFecha1 = new Date(convertir_dmy_To_mdy("14/10/2002"));
    if (localDateFECP < localDateFecha1) {
        flag = false;
    }

    return flag;
}

function validarFechEmiCompPercMayorFechSistema(fechEmiCompPerc) {//ok
    var flag = true;

    var fechSistema = new Date();
    var localDateFECP = new Date(convertir_dmy_To_mdy(fechEmiCompPerc));

    if (localDateFECP > fechSistema) {
        flag = false;
    }

    return flag;

}

function validarFechEmiCompPercMes(fechEmiCompPerc) {//ok
    var flag = true;

    try {
        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/MM/yyyy");
        var localDateFECP = new Date(convertir_dmy_To_mdy(fechEmiCompPerc));
        var mesFECP = localDateFECP.getMonth() + 1;
        var anioFECP = localDateFECP.getFullYear();

        if (ANIO_PERIODO_DECLARADO >= anioFECP) {
            if (mesFECP > MES_PERIODO_DECLARADO) {
                flag = false;
            }
        } else {
            flag = false;
        }

    } catch (err) {
        return false;
    }

    return flag;
}

function validarMontoCompPerc(montoCompPerc) {//ok
    var flag = true;

    if (montoCompPerc < 0.01) {
        flag = false;
    }

    return flag;
}

function validarMontoCompPercUnPuntoDec(montoCompPerc) {//ok
    var flag = true;
    //String patron = "^[\\s\\S]{0,5}$";//MÁXIMO 5 DIGITOS
    var patron = /^\d{1,12}.?\d{0,2}$/;//MÁXIMO 12 ENTEROS Y DOS DECIMALES
    if (!patron.test(montoCompPerc)) {
        flag = false;
    }

    return flag;
}

function validarTipoDocumento(tipoCompPago, rucAgentePercepcion) {//ok
    var flag = true;

    if (tipoCompPago == "01" //Factura
            || tipoCompPago == "07" //Nota de Crédito
            || tipoCompPago == "08" //Nota de Débito   
            || tipoCompPago == "12" //Ticket de Máquina Registradora
            || tipoCompPago == "55" //DUA (Solo cuando el RUC del agente de percepción es el de SUNAT 20131312955)
            || tipoCompPago == "99" //Otros  
            ) {
        flag = true;

    } else if (tipoCompPago == "55" && rucAgentePercepcion == '20131312955') {//55 DUA (Solo cuando el RUC del agente de percepción es el de SUNAT 20131312955)
        flag = true;
    } else {
        flag = false;
    }

    return flag;
}


function validarSerieCompPago(serieCompPago, fechEmiCompPago, tipoCompPago) {//ok
    var flag = true;
    var cont = 0;
    try {
        var patron1 = /^\d{4}$/;//numerico 4 digitos
        var patron2 = /^E\d{3}$/;//numerico comienza con E 4 digitos..........^9[0-9]{8}$
        var patron3 = /^F[a-zA-Z0-9_ ]{3}$/;//Alfanumerico comienza con F 4 digitos

        var localDateFECP = new Date(convertir_dmy_To_mdy(fechEmiCompPago));
        var localDateFecha1 = new Date(convertir_dmy_To_mdy("19/07/2010"));
        var localDateFecha2 = new Date(convertir_dmy_To_mdy("01/12/2012"));

        var iniSerieCompPerc = serieCompPago.substring(0, 1);

        if (tipoCompPago == "01" || tipoCompPago == "08") {//01:FACTURA. 08:NOTA DE DÉBITO

            if (((localDateFECP > localDateFecha2) || (localDateFECP.getTime() == localDateFecha2.getTime())) && iniSerieCompPerc == "F") {
                if (!patron3.test(serieCompPago)) {
                    cont++;
                }

            } else if (((localDateFECP > localDateFecha1) || (localDateFECP.getTime() == localDateFecha1.getTime())) && iniSerieCompPerc == "E") {
                if (!patron2.test(serieCompPago)) {
                    cont++;
                }

            } else if (!patron1.test(serieCompPago)) {
                cont++;
            }

        } else if (!patron1.test(serieCompPago)) {
            cont++;
        }

    } catch (err) {
        return false;
    }


    if (cont > 0) {
        flag = false;
    }


    return flag;
}













function validarNumeroCompPago(numeroCompPago, tipoCompPago) {//ok
    var flag = true;
    var patron1 = /^\d{1,8}$/;//numerico 8 digitos
    var patron2 = /^\d{1,15}$/;//numerico 15 digitos

    if (tipoCompPago == "99") {//99: OTROS
        if (!patron2.test(numeroCompPago)) {
            flag = false;
        }
    } else if (!patron1.test(numeroCompPago)) {
        flag = false;
    }

    return flag;
}



function daysInFebruary(year) {
    return (((year % 4 == 0) && ((!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28);
}


function anioBisiesto(ano) {
    if ((ano % 4 == 0) && ((ano % 100 != 0) || (ano % 400 == 0))) {
        return true;
    } else {
        return false;
    }
}

function validarFechEmiCompPago(fechEmiCompPago) {
    var RegExPattern = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
    if ((fechEmiCompPago.match(RegExPattern)) && (fechEmiCompPago != '')) {

        var fech = new Date(convertir_dmy_To_mdy(fechEmiCompPago));
        var anio = fech.getFullYear();

        if (anioBisiesto(anio)) {// VALIDACION AÑO BISIESTO
            if (daysInFebruary(anio) == 29) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }



    } else {
        return false;
    }
}






function validarFechEmiCompPagoMenor01_01_2005(fechEmiCompPago) {//ok Cuando la fechas de emisión del comprobante de pago es menor al 01/01/2005
    var flag = false;
    try {
        flag = true;

        var localDateFECP = new Date(convertir_dmy_To_mdy(fechEmiCompPago));
        var localDateFecha1 = new Date(convertir_dmy_To_mdy("01/01/2005"));

        if (localDateFECP < localDateFecha1) {
            flag = false;
        }
    } catch (err) {
        return false;
    }
    return flag;
}

function validarFechEmiCompPagoMayorFechSistema(fechEmiCompPago) {//ok
    var flag = false;
    try {
        flag = true;

        var fechSistema = new Date();
        var localDateFECP = new Date(convertir_dmy_To_mdy(fechEmiCompPago));

        if (localDateFECP > fechSistema) {
            flag = false;
        }
    } catch (err) {
        return false;
    }

    return flag;
}

function validarFechEmiCompPagoMes(fechEmiCompPago) {//ok
    var flag = true;

    try {
        //DateTimeFormatter formatter = DateTimeFormatter.ofPattern("d/MM/yyyy");
        var localDateFECP = new Date(convertir_dmy_To_mdy(fechEmiCompPago));
        var mesFECP = localDateFECP.getMonth() + 1;
        var anioFECP = localDateFECP.getFullYear();

        if (ANIO_PERIODO_DECLARADO >= anioFECP) {
            if (mesFECP > MES_PERIODO_DECLARADO) {
                flag = false;
            }
        } else {
            flag = false;
        }

    } catch (err) {
        return false;
    }

    return flag;
}

//Tipo de comprobante de pago inválido para el agente SUNAT
function validarTipoComprobRucAgenteSunat(tipoCompPago, ruc) {//ok
    //Cuando el RUC del agente de percepción ingresado sea el de la SUNAT (RUC 20131312955) y el tipo de comprobante de pago sea diferente a: 07 - Nota de Crédito,  08 – Nota de Débito y 55 – Declaración Única de Aduanas (DUA).
    var flag = true;

    if (ruc == "20131312955") {//SUNAT (RUC 20131312955)
        //07 - Nota de Crédito,  08 – Nota de Débito y 55 – Declaración Única de Aduanas (DUA)
        if (tipoCompPago == "07" || tipoCompPago == "08" || tipoCompPago == "55") {
        } else {
            flag = false;
        }
    }
    return flag;
}

//No existe este tipo de comprobante para percepciones de ventas internas
function validarTipoComprobEnParametro(tipoCompPago) {//ok
    var flag = true;
    //01 Factura. 08 Nota de Débito. 12 Ticket de Máquina Registradora. 99 Otros
    if (tipoCompPago == "01" || tipoCompPago == "08" || tipoCompPago == "12" || tipoCompPago == "99") {
        flag = true;
    } else {
        flag = false;
    }
    return flag;
}



function  validarNumero(numero) {//ok
    //var flag = true;
    var expreg = /^\d{8}$/;//Numérico de 8 posiciones 
//        var expreg = new RegExp("[0-9]*");
    if (expreg.test(numero)) {
        return true;
    } else {
        return false;
    }

    //return flag;
}

function validarValTotalCompPagoMay(valTotalCompPago) {//ok
    var flag = true;
    //var monto = Double.parseDouble(valTotalCompPago);

    if (valTotalCompPago < 0.01) {
        flag = false;
    }

    return flag;
}

function validarValTotalCompPago(valTotalCompPago) {//
    var flag = true;
    //String patron = "^[\\s\\S]{0,5}$";//MÁXIMO 5 DIGITOS
    var patron = /^\d{1,12}.?\d{0,2}$/;//MÁXIMO 12 ENTEROS Y DOS DECIMALES
    if (patron.test(valTotalCompPago)) {
        flag = true;
    } else {
        flag = false;
    }
    return flag;
}






function validar_4_PrimerosCamposIguales_P() {
    var listaIguales = [];
    var rep = [];

    for (var i = 0; i < listaMap.length; i++) {
        if (i == listaMap.length - 1 && listaMap[i].get('ruc') == "") {//ultima fila limpia
            break;
        }

        var map = new Map();
        map.set("ruc", listaMap[i].get("ruc"));

        var inicio = listaMap[i].get("serieComprobantePercepcion").substring(0, 1);
        var serieCompPerc;
        if (inicio == "E" || inicio == "F") {
            serieCompPerc = listaMap[i].get("serieComprobantePercepcion");
        } else {
            serieCompPerc = parseInt(listaMap[i].get("serieComprobantePercepcion"));
        }
        map.set("serieComprobantePercepcion", serieCompPerc);

        var numeroCompPerc = parseInt(listaMap[i].get("numeroComprobantePercepcion"));
        map.set("numeroComprobantePercepcion", numeroCompPerc);
        var fechEmiCompPerc = listaMap[i].get("fechEmiComprobantePercepcion");
        map.set("fechEmiComprobantePercepcion", fechEmiCompPerc);
        var montoCompPerc = listaMap[i].get("montoComprobantePercepcion");
        map.set("montoComprobantePercepcion", montoCompPerc);
        listaIguales.push(map);

    }

    for (var p = 0; p < listaIguales.length; p++) {

        var rucSerNum = listaIguales[p].get("ruc") + "" +
                listaIguales[p].get("serieComprobantePercepcion") + "" +
                listaIguales[p].get("numeroComprobantePercepcion");
        var fecMon = listaIguales[p].get("fechEmiComprobantePercepcion") + "" +
                listaIguales[p].get("montoComprobantePercepcion");

        for (var x = 0; x < listaIguales.length; x++) {
            var rucSerNum2 = listaIguales[x].get("ruc") + "" +
                    listaIguales[x].get("serieComprobantePercepcion") + "" +
                    listaIguales[x].get("numeroComprobantePercepcion");
            var fecMon2 = listaIguales[x].get("fechEmiComprobantePercepcion") + "" +
                    listaIguales[x].get("montoComprobantePercepcion");


            if (rucSerNum == rucSerNum2) {
                if (fecMon != fecMon2) {
                    rep.push((x + 1));

                }

            }

        }

    }

    var arraySinDuplicados = [];
    var arraySinDuplicados = rep.filter(function (elem, pos) {
        return rep.indexOf(elem) == pos;
    });

    for (var y = 0; y < arraySinDuplicados.length; y++) {
        filasError.push({Fila: arraySinDuplicados[y], Detalle: "La fecha y/o el monto del comprobante de  percepción no coincide"});
    }

}//end validar_4_PrimerosCamposIguales_P


function validar_8_PrimerosCamposIguales_P() {
    var listaIguales2 = [];
    var rep2 = [];

    for (var i = 0; i < listaMap.length; i++) {
        if (i == listaMap.length - 1 && listaMap[i].get('ruc') == "") {//ultima fila limpia
            break;
        }

        var map = new Map();
        map.set("ruc", listaMap[i].get("ruc"));

        var inicio = listaMap[i].get("serieComprobantePercepcion").substring(0, 1);
        var serieCompPerc;
        if (inicio == "E" || inicio == "F") {
            serieCompPerc = listaMap[i].get("serieComprobantePercepcion");
        } else {
            serieCompPerc = parseInt(listaMap[i].get("serieComprobantePercepcion"));
        }
        map.set("serieComprobantePercepcion", serieCompPerc);

        var numeroCompPerc = parseInt(listaMap[i].get("numeroComprobantePercepcion"));
        map.set("numeroComprobantePercepcion", numeroCompPerc);
        var fechEmiCompPerc = listaMap[i].get("fechEmiComprobantePercepcion");
        map.set("fechEmiComprobantePercepcion", fechEmiCompPerc);
        var montoCompPerc = listaMap[i].get("montoComprobantePercepcion");
        map.set("montoComprobantePercepcion", montoCompPerc);

        var tipoCompPago = parseInt(listaMap[i].get("tipoComprobantePago"));
        map.set("tipoComprobantePago", tipoCompPago);

        var serieCompPago;
        if (inicio == "E" || inicio == "F") {
            serieCompPago = listaMap[i].get("serieComprobantePago");
        } else {
            serieCompPago = parseInt(listaMap[i].get("serieComprobantePago"));
        }
        map.set("serieComprobantePago", serieCompPago);

        var numeroCompPago = parseInt(listaMap[i].get("numeroComprobantePago"));
        map.set("numeroComprobantePago", numeroCompPago);

        listaIguales2.push(map);

    }


    for (var p = 0; p < listaIguales2.length; p++) {

        var ocho_campos = listaIguales2[p].get("ruc") + "" +
                listaIguales2[p].get("serieComprobantePercepcion") + "" +
                listaIguales2[p].get("numeroComprobantePercepcion") + "" +
                listaIguales2[p].get("fechEmiComprobantePercepcion") + "" +
                listaIguales2[p].get("montoComprobantePercepcion") + "" +
                listaIguales2[p].get("tipoComprobantePago") + "" +
                listaIguales2[p].get("serieComprobantePago") + "" +
                listaIguales2[p].get("numeroComprobantePago");

        for (var x = 0; x < listaIguales2.length; x++) {

            var ocho_campos2 = listaIguales2[x].get("ruc") + "" +
                    listaIguales2[x].get("serieComprobantePercepcion") + "" +
                    listaIguales2[x].get("numeroComprobantePercepcion") + "" +
                    listaIguales2[x].get("fechEmiComprobantePercepcion") + "" +
                    listaIguales2[x].get("montoComprobantePercepcion") + "" +
                    listaIguales2[x].get("tipoComprobantePago") + "" +
                    listaIguales2[x].get("serieComprobantePago") + "" +
                    listaIguales2[x].get("numeroComprobantePago");

            if (ocho_campos == ocho_campos2) {
                rep2.push((x + 1));
            }

        }

    }

    var array01 = [];
    array01 = find_duplicates(rep2);

    for (var y = 0; y < array01.length; y++) {
        filasError.push({Fila: array01[y], Detalle: "El comprobante de pago involucrado es duplicado"});
    }

}//end validar_8_PrimerosCamposIguales_P








function validar_4_PrimerosCamposIguales_PI() {
    var listaIguales2 = [];
    var rep2 = [];

    for (var i = 0; i < listaMap.length; i++) {
        if (i == listaMap.length - 1 && listaMap[i].get('ruc') == "") {//ultima fila limpia
            break;
        }

        var map = new Map();
        map.set("ruc", listaMap[i].get("ruc"));
        var tipoCompPago = parseInt(listaMap[i].get("tipoComprobantePago"));
        map.set("tipoComprobantePago", tipoCompPago);

        var inicio = listaMap[i].get("serieComprobantePago").substring(0, 1);
        var serieCompPago;
        if (inicio == "E" || inicio == "F") {
            serieCompPago = listaMap[i].get("serieComprobantePago");
        } else {
            serieCompPago = parseInt(listaMap[i].get("serieComprobantePago"));
        }
        map.set("serieComprobantePago", serieCompPago);

        var numeroCompPago = parseInt(listaMap[i].get("numeroComprobantePago"));
        map.set("numeroComprobantePago", numeroCompPago);

        listaIguales2.push(map);

    }


    for (var p = 0; p < listaIguales2.length; p++) {

        var cuatro_campos = listaIguales2[p].get("ruc") + "" +
                listaIguales2[p].get("tipoComprobantePago") + "" +
                listaIguales2[p].get("serieComprobantePago") + "" +
                listaIguales2[p].get("numeroComprobantePago");

        for (var x = 0; x < listaIguales2.length; x++) {

            var cuatro_campos2 = listaIguales2[x].get("ruc") + "" +
                    listaIguales2[x].get("tipoComprobantePago") + "" +
                    listaIguales2[x].get("serieComprobantePago") + "" +
                    listaIguales2[x].get("numeroComprobantePago");

            if (cuatro_campos == cuatro_campos2) {
                rep2.push((x + 1));
            }

        }

    }

    var array01 = [];
    array01 = find_duplicates(rep2);

    for (var y = 0; y < array01.length; y++) {
        filasError.push({Fila: array01[y], Detalle: "El importe del comprobante de pago utilizado como comprobante de percepción es duplicado"});
    }

}//end validar_8_PrimerosCamposIguales_P









function validar_4_PrimerosCamposIguales_R() {
    var listaIguales = [];
    var rep = [];

    for (var i = 0; i < listaMap.length; i++) {
        if (i == listaMap.length - 1 && listaMap[i].get('ruc') == "") {//ultima fila limpia
            break;
        }

        var map = new Map();
        map.set("ruc", listaMap[i].get("ruc"));

        var inicio = listaMap[i].get("serieComprobanteRetencion").substring(0, 1);
        var serieCompRet;
        if (inicio == "E" || inicio == "F") {
            serieCompRet = listaMap[i].get("serieComprobanteRetencion");
        } else {
            serieCompRet = parseInt(listaMap[i].get("serieComprobanteRetencion"));
        }
        map.set("serieComprobanteRetencion", serieCompRet);

        var numeroCompRet = parseInt(listaMap[i].get("numeroComprobanteRetencion"));
        map.set("numeroComprobanteRetencion", numeroCompRet);
        var fechEmiCompRet = listaMap[i].get("fechEmiComprobanteRetencion");
        map.set("fechEmiComprobanteRetencion", fechEmiCompRet);
        var montoCompRet = listaMap[i].get("montoComprobanteRetencion");
        map.set("montoComprobanteRetencion", montoCompRet);
        listaIguales.push(map);

    }

    for (var p = 0; p < listaIguales.length; p++) {

        var rucSerNum = listaIguales[p].get("ruc") + "" +
                listaIguales[p].get("serieComprobanteRetencion") + "" +
                listaIguales[p].get("numeroComprobanteRetencion");
        var fecMon = listaIguales[p].get("fechEmiComprobanteRetencion") + "" +
                listaIguales[p].get("montoComprobanteRetencion");

        for (var x = 0; x < listaIguales.length; x++) {
            var rucSerNum2 = listaIguales[x].get("ruc") + "" +
                    listaIguales[x].get("serieComprobanteRetencion") + "" +
                    listaIguales[x].get("numeroComprobanteRetencion");
            var fecMon2 = listaIguales[x].get("fechEmiComprobanteRetencion") + "" +
                    listaIguales[x].get("montoComprobanteRetencion");


            if (rucSerNum == rucSerNum2) {
                if (fecMon != fecMon2) {
                    rep.push((x + 1));

                }

            }

        }

    }

    var arraySinDuplicados = [];
    var arraySinDuplicados = rep.filter(function (elem, pos) {
        return rep.indexOf(elem) == pos;
    });

    for (var y = 0; y < arraySinDuplicados.length; y++) {
        filasError.push({Fila: arraySinDuplicados[y], Detalle: "La fecha y/o el monto del comprobante de  retención no coincide"});
    }

}//end validar_4_PrimerosCamposIguales_R




function validar_8_PrimerosCamposIguales_R() {
    var listaIguales2 = [];
    var rep2 = [];

    for (var i = 0; i < listaMap.length; i++) {
        if (i == listaMap.length - 1 && listaMap[i].get('ruc') == "") {//ultima fila limpia
            break;
        }

        var map = new Map();
        map.set("ruc", listaMap[i].get("ruc"));

        var inicio = listaMap[i].get("serieComprobanteRetencion").substring(0, 1);
        var serieCompRet;
        if (inicio == "E" || inicio == "F") {
            serieCompRet = listaMap[i].get("serieComprobanteRetencion");
        } else {
            serieCompRet = parseInt(listaMap[i].get("serieComprobanteRetencion"));
        }
        map.set("serieComprobanteRetencion", serieCompRet);

        var numeroCompRet = parseInt(listaMap[i].get("numeroComprobanteRetencion"));
        map.set("numeroComprobanteRetencion", numeroCompRet);
        var fechEmiCompRet = listaMap[i].get("fechEmiComprobanteRetencion");
        map.set("fechEmiComprobanteRetencion", fechEmiCompRet);
        var montoCompRet = listaMap[i].get("montoComprobanteRetencion");
        map.set("montoComprobanteRetencion", montoCompRet);

        var tipoCompPago = parseInt(listaMap[i].get("tipoComprobantePago"));
        map.set("tipoComprobantePago", tipoCompPago);

        var serieCompPago;
        if (inicio == "E" || inicio == "F") {
            serieCompPago = listaMap[i].get("serieComprobantePago");
        } else {
            serieCompPago = parseInt(listaMap[i].get("serieComprobantePago"));
        }
        map.set("serieComprobantePago", serieCompPago);

        var numeroCompPago = parseInt(listaMap[i].get("numeroComprobantePago"));
        map.set("numeroComprobantePago", numeroCompPago);

        listaIguales2.push(map);

    }


    for (var p = 0; p < listaIguales2.length; p++) {

        var ocho_campos = listaIguales2[p].get("ruc") + "" +
                listaIguales2[p].get("serieComprobanteRetencion") + "" +
                listaIguales2[p].get("numeroComprobanteRetencion") + "" +
                listaIguales2[p].get("fechEmiComprobanteRetencion") + "" +
                listaIguales2[p].get("montoComprobanteRetencion") + "" +
                listaIguales2[p].get("tipoComprobantePago") + "" +
                listaIguales2[p].get("serieComprobantePago") + "" +
                listaIguales2[p].get("numeroComprobantePago");

        for (var x = 0; x < listaIguales2.length; x++) {

            var ocho_campos2 = listaIguales2[x].get("ruc") + "" +
                    listaIguales2[x].get("serieComprobanteRetencion") + "" +
                    listaIguales2[x].get("numeroComprobanteRetencion") + "" +
                    listaIguales2[x].get("fechEmiComprobanteRetencion") + "" +
                    listaIguales2[x].get("montoComprobanteRetencion") + "" +
                    listaIguales2[x].get("tipoComprobantePago") + "" +
                    listaIguales2[x].get("serieComprobantePago") + "" +
                    listaIguales2[x].get("numeroComprobantePago");

            if (ocho_campos == ocho_campos2) {
                rep2.push((x + 1));
            }

        }

    }

    var array01 = [];
    array01 = find_duplicates(rep2);

    for (var y = 0; y < array01.length; y++) {
        filasError.push({Fila: array01[y], Detalle: "El comprobante de pago involucrado es duplicado"});
    }

}//end validar_8_PrimerosCamposIguales_R






function find_duplicates(arr) {
    var len = arr.length,
            out = [],
            counts = {};

    for (var i = 0; i < len; i++) {
        var item = arr[i];
        counts[item] = counts[item] >= 1 ? counts[item] + 1 : 1;
        if (counts[item] === 2) {
            out.push(item);
        }
    }

    return out;
}


function getFilasRechazadas() {
    var list = [];
    for (var i = 0; i < filasError.length; i++) {
        list.push(filasError[i].Fila);
    }

    var arraySinDuplicados = [];
    var arraySinDuplicados = list.filter(function (elem, pos) {
        return list.indexOf(elem) == pos;
    });

    return arraySinDuplicados.length;
}


//*****************************************************************************************
//******************************* FIN FUNCIONALIDAD CASILLA 685-687 ***************************
//*****************************************************************************************




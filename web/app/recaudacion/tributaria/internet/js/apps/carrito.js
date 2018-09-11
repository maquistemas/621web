$('.carousel').carousel({
    interval: false
});

//$('input').placeholder();

$('.date-picker').datepicker({
    format: "mm-yyyy",
    viewMode: "months",
    minViewMode: "months",
    autoclose: true
});

$(document).ready(function () {
    comunServiciosControlador.obtenerFechaHoraServidor();
    console.log("ready carrito");
    //aportilla desabilitar botones principales

    $("#btnPaso03").addClass("btn-is-disabled");
    $("#btnPaso04").addClass("btn-is-disabled");
    $(function () {
        var tutorExiste = localStorage.getItem("SUNAT.Tutor");
        console.log("tourtTip start:" + tutorExiste);
        if (tutorExiste == null) {
            console.log("launch tutor");
            localStorage.setItem("SUNAT.Tutor", "true");
            $.tourTip.start();
        }
    });
    $("#btnPaso01").tourTip({
        title: "Tutorial de Pasos<br><p>El siguiente tutorial lo asistirá en el correcto uso del formulario. Si desea continuar haga clic en siguiente.</p>",
        description: "<img src='../img/01.png' class='img-responsive'>",
        previous: true,
        position: 'right',
    });
    $("#btnPaso02").tourTip({
        title: "Tutorial de Pasos",
        description: "<img src='../img/02.png' class='img-responsive'>",
        previous: true,
        position: 'right'
    });
    $("#btnPaso03").tourTip({
        title: "Tutorial de Pasos",
        description: "<img src='../img/03.png' class='img-responsive'>",
        previous: true,
        position: 'right'
    });
    $("#btnPaso04").tourTip({
        title: "Tutorial de Pasos",
        description: "<img src='../img/04.png' class='img-responsive'>",
        previous: true,
        position: 'right',
        close: true
    });

    $("#StartTour").click(function () {
        StartTour();
    })

    function StartTour() {
        //TODO:16DIC2016 para pruebas descomentar
        console.log("StartTour!");
        $.tourTip.start();
    }

    $('#btnPaso01').click(function () {
        $(".Boton-Bandeja").removeClass("show");
        $('.divPaso').addClass("hidden");
        $('#divPaso01').removeClass("hidden");
        $('#content').removeClass("hidden");
        comunBandeja.invocarFormularioOAuth("0101");
        //$(location).attr('href', "#buscarformularios.html");
        localStorage.setItem("ventana", "OTRO_FORMULARIO");
        $('#Ayuda-Form').addClass("hidden");
        $('#StartTour').removeClass("hidden");
        $('#Añadir-Bandeja').addClass("hidden");
    });

    $('#btnPaso02').click(function () {
        $(".Boton-Bandeja").addClass("show");
        $('.divPaso').addClass("hidden")
        $('#content').removeClass("hidden");

        //Obteniendo el nombre del formulario
        var page = comunBandeja.obtenerFormularioActivo();
        if (page == "") {
            $(location).attr('href', "#f0621.html");
        } else {
            $(location).attr('href', ("#" + page));
        }

        $('#Ayuda-Form').removeClass("hidden");
        $('#StartTour').addClass("hidden");

        $('#Añadir-Bandeja').removeClass("hidden");
    });

    $('#btnPaso03').click(function () {
        $(".Boton-Bandeja").removeClass("show");
        $('.divPaso').addClass("hidden");
        $('#content').removeClass("hidden");

        comunBandeja.evaluarTipoPago("carrito"); //hacer la invocacion de la pagina de pagos.html

        $('#Ayuda-Form').removeClass("hidden");
        $('#StartTour').addClass("hidden");

        $('#Añadir-Bandeja').addClass("hidden");

    });

    $("#buttonConfirmarSIJusto").click(function () {
        console.log("Igv Justo Si");
    });

    $("#buttonConfirmarNOJusto").click(function () {
        console.log("Igv Justo No");
    });
    console.log("temporal");
    $('#btnPaso04').click(function () {
        $(".Boton-Bandeja").removeClass("show");
        $('.divPaso').addClass("hidden");
        $('#divPaso04').removeClass("hidden");

        $('#Ayuda-Form').removeClass("hidden");
        $('#StartTour').addClass("hidden");
        $('#Añadir-Bandeja').addClass("hidden");

        console.log("Adnalizando si se muestra mensaje de errores o constancias");
        var existWarning = comunConstancia.existeMensajeAdvertencia();

        if (existWarning) {
            $('#panelMensajesError').addClass("hidden");
            $("#panelMensajesError").css("display", "none");
            $('#panelResumenTransacciones').addClass("hidden");
            $("#panelResumenTransacciones").css("display", "none");
            $('#panelMensajesAdvertencia').removeClass("hidden");
            $("#panelMensajesAdvertencia").css("display", "");
            comunConstancia.mostrarMensajeAdvertencia();
        } else {
            console.log("............... deberia estar llamando al fraccionamiento");
            //Visualizando el resumen de transacciones
            $('#panelMensajesError').addClass("hidden");
            $("#panelMensajesError").css("display", "none");
            $('#panelMensajesAdvertencia').addClass("hidden");
            $("#panelMensajesAdvertencia").css("display", "none");
            $('#panelResumenTransacciones').removeClass("hidden");
            $("#panelResumenTransacciones").css("display", "");
            comunConstancia.constanciaLista();
            console.log(":::::::::::::::::::::: entra mensaje");
            comunConstancia.mensajeFraccioamiento();
        }

        //TODO: 25Ene2017 analizar los escenarios de mensaje de error y advertencia
        /*
         if (comunConstancia.existeMensajeError())
         {
         $('#panelConstancias').addClass("hidden");
         $('#panelMensajesAdvertencia').addClass("hidden");
         $('#panelMensajesError').removeClass("hidden");
         comunConstancia.mostrarMensajeError();
         }
         else
         {
         var existWarning = comunConstancia.existeMensajeAdvertencia();
         if (existWarning) {
         $('#panelMensajesError').addClass("hidden");
         $('#panelConstancias').addClass("hidden");
         $('#panelMensajesAdvertencia').removeClass("hidden");
         comunConstancia.mostrarMensajeAdvertencia();
         }
         else
         {
         $('#panelMensajesError').addClass("hidden");
         $('#panelMensajesAdvertencia').addClass("hidden");
         $('#panelConstancias').removeClass("hidden");
         comunConstancia.constanciaLista();
         }
         }
         */
    });

    $('#liGrupoA').click(function () {
        $('.btnPaso').removeClass("active");
        $('#btnPaso01').addClass("active");
        $(location).attr('href', "#buscarformularios.html");
    });

    // Window Scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 30) {
            $('.box-float').addClass("sombra-box");
        } else {
            $('.box-float').removeClass("sombra-box");
        }
    });

    //Eventos nuevos
    $("#btnAceptarFraccionamiento0621").click(function () {
        $("#modalFraccionamientoDeuda0621").modal("hide");
        $('#modalConfirmacionFraccionamientoAplazamientoDeuda0621').modal('show');
    });

    //nuevos funciones agregados de adicionales
    $("#btnCancelarFraccionamiento0621").click(function () {
        $('#modalFraccionamientoDeuda0621').hide();
//        $('.modal-backdrop').removeClass("in").addClass("out");
        setTimeout(function () {
            console.log(":::: continua flujo");
            comunConstancia.continuarFlujo();
        }, 1000);
//        comunConstancia.continuarFlujo();
    });

    $("#btnAceptarFraccionamiento0704").click(function () {
        $("#modalFraccionamientoDeuda0704").modal("hide");
        $('#modalConfirmacionFraccionamientoAplazamientoDeuda0704').modal('show');
    });

    //nuevos funciones agregados de adicionales
    $("#btnCancelarFraccionamiento0704").click(function () {
        comunConstancia.continuarFlujo();
    });

    $("#btnConfirmarSolicitudFraccionamiento0621").click(function () {
        console.log(":::::::::::::::::::::::::::::::: segundo mensaje aceptar");

        $("#modalConfirmacionFraccionamientoAplazamientoDeuda0621").modal("hide");
        var formFrac = comunConstancia.jsonFormulario();

        var sustitoriaORectificatoria = "";
        if (formFrac.detalle.tipPer != undefined) {
            console.log(":::::::::::::::::::::::::::::::: json " + JSON.stringify(formFrac));
            console.log("fecPres:::::::::::::::::: " + new Date(formFrac.detalle.fechPres));
            console.log("fecVen:::::::::::::::::: " + new Date(formFrac.detalle.fechVen));
            var fecPresSpliteada = formFrac.detalle.fechPres;//.split('/');
            var fecVenSpliteada = formFrac.detalle.fechVen;//.split('/');
            var fecPresDate = new Date(fecPresSpliteada/*[2], (parseInt(fecPresSpliteada[1]) - 1), fecPresSpliteada[0]*/);
            var fecVenDate = new Date(fecVenSpliteada/*[2], (parseInt(fecVenSpliteada[1]) - 1), fecVenSpliteada[0]*/);
            sustitoriaORectificatoria = (formFrac.detalle.rectificatoria.toLowerCase().indexOf("0") < 0);
        } else {
            console.log(":::::::::::::::::::::::::::::::: json " + JSON.stringify(formFrac));
            console.log("fecPres:::::::::::::::::: " + comunLibreria.casteoDate(formFrac.detalle.fecPres));
            console.log("fecVen:::::::::::::::::: " + comunLibreria.casteoDate(formFrac.detalle.fecVen));

            var fecPresSpliteada = comunLibreria.casteoDate(formFrac.detalle.fecPres);
            var fecVenSpliteada =  comunLibreria.casteoDate(formFrac.detalle.fecVen);
            var fecPresDate = (fecPresSpliteada);
            var fecVenDate = (fecVenSpliteada);
            sustitoriaORectificatoria = (formFrac.detalle.tipoDeclaracion.toLowerCase().indexOf("original") < 0);
        }

        console.log("fecPres:::::::::::::::::: " + fecPresDate);
        console.log("fecVen:::::::::::::::::: " + fecVenDate);

        var fecPresFormularioEsMayorFecVen = fecPresDate > fecVenDate;
        console.log("sustitoriaORectificatoria " + sustitoriaORectificatoria);
        var mensaje = "";
        var cumpleValidaciones = true;
        if (fecPresFormularioEsMayorFecVen) {
            mensaje = "Señor contribuyente, la solicitud de aplazamiento y/o fraccionamiento deberá ser presentada a través del Formulario Virtual 687 a partir del 7mo día hábil del vencimiento para la presentación de su declaración mensual del IGV.";
            $("#modalGeneralDeConstancia span.titleMensajeGeneral").text(mensaje);
            $('#modalGeneralDeConstancia').modal('show');
            cumpleValidaciones = false;
        } else if (sustitoriaORectificatoria) {
            mensaje = "Señor contribuyente, la solicitud de aplazamiento y/o fraccionamiento deberá ser presentada a través del Formulario Virtual 687 a partir del 7mo día hábil del vencimiento para la presentación de su declaración mensual del IGV porque es una declaración sustitutoria/rectificatoria. Además, de haber presentado anteriormente una solicitud de aplazamiento y/o fraccionamiento deberá de desistirse de la misma.";
            $("#modalGeneralDeConstancia span.titleMensajeGeneral").text(mensaje);
            $('#modalGeneralDeConstancia').modal('show');
            cumpleValidaciones = false;
        } else {
            //solo si es original
            var codEntidad = 1;
            var parametrosValidarCondiconesFraccionamiento = formFrac.detalle.numRuc + "/" + codEntidad + "/" + formFrac.detalle.codDependencia;
            console.log(":::::::::parametrosValidarCondiconesFraccionamiento:::::::::: " + parametrosValidarCondiconesFraccionamiento);
            var condicionesFraccionamiento = comunServiciosControlador.validarCondicionesFraccionamiento(parametrosValidarCondiconesFraccionamiento);
            console.log("::::::::::::: " + condicionesFraccionamiento);
            if (condicionesFraccionamiento != null && condicionesFraccionamiento != 'null') {
                if (condicionesFraccionamiento.cod == 0) {
                    mensaje = condicionesFraccionamiento.msg;
                    $("#modalGeneralDeConstancia span.titleMensajeGeneral").text(mensaje);
                    $('#modalGeneralDeConstancia').modal('show');
                    cumpleValidaciones = false;
                }
            }else{
                cumpleValidaciones = false;
                //$('#modalGeneralDeConstancia').modal('hide');
            }
        }

        if (cumpleValidaciones) {
            //to be continued
            //falta mostrar la pantalla CONSULTA DE ESTADOS DE LOS PEDIDOS DE DEUDA
            var cas188 = 0;
            var numOrd = "";
            var desRuc = "";
            if (formFrac.casillas != null) {
                $.each(formFrac.casillas, function (key, value) {
                    var codigoCasilla = value.codigoCasilla;
                    if (codigoCasilla == 188) {
                        cas188 = value.valorCasilla;
                        return false;
                    }
                });
            }
            var json = _getConstanciaGeneral();
            if (json != null) {
                desRuc = json.resultado.razonSocial;
                $.each(json.constancias, function (index, item) {
                    if ((item.codigoFormulario == formFrac.detalle.codFormulario) && (item.periodoTributario == formFrac.detalle.periodoTributo)) {
                        numOrd = item.numeroOrden;
                    }
                });
            }

            var json2 = '{"numRuc":"' + formFrac.detalle.numRuc + '","desRuc":"' + encodeURI(desRuc) + '","codForm":"' + formFrac.detalle.codFormulario + '","impd1":"' + cas188 + '","numOrd":"' + numOrd + '"}';
            var response = comunServiciosControlador.obtenerLinkFraccionamiento(json2);
            var url = "https://www.sunat.gob.pe" + response.resultado;
            window.open(url, "Solicitud_Devolucion");
            comunConstancia.continuarFlujo();

        }
    });

    $("#btnAceptarModalGeneralConstancia").click(function () {
//        comunConstancia.continuarFlujo();
        $("#modalGeneralDeConstancia").hide();
//        $('.modal-backdrop').removeClass("in").addClass("out");
        setTimeout(function () {
            console.log(":::: continua flujo");
            comunConstancia.continuarFlujo();
        }, 1000);
    });

    //nuevos funciones agregados de adicionales
    $("#btnCancelarSolicitudFraccionamiento0621").click(function () {
//        comunConstancia.continuarFlujo();
//        $('.modal-backdrop').removeClass("in").addClass("out");
        $("#modalConfirmacionFraccionamientoAplazamientoDeuda0621").hide();
        setTimeout(function () {
            console.log(":::: continua flujo");
            comunConstancia.continuarFlujo();
        }, 1000);

    });

    $("#btnConfirmarSolicitudFraccionamiento0704").click(function () {
        $("#modalConfirmacionFraccionamientoAplazamientoDeuda0704").modal("hide");
        var formFrac = comunConstancia.jsonFormulario();
        var fechPresSpliteada = formFrac.detalle.fechPres;
        var fechVenSpliteada = formFrac.detalle.fechVen;
        var fechPresDate = new Date(fechPresSpliteada);
        var fechVenDate = new Date(fechVenSpliteada);
        console.log("fec1 " + fechPresDate);
        console.log("fec2 " + fechVenDate);
        var fecPresFormularioEsMayorFecVen = fechPresDate > fechVenDate;
        var mensaje = "";
        var cumpleValidaciones = true;
        if (fecPresFormularioEsMayorFecVen) {
            mensaje = "Señor contribuyente, la solicitud de aplazamiento y/o fraccionamiento, deberá ser presentada a través del Formulario Virtual 687 a partir del 5to día hábil de presentada la declaración anual del Impuesto a la Renta.";
            $("#modalGeneralDeConstancia span.titleMensajeGeneral").text(mensaje);
            $('#modalGeneralDeConstancia').modal('show');
            cumpleValidaciones = false;
        } else {
            //solo si es original
            var codEntidad = 1;
            var parametrosValidarCondiconesFraccionamiento = formFrac.detalle.numRuc + "/" + codEntidad + "/" + formFrac.detalle.codDependencia;
            var condicionesFraccionamiento = comunServiciosControlador.validarCondicionesFraccionamiento(parametrosValidarCondiconesFraccionamiento);
            if (condicionesFraccionamiento != null) {
                if (condicionesFraccionamiento.cod == 0) {
                    mensaje = condicionesFraccionamiento.msg;
                    $("#modalGeneralDeConstancia span.titleMensajeGeneral").text(mensaje);
                    $('#modalGeneralDeConstancia').modal('show');
                    cumpleValidaciones = false;
                }
            }
        }
        if (cumpleValidaciones) {
            //to be continued
            //falta mostrar la pantalla CONSULTA DE ESTADOS DE LOS PEDIDOS DE DEUDA
            var cas146 = 0;
            var cas180 = 0;
            var numOrd = "";
            var desRuc = "";
            if (formFrac.casillas != null) {
                $.each(formFrac.casillas, function (key, value) {
                    var codigoCasilla = value.codigoCasilla;
                    if (codigoCasilla == 146) {
                        cas146 = value.valorCasilla;
                    }
                    if (codigoCasilla == 180) {
                        cas180 = value.valorCasilla;
                    }
                });                 
            }
            var json = _getConstanciaGeneral();
            if (json != null) {
                desRuc = json.resultado.razonSocial;
                $.each(json.constancias, function (index, item) {
                    if ((item.codigoFormulario == formFrac.detalle.codFormulario) && (item.periodoTributario == formFrac.detalle.periodoTributo)) {
                        numOrd = item.numeroOrden;
                    }
                });
            }
            var impd1 = cas146 - cas180;
            var json2 = '{"numRuc":"' + formFrac.detalle.numRuc + '","desRuc":"' + encodeURI(desRuc) + '","codForm":"' + formFrac.detalle.codFormulario + '","impd1":"' + impd1 + '","numOrd":"' + numOrd + '"}';
            var response = comunServiciosControlador.obtenerLinkFraccionamiento(json2);
            var url = "https://www.sunat.gob.pe" + response.resultado;
            window.open(url, "Solicitud_Devolucion");
            comunConstancia.continuarFlujo();

        }
    });

    //nuevos funciones agregados de adicionales
    $("#btnCancelarSolicitudFraccionamiento0704").click(function () {
        comunConstancia.continuarFlujo();
    });

});

$("#interior-tablas tbody tr").click(function () {
    $(".Seleccionado2").removeClass("Seleccionado2");
    $(this).addClass("Seleccionado2");
});

$("#filter").click(function () {
    $(".Filtrar-tabla").toggleClass("hidden");
    $("#Filtro-activo").focus();
});


/*#### Boton activo ####*/
$("#Bread-Crumb-Pasos li a").click(function () {
    $(".current").removeClass("current");
    $(this).addClass("current");
});

$(window).scroll(function () {
    if ($(window).scrollTop() > 60) {
        $(".Carrito-Bar").addClass("Carrito-Bar__Efecto");
    } else {
        $(".Carrito-Bar").removeClass("Carrito-Bar__Efecto");
    }
})

$(".notification-all button").click(function () {
    $(".barraBuscar02").trigger("click");
});

$().ready(function () {

    var imprimirRT = $("#imprimirRT");
    var imprimirResumenTransacciones = $("#imprimirResumenTransacciones");
    var imprimirDetalleModal = $("#imprimirDetalle");
    var imprirmirConstanciaModal = $("#imprirmirConstanciaD");
    var imprirmirConstanciaBoleta = $("#imprirmirConstanciaBoleta");
    var imprirmirConstanciaMasiva = $("#imprirmirConstanciaMasiva");

    $("#tabConstanciasNPS").click(function () {
        $('#panelResumenTransacciones').removeClass("imprimirRT");
        $('#panelConstanciasNPS').addClass("imprimirRT");

    });

    $("#tabResumenTransacciones").click(function () {
        $('#panelResumenTransacciones').addClass("imprimirRT");
        $('#panelConstanciasNPS').removeClass("imprimirRT");
    });

    $("#guardarResumenTransacciones").click(function () {
        var numeroBandeja = $("#numeroBandeja").val();
        var opcionNps = $("#liConstanciasNPS");
        var response = "";
        if (opcionNps.hasClass("active")) {
            response = comunServiciosControlador.obtenerReporteNps(numeroBandeja);
        } else {
            response = comunServiciosControlador.obtenerReporteResumenTransacciones(numeroBandeja);
        }
    });

    $("#enviarCorreoResumenTransacciones").click(function () {
        $('#hiddenTipoEnvioEmail').val('CORREO_RESUMEN_TRANSACCIONES');
        $('#encabezadoCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#spanMensajeErrorGeneral').text("");
        $('#divMensajeErrorGeneral').addClass("hidden");
        $('#enviarCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#myModalEnviarCorreo').modal('show');
    });

    $("#enviarCorreoResumenTransaccionesPopup").click(function () {
        var numeroBandeja = $("#numeroBandeja").val();
        var numeroOrden = $("#hdnNumOrdenConstancia").val();
        var numeroOrdenB = $("#hdnNumOrdenConstanciaBoleta").val();
        console.log("numeroBandeja:" + numeroBandeja);
        console.log("numeroOrden:" + numeroOrden);
        $("#divMenCorr2").addClass("hidden");

        var email = $("#emailResumenTransacciones").val();

        if (email == "") {
            $("#divMenCorr1").removeClass("hidden");
        } else {
            $("#divMenCorr1").addClass("hidden");
            var res = comunLibreria.validarEmail(email);
            if (res == false) {
                $("#divMenCorr2").removeClass("hidden");
            } else {
                $("#divMenCorr2").addClass("hidden");
                var response;
                if ($('#hiddenTipoEnvioEmail').val() == "CORREO_CONSTANCIA") {
                    response = comunServiciosControlador.enviarCorreoReporteConstancia(numeroOrden, $('#emailResumenTransacciones').val());
                } else if ($('#hiddenTipoEnvioEmail').val() == "CORREO_CONSTANCIA_BOLETA") {
                    response = comunServiciosControlador.enviarCorreoReporteConstanciaBoleta(numeroOrden, numeroOrdenB, $('#emailResumenTransacciones').val());
                } else if ($('#hiddenTipoEnvioEmail').val() == "CORREO_CONSTANCIA_MASIVA") {
                    response = comunServiciosControlador.enviarCorreoReporteConstanciaMasiva(numeroBandeja, $('#emailResumenTransacciones').val());
                } else if ($('#hiddenTipoEnvioEmail').val() == "CORREO_RESUMEN_TRANSACCIONES") {
                    response = comunServiciosControlador.enviarCorreoReporteResumenTransacciones(numeroBandeja, $('#emailResumenTransacciones').val());
                    console.log("Respuesta->");
                    console.log(response);
                } else if ($('#hiddenTipoEnvioEmail').val() == "CORREO_DETALLE_RESUMEN_TRANSACCIONES") {
                    response = comunServiciosControlador.enviarCorreoReporteDetalleResumenTransacciones(numeroOrden, numeroBandeja, $('#emailResumenTransacciones').val());
                }

                if (response != null) {
                    console.log('>> respose ', response.codigo, response.mensaje);
                    $('#encabezadoCorreoResumenTransaccionesPopup').addClass("hidden");
                    $('#spanMensajeErrorGeneral').text(response.mensaje);
                    $('#divMensajeErrorGeneral').removeClass("hidden");
                    $('#enviarCorreoResumenTransaccionesPopup').addClass("hidden");
                    $("#emailResumenTransacciones").val("");
                }
            }
        }

    });

    $("#cancelarCorreoResumenTransaccionesPopup").click(function () {
        $('#myModalEnviarCorreo').modal('hide');
        $("#divMenCorr1").addClass("hidden");
        $("#divMenCorr2").addClass("hidden");
        $("#emailResumenTransacciones").val("");
    });

    $('#enviarCorreoDetalleResumenTransacciones').click(function () {
        $('#hiddenTipoEnvioEmail').val('CORREO_DETALLE_RESUMEN_TRANSACCIONES');
        $('#encabezadoCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#spanMensajeErrorGeneral').text("");
        $('#divMensajeErrorGeneral').addClass("hidden");
        $('#enviarCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#myModalEnviarCorreo').modal('show');
    });

    $('#enviarCorreoConstancia').click(function () {
        $('#hiddenTipoEnvioEmail').val('CORREO_CONSTANCIA');
        $('#encabezadoCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#spanMensajeErrorGeneral').text("");
        $('#divMensajeErrorGeneral').addClass("hidden");
        $('#enviarCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#myModalEnviarCorreo').modal('show');
    });
    $('#enviarCorreoConstanciaBoleta').click(function () {
        $('#hiddenTipoEnvioEmail').val('CORREO_CONSTANCIA_BOLETA');
        $('#encabezadoCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#spanMensajeErrorGeneral').text("");
        $('#divMensajeErrorGeneral').addClass("hidden");
        $('#enviarCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#myModalEnviarCorreo').modal('show');
    });

    $('#enviarCorreoConstanciaMasiva').click(function () {
        $('#hiddenTipoEnvioEmail').val('CORREO_CONSTANCIA_MASIVA');
        $('#encabezadoCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#spanMensajeErrorGeneral').text("");
        $('#divMensajeErrorGeneral').addClass("hidden");
        $('#enviarCorreoResumenTransaccionesPopup').removeClass("hidden");
        $('#myModalEnviarCorreo').modal('show');
    });

    $("#exportarDetalleResumenTransacciones").click(function () {
        var numeroOrden = $("#divConstanciaDetalleMasiva span.constancia-identificaciontransaccion-numeroorden").text();
        console.log("numeroOrden:" + numeroOrden);
        var response = comunServiciosControlador.obtenerReporteResumenTransaccionesDetalle(numeroOrden);

    });
    $("#exportarDetalleResumenTransaccionesBoleta").click(function () {
        var numeroOrden = $('#hdnNumOrdenConstancia').val();
        var numeroOrdenB = $('#hdnNumOrdenConstanciaBoleta').val();
        console.log("numeroOrden:" + numeroOrden);
        var parametros = numeroOrden + "/" + numeroOrdenB;
        var response = comunServiciosControlador.obtenerReporteResumenTransaccionesBoleta(parametros);

    });
    $("#exportarConstanciaMasiva").click(function () {
        var numeroBandeja = $("#numeroBandeja").val();

        console.log("numeroBandeja:" + numeroBandeja);

        var response = comunServiciosControlador.obtenerReporteResumenTransaccionesMasiva(numeroBandeja);

    });


    $("#exportarConstanciaDetalle").click(function () {
        var numeroOrden = $("#hdnNumOrdenConstancia").val();
        var numeroBandeja = $("#numeroBandeja").val();
        console.log("numeroOrden:" + numeroOrden);
        console.log("numeroBandeja:" + numeroBandeja);
        var parametros = numeroOrden + "/" + numeroBandeja;
        var response = comunServiciosControlador.obtenerReporteConstanciaDetalle(parametros);

    });

    imprimirRT.click(function () {
        var valorModal = imprimirRT.data("form");
        printMe(valorModal);
    });
    imprimirDetalleModal.click(function () {

        var valorModal = imprimirDetalleModal.data("form");
        printMe(valorModal);
    });
    imprirmirConstanciaModal.click(function () {
        var valorModal = imprirmirConstanciaModal.data("form");
        printMe(valorModal);
    });

    imprirmirConstanciaBoleta.click(function () {
        var valorModal = imprirmirConstanciaBoleta.data("form");
        printMe(valorModal);
    });

    imprirmirConstanciaMasiva.click(function () {
        var valorModal = imprirmirConstanciaMasiva.data("form");
        printMe(valorModal);
    });

    function printMe(valorModal) {
        var disp_setting = "toolbar=yes,location=no,";
        disp_setting += "directories=yes,menubar=yes,";
        disp_setting += "scrollbars=yes,width=650, height=600, left=100, top=25";
        //var content_vlue = document.getElementById(valorModal).innerHTML;
        var content_vlue = document.getElementsByClassName(valorModal)[0].innerHTML;

        var docprint = window.open("", "", disp_setting);
        docprint.document.open();
        docprint.document.write('<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"');
        docprint.document.write('"http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">');
        docprint.document.write('<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">');
        docprint.document.write('<head><title>Imprimir</title>');
        docprint.document.write('<style type="text/css">body{ margin:0px;');
        docprint.document.write('font-family:verdana,Arial;color:#000;');
        docprint.document.write('font-family:Verdana, Geneva, sans-serif; font-size:12px;}');
        docprint.document.write('fieldset:{ border: 30px solid black; border-bottom-width:50px;  border-top-width:100px; margin:auto; padding: 0; display:table; }');
        docprint.document.write('font-family:Verdana, Geneva, sans-serif; font-size:12px;}');
        docprint.document.write('a{color:#000;text-decoration:none;} </style>');
        docprint.document.write('<link rel="stylesheet" href="../css/libs/bootstrap/bootstrap.min.css" type="text/css" />');
        docprint.document.write('</head><body onLoad="self.print()"><center>');
        docprint.document.write(content_vlue);
        docprint.document.write('</center></body></html>');
        docprint.document.close();
        docprint.focus();
    }

    //PRIMERA INVOCACION DEL IFRAME AL FORMULARIO
    //Inicializando controles de javascript
    console.log("carrito::ready::1");
    comunBandeja.inicializarLocalStorage();
    console.log("carrito::ready::2");
    $(location).attr('href', "#buscarformularios.html");
    console.log("carrito::ready::3");
    $('.date-picker').datepicker({
        format: "mm-yyyy",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true
    });

    $('.date-picker2').datepicker({
        format: "mm-yyyy",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true
    });

    $('.date-picker-002').datepicker({});

});
//webMessage para el formulario carrito.html
function displayMessageCarrito(evt) {
    //console.log("CARRITO.JS::displayMessageCarrito:" + evt.data);
    if (evt.data == "MOSTRAR-CONSTANCIA-ZERO") {
        $('#btnPaso04').trigger('click'); //evento de carrito.js
    }
    if (evt.data == "MOSTRAR-SALIDA") {
        $("#myModal-exit").modal();
    }


}

function aceptarSalir() {
    console.log("Redireccionar a Login");
    localStorage.removeItem("SUNAT.Tutor");
    sessionStorage.setItem('token', "");
    parent.location.href = comunLibreria.getUrlIniciarSesion();
}

if (window.addEventListener) {
    window.addEventListener("message", displayMessageCarrito, false);
} else {
    window.attachEvent("onmessage", displayMessageCarrito);
}
//
window.addEventListener('beforeunload', function (e) {
    console.log("Se ha detectado cierre de windows");
    //localStorage.clear();
}, false);



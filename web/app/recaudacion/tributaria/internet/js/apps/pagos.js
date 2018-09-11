$(document).ready(function () {

    //aportilla
	$("#btnPaso04").addClass("btn-is-disabled");
	$("#btnPaso03").removeClass("btn-is-disabled");
	$("#btnPaso02").addClass("btn-is-disabled");
	$("#btnPaso01").addClass("btn-is-disabled");
    $("#btnPaso03").addClass("current");
	$("#btnPaso01").removeClass("current");
	
    localStorage.setItem("ventana","PAGOS.HTML");

    var montoPagar = comunBandeja.obtenerTotalaPagar();
    var codigoBanco = "";
    //Comentar este parte del codigo para efectos de pruebas de calidad
    $(".pruebaCalidad").show();

    if (montoPagar != -1) {
        //$('*[data-banco="totalpago"]').html("S/." + montoPagar);
        $('*[data-banco="totalpago"]').html("S/." + comunLibreria.obtenerMontoFormateado2(montoPagar));
    }

    $("#muestraTotalaPagar").html('');
    var dataListBancos;
    dataListBancos = comunPresentar.obtenerTributosParaBancos();
    comunPasarela.llenarListaBanco(dataListBancos);


    //////////////////
    //Setea campos por defecto para calidad
    $('#QAtipooperacion').val('04');
    var totalPagoString = $('*[data-banco="totalpago"]').html();
    console.log("totalPagoString:"+totalPagoString);
    totalPagoString = totalPagoString.replace('S/.', '');
    console.log("totalPagoString:"+totalPagoString);
    totalPagoString = totalPagoString.replace(/,/g, '');
    console.log("totalPagoString:"+totalPagoString);
    totalPagoString = totalPagoString.replace('.', '');
    console.log("totalPagoStringF:"+totalPagoString);
    $('#QAimportepagar').val(totalPagoString);
    $('#QAnumeroruc').val(comunLibreria.getNumRUC());
	
    var fechaActualQA = new Date();
    var dia = fechaActualQA.getDate();
    var mes = fechaActualQA.getMonth() + 1;
    if (dia < 10) {
        dia = '0' + dia
    }

    if (mes < 10) {
        mes = '0' + mes
    }
    $('#QAfechapago').val(fechaActualQA.getFullYear() + "" + mes + "" + dia);
    var hora = fechaActualQA.getHours();
    var minutos = fechaActualQA.getMinutes();
    var segundos = fechaActualQA.getSeconds();
    if (hora < 10) {
        hora = '0' + hora
    }
    if (minutos < 10) {
        minutos = '0' + minutos
    }
    if (segundos < 10) {
        segundos = '0' + segundos
    }
    $('#QAhorapago').val(hora + "" + minutos + "" + segundos);
    $('#QArespuestabanco').val('00');
    $('#QAtiposervicio').val('01');

    ////////////////
    $('label img').click(function () {
        var imgDeshabilitado = (this.getAttribute("disabled") == undefined);
        if(imgDeshabilitado){
            $('#msj-error').removeClass("hidden").addClass("fade").addClass("in");
        }
    });
    $('#click-nps').click(function () {
        $('#btn-nps').trigger("click");
    });

    $('#btnPagar2').click(function () {
        console.log("obteniendo bancos!");
        var bancos = $('[data-banco]');
        var checked = false;
        $.each(bancos, function (index1, item1) {
            codigoBanco = item1.attributes["data-banco"].value;
            for (i = 0; i < item1.childNodes.length; i++) {
                if (item1.childNodes[i].localName == "label") {
                    var child = item1.childNodes[i];
                    for (j = 0; j < child.childNodes.length; j++) {
                        if (child.childNodes[j].localName == "input" && child.childNodes[j].name == "banco") {
                            if (child.childNodes[j].checked) {
                                checked = true;
                                break;
                            }
                        }
                    }
                }
                if (checked) {
                    break;
                }
            }
            if (checked) {
                return false;
            }
        });

        if (checked == false) {
            $('#modalSeleccioneMedioPago').modal();
        }else{
			$("#btnPaso04").removeClass("btn-is-disabled");
			$("#btnPaso03").addClass("btn-is-disabled");
			$("#btnPaso02").addClass("btn-is-disabled");
			$("#btnPaso01").addClass("btn-is-disabled");
            var entidad = "";
            var totalPagoString = $('*[data-banco="totalpago"]').html();
            entidad = comunPasarela.obtenerInformacionBanco(codigoBanco);
            $('#btnconfirmar').removeAttr("disabled");
            var mensaje = "";
            if (entidad.indexOf("Banco")>=0) {
                mensaje = " el ";
            }
            comunLibreria.mostrarModalMensajePagos("Sr. Contribuyente seleccionó " + mensaje + entidad + ", el monto a pagar es: " + totalPagoString + ", si es conforme seleccione el botón Aceptar.");
        }

    });

    $(document).on('click', '#btnconfirmar', function () {
        $('#btnconfirmar').prop("disabled", true);
        if (document.getElementById("tarjeta").checked) {
            console.log("Pago con tarjeta credito o debito seleccionada ");
            //llamando presentar y pagar antes de invocar al servlet de comunicacion con Tecnologia VISA
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.CodigoMedioPago", comunPasarela.obtenerCodigoMedioPago('67'));
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.CodigoBanco", '67');
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.NumeroCaso", $("#casoPrueba").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.TipoTrama", $("#tipoTrama").val());

            //Enviando web message a bandeja para iniciar el pago, pluginBandeja.js (Evento WebMessage)
            window.parent.postMessage("PRESENTAR-PAGAR-VISA", "*");
        }
        else {
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.CodigoMedioPago", comunPasarela.obtenerCodigoMedioPago(codigoBanco));
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.CodigoBanco", codigoBanco);
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.NumeroCaso", $("#casoPrueba").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.TipoTrama", $("#tipoTrama").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAnumeropago", $("#QAnumeropago").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAentfinanciera", $("#QAentfinanciera").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAtipooperacion", $("#QAtipooperacion").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAnumerooperacionbanco", $("#QAnumerooperacionbanco").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAfechapago", $("#QAfechapago").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAhorapago", $("#QAhorapago").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAnumeroruc", $("#QAnumeroruc").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAimportepagar", $("#QAimportepagar").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QArespuestabanco", $("#QArespuestabanco").val());
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAtiposervicio", $("#QAtiposervicio").val());

            var isChecked = "0";
            if ($("#QAHabilitado").is(':checked')) {
                isChecked = "1";
            }
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.QAHabilitado", isChecked);

            $('#myModal25').modal('show');

            //Enviando web message a bandeja para iniciar el pago, pluginBandeja.js (Evento WebMessage)
            console.log("presenta-paga");
            setTimeout(function () {
                window.parent.postMessage("PRESENTAR-PAGAR", "*");
            },500);
        }
        comunServiciosControlador.registrarLog(comunLibreria.generarInformacionLog("Pago realizado desde la plataforma de internet"));
    });

    $('iframe#frame').load(function () {
        console.log("Se leyo el Iframe correctamente");
        var varStoresNameIframe = $('#frame').contents().find('#btnAceptarPagar2');
        console.log("Se cargo el id del iframe:" + varStoresNameIframe);

        $(varStoresNameIframe).click('fvisa.html', function () {

            console.log("Clic en Visa boton frame");
            comunBandeja.iniciarProcesoPago("MONTO-VISA");
        });
    });

});

function registraConstanciaPagoVisa(dataJsonPago) {
    if (dataJsonPago.cod != undefined) {
        console.log("Analizando codigo de respuesta de pago");
        if (dataJsonPago.cod == "1") {
            console.log("dataJsonPago.cod:" + dataJsonPago.msg)
            _addDataStorage("SUNAT.AreaTemporal1.Constancia1", JSON.stringify(dataJsonPago));

            // console.log("constancia:" + dataJsonPago.constancia);
            // if (dataJsonPago.constancia != null) {
            //     if (comunLibreria.verificarFormatoJSON(dataJsonPago.constancia)) {
            //         var constanciaJsonPago = $.parseJSON(dataJsonPago.constancia);
            //         _addDataStorage("SUNAT.AreaTemporal1.Constancia2", JSON.stringify(constanciaJsonPago));
            //     }
            // }
            // _addDataStorage("SUNAT.AreaTemporal1.Constancia3", JSON.stringify(dataJsonPago));

        }
        // else {
        //     //Errores en el pago
        //     console.log("dataJsonPago.cod:" + dataJsonPago.msg)
        //     _addDataStorage("SUNAT.AreaTemporal1.Constancia3", JSON.stringify(dataJsonPago));
        // }
        window.parent.postMessage("INICIALIZAR-BANDEJA", "*"); //Enviando mensaje a mainMenu.js que contiene comunBandeja.js
    }
}
//
//webMessage para el formulario pagos.html
function displayMessagePagos(evt) {
    console.log("PAGOS-LISTENER: " + evt.data);
    if (evt.data == "MOSTRAR-CONSTANCIA") {
        $('#myModal25').modal('hide'); //panel de pagos.html
        $('#btnPaso04').trigger('click'); //evento de carrito.js
    }
    else if (evt.data == "PAGOS-REINTENTAR-OPERACION") {
        $('#myModal25').modal('hide'); //ocultar panel de progreso
        $('#modalReintentarPago').modal('show');
    }
    else if (evt.data.indexOf("PAGOS-REINTENTAR-OPERACION-") == 0) {
        $('#myModal25').modal('hide'); //ocultar panel de progreso
        console.log("displayMessagePagos:" + evt.data);
        $("span.titleMensajeReintentarPago").text(evt.data.substring(27, evt.data.length));
        $('#modalReintentarPago').modal('show');
    }
    else if (evt.data == "MOSTRAR-ERROR-SERVIDOR") {
        $('#myModal25').modal('hide'); //panel de pagos.html
        $('#modalErrorSinServicio').modal('show');
    }
    else if (evt.data == "MOSTRAR-MODAL-PRESENTE-PAGUE") {
        $("#modalPresentePague").modal('show');
    }
    else if (evt.data.indexOf("PAGO-VISA-OK-") == 0) {
        console.log("displayMessagePagos:" + evt.data);
        var numIntOpe = evt.data.substring(13, evt.data.length);
        var constanciaRespuesta;
        constanciaRespuesta = comunServiciosBandeja.obtenerResultadoPagoRedis(numIntOpe);
        $("#modalPresentePague").modal('hide');
        registraConstanciaPagoVisa(constanciaRespuesta);
        $('#myModal25').modal('hide'); //panel de pagos.html
        $('#btnPaso04').trigger('click'); //evento de carrito.js
    }
    else if (evt.data == "PAGO-VISA-ERROR") {
        $("#modalPresentePague").modal('hide');
    }
}
if (window.addEventListener) {
    window.addEventListener("message", displayMessagePagos, false);
}
else {
    window.attachEvent("onmessage", displayMessagePagos);
}

$("#btnObtenerNumeroOperacion").click(function(){
			 var mensaje;
		   mensaje=	 comunServiciosBandeja.obtenerNumeroOperacion();
		   $("#QAnumeropago").val(mensaje);
		 
		});
//

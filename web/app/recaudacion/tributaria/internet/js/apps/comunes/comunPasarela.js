var comunPasarela = (function () {
    var dataJsonResult;
    var numeroOperacionSunat;

    numeroOperacionSunat = ""; // Numero de la operacion de SUNAT recibida luego de la presentacion del formulario
    dataJsonResult = ""; //informacion del json de respuesta del servidor

    _obtenerCodigoMedioPago = function (codigoBanco) {
        var result = "11";
        switch (codigoBanco) {
            case "02":
                result = "11";
                break;
            case "09":
                result = "11";
                break;
            case "03":
                result = "11";
                break;
            case "11":
                result = "11";
                break;
            case "07":
                result = "11";
                break;
            case "38":
                result = "11";
                break;
            case "18":
                result = "21";
                break;
            case "67":
                result = "41";
                break;
            case "00":
                result = "51";
                break;
            default:
                result = "11";
        }
        return result;
    };
    /**
     * @function fillListBancosMethod
     * Obtiene la lista de todos los medios de pagos para la declaracion, la informacion recibida es luego directamente actualiza
     * en la interface HTML: pagos.html
     *
     */
    _llenarListaBanco = function (jsonSend) {
        var data = comunServiciosBandeja.obtenerListaBancos(jsonSend);

        if (data.resultado!=undefined) {

            if (data.resultado.msjCabecera!=undefined) {
                $("span.titleCabeceraFormulario").text(data.resultado.msjCabecera);
                $("span.titlePieFormulario").text(data.resultado.msjPie);
            }

            $("body").data("ListBancos", data);
            console.log(data);
            if (data.resultado.listMediosPago != undefined) {

                $.each(data.resultado.listMediosPago, function (index, item) {
                    switch (item.codMedPag) {
                        case '11':
                            $("span.legend-bancos").text(item.nomMedPag);
                            $("span.pie-bancos").text(item.descMedPago);
                            break;
                        case '21':
                            $("span.legend-detracciones").text(item.nomMedPag);
                            $("span.pie-detracciones").text(item.descMedPago);
                            break;
                        case '41':
                            $("span.legend-tarjeta").text(item.nomMedPag);
                            $("span.pie-tarjeta").text(item.descMedPago);
                            break;
                        case '51':
                            $("span.legend-nps").text(item.nomMedPag);
                            $("span.pie-nps").text(item.descMedPago);
                            break;
                        default:
                    }
                    $.each(item.listEntidadFinanciera, function (index2, item2) {
                        console.log("datos cod_ent_fin: " + item2.codEntFin);
                        $('*[data-banco="' + item2.codEntFin + '"]').css("display", "block");
                        $('*[data-titulo="' + item2.codEntFin + '"]').css("font-weight", "Bold");

                        var descripcionAyuda = "";
                        $.each(item2.listHoraAtencioBean, function (index3, item3) {
                            descripcionAyuda = descripcionAyuda + item3.descripcionAyuda + "<br>";
                            $('*[data-titulo="' + item2.codEntFin + '"]').html(item3.tituloAyuda);
                        });

                        $('*[data-des="' + item2.codEntFin + '"]').html(descripcionAyuda);
                        var controlById = $("img[id^='img" + item2.codEntFin + "']");
                        if (controlById != null) {
                            controlById.attr("src", "../img/" + item2.dirUrlImg);
                        }
                    });

                    var deshabilitarMedioPago = (item.visible == 0);
                    if(deshabilitarMedioPago){
                        var contenidoMediosPagos = $('#codMedPag'+item.codMedPag);
                        var inputRadioMedioPagos = contenidoMediosPagos.find("[name='banco']");
                        var rowContieneBancos = contenidoMediosPagos.find("div[class='row']");
                        var imgMedioPagos = contenidoMediosPagos.find("img");
                        console.log(imgMedioPagos);
                        $.each(inputRadioMedioPagos,function (index4,item4) {
                            item4.disabled = true;
                        });

                        $.each(imgMedioPagos,function (index5,item5) {
                            item5.setAttribute("disabled","disabled");
                        });

                        if (item.codMedPag!="22") {
                            rowContieneBancos[0].style.background = "#dddddd";
                            rowContieneBancos[0].style.border = "1px solid #ddd";
                            rowContieneBancos[0].style.borderRadius = "5px";
                        }
                    }
                });
            }
        }
    };
    _obtenerInformacionBanco = function (codEntFin) {
        var result = "";
        var data = $("body").data("ListBancos");
        $("body").data("medioPago", "0");
        if (data.resultado.listMediosPago != undefined) {
            $.each(data.resultado.listMediosPago, function (index, item) {

                $("body").data("medioPago", item.cod_med_pag);
                for (var i = 0; i < item.listEntidadFinanciera.length; i++) {
                    var item2 = item.listEntidadFinanciera[i];
                    if (codEntFin == item2.codEntFin) {
                        result = item2.nomEntFin;
                        break;
                    }
                }
            });
        }
        return result;
    };
    /**
     * @function sendDataPagoMethod
     * Envia al servidor los datos del medio de pago de la declaracion
     *
     */
    _enviarDatosPago = function () {
        var medioPago = "" + localStorage.getItem("SUNAT.AreaTemporal1.CodigoMedioPago");
        var banco = "" + localStorage.getItem("SUNAT.AreaTemporal1.CodigoBanco");
        var tipoTrama = localStorage.getItem("SUNAT.AreaTemporal1.TipoTrama");

        var QAnumeropago = localStorage.getItem("SUNAT.AreaTemporal1.QAnumeropago");
        var QAentfinanciera = localStorage.getItem("SUNAT.AreaTemporal1.QAentfinanciera");
        var QAtipooperacion = localStorage.getItem("SUNAT.AreaTemporal1.QAtipooperacion");
        var QAnumerooperacionbanco = localStorage.getItem("SUNAT.AreaTemporal1.QAnumerooperacionbanco");
        var QAfechapago = localStorage.getItem("SUNAT.AreaTemporal1.QAfechapago");
        var QAhorapago = localStorage.getItem("SUNAT.AreaTemporal1.QAhorapago");
        var QAimportepagar = localStorage.getItem("SUNAT.AreaTemporal1.QAimportepagar");
        var QArespuestabanco = localStorage.getItem("SUNAT.AreaTemporal1.QArespuestabanco");
        var QAtiposervicio = localStorage.getItem("SUNAT.AreaTemporal1.QAtiposervicio");
        var QAnumeroruc = localStorage.getItem("SUNAT.AreaTemporal1.QAnumeroruc");
        var QAHabilitado = localStorage.getItem("SUNAT.AreaTemporal1.QAHabilitado");

        var jsonQA;
        console.log("pago:" + QAHabilitado);
        //if (QAHabilitado=="1") {
        jsonQA = '"tramaQA":{ "numeroPago" : "' + $.trim(QAnumeropago) + '", "codEntFinan" : "' + $.trim(QAentfinanciera) + '", "tipoOpera" : "' + $.trim(QAtipooperacion) + '", "numOperaBanco" : "' + $.trim(QAnumerooperacionbanco) + '", "fecPago" : "' + $.trim(QAfechapago) + '", "horaPago" : "' + $.trim(QAhorapago) + '", "numRuc" : "' + $.trim(QAnumeroruc) + '", "impPago" : "' + comunLibreria.padLeft($.trim(QAimportepagar), 12, '0') + '", "codRespBanco" : "' + $.trim(QArespuestabanco) + '", "tipoServicio" : "' + $.trim(QAtiposervicio) + '"}';
        //}
        console.log("pago:" + jsonQA);
        var jsonSend = '{ "numTransApliCli": "' + numeroOperacionSunat + '", "numPas" : "' + "1" + '", "numMedPagPas" : "1", "codTipmon" : "01", "codMedpag" : "' + medioPago + '", "codEntFin": "' + banco + '", "tipoOperacion": "1", "codTipSer" : "01", "mtoOpe": "' + comunBandeja.obtenerTotalaPagar() + '", "habilitaQA" : "' + QAHabilitado + '", "codMedPre" : "01", "codAplCli" : "01" , "tipoTrama":"' + $.trim(tipoTrama) + '" ' + "," + jsonQA + ' }';
        console.log('jsonSend==> ' + jsonSend);
        $('#myModal25').modal('show');
        dataJsonResult = comunServiciosBandeja.enviarPagoDeclaracion(jsonSend);
    };
    _verificarBandeja = function (numBandeja) {
        var jsonSend = "{ \"codMedPago\" : \"\", \"numBandeja\" : " + numBandeja + "}";
        dataJsonResult = comunServiciosBandeja.verificarBandeja(jsonSend);
        return dataJsonResult;
    };
    return {
        inicializar: function () {
        },
        obtenerNumeroOperacionSunat: function () {
            return numeroOperacionSunat;
        },
        setearNumeroOperacionSunat: function (numeroOperacion) {
            numeroOperacionSunat = numeroOperacion;
        },
        llenarListaBanco: function (jsonSend) {
            _llenarListaBanco(jsonSend);
        },
        enviarDatosPago: function () {
            _enviarDatosPago();
        },
        obtenerResultado: function () {
            return dataJsonResult;
        },
        obtenerCodigoMedioPago: function (codigoBanco) {
            return _obtenerCodigoMedioPago(codigoBanco);
        },
        verificarBandeja: function (numBandeja) {
            return _verificarBandeja(numBandeja);
        },
        obtenerInformacionBanco: function (codEntFin) {
            return _obtenerInformacionBanco(codEntFin);
        }
    };
})();

var comunConstancia = (function () {

    var _miFuncion;
    //var cerrarModalFlujo = false;
    var jsonFormulario;
    var _loop;
    var continuarFlujo = true;
    var cantidadFormularioConstancia = 0;

    _miFuncion = function (itemParametria, itemEvento) {
        console.log("comunConstancia.miFuncionMethod");
    };

    /**
     * @function _mostrarMensajeError
     * En la base a respuesta Json cuando el resultado contiene codigos de error, actualiza y muestra
     * los mensajes de error para cuando se presenta la declaracion o se realiza el pago
     *
     */
    // _mostrarMensajeError = function () {
    //     var data1 = localStorage.getItem("SUNAT.AreaTemporal1.Constancia1");
    //     if (data1 != null) {
    //         var json = JSON.parse(data1);
    //         if (json.resultado != undefined) {
    //             if (json.resultado.codigoOperacionSunat == "200") //operacion con error
    //             {
    //                 $("span.resultado-err-mensaje1").text("Mensaje: " + json.resultado.descripcionOperacionSunat);
    //                 $("span.resultado-err-mensaje2").text("Fecha de Presentación: " + json.resultado.fechaProcesoPresentacion);
    //                 $('li.lista-err-mensaje3').addClass("hidden");
    //                 $('li.lista-err-mensaje4').addClass("hidden");
    //                 $(".Lista-Mensaje-Errores").empty();
    //                 var lstMesasage = "";
    //                 $.each(json.declaraciones, function (index, item) {
    //                     lstMesasage += "<li class='list-group-item'>Formulario: " + item.detalle.codigoFormulario + " - " + item.detalle.descripcionFormulario + " , Periodo Tributario: " + item.detalle.periodoTributario + "</li>";
    //                     $.each(item.mensajes, function (index1, item1) {
    //                         lstMesasage += "<li class='list-group-item'><div style='padding-left:15px'>" + item1.descripcionMensaje + "</div></li>";
    //                     });
    //                 });
    //                 $(".Lista-Mensaje-Errores").append(lstMesasage);
    //             }
    //         }
    //         if (json.resultadoPago != undefined) {
    //             if (json.resultadoPago.resultadoOperacionBancaria == "200") //operacion con error
    //             {
    //                 $('li.lista-err-mensaje3').removeClass("hidden");
    //                 $('li.lista-err-mensaje4').removeClass("hidden");
    //                 $("span.resultado-err-mensaje1").text("Mensaje: " + json.resultadoPago.descripcionOperacionBancaria);
    //                 $("span.resultado-err-mensaje2").text("Fecha de Operacion Bancaria: " + json.resultadoPago.fechaOperacionBancaria);
    //                 $("span.resultado-err-mensaje3").text("Banco: " + json.resultadoPago.descripcionBanco);
    //                 $("span.resultado-err-mensaje4").text("Monto a Pagar: S/. " + json.resultadoPago.montoTotalPagado);
    //             }
    //         }
    //     }
    // };

    /**
     * @function _mostrarMensajeAdvertencia
     * En la base a respuesta Json cuando el resultado contiene mensajes de advertencia, actualiza y muestra
     * los mensajes, a pesar que la respuesta josn contenga codigos de existo en la operacion
     *
     */
    _mostrarMensajeAdvertencia = function () {
        //var data = _unionCadenaJson();
        var json = _getConstanciaGeneral();
        if (json != null) {
            //var json = JSON.parse(data);
            if (json.resultado != undefined) {
                $("span.resultado-adv-mensaje1").text("Mensaje: " + json.resultado.descripcionOperacionSunat);
                $("span.resultado-adv-mensaje2").text("Fecha de Presentación: " + json.resultado.fechaProcesoPresentacion);
                $('li.lista-adv-mensaje3').addClass("hidden");
                $('li.lista-adv-mensaje4').addClass("hidden");
            }
            var data1 = localStorage.getItem("SUNAT.AreaTemporal1.Constancia1");
            if (data1 != null) {
                var dataJsonPago = JSON.parse(data1);
                if (dataJsonPago.cod != undefined) {
                    var lstMessage = "";
                    $(".Lista-Mensaje-Advertencias").empty();
                    lstMessage = "<li class='list-group-item'><div style='padding-left:15px'>" + dataJsonPago.cod + " " + dataJsonPago.msg + "</div></li>";
                    //lstMessage += "<li class='list-group-item'><div style='padding-left:15px'>" + dataJsonPago.constancia + "</div></li>";
                    $(".Lista-Mensaje-Advertencias").append(lstMessage);
                }
            }
        }
    };
    // _mostrarAdvertenciaPagoSinConstancia = function () {
    //     var data = localStorage.getItem("SUNAT.AreaTemporal1.Constancia1");
    //     if (data != null) {
    //         var json = JSON.parse(data);
    //         if (json.resultado != undefined) {
    //             $("span.resultado-adv-mensaje1").text("Mensaje: " + json.resultado.descripcionOperacionSunat + " Numero Operacion:" + json.resultado.numeroOperacionSunat);
    //             $("span.resultado-adv-mensaje2").text("Fecha de Presentación: " + json.resultado.fechaProcesoPresentacion);
    //             $('li.lista-adv-mensaje3').addClass("hidden");
    //             $('li.lista-adv-mensaje4').addClass("hidden");
    //         }
    //         if (json.mensajes != undefined) {
    //             var lstMesasage = "";
    //             $(".Lista-Mensaje-Advertencias").empty();
    //             lstMesasage += "<li class='list-group-item'><div style='padding-left:15px'>No se han generado las constancias, debera de consultarlas en la opcion de consultas de pago. </div></li>";
    //             $(".Lista-Mensaje-Advertencias").append(lstMesasage);
    //         }
    //     }
    // };
    _obtenerStorageConstancia = function (key) {
        return localStorage.getItem("SUNAT.CopiaDeclaracion." + key);
    };
    /**
     * @function _unionCadenaJson
     * Extrae la informacion del local storage para unir las tramas en formato json y retornar una sola trama
     *
     * @return {string} cadena de caracteres en formato json
     */
    // _unionCadenaJson = function () {
    //     var result = "";
    //     var data1 = localStorage.getItem("SUNAT.AreaTemporal1.Constancia1");
    //     var data2 = localStorage.getItem("SUNAT.AreaTemporal1.Constancia2");
    //     if (data1 != null) {
    //         if (data2 != null) {
    //             var pos1 = data1.indexOf("{");
    //             var pos2 = data1.lastIndexOf("}");
    //             var pos3 = data2.indexOf("{");
    //             var pos4 = data2.lastIndexOf("}");
    //             result = "{" + data1.substring(pos1 + 1, (pos2 - pos1)) + "," + data2.substring(pos3 + 1, (pos4 - pos3)) + "}";
    //         } else {
    //             result += data1;
    //         }
    //     } else {
    //         if (data2 != null) {
    //             result += data2;
    //         }
    //     }
    //     return result;
    // };
    _getConstanciaGeneral = function () {
        var result = null;
        var dataString = localStorage.getItem("SUNAT.AreaTemporal1.Constancia1");
        if (dataString != null) {
            var dataJson = JSON.parse(dataString);
            result = dataJson.resultado.constancia;
        }
        return result;
    };
    _getConstanciaGeneralNPS = function () {
        var result = null;
        var dataString = localStorage.getItem("SUNAT.AreaTemporal1.Constancia1");
        if (dataString != null) {
            var dataJson = JSON.parse(dataString);
            result = dataJson.resultado;
        }
        return result;
    };
    /**
     * @function _existeMensajeAdvertencia
     * Verifica si la respuesta Json tiene tags que involucran mensajes de advertencias, para ello
     * analiza viene el tag: "mensajes" dentro de la respuesta Json
     *
     * @return {boolean} true/false
     */
    _existeMensajeAdvertencia = function () {
        var result = false;
        var dataString = localStorage.getItem("SUNAT.AreaTemporal1.Constancia1");
        if (dataString != null) {
            var dataJson = JSON.parse(dataString);
            if (dataJson.cod != undefined) {
                if (dataJson.resultado.constancia == undefined) {
                    result = true;
                }
                if (dataJson.resultado.constancia == null) {
                    result = true;
                }
            }
        }
        console.log("_existeMensajeAdvertencia: " + result);
        return result;
    };

    /**
     * @function _existeMensajeError
     * Verifica si la respuesta Json tiene como resultado el codigo de operacion SUNAT o codigo de operacion
     * bancaria igual a valor = "200", que se ha catalogado como codigos de error
     *
     * @return {boolean} true/false
     */
    _existeMensajeError = function () {
        console.log("_existeMensajeError...");
        var existMesage = false;
        var data1 = localStorage.getItem("SUNAT.AreaTemporal1.Constancia1");
        var data2 = localStorage.getItem("SUNAT.AreaTemporal1.Constancia2");

        if (data1 != null) {
            var json1 = JSON.parse(data1);
            if (json1.resultado != undefined) {
                if (json1.resultado.codigoOperacionSunat == "200") //operacion con error
                {
                    existMesage = true;
                }
            } else if (json1.resultadoPago != undefined) {
                if (json1.resultadoPago.resultadoOperacionBancaria == "200") //operacion con error
                {
                    existMesage = true;
                }
            }
        }
        if (data2 != null) {
            var json2 = JSON.parse(data2);
            if (json2.resultadoPago != undefined) {
                if (json2.resultadoPago.resultadoOperacionBancaria == "200") //operacion con error
                {
                    existMesage = true;
                }
            }
        }
        return existMesage;
    }

    /**
     * @function _constanciaDetalle
     * En la base a respuesta Json llena los valores de la constancia para el detalle de cada formulario declarado
     * en forma dinamica inserta los elementos en la rejilla de tributos y pendientes de pago
     *
     * @param {string} idFormulario - identificador del formulario.
     * @param {boolean} mostrarParaBoleta - si es false se muestra la constancia de detalle por defecta, si es true se muestra la constancia para la boleta.
     */
    _obtenerSimboloMoneda = function (idFormulario) {

        var tipoPago = null;
        var simboloMOneda = "S/.";

        if (idFormulario.indexOf("0621") >= 0) {
            var guuid = localStorage.getItem("SUNAT.CopiaDeclaracion.FormularioGuuid");
            var localStorageArray = localStorage;
            for (var idxLS = 0, lenLS = localStorageArray.length; idxLS < lenLS; idxLS++) {
                var key = localStorageArray.key(idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    var data = localStorage.getItem(key);
                    var json621 = JSON.parse(data);

                    $.each(json621.casillas, function (index, item) {
                        if (item.codigoCasilla == 886) {
                            tipoPago = item.valorCasilla;
                            console.log("::tipoPago:: " + tipoPago);
                            return false;
                        }
                    });
                }
            }
        }
        if (tipoPago != null && tipoPago == "1") {
            simboloMOneda = "$.";
        }
        return simboloMOneda;
    };
    _mostrarMensajeProrrogaIgv = function (idFormulario) {
        console.log("***********_mostrarMensajeProrrogaIgv***************");
        if (idFormulario.indexOf("0621") >= 0) {
            var guuid = localStorage.getItem("SUNAT.CopiaDeclaracion.FormularioGuuid");
            var localStorageArray = localStorage;
            var contador = 0;

            var casilla391;
            var casilla392;


            for (var idxLS = 0, lenLS = localStorageArray.length; idxLS < lenLS; idxLS++) {
                var key = localStorageArray.key(idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    var data = localStorage.getItem(key);
                    var json621 = JSON.parse(data);

                    $.each(json621.casillas, function (index, item) {
                        if (item.codigoCasilla == 391) {
                            casilla391 = item.valorCasilla;
                            contador++;
                        } else if (item.codigoCasilla == 392) {
                            casilla392 = item.valorCasilla;
                            contador++;
                        }
                        if (contador == 2) {
                            return false;
                        }
                    });
                }
            }
        }
        console.log("casilla391 :::: " + casilla391);
        console.log("casilla392 :::: " + casilla392);
        var mensaje = "";
        if (casilla391 == 1) {
            if (casilla392 == null || casilla392 == undefined) {
                mensaje = '"Marca de acogimiento a la prórroga del pago del IGV (Ley 30524):  SiSUNAT verificará el cumplimiento de los requisitos para el acogimiento"';
            } else if (casilla392 == "0000000") {
                mensaje = '"Usted se acogió a la prórroga del pago del IGV (Ley 30524)"';
            } else {
                mensaje = '"Usted no cumple con los requisitos para el acogimiento a la prórroga del pago del IGV (Ley 30524). Los motivos de exclusión los puede consultar en SUNAT Virtual con su Clave SOL"';
            }
        }
        return mensaje;
    };
    _constanciaDetalle = function (idFormulario, mostrarParaBoleta) {
        //var data = _unionCadenaJson();
        //var json = JSON.parse(data);
        var json = _getConstanciaGeneral();
        var json2 = _getConstanciaGeneralNPS();

        var hdnNumOrdenConstancia = $("#hdnNumOrdenConstancia");
        var simboloMOneda = _obtenerSimboloMoneda(idFormulario);
        var mensajeProrrogaIgv = _mostrarMensajeProrrogaIgv(idFormulario);

        var numeroRUC = json.resultado.numeroRUC;
        var razonSocial = json.resultado.razonSocial;
        var usuarioBean = comunLibreria.obtenerUsuarioBean();
        $("#mensajeRectificatoria").addClass("hidden");
        $("#mensajeRectificatoria").css("display", "none");
        if (usuarioBean != null) {
            numeroRUC = usuarioBean.numRUC;
            razonSocial = usuarioBean.nombreCompleto;
        }

        var numNPS = "0";


        if (json2.numeroNPS != undefined) {
            console.log("nps " + json2.numeroNPS);
            if (json2.numeroNPS != "") {
                numNPS = json2.numeroNPS;
            }
        }

        $.each(json.constancias, function (index, item) {
            var id = item.codigoFormulario + item.periodoTributario;
            if (id == idFormulario) {
                $("span.constancia-identificaciontransaccion-numeroformulario").text(item.codigoFormulario);
                $("span.constancia-identificaciontransaccion-numeroorden").text(item.numeroOrden);
                if (item.fechaProcesoOrden != null && item.fechaProcesoOrden != "") {
                    var fechaProcesoOrden = item.fechaProcesoOrden;
                    if (fechaProcesoOrden.length > 10 && fechaProcesoOrden.indexOf(":") > -1) {
                        fechaProcesoOrden = fechaProcesoOrden.substring(0, 10);
                    }
                    $("span.constancia-identificaciontransaccion-fecha").text(fechaProcesoOrden);
                }

                $("span.constancia-datosdeclaracion-ruc").text(numeroRUC);
                $("span.constancia-datosdeclaracion-razonsocial").text(razonSocial);
                $("span.constancia-datosdeclaracion-periodo").text(item.periodoTributario);
                $("span.constancia-datosdeclaracion-semana").text((item.semana == null ? " " : item.semana));
                $("span.constancia-datosdeclaracion-numTrabajador").text(item.numTrabajador);
                $("span.constancia-datosdeclaracion-numPensionista").text(item.numPensionista);
                $("span.constancia-datosdeclaracion-num4taCategoria").text(item.numCuartaCategoria);
                $("span.constancia-datosdeclaracion-numNorEspecial").text(item.numNorEspecial);
                $("span.constancia-datosdeclaracion-numModFormativa").text(item.numModFormativa);
                $("span.constancia-datosdeclaracion-numTercero").text(item.numTercero);
                if (item.codigoFormulario == "0601" && item.flagPDT == "1") {
                    $("#mostrar601").removeClass("hidden");
                    $("#mostrar601").css("display", "");
                } else {
                    $("#mostrar601").addClass("hidden");
                    $("#mostrar601").css("display", "none");
                }

                var descripcionTipoDeclara = comunLibreria.getEnumTipoDeclaracion().ORIGINAL.name;
                if (item.rectificatoria == "1") {
                    descripcionTipoDeclara = comunLibreria.getEnumTipoDeclaracion().SUSITUTORIA.name;
                } else if (item.rectificatoria == "2") {
                    descripcionTipoDeclara = comunLibreria.getEnumTipoDeclaracion().RECTIFICATORIA.name;
                    $("#mensajeRectificatoria").removeClass("hidden");
                    $("#mensajeRectificatoria").css("display", "");
                }
                $("span.constancia-datosdeclaracion-tipodeclaracion").text(descripcionTipoDeclara);
                $("span.constancia-datosdeclaracion-igv-justo").text(mensajeProrrogaIgv);


                hdnNumOrdenConstancia.val(item.numeroOrden);
                var rptaTotalPagoBoleta = 0;
                var rptaTotalDeuda = 0;
                var flag_panelConstancia = '0';
                if (mostrarParaBoleta == false) {
                    $('#panelConstanciaDetalleTributo').removeClass("hidden");
                    $('#tblConstanciaDetalleTributo tbody').empty();
                    var filaTotalAdd = false;
                    var rptaTotalPago = 0;

                    $.each(item.detalleTributos, function (index, item) {
                        filaTotalAdd = true;
                        if (numNPS != "0") {
                            $('#tblConstanciaDetalleTributo > tbody:last').append('<tr> <td>' + item.codigoTributo + ' ' + item.descripcionTributo + '</td> <td>' + simboloMOneda + ' ' + comunLibreria.obtenerMontoFormateado2(item.totalDeuda) + '</td> <td>' + simboloMOneda + ' 0</td></tr>');
                        } else {
                            $('#tblConstanciaDetalleTributo > tbody:last').append('<tr> <td>' + item.codigoTributo + ' ' + item.descripcionTributo + '</td> <td>' + simboloMOneda + '  ' + comunLibreria.obtenerMontoFormateado2(item.totalDeuda) + '</td> <td>' + simboloMOneda + ' ' + comunLibreria.obtenerMontoFormateado2(item.montoPago) + '</td></tr>');
                            rptaTotalPago += item.montoPago;
                        }
                        rptaTotalDeuda += item.totalDeuda;
                        rptaTotalPagoBoleta += item.montoPagoBoleta;
                    });

                    if (filaTotalAdd) {
                        $('#tblConstanciaDetalleTributo > tbody:last').append('<tr> <td>Total a pagar</td> <td>' + simboloMOneda + ' ' + comunLibreria.obtenerMontoFormateado2(rptaTotalDeuda) + '</td> <td>' + simboloMOneda + ' ' + comunLibreria.obtenerMontoFormateado2(rptaTotalPago) + '</td></tr>');
                    }
                    if ((rptaTotalDeuda == rptaTotalPagoBoleta) && (numNPS == "0")) {
                        $('#panelConstanciaTributoPendiente').addClass("hidden");
                        $('#panelConstanciaTributoPendiente').css("display", "none");
                        flag_panelConstancia = '1';
                    }

                } else {
                    $('#panelConstanciaDetalleTributo').addClass("hidden");
                }

                if (json.resultadoPago != undefined && item.flagPDT == 1) {
                    //$('#fldDetallePagoBanco').removeClass("hidden");
                    //$('#fldDetallePagoBanco').css("display","visible");
                    $("span.constancia-detallepago-banco").text(json.resultadoPago.descripcionBanco);

                    if (json.resultadoPago.numeroOperacionBancaria != null && $.trim(json.resultadoPago.numeroOperacionBancaria) != "null")
                        $("span.constancia-datosdeclaracion-numerooperacion").text(json.resultadoPago.numeroOperacionBancaria);
                    else
                        $("span.constancia-datosdeclaracion-numerooperacion").text("");
                    $("span.constancia-datosdeclaracion-fechapago").text(json.resultadoPago.fechaOperacionBancaria);
                    $("span.constancia-datosdeclaracion-formapago").text(item.formaPago);
                } else {
                    //$('#fldDetallePagoBanco').addClass("hidden");
                    //$('#fldDetallePagoBanco').css("display","none");
                    $("span.constancia-detallepago-banco").text("");
                    $("span.constancia-datosdeclaracion-numerooperacion").text("");
                    $("span.constancia-datosdeclaracion-fechapago").text("");
                    $("span.constancia-datosdeclaracion-formapago").text("");
                }

                if (mostrarParaBoleta == false) {

                    if (item.pagoPendientes != undefined) {
                        if (item.pagoPendientes != null) {
                            $('#panelConstanciaTributoPendiente').addClass("hidden");
                            $('#panelConstanciaTributoPendiente').css("display", "none");
                            if (item.pagoPendientes.length > 0) {

                                if (flag_panelConstancia == "1") {
                                    $('#panelConstanciaTributoPendiente').addClass("hidden");
                                    $('#panelConstanciaTributoPendiente').css("display", "none");
                                } else {
                                    $('#panelConstanciaTributoPendiente').removeClass("hidden");
                                    $('#panelConstanciaTributoPendiente').css("display", "");
                                }
                                $('#tblConstanciaTributoPendiente tbody').empty();
                                $.each(item.pagoPendientes, function (index, item) {
                                    $('#tblConstanciaTributoPendiente > tbody:last').append('<tr> <td>' + item.periodo + '</td> <td>' + item.tributo + '</td> <td>' + simboloMOneda + ' ' + comunLibreria.obtenerMontoFormateado2(item.deuda) + '</td></tr>');
                                });
                            }
                        }
                    } else {
                        $('#panelConstanciaTributoPendiente').addClass("hidden");
                        $('#panelConstanciaTributoPendiente').css("display", "none");
                    }

                } else {
                    $('#panelConstanciaTributoPendiente').addClass("hidden");
                    $('#panelConstanciaTributoPendiente').css("display", "none");
                }

            }
        });
    };
    /**
     Metodo para llenar las boletas de los formularios
     */
    _constanciaDetalleBoleta = function (numOrden, mostrarParaBoleta) {
        //var data = _unionCadenaJson();
        //var json = JSON.parse(data);
        var json = _getConstanciaGeneral();
        console.log("_constanciaDetalleBoleta:" + numOrden);

        var hdnNumOrdenConstancia = $("#hdnNumOrdenConstancia");
        var hdnNumOrdenConstanciaBoleta = $('#hdnNumOrdenConstanciaBoleta');

        var numeroRUC = json.resultado.numeroRUC;
        var razonSocial = json.resultado.razonSocial;
        var usuarioBean = comunLibreria.obtenerUsuarioBean();
        if (usuarioBean != null) {
            numeroRUC = usuarioBean.numRUC;
            razonSocial = usuarioBean.nombreCompleto;
        }
        hdnNumOrdenConstanciaBoleta.val(numOrden);
        $.each(json.constancias, function (index, item) {

            $("span.constancia-boleta-datosdeclaracion-ruc").text(numeroRUC);
            $("span.constancia-boleta-datosdeclaracion-razonsocial").text(razonSocial);
            //boletas
            $.each(item.boletas, function (jndex, bol) {
                if (bol.numeroOrden == numOrden) {
                    hdnNumOrdenConstancia.val(item.numeroOrden);
                    $("span.constancia-boleta-identificaciontransaccion-numeroformulario").text(bol.codigoFormulario);
                    $("span.constancia-boleta-identificaciontransaccion-numeroorden").text(bol.numeroOrden);
                    $("span.constancia-boleta-datosdeclaracion-periodo").text(bol.periodoTributario);
                    $("span.constancia-boleta-datosdeclaracion-tipopago").text(item.formaPago);
                    $("span.constancia-boleta-datosdeclaracion-tributo").text(bol.codigoTributo + " - " + bol.descripcionTributo);
                    $("span.constancia-boleta-datosdeclaracion-codDeclaracion").text(item.codigoFormulario);
                    $("span.constancia-boleta-datosdeclaracion-numeroordenasociado").text(item.numeroOrden);
                    $("span.constancia-boleta-datosdeclaracion-importepagado").text("S/. " + comunLibreria.obtenerMontoFormateado2(bol.montoPago));
                }
            });


            if (json.resultadoPago != undefined) {
                $('#fldDetallePagoBancoBoleta').removeClass("hidden");

                if (json.resultadoPago.numeroOperacionBancaria != null && $.trim(json.resultadoPago.numeroOperacionBancaria) != "null")
                    $("span.constancia-boleta-detallepago-numerooperacion").text(json.resultadoPago.numeroOperacionBancaria);
                else
                    $("span.constancia-boleta-detallepago-numerooperacion").text("");

                if (json.resultadoPago.numeroOperacionSunat != null) {
                    $("span.constancia-boleta-detallepago-numerooperacionsunat").text(json.resultadoPago.numeroOperacionSunat);
                } else {
                    $("span.constancia-boleta-detallepago-numerooperacionsunat").text("");
                }
                $("span.constancia-boleta-detallepago-formapago").text(json.resultadoPago.desMedPag);
                $("span.constancia-boleta-detallepago-banco").text(json.resultadoPago.descripcionBanco);
                $("span.constancia-boleta-detallepago-fechapago").text(json.resultadoPago.fechaOperacionBancaria);
            } else {
                //$('#fldDetallePagoBancoBoleta').addClass("hidden");
                $("span.constancia-boleta-detallepago-numerooperacionsunat").text("");
                $("span.constancia-boleta-detallepago-formapago").text("");
                $("span.constancia-boleta-detallepago-banco").text("");
                $("span.constancia-boleta-detallepago-numerooperacion").text("");
                $("span.constancia-boleta-detallepago-fechapago").text("");
            }
        });
    };
    _constanciaDetalleMasiva = function () {
        //var data = _unionCadenaJson();
        //var json = JSON.parse(data);
        var json = _getConstanciaGeneral();
        var mostrarParaBoleta = false;
        var dinamicoCarousel = $('#carousel-example-generic .carousel-inner');
        var i = 0;
        var divActivado = $("<div />", {
            "class": "item active",
        });
        var divDesactivado = $("<div />", {
            "class": "item",
        });
        dinamicoCarousel.empty();
        var numeroRUC = json.resultado.numeroRUC;
        var razonSocial = json.resultado.razonSocial;
        var usuarioBean = comunLibreria.obtenerUsuarioBean();
        if (usuarioBean != null) {
            numeroRUC = usuarioBean.numRUC;
            razonSocial = usuarioBean.nombreCompleto;
        }


        $.each(json.constancias, function (index, item) {
            var simboloMoneda = _obtenerSimboloMoneda(item.codigoFormulario);

            var id = item.codigoFormulario + item.periodoTributario;
            //  if (id == idFormulario) {
            var divConstanciaDetalleMasiva = $('#divConstanciaDetalleMasiva').clone();

            divConstanciaDetalleMasiva.find('#panelConstanciaDetalleTributo').attr('id', 'panelConstanciaDetalleTributoD');
            divConstanciaDetalleMasiva.find('#tblConstanciaDetalleTributo').attr('id', 'tblConstanciaDetalleTributoD');
            divConstanciaDetalleMasiva.find('#fldDetallePagoBanco').attr('id', 'fldDetallePagoBancoD');
            divConstanciaDetalleMasiva.find('#panelConstanciaTributoPendiente').attr('id', 'panelConstanciaTributoPendienteD');
            divConstanciaDetalleMasiva.find('#tblConstanciaTributoPendiente').attr('id', 'tblConstanciaTributoPendienteD');

            divConstanciaDetalleMasiva.find("span.constancia-identificaciontransaccion-numeroformulario").text(item.codigoFormulario);
            divConstanciaDetalleMasiva.find("span.constancia-identificaciontransaccion-numeroorden").text(item.numeroOrden);
            if (item.fechaProcesoOrden != null && item.fechaProcesoOrden != "") {
                var fechaProcesoOrden = item.fechaProcesoOrden;
                if (fechaProcesoOrden.length > 10 && fechaProcesoOrden.indexOf(":") > -1) {
                    fechaProcesoOrden = fechaProcesoOrden.substring(0, 10);
                }
                divConstanciaDetalleMasiva.find("span.constancia-identificaciontransaccion-fecha").text(fechaProcesoOrden);
            }
            divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-ruc").text(numeroRUC);
            divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-razonsocial").text(razonSocial);
            divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-periodo").text(item.periodoTributario);
            divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-semana").text((item.semana == null ? " " : item.semana));

            divConstanciaDetalleMasiva.find("#mensajeRectificatoria").addClass('hidden');
            divConstanciaDetalleMasiva.find("#mensajeRectificatoria").css("display", "none");
            var descripcionTipoDeclara = comunLibreria.getEnumTipoDeclaracion().ORIGINAL.name;
            if (item.rectificatoria == "1") {
                descripcionTipoDeclara = comunLibreria.getEnumTipoDeclaracion().SUSITUTORIA.name;
            } else if (item.rectificatoria == "2") {
                descripcionTipoDeclara = comunLibreria.getEnumTipoDeclaracion().RECTIFICATORIA.name;
                divConstanciaDetalleMasiva.find("#mensajeRectificatoria").removeClass('hidden');
                divConstanciaDetalleMasiva.find("#mensajeRectificatoria").css("display", "");
            }
            divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-tipodeclaracion").text(descripcionTipoDeclara);

            // hdnNumOrdenConstancia.val(item.numeroOrden);

            if (mostrarParaBoleta == false) {
                divConstanciaDetalleMasiva.find('#panelConstanciaDetalleTributoD').removeClass("hidden");
                divConstanciaDetalleMasiva.find('#tblConstanciaDetalleTributoD tbody').empty();
                var filaTotalAdd = false;
                var rptaTotalDeuda = 0;
                var rptaTotalPago = 0;
                $.each(item.detalleTributos, function (index, item) {
                    filaTotalAdd = true;
                    divConstanciaDetalleMasiva.find('#tblConstanciaDetalleTributoD > tbody:last').append('<tr> <td>' + item.codigoTributo + ' ' + item.descripcionTributo + '</td> <td>' + simboloMoneda + ' ' + comunLibreria.obtenerMontoFormateado2(item.totalDeuda) + '</td> <td>' + simboloMoneda + ' ' + comunLibreria.obtenerMontoFormateado2(item.montoPago) + '</td></tr>');
                    rptaTotalDeuda += item.totalDeuda;
                    rptaTotalPago += item.montoPago;
                });
                if (filaTotalAdd) {
                    divConstanciaDetalleMasiva.find('#tblConstanciaDetalleTributoD > tbody:last').append('<tr> <td>Total a pagar</td> <td>' + simboloMoneda + ' ' + comunLibreria.obtenerMontoFormateado2(rptaTotalDeuda) + '</td> <td>' + simboloMoneda + ' ' + comunLibreria.obtenerMontoFormateado2(rptaTotalPago) + '</td></tr>');
                }
            } else {
                divConstanciaDetalleMasiva.find('#panelConstanciaDetalleTributoD').addClass("hidden");
            }

            if (json.resultadoPago != undefined && item.flagPDT == 1) {
                //divConstanciaDetalleMasiva.find('#fldDetallePagoBancoD').removeClass("hidden");
                divConstanciaDetalleMasiva.find("span.constancia-detallepago-banco").text(json.resultadoPago.descripcionBanco);
                if (json.resultadoPago.numeroOperacionBancaria != null && $.trim(json.resultadoPago.numeroOperacionBancaria) != "null")
                    divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-numerooperacion").text(json.resultadoPago.numeroOperacionBancaria);
                else
                    divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-numerooperacion").text("");
                divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-fechapago").text(json.resultadoPago.fechaOperacionBancaria);
                divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-formapago").text(item.formaPago);
            } else {
                // divConstanciaDetalleMasiva.find('#fldDetallePagoBancoD').addClass("hidden");
                divConstanciaDetalleMasiva.find("span.constancia-detallepago-banco").text("");
                divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-numerooperacion").text("");
                divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-fechapago").text("");
                divConstanciaDetalleMasiva.find("span.constancia-datosdeclaracion-formapago").text("");
            }

            if (mostrarParaBoleta == false) {

                if (item.pagoPendientes != undefined) {
                    if (item.pagoPendientes != null) {
                        divConstanciaDetalleMasiva.find('#panelConstanciaTributoPendienteD').addClass("hidden");
                        if (item.pagoPendientes.length > 0) {
                            divConstanciaDetalleMasiva.find('#panelConstanciaTributoPendienteD').removeClass("hidden");
                            divConstanciaDetalleMasiva.find('#tblConstanciaTributoPendienteD tbody').empty();
                            $.each(item.pagoPendientes, function (index, item) {
                                divConstanciaDetalleMasiva.find('#tblConstanciaTributoPendienteD > tbody:last').append('<tr> <td>' + item.periodo + '</td> <td>' + item.tributo + '</td> <td>' + simboloMoneda + ' ' + comunLibreria.obtenerMontoFormateado2(item.deuda) + '</td></tr>');
                            });
                        }
                    }
                } else {
                    divConstanciaDetalleMasiva.find('#panelConstanciaTributoPendienteD').addClass("hidden");
                }

            } else {
                divConstanciaDetalleMasiva.find('#panelConstanciaTributoPendienteD').addClass("hidden");
            }
            var divClone;
            if (i == 0) {

                divClone = divActivado.clone();
                divClone.append(divConstanciaDetalleMasiva);
            } else {
                divClone = divDesactivado.clone();
                divClone.append(divConstanciaDetalleMasiva);
            }


            dinamicoCarousel.append(divClone);
            //Boletas
            if (item.boletas != null && item.boletas != 'null') {
                $.each(item.boletas, function (jndex, bol) {
                    if (bol.numeroOrden != 0) {
                        var divCDBoletaMasiva = $('#divConstanciaDetalleBoletaMasiva').clone();
                        divConstanciaDetalleMasiva.attr('id', 'divConstanciaDetalleMasiva' + i);
                        divCDBoletaMasiva.attr('id', 'divConstanciaDetalleBoletaMasiva' + i);

                        divCDBoletaMasiva.find('#fldDetallePagoBancoBoleta').attr('id', 'fldDetallePagoBancoBoletaB');

                        divCDBoletaMasiva.find("span.constancia-boleta-datosdeclaracion-ruc").text(numeroRUC);
                        divCDBoletaMasiva.find("span.constancia-boleta-datosdeclaracion-razonsocial").text(razonSocial);

                        divCDBoletaMasiva.find("span.constancia-boleta-identificaciontransaccion-numeroformulario").text(bol.codigoFormulario);
                        divCDBoletaMasiva.find("span.constancia-boleta-identificaciontransaccion-numeroorden").text(bol.numeroOrden);
                        divCDBoletaMasiva.find("span.constancia-boleta-datosdeclaracion-periodo").text(bol.periodoTributario);
                        divCDBoletaMasiva.find("span.constancia-boleta-datosdeclaracion-tipopago").text(item.formaPago);
                        divCDBoletaMasiva.find("span.constancia-boleta-datosdeclaracion-tributo").text(bol.codigoTributo + " - " + bol.descripcionTributo);
                        divCDBoletaMasiva.find("span.constancia-boleta-datosdeclaracion-codDeclaracion").text(item.codigoFormulario);
                        divCDBoletaMasiva.find("span.constancia-boleta-datosdeclaracion-numeroordenasociado").text(item.numeroOrden);
                        divCDBoletaMasiva.find("span.constancia-boleta-datosdeclaracion-importepagado").text(comunLibreria.obtenerMontoFormateado2(bol.montoPago));
                        if (json.resultadoPago != undefined) {
                            divCDBoletaMasiva.find('#fldDetallePagoBancoBoletaB').removeClass("hidden");

                            if (json.resultadoPago.numeroOperacionBancaria != null && $.trim(json.resultadoPago.numeroOperacionBancaria) != "null")
                                divCDBoletaMasiva.find("span.constancia-boleta-detallepago-numerooperacion").text(json.resultadoPago.numeroOperacionBancaria);
                            else
                                divCDBoletaMasiva.find("span.constancia-boleta-detallepago-numerooperacion").text("");

                            if (json.resultadoPago.numeroOperacionSunat != null) {
                                divCDBoletaMasiva.find("span.constancia-boleta-detallepago-numerooperacionsunat").text(json.resultadoPago.numeroOperacionSunat);
                            } else {
                                divCDBoletaMasiva.find("span.constancia-boleta-detallepago-numerooperacionsunat").text("");
                            }
                            divCDBoletaMasiva.find("span.constancia-boleta-detallepago-formapago").text(json.resultadoPago.desMedPag);
                            divCDBoletaMasiva.find("span.constancia-boleta-detallepago-banco").text(json.resultadoPago.descripcionBanco);
                            divCDBoletaMasiva.find("span.constancia-boleta-detallepago-fechapago").text(json.resultadoPago.fechaOperacionBancaria);
                        } else {
                            //$('#fldDetallePagoBancoBoleta').addClass("hidden");
                            divCDBoletaMasiva.find("span.constancia-boleta-detallepago-numerooperacionsunat").text("");
                            divCDBoletaMasiva.find("span.constancia-boleta-detallepago-formapago").text("");
                            divCDBoletaMasiva.find("span.constancia-boleta-detallepago-banco").text("");
                            divCDBoletaMasiva.find("span.constancia-boleta-detallepago-numerooperacion").text("");
                            divCDBoletaMasiva.find("span.constancia-boleta-detallepago-fechapago").text("");
                        }

                        divClone = divDesactivado.clone();
                        divClone.append(divCDBoletaMasiva);
                        dinamicoCarousel.append(divClone);
                    }
                });
            }
            i++;
        });
    };
    _obtenerUsuarioBean = function () {
        var jsonUsuarioBean = null;
        console.log("_obtenerUsuarioBean");
        var ruc = sessionStorage.getItem("RUC_Login");
        console.log("_obtenerUsuarioBean:ruc:" + ruc);
        if (ruc != null) {
            var usuarioBean = sessionStorage.getItem("RUC_" + ruc);
            console.log("_obtenerUsuarioBean:usuarioBean:" + usuarioBean);
            if (usuarioBean != null) {
                jsonUsuarioBean = JSON.parse(usuarioBean);
            }
        }
        return jsonUsuarioBean;
    };
    _verPreliminar697633626 = function (idFormulario) {
        console.log("_verPreliminar697633626:" + idFormulario);
        var numeroRUC = "";
        var razonSocial = "";
        var tipoDeclaracion = "";
        var keyDeclaracion = "";

        var usuarioBean = _obtenerUsuarioBean();
        if (usuarioBean != null) {
            numeroRUC = usuarioBean.numRUC;
            razonSocial = usuarioBean.nombreCompleto;
        }
        var formTotal = localStorage.getItem("SUNAT.FormularioTotal");
        if (parseInt(formTotal) != 0) {
            var guuid = localStorage.getItem("SUNAT.FormularioGuuid");

            var localStorageArray = localStorage;
            for (var idxLS = 0, lenLS = localStorageArray.length; idxLS < lenLS; idxLS++) {
                var key = localStorageArray.key(idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (!comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {

                    var data = localStorage.getItem(key);
                    var json = JSON.parse(data);
                    var id = json.detalle.codFormulario + comunLibreria.formatStringPeriod(json.detalle.periodoTributo);
                    if (id == idFormulario) {
                        console.log("_verPreliminar697633626: encontro formulario" + id);
                        $("span.constancia-declaraciondato-ruc").text(numeroRUC);
                        $("span.constancia-declaraciondato-razonsocial").text(razonSocial);

                        $("span.constancia-declaraciondato-periodo").text(json.detalle.periodoTributo);

                        $.each(json.casillas, function (index, item) {
                            if (item.codigoCasilla == 401) {
                                $("span.constancia-declaracionseccion-casilla401").text(parseFloat(item.valorCasilla).toLocaleString(2));
                            } else if (item.codigoCasilla == 402) {
                                var valor = "";
                                if (item.valorCasilla != "") {
                                    valor = "(" + parseFloat(item.valorCasilla).toLocaleString(2) + ")";
                                }
                                $("span.constancia-declaracionseccion-casilla402").text(valor);
                            } else if (item.codigoCasilla == 403) {
                                $("span.constancia-declaracionseccion-casilla403").text(parseFloat(item.valorCasilla).toLocaleString(2));
                            } else if (item.codigoCasilla == 404) {
                                $("span.constancia-declaracionseccion-casilla404").text(parseFloat(item.valorCasilla).toLocaleString(2));
                            } else if (item.codigoCasilla == 405) {

                                $("span.constancia-declaracionseccion-casilla405").text(parseFloat(item.valorCasilla).toLocaleString(2));
                            } else if (item.codigoCasilla == 410) {
                                $("span.constancia-declaracionseccion-casilla410").text(parseFloat(item.valorCasilla).toLocaleString(2));
                                //$("span.constancia-declaracionseccion-casilla410").text("0.00");
                            } else if (item.codigoCasilla == 895) {
                                tipoDeclaracion = parseFloat(item.valorCasilla).toLocaleString(2);
                            }
                        });

                        if (tipoDeclaracion == "2") {
                            $("span.constancia-declaracionseccion-casillaretificasi").text("X");
                            $("span.constancia-declaracionseccion-casillaretificano").text("");
                        } else {
                            $("span.constancia-declaracionseccion-casillaretificano").text("X");
                            $("span.constancia-declaracionseccion-casillaretificasi").text("");
                        }
                        $("span.constancia-declaracionseccion-casillaformapagoefectivo").text(" ");
                        $("span.constancia-declaracionseccion-casillaformapagocheque").text(" ");
                    }
                }
            }
        }
    };
    /**
     * @function _constanciaDeclaracion697633626
     * Muestra la constancia de la declaracion del formulario presentado, obtiene los datos del localstorage (626,633,697)
     *
     * @param {string} idFormulario - identificador del id del formulario presentado (0626201612) codigo formulario + periodo tributario
     *
     */
    _constanciaDeclaracion697633626 = function (idFormulario) {
        console.log("_constanciaDeclaracion697633626:" + idFormulario);
        var tipoDeclaracion = "";
        var keyDeclaracion = "";
        var hdnNumOrdenConstancia = $("#hdnNumOrdenConstancia");

        // var jsonConstancia = JSON.parse(comunConstancia.unionCadenaJson());
        // var data_orden = _unionCadenaJson();
        // var json_orden = JSON.parse(data_orden);
        // var jsonConstancia = JSON.parse(comunConstancia.unionCadenaJson());

        var json_orden = _getConstanciaGeneral();
        var jsonConstancia = _getConstanciaGeneral();

        $.each(json_orden.constancias, function (index, item) {
            var id = item.codigoFormulario + item.periodoTributario;
            if (id == idFormulario) {
                hdnNumOrdenConstancia.val(item.numeroOrden);
                $("span.constancia-declaraciondato-numorden").text(item.numeroOrden);
                if (item.fechaProcesoOrden != null && item.fechaProcesoOrden != "") {
                    var fechaProcesoOrden = item.fechaProcesoOrden;
                    if (fechaProcesoOrden.length > 10 && fechaProcesoOrden.indexOf(":") > -1) {
                        fechaProcesoOrden = fechaProcesoOrden.substring(0, 10);
                    }
                    $("span.constancia-declaraciondato-fechpres").text(fechaProcesoOrden);
                }
            }
        });

        var formTotal = localStorage.getItem("SUNAT.CopiaDeclaracion.FormularioTotal");
        if (parseInt(formTotal) != 0) {
            var guuid = localStorage.getItem("SUNAT.CopiaDeclaracion.FormularioGuuid");

            var localStorageArray = localStorage;
            for (var idxLS = 0, lenLS = localStorageArray.length; idxLS < lenLS; idxLS++) {
                var key = localStorageArray.key(idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    var data = localStorage.getItem(key);
                    var json = JSON.parse(data);
                    var id = json.detalle.codFormulario + comunLibreria.formatStringPeriod(json.detalle.periodoTributo);
                    var es621 = false;
                    if (id == idFormulario) {
                        console.log("_constanciaDeclaracion697633626: encontro formulario, asignando valores");
                        $("span.constancia-declaraciondato-ruc").text(jsonConstancia.resultado.numeroRUC);
                        $("span.constancia-declaraciondato-periodo").text(json.detalle.periodoTributo);
                        if (json.detalle.codFormulario == "0626") {
                            $("span.constancia-declaraciondato-titulo").text("RETENCIÓN");
                            $("span.constancia-declaraciondato-titulo2").text("RETENCIONES");
                            $("span.constancia-declaraciondato-descripcionFor").text("AGENTES DE RETENCIÓN");
                            $("span.constancia-declaraciondato-codfor").text(json.detalle.codFormulario);
                        } else if (json.detalle.codFormulario == "0633") {
                            $("span.constancia-declaraciondato-titulo").text("PERCEPCIÓN");
                            $("span.constancia-declaraciondato-titulo2").text("PERCEPCIONES");
                            $("span.constancia-declaraciondato-descripcionFor").text("AGENTES DE PERCEPCIONES");
                            $("span.constancia-declaraciondato-codfor").text(json.detalle.codFormulario);
                        } else if (json.detalle.codFormulario == "0697") {
                            $("span.constancia-declaraciondato-titulo").text("PERCEPCIÓN");
                            $("span.constancia-declaraciondato-titulo2").text("PERCEPCIONES");
                            $("span.constancia-declaraciondato-descripcionFor").text("AGENTES DE PERCEPCIONES VENTAS INTERNAS");
                            $("span.constancia-declaraciondato-codfor").text(json.detalle.codFormulario);
                        } else {
                            es621 = true;
                            $("span.constancia-declaraciondato-descripcionFor").text("PDT IGV - RENTA MENSUAL");
                            $("span.constancia-declaraciondato-codfor").text(json.detalle.codFormulario);
                        }

                        $("span.constancia-declaraciondato-razonsocial").text(jsonConstancia.resultado.razonSocial);


                        if (es621) {
                            $('.otroFormu').hide();
                            $('.formu621').show();

                            var casillas = $("[id*=txt_constancia_]");

                            $.each(casillas, function (k, v) {

                                var cas = $(v).attr("id").split('_')[2];
                                $.each(json.casillas, function (index, item) {
                                    if (item.codigoCasilla == cas) {

                                        if (item.valorCasilla != null && item.valorCasilla != undefined) {
                                            if (cas == "391") {
                                                if (item.valorCasilla == "1") {
                                                    $(v).text("SI");
                                                } else if (item.valorCasilla == "0") {
                                                    $(v).text("NO");
                                                }
                                            } else {
                                                if (cas == "173" || cas == "380") {
                                                    $(v).text(item.valorCasilla);
                                                } else {
                                                    $(v).text(comunLibreria.obtenerMontoFormateado2(item.valorCasilla));
                                                }
                                            }
                                        } else {
                                            $(v).text("");
                                        }
                                        return false;
                                    }
                                });
                            });
                        } else {
                            $('.formu621').hide();
                            $('.otroFormu').show();
                            $.each(json.casillas, function (index, item) {
                                if (item.codigoCasilla == 401) {
                                    $("span.constancia-declaracionseccion-casilla401").text(item.valorCasilla);
                                } else if (item.codigoCasilla == 402) {
                                    var valor = "0";
                                    if (item.valorCasilla != "") {
                                        valor = "(" + item.valorCasilla + ")"
                                    }
                                    $("span.constancia-declaracionseccion-casilla402").text(valor);
                                } else if (item.codigoCasilla == 403) {
                                    $("span.constancia-declaracionseccion-casilla403").text(item.valorCasilla);
                                } else if (item.codigoCasilla == 404) {
                                    $("span.constancia-declaracionseccion-casilla404").text(item.valorCasilla);
                                } else if (item.codigoCasilla == 405) {
                                    $("span.constancia-declaracionseccion-casilla405").text(item.valorCasilla);
                                } else if (item.codigoCasilla == 410) {
                                    //$("span.constancia-declaracionseccion-casilla410").text(reemplazarPuntos(comunLibreria.obtenerMontoFormateado(item.valorCasilla)));  TEMPORAL
                                    $("span.constancia-declaracionseccion-casilla410").text("0.00");
                                } else if (item.codigoCasilla == 895) {
                                    tipoDeclaracion = item.valorCasilla;
                                }
                            });
                        }


                        if (tipoDeclaracion == "2") {
                            $("span.constancia-declaracionseccion-casillaretificano").text(" ");
                            $("span.constancia-declaracionseccion-casillaretificasi").text("X");
                        } else {
                            $("span.constancia-declaracionseccion-casillaretificasi").text(" ");
                            $("span.constancia-declaracionseccion-casillaretificano").text("X");
                        }
                        $("span.constancia-declaracionseccion-casillaformapagoefectivo").text(" ");
                        $("span.constancia-declaracionseccion-casillaformapagocheque").text(" ");
                    }
                }
            }
        }
    };

    function reemplazarPuntos(numero) {
        if (numero != null)
            numero = numero.replace(/\./g, ",")
        return numero;
    }

    function _mostrarMensajeConstancia(constanciaLista) {
        var listaMensajeConsta = $("#listaMensajes");
        listaMensajeConsta.empty();
        if (constanciaLista != null) {
            $.each(constanciaLista, function (i, item) {
                listaMensajeConsta.append('<li>' + item.mensaje + '</li>');
            });
        }
    }

    /**
     * @function _constanciaLista
     * En la base a respuesta Json llena los valores de la constancia en la lista principal de constancias
     * en forma dinamica inserta los elementos en la rejilla denominada: tblConstanciaFormulario
     *
     */
    _constanciaLista = function () {
        var json = _getConstanciaGeneral();
        var foundNPS = false;

        $('#liConstanciasNPS').addClass("hidden");
        $('#panelConstanciasNPS').addClass("hidden");
        $('#liConstanciasNPS').removeClass("active");
        $('#panelConstanciasNPS').removeClass("active");
        $('#liResumenTransacciones').addClass("active");
        $('#panelResumenTransacciones').addClass("active");

        $('#panelResumenTransacciones').addClass("imprimirRT");
        $('#panelConstanciasNPS').removeClass("imprimirRT");

        //var constancia3 = localStorage.getItem("SUNAT.AreaTemporal1.Constancia3");
        //console.log("_constanciaLista1:" + constancia3)
        var jsonNPS = _getConstanciaGeneralNPS();  //JSON.parse(constancia3);
        if (jsonNPS != null) {
            if (jsonNPS.numeroNPS != undefined) {
                if (jsonNPS.numeroNPS != "") {
                    foundNPS = true;
                    console.log("Se ubico constancia de NPS:");
                    $('#liResumenTransacciones').removeClass("active");
                    $('#panelResumenTransacciones').removeClass("active");
                    $('#liConstanciasNPS').removeClass("hidden");
                    $('#panelConstanciasNPS').removeClass("hidden");
                    $('#liConstanciasNPS').addClass("active");
                    $('#panelConstanciasNPS').addClass("active");

                    $('#panelResumenTransacciones').removeClass("imprimirRT");
                    $('#panelConstanciasNPS').addClass("imprimirRT");

                    $("span.constancianps-numero").text(jsonNPS.numeroNPS);
                    $("span.constancianps-importeapagar").text("S/. " + comunLibreria.obtenerMontoFormateado2(json.resultadoPago.montoTotalPagado));
                    $("span.constancianps-fechalimite").text(jsonNPS.fechaVigenciaNPS);

                    console.log("NPS1");
                    $('#tblConstanciaFormulario tbody').empty();
                    $.each(json.constancias, function (index, item) {
                        if (item.flagPDT == "1") {
                            if (item.detalleTributos != undefined) {
                                $.each(item.detalleTributos, function (indexDT, itemDT) {
                                    var montoPago = itemDT.montoPago;
                                    $('#tblConstanciaFormulario > tbody:last').append('<tr> <td>' + item.periodoTributario + '</td> <td>' + itemDT.codigoTributo + '-' + itemDT.descripcionTributo + '</td> <td>' + '-' + '</td> <td>' + item.numeroOrden + '</td> <td> S/. ' + comunLibreria.obtenerMontoFormateado2(montoPago.toString()) + '</td> </tr>');
                                });
                            }
                        } else {
                            console.log("NPS2");
                            if (item.boletas != undefined) {
                                console.log("NPS3");
                                $.each(item.boletas, function (indexDT, itemDT) {
                                    var montoPago = itemDT.montoPago;
                                    $('#tblConstanciaFormulario > tbody:last').append('<tr> <td>' + itemDT.periodoTributario + '</td> <td>' + itemDT.codigoTributo + '-' + itemDT.descripcionTributo + '</td> <td>' + '-' + '</td> <td>' + item.numeroOrden + '</td> <td> S/. ' + comunLibreria.obtenerMontoFormateado2(montoPago.toString()) + '</td> </tr>');
                                });
                            }
                        }
                    });


                    _mostrarMensajeConstancia(json.mensajes);

                    var numeroRUC = json.resultado.numeroRUC;
                    var razonSocial = json.resultado.razonSocial;
                    var usuarioBean = comunLibreria.obtenerUsuarioBean();
                    if (usuarioBean != null) {
                        numeroRUC = usuarioBean.numRUC;
                        razonSocial = usuarioBean.nombreCompleto;
                    }
                    $("span.constancianps-ruc").text(numeroRUC);
                    $("span.constancianps-razonsocial").text(razonSocial);
                    $("span.constancianps-cantidadformulario").text(json.resultado.cantidadFormulario);

                    var tmp = json.resultadoPago.montoTotalPagado;
                    $("span.constancianps-montototal").text("S/. " + comunLibreria.obtenerMontoFormateado2(tmp.toString()));
                }
            }
        }


        if (json.resultado != null) {
            var numeroRUC = json.resultado.numeroRUC;
            var razonSocial = json.resultado.razonSocial;
            var usuarioBean = comunLibreria.obtenerUsuarioBean();
            if (usuarioBean != null) {
                numeroRUC = usuarioBean.numRUC;
                razonSocial = usuarioBean.nombreCompleto;
            }

            $("#numeroBandeja").val(json.resultado.numeroOperacionSunat);
            $("span.constancia-ruc").text(numeroRUC);
            $("span.constancia-razonsocial").text(razonSocial);
            $("span.constancia-fechapresentacion").text(json.resultado.fechaProcesoPresentacion);
            $("span.constancia-cantidadformulario").text(json.resultado.cantidadFormulario);
        }

        if (json.resultadoPago != undefined && foundNPS == false) {
            $("span.constancia-montopagado").text("S/. " + comunLibreria.obtenerMontoFormateado2(json.resultadoPago.montoTotalPagado));
        } else {
            $("span.constancia-montopagado").text("S/. 0");
        }

        $('#tblConstanciaFormulario1 tbody').empty();
        var cantidadFormulario = 0;
        $.each(json.constancias, function (index, item) {
            if (item.flagPDT == "1") {
                $('#tblConstanciaFormulario1 > tbody:last').append('<tr> <td>' + item.codigoFormulario + '</td> <td>' + item.descripcionFormulario + '</td> <td>' + item.numeroOrden + '</td> <td>' + item.periodoTributario + '</td><td>' + item.descripcionTributo + '</td>  <td>' + item.documento + '</td> <td style="text-align: right">S/. ' + comunLibreria.obtenerMontoFormateado2(item.montoPago) + ' </td> <td> <ul class=\"nav navbar-nav pull-right\"> <li> <span class=\"detalles-modal"\ data-toggle=\"tooltip\" data-placement=\"left\" title=\"\">  </span> </li><li> <span class=\"detalles-modal\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Constancia\"> <a href="#" onclick="comunConstancia.constanciaDetalle(\'' + item.codigoFormulario + item.periodoTributario + '\',false);" data-toggle=\"modal\" data-target=\"#myModal2\"> <span style=\"margin:0\" class=\"glyphicon glyphicon-copy\"></span> </a> </span> </li> </ul> </td> </tr>');
            } else {
                $('#tblConstanciaFormulario1 > tbody:last').append('<tr> <td>' + item.codigoFormulario + '</td> <td>' + item.descripcionFormulario + '</td> <td>' + item.numeroOrden + '</td> <td>' + item.periodoTributario + '</td><td>' + item.descripcionTributo + '</td>  <td>' + item.documento + '</td> <td style="text-align: right">S/.0 </td> <td> <ul class=\"nav navbar-nav pull-right\"> <li> <span class=\"detalles-modal\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Detalles\"> <a href=\"#\" onclick="comunConstancia.constanciaDeclaracion697633626(\'' + item.codigoFormulario + item.periodoTributario + '\');" data-toggle=\"modal\" data-target=\"#midetalle\"> <span style=\"margin:0\" class=\"glyphicon glyphicon-list-alt\"></span> </a> </span> </li> <li> <span class=\"detalles-modal\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Constancia\"> <a href="#" onclick="comunConstancia.constanciaDetalle(\'' + item.codigoFormulario + item.periodoTributario + '\',false);" data-toggle=\"modal\" data-target=\"#myModal2\"> <span style=\"margin:0\" class=\"glyphicon glyphicon-copy\"></span> </a> </span> </li> </ul> </td> </tr>');

            }
            cantidadFormulario++;
            // if (item.detalleTributos != undefined) {
            //
            //     $.each(item.detalleTributos, function (indexDT, itemDT) {
            //
            //         var montoPago = comunLibreria.obtenerValorDouble(itemDT.montoPago);
            //
            //         if (itemDT.codigoTributo != "" && montoPago > 0) {
            //             $('#tblConstanciaFormulario1 > tbody:last').append('<tr> <td>' + item.codigoFormulario + '</td> <td>Boleta de pago autogenerada</td> <td>' + item.numeroOrden + '</td> <td>' + item.periodoTributario + '</td> <td>' + itemDT.descripcionTributo + '</td> <td>S/. ' + comunLibreria.obtenerMontoFormateado(itemDT.montoPago) + '</td> <td> <ul class=\"nav navbar-nav pull-right\"> <li> <span class=\"detalles-modal\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Detalles\"> <a href=\"#\" onclick="comunConstancia.constanciaDeclaracion697633626(\'' + item.codigoFormulario + item.periodoTributario + '\');" data-toggle=\"modal\" data-target=\"#midetalle\"> <span style=\"margin:0\" class=\"glyphicon glyphicon-list-alt\"></span> </a> </span> </li> <li> <span class=\"detalles-modal\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Constancia\"> <a href="#" onclick="comunConstancia.constanciaDetalle(\'' + item.codigoFormulario + item.periodoTributario + '\',true);" data-toggle=\"modal\" data-target=\"#myModal2\"> <span style=\"margin:0\" class=\"glyphicon glyphicon-copy\"></span> </a> </span> </li> </ul> </td> </tr>');
            //         }
            //     });
            // }
            if (item.boletas != undefined && foundNPS == false) {

                $.each(item.boletas, function (indexDT, itemDT) {

                    var tmp = itemDT.montoPago;

                    var montoPago = comunLibreria.obtenerValorDouble(tmp.toString());

                    if (itemDT.codigoTributo != "" && montoPago > 0) {
                        $('#tblConstanciaFormulario1 > tbody:last').append('<tr> <td>' + itemDT.codigoFormulario + '</td> <td>BOLETA DE PAGO - VIRTUAL</td> <td>' + itemDT.numeroOrden + '</td> <td>' + itemDT.periodoTributario + '</td> <td>' + itemDT.descripcionTributo + '</td><td>' + item.documento + '</td>  <td style="text-align: right">S/. ' + comunLibreria.obtenerMontoFormateado2(tmp.toString()) + '</td> <td> <ul class=\"nav navbar-nav pull-right\"> <li> <span class=\"detalles-modal\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"\">  </span> </li> <li> <span class=\"detalles-modal\" data-toggle=\"tooltip\" data-placement=\"left\" title=\"Constancia\"> <a href="#" onclick="comunConstancia.constanciaDetalleBoleta(\'' + itemDT.numeroOrden + '\',true);" data-toggle=\"modal\" data-target=\"#myModal2Boleta\"> <span style=\"margin:0\" class=\"glyphicon glyphicon-copy\"></span> </a> </span> </li> </ul> </td> </tr>');
                        cantidadFormulario++;
                    }
                });
            }

        });
        $("span.constancia-cantidadformulario").text(cantidadFormulario);
        _mostrarMensajeConstancia(json.mensajes);
        if (json.resultadoPago != undefined) {

            $("span.constancia-detallepago-descripcionbanco").text(json.resultadoPago.descripcionBanco);
            if (json.resultadoPago.numeroOperacionBancaria != null && $.trim(json.resultadoPago.numeroOperacionBancaria) != "null")
                $("span.constancia-detallepago-numerooperacion").text(json.resultadoPago.numeroOperacionBancaria);
            else
                $("span.constancia-detallepago-numerooperacion").text("");
            $("span.constancia-detallepago-fechapago").text(json.resultadoPago.fechaOperacionBancaria);
            $("span.constancia-detallepago-formapago").text(json.resultadoPago.desMedPag);
            $("span.constancia-detallepago-fechaoperacionbancaria").text(json.resultadoPago.fechaOperacionBancaria);
        } else {
            $("span.constancia-detallepago-descripcionbanco").text("");
            $("span.constancia-detallepago-numerooperacion").text("");
            $("span.constancia-detallepago-fechapago").text("");
            $("span.constancia-detallepago-fechaoperacionbancaria").text("");
        }
        if (json.resultadoPago != undefined && (json.resultadoPago.numeroOperacionBancaria != undefined && json.resultadoPago.numeroOperacionBancaria != null
                && json.resultadoPago.numeroOperacionBancaria != "")) {
            $('#detallePagoResumen').removeClass('hidden');
            $('#detallePagoResumen').css("display", "");
        } else {
            $('#detallePagoResumen').css("display", "none");
        }
    };

    _jsonFormulario = function () {
        return jsonFormulario;
    }

    _asyncLoop = function (o) {
        var idxLS = -1,
                lenLS = localStorage.length;

        _loop = function () {
            if (continuarFlujo) {
                idxLS++;
                o.functionToLoop(_loop, idxLS);
            }
        }
        _loop();
    }

    _mensajeFraccioamiento = function () {
        //TODO: 01Junio2017 revisar implementacion, se verifico pequeños lates...
        var cantidadVecesEntroLooAsync = 0;
        console.log("Mensaje de IGV Justo");
        var formTotal = localStorage.getItem("SUNAT.CopiaDeclaracion.FormularioTotal");
        console.log((formTotal) + "<=================");

        if (parseInt(formTotal) != 0) {
            var guuid = localStorage.getItem("SUNAT.CopiaDeclaracion.FormularioGuuid");

            var localStorageArray = localStorage;
            for (var idxLS = 0, lenLS = localStorageArray.length; idxLS < lenLS; idxLS++) {
                var key = localStorageArray.key(idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    cantidadFormularioConstancia++;
                }
            }
            _asyncLoop({
                length: localStorageArray.length,
                functionToLoop: function (_loop, idxLS) {
                    var key = localStorageArray.key(idxLS);
                    if (comunLibreria.contieneCadena(key, guuid) && (comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                        setTimeout(function () {
                            var data = localStorage.getItem(key);
                            var json = JSON.parse(data);
                            jsonFormulario = json;
                            console.log("Mensaje de Casillas-IgvJusto{}" + idxLS);

                            continuarFlujo = false;
                            __formularioFraccionado(json);
                            __formularioDevolucion(json);
                            cantidadVecesEntroLooAsync++;
                        }, 100);
//                        }, 300);
                    }
                }
            });

            var hiloLlamaFormularioConstancia = setInterval(function () {
                if (cantidadVecesEntroLooAsync < cantidadFormularioConstancia) {
                    _loop();
                } else {
                    clearInterval(hiloLlamaFormularioConstancia);
                    return;
                }
            }, 100);
        }
    }

    __validacionFormularioCondicion3Del0621 = function (parametros, formFrac) {
        var importeIngresos = 0;
        var importeIngresosAnuales = comunServiciosControlador.obtenerIngresosAnuales(parametros);

        console.log(":::::::::::: importeIngresosAnuales: " + JSON.stringify(importeIngresosAnuales));

        if (importeIngresosAnuales != null) {
            if (importeIngresosAnuales.resultado.listaIngresos != null && importeIngresosAnuales.resultado.listaIngresos.length > 0) {
                $.each(importeIngresosAnuales.resultado.listaIngresos, function (key, value) {
                    importeIngresos += parseFloat(value.ingresoDeclarado);
                });
            } else {
                $.each(formFrac.casillas, function (key, value) {
                    var codigoCasilla = value.codigoCasilla;
                    switch (codigoCasilla) {
                        case 100:
                            importeIngresos = parseInt(importeIngresos + value.valorCasilla);
                            break;
                        case 102:
                            importeIngresos = parseInt(importeIngresos - value.valorCasilla);
                            break;
                        case 160:
                            importeIngresos = parseInt(importeIngresos + value.valorCasilla);
                            break;
                        case 162:
                            importeIngresos = parseInt(importeIngresos - value.valorCasilla);
                            break;
                        case 105:
                            importeIngresos = parseInt(importeIngresos + value.valorCasilla);
                            break;
                        case 109:
                            importeIngresos = parseInt(importeIngresos + value.valorCasilla);
                            break;
                    }
                });
            }
        }
        console.log("Ingreso " + importeIngresos);
        if (importeIngresos > (formFrac.detalle.actualUIT * 150)) {
            console.log("Se dara por concluida la evaluación de condiciones con resultado que no cumple.");
            _continuarFlujo();
            return;
        } else {
            $('#modalFraccionamientoDeuda0621').modal('show');
            var modalFraccionamientoDeuda0621 = $(".modal-backdrop");
            var lengthModalFraccionamientoDeuda0621 = modalFraccionamientoDeuda0621.length > 1;
            if (lengthModalFraccionamientoDeuda0621) {
                modalFraccionamientoDeuda0621[0].remove();
            }
        }
    }

    __validacionFormularioCondicion3Del0704 = function (formFrac) {
        var importeIngresos = 0;
        $.each(formFrac.casillas, function (key, value) {
            var codigoCasilla = value.codigoCasilla;
            switch (codigoCasilla) {
                case 461:
                    importeIngresos = parseInt(importeIngresos + value.valorCasilla);
                    break;
                case 462:
                    importeIngresos = parseInt(importeIngresos - value.valorCasilla);
                    break;
                case 473:
                    importeIngresos = parseInt(importeIngresos + value.valorCasilla);
                    break;
                case 475:
                    importeIngresos = parseInt(importeIngresos + value.valorCasilla);
                    break;
                case 477:
                    importeIngresos = parseInt(importeIngresos + value.valorCasilla);
                    break;
                case 433:
                    importeIngresos = parseInt(importeIngresos - value.valorCasilla);
                    break;
                case 481:
                    importeIngresos = parseInt(importeIngresos + value.valorCasilla);
                    break;
            }
        });
        console.log("valor " + importeIngresos);
        if (importeIngresos > (formFrac.detalle.actualUIT * 150)) {
            console.log("Se dara por concluida la evaluación de condiciones con resultado que no cumple.");
            _continuarFlujo();
            return;
        } else {
            $('#modalFraccionamientoDeuda0704').modal('show');
        }
    }

    __formatearFechaAnoMesUnido = function (fecha) {
        var fechaSpliteada;
        if (fecha.indexOf("-") >= 0) {
            fechaSpliteada = fecha.split("-");
        } else {
            fechaSpliteada = fecha.split("/");
        }
        var fechaFormateada = fechaSpliteada[1] + fechaSpliteada[0];
        return fechaFormateada;
    }

    __validacionFormularioCondicion2Del0621 = function (formFrac) {
        var existeCas391 = true;
        console.log("\n\n:::::::::::::::::::: ");
        $.each(formFrac.casillas, function (key, value) {
            console.log("key: " + key + " .... " + value.codigoCasilla + " --- " + value.valorCasilla);
            if (value.codigoCasilla == 391 && value.valorCasilla != null && value.valorCasilla != undefined) {
                console.log(" Casilla 391 " + value.valorCasilla);
//                existeCas391 = (value.valorCasilla == 1 || value.valorCasilla.toLowerCase() == "si");
                existeCas391 = (value.valorCasilla == 0 || value.valorCasilla.toLowerCase() == "no");
                return false;
            }
        });
        console.log(":::::::::::::::existeCas391::::: " + existeCas391);
        if (existeCas391) {
            console.log("::::::::::::::::::::::::::: entra a la condicion 3");
            var indIng = 3; //Indicador de ingresos de los ultimos 12 meses del fomulario 0621
            var tipIng = 1; //Tipo ingreso del formulario 0621
            var periodoMesyAno = "";
            if (formFrac.detalle.tipPer != undefined) {
                periodoMesyAno = formFrac.detalle.periodoTributo;
            } else {
                periodoMesyAno = __formatearFechaAnoMesUnido(formFrac.detalle.periodoTributo);
            }
            var parametros = formFrac.detalle.codFormulario + "/" + formFrac.detalle.numRuc + "/" + periodoMesyAno + "/" + indIng + "/" + tipIng;
            __validacionFormularioCondicion3Del0621(parametros, formFrac);
        } else {
            console.log("::::::::::::::::::::::::::: sigue flujo");
            _continuarFlujo();
            return;
        }
    }

    __validacionFormularioCondicion2Del0704 = function (formFrac) {
        if (formFrac.detalle.rectificatoria == 0) {
            __validacionFormularioCondicion3Del0704(formFrac);
        } else {
            console.log("Se dara por concluida la evaluación de condiciones con resultado que no cumple.");
            _continuarFlujo();
            return;
        }
    }

    _continuarFlujo = function () {
        continuarFlujo = true;
    }

    __formularioFraccionado = function (formFrac) {
        var FV = "FV";
        var PDT = "PDT";
        var tipo = "";
        var importeDeuda = 0;
        var porcentaje = 0.1;
        var irCondicion2Del0621 = false;
        var irCondicion2Del0704 = false;
        console.log(":::::::::::::: " + JSON.stringify(formFrac));
        if (formFrac.detalle.tipPer != undefined) {
            tipo = "PDT";
        } else {
            tipo = "FV";
        }
//        formFrac = JSON.parse(formFrac);
        console.log("1::: " + formFrac.detalle.codFormulario + " ... " + formFrac.detalle.actualUIT + " == " + FV);
        console.log("2::: " + formFrac.casillas);

        if (formFrac.detalle.codFormulario == "0621") {
            if (formFrac.casillas != null) {
                $.each(formFrac.casillas, function (llave, valor) {
                    if (valor.codigoCasilla == 188) {
                        if (valor.valorCasilla > 0) {
                            var cas189 = 0;
                            $.each(formFrac.casillas, function (key, value) {
                                if (value.codigoCasilla == 189) {
                                    cas189 = value.valorCasilla;
                                }
                            });
                            importeDeuda = valor.valorCasilla - cas189;
                            if (importeDeuda > (Number(formFrac.detalle.actualUIT) * porcentaje)) {
                                console.log("Ir a condicion 2 0621 PDT");
                                irCondicion2Del0621 = true;
                                return false;
                            }
                        } else {
                            console.log("Se dara por concluida la evaluación de condiciones con resultado que no cumple.")
                            return false;
                        }
                    }
                });
            }
        } else if (formFrac.detalle.codFormulario == "0704") {
            if (formFrac.casillas != null) {
                $.each(formFrac.casillas, function (llave, valor) {
                    if (valor.codigoCasilla == 146) {
                        if (valor.valorCasilla > 0) {
                            var cas180 = 0;
                            $.each(formFrac.casillas, function (key, value) {
                                if (value.codigoCasilla == 180) {
                                    cas180 = value.valorCasilla;
                                    return false;
                                }
                            });
                            importeDeuda = valor.valorCasilla - cas180;
                            if (importeDeuda > (Number(formFrac.detalle.actualUIT) * porcentaje)) {
                                //condicion 2
                                console.log("Ir a condicion 2");
                                irCondicion2Del0704 = true;
                                return false;
                            }
                        } else {
                            console.log("Se dara por concluida la evaluación de condiciones con resultado que no cumple.")
                            return false;
                        }
                    }
                });
            }
        }


        if (irCondicion2Del0621) {
            __validacionFormularioCondicion2Del0621(formFrac);
        } else if (irCondicion2Del0704) {
            __validacionFormularioCondicion2Del0704(formFrac);
        } else {
            _continuarFlujo();
        }
    }

    __formularioDevolucion = function (formDev) {
        var FV = "FV";
        var PDT = "PDT";
        var irCondicion2Devolucion = false;
        console.log(":::::::::::::: " + JSON.stringify(formDev));
        console.log("DEV1::: " + formDev.detalle.codFormulario + " ... " + formDev.detalle.actualUIT + " == " + PDT);
        console.log("tipPer " + formDev.detalle.tipPer);
        var flgForm = false;
        var flgDev1 = "0";
        var flgDevTrab = false;
        var flgDev2 = "0";
        var flgDev3 = "0";
        var nroTlf = "";
        var mtoDev159 = "";
        var mtoDev141 = "";
        var mtoDev360 = "";
        var valorCasilla116 = 0;
        var sumatoria = 0;

        if ((formDev.detalle.codFormulario == "0667" || formDev.detalle.codFormulario == "0669" || formDev.detalle.codFormulario == "0681") && (formDev.detalle.tipPer == "01" || formDev.detalle.tipPer == "02")) {
            if (formDev.casillas != null) {
                $.each(formDev.casillas, function (llave, valor) {
                    console.log("valor.codigoCasilla: " + valor.codigoCasilla + " --- " + valor.valorCasilla);
                    //RENTA DE PRIMERA CATEGORIA
                    if (valor.codigoCasilla == 160) {
                        if (valor.valorCasilla == 1) {
                            $.each(formDev.casillas, function (key, value) {
                                if (value.codigoCasilla == 159) {
                                    mtoDev159 = $.trim(value.valorCasilla);
                                    var valorDev1 = value.valorCasilla * -1;
                                    if (valorDev1 > 0) {
                                        console.log("Ir a condicion primera");
                                        flgForm = true;
                                        flgDev1 = "1";
                                        return false;
                                    }
                                }
                            });
                        } else {
                            console.log("Se dara por concluida la evaluación de condiciones dev primera categoria.");
                        }
                    }
                    //RENTA DE TRABAJO
                    if (valor.codigoCasilla == 140) {
                        if (valor.valorCasilla == 1) {
                            $.each(formDev.casillas, function (key, value) {
                                if (value.codigoCasilla == 141) {
                                    mtoDev141 = $.trim(value.valorCasilla);
                                    var valorDev2 = value.valorCasilla * -1;
                                    if (valorDev2 > 0) {
                                        console.log("Ir a condicion trabajo");
                                        flgDevTrab = true;
                                        return false;
                                    }
                                }
                            });
                        } else {
                            console.log("Se dara por concluida la evaluación de condiciones dev renta de trabajo.");
                        }
                    }
                    //RENTA DE CAPITAL
                    if (valor.codigoCasilla == 361) {
                        if (valor.valorCasilla == 1) {
                            $.each(formDev.casillas, function (key, value) {
                                if (value.codigoCasilla == 360) {
                                    mtoDev360 = $.trim(value.valorCasilla);
                                    var valorDev3 = value.valorCasilla * -1;
                                    if (valorDev3 > 0) {
                                        console.log("Ir a condicion capital");
                                        flgForm = true;
                                        flgDev3 = "1";
                                        return false;
                                    }
                                }
                            });
                        } else {
                            console.log("Se dara por concluida la evaluación de condiciones dev capital.");
                        }
                    }
                    //Telefono
                    if (valor.codigoCasilla == 28) {
                        nroTlf = ((valor.valorCasilla != null) ? $.trim(valor.valorCasilla) : "");
                    }
                    //
                    if (valor.codigoCasilla == 107 || valor.codigoCasilla == 108 || valor.codigoCasilla == 509 || valor.codigoCasilla == 509 || valor.codigoCasilla == 116 || valor.codigoCasilla == 128 || valor.codigoCasilla == 125) {
                        if (valor.codigoCasilla == 116) {
                            valorCasilla116 = (((valor.valorCasilla == null) || ($.trim(valor.valorCasilla) == "")) ? 0 : $.trim(valor.valorCasilla) * 1);
                        }
                        sumatoria = sumatoria + (((valor.valorCasilla == null) || ($.trim(valor.valorCasilla) == "")) ? 0 : $.trim(valor.valorCasilla) * 1);
                    }
                });
            }

            console.log("sumatoria " + sumatoria);
            console.log("valorCasilla116 " + valorCasilla116);
            if (valorCasilla116 > 0 && sumatoria > 1 && flgDevTrab) {
                flgDev2 = "1";
                flgForm = true;
            }
            if (valorCasilla116 == 0 && sumatoria > 0 && flgDevTrab) {
                flgDev2 = "1";
                flgForm = true;
            }

            if (flgForm) {
                var numOrd = "";
                var desRuc = "";
                var json = _getConstanciaGeneral();
                if (json != null) {
                    desRuc = json.resultado.razonSocial;
                    $.each(json.constancias, function (index, item) {
                        if ((item.codigoFormulario == formDev.detalle.codFormulario) && (item.periodoTributario == formDev.detalle.periodoTributo)) {
                            numOrd = item.numeroOrden;
                        }
                    });
                }

                var json2 = '{"numRuc":"' + formDev.detalle.numRuc + '","desRuc":"' + encodeURI(desRuc) + '","codForm":"' + formDev.detalle.codFormulario + '","nroTlf":"' + nroTlf + '","periodoTributo":"' + formDev.detalle.periodoTributo + '","flgDev1":"' + flgDev1 + '","flgDev2":"' + flgDev2 + '","flgDev3":"' + flgDev3 + '","mtoDev159":"' + mtoDev159 + '","mtoDev141":"' + mtoDev141 + '","mtoDev360":"' + mtoDev360 + '","numOrd":"' + numOrd + '"}';

                console.log("json: " + json2);

                var response = comunServiciosControlador.obtenerLinkDevolucion(json2);
                var devItem = "";
                var url = "";
                if (flgDev1 == "1") {
                    url = "https://www.sunat.gob.pe" + response.urlDevPrimera;
                    var dev1 = "<li><a href='" + url + "' target='_blank'> Solicitud de Devolución - Rentas del Capital Primera Categoría</a></li>";
                    devItem = devItem + dev1;
                }
                if (flgDev2 == "1") {
                    url = "https://www.sunat.gob.pe" + response.urlDevTrabajo;
                    var dev2 = "<li><a href='" + url + "' target='_blank'> Solicitud de Devolución - Rentas de Trabajo</a></li>";
                    devItem = devItem + dev2;
                }
                if (flgDev3 == "1") {
                    url = "https://www.sunat.gob.pe" + response.urlDevSegunda;
                    var dev3 = "<li><a href='" + url + "' target='_blank'> Solicitud de Devolución – Rentas del Capital Segunda Categoría</a></li>";
                    devItem = devItem + dev3;
                }

                console.log("devItem: " + devItem);
                $('#devItem').append(devItem);
                $('#modalDevolucionPreliminar').modal('show');
            } else {
                _continuarFlujo();
            }

        } else {
            _continuarFlujo();
        }
    }

    $("#btnAceptarDevolucionPreliminar").click(function () {
        $('#modalDevolucionPreliminar').modal('hide');
        $('#modalDevolucion').modal('show');
    });

    return {
        miFuncion: function (itemParametria, itemEvento) {
            _miFuncion(itemParametria, itemEvento);
        },
        constanciaDetalle: function (idFormulario, mostrarParaBoleta) {
            _constanciaDetalle(idFormulario, mostrarParaBoleta);
        },
        constanciaDetalleBoleta: function (numOrden, mostrarParaBoleta) {
            _constanciaDetalleBoleta(numOrden, mostrarParaBoleta);
        },
        constanciaDetalleMasiva: function () {
            _constanciaDetalleMasiva();
        },
        constanciaLista: function () {
            _constanciaLista();
        },
        existeMensajeError: function () {
            return _existeMensajeError();
        },
        // mostrarMensajeError: function () {
        //     _mostrarMensajeError();
        // },
        mostrarMensajeAdvertencia: function () {
            _mostrarMensajeAdvertencia();
        },
        // unionCadenaJson: function () {
        //     return _unionCadenaJson();
        // },
        existeMensajeAdvertencia: function () {
            return _existeMensajeAdvertencia();
        },
        obtenerStorageConstancia: function (key) {
            return _obtenerStorageConstancia(key);
        },
        // mostrarAdvertenciaPagoSinConstancia: function () {
        //     _mostrarAdvertenciaPagoSinConstancia();
        // },
        constanciaDeclaracion697633626: function (idDeclaracion) {
            _constanciaDeclaracion697633626(idDeclaracion);
        },
        verPreliminar697633626: function (id) {
            _verPreliminar697633626(id);
        },
        obtenerUsuarioBean: function () {
            _obtenerUsuarioBean();
        },
        mensajeFraccioamiento: function () {
            //TODO: 02Jun2017 descomentar para la version de adicionales
            _mensajeFraccioamiento();
        },
        jsonFormulario: function () {
            return _jsonFormulario();
        },
        continuarFlujo: function () {
            _continuarFlujo();
        }
    };

})();


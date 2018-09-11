var comunBandeja = (function () {
    var presentarLogic;
    var pasarelaLogic;

    presentarLogic = comunPresentar;
    pasarelaLogic = comunPasarela;

    /**
     * @function _addDataStorage
     * Inserta un valor en el localstorage
     *
     * @param {string} key - SUNAT.FormularioTotal
     * @param {string} data - 1
     */
    _addDataStorage = function (key, data) {
        localStorage.setItem(key, data);
    };

    /**
     * @function _existeFormulario
     * Verifica si ya existe agregado en el localstorage la declaracion del formulario
     *
     * @param {string} codigoFormulario - 0626
     * @param {string} periodoTributario - 08-2016
     *
     * @return {boolean} true/false
     */
    _existeFormulario = function (codigoFormulario, periodoTributario) {
        var exist = false;
        var formTotal = localStorage.getItem("SUNAT.FormularioTotal");
        if (parseInt(formTotal) != 0) {
            var guuid = localStorage.getItem("SUNAT.FormularioGuuid");
            var localStorageArray = localStorage;
            for (var idxLS = 0, lenLS = localStorageArray.length; idxLS < lenLS; idxLS++) {
                var key = localStorageArray.key(idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (!comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    var data = localStorage.getItem(key);
                    if (data != null) {
                        var dataJson = $.parseJSON(data);
                        if (dataJson.detalle.codFormulario == codigoFormulario && dataJson.detalle.periodoTributo == periodoTributario) {
                            exist = true;
                            break;
                        }
                    }
                }
            }
        }
        return exist;
    };

    /**
     * @function _validaMaximoFormularios
     * Valida el maximo permitido en la bandeja, valor por defecto 50 elementos
     *
     *
     * @return {boolean} true/false
     */
    _validaMaximoFormularios = function () {
        var maximunIsOK = true;
        var formTotal = localStorage.getItem("SUNAT.FormularioTotal");
        if (parseInt(formTotal) != 0) {
            if (parseInt(formTotal) > 50) {
                maximunIsOK = false;
            }
        }
        return maximunIsOK;
    };

    /**
     * @function _obtenerTotalaPagar
     * Obtiene del localstorage todas las declaraciones de los formularios y sumariza el total a pagar
     *
     * @return {decimal} valor total a pagar
     */
    _obtenerTotalaPagar = function () {
        var montoPagar = -1; //asumiendo que no hay formularios en la bandeja
        var formTotal = localStorage.getItem("SUNAT.FormularioTotal");

        if (parseInt(formTotal) != 0) {
            montoPagar = 0;
            var guuid = localStorage.getItem("SUNAT.FormularioGuuid");

            for (var idxLS = 0, lenLS = localStorage.length; idxLS < lenLS; idxLS++) {
                var key = localStorage.key(idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (!comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    var data = localStorage.getItem(key);
                    var dataJson = $.parseJSON(data);
                    montoPagar = montoPagar + parseFloat(dataJson.detalle.montoPago);
                }
            }
        }
        return montoPagar;
    };
    _actualizandoTotalItems = function () {
        var totalItems = 0;
        var formTotal = localStorage.getItem("SUNAT.FormularioTotal");
        if (parseInt(formTotal) != 0) {
            var guuid = localStorage.getItem("SUNAT.FormularioGuuid");
            for (var idxLS = 0, lenLS = localStorage.length; idxLS < lenLS; idxLS++) {
                var key = localStorage.key(idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (!comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    totalItems = totalItems + 1;
                }
            }
        }
        _addDataStorage("SUNAT.FormularioTotal", totalItems.toString());
        return totalItems;
    };
    _obtenerTotaItemsParaBandeja = function () {
        var totalItems = 0;
        var formTotal = localStorage.getItem("SUNAT.FormularioTotal");
        if (parseInt(formTotal) != 0) {
            var guuid = localStorage.getItem("SUNAT.FormularioGuuid");
            for (var idxLS = 0, lenLS = localStorage.length; idxLS < lenLS; idxLS++) {
                var key = localStorage.key(idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (!comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    totalItems = totalItems + 1;

                    var data = localStorage.getItem(key);
                    var dataJson = $.parseJSON(data);
                    $.each(dataJson.tributos, function (index, item) {
                        if (item.valorTributo != "0") {
                            totalItems = totalItems + 1;
                        }
                    });
                }
            }
        }
        return totalItems;
    };
    /**
     * @function _addKeyInStorage
     * Agrega la informacion de la declaracion del formulario en formato json en el localstorage,
     * genera un key que identifica al formulario ingresado, que luego es enviado como parte de la trama json al servidor
     *
     * @param {string} data - informacion en formato json
     *
     */
    _addKeyInStorage = function (data) {
        var formTotal = 0 + parseInt(localStorage.getItem("SUNAT.FormularioTotal"));
        formTotal += 1;
        var key = localStorage.getItem("SUNAT.FormularioGuuid") + "=" + moment().format("X");

        //Remplazando valor ##__##__## con el guuid para el formulario
        data = data.replace("##__##__##", key);

        _addDataStorage("SUNAT.FormularioTotal", formTotal.toString());
        _addDataStorage(key, data);
        return data;
    };

    /**
     * @function _limpiarLocalStorage
     * Elimina todas entradas de los formularios ingresados en el localstorage, reinicia los contador de formulario y re-genera una
     * nueva clave GUUID para iniciar otra declaracion
     *
     */
    _limpiarLocalStorage = function () {
        console.log("_limpiarLocalStorage");
        var guuid = localStorage.getItem("SUNAT.FormularioGuuid");
        var localStorageArray = localStorage;
        for (var idxLS = 0, lenLS = localStorageArray.length; idxLS < lenLS; idxLS++) {
            var key = localStorageArray.key(idxLS);
            if (comunLibreria.contieneCadena(key, guuid) && (!comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                console.log("_limpiarLocalStorage: eliminando!-->" + key);
                localStorage.removeItem(key);
            }
        }
        _addDataStorage("SUNAT.FormularioTotal", "0");
        _addDataStorage("SUNAT.FormularioGuuid", comunLibreria.generateUUID());
        _addDataStorage("SUNAT.PaginaFormulario.CambioCasillas", "false");
    };

    /**
     * @function _evaluarTipoPago
     * Evalua si la declaracion tiene monto total a pagar mayor a cero para el proceso continue por la pasarela,
     * en caso contrario cuando el monto total a pagar es igual a cero solo pasa por el proceso de presentacion
     *
     * @param {string} sourcePage - identifica de donde es llamado la pagina origen, desde carrito.html o pagos.html
     *
     */
    _evaluarTipoPago = function (sourcePage) {
        var montoPagar = _obtenerTotalaPagar();
        if (montoPagar != -1) {
            //valor distinto a -1, quiere decir que hay monto a pagar, se decide si pasa por pasarela o presentacion
            if (montoPagar > 0) {
                //Proceso pasa por la pasarela
                _oAuth("0106", "_self"); // "frame"
            } else {
                //Proceso pasa por la presentacion
                _iniciarProcesoPago("MONTO-IGUAL-ZERO");
            }
        }
    };

    _post = function (path, params, method, target) {
        method = method || "post"; // Set method to post by default if not specified.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("target", "_self");
        for (var key in params) {
            if (params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }
        document.body.appendChild(form);
        form.submit();
    };

    _oAuth = function (idForm, target) {
        var token = sessionStorage.getItem('token_SUNAT');
        var URL_PLATAFORMA_UNICA_LOCAL = 'http://internet.local2.pu.sunat.gob.pe';
        var URL_PLATAFORMA_UNICA_DESA = 'http://internet.desa.pu.sunat.gob.pe';
        var URL_PLATAFORMA_UNICA_QA = 'http://internet.qa.pu.sunat.gob.pe';
        var URL_PLATAFORMA_UNICA = ""; //URL_PLATAFORMA_UNICA_DESA;
        _post(URL_PLATAFORMA_UNICA + '/servletAcceso', {
            plataforma: "web",
            tipoOperacion: "5",
            idFormulario: idForm,
            recurso: "/plataformaUnica",
            idCache: token
        }, target);
    };

    /**
     * @function _agregarBandeja
     * Adiciona visualmente el formulario al carrito de declaracion, inserta dinamicamente el datos del formulario en la
     * lista del objeto HTML: Lista-Pagos
     *
     * @param {string} data - informacion en formato json que contiene informacion de la declaracion
     *
     */
    _agregarBandeja = function (data) {

        if (!comunLibreria.validarConexionInternet()) {
            $("span.titleMensajeGeneral").text(comunMensajes.getMensaje("INF001", ""));
            $('#modalMensajeGeneral').modal('show');
        } else {

            console.log("_agregarBandeja");
            comunIntegrador.inactivarGuardadoAutomatico();
            var dataJson = JSON.parse(data);

            var montoTotalString = $("#montototal").html();
            montoTotalString = montoTotalString.replace(/,/g, '');
            var montoTotal = parseFloat(montoTotalString) + parseFloat(dataJson.detalle.montoPago);
            var montoTotalFormateado = montoTotal.toLocaleString('en-US', {maximumFractionDigits: 2});
            //$("#montototal").html(parseFloat($("#montototal").html()) + parseFloat(dataJson.detalle.montoPago));
            $("#montototal").html(montoTotalFormateado);

            var keyBandeja = dataJson.detalle.identificadorFormulario; //dataJson.detalle.codFormulario + "-" + dataJson.detalle.periodoTributo;

            //Verificando si existen tributos a la declaracion
            var montoPago_tmp = dataJson.detalle.montoPago;
            var montoPago = dataJson.detalle.montoPago;
            var length = Object.keys(dataJson.tributos).length;
            console.log("Se detecto tributos: " + length + ", monto de declaracion en cero.");
            if (length > 0) {
                montoPago = "0";
            }

            //**** Evluando si es un formulario PDT
            var isFormPDT = false;
            if (dataJson.t7788cargapdt != null) {
                if (dataJson.t7788cargapdt != undefined) {
                    console.log("Es un formulario PDT!");

                    var valorSum = 0;
                    $.each(dataJson.tributos, function (index, item) {
                        valorSum = valorSum + comunLibreria.obtenerValorDouble(item.valorTributo);
                    });
                    montoPago = "" + valorSum.toString();
                    isFormPDT = true;
                }
            }
            //****

            var titledetalle = "";
            var title = '<div id="divBandeja" class="divBandeja">Formulario:<br><label>' + dataJson.detalle.codFormulario + '</label><br>Periodo:<br><label>' + dataJson.detalle.periodoTributo + '</label><br>montoPago:<br><label> S/.' + comunLibreria.obtenerMontoFormateado2(montoPago) + '<br><div>';

            var listapdt = "<li id='" + keyBandeja + "' class='list-group-item' data-tipoFila='FORMULARIO'> " +
                    " <div class='checkbox'> " +
                    "     <label rel='popover'>" +
                    "  " + dataJson.detalle.descripcionFormulario + "  " +
                    "        </label> " +
                    "   </div> " +
                    "   <div class='pull-right action-buttons'> " +
                    "      S./ " + comunLibreria.obtenerMontoFormateado2(montoPago) + "" +
                    "       <a href='#' onclick=\"setKeyEditBandeja('" + keyBandeja + "');\"><span class='glyphicon glyphicon-pencil'></span></a> " +
                    "       <a href='#' onclick=\"setKeyRemoveBandeja('" + keyBandeja + "','" + dataJson.detalle.codFormulario + "');\" data-toggle='modal' data-target='#myModal-trash' class='trash'><span class='glyphicon glyphicon-trash'></span></a> " +
                    "   </div> " +
                    "   <input type='hidden' id='" + keyBandeja + "'  value='" + keyBandeja + "' />   " +
                    " </li>";
            var i = 0;
            if (isFormPDT == false) {
                $.each(dataJson.tributos, function (index, item) {
                    if (item.valorTributo != "0") {
                        i++;
                        //var valorTributoFormateado = parseFloat(item.valorTributo).toLocaleString('en-US', {maximumFractionDigits: 2});
                        var valorTributoFormateado = comunLibreria.obtenerMontoFormateadoWithFractionDigits2(item.valorTributo);
                        titledetalle = '<div id="divBandeja" class="divBandeja">Formulario:<br><label>1662</label><br>Periodo:<br><label>' + dataJson.detalle.periodoTributo + '</label><br>Tributo:<br><label>' + item.codigoTributo + '</label><br>montoPago:<br><label> S/.' + valorTributoFormateado + '</label><div>';
                        listapdt += "<li id='" + keyBandeja + "' class='list-group-item' style='background-color:#f4f4f4' data-tipoFila='BOLETA'> " +
                                " <div onmouseover='comunBandeja.onMouseIn(\"" + keyBandeja + "\",\"" + item.codigoTributo + "\")' rel='popoverdetalle'>" + item.descripcionTributo + " " + comunLibreria.padLeft(i.toString(), 2, '0') + "</div> " +
                                "  <div class='pull-right'>S/. " + valorTributoFormateado + "</div>" +
                                "  <div class='clearfix'></div>  " +
                                "   <hr style='margin:4px'> " +
                                " </li>";
                    }
                });
            }
            $(".Lista-Pagos").append(listapdt);

            if (montoPago_tmp == 0) {
                //if (isFormPDT == true) {
                    i = i + 1;
                //}
                console.log("plugin-sumando items-1:" + i);
                $(".Icono-Carrito__Cantidad").html(parseInt($(".Icono-Carrito__Cantidad").html()) + 0 + i);
                $(".Icono-Carrito__Cantidad2").html(parseInt($(".Icono-Carrito__Cantidad2").html()) + 0 + i);
            } else {
                console.log("plugin-sumando items-2:" + i);
                $(".Icono-Carrito__Cantidad").html(parseInt($(".Icono-Carrito__Cantidad").html()) + 1 + i);
                $(".Icono-Carrito__Cantidad2").html(parseInt($(".Icono-Carrito__Cantidad2").html()) + 1 + i);
            }
            // $("[rel='popoverdetalle']").popover({
            //     html: true,
            //     toggle: 'popover',
            //     container: 'body',
            //     placement: 'right',
            //     trigger: 'hover',
            //     content: titledetalle
            // });
            $("[rel='popover']").popover({
                html: true,
                toggle: 'popover',
                container: 'body',
                placement: 'right',
                trigger: 'hover',
                content: '<div>' + title + '</div>'
            });
        }
    };

    /**
     * @function _iniciarProcesoPago
     * Inicia el proceso de presentacion y pago de las declaraciones que estan incluidas en la bandeja
     *
     * @param {string} indicadorMonto - indicador si el monto es mayor a cero = MONTO-MAYOR-ZERO o igual a cero MONTO-IGUAL-ZERO
     *
     */
    _iniciarProcesoPago = function (indicadorMonto) {

        if (indicadorMonto == "MONTO-MAYOR-ZERO") {
            presentarLogic.empezarPagoMayorZero();
        } else if (indicadorMonto == "MONTO-VISA") {
            presentarLogic.empezarPagoMayorZero();
            //presentarLogic.empezarPagoVisa();
        } else {
            presentarLogic.empezarPago();
        }

        var frames = window.frames || window.document.frames;
        var iframeMenu = frames["frame"];
        localStorage.removeItem("SUNAT.AreaTemporal1.Constancia1");
        localStorage.removeItem("SUNAT.AreaTemporal1.Constancia2");
        localStorage.removeItem("SUNAT.AreaTemporal1.Constancia3");

        var dataJson = presentarLogic.obtenerResultado();

        console.log("Datos devueltos del Servlet: " + dataJson);

        if (dataJson == null) {
            iframeMenu.postMessage("PAGOS-REINTENTAR-OPERACION", "*"); //Enviando mensaje a pagos.js
        } else {
            if (dataJson.resultado != undefined) {
                if (dataJson.resultado != null) {
                    console.log("Codigo Retorno: " + dataJson.cod + " indicadorMonto:" + indicadorMonto);
                    if (dataJson.cod == "1") //operacion con exito
                    {
                        if (indicadorMonto == "MONTO-MAYOR-ZERO") {
                            pasarelaLogic.setearNumeroOperacionSunat(dataJson.resultado.numeroOperacionSunat);
                            pasarelaLogic.enviarDatosPago();
                            var dataJsonPago = pasarelaLogic.obtenerResultado();

                            if (dataJsonPago == null) {
                                iframeMenu.postMessage("PAGOS-REINTENTAR-OPERACION", "*"); //Enviando mensaje a pagos.js
                            } else if (dataJsonPago.cod != undefined && dataJsonPago.cod != null) {
                                console.log("Analizando codigo de respuesta de pago");
                                if (dataJsonPago.cod == "1") {
                                    console.log("dataJsonPago.cod:" + dataJsonPago.msg);
                                    _addDataStorage("SUNAT.AreaTemporal1.Constancia1", JSON.stringify(dataJsonPago));

                                    // _addDataStorage("SUNAT.AreaTemporal1.Constancia1", JSON.stringify(dataJson));
                                    // console.log("constancia:" + dataJsonPago.resultado.constancia);
                                    // if (dataJsonPago.resultado.constancia != null) {
                                    //     //if (comunLibreria.verificarFormatoJSON(dataJsonPago.constancia)) {
                                    //       //  var constanciaJsonPago = $.parseJSON(dataJsonPago.constancia);
                                    //         _addDataStorage("SUNAT.AreaTemporal1.Constancia2", JSON.stringify(dataJsonPago.resultado.constancia));
                                    //     //}
                                    // }
                                    // _addDataStorage("SUNAT.AreaTemporal1.Constancia3", JSON.stringify(dataJsonPago));

                                    window.parent.postMessage("INICIALIZAR-BANDEJA", "*"); //Enviando mensaje a mainMenu.js que contiene comunBandeja.js
                                    iframeMenu.postMessage("MOSTRAR-CONSTANCIA", "*"); //Enviando mensaje a pagos.js
                                } else {
                                    console.log("Mostrar mensaje de error, volver a intentar el pago");
                                    iframeMenu.postMessage("PAGOS-REINTENTAR-OPERACION-" + dataJsonPago.msg, "*"); //Enviando mensaje a pagos.js
                                }
                            }
                        } else if (indicadorMonto == "MONTO-IGUAL-ZERO") {
                            console.log("Mostrando constancia igual a cero");
                            _addDataStorage("SUNAT.AreaTemporal1.Constancia1", JSON.stringify(dataJson));
                            window.parent.postMessage("INICIALIZAR-BANDEJA", "*"); //Enviando mensaje a index.js que contiene comunBandeja.js
                            window.postMessage("MOSTRAR-CONSTANCIA-ZERO", "*"); //Enviando mensaje a carrito.js
                        } else if (indicadorMonto == "MONTO-VISA") {
                            //Se almacena el Json de validar presentacion para posterior uso luego de realizado el pago
                            _addDataStorage("SUNAT.AreaTemporal1.Constancia1", JSON.stringify(dataJson));

                            var numeroOperacionSunat = dataJson.resultado.numeroOperacionSunat;
                            var medioPago = "" + localStorage.getItem("SUNAT.AreaTemporal1.CodigoMedioPago");
                            var banco = "" + localStorage.getItem("SUNAT.AreaTemporal1.CodigoBanco");
                            var numeroCaso = localStorage.getItem("SUNAT.AreaTemporal1.NumeroCaso");
                            var tipoTrama = localStorage.getItem("SUNAT.AreaTemporal1.TipoTrama");
                            var montoOperacion = _obtenerTotalaPagar();

                            console.log("====================montoOperacion2==============" + montoOperacion)
                            console.log("banco:" + banco + " medioPago:" + medioPago + " numeroCaso:" + numeroCaso + " tipoTrama:" + tipoTrama);
                            var parametrosProxyPago;
                            parametrosProxyPago = "numTransApliCli=" + numeroOperacionSunat + "&";
                            parametrosProxyPago = parametrosProxyPago + "numPas=1&";
                            parametrosProxyPago = parametrosProxyPago + "numPas=1&";
                            parametrosProxyPago = parametrosProxyPago + "numMedPagPas=1&";
                            parametrosProxyPago = parametrosProxyPago + "codTipmon=01&";
                            parametrosProxyPago = parametrosProxyPago + "codMedpag=" + medioPago + "&";
                            parametrosProxyPago = parametrosProxyPago + "codEntFin=" + banco + "&";
                            parametrosProxyPago = parametrosProxyPago + "tipoOperacion=1&";
                            parametrosProxyPago = parametrosProxyPago + "codTipSer=01&";
                            parametrosProxyPago = parametrosProxyPago + "mtoOpe=" + montoOperacion + "&";
                            parametrosProxyPago = parametrosProxyPago + "codMedPre=01&";
                            parametrosProxyPago = parametrosProxyPago + "codAplCli=01&";
                            parametrosProxyPago = parametrosProxyPago + "IdCache=" + sessionStorage.getItem('token') + "&";
                            parametrosProxyPago = parametrosProxyPago + "IdFormulario=*MENU*&";

                            var contenidoHtml = comunServiciosControlador.obtenerContenidoHtmlTransaccionesVisa(parametrosProxyPago);
                            $('#frame').contents().find('#frameVisa').contents().find('html').html(contenidoHtml);
                            iframeMenu.postMessage("MOSTRAR-MODAL-PRESENTE-PAGUE", "*"); //Enviando mensaje a pagos.js
                        }
                    } else {
                        console.log("Mostrar mensaje de error, volver a intentar el pago");
                        iframeMenu.postMessage("PAGOS-REINTENTAR-OPERACION", "*"); //Enviando mensaje a pagos.js
                    }
                }
            }
        }
    };

    return {
        actualizandoTotalItems: function () {
            return _actualizandoTotalItems();
        },
        obtenerTotaItemsParaBandeja: function () {
            return _obtenerTotaItemsParaBandeja();
        },
        addKeyDataStorage: function (key, data) {
            localStorage.removeItem(key);
            _addDataStorage(key, data);
        },
        getKeyDataStorage: function (key) {
            //retorna null, null como cadena "null" o vacio en caso existe pero no haya ningun contenido
            return ("" + localStorage.getItem(key));
        },
        addKeyInStorage: function (data) {
            return _addKeyInStorage(data);
        },
        limpiarLocalStorage: function () {
            _limpiarLocalStorage();
        },
        obtenerFormularioActivo: function () {
            var result = "";
            var page = localStorage.getItem("SUNAT.PaginaFormulario.Activo");
            if (page != null) {
                result = page;
            }
            return result;
        },
        obtenerFormularioActivoDescripcion: function () {
            var result = "";
            var page = localStorage.getItem("SUNAT.PaginaFormulario.Descripcion");
            if (page != null) {
                result = page;
            }
            return result;
        },
        setearFormularioActivo: function (codigo, descripcion) {
            _addDataStorage("SUNAT.PaginaFormulario.Activo", codigo);
            _addDataStorage("SUNAT.PaginaFormulario.Descripcion", descripcion);
        },
        inicializarLocalStorage: function () {
            presentarLogic.inicializar();
            pasarelaLogic.inicializar();
            localStorage.removeItem("SUNAT.PaginaFormulario.Version");
            localStorage.removeItem("SUNAT.AreaTemporal1.Constancia1");
            localStorage.removeItem("SUNAT.AreaTemporal1.Constancia2");
            localStorage.removeItem("SUNAT.PaginaFormulario.CambioCasillas");
            localStorage.removeItem("SUNAT.AreaTemporal1.PagosPrevios");
            localStorage.removeItem("SUNAT.AreaTemporal1.Autoguardado.idTimeOutTask");

            var ls = localStorage.getItem("SUNAT.FormularioTotal");
            if (ls == null) {
                _addDataStorage("SUNAT.FormularioTotal", "0");
            }
            ls = localStorage.getItem("SUNAT.FormularioGuuid");
            if (ls == null) {
                _addDataStorage("SUNAT.FormularioGuuid", comunLibreria.generateUUID());
            }
            for (var idxLS = 0, lenLS = localStorage.length; idxLS < lenLS; idxLS++) {
                var key = localStorage.key(idxLS);
                //console.log("inicializarLocalStorage:key: " + key);
                if (comunLibreria.contieneCadena(key, "SUNAT.MontoPagoPrevio")) {
                    localStorage.removeItem(key);
                }
            }
        },
        obtenerTotalaPagar: function () {
            return _obtenerTotalaPagar();
        },
        existeFormulario: function (codigoFormulario, periodo) {
            return _existeFormulario(codigoFormulario, periodo);
        },
        evaluarTipoPago: function (sourcePage) {
            _evaluarTipoPago(sourcePage);
        },
        inicializarBandeja: function () {
            $(".Lista-Pagos").empty();
            $("#montototal").html(parseFloat("0"));
            $(".Icono-Carrito__Cantidad").html("0");
            $(".Icono-Carrito__Cantidad2").html("0");
        },
        agregarBandeja: function (data) {
            _agregarBandeja(data);
        },
        iniciarProcesoPago: function (indicadorMonto) {
            _iniciarProcesoPago(indicadorMonto);
        },
        validaMaximoFormularios: function () {
            return _validaMaximoFormularios();
        },
        invocarFormularioOAuth: function (idForm) {
            _oAuth(idForm, "_self");
        },
        obtenerFormularioIdOAuth: function (enlaceUrl) {
            console.log("obtenerFormularioIdOAuth1:" + enlaceUrl);
            var idOAuthForm = "0101";
            if (enlaceUrl.indexOf("621") >= 0) {
                idOAuthForm = "0102";
            } else if (enlaceUrl.indexOf("626") >= 0) {
                idOAuthForm = "0103";
            } else if (enlaceUrl.indexOf("633") >= 0) {
                idOAuthForm = "0104";
            } else if (enlaceUrl.indexOf("697") >= 0) {
                idOAuthForm = "0105";
            }
            console.log("obtenerFormularioIdOAuth2:" + idOAuthForm);
            return idOAuthForm;
        },
        obtenerDescripcionFormularioByKey: function (keyBandeja) {
            var result = "";
            var dataString = localStorage.getItem(keyBandeja);
            if (dataString != null) {
                var dataJson = JSON.parse(dataString);
                result = dataJson.detalle.descripcionFormulario;
            }
            return result;
        },
        onMouseIn: function (keyBandeja, codigoTributo) {
            console.log("onMouseIn:" + keyBandeja);
            console.log("onMouseIn:" + codigoTributo);
            var titleDetalle = "";
            var dataString = localStorage.getItem(keyBandeja);
            if (dataString != null) {
                console.log("onMouseIn:json ok");
                var dataJson = JSON.parse(dataString);

                $.each(dataJson.tributos, function (index, item) {
                    if (codigoTributo == item.codigoTributo) {
                        var valorTributoFormateado = comunLibreria.obtenerMontoFormateadoWithFractionDigits2(item.valorTributo);
                        titleDetalle = '<div id="divBandeja" class="divBandeja">Formulario:<br><label>1662</label><br>Periodo:<br><label>' + dataJson.detalle.periodoTributo + '</label><br>Tributo:<br><label>' + item.codigoTributo + '</label><br>montoPago:<br><label> S/.' + valorTributoFormateado + '</label><div>';
                        console.log("onMouseIn:OK");
                    }
                });
                $("[rel='popoverdetalle']").popover({
                    html: true,
                    toggle: 'popover',
                    container: 'body',
                    placement: 'right',
                    trigger: 'hover'
                });
                $("[rel='popoverdetalle']").data('bs.popover').options.content = titleDetalle;
                $("[rel='popoverdetalle']").popover('show');

            }
        }
    };

})();

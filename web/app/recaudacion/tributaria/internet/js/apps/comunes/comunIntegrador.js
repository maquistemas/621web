jQuery.fn.ForceNumericOnly =
    function () {
        return this.each(function () {
            $(this).keydown(function (e) {
                var key = e.charCode || e.keyCode || 0;
                // allow backspace, tab, delete, enter, arrows, numbers and keypad numbers ONLY
                // home, end, period, and numpad decimal
                return (
                key == 8 ||
                key == 9 ||
                key == 13 ||
                key == 46 ||
                key == 110 ||
                key == 190 ||
                (key >= 35 && key <= 40) ||
                (key >= 48 && key <= 57) ||
                (key >= 96 && key <= 105));
            });
        });
    };

var comunIntegrador = (function () {
    var myPrivateVar, parserDecoratorMethod;
    var nombreJsonDependencia = "jsonDependencias";
    var operation;
    var detalleParamentros;
    myPrivateVar = 0;
    _operadorMatematico = function (op) {
        this.operation = op;
    };
    _evaluadorMatematico = function (param1, param2) {
        switch (this.operation) {
            case "+":
                return param1 + param2;
            case "-":
                return param1 - param2;
            case "*":
                return param1 * param2;
            case "/":
                return param1 / param2;
            case "<":
                return param1 < param2;
            case ">":
                return param1 > param2;
        }
    };
    _agregarBandejaFormulario = function () {
        //console.log("agregarBandejaFormulario");
    };

    _cargarInformacionAutoGuadado = function () {
        var casillasHash = "";
        var casillas = null;
        var casillasArray = {};
        var coeficienteIgv = [];


        for (var i = 1; i < 12; i++) {
            coeficienteIgv.push({
                clave: "#trExportacion" + i,
                valor: $("#trExportacion" + i).val()
            });

            coeficienteIgv.push({
                clave: "#trVentasNoGravadas" + i,
                valor: $("#trVentasNoGravadas" + i).val()
            });

            coeficienteIgv.push({
                clave: "#trVentasgravada" + i,
                valor: $("#trVentasgravada" + i).val()
            });
        }


        var percepcionesRetenciones = {
            percepciones: {
                datos: formulario0621_importar.extraerContenido(formulario0621.listaMap_Temp_P),
                nombre: formulario0621.nombreArchivoP,
                total: formulario0621.Total_montoComprobantePercepcion
            },
            pagos: {
                datos: formulario0621_importar.extraerContenido(formulario0621.listaMap_Temp_PI),
                nombre: formulario0621.nombreArchivoPI,
                total: formulario0621.Total_montoComprobantePago
            },
            retenciones: {
                datos: formulario0621_importar.extraerContenido(formulario0621.listaMap_Temp_R),
                nombre: formulario0621.nombreArchivoR,
                total: formulario0621.Total_montoComprobanteRetencion
            }
        };

        //        if (nivelDeclaracion == "s-") {
//           casillas = $('.data-s-sunat');
//            $.each(casillas, function (index, item) {
//                casillasArray.push({
//                    codigoCasilla: $(item).data('s-casilla'),
//                    valorCasilla: $('*[data-s-casilla="' + $(item).data('s-casilla') + '"]').val()
//                });
//                casillasHash += $(item).data('s-casilla') + "|" + $('*[data-s-casilla="' + $(item).data('s-casilla') + '"]').val() + "|";
//            });
//        } else {
        casillas = $('.data-' + formulario0621.obtenerNivelDeclaracion() + 'sunat');
        $.each(casillas, function (index, item) {
//            //console.log('------::: '+$(item).data(formulario0621.obtenerNivelDeclaracion() + 'casilla'));
//            //console.log('------::: '+$(item).attr("codtri"));
//            //console.log("\n....." + $(cas).attr("codtri") + " ---- " + val +" --__ "+$(item).data('casilla')+ "\n");
            var cas = $(item);
//            var cas = $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="' + $(item).data(formulario0621.obtenerNivelDeclaracion() + 'casilla') + '"]');
            var val = $(cas).val();
            var tipo = "c";//c = casilla, r=radio
            var atributo = "value";

            if ($(cas).attr("type") == "radio") {
                tipo = "r";
                val = $(cas).is(":checked");
                //console.log("\n....." + $(cas).attr("codtri") + " ---- " + val + " --__ " + $(item).data('casilla') + "\n");
                if (val == true) {
                    /* 
                     * para que cuando traiga el radio con ese nombre de casilla 
                     * pueda comparar por el atributo que sale si es igual
                     * al valor que esta guardado de ser asi le da check al radio
                     */
                    val = $(cas).attr("codtri");
                    atributo = "codtri";
                    if (val == null || val == undefined) {
                        val = $(cas).val();
                        atributo = "value";
                    }
                } else {
                    val = null;
                }
            }

            if (val != null) {
                casillasArray[$(item).data(formulario0621.obtenerNivelDeclaracion() + 'casilla')] =
                    {
                        valor: val,
                        atributo: atributo,
                        tipo: tipo
                    };
                casillasHash += $(item).data(formulario0621.obtenerNivelDeclaracion() + 'casilla') + "|" + $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="' + $(item).data(formulario0621.obtenerNivelDeclaracion() + 'casilla') + '"]').val() + "|";
            }
        });


        var res = [];
        res[0] = casillasHash;
        res[1] = casillasArray;
        res[2] = percepcionesRetenciones;
        res[3] = coeficienteIgv;
        return res;
//        }
    };

    /**
     * @function _activarGuardadoAutomatico
     * Realiza el proceso de calculo de las casillas basado en el objeto json, retorna un nuevo valor
     * para ser asignado al control.
     *
     * @param {string} periodo - periodo tributario en formato MM/AAAA
     * @param {string} codigoFormulario - codigo el formulario ej: 0621
     * @param {string} nivelDeclaracion - solo se considera para el formulario 621, el valor puede ser '' o 's-'
     *
     */
    _activarGuardadoAutomatico = function (periodo, codigoFormulario, nivelDeclaracion) {


        var resAutoguardado = _cargarInformacionAutoGuadado();
        var casillasHash = resAutoguardado[0];
        var casillasArray = resAutoguardado[1];
        var shaCasillas = sha1.hash(casillasHash);


        casillasArray["retePercIGVList"] = resAutoguardado[2];
        casillasArray["coeficienteigv"] = resAutoguardado[3];

//        var shaCasillas = sha1.hash(casillasHash);
//        //console.log("casillasHash:" + casillasHash);
//        //console.log("shaCasillas:" + shaCasillas);

        var nameTag = "###casillas###";
        nameTag = nameTag.replace(new RegExp("###", 'g'), "\\\"");
        var casillasJson = JSON.stringify(casillasArray);
//        var retePercIGVListJson = JSON.stringify(retePercIGVList);
        casillasJson = casillasJson.replace(new RegExp("\"", 'g'), "\\\"");
        var jsonSend = '{"numRuc": "' + comunLibreria.obtenerUsuarioBean().numRUC + '","valHash": "' + shaCasillas + '", "codFor": "' + codigoFormulario + '","perTri": ' + periodo + ', "arcAutoguar": "{' + nameTag + ':' + casillasJson + '}"}';
        var shaActual = "";
        var sendAction = true;
        var jsonLocalStorage = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado");
        if (jsonLocalStorage != null) {
            var shaLocal = sha1.hash(jsonLocalStorage);
            shaActual = sha1.hash(jsonSend);
//            //console.log("shaLocal:" + shaLocal);
//            //console.log("shaActual:" + shaActual);
            if (shaLocal == shaActual) {
                sendAction = false;
//                //console.log("SHA iguales no se envia nada al servidor.")
            }
        }
        if (sendAction) {
//            //console.log("Antes de enviar al servidor:" + jsonSend);
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado", jsonSend);

            var data = comunServiciosControlador.enviarAutoGuardado(jsonSend);
//            //console.log("comunServiciosControlador.enviarAutoGuardado result:" + JSON.stringify(data));
        }

        var nameMetodoEval = "comunIntegrador.activarGuardadoAutomatico('" + periodo + "','" + codigoFormulario + "','" + nivelDeclaracion + "')";
        var idTimeOutTask = setTimeout(nameMetodoEval, 60000); // auto salva cada minuto
//        //console.log("idTimeOutTask:" + idTimeOutTask);
//        //console.log("nameMetodoEval:" + nameMetodoEval);
        comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado.idTimeOutTask", idTimeOutTask);
    };

    /**
     * @function _inactivarGuardadoAutomatico
     * Detiene la ejecucion ciclica del proceso de autoguardado de las casillas del formulario, para ello consulta
     * al local storage para obtener el id del proceso de autoguardado para finalizarlo.
     *
     */
    _inactivarGuardadoAutomatico = function () {
        var idTimeOutTask = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado.idTimeOutTask");
        //console.log("_inactivarGuardadoAutomatico:idTimeOutTask:" + idTimeOutTask);
        if (idTimeOutTask != null) {
            clearTimeout(idTimeOutTask);
        }
    };
    /**
     * @function validateFormsMethod
     * Valida a todos aquellos controles que contiene el atributo requerido y verifica si tiene asignado un valor,
     * como resultado retorna un arreglo donde estan el identificador del control segun el valor data-casilla.
     *
     */
    _validarFormularios = function () {

        var multi = $('.data-sunat');
        var messagesArray = [];
        $.each(multi, function (index, item) {
            var controlUI = $('*[data-casilla="' + $(item).data('casilla') + '"]');

            if (controlUI.prop("required") && controlUI.attr("codhtmcnttip") == "01") {
                var valueUI = controlUI.val();
//                console.log("========item=======>" + item);
                if (valueUI == "")
                    messagesArray.push($.trim($(item).data('casilla'))); //401
            }
        });

        return messagesArray;
    };
    _validarFormulario621Simplificado = function () {
        var multi = $('.data-sunat');
        var messagesArray = [];
        $.each(multi, function (index, item) {
            var controlUI = $('*[data-s-casilla="' + $(item).data('casilla') + '"]');
            if (controlUI.prop("required") && controlUI.attr("codhtmcnttip") == "01") {
                var valueUI = controlUI.val();
                if (valueUI == "")
                    messagesArray.push($.trim($(item).data('casilla'))); //401
            }
        });
        return messagesArray;
    };
    _obtenerTasaPorTributo = function (expresionCalculo) {
        var tasaVigenteIGV = 0.18;
        var cas_tasa = null;

        if (expresionCalculo.indexOf("T") >= 0) {
            cas_tasa = expresionCalculo.substr((expresionCalculo.indexOf("C") + 1), 3);
        }

        if (cas_tasa != null) {
            var elemento = JSON.parse(comunBandeja.getKeyDataStorage(nombreJsonDependencia));
            if (elemento != null) {
                var codTriAso = elemento[cas_tasa]["defCas"].codTriAso;
                var ubigeo = formulario0621.obtenerUbigeo();
                if (ubigeo != null) {
                    ubigeo = ubigeo["resultado"];
                    if (ubigeo != null) {
                        ubigeo = ubigeo["ddp"];
                        if (ubigeo != null) {
                            ubigeo = ubigeo["ddpUbigeo"];
                        }
                    }
                }
                var tvt = formulario0621.obtenerTasasVigentesPorTributo(ubigeo,
                    comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7")),
                    codTriAso);
//                        //console.log("tvt: "+tvt);

                if (!isNaN(tvt) && tvt != null && tvt["resultado"] != null) {
//                    //console.log(".:::..ttasasVigentes[codigoTributario]asaVigenteIGV "+tasaVigenteIGV);
                    tasaVigenteIGV = tvt["resultado"]["tvtTasa"] / 100;
//                    //console.log(".:::..tasaVigenteIGV "+tasaVigenteIGV);
                } else if (codTriAso == "010106") {
                    tasaVigenteIGV = 0.04;
                }
            }
        }
//        //console.log("::: tasaVigenteIGV: "+tasaVigenteIGV+" \n");
        return tasaVigenteIGV;
    };
    _obtenerValorCalculoExpresion = function (expresionCalculo) {
        var result = 0;
        var tasaVigenteIGV = _obtenerTasaPorTributo(expresionCalculo);

        expresionCalculo = expresionCalculo.replace("T", "CTTT");

        var parser = math.parser();
        var expression = expresionCalculo;
        var arrayNumCas = [];
        var found = true;
        var tmp = "";
        while (found) {
            if (expression.indexOf("C") < 0) {
                found = false;
            } else {
                tmp = expression.substr(expression.indexOf("C"), 4).trim();
                arrayNumCas.push(tmp);
                expression = expression.substr(expression.indexOf("C") + 4).trim();
            }
        }
        var valueUI = 0;
        for (var i = 0; i < arrayNumCas.length; i++) {
            valueUI = 0;
            if (arrayNumCas[i] == "CTTT") {
                valueUI = tasaVigenteIGV;
            } else {
                var controlUI = $('*[data-casilla="' + arrayNumCas[i].substr(1) + '"]');
                if (controlUI != null) {
                    if (controlUI.val() != "") {
                        //valueUI = parseInt(controlUI.val());
                        valueUI = parseFloat(controlUI.val());
                    }
                }
            }
            if (isNaN(valueUI)) {
                valueUI = 0;
            }
            parser.set(arrayNumCas[i], valueUI);
        }
        if (arrayNumCas.length > 0) {
            result = parser.eval(expresionCalculo);
        }
        return result;
    };
    _obtenerValorCalculoExpresion621Simplificado = function (expresionCalculo) {
        var result = 0;
//        var tasaVigenteIGV = 0.18; //temporalmente asignada, se debera de traer de los servicios
        var tasaVigenteIGV = _obtenerTasaPorTributo(expresionCalculo);
        expresionCalculo = expresionCalculo.replace("T", "CTTT");

        var parser = math.parser();
        var expression = expresionCalculo;
        var arrayNumCas = [];
        var found = true;
        var tmp = "";
        while (found) {
            if (expression.indexOf("C") < 0) {
                found = false;
            } else {
                tmp = expression.substr(expression.indexOf("C"), 4).trim();
                arrayNumCas.push(tmp);
                expression = expression.substr(expression.indexOf("C") + 4).trim();
            }
        }
        var valueUI = 0;
        for (var i = 0; i < arrayNumCas.length; i++) {
            valueUI = 0;
            if (arrayNumCas[i] == "CTTT") {
                valueUI = tasaVigenteIGV;
            } else {
                var controlUI = $('*[data-s-casilla="' + arrayNumCas[i].substr(1) + '"]');
                if (controlUI != null) {
                    if (controlUI.val() != undefined) {
                        if (controlUI.val() != "") {
                            //valueUI = parseInt(controlUI.val());
                            valueUI = parseFloat(controlUI.val());
                        }
                    }
                }
            }
            if (isNaN(valueUI)) {
                valueUI = 0;
            }
            parser.set(arrayNumCas[i], valueUI);
        }
        if (arrayNumCas.length > 0) {
            result = parser.eval(expresionCalculo);
        }
        return result;
    };
    /**
     * @function getValueCalcByJsonMethod
     * Realiza el proceso de calculo de las casillas basado en el objeto json, retorna un nuevo valor
     * para ser asignado al control.
     *
     * @param {object} jsonObject - objeto json que contiene los calculos
     *
     * @return {number} nuevo valor del calculo realizado a las casillas
     */
    _obtenerValorCalculoPorJson = function (jsonObject) {
        var acumula = 0;
        var value1 = 0;
        var value2 = 0;
        for (var i = 0; i < jsonObject.length; i++) {
            var control1 = $('*[data-casilla="' + jsonObject[i].identificadorControl + '"]');
            if ((i + 1) < jsonObject.length) {
                var control2 = $('*[data-casilla="' + jsonObject[i + 1].identificadorControl + '"]');
                _operadorMatematico(jsonObject[i].codigoOperacion);
                value1 = 0;
                value2 = 0;
                if (control1.val() != "")
                    value1 = parseInt(control1.val());
                if (control2.val() != "")
                    value2 = parseInt(control2.val());
                acumula = acumula + _evaluadorMatematico(value1, value2);
                i++;
            } else {
                value1 = 0;
                if (control1.val() != "")
                    value1 = parseInt(control1.val());
                acumula = acumula + value1;
            }
        }
        return acumula;
    };

    /**
     * @function validateVigenciaFormsMethod
     * Obtiene la validez del formulario, si es o no vigente para el contribuyente
     *
     * @param {string} dataJson - informacion en formato json de la parametria
     */
    _validarVigenciaFormularios = function (jsonObject) {
        var result = false;
        if (jsonObject.formularioEsVigente == "Si") {
            result = true;
        }
        return result;
    };
    _verificarCasillaTasaVariable = function (casilla) {

        var res = null;
        $.each(detalleParamentros["resultado"]["t7792paramdetaList"], function (k, v) {
            var pk = v["t7792paramdetaPK"];
            if (pk["codTabla"] == "1131" && pk["codParam"].substr(4, 3) == casilla) {
                res = v;
                return false;
            }
        });

        return res;


    };
    /**
     * @function _parsearDecoracionCasillas
     * Procesa la informacion de la parametria, para modificar o agregar funcionalidad o valores a los controles del formulario,
     * asigna valor al control, modifica atributos, modifica clases, inserta codigo de validacion, crear llamadas dinamicas a funciones propias del formulario
     * realiza calculos de operaciones entre controles.
     *
     * @param {string} dataJson - informacion en formato json de la parametria
     * @param {string} identificadorExtra - caracter identificador del id para la casilla: data-casilla o data-s-casilla
     */
    _parsearDecoracionCasillas = function (dataJson, identificadorExtra) {

//        //console.log("_parsearDecoracionCasillas:" + identificadorExtra);
//        //console.log("codforar ::::" + dataJson.codFor);
        //Seteando la version del formulario en localstorage
        comunBandeja.addKeyDataStorage("SUNAT.PaginaFormulario.Version", dataJson.numVerFor);

        $.each(dataJson.casillas, function (index, item) {
            //Validando si existe control
            var controlUI = $('*[data-' + identificadorExtra + 'casilla="' + item.numCas + '"]');


            // console.log("::::: casilla: "+item.numCas+" --- editable: "+item.indEdi);
            // console.log(controlUI);

            if (controlUI != null) {
                controlUI.attr('numRubCas', item.numRubCas);
                controlUI.attr('numSecCas', item.numSecCas);
                controlUI.attr('numColCas', item.numColCas);
                controlUI.attr('numLinCas', item.numLinCas);
                controlUI.attr('cntDec', item.cntDec);

                if (item.codHtmCntTip == "01") { //input, select, span, hidden, datepicker
                    controlUI.attr('codHtmCntTip', item.codHtmCntTip);
                    if (item.codHtmCntVal != undefined) {
                        if (item.codHtmCntVal != "") {
                            controlUI.val(item.codHtmCntVal);
                            controlUI.attr("data-originalvalor", item.codHtmCntVal);
                        }
                    }

//                    var max = 1;
//                    if (item.valLonMax > 12 && item.valLonMax < 16) {
//                        max = Number(item.valLonMax) + 4;
//                    } else if (item.valLonMax > 9 && item.valLonMax < 13) {
//                        max = Number(item.valLonMax) + 3;
//                    } else if (item.valLonMax > 6 && item.valLonMax < 10) {
//                        max = Number(item.valLonMax) + 2;
//                    } else if (item.valLonMax > 3 && item.valLonMax < 7) {
//                        max = Number(item.valLonMax) + 1;
//                    } else {
//                        max = Number(item.valLonMax);
//                    }
                    var max = Number(item.valLonMax) + ((Number(item.valLonMax) / 3));
//                    controlUI.prop('maxlength', max);
//                    var max = Number(item.valLonMax) + Number((item.valLonMax/3)-1);
                    if (item.codTipCam == 1 || (item.valLonMax - item.cntDec < 3)) {
                        max = item.valLonMax;
                    }
                    controlUI.prop('maxlength', max);

                }
                if (item.codHtmCntTip == "02") {
                    if (dataJson.codFor != "0621") {
                        var enumTipoDeclara = comunLibreria.getEnumTipoDeclaracion();
                        var textTipoDeclara = enumTipoDeclara.ORIGINAL.name;
                        var valueTipoDeclara = enumTipoDeclara.ORIGINAL.value;
                        if (item.codHtmCntVal == "1") {
                            valueTipoDeclara = enumTipoDeclara.SUSITUTORIA.value;
                            textTipoDeclara = enumTipoDeclara.SUSITUTORIA.name;
                        } else if (item.codHtmCntVal == "2") {
                            valueTipoDeclara = enumTipoDeclara.RECTIFICATORIA.value;
                            textTipoDeclara = enumTipoDeclara.RECTIFICATORIA.name;
                        }
                        var selectValues = "<option value='" + valueTipoDeclara + "'>" + textTipoDeclara + "</option>";
                        controlUI.empty();
                        controlUI.append(selectValues);
                    }
                }
                if (parseInt(item.codTipCam) == 6 || parseInt(item.codTipCam) == 7 || parseInt(item.codTipCam) == 8) {
                    controlUI.ForceNumericOnly();
                    controlUI.bind('change', function () {
                        if ($(this).val() != null && $(this).val() != "") {
                            var res = Number($(this).val()).toFixed(0);
                            $(this).val(res);
                        }
                    });

                    controlUI.inputmask({
                        "alias": "integer",
                        "groupSeparator": ",",
                        "autoGroup": true,
                        "autoUnmask": true,
                        "noshift": true/*,
                         oncomplete: function () {
                         var res = Number($(this).val()).toFixed(0);
                         $(this).val(res);
                         //console.log($(this).val());
                         }*/
                    });
                }
                if (parseInt(item.codTipCam) == 9 || parseInt(item.codTipCam) == 10 || parseInt(item.codTipCam) == 11) {
                    controlUI.ForceNumericOnly();
                    controlUI.attr("data-indRed", item.indRed);
                    if (item.numCas != "404") { //No se le coloca el formato a la casilla de interes para colocar la etiqueta "Calculando", luego del calculo se le coloca la mascara
                        if (item.indRed == "1") {
                            controlUI.bind('change', function () {
                                if ($(this).val() != null && $(this).val() != "") {
                                    var res = Number($(this).val()).toFixed(0);
                                    $(this).val(res);
                                }
                            });

                            controlUI.inputmask({
//                                "alias": "integer",
                                "alias": "decimal",
                                "groupSeparator": ",",
                                "autoGroup": true,
                                "autoUnmask": true,
                                "noshift": true
                            });
                        } else {

                            controlUI.bind('change', function () {
                                if ($(this).val() != null && $(this).val() != "") {
                                    var dec = $(this).val().split(".");
                                    if (dec.length > 1 && dec[1].length > item.cntDec) {
                                        var res = Number($(this).val()).toFixed(item.cntDec);
                                        $(this).val(res);
                                    }

                                }
                            });

                            controlUI.inputmask({
                                "alias": "decimal",
                                "groupSeparator": ",",
                                "autoGroup": true,
                                "autoUnmask": true,
                                "noshift": true,
                                "digits": item.cntDec
                            });
                        }
                    }
                }

                if (item.desAyuCas != undefined) {
                    var controlById = $("button[id^='help" + item.numCas + "']");
                    if (controlById != null) {
                        controlById.attr("data-content", item.desAyuCas);
                    }
                }
                //Validaciones
                if (item.indObl == "1") {
                    controlUI.attr('indObl', item.indObl);
                    controlUI.prop('required', true);
                }

                if (dataJson.codFor == "0621") {
                    var casilla_editable = _verificarCasillaTasaVariable(item.numCas);
                    // console.log("::: editable: "+casilla_editable);
                    if (casilla_editable == null) {
                        casilla_editable = item.indEdi == "1";
                    }
                    // console.log("::: editable: "+casilla_editable);
                    if (casilla_editable == false) {
                        // console.log("::: deshabilita");
                        controlUI.attr('readonly', true);
                        // controlUI.prop('readonly', true);
                    }
                } else if (item.indEdi == "0") {
                    controlUI.prop('readonly', true);
                }

                if (item.adicionaClase != undefined) {
                    if (item.adicionaClase != "") {
                        if (identificadorExtra == "s-") {
                            controlUI.addClass("data-s-sunat");
                        } else {
                            controlUI.addClass(item.adicionaClase);
                        }
                        controlUI.attr("data-casillatipo", item.codTipCas);
                        controlUI.attr("data-codtipcam", item.codTipCam);
                    }
                }

                //asistenteCamposFijos
                if (item.asistenteCamposFijos != undefined) {
                    var valorCalculado = "";
                    $.each(item.asistenteCamposFijos, function (indexCam, itemCam) {
                        var controlAsistente = $('*[data-casilla="' + itemCam.identificadorControl + '"]');
                        if (controlAsistente != null) {
                            if (itemCam.adicionaClase != "") {
                                controlAsistente.addClass(itemCam.adicionaClase);
                            }
                            if (itemCam.valorControl != "") {
                                if (parseInt(item.codTipCam) == 6 || parseInt(item.codTipCam) == 7 || parseInt(item.codTipCam) == 8) {
                                    itemCam.valorControl = parseFloat(itemCam.valorControl).toFixed();
                                }
                                if (parseInt(item.codTipCam) == 9 || parseInt(item.codTipCam) == 10 || parseInt(item.codTipCam) == 11) {
                                    if (item.indRed == "1") {
                                        itemCam.valorControl = parseFloat(itemCam.valorControl).toFixed();
                                    } else {
                                        itemCam.valorControl = parseFloat(itemCam.valorControl).toFixed(item.cntDec);
                                    }
                                }
                                controlAsistente.val(itemCam.valorControl);

                                if (valorCalculado != "") {
                                    valorCalculado = parseFloat(valorCalculado) + parseFloat(itemCam.valorControl);
                                } else {
                                    valorCalculado = parseFloat(itemCam.valorControl);
                                }
                            }
                        }
                    });
                    controlUI.attr("data-originalvalor", valorCalculado);
                    controlUI.val(valorCalculado);
                }
                //Tributos asociados segun el codigo de casilla = codClaCas = 401
                if (item.codClaCas != undefined) {
                    if (item.codClaCas == "401") {
//                        //console.log("Integrador:" + item.codTriAso + " " + item.numCas);
                        controlUI.attr("data-codigoTributo", item.codTriAso);
                        controlUI.attr("data-descripcionTributo", "Boleta de Pago Virtual"); //Debe venir un campo de descroipcion de la parametria
                    }
                }

                if (item.expresionCalculo != undefined && item.expresionCalculo != "") {
                    var expressionCalc = "" + item.expresionCalculo;
                    expressionCalc = expressionCalc.replace(/\s+/g, ''); //remover todos los espacios en blanco

                    var valorControlResultado;
                    var valorControlResultadoNoNegativo;

                    if (identificadorExtra == "s-") {
                        valorControlResultado = _obtenerValorCalculoExpresion621Simplificado(expressionCalc);
                    } else {
                        valorControlResultado = _obtenerValorCalculoExpresion(expressionCalc);
                    }

                    valorControlResultadoNoNegativo = valorControlResultado >= 0;

                    if (valorControlResultadoNoNegativo) {
                        controlUI.val(valorControlResultado);
                    } else {
                        controlUI.val(0);
                    }
                    //Agregando json de calculo al control, para su uso posterior
                    controlUI.attr("data-jsonCalculo", item.expresionCalculo);
                }
                if (item.indCasFrec == "1") { // casilla frecuente
                    controlUI.attr("data-casillaFrecuente", item.indCasFrec);
                }
            }
        });
    };
    /**
     * @function getValuesFormsFrecuentesMethod
     * Obtiene la lista de los formularios frecuentes del contribuyente, la informacion recibida es luego directamente actualiza
     * en la interface HTML: buscarformularios.html
     *
     */
    _obtenerValoresFormularioFrecuentes = function () {
        var data = comunServiciosControlador.obtenerTodosFrecuentes();
        if (data != null) {
            $('#tabla-f-favoritos tbody').empty();
            $.each(data, function (index, item) {
                $('#tabla-f-favoritos > tbody:last').append('<tr><td><address><a href="javascript:void(0);" onclick="comunBandeja.invocarFormularioOAuth(comunBandeja.obtenerFormularioIdOAuth(\'' + item.codFor + '\'));">' + item.codFor + '</a></address></td><td><address><a href="javascript:void(0);" onclick="comunBandeja.invocarFormularioOAuth(comunBandeja.obtenerFormularioIdOAuth(\'' + item.codFor + '\'));" >' + item.desFor + '</a></address></td><td>' + item.nomForFre + '</td><td class=\"text-right\"><a href=\"#\" onclick="comunIntegrador.setearIdFormularioFrecuente(\'' + item.numForFre + '\');" data-toggle=\"modal\" data-target=\"#myModal-trash\"><span class=\"glyphicon glyphicon-trash color-gray\"></span></a></td></tr>');
            });
        }
    };
    /**
     * @function saveFrecuenteMethod
     * Obtiene el nombre y codigo de formulario y lo guarda en base de datos
     *
     * @param {string} codfor - codigo de formulario
     * @param {string} nombre - nombre del formulario
     */
    _guardarFrecuente = function (codfor, nombre) {
        var jsonSend = '{ "codFor": "' + codfor + '", "nomForFre": "' + nombre + '", "arcData": null } ';

        var data = comunServiciosControlador.enviarFrecuentes(jsonSend);

        $('#modal-frecuente').modal('toggle');

        if (data.codRespuesta == "3") {
            $('#modalAlertaFormFrecuente').modal('show');
        }
    };
    _eliminarFrecuente = function (numForFre) {
        var jsonSend = '{ "numForFre": "' + numForFre + '"} ';
        var data = comunServiciosControlador.eliminarFrecuentes(jsonSend);
        $('#myModal-trash').modal('toggle');
    };
    _guardarCasillaFrecuente = function (codfor, casillas) {

        var nameTag = "###casillas###";
        nameTag = nameTag.replace(new RegExp("###", 'g'), "\\\"");
        casillas = casillas.replace(new RegExp("\"", 'g'), "\\\"");
        var jsonSend = '{ "codFor": "' + codfor + '", "nomForFre": "", "arcData": "{' + nameTag + ':' + casillas + '}"}';

//        //console.log("_guardarCasillaFrecuente:" + jsonSend);
        var dataResult = comunServiciosControlador.enviarCasillasFrecuentes(jsonSend);
//        //console.log("_guardarCasillaFrecuente result:" + JSON.stringify(dataResult));
    };
    /**
     * @function getAllValuesFormsMethod
     * Obtiene la lista de todos formularios disponibles para el contribuyente, la informacion recibida es luego directamente actualiza
     * en la interface HTML: buscarformularios.html
     *
     */
    _obtenerTodosFormularios = function () {
        var formularios = comunServiciosControlador.obtenerTodosFormularios();
        //alert(formularios+"formularios");
        return formularios;
    };

    /**
     * @function setActiveChangeFormsMethod
     * Activa el flag de que el formulario ha cambiado sus valores en las casillas, se crear una entrada en el localstorage
     * para validar cuando se intenta de cambiar el periodo tributario.
     *
     * @param {string} value - true = si hubo cambio en las casillas, en caso contrario false
     *
     */
    _setearActivacionCambioCasillas = function (value) {
        comunBandeja.addKeyDataStorage("SUNAT.PaginaFormulario.CambioCasillas", value);
    };
    /**
     * @function getActiveChangeFormsMethod
     * Obtiene el valor del flag del formulario si ha cambiado sus valores en las casillas, lee la entrada en el localstorage
     * para validar cuando se intenta de cambiar el periodo tributario.
     *
     * @return {string} valor igual a true o false
     */
    _obtenerActivacionCambioCasillas = function () {
        result = "false";
        var value = localStorage.getItem("SUNAT.PaginaFormulario.CambioCasillas");
        if (value != null) {
            if (value.indexOf("==") > 0) {
                result = value.substr(0, value.indexOf("=="));
            } else {
                result = value;
            }
        }
        return result;
    };
    _obtenerPeriodoCambioCasillas = function () {
        result = "01/2016";
        var value = localStorage.getItem("SUNAT.PaginaFormulario.CambioCasillas");
        if (value != null) {
            if (value.indexOf("==") > 0) {
                result = value.substr(value.indexOf("==") + 2);
            } else {
                result = value;
            }
        }
        return result;
    };
    _iniciarCalculoInteresPagosPrevios = function (codigoFormulario, codigoTributo, calcularInteres) {
        var monto = 0;
        var pagoIds = "";
        var montosPagos = "";
        var jsonPagosPrevios = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal1.PagosPrevios");
//        //console.log('>>> jsonPagosPrevios ' + jsonPagosPrevios);
        if (jsonPagosPrevios != "" && jsonPagosPrevios != 'null') {
            var jsonDataPagosPrevios = JSON.parse(jsonPagosPrevios);
            $.each(jsonDataPagosPrevios, function (index, item) {
                monto += parseFloat(item.mtoPag);
                pagoIds = pagoIds + item.detallePagosPreviosPK.numOrdPre + ",";
                montosPagos = montosPagos + item.mtoPag + ",";
            });
        }
        //_procesarGuardarPagosPrevios(monto, pagoIds, montosPagos, true, codigoFormulario, codigoTributo, calcularInteres);
        _procesarGuardarPagosPrevios2(monto, pagoIds, montosPagos, true, codigoFormulario, codigoTributo, calcularInteres);
    };
    _procesarGuardarPagosPrevios = function procesarGuardarPagosPrevios(monto, pagoIds, montoPagos, aplicarMascara, codigoFormulario, codigoTributo, calcularInteres) {
        var periodo = $('*[data-casilla="7"]').val();

        //Invocando microservicio de calculo de interes
        var interesAcumulado = 0;
        var retencionesEfectuadas = $('*[data-casilla="401"]').val();
        var parametros = _formatearPeriodoaCadena(periodo) + "/" + codigoTributo + "/" + retencionesEfectuadas + "/" + codigoFormulario + "?pagoIds=" + pagoIds + "&montoPagos=" + montoPagos;

        if (calcularInteres) {
            var data = comunServiciosControlador.obtenerCalculoInteres(parametros);
            if (data != null) {
                interesAcumulado = parseFloat(data.interesAcumulado).toFixed(2);
            }
        }

        var control402 = $('*[data-casilla="402"]');
        //console.log('>>> monto ' + monto);
        control402.val(monto); //insertando el monto en la casilla y luego dispara evento de cambio

        var montoCalc = 0;
        var control403 = $('*[data-casilla="403"]');
        montoCalc = comunIntegrador.obtenerValorCalculoExpresion(control403[0].attributes["data-jsonCalculo"].value);
        if (control403.attr("data-indRed") == "1") {
            montoCalc = parseFloat(montoCalc).toFixed();
            montoCalc = montoCalc < 0 ? 0 : montoCalc;
        }
        control403.val(montoCalc);

        if (calcularInteres) {
            var control404 = $('*[data-casilla="404"]');

            if (aplicarMascara) {
                if (control404.attr("data-indRed") == "1") {
                    control404.inputmask({
                        "alias": "integer",
                        "groupSeparator": ",",
                        "autoGroup": true,
                        "autoUnmask": true,
                        "noshift": true
                    });
                } else {
                    control404.inputmask({
                        "alias": "decimal",
                        "groupSeparator": ",",
                        "autoGroup": true,
                        "autoUnmask": true,
                        "noshift": true,
                        "digits": 2
                    });
                }
            }

            if (control404.attr("data-indRed") == "1") {
                interesAcumulado = parseFloat(interesAcumulado).toFixed();
            }
            control404.val(interesAcumulado);
        }

        var casilla403 = $('*[data-casilla="403"]').val();
        // if (casilla403 == 0) {
        //     $('*[data-casilla="404"]').attr("readonly", true);
        // } else {
        //     $('*[data-casilla="404"]').attr("readonly", false);
        // }

        $('*[data-casilla="404"]').trigger("keyup");
    };
    _procesarGuardarPagosPrevios2 = function procesarGuardarPagosPrevios2(monto, pagoIds, montoPagos, aplicarMascara, codigoFormulario, codigoTributo, calcularInteres) {
        var periodo = $('*[data-casilla="7"]').val();

        //Invocando microservicio de calculo de interes
        var interesAcumulado = 0;
        var retencionesEfectuadas = $('*[data-casilla="401"]').val();

        var parametros = _formatearPeriodoaCadena(periodo) + "/" + codigoTributo + "/" + retencionesEfectuadas + "/" + codigoFormulario + "?pagoIds=" + pagoIds + "&montoPagos=" + montoPagos;
        //console.log("parametros:" + parametros);

        if (calcularInteres) {
            var data = comunServiciosControlador.obtenerCalculoInteres(parametros);
            if (data != null) {
                interesAcumulado = parseFloat(data.interesAcumulado).toFixed(2);
            }
            //console.log("comunServiciosControlador.obtenerCalculoInteres result:" + JSON.stringify(data));
        }

        //var control402 = $('*[data-casilla="402"]');
        //console.log('>>> monto2 ' + monto);
        //control402.val(monto); //insertando el monto en la casilla y luego dispara evento de cambio

        var montoCalc = 0;
        var control403 = $('*[data-casilla="403"]');
        montoCalc = comunIntegrador.obtenerValorCalculoExpresion(control403[0].attributes["data-jsonCalculo"].value);
        if (control403.attr("data-indRed") == "1") {
            montoCalc = parseFloat(montoCalc).toFixed();
            montoCalc = montoCalc < 0 ? 0 : montoCalc;
        }
        control403.val(montoCalc);

        var control404 = $('*[data-casilla="404"]');
        if (calcularInteres) {

            if (control404.attr("data-indRed") == "1") {
                interesAcumulado = parseFloat(interesAcumulado).toFixed();
            }
            control404.val(interesAcumulado);
        }

        if (aplicarMascara) {
            if (control404.attr("data-indRed") == "1") {
                control404.inputmask({
                    "alias": "integer",
                    "groupSeparator": ",",
                    "autoGroup": true,
                    "autoUnmask": true,
                    "noshift": true
                });
            } else {
                control404.inputmask({
                    "alias": "decimal",
                    "groupSeparator": ",",
                    "autoGroup": true,
                    "autoUnmask": true,
                    "noshift": true,
                    "digits": 2
                });
            }
        }

        //console.log("comunIntegrador:: Validando habilitar/desabilitar interese moratorio");
        var casilla403 = $('*[data-casilla="403"]').val();
        if (casilla403 == 0) {
            $('*[data-casilla="404"]').attr("readonly", true);
        } else {
            if (calcularInteres) {
                $('*[data-casilla="404"]').attr("readonly", false);
            }
        }
        $('*[data-casilla="404"]').trigger("keyup");
    };

    _validacionDefinicionCasilla = function (dataJson, identificadorExtra) {
        var jsonDependencias = {};
        console.log(":::COMUN INTEGRADOR:::");
        $.each(dataJson.casillas, function (index, item) {
            // if (item.numCas == 102) {
//                //console.log(".......::::: item: " + JSON.stringify(item));
//             }
            jsonDependencias[item.numCas] = {};
            jsonDependencias[item.numCas]["defCas"] = item;
            var arregloDependencias = [];
            $.each(dataJson.casillas, function (index2, item2) {
                if (item2.numCas != item.numCas && item2.expresionCalculo.indexOf("C" + item.numCas) > -1) {
                    arregloDependencias.push(item2.numCas);
                }
            });
            jsonDependencias[item.numCas]["dependencias"] = arregloDependencias;
            //Validando si existe control
            var controlUI = $('*[data-' + identificadorExtra + 'casilla="' + item.numCas + '"]');

            if (controlUI != null) {
                controlUI.keyup(function () {
//                    formulario0621.keyCasilla = false;
                    $(".barraBuscar02").attr("disabled");
                    eval("comunIntegrador.operarCasillaYAsociados(item.numCas,identificadorExtra,3);");
                    $(this).attr('caseditado', true);


                    if (item.numCas == 189) {
                        formulario0621.calcularAcogimientoProrrogaPago();
                    }
                    if (item.numCas == 301) {
                        formulario0621.funcionalidad_Casilla312();
                    }
                    /*
                     if (item.numCas != 189 && item.numCas != 307 && item.numCas != 345) {
                     var soles = _obtenerValorCasilla(886);
                     comunIntegrador.setValue(formulario0621.obtenerCasilla("189"), (soles.toLowerCase() == 'soles') ? formulario0621.obtenerValorCasilla("188") : '0');
                     comunIntegrador.setValue(formulario0621.obtenerCasilla("307"), (soles.toLowerCase() == 'soles') ? formulario0621.obtenerValorCasilla("324") : '0');
                     comunIntegrador.setValue(formulario0621.obtenerCasilla("345"), (soles.toLowerCase() == 'soles') ? formulario0621.obtenerValorCasilla("344") : '0');
                     }
                     var valorCasilla = comunIntegrador.obtenerValorCalculoExpresion621("C189+C307+C345");
                     $("#muestraTotalaPagar").find("strong").text("s/. " + formulario0621.formatearNumeroSeparadorMiles(valorCasilla));
                     */
                    comunIntegrador.calcularTotalPagar((item.numCas != 189 && item.numCas != 307 && item.numCas != 345));
                });
//                console.log(":item.numCas::" + item.numCas);
//                if (formulario0621.verificarCasillaTasaVariable(item.numCas) != null) {
//                console.log("::entrando a verificar casilla:::");
//                controlUI.focusout(function () {
//                    
//                        formulario0621.calcularTasaVariable(item.numCas, item.expresionCalculo.substr(item.expresionCalculo.indexOf("C") + 1, 3), item.expresionCalculo);
//                    
//                });
//                }
            }
        });
//        //console.log("-.--------------" + JSON.stringify(jsonDependencias));
        comunBandeja.addKeyDataStorage(nombreJsonDependencia, JSON.stringify(jsonDependencias));
    };
    return {
        calcularTotalPagar: function (insertarData) {
            if (insertarData) {

                var soles = _obtenerValorCasilla(886);
                comunIntegrador.setValue(formulario0621.obtenerCasilla("189"), (soles.toLowerCase() == 'soles') ? formulario0621.obtenerValorCasilla("188") : '0');
                comunIntegrador.setValue(formulario0621.obtenerCasilla("307"), (soles.toLowerCase() == 'soles') ? formulario0621.obtenerValorCasilla("324") : '0');
                comunIntegrador.setValue(formulario0621.obtenerCasilla("345"), (soles.toLowerCase() == 'soles') ? formulario0621.obtenerValorCasilla("344") : '0');
            }
            var valorCasilla = comunIntegrador.obtenerValorCalculoExpresion621("C189+C307+C345");
            $("#muestraTotalaPagar").find("strong").text("s/. " + formulario0621.formatearNumeroSeparadorMiles(valorCasilla));
        },
        setValue: function (txt, valor) {
            txt.val(valor).change();
        },
        cargarInformacionAutoGuadado: function () {
            return _cargarInformacionAutoGuadado();
        },
        parsearDecoracionCasillas621: function (dataJson, detParamentros) {
            detalleParamentros = detParamentros;
            console.log(dataJson);
            console.log(":::::::::");
            _parsearDecoracionCasillas(dataJson, "");
            _validacionDefinicionCasilla(dataJson, "");

            _parsearDecoracionCasillas(dataJson, "s-");
            _validacionDefinicionCasilla(dataJson, "s-");

            _setearActivacionCambioCasillas("false");

            /* validacion estatica */

            /* casillas de exportaciones deberia utilizar puros numeros */
            $('input[id^="trVentasNoGravadas"]').attr('maxlength', 15);
            $('input[id^="trExportacion"]').attr('maxlength', 15);
            $('input[id^="trVentasgravada"]').attr('maxlength', 15);

            $('input[id^="trVentasNoGravadas"]').inputmask({
                "alias": "integer",
                "groupSeparator": ",",
                "autoGroup": true,
                "autoUnmask": true,
                "noshift": true
            });

            $('input[id^="trExportacion"]').inputmask({
                "alias": "integer",
                "groupSeparator": ",",
                "autoGroup": true,
                "autoUnmask": true,
                "noshift": true
            });

            $('input[id^="trVentasgravada"]').inputmask({
                "alias": "integer",
                "groupSeparator": ",",
                "autoGroup": true,
                "autoUnmask": true,
                "noshift": true
            });


        },
        parsearDecoracionCasillas: function (dataJson) {
            _parsearDecoracionCasillas(dataJson, "");
            _setearActivacionCambioCasillas("false");
        },
        validarFormularios: function () {
            return _validarFormularios();
        },
        validarFormulario621Simplificado: function () {
            return _validarFormulario621Simplificado();
        },
        agregarBandejaFormulario: function () {
            _agregarBandejaFormulario();
        },
        obtenerValoresFormularioFrecuentes: function () {
            _obtenerValoresFormularioFrecuentes();
        },
        obtenerTodosFormularios: function () {
            return _obtenerTodosFormularios();
        },
        obtenerValorCalculoPorJson: function (jsonObject) {
            return _obtenerValorCalculoPorJson(jsonObject);
        },
        setearActivacionCambioCasillas: function (value) {
            return _setearActivacionCambioCasillas(value);
        },
        obtenerActivacionCambioCasillas: function () {
            return _obtenerActivacionCambioCasillas();
        },
        obtenerPeriodoCambioCasillas: function () {
            return _obtenerPeriodoCambioCasillas();
        },
        setearIdFormularioFrecuente: function (numForFre) {
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.Variable2", numForFre)
        },
        guardarFrecuente: function (codfor, nombre) {
            _guardarFrecuente(codfor, nombre);
        },
        guardarCasillaFrecuente: function (codfor, casillas) {
            _guardarCasillaFrecuente(codfor, casillas);
        },
        eliminarFrecuente: function () {
            var numForFre = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal1.Variable2");
            _eliminarFrecuente(numForFre);
        },
        validarVigenciaFormularios: function (jsonObject) {
            return _validarVigenciaFormularios(jsonObject);
        },
        obtenerValorCalculoExpresion: function (expresionCalculo) {
            return _obtenerValorCalculoExpresion(expresionCalculo);
        },
        obtenerValorCalculoExpresion621Simplificado: function (expresionCalculo) {
            return _obtenerValorCalculoExpresion621Simplificado(expresionCalculo);
        },
        obtenerValorCalculoExpresion621: function (expresionCalculo) {
            if (formulario0621.obtenerNivelDeclaracion() == "s-") {
                return _obtenerValorCalculoExpresion621Simplificado(expresionCalculo);
            } else {
                return _obtenerValorCalculoExpresion(expresionCalculo);
            }
        },
        activarGuardadoAutomatico: function (periodo, codigoFormulario, nivelDeclaracion) {
            _activarGuardadoAutomatico(periodo, codigoFormulario, nivelDeclaracion);
        },
        inactivarGuardadoAutomatico: function () {
            _inactivarGuardadoAutomatico();
        },
        iniciarCalculoInteresPagosPrevios: function (codigoFormulario, codigoTributo, calcularInteres) {
            _iniciarCalculoInteresPagosPrevios(codigoFormulario, codigoTributo, calcularInteres);
        },
        procesarGuardarPagosPrevios: function (monto, pagoIds, montoPagos, aplicarMascara, codigoFormulario, codigoTributo, calcularInteres) {
            _procesarGuardarPagosPrevios(monto, pagoIds, montoPagos, aplicarMascara, codigoFormulario, codigoTributo, calcularInteres);
        },
        procesarGuardarPagosPrevios2: function (monto, pagoIds, montoPagos, aplicarMascara, codigoFormulario, codigoTributo, calcularInteres) {
            _procesarGuardarPagosPrevios2(monto, pagoIds, montoPagos, aplicarMascara, codigoFormulario, codigoTributo, calcularInteres);
        },
        ejecutarCalculoPorTab: function (dataParametria, rubCasSiguiente, secCasSiguiente) {
            /* deberia ejecutar todas las expresiones de la casillas */
            if (secCasSiguiente == 1 && rubCasSiguiente == 3) {
                formulario0621.calcularAcogimientoProrrogaPago();
            }
            //console.log("=====ENTRANDI ejecutarCalculoPorTab=======");
            var ivap = ($('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="867"]').is(':checked'));
            var igv = ($('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="887"]').is(':checked'));
            var renta = ($('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="861"]').is(':checked'));
            if (dataParametria != null && dataParametria.casillas != null) {
                $.each(dataParametria.casillas, function (index, item) {
                    if (item.numRubCas == rubCasSiguiente && secCasSiguiente.indexOf(item.numSecCas) >= 0) {
                        comunIntegrador.operarCasilla(item.numCas);
                    }
                    if (item.numRubCas == 3 && item.numSecCas == 1) {

                        switch (parseInt(item.numColCas)) {
                            case 3:
                                if (formulario0621.esNivelSimplificado()) {
                                    $("#btnAgregarBandejaSimplificado").attr("disabled", true);
                                } else {
                                    $("#btnAgregarBandejaCompleto").attr("disabled", true);
                                }
                                if (ivap) {
                                    $('.textColIVAP').removeClass("col-sm-6").addClass("col-sm-3");
                                    $('.colIVAP').show();
                                } else {
                                    $('.textColIVAP').removeClass("col-sm-3").addClass("col-sm-6");
                                    $('.colIVAP').hide();
                                    formulario0621.setearValorCasilla(item.numCas, "");
                                }
                                break;

                            case 2:

                                if (renta) {
                                    $('.textColIVAP').removeClass("col-sm-6").addClass("col-sm-3");
                                    $('.colRENTA').show();
                                } else {
                                    formulario0621.setearValorCasilla(item.numCas, "");
                                    $('.textColIVAP').removeClass("col-sm-3").addClass("col-sm-6");
                                    $('.colRENTA').hide();
                                    formulario0621.setearValorCasilla(item.numCas, "");
                                }
                                break;
                            case 1:

                                if (igv) {
                                    $('.textColIVAP').removeClass("col-sm-6").addClass("col-sm-3");
                                    $('.colIGV').show();
                                } else {
                                    $('.textColIVAP').removeClass("col-sm-3").addClass("col-sm-6");
                                    $('.colIGV').hide();
                                    formulario0621.setearValorCasilla(item.numCas, "");
                                }
                                break;

                        }

                    }

                });
            }

        },
        isVisible: function (txt) {
            if (txt != null) {
                var cad = $(txt).attr("id");
                if (cad != undefined) {
                    return cad.indexOf(formulario0621.obtenerNivelDeclaracion()) >= 0;
                }
                return false;
            }
            return true;
        },
        operarCasilla: function (numeroCasilla, validar) {
            /* validar
             * 1: calcular total, EJECUTA TODO EL PROCESO DE CALCULO, Y TAMBIEN CALCULA EL TOTAL
             * 2: no calcula total, EJECUTA TODO EL PROCESO DE CALCULO, PERO NO CALCULA EL TOTAL, ACTUALMENTE EL TOTAL SE CALCULA SIEMPRE
             * 3: calcula_tasa_variable, NO DEBERIA AUTOCALCULAR O EVALUAR
             * */
            if (validar == null) {
                validar = 3;
            }

            var seleccionIgv = $('input[name="casilla887"]');
            if (formulario0621.obtenerNivelDeclaracion() == "s-") {
                seleccionIgv = $('input[name="casilla-s-887"]');
            }
            var i = 0;
            if (validar > 0) {
                for (i = 0; i < seleccionIgv.length; i++) {
                    if (seleccionIgv[i].checked) {
                        break;
                    }
                }
            }
            var entra = !(i == 1 && ((numeroCasilla == 101 || numeroCasilla == 103
                    || numeroCasilla == 161 || numeroCasilla == 163
                    || numeroCasilla == 108 || numeroCasilla == 111
                    || numeroCasilla == 115 || numeroCasilla == 117
                    || numeroCasilla == 169 || numeroCasilla == 341
                )
            ));

            if (entra) {

                var txt = $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="' + numeroCasilla + '"]');
                var elemento = JSON.parse(comunBandeja.getKeyDataStorage(nombreJsonDependencia));
                if (elemento != null && elemento[numeroCasilla] != null) {
                    comunIntegrador.validarEjecutarExpresion(elemento[numeroCasilla]["defCas"], txt, validar, i);
                }
            }
        },
        operarCasillaYAsociados: function (numeroCasilla, idExtra, validacion) {

            var seleccionIgv = $('input[name="casilla887"]');
            var i = 0;
            for (i = 0; i < seleccionIgv.length; i++) {
                if (seleccionIgv[i].checked) {
                    break;
                }
            }
            var entra = !(i == 1 && ((numeroCasilla == 101 || numeroCasilla == 103
                    || numeroCasilla == 161 || numeroCasilla == 163
                    || numeroCasilla == 108 || numeroCasilla == 111
                    || numeroCasilla == 115 || numeroCasilla == 117
                    || numeroCasilla == 169 || numeroCasilla == 341
                )
            ));

            if (entra) {
                var txt = $('*[data-' + idExtra + 'casilla="' + numeroCasilla + '"]');
                var elemento = JSON.parse(comunBandeja.getKeyDataStorage(nombreJsonDependencia));
//                //console.log("...... " + JSON.stringify(elemento));
//                //console.log("::::: " + validacion);
                comunIntegrador.validarEjecutarExpresion(elemento[numeroCasilla]["defCas"], txt, validacion, i);
                var dependencias = elemento[numeroCasilla]["dependencias"];
                if (dependencias != null) {
                    $.each(dependencias, function (clave, casilla) {
                        comunIntegrador.operarCasillaYAsociados(casilla, idExtra, 2);
                    });
                }
            } else {
                console.log("::::::::::::::: opera las casillas 137 y 178");
                comunIntegrador.operarCasilla(131, -1);
                comunIntegrador.operarCasilla(178, -1);
            }
        },
        validacionTipoCampo: function (txt, codTipCam, valor) {
            var correccion = false;
            if (valor != null && valor != "") {
                switch (parseInt(codTipCam)) {
                    case 6:
                    case 9:
                        if (valor < 0) {
                            correccion = true;
                            valor = 0;
                        }
                        break;
                    case 7:
                    case 10:
                        if (valor > 0) {
                            correccion = true;
                            valor = 0;
                        }
                        break;
                    case 8:
                        // valor = parseInt(valor);
                        break;
                    case 11:
                        // valor = parseFloat(valor);
                        break;
                }
            }
//            txt.val(valor).change();
            if (correccion) {
                comunIntegrador.setValue(txt, valor);
            }

        },
        igvSeleccionado: function (expre) {

            if (formulario0621.obtenerBooleanValueRadio("887", 0)) {
                return true;
            }
            if (expre != null) {
                return !(expre.indexOf("C340") > -1 || expre.indexOf("C341") > -1 || expre.indexOf("C182") > -1);
            }
            return true;
        },
        cumpleListaCondicion: function (valor_casilla, valor_casilla_condicion, condicion) {
            switch (parseInt(condicion)) {
                case 1:
                    return valor_casilla < valor_casilla_condicion;
                case 2:
                    return valor_casilla <= valor_casilla_condicion;
                case 3:
                    return valor_casilla > valor_casilla_condicion;
                case 4:
                    return valor_casilla >= valor_casilla_condicion;
                case 5:
                    return valor_casilla == valor_casilla_condicion;
                case 6:
                    return valor_casilla > 0;
                case 7:
                    return valor_casilla >= 0;
                case 8:
                    return valor_casilla < 0;
                case 9:
                    return valor_casilla <= 0;
                case 10:
                    return valor_casilla == 0;
                case 11:
                    break;
                case 12:
                    break;
                default:
                    break;
            }
            return false;
        },
        validarEjecutarExpresion: function (defCas, txt, validacion, convenio) {
            try {
                var expre = defCas.expresionCalculo;
                var entra = !(convenio == 1 && (expre.indexOf("C101") > -1 || expre.indexOf("C103") > -1
                || expre.indexOf("C161") > -1 || expre.indexOf("C163") > -1
                || expre.indexOf("C108") > -1 || expre.indexOf("C111") > -1
                || expre.indexOf("C115") > -1 || expre.indexOf("C117") > -1
                || expre.indexOf("C169") > -1 || expre.indexOf("C341") > -1));

                if (!comunIntegrador.isVisible(txt)) {
                    entra = false;
                }
                // console.log("\n"+validacion + ".......... "
                //     + defCas.numCas + " ... "
                //     + formulario0621.verificarCasillaTasaVariable(defCas.numCas)
                //     + " .:::: " + defCas.indCal + " ---- " + expre);
                // console.log(defCas);

                if (expre != null && txt != null && entra &&
                    (validacion == 2
                        || formulario0621.verificarCasillaTasaVariable(defCas.numCas) == null
                    )) {
                    // console.log(".... entraaaa");
                    var montoCalc = 0;
                    var montoActual = $(txt).val();

                    if (defCas.indCal != 0 && defCas.numExpCal != null && defCas.numExpCal != 0) {
                        // console.log("...... 1");
                        if (comunIntegrador.igvSeleccionado(expre)) {
//                            //console.log("...... 1.1: "+expre+" ---- "+comunIntegrador.obtenerValorCalculoExpresion621(expre));
                            montoCalc = comunIntegrador.obtenerValorCalculoExpresion621(expre);
//                            //console.log('::::: '+montoCalc+" ---- casilla: "+defCas.numCas);
//                            txt.val(montoCalc).change();
                            comunIntegrador.setValue(txt, montoCalc);
                        } else {
//                            //console.log("...... 1.2");
//                             txt.val("0");
                            comunIntegrador.setValue(txt, "0");
                        }
                    } else if ((defCas.indCon == 1 && defCas.indCal == 1) ||
                        (defCas.indCon == 0 && defCas.indCal == 1)) {
                        // console.log("...... 2");
                        var valExpresion = comunIntegrador.obtenerValorCalculoExpresion621(defCas.condicionCalculos.expCalInfijo);

                        var valActualCasilla = txt.val();
                        // console.log(defCas.condicionCalculos.expCalInfijo+"::::: valActualCasilla: "+valActualCasilla+" -- valExpresion: "+valExpresion+" -- condicion: "+defCas.condicionCalculos.codCon+" ::: "+comunIntegrador.cumpleListaCondicion(valActualCasilla, valExpresion,
                        //         defCas.condicionCalculos.codCon));
                        if (comunIntegrador.cumpleListaCondicion(valActualCasilla, valExpresion,
                                defCas.condicionCalculos.codCon)) {
                            // console.log("...... 2.1: "+parseInt(defCas.condicionCalculos.indAccSi));
                            switch (parseInt(defCas.condicionCalculos.indAccSi)) {
                                case 1: //calcula
                                    try {
                                        if (comunIntegrador.igvSeleccionado(expre)) {
                                            montoCalc = comunIntegrador.obtenerValorCalculoExpresion621(expre);
//                                            txt.val(montoCalc).change();
                                            comunIntegrador.setValue(txt, montoCalc);
                                        } else {
                                            // txt.val("0");
                                            comunIntegrador.setValue(txt, "0");
                                        }
                                    } catch (e) {
                                    }
                                    break;
                                case 2: // acepta el valor
                                    break;
                                case 3: //tomar valor de error asociado
                                    comunIntegrador.setValue(txt, "");
                                    var sms = defCas.condicionCalculos.desErrorSi;
                                    if (sms != null) {
//                                        console.log("............:::: error si: valActualCasilla: " + valActualCasilla + " --- valExpresion: " + valExpresion);
                                        formulario0621.mostrarMensajeGeneral(sms);
                                    }
                                    break;
                                case 4: // asigan 0 al valor
                                    comunIntegrador.setValue(txt, "");
                                    break;
                            }
                        } else {
                            // console.log("::: exp no: "+parseInt(defCas.condicionCalculos.indAccNo));
                            switch (parseInt(defCas.condicionCalculos.indAccNo)) {
                                case 1: //calcula
                                    try {
                                        if (comunIntegrador.igvSeleccionado(expre)) {
                                            montoCalc = comunIntegrador.obtenerValorCalculoExpresion621(expre);
//                                            txt.val(montoCalc).change();
                                            comunIntegrador.setValue(txt, montoCalc);
                                        } else {
                                            comunIntegrador.setValue(txt, "0");
                                        }
                                    } catch (e) {
                                    }
                                    break;
                                case 2: // acepta el valor
                                    break;
                                case 3: //tomar valor de error asociado
                                    comunIntegrador.setValue(txt, "");
                                    var sms = defCas.condicionCalculos.desErrorNo;
                                    if (sms != null) {
//                                        console.log("............:::: error no: valActualCasilla: " + valActualCasilla + " --- valExpresion: " + valExpresion);
//                                        console.log(txt);
                                        formulario0621.mostrarMensajeGeneral(sms);
                                    }
                                    break;
                                case 4: // asigan 0 al valor
                                    comunIntegrador.setValue(txt, "");
                                    break;
                            }
                        }
                    }
                    comunIntegrador.validacionTipoCampo(txt, defCas.codTipCam, txt.val());
                    if (montoActual != montoCalc) {
                        if (defCas.numCas == 681 || defCas.numCas == 185) {
                            formulario0621.calcularInteresMoratorio("#Paso-form_06", 187);
                        } else if (defCas.numCas == 682 || defCas.numCas == 317) {
                            formulario0621.calcularInteresMoratorio("#Paso-form_06", 319);
                        } else if (defCas.numCas == 683 || defCas.numCas == 342) {
                            formulario0621.calcularInteresMoratorio("#Paso-form_06", 343);
                        }
                    }
//                    if (validacion == true) {
                    /*para que no ejecute una funcion de las ultimas casilla, logica esta para agregar*/
                    /*
                     var importe = null;
                     if (defCas.numCas == 188) {
                     importe = $('input[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="189"]');
                     } else if (defCas.numCas == 324) {
                     importe = $('input[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="307"]');
                     } else if (defCas.numCas == 344) {
                     importe = $('input[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="345"]');
                     }
                     if (importe != null) {
                     //                            $(importe).val(montoCalc).change();
                     comunIntegrador.setValue($(importe), montoCalc);
                     }
                     */

                    comunIntegrador.calcularTotalPagar((defCas.numCas == 188) || (defCas.numCas == 324) || (defCas.numCas == 344));
//                    }
                }
            } catch (e) {
            }
        }
    };
})();

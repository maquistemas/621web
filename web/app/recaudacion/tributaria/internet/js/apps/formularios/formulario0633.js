var formulario0633 = (function () {
    var m_nameJavascript = "formulario0633.js";
    var m_idFormulario = "0633";
    var m_versionFormulario = "1.0";
    var m_fechaVencimiento = "00/00/0000";
    var m_casillasSugeridas = ["502", "401", "402"];
    var m_valorTasa = 0;

    _obtenerVersionFormulario = function () {
        var version = comunBandeja.getKeyDataStorage("SUNAT.PaginaFormulario.Version");
        if (version == "null") {
            version = m_versionFormulario;
        }
        return version;
    };
    _formatearPeriodoaCadena = function (periodo) {
        //recibe un string 11-2016, lo convierte 201611
        var result = "";
        if (periodo != null) {
            if (periodo != "") {
                result = periodo.substr(3, 4) + periodo.substr(0, 2);
            }
        }
        return result;
    };
    _esCasilla404ReadOnly = function () {
        var result = false;
        var fechaActual = new Date();
        var fechaVencimiento = comunLibreria.formatearYYYMMDD_GUION(m_fechaVencimiento);
        var fechaPresentacion = moment(fechaActual).format('YYYY-MM-DD');
        console.log("f:" + fechaVencimiento + " f2:" + fechaPresentacion);
        if (moment(fechaPresentacion).isSameOrBefore(fechaVencimiento)) {
            result = true;
        }
        $('*[data-casilla="404"]').attr("readonly", result);
        console.log("casilla 404 readonly " + result);
        return result;
    };
    _muestraFormularioFrecuente = function () {
        //Invocando servicio de formulario frecuente
        var data = comunServiciosControlador.obtenerTodosFrecuentes();
        if (data != null) {
            $.each(data, function (index, item) {
                if (item.codFor == m_idFormulario) {
                    $("#titFormularioFrecuente").attr("title", "Formulario Frecuente: " + item.nomForFre);
                    $("#linkFormularioFrecuente").attr("data-target", "#");
                    $("#linkFormularioFrecuente").addClass("yellowFrecuente");
                    console.log("Se marco como formulario frecuente");
                }
            });
        }
    };
    _activarGuardadoAutomatico = function () {
        console.log("_activarGuardadoAutomatico::begin");
        var periodo = $('*[data-casilla="7"]').val();

        var casillas = $('.data-sunat');
        var casillasArray = [];
        var casillasHash = "";
        $.each(casillas, function (index, item) {
            casillasArray.push({
                codigoCasilla: $(item).data('casilla'),
                valorCasilla: $('*[data-casilla="' + $(item).data('casilla') + '"]').val()
            });
            casillasHash += $(item).data('casilla') + "|" + $('*[data-casilla="' + $(item).data('casilla') + '"]').val() + "|";
        });

        var shaCasillas = sha1.hash(casillasHash);
        var nameTag = "###casillas###";
        nameTag = nameTag.replace(new RegExp("###", 'g'), "\\\"");
        var casillasJson = JSON.stringify(casillasArray);
        casillasJson = casillasJson.replace(new RegExp("\"", 'g'), "\\\"");
        var jsonSend = '{"numRuc": "10081622286","valHash": "' + shaCasillas + '", "codFor": "' + m_idFormulario + '","perTri": ' + _formatearPeriodoaCadena(periodo) + ', "arcAutoguar": "{' + nameTag + ':' + casillasJson + '}"}';

        var shaActual = "";
        var sendAction = true;
        var jsonLocalStorage = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado");
        if (jsonLocalStorage != null) {
            //Comparando JSON con SHA1
            var shaLocal = sha1.hash(jsonLocalStorage);
            shaActual = sha1.hash(jsonSend);
            if (shaLocal == shaActual) {
                sendAction = false;
                console.log("SHA iguales no se envia nada al servidor.")
            }
        }
        if (sendAction) {
            console.log("Antes de enviar al servidor:" + jsonSend);
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado", jsonSend);

            var data = comunServiciosControlador.enviarAutoGuardado(jsonSend);
        }

        var idTimeOutTask = setTimeout("formulario0633.activarGuardadoAutomatico()", 60000); // auto salva cada minuto
        console.log("idTimeOutTask:" + idTimeOutTask);
        comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado.idTimeOutTask", idTimeOutTask);
    };
    _inactivarGuardadoAutomatico = function () {
        console.log("_inactivarGuardadoAutomatico::begin");
        var idTimeOutTask = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado.idTimeOutTask");
        console.log("_inactivarGuardadoAutomatico:idTimeOutTask:" + idTimeOutTask);
        if (idTimeOutTask != null) {
            console.log("clearTimeout");
            clearTimeout(idTimeOutTask);
        }
    };
    _setearPanel = function (idDiv) {
        var parentName = "#" + idDiv;
        if (idDiv === "menu1" || idDiv === "menu2" || idDiv === "home") {

            $("#tab-li-home01").parents('li').removeClass("active");
            $("#tab-li-menu01").parents('li').removeClass("active");
            $("#tab-li-menu02").parents('li').removeClass("active");
            switch (idDiv) {
                case "home":
                    $("#tab-li-home01").parents('li').addClass("active");
                    break;
                case "menu1":
                    $("#tab-li-menu01").parents('li').addClass("active");
                    break;
                default:
                    $("#tab-li-menu02").parents('li').addClass("active");
            }

            $('#home').removeClass("active");
            $('#home').removeClass("in");
            $('#menu2').removeClass("active");
            $('#menu2').removeClass(" in");
            $('#menu1').removeClass("active");
            $('#menu1').removeClass(" in");
            $(parentName).addClass("active");
            $(parentName).addClass(" in");
        }
    };
    /**
     * @function obtenerPagosPreviosMethod
     * Obtiene informacion de los pagos previos que realizo el contribuyente para el formulario, en los valores de la parametria de eventos
     * se invoca a una funcion customizada para que realice ciertas operaciones de acuerdo a los eventos programados, para este caso se insertado
     * el evento click cuando el contribuyente interactua con la casilla 402
     *
     * @param {string} itemParametria - coleccion de objetos json de la parametria
     * @param {string} itemEvento - coleccion de objetos json solo del control que viene de la parametria
     */
    _obtenerPagosPrevios = function (showModal, iniciarCalculoInteresPagoPrevios, codigoFormulario, codigoTributo) {
        var periodo = $('*[data-casilla="7"]').val();

        var params = _formatearPeriodoaCadena(periodo) + '/' + m_idFormulario + '/010502';
        var data = comunServiciosControlador.obtenerPagosPrevios(params, showModal, iniciarCalculoInteresPagoPrevios, codigoFormulario, codigoTributo);
        // $('#tblPagosPrevios tbody').empty();
        // if (data!=null) {
        //     //Almacenando data en localstorage para que luego sea enviado como parte de la declaracion
        //     comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.PagosPrevios", JSON.stringify(data));
        //     console.log(JSON.stringify(data));
        //     $.each(data, function (index, item) {
        //         var today = new Date(item.fecPag);
        //         var fecha = _convertirFechaFormateada(today);
        //         var hora = _convertirHoraFormateada(today);
        //
        //         $('#tblPagosPrevios > tbody:last').append('<tr> <td>' + item.detallePagosPreviosPK.codForPre + '</td> <td>' + item.detallePagosPreviosPK.numOrdPre + '</td> <td>' + item.detallePagosPreviosPK.codTriPag + '</td> <td>' + fecha + '</td> <td>' + hora + '</td> <td>S/. ' + item.mtoPag + '</td> <td><input data-idpagoprevio="' + item.detallePagosPreviosPK.numOrdPre + '" value="' + item.mtoPag + '" type=\"checkbox\" id=\"lstCheck\"></td> </tr>');
        //     });
        //     $('#modalPagosPrevios').modal('show');
        // }
    };

    function _convertirFechaFormateada(dateIn) {
        var yyyy = dateIn.getFullYear();
        var MM = dateIn.getMonth() + 1; // getMonth() is zero-based
        var dd = dateIn.getDate();
        var hh = dateIn.getHours();
        var mm = dateIn.getMinutes();
        var ss = dateIn.getSeconds();

        var dn = "a.m";

        if (mm <= 9) {
            mm = "0" + mm;
        }


        if (dd < 10) {
            dd = "0" + dd;
        }

        return String(dd + "/" + mm + "/" + yyyy); // Leading zeros for mm and dd
    };
    function _convertirHoraFormateada(dateIn) {

        var hh = dateIn.getHours();
        var mm = dateIn.getMinutes();
        var ss = dateIn.getSeconds();

        var dn = "a.m";
        if (hh > 12) {
            dn = "p.m";
            hh = hh - 12;
        }
        if (hh == 0) {
            hh = 12;
        }
        /* Si la Hora, los Minutos o los Segundos son Menores o igual a 9, le añadimos un 0 */
        if (hh <= 9) {
            hh = "0" + hh;
        }
        if (mm <= 9) {
            mm = "0" + mm;
        }

        if (ss <= 9) {
            ss = "0" + ss;
        }

        return String(hh + ':' + mm + ':' + ss + dn); // Leading zeros for mm and dd
    };
    /**
     * @function actualizarPagosPreviosMethod
     * Actualiza el campo indicadorSelecionado a valor 1 cuando se ha seleccionado el pago previo como descuento en la declaracion,
     * luego se vuelve a grabar en el lcoalstorage el json actualizado
     *
     * @param {string} idPagoPrevio - identificador del pago previo
     */
    _actualizarPagosPrevios = function (idPagoPrevio, checked, montoPago) {
        var json = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal1.PagosPrevios");
        if (json != "") {
            var jsonData = JSON.parse(json);
            $.each(jsonData, function (index, item) {
                if (item.detallePagosPreviosPK.numOrdPre == idPagoPrevio) {
                    item.indSel = checked;
                    item.mtoPag = montoPago;
                }
            });
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.PagosPrevios", JSON.stringify(jsonData));
        }
    };

    /**
     * @function obtenerPeriodoMethod
     * Obtiene informacion del formulario para el periodo seleccionado por el contribuyente, en los valores de la parametria de eventos
     * se invoca a una funcion customizada para que realice ciertas operaciones de acuerdo a los eventos programados, para este caso se insertado
     * el evento change cuando el contribuyente interactua con la casilla 007 - Periodo
     *
     * @param {string} itemParametria - coleccion de objetos json de la parametria
     * @param {string} itemEvento - coleccion de objetos json solo del control que viene de la parametria
     */
    _obtenerPeriodo = function () {
        console.log("Obtener periodo...");
        var periodo = $('*[data-casilla="7"]').val();
        if (periodo != "") {
            periodo = _formatearPeriodoaCadena(periodo);
            var parametrosUrl = periodo + "/" + m_idFormulario + "/" + _obtenerVersionFormulario();

            var data = comunServiciosControlador.obtenerPeriodo(parametrosUrl);
            //Evaluando si la declaracion es sustitutoria o rectificatoria
            if (data != null) {
                var ruc = sessionStorage.getItem("RUC_Login");
                var usuarioBean = comunLibreria.obtenerUsuarioBean();
                var caracterfinal = usuarioBean.codDepend.substr(usuarioBean.codDepend.length - 1);

                comunIntegrador.parsearDecoracionCasillas(data);

                var ctnValCasilla895;

                if (data.casillas != undefined) {
                    $.each(data.casillas, function (index, item) {
                        if (item.numCas == "895") {
                            ctnValCasilla895 = item.codHtmCntVal;
                        }
                    });
                }

                m_fechaVencimiento = data.jsonPeriodoBean.fechaVencimiento;

                if (data.jsonPeriodoBean!=null) {
                    if (data.jsonPeriodoBean.tasa!=null) {
                        m_valorTasa = parseFloat(data.jsonPeriodoBean.tasa);
                        console.log("obtenerValorTasa:"+m_valorTasa);
                    }
                }

                if (caracterfinal == "3" && ctnValCasilla895 == comunLibreria.getEnumTipoDeclaracion().ORIGINAL.value) {
                    $('*[data-casilla="895"]').empty();
                    var enumTipoDeclara = comunLibreria.getEnumTipoDeclaracion();
                    selectValues = "<option selected value='" + enumTipoDeclara.ORIGINAL.value + "'>" + enumTipoDeclara.ORIGINAL.name + "</option>";
                    selectValues += "<option value='" + enumTipoDeclara.SUSITUTORIA.value + "'>" + enumTipoDeclara.SUSITUTORIA.name + "</option>";
                    selectValues += "<option value='" + enumTipoDeclara.RECTIFICATORIA.value + "'>" + enumTipoDeclara.RECTIFICATORIA.name + "</option>";

                    // var enumTipoDeclara = comunLibreria.getEnumTipoDeclaracion();
                    // $('*[data-casilla="895"]').empty();
                    // var fechaVencimiento = data.jsonPeriodoBean.fechaVencimiento;
                    // var elemento = fechaVencimiento.split('/');
                    // var anio = elemento[2];
                    // var mes = elemento[1];
                    // var periodofechavencimiento = anio + "" + mes;
                    //
                    // var periodofinal = parseInt(periodo);
                    // var periodovencimientofinal = parseInt(periodofechavencimiento);
                    // var selectValues = "";
                    // if (periodofinal > periodovencimientofinal) {
                    //     $("span.titleMensajeGeneral").text("Sr. Contribuyente para seleccionar Sustitutoria la fecha de presentación de esta declaración debe ser anterior o igual a la fecha de vencimiento");
                    //     $('#modalMensajeGeneral').modal('show');
                    //     selectValues = "<option value='" + enumTipoDeclara.ORIGINAL.value + "'>" + enumTipoDeclara.ORIGINAL.name + "</option>";
                    //     selectValues += "<option value='" + enumTipoDeclara.RECTIFICATORIA.value + "'>" + enumTipoDeclara.RECTIFICATORIA.name + "</option>";
                    //     $('*[data-casilla="7"]').val("");
                    // }
                    // else {
                    //     selectValues = "<option value='" + enumTipoDeclara.ORIGINAL.value + "'>" + enumTipoDeclara.ORIGINAL.name + "</option>";
                    //     selectValues += "<option value='" + enumTipoDeclara.SUSITUTORIA.value + "'>" + enumTipoDeclara.SUSITUTORIA.name + "</option>";
                    //     selectValues += "<option value='" + enumTipoDeclara.RECTIFICATORIA.value + "'>" + enumTipoDeclara.RECTIFICATORIA.name + "</option>";
                    // }
                    $('*[data-casilla="895"]').append(selectValues);
                }
                else {
                    if (data.casillas != undefined) {
                        var showConfirm = false;
                        $.each(data.casillas, function (index, item) {
                            if (item.numCas == "895") {
                                if (item.codHtmCntVal != comunLibreria.getEnumTipoDeclaracion().ORIGINAL.value) {
                                    showConfirm = true;
                                }
                            }
                        });
                        if (showConfirm) { //Mostrar Ventana de confirmacion
                            $('#modalSustitutoriaRectificatoria').modal('show');
                        }
                    }
                }

                var idTimeOutTask = setTimeout("formulario0633.activarGuardadoAutomatico()", 60000); // auto salva cada minuto
                console.log("idTimeOutTask:" + idTimeOutTask);
                comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado.idTimeOutTask", idTimeOutTask);
            }
        }
    };
    /**
     * @function constanciaDeclaracionMethod
     * Muestra la constancia de la declaracion del formulario presentado, obtiene los datos del localstorage
     *
     * @param {string} idFormulario - identificador del id del formulario presentado
     *
     */
    _constanciaDeclaracion = function (idFormulario) {

        var data = comunConstancia.obtenerStorageConstancia(idFormulario);
        var json = JSON.parse(data);

        if (json.detalle.identificadorFormulario == idFormulario) {
            $("span.constancia-declaraciondato-ruc").text("20510772700");
            $("span.constancia-declaraciondato-razonsocial").text("Complexless");
            $("span.constancia-declaraciondato-periodo").text(json.detalle.periodoTributario);

            $.each(json.casillas, function (index, item) {
                if (item.codigoCasilla == "401") {

                    $("span.constancia-declaracionseccion-casilla401").text(item.valorCasilla.toLocaleString());
                }
                else if (item.codigoCasilla == "402") {
                    var valor = "";
                    if (item.valorCasilla != "") {
                        valor = "(" + item.valorCasilla + ")"
                    }
                    $("span.constancia-declaracionseccion-casilla402").text(valor);
                }
                else if (item.codigoCasilla == "403") {
                    $("span.constancia-declaracionseccion-casilla403").text(item.valorCasilla);
                }
                else if (item.codigoCasilla == "404") {
                    $("span.constancia-declaracionseccion-casilla404").text(item.valorCasilla);
                }
                else if (item.codigoCasilla == "405") {
                    $("span.constancia-declaracionseccion-casilla405").text(item.valorCasilla);
                }
                else if (item.codigoCasilla == "410") {
                    $("span.constancia-declaracionseccion-casilla410").text(item.valorCasilla);
                }
            });
            if (json.detalle.rectificatoria == "Si") {
                $("span.constancia-declaracionseccion-casillaretificasi").text("X");
            }
            else {
                $("span.constancia-declaracionseccion-casillaretificano").text("X");
            }
            $("span.constancia-declaracionseccion-casillaformapagoefectivo").text("X");
            $("span.constancia-declaracionseccion-casillaformapagocheque").text("");
        }
        //Insertando los proveedores que viene de la constancia del servidor
        var dataServer = comunConstancia.unionCadenaJson();
        var jsonServer = JSON.parse(dataServer);
        $.each(jsonServer.constancias, function (index, item) {
            if (item.identificadorFormulario == idFormulario) {

                $('#tblConstanciaDeclaracionPago tbody').empty();
                $.each(item.declaracionProveedores, function (index, item) {
                    if (item.razonsocial == "TOTAL") {
                        $('#tblConstanciaDeclaracionPago > tbody:last').append('<tr> <td colspan=\"2\" class=\"text-right\">TOTAL</td> <td class=\"text-right\">' + item.baseImponible + '</td> <td class=\"text-right\">' + item.retencion + '</td> </tr>');
                    } else {
                        $('#tblConstanciaDeclaracionPago > tbody:last').append('<tr> <td class=\"text-center\">' + item.ruc + '</td> <td class=\"text-left\">' + item.razonSocial + '</td> <td class=\"text-right\">' + item.baseImponible + '</td> <td class=\"text-right\">' + item.retencion + '</td> </tr> ');
                    }
                });
            }
        });
    };
    _cargarComboBox = function (codigoCasilla, item) {
        if (codigoCasilla == 895) {
            var controlUI = $('*[data-casilla="' + codigoCasilla + '"]');

            var enumTipoDeclara = comunLibreria.getEnumTipoDeclaracion();
            var textTipoDeclara = enumTipoDeclara.ORIGINAL.name;
            var valueTipoDeclara = enumTipoDeclara.ORIGINAL.value;
            if (item.valorCasilla == "1") {
                valueTipoDeclara = enumTipoDeclara.SUSITUTORIA.value;
                textTipoDeclara = enumTipoDeclara.SUSITUTORIA.name;
            }
            else if (item.valorCasilla == "2") {
                valueTipoDeclara = enumTipoDeclara.RECTIFICATORIA.value;
                textTipoDeclara = enumTipoDeclara.RECTIFICATORIA.name;
            }
            var selectValues = "<option value='" + valueTipoDeclara + "'>" + textTipoDeclara + "</option>";
            controlUI.empty();
            controlUI.append(selectValues);
        }
    };
    _validarDeclaracionSeleccionada = function() {
        var total = $('#lstTipoDeclaracion option').length;
        var control895 = $('*[data-casilla="895"]');
        var usuarioBean = comunLibreria.obtenerUsuarioBean();
        var caracterfinal = usuarioBean.codDepend.substr(usuarioBean.codDepend.length - 1);
        console.log("_validarDeclaracionSeleccionada:" + total);
        if (caracterfinal == "3" && total==3) {
            console.log("MEPECO validando");
            var fechaActual = new Date();
            var fechaVencimiento = comunLibreria.formatearYYYMMDD_GUION(m_fechaVencimiento);
            var fechaPresentacion = moment(fechaActual).format('YYYY-MM-DD');
            console.log("f:" + fechaVencimiento + " f2:" + fechaPresentacion);
            if (control895.val()==comunLibreria.getEnumTipoDeclaracion().SUSITUTORIA.value) {
                console.log("sustitoria...");
                if (moment(fechaPresentacion).isAfter(fechaVencimiento)) {
                    formulario0633.mostrarMensajeGeneral(comunMensajes.getMensaje("DECLAFECHMAYOR"));
                    control895.val(comunLibreria.getEnumTipoDeclaracion().ORIGINAL.value)
                }
            }
            else if (control895.val()==comunLibreria.getEnumTipoDeclaracion().RECTIFICATORIA.value) {
                console.log("rectificatoria...");
                if (moment(fechaPresentacion).isBefore(fechaVencimiento)) {
                    formulario0633.mostrarMensajeGeneral(comunMensajes.getMensaje("DECLAFECHMENOR"));
                    control895.val(comunLibreria.getEnumTipoDeclaracion().ORIGINAL.value)
                }
            }
        }
    };
    return {
        myIntegrador: comunIntegrador,

        obtenerPeriodo: function () {
            try {
                _obtenerPeriodo();
            } catch (e) {
                comunServiciosControlador.registrarLogMessage(comunLibreria.generarInformacionLogMessage2(m_nameJavascript,"obtenerPeriodo",e));
                this.mostrarMensajeGeneral(comunMensajes.getMensaje("ERR001"));
                throw e;
            }
        },
        obtenerPagosPrevios: function (showModal, iniciarCalculoInteresPagoPrevios, codigoFormulario, codigoTributo) {
            try {
                _obtenerPagosPrevios(showModal, iniciarCalculoInteresPagoPrevios, codigoFormulario, codigoTributo);
            } catch (e) {
                comunServiciosControlador.registrarLogMessage(comunLibreria.generarInformacionLogMessage2(m_nameJavascript,"obtenerPagosPrevios",e));
                this.mostrarMensajeGeneral(comunMensajes.getMensaje("ERR001"));
            }
        },
        ubicarCasilla: function (casilla) {
            var parentName = "#casilla" + casilla;
            var elem = document.querySelector(parentName);
            var parents = comunLibreria.getParents(elem, '[data-sample]');
            for (i = 0; i < parents.length; ++i) {
                _setearPanel(parents[i].id);
            }
            $('*[data-casilla="' + casilla + '"]').focus().select();
        },
        constanciaDeclaracion: function (idFormulario) {
            try {
                _constanciaDeclaracion(idFormulario);
            } catch (e) {
                comunServiciosControlador.registrarLogMessage(comunLibreria.generarInformacionLogMessage2(m_nameJavascript,"constanciaDeclaracion",e));
                this.mostrarMensajeGeneral(comunMensajes.getMensaje("ERR001"));
                throw e;
            }
        },
        actualizarPagosPrevios: function (idPagoPrevio, checked, montoPago) {
            try {
                _actualizarPagosPrevios(idPagoPrevio, checked, montoPago);
            } catch (e) {
                comunServiciosControlador.registrarLogMessage(comunLibreria.generarInformacionLogMessage2(m_nameJavascript,"actualizarPagosPrevios",e));
                this.mostrarMensajeGeneral(comunMensajes.getMensaje("ERR001"));
                throw e;
            }
        },
        activarGuardadoAutomatico: function () {
            try {
                _activarGuardadoAutomatico();
            } catch (e) {
                comunServiciosControlador.registrarLogMessage(comunLibreria.generarInformacionLogMessage2(m_nameJavascript,"activarGuardadoAutomatico",e));
                this.mostrarMensajeGeneral(comunMensajes.getMensaje("ERR001"));
                throw e;
            }
        },
        inactivarGuardadoAutomatico: function () {
            _inactivarGuardadoAutomatico();
        },
        muestraFormularioFrecuente: function () {
            _muestraFormularioFrecuente();
        },
        obtenerIdFormulario: function () {
            return m_idFormulario;
        },
        obtenerVersionFormulario: function () {
            return _obtenerVersionFormulario();
        },
        mostrarMensajeGeneral: function (mensaje) {
            $("span.titleMensajeGeneral").text(mensaje);
            $('#modalMensajeGeneral').modal('show');
        },
        setearValoresAdicionales: function () {
            console.log("setearValoresAdicionales");
            var control2 = $('*[data-casilla="2"]');
            var usuarioBean = comunLibreria.obtenerUsuarioBean();
            if (usuarioBean != null) {
                control2.val(usuarioBean.numRUC);
            }
            var control13 = $('*[data-casilla="13"]');
            control13.val(moment().format("YYYY-MM-DD"));
            var control58 = $('*[data-casilla="58"]');
            control58.val(moment().format("HH:mm:ss"));
            var control895 = $('*[data-casilla="895"]');
            var control5 = $('*[data-casilla="5"]');
            control5.val("0");
            if (control895.val() == "1" || control895.val() == "2") {
                control5.val("1");
            }
        },
        cargarComboBox: function (codigoCasilla, item) {
            _cargarComboBox(codigoCasilla, item);
        },
        esCasilla404ReadOnly: function () {
            return _esCasilla404ReadOnly();
        },
        formatearPeriodoaCadena: function (periodo) {
            _formatearPeriodoaCadena(periodo);
        },
        validarDeclaracionSeleccionada: function() {
            try {
                _validarDeclaracionSeleccionada();
            } catch (e) {
                comunServiciosControlador.registrarLogMessage(comunLibreria.generarInformacionLogMessage2(m_nameJavascript,"validarDeclaracionSeleccionada",e));
                this.mostrarMensajeGeneral(comunMensajes.getMensaje("ERR001"));
                throw e;
            }
        },
        obtenerListaCasillasSugeridas: function () {
            return m_casillasSugeridas;
        },
        limpiarPanelErrores: function () {
            $("span.lista-errores-total").text("0");
            $('#lstErrores').empty();
            $("#panel_errores").addClass("hidden");
        },
        obtenerNombreJavascript: function () {
            return m_nameJavascript;
        },
        obtenerValorTasa: function() {
            return m_valorTasa;
        },
        setearFechaDefecto: function() {
            //Seteando un mes anterior al actual
            var f1 = moment().add(-1, 'months');
            var f2 = f1.toDate();
            $('.date-picker').datepicker('update', f2);
            $('*[data-casilla="7"]').val("");
        }
    };

})();
//
//
$(document).ready(function () {
    comunLibreria.setBeginToken();
    comunIntegrador.inactivarGuardadoAutomatico();
    comunBandeja.inicializarLocalStorage();
    localStorage.setItem("ventana", "f0633");

    var form0633 = formulario0633;

    form0633.setearFechaDefecto();

    $("#casilla404").change(function (event) {
            var casilla404 = $(this).val();
            if (casilla404 < 0) {
                $(this).val(0);

            }
        }
    );

    //Establece una mascara para mostrar decimales
    $('#inputRentenciones401').inputmask({
        "alias": "decimal",
        "groupSeparator": ",",
        "autoGroup": true,
        "autoUnmask": true,
        "noshift": true
    });

    var casillaAlign = $('.casilla-align');
    casillaAlign.keyup(function () {
        var val = $(this).val();
        var re = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;
        var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)/g;
        if (re.test(val)) {
            //do something here
        } else {
            val = re1.exec(val);
            if (val) {
                this.value = val[0];
            } else {
                this.value = "";
            }
        }
    });

    comunLibreria.callServiceDiscoverIP();

    console.log("Invocando parametria 0633");
    var _dataParametriaInicial = comunServiciosControlador.obtenerParametria(form0633.obtenerIdFormulario(), form0633.obtenerVersionFormulario());

    if (_dataParametriaInicial!=null) {
        if (_dataParametriaInicial.indAutograb == 0) {
            $("#Recuperar_").prop("disabled", true);
        }
        if (_dataParametriaInicial.indTipDsk == 0) {
            $("#btnImportar").prop("disabled", true);
        }
    }

    $(".barraBuscar02").toggle(true);

    if (_dataParametriaInicial != null) {
        console.log("0633:decorator....");
        comunBandeja.setearFormularioActivo("f0633.html", _dataParametriaInicial.desFor);
        form0633.myIntegrador.parsearDecoracionCasillas(_dataParametriaInicial);

        if (form0633.myIntegrador.validarVigenciaFormularios(_dataParametriaInicial) == false) {
            $('#mensaje-validacion-vigencia').css("display", "block");
            $('#perIniVig').html(_dataParametriaInicial.fecIniVig);
            $('#perFinVig').html(_dataParametriaInicial.fecFinVig);
            $(".barraBuscar02").toggle(false);
        }
        $("#urlArchivoAyuda").attr("href", _dataParametriaInicial.urlArchivoAyuda);

        form0633.muestraFormularioFrecuente();
    }

    $('*[data-casilla="7"]').change(function () {
        console.log("evento cambio del periodo 633");

        if (comunIntegrador.obtenerActivacionCambioCasillas() == "true") {
            $('#modalModificarPeriodoTributario').modal('show');
        }
        else {
            $('#modalEsperaDatos').modal('show');
            setTimeout(function () {
                iniciarProcesoObtencionDatos();
            }, 500);
        }
    });

    function iniciarProcesoObtencionDatos() {
        console.log("iniciarProcesoObtencionDatos");
        try {
            var periodoIngresado = $('*[data-casilla="7"]').val();
            form0633.myIntegrador.setearActivacionCambioCasillas("false==" + periodoIngresado);
            var params = comunLibreria.formatearPeriodoaCadena(periodoIngresado) + "/" + formulario0633.obtenerIdFormulario();
            var dataResult = comunServiciosControlador.obtenerParametrosValidacionFormulario(params);

            var esPerceptorHidrocarburos = dataResult.esPerceptorHidrocarburos;
            var esRetenedorPerceptorVigente = dataResult.esRetenedorPerceptorVigente;
            var esAplicativoVigente = dataResult.esAplicativoVigente;

            console.log("evento cambio del periodo 633");
            if (esAplicativoVigente == "1") {
                var fecFinVigSplit = _dataParametriaInicial.fecFinVig.split('-');
                var fecIniVigSplit = _dataParametriaInicial.fecIniVig.split('-');
                var datepickerSplit = periodoIngresado.split('/');

                var fecFinVig = new Date(fecFinVigSplit[2], (parseInt(fecFinVigSplit[1]) - 1), fecFinVigSplit[0]);
                var fecIniVig = new Date(fecIniVigSplit[2], (parseInt(fecIniVigSplit[1]) - 1), fecIniVigSplit[0]);
                var datepicker = new Date(datepickerSplit[1], (parseInt(datepickerSplit[0]) - 1), 1);

                if (datepicker < fecIniVig) {
                    form0633.mostrarMensajeGeneral("Sr. Contribuyente, si desea presentar una declaración de período anterior al " + _dataParametriaInicial.fecIniVig + " debe  utilizar el PDT N° 633.");
                } else if (datepicker > fecFinVig) {
                    form0633.mostrarMensajeGeneral("Sr. Contribuyente, el Periodo Ingresado esta fuera del rango de vigencia del formulario 633");
                } else {
                    if (esPerceptorHidrocarburos == "1" && esRetenedorPerceptorVigente == "1") {
                        var periodoActual = moment().format("MM/YYYY");
                        if (periodoActual == periodoIngresado) {
                            form0633.mostrarMensajeGeneral("Sr. Contribuyente el período no debe ser mayor o igual al " + periodoActual + " de la fecha actual.");
                        }
                        else {
                            //Eliminado pagos previos de localstorage
                            localStorage.removeItem("SUNAT.AreaTemporal1.PagosPrevios");
                            for (var idx = 0, len = localStorage.length; idx < len; idx++) {
                                var key = localStorage.key(idx);
                                if (comunLibreria.contieneCadena(key, "SUNAT.MontoPagoPrevio")) {
                                    localStorage.removeItem(key);
                                }
                            }

                            formulario0633.obtenerPeriodo();

                            var esReadOnly = form0633.esCasilla404ReadOnly();
                            var retenciones = $('*[data-casilla="401"]').val();
                            if (retenciones != null && parseInt(retenciones) != 0) {
                                $('#inputRentenciones401').val(retenciones);
                                if ($('*[data-casilla="895"]').val() == comunLibreria.getEnumTipoDeclaracion().RECTIFICATORIA.value) {

                                    $('*[data-casilla="404"]').val('0');
                                    formulario0633.obtenerPagosPrevios(false, false, form0633.obtenerIdFormulario(), '010502');
                                }
                                else {
                                    if (esReadOnly) {
                                        console.log("inabilita casilla 404");
                                        $('*[data-casilla="404"]').val('0');
                                        formulario0633.obtenerPagosPrevios(false, false, form0633.obtenerIdFormulario(), '010502');
                                    }
                                    else {
                                        console.log("se habilita casilla 404");
                                        //Invocando a pagos previos para setear los pagos marcados por defecto
                                        formulario0633.obtenerPagosPrevios(false, true, form0633.obtenerIdFormulario(), '010502');
                                        //Obtener de modo asincrono el calculo de interes considerando los pagos previos
                                        $('#casilla404').val('Calculando...');
                                    }
                                }
                            }
                            else {
                                $('#inputRentenciones401').val('0');
                                $('#casilla404').val('0');
                            }
                            var casilla403 = $('*[data-casilla="403"]').val();
                            if (casilla403 == 0) {
                                console.log("iniciarProcesoObtencionDatos:: casilla 403 ZERO inabilitando casilla 404");
                                $('*[data-casilla="404"]').attr("readonly", true);
                            }
                            if (casilla403 < 0) {
                                $('*[data-casilla="403"]').val(0);
                            }
                        }
                    } else {
                        form0633.mostrarMensajeGeneral("Sr. Contribuyente, en el período tributario al que corresponde su declaración, Ud. no está designado como Agente de Percepción");
                        $('*[data-casilla="7"]').val("");
                    }
                }
            } else {
                form0633.mostrarMensajeGeneral("Sr. Contribuyente el periodo ingresado  debe ser mayor o igual al periodo de instalación de la plataforma " + comunLibreria.formatearPeriodoSUNAT(dataResult.periodoInicioAplicativo));
                $('*[data-casilla="7"]').val("");
                $('*[data-casilla="895"]').empty();
                $('*[data-casilla="895"]').append("<option value='" + comunLibreria.getEnumTipoDeclaracion().ORIGINAL.value + "'>" + comunLibreria.getEnumTipoDeclaracion().ORIGINAL.name + "</option>");
            }
        } catch (e) {
            comunServiciosControlador.registrarLogMessage(comunLibreria.generarInformacionLogMessage2(form0633.obtenerNombreJavascript(),"iniciarProcesoObtencionDatos",e));
            throw e;
        }
        $('#modalEsperaDatos').modal('hide');
    }

    $('#casilla401').mouseover(function (e) {
        if ($('#casilla401').val() == 0) {
            form0633.mostrarMensajeGeneral("Sr. Contribuyente, usted no cuenta con información de comprobantes de percepción registrados. De haber efectuado percepciones en este período, corregir la información registrada de sus comprobantes de percepción y automáticamente la información que le proporcionaremos en su Declaración se actualizará. Si continúa con el registro presentará su declaración con monto cero.");
        }
    });

    $('#casilla502').mouseover(function (e) {
        if ($('#casilla502').val() == 0) {
            form0633.mostrarMensajeGeneral("Sr. Contribuyente, usted no cuenta con información de comprobantes de percepción registrados. De haber efectuado percepciones en este período, corregir la información registrada de sus comprobantes de percepción y automáticamente la información que le proporcionaremos en su Declaración se actualizará. Si continúa con el registro presentará su declaración con monto cero.");
        }
    });

    $('*[data-casilla="7"]').keyup(function (e) {
        if (e.keyCode == 27) {
            $('*[data-casilla="7"]').val("");
        }
    });

    console.log("CASILLA402");
    $('*[data-casilla="402"]').click(function () {
        if ($.active > 0) {
            $("span.titleMensajeGeneral").text("Cargando pagos previos. Intente nuevamente");
            $('#modalMensajeGeneral').modal('show');
        }
        else {
            $('#mensajePagoPrevios').html("");
            formulario0633.obtenerPagosPrevios(true, false, form0633.obtenerIdFormulario(), '010502');
        }
    });

    $('*[data-casilla="404"]').keyup(function () {
        console.log("change 404");
        var periodo = $('*[data-casilla="7"]').val();
        form0633.myIntegrador.setearActivacionCambioCasillas("true==" + periodo);
        var montoCalc = 0;
        var control405 = $('*[data-casilla="405"]');
        var control410 = $('*[data-casilla="410"]');
        var control404final = $(this).val() == "" ? 0 : $(this).val();//para que el valor sea cero cuando sea vacio anthony


        $(this).val(control404final);//para que el valor sea cero cuando sea vacio anthony
        montoCalc = form0633.myIntegrador.obtenerValorCalculoExpresion(control405[0].attributes["data-jsonCalculo"].value);
        if (control405.attr("data-indRed") == "1") {
            montoCalc = parseFloat(montoCalc).toFixed();
        }
        if (montoCalc < 0) {
            montoCalc = 0;
        }
        control405.val(montoCalc);

        montoCalc = form0633.myIntegrador.obtenerValorCalculoExpresion(control410[0].attributes["data-jsonCalculo"].value);
        if (control410.attr("data-indRed") == "1") {
            montoCalc = parseFloat(montoCalc).toFixed();
        }
        if (montoCalc < 0) {
            montoCalc = 0;
        }
        control410.val(montoCalc);

    });
    //
    $("#buttonConfirmarSI").click(function () {
        console.log("buttonConfirmarSI");
    });
    $("#buttonConfirmarNO").click(function () {
        console.log("buttonConfirmarNO");
        $("#btnLimpiarFormulario").trigger("click");
    });
    $("#btnLimpiarFormulario").click(function () {
        $('#Reset-01').trigger("reset");
        $("#tab-li-home01").trigger("click");
        formulario0633.myIntegrador.setearActivacionCambioCasillas("false");
        $('*[data-casilla="895"]').empty();
        $('*[data-casilla="895"]').append("<option value='" + comunLibreria.getEnumTipoDeclaracion().ORIGINAL.value + "'>" + comunLibreria.getEnumTipoDeclaracion().ORIGINAL.name + "</option>");
        $('*[data-casilla="7"]').datepicker("update");
        form0633.limpiarPanelErrores();
        form0633.setearFechaDefecto();
    });

    $("#btnNoLimpiarFormulario").click(function () {
        $(this).popover('hide');
    });
    $(".barraBuscar02").click(function () {

        console.log("Agregar Bandeja");

        if (!comunLibreria.validarConexionInternet()) {

            $("span.titleMensajeGeneral").text(comunMensajes.getMensaje("INF001", ""));
            $('#modalMensajeGeneral').modal('show');

        } else {

            if (!comunBandeja.validaMaximoFormularios()) {
                $('#modalFormularioExcede').modal('show');
                return;
            }

            if ($('*[data-casilla="410"]').val() == "") {
                //form0633.mostrarMensajeGeneral("Sr. Contribuyente, Ingrese el importe a pagar.");
                $("#modalValidacionCasilla410 span.titleMensajeGeneral").text("Sr. Contribuyente, Ingrese el importe a pagar.");
                $('#modalValidacionCasilla410').modal('show');
                return;
            }

            //Validando que el importa a pagar no sea mayor que la deuda
            var control405 = $('*[data-casilla="405"]');
            var control410 = $('*[data-casilla="410"]');
            var deudaTributaria = 0 + comunLibreria.obtenerValorDouble(control405.val());
            var importePagar = 0 + comunLibreria.obtenerValorDouble(control410.val());
            if (importePagar > deudaTributaria) {
                form0633.mostrarMensajeGeneral("El importe de la casilla 410 no puede ser mayor al importe de la casilla 405.");
                return;
            }

            var messagesArray = form0633.myIntegrador.validarFormularios();
            if (messagesArray.length > 0) {
                $("span.lista-errores-total").text(messagesArray.length);
                $('#lstErrores').empty();
                for (var i = 0; i < messagesArray.length; i++) {
                    $('#lstErrores').append('<li class=\"list-group-item\"><div><span class=\"Errores glyphicon glyphicon-remove\"></span><a href=\"#\" target=\"_self\" onclick="formulario0633.ubicarCasilla(\'' + messagesArray[i] + '\');">Ingresar la casilla ' + messagesArray[i] + '</a></div> </li>');
                }
                $("#panel_errores").removeClass("hidden");
                return;
            }

            var periodo = $('*[data-casilla="7"]').val();
            if (!comunBandeja.existeFormulario(form0633.obtenerIdFormulario(), periodo)) {
                localStorage.setItem("ventana", "f0633");
                form0633.inactivarGuardadoAutomatico(); //inactiva autoguardado

                form0633.setearValoresAdicionales(); //Seteando valores de casillas ocultas

                $('#myModal-40').modal('show');
                var casillas = $('.data-sunat');

                var casillasArray = [];
                var valorTmp = "";
                var tipoDeclaracion = "0";
                if ($('*[data-casilla="895"]').val() == comunLibreria.getEnumTipoDeclaracion().RECTIFICATORIA.value ||
                    $('*[data-casilla="895"]').val() == comunLibreria.getEnumTipoDeclaracion().SUSITUTORIA.value) {
                    tipoDeclaracion = "1";
                }
                $.each(casillas, function (index, item) {
                    valorTmp = $('*[data-casilla="' + $(item).data('casilla') + '"]').val();
                    if ($(item).data('casilla') == 7) {
                        valorTmp = comunLibreria.formatStringPeriod(valorTmp);
                    }
                    else if ($(item).data('casilla') == 503) {
                        valorTmp = $('*[data-casilla="401"]').val();
                    }
                    else if ($(item).data('casilla') == 871) {
                        valorTmp = tipoDeclaracion;
                    }
                    else if ($(item).data('casilla') == 501) {
                        valorTmp = "" + $(item).data('originalvalor');
                    }
                    casillasArray.push({
                        codigoCasilla: $(item).data('casilla'),
                        valorCasilla: valorTmp,
                        tipoCasilla: $(item).data('casillatipo'),
                        codtipcamCasilla: $(item).data('codtipcam')
                    });
                });

                var tributos = $('[data-codigoTributo]');
                var tributosArray = [];
                $.each(tributos, function (index1, item1) {
                    tributosArray.push({
                        codigoTributo: item1.attributes["data-codigoTributo"].value,
                        descripcionTributo: item1.attributes["data-descripcionTributo"].value,
                        valorTributo: item1.value,
                        montoDeudaTributaria: $('*[data-casilla="405"]').val(),
                        baseImponible: $('*[data-casilla="502"]').val(),
                        impuestoResultante: $('*[data-casilla="401"]').val()
                    });
                });

                //Anexando casillas sugeridas
                var periodoCasilla = comunLibreria.formatStringPeriod(periodo);
                var casillasSugeridasArray = [];
                var casillasSugeridas = form0633.obtenerListaCasillasSugeridas();
                for (i = 0; i < casillasSugeridas.length; i++) {
                    var controlUI = $('*[data-casilla="' + casillasSugeridas[i] + '"]');
                    casillasSugeridasArray.push({
                        codigoCasilla: casillasSugeridas[i],
                        valorCasilla: $('*[data-casilla="' + casillasSugeridas[i] + '"]').val(),
                        periodoCasilla: periodoCasilla,
                        valorOriginal: controlUI.attr("data-originalvalor")
                    });
                }

                var usuarioBean = comunLibreria.obtenerUsuarioBean();
                var numRuc = usuarioBean.numRUC;

                var rectificatoria = "Si";
                var jsonDetalle = ' "detalle" : { "identificadorFormulario": "##__##__##", "numRuc":"' + numRuc + '", "codFormulario": "' + form0633.obtenerIdFormulario() + '", "numeroVersionFormulario": "' + form0633.obtenerVersionFormulario() + '", "descripcionFormulario": "'+ comunBandeja.obtenerFormularioActivoDescripcion()+'", "montoPago": "' + $('*[data-casilla="410"]').val() + '", "periodoTributo": "' + $('*[data-casilla="7"]').val() + '","rectificatoria" : "' + rectificatoria + '","tasa":' + form0633.obtenerValorTasa() + '}';
                var jsonTributo = ' "tributos": ' + JSON.stringify(tributosArray);
                var jsonCasillas = ' "casillas": ' + JSON.stringify(casillasArray);
                var jsonCasillasSugeridas = ' "casillassugeridas": ' + JSON.stringify(casillasSugeridasArray);

                var jsonPagosPrevios = '"pagosprevios": ';
                var json = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal1.PagosPrevios");
                if (json != "null") {
                    jsonPagosPrevios = jsonPagosPrevios + json; //json.substr(1,json.length-2);
                }
                else {
                    jsonPagosPrevios = jsonPagosPrevios + "[] "; //json.substr(1,json.length-2);
                }
                var jsonResult = '{' + jsonDetalle + ',' + jsonTributo + ',' + jsonCasillasSugeridas + ',' + jsonCasillas + ',' + jsonPagosPrevios + '}'; //.substr(2,jsonPagosPrevios.length) ;
                console.log("jsonForm0633:" + jsonResult);

                var newJsonResult = comunBandeja.addKeyInStorage(jsonResult);
                window.parent.postMessage("AGREGAR-BANDEJA-DE-CARRITO-" + newJsonResult, "*");

                //Invocando servicio para guardar casillas frecuentes
                var casillasFrecuentes = $('[data-casillaFrecuente]');
                var casillasFrecuentesArray = [];
                $.each(casillasFrecuentes, function (index, item) {
                    casillasFrecuentesArray.push({
                        codigoCasilla: $(item).data('casilla'),
                        valorCasilla: $('*[data-casilla="' + $(item).data('casilla') + '"]').val()
                    });
                });
                form0633.myIntegrador.guardarCasillaFrecuente(form0633.obtenerIdFormulario(), JSON.stringify(casillasFrecuentesArray));

                localStorage.removeItem("SUNAT.AreaTemporal1.PagosPrevios"); //Eliminado de localstorage
                for (var idx = 0, len = localStorage.length; idx < len; idx++) {
                    var key = localStorage.key(idx);
                    if (comunLibreria.contieneCadena(key, "SUNAT.MontoPagoPrevio")) {
                        localStorage.removeItem(key);
                    }
                }
                comunServiciosControlador.registrarLog(comunLibreria.generarInformacionLog("Se agrego formulario 0633 a Bandeja de Presentacion"));
            }
            else {
                $('#modalFormularioExiste').modal('show');
            }
        }
    });
    //
    $('#Panel-Bandeja-icono').click(function () {
        $("#panel_errores").addClass("hidden");
    });
    //
    $('#simula-pdf-click').click(function () {
        $("#myModal-40 .modal-dialog").addClass("size-modal");
        $('#00001').addClass("hidden");

        var id = form0633.obtenerIdFormulario() + comunLibreria.formatStringPeriod($('*[data-casilla="7"]').val());
        comunConstancia.verPreliminar697633626(id);

        //Muestra panel de vista de la declaracion
        $('#00002').removeClass("hidden");
    });
    //
    $('#cerrar-preliminar-2, #cerrar-reporte-preliminar').click(function () {
        $("#myModal-40 .modal-dialog").removeClass("size-modal");
        $('#00001').removeClass("hidden");
        $('#00002').addClass("hidden");
    });
    //
    $('[data-toggle="popover"]').popover();
    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });
    //
    //$('input').placeholder();
    $('#Ligero').click(function () {
        $('.Separador').addClass("ligero");
        $('fieldset.linea-caja').addClass("ligero");
        $('.linea-caja legend').addClass("ligero");
        $("#Ligero span").removeClass("hidden");
        $("#Normal span").addClass("hidden");
    });
    $('#Normal').click(function () {
        $('.Separador').removeClass("ligero");
        $('fieldset.linea-caja').removeClass("ligero");
        $('.linea-caja legend').removeClass("ligero");
        $("#Ligero span").addClass("hidden");
        $("#Normal span").removeClass("hidden");
    });
    //
    $('#Añadir-Bandeja').removeClass("hidden");
    $("#casilla502, #casilla401").click(function () {
        $("#Activar-Asistente").trigger("click");
    });
    $("#casilla402").click(function () {
        $("#click-modal402").trigger("click");
    });
    $("#Clean-Form").click(function () {
        $('#modalLimpiarFormulario').modal('show');
    });
    $("#Recuperar_").click(function () {
        $('#Recuperar_boton').trigger("click");
    });


    $("#Presentar-Pagar").click(function () {
        var montoPagar = comunBandeja.obtenerTotalaPagar();
        if (montoPagar != -1) {
            if (montoPagar > 0) {
                comunLibreria.cambiarTextoBontonesModalPresentarPagar("SI", "NO");
                comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPS", ""));
            }
            else {
                comunLibreria.cambiarTextoBontonesModalPresentarPagar("ACEPTAR", "CANCELAR");
                comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPSCERO", ""));
            }
        }
    });

    $('#btnPresentarPagar').click(function () {
        $("#btnPaso03").trigger("click");
        $(".myModal-40").modal("hide");
        $(".modal-backdrop").addClass("hidden");
        localStorage.setItem("Tutorkey", true);
    });

    $("#Otro-Formulario").click(function () {
        $("#btnPaso01").trigger("click");
        $(".myModal-40").modal("hide");
        $(".modal-backdrop").addClass("hidden");
    });

    $("#tab-li-menu01").click(function (event) {
        var fecIniVigSplit = _dataParametriaInicial.fecIniVig.split('-');
        var fecFinVigSplit = _dataParametriaInicial.fecFinVig.split('-');
        var datepickerSplit = $('*[data-casilla="7"]').val().split('/');

        var fecFinVig = new Date(fecFinVigSplit[2], (parseInt(fecFinVigSplit[1]) - 1), fecFinVigSplit[0]);
        var fecIniVig = new Date(fecIniVigSplit[2], (parseInt(fecIniVigSplit[1]) - 1), fecIniVigSplit[0]);
        var datepicker = new Date(datepickerSplit[1], (parseInt(datepickerSplit[0]) - 1), 1);

        if ($('*[data-casilla="7"]').val() != "") {
            if (datepicker < fecIniVig) {
                event.preventDefault();
                event.stopPropagation();
            }
            else if (datepicker > fecFinVig) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
        if ($('*[data-casilla="7"]').val() == "" || ( $('#casilla502').val() == "" && $('#casilla401').val() == "" )) {
            event.preventDefault();
            event.stopPropagation();
        }

        if ($('*[data-casilla="7"]').val() == "") {
            form0633.mostrarMensajeGeneral("Sr. Contribuyente, debe ingresar el período tributario.");
        }
    });

    $("#tab-li-menu02").click(function (event) {
        var fecIniVigSplit = _dataParametriaInicial.fecIniVig.split('-');
        var fecFinVigSplit = _dataParametriaInicial.fecFinVig.split('-');
        var datepickerSplit = $('*[data-casilla="7"]').val().split('/');

        var fecFinVig = new Date(fecFinVigSplit[2], (parseInt(fecFinVigSplit[1]) - 1), fecFinVigSplit[0]);
        var fecIniVig = new Date(fecIniVigSplit[2], (parseInt(fecIniVigSplit[1]) - 1), fecIniVigSplit[0]);
        var datepicker = new Date(datepickerSplit[1], (parseInt(datepickerSplit[0]) - 1), 1);

        if ($('*[data-casilla="7"]').val() != "") {
            if (datepicker < fecIniVig) {
                event.preventDefault();
                event.stopPropagation();
            }
            else if (datepicker > fecFinVig) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
        if ($('*[data-casilla="7"]').val() == "" || ( $('#casilla502').val() == "" && $('#casilla401').val() == "" )) {
            event.preventDefault();
            event.stopPropagation();
        }

        if ($('*[data-casilla="7"]').val() == "") {
            form0633.mostrarMensajeGeneral("Sr. Contribuyente, debe ingresar el periodo tributario.");
        }
    });

    $("#btnNoModificarPeriodoTributario").click(function () {
        var control7 = $('*[data-casilla="7"]');
        var periodoAnterior = form0633.myIntegrador.obtenerPeriodoCambioCasillas();
        control7.val(periodoAnterior);
        var periodoAnteriorSpliteada = periodoAnterior.split("/");
        var periodoAnteriorAnio = periodoAnteriorSpliteada[1];
        var periodoAnteriorMes = periodoAnteriorSpliteada[0];
        var periodoAnteriorDate = new Date(periodoAnteriorAnio, (periodoAnteriorMes - 1));
        $('.date-picker').datepicker('update', periodoAnteriorDate);
    });

    $("#btnModificarPeriodoTributario").click(function () {
        var control7 = $('*[data-casilla="7"]');
        var periodo = control7.val();

        $('#Reset-01').trigger("reset");

        control7.val(periodo);

        $('#modalEsperaDatos').modal('show');
        setTimeout(function () {
            iniciarProcesoObtencionDatos();
        }, 500);
    });

    $("#btnGuardarPagosPrevios").click(function () {
        var monto = 0;
        var pagoIds = "";
        var montoPagos = "";
        var calcularInteres = true;

        if ($('*[data-casilla="895"]').val() == comunLibreria.getEnumTipoDeclaracion().RECTIFICATORIA.value) {
            $('*[data-casilla="404"]').val('0');
            calcularInteres = false;
        }

        var arr = document.getElementsByTagName("input");
        for (var i in arr) {
            if (i != "lstCheck") {
                if (arr[i].id == "lstCheck" && arr[i].localName == "input") {
                    if (arr[i].checked) {
                        var key = arr[i].attributes["data-idpagoprevio"].value;
                        var valoreditable = $('*[data-idpagoprevioedit="' + key + '"]').val();
                        var montopagofinal = localStorage.getItem("SUNAT.MontoPagoPrevio" + key);

                        if (parseFloat(valoreditable) <= 0) {
                            $('#mensajePagoPrevios').html("Sr. Contribuyente, el importe pagado ingresado para el Formulario/Tributo no puede ser negativo o igual a cero");
                            return;
                        }

                        if (parseFloat(valoreditable) <= parseFloat(montopagofinal)) {
                            monto += parseFloat(valoreditable);
                            form0633.actualizarPagosPrevios(parseInt(key), "1", parseFloat(valoreditable));
                            pagoIds = pagoIds + parseInt(key) + ",";
                            montoPagos = montoPagos + valoreditable + ",";
                        }
                        else {
                            $('#mensajePagoPrevios').html("Sr. Contribuyente, el importe pagado ingresado para el  Formulario/Tributo no puede ser mayor al importe registrado en SUNAT");
                            return;
                        }
                    }
                    else {
                        var key = arr[i].attributes["data-idpagoprevio"].value;
                        var valoreditable = $('*[data-idpagoprevioedit="' + key + '"]').val();
                        form0633.actualizarPagosPrevios(key, "0", parseFloat(valoreditable));
                    }
                }
            }
        }
        comunIntegrador.procesarGuardarPagosPrevios(monto, pagoIds, montoPagos, false, form0633.obtenerIdFormulario(), '010502', calcularInteres);
        $('#modalPagosPrevios').modal('hide');
    });

    $("#btnSalirPagosPrevios").click(function () {
       $('#modalPagosPrevios').modal('hide');
    });

    $('#casilla410').keyup(function () {
        var casilla410fin = $(this).val() == "" ? 0 : $(this).val();
        $(this).val(casilla410fin);
        $('#casilla410').change();
    });
    $('#casilla410').change(function () {
        var casilla410 = $(this).val();
        if (casilla410 < 0) {
            $(this).val(0);
        }
        //Validando que el importa a pagar no sea mayor que la deuda
        var control405 = $('*[data-casilla="405"]');
        var control410 = $('*[data-casilla="410"]');
        var deudaTributaria = 0 + comunLibreria.obtenerValorDouble(control405.val());
        var importePagar = 0 + comunLibreria.obtenerValorDouble(control410.val());
        if (importePagar > deudaTributaria) {
            //form0633.mostrarMensajeGeneral("El importe de la casilla 410 no puede ser mayor al importe de la casilla 405.");
            $("#modalValidacionCasilla410 span.titleMensajeGeneral").text("El importe de la casilla 410 no puede ser mayor al importe de la casilla 405.");
            $('#modalValidacionCasilla410').modal('show');
            $(this).val(0);
            return;
        }
    });

    $("#btnModalCasilla410").click(function(){
        $('#casilla410').val(0);
    });

    $('*[data-casilla="895"]').change(function () {
        form0633.validarDeclaracionSeleccionada();
    });

    //
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    $('.btnPaso').removeClass("current");
    $('#btnPaso02').addClass("current");
    $('.date-picker').datepicker({
        format: "mm-yyyy",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true
    });
    $('.date-picker2').datepicker({
        format: "dd-mm-yyyy",
        viewMode: "days",
        minViewMode: "days",
        autoclose: true
    });
    $('body').on('shown.bs.modal', '#modal-frecuente', function () {
        $('input:visible:enabled:first', this).focus();
    });
    //
});


//webMessage para el formulario0633
function displayMessageForm0633(evt) {

    if (evt.data == "DESACTIVAR-PANEL-PRESENTARPAGAR") {
        $('#myModal-40').modal('hide');
    }
    if (evt.data == "EDITAR-0633") {
        console.log("WebMessage, edicion estando en el mismo formulario");
        var dataJson = comunBandeja.getKeyDataStorage("SUNAT.Edicion.Formulario0633.Data");
        if (dataJson!="") {
            var dataJsonParse = JSON.parse(dataJson);
            casillasEditarBandeja(dataJsonParse);
        }
    }
    if (evt.data == "PAGAR-DESDE-BANDEJA") {
        var montoPagar = comunBandeja.obtenerTotalaPagar();

        if (montoPagar != -1) {
            if (montoPagar > 0) {
                comunLibreria.cambiarTextoBontonesModalPresentarPagar("SI", "NO");
                comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPS", ""));
            }
            else {
                comunLibreria.cambiarTextoBontonesModalPresentarPagar("ACEPTAR", "CANCELAR");
                comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPSCERO", ""));
            }
        }
    }
}
if (window.addEventListener) {
    window.addEventListener("message", displayMessageForm0633, false);
}
else {
    window.attachEvent("onmessage", displayMessageForm0633);
}

var _edicionForm = comunBandeja.getKeyDataStorage("SUNAT.Edicion.Formulario0633.Accion");
console.log("Verificando si hay edicion 633:" + _edicionForm);
if (_edicionForm!=null) {
    if (_edicionForm == "SI") {
        var dataJson = comunBandeja.getKeyDataStorage("SUNAT.Edicion.Formulario0633.Data");
        if (dataJson!="") {
            console.log("Si hay edicion de formulario!");
            var dataJsonParse = JSON.parse(dataJson);
            casillasEditarBandeja(dataJsonParse);
        }
    }
}

function casillasEditarBandeja(dataJsonParse) {

    if (dataJsonParse != undefined && dataJsonParse != null) {

        var casillas = $('.data-sunat');

        $('*[data-casilla="7"]').val(dataJsonParse["detalle"].periodoTributo);

        $.each(casillas, function (indexCasilla, itemCasilla) {

            var codigoCasilla = $(itemCasilla).data('casilla');

            $.each(dataJsonParse["casillas"], function (index, item) {
                var codigoCasillaJson = item.codigoCasilla;
                if (codigoCasilla == codigoCasillaJson && codigoCasillaJson != "7") {
                    formulario0633.cargarComboBox(codigoCasilla, item);
                    $('*[data-casilla="' + $(itemCasilla).data('casilla') + '"]').val(item.valorCasilla);
                }
            });
        });

        var retenciones = $('*[data-casilla="401"]').val();
        $('#inputRentenciones401').val(retenciones);
        localStorage.removeItem('SUNAT.Edicion.Formulario0633.Accion');
        localStorage.removeItem('SUNAT.Edicion.Formulario0633.Data');
    }
}

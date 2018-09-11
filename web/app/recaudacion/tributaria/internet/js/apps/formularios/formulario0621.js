/* global formulario0621_importar */

var casillasTasaVariable = [];
var lista_trPeriodo = [];
var enumTipoDeclara = comunLibreria.getEnumTipoDeclaracion();
var evitarMensajes = false;
var indicadorLE = false;
var navegacionTab = false;
var editandoFormulario = false;
var _ubigeo_ddpUbigeo = null;

var datosPeriodoBean = function () {
    this.ubigeoContribuyente = null;
    this.percepcionesPeriodo = null;
    this.tipoDeclaracion = null;
    this.exportacionesEmbarcadas = null;
    this.listPagosPrevios = null;
    this.datosPadronIGVJusto = null;
    this.tamanioContribuyente = null;
    this.retencionesPeriodo = null;
    this.casillasDeclaracionAnterior = null;
    this.ListAfectoTributo = null;
    this.saldoAFavorTributo = null;
    this.actualUIT = null;
    this.declaracionAnterior = null;
    this.cantidadDeclaracionesJuradas = null;
    this.afectacionesTributos = null;
    this.vecFisCon = null;
    this.tasasTributos = null;
    this.ingresosNetosEjercicioActual = null;
    this.listTributosAsociados = null;
    this.fecVenTributos = null;
    this.coeficienteIgv = null;
    this.recuperar_preliminal = null;
    this.actualUIT = null;
    this.datosPadronIGVJusto = null;
    this.ubigeoContribuyente = null;
    this.ingresosNetosEjercicioActual = null;
    this.IngresosAcumuladosEjercicioActual = null;

    this.json = function () {
        return JSON.stringify(this);
    };
};
var datoperiodobean = new datosPeriodoBean();

var formulario0621 = (function () {
    var m_casillasSugeridas = [
        "892", "891", "122", "127", "120", "119", "114", "113", "117", "116",
        "115", "351", "109", "108", "103", "102", "101", "100", "342", "107",
        "106", "105", "341", "340", "185", "317", "315", "301", "145", "303",
        "380", "171", "179"
    ];
    var m_idFormulario = "0621";
    var m_versionFormulario = "1.0";
//    var listFechaVencimiento = "";
//    var listFechaVencimientoReLlamado = "";
    var listTributosAsociados = "";
//    var listSaldoAfavor;
    var coeficienteRentaService = "";
    var pagosPrevios = null;
    var indicadorTipoMonedaService = "";
    var usuarioBean = comunLibreria.obtenerUsuarioBean();
    var resumenCasillasLE = "";
    var dataUbigeo = "";
    var tieneResumenCasilla = false;
    var indicadorTipoResumenCasilla;
    var tasaInteresMoratorio = null;
    var detalleParametros = null;
    var mostroUltimaDeclaracion = false;
    var tasasVigentes = {};
    var fechaVencimientoPeriodo = "";
    var declaracionDeterminada;
    var recuperar_preliminal = null;
    var PorcentajeRentaTributo = null;
    var countTabRenta = 0;

    var listaMap_Temp_P = [];
    var listaMap_Temp_PI = [];
    var listaMap_Temp_R = [];

    var nombreArchivoP = "";
    var nombreArchivoPI = "";
    var nombreArchivoR = "";
    var Total_montoComprobantePercepcion = 0.00;
    var Total_montoComprobantePago = 0.00;
    var Total_montoComprobanteRetencion = 0.00;

    var definicionCasilla = null;
    var padronParametro = null;

//    var datosPeriodo = null;

    var casillasInternas = function () {
        this.casilla_inter_895 = null;
        this.casilla_inter_005 = null;
        this.casilla_inter_871 = null;
        this.casilla_inter_056 = null;
        this.casilla_inter_898 = null;
//        this.casilla_inter_861 = 0;
        this.casilla_inter_874 = null;
//        this.casilla_inter_867 = 0;
//        this.casilla_inter_887 = 0;
        this.casilla_inter_889 = null;
//        this.casilla_inter_391 = "";
        this.casilla_inter_392 = null;
        this.json = function () {
            return JSON.stringify(this);
        };
    };

    var tasaMyPE = 0.01;
    var casillasInternasBean = new casillasInternas();


    _agregarValidaciones = function () {
        var messagesArray = [];

        //********* Validacion 353
        var casilla353 = _obtenerValorCasilla("353");
        var casilla340 = _obtenerValorCasilla("340");
        var casilla182 = _obtenerValorCasilla("182");
        if (casilla340 != "" || casilla182 != "") {
            if (casilla353 == "") {
                messagesArray.push("353");
            }
        }

        //********* Validacion 352
        var casilla352 = _obtenerValorCasilla("352");
        var casilla351 = _obtenerValorCasilla("351");
        if (casilla340 != "" || casilla182 != "" || casilla351 != "") {
            if (casilla352 == "") {
                messagesArray.push("352");
            }
        }

        //********* Validacion 189
        var casilla189 = _obtenerValorCasilla("189");
        var casilla886 = _obtenerValorCasilla("886");

        if (casilla189 == "" && casilla886 == "Soles") {
            messagesArray.push("189");
        }
        //********* Validacion 345
        var casilla345 = _obtenerValorCasilla("345");
        if (casilla345 == "" && casilla886 == "Soles") {
            messagesArray.push("345");
        }
        //********* Validacion 307
        var casilla307 = _obtenerValorCasilla("307");
        if (casilla307 == "" && casilla886 == "Soles") {
            messagesArray.push("307");
        }
        //********* Validacion 131
        var casilla131 = _obtenerValorCasilla("131");
        var casilla101 = _obtenerValorCasilla("101");
        var casilla103 = _obtenerValorCasilla("103");
        var casilla125 = _obtenerValorCasilla("125");
        var casilla128 = _obtenerValorCasilla("128");
        var casilla161 = _obtenerValorCasilla("161");
        var casilla163 = _obtenerValorCasilla("163");
        var opcionAmazonia = _obtenerValorCasillaRadio("861");

        if (casilla101 != "" || casilla103 != "") {
            if (casilla131 == "") {
                messagesArray.push("131");
            }
        }
        if (opcionAmazonia == "2") {
            if (casilla161 != "" || casilla163 != "") {
                if (casilla131 == "") {
                    var pos = $.inArray("131", messagesArray);
                    if (pos == -1) {
                        messagesArray.push("131");
                    }
                }
            }
        }
        var casilla108 = _obtenerValorCasilla("108");
        var casilla111 = _obtenerValorCasilla("111");
        var casilla115 = _obtenerValorCasilla("115");
        var casilla117 = _obtenerValorCasilla("117");
        var casilla178 = _obtenerValorCasilla("178");
        if (casilla108 != "" || casilla111 != "" || casilla115 != "" || casilla117 != "") {
            if (casilla178 == "") {
                messagesArray.push("178");
            }
        }
        var casilla867 = _obtenerValorCasillaRadio("867");
        var casilla340 = _obtenerValorCasilla("340");
        if (casilla867 == "1") {
            if (casilla340 == "") {
                messagesArray.push("340");
            }
        }
        var casilla861 = _obtenerValorCasillaRadio("861");
        var casilla315 = _obtenerValorCasilla("315");
        if (casilla861 == "0" || casilla861 == "1" || casilla861 == "8" || casilla861 == "2" || casilla861 == "Z" || casilla861 == "4") {
            if (casilla315 == "") {
                messagesArray.push("315");
            }
        }
        return messagesArray;
    };
    /**
     * @function _obtenerNivelDeclaracion
     * Obtiene el nivel de declaracion del formulario que puede ser Completo o Simplificado
     * al local storage para obtener el id del proceso de autoguardado para finalizarlo.
     *
     */
    _obtenerNivelDeclaracion = function () {
        var declaracion = ""; // nivel completo por defecto, en caso contrario un valor: s-
        var className = $('#profile2').attr('class');
        if (className.indexOf("active") > 0) {
            declaracion = "s-";
        }
        return declaracion;
    };
    _esNivelSimplificado = function () {
        var result = false;
        if (_obtenerNivelDeclaracion() == "s-") {
            result = true;
        }
        return result;
    };

    _limpiarVariablesGlobales = function () {
        editandoFormulario = false;
        lista_trPeriodo = [];
        evitarMensajes = false;
        navegacionTab = false;
        PorcentajeRentaTributo = null;
//        listFechaVencimiento = "";
//        listFechaVencimientoReLlamado = "";
//        listSaldoAfavor;
        coeficienteRentaService = "";
        pagosPrevios = null;
        resumenCasillasLE = null;
        tieneResumenCasilla = false;
        indicadorTipoResumenCasilla;
        tasaInteresMoratorio = null;
        mostroUltimaDeclaracion = false;
        _limpiarControlesRenta();
        countTabRenta = 0;
        fechaVencimientoPeriodo = null;
        indicadorTipoMonedaService = null;
        datoperiodobean = new datosPeriodoBean();
        _ubigeo_ddpUbigeo = null;
    };
    _setearCasillaPagosPrevios = function (codTributo, valor) {
        var numcasilla;
        switch (codTributo) {
            case "010101":
                numcasilla = "185";
                break;
            case "010106":
                numcasilla = "342";
                break;
            case "030301":
                numcasilla = "317";
                break;
        }
        comunIntegrador.setValue(_obtenerCasilla(numcasilla), valor);
//        _setearValorCasilla(numcasilla, valor);
    };
    _obtenerValorCasilla = function (numeroCasilla) {
        return $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numeroCasilla + '"]').val();
    };
    _obtenerValorCasillaRadio = function (numeroCasilla) {
        var tagS = numeroCasilla;
        if (_esNivelSimplificado()) {
            tagS = "-s-" + numeroCasilla;
        }
        return $("input[name=casilla" + tagS + "]:checked").val();
    };
    _setearValorCasilla = function (numcasilla, valor) {
        $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numcasilla + '"]').val(valor);
    };
    _setearAtributoDisabled = function (disabled, numcasilla) {
        $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numcasilla + '"]').attr('disabled', disabled);
    };
    _setearAtributoReadOnly = function (disabled, numcasilla) {
        $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numcasilla + '"]').attr('readonly', disabled);
    };
    _setearAtributoRequired = function (numcasilla) {
        $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numcasilla + '"]').attr('required', true);
    };
    _quitarAtributo = function (numcasilla, atributo) {
        $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numcasilla + '"]').removeAttr(atributo);
    };
    _esDisabled = function (numcasilla) {
        return $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numcasilla + '"]').is(':disabled');
    };
    _casillaEsVisible = function (numcasilla) {
        return $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numcasilla + '"]').is(':visible');
    };
    _obtenerBooleanValueRadio = function (numcasilla, index) {
        return $('input:radio[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numcasilla + '"]:nth(' + index + ')').is(':checked');
    };
    _obtenerCasilla = function (numCasilla) {
        return $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numCasilla + '"]');
    };
    _setearAtributoDisabledSelectedRadioButtonRenta = function (regimen, deshabilitar, seleccionar) {
        //console.log("=========ENTRANDO_setearAtributoDisabledSelectedRadioButtonRenta===========");

        $('input[name="casilla' + _obtenerNivelDeclaracion() + '861" ]:radio').each(function () {

            if ($(this).attr('codtri') == regimen) {
                $(this).attr('disabled', deshabilitar);
                $(this).prop('checked', seleccionar);
                return false;
            }
        });
    };
    _setearBoleanValueRadio = function (numcasilla, index, selected) {
        $('input:radio[data-' + _obtenerNivelDeclaracion() + 'casilla="' + numcasilla + '"]:nth(' + index + ')').prop('checked', selected);
    };
    _validarButtonGroupRadios = function (casilla) {
        return $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casilla + '"]').is(':checked');
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
                }
            });
        }
    };
    /**
     * @function _obtenerPeriodo
     * Obtiene informacion del formulario para el periodo seleccionado por el contribuyente, en los valores de la parametria de eventos
     * se invoca a una funcion customizada para que realice ciertas operaciones de acuerdo a los eventos programados, para este caso se insertado
     * el evento change cuando el contribuyente interactua con la casilla 007 - Periodo
     *
     */
    _obtenerPeriodo = function () {
        var periodo = _obtenerValorCasilla("7");
        ////console.log("Obtener periodo... " + periodo);
        if (periodo != "") {
            periodo = comunLibreria.formatearPeriodoaCadena(periodo);

//            recuperar_preliminal = comunServiciosControlador.extraerAutoGuardado(m_idFormulario, periodo);
            var habilitar = (datoperiodobean != null) && (datoperiodobean.recuperar_preliminal != null) && (datoperiodobean.recuperar_preliminal.resultado != null);
            //console.log(".:::::::::::::::::::\n" + JSON.stringify(datoperiodobean));
//            document.getElementById("RecuperarPreliminar").disabled = !habilitar;
            if (habilitar) {
                var fec = datoperiodobean.recuperar_preliminal.resultado.fecModif; //fecha modificacion
                if (fec == null) {
                    fec = new Date();
                }
                fec = moment(fec).format("DD/MM/YYYY hh:mm a");
                $("#RecuperarPreliminar").attr("fec_reg", fec);
            }

            var parametrosUrl = periodo + "/" + m_idFormulario + "/" + m_versionFormulario;
            var isChange = comunIntegrador.obtenerActivacionCambioCasillas();

            if (isChange.indexOf("==") > 0) {
                isChange = isChange.substr(0, isChange.indexOf("=="));
            }
            if (isChange == "true") {
                var urlHidden = $("input[id^='urlModificarPeriodoTributario']");
                if (urlHidden != null) {
                    urlHidden.val(parametrosUrl);
                }
                $('#modalModificarPeriodoTributario').modal('show');
            } else {
                var nameMetodoEval = "comunIntegrador.activarGuardadoAutomatico('" + periodo + "','" + m_idFormulario + "','" + _obtenerNivelDeclaracion() + "')";
                var idTimeOutTask = setTimeout(nameMetodoEval, 60000); // auto salva cada minuto
                //console.log("INICIANDO EL AUTOGUARDADO");
                comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.Autoguardado.idTimeOutTask", idTimeOutTask);
            }
        }
    };
    setPanel = function (idDiv) {
        var parentName = "#" + idDiv;
        if (idDiv === "menu1" || idDiv === "menu2" || idDiv === "home") {

            $("#Paso-form_01").parents('li').removeClass("active");
            $("#Paso-form_02").parents('li').removeClass("active");
            $("#Paso-form_06").parents('li').removeClass("active");
            switch (idDiv) {
                case "home":
                    $("#Paso-form_01").parents('li').addClass("active");
                    break;
                case "menu1":
                    $("#Paso-form_02").parents('li').addClass("active");
                    break;
                default:
                    $("#Paso-form_06").parents('li').addClass("active");
            }

            $('#home').removeClass("active");
            $('#home').removeClass("in");
            $('#menu2').removeClass("active");
            $('#menu2').removeClass(" in");
            $('#menu1').removeClass("active");
            $('#menu1').removeClass(" in");
            $(parentName).addClass("active");
            $(parentName).addClass(" in");
        } else if (idDiv === "igv" || idDiv === "ivap" || idDiv === "renta") {

            $("#Paso-form_atras03").parents('li').removeClass("active");
            $("#Paso-form_04").parents('li').removeClass("active");
            $("#Paso-form_05").parents('li').removeClass("active");
            switch (idDiv) {
                case "igv":
                    $("#Paso-form_atras03").parents('li').addClass("active");
                    break;
                case "ivap":
                    $("#Paso-form_04").parents('li').addClass("active");
                    break;
                default:
                    $("#Paso-form_05").parents('li').addClass("active");
            }

            $('#igv').removeClass("active");
            $('#igv').removeClass("in");
            $('#ivap').removeClass("active");
            $('#ivap').removeClass(" in");
            $('#renta').removeClass("active");
            $('#renta').removeClass(" in");
            $(parentName).addClass("active");
            $(parentName).addClass(" in");
        } else if (idDiv === "ventas-00" || idDiv === "compras-00") {

            $("#Paso-form_atras02").parents('li').removeClass("active");
            $("#Paso-form_03").parents('li').removeClass("active");
            switch (idDiv) {
                case "ventas-00":
                    $("#Paso-form_atras02").parents('li').addClass("active");
                    break;
                default:
                    $("#Paso-form_03").parents('li').addClass("active");
            }

            $('#ventas-00').removeClass("active");
            $('#ventas-00').removeClass(" in");
            $('#compras-00').removeClass("active");
            $('#compras-00').removeClass(" in");
            $(parentName).addClass("active");
            $(parentName).addClass(" in");
        }
    };
    _iniciarData_SeleccionFecha = function (oldPeriodoSeleccionado, dataParametria) {
        if (indicadorLE != null && indicadorLE == true) {
            _limpiarVariablesGlobales();
            var periodo = _obtenerValorCasilla("7");
            var tipo_declaracion = _obtenerValorCasilla("895");

            if (_validarModificacionPeriodo(tipo_declaracion, comunLibreria.formatearPeriodoaCadena(periodo), comunLibreria.formatearPeriodoaCadena(oldPeriodoSeleccionado))
                && !$('#modalModificarPeriodoTributario').hasClass('in')) {

                $('#modalModificarPeriodoTributario').modal('show');

            } else if (_validarPeriodoSeleccionado(dataParametria, oldPeriodoSeleccionado)) {
                _limpiarVariablesGlobales();
                _formaDeclaracionLista(oldPeriodoSeleccionado);
            }
        } else {
            _mostrarMensajeGeneral(comunMensajes.getMensaje("MENSAJE_NO_TIENE_LIBRO_ELECTRONICO", ""));
        }

    };
    _formaDeclaracionLista = function (periodoSeleccionado) {
        //console.log("==_formaDeclaracionLista=====periodoSeleccionado=========>> " + periodoSeleccionado);
        var periodo = comunLibreria.formatearPeriodoaCadena(periodoSeleccionado);
        ////console.log(":::::::PERIODO::: " + periodo);
        cargarDatosPeriodo(periodo);

        var listFechasVencimiento = "";
        listFechasVencimiento = _obtenerFecVenByTributo();

        if (listFechasVencimiento != "" && listFechasVencimiento != null) {
            for (var i in listFechasVencimiento) {
                var val = listFechasVencimiento[i];
                fechaVencimientoPeriodo = comunLibreria.formatearLongtoStringYYYMMDD_GUION(val);

                if (fechaVencimientoPeriodo != "") {
                    break;
                }
            }
        }
        console.log("LA FECHA DE VENCIMIENTO ES ::: " + fechaVencimientoPeriodo);
        var tipo_declaracion = null;
        if (datoperiodobean != null && datoperiodobean.tipoDeclaracion != null
            && datoperiodobean.tipoDeclaracion.tipo != null) {
            tipo_declaracion = datoperiodobean.tipoDeclaracion.tipo;
        }
        //console.log("=== SE DETERMINO EL PERIODO == " + tipo_declaracion);
        if (tipo_declaracion == null) {
            tipo_declaracion = "original";
        }
        ////console.log("EL TIPO DE DECLARACION ES: " + tipo_declaracion);
        $('#li-Paso-form_01').removeClass('disabled');
        $('#li-Paso-form_02').removeClass('disabled');
        $('#li-Paso-form_06').removeClass('disabled');

        var dataFormaDeclaracion = _determinarFormaDeclaracion(tipo_declaracion, periodo, indicadorLE);
        //console.log("=== SE DETERMINO LOA FORMA DE DECLARACION== " + dataFormaDeclaracion["resultado"].dialogo);

        if (dataFormaDeclaracion != null && dataFormaDeclaracion["resultado"] != null) {
            var mensaje, dialogo, interface;
            dialogo = dataFormaDeclaracion["resultado"].dialogo;
            interface = dataFormaDeclaracion["resultado"].interface;
            mensaje = dataFormaDeclaracion["resultado"].mensaje;
            _mostrarFormaDeclaracion(dialogo, interface, mensaje, periodoSeleccionado, tipo_declaracion);
        }
    };
    _mostrarFormaDeclaracion = function (dialogo, interface, mensaje, periodoSeleccionado, tipo_declaracion) {

        if (mensaje != "" && dialogo == "1") {
            formulario0621.mostrarMensajeAceptarCancelar(
                comunMensajes.getMensaje(mensaje, ""),
                function (evt) {
//                        evt.stopPropagation();
                    $('#home-completa').trigger("click");
                    _complementosFormaDeclaracion(tipo_declaracion, periodoSeleccionado);
                    $('#modalMensajeAceptarCancelar').modal('hide');
                },
                function (evt) {
//                        evt.stopPropagation();
                    $('#home-simple').trigger("click");
                    _complementosFormaDeclaracion(tipo_declaracion, periodoSeleccionado);
                    $('#modalMensajeAceptarCancelar').modal('hide');
                }, "DJ Simplificada", "DJ Completa");

        } else if (mensaje != "" && dialogo == "0") {
            var msj;
            if (mensaje == "INF002") {
                msj = comunMensajes.getMensaje(mensaje, _obteneRegimenAfecto());
            } else {
                msj = comunMensajes.getMensaje(mensaje, "");
            }
            formulario0621.mostrarMensajeAceptar(
                msj,
                function (evt) {
//                        evt.stopPropagation();
                    switch (mensaje) {
                        case "INF002":
                        case "INF005":
                            $('#Reset-01').trigger("reset");
                            $('#Reset-02').trigger("reset");
                            $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="7"]').focus();
                            $('#modalMensajeGeneral').modal('hide');
                            break;
                        case "INF003":
                        case "INF004":
                            $('#home-simple').trigger("click");
                            _complementosFormaDeclaracion(tipo_declaracion, periodoSeleccionado);
                            $('#modalMensajeGeneral').modal('hide');
                            break;
                    }
                }
            );

        } else {
            _mostrarInterface(interface);
            _complementosFormaDeclaracion(tipo_declaracion, periodoSeleccionado);
        }
    };
    _complementosFormaDeclaracion = function (tipo_declaracion, periodo) {
        //console.log("=======_complementosFormaDeclaracion periodo =======: " + periodo);
        _setearValorCasilla("7", periodo);

        //console.log("=======_complementosFormaDeclaracion periodo 222=======: " + _obtenerValorCasilla("7"));

        if (tipo_declaracion.toUpperCase() === enumTipoDeclara.ORIGINAL.name.toUpperCase()) {
            declaracionDeterminada = enumTipoDeclara.ORIGINAL.name;
            _setearValorCasilla("895", enumTipoDeclara.ORIGINAL.name);
            _setearBoleanValueRadio("887", 0, true);
            _mostrarMensajeINF008_INF007(comunMensajes.getMensaje("INF007", ""));
            _cambiarTextoLabelSeccionRenta(comunMensajes.getMensaje("MENSAJE_AFECTACION_REGIMEN", ""));

        } else if (tipo_declaracion.toUpperCase() === enumTipoDeclara.SUSITUTORIA.name.toUpperCase()) {
            declaracionDeterminada = enumTipoDeclara.SUSITUTORIA.name;
            _setearValorCasilla("895", enumTipoDeclara.SUSITUTORIA.name);
            _mostrarMensajeINF008_INF007(comunMensajes.getMensaje("INF008", ""));
            _cambiarTextoLabelSeccionRenta(comunMensajes.getMensaje("MENSAJE_AFECTACION_REGIMEN_TRIBUTOS", ""));
        } else if (tipo_declaracion.toUpperCase() === enumTipoDeclara.RECTIFICATORIA.name.toUpperCase()) {
            declaracionDeterminada = enumTipoDeclara.RECTIFICATORIA.name;
            _setearValorCasilla("895", enumTipoDeclara.RECTIFICATORIA.name);
            _mostrarMensajeINF008_INF007(comunMensajes.getMensaje("INF008", ""));
            _cambiarTextoLabelSeccionRenta(comunMensajes.getMensaje("MENSAJE_AFECTACION_REGIMEN_TRIBUTOS", ""));

        }

        _obtenerAsignarInformaciongeneral(periodo);
        _validacionAfectacionRegimenRenta();
        _asignarCasillasInternas(tipo_declaracion);
        if (definicionCasilla != null) {
            $.each(definicionCasilla.casillas, function (index, item) {
                // console.log(":::casilla:: " + item.numCas);
                if (formulario0621.verificarCasillaTasaVariable(item.numCas) != null) {
                    console.log("::entrando a verificar casilla:::");
                    var controlUI = _obtenerCasilla(item.numCas);
                    controlUI.focusout(function () {
                        formulario0621.calcularTasaVariable(item.numCas, item.expresionCalculo.substr(item.expresionCalculo.indexOf("C") + 1, 3), item.expresionCalculo);
                    });
                }
            });
        }

    };
    _mostrarInterface = function (interface) {
        if (interface == "IU02") {
            $('#home-completa').trigger("click");
        } else if (interface == "IU03") {
            $('#home-simple').trigger("click");
        }
    };
    _determinarFormaDeclaracion = function (tipoDeclaracion, periodo, indicadorLE) {
        var parametros = tipoDeclaracion + "/" + periodo + "/" + indicadorLE;
        return comunServiciosControlador.determinarFormaDeclaracion(parametros);
    };
    _cargarAsistentePagosPrevios = function (casilla) {

        switch (casilla.toString()) {
            case "185":
                _recorrerPagosPrevios("010101");
                break;
            case "317":
                _recorrerPagosPrevios("030301");
                break;
            case "342":
                _recorrerPagosPrevios("010106");
                break;
        }
    };
    _recorrerPagosPrevios = function (codTributo) {

        var tablaDatos = $("#tbodyPagosPrevios");
        var numOrden;
        var jsonParseCrtPk;
        tablaDatos.children("tr").remove();

        var c = 0;
        var i;
        var jsonParsePagosPrevios = null;
        if (datoperiodobean != null && datoperiodobean.listPagosPrevios != null) {
            jsonParsePagosPrevios = datoperiodobean.listPagosPrevios;
        }
        if (jsonParsePagosPrevios != null) {
            for (var item in jsonParsePagosPrevios) {
                if (item == codTributo) {
                    //console.log("**********************PAGOS PREVIOS********************");
                    //console.log(item);
                    //console.log(jsonParsePagosPrevios);
                    //console.log(jsonParsePagosPrevios[item]);
                    //console.log("*****************************************************");

                    var prueba = jsonParsePagosPrevios[item];
                    if (prueba != null) {
                        for (i = 0; i < prueba.length; i++) {
                            jsonParseCrtPk = prueba[i].crtPK;
                            c = c + 1;
                            numOrden = c + "";
                            var fecha = moment(prueba[i].crtFecpag).format('DD/MM/YYYY');
                            var checked = "";
                            if (prueba[i].indSel == true) {
                                checked = "checked";
                            }

                            var monto = parseFloat(prueba[i].crtImptri) + parseFloat(prueba[i].crtImpint);

                            tablaDatos.append(("<tr><td>" + prueba[i].crtFormul + "</td><td>"
                            + numOrden + "</td><td>" + jsonParseCrtPk.crtCodtri + "</td><td>" +
                            fecha
                            + "</td><td>" + moment(prueba[i].crtFecpag).format('LTS') + "</td><td><input type='text' style='text-align: right;  max-width: 90px;' class='mascaraNumero form-control input-sm' onkeyup='this.value = formulario0621.validarMayor(this.value," + monto + ")' value='" + monto + "'>" + "</td><td>" +
                            "<input crtnumrec='" + prueba[i].crtNumrec + "' type='checkbox' " + checked + " ></td><td style='display:none'>" + codTributo + "</td> </tr>"));
                        }
                    }

                }
            }
        }
        $('.mascaraNumero').inputmask({
            "alias": "integer",
            "groupSeparator": ",",
            "autoGroup": true,
            "autoUnmask": true,
            "noshift": true
        });
    };
    _codigoRegimenSeleccionado = function () {
//        var codigoRegimen = "";
        return $('input:radio[data-' + _obtenerNivelDeclaracion() + 'casilla="861"]:checked').attr('codtri');
//        if ($(elemen).is(':checked')) {
//            codigoRegimen = $(elemen).attr('codtri');
//        }
//        return codigoRegimen;
    };
    _cargarAsistenteRetenciones = function (dataRetenciones) {
//        var jsonRetenciones = JSON.parse(JSON.stringify(dataRetenciones["resultado"].retencionesPeriodo));
        if (dataRetenciones != null) {
            $("#casilla-686").val(Number(dataRetenciones).toFixed(0));
        }
    };
    _cargarAsistentePersepciones = function (dataPersepciones) {
        if (dataPersepciones != null) {
            $("#casilla684").val(Number(dataPersepciones).toFixed(0));
        }

    };
    _asignarCasillasInternas = function (tipoDeclarcion) {

        if (tipoDeclarcion.toUpperCase() === enumTipoDeclara.ORIGINAL.name.toUpperCase()) {
            casillasInternasBean.casilla_inter_895 = 0;
            casillasInternasBean.casilla_inter_005 = 0;
        } else if (tipoDeclarcion.toUpperCase() === enumTipoDeclara.SUSITUTORIA.name.toUpperCase()) {
            casillasInternasBean.casilla_inter_895 = 1;
            casillasInternasBean.casilla_inter_005 = 1;
        } else if (tipoDeclarcion.toUpperCase() === enumTipoDeclara.RECTIFICATORIA.name.toUpperCase()) {
            casillasInternasBean.casilla_inter_895 = 2;
            casillasInternasBean.casilla_inter_005 = 1;
        }
    };
    _obtenerAsignarInformaciongeneral = function (periodo) {

        var dataResumenCasilla = _obtenerResumenCasillasLE(comunLibreria.formatearPeriodoaCadena(periodo));

        if (dataResumenCasilla != null && dataResumenCasilla.resultado != null) {
            tieneResumenCasilla = true;
            indicadorTipoResumenCasilla = dataResumenCasilla.resultado.indLibro;
            pintarResumenCasillas(dataResumenCasilla);
        }

        var percepciones = datoperiodobean.percepcionesPeriodo;
        if (percepciones != null && percepciones != "") {
            //console.log("=== CARGANDO PERCEPCIONES ====");
            comunIntegrador.setValue(_obtenerCasilla("171"), percepciones);
            formulario0621.cargarAsistentePersepciones(percepciones);
        }

        var retenciones = datoperiodobean.retencionesPeriodo;
        if (retenciones != null && retenciones != "") {
            //console.log("=== CARGANDO RETENCIONES ====");
            comunIntegrador.setValue(_obtenerCasilla("179"), retenciones);
            formulario0621.cargarAsistenteRetenciones(retenciones);
        }

        _function_Moneda();

        var valorFOB = datoperiodobean.exportacionesEmbarcadas;
        if (valorFOB != null && valorFOB != null) {
            //console.log("=== CARGANDO VALORFOB ====");
            comunIntegrador.setValue(_obtenerCasilla("127"), valorFOB);
        }

//        var saldoFavor = formulario0621.obtenerSaldoFavor(comunLibreria.formatearPeriodoaCadena(periodo));
        var saldoFavor = datoperiodobean.saldoAFavorTributo;
        //si es prico muestra los pagos previos
        if (_obtenerTamanioContribuyente() == 1) {
            //console.log("=== CARGANDO SALDO A FAVOR ====");
//            if (saldoFavor != null && saldoFavor["resultado"] != null) {
            if (saldoFavor != null) {

//                var result = JSON.parse(JSON.stringify(saldoFavor["resultado"]));
                for (var item in saldoFavor) {
                    switch (item.toString()) {
                        case "010101":
                            comunIntegrador.setValue(_obtenerCasilla("145"), saldoFavor[item]);
                            break;
                        case "010106":
                            comunIntegrador.setValue(_obtenerCasilla("351"), saldoFavor[item]);
                            break;
                        case "030301":
                            comunIntegrador.setValue(_obtenerCasilla("303"), saldoFavor[item]);
                            break;
                    }
                }
            }
        }
    };
    function pintarResumenCasillas(dataResumenCasilla) {
        if (tieneResumenCasilla == true && _obtenerValorCasilla("895") == enumTipoDeclara.ORIGINAL.name && dataResumenCasilla != null) {
            comunIntegrador.setValue(_obtenerCasilla("100"), dataResumenCasilla.resultado.mtoCas100);
            comunIntegrador.setValue(_obtenerCasilla("101"), dataResumenCasilla.resultado.mtoCas101);
            comunIntegrador.setValue(_obtenerCasilla("102"), dataResumenCasilla.resultado.mtoCas102);
            comunIntegrador.setValue(_obtenerCasilla("103"), dataResumenCasilla.resultado.mtoCas103);
            comunIntegrador.setValue(_obtenerCasilla("105"), dataResumenCasilla.resultado.mtoCas105);
            comunIntegrador.setValue(_obtenerCasilla("106"), dataResumenCasilla.resultado.mtoCas106);
            comunIntegrador.setValue(_obtenerCasilla("107"), dataResumenCasilla.resultado.mtoCas107);
            comunIntegrador.setValue(_obtenerCasilla("108"), dataResumenCasilla.resultado.mtoCas108);
            comunIntegrador.setValue(_obtenerCasilla("109"), dataResumenCasilla.resultado.mtoCas109);
            comunIntegrador.setValue(_obtenerCasilla("113"), dataResumenCasilla.resultado.mtoCas113);
            comunIntegrador.setValue(_obtenerCasilla("114"), dataResumenCasilla.resultado.mtoCas114);
            comunIntegrador.setValue(_obtenerCasilla("115"), dataResumenCasilla.resultado.mtoCas115);
            comunIntegrador.setValue(_obtenerCasilla("116"), dataResumenCasilla.resultado.mtoCas116);
            comunIntegrador.setValue(_obtenerCasilla("117"), dataResumenCasilla.resultado.mtoCas117);
            comunIntegrador.setValue(_obtenerCasilla("119"), dataResumenCasilla.resultado.mtoCas119);
            comunIntegrador.setValue(_obtenerCasilla("120"), dataResumenCasilla.resultado.mtoCas120);
            comunIntegrador.setValue(_obtenerCasilla("122"), dataResumenCasilla.resultado.mtoCas122);
            comunIntegrador.setValue(_obtenerCasilla("340"), dataResumenCasilla.resultado.mtoCas340);
            comunIntegrador.setValue(_obtenerCasilla("341"), dataResumenCasilla.resultado.mtoCas341);

            comunIntegrador.operarCasillaYAsociados(100, _obtenerNivelDeclaracion(), 3);
            if (_obtenerNivelDeclaracion() != 's-') {
                comunIntegrador.operarCasillaYAsociados(102, _obtenerNivelDeclaracion(), 3);
            }
            comunIntegrador.operarCasillaYAsociados(107, _obtenerNivelDeclaracion(), 3);
            if (_obtenerNivelDeclaracion() != 's-') {
                comunIntegrador.operarCasillaYAsociados(114, _obtenerNivelDeclaracion(), 3);
                comunIntegrador.operarCasillaYAsociados(116, _obtenerNivelDeclaracion(), 3);
                comunIntegrador.operarCasillaYAsociados(340, _obtenerNivelDeclaracion(), 3);
            }
            comunIntegrador.operarCasillaYAsociados(301, _obtenerNivelDeclaracion(), 3);
        }
    }
    ;
    _function_Moneda = function () {
        var indicador = _obtenerIndicadorTipoMoneda();
        //console.log(">>>>> TRAENDO LOCALSTORE TIPO MONEDA " + indicador.resultado);
        if (indicador != null && indicador.resultado != null) {
            if (indicador.resultado == "1") {
                _setearAtributoDisabled(false, "886");//Moneda
                _setearValorCasilla("886", "Soles");

            } else if (indicador.resultado == "2") {
                _setearValorCasilla("886", "Soles");
                _setearAtributoDisabled(true, "886");//Moneda
                _setearAtributoDisabled(false, "189");//casilla 189
                _setearAtributoDisabled(false, "307");//casilla 307
                _setearAtributoDisabled(false, "345");//casilla 345

                comunIntegrador.setValue(_obtenerCasilla(189), "0");
                comunIntegrador.setValue(_obtenerCasilla(307), "0");
                comunIntegrador.setValue(_obtenerCasilla(345), "0");
            }
        }
    };
    _validacionAfectacionRegimenRenta = function () {
        var periodo = _obtenerValorCasilla("7");
        var dataResumenCasilla = _obtenerResumenCasillasLE(comunLibreria.formatearPeriodoaCadena(periodo));

        if (_obtenerValorCasilla("895") == enumTipoDeclara.ORIGINAL.name) {

            if (tieneResumenCasilla) {
                if (dataResumenCasilla != null && dataResumenCasilla.resultado != null) {
                    if (dataResumenCasilla.resultado.mtoCas340 != null && !_verificarTributoAfecto('010106')) {
                        _mostrarMensajeGeneral(comunMensajes.getMensaje('INF006', ''));
                        _setearBoleanValueRadio('867', 0, true);
                    }
                }
            }

            _seleccionarRegimenAfecto();
            _setearBoleanValueRadio('887', 0, true);
            if (_verificarTributoAfecto('010106')) {//ivap
                _setearBoleanValueRadio('867', 0, true);
            }

        }

        if (_obtenerTamanioContribuyente() == "3" && _obtenerValorCasilla("895") == enumTipoDeclara.ORIGINAL.name) {
            _setearAtributoDisabled(false, "895");
        } else {
            _setearAtributoDisabled(true, "895");
        }

        _validacionesFinales(tieneResumenCasilla, dataResumenCasilla);
    };
    _validacionesFinales = function (tieneResumenCasilla, dataResumenCasilla) {
        //console.log("======NGRESANDO A VALIDACIONES FINALES =============");
        //console.log("=====> " + _obtenerValorCasilla("895"));
        if (_obtenerValorCasilla("895") == enumTipoDeclara.ORIGINAL.name) {
            //console.log("quitando atributo");
            $("#RecuperarPreliminar").removeAttr("disabled");
        }

//        //console.log("=======dataResumenCasilla _validacionesFinales========> " + JSON.stringify(dataResumenCasilla));
        if (tieneResumenCasilla && (dataResumenCasilla != null
            && dataResumenCasilla.resultado != null
            && (dataResumenCasilla.resultado.mtoCas116 != null
            || dataResumenCasilla.resultado.mtoCas119 != null))) {
            _setearBoleanValueRadio("866", 0, true);
            $('#casilla866-SI').trigger('change');
        } else {

            _setearBoleanValueRadio("866", 1, true);
            formulario0621.setearAtributoReadOnly(true, "173");
            formulario0621.quitarAtributo("105", "required");
            formulario0621.quitarAtributo("109", "required");
            formulario0621.quitarAtributo("110", "required");
            formulario0621.quitarAtributo("116", "required");
            formulario0621.quitarAtributo("119", "required");


            $('#date-001').addClass("Ocultar-datos");
            $('#date-002').addClass("Ocultar-datos");
            $('#date-003').addClass("Ocultar-datos");


            comunIntegrador.setValue(formulario0621.obtenerCasilla(110), "");
            comunIntegrador.setValue(formulario0621.obtenerCasilla(111), "");
            comunIntegrador.setValue(formulario0621.obtenerCasilla(116), "");
            comunIntegrador.setValue(formulario0621.obtenerCasilla(117), "");
            comunIntegrador.setValue(formulario0621.obtenerCasilla(119), "");
            comunIntegrador.setValue(formulario0621.obtenerCasilla(173), "");


//            $('#casilla866-NO').trigger('change');
//            _setearAtributoReadOnly(true, "110");
//            _setearAtributoReadOnly(true, "111");
//            _setearAtributoReadOnly(true, "116");
//            _setearAtributoReadOnly(true, "117");
//            _setearAtributoReadOnly(true, "119");
//            _setearAtributoReadOnly(true, "173");
        }
        if (indicadorTipoResumenCasilla == "2") {
            casillasInternasBean.casilla_inter_889 = 2;
        } else {
            casillasInternasBean.casilla_inter_889 = 1;
        }
    };
    _seleccionarRegimenAfecto = function () {
        if (_verificarTributoAfecto("031201")) {
            _setearAtributoDisabledSelectedRadioButtonRenta("031201", false, true);
            _validacionMype();
        } else if (_verificarTributoAfecto("033101")) {
            _setearAtributoDisabledSelectedRadioButtonRenta("033101", false, true);
        } else if (_verificarTributoAfecto("034101")) {
            _setearAtributoDisabledSelectedRadioButtonRenta("034101", false, true);
        } else if (_verificarTributoAfecto("031101")) {
            _setearAtributoDisabledSelectedRadioButtonRenta("031101", false, true);
        } else if (_verificarTributoAfecto("030301")) {
            _setearAtributoDisabledSelectedRadioButtonRenta("030301", false, true);
        }
    };

    _verificarRadioButtonRentaSeleccionado = function (regimen) {
        var estaSeleccionado = false;
        $("input[name='casilla861' ]:radio").each(function () {
            if ($(this).attr('codtri') == regimen) {
                estaSeleccionado = true;
                return false;
            }
        });
        return estaSeleccionado;
    };
    _obteneRegimenAfecto = function () {
        var regimenAfecto = "";
        if (_verificarTributoAfecto("033101") == true) {
            regimenAfecto = "033101";
        } else if (_verificarTributoAfecto("034101") == true) {
            regimenAfecto = "034101";
        } else if (_verificarTributoAfecto("031101") == true) {
            regimenAfecto = "031101";
        } else if (_verificarTributoAfecto("030301") == true) {
            regimenAfecto = "030301";
        }
        return regimenAfecto;
    };
    _cambiarTextoLabelSeccionRenta = function (texto) {
        if (_esNivelSimplificado() == true) {
            $("#idTituloRegimenRentaSimple").text(texto);
        } else {
            $("#idTituloRegimenRentaCompleta").text(texto);
        }
    };
    _mostrarMensajeINF008_INF007 = function (texto) {
        if (_esNivelSimplificado()) {
            $("#lblMensajeINF008_INF007_simplificada").text(texto);
            $("#divMensajeINF008_INF007_simplificada").show();
        } else {
            $("#lblMensajeINF008_INF007_completa").text(texto);
            $("#divMensajeINF008_INF007_completa").show();
        }
    };
    _verificarTributoAfecto = function (codTributo) {
//        //console.log("=====ENTRANDO _verificarTributoAfecto ==== ");

        var listributosafectos = _obtenerListTributosAfectos();
//        //console.log("=====listributosafectos ==== " + listributosafectos);
//        //console.log("=====codTributo ==== " + codTributo);

        var existe = false;

        if (listributosafectos != null) {
            for (var item in listributosafectos) {
                if (codTributo == listributosafectos[item]) {
                    existe = true;
                    break;
                }
            }
        }
//        //console.log("=====existe ==== " + existe);
//        //console.log("====================");

        return existe;
    };
    _obtenerFecVenByTributo = function () {

        var listFechas = [];
//        ////console.log(":::::datosPeriodoBean::::  " + datosPeriodoBean);

        ////console.log(":::::fecVenTributos::::  " + datoperiodobean.fecVenTributos);
        if (datoperiodobean.fecVenTributos != null) {
            listFechas = datoperiodobean.fecVenTributos;
        }

        return listFechas;
    };
    _obtenerTamanioContribuyente = function () {
        var codDepend = usuarioBean.codDepend;
        return codDepend.substring(codDepend.length - 1);
    };

    _funcionalidad886 = function () {
        //console.log("**********DOLARES**************");

        var seleccionRegimen = formulario0621.validarButtonGroupRadios(861);
        var seleccionIgv = formulario0621.validarButtonGroupRadios(887);
        var seleccionIvap = formulario0621.validarButtonGroupRadios(867);
        if (formulario0621.obtenerValorCasilla("886").toString().toLowerCase() == "Dolares".toLowerCase()) {
            if (seleccionIgv) {
                formulario0621.setearAtributoReadOnly(true, "189");
                comunIntegrador.setValue(formulario0621.obtenerCasilla(189), "0");
            }
            if (seleccionIvap) {
                formulario0621.setearAtributoReadOnly(true, "345");
                comunIntegrador.setValue(formulario0621.obtenerCasilla(345), "0");
            }
            if (seleccionRegimen) {
                formulario0621.setearAtributoReadOnly(true, "307");
                comunIntegrador.setValue(formulario0621.obtenerCasilla(307), "0");
            }

        } else {

            if (seleccionIgv) {
                formulario0621.setearAtributoReadOnly(false, "189");
                comunIntegrador.setValue(formulario0621.obtenerCasilla(189), formulario0621.obtenerValorCasilla(188));
            }
            if (seleccionIvap) {
                formulario0621.setearAtributoReadOnly(false, "345");
                comunIntegrador.setValue(formulario0621.obtenerCasilla(345), formulario0621.obtenerValorCasilla(344));
            }
            if (seleccionRegimen) {
                formulario0621.setearAtributoReadOnly(false, "307");
                comunIntegrador.setValue(formulario0621.obtenerCasilla(307), formulario0621.obtenerValorCasilla(324));
            }
        }
        comunIntegrador.calcularTotalPagar(false);
    };
//    _obtenerExportacionesEmbarcadas = function (periodo) {
//        return comunServiciosControlador.obtenerExportacionesEmbarcadas(periodo);
//    };
//    _obtenerSaldoFavor = function (periodo) {
//        return comunServiciosControlador.obtenerSaldoFavor(periodo);
//    };

    /*ESTE PAGOS PREVIOS YA NO SE DEBRIA USAR, LA DATA EXISTE EN datoperiodobean*/
    _obtenerPagosPrevios = function (per_tri, codFormulario) {
        if (pagosPrevios == null) {
            var parametros = per_tri + "/" + codFormulario;
            pagosPrevios = comunServiciosControlador.obtenerPagosPrevios621(parametros);
        }
        return pagosPrevios;
    };

    _cargarPagosPreviosEnCasillas = function () {
        /*solo ejecuta la primera vez*/
//        if (pagosPrevios == null) {
        var tot_185 = 0;
        var tot_317 = 0;
        var tot_342 = 0;

        if (datoperiodobean != null && datoperiodobean.listPagosPrevios != null) {
//                var jsonParsePagosPrevios = pagosPrevios["resultado"];
            var jsonParsePagosPrevios = datoperiodobean.listPagosPrevios;
//                if (jsonParsePagosPrevios != null) {

            for (var item in jsonParsePagosPrevios) {
                var tot_aux = 0;
                if (jsonParsePagosPrevios[item] != null) {
                    $.each(jsonParsePagosPrevios[item], function (k, v) {
                        v["indSel"] = true;
                        tot_aux = Number(tot_aux) + Number(v.crtImptri) + Number(v.crtImpint);
                    });
                    switch (item) {
                        case "010101"/*"185"*/
                        :
                            tot_185 = Number(tot_185) + Number(tot_aux);
                            break;
                        case "030301"/*"317"*/
                        :
                            tot_317 = Number(tot_317) + Number(tot_aux);
                            break;
                        case "010106"/*"342"*/
                        :
                            tot_342 = Number(tot_342) + Number(tot_aux);
                            break;
                    }
                }
            }
//                    pagosPrevios["resultado"] = jsonParsePagosPrevios;
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal0621.PagosPrevios", JSON.stringify(jsonParsePagosPrevios));
//                }
        }

        comunIntegrador.setValue(_obtenerCasilla("185"), tot_185);
        comunIntegrador.setValue(_obtenerCasilla("342"), tot_342);
        comunIntegrador.setValue(_obtenerCasilla("317"), tot_317);

//        }
    };
    _actualizarPagosPrevios = function (codTributo, listCrtNumRec) {
        if (pagosPrevios != null) {
            $.each(pagosPrevios["resultado"], function (k, v) {
                if (k == codTributo) {
                    $.each(v, function (clave, valor) {
                        var ele = listCrtNumRec[valor.crtNumrec];
                        valor.indSel = ele.seleccion;
                        valor.crtImptri = ele.valor;
                        valor.crtImpint = 0;
                    });

                }
            });
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal0621.PagosPrevios", JSON.stringify(pagosPrevios["resultado"]));
        }
    };
    _obtenerCoeficienteRenta = function (periodo, codTributo) {
        var parametros = periodo + "/" + codTributo;
        if (coeficienteRentaService == "" || coeficienteRentaService == null) {
            coeficienteRentaService = comunServiciosControlador.obtenerCoeficienteRenta(parametros);
        }
        return coeficienteRentaService;
    };
    _obtenerCoeficienteIGV = function (periodo) {
        return comunServiciosControlador.obtenerCoeficienteIGV(periodo);
    };
    _obtenerPercepcionesMes = function (periodo) {
        return comunServiciosControlador.obtenerPercepcionesMes(periodo);
    };
    _obtenerRetencionesMes = function (periodo) {
        return comunServiciosControlador.obtenerRetencionesMes(periodo);
    };

    cargarDatosPeriodo = function (periodo) {

        var parametros = m_idFormulario + "/" + periodo;
        //console.log('>>>>>>> m_idFormulario: ' + m_idFormulario);
        //console.log('>>>>>>> periodo: ' + periodo);

        var datosPeriodo = comunServiciosControlador.ObtenerDatosPeriodo(parametros);
        var coeficienteIgv = _obtenerCoeficienteIGV(periodo);
        var listPagosPrevios = _obtenerPagosPrevios(periodo, m_idFormulario);
        if (datosPeriodo != null && datosPeriodo.resultado != null) {
            //console.log("====ENTRO A cargarDatosPeriodo ======> ");
//            datoperiodobean.percepcionesPeriodo = datosPeriodo.resultado.percepcionesPeriodo;
//            datoperiodobean.tipoDeclaracion = datosPeriodo.resultado.tipoDeclaracion;
//            datoperiodobean.exportacionesEmbarcadas = datosPeriodo.resultado.exportacionesEmbarcadas;
//            datoperiodobean.listPagosPrevios = datosPeriodo.resultado.listPagosPrevios;
//            datoperiodobean.retencionesPeriodo = datosPeriodo.resultado.retencionesPeriodo;
//            datoperiodobean.casillasDeclaracionAnterior = datosPeriodo.resultado.casillasDeclaracionAnterior;
//            datoperiodobean.ListAfectoTributo = datosPeriodo.resultado.ListAfectoTributo;
//            datoperiodobean.saldoAFavorTributo = datosPeriodo.resultado.saldoAFavorTributo;
//            datoperiodobean.cantidadDeclaracionesJuradas = datosPeriodo.resultado.cantidadDeclaracionesJuradas;
//            datoperiodobean.afectacionesTributos = datosPeriodo.resultado.afectacionesTributos;
//            datoperiodobean.tasasTributos = datosPeriodo.resultado.tasasTributos;
//            datoperiodobean.listTributosAsociados = datosPeriodo.resultado.listTributosAsociados;
//            datoperiodobean.fecVenTributos = datosPeriodo.resultado.fecVenTributos;
            ////console.log("::::::::datosPeriodoBean  cargarDatosPeriodo:: " + JSON.stringify(datoperiodobean));
            datoperiodobean.ubigeoContribuyente = datosPeriodo.resultado.ubigeoContribuyente;
            datoperiodobean.percepcionesPeriodo = datosPeriodo.resultado.percepcionesPeriodo;
            datoperiodobean.tipoDeclaracion = datosPeriodo.resultado.tipoDeclaracion;
            datoperiodobean.exportacionesEmbarcadas = datosPeriodo.resultado.exportacionesEmbarcadas;
            if (listPagosPrevios != null && listPagosPrevios.resultado != null) {
                datoperiodobean.listPagosPrevios = listPagosPrevios.resultado;
            }
            datoperiodobean.datosPadronIGVJusto = datosPeriodo.resultado.datosPadronIGVJusto;
            datoperiodobean.tamanioContribuyente = datosPeriodo.resultado.tamanioContribuyente;
            datoperiodobean.retencionesPeriodo = datosPeriodo.resultado.retencionesPeriodo;
            datoperiodobean.casillasDeclaracionAnterior = datosPeriodo.resultado.casillasDeclaracionAnterior;
            datoperiodobean.ListAfectoTributo = datosPeriodo.resultado.ListAfectoTributo;
            datoperiodobean.saldoAFavorTributo = datosPeriodo.resultado.saldoAFavorTributo;
            datoperiodobean.actualUIT = datosPeriodo.resultado.actualUIT;
            datoperiodobean.declaracionAnterior = datosPeriodo.resultado.declaracionAnterior;
            datoperiodobean.cantidadDeclaracionesJuradas = datosPeriodo.resultado.cantidadDeclaracionesJuradas;
            datoperiodobean.afectacionesTributos = datosPeriodo.resultado.afectacionesTributos;
            //console.log('>>>>>>>>>datosPeriodo.resultado.afectacionesTributos: ' + datosPeriodo.resultado.afectacionesTributos);
            datoperiodobean.vecFisCon = datosPeriodo.resultado.vecFisCon;
            datoperiodobean.tasasTributos = datosPeriodo.resultado.tasasTributos;
            datoperiodobean.ingresosNetosEjercicioActual = datosPeriodo.resultado.ingresosNetosEjercicioActual;
            datoperiodobean.listTributosAsociados = datosPeriodo.resultado.listTributosAsociados;
            datoperiodobean.fecVenTributos = datosPeriodo.resultado.fecVenTributos;
            datoperiodobean.actualUIT = datosPeriodo.resultado.actualUIT;
            datoperiodobean.datosPadronIGVJusto = datosPeriodo.resultado.datosPadronIGVJusto;
            datoperiodobean.ubigeoContribuyente = datosPeriodo.resultado.ubigeoContribuyente;
            datoperiodobean.ingresosNetosEjercicioActual = datosPeriodo.resultado.ingresosNetosEjercicioActual;
            ////console.log("::::::::datosPeriodoBean  cargarDatosPeriodo:: " + JSON.stringify(datoperiodobean));
//            datoperiodobean.coeficienteIgv = datosPeriodo.resultado.coeficienteIgv;
//            datoperiodobean.recuperar_preliminal = datosPeriodo.resultado.recuperar_preliminal;


        }
        var recuperar_preliminal = comunServiciosControlador.extraerAutoGuardado(m_idFormulario, periodo);
        if (recuperar_preliminal != null) {
            datoperiodobean.recuperar_preliminal = recuperar_preliminal;
        }
        if (coeficienteIgv != null && coeficienteIgv.resultado != null) {
            datoperiodobean.coeficienteIgv = coeficienteIgv;
        }

        if (datoperiodobean != null && datoperiodobean.ingresosNetosEjercicioActual != null
            && datoperiodobean.ingresosNetosEjercicioActual.listaIngresos != null) {
            var sumatoriaIngresosNetosEjercicioAtual = 0;
            var listaIngresos = datoperiodobean.ingresosNetosEjercicioActual.listaIngresos;
            $.each(listaIngresos, function (k, v) {
                sumatoriaIngresosNetosEjercicioAtual = sumatoriaIngresosNetosEjercicioAtual + parseFloat(v.ingresoDeclarado);
            });
            datoperiodobean.IngresosAcumuladosEjercicioActual = sumatoriaIngresosNetosEjercicioAtual;
        }
        formulario0621.setTasaInteresMoratorio(comunServiciosControlador.obtenerTasaInteres());
    };
    _obtenerUitmultiplicada = function (cantidad) {
        var uitMultiplicada = 0;

        if (datoperiodobean.actualUIT != null) {
//            //console.log("=======VALOR DE LA UIT ES :: " + datoperiodobean.actualUIT);

            uitMultiplicada = cantidad * parseFloat(datoperiodobean.actualUIT);
        }
//        //console.log("=======VALOR DE LA UIT MULTIPLICADA :: " + uitMultiplicada);

        return uitMultiplicada;
    };
    _obtenerSumatoriaIngresosNetosEjercicioActual = function () {
        if (datoperiodobean.IngresosAcumuladosEjercicioActual != null) {
            return datoperiodobean.IngresosAcumuladosEjercicioActual;
        }
        return 0;
    };

    _ingresosAcumuladosEsMenorOigualA300uit = function () {
        var valorCasilla301 = 0;

        if (_obtenerValorCasilla('301') != null && _obtenerValorCasilla('301') != '') {
            valorCasilla301 = parseFloat(_obtenerValorCasilla('301'));
        }
        var valorUitMultiplicada = _obtenerUitmultiplicada(300.00);
        var ingresosAcumulados = _obtenerSumatoriaIngresosNetosEjercicioActual();
        if (valorUitMultiplicada != null && ingresosAcumulados != null) {
            var sumIngresoAcumuladosMas301 = parseFloat(ingresosAcumulados) + parseFloat(valorCasilla301);
            if (sumIngresoAcumuladosMas301 <= valorUitMultiplicada) {
                return true;
            }
        }
        return false;
    };
    _ingresosAcumuladosEsMenorOigualA1700uit = function () {
        var valorCasilla301 = 0;
        if (_obtenerValorCasilla('301') != null && _obtenerValorCasilla('301') != '') {
            valorCasilla301 = parseFloat(_obtenerValorCasilla('301'));
        }
        var valorUitMultiplicada = _obtenerUitmultiplicada(1700.00);
        var ingresosAcumulados = _obtenerSumatoriaIngresosNetosEjercicioActual();
        if (valorUitMultiplicada != null && ingresosAcumulados != null) {
            var sumIngresoAcumuladosMas301 = parseFloat(ingresosAcumulados) + parseFloat(valorCasilla301);
            if (sumIngresoAcumuladosMas301 <= valorUitMultiplicada) {
                return true;
            }
        }
        return false;
    };
    _ingresosAcumuladosEsMayorA1700uit = function () {

        var valorCasilla301 = 0;

        if (_obtenerValorCasilla('301') != null && _obtenerValorCasilla('301') != '') {
            valorCasilla301 = parseFloat(_obtenerValorCasilla('301'));
        }

        var valorUitMultiplicada = _obtenerUitmultiplicada(1700.00);
        var ingresosAcumulados = _obtenerSumatoriaIngresosNetosEjercicioActual();
        //console.log("=== LOS INGRESOS ACUMULADOS ES === " + ingresosAcumulados);
        if (valorUitMultiplicada != null && ingresosAcumulados != null) {
            var sumIngresoAcumuladosMas301 = parseFloat(ingresosAcumulados) + parseFloat(valorCasilla301);
            if (sumIngresoAcumuladosMas301 > valorUitMultiplicada) {
                return true;
            }
        }

        return false;
    };
    _ingresosAcumuladosEsMayorA300uit = function () {
        var valorCasilla301 = 0;
        if (_obtenerValorCasilla('301') != null && _obtenerValorCasilla('301') != '') {
            valorCasilla301 = parseFloat(_obtenerValorCasilla('301'));
        }
        var valorUitMultiplicada = _obtenerUitmultiplicada(300.00);
        var ingresosAcumulados = _obtenerSumatoriaIngresosNetosEjercicioActual();
        //console.log("=== LOS INGRESOS ACUMULADOS ES === " + ingresosAcumulados);
        if (valorUitMultiplicada != null && ingresosAcumulados != null) {
            var sumIngresoAcumuladosMas301 = parseFloat(ingresosAcumulados) + parseFloat(valorCasilla301);
            if (sumIngresoAcumuladosMas301 > valorUitMultiplicada) {
                return true;
            }
        }
        return false;
    };
    _ingresosAcumuladosEsMayorA300uitYmenorIguala1700uit = function () {
        var valorCasilla301 = 0;
        if (_obtenerValorCasilla('301') != null && _obtenerValorCasilla('301') != '') {
            valorCasilla301 = parseFloat(_obtenerValorCasilla('301'));
        }
        var ingresosAcumulados = _obtenerSumatoriaIngresosNetosEjercicioActual();
        //console.log("=== LOS INGRESOS ACUMULADOS ES === " + ingresosAcumulados);
        var valor300uit = _obtenerUitmultiplicada(300.00);
        var valor1700uit = _obtenerUitmultiplicada(1700.00);

        if (valor300uit != null && valor1700uit != null && ingresosAcumulados != null) {
            var sumIngresoAcumuladosMas301 = parseFloat(ingresosAcumulados) + parseFloat(valorCasilla301);
            if (sumIngresoAcumuladosMas301 > valor300uit && (sumIngresoAcumuladosMas301 <= valor1700uit)) {//MAYOR A 300 UIT O MENOR IGUAL A 1700 UIT
                return true;
            }
        }
        return false;
    };
    _primerPeriodoSuperadoMYPE = function () {

        if (datoperiodobean != null && datoperiodobean.ingresosNetosEjercicioActual != null
            && datoperiodobean.ingresosNetosEjercicioActual.listaIngresos != null
            && datoperiodobean.actualUIT != null) {
            var valorUitMultiplicada = _obtenerUitmultiplicada(300.00);
            var sumatoriaIngresos = 0;
            var fecha = moment(moment(comunLibreria.formatearYYYMMDD_SLASHtoMMYYYY(_obtenerValorCasilla("7")))).format('YYYY-MM-DD');
            var fechaMenosUnMes = moment(moment(fecha).subtract(1, 'month')).format('YYYYMM');
            //console.log()
            var resultado = false;

            var listaIngresos = datoperiodobean.ingresosNetosEjercicioActual.listaIngresos;
            $.each(listaIngresos, function (k, v) {
                sumatoriaIngresos = parseFloat(sumatoriaIngresos) + parseFloat(v.ingresoDeclarado);

                if (parseFloat(sumatoriaIngresos) > parseFloat(valorUitMultiplicada)) {
                    //console.log("========> " + parseInt(fechaMenosUnMes));
                    //console.log("========> " + parseInt(v.periodoDeclarado));
                    if (parseInt(fechaMenosUnMes) == parseInt(v.periodoDeclarado)) {
                        resultado = true;
                        return false;
                    }
                    return false;
                }

            });
        }

        return resultado;
    };
    _mostrarOpcionesEntre300UIT_1700UIT = function (mensaje) {
        formulario0621.mostrarMensajeAceptarCancelar(
            mensaje,
            function (evt) {
//                    evt.stopPropagation();
                _setearBoleanValueRadio("861", 5, true);
                $('#modalMensajeAceptarCancelar').modal('hide');
            },
            function (evt) {
//                    evt.stopPropagation();
                $('#modalMensajeAceptarCancelar').modal('hide');
                _limpiarVariablesGlobales();
                formulario0621_importar.limpiarVariables();
                comunIntegrador.setValue(_obtenerCasilla("685"), "0");
                comunIntegrador.setValue(_obtenerCasilla("687"), "0");

                $('#subfile').val("");
                $('#subfile2').val("");
                comunIntegrador.setValue(_obtenerCasilla("171"), "0");
                comunIntegrador.setValue(_obtenerCasilla("179"), "0");

                $("#muestraTotalaPagar").find("strong").text(" 0.00");
                $("#myModal173").find(":text").each(function () {
                    $($(this)).val('');
                });

                if (_obtenerNivelDeclaracion() == "s-") {
                    $('#paso-simple-01').trigger("click");
                    $('#Reset-02').trigger("reset");
                    $('#Reset-01').trigger("reset");
                    funcion_deshabilitar_inicio(true);

                } else {
                    $('#Paso-form_01').trigger("click");
                    $('#Reset-01').trigger("reset");
                    $('#Reset-02').trigger("reset");
                    funcion_deshabilitar_inicio(true);

                }
                $("#Clean-Form").val('');//limpiar evento
                $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="7"]').focus();
            }, "CANCELAR", "ACEPTAR"
        );
    };
    _mostrarOpcionesMayor1700UIT = function (mensaje) {
        formulario0621.mostrarMensajeAceptarCancelar(
            mensaje,
            function (evt) {
//                    evt.stopPropagation();
                _setearAtributoDisabledSelectedRadioButtonRenta('030301', false, true);
                $('#modalMensajeAceptarCancelar').modal('hide');
            },
            function (evt) {
//                    evt.stopPropagation();
                $('#modalMensajeAceptarCancelar').modal('hide');
                _limpiarVariablesGlobales();
                formulario0621_importar.limpiarVariables();
                $('#casilla685').val("0");
                $('#casilla687').val("0");
                $('#subfile').val("");
                $('#subfile2').val("");
                comunIntegrador.setValue(_obtenerCasilla("171"), "0");
                comunIntegrador.setValue(_obtenerCasilla("179"), "0");
                $("#muestraTotalaPagar").find("strong").text(" 0.00");
                $("#myModal173").find(":text").each(function () {
                    $($(this)).val('');
                });

                if (_obtenerNivelDeclaracion() == "s-") {
                    $('#paso-simple-01').trigger("click");
                    $('#Reset-02').trigger("reset");
                    $('#Reset-01').trigger("reset");
                    funcion_deshabilitar_inicio(true);

                } else {
                    $('#Paso-form_01').trigger("click");
                    $('#Reset-01').trigger("reset");
                    $('#Reset-02').trigger("reset");
                    funcion_deshabilitar_inicio(true);

                }
                $("#Clean-Form").val('');//limpiar evento
                $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="7"]').focus();
            }, "CANCELAR", "ACEPTAR"
        );
    };
    _validacionMype = function () {
//        //console.log("===_ingresosAcumuladosEsMenorOigualA1700uit== " + _ingresosAcumuladosEsMenorOigualA1700uit());
//        //console.log("===_primerPeriodoSuperadoMYPE== " + _primerPeriodoSuperadoMYPE());

        if (_codigoRegimenSeleccionado() == "031201") {//REGIMEN PYPE
//            //console.log("=======1======");
            if (_ingresosAcumuladosEsMenorOigualA300uit()) {
//                //console.log("=======2======");

                tasaMyPE = 0.01;
                var valorCasilla301 = _obtenerValorCasilla('301');
                if (valorCasilla301 != '' && valorCasilla301 != null) {
                    var valorCasilla312 = valorCasilla301 * tasaMyPE;
//                    _setearValorCasilla('312', valorCasilla312);
                    comunIntegrador.setValue(_obtenerCasilla(312), valorCasilla312);
                }
            } else if ((_ingresosAcumuladosEsMayorA300uit() && _ingresosAcumuladosEsMenorOigualA1700uit()) && _primerPeriodoSuperadoMYPE()) {
//                //console.log("=======3======");_ingresosAcumuladosEsMenorOigualA1700uit

                _setearAtributoDisabledSelectedRadioButtonRenta('031201', false, true);
                _mostrarOpcionesEntre300UIT_1700UIT(comunMensajes.getMensaje('INF009'), '');
            } else if (_ingresosAcumuladosEsMayorA1700uit()) {
//                //console.log("=======4======");

                _mostrarOpcionesMayor1700UIT(comunMensajes.getMensaje('MENSAJE_INGRESOS_SUPERAN_1700_UIT', ''));
            }
//            //console.log("=======5======");

        }
    };
    _quitarRequeridoC380 = function (renta) {

        if (renta == '031101' //ESPECIAL
            || renta == "030301C"//CONVENIO
            || (renta == '031201' && _ingresosAcumuladosEsMenorOigualA300uit())) {//MYPE
            _quitarAtributo('380', 'required');
        } else {
            _setearAtributoRequired('380');
        }
    };
    _validacionFuncionalidad380 = function () {
        var casilla380IraVacia = false;
        var renta = _codigoRegimenSeleccionado();


        if (renta == '031101'//REGIMEN ESPECIAL
            || renta == '030301C'
            || (renta == '031201' && _ingresosAcumuladosEsMenorOigualA300uit())) {
            //console.log("=======_validacionFuncionalidad380 ::=====> ");
            casilla380IraVacia = true;
            _limpiarControlesRenta();
            _setearAtributoDisabled(true, '380');
            _setearAtributoDisabled(true, '315');
            _setearValorCasilla('315', '');
            _setearValorCasilla('380', '');
        }
        return casilla380IraVacia;
    };
    _limpiarControlesRenta = function () {

        _setearAtributoDisabled(true, "361");
        _setearAtributoDisabled(true, "362");
        _setearAtributoDisabled(true, "363");
        _setearAtributoDisabled(true, "364");
        _setearAtributoDisabled(true, "839");
        _setearAtributoDisabled(true, "607");
        _setearAtributoDisabled(true, "865");
        _setearAtributoDisabled(true, "0001");


        _quitarAtributo('361', 'checked');
        _quitarAtributo('362', 'checked');
        _quitarAtributo('363', 'checked');
        _quitarAtributo('364', 'checked');
        _quitarAtributo('839', 'checked');
        _quitarAtributo('607', 'checked');
        _quitarAtributo('865', 'checked');
        _quitarAtributo('0001', 'checked');


    };
    _mensajeAceptar301 = function () {
        formulario0621.mostrarMensajeAceptar(
            comunMensajes.getMensaje("MENSAJE_1_301", ""),
            function (evt) {
//                    evt.stopPropagation();
                _setearAtributoDisabled(true, '0001');
                _setearBoleanValueRadio('0001', 0, false);
                _setearBoleanValueRadio('0001', 1, false);
                _setearAtributoDisabled(true, '380');
                _funcionalidad_Casilla380SinValidacion();
                _funcionalidad_Casilla312();
                _funcionalidad_casilla315();

            }
        );
    };
    _mensajeAceptarCancelar301 = function () {
        formulario0621.mostrarMensajeAceptarCancelar(
            comunMensajes.getMensaje("MENSAJE_2_301", ""),
            function (evt) {
//                    evt.stopPropagation();
                $("#Paso-form_01").tab("show");
                _setearAtributoDisabledSelectedRadioButtonRenta('030301', false, true);
                _modificacionAfectacionRegimenRenta();
                $('#modalMensajeAceptarCancelar').modal('hide');

            },
            function (evt) {
//                    evt.stopPropagation();
                _setearValorCasilla('301', '');
                _obtenerCasilla('301').focus();
                $("#Paso-form_02").tab("show");
                $('#modalMensajeAceptarCancelar').modal('hide');
            }, "CANCELAR", "ACEPTAR"
        );
    };
    _recorrerIngresosNetos = function (listaIngresos) {

        var tablaDatos = $("#tbodyIngresosNetos");
        tablaDatos.children("tr").remove();

        $.each(listaIngresos, function (k, v) {
            tablaDatos.append(("<tr><td>" + v.periodoDeclarado + "</td><td>"
            + v.ingresoDeclarado + " </tr>"));
        });
    };
    _mostrarInformacion301 = function () {
        var periodo = comunLibreria.formatearPeriodoaCadena(formulario0621.obtenerValorCasilla("7"));
        var periodo_MES = parseInt(periodo.substring(4, 6));
        if (_codigoRegimenSeleccionado() == "031201" && periodo_MES > 1) {
            if (datoperiodobean != null && datoperiodobean.ingresosNetosEjercicioActual != null
                && datoperiodobean.ingresosNetosEjercicioActual.listaIngresos != null) {
                var listaIngresos = datoperiodobean.ingresosNetosEjercicioActual.listaIngresos;
                _recorrerIngresosNetos(listaIngresos);
            }
        }
    };

    _validarSeleccionTab = function (tipoDeclaracion) {
        var seleccionRegimen = _validarButtonGroupRadios(861);
        var seleccionIgv = _validarButtonGroupRadios(887);
        var seleccionIvap = _validarButtonGroupRadios(867);


        if (!seleccionRegimen && tipoDeclaracion == enumTipoDeclara.ORIGINAL.name) {
            _mostrarMensajeGeneral(comunMensajes.getMensaje("NOE009", ""));
            return false;
        } else if (!seleccionIgv && !seleccionIvap && !seleccionRegimen
            && (tipoDeclaracion == enumTipoDeclara.SUSITUTORIA.name || tipoDeclaracion == enumTipoDeclara.RECTIFICATORIA.name)) {
//            _mostrarMensajeGeneral(comunMensajes.getMensaje("INF008", ""));
            //console.log("ENTROOOOOOOOOOOOOOOOOOOOOOOOOOOOO");
            formulario0621.mostrarMensajeINF008_INF007(comunMensajes.getMensaje("INF008", ""));
//            _mostrarMensajeINF008_INF007(comunMensajes.getMensaje("INF008", ""));
            return false;
        } else {
            return true;
        }
    };
    _accionesSegunRegimenRentaParaOSR = function () {

        var seleccionRegimen = ($('*[data-' + _obtenerNivelDeclaracion() + 'casilla="861"]').is(':checked'));
        var seleccionIgv = ($('*[data-' + _obtenerNivelDeclaracion() + 'casilla="887"]').is(':checked'));
        var seleccionIvap = ($('*[data-' + _obtenerNivelDeclaracion() + 'casilla="867"]').is(':checked'));

        if (seleccionIgv == true) {
            $('#li-Paso-form_atras03').removeClass('disabled');
            casillasInternasBean.casilla_inter_871 = "100";
//            casillasInternasBean.casilla_inter_887 = 0;
        } else {
            $('#li-Paso-form_atras03').attr('class', 'disabled');
            $('#li-Paso-form_atras03').removeClass('active');
        }

        if (seleccionIvap == true) {
            $('#li-Paso-form_04').removeClass('disabled');
            casillasInternasBean.casilla_inter_871 = "010";
//            casillasInternasBean.casilla_inter_867 = 1;
        } else {
            $('#li-Paso-form_04').attr('class', 'disabled');
            $('#li-Paso-form_04').removeClass('active');
        }


        if (seleccionRegimen == true) {
            $('#li-Paso-form_05').removeClass('disabled');
            casillasInternasBean.casilla_inter_871 = "001";
        } else {
            $('#li-Paso-form_05').attr('class', 'disabled');
            $('#li-Paso-form_05').removeClass('active');
        }

        if (seleccionIgv == true && seleccionIvap == true) {
            casillasInternasBean.casilla_inter_871 = "110";
        }
        if (seleccionIvap == true && seleccionRegimen == true) {
            casillasInternasBean.casilla_inter_871 = "011";
        }

        if (seleccionIgv == true && seleccionRegimen == true) {
            casillasInternasBean.casilla_inter_871 = "101";
        }

        if (seleccionIgv == true && seleccionRegimen == true && seleccionIvap == true) {
            casillasInternasBean.casilla_inter_871 = "111";
        }
        _casillasInternasSegunRegimen();
        if (!evitarMensajes) {
            if (_obtenerValorCasilla("895") == enumTipoDeclara.SUSITUTORIA.name || _obtenerValorCasilla("895") == enumTipoDeclara.RECTIFICATORIA.name) {
                if (!formulario0621.editandoFormulario) {
                    _ultima_declaracion();
                }
            }
        }

    };
    _casillasInternasSegunRegimen = function () {
        var selectRegimenGeneral = ($('input[id="casilla861-0"]').is(':checked'));
        var selectRegimenEspecial = ($('input[id="casilla861-1"]').is(':checked'));
        var selectSocioAgracio = ($('input[id="casilla861-8"]').is(':checked'));
        var selectRegimenAmazonia = ($('input[id="casilla861-2"]').is(':checked'));
        var selectSectorAgraria = ($('input[id="casilla861-Z"]').is(':checked'));
        var selectConvenio = ($('input[id="casilla861-4"]').is(':checked'));

        if (selectRegimenGeneral == true) {
//            casillasInternasBean.casilla_inter_861 = 0;
            casillasInternasBean.casilla_inter_056 = 4;
        }
        if (selectRegimenEspecial == true) {
//            casillasInternasBean.casilla_inter_861 = 1;
            casillasInternasBean.casilla_inter_056 = 5;
        }
        if (selectRegimenAmazonia == true) {
//            casillasInternasBean.casilla_inter_861 = 2;
            casillasInternasBean.casilla_inter_056 = 2;
//            casillasInternasBean.casilla_inter_887 = 2;//REVISAR, SE DEB INGRESAR EL NUMERO DE ZONA
        }
        if (selectConvenio == true) {
//            casillasInternasBean.casilla_inter_861 = 4;
            casillasInternasBean.casilla_inter_056 = 6;
//            casillasInternasBean.casilla_inter_887 = 1;
        }
        if (selectSectorAgraria == true) {
            casillasInternasBean.casilla_inter_056 = 1;
        }
        if (selectSocioAgracio == true) {
            casillasInternasBean.casilla_inter_056 = 8;
        }
    };
    _validarModificacionPeriodo = function (tipoDeclaracion, periodoSeleccionado, oldPeriodoSeleccionado) {

        if (tipoDeclaracion != "" && oldPeriodoSeleccionado != periodoSeleccionado) {
            return true;
        }
        return false;
    };
    _validarPeriodoSeleccionado = function (dataJson, periodo) {

        if (periodo == "" || periodo == null) {
            _mostrarMensajeGeneral(comunMensajes.getMensaje("NOE008", ""));
            funcion_deshabilitar_inicio(true);
            return false;
        }

        if (periodo != "" && dataJson != null) {

            var fechaActualYYYMM = _fechaLocalYYYMM(); //deberia ser el metodo "obtenerFechaHora"

            var fecIniVig = dataJson["fecIniVig"];
            var fecFinVig = dataJson["fecFinVig"];

            var periodoformateado = comunLibreria.formatearPeriodoaCadena(periodo);

            if (periodoformateado < comunLibreria.formatearPeriodoaCadena(fecIniVig.substr(3, 10))) {
                _mostrarMensajeGeneral(comunMensajes.getMensaje("EXC003", periodo));
                funcion_deshabilitar_inicio(true);
                return false;
            } else if (periodoformateado > comunLibreria.formatearPeriodoaCadena(fecFinVig.substr(3, 10))) {
                _mostrarMensajeGeneral(comunMensajes.getMensaje("EXC004", periodo));
                funcion_deshabilitar_inicio(true);
                return false;
            } else if (periodoformateado > fechaActualYYYMM
                || periodoformateado == fechaActualYYYMM
            ) {
                _mostrarMensajeGeneral(comunMensajes.getMensaje("EXC005", periodo));
                funcion_deshabilitar_inicio(true);
                return false;
            }

            return true;
        }
    };
    _obtenerTipoDeclaracion = function (periodo, formulario, fecVencimiento) {
        var tipoDeclaracion = null;
        var parametros = periodo + "/" + formulario + "/" + fecVencimiento;
        var datJson = comunServiciosControlador.obtenerTipoDeclaracion(parametros);
        if (datJson != null && datJson["resultado"] != null) {
            tipoDeclaracion = datJson["resultado"].tipo;
        }
        return tipoDeclaracion;
    };
    _ultima_declaracion = function () {
        var ultimadeclaracion = datoperiodobean.casillasDeclaracionAnterior;
//        //console.log("=========================== " + JSON.stringify(ultimadeclaracion));
        if (ultimadeclaracion != null && ultimadeclaracion.length > 0 && mostroUltimaDeclaracion == false) {
            mostroUltimaDeclaracion = true;
            formulario0621.mostrarMensajeAceptarCancelar(
                "Sr. Contribuyente usted cuenta con declaraciones juradas presentadas para este periodo tributario, ¿Desea que se le muestre la última declaración presentada? ",
                function (evt) {
//                        evt.stopPropagation();
                    for (var item in ultimadeclaracion) {
                        _recorrerInputs(ultimadeclaracion[item]);
                    }
                    $('#modalMensajeAceptarCancelar').modal('hide');

                },
                function (evt) {
//                        evt.stopPropagation();
                    $('#modalMensajeAceptarCancelar').modal('hide');
                }, "NO", "SI");
        }
    };
    _recorrerInputs = function (casillaDeclaracionAnterior) {
        $("#menu1,#menu2").find(':input').each(function () {
            var elemento = this;
            var numRubCas = $(elemento).attr("numrubcas");
            var numSecCas = $(elemento).attr("numseccas");
            var numcolcas = $(elemento).attr("numcolcas");
            var codhtmcnttip = $(elemento).attr("codhtmcnttip");


            var casillaDom = "";
            if (_esNivelSimplificado()) {
                casillaDom = $(elemento).attr("data-s-casilla");
            } else {
                casillaDom = $(elemento).attr("data-casilla");
            }


            if (codhtmcnttip == "01" && casillaDom != null && casillaDom != undefined && casillaDeclaracionAnterior.casillasFormularioPK.numCas == casillaDom) {

                if (_validarButtonGroupRadios(887)) {//IGV
                    if (numRubCas == "2" && (numSecCas == "1" || numSecCas == "2")) {
//                        _setearValorCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas, casillaDeclaracionAnterior.desValcas);
                        comunIntegrador.setValue(formulario0621.obtenerCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas), casillaDeclaracionAnterior.desValcas);
                        return true;
                    } else if (numRubCas == "3" && numSecCas == "1" && numcolcas == "1" && casillaDeclaracionAnterior.casillasFormularioPK.numCas == casillaDom) {
//                        _setearValorCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas, casillaDeclaracionAnterior.desValcas);
                        comunIntegrador.setValue(formulario0621.obtenerCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas), casillaDeclaracionAnterior.desValcas);
                        return true;
                    }
                }

                if (_validarButtonGroupRadios(867)) {//IVAP
                    if (numRubCas == "2" && numSecCas == "3") {
//                        _setearValorCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas, casillaDeclaracionAnterior.desValcas);
                        comunIntegrador.setValue(formulario0621.obtenerCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas), casillaDeclaracionAnterior.desValcas);
                        return true;
                    } else if (numRubCas == "3" && numSecCas == "1" && numcolcas == "3") {
                        comunIntegrador.setValue(formulario0621.obtenerCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas), casillaDeclaracionAnterior.desValcas);
//                        _setearValorCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas, casillaDeclaracionAnterior.desValcas);
                        return true;
                    }
                }
                if (_validarButtonGroupRadios(861)) {//RENTA   

                    if (numRubCas == "2" && numSecCas == "4") {
//                        _setearValorCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas, casillaDeclaracionAnterior.desValcas);
                        comunIntegrador.setValue(formulario0621.obtenerCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas), casillaDeclaracionAnterior.desValcas);
                        return true;
                    } else if (numRubCas == "3" && numSecCas == "1" && numcolcas == "2") {
//                        _setearValorCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas, casillaDeclaracionAnterior.desValcas);
                        comunIntegrador.setValue(formulario0621.obtenerCasilla(casillaDeclaracionAnterior.casillasFormularioPK.numCas), casillaDeclaracionAnterior.desValcas);
                        return true;
                    }
                }
            }
        });
    };

    _limpiarTextInput = function () {
        $("#menu1,#menu2").find(':input').each(function () {
            var elemento = this;
            var casillaDom = "";
            if (_esNivelSimplificado()) {
                casillaDom = $(elemento).attr("data-s-casilla");
            } else {
                casillaDom = $(elemento).attr("data-casilla");
            }
            _setearValorCasilla(casillaDom, "");
        });
    };

    _quitarAgregarRequeridoCasillasInvisibles = function () {

        $("#menu1,#menu2").find(':input').each(function () {
            var elemento = this;
            var numRubCas = $(elemento).attr("numrubcas");
            var numSecCas = $(elemento).attr("numseccas");
            var numcolcas = $(elemento).attr("numcolcas");
            var indObl = $(elemento).attr("indObl");
            var codhtmcnttip = $(elemento).attr("codhtmcnttip");
            var esRequerida = ($(elemento).prop("required"));

            var casillaDom = "";
            if (_esNivelSimplificado()) {
                casillaDom = $(elemento).attr("data-s-casilla");
            } else {
                casillaDom = $(elemento).attr("data-casilla");
            }
            if (codhtmcnttip == "01" && casillaDom != null && casillaDom != undefined) {
                if (!_validarButtonGroupRadios(887) && esRequerida) {//IGV
                    //console.log("========NO SELECCIONO IGV========> ");
                    if (numRubCas == "2" && (numSecCas == "1" || numSecCas == "2" /*&& esRequerida*/)) {
                        _quitarAtributo(casillaDom, 'required');
                    } else if (numRubCas == "3" && numSecCas == "1" && numcolcas == "1" /*&& esRequerida*/) {
                        _quitarAtributo(casillaDom, 'required');
//                        //console.log("======quitando atributo====" + casillaDom);
                    }
                } else if (_validarButtonGroupRadios(887) && !esRequerida) {
                    if (numRubCas == "2" && (numSecCas == "1" || numSecCas == "2") && indObl == "1"/* && !esRequerida*/) {
                        _setearAtributoRequired(casillaDom);
                    } else if (numRubCas == "3" && numSecCas == "1" && numcolcas == "1" && indObl == "1" /*&& !esRequerida*/) {
//                        //console.log("======agregando atributo====" + casillaDom);
                        _setearAtributoRequired(casillaDom);
                    }
                }

                if (!_validarButtonGroupRadios(867) && esRequerida) {//IVAP
                    //console.log("========NO SELECCIONO IVAP========> ");
                    if (numRubCas == "2" && numSecCas == "3" /*&& esRequerida*/) {
                        _quitarAtributo(casillaDom, 'required');
//                        //console.log("======quitando atributo IVAP====" + casillaDom);
                    } else if (numRubCas == "3" && numSecCas == "1" && numcolcas == "3"/* && esRequerida*/) {
                        _quitarAtributo(casillaDom, 'required');
//                        //console.log("======quitando atributo DETERMINACION IVAP====" + casillaDom);
                    }
                } else if (_validarButtonGroupRadios(867) && !esRequerida) {
//                    //console.log("========SI SELECCIONO IVAP========> ");
                    if (numRubCas == "2" && numSecCas == "3" && indObl == "1" /*&& !esRequerida*/) {
                        _setearAtributoRequired(casillaDom);
                    } else if (numRubCas == "3" && numSecCas == "1" && numcolcas == "3" && indObl == "1" /*&& !esRequerida*/) {
                        _setearAtributoRequired(casillaDom);
                    }
                }

                if (!_validarButtonGroupRadios(861) && esRequerida) {//RENTA

                    if (numRubCas == "2" && numSecCas == "4" /*&& esRequerida*/) {
                        _quitarAtributo(casillaDom, 'required');
                    } else if (numRubCas == "3" && numSecCas == "1" && numcolcas == "2" && esRequerida) {
                        _quitarAtributo(casillaDom, 'required');
                    }
                } else if (_validarButtonGroupRadios(861) && !esRequerida) {
//                    //console.log("========SE SELECCIONO RENTA========> " + casillaDom + " es requerida : " + (esRequerida));
//                    //console.log("===numRubCas== " + numRubCas + " numSecCas:: " + numSecCas + " indObl:: " + indObl);
//                    //console.log("===numRubCas== " + (numRubCas == "2") + " numSecCas:: " + (numSecCas == "4") + " indObl:: " + (indObl == "1"));
//                    //console.log((numRubCas == "2" && numSecCas == "4" && indObl == "1" && !esRequerida));
//                    //console.log("**********************************************");
                    if (numRubCas == "2" && numSecCas == "4" && indObl == "1" /*&& !esRequerida*/) {
                        //console.log("=======seteandoRENTA=====> " + casillaDom);
                        _setearAtributoRequired(casillaDom);
                    } else if (numRubCas == "3" && numSecCas == "1" && numcolcas == "2" && indObl == "1" /*&& !esRequerida*/) {
                        _setearAtributoRequired(casillaDom);
                        //console.log("=======seteandoRENTA DETERMINACION=====> " + casillaDom);
                    }
                }
            }

//       
        });
        if ($("#casilla866-NO").is(":checked")) {
            formulario0621.quitarAtributo(173, "required");
        } else {
            formulario0621.setearAtributoRequired(173);
        }


        var codRegimen = _codigoRegimenSeleccionado();
        if (codRegimen != null && codRegimen != "" && codRegimen != undefined) {
            //console.log("*******QUITANDO REQUERIDO 380 desde _quitarAgregarRequeridoCasillasInvisibles***");
            _quitarRequeridoC380(codRegimen);
        }
        formulario0621.funcionalidad886();
    };
//    _obtenerFechaVencimiento = function (pertri, codtri) {
//        var parametros = pertri + "/" + codtri;
//        //console.log("::::: consumiendo: " + parametros);
//        var result = "";
//        if (listFechaVencimiento == null || listFechaVencimiento == "") {
//
//            var result = comunServiciosControlador.obtenerfechavencimiento(parametros);
//
//            if (result != null) {
//                listFechaVencimiento = result.resultado;
//            }
//        }
//        //console.log("FEchassssss de vencimientooooo: " + listFechaVencimiento);
//        return listFechaVencimiento;
//    };
//    _obtenerFechaVencimientoReLlamada = function (pertri, codtri) {
//        var parametros = pertri + "/" + codtri;
//        var result = "";
//
//        var result = comunServiciosControlador.obtenerfechavencimiento(parametros);
//
//        if (result != null) {
//            listFechaVencimientoReLlamado = result.resultado;
//        }
//        return listFechaVencimientoReLlamado;
//    };
//    
    _obtenerTributosAsociados = function (codFormulario) {
        var result = "";
        if (listTributosAsociados == null || listTributosAsociados == "") {

            result = localStorage.getItem("TributosAsociados");
            if (result != null) {
                listTributosAsociados = JSON.parse(JSON.stringify(result));
            }
        }

        return listTributosAsociados;
    };
    _obtenerListTributosAfectos = function () {
        if (datoperiodobean.afectacionesTributos != null) {
            var listTributos = [];

            if (datoperiodobean.afectacionesTributos.ind_afe_IVAP == 1) {
                listTributos.push("010106");
            }
            if (datoperiodobean.afectacionesTributos.Ind_afe_AMA == 1) {
                listTributos.push("034101");
            }

            if (datoperiodobean.afectacionesTributos.ind_afe_IGV == 1) {
                listTributos.push("010101");
            }
            if (datoperiodobean.afectacionesTributos.Ind_afe_ESP == 1) {
                listTributos.push("031101");
            }
            if (datoperiodobean.afectacionesTributos.Ind_afe_GEN == 1) {
                listTributos.push("030301");
            }
            if (datoperiodobean.afectacionesTributos.Ind_afe_MYPE == 1) {
                listTributos.push("031201");
            }
            if (datoperiodobean.afectacionesTributos.Ind_afe_AGR == 1) {
                listTributos.push("033101");
            }

        }

        return listTributos;
    };
    _obtenerResumenCasillasLE = function (periodo) {
        if (resumenCasillasLE == "" || resumenCasillasLE == null) {
            resumenCasillasLE = comunServiciosControlador.obtenerResumenCasillasLE(periodo);
        }
        return resumenCasillasLE;
    };
    _obtenerUbigeo = function () {
        if (dataUbigeo == "" || dataUbigeo == null) {
            dataUbigeo = localStorage.getItem("Ubigeo");
        }

        return JSON.parse(dataUbigeo);
    };

    _funcionalidad_Casilla380 = function () {
        //console.log("=========entrando a casilla 380 ====");
        var mesPeriodo = _obtenerValorCasilla("7").substring(0, 2);

        //Es una casilla obligatoria y solo se debe deshabilitar cuando el RUC se encuentre afecto al 
        //Régimen Especial de Renta (tributo 3111), o  Convenio de Estabilidad Renta. En dichos casos 
        //no se habilitan las casillas y preguntas para calcular el coeficiente. 
        var codRenta = _codigoRegimenSeleccionado();
        var activo_380 = (codRenta == "030301C" || (_verificarTributoAfecto(codRenta) && codRenta == "031101"));


        //console.log("===activo_380== " + activo_380);
//        _estadoCasillasSegunRegimenEspecial(activo_380);
        if (!activo_380) {
            if (!_validacionFuncionalidad380()) {
                countTabRenta++;
            }
            //console.log("=====codRenta == " + codRenta);
            if (countTabRenta == 1) {
                var periodo = comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7"));
                var codRenta = _codigoRegimenSeleccionado();
                var coeficienteRenta = _obtenerCoeficienteRenta(periodo, codRenta);

                if (coeficienteRenta != null && coeficienteRenta != "" && coeficienteRenta.resultado != null) {
                    coeficienteRenta = coeficienteRenta.resultado;
                    comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                    $('#casilla891').val(coeficienteRenta.ingCalc);
                    $('#casilla892').val(coeficienteRenta.ingNetos);
                }

                if (_obtenerNivelDeclaracion() == "s-") {
                    $('#lbl_839s').text('30 de abril ');
                } else {
                    $('#lbl_839c').text(' 30 de abril ');
                }

                switch (mesPeriodo) {
                    case "01":
                        _setearAtributoDisabled(true, "361");
                        _setearAtributoDisabled(true, "362");
                        _setearAtributoDisabled(true, "363");
                        _setearAtributoDisabled(true, "364");
                        _setearAtributoDisabled(true, "839");
                        _setearAtributoDisabled(true, "607");
                        _setearAtributoDisabled(true, "865");
                        break;
                    case "02":
                    case "03":
                    case "04":
                        _setearAtributoDisabled(true, "839");// 839 = 843
                        _setearAtributoDisabled(true, "607");
                        _setearAtributoDisabled(true, "865");
                        _setearAtributoDisabled(true, "380");

                        if (coeficienteRenta != null) {
                            if (coeficienteRenta.TIENERI == true) {
                                _setearBoleanValueRadio("361", 0, true);
                                _setearAtributoDisabled(false, "361");
                                _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                                comunIntegrador.setValue(_obtenerCasilla("362"), coeficienteRenta.numRI);
                                //console.log(":::::: fecha: " + coeficienteRenta.fecNotif);
                                if (coeficienteRenta.fecNotif != null) {
                                    //_setearValorCasilla("363", moment(coeficienteRenta.fecNotif).format('MM-dd-YYYY'));
                                    _setearValorCasilla("363", moment(coeficienteRenta.fecNotif).format('DD/MM/YYYY'));
                                }
                                _setearAtributoDisabled(false, "364");

                            } else {//NO TIENE RI
                                _setearBoleanValueRadio("361", 1, true);
                                _setearAtributoDisabled(false, "361");
                                _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                                comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                                _setearAtributoDisabled(false, "380");
                            }
                        } else {
                            comunIntegrador.setValue(_obtenerCasilla("380"), "0");
                            _setearAtributoDisabled(false, "380");
                            _setearBoleanValueRadio("361", 1, true);
                            _setearAtributoDisabled(false, "361");
                            _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                        }
                        break;

                    case "05":
                    case "06":
                    case "07":
                        _setearAtributoDisabled(true, "607");
                        _setearAtributoDisabled(true, "865");
                        _setearAtributoDisabled(true, "380");

                        if (coeficienteRenta != null) {
                            if (coeficienteRenta.TIENERI) {
                                //console.log("====JUNIO 1======>");
                                _setearBoleanValueRadio("361", 0, true);
                                _setearAtributoDisabled(false, "361");
                                _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));

                                comunIntegrador.setValue(_obtenerCasilla("362"), coeficienteRenta.numRI);
                                //console.log(":::::: fecha: " + coeficienteRenta.fecNotif);
                                if (coeficienteRenta.fecNotif != null) {
                                    _setearValorCasilla("363", moment(coeficienteRenta.fecNotif).format('DD/MM/YYYY'));
                                }
                                _setearAtributoDisabled(false, "364");
                                _setearAtributoDisabled(true, "839");
                                comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
//                                _setearAtributoDisabled(true, "380");
                            } else {//NO TIENE RI
                                //console.log("====JUNIO 2======>");
                                _setearBoleanValueRadio("361", 1, true);
                                _setearAtributoDisabled(false, "361");
                                _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                                _setearAtributoDisabled(false, "839");

                                if (coeficienteRenta.FORMULARIO625 == true) {
                                    //console.log("====JUNIO 3======>");
                                    _setearBoleanValueRadio("839", 0, true);
                                    comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                                } else {
                                    //console.log("====JUNIO 4======>");
                                    _setearBoleanValueRadio("839", 1, true);
                                    comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                                }
                                _setearAtributoDisabled(false, "380");
                            }
                        } else {
                            _setearBoleanValueRadio("361", 1, true);
                            _setearAtributoDisabled(false, "380");
                            _setearAtributoDisabled(false, "361");
                            _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                            _setearAtributoDisabled(false, "839");
                            _setearBoleanValueRadio("839", 1, true);
                            comunIntegrador.setValue(_obtenerCasilla("380"), "0");
                        }
                        break;

                    case "08":
                    case "09":
                    case "10":
                    case "11":
                    case "12":
                        _setearAtributoDisabled(true, "361");
                        _setearAtributoDisabled(true, "362");
                        _setearAtributoDisabled(true, "363");
                        _setearAtributoDisabled(true, "364");
                        _setearAtributoDisabled(false, "380");


                        if (_obtenerNivelDeclaracion() == "s-") {
                            $('#lbl_839s').text(' 31 de julio ');
                        } else {
                            $('#lbl_839c').text(' 31 de julio ');
                        }


                        if (coeficienteRenta != null) {
                            if (coeficienteRenta.FORMULARIO625) {//EXISTE PDT 625
                                _setearBoleanValueRadio("839", 0, true);
                                _setearAtributoDisabled(false, "839");

                                if (!coeficienteRenta.TIENERI) {//NO EXISTE RI
                                    //console.log("======NO HAY RI==> ");
                                    _setearBoleanValueRadio("607", 1, true);
                                    _setearAtributoDisabled(false, "607");

                                    _setearAtributoDisabled(true, "865");
                                    comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                                } else {//EXISTE RI
                                    //console.log("======SI HAY RI==> ");
                                    _setearBoleanValueRadio("607", 0, true);
                                    _setearAtributoDisabled(false, "607");

                                    _setearAtributoDisabled(false, "865");

                                    if (coeficienteRenta.CoefCalcMenorTabla == true) {
                                        _setearBoleanValueRadio("865", 0, true);
                                        _setearAtributoDisabled(false, "865");

                                        comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                                    } else {
                                        _setearBoleanValueRadio("865", 1, true);
                                        _setearAtributoDisabled(false, "865");

                                        comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                                    }
                                }
                            } else {//NO EXISTE PDT 625
                                _setearBoleanValueRadio("839", 1, true);
                                _setearAtributoDisabled(false, "839");
                                comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                            }
                        } else {
                            _setearAtributoDisabled(true, "865");
                            _setearAtributoDisabled(true, "607");

                            _setearBoleanValueRadio("839", 0, true);
                            _setearAtributoDisabled(false, "839");
                            comunIntegrador.setValue(_obtenerCasilla("380"), "0");
                        }
                        break;
                }
            }
        } else {
            _setearAtributoDisabled(true, '380');
            _limpiarControlesRenta();
        }
    };
    _funcionalidad_Casilla380SinValidacion = function () {
        var mesPeriodo = _obtenerValorCasilla("7").substring(0, 2);
        var activo_380 = null;
        var codRenta = _codigoRegimenSeleccionado();

        var activo_380 = (codRenta == "030301C" || (_verificarTributoAfecto(codRenta) && codRenta == "031101"));

        if (!activo_380) {
            var periodo = comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7"));
            var coeficienteRenta = _obtenerCoeficienteRenta(periodo, codRenta);

            if (coeficienteRenta != null && coeficienteRenta != "" && coeficienteRenta.resultado != null) {
                coeficienteRenta = coeficienteRenta.resultado;
                comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                $('#casilla891').val(coeficienteRenta.ingCalc);
                $('#casilla892').val(coeficienteRenta.ingNetos);
            }

            if (_obtenerNivelDeclaracion() == "s-") {
                $('#lbl_839s').text('30 de abril ');
            } else {
                $('#lbl_839c').text(' 30 de abril ');
            }

            switch (mesPeriodo) {
                case "01":
                    _setearAtributoDisabled(true, "361");
                    _setearAtributoDisabled(true, "362");
                    _setearAtributoDisabled(true, "363");
                    _setearAtributoDisabled(true, "364");
                    _setearAtributoDisabled(true, "839");
                    _setearAtributoDisabled(true, "607");
                    _setearAtributoDisabled(true, "865");
                    break;
                case "02":
                case "03":
                case "04":
                    _setearAtributoDisabled(true, "839");// 839 = 843
                    _setearAtributoDisabled(true, "607");
                    _setearAtributoDisabled(true, "865");
                    _setearAtributoDisabled(true, "380");

                    if (coeficienteRenta != null) {
                        if (coeficienteRenta.TIENERI == true) {
                            _setearBoleanValueRadio("361", 0, true);
                            _setearAtributoDisabled(false, "361");
                            _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                            comunIntegrador.setValue(_obtenerCasilla("362"), coeficienteRenta.numRI);
                            //console.log(":::::: fecha: " + coeficienteRenta.fecNotif);
                            if (coeficienteRenta.fecNotif != null) {
                                _setearValorCasilla("363", moment(coeficienteRenta.fecNotif).format('DD/MM/YYYY'));
                            }
                            _setearAtributoDisabled(false, "364");

                        } else {//NO TIENE RI
                            _setearBoleanValueRadio("361", 1, true);
                            _setearAtributoDisabled(false, "361");
                            _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                            comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                            _setearAtributoDisabled(false, "380");
                        }
                    } else {
                        comunIntegrador.setValue(_obtenerCasilla("380"), "0");
                        _setearAtributoDisabled(false, "380");
                        _setearBoleanValueRadio("361", 1, true);
                        _setearAtributoDisabled(false, "361");
                        _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                    }
                    break;

                case "05":
                case "06":
                case "07":
                    _setearAtributoDisabled(true, "607");
                    _setearAtributoDisabled(true, "865");
                    _setearAtributoDisabled(true, "380");

                    if (coeficienteRenta != null) {
                        if (coeficienteRenta.TIENERI) {
                            //console.log("====JUNIO 1======>");
                            _setearBoleanValueRadio("361", 0, true);
                            _setearAtributoDisabled(false, "361");
                            _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));

                            comunIntegrador.setValue(_obtenerCasilla("362"), coeficienteRenta.numRI);
                            //console.log(":::::: fecha: " + coeficienteRenta.fecNotif);
                            if (coeficienteRenta.fecNotif != null) {
                                _setearValorCasilla("363", moment(coeficienteRenta.fecNotif).format('DD/MM/YYYY'));
                            }
                            _setearAtributoDisabled(false, "364");
                            _setearAtributoDisabled(true, "839");
                            comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
//                                _setearAtributoDisabled(true, "380");
                        } else {//NO TIENE RI
                            //console.log("====JUNIO 2======>");
                            _setearBoleanValueRadio("361", 1, true);
                            _setearAtributoDisabled(false, "361");
                            _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                            _setearAtributoDisabled(false, "839");

                            if (coeficienteRenta.FORMULARIO625 == true) {
                                //console.log("====JUNIO 3======>");
                                _setearBoleanValueRadio("839", 0, true);
                                comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                            } else {
                                //console.log("====JUNIO 4======>");
                                _setearBoleanValueRadio("839", 1, true);
                                comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                            }
                            _setearAtributoDisabled(false, "380");
                        }
                    } else {
                        _setearBoleanValueRadio("361", 1, true);
                        _setearAtributoDisabled(false, "380");
                        _setearAtributoDisabled(false, "361");
                        _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                        _setearAtributoDisabled(false, "839");
                        _setearBoleanValueRadio("839", 1, true);
                        comunIntegrador.setValue(_obtenerCasilla("380"), "0");
                    }
                    break;

                case "08":
                case "09":
                case "10":
                case "11":
                case "12":
                    _setearAtributoDisabled(true, "361");
                    _setearAtributoDisabled(true, "362");
                    _setearAtributoDisabled(true, "363");
                    _setearAtributoDisabled(true, "364");
                    _setearAtributoDisabled(false, "380");


                    if (_obtenerNivelDeclaracion() == "s-") {
                        $('#lbl_839s').text(' 31 de julio ');
                    } else {
                        $('#lbl_839c').text(' 31 de julio ');
                    }


                    if (coeficienteRenta != null) {
                        if (coeficienteRenta.FORMULARIO625) {//EXISTE PDT 625
                            _setearBoleanValueRadio("839", 0, true);
                            _setearAtributoDisabled(false, "839");

                            if (!coeficienteRenta.TIENERI) {//NO EXISTE RI
                                //console.log("======NO HAY RI==> ");
                                _setearBoleanValueRadio("607", 1, true);
                                _setearAtributoDisabled(false, "607");

                                _setearAtributoDisabled(true, "865");
                                comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);

                            } else {//EXISTE RI
                                //console.log("======SI HAY RI==> ");
                                _setearBoleanValueRadio("607", 0, true);
                                _setearAtributoDisabled(false, "607");

                                _setearAtributoDisabled(false, "865");

                                if (coeficienteRenta.CoefCalcMenorTabla == true) {
                                    _setearBoleanValueRadio("865", 0, true);
                                    _setearAtributoDisabled(false, "865");

                                    comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                                } else {
                                    _setearBoleanValueRadio("865", 1, true);
                                    _setearAtributoDisabled(false, "865");
                                    comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                                }
                            }
                        } else {//NO EXISTE PDT 625
                            _setearBoleanValueRadio("839", 1, true);
                            _setearAtributoDisabled(false, "839");
                            comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                        }
                    } else {
                        _setearAtributoDisabled(true, "865");
                        _setearAtributoDisabled(true, "607");

                        _setearBoleanValueRadio("839", 0, true);
                        _setearAtributoDisabled(false, "839");
                        comunIntegrador.setValue(_obtenerCasilla("380"), "0");
                    }
                    break;
            }
        } else {
            _setearAtributoDisabled(true, '380');
            _limpiarControlesRenta();
        }
    };
    _validacionManualRadiosRenta = function () {
        var mesPeriodo = _obtenerValorCasilla("7").substring(0, 2);

        if (_obtenerBooleanValueRadio("361", 0)) {
            _setearValorCasilla("891", "");
            _setearValorCasilla("892", "");
        }
        var periodo = comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7"));
        var codRenta = _codigoRegimenSeleccionado();
        var coeficienteRenta = _obtenerCoeficienteRenta(periodo, codRenta);

        if (coeficienteRenta != null && coeficienteRenta != "" && coeficienteRenta.resultado != null) {
            coeficienteRenta = coeficienteRenta.resultado;
        }

        switch (mesPeriodo) {

            case "02":
            case "03":
            case "04":
                _reglaGeneralValidacionManual380(mesPeriodo, coeficienteRenta);
                break;
            case "05":
            case "06":
            case "07":
                _reglaGeneralValidacionManual380(mesPeriodo, coeficienteRenta);
                if (_obtenerBooleanValueRadio("361", 0)) {
                    _setearAtributoDisabled(true, "839");
                    _setearBoleanValueRadio("839", 0, false);
                    _setearBoleanValueRadio("839", 1, false);

                } else if (_obtenerBooleanValueRadio("361", 1)) {
                    _setearAtributoDisabled(false, "839");
                    _setearBoleanValueRadio("839", 1, true);
                    if (coeficienteRenta != null) {
                        if (coeficienteRenta.FORMULARIO625) {
                            _setearBoleanValueRadio("839", 0, true);
                            _setearBoleanValueRadio("839", 1, false);
                        }
                    }
                }
                break;
            case "08":
            case "09":
            case "10":
            case "11":
            case "12":


                if (_obtenerBooleanValueRadio("0001", 0)) {
                    comunIntegrador.setValue(_obtenerCasilla("312"), "0");
                } else if (_obtenerBooleanValueRadio("0001", 1)) {
                    var valorCasilla301 = 0;
                    if (_obtenerValorCasilla("301") != "" && _obtenerValorCasilla("301") != null) {
                        valorCasilla301 = _obtenerValorCasilla("301");
                    }
                    comunIntegrador.setValue(_obtenerCasilla("312"), parseFloat(valorCasilla301) * parseFloat(tasaMyPE));
                }

                if (_obtenerBooleanValueRadio("839", 0) && !_esDisabled("839")
                    && _esDisabled("607")) {

                    _setearAtributoDisabled(false, "607");
                    _setearBoleanValueRadio("607", 0, false);
                    _setearBoleanValueRadio("607", 1, true);

                } else if (_obtenerBooleanValueRadio("839", 1) && !_esDisabled("839")) {

                    _setearAtributoDisabled(true, "607");
                    _setearAtributoDisabled(true, "865");

                    _setearBoleanValueRadio("865", 0, false);
                    _setearBoleanValueRadio("865", 1, false);

                    _setearBoleanValueRadio("607", 0, false);
                    _setearBoleanValueRadio("607", 1, false);


                } else if (_obtenerBooleanValueRadio("607", 0) && !_esDisabled("607")
                    && _esDisabled("865")) {
                    _setearAtributoDisabled(false, "865");

                    _setearBoleanValueRadio("865", 0, false);
                    _setearBoleanValueRadio("865", 1, true);

                } else if (_obtenerBooleanValueRadio("607", 1) && !_esDisabled("607")) {
                    _setearAtributoDisabled(true, "865");
                    _setearBoleanValueRadio("865", 0, false);
                    _setearBoleanValueRadio("865", 1, false);
                } else if (_obtenerBooleanValueRadio("865", 0)) {
                    comunIntegrador.setValue(_obtenerCasilla("380"), "0");
                    _setearAtributoDisabled(true, "380");
                } else if (_obtenerBooleanValueRadio("865", 1)) {
                    _setearAtributoDisabled(false, "380");
                    if (coeficienteRenta != null) {
                        $('#casilla891').val(coeficienteRenta.ingCalc);
                        $('#casilla892').val(coeficienteRenta.ingNetos);
                        comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRenta.coeficiente);
                    }
                }
                break;
        }
        if (!_codigoRegimenSeleccionado() == "031201" && !_esDisabled("0001")) {
            _funcionalidad_Casilla312();
        }
    };
    _reglaGeneralValidacionManual380 = function (periodo, coeficienteRent) {
        try {
            switch (periodo) {
                case "02":
                case "03":
                case "04":
                case "05":
                case "06":
                case "07":
                    if (_obtenerBooleanValueRadio("361", 0)) {
                        _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                        comunIntegrador.setValue(_obtenerCasilla("380"), "0");
                        _setearAtributoDisabled(true, "380");
                        if (coeficienteRent != null) {
                            comunIntegrador.setValue(_obtenerCasilla("362"), coeficienteRent.numRI);
                            //console.log(":::::: fecha: " + coeficienteRent.fecNotif);
                            if (coeficienteRent.fecNotif != null) {
                                _setearValorCasilla("363", moment(coeficienteRent.fecNotif).format('DD/MM/YYYY'));
                            }
                        }
                        _setearAtributoDisabled(false, "364");

                    } else if (_obtenerBooleanValueRadio("361", 1) && _esDisabled("839")) {
                        _estadoElementosResolucionAprobada(_obtenerBooleanValueRadio("361", 0));
                        _setearAtributoDisabled(false, "380");
                        _setearValorCasilla("380", "");
                        if (coeficienteRent != null) {
                            comunIntegrador.setValue(_obtenerCasilla("380"), coeficienteRent.coeficiente);
                            comunIntegrador.setValue(_obtenerCasilla("891"), coeficienteRent.ingCalc);
                            comunIntegrador.setValue(_obtenerCasilla("892"), coeficienteRent.ingNetos);
                        }
                    }
                    break;
            }
        } catch (err) {
            //console.log(err.message);
        }
    };
    _estadoCasillasSegunRegimenEspecial = function (estado) {
        _setearAtributoDisabled(estado, "380");
        comunIntegrador.setValue(_obtenerCasilla("380"), "0");
        _setearAtributoDisabled(estado, "865");
        _setearAtributoDisabled(estado, "607");
        _setearAtributoDisabled(estado, "839");
        _setearAtributoDisabled(estado, "362");
        _setearAtributoDisabled(estado, "363");
        _setearAtributoDisabled(estado, "364");
        _setearAtributoDisabled(estado, "361");

    };
    _obtenervalidarcambioregimen = function (numRuc, periodo, regimen) {
        var parametros = numRuc + "/" + periodo + "/" + regimen;
        return comunServiciosControlador.ObtenerValidarcambioregimen(parametros);
    };
    _obtenerFocoRadioTabRenta = function (elemen) {
        var casilla = $(elemen).attr("data-casilla");

        if (_obtenerBooleanValueRadio(casilla, 0)) {
            _setearBoleanValueRadio(casilla, 1, true);
        } else if (_obtenerBooleanValueRadio(casilla, 1)) {
            _setearBoleanValueRadio(casilla, 0, true);
        }

        /* else if (_obtenerBooleanValueRadio(casilla, 0)) {
         _setearBoleanValueRadio(casilla, 1, true);
         } else if (_obtenerBooleanValueRadio(casilla, 1)) {
         _setearBoleanValueRadio(casilla, 0, true);
         } else if (_obtenerBooleanValueRadio(casilla, 0)) {
         _setearBoleanValueRadio(casilla, 1, true);
         } else if (_obtenerBooleanValueRadio(casilla, 1)) {
         _setearBoleanValueRadio(casilla, 0, true);
         } else if (_obtenerBooleanValueRadio(casilla, 0)) {
         _setearBoleanValueRadio(casilla, 1, true);
         } else if (_obtenerBooleanValueRadio(casilla, 1)) {
         _setearBoleanValueRadio(casilla, 0, true);
         }*/

    };
    _estadoElementosResolucionAprobada = function (habilitar) {
        _setearAtributoDisabled(!habilitar, "362");
        _setearAtributoDisabled(!habilitar, "363");
        _setearAtributoDisabled(!habilitar, "364");

        if (habilitar) {
            _quitarAtributo("362", "readonly");
            _quitarAtributo("363", "readonly");
            _quitarAtributo("364", "readonly");
        }
        if (!habilitar) {
            _setearValorCasilla("362", "");
            _setearValorCasilla("363", "");
            _setearValorCasilla("364", "");
        }
    };
    _funcionalidad_casilla315 = function () {
        _setearPorcentajeRenta();
        var codRegimen = _codigoRegimenSeleccionado();
        _setearAtributoDisabled(true, '315');
        _setearAtributoReadOnly(true, '315');
        if (codRegimen == '030301'//REGIMEN GENERAL
            || codRegimen == '033101'//REGIMEN AGRARIO
            || codRegimen == '034101'//REGIMEN AMAZONIA
            || codRegimen == '030301C'//CONVENIO DE ESTABILIDAD
            || (_ingresosAcumuladosEsMayorA300uit() && _verificarRadioButtonRentaSeleccionado('031201'))) {//REGIMEN MYPE
            _setearAtributoDisabled(false, '315');
            _setearAtributoReadOnly(false, '315');
            _setearAtributoRequired('315');

        } else {
            _quitarAtributo('315', 'required');
        }

        //console.log("=========_funcionalidad_casilla315 ===== " + codRegimen);
        if (codRegimen == '031101') {//REGIMEN ESPECIAL
            _setearAtributoDisabled(true, '315');
            _quitarAtributo('315', 'required');
        }
    };

    _setearPorcentajeRenta = function () {
        //console.log("============SETEANDO PORCENTAJE DE RENTA========");
        var periodo = _obtenerValorCasilla("7");
        var codTributo = _codigoRegimenSeleccionado();

        try {
            var PorcentajeRentaTributo = formulario0621.obtenerPorcentajeRentaTributo(periodo, codTributo);
            if (PorcentajeRentaTributo.resultado == null) {
                comunIntegrador.setValue(_obtenerCasilla("315"), "0");
            } else {
                comunIntegrador.setValue(_obtenerCasilla("315"), PorcentajeRentaTributo.resultado);
            }
        } catch (err) {
            comunIntegrador.setValue(_obtenerCasilla("315"), "0");
        }
    };
    _funcionalidad_Casilla312 = function () {
        try {
            var periodo = comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7"));
            var periodo_MES = parseInt(periodo.substring(4, 6));

            var valorMax = 0;
            var valorCasilla301 = 0;
            var valorCasilla380 = 0;
            var valorCasilla315 = 0;

            if (_obtenerValorCasilla("301") != null && _obtenerValorCasilla("301") != "") {
                valorCasilla301 = parseFloat(_obtenerValorCasilla("301"));
            }
            if (_obtenerValorCasilla("380") != null && _obtenerValorCasilla("380") != "") {
                valorCasilla380 = parseFloat(_obtenerValorCasilla("380"));
            }
            if (_obtenerValorCasilla("315") != null && _obtenerValorCasilla("315") != "") {
                valorCasilla315 = parseFloat(_obtenerValorCasilla("315"));
            }

            var val315 = Math.round(valorCasilla315 / 100);

            valorMax = Math.max(val315, valorCasilla380);

            var codigoRegimenSeleccionado = _codigoRegimenSeleccionado();


            //Es una casilla no editable. Sin embargo, es editable al seleccionar Régimen de Renta con Convenio de Estabilidad 
            var radioGroup = radioGroup = $('input:radio[data-' + _obtenerNivelDeclaracion() + 'casilla="861"]:checked').val();

//            if (codigoRegimenSeleccionado == "030301" && radioGroup == "4") {//Con convenio de Estabilidad - Pagos a cuenta de Renta
//                $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="312"]').attr("readonly", false);
//            } else {
//                $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="312"]').attr("readonly", true);
//            }

            if (codigoRegimenSeleccionado == "031101") {//Regimen Especial
                comunIntegrador.setValue(_obtenerCasilla("312"), (valorCasilla301 * 0.015));
            }

            if (codigoRegimenSeleccionado == '031201') { //Regimen MYPE
                if (_ingresosAcumuladosEsMenorOigualA300uit()) {
                    comunIntegrador.setValue(_obtenerCasilla(312), (valorCasilla301 * tasaMyPE));
//                    _setearValorCasilla('312', (valorCasilla301 * tasaMyPE));//TAZA MYPE
                    //console.log("=====periodo_MES====> " + periodo_MES);
                    if (periodo_MES == 8 /*&& periodo_MES <= 12*/) {
                        //console.log("=========periodo_MES 1=====> ");
                        if (_obtenerNivelDeclaracion() == "s-") {
                            $('#lbl_839s').text('31 de julio ');
                        } else {
                            $('#lbl_839c').text(' 31 de julio ');
                        }
                        //console.log("=========periodo_MES 2=====> ");

                        var coeficiente;
//                        //console.log("====coeficienteRenta.resultado=======> " + coeficienteRentaService.resultado);
                        _setearAtributoDisabled(false, '0001');

                        var coeficienteRenta = _obtenerCoeficienteRenta(periodo, codigoRegimenSeleccionado);
                        if (coeficienteRenta != "" && coeficienteRenta != null && coeficienteRenta.resultado != null) {
                            var coeficiente = coeficienteRenta.resultado;
                            if (coeficiente.FORMULARIO625) {
                                _setearBoleanValueRadio('0001', 0, true);
                                if (_ingresosAcumuladosEsMenorOigualA300uit()) {
                                    _setearValorCasilla('312', '0');
                                }
                            } else {
                                _setearBoleanValueRadio('0001', 1, true);
                            }
                        } else {
                            _setearBoleanValueRadio('0001', 1);
                        }
                    }
                }
            }

            if (codigoRegimenSeleccionado == "030301" /*General*/
                || codigoRegimenSeleccionado == "034101" /*Amazonia*/
                || codigoRegimenSeleccionado == "033101" /**Agraria/Agricultura*/
                || (codigoRegimenSeleccionado == '031201' && !_ingresosAcumuladosEsMenorOigualA300uit())) {

                if (periodo_MES == 1) {//ENERO
                    comunIntegrador.setValue(_obtenerCasilla("312"), (valorCasilla301 * valorMax));
                } else if (periodo_MES >= 2 && periodo_MES <= 4) {//FEBRERO MARZO ABRIL

                    //¿Cuenta con una Resolución aprobada y notificada de suspensión de pagos o cuenta? 1:NO
                    if (_obtenerBooleanValueRadio("361", 1)) {
                        comunIntegrador.setValue(_obtenerCasilla("312"), (valorCasilla301 * valorMax));
                        //¿Cuenta con una Resolución aprobada y notificada de suspensión de pagos o cuenta? 0:SI
                    } else if (_obtenerBooleanValueRadio("361", 0)) {
                        comunIntegrador.setValue(_obtenerCasilla("312"), "0");
                    }
                    //Nota: Se borró el else  

                } else if (periodo_MES >= 5 && periodo_MES <= 7) {//MAYO JUNIO JULIO

                    //¿Cuenta con una Resolución aprobada y notificada de suspensión de pagos o cuenta? 0:SI
                    if (_obtenerBooleanValueRadio("361", 0)) {
                        comunIntegrador.setValue(_obtenerCasilla("312"), "0");
                        //¿Cuenta con una Resolución aprobada y notificada de suspensión de pagos o cuenta? 1:NO
                        //¿Ha presentado un Formulario PDT 625 con estado de Ganacias y Pérdidas actualizada al 30 de abril de este ejercicio? 1:NO
                    } else if (_obtenerBooleanValueRadio("361", 1) && _obtenerBooleanValueRadio("839", 1)) {
                        comunIntegrador.setValue(_obtenerCasilla("312"), (valorCasilla301 * valorMax));

                        //¿Cuenta con una Resolución aprobada y notificada de suspensión de pagos o cuenta? 1:NO
                        //¿Ha presentado un Formulario PDT 625 con estado de Ganacias y Pérdidas actualizada al 30 de abril de este ejercicio? 0:SI
                    } else if (_obtenerBooleanValueRadio("361", 1) && _obtenerBooleanValueRadio("839", 0)) {
                        comunIntegrador.setValue(_obtenerCasilla("312"), (valorCasilla301 * valorCasilla380));
                    }
                    //Nota: Se borró el else 

                } else if (periodo_MES >= 8 && periodo_MES <= 12) {//AGOSTO SETIEMBRE OCTUBRE NOVIEMBRE DICIEMBRE
                    //¿Ha presentado un Formulario PDT 625 con estado de Ganacias y Pérdidas actualizada al 31 de julio de este ejercicio? 1:NO
                    if (_obtenerBooleanValueRadio("839", 1)) {
                        comunIntegrador.setValue(_obtenerCasilla("312"), (valorCasilla301 * valorMax));
                        //¿Ha presentado un Formulario PDT 625 con estado de Ganacias y Pérdidas actualizada al 31 de julio de este ejercicio? 0:SI
                        //¿Suspendió sus pagos o cuentas hasta el mes de julio de acuerdo con el acópite del Articulo 85ºde la LIR? 1:NO
                    } else if (_obtenerBooleanValueRadio("839", 0) && _obtenerBooleanValueRadio("607", 1)) {
                        comunIntegrador.setValue(_obtenerCasilla("312"), (valorCasilla301 * valorCasilla380));
                        //¿Ha presentado un Formulario PDT 625 con estado de Ganacias y Pérdidas actualizada al 31 de julio de este ejercicio? 0:SI
                        //¿Suspendió sus pagos o cuentas hasta el mes de julio de acuerdo con el acópite del Articulo 85ºde la LIR? 0:SI
                        //¿El coeficiente del PDT 625 con Estado de Ganancias y Pérdidas al 31 de julio es menor al limite previsto en la tabla II de Acópite del Articulo 85º de la LIR, correspondiente al mes en que afectuó la suspensión? 1:NO
                    } else if (_obtenerBooleanValueRadio("839", 0) == true && _obtenerBooleanValueRadio("607", 0) == true
                        && _obtenerBooleanValueRadio("865", 1) == true) {
                        comunIntegrador.setValue(_obtenerCasilla("312"), (valorCasilla301 * valorCasilla380));
                        //¿Ha presentado un Formulario PDT 625 con estado de Ganacias y Pérdidas actualizada al 31 de julio de este ejercicio? 0:SI
                        //¿Suspendió sus pagos o cuentas hasta el mes de julio de acuerdo con el acópite del Articulo 85ºde la LIR? 0:SI
                        //¿El coeficiente del PDT 625 con Estado de Ganancias y Pérdidas al 31 de julio es menor al limite previsto en la tabla II de Acópite del Articulo 85º de la LIR, correspondiente al mes en que afectuó la suspensión? 0:SI
                    } else if (_obtenerBooleanValueRadio("839", 0) == true && _obtenerBooleanValueRadio("607", 0) == true
                        && _obtenerBooleanValueRadio("865", 0) == true) {
                        comunIntegrador.setValue(_obtenerCasilla("312"), "0");
                    }
                    //Nota: se elimino el ultimo else

                }
            }

            //Régimen Especial de Renta (tener en cuenta que para este casos la C380 y C315 se deshabilitan)
//            if (codTributo == '031101') {//regimen especial
//                $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="315"]').attr("readonly", true);
//                $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="380"]').attr("readonly", true);
//            }


        } catch (err) {
            ////console.log('Error no se puede calcular casilla 312');
        }

    };
    _funcionalidad_casilla301 = function () {


        var periodo = comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7"));
        var periodoMes = parseInt(periodo.substring(4, 6));


        var periodo = comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7"));
        var codRegimen = _codigoRegimenSeleccionado();
        if (codRegimen == '031201') {
            if (_ingresosAcumuladosEsMayorA300uitYmenorIguala1700uit()) {
                _mensajeAceptar301();
            } else if (_ingresosAcumuladosEsMayorA1700uit()) {
                _mensajeAceptarCancelar301();
            }

            if (_ingresosAcumuladosEsMenorOigualA300uit() && (periodoMes >= 8 && periodoMes <= 12)) {
                var coeficienterenta = null;
                var coeficienteRenta = _obtenerCoeficienteRenta(periodo, codRegimen);
                if (coeficienteRenta != "" && coeficienteRenta != null && coeficienteRenta.resultado != null) {
                    coeficienterenta = coeficienteRenta.resultado;
                    if (coeficienterenta.FORMULARIO625) {
                        _mostrarMensajeGeneral(comunMensajes.getMensaje("MENSAJE_PRESENTACION_FORMULARIO_625_SUSPENSION_PAGO", ""));
                    }
                }
            }
        }

    };

    _funcionalidad_validar_Renta = function () {
        var mesPeriodo = _obtenerValorCasilla("7").substring(0, 2);
        var flag = "1";

        if (mesPeriodo == "02" || mesPeriodo == "03" || mesPeriodo == "04" || mesPeriodo == "05" || mesPeriodo == "06" || mesPeriodo == "07") {
            if (_obtenerBooleanValueRadio("361", 0) == true &&
                ($('*[data-' + _obtenerNivelDeclaracion() + 'casilla="362"]').val() == "" ||
                $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="363"]').val() == null ||
                $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="363"]').val() == "" ||
                $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="364"]').val() == "")

            ) {
                formulario0621.mostrarMensajeGeneral("Sr. Contribuyente, el ingreso de los datos de la RI, Fecha de Notificación y coeficiente con el cual la SUNAT le aprobó la solicitud de suspensión de pagos son obligatorios");

                flag = "0";
            }
        }

        return flag;
    };

    _funcionalidad_validar_364 = function () {

        var periodo = comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7"));
        var periodo_MES = parseInt(periodo.substring(4, 6));
        var val_364 = parseFloat(_obtenerValorCasilla('364'));

        var flag = "1";

        if (_obtenerBooleanValueRadio("361", 0) == true) {

            if (periodo_MES == 2) {
                if (!(val_364 >= 0.0001 && val_364 <= 0.0013)) {
                    formulario0621.mostrarMensajeGeneral("Este campo Coeficiente Sunat no permite el registro de un valor menor a 0.0001 ni mayor a 0.0013");
                    _setearValorCasilla("364", "");
                    flag = "0";
                }

            } else if (periodo_MES == 3) {
                if (!(val_364 >= 0.0001 && val_364 <= 0.0025)) {
                    formulario0621.mostrarMensajeGeneral("Este campo Coeficiente Sunat no permite el registro de un valor menor a 0.0001 ni mayor a 0.0025");
                    _setearValorCasilla("364", "");
                    flag = "0";
                }


            } else if (periodo_MES == 4) {
                if (!(val_364 >= 0.0001 && val_364 <= 0.0038)) {
                    formulario0621.mostrarMensajeGeneral("Este campo Coeficiente Sunat no permite el registro de un valor menor a 0.0001 ni mayor a 0.0038");
                    _setearValorCasilla("364", "");
                    flag = "0";
                }


            } else if (periodo_MES == 5 || periodo_MES == 6 || periodo_MES == 7) {
                if (!(val_364 >= 0.0001 && val_364 <= 0.0050)) {
                    formulario0621.mostrarMensajeGeneral("Este campo no permite el registro de un valor menor a 0.0001 ni mayor a 0.0050");
                    _setearValorCasilla("364", "");
                    flag = "0";
                }
            }
        }
        return flag;
    };
    _obtenerIndicadorTipoMoneda = function () {
        if (indicadorTipoMonedaService === "" || indicadorTipoMonedaService === null) {
            indicadorTipoMonedaService = localStorage.getItem("IndicadorTipoMoneda");
        }
        return JSON.parse(indicadorTipoMonedaService);
    };
    _tieneResumencasilla = function () {
        return tieneResumenCasilla;
    };
    _tipoResumenCasilla = function () {
        return indicadorTipoResumenCasilla;
    };

    _obtenerInteresMoratorio = function (importe, tributo) {
        console.log("\n\n\n-........................");
        if (formulario0621.getTasaInteresMoratorio() !== null) {
            var fechasVencimiento = _obtenerFecVenByTributo();
            if (fechasVencimiento !== null) {
                var saldoDeuda = importe;
                var fecVenc = fechasVencimiento[tributo];//= fechasVencimiento[0];

                console.log('######### saldoDeuda: ' + saldoDeuda);
                console.log('######### fecVenc: ' + fecVenc);
                /*
                 $.each(fechasVencimiento, function (k, v) {
                 if (fecVenc === null) {
                 fecVenc = v[tributo];
                 }
                 });*/
                var fecIni = new Date(fecVenc);
                var fecInicioCalc = fecIni.setDate(fecIni.getDate() + 1);
                // var fecInicioCalc = fecIni.setMonth(fecIni.getMonth() + 1);

                console.log('######### fecInicioCalc : ' + fecInicioCalc);

                var dataJsonss = $.parseJSON(sessionStorage.getItem("fecha_hora"));
                var fecHasta = new Date(dataJsonss.fecha);

                console.log('######### fecHasta : ' + fecHasta);

                if (fecHasta < fecInicioCalc) {
//                    //console.log('######### fecHasta < fecInicioCalc : ');
                    return 0;
                }

                var sumaPP = 0;
                var listPagosPrevio = [];
                console.log("###### pagos previos: ");
                console.log(formulario0621.getPagosPreviosList());
                console.log(datoperiodobean.listPagosPrevios);
                // if (formulario0621.getPagosPreviosList() != null && formulario0621.getPagosPreviosList()["resultado"] != null) {
                if (datoperiodobean != null && datoperiodobean.listPagosPrevios != null) {
                    // $.each(formulario0621.getPagosPreviosList()["resultado"], function (k, v) {
                    $.each(datoperiodobean.listPagosPrevios, function (k, v) {
                        console.log("tributo = " + k + " == " + tributo);
                        if (k == tributo) {
//                            //console.log("tributo====" + tributo);
//                            //console.log("######## VALOR DE v: " + v);
                            if (v != null) {
                                $.each(v, function (clave, valor) {
                                    // console.log("######## VALOR DE clave: " + clave);
                                    // console.log("######## VALOR DE valor: ");
                                    // console.log(valor);

                                    if (valor.indSel === true) {
//                                        //console.log("######## valor.crtImptri: " + valor.crtImptri);
//                                        //console.log("######## valor.crtImpint: " + valor.crtImpint);
                                        if (new Date(valor.crtFecpag) < (fecInicioCalc)) {
                                            sumaPP = sumaPP + valor.crtImptri + valor.crtImpint;
                                        }

                                        listPagosPrevio.push(valor);
                                    }
                                });
                            }
                        }
                    });
                }
                console.log("######## saldoDeuda: " + saldoDeuda);
                console.log("######## sumaPP: " + sumaPP);

                saldoDeuda = saldoDeuda - sumaPP;

                console.log("######## saldoDeuda: " + saldoDeuda);
                if (saldoDeuda <= 0) {
                    return 0;
                }
                var tInteres = null;

                console.log("##### tasa de interes moratorio ");
                console.log(formulario0621.getTasaInteresMoratorio());

                $.each(formulario0621.getTasaInteresMoratorio(), function (k, valor) {
                    if (new Date(valor.tasFecini) < new Date(fecHasta)) {
                        tInteres = valor;
                    }
                });
                console.log("######## tInteres: ");
                console.log(tInteres);

                if (tInteres == null || tInteres.tasTim == null) {
                    //console.log("######## tInteres.tasTim: " + tInteres.tasTim);
                    tInteres = {};
                    tInteres["tasTim"] = 0;
                }
                var intAcumulado = 0;
                var nroDias;
                var intMoratorio;
                var valorInteresMoratorio = 0;
                console.log("::: pagos previos nuevo: " + (listPagosPrevio !== null && listPagosPrevio != []));
                console.log(listPagosPrevio);

                if (listPagosPrevio != null && listPagosPrevio.length > 0) {
                    var dias_calculados = 0;
                    var fechaVencimiento = new Date(fecInicioCalc);
                    $.each(listPagosPrevio, function (k, v) {

                        if (v.crtFecpag != null && (new Date(v.crtFecpag) > (fechaVencimiento) || new Date(v.crtFecpag) == fechaVencimiento)) {
                            console.log("######## v.crtFecpag: " + v.crtFecpag);


                            var fic = new Date(fecInicioCalc);
                            // fic.setDate(fic.getDate() + 1);
                            nroDias = _diferenciaDias(fic, v.crtFecpag);

                            dias_calculados = dias_calculados + nroDias;

                            // intMoratorio = Number(saldoDeuda * ((tInteres.tasTim / 3000.0)) * nroDias).toFixed(0);
                            intMoratorio = Number(saldoDeuda * ((tInteres.tasTim / 3000.0)) * nroDias).toFixed(0);

                            console.log("nroDias====" + nroDias);
                            console.log("intMoratorio====" + intMoratorio);
                            /*
                             if ((Number(v.crtImptri) + Number(v.crtImpint)) >= intMoratorio) {
                             intMoratorio = 0;
                             saldoDeuda = Number(saldoDeuda) - (Number(v.crtImptri) + Number(v.crtImpint));
                             console.log("saldoDeuda====" + saldoDeuda);
                             } else {*/
                            // intMoratorio = Number(intMoratorio) - (Number(v.crtImptri) + Number(v.crtImpint));
                            intAcumulado = Number(Number(intAcumulado) + Number(intMoratorio)).toFixed(0);

                            saldoDeuda = Number(saldoDeuda) - Math.abs((Number(v.crtImptri) + Number(v.crtImpint)) - Number(intMoratorio));

                            console.log("intMoratorio====" + intMoratorio);
                            console.log("intAcumulado====" + intAcumulado);
                            //  }
                            if (saldoDeuda <= 0) {
                                saldoDeuda = 0;
                                intMoratorio = 0;
                            }

                            fecInicioCalc = new Date(v.crtFecpag);
                        }
                    });

                    if (saldoDeuda > 0 && fecHasta > fecInicioCalc) {
                        console.log("saldoDeuda: " + saldoDeuda);
                        console.log("fecInicioCalc: " + fecInicioCalc);
                        console.log("fecHasta: " + fecHasta);

                        // fecInicioCalc = new Date(fecInicioCalc);
                        // fecInicioCalc.setMonth(fecInicioCalc.getMonth() + 1);
                        // fecInicioCalc.setDate(fecInicioCalc.getDate() + 1);

                        nroDias = _diferenciaDias(fecInicioCalc, fecHasta);
                        console.log("$$$$$$$$$$$ nroDias: " + nroDias);

                        intMoratorio = Number(saldoDeuda * (tInteres.tasTim / 3000.0) * nroDias).toFixed(0);
                        console.log("$$$$$$$$$$$ tInteres.tasTim : " + tInteres.tasTim);
                        intAcumulado = Number(Number(intAcumulado) + Number(intMoratorio)).toFixed(0);
                        console.log("$$$$$$$$$$$ intMoratorio: " + intMoratorio);
                        console.log("$$$$$$$$$$$ intAcumulado: " + intAcumulado);
                        //valorInteresMoratorio = intAcumulado - intMoratorio;

                        return intAcumulado;

                    }
                    return valorInteresMoratorio;

                } else {
//                    //console.log("listPagosPrevio == null && listPagosPrevio = []" );
//                     fecInicioCalc = new Date(fecInicioCalc);
                    // fecInicioCalc.setDate(fecInicioCalc.getDate() + 1);

                    nroDias = _diferenciaDias(fecInicioCalc, fecHasta);
                    console.log("....... numero de dias : " + nroDias);

                    intMoratorio = Number(saldoDeuda * (tInteres.tasTim / 3000.0) * nroDias).toFixed(0);
                    console.log("...... interes moratortio: " + intMoratorio);

                    intAcumulado = Number(Number(intAcumulado) + Number(intMoratorio)).toFixed(0);
                    console.log("...... intAcumulado: " + intAcumulado);

                    // valorInteresMoratorio = intAcumulado - intMoratorio;
                    return intAcumulado;
                    // console.log("$$$$$$$$$$$ valorInteresMoratorio: "+valorInteresMoratorio);
                    //  return valorInteresMoratorio;
                }


            }
        }
        return 0;
    };
    function _diferenciaDias(date1, date2) {
        var timeDiff = Math.abs(new Date(date2).getTime() - new Date(date1).getTime());
        return (Math.ceil(timeDiff / (1000 * 3600 * 24))) + 1;
    }

    _validarDeclaracionSeleccionada = function () {

        var CantidadDeclaracionesJuradas = datoperiodobean.cantidadDeclaracionesJuradas;
        try {
            if (!_esDisabled("895")) {
                var declaracionSeleccionada = _obtenerValorCasilla("895");

                if (declaracionSeleccionada == "Seleccionar") {
                    _setearValorCasilla("895", declaracionDeterminada);
                }

                if (CantidadDeclaracionesJuradas != null) {
                    var fechaactual = new Date();
                    var fechaPresentacion = moment(fechaactual).format('YYYY-MM-DD');

                    if (declaracionSeleccionada == enumTipoDeclara.SUSITUTORIA.name) {
                        if (fechaPresentacion < fechaVencimientoPeriodo || fechaPresentacion == fechaVencimientoPeriodo) {
                            _cambiarTextoLabelSeccionRenta("Afectación / Régimen de Renta / Tributos a Sustituir-Rectificar");
                            _mostrarMensajeINF008_INF007(comunMensajes.getMensaje("INF008"), "");
                            casillasInternasBean.casilla_inter_005 = 1;
                            _quitarAtributo("861", "checked");
                            _quitarAtributo("867", "checked");
                            _quitarAtributo("887", "checked");
                            _limpiarTextInput();
                        } else {
                            _setearValorCasilla("895", declaracionDeterminada);
                            _mostrarMensajeGeneral(comunMensajes.getMensaje("DECLAFECHMAYOR", ""));
                        }
                    } else if (declaracionSeleccionada == enumTipoDeclara.RECTIFICATORIA.name) {

                        if (fechaPresentacion > fechaVencimientoPeriodo) {
                            _cambiarTextoLabelSeccionRenta("Afectación / Régimen de Renta / Tributos a Sustituir-Rectificar")
                            _mostrarMensajeINF008_INF007(comunMensajes.getMensaje("INF008"), "");
                            casillasInternasBean.casilla_inter_005 = 1;
                            _quitarAtributo("861", "checked");
                            _quitarAtributo("867", "checked");
                            _quitarAtributo("887", "checked");
                            _limpiarTextInput();
                        } else {
                            _setearValorCasilla("895", declaracionDeterminada);
                            _mostrarMensajeGeneral(comunMensajes.getMensaje("DECLAFECHMENOR", ""));
                        }
                    } else if (declaracionSeleccionada == enumTipoDeclara.ORIGINAL.name) {
                        _mostrarMensajeINF008_INF007(comunMensajes.getMensaje("INF007"));
                        _setearBoleanValueRadio("887", 0, true);
                        var periodo = comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7"));
                        var dataResumenCasilla = _obtenerResumenCasillasLE(comunLibreria.formatearPeriodoaCadena(periodo));
                        if (dataResumenCasilla != null && dataResumenCasilla.resultado != null) {
                            tieneResumenCasilla = true;
                            indicadorTipoResumenCasilla = dataResumenCasilla.resultado.indLibro;
                            pintarResumenCasillas(dataResumenCasilla);
                        }


                    }
                }
            }
        } catch (err) {
            //console.log(err.message);
        }


    };
    _modificacionAfectacionRegimenRenta = function () {
//        ////console.log(">>>>>> ENTRANDO _modificacionAfectacionRegimenRenta");
        if (_validarButtonGroupRadios(861)) {
            coeficienteRentaService = null;
            PorcentajeRentaTributo = null;
            countTabRenta = 0;

            var codRegimen = _codigoRegimenSeleccionado();

            _setearValorCasilla('380', '');
            _setearValorCasilla('301', '');
            _setearValorCasilla('312', '');
            _setearValorCasilla('315', '');

            if (codRegimen == '030301C') {
                _setearAtributoDisabled(false, '312');
                _setearAtributoReadOnly(false, '312');
            } else {
                _setearAtributoDisabled(true, '312');
            }
//            //console.log("============0===========");
            _quitarRequeridoC380(codRegimen);
//            //console.log("============0.1===========");
            if (_tieneResumencasilla()) {
//                //console.log("============0.2=========== " + _obtenerValorCasilla("895"));
//                //console.log("============0.3=========== " + enumTipoDeclara.ORIGINAL.name);

                if (_obtenerValorCasilla("895") == enumTipoDeclara.ORIGINAL.name/* &&
                 _tipoResumenCasilla() == "1"*/) {
                    _setearAtributoDisabled(false, "340");
                    _setearAtributoDisabled(false, "341");
                    _setearAtributoDisabled(false, "182");
                    _setearAtributoDisabled(false, "353");
                    _setearAtributoDisabled(false, "351");
                    _setearAtributoDisabled(false, "352");
                    _setearAtributoDisabled(false, "347");
                    _setearAtributoDisabled(false, "342");
                    _setearAtributoDisabled(false, "343");

//                //console.log("============0.4=========== " +!(codRegimen == "030301C"));


                    if (!(codRegimen == "030301C")) {// ES DIFERENTE DE CONVENIO DE ESTABILIDAD
//                        //console.log("============1===========");
                        if (_tieneRegimenRenta()) {
//                            //console.log("============2===========");
                            var result = _obtenervalidarcambioregimen(usuarioBean.numRUC, comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7")), codRegimen);
//                            //console.log("============3=========== " + result);
                            if (!_verificarTributoAfecto(codRegimen)) {
//                                //console.log("============4===========");
                                if (result != "" && result != null) {
                                    //console.log("== CODIGO DE AUTORIZACION SUNAT === " + result.cod);
                                    if (result.cod == "01") {//SE VALIDA QUE NO TENGA PERMISOS DE SUNAT
//                                        $(elemen).removeAttr("checked");
                                        _setearAtributoDisabledSelectedRadioButtonRenta(codRegimen, false, false);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        _validacionMype();

    };
    _tieneRegimenRenta = function () {
        var tieneregimen = false;
        if (_verificarTributoAfecto("033101") || _verificarTributoAfecto("034101")
            || _verificarTributoAfecto("031101") || _verificarTributoAfecto("030301")) {
            tieneregimen = true;
        }
        return tieneregimen;
    };

    _NO_copy_cut_past = function () {
        //$(':input').bind("cut copy paste", function (e) {
        $(':input').bind("paste", function (e) {
            e.preventDefault();
            $(this).val("");
            //console.log('######### no cut copy paste');
        });
    };

    function _fechaLocalYYYMM() {
        var fecha_hora = sessionStorage.getItem("fecha_hora");
        if (fecha_hora != "" && fecha_hora != null) {
            var dataJsonss = JSON.parse(fecha_hora);
            var hoy = new Date(dataJsonss.fecha);


            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1; //hoy es 0!
            var yyyy = hoy.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }

            hoy = yyyy + mm;
        }

        return hoy;
    }

    function _mostrarMensajeGeneral(mensaje) {
        $("span.titleMensajeGeneral").text(mensaje);
        $('#modalMensajeGeneral').modal('show');
    }
    ;

    _obtenerPadronParametroCodTipCas = function (codigoFormulario, numCas) {
//        //console.log("padron parametro.................... numcas: " + numCas + " -- " + codigoFormulario);
        var res = null;
        if (padronParametro != null && padronParametro.length > 0) {
            $.each(padronParametro, function (k, v) {
                try {
                    if (v.t01Numero == "140"
                        && v.t01Tipo == 'D'
                        && v.t01Argumento.substring(0, 4) == codigoFormulario
                        && Number(v.t01Argumento.substring(4, 7)) == Number(numCas)
                        && res == null) {
//                        //console.log(v);
                        res = v.t01Funcion.substring(9, 11);
                        return false;
                    }
                } catch (error) {
                }
            });
        }
//        //console.log("::::::::::::::::::: ressss" + res);
        return res;
    };
    return {
        obtenerPadronParametroCodTipCas: function (codigoFormulario, numCas) {
            return _obtenerPadronParametroCodTipCas(codigoFormulario, numCas);
        },
        obtenerPadronParametro: function () {
            return padronParametro;
        },
        setPadronParametro: function (padPar) {
            padronParametro = padPar;
        },
        obtenerDefinicionCasilla: function () {
            return definicionCasilla;
        },
        setDefincionCasilla: function (defcas) {
            definicionCasilla = defcas;
        },
        myIntegrador: comunIntegrador,
        obtenerTamanioContribuyente: function () {
            return _obtenerTamanioContribuyente();
        },
        obtenerCasillasInternas: function () {
            return casillasInternasBean;
        },
        obtenerCasillasInternasPrincipal: function () {
            return casillasInternas;
        },
        obtenerDatosPeriodoBean: function () {
            return datoperiodobean;
        },
        setDatosPeriodoBean: function (datos) {
            datoperiodobean = datos;
        },
        obtenerFechaVencimientoPeriodo: function () {
            return fechaVencimientoPeriodo;
        },
        setFechaVencimientoPeriodo: function (fecha) {
            fechaVencimientoPeriodo = fecha;
        },
//        obtenerFechaVencimiento: function (perTri, codTri) {
//            return _obtenerFechaVencimiento(perTri, codTri);
//        },
        calcularAcogimientoProrrogaPago: function () {
            /* {"ind_afe_IVAP":1,"ind_afe_IGV":1,"Ind_afe_MYPE":1} */
            if (_obtenerValorCasilla("895") == enumTipoDeclara.ORIGINAL.name) {
                var afectacionTributos = datoperiodobean.afectacionesTributos;//this.obtenerDatosPeriodoBean["afectacionesTributos"];

                console.log("::::::::afectacionTributos " + fechaVencimientoPeriodo);
                console.log(afectacionTributos);

                if (afectacionTributos != null) {

                    if (afectacionTributos["ind_afe_IGV"] == 1) {

                        var seleccionIgv = _obtenerBooleanValueRadio("887", 0);

                        if (seleccionIgv) {

                            document.getElementById("casilla391_si").checked = false;
                            document.getElementById("casilla391_no").checked = false;
                            var fechaactual = new Date();
                            var fechaPresentacion = moment(fechaactual).format('YYYY-MM-DD');

                            if (fechaPresentacion < fechaVencimientoPeriodo && _obtenerValorCasilla(188) > _obtenerValorCasilla(189)) {
                                $("#casilla391_si").attr("disabled", false);
                                $("#casilla391_no").attr("disabled", false);
                            } else {
                                $("#casilla391_si").attr("disabled", true);
                                $("#casilla391_no").attr("disabled", true);
                            }

                        }
                    }
                }
            }

        },
        limpiarFormularioPreliminal: function () {
            datoperiodobean.limpiarFormularioPreliminal = null;
        },
        getFormularioPreliminal: function () {
            if (datoperiodobean != null && datoperiodobean.recuperar_preliminal != null) {
                return datoperiodobean.recuperar_preliminal;
            }
            return null;
        },
        actualizarPagosPrevios: function (codTributo, listCrtNumRec) {
            _actualizarPagosPrevios(codTributo, listCrtNumRec);
        },
        validarMayor: function (actual, maximo) {
            if (actual > maximo) {
                return maximo;
            }
            if (actual < 0 || actual == null || actual == "") {
                return 0;
            }
            return actual;
        },
        getPagosPreviosList: function () {
            return pagosPrevios;
        },
        getTasaInteresMoratorio: function () {
            return tasaInteresMoratorio;
        },
        setTasaInteresMoratorio: function (tim) {
            tasaInteresMoratorio = tim;
        },
        setDetalleParametros: function (par) {
            detalleParametros = par;
        },
        getDetalleParametros: function () {
            return detalleParametros;
        },
        verificarCasillaTasaVariable: function (casilla) {
            console.log("... verificarCasillaTasaVariable... casilla: "+casilla);
            console.log("detalleParametros:: " + detalleParametros);

            var res = null;
            var casillaPk = null;
            $.each(detalleParametros["resultado"]["t7792paramdetaList"], function (k, v) {
                var pk = v["t7792paramdetaPK"];
                // console.log("*************OKKKKKKKKKKKKKKKK***********");
                // console.log(JSON.stringify(v));
                casillaPk = pk["codParam"].substring(4, 7);
                // console.log('###### casilla: ' + casilla);


                if (pk["codTabla"] == "1131" && pk["codParam"].substr(4, 3) == casilla) {

//                    console.log("*****************");
//                    console.log(JSON.stringify(pk));
                    var fechaInicio = pk["codParam"].substr(7, 6);
                    var fechaFin = v["valParam"].substr(1, 6);
                    // console.log(":::CASILLA:: " + casilla);
                    // console.log("::::FECHA DE INICIO:::" + fechaInicio + "::");
                    // console.log("::::FECHA FIN:::" + fechaFin + ":::");
                    var periodoSeleccionado = comunLibreria.formatearPeriodoaCadena(_obtenerValorCasilla("7"));

                    if (periodoSeleccionado <= fechaFin && periodoSeleccionado >= fechaInicio) {
                        // console.log("::esta dentro del rango:::");
                        // console.log("::.periodoSeleccionado: " + periodoSeleccionado);
                        casillasTasaVariable.push(casilla);
//                        _setearAtributoReadOnly(false, casilla);
                        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casilla + '"]').attr("readonly", false);

//                        $('#casilla-s-108').attr('readonly', true);
//                        formulario0621.setearAtributoReadOnly(true, "108");
                        res = v;
                        console.log("xxxxx................entraa");
                        return false;
                    } else {
                        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casilla + '"]').attr("readonly", true);
//                        _setearAtributoReadOnly(true, casilla);
                    }
                }

                if (res != null && !formulario0621.esNivelSimplificado()) {
                    // console.log("null y es completa");
                    // console.log(":::casillaPk: " + casillaPk);
                    $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casillaPk + '"]').attr("readonly", false);

//                    formulario0621.setearAtributoReadOnly(false, casillaPk);
                    return false;
                } else if (res == null && _obtenerBooleanValueRadio("887", 1) == true) {
//                    console.log("null y 887 =1");
//                    console.log(":::casillaPk: " + casillaPk);
//                    formulario0621.setearAtributoReadOnly(false, casillaPk);
                    $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casillaPk + '"]').attr("readonly", false);

                    return false;
                }
            });
//            //console.log("\n");
            console.log("****************");
            console.log(":::res:: " + res);
            /*
             console.log( $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casilla + '"]'));
             $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casilla + '"]').attr("readonly", true);
             // $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casilla + '"]').prop("readonly");
             $('input[data-s-casilla="101"]').attr("readonly", true);
             console.log( $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casilla + '"]'));
             */
            return res;
        },
        calcularTasaVariable: function (casilla_tasa, casilla_base, expresion) {
            console.log("::::ENTRANDI TASA VARIABLES:::");
            console.log("CasillaTasa: " + casilla_tasa + " ... " + casilla_base);
            var paramDeta = formulario0621.verificarCasillaTasaVariable(casilla_tasa);
            console.log(":paramDeta:: " + paramDeta);
            ////console.log("::::: "+valorActual+" --- "+valorBase);

            if (_obtenerValorCasilla("7") != null && _obtenerValorCasilla("7") != "") {
                var fecha_periodo = moment(moment(comunLibreria.formatearYYYMMDD_SLASHtoMMYYYY(_obtenerValorCasilla("7")))).format('YYYY-MM-DD');
                var pk = paramDeta["t7792paramdetaPK"];

                var CodParam = pk["codParam"];
                var casilla = CodParam.substring(4, 7);
                //console.log('###### casilla: ' + casilla);

                var periodoCodParam = CodParam.substring(7, CodParam.length);
                var f_periodoCodParam = periodoCodParam.substring(4, 7) + "-" + periodoCodParam.substring(0, 4);
                var valParam = paramDeta["valParam"];
                var periodoValParam = valParam.substring(1, 7);
                var f_periodoValParam = periodoValParam.substring(4, 7) + "-" + periodoValParam.substring(0, 4);

                var iniVigencia = moment(moment(comunLibreria.formatearYYYMMDD_SLASHtoMMYYYY(f_periodoCodParam))).format('YYYY-MM-DD');
                var finVigencia = moment(moment(comunLibreria.formatearYYYMMDD_SLASHtoMMYYYY(f_periodoValParam))).format('YYYY-MM-DD');
//                    //console.log('####### casilla: '+pk["codParam"].substr(4, 3)+' periodoCodParam: '+periodoCodParam +'periodoValParam: '+periodoValParam);

                var controlUI = $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="' + casilla_tasa + '"]');
                var recalculaTotal = false;
                if ((paramDeta != null && fecha_periodo >= iniVigencia && fecha_periodo <= finVigencia)) {
                    var valorActual = _obtenerValorCasilla(casilla_tasa);
                    var valorBase = _obtenerValorCasilla(casilla_base);
                    var tasaMayor = (paramDeta["valParam"].split("|")[3] / 100) * valorBase;
                    var tasaMenor = (paramDeta["valParam"].split("|")[2] / 100) * valorBase;
                    if (valorActual < tasaMenor || valorActual > tasaMayor) {
                        _mostrarMensajeGeneral("Sr. Contribuyente, la casilla " + casilla_tasa
                            + " no puede ser menor a " + tasaMenor
                            + " o mayor a  " + tasaMayor);

//                        controlUI.val(comunIntegrador.obtenerValorCalculoExpresion621(expresion));
                        comunIntegrador.setValue(controlUI, comunIntegrador.obtenerValorCalculoExpresion621(expresion));

                        recalculaTotal = true;

                    }

                } else {

//                    controlUI.val(comunIntegrador.obtenerValorCalculoExpresion621(expresion));
                    comunIntegrador.setValue(controlUI, comunIntegrador.obtenerValorCalculoExpresion621(expresion));
                    recalculaTotal = true;
                }

                if (recalculaTotal) {
                    comunIntegrador.operarCasilla(131, -1);
                    comunIntegrador.operarCasilla(178, -1);
                }


            }

        },
        obtenerInteresMoratorio: function (importe, tributo) {
            return _obtenerInteresMoratorio(importe, tributo);
        },
        ubicarCasilla: function (casilla) {

            var parentName = "#casilla" + casilla;
            var elem = document.querySelector(parentName);

            var parents = comunLibreria.getParents(elem, '[data-sample]');
            if (parents != null) {
                for (i = 0; i < parents.length; ++i) {
                    setPanel(parents[i].id);
                }
                if (_esNivelSimplificado()) {
                    $('*[data-s-casilla="' + casilla + '"]').focus().select();
                } else {
                    $('*[data-casilla="' + casilla + '"]').focus().select();
                }
            }


        },
        muestraFormularioFrecuente: function () {
            _muestraFormularioFrecuente();
        },
        obtenerValorCasilla: function (numeroCasilla) {
            return _obtenerValorCasilla(numeroCasilla);
        },
        obtenerValorCasillaRadio: function (numeroCasilla) {
            return _obtenerValorCasillaRadio(numeroCasilla);
        },
        obtenerNivelDeclaracion: function () {
            return _obtenerNivelDeclaracion();
        },
        esNivelSimplificado: function () {
            return _esNivelSimplificado();
        },
        obtenerIdFormulario: function () {
            return m_idFormulario;
        },
        obtenerVersionFormulario: function () {
            return m_versionFormulario;
        },
        obtenerPeriodo: function () {
            _obtenerPeriodo();
        },
        validarFormulario: function () {
            var messagesArray = null;
            if (_esNivelSimplificado()) {
                messagesArray = this.myIntegrador.validarFormulario621Simplificado();
            } else {
//                //console.log("===mostrar_panel-error 3.1====");

                messagesArray = this.myIntegrador.validarFormularios();
            }
//            var extraMessages = _agregarValidaciones();
//            var newArray = messagesArray.concat(extraMessages);


//            return newArray;
            return messagesArray;
        },
        mostrarMensajeGeneral: function (mensaje) {
            $("button.btnAceptar").unbind('click');
            $("button.btnAceptar").on('click', function () {
                $("#modalMensajeGeneral").modal('hide');
            });

            $("span.titleMensajeGeneral").html(mensaje);
            $('#modalMensajeGeneral').modal('show');
            $("button.btnAceptar").text("Aceptar");
            $("#modalMensajeGeneral h4.modal-title").text("Validador del Formulario");
        },
        mostrarMensajeGeneralBoton: function (mensaje, titulo, nombreBoton) {
            $("button.btnAceptar").unbind('click');
            $("button.btnAceptar").on('click', function () {
                $("#modalMensajeGeneral").modal('hide');
            });

            $("span.titleMensajeGeneral").html(mensaje);
            $('#modalMensajeGeneral').modal('show');
            $("button.btnAceptar").text(nombreBoton);
            $("#modalMensajeGeneral h4.modal-title").text(titulo);
        },
        mostrarMensajeAceptar: function (mensaje, funcionAceptar) {
            $("button.btnAceptar").unbind('click');
            $("button.btnAceptar").on('click', function () {
                funcionAceptar.call();
                $("#modalMensajeGeneral").modal('hide');
            });

            $("span.titleMensajeGeneral").text(mensaje);
            $('#modalMensajeGeneral').modal('show');
        },
        mostrarMensajeAceptarCancelar: function (mensaje, funcionAceptar, funcionCancelar, textoButtonCancelar, textoButtonAceptar) {
            $("button.btnCancelarMensajeAceptarCancelar").unbind('click');
            $("button.btnAceptarMensajeAceptarCancelar").unbind('click');

            $("button.btnAceptarMensajeAceptarCancelar").on('click', function () {
                funcionAceptar.call();
                $('#modalMensajeAceptarCancelar').modal('hide');
            });
            $("button.btnCancelarMensajeAceptarCancelar").on('click', funcionCancelar);

            $("span.titleMensajeAceptarCancelar").text(mensaje);
            if (textoButtonCancelar != "" && textoButtonAceptar != "") {
                $("button.btnAceptarMensajeAceptarCancelar").text(textoButtonAceptar);
                $("button.btnCancelarMensajeAceptarCancelar").text(textoButtonCancelar);
            }

            $('#modalMensajeAceptarCancelar').modal('show');

        },
        obtenerPeriodoDinamico: function (periodo) {
            lista_trPeriodo.length = 0;

            var anio = periodo.substring(3, 7);
            var mes = periodo.substring(0, 2);

            var lista = [];
            var lista2 = [];
            var lista2_2 = [];
            var lista3 = [];

            for (var x = mes; x >= 1; x--) {
                lista.push(x);
            }

            for (var x = 0; x < lista.length; x++) {
                var m = lista[x].toString();
                if (m.length == 1) {
                    m = "0" + m;
                }
                lista3.push(m + "-" + anio);
            }

            if (mes != '12') {
                var mesc = Number(mes) + 1;

                for (var x = mesc; x <= 12; x++) {
                    lista2.push(x);
                }

                var anio2 = anio - 1;
                var lista2_2 = lista2.reverse();

                for (var x = 0; x < lista2_2.length; x++) {
                    var m = lista2_2[x].toString();
                    if (m.length == 1) {
                        m = "0" + m;
                    }
                    lista3.push(m + "-" + anio2);
                }

            }

            var x = 11;
            for (var y = 0; y < lista3.length; y++) {
                if (y == 0) {
                    $("#trperiodoDeclaracion").text(lista3[y]);
                } else if (y == 1) {
                    $("#trPeriodo12").text(lista3[y]);
                } else {
                    $("#trPeriodo" + x).text(lista3[y]);
                    x--;
                }

                var lis = lista3[y].split('-');
                lista_trPeriodo.push(lis[1] + "" + lis[0]);
            }
        },
        obtenerCoeficienteIGV: function (periodo) {
            return _obtenerCoeficienteIGV(periodo);
        },
        obtenerResumenCasillasLE: function (periodo) {

            return _obtenerResumenCasillasLE(periodo);
        },
        obtenerUbigeo: function () {
            return _obtenerUbigeo();
        },
        obtenerTasasVigentesPorTributo: function (ubigeo, periodo, codigoTributario) {
            if (ubigeo != "" && periodo != "" && codigoTributario != "") {
                if (tasasVigentes[codigoTributario] == null || tasasVigentes[codigoTributario]["resultado"] == null) {
                    var parametrosUrl = ubigeo + "/" + periodo + "/" + codigoTributario;
                    var data = comunServiciosControlador.obtenerTasasVigentesPorTributo(parametrosUrl);
                    tasasVigentes[codigoTributario] = data;
                }
                return tasasVigentes[codigoTributario];
            }
        },
        validarPeriodoSeleccionado: function (data, periodo) {
            return _validarPeriodoSeleccionado(data, periodo);
        },
        validarModificacionPeriodo: function (tipoDeclaracion, periodoSeleccionado, oldPeriodoSeleccionado) {
            return _validarModificacionPeriodo(tipoDeclaracion, periodoSeleccionado, oldPeriodoSeleccionado);
        },
        obtenerTipoDeclaracion: function (periodo, formulario, fecVencimiento) {
            return _obtenerTipoDeclaracion(periodo, formulario, fecVencimiento);
        },
        iniciarData_SeleccionFecha: function (oldPeriodo, data) {
            _iniciarData_SeleccionFecha(oldPeriodo, data);
        },
        obtenerCasilla: function (numcasilla) {
            return _obtenerCasilla(numcasilla);
        },
//        obtenerExportacionesEmbarcadas: function (periodo) {
//            return _obtenerExportacionesEmbarcadas(periodo);
//        },
//        obtenerSaldoFavor: function (periodo) {
//            if (listSaldoAfavor == null || listSaldoAfavor == "") {
//                listSaldoAfavor = _obtenerSaldoFavor(periodo);
//            }
//            return listSaldoAfavor;
//        },
        obtenerPagosPrevios: function (per_tri, codFormulario) {
            return _obtenerPagosPrevios(per_tri, codFormulario);
        },
        setVariablePagosPrevios: function (valor) {
            pagosPrevios = valor;
        },
        cargarPagosPreviosEnCasillas: function () {
            return _cargarPagosPreviosEnCasillas();
        },
        obtenerCoeficienteRenta: function (periodo, codTributo) {
            return _obtenerCoeficienteRenta(periodo, codTributo);
        },
        cargarAsistentePagosPrevios: function (casilla) {
            _cargarAsistentePagosPrevios(casilla);
        },
        setearCasilla: function (codTributo, valor) {
            _setearCasillaPagosPrevios(codTributo, valor);
        },
        validarSeleccionTab: function (tipoDeclaracion) {
            return _validarSeleccionTab(tipoDeclaracion);
        },
        accionesSegunRegimenRentaParaOSR: function () {
            return _accionesSegunRegimenRentaParaOSR();
        },
        obtenerPercepcionesMes: function (periodo) {
            return _obtenerPercepcionesMes(periodo);
        },
        obtenerRetencionesMes: function (periodo) {
            return _obtenerRetencionesMes(periodo);
        },
        cargarAsistenteRetenciones: function (dataRetenciones) {
            return _cargarAsistenteRetenciones(dataRetenciones);
        },
        cargarAsistentePersepciones: function (dataPersepciones) {
            return _cargarAsistentePersepciones(dataPersepciones);
        },
        determinarFormaDeclaracion: function (tipoDeclaracion, periodo, indicadorLE) {
            return _determinarFormaDeclaracion(tipoDeclaracion, periodo, indicadorLE);
        },
        calcularCasilla: function (codigoCasilla) {
            var montoCalc = 0;
            var controlUI = $('*[data-casilla="' + codigoCasilla + '"]');
            montoCalc = comunIntegrador.obtenerValorCalculoExpresion(controlUI[0].attributes["data-jsonCalculo"].value);
            if (montoCalc < 0) {
                montoCalc = 0;
            }
            controlUI.val(montoCalc);
        },
        validarObligatorios: function (messagesArray) {
//            //console.log("===mostrar_panel-error 2====");
            var pasoValidacion = false;
            if (messagesArray == null) {
//                //console.log("===mostrar_panel-error 3====");
                messagesArray = formulario0621.validarFormulario();
            }
//            //console.log("===mostrar_panel-error 4====");

            if (messagesArray.length > 0) {

//                //console.log("===mostrar_panel-error 5====");

                $("span.lista-errores-total").text(messagesArray.length);
                $('#lstErrores').empty();
                for (var i = 0; i < messagesArray.length; i++) {
//                    //console.log("===mostrar_panel-error 6====");

                    $('#lstErrores').append('<li class=\"list-group-item\"><div><span class=\"Errores glyphicon glyphicon-remove\"></span><a href=\"#\" target=\"_self\" onclick="formulario0621.ubicarCasilla(\'' + messagesArray[i] + '\');">Sr. Contribuyente, la casilla ' + messagesArray[i] + ' es de ingreso obligatoria, debe ingresarla antes de salir de la sección ' + '</a></div> </li>');
                }
                $("#panel_errores").removeClass("hidden");
                return;
            } else {
                $("span.lista-errores-total").text("0");
                $('#lstErrores').empty();
                $("#panel_errores").addClass("hidden");
                pasoValidacion = true;
                if ($("#Paso-form_06,#paso-simple-04").parents('li').is('.active')) {
                    if (formulario0621.esNivelSimplificado()) {
                        $("#btnAgregarBandejaSimplificado").removeAttr("disabled");
                    } else {
                        $("#btnAgregarBandejaCompleto").removeAttr("disabled");
                    }
                }

            }
            return pasoValidacion;
        },
        funcionalidad_Casilla380: function () {
            if (!formulario0621.editandoFormulario) {
                _funcionalidad_Casilla380();
            }
        },
        formaDeclaracionLista: function (periodoSeleccionado) {
            _formaDeclaracionLista(periodoSeleccionado);
        },
        codigoRegimenSeleccionado: function () {
            return _codigoRegimenSeleccionado();
        },
        validacionManualRadiosRenta: function () {
            _validacionManualRadiosRenta();
        },
        obtenerFocoRadioTabRenta: function (elemen) {
            _obtenerFocoRadioTabRenta(elemen);
        },
        obtenerIndicadorTipoMoneda: function () {
            return _obtenerIndicadorTipoMoneda();
        },
        obtenerListaCasillasSugeridas: function () {
            return m_casillasSugeridas;
        },
        setearValorCasilla: function (numcasilla, valor) {
            _setearValorCasilla(numcasilla, valor);
        },
        setearAtributoDisabled: function (disabled, numcasilla) {
            _setearAtributoDisabled(disabled, numcasilla);
        },
        setearAtributoReadOnly: function (disabled, numcasilla) {
            _setearAtributoReadOnly(disabled, numcasilla);
        },
        esDisabled: function (numcasilla) {
            return _esDisabled(numcasilla);
        },
        obtenerBooleanValueRadio: function (numcasilla, index) {
            return _obtenerBooleanValueRadio(numcasilla, index);
        },
        setearBoleanValueRadio: function (numcasilla, index, selected) {
            return _setearBoleanValueRadio(numcasilla, index, selected);
        },
        tieneResumencasilla: function () {
            return _tieneResumencasilla();
        },
        tipoResumenCasilla: function () {
            return _tipoResumenCasilla();
        },
        funcionalidad_Casilla315: function () {
            if (!formulario0621.editandoFormulario) {
                _funcionalidad_casilla315();
            }
        },
        funcionalidad_Casilla312: function () {
            if (!formulario0621.editandoFormulario) {
                _funcionalidad_Casilla312();
            }
        },
        funcionalidad_casilla301: function () {
            _funcionalidad_casilla301();
        },
        funcionalidad_validar_364: function () {
            _funcionalidad_validar_364();
        },
        funcionalidad_validar_Renta: function () {
            _funcionalidad_validar_Renta();
        },
        obtenerPorcentajeRentaTributo: function (periodo, codTributo) {
            if (PorcentajeRentaTributo == null || PorcentajeRentaTributo == '') {
                periodo = comunLibreria.formatearPeriodoaCadena(periodo);
                var parametrosUrl = periodo + "/" + codTributo;
                PorcentajeRentaTributo = comunServiciosControlador.obtenerPorcentajeRentaTributo(parametrosUrl);
            }
            return PorcentajeRentaTributo;
        },
        quitarAtributo: function (numcasilla, atributo) {
            _quitarAtributo(numcasilla, atributo);
        },
        validarDeclaracionSeleccionada: function () {
            _validarDeclaracionSeleccionada();
        },
        ultima_declaracion: function () {
            _ultima_declaracion();
        },
        modificacionAfectacionRegimenRenta: function () {
            _modificacionAfectacionRegimenRenta();
        },
        calcularInteresMoratorio: function (paso, casilla) {
            var fechaactual = new Date();
            var fechaPresentacion = moment(fechaactual).format('YYYY-MM-DD');

            if (_obtenerValorCasilla("895") == enumTipoDeclara.ORIGINAL.name
                && fechaPresentacion > fechaVencimientoPeriodo) {

                if (_obtenerValorCasilla("681") == 0) {
                    $('#casilla187').attr('readonly', true);
                } else {
                    $('#casilla187').attr('readonly', false);
                }
                if (_obtenerValorCasilla("682") == 0) {
                    $('#casilla319').attr('readonly', true);
                } else {
                    $('#casilla319').attr('readonly', false);
                }
                if (_obtenerValorCasilla("683") == 0) {
                    $('#casilla343').attr('readonly', true);
                } else {
                    $('#casilla343').attr('readonly', false);
                }


                if (paso == "#paso-simple-04" || paso == "#Paso-form_06") {
                    var val;
                    var im;
                    if (casilla == null || casilla == 187) {
                        if ($('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="187"]').attr('caseditado') == undefined) {
                            val = formulario0621.obtenerValorCasilla(681);
                            im = 0;
                            if (val > 0) {
                                im = formulario0621.obtenerInteresMoratorio(val, "010101");
                            }
                            $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="187"]').val(im);
                        }
                    }
                    if (casilla == null || casilla == 319) {
                        if ($('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="319"]').attr('caseditado') == undefined) {
                            val = formulario0621.obtenerValorCasilla(682);
                            im = 0;
                            if (val > 0) {
                                im = formulario0621.obtenerInteresMoratorio(val, "030301");
                            }
                            $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="319"]').val(im);
                        }
                    }
                    if (casilla == null || casilla == 343) {
                        if ($('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="343"]').attr('caseditado') == undefined) {
                            val = formulario0621.obtenerValorCasilla(683);
                            im = 0;
                            if (val > 0) {
                                im = formulario0621.obtenerInteresMoratorio(val, "010106");
                            }
                            $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="343"]').val(im);
                        }
                    }
                    comunIntegrador.operarCasilla(188, 1);
                    comunIntegrador.operarCasilla(324, 1);
                    comunIntegrador.operarCasilla(344, 1);

                    /*
                     var valorCasilla = comunIntegrador.obtenerValorCalculoExpresion621("C189+C307+C345");
                     $("#muestraTotalaPagar").find("strong").text("s/. " + formulario0621.formatearNumeroSeparadorMiles(valorCasilla));*/
                    comunIntegrador.calcularTotalPagar(true);
                }
            } else if (_obtenerValorCasilla("895") == enumTipoDeclara.ORIGINAL.name
                && fechaPresentacion < fechaVencimientoPeriodo) {
                $('#casilla187').attr('readonly', true);
                $('#casilla319').attr('readonly', true);
                $('#casilla343').attr('readonly', true);
            }

            if ((_obtenerValorCasilla("895") == enumTipoDeclara.SUSITUTORIA.name)
                && fechaPresentacion < fechaVencimientoPeriodo) {
                if (_obtenerValorCasilla("681") == 0) {
                    $('#casilla187').attr('readonly', true);
                } else {
                    $('#casilla187').attr('readonly', true);
                }
                if (_obtenerValorCasilla("682") == 0) {
                    $('#casilla319').attr('readonly', true);
                } else {
                    $('#casilla319').attr('readonly', true);
                }
                if (_obtenerValorCasilla("683") == 0) {
                    $('#casilla343').attr('readonly', true);
                } else {
                    $('#casilla343').attr('readonly', true);
                }
            }

            if ((_obtenerValorCasilla("895") == enumTipoDeclara.RECTIFICATORIA.name)
                && fechaPresentacion > fechaVencimientoPeriodo) {
                if (_obtenerValorCasilla("681") == 0) {
                    $('#casilla187').attr('readonly', true);
                } else {
                    $('#casilla187').attr('readonly', false);
                }
                if (_obtenerValorCasilla("682") == 0) {
                    $('#casilla319').attr('readonly', true);
                } else {
                    $('#casilla319').attr('readonly', false);
                }
                if (_obtenerValorCasilla("683") == 0) {
                    $('#casilla343').attr('readonly', true);
                } else {
                    $('#casilla343').attr('readonly', false);
                }
            }
        },
        formatearNumeroSeparadorMiles: function (nStr) {
            nStr += '';
            x = nStr.split(',');
            x1 = x[0];
            x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        },
        setearValoresAdicionales: function () {
            ////console.log("setearValoresAdicionales");
            var control2 = $('*[data-casilla="2"]');
            var usuarioBean = comunLibreria.obtenerUsuarioBean();
            if (usuarioBean != null) {
                control2.val(usuarioBean.numRUC);
            }

            var control13 = $('*[data-casilla="13"]');
            control13.val(moment().format("YYYY-MM-DD"));
            var control58 = $('*[data-casilla="58"]');
            control58.val(moment().format("HH:mm:ss"));
        },
        limpiarVariablesGlobales: function () {
            _limpiarVariablesGlobales();
        },
        obtenerTributosAsociados: function (codFormulario) {
            return _obtenerTributosAsociados(codFormulario);
        },
        verificarRadioButtonRentaSeleccionado: function (regimen) {
            _verificarRadioButtonRentaSeleccionado(regimen);
        },
        setearPorcentajeRenta: function () {
            if (!formulario0621.editandoFormulario) {
                _setearPorcentajeRenta();
            }
        },
        mostrarInformacion301: function () {
            _mostrarInformacion301();
        },
        setearAtributoRequired: function (numcasilla) {
            _setearAtributoRequired(numcasilla);
        },
        quitarAgregarRequeridoCasillasInvisibles: function () {
            _quitarAgregarRequeridoCasillasInvisibles();
        },
        validarButtonGroupRadios: function (casilla) {
            return _validarButtonGroupRadios(casilla);
        },
        mostrarMensajeINF008_INF007: function (texto) {
            _mostrarMensajeINF008_INF007(texto);
        },
        no_copy_cut_past: function () {
            _NO_copy_cut_past();
        },
        funcionalidad886: function () {
            _funcionalidad886();
        },
        limpiarControlesRenta: function () {
            _limpiarControlesRenta();
        }
    };

})();
//
//
$(document).ready(function () {
    localStorage.setItem("Ubigeo", JSON.stringify(comunServiciosControlador.obtenerUbigeo()));
    //console.log("===========> " + localStorage.getItem("Ubigeo"));
    localStorage.setItem("IndicadorTipoMoneda", JSON.stringify(comunServiciosControlador.obtenerIndicadorTipoMoneda()));

    var casillaAlign = $('.casilla-align');
    casillaAlign.keyup(function () {
        var val = $(this).val();
        var re = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)$/g;
        var re1 = /^([0-9]+[\.]?[0-9]?[0-9]?|[0-9]+)/g;
        if (re.test(val)) {
        } else {
            val = re1.exec(val);
            if (val) {
                this.value = val[0];
            } else {
                this.value = "";
            }
        }
    });

    comunBandeja.setearFormularioActivo("f0621.html");
    comunBandeja.inicializarLocalStorage();
    localStorage.setItem("ventana", "f0621");

    $('.date-picker').datepicker({
        format: "mm-yyyy",
        viewMode: "months",
        minViewMode: "months",
        autoclose: true
    });

    //Seteando un mes anterior al actual
    var f1 = moment().add(-1, 'months');
    var f2 = f1.toDate();
    $('#casilla7').datepicker('update', f2);
    $('#casilla-s-7').datepicker('update', f2);
    $('*[data-casilla="7"]').val("");
    $('*[data-s-casilla="7"]').val("");

//    var formulario0621 = formulario0621;

    var indicadorValidadorLE;
    comunLibreria.callServiceDiscoverIP();

    formulario0621.setDetalleParametros(comunServiciosControlador.obtenerDetalleParametros());
    ////console.log("Invocando parametria 0621");
    var dataParametria = comunServiciosControlador.obtenerParametria(formulario0621.obtenerIdFormulario(), formulario0621.obtenerVersionFormulario());
//    formulario0621.setTasaInteresMoratorio(comunServiciosControlador.obtenerTasaInteres());

    /* cagrar definicion casilla */
    formulario0621.setPadronParametro(comunServiciosControlador.obtenerPadronParametro());

    ////console.log("====TIENE dataParametria ====== " + dataParametria);
    if (dataParametria != null) {

        formulario0621.setDefincionCasilla(dataParametria);
        /*ordenar lista por rubro, seccion y linea*/
        indicadorLE = (dataParametria.indValLe != null && dataParametria.indValLe != "0");
        //console.log("=======TIENE INDICADOR DE LIBROS LE== " + indicadorLE + "- indValLe" + dataParametria.indValLe);
        dataParametria.casillas.sort(function (a, b) {
            var res = a.numRubCas - b.numRubCas;
            if (res == 0) {
                res = a.numSecCas - b.numSecCas;
                if (res == 0) {
                    res = a.numLinCas - b.numLinCas;
                    if (res == 0) {
                        return a.numColCas - b.numColCas;
                    }
                }
            }
            return res;
        });

        indicadorValidadorLE = dataParametria.indValLe;
        ////console.log("0621:decorator....");
        formulario0621.myIntegrador.parsearDecoracionCasillas621(dataParametria, formulario0621.getDetalleParametros());

        if (formulario0621.myIntegrador.validarVigenciaFormularios(dataParametria) == false) {

            $('#mensaje-validacion-vigencia').css("display", "block");
            $('#perIniVig').html(dataParametria.fecIniVig);
            $('#perFinVig').html(dataParametria.fecFinVig);
            $(".barraBuscar02").toggle(false);
        }
        $("#urlArchivoAyuda").attr("href", dataParametria.urlArchivoAyuda);

        formulario0621.muestraFormularioFrecuente();
    }

    var oldPeriodoSeleccionado;

    validarRecuperarImportar(dataParametria);

    $(".barraBuscar02").toggle(true);


    var usuarioBean = comunLibreria.obtenerUsuarioBean();

    $('#li-Paso-form_02').attr('class', 'disabled');
    $('#li-Paso-form_06').attr('class', 'disabled');
    $('#li-paso-simple-02').attr('class', 'disabled');
    $('#li-paso-simple-04').attr('class', 'disabled');


    $('#Paso-form_02,#paso-simple-02,#paso-simple-04').click(function (e) {
        //console.log("========ENTRO A paso-simple-02==========>>>>>>> ");
        //console.log("=====TAB PANE=======>" + $("#Paso-form_05").parents('li').is('.active'));
//        //console.log("=====TAB PANE=======>" + $("#Paso-form_05").is(":selected"));
//


        var tipoDeclaracion = formulario0621.obtenerValorCasilla("895");
        var periodo = formulario0621.obtenerValorCasilla("7");
        if (formulario0621.validarPeriodoSeleccionado(dataParametria, periodo) && formulario0621.validarSeleccionTab(tipoDeclaracion)) {
            //console.log(" ==== PASO LA VALIDACION PASO SIMPLE-02 ==");
            $('#li-Paso-form_02').removeClass('disabled');
            $('#li-Paso-form_06').removeClass('disabled');
            $('#li-paso-simple-02').removeClass('disabled');
            $('#li-paso-simple-04').removeClass('disabled');
            formulario0621.accionesSegunRegimenRentaParaOSR();
            if (!navegacionTab) {
                navegacion();
                navegacionTab = true;
            }
        } else {
            e.preventDefault();
            e.stopPropagation();
        }
    });
    function navegacion() {
        //console.log("=== ENTRANDO A NAVEGACION ===");
        var seleccionIgv = formulario0621.validarButtonGroupRadios("887");
        var seleccionIvap = formulario0621.validarButtonGroupRadios("867");
        var seleccionRegimen = formulario0621.validarButtonGroupRadios("861");


        if (formulario0621.esNivelSimplificado()) {
            if (!seleccionIgv) {
                //console.log("====ENTRANDO A SIMPLIFICADA ....======");
                $('#paso-simple-03').tab('show');
                comunIntegrador.ejecutarCalculoPorTab(dataParametria, 2, "1");
                metodosDentroTabRenta();
            } else {
                $('#paso-simple-05').tab('show');
                comunIntegrador.ejecutarCalculoPorTab(dataParametria, 2, "4");
            }
        } else {
            if (!seleccionIgv) {
                //console.log("=====NO SE SELECCIONO IGV=======>");
                if (seleccionIvap && seleccionRegimen) {
                    $('#Paso-form_04').tab('show');
                    comunIntegrador.ejecutarCalculoPorTab(dataParametria, 2, "3");
                } else if (seleccionIvap && !seleccionRegimen) {
                    $('#Paso-form_04').tab('show');
                    comunIntegrador.ejecutarCalculoPorTab(dataParametria, 2, "3");
                } else if (seleccionRegimen && !seleccionIvap) {
                    $('#Paso-form_05').tab('show');
                    comunIntegrador.ejecutarCalculoPorTab(dataParametria, 2, "4");
                    metodosDentroTabRenta();
                }
            } else {
                //console.log("===== SE SELECCIONO IGV=======>");
                $('#Paso-form_atras03').tab('show');
                comunIntegrador.ejecutarCalculoPorTab(dataParametria, 2, "1");
            }
            //console.log("==========quitarAgregarRequeridoCasillasInvisibles desde NAVEGACION==========");
            formulario0621.quitarAgregarRequeridoCasillasInvisibles();
        }
    }
    ;

    function validarRecuperarImportar(datos) {
        if (datos != null) {
            if (datos.indAutograb == 0) {
                $("#Recuperar_").prop("disabled", true);
            }
        }
    }

    $('[data-s-casilla="361"],[data-casilla="361"],[data-s-casilla="839"],[data-casilla="839"],[data-s-casilla="607"],[data-casilla="607"],[data-s-casilla="865"],[data-casilla="865"],[data-casilla="0001"],[data-s-casilla="0001"]').change(function (e) {
        var elemento = $(this);

        formulario0621.mostrarMensajeAceptarCancelar(
            "¿Está seguro que desea cambiar la respuesta?",
            function (evt) {
                //console.log("===== RESPUESTA SI=====>");
//                    evt.stopPropagation();
                formulario0621.editandoFormulario = false;
                $('#btnAceptarAsistenteCasilla171').focus();
                $('#modalMensajeAceptarCancelar').modal('hide');
                formulario0621.validacionManualRadiosRenta();
            },
            function (evt) {
//                    evt.stopPropagation();
                //console.log("===== RESPUESTA NO=====>");
                formulario0621.obtenerFocoRadioTabRenta(elemento);
                $('#modalMensajeAceptarCancelar').modal('hide');
            }, "NO", "SI"
        );
    });

//TAB INFORMACION GENERAL
    $("#Paso-form_01,#paso-simple-01").click(function (e) {
//        //console.log("======INGRESANDO TAB INFORMACION GENERAL=======");
//        var seleccionIvap = formulario0621.validarButtonGroupRadios(867);
//        var seleccionRegimen = formulario0621.validarButtonGroupRadios(861);
//        var seleccionIgv = formulario0621.validarButtonGroupRadios(887);
//
//        if (!formulario0621.esNivelSimplificado()) {
//            if (seleccionIgv && seleccionIvap) {
//                if (probandoAnteriorDjCompleta($("#Anterior01"), e)) {
//                    //PASANDO A TAB IGV
//                    $("#Paso-form_atras02").tab('show');
//                } else if (probandoAnteriorDjCompleta($("#Anterior02"), e)) {
//                    //PASANDO A TABCOMPRAS
//                    $("#Paso-form_03").tab('show');
//                } else if (probandoAnteriorDjCompleta($("#Anterior03"), e)) {
//                    //PASANDO A TAB IVAP
//                    $("#Paso-form_04").tab('show');
//                } else if (seleccionRegimen) {
//                    //PASANDO A TAB RENTA
//                    if (probandoAnteriorDjCompleta($("#Anterior04"), e)) {
//                        $("#Paso-form_05").tab('show');
//                    }
//                }
//            } else if (seleccionIvap) {
//                if (probandoAnteriorDjCompleta($("#Anterior03"), e)) {
//                    //PASANDO A TAB IVAP
//                    $("#Paso-form_04").tab('show');
//                } else if (probandoAnteriorDjCompleta($("#Anterior04"), e)) {
//                    //PASANDO A TAB RENTA
//                    $("#Paso-form_05").tab('show');
//                }
//            }
//        } else {
//            if (seleccionIgv) {
//                if (probandoAnteriorDjSimplificada($("#Anterior-01"), e)) {
//                    //PASANDO A TAB IGV 
//                    $("#paso-simple-05").tab('show');
//                } else if (seleccionRegimen) {
//                    //PASANDO A RENTA
//                    if (probandoAnteriorDjSimplificada($("#Anterior-02"), e)) {
//                        $("#paso-simple-03").tab('show');
//                    }
//                }
//            } else {
//                if (probandoAnteriorDjSimplificada()($("#Anterior-02"), e)) {
//                    //TAB RENTA
//                    $("#paso-simple-03").tab('show');
//                }
//            }
//        }

    });

    //TAB DETERMINACION DE LA DEUDA
    $('#Paso-form_06,#paso-simple-04').click(function (e) {
//    $('#Paso-form_06').click(function (e) {
        var tipoDeclaracion = _obtenerValorCasilla("895");
        var periodo = formulario0621.obtenerValorCasilla("7");
        var result = (formulario0621.validarPeriodoSeleccionado(dataParametria, periodo) && formulario0621.validarSeleccionTab(tipoDeclaracion));

        if (!result) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            //console.log("===== ENTRANDO A DETERMINACION DE LA DEUDA====");
            var seleccionIvap = formulario0621.validarButtonGroupRadios(867);
            var seleccionRegimen = formulario0621.validarButtonGroupRadios(861);
            var seleccionIgv = formulario0621.validarButtonGroupRadios(887);

            if (!formulario0621.esNivelSimplificado()) {
                if (seleccionIgv && seleccionIvap && seleccionRegimen) {
                    if (probandoSiguienteDjCompleta($("#Siguiente02"), e)) {
                        //PASANDO A TAB IGV
                        $("#Paso-form_atras02").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente03"), e)) {
                        //PASANDO A TABCOMPRAS
                        $("#Paso-form_03").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente04"), e)) {
                        //PASANDO A TAB IVAP
                        $("#Paso-form_04").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente05"), e)) {
                        //PASANDO TAB RENTA
                        metodosDentroTabRenta();
                    } else {
                        metodosDentroTabDetermiDeuda();
                    }
                } else if (seleccionIgv && seleccionIvap) {
                    if (probandoSiguienteDjCompleta($("#Siguiente02"), e)) {
                        //PASANDO A TAB IGV
                        $("#Paso-form_atras02").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente03"), e)) {
                        //PASANDO A TABCOMPRAS
                        $("#Paso-form_03").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente04"), e)) {
                        //PASANDO A TAB IVAP
                        $("#Paso-form_04").tab('show');
                    } else {
                        metodosDentroTabDetermiDeuda();
                    }
                } else if (seleccionIgv && seleccionRegimen) {
                    if (probandoSiguienteDjCompleta($("#Siguiente02"), e)) {
                        //PASANDO A TAB IGV
                        $("#Paso-form_atras02").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente03"), e)) {
                        //PASANDO A TABCOMPRAS
                        $("#Paso-form_03").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente05"), e)) {
                        //PASANDO TAB RENTA
                        metodosDentroTabRenta();
                    } else {
                        metodosDentroTabDetermiDeuda();
                    }
                } else if (seleccionRegimen && seleccionIvap) {
                    if (probandoSiguienteDjCompleta($("#Siguiente04"), e)) {
                        //PASANDO A TAB IVAP
                        $("#Paso-form_04").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente05"), e)) {
                        //PASANDO TAB RENTA
                        metodosDentroTabRenta();
                    } else {
                        metodosDentroTabDetermiDeuda();
                    }
                } else if (seleccionIgv) {
                    if (probandoSiguienteDjCompleta($("#Siguiente02"), e)) {
                        //PASANDO A TAB IGV
                        $("#Paso-form_atras02").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente03"), e)) {
                        //PASANDO A TABCOMPRAS
                        $("#Paso-form_03").tab('show');
                    } else {
                        metodosDentroTabDetermiDeuda();
                    }
                } else if (seleccionIvap) {
                    if (probandoSiguienteDjCompleta($("#Siguiente04"), e)) {
                        //PASANDO A TAB IVAP
                        $("#Paso-form_04").tab('show');
                    } else {
                        metodosDentroTabDetermiDeuda();
                    }
                } else if (seleccionRegimen) {
                    if (probandoSiguienteDjCompleta($("#Siguiente05"), e)) {
                        //PASANDO TAB RENTA
                        metodosDentroTabRenta();
                    }
                }
            } else {

                if (seleccionIgv && seleccionRegimen) {
                    if (probandoSiguienteDjSimplificada($("#Siguiente-02"), e)) {
                        //PASANDO A TAB IGV
                        $("#paso-simple-05").tab('show');
                    } else if (probandoSiguienteDjSimplificada($("#Siguiente-03"), e)) {
                        metodosDentroTabRenta();
                        $("#paso-simple-03").tab('show');
                    } else {
                        metodosDentroTabDetermiDeuda();
                    }
                } else if (seleccionIgv) {
                    if (probandoSiguienteDjSimplificada($("#Siguiente-02"), e)) {
                        //PASANDO A TAB IGV
                        $("#paso-simple-05").tab('show');
                    } else {
                        metodosDentroTabDetermiDeuda();
                    }
                } else if (seleccionRegimen) {
                    if (probandoSiguienteDjSimplificada($("#Siguiente-03"), e)) {
                        metodosDentroTabRenta();
                        $("#paso-simple-05").tab('show');
                    }
                }
            }
            formulario0621.funcionalidad886();
        }
    });
    function metodosDentroTabDetermiDeuda() {
        //console.log("======CARGANDO PAGOS PREVIOS=====");
        formulario0621.cargarPagosPreviosEnCasillas();
        importe_casilla304_326();
        comunIntegrador.ejecutarCalculoPorTab(dataParametria, 3, "1");
    }

    //TAB IGV
    $("#Paso-form_atras03,#paso-simple-05").click(function (e) {
        var seleccionIgv = formulario0621.validarButtonGroupRadios(887);
        if (!seleccionIgv) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            if (seleccionIgv) {
                if (!formulario0621.esNivelSimplificado()) {
                    if (($("#Paso-form_04").parents('li').is('.active')) && probandoAnteriorDjCompleta($("#Anterior03"), e)) {
                        //TAB IVAP
                        $("#Paso-form_04").tab('show');
                    } else if ($("#Paso-form_05").parents('li').is('.active') && probandoAnteriorDjCompleta($("#Anterior04"), e)) {
                        //TAB RENTA
                        $("#Paso-form_05").tab('show');
                    }
                } else {
                    if (($("#paso-simple-03").parents('li').is('.active')) && probandoAnteriorDjSimplificada($("#Anterior-02"), e)) {
                        //TAB RENTA
                        $("#paso-simple-03").tab('show');
                    }
                }
            }
        }

    });

    $("#Paso-form_atras02").click(function (e) {
        var seleccionIgv = formulario0621.validarButtonGroupRadios(887);
//        var seleccionIvap = formulario0621.validarButtonGroupRadios(867);
//TAB IGV
        if (!formulario0621.esNivelSimplificado() && seleccionIgv && ($("#Paso-form_03").parents('li').is('.active'))) {
            probandoAnteriorDjCompleta($("#Anterior02"), e);
        }

    });

    $("#Paso-form_03").click(function (e) {
        //TAB COMPRAS
        var seleccionIgv = formulario0621.validarButtonGroupRadios(887);
        if (!formulario0621.esNivelSimplificado() && seleccionIgv && ($("#Paso-form_atras02").parents('li').is('.active'))) {
            probandoSiguienteDjCompleta($("#Siguiente02"), e);
        }
    });
    //TAB IVAP
    $("#Paso-form_04").click(function (e) {
        var seleccionIvap = formulario0621.validarButtonGroupRadios(867);
        var seleccionRegimen = formulario0621.validarButtonGroupRadios(861);
        var seleccionIgv = formulario0621.validarButtonGroupRadios(887);

        if (!seleccionIvap) {
            e.preventDefault();
            e.stopPropagation();
        } else {
            //console.log("=======INGRESANDO TAB IVAP========> ");
            if (!formulario0621.esNivelSimplificado()) {
                if (seleccionIgv) {
                    if (!probandoSiguienteDjCompleta($("#Siguiente02"), e)) {
                        if (probandoSiguienteDjCompleta($("#Siguiente03"), e)) {
                            //PASANDO A TABCOMPRAS
                            $("#Paso-form_03").tab('show');
                        }
                    }
                }
                if (seleccionRegimen && ($("#Paso-form_05").parents('li').is('.active'))) {
                    if (probandoAnteriorDjCompleta($("#Anterior04"), e)) {
                        $("#Paso-form_05").tab('show');
                    }
                }
            }

        }
    });
    //TAB RENTA
    var seValidadesdeRenta = false;
    $("#Paso-form_05,#paso-simple-03").click(function (e) {
        //console.log("==============Paso-form_05,#paso-simple-03=============>");
        var seleccionRegimen = formulario0621.validarButtonGroupRadios(861);

        if (!seleccionRegimen) {
            if (formulario0621.esNivelSimplificado()) {
                $("#paso-simple-04").trigger('click');
            } else {
                $("#Paso-form_06").trigger('click');
            }
            e.preventDefault();
            e.stopPropagation();
        } else if (!evitarMensajes) {
            //console.log("=========evitarMensajes========>" + evitarMensajes);
            var seleccionIgv = formulario0621.validarButtonGroupRadios(887);
            var seleccionIvap = formulario0621.validarButtonGroupRadios(867);
            if (!formulario0621.esNivelSimplificado()) {


                if (seleccionIgv && seleccionIvap && seleccionRegimen) {
                    if (probandoSiguienteDjCompleta($("#Siguiente02"), e)) {
                        //PASANDO A TAB IGV
                        $("#Paso-form_atras02").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente03"), e)) {
                        //PASANDO A TABCOMPRAS
                        $("#Paso-form_03").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente04"), e)) {
                        //PASANDO A TAB IVAP
                        $("#Paso-form_04").tab('show');
                    } else {
                        //PASANDO TAB RENTA
                        metodosDentroTabRenta();
                    }
                } else if (seleccionIgv && seleccionIvap) {
                    if (probandoSiguienteDjCompleta($("#Siguiente02"), e)) {
                        //PASANDO A TAB IGV
                        $("#Paso-form_atras02").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente03"), e)) {
                        //PASANDO A TABCOMPRAS
                        $("#Paso-form_03").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente04"), e)) {
                        //PASANDO A TAB IVAP
                        $("#Paso-form_04").tab('show');
                    }
                } else if (seleccionIgv && seleccionRegimen) {
                    if (probandoSiguienteDjCompleta($("#Siguiente02"), e)) {
                        //PASANDO A TAB IGV
                        $("#Paso-form_atras02").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente03"), e)) {
                        //PASANDO A TABCOMPRAS
                        $("#Paso-form_03").tab('show');
                    } else {
                        //PASANDO TAB RENTA
                        metodosDentroTabRenta();
                    }
                } else if (seleccionRegimen && seleccionIvap) {
                    if (probandoSiguienteDjCompleta($("#Siguiente04"), e)) {
                        //PASANDO A TAB IVAP
                        $("#Paso-form_04").tab('show');
                    } else {
                        //PASANDO TAB RENTA
                        metodosDentroTabRenta();
                    }
                } else if (seleccionIgv) {
                    if (probandoSiguienteDjCompleta($("#Siguiente02"), e)) {
                        //PASANDO A TAB IGV
                        $("#Paso-form_atras02").tab('show');
                    } else if (probandoSiguienteDjCompleta($("#Siguiente03"), e)) {
                        //PASANDO A TABCOMPRAS
                        $("#Paso-form_03").tab('show');
                    }
                } else if (seleccionIvap) {
                    if (probandoSiguienteDjCompleta($("#Siguiente04"), e)) {
                        //PASANDO A TAB IVAP
                        $("#Paso-form_04").tab('show');
                    }
                } else {
                    //PASANDO TAB RENTA
                    metodosDentroTabRenta();
                }
            } else {
                if (seleccionIgv && seleccionRegimen) {
                    if (probandoSiguienteDjSimplificada($("#Siguiente-02"), e)) {
                        //PASANDO A TAB IGV
                        $("#paso-simple-05").tab('show');
                    } else {
                        metodosDentroTabRenta();
                    }
                } else if (seleccionIgv) {
                    if (probandoSiguienteDjSimplificada($("#Siguiente-02"), e)) {
                        //PASANDO A TAB IGV
                        $("#paso-simple-05").tab('show');
                    }
                } else {
                    metodosDentroTabRenta();
                }
            }
        }
    });
    function metodosDentroTabRenta() {
        seValidadesdeRenta = false;
        //console.log("==========INVOCANDO funcionalidad_Casilla380====");
        //console.log("=====PASO LAS VALIDACIONES PARA PODER IR A======");
        formulario0621.funcionalidad_Casilla380();
        formulario0621.funcionalidad_Casilla312();
        formulario0621.funcionalidad_Casilla315();
        var valorCasilla301 = formulario0621.obtenerValorCasilla('301');
        if (valorCasilla301 != "" && valorCasilla301 != null) {
            formulario0621.funcionalidad_casilla301();
        }
        comunIntegrador.ejecutarCalculoPorTab(dataParametria, 2, "4");
    }

    $("#casilla301,#casilla-s-301").focusout(function () {
        //console.log(" SALIENDO DEL FOCO CASILLA 301");
        var valorCasilla301 = formulario0621.obtenerValorCasilla('301');
        //console.log("=== VALOR CASILLA 301 === " + valorCasilla301);
        if (valorCasilla301 != "" && valorCasilla301 != null) {
            //console.log("=======1====");
            formulario0621.funcionalidad_casilla301();
        }
    });

    $('#casilla189, #casilla-s-189').change(function () {
        if (parseInt(formulario0621.obtenerValorCasilla("189")) > parseInt(formulario0621.obtenerValorCasilla("188"))) {
            formulario0621.mostrarMensajeGeneral("El monto no puede ser mayor a la casilla 188");
        }
    });

    $('#casilla307, #casilla-s-307').change(function () {
        if (parseInt(formulario0621.obtenerValorCasilla("307")) > parseInt(formulario0621.obtenerValorCasilla("324"))) {
            formulario0621.mostrarMensajeGeneral("El monto no puede ser mayor a la casilla 324");
        }
    });

    $('#casilla345').change(function () {

        if (parseInt(formulario0621.obtenerValorCasilla("345")) > parseInt(formulario0621.obtenerValorCasilla("344"))) {
            formulario0621.mostrarMensajeGeneral("El monto no puede ser mayor a la casilla 344");
        }
    });

    $('*[data-casilla="7"],*[data-s-casilla="7"]').focus(function () {
        oldPeriodoSeleccionado = "";
        oldPeriodoSeleccionado = formulario0621.obtenerValorCasilla("7");
    });

    $("#RecuperarPreliminar").click(function () {
        var fecha = $(this).attr("fec_reg");
        formulario0621.mostrarMensajeAceptarCancelar(
            "Sr. Contribuyente, usted tiene pre-grabada del dia " + fecha + ". Desea recuperarla?",
            function (evt) {
//                    evt.stopPropagation();
                formulario0621.editandoFormulario = true;
                document.getElementById("RecuperarPreliminar").disabled = true;
                var preliminal = formulario0621.getFormularioPreliminal();
                var retePercIGVList = {};
                var coeficienteigv = {};

                if (preliminal != null && preliminal["resultado"] != null) {
                    preliminal = preliminal["resultado"]["arcAutoguar"];
                    preliminal = JSON.parse(preliminal.replace("IfxBSONObject", ""));
                    preliminal = preliminal["casillas"];

                    retePercIGVList = preliminal["retePercIGVList"];
                    coeficienteigv = preliminal["coeficienteigv"];

                    if (retePercIGVList != null) {
                        formulario0621.listaMap_Temp_P = formulario0621_importar.convertirConenido(retePercIGVList.percepciones.datos);
                        formulario0621.nombreArchivoP = (retePercIGVList.percepciones.nombre);
                        formulario0621.Total_montoComprobantePercepcion = (retePercIGVList.percepciones.total);

                        formulario0621.listaMap_Temp_PI = formulario0621_importar.convertirConenido(retePercIGVList.pagos.datos);
                        formulario0621.nombreArchivoPI = (retePercIGVList.pagos.nombre);
                        formulario0621.Total_montoComprobantePago = (retePercIGVList.pagos.total);

                        formulario0621.listaMap_Temp_R = formulario0621_importar.convertirConenido(retePercIGVList.retenciones.datos);
                        formulario0621.nombreArchivoR = (retePercIGVList.retenciones.nombre);
                        formulario0621.Total_montoComprobanteRetencion = (retePercIGVList.retenciones.total);
                    }
                    console.log("::::: coeficiente igv");
                    console.log(coeficienteigv);
                    if(coeficienteigv != null){
                        $.each(coeficienteigv, function(k,v){
                            // console.log(":::: valor: ");
                            // console.log(v);
                            $(v.clave).val(v.valor);
                        });
                    }

                    /**/
                    //console.log("\n\n");
                    //console.log(JSON.stringify(preliminal));

                    $.each(preliminal, function (k, v) {
                        var elemento = $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="' + k + '"]');
                        if (v.tipo == "c") {//casillas directas
                            $(elemento).val(v.valor);
                        } else if (v.tipo == "r") { //radio button
                            if (elemento != null) {
                                $.each(elemento, function (k1, v1) {
//                                        //console.log("............ "+v.valor+" - "+v.tipo+" - "+v.atributo+" - "+k);
                                    $(v1).removeAttr('disabled');
                                    if ($(v1).attr(v.atributo) == v.valor) {
                                        $(v1).prop("checked", true);
                                    }
                                });
                            }
                        }
                    });
                }

                formulario0621.limpiarFormularioPreliminal();
                $('#modalMensajeAceptarCancelar').modal('hide');
            },
            function (evt) {
//                    evt.stopPropagation();
                $('#modalMensajeAceptarCancelar').modal('hide');
                document.getElementById("RecuperarPreliminar").disabled = true;
                formulario0621.limpiarFormularioPreliminal();
            }, "NO", "SI"
        );
    });

    $('*[data-casilla="7"], *[data-s-casilla="7"]').change(function () {
//         $("#menu1,#menu2").find(':input').each(function () {
//            var elemento = this;
//            //console.log($(elemento).attr("numrubcas"));
//        });

        $('#modalEsperaDatos').modal('show');
        setTimeout(function () {
            iniciarProcesoObtencionDatos();
        }, 500);

    });

    function iniciarProcesoObtencionDatos() {
        ////console.log("iniciarProcesoObtencionDatos");
        funcion_deshabilitar_inicio(false);
        if (oldPeriodoSeleccionado == null || oldPeriodoSeleccionado == "") {
            oldPeriodoSeleccionado = _obtenerValorCasilla("7");
        }
        formulario0621.iniciarData_SeleccionFecha(oldPeriodoSeleccionado, dataParametria);

        //console.log(".... inicia el seleccion de periodo " + oldPeriodoSeleccionado);
        formulario0621.obtenerPeriodo();
        //console.log("TERMINO LA SELECCION");
        $('#modalEsperaDatos').modal('hide');
    }

    function move() {
        var elem = document.getElementById("myBar");
        var width = 0;
        var id = setInterval(frame, 80);

        function frame() {
            if (width >= 100) {
                clearInterval(id);
            } else {
                width++;
                elem.style.width = width + '%';
                elem.innerHTML = width * 1 + '%';
            }
        }
    }

    $('*[data-casilla="895"],*[data-s-casilla="895"]').change(function () {
        //console.log("========= CHANGE 895=========> ");
        formulario0621.validarDeclaracionSeleccionada();
    });
    $('input[data-s-casilla="888"]').change(function () {
        validacionDeclaracionesSinMovimiento();
    });

    $("#btnNoModificarPeriodoTributario").click(function () {

//        var isChange = comunIntegrador.obtenerActivacionCambioCasillas();
//        var periodo = isChange.substr(isChange.indexOf("==") + 2);
//        var control7 = $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="7"]');
//        control7.val(periodo);
        formulario0621.setearValorCasilla("7", oldPeriodoSeleccionado);
    });

    $("#btnModificarPeriodoTributario").click(function () {
        var periodo = formulario0621.obtenerValorCasilla("7");
        $('#Paso-form_atras03').tab('show');
        $('#paso-simple-05').tab('show');
        $('#Paso-form_atras02').tab('show');

        $('#Reset-01').trigger("reset");
        $('#Reset-02').trigger("reset");


        if (formulario0621.validarPeriodoSeleccionado(dataParametria, periodo)) {
            formulario0621.limpiarVariablesGlobales();

            $('#modalEsperaDatos').modal('show');
            setTimeout(function () {
                formulario0621.formaDeclaracionLista(periodo);
                $('#modalEsperaDatos').modal('hide');
            }, 500);
        }

    });

    $("#btn301,#btn-s-301").click(function () {
        formulario0621.mostrarInformacion301();
        $('#modalIngresosNetos').modal('show');
    });

    $(".barraBuscar02").click(function () {
        ////console.log("Agregar Bandeja");

        if (!comunLibreria.validarConexionInternet()) {
            $("span.titleMensajeGeneral").text(comunMensajes.getMensaje("INF001", ""));
            $('#modalMensajeGeneral').modal('show');
        } else {
            if (!comunBandeja.validaMaximoFormularios()) {
                $('#modalFormularioExcede').modal('show');
                return;
            }

            if (formulario0621.obtenerValorCasilla("886").toString().toLowerCase() == "Dolares".toLowerCase()) {
                formulario0621.mostrarMensajeAceptar(
                    comunMensajes.getMensaje("MENSAJE_PAGO_DOLARES", ""),
                    function (evt) {
                        _agregarBandeja();
                    }
                );
            } else {
                _agregarBandeja();
            }
        }
    });
    function _agregarBandeja() {

        var messagesArray = formulario0621.validarFormulario();
        if (messagesArray.length > 0) {
            $("span.lista-errores-total").text(messagesArray.length);
            $('#lstErrores').empty();
            for (var i = 0; i < messagesArray.length; i++) {
                $('#lstErrores').append('<li class=\"list-group-item\"><div><span class=\"Errores glyphicon glyphicon-remove\"></span><a href=\"#\" target=\"_self\" onclick="formulario0621.ubicarCasilla(\'' + messagesArray[i] + '\');">Sr. Contribuyente, la casilla ' + messagesArray[i] + ' es de ingreso obligatoria, debe ingresarla antes de salir de la sección ' + '</a></div> </li>');
            }
            $("#panel_errores").removeClass("hidden");
            return;
        } else {
            $("span.lista-errores-total").text("0");
            $('#lstErrores').empty();
            $("#panel_errores").addClass("hidden");
        }

        var periodo = formulario0621.obtenerValorCasilla("7");
        if (!comunBandeja.existeFormulario(formulario0621.obtenerIdFormulario(), periodo)) {
            localStorage.setItem("ventana", "f0621");
            formulario0621.myIntegrador.inactivarGuardadoAutomatico(); //inactiva autoguardado

            formulario0621.setearValoresAdicionales(); //Seteando valores de casillas ocultas

            $('#myModal-40').modal('show');

            var casillasArray = [];
            var casillas = $('.data-' + formulario0621.obtenerNivelDeclaracion() + 'sunat');
            $.each(casillas, function (index, item) {
                var valorTmp = "";
                var codCas = $(item).data(formulario0621.obtenerNivelDeclaracion() + 'casilla');
                var tipCas = $(item).data('casillatipo');
                var tipCam = $(item).data('codtipcam');
                if (codCas != "895") {

                    valorTmp = formulario0621.obtenerValorCasilla(codCas);

                    if (codCas == 7) {
                        valorTmp = comunLibreria.formatStringPeriod(valorTmp);
                    } else if (codCas == "886") {
                        if (valorTmp == "Soles") {
                            valorTmp = "2";
                        } else {
                            valorTmp = "1";
                        }
                    } else if ($(item).attr("type") == "radio") {
                        if ($(item).is(":checked") == false) {
                            valorTmp = null;
                        } else {
                            valorTmp = $(item).val();
                        }
                    }

                    if (valorTmp != null && valorTmp != "") {
                        casillasArray.push({
                            codigoCasilla: codCas,
                            valorCasilla: valorTmp,
                            tipoCasilla: tipCas,
                            codtipcamCasilla: tipCam
                        });
                    }
                }
            });

            var cas_509 = 0;
            var cas_510 = 0;
            var cas_511 = 0;
            if (formulario0621.listaMap_Temp_PI != null && formulario0621.listaMap_Temp_PI.length > 1) {
                cas_510 = cas_510 + (formulario0621.listaMap_Temp_PI.length - 1);
            }
            console.log("::: cas 510: " + cas_510);

            if (formulario0621.listaMap_Temp_R != null && formulario0621.listaMap_Temp_R.length > 1 ) {
                cas_509 = (formulario0621.listaMap_Temp_R.length - 1) ;
            }
            console.log("::: cas 509: " + cas_509);

            if (formulario0621.listaMap_Temp_P != null && formulario0621.listaMap_Temp_P.length > 1) {
                cas_510 = cas_510 + (formulario0621.listaMap_Temp_P.length - 1);
                formulario0621.listaMap_Temp_P.forEach(function (v, k) {
                    //tipoComprobantePago == 55 => sumar
                    v.forEach(function (v1, k1) {
                        if (v1 != null && v1 != undefined && v1 != '' && v1 == '55'
                            && k1 == 'tipoComprobantePago') {
                            cas_511 = cas_511 + 1;
                        }
                    });
                });
            }
            console.log("::: cas 511 " + cas_511);


            casillasArray.push({
                codigoCasilla: 509,
                valorCasilla: cas_509,
                tipoCasilla: "00",
                codtipcamCasilla: "01"
            });

            casillasArray.push({
                codigoCasilla: 510,
                valorCasilla: cas_510,
                tipoCasilla: "00",
                codtipcamCasilla: "01"
            });
            casillasArray.push({
                codigoCasilla: 511,
                valorCasilla: cas_511,
                tipoCasilla: "00",
                codtipcamCasilla: "01"
            });



            console.log("*********ADICIONALES***********");
            if (formulario0621.esNivelSimplificado()) {
                var casillasAdicionales = $('.data-sunat');

                $.each(casillasAdicionales, function (index, item) {
                    var codCasilla = $(item).data('casilla');
                    var valorcasilla = $('*[data-casilla="' + $(item).data('casilla') + '"]').val();
                    var count = 0;
                    if (codCasilla == "2" || codCasilla == "13" || codCasilla == "58") {

                        casillasArray.push({
                            codigoCasilla: codCasilla,
                            valorCasilla: valorcasilla,
                            tipoCasilla: "00",
                            codtipcamCasilla: "01"
                        });
                    }
                    if (count == 3) {
                        return false;
                    }
                });
            }


            for (var x in formulario0621.obtenerCasillasInternas()) {

                var casilla = x.substring(14, x.length);
                var valor = formulario0621.obtenerCasillasInternas()[x];
                if (valor != null) {
                    valor = valor.toString();
                }

                if (valor != null && valor.length > 0 && ($.isNumeric(casilla))) {
                    casillasArray.push({
                        codigoCasilla: parseInt(casilla),
                        valorCasilla: valor,
                        tipoCasilla: "00",
                        codtipcamCasilla: "01"
                    });
                }
            }

            console.log("***************MOSRANDO INTERNAS**************");
            console.log(JSON.stringify(casillasArray));

            //Anexando casillas sugeridas
            var periodoCasilla = comunLibreria.formatStringPeriod(periodo);
            var casillasSugeridasArray = [];
            var casillasSugeridas = formulario0621.obtenerListaCasillasSugeridas();
            var regimen = formulario0621.codigoRegimenSeleccionado();
            var coeficienteRenta = formulario0621.obtenerCoeficienteRenta(periodoCasilla, regimen).resultado;
            var resumenCasilla = formulario0621.obtenerResumenCasillasLE(periodoCasilla).resultado;


            formulario0621.setVariablePagosPrevios(null);
            var listPagosPrevios = formulario0621.obtenerPagosPrevios(periodoCasilla, "0621");
            if (listPagosPrevios != null && listPagosPrevios.resultado != null) {
                formulario0621.obtenerDatosPeriodoBean().listPagosPrevios = listPagosPrevios.resultado;
            }

            for (i = 0; i < casillasSugeridas.length; i++) {
                var cas = casillasSugeridas[i];
                var valorOriginal = 0;
                var valorDif = "0";
                var valorActual = formulario0621.obtenerValorCasilla(casillasSugeridas[i]);

//                    //console.log("\n::::::: casilla " + cas + " valor actual: " + valorActual);
                if (resumenCasilla != null) {
                    if (cas == 122) {
                        valorOriginal = resumenCasilla.mtoCas122;
                    } else if (cas == 120) {
                        valorOriginal = resumenCasilla.mtoCas120;
                    } else if (cas == 119) {
                        valorOriginal = resumenCasilla.mtoCas119;
                    } else if (cas == 114) {
                        valorOriginal = resumenCasilla.mtoCas114;
                    } else if (cas == 113) {
                        valorOriginal = resumenCasilla.mtoCas113;
                    } else if (cas == 117) {
                        valorOriginal = resumenCasilla.mtoCas117;
                    } else if (cas == 116) {
                        valorOriginal = resumenCasilla.mtoCas116;
                    } else if (cas == 115) {
                        valorOriginal = resumenCasilla.mtoCas115;
                    } else if (cas == 109) {
                        valorOriginal = resumenCasilla.mtoCas109;
                    } else if (cas == 108) {
                        valorOriginal = resumenCasilla.mtoCas108;
                    } else if (cas == 103) {
                        valorOriginal = resumenCasilla.mtoCas103;
                    } else if (cas == 102) {
                        valorOriginal = resumenCasilla.mtoCas102;
                    } else if (cas == 101) {
                        valorOriginal = resumenCasilla.mtoCas101;
                    } else if (cas == 100) {
                        valorOriginal = resumenCasilla.mtoCas100;
                    } else if (cas == 107) {
                        valorOriginal = resumenCasilla.mtoCas107;
                    } else if (cas == 106) {
                        valorOriginal = resumenCasilla.mtoCas106;
                    } else if (cas == 105) {
                        valorOriginal = resumenCasilla.mtoCas105;
                    } else if (cas == 341) {
                        valorOriginal = resumenCasilla.mtoCas341;
                    } else if (cas == 340) {
                        valorOriginal = resumenCasilla.mtoCas340;
                    } else if (cas == 301) {
                        valorOriginal = resumenCasilla.mtoCas301;
                    }
                }
                if (coeficienteRenta != null) {
                    if (cas == 892) {
                        valorOriginal = (coeficienteRenta.ingNetos);
                    } else if (cas == 891) {
                        valorOriginal = (coeficienteRenta.ingCalc);
                    }
                }

                if (cas == 127) {
                    valorOriginal = formulario0621.obtenerDatosPeriodoBean().exportacionesEmbarcadas;
                } else if (cas == 351) {
                    if (formulario0621.obtenerDatosPeriodoBean().saldoAFavorTributo != null) {
                        valorOriginal = formulario0621.obtenerDatosPeriodoBean().saldoAFavorTributo["010106"];
                    }
                } else if (cas == 185) {
                    if (formulario0621.obtenerDatosPeriodoBean().listPagosPrevios != null &&
                        formulario0621.obtenerDatosPeriodoBean().listPagosPrevios["010101"] != null) {
                        $.each(formulario0621.obtenerDatosPeriodoBean().listPagosPrevios["010101"], function (k, v) {
                            valorOriginal = valorOriginal + (Number(v.crtImptri) + Number(v.crtImpint));
                        });
                    }
                } else if (cas == 317) {
                    if (formulario0621.obtenerDatosPeriodoBean().listPagosPrevios != null &&
                        formulario0621.obtenerDatosPeriodoBean().listPagosPrevios["030301"] != null) {
                        $.each(formulario0621.obtenerDatosPeriodoBean().listPagosPrevios["030301"], function (k, v) {
                            valorOriginal = valorOriginal + (Number(v.crtImptri) + Number(v.crtImpint));
                        });
                    }
                } else if (cas == 342) {
                    if (formulario0621.obtenerDatosPeriodoBean().listPagosPrevios != null &&
                        formulario0621.obtenerDatosPeriodoBean().listPagosPrevios["010106"] != null) {
                        $.each(formulario0621.obtenerDatosPeriodoBean().listPagosPrevios["010106"], function (k, v) {
                            valorOriginal = valorOriginal + (Number(v.crtImptri) + Number(v.crtImpint));
                        });
                    }
                } else if (cas == 315) {
                    var PorcentajeRentaTributo = formulario0621
                        .obtenerPorcentajeRentaTributo(periodoCasilla, regimen);
                    if (PorcentajeRentaTributo != null && PorcentajeRentaTributo.resultado != null) {
                        var cntDec = formulario0621.obtenerCasilla(315).attr("cntDec");
                        valorOriginal = (Number(PorcentajeRentaTributo.resultado).toFixed(cntDec));
                    }
                } else if (cas == 380) {
                    var cntDec = formulario0621.obtenerCasilla(380).attr("cntDec");
                    valorOriginal = (Number(coeficienteRenta.coeficiente).toFixed(cntDec));
                } else if (cas == 145) {
                    if (formulario0621.obtenerDatosPeriodoBean().saldoAFavorTributo != null) {
                        valorOriginal = formulario0621.obtenerDatosPeriodoBean().saldoAFavorTributo["010101"];
                    }
                } else if (cas == 303) {
                    if (formulario0621.obtenerDatosPeriodoBean().saldoAFavorTributo != null) {
                        valorOriginal = formulario0621.obtenerDatosPeriodoBean().saldoAFavorTributo["030301"];
                    }
                } else if (cas == 171) {
                    if (formulario0621.obtenerDatosPeriodoBean().percepcionesPeriodo != null) {
                        var cntDec = formulario0621.obtenerCasilla(171).attr("cntDec");
                        valorOriginal = (Number(formulario0621.obtenerDatosPeriodoBean().percepcionesPeriodo).toFixed(cntDec));
                        console.log("::::VALOR171:::: " + valorOriginal);
                    }
                } else if (cas == 179) {

                    if (formulario0621.obtenerDatosPeriodoBean().retencionesPeriodo != null) {
                        var cntDec = formulario0621.obtenerCasilla(179).attr("cntDec");
                        valorOriginal = (Number(formulario0621.obtenerDatosPeriodoBean().retencionesPeriodo).toFixed(cntDec));
                        console.log("::::VALOR179:::: " + valorOriginal);
                    }
                }

                if (valorOriginal == undefined) {
                    valorOriginal = "";
                }

                if (valorActual != valorOriginal) {
                    valorDif = "1";
                }
                if (valorActual != null && valorActual != "") {
                    casillasSugeridasArray.push({
                        codigoCasilla: cas,
                        valorCasilla: valorActual,
                        periodoCasilla: periodoCasilla,
                        valorOriginal: valorOriginal.toString(),
                        infValDif: valorDif
                    });
                }
            }

            //Coeficiente IGV
            var casillasCoeficienteIGVArray = [];
            casillasCoeficienteIGVArray.push({
                codigoTributo: "010101",
                codigoFormulario: formulario0621.obtenerIdFormulario(),
                periodoCasilla: periodoCasilla,
                montoExportaciones: $("#trExportaciones").val(),
                montoVentasGravadas: $("#trVentasGravadas").val(),
                montoVentaNoGrabadas: $("#trVentasNoGravadas").val()
            });

            var deudaTributaria = 0;
            var tributos = $('[data-codigoTributo]');
            var tributosArray = [];
            var addPush = false;

            //console.log("::::::::::::::::::::::::::::::::::::::::::");
//                //console.log(formulario0621.obtenerDefinicionCasilla());
//                //console.log(formulario0621.obtenerPadronParametro());
            var tributosParaDeclara = new Map();

            tributosParaDeclara.set('010101',
                {
                    baseImponible: '0',
                    impuestoResultante: '0',
                    totalDeuda: '0',
                    importePagar: '0'
                });
            tributosParaDeclara.set('010106',
                {
                    baseImponible: '0',
                    impuestoResultante: '0',
                    totalDeuda: '0',
                    importePagar: '0'
                });
            tributosParaDeclara.set('030301',
                {
                    baseImponible: '0',
                    impuestoResultante: '0',
                    totalDeuda: '0',
                    importePagar: '0'
                });


            $.each(formulario0621.obtenerDefinicionCasilla().casillas, function (k, v) {
                if (v.codTriAso == '010101' ||
                    v.codTriAso == '010106' ||
                    v.codTriAso == '030301') {
                    var codTipCas = formulario0621.obtenerPadronParametroCodTipCas("0621", v.numCas);
                    if (codTipCas != null) {
                        var valor = formulario0621.obtenerValorCasilla(v.numCas);
                        if (valor == null || valor == undefined || valor == '') {
                            valor = '0';
                        }
                        if (codTipCas == "02") {
                            tributosParaDeclara.get(v.codTriAso).baseImponible = (valor);
                        } else if (codTipCas == "05") {
                            tributosParaDeclara.get(v.codTriAso).importePagar = (valor);
                        } else if (codTipCas == "03") {
                            tributosParaDeclara.get(v.codTriAso).impuestoResultante = (valor);
                        } else if (codTipCas == "07") {
                            tributosParaDeclara.get(v.codTriAso).totalDeuda = (valor);
                        }
                    }
                }
            });
            var tributoSelect = formulario0621.codigoRegimenSeleccionado();
            $.each(tributos, function (index1, item1) {
                addPush = false;
                if (formulario0621.esNivelSimplificado()) {
                    if (item1.id.indexOf("s-") > 0) {
                        addPush = true;
                    }
                } else {
                    if (item1.id.indexOf("s-") < 0) {
                        addPush = true;
                    }
                }
                if (addPush) {
                    if (item1.value != "") {
                        deudaTributaria = deudaTributaria + comunLibreria.obtenerValorDouble(item1.value);
                        var bi = tributosParaDeclara.get(item1.attributes["data-codigoTributo"].value).baseImponible;
                        var mtoDt = tributosParaDeclara.get(item1.attributes["data-codigoTributo"].value).totalDeuda;
                        var mtoPtot = tributosParaDeclara.get(item1.attributes["data-codigoTributo"].value).importePagar;
                        var impResultante = tributosParaDeclara.get(item1.attributes["data-codigoTributo"].value).impuestoResultante;
                        var codtribut = item1.attributes["data-codigoTributo"].value;

                        if (codtribut == '030301') {
                            codtribut = tributoSelect;
                        }

                        tributosArray.push({
                            codigoTributo: codtribut,
                            descripcionTributo: item1.attributes["data-descripcionTributo"].value,
//                                valorTributo: item1.value,
                            valorTributo: mtoPtot,
//                                montoDeudaTributaria: item1.value,
                            montoDeudaTributaria: mtoDt,
                            baseImponible: bi,
                            impuestoResultante: impResultante
                        });
                    }
                }
            });
            //console.log("::::::::::::::::::::tributosArray");
            //console.log(tributosArray);

            var usuarioBean = comunLibreria.obtenerUsuarioBean();
            var numRuc = usuarioBean.numRUC;

            var rectificatoria = "Si";

            var fechasVencimiento = formulario0621.obtenerDatosPeriodoBean().fecVenTributos;
            var fecVenc = null;
            if (fechasVencimiento != null) {
                $.each(fechasVencimiento, function (k, v) {
                    if (fecVenc == null) {
                        fecVenc = v;
                    } else {
                        return false
                    }
                });
            }

            var detallesCoeficienteIGVList = [];

            /* cargar detalles de coeficiente */
            for (var i = 1; i < 12; i++) {
//                $.each($('.asistente173'), function (k, v) {
                var periodoAsistente = $("#trPeriodo" + (i + 1)).text();
                var periodoAsistenteFormateado = comunLibreria.formatearPeriodoaCadena(periodoAsistente);
                var exp = $("#trExportacion" + i).val();
                var noGrav = $("#trVentasNoGravadas" + i).val();
                var grav = $("#trVentasgravada" + i).val();
                if ((exp != null && exp != undefined && exp != '') &&
                    (noGrav != null && noGrav != undefined && noGrav != '') &&
                    (grav != null && grav != undefined && grav != '')) {

                    detallesCoeficienteIGVList.push({
                        detallesCoeficienteIGVPK: {
                            codPerdet: periodoAsistenteFormateado,
                            numOrd: 0
                        },
                        perTri: periodoCasilla.toString(),
                        mtoExpdet: parseInt(exp),
                        codTri: '010101',
                        mtoVnogdet: parseInt(noGrav),
                        mtoVngdet: parseInt(grav),
                        indiceText: i
                    });

                }
//                });
            }

            var codDependencia = comunLibreria.obtenerUsuarioBean().codDepend;
            var tipoDeclaracion = _obtenerValorCasilla("895");
            var jsonDetalle = ' "detalle" : { "identificadorFormulario": "##__##__##", "numRuc":"' + numRuc + '", "codFormulario": "' + formulario0621.obtenerIdFormulario() + '", "numeroVersionFormulario": "' + formulario0621.obtenerVersionFormulario() + '", "descripcionFormulario": "IGV Renta Mensual", "montoPago": "' + deudaTributaria + '", "periodoTributo": "' + periodo + '","rectificatoria" : "' + rectificatoria + '","actualUIT":"' + formulario0621.obtenerDatosPeriodoBean().actualUIT + '","fecPres":"' + new Date() + '","fecVen":"' + fecVenc + '","tipoDeclaracion":"' + tipoDeclaracion + '","codDependencia":"' + codDependencia + '" }';
            var jsonCasillasSugeridas = ' "casillassugeridas": ' + JSON.stringify(casillasSugeridasArray);
            var jsonCoeficienteIGV = ' "coeficienteigv": ' + JSON.stringify(casillasCoeficienteIGVArray);
            var jsonTributo = ' "tributos": ' + JSON.stringify(tributosArray);
            var jsonCasillas = ' "casillas": ' + JSON.stringify(casillasArray);
            var jsonDetallesCoeficiente = ' "detallesCoeficienteIGVList": ' + JSON.stringify(detallesCoeficienteIGVList);

            var informacionLocal = {
                'datosPeriodo': formulario0621.obtenerDatosPeriodoBean()
            };
            var jsonInformacionLocal = ' "informacionlocal": ' + JSON.stringify(informacionLocal);


//                console.log("1::::::::::::::::::::::::");
//                console.log(jsonInformacionLocal);
            ////console.log("2::::::::::::::::::::::::" + comunIntegrador.cargarInformacionAutoGuadado());
            cargarInformacionVistaPreliminal(comunIntegrador.cargarInformacionAutoGuadado());
//                comunBandeja.addKeyDataStorage("CASILLAS_LLENAS_AGREGADAS",jsonCasillas);

            var jsonPagosPrevios = '"pagosprevios621": ';
            var json = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal0621.PagosPrevios");
            if (json != "null") {
                jsonPagosPrevios = jsonPagosPrevios + json;
            } else {
                jsonPagosPrevios = jsonPagosPrevios + "[] ";
            }

            var retePercIGVList = [];

            if (formulario0621.listaMap_Temp_P != null &&
                formulario0621.listaMap_Temp_P.length > 1) {
                retePercIGVList.push({
                    "perTri": periodoCasilla,
                    "codTipDec": "1",
                    "codTipArc": "1",
                    "codTipPer": "P",
                    "nomArc": formulario0621.nombreArchivoP,
                    "cntReg": formulario0621.listaMap_Temp_P.length - 1,
                    "mtoTotCmpr": formulario0621.Total_montoComprobantePercepcion,
                    "arcImp": formulario0621_importar.extraerContenido(formulario0621.listaMap_Temp_P),
                    "retencionesPercepcionesIgvPK": {
                        "numOrd": 0,
                        "numCorArc": 1
                    }
                });
            }
            if (formulario0621.listaMap_Temp_PI != null &&
                formulario0621.listaMap_Temp_PI.length > 1) {
                retePercIGVList.push({
                    "perTri": periodoCasilla,
                    "codTipDec": "1",
                    "codTipArc": "1",
                    "codTipPer": "P",
                    "nomArc": formulario0621.nombreArchivoPI,
                    "cntReg": formulario0621.listaMap_Temp_PI.length - 1,
                    "mtoTotCmpr": formulario0621.Total_montoComprobantePago,
                    "arcImp": formulario0621_importar.extraerContenido(formulario0621.listaMap_Temp_PI),
                    "retencionesPercepcionesIgvPK": {
                        "numOrd": 0,
                        "numCorArc": 2
                    }
                });
            }
            if (formulario0621.listaMap_Temp_R != null &&
                formulario0621.listaMap_Temp_R.length > 1) {
                retePercIGVList.push({
                    "perTri": periodoCasilla,
                    "codTipDec": "1",
                    "codTipArc": "1",
                    "codTipPer": "R",
                    "nomArc": formulario0621.nombreArchivoR,
                    "cntReg": formulario0621.listaMap_Temp_R.length - 1,
                    "mtoTotCmpr": formulario0621.Total_montoComprobanteRetencion,
                    "arcImp": formulario0621_importar.extraerContenido(formulario0621.listaMap_Temp_R),
                    "retencionesPercepcionesIgvPK": {
                        "numOrd": 0,
                        "numCorArc": 3
                    }
                });
            }

            var jsonRetePercIGVList = '"retePercIGVList":' + JSON.stringify(retePercIGVList) + '';

            var jsonResult = '{' + jsonDetalle + ',' + jsonCoeficienteIGV + ',' + jsonCasillasSugeridas + ',' + jsonTributo + ',' + jsonCasillas + ',' + jsonPagosPrevios + ',' + jsonRetePercIGVList + ',' + jsonDetallesCoeficiente + '}';
//                var jsonResult = '{' + jsonDetalle + ',' + jsonCoeficienteIGV + ',' + jsonCasillasSugeridas + ',' + jsonTributo + ',' + jsonCasillas + ',' + jsonPagosPrevios + ',' + jsonRetePercIGVList + ',' + jsonDetallesCoeficiente + ',' + jsonInformacionLocal + '}';

            //console.log("\n\n:::: json agregado : ");
            //console.log(jsonResult);


            var newJsonResult = comunBandeja.addKeyInStorage(jsonResult);
            window.parent.postMessage("AGREGAR-BANDEJA-DE-CARRITO-" + newJsonResult, "*");
            localStorage.setItem('formulario0621', newJsonResult);

            /* alamacena informacion local en el storage */
            var local = localStorage.getItem('SUNAT.INFORMACION.LOCAL');
            if (local == null || local == undefined || local == '') {
                local = {};
            } else {
                local = JSON.parse(local);
            }

            local[JSON.parse(newJsonResult).detalle.identificadorFormulario] = '{' + jsonInformacionLocal + '}';

            localStorage.setItem('SUNAT.INFORMACION.LOCAL', JSON.stringify(local));

            //Invocando servicio para guardar casillas frecuentes
            var casillasFrecuentes = $('[data-casillaFrecuente]');
            var casillasFrecuentesArray = [];
            $.each(casillasFrecuentes, function (index, item) {
                casillasFrecuentesArray.push({
                    codigoCasilla: $(item).data('casilla'),
                    valorCasilla: $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="' + $(item).data('casilla') + '"]').val()
                });
            });
            if (casillasFrecuentesArray.length > 0) {
                formulario0621.myIntegrador.guardarCasillaFrecuente(formulario0621.obtenerIdFormulario(), JSON.stringify(casillasFrecuentesArray));
            }

            localStorage.removeItem("SUNAT.AreaTemporal1.PagosPrevios"); //Eliminado de localstorage
            for (var idx = 0, len = localStorage.length; idx < len; idx++) {
                var key = localStorage.key(idx);
                if (comunLibreria.contieneCadena(key, "SUNAT.MontoPagoPrevio")) {
                    localStorage.removeItem(key);
                }
            }
            comunServiciosControlador.registrarLog(comunLibreria.generarInformacionLog("Se agrego formulario 0621 a Bandeja de Presentacion"));

        } else {
            $('#modalFormularioExiste').modal('show');
        }

    }

    function cargarInformacionVistaPreliminal(data) {
        if (data != null && data[1] != null) {
            data = data[1];

            var casillas = $("[id*=txt_reporte]");

            $.each(casillas, function (k, v) {
                if ($(v).attr("id").indexOf("periodo") >= 0) {
                    $(v).text(formulario0621.obtenerValorCasilla(7));
                } else if ($(v).attr("id").indexOf("ruc") >= 0) {
                    $(v).text(usuarioBean.numRUC);
                } else if ($(v).attr("id").indexOf("razon") >= 0) {
                    $(v).text(usuarioBean.nombreCompleto);
                } else {
                    var cas = $(v).attr("id").split('_')[2];
                    var res = data[cas];

                    if (res != null && res != undefined) {
                        if (cas == "391") {
                            if (res.valor == "1") {
                                $(v).text("SI");
                            } else if (res.valor == "0") {
                                $(v).text("NO");
                            }
                        } else {
                            $(v).text(comunLibreria.obtenerMontoFormateado(res.valor));
                        }

                    } else {
                        $(v).text("");
                    }
                }
            });
        }
    }

    $('#simula-pdf-click').click(function () {
        $("#myModal-40 .modal-dialog").addClass("size-modal");
        $('#00001').addClass("hidden");
        $('#00002').removeClass("hidden");
        $('#myModal-40').modal('show');
    });

    $('#cerrar-preliminar-2').click(function () {
        $("#myModal-40 .modal-dialog").removeClass("size-modal");
        $('#00001').removeClass("hidden");
        $('#00002').addClass("hidden");
    });

    $("#close-panel").click(function () {
        $("#titulo-deuda-2").toggleClass("hidden");
        $("#close-panel_icon").toggleClass("glyphicon-triangle-top").toggleClass("glyphicon-triangle-bottom");
    });

    $("#close-panel2").click(function () {
        $("#titulos-deuda").toggleClass("hidden");
        $("#close-panel_icon2").toggleClass("glyphicon-triangle-top").toggleClass("glyphicon-triangle-bottom");
    });

    $("#mostrar_panel-error,#mostrar_panel-s-error").click(function () {
        //console.log("===mostrar_panel-error 1====");
        if (formulario0621.validarObligatorios(null)) {
            formulario0621.mostrarMensajeGeneral("Casillas llenadas Correctamente");
        }
    });

    $(".Panel-Bandeja__Cabeza").click(function () {
        $(".Panel-Bandeja__Cuerpo").toggleClass("Show");
        $(".Panel-Bandeja__Cabeza #Panel-Bandeja-icono").toggleClass("glyphicon-new-window").toggleClass("glyphicon-remove");
    });

    /*PRESENTAR PAGAR*/
    $('#btnPresentarPagar').click(function () {
        $("#btnPaso03").trigger("click");
        $(".myModal-40").modal("hide");
        $(".modal-backdrop").addClass("hidden");
        localStorage.setItem("Tutorkey", true);
    });


    $('#btnvalidar').click(function () {
        /*
         $(".Panel-Bandeja__Cuerpo").removeClass("Show");
         $('#home').removeClass("active");
         $('#home').removeClass("in");
         //$('.menu2').removeClass("active in");
         $('#menu2').removeClass("active");
         $('#menu2').removeClass(" in");
         $('#menu1').addClass("active");
         $('#menu1').addClass(" in");

         $("#Paso-form_01").parents('li').removeClass("active");
         $("#Paso-form_03").parents('li').removeClass("active");
         $("#Paso-form_02").parents('li').addClass("active");
         $('#casilla131').focus().select();
         */
    });

    $('#btnvalidar2').click(function () {
        /*
         $(".Panel-Bandeja__Cuerpo").removeClass("Show");
         $('#home').addClass("active");
         $('#home').addClass("in");
         //$('.menu2').removeClass("active in");
         $('#menu2').removeClass("active");
         $('#menu2').removeClass(" in");
         $('#menu1').removeClass("active");
         $('#menu1').removeClass(" in");

         $("#Paso-form_01").parents('li').addClass("active");
         $("#Paso-form_03").parents('li').removeClass("active");
         $("#Paso-form_02").parents('li').removeClass("active");

         $('#periodo_tributario_1').focus().select();
         */
    });

    $('#star-tutor').click(function () {
        $('#star-tutor').addClass("btn-switch_activo");
        $('#check').addClass("glyphicon-ok");
    });

    $('#siguiente-1').click(function () {
        $('#paso-1_tutor').addClass("hidden");
        $('#paso-2_tutor').removeClass("hidden");
    });
    $('#atras-1').click(function () {
        $('#paso-1_tutor').removeClass("hidden");
        $('#paso-2_tutor').addClass("hidden");
    });

    $('#siguiente-2').click(function () {
        $('#paso-2_tutor').addClass("hidden");
        $('#paso-3_tutor').removeClass("hidden");
    });
    $('#atras-2').click(function () {
        $('#paso-2_tutor').removeClass("hidden");
        $('#paso-3_tutor').addClass("hidden");
    });

    $('#siguiente-3').click(function () {
        $('#paso-3_tutor').addClass("hidden");
        $('#paso-4_tutor').removeClass("hidden");
    });
    $('#atras-3').click(function () {
        $('#paso-3_tutor').removeClass("hidden");
        $('#paso-4_tutor').addClass("hidden");
    });

    $('#siguiente-4').click(function () {
        $('#paso-4_tutor').addClass("hidden");
        $('#paso-5_tutor').removeClass("hidden");
    });
    $('#atras-4').click(function () {
        $('#paso-4_tutor').removeClass("hidden");
        $('#paso-5_tutor').addClass("hidden");
    });

    $('#siguiente-5').click(function () {
        $('#paso-5_tutor').addClass("hidden");
        $('#paso-6_tutor').removeClass("hidden");
    });
    $('#atras-5').click(function () {
        $('#paso-5_tutor').removeClass("hidden");
        $('#paso-6_tutor').addClass("hidden");
    });

    $('#siguiente-6').click(function () {
        $('#paso-6_tutor').addClass("hidden");
        $('#paso-7_tutor').removeClass("hidden");
    });
    $('#atras-6').click(function () {
        $('#paso-6_tutor').removeClass("hidden");
        $('#paso-7_tutor').addClass("hidden");
    });

    $("#siguiente-7").click(function () {
        $("#btnPaso03").trigger("click");
        $(".modal-backdrop").addClass("hidden");
    });

    $("#siguiente-8").click(function () {
        $('#paso-8_tutor').removeClass("hidden");
        $('#paso-7_tutor').addClass("hidden");
    });
    $('#atras-7').click(function () {
        $('#paso-7_tutor').removeClass("hidden");
        $('#paso-8_tutor').addClass("hidden");
    });
    /*  FIN WIZARD PASOS */

    /*  AVANZAR PESTAÑAS */
    function probandoSiguienteDjCompleta(botonSiguiente, e) {

        var tab = "#igv";
        var rubCas = "2";
        var secCas = "1";
        var general = false;
        var paso = "#Paso-form_02";
        var rubCasSiguiente = 2;
        var secCasSiguiente = "1";

        //console.log("====botonSiguiente=====> " + $(botonSiguiente));

        if ($(botonSiguiente).attr('id') == 'Siguiente01') {

            general = true;
            tab = "#home";
            rubCas = "1";
            secCas = "2";
            paso = "#Paso-form_02";
            rubCasSiguiente = 2;
            secCasSiguiente = "1";
            navegacion();
        } else if ($(botonSiguiente).attr('id') == 'Siguiente02') {
            //funcion_173();
            funcion_llenar_173();
            tab = "#igv";
            rubCas = "2";
            secCas = "1";
            paso = "#Paso-form_03";
            rubCasSiguiente = 2;
            secCasSiguiente = "2";
        } else if ($(botonSiguiente).attr('id') == 'Siguiente03') {
            tab = "#igv";
            rubCas = "2";
            secCas = "2";
            var IVAP_isSelected = formulario0621.obtenerValorCasillaRadio("867");
            if (IVAP_isSelected == '1') {
                paso = '#Paso-form_04';
                rubCasSiguiente = 2;
                secCasSiguiente = "3";
            } else {
                paso = '#Paso-form_05';
                rubCasSiguiente = 2;
                secCasSiguiente = "4";
            }

//            paso = "#Paso-form_04";
        } else if ($(botonSiguiente).attr('id') == 'Siguiente04') {
            tab = "#ivap";
            rubCas = "2";
            secCas = "3";
            paso = "#Paso-form_05";
            rubCasSiguiente = 2;
            secCasSiguiente = "4";
        } else if ($(botonSiguiente).attr('id') == 'Siguiente05') {
            if (_funcionalidad_validar_Renta() == "0") {
                return;
            } else if (_funcionalidad_validar_364() == "0") {
                return;
            } else {
                tab = "#renta";
                rubCas = "2";
                secCas = "4";
                paso = "#Paso-form_06";
                rubCasSiguiente = 3;
                secCasSiguiente = "1";

                /*cargar pagos previos*/
                formulario0621.cargarPagosPreviosEnCasillas();
            }

        } else if ($(this).attr('id') == 'Siguiente06') {

        } else if ($(this).attr('id') == 'Siguiente07') {

        }
        var messagesArray = [];
        var faltanCasillas = false;
        $(tab).find("input[type='text']").each(function () {
            if ($(this).attr("required") == 'required'
                && $(this).attr("numrubcas") == rubCas
                && $(this).attr("numseccas") == secCas
            ) {
                if ($(this).val() == null || $(this).val() == "") {
                    messagesArray.push($(this).attr("data-casilla"));
                }
            }
        });
//        //console.log("==========REALIZANDO CALCULO POR  TAB ======");
        comunIntegrador.ejecutarCalculoPorTab(dataParametria, rubCasSiguiente, secCasSiguiente);

        if (messagesArray != null && messagesArray.length > 0) {
            if (!general) {
                //console.log("===probandoSiguiente FALTA LLENAR CASILLAS===");
                formulario0621.validarObligatorios(messagesArray);
                faltanCasillas = true;
                e.preventDefault();
                e.stopPropagation();
            }
        } else {
            //console.log("===probandoSiguiente PASO VALIDACION====");
            formulario0621.calcularInteresMoratorio("#Paso-form_06");
//            $(paso).trigger("click");
            formulario0621.validarObligatorios([]);
            faltanCasillas = false;
        }

        return faltanCasillas;
    }

    function probandoAnteriorDjCompleta(botonAnterior, e) {
        var tab = "#igv";
        var rubCas = "2";
        var secCas = "1";
        var paso = "#Paso-form_02";
        //console.log("====botonAnterior=====> " + $(botonAnterior));

        if ($(botonAnterior).attr('id') == 'Anterior01') {
            tab = "#igv";
            rubCas = "2";
            secCas = "1";
            paso = '#Paso-form_01';
        } else if ($(botonAnterior).attr('id') == 'Anterior02') {
            tab = "#igv";
            rubCas = "2";
            secCas = "2";
            paso = '#Paso-form_atras02';
        } else if ($(botonAnterior).attr('id') == 'Anterior03') {
            tab = "#ivap";
            rubCas = "2";
            secCas = "3";


            paso = "#Paso-form_atras03";
        } else if ($(botonAnterior).attr('id') == 'Anterior04') {
            tab = "#renta";
            rubCas = "2";
            secCas = "4";

            var IVAP_isSelected = ($('*[data-' + _obtenerNivelDeclaracion() + 'casilla="867"]').is(':checked'));// formulario0621.obtenerValorCasillaRadio("867");
            if (IVAP_isSelected == true) {
                paso = '#Paso-form_04';
            } else {
                paso = '#Paso-form_atras03';
            }
        } else if ($(botonAnterior).attr('id') == 'Anterior05') {
            tab = "#menu2";
            rubCas = "3";
            secCas = "1";
            paso = "#Paso-form_02";
        } else if ($(botonAnterior).attr('id') == 'Anterior06') {

        } else if ($(botonAnterior).attr('id') == 'Anterior08') {

        }
        var messagesArray = [];
        var faltanCasillas = false;
        $(tab).find("input[type='text']").each(function () {
            if ($(this).attr("required") == 'required'
                && $(this).attr("numrubcas") == rubCas
                && $(this).attr("numseccas") == secCas
            ) {
                if ($(this).val() == null || $(this).val() == "") {
                    messagesArray.push($(this).attr("data-casilla"));
                }
            }
        });

        if (messagesArray != null && messagesArray.length > 0) {
            formulario0621.validarObligatorios(messagesArray);
            faltanCasillas = true;
            e.preventDefault();
            e.stopPropagation();
        } else {
//            $(paso).trigger("click");
            formulario0621.validarObligatorios([]);
            faltanCasillas = false;
        }
        return faltanCasillas;
    }

    function probandoSiguienteDjSimplificada(botonSiguiente, e) {
        var tab = "#igv001";
        var rubCas = "2";
        var secCas = "1";
        var general = false;
        var paso = "#paso-simple-02";

        var rubCasSiguiente = 2;
        var secCasSiguiente = "1";

        if ($(botonSiguiente).attr('id') == 'Siguiente-01') {
            general = true;
            tab = "#home001";
            rubCas = "1";
            secCas = "2";
            paso = "#paso-simple-02";
            rubCasSiguiente = 2;
            secCasSiguiente = "1 2";
        } else if ($(botonSiguiente).attr('id') == 'Siguiente-02') {
            tab = "#igv001";
            rubCas = "2";
            secCas = "1 2";
            paso = "#paso-simple-03";
            rubCasSiguiente = 2;
            secCasSiguiente = "4";
        } else if ($(botonSiguiente).attr('id') == 'Siguiente-03') {

            if (_funcionalidad_validar_Renta() == "0") {
                return;
            } else if (_funcionalidad_validar_364() == "0") {
                return;
            } else {
                tab = "#renta002";
                rubCas = "2";
                secCas = "4";
                paso = "#paso-simple-04";
                rubCasSiguiente = 3;
                secCasSiguiente = "1";
                /*cargar pagos previos*/
                formulario0621.cargarPagosPreviosEnCasillas();
            }


        }
        var messagesArray = [];
        var faltanCasillas = false;
        $(tab).find("input[type='text']").each(function () {
            if ($(this).attr("required") == 'required'
                && $(this).attr("numrubcas") == rubCas
                && secCas.indexOf($(this).attr("numseccas")) >= 0
            ) {
                if ($(this).val() == null || $(this).val() == "") {
                    messagesArray.push($(this).attr("data-s-casilla"));
                }
            }
        });

        comunIntegrador.ejecutarCalculoPorTab(dataParametria, rubCasSiguiente, secCasSiguiente);

        if (messagesArray != null && messagesArray.length > 0) {
            if (!general) {
                //console.log("===probandoSiguiente FALTA LLENAR CASILLAS===");
                formulario0621.validarObligatorios(messagesArray);
                faltanCasillas = true;
                e.preventDefault();
                e.stopPropagation();
            }
        } else {
            //console.log("===probandoSiguiente PASO VALIDACION====");
            formulario0621.calcularInteresMoratorio(paso);
//            $(paso).trigger("click");
            formulario0621.validarObligatorios([]);
            faltanCasillas = false;
        }
        return faltanCasillas;
    }

    function probandoAnteriorDjSimplificada(botonAnterior, e) {
        var tab = "#igv001";
        var rubCas = "2";
        var secCas = "1";
        var paso = "#paso-simple-01";
        if ($(botonAnterior).attr('id') == 'Anterior-01') {
            tab = "#igv001";
            rubCas = "2";
            secCas = "1 2";
            paso = "#paso-simple-01";
        } else if ($(botonAnterior).attr('id') == 'Anterior-02') {
            tab = "#renta002";
            rubCas = "2";
            secCas = "4";
            paso = "#paso-simple-05";
        } else if ($(botonAnterior).attr('id') == 'Anterior-03') {
            tab = "#menu002";
            rubCas = "3";
            secCas = "1";
            paso = "#paso-simple-02";
        }
        var messagesArray = [];
        var faltanCasillas = false;
        $(tab).find("input[type='text']").each(function () {
            if ($(this).attr("required") == 'required'
                && $(this).attr("numrubcas") == rubCas
                && secCas.indexOf($(this).attr("numseccas")) >= 0
            ) {
                if ($(this).val() == null || $(this).val() == "") {
                    messagesArray.push($(this).attr("data-s-casilla"));
                }
            }
        });
        if (messagesArray != null && messagesArray.length > 0) {
            formulario0621.validarObligatorios(messagesArray);
            faltanCasillas = true;
            e.preventDefault();
            e.stopPropagation();
        } else {
//            $(paso).trigger("click");
            formulario0621.validarObligatorios([]);
            faltanCasillas = false;
        }
        return faltanCasillas;
    }

    $('[id^=Siguiente0]').click(function () {
        var tab = "#igv";
        var rubCas = "2";
        var secCas = "1";
        var general = false;
        var paso = "#Paso-form_02";
        var rubCasSiguiente = 2;
        var secCasSiguiente = "1";


        if ($(this).attr('id') == 'Siguiente01') {
//            formulario0621.funcionalidad_Casilla380();
//            formulario0621.funcionalidad_Casilla315();
//            formulario0621.funcionalidad_Casilla312();

            general = true;
            tab = "#home";
            rubCas = "1";
            secCas = "2";
            paso = "#Paso-form_02";
            rubCasSiguiente = 2;
            secCasSiguiente = "1";
            navegacion();
        } else if ($(this).attr('id') == 'Siguiente02') {
            //funcion_173();
            funcion_llenar_173();
            tab = "#igv";
            rubCas = "2";
            secCas = "1";
            paso = "#Paso-form_03";
            rubCasSiguiente = 2;
            secCasSiguiente = "2";
        } else if ($(this).attr('id') == 'Siguiente03') {
            tab = "#igv";
            rubCas = "2";
            secCas = "2";
            var IVAP_isSelected = formulario0621.obtenerValorCasillaRadio("867");
            if (IVAP_isSelected == '1') {
                paso = '#Paso-form_04';
                rubCasSiguiente = 2;
                secCasSiguiente = "3";
            } else {
                paso = '#Paso-form_05';
                rubCasSiguiente = 2;
                secCasSiguiente = "4";
            }

//            paso = "#Paso-form_04";
        } else if ($(this).attr('id') == 'Siguiente04') {
            tab = "#ivap";
            rubCas = "2";
            secCas = "3";
            paso = "#Paso-form_05";
            rubCasSiguiente = 2;
            secCasSiguiente = "4";
        } else if ($(this).attr('id') == 'Siguiente05') {
            if (_funcionalidad_validar_Renta() == "0") {
                return;
            } else if (_funcionalidad_validar_364() == "0") {
                return;
            } else {
                tab = "#renta";
                rubCas = "2";
                secCas = "4";
                paso = "#Paso-form_06";
                rubCasSiguiente = 3;
                secCasSiguiente = "1";

                /*cargar pagos previos*/
                formulario0621.cargarPagosPreviosEnCasillas();
            }

        } else if ($(this).attr('id') == 'Siguiente06') {

        } else if ($(this).attr('id') == 'Siguiente07') {

        }
        var messagesArray = [];
        $(tab).find("input[type='text']").each(function () {
            if ($(this).attr("required") == 'required'
                && $(this).attr("numrubcas") == rubCas
                && $(this).attr("numseccas") == secCas
            ) {
                if ($(this).val() == null || $(this).val() == "") {
                    messagesArray.push($(this).attr("data-casilla"));
                }
            }
        });
        if (!formulario0621.validarButtonGroupRadios(866)) {
            messagesArray.push(formulario0621.obtenerCasilla(866).attr("data-casilla"));
        }
//        //console.log("==========REALIZANDO CALCULO POR  TAB ======");
        comunIntegrador.ejecutarCalculoPorTab(dataParametria, rubCasSiguiente, secCasSiguiente);

        if (messagesArray != null && messagesArray.length > 0) {
            if (!general) {
                formulario0621.validarObligatorios(messagesArray);
            }
        } else {
            formulario0621.calcularInteresMoratorio("#Paso-form_06");

            $(paso).trigger("click");
            formulario0621.validarObligatorios([]);
        }
    });

    $('[id^=Anterior0]').click(function () {
        var tab = "#igv";
        var rubCas = "2";
        var secCas = "1";
        var paso = "#Paso-form_02";
        if ($(this).attr('id') == 'Anterior01') {
            tab = "#igv";
            rubCas = "2";
            secCas = "1";
            paso = '#Paso-form_01';
        } else if ($(this).attr('id') == 'Anterior02') {
            tab = "#igv";
            rubCas = "2";
            secCas = "2";
            paso = '#Paso-form_atras02';
        } else if ($(this).attr('id') == 'Anterior03') {
            tab = "#ivap";
            rubCas = "2";
            secCas = "3";


            paso = "#Paso-form_atras03";
        } else if ($(this).attr('id') == 'Anterior04') {
            tab = "#renta";
            rubCas = "2";
            secCas = "4";

            var IVAP_isSelected = ($('*[data-' + _obtenerNivelDeclaracion() + 'casilla="867"]').is(':checked'));// formulario0621.obtenerValorCasillaRadio("867");
            if (IVAP_isSelected == true) {
                paso = '#Paso-form_04';
            } else {
                paso = '#Paso-form_atras03';
            }
        } else if ($(this).attr('id') == 'Anterior05') {
            tab = "#menu2";
            rubCas = "3";
            secCas = "1";
            paso = "#Paso-form_02";
        } else if ($(this).attr('id') == 'Anterior06') {

        } else if ($(this).attr('id') == 'Anterior08') {

        }
        var messagesArray = [];
        $(tab).find("input[type='text']").each(function () {
            if ($(this).attr("required") == 'required'
                && $(this).attr("numrubcas") == rubCas
                && $(this).attr("numseccas") == secCas
            ) {
                if ($(this).val() == null || $(this).val() == "") {
                    messagesArray.push($(this).attr("data-casilla"));
                }
            }
        });

        if (messagesArray != null && messagesArray.length > 0) {
            formulario0621.validarObligatorios(messagesArray);
        } else {
            $(paso).trigger("click");
            formulario0621.validarObligatorios([]);
        }

    });

    $('[id^=Siguiente-0]').click(function () {
        var tab = "#igv001";
        var rubCas = "2";
        var secCas = "1";
        var general = false;
        var paso = "#paso-simple-02";

        var rubCasSiguiente = 2;
        var secCasSiguiente = "1";

        if ($(this).attr('id') == 'Siguiente-01') {
            general = true;
            tab = "#home001";
            rubCas = "1";
            secCas = "2";
            paso = "#paso-simple-02";
            rubCasSiguiente = 2;
            secCasSiguiente = "1 2";
        } else if ($(this).attr('id') == 'Siguiente-02') {
            tab = "#igv001";
            rubCas = "2";
            secCas = "1 2";
            paso = "#paso-simple-03";
            rubCasSiguiente = 2;
            secCasSiguiente = "4";
        } else if ($(this).attr('id') == 'Siguiente-03') {

            if (_funcionalidad_validar_Renta() == "0") {
                return;
            } else if (_funcionalidad_validar_364() == "0") {
                return;
            } else {
                tab = "#renta002";
                rubCas = "2";
                secCas = "4";
                paso = "#paso-simple-04";
                rubCasSiguiente = 3;
                secCasSiguiente = "1";
                /*cargar pagos previos*/
                formulario0621.cargarPagosPreviosEnCasillas();
            }


        }
        var messagesArray = [];
        $(tab).find("input[type='text']").each(function () {
            if ($(this).attr("required") == 'required'
                && $(this).attr("numrubcas") == rubCas
                && secCas.indexOf($(this).attr("numseccas")) >= 0
            ) {
                if ($(this).val() == null || $(this).val() == "") {
                    messagesArray.push($(this).attr("data-s-casilla"));
                }
            }
        });

        comunIntegrador.ejecutarCalculoPorTab(dataParametria, rubCasSiguiente, secCasSiguiente);

        if (messagesArray != null && messagesArray.length > 0) {
            if (!general) {
                formulario0621.validarObligatorios(messagesArray);
            }
        } else {
            formulario0621.calcularInteresMoratorio(paso);
            $(paso).trigger("click");
            formulario0621.validarObligatorios([]);
        }
    });

    $('[id^=Anterior-0]').click(function () {
        var tab = "#igv001";
        var rubCas = "2";
        var secCas = "1";
        var paso = "#paso-simple-01";
        if ($(this).attr('id') == 'Anterior-01') {
            tab = "#igv001";
            rubCas = "2";
            secCas = "1 2";
            paso = "#paso-simple-01";
        } else if ($(this).attr('id') == 'Anterior-02') {
            tab = "#renta002";
            rubCas = "2";
            secCas = "4";
            paso = "#paso-simple-05";
        } else if ($(this).attr('id') == 'Anterior-03') {
            tab = "#menu002";
            rubCas = "3";
            secCas = "1";
            paso = "#paso-simple-02";
        }
        var messagesArray = [];
        $(tab).find("input[type='text']").each(function () {
            if ($(this).attr("required") == 'required'
                && $(this).attr("numrubcas") == rubCas
                && secCas.indexOf($(this).attr("numseccas")) >= 0
            ) {
                if ($(this).val() == null || $(this).val() == "") {
                    messagesArray.push($(this).attr("data-s-casilla"));
                }
            }
        });
        if (messagesArray != null && messagesArray.length > 0) {
            formulario0621.validarObligatorios(messagesArray);
        } else {
            $(paso).trigger("click");
            formulario0621.validarObligatorios([]);
        }
    });

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

    $('#home-simple').click(function () {

        $('#renta-simple').removeClass("hidden");
        $('#renta-completa').addClass("hidden");

        $("#tuto-form").removeClass("hidden");
    });

    $('#home-completa').click(function () {
        $('#renta-simple').addClass("hidden");
        $('#renta-completa').removeClass("hidden");

        $("#tuto-form").addClass("hidden");
    });

    $('[data-toggle="popover"]').popover();

    $('body').on('click', function (e) {
        $('[data-toggle="popover"]').each(function () {
            //the 'is' for buttons that trigger popups
            //the 'has' for icons within a button that triggers a popup
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    $('#casilla861-2').click(function () {
        //console.log('>>>>>>>>>>>> click en amazonia'),
        $('#date-004').removeClass("hidden");
        $('#date-005').removeClass("hidden");
    });

    //$('#casilla861-0, #casilla861-1, #casilla861-8,#casilla861-2, #casilla861-Z, #casilla861-4,#casilla861-5,#casilla861-s-0,#casilla861-s-1,#casilla861-s-2').change(function () {
    $('#casilla861-0, #casilla861-1, #casilla861-8, #casilla861-Z, #casilla861-4,#casilla861-5,#casilla861-s-0,#casilla861-s-1,#casilla861-s-2').change(function () {
        //console.log("modificacionAfectacionRegimenRenta desde RENTA");
        formulario0621.quitarAgregarRequeridoCasillasInvisibles();

        formulario0621.modificacionAfectacionRegimenRenta();

        $('#date-004').addClass("hidden");
        $('#date-005').addClass("hidden");
    });

    $('#Añadir-Bandeja').removeClass("hidden");

    $("#Presentar-Pagar").click(function () {
        $("#btnPaso03").trigger("click");
        $(".modal-backdrop").addClass("hidden");
    });
    $("#Otro-Formulario").click(function () {
        $("#btnPaso01").trigger("click");
        $(".modal-backdrop").addClass("hidden");
    });

    $("#Recuperar_").click(function () {
        $('#Recuperar_boton').trigger("click");
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })


    $('.btnPaso').removeClass("current");
    $('#btnPaso02').addClass("current");

    $(function () {
        $('[data-toggle="popover"]').popover()
    });

    $('.date-picker2').datepicker({
        format: "dd/mm/yyyy",
        viewMode: "days",
        minViewMode: "days",
        autoclose: true

//       todayBtn: "linked",
//       language: "it",
//       autoclose: true,
//       todayHighlight: true,
//       dateFormat: 'dd/mm/yyyy'


    });


    $("#resuelto").click(function () {
        $('#Paso_1_agregar').addClass("hidden");
        $('#Paso_2_agregar').removeClass("hidden");
    });

    $('[rel="tooltip"]').tooltip();

    var valorCasilla = $("#casilla100").val();
    if (valorCasilla == null) {
        $("#casilla100").val("0");
    }

    $("#btnAceptarModal").click(function () {
        var importe = $("#TotalImporte102").val();
        var casilla100 = $('#casilla100').val();
        if (parseInt(importe) > parseInt(casilla100)) {
            formulario0621.mostrarMensajeGeneral("El importe de la casilla 102 no puede ser mayor al importe de la casilla 100");
            $("#casilla102").val("");
        } else {
            $("#casilla102").val(importe);
        }
    });
    var percepciones = null;
    $("#casilla171, #casilla-s-171").click(function () {
        $("#click-modal-asistente-2").trigger("click");
    });

    //modificar para que se seteen las casillas de retenciones y percepciones
    $("#casilla684").click(function () {
        formulario0621.mostrarMensajeAceptarCancelar(
            "Sr. Contribuyente, a fin de ingresar el importe por las percepciones, deberá ingresar la información a través de la importación de un archivo plano. La estructura del archivo plano podrá visualizarlo en la Ayuda",
            function (evt) {
//                    evt.stopPropagation();
                $('#btnAceptarAsistenteCasilla171').focus();
                $('#modalMensajeAceptarCancelar').modal('hide');
                $('#casilla684').val('0');
                $('#casilla684').attr('readonly', true);
            },
            function (evt) {
//                    evt.stopPropagation();
                $('#casilla684').attr('readonly', false);
                $('#modalMensajeAceptarCancelar').modal('hide');
                $('#casilla684').select()
                $('#casilla684').focus();
            }, "", ""
        );
    });

    $("#casilla-686").click(function () {
        formulario0621.mostrarMensajeAceptarCancelar(
            "Sr. Contribuyente, a fin de ingresar el importe por las retenciones, deberá ingresar la información a través de la importación de un archivo plano. La estructura del archivo plano podrá visualizarlo en la Ayuda",
            function (evt) {
//                    evt.stopPropagation();
                $('#btnAceptarAsistenteCasilla179').focus();
                $('#modalMensajeAceptarCancelar').modal('hide');
                $('#casilla-686').val('0');
                $('#casilla-686').attr('readonly', true);
            },
            function (evt) {
//                    evt.stopPropagation();
                $('#casilla-686').attr('readonly', false);
                $('#modalMensajeAceptarCancelar').modal('hide');
                $('#casilla-686').select()
                $('#casilla-686').focus();
            }, "", ""
        );
    });

    $("#btnAceptarAsistenteCasilla171").click(function () {
        var suma = 0;

        var valCasilla684 = $("#casilla684").val();
        var valCasilla685 = $("#casilla685").val();
        if (valCasilla684 == null || valCasilla684 == "") {
            valCasilla684 = 0;
        }
        if (valCasilla685 != "") {
            suma = parseFloat(valCasilla684) + parseFloat(valCasilla685);
        }
        $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="171"]').val(suma);
        $('#modal-asistente-2').modal('hide');
    });
    var retenciones = null;
    $("#casilla179, #casilla-s-179").click(function () {
        $("#click-modal-asistente-3").trigger("click");
    });

    $("#btnAceptarAsistenteCasilla179").click(function () {
        var suma = 0;
        var valCasilla686 = $("#casilla-686").val();
        var valCasilla687 = $("#casilla687").val();

        if (valCasilla686 == null || valCasilla686 == "") {
            valCasilla686 = 0;
        }

        if (valCasilla686 != "" && valCasilla687 != "") {
            suma = parseFloat(valCasilla686) + parseFloat(valCasilla687);
        }
        $('*[data-' + _obtenerNivelDeclaracion() + 'casilla="179"]').val(suma);
        $('#modal-asistente-3').modal('hide');
    });

    $("#casilla685").click(function () {
        $("#click-casilla685").trigger("click");
    });

    $("#casilla185, #casilla317, #casilla342, #casilla-s-185, #casilla-s-317").click(function (e) {
        var cas = $(this).attr("data-" + formulario0621.obtenerNivelDeclaracion() + "casilla");

        if (dataParametria.indPag == 3 && cas != null) { //PREGUNTAR
            formulario0621.cargarAsistentePagosPrevios(cas);
            $("#click-modal185").trigger("click");
        }
    });

    $("#btnGuardarPagosPrevios").click(function () {
        var suma = 0;
        var codTributo = "";
        var listCrtNumRec = new Object();
        $('#tblPagosPrevios ').find('tr').each(function () {
            var row = $(this);
            var check = row.find("input[type='checkbox']");
            var txt = row.find("input.mascaraNumero");

            listCrtNumRec[check.attr("crtnumrec")] = {
                "seleccion": check.prop("checked"),
                "valor": txt.val()
            };

            if (check.prop("checked")) {
                var h = row.find('td').eq(5).html();
                codTributo = row.find('td').eq(7).html();
                suma = suma + parseFloat(txt.val());
            } else {
                codTributo = row.find('td').eq(7).html();
            }
        });
        formulario0621.actualizarPagosPrevios(codTributo, listCrtNumRec);
        formulario0621.setearCasilla(codTributo, suma);

        formulario0621.calcularInteresMoratorio("#Paso-form_06");
        $('#modal185').modal('hide');
    });

    $("#casilla687").click(function () {
        $("#click-casilla687").trigger("click");
    });

    $("#casilla173").click(function () {
        $("#click-casilla173").trigger("click");
    });

    $('#pdffile').change(function () {
        $('#subfile').val($(this).val());
    });

    $('#pdffile2').change(function () {
        $('#subfile2').val($(this).val());
    });

    $('body').on('shown.bs.modal', '#modal-frecuente', function () {
        $('input:visible:enabled:first', this).focus();
    });

    // (REF07)
    $('*[data-casilla="887"]').change(function () {
        //console.log("quitarAgregarRequeridoCasillasInvisibles DESDE IGV COMPLETA");
        formulario0621.quitarAgregarRequeridoCasillasInvisibles();


        var valor = $(this).val();
        console.log("*****valor887***" + valor);
        if (valor == "1") {
            valor = false;
        } else {
            valor = true;
        }
//        console.log("::valor:: " + (valor));
//        console.log("::req:: " + (formulario0621.verificarCasillaTasaVariable("111") === null));
////        console.log("::Requerido 111::: " + (valor && formulario0621.verificarCasillaTasaVariable("111") == null));
////
//        formulario0621.setearAtributoReadOnly((valor && formulario0621.verificarCasillaTasaVariable("101") == null), "101");
//        formulario0621.setearAtributoReadOnly((valor && formulario0621.verificarCasillaTasaVariable("103") == null), "103");
//        formulario0621.setearAtributoReadOnly((valor && formulario0621.verificarCasillaTasaVariable("161") == null), "161");
//        formulario0621.setearAtributoReadOnly((valor && formulario0621.verificarCasillaTasaVariable("163") == null), "163");
//        formulario0621.setearAtributoReadOnly((valor && formulario0621.verificarCasillaTasaVariable("108") == null), "108");
//        formulario0621.setearAtributoReadOnly((valor && formulario0621.verificarCasillaTasaVariable("111") == null), "111");
//        formulario0621.setearAtributoReadOnly((valor && formulario0621.verificarCasillaTasaVariable("115") == null), "115");
//        formulario0621.setearAtributoReadOnly((valor && formulario0621.verificarCasillaTasaVariable("117") == null), "117");
//        formulario0621.setearAtributoReadOnly((valor && formulario0621.verificarCasillaTasaVariable("169") == null), "169");

        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="101"]').attr("readonly", valor && formulario0621.verificarCasillaTasaVariable("101") == null);
        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="103"]').attr("readonly", valor && formulario0621.verificarCasillaTasaVariable("103") == null);
//        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="161"]').attr("readonly", valor && formulario0621.verificarCasillaTasaVariable("161") == null);
//        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="163"]').attr("readonly", valor && formulario0621.verificarCasillaTasaVariable("163") == null);
//        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="108"]').attr("readonly", valor && formulario0621.verificarCasillaTasaVariable("108") == null);
//        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="111"]').attr("readonly", valor && formulario0621.verificarCasillaTasaVariable("111") == null);
//        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="115"]').attr("readonly", valor && formulario0621.verificarCasillaTasaVariable("115") == null);
//        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="117"]').attr("readonly", valor && formulario0621.verificarCasillaTasaVariable("117") == null);
//        $('input[data-' + _obtenerNivelDeclaracion() + 'casilla="169"]').attr("readonly", valor && formulario0621.verificarCasillaTasaVariable("169") == null);

    });

    $('*[data-s-casilla="887"]').change(function () {
        //console.log("quitarAgregarRequeridoCasillasInvisibles DESDE IGV SIMPLIFICADA");
        formulario0621.quitarAgregarRequeridoCasillasInvisibles();
    });

    $('*[data-casilla="867"]').change(function () {
        //console.log("quitarAgregarRequeridoCasillasInvisibles DESDE IVAP");
        formulario0621.quitarAgregarRequeridoCasillasInvisibles();
    });


    $("#casilla391_si").change(function () {
        if ($(this).is(':checked')) {
//            formulario0621.obtenerCasillasInternas().casilla_inter_391 = "1";
            formulario0621.obtenerCasillasInternas().casilla_inter_392 = "0000000";
            var casilla_inter_392 = formulario0621.obtenerCasillasInternas().casilla_inter_392;
            var igv_justo = formulario0621.obtenerDatosPeriodoBean().datosPadronIGVJusto;
            var mensaje = "";
//                        //console.log(JSON.stringify(formulario0621.obtenerDatosPeriodoBean()));
            if (igv_justo["ind_estado"] == 0) {
                var entra = false;
                mensaje = mensaje + "Señor Contribuyente, usted no podría acogerse a la Prórroga del pago del IGV (IGV Justo) por los motivos siguientes:<br>";
                if (igv_justo["ind_vtasanual"] == 1) {
                    entra = true;
                    casilla_inter_392 = "1" + casilla_inter_392.substring(1);
                    mensaje = mensaje + "- Tiene ingresos anuales mayores a 1,700 UIT<br>";
                }
                if (igv_justo["ind_delitotrib"] == 1) {
                    entra = true;
                    casilla_inter_392 = casilla_inter_392.charAt(0) + "1" + casilla_inter_392.substring(2);
                    mensaje = mensaje + "- Tiene como titular a una persona natural o socio que hubiera sido condenado por Delitos tributarios<br>";
                }
                if (igv_justo["ind_concursal"] == 1) {
                    entra = true;
                    casilla_inter_392 = casilla_inter_392.substring(0, 2) + "1" + casilla_inter_392.substring(3);
                    mensaje = mensaje + "- Se encuentra en Proceso Concursal<br>";
                }
                if (igv_justo["ind_deucoact"] == 1) {
                    entra = true;
                    casilla_inter_392 = casilla_inter_392.substring(0, 3) + "1" + casilla_inter_392.substring(4);
                    mensaje = mensaje + "- Tiene deudas tributarias exigibles coactivamente mayores a 1 UIT<br>";
                }
                if (igv_justo["ind_djextemp"] == 1) {
                    entra = true;
                    casilla_inter_392 = casilla_inter_392.substring(0, 4) + "1" + casilla_inter_392.substring(5);
                    mensaje = mensaje + "- No ha presentado en plazo la declaración del IGV y/o impuesto a la renta, en uno de los meses correspondientes a los 12 periodos evaluados<br>";
                }
                if (igv_justo["ind_deuvalor"] == 1) {
                    entra = true;
                    casilla_inter_392 = casilla_inter_392.substring(0, 5) + "1" + casilla_inter_392.substring(6);
                    mensaje = mensaje + "- No ha cumplido con el pago del IGV y/o Impuesto a la Renta, en uno de los 12 periodos evaluados hasta la fecha límite para regularizar o Tiene solicitud de Fraccionamiento Especial Ley 30524 sin notificación de la RIA hasta la fecha límite para regularizar<br>";
                }
                if (!entra) {
                    mensaje = mensaje + "-Usted no se encuentra inscrito en el Padrón de prórroga del pago de IGV (IGV Justo";
                }

                mensaje = mensaje + "Se sugiere revisar la opción marcada <br>";
                mensaje = mensaje + "Si usted considera que sí cumple, señale su voluntad de acogerse. De corresponder la SUNAT procederá con la emisión de la Orden de Pago.<br>";

                formulario0621.obtenerCasillasInternas().casilla_inter_392 = casilla_inter_392;
                formulario0621.mostrarMensajeGeneralBoton(mensaje, "Acogimiento a la prorroga de Pago del IGV", "Continuar");
            }
        } else {
//            formulario0621.obtenerCasillasInternas().casilla_inter_391 = "";
            formulario0621.obtenerCasillasInternas().casilla_inter_392 = "";
        }
    });
    $("#casilla391_no").change(function () {
        if ($(this).is(':checked')) {
//            formulario0621.obtenerCasillasInternas().casilla_inter_391 = "0";
            formulario0621.obtenerCasillasInternas().casilla_inter_392 = "0";
        } else {
//            formulario0621.obtenerCasillasInternas().casilla_inter_391 = "";
            formulario0621.obtenerCasillasInternas().casilla_inter_392 = "";
        }
    });

    var rucasociando = true;
    if (rucasociando) {
        $("#casilla161").attr("readonly", false);
        if ($("#casilla161").attr("readonly", false)) {
            $("#casilla162").attr("readonly", false);
            $("#casilla163").attr("readonly", false);
        }
    } else {
        $("#casilla161").attr("readonly", true);
        $("#casilla162").attr("readonly", true);
        $("#casilla163").attr("readonly", true);
    }

    $('*[data-casilla="347"]').change(function () {
        var casilla127 = _obtenerValorCasilla("127");
        var casilla305 = _obtenerValorCasilla("305");
        var casilla347 = _obtenerValorCasilla("347");

        if (casilla127 != "") {
            if (casilla305 != "" || casilla347 != "") {
                $('*[data-casilla="127"]').attr("readonly", true);
            } else {
                $('*[data-casilla="127"]').attr("readonly", false);
            }
        } else {
            $(this).val("");
        }
    });


    $('*[data-casilla="110"]').keyup(function () {
        var casilla173 = $("#casilla173").val();
        if (casilla173 == null || casilla173 == "") {
            formulario0621.mostrarMensajeGeneral("Sr. Contribuyente, debe calcular primero el coeficiente de la casilla 173");
            $(this).val("");
        }
    });

    $('*[data-casilla="116"]').keyup(function () {
        var casilla173 = $("#casilla173").val();
        if (casilla173 == null || casilla173 == "") {
            formulario0621.mostrarMensajeGeneral("Sr. Contribuyente, debe calcular primero el coeficiente de la casilla 173");
            $(this).val("");
        }
    });

    if ($("#casilla110").attr("readonly", false)) {
        //$("#casilla111").attr("readonly", false);
        $("#casilla116").attr("readonly", false);
        $("#casilla119").attr("readonly", false);
    }

    //RF33
    $('*[data-casilla="861"]').change(function () {
        var casilla861 = _obtenerValorCasillaRadio("861");
        if (casilla861 == "2") {
            $("#casilla172").attr("readonly", false);
        } else {
            $("#casilla172").attr("readonly", true);
        }
    });


    $('*[data-casilla="861"]').change(function () {
        var casilla861 = $(this).val();
        if (casilla861 == "1") {
            $("#casilla380").attr("readonly", true);
        } else {
            $("#casilla380").attr("readonly", false);

        }
        if (casilla861 == "1" || casilla861 == "8") {
            $("#casilla315").attr("readonly", true);
        }
    });

    $('#casilla-s-380,#casilla380').click(function () {
        $("#click-modal-asistente380").trigger("click");
    });

    $("#btnAceptarModal380").click(function (e) {

        try {

            var valorCasilla891 = parseFloat($("#casilla891").val());
            var valorCasilla892 = parseFloat($("#casilla892").val());

            if (valorCasilla891 > valorCasilla892) {
                formulario0621.mostrarMensajeGeneral(comunMensajes.getMensaje("EXC001_2", ""));
                e.preventDefault();
                e.stopPropagation();
            } else {
                var parametroFactor = null;

                var codRenta = formulario0621.codigoRegimenSeleccionado();
                var periodo = comunLibreria.formatearPeriodoaCadena(formulario0621.obtenerValorCasilla("7"));

                var coeficienteRenta = formulario0621.obtenerCoeficienteRenta(periodo, codRenta);

                if (coeficienteRenta != "" && coeficienteRenta != null) {
                    parametroFactor = coeficienteRenta.resultado.PARAMETRO_FACTOR;
                }

                if (parametroFactor != null) {
                    comunIntegrador.setValue(formulario0621.obtenerCasilla("380"), (valorCasilla891 / valorCasilla892) * parametroFactor);
//                    formulario0621.setearValorCasilla("380", (valorCasilla891 / valorCasilla892) * parametroFactor);
                } else {
                    //console.log("================380=================> " + formulario0621.obtenerCasilla("380") + " - " + (valorCasilla891 / valorCasilla892));
                    comunIntegrador.setValue(formulario0621.obtenerCasilla("380"), (valorCasilla891 / valorCasilla892));
                }
                formulario0621.funcionalidad_Casilla312();
            }
        } catch (err) {
            //console.log(err.message);
        }
    });

    //RF35 MEDIANO
    $('#casilla866-SI').change(function () {

        $("#casilla173").attr("readonly", false);

        $("#casilla105").attr("required", true);
        $("#casilla109").attr("required", true);

        $("#casilla110").attr("required", true);
        $("#casilla116").attr("required", true);
        $("#casilla119").attr("required", true);

        $('#date-001').removeClass("Ocultar-datos");
        $('#date-002').removeClass("Ocultar-datos");
        $('#date-003').removeClass("Ocultar-datos");

        $('#date-001').addClass("mostrar-datos");
        $('#date-002').addClass("mostrar-datos");
        $('#date-003').addClass("mostrar-datos");

        if (formulario0621.tieneResumencasilla()) {//Existe resumen casilla

            var periodo = _obtenerValorCasilla("7");
            var dataResumenCasilla = formulario0621.obtenerResumenCasillasLE(comunLibreria.formatearPeriodoaCadena(periodo));
            comunIntegrador.setValue(formulario0621.obtenerCasilla(100), dataResumenCasilla.resultado.mtoCas100);
            comunIntegrador.setValue(formulario0621.obtenerCasilla(116), dataResumenCasilla.resultado.mtoCas116);
            comunIntegrador.setValue(formulario0621.obtenerCasilla(117), dataResumenCasilla.resultado.mtoCas117);
            comunIntegrador.setValue(formulario0621.obtenerCasilla(119), dataResumenCasilla.resultado.mtoCas119);

            funcion_llenar_173();
        }
    });


    $('#casilla866-NO').change(function () {

//        $("#casilla173").attr("readonly", true);
//        $("#casilla105").attr("required", false);
//        $("#casilla109").attr("required", false);
//        $("#casilla110").attr("required", false);
//        $("#casilla116").attr("required", false);
//        $("#casilla119").attr("required", false);

        formulario0621.setearAtributoReadOnly(true, "173");
        formulario0621.quitarAtributo("105", "required");
        formulario0621.quitarAtributo("109", "required");
        formulario0621.quitarAtributo("110", "required");
        formulario0621.quitarAtributo("116", "required");
        formulario0621.quitarAtributo("119", "required");


        $('#date-001').addClass("Ocultar-datos");
        $('#date-002').addClass("Ocultar-datos");
        $('#date-003').addClass("Ocultar-datos");

        var c110 = formulario0621.obtenerValorCasilla("110");
        var c111 = formulario0621.obtenerValorCasilla("111");
        var c116 = formulario0621.obtenerValorCasilla("116");
        var c117 = formulario0621.obtenerValorCasilla("117");
        var c119 = formulario0621.obtenerValorCasilla("119");
        var c173 = formulario0621.obtenerValorCasilla("173");

        if (c110 != "" || c110 != null || c111 != "" || c111 != null || c116 != "" || c116 != null ||
            c117 != "" || c117 != null || c119 != "" || c119 != null || c173 != "" || c173 != null) {

            formulario0621.mostrarMensajeAceptarCancelar(
                "Sr. Contribuyente, si su respuesta se modifica a “No”, se eliminará(n) el(os) importe(s) registrado(s) y calculado(s) en la casilla(s) 110, 111, 116, 117, 119 y/o 173",
                function (evt) {
//                        evt.stopPropagation();
                    comunIntegrador.setValue(formulario0621.obtenerCasilla(110), "");
                    comunIntegrador.setValue(formulario0621.obtenerCasilla(111), "");
                    comunIntegrador.setValue(formulario0621.obtenerCasilla(116), "");
                    comunIntegrador.setValue(formulario0621.obtenerCasilla(117), "");
                    comunIntegrador.setValue(formulario0621.obtenerCasilla(119), "");
                    comunIntegrador.setValue(formulario0621.obtenerCasilla(173), "");
                    $('#modalMensajeAceptarCancelar').modal('hide');
                },
                function (evt) {
//                        evt.stopPropagation();
                    formulario0621.setearBoleanValueRadio("866", 0, true);
                    $('#date-001').removeClass("Ocultar-datos");
                    $('#date-002').removeClass("Ocultar-datos");
                    $('#date-003').removeClass("Ocultar-datos");

                    $('#date-001').addClass("mostrar-datos");
                    $('#date-002').addClass("mostrar-datos");
                    $('#date-003').addClass("mostrar-datos");
                    $('#modalMensajeAceptarCancelar').modal('hide');
                }, "CANCELAR", "ACEPTAR"
            );
        }
    });

    $("#click-casilla173").click(function () {
        funcion_173();
        funcion_llenar_173();
        funcion_poner_ceros_173();
    });

    function funcion_173() {

        var valorPeriodo = _obtenerValorCasilla("7");

        $("#trperiodoDeclaracion").text(valorPeriodo);
        formulario0621.obtenerPeriodoDinamico(valorPeriodo);


        $("#trVentasgravada1,#trVentasgravada2,#trVentasgravada3,#trVentasgravada4,#trVentasgravada5,#trVentasgravada6,#trVentasgravada7,#trVentasgravada8,#trVentasgravada9,#trVentasgravada10,#trVentasgravada11,#trExportacion1,#trExportacion2,#trExportacion3,#trExportacion4,#trExportacion5,#trExportacion6,#trExportacion7,#trExportacion8,#trExportacion9,#trExportacion10,#trExportacion11,#trVentasNoGravadas1,#trVentasNoGravadas2,#trVentasNoGravadas3,#trVentasNoGravadas4,#trVentasNoGravadas5,#trVentasNoGravadas6,#trVentasNoGravadas7,#trVentasNoGravadas8,#trVentasNoGravadas9,#trVentasNoGravadas10,#trVentasNoGravadas11").keyup(function () {

                var casilla100 = $.trim(_obtenerValorCasilla("100")) == "" ? 0 : _obtenerValorCasilla("100");
                var casilla160 = $.trim(_obtenerValorCasilla("160")) == "" ? 0 : _obtenerValorCasilla("160");
                var casilla162 = $.trim(_obtenerValorCasilla("162")) == "" ? 0 : _obtenerValorCasilla("162");
                var casilla102 = $.trim(_obtenerValorCasilla("102")) == "" ? 0 : _obtenerValorCasilla("102");
                var casilla106 = $.trim(_obtenerValorCasilla("106")) == "" ? 0 : _obtenerValorCasilla("106");
                var casilla105 = $.trim(_obtenerValorCasilla("105")) == "" ? 0 : _obtenerValorCasilla("105");


                var trVentasNoGravadas1 = $.trim($("#trVentasNoGravadas1").val()) == "" ? 0 : $("#trVentasNoGravadas1").val();
                var trVentasNoGravadas2 = $.trim($("#trVentasNoGravadas2").val()) == "" ? 0 : $("#trVentasNoGravadas2").val();
                var trVentasNoGravadas3 = $.trim($("#trVentasNoGravadas3").val()) == "" ? 0 : $("#trVentasNoGravadas3").val();
                var trVentasNoGravadas4 = $.trim($("#trVentasNoGravadas4").val()) == "" ? 0 : $("#trVentasNoGravadas4").val();
                var trVentasNoGravadas5 = $.trim($("#trVentasNoGravadas5").val()) == "" ? 0 : $("#trVentasNoGravadas5").val();
                var trVentasNoGravadas6 = $.trim($("#trVentasNoGravadas6").val()) == "" ? 0 : $("#trVentasNoGravadas6").val();
                var trVentasNoGravadas7 = $.trim($("#trVentasNoGravadas7").val()) == "" ? 0 : $("#trVentasNoGravadas7").val();
                var trVentasNoGravadas8 = $.trim($("#trVentasNoGravadas8").val()) == "" ? 0 : $("#trVentasNoGravadas8").val();
                var trVentasNoGravadas9 = $.trim($("#trVentasNoGravadas9").val()) == "" ? 0 : $("#trVentasNoGravadas9").val();
                var trVentasNoGravadas10 = $.trim($("#trVentasNoGravadas10").val()) == "" ? 0 : $("#trVentasNoGravadas10").val();
                var trVentasNoGravadas11 = $.trim($("#trVentasNoGravadas11").val()) == "" ? 0 : $("#trVentasNoGravadas11").val();
                var trExportacion1 = $.trim($("#trExportacion1").val()) == "" ? 0 : $("#trExportacion1").val();
                var trExportacion2 = $.trim($("#trExportacion2").val()) == "" ? 0 : $("#trExportacion2").val();
                var trExportacion3 = $.trim($("#trExportacion3").val()) == "" ? 0 : $("#trExportacion3").val();
                var trExportacion4 = $.trim($("#trExportacion4").val()) == "" ? 0 : $("#trExportacion4").val();
                var trExportacion5 = $.trim($("#trExportacion5").val()) == "" ? 0 : $("#trExportacion5").val();
                var trExportacion6 = $.trim($("#trExportacion6").val()) == "" ? 0 : $("#trExportacion6").val();
                var trExportacion7 = $.trim($("#trExportacion7").val()) == "" ? 0 : $("#trExportacion7").val();
                var trExportacion8 = $.trim($("#trExportacion8").val()) == "" ? 0 : $("#trExportacion8").val();
                var trExportacion9 = $.trim($("#trExportacion9").val()) == "" ? 0 : $("#trExportacion9").val();
                var trExportacion10 = $.trim($("#trExportacion10").val()) == "" ? 0 : $("#trExportacion10").val();
                var trExportacion11 = $.trim($("#trExportacion11").val()) == "" ? 0 : $("#trExportacion11").val();
                var trVentasgravada1 = $.trim($("#trVentasgravada1").val()) == "" ? 0 : $("#trVentasgravada1").val();
                var trVentasgravada2 = $.trim($("#trVentasgravada2").val()) == "" ? 0 : $("#trVentasgravada2").val();
                var trVentasgravada3 = $.trim($("#trVentasgravada3").val()) == "" ? 0 : $("#trVentasgravada3").val();
                var trVentasgravada4 = $.trim($("#trVentasgravada4").val()) == "" ? 0 : $("#trVentasgravada4").val();
                var trVentasgravada5 = $.trim($("#trVentasgravada5").val()) == "" ? 0 : $("#trVentasgravada5").val();
                var trVentasgravada6 = $.trim($("#trVentasgravada6").val()) == "" ? 0 : $("#trVentasgravada6").val();
                var trVentasgravada7 = $.trim($("#trVentasgravada7").val()) == "" ? 0 : $("#trVentasgravada7").val();
                var trVentasgravada8 = $.trim($("#trVentasgravada8").val()) == "" ? 0 : $("#trVentasgravada8").val();
                var trVentasgravada9 = $.trim($("#trVentasgravada9").val()) == "" ? 0 : $("#trVentasgravada9").val();
                var trVentasgravada10 = $.trim($("#trVentasgravada10").val()) == "" ? 0 : $("#trVentasgravada10").val();
                var trVentasgravada11 = $.trim($("#trVentasgravada11").val()) == "" ? 0 : $("#trVentasgravada11").val();


                var trVentasGravadas = 0, trExportaciones = 0, trVentasNoGravadas = 0;

                var TotalVentNacionalesGravadas = parseFloat(casilla100) + parseFloat(casilla160) - parseFloat(casilla102) - parseFloat(casilla162)
                    + parseFloat(trVentasgravada1) + parseFloat(trVentasgravada2) + parseFloat(trVentasgravada3) + parseFloat(trVentasgravada4)
                    + parseFloat(trVentasgravada5) + parseFloat(trVentasgravada6) + parseFloat(trVentasgravada7) + parseFloat(trVentasgravada8)
                    + parseFloat(trVentasgravada9) + parseFloat(trVentasgravada10) + parseFloat(trVentasgravada11);

//            $("#trVentasGravadas").val(TotalVentNacionalesGravadas);
//            trVentasGravadas = TotalVentNacionalesGravadas;

                var totalExportaciones = parseFloat(casilla106) + parseFloat(trExportacion1) + parseFloat(trExportacion2) + parseFloat(trExportacion3)
                    + parseFloat(trExportacion4) + parseFloat(trExportacion5) + parseFloat(trExportacion6) + parseFloat(trExportacion7)
                    + parseFloat(trExportacion8) + parseFloat(trExportacion9) + parseFloat(trExportacion10) + parseFloat(trExportacion11);
//            $("#trExportaciones").val(totalExportaciones);

                var totalVentasNoGravadas = parseFloat(casilla105) + parseFloat(trVentasNoGravadas1) + parseFloat(trVentasNoGravadas2)
                    + parseFloat(trVentasNoGravadas3) + parseFloat(trVentasNoGravadas4) + parseFloat(trVentasNoGravadas5)
                    + parseFloat(trVentasNoGravadas6) + parseFloat(trVentasNoGravadas7) + parseFloat(trVentasNoGravadas8)
                    + parseFloat(trVentasNoGravadas9) + parseFloat(trVentasNoGravadas10) + parseFloat(trVentasNoGravadas11);
//            $("#trVentasNoGravadas").val(totalVentasNoGravadas);

//            var valorA = parseFloat($("#trVentasGravadas").val()) + parseFloat($("#trExportaciones").val());
//            var valorB = parseFloat($("#trVentasGravadas").val()) + parseFloat($("#trExportaciones").val()) + parseFloat($("#trVentasNoGravadas").val());

                var valorA = parseFloat(TotalVentNacionalesGravadas) + parseFloat(totalExportaciones);
                var valorB = parseFloat(TotalVentNacionalesGravadas) + parseFloat(totalExportaciones) + parseFloat(totalVentasNoGravadas);

                if (valorB == 0) {
                    $("#casilla173").val(0);
                } else {

                    var valorCoeficiente1 = parseFloat(valorA) / parseFloat(valorB);
                    var resultadoCoeficiente1 = Math.round(valorCoeficiente1 * Math.pow(10, 4)) / Math.pow(10, 4);
                    $("#trcoeficiente173").val(resultadoCoeficiente1);
                    $("#casilla173").val(resultadoCoeficiente1);
                }
            }
        );
    }//end funcion_173

    function funcion_llenar_173() {
        var valorPeriodo = _obtenerValorCasilla("7");

        $("#trperiodoDeclaracion").text(valorPeriodo);
        formulario0621.obtenerPeriodoDinamico(valorPeriodo);

//        var datos = formulario0621.obtenerCoeficienteIGV(valorPeriodo);
        var datos = datoperiodobean.coeficienteIgv;
        var valortrPeriodo2 = document.getElementById("trPeriodo2").innerHTML;
        var valortrPeriodo3 = document.getElementById("trPeriodo3").innerHTML;
        var valortrPeriodo4 = document.getElementById("trPeriodo4").innerHTML;
        var valortrPeriodo5 = document.getElementById("trPeriodo5").innerHTML;
        var valortrPeriodo6 = document.getElementById("trPeriodo6").innerHTML;
        var valortrPeriodo7 = document.getElementById("trPeriodo7").innerHTML;
        var valortrPeriodo8 = document.getElementById("trPeriodo8").innerHTML;
        var valortrPeriodo9 = document.getElementById("trPeriodo9").innerHTML;
        var valortrPeriodo10 = document.getElementById("trPeriodo10").innerHTML;
        var valortrPeriodo11 = document.getElementById("trPeriodo11").innerHTML;
        var valortrPeridoUltimo = document.getElementById("trPeriodo12").innerHTML;

        var existendatos = true;
        try {
            var datos_resultado_length = datos.resultado.length;
            var lista_trPeriodo_length = lista_trPeriodo.length;
        } catch (err) {
            existendatos = false;
        }

        if (existendatos == true) {

            for (var i = 0; i < datos_resultado_length; i++) {

                for (var x = 0; x < lista_trPeriodo_length; x++) {
                    if (lista_trPeriodo[x] == datos.resultado[i].perTri) {

                        var año = lista_trPeriodo[x].substring(0, 4);
                        var mes = lista_trPeriodo[x].substring(4, 7);
                        var per = mes + "-" + año;

                        if (valortrPeriodo2 == per) {
                            $('#trVentasNoGravadas1').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion1').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada1').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeriodo3 == per) {
                            $('#trVentasNoGravadas2').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion2').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada2').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeriodo4 == per) {
                            $('#trVentasNoGravadas3').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion3').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada3').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeriodo5 == per) {
                            $('#trVentasNoGravadas4').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion4').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada4').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeriodo6 == per) {
                            $('#trVentasNoGravadas5').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion5').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada5').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeriodo7 == per) {
                            $('#trVentasNoGravadas6').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion6').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada6').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeriodo8 == per) {
                            $('#trVentasNoGravadas7').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion7').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada7').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeriodo9 == per) {
                            $('#trVentasNoGravadas8').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion8').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada8').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeriodo10 == per) {
                            $('#trVentasNoGravadas9').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion9').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada9').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeriodo11 == per) {
                            $('#trVentasNoGravadas10').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion10').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada10').val(datos.resultado[i].mtoVngdet);
                        }

                        if (valortrPeridoUltimo == per) {
                            $('#trVentasNoGravadas11').val(datos.resultado[i].mtoVnogdet);
                            $('#trExportacion11').val(datos.resultado[i].mtoExpdet);
                            $('#trVentasgravada11').val(datos.resultado[i].mtoVngdet);
                        }

                    }
                }//end for
            }//end for
        }

        var casilla100 = $.trim(_obtenerValorCasilla("100")) == "" ? 0 : _obtenerValorCasilla("100");
        var casilla160 = $.trim(_obtenerValorCasilla("160")) == "" ? 0 : _obtenerValorCasilla("160");
        var casilla162 = $.trim(_obtenerValorCasilla("162")) == "" ? 0 : _obtenerValorCasilla("162");
        var casilla102 = $.trim(_obtenerValorCasilla("102")) == "" ? 0 : _obtenerValorCasilla("102");
        var casilla106 = $.trim(_obtenerValorCasilla("106")) == "" ? 0 : _obtenerValorCasilla("106");
        var casilla105 = $.trim(_obtenerValorCasilla("105")) == "" ? 0 : _obtenerValorCasilla("105");

        var trVentasNoGravadas1 = $.trim($("#trVentasNoGravadas1").val()) == "" ? 0 : $("#trVentasNoGravadas1").val();
        var trVentasNoGravadas2 = $.trim($("#trVentasNoGravadas2").val()) == "" ? 0 : $("#trVentasNoGravadas2").val();
        var trVentasNoGravadas3 = $.trim($("#trVentasNoGravadas3").val()) == "" ? 0 : $("#trVentasNoGravadas3").val();
        var trVentasNoGravadas4 = $.trim($("#trVentasNoGravadas4").val()) == "" ? 0 : $("#trVentasNoGravadas4").val();
        var trVentasNoGravadas5 = $.trim($("#trVentasNoGravadas5").val()) == "" ? 0 : $("#trVentasNoGravadas5").val();
        var trVentasNoGravadas6 = $.trim($("#trVentasNoGravadas6").val()) == "" ? 0 : $("#trVentasNoGravadas6").val();
        var trVentasNoGravadas7 = $.trim($("#trVentasNoGravadas7").val()) == "" ? 0 : $("#trVentasNoGravadas7").val();
        var trVentasNoGravadas8 = $.trim($("#trVentasNoGravadas8").val()) == "" ? 0 : $("#trVentasNoGravadas8").val();
        var trVentasNoGravadas9 = $.trim($("#trVentasNoGravadas9").val()) == "" ? 0 : $("#trVentasNoGravadas9").val();
        var trVentasNoGravadas10 = $.trim($("#trVentasNoGravadas10").val()) == "" ? 0 : $("#trVentasNoGravadas10").val();
        var trVentasNoGravadas11 = $.trim($("#trVentasNoGravadas11").val()) == "" ? 0 : $("#trVentasNoGravadas11").val();
        var trExportacion1 = $.trim($("#trExportacion1").val()) == "" ? 0 : $("#trExportacion1").val();
        var trExportacion2 = $.trim($("#trExportacion2").val()) == "" ? 0 : $("#trExportacion2").val();
        var trExportacion3 = $.trim($("#trExportacion3").val()) == "" ? 0 : $("#trExportacion3").val();
        var trExportacion4 = $.trim($("#trExportacion4").val()) == "" ? 0 : $("#trExportacion4").val();
        var trExportacion5 = $.trim($("#trExportacion5").val()) == "" ? 0 : $("#trExportacion5").val();
        var trExportacion6 = $.trim($("#trExportacion6").val()) == "" ? 0 : $("#trExportacion6").val();
        var trExportacion7 = $.trim($("#trExportacion7").val()) == "" ? 0 : $("#trExportacion7").val();
        var trExportacion8 = $.trim($("#trExportacion8").val()) == "" ? 0 : $("#trExportacion8").val();
        var trExportacion9 = $.trim($("#trExportacion9").val()) == "" ? 0 : $("#trExportacion9").val();
        var trExportacion10 = $.trim($("#trExportacion10").val()) == "" ? 0 : $("#trExportacion10").val();
        var trExportacion11 = $.trim($("#trExportacion11").val()) == "" ? 0 : $("#trExportacion11").val();
        var trVentasgravada1 = $.trim($("#trVentasgravada1").val()) == "" ? 0 : $("#trVentasgravada1").val();
        var trVentasgravada2 = $.trim($("#trVentasgravada2").val()) == "" ? 0 : $("#trVentasgravada2").val();
        var trVentasgravada3 = $.trim($("#trVentasgravada3").val()) == "" ? 0 : $("#trVentasgravada3").val();
        var trVentasgravada4 = $.trim($("#trVentasgravada4").val()) == "" ? 0 : $("#trVentasgravada4").val();
        var trVentasgravada5 = $.trim($("#trVentasgravada5").val()) == "" ? 0 : $("#trVentasgravada5").val();
        var trVentasgravada6 = $.trim($("#trVentasgravada6").val()) == "" ? 0 : $("#trVentasgravada6").val();
        var trVentasgravada7 = $.trim($("#trVentasgravada7").val()) == "" ? 0 : $("#trVentasgravada7").val();
        var trVentasgravada8 = $.trim($("#trVentasgravada8").val()) == "" ? 0 : $("#trVentasgravada8").val();
        var trVentasgravada9 = $.trim($("#trVentasgravada9").val()) == "" ? 0 : $("#trVentasgravada9").val();
        var trVentasgravada10 = $.trim($("#trVentasgravada10").val()) == "" ? 0 : $("#trVentasgravada10").val();
        var trVentasgravada11 = $.trim($("#trVentasgravada11").val()) == "" ? 0 : $("#trVentasgravada11").val();

        var TotalVentNacionalesGravadas = parseFloat(casilla100) + parseFloat(casilla160) - parseFloat(casilla102) - parseFloat(casilla162)
            + parseFloat(trVentasgravada1) + parseFloat(trVentasgravada2) + parseFloat(trVentasgravada3) + parseFloat(trVentasgravada4)
            + parseFloat(trVentasgravada5) + parseFloat(trVentasgravada6) + parseFloat(trVentasgravada7) + parseFloat(trVentasgravada8)
            + parseFloat(trVentasgravada9) + parseFloat(trVentasgravada10) + parseFloat(trVentasgravada11);

        //$("#trVentasGravadas").val(TotalVentNacionalesGravadas);
        $("#trVentasGravadas").val(parseFloat(casilla100) + parseFloat(casilla160) - parseFloat(casilla102) - parseFloat(casilla162));


        var totalExportaciones = parseFloat(casilla106) + parseFloat(trExportacion1) + parseFloat(trExportacion2) + parseFloat(trExportacion3)
            + parseFloat(trExportacion4) + parseFloat(trExportacion5) + parseFloat(trExportacion6) + parseFloat(trExportacion7)
            + parseFloat(trExportacion8) + parseFloat(trExportacion9) + parseFloat(trExportacion10) + parseFloat(trExportacion11);
        //$("#trExportaciones").val(totalExportaciones);
        $("#trExportaciones").val(parseFloat(casilla106));


        var totalVentasNoGravadas = parseFloat(casilla105) + parseFloat(trVentasNoGravadas1) + parseFloat(trVentasNoGravadas2)
            + parseFloat(trVentasNoGravadas3) + parseFloat(trVentasNoGravadas4) + parseFloat(trVentasNoGravadas5)
            + parseFloat(trVentasNoGravadas6) + parseFloat(trVentasNoGravadas7) + parseFloat(trVentasNoGravadas8)
            + parseFloat(trVentasNoGravadas9) + parseFloat(trVentasNoGravadas10) + parseFloat(trVentasNoGravadas11);
        //$("#trVentasNoGravadas").val(totalVentasNoGravadas);
        $("#trVentasNoGravadas").val(parseFloat(casilla105));

//        var valorA = parseFloat($("#trVentasGravadas").val()) + parseFloat($("#trExportaciones").val());
//        var valorB = parseFloat($("#trVentasGravadas").val()) + parseFloat($("#trExportaciones").val()) + parseFloat($("#trVentasNoGravadas").val());
        var valorA = TotalVentNacionalesGravadas + totalExportaciones;
        var valorB = TotalVentNacionalesGravadas + totalExportaciones + totalVentasNoGravadas;


        if (valorB == 0) {
            $("#casilla173").val(0);
        } else {

            var valorCoeficiente1 = parseFloat(valorA) / parseFloat(valorB);
            var resultadoCoeficiente1 = Math.round(valorCoeficiente1 * Math.pow(10, 4)) / Math.pow(10, 4);
            $("#trcoeficiente173").val(resultadoCoeficiente1);
            $("#casilla173").val(resultadoCoeficiente1);
        }
    }

    function funcion_poner_ceros_173() {

        $("#trVentasNoGravadas1,#trExportacion1,#trVentasgravada1").keyup(function () {
            if ($("#trVentasNoGravadas1").val() == "" || $("#trVentasNoGravadas1").val() == null) {
                $("#trVentasNoGravadas1").val('0');
            }
            if ($("#trExportacion1").val() == "" || $("#trExportacion1").val() == null) {
                $("#trExportacion1").val('0');
            }
            if ($("#trVentasgravada1").val() == "" || $("#trVentasgravada1").val() == null) {
                $("#trVentasgravada1").val('0');
            }
        });

        $("#trVentasNoGravadas2,#trExportacion2,#trVentasgravada2").keyup(function () {
            if ($("#trVentasNoGravadas2").val() == "" || $("#trVentasNoGravadas2").val() == null) {
                $("#trVentasNoGravadas2").val('0');
            }
            if ($("#trExportacion2").val() == "" || $("#trExportacion2").val() == null) {
                $("#trExportacion2").val('0');
            }
            if ($("#trVentasgravada2").val() == "" || $("#trVentasgravada2").val() == null) {
                $("#trVentasgravada2").val('0');
            }
        });

        $("#trVentasNoGravadas3,#trExportacion3,#trVentasgravada3").keyup(function () {
            if ($("#trVentasNoGravadas3").val() == "" || $("#trVentasNoGravadas3").val() == null) {
                $("#trVentasNoGravadas3").val('0');
            }
            if ($("#trExportacion3").val() == "" || $("#trExportacion3").val() == null) {
                $("#trExportacion3").val('0');
            }
            if ($("#trVentasgravada3").val() == "" || $("#trVentasgravada3").val() == null) {
                $("#trVentasgravada3").val('0');
            }
        });

        $("#trVentasNoGravadas4,#trExportacion4,#trVentasgravada4").keyup(function () {
            if ($("#trVentasNoGravadas4").val() == "" || $("#trVentasNoGravadas4").val() == null) {
                $("#trVentasNoGravadas4").val('0');
            }
            if ($("#trExportacion4").val() == "" || $("#trExportacion4").val() == null) {
                $("#trExportacion4").val('0');
            }
            if ($("#trVentasgravada4").val() == "" || $("#trVentasgravada4").val() == null) {
                $("#trVentasgravada4").val('0');
            }
        });

        $("#trVentasNoGravadas5,#trExportacion5,#trVentasgravada5").keyup(function () {
            if ($("#trVentasNoGravadas5").val() == "" || $("#trVentasNoGravadas5").val() == null) {
                $("#trVentasNoGravadas5").val('0');
            }
            if ($("#trExportacion5").val() == "" || $("#trExportacion5").val() == null) {
                $("#trExportacion5").val('0');
            }
            if ($("#trVentasgravada5").val() == "" || $("#trVentasgravada5").val() == null) {
                $("#trVentasgravada5").val('0');
            }
        });

        $("#trVentasNoGravadas6,#trExportacion6,#trVentasgravada6").keyup(function () {
            if ($("#trVentasNoGravadas6").val() == "" || $("#trVentasNoGravadas6").val() == null) {
                $("#trVentasNoGravadas6").val('0');
            }
            if ($("#trExportacion6").val() == "" || $("#trExportacion6").val() == null) {
                $("#trExportacion6").val('0');
            }
            if ($("#trVentasgravada6").val() == "" || $("#trVentasgravada6").val() == null) {
                $("#trVentasgravada6").val('0');
            }
        });

        $("#trVentasNoGravadas7,#trExportacion7,#trVentasgravada7").keyup(function () {
            if ($("#trVentasNoGravadas7").val() == "" || $("#trVentasNoGravadas7").val() == null) {
                $("#trVentasNoGravadas7").val('0');
            }
            if ($("#trExportacion7").val() == "" || $("#trExportacion7").val() == null) {
                $("#trExportacion7").val('0');
            }
            if ($("#trVentasgravada7").val() == "" || $("#trVentasgravada7").val() == null) {
                $("#trVentasgravada7").val('0');
            }
        });

        $("#trVentasNoGravadas8,#trExportacion8,#trVentasgravada8").keyup(function () {
            if ($("#trVentasNoGravadas8").val() == "" || $("#trVentasNoGravadas8").val() == null) {
                $("#trVentasNoGravadas8").val('0');
            }
            if ($("#trExportacion8").val() == "" || $("#trExportacion8").val() == null) {
                $("#trExportacion8").val('0');
            }
            if ($("#trVentasgravada8").val() == "" || $("#trVentasgravada8").val() == null) {
                $("#trVentasgravada8").val('0');
            }
        });

        $("#trVentasNoGravadas9,#trExportacion9,#trVentasgravada9").keyup(function () {
            if ($("#trVentasNoGravadas9").val() == "" || $("#trVentasNoGravadas9").val() == null) {
                $("#trVentasNoGravadas9").val('0');
            }
            if ($("#trExportacion9").val() == "" || $("#trExportacion9").val() == null) {
                $("#trExportacion9").val('0');
            }
            if ($("#trVentasgravada9").val() == "" || $("#trVentasgravada9").val() == null) {
                $("#trVentasgravada9").val('0');
            }
        });

        $("#trVentasNoGravadas10,#trExportacion10,#trVentasgravada10").keyup(function () {
            if ($("#trVentasNoGravadas10").val() == "" || $("#trVentasNoGravadas10").val() == null) {
                $("#trVentasNoGravadas10").val('0');
            }
            if ($("#trExportacion10").val() == "" || $("#trExportacion10").val() == null) {
                $("#trExportacion10").val('0');
            }
            if ($("#trVentasgravada10").val() == "" || $("#trVentasgravada10").val() == null) {
                $("#trVentasgravada10").val('0');
            }
        });

        $("#trVentasNoGravadas11,#trExportacion11,#trVentasgravada11").keyup(function () {
            if ($("#trVentasNoGravadas11").val() == "" || $("#trVentasNoGravadas1").val() == null) {
                $("#trVentasNoGravadas11").val('0');
            }
            if ($("#trExportacion11").val() == "" || $("#trExportacion11").val() == null) {
                $("#trExportacion11").val('0');
            }
            if ($("#trVentasgravada11").val() == "" || $("#trVentasgravada11").val() == null) {
                $("#trVentasgravada11").val('0');
            }
        });

    }


    //	(REF65) Casilla 343
    var C682 = null; //casilla no existente en el html;
    var fechaVencimiento = null; //esto vendra en el servicio;
    var fechaPresentacion = null; //esto vendra en el servicio;

    if (C682 > 0 && fechaVencimiento > fechaPresentacion) {
        $("#casilla343").attr("readonly", false);
    }
    var C344 = C682 - _obtenerValorCasilla("342") + _obtenerValorCasilla("343");
    $("#casilla344").val(C344);
    $("#casilla345").val(C344);
    //RF66
    //el calculo del documentio del F2 no coincide con la base de datos

    //REF79
    //C324 VIENE EL CALCULO DE LA PARAMETRIA
    //calculo de la parametria que se muestra en el F2 no coincide con la base de datos
    var C324 = _obtenerValorCasilla("324");
    if (C324 < 0) {
        $("#casilla324").val("0");
    }

    $("#grabarFrecuente").click(function () {

        var nombre = $("#txtnombreformulario").val();
        var json = comunIntegrador.guardarFrecuente("0621", nombre);
    });

    $('*[data-casilla="886"],[data-s-casilla="886"]').change(function () {//Select soles/dolares
        formulario0621.funcionalidad886();
    });


    $("#Siguiente01").click(function (event) {


        var messagesArray = [];
        if (!formulario0621.validarButtonGroupRadios(866)) {
            messagesArray.push(formulario0621.obtenerCasilla(866).attr("data-casilla"));
            formulario0621.validarObligatorios(messagesArray);
            event.preventDefault();
            event.stopPropagation();
        } else {
            mostrar_341_182();
//            mostrar_345_307_189();
            validar_casillas_tasaVariable();
            formulario0621.validarObligatorios([]);
        }

    });
    $("#Siguiente-01").click(function (event) {
        console.log('simplificada');
        validacionDeclaracionesSinMovimiento();
        validar_casillas_tasaVariable();
    });

    $("#Paso-form_02,#paso-simple-02").click(function () {
        mostrar_341_182();
        mostrar_345_307_189();
        validacionDeclaracionesSinMovimiento();
        validar_casillas_tasaVariable();
    });
    var listElementos = [];

    function validacionDeclaracionesSinMovimiento() {

        var seleccionIgv = $('*[data-s-casilla="888"]');

        if (seleccionIgv != null) {
            var i = 0;
            for (i = 0; i < seleccionIgv.length; i++) {
                if (seleccionIgv[i].checked) {
                    break;
                }
            }

            var bloquear = (i == 0);

            if (listElementos.length == 0) {
                listElementos = $("input[id^='casilla-s-']");
            }

            $.each(listElementos, function (clave, ele) {

                if ($(ele).attr("id") != 'casilla-s-7' && $(ele).attr("type") == 'text' && $(ele).attr("date-picker") == undefined) {


                    if (bloquear) {
                        $(ele).attr("readonly", bloquear);
                        $(ele).val('0');
                    } else if ($(ele).attr("id") != "casilla-s-108"
                        && $(ele).attr("id") != "casilla-s-101") {
                        $(ele).attr("readonly", bloquear);
                    }

                }
            });

        }
    }

//    $("#Paso-form_06").click(function (event) {
//        importe_casilla304_326();
//    });

    $("#Siguiente05,#Siguiente-03").click(function (event) {
        if (formulario0621.esNivelSimplificado()) {
            $("#btnAgregarBandejaSimplificado").attr("disabled", true);
        } else {
            importe_casilla304_326();
            $("#btnAgregarBandejaCompleto").attr("disabled", true);
        }
    });

    $('*[data-casilla="305"],[data-s-casilla="305"]').change(function () {//RF15
        if (_obtenerValorCasilla('305') == "" && _obtenerValorCasilla('347') == "") {
            $("#casilla127").attr("readonly", false);
            $("#casilla127").css({background: 'white'});
        } else {
            $("#casilla127").attr("readonly", true);
            $("#casilla127").css({background: '#e5e4e2'});
        }
    });

    $('*[data-casilla="347"],[data-s-casilla="347"]').change(function () {//RF15
        if (_obtenerValorCasilla('305') == "" && _obtenerValorCasilla('347') == "") {
            $("#casilla127").attr("readonly", false);
            $("#casilla127").css({background: 'white'});
        } else {
            $("#casilla127").attr("readonly", true);
            $("#casilla127").css({background: '#e5e4e2'});
        }
    });

    $('#Clean-Form').click(function (event) {
        var declaracion = "";

        if (_obtenerNivelDeclaracion() == "s-") {
            declaracion = $('#casilla-s-7').val();
        } else {
            declaracion = $('#casilla7').val();
        }

        if (declaracion != "" || declaracion != null) {

            formulario0621.mostrarMensajeAceptarCancelar(
                "Sr. Contribuyente se borrarán todas las casillas registradas del formulario",
                function (evt) {
//                        evt.stopPropagation();
                    $('#modalMensajeAceptarCancelar').modal('hide');

                    formulario0621_importar.limpiarVariables();
                    formulario0621.limpiarVariablesGlobales();
                    $('#casilla685').val("0");
                    $('#casilla687').val("0");
                    $('#subfile').val("");
                    $('#subfile2').val("");
                    comunIntegrador.setValue(formulario0621.obtenerCasilla("171"), "0");
                    comunIntegrador.setValue(formulario0621.obtenerCasilla("179"), "0");
                    $("#muestraTotalaPagar").find("strong").text(" 0.00");
                    $("#myModal173").find(":text").each(function () {
                        $($(this)).val('');
                    });

                    if (_obtenerNivelDeclaracion() == "s-") {
                        $('#paso-simple-01').trigger("click");
                        $('#Reset-02').trigger("reset");
                        $('#Reset-01').trigger("reset");
                        funcion_deshabilitar_inicio(true);

                    } else {
                        $('#Paso-form_01').trigger("click");
                        $('#Reset-01').trigger("reset");
                        $('#Reset-02').trigger("reset");
                        funcion_deshabilitar_inicio(true);

                    }

                },
                function (evt) {
//                        evt.stopPropagation();
                    $('#modalMensajeAceptarCancelar').modal('hide');
                }, "", ""
            );
        }
        $("#Clean-Form").val('');//limpiar evento
    });

    function mostrar_341_182() {
        var _codigoTributario = '010106';//CODIGO DE TRIBUTO PARA IVAP/160101/201602/033101
        var IVAP_isSelected = formulario0621.obtenerValorCasillaRadio("867");//radio IVAP //Radio IVAP Seleccionado

        if (formulario0621.tipoResumenCasilla() == '1' && IVAP_isSelected == '1') {//indLibro = 1 (TIPO DECLARACION COMPLETA)
            $("#disabled_IVAP_id").removeClass('active').addClass('activar');//ACTIVAR TAB IVAP
            comunIntegrador.operarCasillaYAsociados(340, _obtenerNivelDeclaracion(), 3);
        } else if (formulario0621.tipoResumenCasilla() == '2') {//indLibro = 2 (TIPO DECLARACION SIMPLIFICADA) sin movimiento / con movimiento
            $("#disabled_IVAP_id").removeClass('active').addClass('disabledTab');//DESACTIVAR TAB IVAP
        } else if (IVAP_isSelected != '1') {
            $("#disabled_IVAP_id").removeClass('active').addClass('disabledTab');//DESACTIVAR TAB IVAP
        }
    }

    function mostrar_345_307_189() {
        var Declaracion_SIMPLIFICADA_sinMov_SI_NO = formulario0621.obtenerValorCasillaRadio("888");
        if (formulario0621.tipoResumenCasilla() == '1' || Declaracion_SIMPLIFICADA_sinMov_SI_NO == "NO") {//COMPLETA O SIMP CON MOVI
            $("#casilla345").val(_obtenerValorCasilla("344"));//En la declaración WEB (completa y simplificada con movimiento) y en la declaración PC completa se muestra el importe de la casilla 344.
            $("#casilla307").val(_obtenerValorCasilla("324"));
            $("#casilla189").val(_obtenerValorCasilla("188"));
        } else if (formulario0621.tipoResumenCasilla() == '2' && Declaracion_SIMPLIFICADA_sinMov_SI_NO == "SI") {
            $("#casilla345").val('0');//En la declaración WEB Simplificada sin movimiento, el importe es igual a cero.
            $("#casilla307").val('0');
            $("#casilla189").val('0');
        }
    }

    function importe_casilla304_326() {
        var Declaracion_SIMPLIFICADA_sinMov_SI_NO = formulario0621.obtenerValorCasillaRadio("888")
        if (formulario0621.tipoResumenCasilla() == '2') {//SIMPLIFICADA
            if (Declaracion_SIMPLIFICADA_sinMov_SI_NO == 'SI') {//SIMP. SIN MOVIM.
                $("#casilla304").val('0');
                $("#casilla326").val('0');
            }
        }
    }

    $("#casilla172").keyup(function () {
        var c_161 = _obtenerValorCasilla('161');
        var c_172 = _obtenerValorCasilla('172');

        if (_ubigeo_ddpUbigeo == null) {
            var _ubigeo = formulario0621.obtenerUbigeo();
            if (_ubigeo != null && _ubigeo != undefined && _ubigeo != "") {
                _ubigeo_ddpUbigeo = _ubigeo.resultado.ddp.ddpUbigeo;
                console.log('### _ubigeo_ddpUbigeo: ' + _ubigeo_ddpUbigeo);
            }
        }

        var lista_ubigeo = [];
        lista_ubigeo = funcion_lista_ubigeo();
        var lista_ubigeo_length = funcion_lista_ubigeo().length;

        var encontro = false;
        for (var i = 0; i < lista_ubigeo_length; i++) {
            if (_ubigeo_ddpUbigeo == lista_ubigeo[i]) {//Si el UBIGEO corresponde a los Departamentos de Loreto, Madre de Dios y los distritos de Iparia y Masisea de la provincia de Coronel Portillo y las provincias de Atalaya y Purús del departamento de Ucayali  
                encontro = true;
            }
        }
        if (encontro == true) {
            if ((c_172 <= (c_161 * 0.5))) {

            } else {
                formulario0621.mostrarMensajeGeneral('Sr. Contribuyente, el importe de la casilla 172 no puede ser mayor al importe al 50% de la casilla 161');
                $("#casilla172").val("");
                return;
            }

        } else {
            if ((c_172 <= (c_161 * 0.25))) {

            } else {
                formulario0621.mostrarMensajeGeneral('Sr. Contribuyente, el importe de la casilla 172 no puede ser mayor al importe al 25% de la casilla 161');
                $("#casilla172").val("");
                return;
            }
        }

    });

    function funcion_lista_ubigeo() {
        var lista = ["160101", "160102", "160103", "160104", "160105", "160106", "160107", "160108", "160110", "160112", "160113",
            "160201", "160202", "160205", "160206", "160210", "160211", "160301", "160302", "160303", "160304", "160305",
            "160401", "160402", "160403", "160404", "160501", "160502", "160503", "160504", "160505", "160506", "160507",
            "160508", "160509", "160510", "160511", "160601", "160602", "160603", "160604", "160605", "160606", "160701",
            "160702", "160703", "160704", "160705", "160706", "160801", "160802", "160803", "160804", "170101", "170102",
            "170103", "170104", "170201", "170202", "170203", "170204", "170301", "170302", "170303", "250103", "250104",
            "250201", "250202", "250203", "250204", "250401"];
        return lista;
    }

    $("#btnAceptar173").click(function (event) {
        var var_trcoeficiente173 = $('#trcoeficiente173').val();
        if (var_trcoeficiente173 != null) {
            $('#casilla173').val(var_trcoeficiente173);
        }
    });

    formulario0621.no_copy_cut_past();

});// fin document ready
//

function displayMessageForm0621(evt) {
    if (evt.data == "DESACTIVAR-PANEL-PRESENTARPAGAR") {
        $('#myModal-40').modal('hide');
    }
    if (evt.data == "EDITAR-0621") {
        ////console.log("WebMessage, edicion estando en el mismo formulario");
        var dataJson = comunBandeja.getKeyDataStorage("SUNAT.Edicion.Formulario0621.Data");
        if (dataJson != "") {
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
            } else {
                comunLibreria.cambiarTextoBontonesModalPresentarPagar("ACEPTAR", "CANCELAR");
                comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPSCERO", ""));
            }
        }
    }
}

if (window.addEventListener) {
    window.addEventListener("message", displayMessageForm0621, false);
} else {
    window.attachEvent("onmessage", displayMessageForm0621);
}

var _edicionForm = comunBandeja.getKeyDataStorage("SUNAT.Edicion.Formulario0621.Accion");
////console.log("Verificando si hay edicion 621:" + _edicionForm);
if (_edicionForm != null) {
    if (_edicionForm == "SI") {
        var dataJson = comunBandeja.getKeyDataStorage("SUNAT.Edicion.Formulario0621.Data");
        if (dataJson != "") {
            ////console.log("Si hay edicion de formulario!");
            var dataJsonParse = JSON.parse(dataJson);
            casillasEditarBandeja(dataJsonParse);
        }
    } else {
        funcion_deshabilitar_inicio(true);
    }
}

function casillasEditarBandeja(dataJsonParse) {

    var casillas = $('.data-sunat');

    if (dataJsonParse != undefined && dataJsonParse != null) {
        var idLocal = dataJsonParse.detalle.identificadorFormulario;
        var informacionLocal = JSON.parse(JSON.parse(localStorage.getItem('SUNAT.INFORMACION.LOCAL'))[idLocal]).informacionlocal;

        formulario0621.setearValorCasilla("7", dataJsonParse.detalle.periodoTributo);
        formulario0621.editandoFormulario = true;
        $("#RecuperarPreliminar").attr('disabled', true);//Boton Recuperar preliminar

        var tipo = dataJsonParse.detalle.tipoDeclaracion;
        if (tipo == null || tipo == undefined || tipo == "") {
            tipo = enumTipoDeclara.ORIGINAL.name;
        }
        formulario0621.setearValorCasilla("895", tipo);

        var detallesCoeficienteIGVList = dataJsonParse["detallesCoeficienteIGVList"];
        if(detallesCoeficienteIGVList != null && detallesCoeficienteIGVList != undefined){
            $.each(detallesCoeficienteIGVList, function(k,v){
                    // v.indiceText
                $("#trVentasNoGravadas"+v.indiceText).val(v.mtoVnogdet);
                $("#trExportacion"+v.indiceText).val(v.mtoExpdet);
                $("#trVentasgravada"+v.indiceText).val(v.mtoVngdet);
            });
        }

        formulario0621.setDatosPeriodoBean(informacionLocal.datosPeriodo);

        formulario0621.setFechaVencimientoPeriodo(comunLibreria.formatearLongtoStringYYYMMDD_GUION(Number(dataJsonParse.detalle.fecVen)));
        formulario0621.limpiarControlesRenta();
        $.each(casillas, function (indexCasilla, itemCasilla) {

            var codigoCasilla = $(itemCasilla).data('casilla');

            $.each(dataJsonParse["casillas"], function (index, item) {
                var codigoCasillaJson = item.codigoCasilla;
                if (codigoCasilla == codigoCasillaJson && codigoCasillaJson != "7") {

                    if (item.codtipcamCasilla == "01") {

                        if (item.valorCasilla != null && item.valorCasilla != undefined) {
                            var numcasilla = $(itemCasilla).data('casilla');
                            var valorCasilla = item.valorCasilla;

                            $('input[name=casilla' + numcasilla + ']').each(function (index, subitem) {
                                var value = $(this).val();
                                if (value == valorCasilla) {
                                    $(this).prop("checked", true);
                                    formulario0621.setearAtributoDisabled(false, numcasilla);
                                }
                            });
                        }
                    } else {
                        $('*[data-casilla="' + $(itemCasilla).data('casilla') + '"]').val(item.valorCasilla);
                    }
                }
            });
        });

        funcion_deshabilitar_inicio(false);


        formulario0621.setearAtributoDisabled((!(formulario0621.obtenerTamanioContribuyente() == "3"
        && formulario0621.obtenerValorCasilla("895") == enumTipoDeclara.ORIGINAL.name)), "895");


        var retePercIGVList = dataJsonParse.retePercIGVList;

        if (retePercIGVList != null) {
            retePercIGVList.forEach(function (v, k) {
                if (v.codTipPer == 'P') {
                    formulario0621.listaMap_Temp_P = formulario0621_importar.convertirConenido(v.arcImp);
                    formulario0621.nombreArchivoP = (v.nomArc);
                    formulario0621.Total_montoComprobantePercepcion = v.mtoTotCmpr;
                } else if (v.codTipPer == 'PI') {
                    formulario0621.listaMap_Temp_PI = formulario0621_importar.convertirConenido(v.arcImp);
                    formulario0621.nombreArchivoPI = (v.nomArc);
                    formulario0621.Total_montoComprobantePago = v.mtoTotCmpr;
                } else if (v.codTipPer == 'R') {
                    formulario0621.listaMap_Temp_R = formulario0621_importar.convertirConenido(v.arcImp);
                    formulario0621.nombreArchivoR = (v.nomArc);
                    formulario0621.Total_montoComprobanteRetencion = v.mtoTotCmpr;
                }
            });
        }
        formulario0621.setearAtributoDisabled("7");
        localStorage.removeItem('SUNAT.Edicion.Formulario0621.Accion');
        localStorage.removeItem('SUNAT.Edicion.Formulario0621.Data');
    }
}

function funcion_deshabilitar_inicio(var_boolean) {
    ////console.log("funcion_deshabilitar_inicio");
    $("#Siguiente01,#Siguiente-01").attr('disabled', var_boolean);//Boton siguiente
    $("#RecuperarPreliminar").attr('disabled', true);//Boton Recuperar preliminar
    $("#txt_importar_formulario,#btnimportar").attr('disabled', var_boolean);//Boton importar
    $("#Clean-Form").attr('disabled', var_boolean);//Boton limpiar

    _setearAtributoDisabled(var_boolean, "886");//Moneda
    _setearAtributoDisabled(var_boolean, "895");//Declaración
    _setearAtributoDisabled(var_boolean, "887");//IGV - Cuenta propia /Con convenio de estabilidad
    _setearAtributoDisabled(var_boolean, "867");//IVAP 
    _setearAtributoDisabled(var_boolean, "861");//Impuesto a la Renta/Régimen de Renta: 
    _setearAtributoDisabled(var_boolean, "866");//¿Ha realizado ventas no gravadas con el IGV en los últimos 12 meses?
    $("#divMensajeINF008_INF007_completa").hide();
    $("#divMensajeINF008_INF007_simplificada").hide();
    _setearAtributoDisabled(var_boolean, "888");//¿Presenta declaración sin movimiento? (declaración simplificada)
}
$("#checkcompleta").click(function () {
    $("#divMensajeINF008_INF007_completa").hide();
});

$("#checksimplificada").click(function () {
    $("#divMensajeINF008_INF007_simplificada").hide();
});

$("#txt_importar_formulario").change(function (event) {

    var $file = event.target.files[0];
    JSZip.loadAsync($file).then(function ($content) {
        var arc = $content.files["contenido.sunat"];
        if (arc != null || arc != undefined) {
            return arc.async('text');
        }
        return null;
    }).then(function (txt) {
        if (txt == null) {
            ////console.log("...... archivo incorrecto");
        } else {
            evitarMensajes = true;
            var jsonImportar = JSON.parse(txt);
            var dataCasillas = jsonImportar["data"];
            $.each(dataCasillas, function (k, v) {
//                //console.log(":::::::::::::: " + k);
                if (isDigit(k)) {//casillas directas
                    $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="' + k + '"]').val(v);
                } else { //radio button
                    castRegimen(k);
                }
            });
        }
    });
    $("#txt_importar_formulario").val('');//limpiar evento
});

function castRegimen(clave) {
    var lis = clave.split('_');
    if (isDigit(lis[1])) {
        $('input:radio[codtri="' + lis[1] + '"]').prop("checked", true);
    } else {
        var rad = $('input:radio[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="' + lis[0] + '"]');
        $.each(rad, function (k, v) {
            $(this).removeAttr('disabled');
            if ($(this).val().toLowerCase() == lis[1].toLowerCase()) {
                $(this).prop("checked", true);
            }
        });
    }
}

function isDigit(text) {
    var exp = /^\d+$/;
    return new RegExp(exp).test(text);
}


function validar_soloNumeros() {

//    //var flag = true;
//    var cont = 0;
//    try {
//        //console.log('#### tryyyyy');
//        var patron1 = /^\d{11}$/;//numerico 11 digitos
//        
//        var i = $("#myModal173 input").val();
//        if (!patron1.test(i)) {
//            //console.log('#### no es digito');
//           return;
//        }
//
//    } catch (err) {
//        return;
//    }


    $(document).ready(function () {
        $("#myModal173 input").keydown(function (e) {
            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
                // Allow: Ctrl+A, Command+A
                (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
                // Allow: home, end, left, right, down, up
                (e.keyCode >= 35 && e.keyCode <= 40)) {
                // let it happen, don't do anything
                //console.log('#### no es digito');
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
                //console.log('#### no es digito');
            }
        });

    });


}


$("#myModal173 input").keypress(function () {
    //console.log('#### keypressss 173');
    validar_soloNumeros();
});


function validar_casillas_tasaVariable() {
    console.log("***********VALIDAR CASILLAS TASA VARIABLES****");
    console.log(casillasTasaVariable);
    var casillasTasaVariable2 = $.unique(casillasTasaVariable);
    console.log(casillasTasaVariable2);

    var numCasillas = casillasTasaVariable2.length;
    //console.log('###numero casillas de tasa variable: ' + numCasillas);
    var x = 0;
    while (x <= numCasillas) {
        formulario0621.verificarCasillaTasaVariable(casillasTasaVariable2[x]);
        x++;
    }


}

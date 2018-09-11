var comunPresentar = (function () {

    var dataJsonResult;
    dataJsonResult = "";

    _obtenerTributosParaBancos = function() {
        var jsonSend = '{ "numPas" : 1, "numAplPas" : "001", "formularios" : [';
        var keyDeclaracion = "";
        var formTotal = localStorage.getItem("SUNAT.FormularioTotal");

        if (parseInt(formTotal) != 0) {
            var guuid = localStorage.getItem("SUNAT.FormularioGuuid");
            for (var idxLS=0, lenLS=localStorage.length; idxLS<lenLS; idxLS++) {
                var key = localStorage.key(idxLS);
                //console.log("_obtenerTributosParaBancos:key: " + key);
                if (comunLibreria.contieneCadena(key,guuid) && (! comunLibreria.contieneCadena(key,"SUNAT.CopiaDeclaracion."))) {
                    var dataJson = $.parseJSON(""+localStorage.getItem(key));
                    jsonSend += '{"codigoFormulario" : "' + dataJson.detalle.codFormulario + '", "tributos" :[';
                    $.each(dataJson.tributos, function (index, item) {
                        jsonSend += ' { "codigoTributo" : "\'' + item.codigoTributo + '\'" } ,';
                    });
                    jsonSend = comunLibreria.retornaStringMenosUno(jsonSend);
                    jsonSend += ' ] } ,';
                }
            }
            jsonSend = comunLibreria.retornaStringMenosUno(jsonSend);
        }
        jsonSend += ' ] } ';
        console.log("_obtenerTributosParaBancos::"+jsonSend);
        return jsonSend;
    };
    /**
     * @function beginPayMethod
     * Obtiene las declaraciones del localstorage, construye la informacion en formato json y luego invoca al servicio de grabacion
     *
     */
    _empezarPago = function () {
        var jsonSend = "";
        var keyDeclaracion = "";
        var formTotal = localStorage.getItem("SUNAT.FormularioTotal");

        var numeroRUC = "";
        var razonSocial = "";
        var usuarioBean = comunLibreria.obtenerUsuarioBean();
        if (usuarioBean != null) {
            numeroRUC = usuarioBean.numRUC;
            razonSocial = usuarioBean.nombreCompleto;
        }

        if (parseInt(formTotal) != 0) {
            var totalFormularios = $(".Icono-Carrito__Cantidad").html();
            if (totalFormularios==undefined) {
                console.log("Total Items(bandeja-pre):" + totalFormularios);
                totalFormularios = formTotal;
            }
            console.log("Total Items(bandeja):" + totalFormularios);
            var datafinal = "";
            var guuid = localStorage.getItem("SUNAT.FormularioGuuid");
            jsonSend = jsonSend + '{ "identificadorPresentacion": "' + guuid + '", "versionBrowser":"' + comunLibreria.getVersionBrowser() +'", "versionSO":"' + comunLibreria.getVersionSO() +'", "direccionIP":"' + comunLibreria.getAddressIP() +'", "cantidadFormularios": "' + totalFormularios + '", "montoTotalPagar": ' + comunBandeja.obtenerTotalaPagar() + ', "fechaEnvio" :  "' + moment().format("DD/MM/YYYY HH:mm:ss") + '", "ruc":"'+numeroRUC+'", "razonSocial":"'+razonSocial+'", "declaraciones": "{';
            var i = 0;

            var keyGuuidArray = new Array();
            var localStorageArray = localStorage;
            console.log("Total localStorageArray:" + localStorageArray.length);
            for (var idxLS=0, lenLS=localStorageArray.length; idxLS<lenLS; idxLS++) {
                var key = localStorageArray.key(idxLS);
                console.log("_empezarPago:key: " + key + " idxLS:" + idxLS);
                if (comunLibreria.contieneCadena(key,guuid) && (! comunLibreria.contieneCadena(key,"SUNAT.CopiaDeclaracion."))) {
                    console.log("Encontro JSON en LOCAL");

                    console.log("Verificando integrida de elementos.");
                    if (!comunLibreria.encontrarElementoArray(keyGuuidArray,key)) {
                        console.log("No se encontro key:" + key + " adicionando a vector.");
                        keyGuuidArray.push(key);

                        datafinal = "";
                        var data = localStorageArray.getItem(key);
                        if (i == 0) {
                            datafinal = ' "formulario" :[' + data;
                        }
                        else {
                            datafinal = data;
                        }
                        i++;

                        jsonSend = jsonSend + datafinal.replace(new RegExp("\"", 'g'), "\\\"")
                        if (i != parseInt(formTotal)) {
                            jsonSend = jsonSend + ',';
                        }

                        //Realizando copia de la declaracion, para que luego sea accedido para mostrar la consulta declarada
                        comunBandeja.addKeyDataStorage("SUNAT.CopiaDeclaracion." + key, data)
                    }
                }
            }
            jsonSend = jsonSend + ']}","codigoMedioPresentacion":"01"}';
            console.log(jsonSend);

            //Realizando copia de valores del formulario para la posterior consulta
            comunBandeja.addKeyDataStorage("SUNAT.CopiaDeclaracion.FormularioTotal",formTotal);
            comunBandeja.addKeyDataStorage("SUNAT.CopiaDeclaracion.FormularioGuuid",guuid);
        }
        return jsonSend;
    };
    _empezarPagoVisa = function () {

        var servletSend = "accion=respuestavisa&numBandeja=1000001110&numPas=1&numMedPagPas=1&codTipmon=cod&codMedpag=1&codEntFin=1&tipoOperacion=1&codTipSer=2&mtoOpe=100";

        return servletSend;
    };
    return {
        inicializar: function () {
        },
        empezarPago: function () {
            console.log("empezarPago");
            var jsonSend = _empezarPago();
            dataJsonResult = comunServiciosBandeja.enviarPresentaDeclaracion(jsonSend);
            console.log("jsonprueba2016"+dataJsonResult);
        },
        empezarPagoMayorZero: function () {
            console.log("empezarPagoMayorZero");
            var jsonSend = _empezarPago();
            dataJsonResult = comunServiciosBandeja.enviarPresentaDeclaracionMayorZero(jsonSend);
        },
        empezarPagoVisa: function () {
            console.log("empezarPagoVisa");
            var parameters = _empezarPagoVisa();
            var htmlPagosVisa = comunServiciosBandeja.enviarPresentaDeclaracionVisa(parameters);

            console.log("htmlPagosVisa " + htmlPagosVisa);
            $('#frame').contents().find('#respuestaServlet').html(htmlPagosVisa);

            console.log("=================> Otro Input DOM : "+ window.frames['frame'].document.getElementById('nombrePillin').value);
            console.log("=================> Otro Input jquery : " + $("#frame").contents().find('#nombrePillin').val());
            console.log("================> Boton Div DOM : " + window.frames['frame'].document.getElementById('btnAceptarPagar2').value);
            console.log("=================> Boton Div jquery : "+ $("#frame").contents().find('#btnAceptarPagar2').text());
            console.log("=========================================");
            console.log("=================> idConstancia Div DOM : " + window.frames['frame'].document.getElementById('idConstancia').value);
            console.log("=================> idConstancia Div jquery : "+ $("#frame").contents().find('#idConstancia').val());

            var jsonPagosVisaServlet = $("#frame").contents().find('#idConstancia').val();
            var jsonPagosVisa = JSON.stringify(eval('('+jsonPagosVisaServlet+')'));
            var obj = JSON.parse(jsonPagosVisa);

            console.log("=============================");
            console.log("JSON.stringify: " + jsonPagosVisa);
            console.log("obj: " + obj);
            console.log("=============================");

            console.log("obj['msg']: " + obj['msg']);
            console.log("=============================");

            var msjRpta = obj['msg'];
            var objMsjRpta = JSON.parse(msjRpta);
            console.log("msjRpta :" + msjRpta);

            console.log("resultado : " + objMsjRpta['resultadoPago']);
            console.log("codigo Banco : " + objMsjRpta['resultadoPago']['codigoBanco']);
            console.log("Descripcion Banco : " + objMsjRpta['resultadoPago']['descripcionBanco']);

            $('#frame').contents().find('#formVisa').hide();

            $('#rptaServletVisa').html("Descripcion Banco : "+ objMsjRpta['resultadoPago']['descripcionBanco']);

            dataJsonResult = msjRpta;
        },
        obtenerResultado: function () {
            return dataJsonResult;
        },
        obtenerTributosParaBancos: function () {
            return _obtenerTributosParaBancos();
        }
    };
})();

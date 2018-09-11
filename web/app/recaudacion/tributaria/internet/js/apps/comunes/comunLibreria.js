var comunLibreria = (function () {
    var urlProtocol;
    var urlDomain;
    var tokenKeyAuth;
    var tokenValueAuth;
    var tokenKeyAuthGestor = "";

    var tokenKeyForm;
    var tokenValueForm;

    var httpStatusCodeForRetry = [];
    var hostsForRetry = [];
    var retryNumber = 3;

    // var parametriaReintentosJson = '{"tiempoEspera": 1000, "numeroReintentos": 4, "httpStatusCodes": [{"httpStatusCode": 502},{"httpStatusCode": 503}, {"httpStatusCode": 504}], "hosts": [{"host":"//e-plataformaunica.sunat.gob.pe"}, {"host":"//e-plataformaunica.sunat.gob.pe"}]}';
    // var parametriaReintentos = JSON.parse(parametriaReintentosJson);

    var parametriaReintentos = null;
    $.ajax({
        type: "GET",
        url: "//e-plataformaunica.sunat.gob.pe/app/recaudacion/tributaria/internet/plataformaunica-hosts.json",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            parametriaReintentos = data;
        },
        error: function (xhr, ajaxOptions, thrownError) {
        },
        async: false
    });
    //console.log("Obteniendo lista de hosts:" + parametriaReintentos);

    $.each(parametriaReintentos.httpStatusCodes, function (index, item) {
        httpStatusCodeForRetry.push(item.httpStatusCode);
    });
    $.each(parametriaReintentos.hosts, function (index, item) {
        hostsForRetry.push(item.host);
    });

    urlProtocol = "";
    urlDomain = "";

    tokenKeyAuth = "IdCache";
    tokenValueAuth = sessionStorage.getItem('token');  //"F020E691-0B05-45A6-A6B6-D373415E235A";
    tokenKeyForm = "IdFormulario";
    tokenValueForm = "*MENU*";

    //TODO:Enviando el usuarioBean al microservicio, se comenta en ambiente de calidad, desarrollo se activa
    tokenKeyUsuarioBean = "UsuarioBean";
    var numRUC = sessionStorage.getItem("RUC_Login");
    var timbre = sessionStorage.getItem("RUC_" + numRUC);
    ////console.log("timbre, usuarioBean = " + timbre);

    tokenValueUsuarioBean = ""; //timbre; //'{"id":"12345678","ticket":"12345678","login":null,"correo":"prueba@hotmail.com","nombres":"Juan","apePaterno":"Perez","apeMaterno":"Castillo","nombreCompleto":"Juan Perez Castillo","nroRegistro":null,"codUO":"000","codCate":"000","numRUC":"20100049181","usuarioSOL":"LTUANSEL","codDepend":"021","idCelular":"999444443","codTOpeComer":null}';

    var TIPO_DECLARACION = {
        ORIGINAL: {value: 0, name: "Original", code: "0"},
        SUSITUTORIA: {value: 1, name: "Sustitutoria", code: "1"},
        RECTIFICATORIA: {value: 2, name: "Rectificatoria", code: "2"}
    };

    var LISTA_FORMULARIOS = {
        F0621: {value: 621, name: "IGV RENTA MENSUAL", code: "0621", codeOAuth: "0102"},
        F0626: {value: 626, name: "AGENTES DE RETENCION IGV", code: "0626", codeOAuth: "0103"},
        F0633: {value: 633, name: "AGENTES DE PERCEPCIONES", code: "0633", codeOAuth: "0104"},
        F0697: {value: 697, name: "AGENTES DE PERCEPCIONES VENTAS INTERNAS", code: "0697", codeOAuth: "0105"}
    };

    //Clases para la trama log
    var TramaLogUbicacion = function () {
        this.clase = "";
        this.metodo = "";
        this.linea = "";
        this.columna = "";
    };
    var TramaLogDataPersonalizada = function () {
        this.campo = "";
        this.valor = "";
    };
    var TramaLogMicroServicio = function () {
        this.nombre = "";
        this.ambiente = "";
        this.idCache = "";
    };
    var TramaLogOrigenPeticion = function () {
        this.userAgent = "";
        this.serverName = "";
        this.remoteAddr = "";
        this.idCliente = "";
    };
    var TramaLogJavaProperties = function () {
        this.javaVersion = "";
        this.javaVmName = "";
        this.javaVendor = "";
        this.javaRuntimeVersion = "";
        this.userLanguage = "";
        this.userCountryFormat = "";
        this.osArch = "";
        this.osName = "";
        this.osVersion = "";
        this.userDir = "";
        this.userHome = "";
        this.userName = "";
    };
    var TramaLogClienteDesktop = function () {
        this.javaProperties = null;
        this.addJavaProperties = function (javaProperties) {
            this.javaProperties = javaProperties;
        };
    };
    var TramaLog = function () {
        this.timestamp = "";
        this.severidad = "error";
        this.codMsg = "";
        this.descMsg = "";
        this.codFormulario = "";
        this.trace = "";
        this.vCliente = "";
        this.ubicacion = null;
        this.microServicio = null;
        this.origenPeticion = null;
        this.clienteDesktop = null;

        this.addUbicacion = function (ubicacion) {
            this.ubicacion = ubicacion;
        };
        this.dataPersonalizada = [];
        this.addDataPersonalizada = function (dataPersonalizada) {
            this.dataPersonalizada.push(dataPersonalizada);
        };
        this.addMicroServicio = function (microServicio) {
            this.microServicio = microServicio;
        };
        this.addOrigenPeticion = function (origenPeticion) {
            this.origenPeticion = origenPeticion;
        };
        this.addClienteDesktop = function (clienteDesktop) {
            this.clienteDesktop = clienteDesktop;
        };
    };
    var UsuarioBean = function () {
        this.id = "";
        this.ticket = "";
        this.login = "";
        this.correo = "";
        this.nombres = "";
        this.apePaterno = "";
        this.apeMaterno = "";
        this.nombreCompleto = "";
        this.nroRegistro = "";
        this.codUO = "";
        this.codCate = "";
        this.numRUC = "";
        this.usuarioSOL = "";
        this.codDepend = "";
        this.idCelular;
        this.codTOpeComer = "";

        this.json = function () {
            return JSON.stringify(this);
        }
    };

    return {
        getUrlIniciarSesion: function() {
          return "https://e-menu.sunat.gob.pe/internet_qa.html"; //qapu.html para DESA
        },
        getEnumListaFormularios: function () {
            return LISTA_FORMULARIOS;
        },
        getEnumTipoDeclaracion: function () {
            return TIPO_DECLARACION;
        },
        getProtocol: function () {
            return urlProtocol;
        },
        getNameDomain: function () {
            return urlDomain;
        },
        getTokenKeyAuth: function () {
            return tokenKeyAuth;
        },
        getTokenValueAuth: function () {
            return tokenValueAuth;
        },
        getTokenKeyUsuarioBean: function () {
            return tokenKeyUsuarioBean;
        },
        getTokenValueUsuarioBean: function () {
            return tokenValueUsuarioBean;
        },
        getNumRUC: function () {
            return numRUC;
        },
        callDeleteJsonServiceWithControl: function (urlService, parameters, callBackFunction, callBackFunctionError, jsonSend) {
            $.ajax({
                type: "DELETE",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, tokenValueAuth);
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: urlProtocol + urlDomain + urlService + parameters,
                urlService: urlService,
                parameters: parameters,
                hosts: hostsForRetry,
                data: jsonSend,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: callBackFunction,
                error: callBackFunctionError,
                async: false
            }).retry({times: parametriaReintentos.numeroReintentos, statusCodes: httpStatusCodeForRetry});
        },
        callPostJsonServiceWithControl: function (urlService, parameters, callBackFunction, callBackFunctionError, jsonSend) {
            $.ajax({
                type: "POST",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, sessionStorage.getItem('token'));
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: urlProtocol + urlDomain + urlService + parameters,
                urlService: urlService,
                parameters: parameters,
                hosts: hostsForRetry,
                data: jsonSend,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: callBackFunction,
                error: callBackFunctionError,
                async: false
            }).retry({times: parametriaReintentos.numeroReintentos, statusCodes: httpStatusCodeForRetry});
        },
        callPostJsonServiceWithControlAsync: function (urlService, parameters, callBackFunction, callBackFunctionError, jsonSend) {
            $.ajax({
                type: "POST",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, tokenValueAuth);
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: urlProtocol + urlDomain + urlService + parameters,
                urlService: urlService,
                parameters: parameters,
                hosts: hostsForRetry,
                data: jsonSend,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: callBackFunction,
                error: callBackFunctionError,
                async: true
            }).retry({times: parametriaReintentos.numeroReintentos, statusCodes: httpStatusCodeForRetry});
        },
        callPostJsonService: function (urlService, parameters, callBackFunction, jsonSend) {
            $.ajax({
                type: "POST",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, tokenValueAuth);
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: urlProtocol + urlDomain + urlService + parameters,
                urlService: urlService,
                parameters: parameters,
                hosts: hostsForRetry,
                data: jsonSend,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: callBackFunction,
                error: function (xhr, ajaxOptions, thrownError) {
                },
                async: false
            }).retry({times: parametriaReintentos.numeroReintentos, statusCodes: httpStatusCodeForRetry});
        },
        callGetJsonServiceWithControl: function (urlService, parameters, callBackFunction, callBackFunctionError) {
            $.ajax({
                type: "GET",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, tokenValueAuth);
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: urlProtocol + urlDomain + urlService + parameters,
                urlService: urlService,
                parameters: parameters,
                hosts: hostsForRetry,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: true,
                success: callBackFunction,
                error: callBackFunctionError,
                async: false
            }).retry({times: parametriaReintentos.numeroReintentos, statusCodes: httpStatusCodeForRetry});
        },
        callGetJsonServiceWithControlAsync: function (urlService, parameters, isCache, callBackFunction, callBackFunctionError) {
            $.ajax({
                type: "GET",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, tokenValueAuth);
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: urlProtocol + urlDomain + urlService + parameters,
                urlService: urlService,
                parameters: parameters,
                hosts: hostsForRetry,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: isCache,
                success: callBackFunction,
                error: callBackFunctionError,
                async: true
            }).retry({times: parametriaReintentos.numeroReintentos, statusCodes: httpStatusCodeForRetry});
        },
        callGetJsonService: function (urlService, parameters, callBackFunction) {
            $.ajax({
                type: "GET",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, tokenValueAuth);
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: urlProtocol + urlDomain + urlService + parameters,
                urlService: urlService,
                parameters: parameters,
                hosts: hostsForRetry,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: callBackFunction,
                error: function (xhr, ajaxOptions, thrownError) {
                },
                async: false
            }).retry({times: parametriaReintentos.numeroReintentos, statusCodes: httpStatusCodeForRetry});
        },
        callGetHtmlService: function (urlService, parameters, callBackFunction) {
            $.ajax({
                type: "GET",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, sessionStorage.getItem('token'));
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: urlProtocol + urlDomain + urlService + parameters,
                contentType: "text/html; charset=UTF-8",
                dataType: "html",
                cache: false,
                success: callBackFunction,
                error: function (xhr, ajaxOptions, thrownError) {
                },
                async: false
            });
        },
        callGetBinaryService: function (urlService, parameters, fileName) {
            var blobResult = null;
            var xhr = new XMLHttpRequest();
            xhr.open('GET', urlProtocol + urlDomain + urlService + parameters, true);
            xhr.setRequestHeader(tokenKeyAuth, tokenValueAuth); // completar luego
            xhr.setRequestHeader("IdFormulario", "*MENU*"); // completar luego
            //xhr.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean); // completar luego
            xhr.responseType = 'blob';

            xhr.onload = function (e) {
                if (this.status == 200) {
                    // get binary data as a response
                    var blob = this.response;
                    blobResult = new Blob([blob], {type: 'application/pdf'});
                    fileName = fileName +".pdf";
                    if(window.navigator.msSaveOrOpenBlob) { // para internet explorer
                        window.navigator.msSaveOrOpenBlob(blobResult, fileName);

                    }else{
                        var url = URL.createObjectURL(blobResult);
                        var a = document.createElement('a');
                        a.href = url;    
                        a.download = fileName;
                        a.target = '_blank';
                        document.body.appendChild(a);
                        a.click();
                        window.setTimeout(function() {
                          URL.revokeObjectURL(blobResult);
                          document.body.removeChild(a);
                        }, 0);
                    }
                } else {
                    $('#modalErrorSinServicioExportar').modal('show');
                }
            };
            xhr.send();
            return blobResult;
        },
        getJson: function (nameFileStatic) {
            var dataResult = "";
            $.ajax({
                type: "GET",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, tokenValueAuth);
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: nameFileStatic,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: true,
                success: function (data) {
                    dataResult = data;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                },
                async: false
            }).retry({times: retryNumber, statusCodes: httpStatusCodeForRetry});
            return dataResult;
        },
        getJsonDynamic: function (urlFromParametria) {
            var dataResult = "";
            $.ajax({
                type: "GET",
                beforeSend: function (req) {
                    req.setRequestHeader(tokenKeyAuth, tokenValueAuth);
                    req.setRequestHeader(tokenKeyForm, tokenValueForm);
                    req.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean);
                },
                url: urlFromParametria,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: true,
                success: function (data) {
                    dataResult = data;
                },
                error: function (xhr, ajaxOptions, thrownError) {
                },
                async: false
            })
            return dataResult;
        },
        padLeft: function (s, l, c) {
            return Array(l - s.length + 1).join(c || " ") + s
        },
        /**
         * @function generateUUID
         * Generar un codigo en formato GUUID
         *
         * @return {string} 3e578dd8-52fa-41ce-ae0e-cc371d419808
         */
        generateUUID: function () {
            var d = new Date().getTime();
            if (window.performance && typeof window.performance.now === "function") {
                d += performance.now();
                ; //use high-precision timer if available
            }
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (d + Math.random() * 16) % 16 | 0;
                d = Math.floor(d / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid;
        },
        getVersionSO: function () {
            var OSName = "Unknown OS";
            if (navigator.appVersion.indexOf("Win") != -1)
                OSName = "Windows";
            if (navigator.appVersion.indexOf("Mac") != -1)
                OSName = "MacOS";
            if (navigator.appVersion.indexOf("X11") != -1)
                OSName = "UNIX";
            if (navigator.appVersion.indexOf("Linux") != -1)
                OSName = "Linux";
            return OSName;
        },
        getVersionBrowser: function () {
            return bowser.name + ' ' + bowser.version
        },
        callServiceDiscoverIP: function () {
            //TODO: 27Ene2017 se reemplazara por un microservicio
            // $.getJSON("http://jsonip.com/?callback=?", function (data) {
            //     comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.Variable2",data.ip);
            // });
            comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.Variable2", "192.168.1.1");
        },
        getAddressIP: function () {
            return "192.168.1.1";
        },
        getIdCache: function (urlService, callBackFunction, callBackFunctionError, jsonSend) {
            $.ajax({
                type: "POST",
                beforeSend: function (req) {

                    req.setRequestHeader("Content-Type", "application/json");
                    req.setRequestHeader("appKey", "passw0rd");
                    req.setRequestHeader("appId", "plataforma.sunat.peru.oauthclientprofile");
                    req.setRequestHeader("user", "MenuSol");
                    req.setRequestHeader("userKey", "Passw0rdUsr");
                    req.setRequestHeader("scope", "/getToken");
                },
                url: urlProtocol + urlDomain + urlService,
                data: jsonSend,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: callBackFunction,
                error: callBackFunctionError,
                async: false
            });
        },
        getTimbre: function (urlService, callBackFunction, callBackFunctionError, idCache) {
            $.ajax({
                type: "GET",
                beforeSend: function (req) {
                    req.setRequestHeader("Content-Type", "application/json");
                    req.setRequestHeader("idCache", idCache);
                },
                url: urlProtocol + urlDomain + urlService,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                cache: false,
                success: callBackFunction,
                error: callBackFunctionError,
                async: false
            });
        },
        getParents: function (elem, selector) {
            var parents = [];
            var firstChar;
            if (selector) {
                firstChar = selector.charAt(0);
            }
            // Get matches
            for (; elem && elem !== document; elem = elem.parentNode) {
                if (selector) {

                    // If selector is a class
                    if (firstChar === '.') {
                        if (elem.classList.contains(selector.substr(1))) {
                            parents.push(elem);
                        }
                    }

                    // If selector is an ID
                    if (firstChar === '#') {
                        if (elem.id === selector.substr(1)) {
                            parents.push(elem);
                        }
                    }

                    // If selector is a data attribute
                    if (firstChar === '[') {
                        if (elem.hasAttribute(selector.substr(1, selector.length - 2))) {
                            parents.push(elem);
                        }
                    }

                    // If selector is a tag
                    if (elem.tagName.toLowerCase() === selector) {
                        parents.push(elem);
                    }

                } else {
                    parents.push(elem);
                }

            }
            // Return parents if any exist
            if (parents.length === 0) {
                return null;
            } else {
                return parents;
            }
        },
        /**
         * @function formatearPeriodoaCadena
         * Recibe un string 11-2016 o 11/2016 y lo convierte 201611
         *
         * @param {string} periodo - string a convertir
         */
        formatearPeriodoaCadena: function (periodo) {
            var result = "";
            if (periodo != null) {
                if (periodo != "" && periodo.length == 7) {
                    if (periodo.length == 7) {
                        result = periodo.substr(3, 4) + periodo.substr(0, 2);
                    }
                }
            }
            return result;
        },
        retornaStringMenosUno: function (valorString) {
            return valorString.substr(0, valorString.length - 1);
        },
        obtenerValorDouble: function (valorString) {
            var result = 0;
            if (valorString != "") {
                result = parseFloat(valorString);
            }
            return result;
        },
        convertirFechaFormateada: function (dateIn) {
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
            return String(dd + "/" + comunLibreria.padLeft(MM.toString(), 2, '0') + "/" + yyyy); // Leading zeros for mm and dd
        },
        convertirHoraFormateada: function (dateIn) {
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
        },
        validarEmail: function (email) {
            var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

            return regex.test(email);
        },
        formatStringPeriod: function (periodo) {
            //recibe un string 11-2016, lo convierte 201611
            var result = "";
            if (periodo != null) {
                if (periodo != "") {
                    if (periodo.indexOf("-") == 2) {
                        result = periodo.substr(3, 4) + periodo.substr(0, 2);
                    } else if (periodo.indexOf("-") == 4) {
                        result = periodo.replace("-", "");
                    } else if (periodo.indexOf("/") == 2) {
                        result = periodo.substr(3, 4) + periodo.substr(0, 2);
                    } else if (periodo.indexOf("/") == 4) {
                        result = periodo.replace("-", "");
                    } else
                        result = periodo;

                }
            }
            return result;
        },
        obtenerUsuarioBean: function () {
            var jsonUsuarioBean = null;
            //console.log("obtenerUsuarioBean");
            var ruc = sessionStorage.getItem("RUC_Login");
            //console.log("_obtenerUsuarioBean:ruc:" + ruc);
            if (ruc != null) {
                var usuarioBean = sessionStorage.getItem("RUC_" + ruc);
                //console.log("obtenerUsuarioBean:usuarioBean:" + usuarioBean);
                if (usuarioBean != null) {
                    jsonUsuarioBean = JSON.parse(usuarioBean);
                }
            }
            return jsonUsuarioBean;
        },
        obtenerMontoFormateado: function (montoTotalString) {
            var montoTotalFormateado = "0";

            if (montoTotalString == "") {
                return "0";
            }

            if (typeof montoTotalString == 'number') {
                montoTotalString = "" + montoTotalString.toString();
            }

            if (montoTotalString != null) {
                montoTotalString = montoTotalString.replace(/,/g, '');
                var montoTotal = parseFloat(montoTotalString);
                montoTotalFormateado = montoTotal.toLocaleString(2);
            }
            return montoTotalFormateado;
        },
        obtenerMontoFormateado2: function (montoTotalString) {
            var montoTotalFormateado = "0";

            if (montoTotalString == "") {
                return "0";
            }

            if (typeof montoTotalString == 'number') {
                montoTotalString = "" + montoTotalString.toString();
            }

            if (montoTotalString != null) {
                montoTotalString = montoTotalString.replace(/,/g, '');
                var montoTotal = parseFloat(montoTotalString);
                montoTotalFormateado = montoTotal.toLocaleString('en-US');
            }
            return montoTotalFormateado;
        },
        obtenerMontoFormateadoWithFractionDigits: function (montoTotalString) {
            var montoTotalFormateado = "0";

            if (typeof montoTotalString == 'number') {
                montoTotalString = "" + montoTotalString.toString();
            }

            if (montoTotalString != null) {
                montoTotalString = montoTotalString.replace(/,/g, '');
                var montoTotal = parseFloat(montoTotalString);
                montoTotalFormateado = montoTotal.toLocaleString(undefined, {minimumFractionDigits: 2});
            }
            return montoTotalFormateado;
        },
        obtenerMontoFormateadoWithFractionDigits2: function (montoTotalString) {
            var montoTotalFormateado = "0";

            if (typeof montoTotalString == 'number') {
                montoTotalString = "" + montoTotalString.toString();
            }

            if (montoTotalString != null) {
                montoTotalString = montoTotalString.replace(/,/g, '');
                var montoTotal = parseFloat(montoTotalString);
                montoTotalFormateado = montoTotal.toLocaleString('en-US', {minimumFractionDigits: 2});
            }
            return montoTotalFormateado;
        },
        obtenerMontoFormateadoInteger: function (montoTotalString) {
            var montoTotalFormateado = "0";
            if (montoTotalString != null) {

                var montoTotal = parseInt(montoTotalString);
                montoTotalFormateado = montoTotal;
            }
            return montoTotal;
        },
        validarConexionInternet: function () {
            var hayConexion = false;
            if (navigator.onLine) {
                hayConexion = true;
            }
            return hayConexion;
        },
        mostrarModalPresentarPagar: function (mensaje) {
            $("span.titleMensajeGeneral").text(mensaje);
            $('#modalMensajePresentarPagar').modal('show');
        },
        mostrarModalMensajePagos: function (mensaje) {
            $("span.titleMensajeGeneral").text(mensaje);
            $('#modalMensajePagos').modal('show');
        },
        cambiarTextoBontonesModalPresentarPagar: function (textBtnAceptar, textBtnCancelar) {
            $('#btnPresentarPagar').text(textBtnAceptar);
            $('#btnCancelarPresentarPagar').text(textBtnCancelar);
            if (textBtnAceptar == "ACEPTAR")
            {
                $("#btnPaso04").removeClass("btn-is-disabled");
                $("#btnPaso03").addClass("btn-is-disabled");
                $("#btnPaso02").addClass("btn-is-disabled");
                $("#btnPaso01").addClass("btn-is-disabled");
            }
        },
        verificarFormatoJSON: function (stringJSON) {
            var result = true;
            try {
                var jsonData = JSON.parse(stringJSON);
            } catch (err) {
                //console.log("verificarformatoJSON:" + err.message);
                result = false;
            }
            return result;
        },
        generarInformacionLog: function (descripcionError) {
            var informacionLog = {};
            informacionLog.timestamp = new Date();
            informacionLog.ruc = this.getNumRUC();
            informacionLog.ip = this.getAddressIP();
            informacionLog.nombreServicio = "receptorLog";
            informacionLog.metodo = "registrarLog";
            informacionLog.codResp = "01";
            informacionLog.origen = "INTERNET";
            informacionLog.descResp = descripcionError;

            return JSON.stringify(informacionLog);
        },
        formatearLongtoDateDDMMYY_SLASH: function (fecha) {
            var hoy = new Date(fecha);
            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1;
            var yyyy = hoy.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }
            hoy = dd + '/' + mm + '/' + yyyy;
            return hoy;
        },
        formatearLongtoDateYYYMMDD_SLASH: function (fecha) {
            var hoy = new Date(fecha);
            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1;
            var yyyy = hoy.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }
            hoy = yyyy + '/' + mm + '/' + dd;

            return new Date(hoy);
        },
        formatearLongtoStringYYYMMDD_GUION: function (fecha) {
            var hoy = new Date(fecha);
            var dd = hoy.getDate();
            var mm = hoy.getMonth() + 1;
            var yyyy = hoy.getFullYear();

            if (dd < 10) {
                dd = '0' + dd;
            }

            if (mm < 10) {
                mm = '0' + mm;
            }
            hoy = yyyy + '-' + mm + '-' + dd;

            return hoy;
        },
        contieneCadena: function (cadena, valor) {
            if (cadena != null) {
                if (cadena.indexOf(valor) != -1) {
                    return true;
                }
            }
            return false;
        },
        encontrarElementoArray: function (vector, elemento) {
            var result = false;
            for (i = 0; i < vector.length; i++) {
                if (vector[i] == elemento) {
                    result = true;
                    break;
                }
            }
            return result;
        },
        formatearPeriodoSUNAT: function (periodo) {
            //Recibe 201408
            var result = "";
            if (periodo != null) {
                if (periodo != "" && periodo.length == 6) {
                    if (periodo.length == 6) {
                        result = periodo.substr(4, 2) + "/" + periodo.substr(0, 4);
                    }
                }
            }
            return result;
        },
        formatearYYYMMDD_GUION: function (dateString) {
            //Recibe DD/MM/YYYY, retorna YYYY-MM-DD
            var result = "";
            if (dateString != null) {
                if (dateString != "" && dateString.length == 10) {
                    if (dateString.length == 10) {
                        result = dateString.substr(6, 4) + "-" + dateString.substr(3, 2) + "-" + dateString.substr(0, 2);
                    }
                }
            }
            return result;
        },
        formatearYYYMMDD_SLASHtoMMYYYY: function (dateString) {
            //Recibe MM-YYYY, retorna YYYY/MM/DD
            var result = "";
            if (dateString != null) {
                if (dateString != "" && dateString != null) {
                    result = dateString.substr(3, 7) + "/" + dateString.substr(0, 2) + "/01";
                }
            }
            return result;
        },
        generarInformacionLogMessage: function (msg, url, lineNo, columnNo, error) {
            var tramaLog = new TramaLog();
            var tramaLogUbicacion = new TramaLogUbicacion();

            tramaLogUbicacion.clase = "";
            tramaLogUbicacion.columna = columnNo;
            tramaLogUbicacion.linea = lineNo;
            tramaLogUbicacion.clase = url;
            tramaLog.addUbicacion(tramaLogUbicacion);

            tramaLog.timestamp = new Date();
            if (error != null) {
                if (error.stack != undefined) {
                    tramaLog.trace = error.stack;
                }
            }
            tramaLog.descMsg = msg;

            //console.log("generarInformacionLogMessage:" + JSON.stringify(tramaLog));
            return JSON.stringify(tramaLog);
        },
        generarInformacionLogMessage2: function (nameJavascript, nameFunction, error) {
            var tramaLog = new TramaLog();
            var tramaLogUbicacion = new TramaLogUbicacion();

            tramaLogUbicacion.clase = nameJavascript;
            tramaLogUbicacion.metodo = nameFunction;
            tramaLog.addUbicacion(tramaLogUbicacion);

            tramaLog.timestamp = new Date();
            if (error != null) {
                if (error.stack != undefined) {
                    tramaLog.trace = error.stack;
                    tramaLog.descMsg = error.message;
                }
            }

            //console.log("generarInformacionLogMessage2:" + JSON.stringify(tramaLog));
            return JSON.stringify(tramaLog);
        },
        setBeginToken: function() {
            var token = sessionStorage.getItem('token');
            //console.log("setBeginToken: " + token);
            if (token!=null) {
                var rucLogin = sessionStorage.getItem("RUC_Login");
                //console.log("setBeginToken:ruc: " + rucLogin);
                if (rucLogin == null) {
                    //console.log("setBeginToken:Invocando gestor de sesiones");
                    var responseGS = comunServiciosSesion.obtenerTimbre(token);
                    //console.log("setBeginToken::obtenerTimbre " + responseGS);
                    if (responseGS != null && responseGS.codigo == "200") {
                        //console.log("Se ejecuto con exito el Gestor de Sesiones.");
                        var timbreBean = responseGS.usuarioBean;
                        if (timbreBean != null) {
                            var usuarioBean = new UsuarioBean();
                            usuarioBean.id = timbreBean.id;
                            usuarioBean.ticket = timbreBean.ticket;
                            usuarioBean.login = timbreBean.login;
                            usuarioBean.correo = timbreBean.correo;
                            usuarioBean.nombres = timbreBean.nombres;
                            usuarioBean.apePaterno = timbreBean.apePaterno;
                            usuarioBean.apeMaterno = timbreBean.apeMaterno;
                            usuarioBean.nombreCompleto = timbreBean.nombreCompleto;
                            usuarioBean.nroRegistro = timbreBean.nroRegistro;
                            usuarioBean.codUO = timbreBean.codUO;
                            usuarioBean.codCate = timbreBean.codCate;
                            usuarioBean.numRUC = timbreBean.numRUC;
                            usuarioBean.usuarioSOL = timbreBean.usuarioSOL;
                            usuarioBean.codDepend = timbreBean.codDepend;
                            usuarioBean.idCelular = timbreBean.idCelular;
                            usuarioBean.codTOpeComer = timbreBean.codTOpeComer;

                            sessionStorage.setItem("RUC_Login", timbreBean.numRUC);
                            sessionStorage.setItem("RUC_" + timbreBean.numRUC, usuarioBean.json());
                            //console.log("setBeginToken::Se setearon valores en sessionStorage ");
                        }
                    }
                    else {
                        //console.log("setBeginToken: Error al acceder al gestor de sesiones!" );
                    }
                }
            }
            else {
                //console.log("setBeginToken: Error al acceder al token!" );
            }
        },
        casteoDate: function (fecha) {
            if (fecha instanceof Date) {
                return fecha;
            } else if ($.isNumeric(fecha)) {
                return new Date(Number(fecha));
            }
            return new Date(fecha);
        }
    };
})();

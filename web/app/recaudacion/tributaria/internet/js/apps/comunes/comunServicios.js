//var xmlhttp;

function jsAjaxXMLObject() {
    var xmlRequest = null;
    try {
        xmlRequest = new ActiveXObject("Msxml2.XMLHTTP");  // For Old Microsoft Browsers
    } catch (e)
    {
        try {
            xmlRequest = new ActiveXObject("Microsoft.XMLHTTP");  // For Microsoft IE 6.0+
        } catch (e2) {
            xmlRequest = false;   // No Browser accepts the XMLHTTP Object then false
        }
    }
    if (!xmlRequest && typeof XMLHttpRequest != 'undefined') {
        xmlRequest = new XMLHttpRequest();        //For Mozilla, Opera Browsers
    }
    return xmlRequest;
}

/**
 * @autor jyauyo
 *
 * @function jsCallRest
 * Funcion que invoca al REST
 *
 */
function jsCallRest(method, url, tokenValueAuth) {
    xhr = jsAjaxXMLObject();
    xhr.onreadystatechange = function () {
        jsRestStatus();
    };
    xhr.open(method, url, true);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("IdCache", tokenValueAuth); // completar luego
    xhr.setRequestHeader("IdFormulario", "*MENU*"); // completar luego

    xhr.send("");
}

/**
 * @autor jyauyo
 *
 * @function jsAjaxStatus
 * Cuando la respuesta del Servicio REST es ok, obtiene valida si existe retraso o adelanto de horas y minutos del cliente con las horas y minutos del servidor
 *
 */
function jsRestStatus() {
    try {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {//response del REST ok

                data = xhr.responseText;
                sessionStorage.setItem("fecha_hora", data);

                var dataJson = $.parseJSON(data);
                var horaServidor = dataJson.hora;
                console.log("horaServidorReal " + horaServidor);

                //horaServidor = "01:54:03";
                //console.log("horaServidorFake "+horaServidor);

                var fechaCliente = new Date();

                var horaCliente = fechaCliente.toTimeString().split(' ')[0];
                console.log("horaCliente " + horaCliente);

                var horaAdelantada = '0';
                var horaRetrasada = '0';

                //verificos horas
                if (parseInt(horaCliente.split(":")[0]) > parseInt(horaServidor.split(":")[0])) {
                    horaAdelantada = jsRestarSumarHoras(horaCliente, horaServidor, -1);
                } else if (parseInt(horaServidor.split(":")[0]) > parseInt(horaCliente.split(":")[0])) {
                    horaRetrasada = jsRestarSumarHoras(horaServidor, horaCliente, -1);
                } else {
                    //horas iguales, entonces verifico minutos
                    console.log("horas iguales, verifico minutos");
                    if (parseInt(horaCliente.split(":")[1]) > parseInt(horaServidor.split(":")[1])) {
                        horaAdelantada = jsRestarSumarHoras(horaCliente, horaServidor, -1);
                    } else if (parseInt(horaServidor.split(":")[1]) > parseInt(horaCliente.split(":")[1])) {
                        horaRetrasada = jsRestarSumarHoras(horaServidor, horaCliente, -1);
                    }
                }
                console.log("horaAdelantada " + horaAdelantada);
                console.log("horaRetrasada " + horaRetrasada);

                sessionStorage.setItem("horaAdelantada", horaAdelantada);
                sessionStorage.setItem("horaRetrasada", horaRetrasada);

                //verifico cada 30 segundos
                window.setInterval(jsValidarItemBandeja, 30000);
            }
        } else if (xhr.readyState < 4) {
            //se puede cargar un loading
            //document.getElementById(target).innerHTML = strHtmlWait;
        }
    } catch (e) {
        console.log("error " + e);
        //alert(e);
    }
}

/**
 * @autor jyauyo
 *
 * @function jsValidarItemBandeja
 * Validad si hay items en la Bandeja y calcula el tiempo limite
 *
 */
function jsValidarItemBandeja() {
    var formTotal = "" + localStorage.getItem("SUNAT.FormularioTotal");
    if (parseInt(formTotal) != 0) {
        if (jsCalculoTiempoAviso("23:59:59") == 5) {
            $("span.titleMensajeGeneral").text("Favor realizar el pago, Faltan 5 minutos para finalizar el dia");
            $('#modalMensajeGeneral').modal('show');
        }
    }
}

/**
 * @autor jyauyo
 *
 * @function jsCalculoTiempoAviso
 * Calcula los minutos faltantes a la hora Limite
 *
 * @return minutos Faltantes
 */
function jsCalculoTiempoAviso(horaLimite) {

    var horaAdelantada = sessionStorage.getItem("horaAdelantada");
    var horaRetrasada = sessionStorage.getItem("horaRetrasada");

    var fechaActual = new Date();
    var horaActual = fechaActual.toTimeString().split(' ')[0];

    var horasModificada;

    if (horaAdelantada == '0' && horaRetrasada == '0') {

        horasModificada = horaActual;
    } else {

        if (horaAdelantada == '0') {
            horasModificada = jsRestarSumarHoras(horaActual, horaRetrasada, 1);
        } else if (horaRetrasada == '0') {
            horasModificada = jsRestarSumarHoras(horaActual, horaAdelantada, -1);
        }
    }
    console.log('horaLimite ' + horaLimite);
    console.log('horasModificada ' + horasModificada);

    var tiempoRestante = jsRestarSumarHoras(horaLimite, horasModificada, -1);
    console.log('tiempoRestante ' + tiempoRestante);

    var horasRestantes = parseInt(tiempoRestante.split(":")[0]);
    var minutosRestantes = parseInt(tiempoRestante.split(":")[1]);

    var minutosTotalesRestante = horasRestantes * 60 + minutosRestantes;

    console.log('tiempoRestanteMinutos ' + minutosTotalesRestante);
    return minutosTotalesRestante;
}

/**
 * @autor jyauyo
 *
 * @function jsRestarSumarHoras
 * Resta o suma horas segun la variable operador (-1 o +1)
 *
 * @return hora en formato : hh:mm:ss
 */
function jsRestarSumarHoras(hora1, hora2, operador) {

    horasArray = new Array(hora1, hora2);

    horatotale = new Array(0, 0, 0);

    for (b = 0; b < horasArray.length; b++) {
        horas = horasArray[b].split(":");

        for (a = 0; a < 3; a++) {
            horas[a] = (isNaN(parseInt(horas[a]))) ? 0 : parseInt(horas[a])
            horatotale[a] = (b == 0) ? horas[a] : horatotale[a] + (operador) * horas[a]; // Suma o resta
        }
    }

    horatotal = new Date()
    horatotal.setHours(horatotale[0]);
    horatotal.setMinutes(horatotale[1]);
    horatotal.setSeconds(horatotale[2]);

    return (horatotal.getHours() + ":" + horatotal.getMinutes() + ":" + horatotal.getSeconds());
}

var obtenerFechaHora = function () {
    // Invocación para obtener la Fecha y Hora del Servidor
    var URL_OBTENER_FECHA = comunLibreria.getProtocol() + comunLibreria.getNameDomain() + '/v1/recaudacion/tributaria/t/consulta/obtenerFechaHora';

    var tokenValueAuth = sessionStorage.getItem('token');

    //TODO:30Marzo2017 - desabilitando invocacion
    //jsCallRest('GET', URL_OBTENER_FECHA, tokenValueAuth);

    xhr = new XMLHttpRequest();

    xhr.onload = function () {
        Response = xhr.responseText;
        sessionStorage.setItem("fecha_hora", Response);
    };
    xhr.ontimeout = function (e) {
        Response = "";
        console.log("timeout");
    };

    xhr.open('GET', URL_OBTENER_FECHA, true);

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader("IdCache", tokenValueAuth); // completar luego
    xhr.setRequestHeader("IdFormulario", "*MENU*"); // completar luego
    xhr.send();

}
//TODO: 30Marzo2017, se debera de invocar a traves dek servicio
//obtenerFechaHora();

/**
 * @function generateUUID
 * Generar un codigo en formato GUUID
 *
 * @return {string} 3e578dd8-52fa-41ce-ae0e-cc371d419808
 */
var generateUUID = function () {
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
}

var formatStringPeriod = function (periodo) {
    //recibe un string 11-2016, lo convierte 201611
    var result = "";
    if (periodo != null) {
        if (periodo != "") {
            if (periodo.indexOf("-") == 2) {
                result = periodo.substr(3, 4) + periodo.substr(0, 2);
            } else
            if (periodo.indexOf("-") == 4) {
                result = periodo.replace("-", "");
            } else
            if (periodo.indexOf("/") == 2) {
                result = periodo.substr(3, 4) + periodo.substr(0, 2);
            } else
            if (periodo.indexOf("/") == 4) {
                result = periodo.replace("-", "");
            } else
                result = periodo;

        }
    }

    return result;
};

var Boletas = function () {
    this.numOrd = 0;
    this.numOrdOri = 0;
    this.numRuc = "";
    this.numRucSec = "";
    this.fecPres = "";
    this.horPres = "";
    this.perTri = "";
    this.semFor = "0";
    this.codIndrec = "0";
    this.codOrifor = "01";
    this.codOriPres = "01";
    this.codTipfor = "21";
    this.numValPag = 0;
    this.mtoPag = 0;
    this.codTipdetrac = "0";
    this.codEstado = "90";
    this.codEtapa = "00";
    this.numIdConstancia = 0;
    this.numIdResumen = 0;
    this.numIdReporte = 0;
    this.numNabono = "";
    this.numResrec = "";
    this.indValLib = "0";
    this.numPedPro = "";
    this.numPedAnu = "";
    this.indForAut = "1";
    this.codEntFin = "000";
    this.numOpebco = "";
    this.numBandeja = 0;
    this.numCargaPdt = 0;
    this.codMedpag = "";
    this.nomEntFin = "";
    this.fecPago = "";
    this.codFor = "1662";
    this.desFor = "";
    this.numVerFor = "";

    this.numTrabajador = "0";
    this.numPensionista = "0";
    this.numCuartaCategoria = "0";
    this.numNorEspecial = "0";
    this.numModFormativa = "0";
    this.numTercero = "0";

    this.casillasFormularioList = [];
    this.addCasillasFormulario = function (CasillasFormulario) {
        this.casillasFormularioList.push(CasillasFormulario);
    };
    this.tributosDeclaradosPagadosList = [];
    this.addTributosDeclaradosPagados = function (TributosDeclaradosPagados) {
        this.tributosDeclaradosPagadosList.push(TributosDeclaradosPagados);
    };
    this.json = function () {
        return JSON.stringify(this);
    };
};

var TributosDeclaradosPagadosPK = function () {
    //this.numOrd = 0;
    this.codTri = "";
    this.json = function () {
        return JSON.stringify(this);
    };
};

var TributosDeclaradosPagados = function () {
    this.tributosDeclaradosPagadosPK = new TributosDeclaradosPagadosPK();
    this.mtoBasimp = 0; //Monto base imponible
    this.mtoImpres = 0; //Monto impuesto resultante
    this.mtoPagtot = 0; //Monto pagado
    this.mtoTotDeu = 0; //monto de la deuda tributaria
    this.indVig = "1";
    this.perTri = "";
    this.porTasa = 0;
    this.mtoRespag = 0;
    this.json = function () {
        return JSON.stringify(this);
    }
};

var RectificatoriasTributoPK = function () {
    //this.numOrd = 0;
    this.numRectif = "";
    this.json = function () {
        return JSON.stringify(this);
    }
};

var RectificatoriasTributo = function () {
    this.rectificatoriasTributoPK = new RectificatoriasTributoPK();
    this.perTri = "";
    this.mtoImpres = 0;
    this.codForant = "";
    this.indVig = "1";
    this.mtoImpresAnt = 0;
    this.codOrirec = "";
    this.codEstrec = "";
    this.codInduci = "";
    this.codTipver = "";
    this.numOrdori = "";
    this.codTri = "";
    this.fecVer = null;
    this.codForori = "";
    this.numOrdant = 0;
    this.json = function () {
        return JSON.stringify(this);
    }
}

var CoeficienteIGVPeriodo = function () {
    this.numOrd = 0;
    this.codFor = "";
    this.perTri = "";
    this.indReccoe = "0";
    this.codEstrec = "0";
    this.mtoExpdet = 0;
    this.indVig = "1";
    this.codTri = "";
    this.mtoVnogdet = 0;
    this.mtoVngdet = 0;
    this.json = function () {
        return JSON.stringify(this);
    }
};

var CargaPdt = function () {
    this.numCargaPdt = 0;
    this.codFor = 0;
    this.perTri = "";
    this.numRuc = "";
    this.numOrdFor = 0;
    this.cntSegUnzc = 0;
    this.cntSegTot = 0;
    this.indEstRech = "";
    this.fecCargaPdt = null;
    this.desArchivo = "";
    this.cntTamArch = 0;
    this.cntSegDesc = "";
    this.codDep = "";
    this.indProc = "";
    this.json = function () {
        return JSON.stringify(this);
    }
};

var AutoguardadoFormularioPK = function () {
    this.numRuc = "";
    this.codFor = "";
    this.perTri = "";
    this.json = function () {
        return JSON.stringify(this);
    }
};

var AutoguardadoFormulario = function () {
    this.autoguardadoFormularioPK = new AutoguardadoFormularioPK();
    this.arcAutoguar = "";
    this.indProc = "";
    this.valHash = "";
    this.json = function () {
        return JSON.stringify(this);
    }
};


var CasillasFormularioPK = function () {
    //this.numOrd = 0;
    this.numCas = 0;
    this.json = function () {
        return JSON.stringify(this);
    }
};
var CasillasFormulario = function () {
    this.casillasFormularioPK = new CasillasFormularioPK();
    this.codTipcas = "";
    this.perTri = "";
    this.desValcas = "";
    this.codTipCam = "";
    this.json = function () {
        return JSON.stringify(this);
    };
};

var CasillasSugeridasFinalesPK = function () {
    this.numOrd = 0;
    this.numCas = 0;
    this.json = function () {
        return JSON.stringify(this);
    }
};

var CasillasSugeridasFinales = function () {
    this.casillasSugeridasFinalesPK = new CasillasSugeridasFinalesPK();
    this.indValDif = "";
    this.desCasfin = ""; //valor final
    this.desCassug = ""; //valor inicial
    this.perTri = "";
    this.json = function () {
        return JSON.stringify(this);
    }
};

var DetallePagosPreviosPK = function () {
    //this.numOrd = 0;
    this.numOrdPre = 0;
    this.codTriPag = "";
    this.codForPre = 0;

    this.json = function () {
        return JSON.stringify(this);
    }
};
var DetallePagosPrevios = function () {
    this.detallePagosPreviosPK = new DetallePagosPreviosPK();
    this.codDepPag = "";
    this.numRucPag = "";
    this.perTriPag = "";
    //this.numSecPag = 0;

    this.mtoPag = 0;
    this.indSel = "";
    this.fecPag = null;
    this.json = function () {
        return JSON.stringify(this);
    }
};

var AnexasFormularioPK = function () {
    //this.numOrd = 0;
    this.codExtanx = "";
    this.codNomanx = "";
    this.json = function () {
        return JSON.stringify(this);
    }
};

var AnexasFormulario = function () {
    this.anexasFormularioPK = new AnexasFormularioPK();
    this.desTabanx = "";
    this.perTri = "";
    this.json = function () {
        return JSON.stringify(this);
    }
};

var DetallesCoeficienteIGVPK = function () {
    //this.numOrd = 0;
    this.codPerdet = 0;
    this.json = function () {
        return JSON.stringify(this);
    }
};
var DetallesCoeficienteIGV = function () {
    this.detallesCoeficienteIGVPK = new DetallesCoeficienteIGVPK();
    this.perTri = "";
    this.mtoExpdet = 0;
    this.codTri = "";
    this.mtoVnogdet = 0;
    this.mtoVngdet = 0;
    this.json = function () {
        return JSON.stringify(this);
    }
};

var RetencionesPercepcionesIgvPK = function () {
    this.numOrd = 0;
    this.numCorArc = 0;
};
var RetePercIGV = function () {
    this.retencionesPercepcionesIgvPK = new RetencionesPercepcionesIgvPK();
    this.perTri = "";
    this.codTipDec = "";
    this.codTipArc = "";
    this.codTipPer = "";
    this.nomArc = "";
    this.cntReg = 0;
    this.mtoTotCmpr = 0;
    this.arcImp = "";
};

var FormularioBean = function Formulario() {
    this.identificadorFormulario = "";
    this.codUsuregis = "";
    this.numOrdOri = 0;
    this.numOrd = 0;
    this.numRuc = "";
    this.perTri = "";
    this.codFor = "";
    this.desFor = "";
    this.numVerFor = "1";
    this.fecPres = "";
    this.horPres = "";
    this.mtoPag = 0;
    this.numBandeja = 0;
    this.codOrifor = "01"; // 01 = Tributos Internos, 02 = Tributos Aduaneros, 03 = Detracciones
    this.codTipfor = "10";
    this.indValLib = "0"; // Indicador valida libros electronicos: 0 = No, 1 = Si
    this.codTipdetrac = "0"; // Tipo de detraccion, solo en caso de deposito de detracciones: I = Individual, M = Masivo. Para otros formularios considerar el valor "0"
    //this.desArchivoPdt = ""; //
    this.codEtapa = "00";
    /* Etapa de formulario en los procesos de cuadre y nota de abono:
     01 = Operacion pendiente de cuadre (pago cero)
     02 = Operacion pendiente de cuadre (pago mayor a cero)
     03 = Operacion incluida en cuadre definitivo
     04 = Operacion Incluida en nota de abono  */

    this.indForAut = "0"; // Indicador de formulario autogenerado: 0 = No, 1 = Si
    this.numNabono = "";
    this.codEntFin = "000";
    this.numPedAnu = "";
    this.semFor = "0";
    this.numIdResumen = 0;
    this.numRucSec = "";
    this.numValPag = 0; // Numero de valor a pagar, en caso el formulario sea una boleta 1662 Pago de Valores. En otros casos considerar valor "0"
    this.numCargaPdt = 0;
    this.numIdConstancia = 0;
    this.numOpebco = 0;
    this.codIndrec = "0";
    this.codEstado = "90";// Estado de formulario: 00 = Presentado OK, 97 = Rechazado, 90 = Registro Inicial
    this.numResrec = "";
    this.numIdReporte = 0;
    this.numPedPro = "";
    this.codOriPres = "01"; // 01 = En esta primera fase sera solo De Parte, debido que lo registra el contribuyente
    //this.tamArchPdt = 0;
    this.numTrabajador = "0";
    this.numPensionista = "0";
    this.numCuartaCategoria = "0";
    this.numNorEspecial = "0";
    this.numModFormativa = "0";
    this.numTercero = "0";

    this.retePercIGVList = [];
    this.addRetePercIGV = function (RetePercIGV) {
        this.retePercIGVList.push(RetePercIGV);
    };

    this.boletas = [];
    this.addBoletas = function (Boletas) {
        this.boletas.push(Boletas);
    };
    this.tributosDeclaradosPagadosList = [];
    this.addTributosDeclaradosPagados = function (TributosDeclaradosPagados) {
        this.tributosDeclaradosPagadosList.push(TributosDeclaradosPagados);
    };
    this.rectificatoriasTributoList = [];
    this.addRectificatoriasTributo = function (RectificatoriasTributo) {
        this.rectificatoriasTributoList.push(RectificatoriasTributo);
    };
    this.coeficienteIGVPeriodoList = [];
    this.addCoeficienteIGVPeriodo = function (CoeficienteIGVPeriodo) {
        this.coeficienteIGVPeriodoList.push(CoeficienteIGVPeriodo);
    };

    this.cargaPdt = null;

    this.autoguardadoFormularioList = [];
    this.addAutoguardadoFormulario = function (AutoguardadoFormulario) {
        this.autoguardadoFormularioList.push(AutoguardadoFormulario);
    };
    this.casillasFormularioList = [];
    this.addCasillasFormulario = function (CasillasFormulario) {
        this.casillasFormularioList.push(CasillasFormulario);
    };
    this.casillasSugeridasFinalesList = [];
    this.addCasillasSugeridasFinales = function (CasillasSugeridasFinales) {
        this.casillasSugeridasFinalesList.push(CasillasSugeridasFinales);
    };
    this.detallePagosPreviosList = [];
    this.addDetallePagosPrevios = function (DetallePagosPrevios) {
        this.detallePagosPreviosList.push(DetallePagosPrevios);
    };
    this.anexasFormularioList = [];
    this.addAnexasFormulario = function (anexasFormulario) {
        this.anexasFormularioList.push(anexasFormulario);
    };
    this.detallesCoeficienteIGVList = [];
    this.addDetallesCoeficienteIGV = function (DetallesCoeficienteIGV) {
        this.detallesCoeficienteIGVList.push(DetallesCoeficienteIGV);
    };
    this.json = function () {
        return JSON.stringify(this);
    };
};

var extraerPagosPrevios = function (codTributo, jsonParsePagosPrevios, formularioBean) {
    var j = 0;
    for (var item in jsonParsePagosPrevios) {
        if (item == codTributo) {
            var datapg = jsonParsePagosPrevios[item];
            if (datapg != null) {
                for (j = 0; j < datapg.length; j++) {

                    var detallePagosPrevios = new DetallePagosPrevios();
                    detallePagosPrevios.numRucPag = datapg[j].crtPK.crtNumruc;
                    detallePagosPrevios.mtoPag = parseInt(datapg[j].crtImptri)+ parseInt(datapg[j].crtImpint);
                    detallePagosPrevios.detallePagosPreviosPK.numOrdPre = datapg[j].crtNdocpa;
                    detallePagosPrevios.detallePagosPreviosPK.codForPre = datapg[j].crtPK.crtCodfor;
                    detallePagosPrevios.perTriPag = datapg[j].crtPK.crtPerpag;
                    detallePagosPrevios.detallePagosPreviosPK.codTriPag = datapg[j].crtPK.crtCodtri;
                    detallePagosPrevios.indSel = "0";
                    if (datapg[j].indSel == true) {
                        detallePagosPrevios.indSel = "1";
                    }
                    detallePagosPrevios.fecPag = datapg[j].crtFecpag;
                    detallePagosPrevios.codDepPag = datapg[j].crtDepens;
                    formularioBean.addDetallePagosPrevios(detallePagosPrevios);
                }
            }
        }
    }
};

var ProcesarJson = function (strBandeja, Fecha, Hora) {
    var jsonBandeja = JSON.parse(strBandeja);
    console.log("ProcesarJson(v2)::");
    console.log(jsonBandeja);

    var valorTasa = 0;
    var usuarioSOL = "";
    var usuarioBean = comunLibreria.obtenerUsuarioBean();
    if (usuarioBean != null) {
        usuarioSOL = usuarioBean.usuarioSOL;
    }

    var jsonFormularios = jsonBandeja["formulario"];
    for (var i = 0; i < jsonFormularios.length; i++) {
        var formularioBean = new FormularioBean();

        var obj = jsonFormularios[i];
        for (var key in obj) {
            var attrName = key;
            var attrValue = obj[key];
            switch (key) {
                case "detalle":
                    console.log(obj[key]);
                    valorTasa = obj[key].tasa;
                    formularioBean.identificadorFormulario = obj[key].identificadorFormulario;
                    formularioBean.numRuc = obj[key].numRuc;
                    formularioBean.codFor = obj[key].codFormulario;
                    formularioBean.desFor = obj[key].descripcionFormulario;
                    formularioBean.numVerFor = obj[key].numeroVersionFormulario;
                    formularioBean.perTri = formatStringPeriod(obj[key].periodoTributo);
                    formularioBean.mtoPag = 0;
                    formularioBean.fecPres = Hora;
                    formularioBean.horPres = Hora;
                    formularioBean.codUsuregis = usuarioSOL;
                    var banco = localStorage.getItem("SUNAT.AreaTemporal1.CodigoBanco");
                    if (banco!=null) {
                        formularioBean.codEntFin = banco;
                    }
                    //03Jul2016
                    if (obj[key].numTrabajador != undefined) {
                        formularioBean.numTrabajador = obj[key].numTrabajador;
                    }
                    if (obj[key].numPensionista != undefined) {
                        formularioBean.numPensionista = obj[key].numPensionista;
                    }
                    if (obj[key].num4taCategoria != undefined) {
                        formularioBean.numCuartaCategoria = obj[key].num4taCategoria;
                    }
                    if (obj[key].numNorEspecial != undefined) {
                        formularioBean.numNorEspecial = obj[key].numNorEspecial;
                    }
                    if (obj[key].numModFormativa != undefined) {
                        formularioBean.numModFormativa = obj[key].numModFormativa;
                    }
                    if (obj[key].numTercero != undefined) {
                        formularioBean.numTercero = obj[key].numTercero;
                    }
                    //TODO: 23May2016 SIMULACION DE PRUEBAS DE FALLO, incorrecto nombre en el objeto
                    //formularioBean.numOrdOriError=0;
                    //formularioBean.numOrd = 10;

                    break;
                case "tributos":
                    var arrTributos = obj[key];
                    for (var j = 0; j < arrTributos.length; j++) {
                        var _tributoDDJJ = new TributosDeclaradosPagados();
                        _tributoDDJJ.tributosDeclaradosPagadosPK.codTri = arrTributos[j].codigoTributo;
                        _tributoDDJJ.mtoTotDeu = arrTributos[j].montoDeudaTributaria;

                        var pdtArray = obj["t7788cargapdt"];
                        if (pdtArray != null) {
                            _tributoDDJJ.mtoPagtot = arrTributos[j].valorTributo;
                        } else {
                            _tributoDDJJ.mtoPagtot = 0;
                        }

                        _tributoDDJJ.mtoBasimp = arrTributos[j].baseImponible;
                        _tributoDDJJ.mtoImpres = arrTributos[j].impuestoResultante;
                        _tributoDDJJ.perTri = formularioBean.perTri;
                        _tributoDDJJ.porTasa = valorTasa;

                        formularioBean.addTributosDeclaradosPagados(_tributoDDJJ);

                        // ------------------------------------------------------------------------------------------
                        // Procesando boletas

                        //Creando la instancia boleta
                        var boletas = new Boletas();
                        boletas.numRuc = obj["detalle"].numRuc;
                        boletas.numVerFor = obj["detalle"].numeroVersionFormulario;
                        boletas.perTri = formatStringPeriod(obj["detalle"].periodoTributo);
                        boletas.mtoPag = arrTributos[j].valorTributo;
                        boletas.fecPres = Hora;
                        boletas.horPres = Hora;

                        //Creando el tributo declarado
                        var _tributoBoleta = new TributosDeclaradosPagados();
                        _tributoBoleta.tributosDeclaradosPagadosPK.codTri = arrTributos[j].codigoTributo;
                        _tributoBoleta.mtoTotDeu = arrTributos[j].montoDeudaTributaria;
                        _tributoBoleta.mtoPagtot = arrTributos[j].valorTributo;
                        _tributoBoleta.mtoBasimp = arrTributos[j].baseImponible;
                        _tributoBoleta.mtoImpres = arrTributos[j].impuestoResultante;
                        _tributoBoleta.perTri = formularioBean.perTri;
                        _tributoBoleta.porTasa = valorTasa;
                        formularioBean.mtoPag += comunLibreria.obtenerValorDouble(arrTributos[j].valorTributo);
                        boletas.addTributosDeclaradosPagados(_tributoBoleta);

                        //Creando casilla formulario list
                        var arrayCasillas = obj["casillas"];
                        for (var idx = 0; idx < arrayCasillas.length; idx++) {
                            if (arrayCasillas[idx].codigoCasilla == 2 || arrayCasillas[idx].codigoCasilla == 7
                                    || arrayCasillas[idx].codigoCasilla == 13 || arrayCasillas[idx].codigoCasilla == 58
                                    || arrayCasillas[idx].codigoCasilla == 410 || arrayCasillas[idx].codigoCasilla == 502
                                    || (arrayCasillas[idx].codigoCasilla == 189 && arrTributos[j].codigoTributo == "010101")
                                    || (arrayCasillas[idx].codigoCasilla == 307 && arrTributos[j].codigoTributo == "030301")
                                    || (arrayCasillas[idx].codigoCasilla == 345 && arrTributos[j].codigoTributo == "010106")
                                    || arrayCasillas[idx].codigoCasilla == 100) {

                                var casillasFormularioBoleta = new CasillasFormulario();
                                if (arrayCasillas[idx].valorCasilla == undefined || arrayCasillas[idx].valorCasilla == 'undefined') {
                                    casillasFormularioBoleta.desValcas = "";
                                } else {
                                    casillasFormularioBoleta.desValcas = encodeURIComponent(arrayCasillas[idx].valorCasilla);
                                }

                                casillasFormularioBoleta.codTipcas = "" + arrayCasillas[idx].tipoCasilla;
                                casillasFormularioBoleta.codTipCam = "" + arrayCasillas[idx].codtipcamCasilla;
                                casillasFormularioBoleta.perTri = formularioBean.perTri;
                                if (arrayCasillas[idx].codigoCasilla == 410) {
                                    casillasFormularioBoleta.casillasFormularioPK.numCas = 651;
                                    casillasFormularioBoleta.codTipcas = "05";
                                } else if (arrayCasillas[idx].codigoCasilla == 189 || arrayCasillas[idx].codigoCasilla == 307 || arrayCasillas[idx].codigoCasilla == 345) {
                                    casillasFormularioBoleta.casillasFormularioPK.numCas = 651;
                                    casillasFormularioBoleta.codTipcas = "05";
                                } else if (arrayCasillas[idx].codigoCasilla == 502) {
                                    casillasFormularioBoleta.casillasFormularioPK.numCas = 600;
                                    casillasFormularioBoleta.codTipcas = "00";
                                    casillasFormularioBoleta.desValcas = arrTributos[j].codigoTributo;
                                } else if (arrayCasillas[idx].codigoCasilla == 100) {
                                    casillasFormularioBoleta.casillasFormularioPK.numCas = 600;
                                    casillasFormularioBoleta.codTipcas = "00";
                                    casillasFormularioBoleta.desValcas = arrTributos[j].codigoTributo;
                                } else {
                                    casillasFormularioBoleta.casillasFormularioPK.numCas = arrayCasillas[idx].codigoCasilla;
                                }
                                boletas.addCasillasFormulario(casillasFormularioBoleta);
                            }
                        }
                        formularioBean.addBoletas(boletas);
                        // ------------------------------------------------------------------------------------------
                    }
                    break;
                case "casillas":
                    var arrCasillas = obj[key];
                    for (var j = 0; j < arrCasillas.length; j++) {
                        var casillasFormulario = new CasillasFormulario();

                        casillasFormulario.casillasFormularioPK.numCas = arrCasillas[j].codigoCasilla;
                        //casillasFormulario.desValcas = encodeURIComponent(arrCasillas[j].valorCasilla);
                        if (arrCasillas[j].valorCasilla == 'undefined' || arrCasillas[j].valorCasilla == undefined) {
                            casillasFormulario.desValcas = "";
                        } else {
                            casillasFormulario.desValcas = encodeURIComponent(arrCasillas[j].valorCasilla);
                        }
                        casillasFormulario.codTipcas = "" + arrCasillas[j].tipoCasilla;
                        casillasFormulario.codTipCam = "" + arrCasillas[j].codtipcamCasilla;
                        casillasFormulario.perTri = formularioBean.perTri;

                        //Validando indicador de rectificatoria
                        if (arrCasillas[j].codigoCasilla == 895) {
                            if (arrCasillas[j].valorCasilla == "1" || arrCasillas[j].valorCasilla == "2") {
                                formularioBean.codIndrec = arrCasillas[j].valorCasilla;
                            }
                        }

                        formularioBean.addCasillasFormulario(casillasFormulario);
                    }
                    break;

                case "casillaFormularioList":
                    // Si hay información en esta entrada, es porque viene de Carga PDT:
                    if (formularioBean.casillasFormularioList != null) {
                        for (var j = 0; j < formularioBean.casillasFormularioList.length; j++) {
                            formularioBean.casillasFormularioList.pop();
                        }
                    }
                    formularioBean.casillasFormularioList = [];
                    var arrCasillas = obj[key];
                    for (var j = 0; j < arrCasillas.length; j++) {
                        var casillasFormulario = new CasillasFormulario();
                        casillasFormulario.casillasFormularioPK.numCas = arrCasillas[j].numCas;
                        //casillasFormulario.desValcas = encodeURIComponent(arrCasillas[j].desValCas);
                        if (arrCasillas[j].desValCas == undefined || arrCasillas[j].desValCas == 'undefined') {
                            casillasFormulario.desValcas = "";
                        } else {
                            casillasFormulario.desValcas = encodeURIComponent(arrCasillas[j].desValCas);
                        }
                        casillasFormulario.codTipcas = "" + arrCasillas[j].codTipcas;
                        casillasFormulario.perTri = formatStringPeriod(arrCasillas[j].perTri);
                        formularioBean.addCasillasFormulario(casillasFormulario);

                        //TODO: 25Abr2017 revisar codigo
                        // var casillasFormularioBoleta = new CasillasFormulario();
                        // casillasFormularioBoleta.casillasFormularioPK.numCas = arrCasillas[j].numCas;
                        // casillasFormularioBoleta.desValcas = encodeURIComponent(arrCasillas[j].desValCas);
                        // casillasFormularioBoleta.codTipcas = "" + arrCasillas[j].codTipcas;
                        // casillasFormularioBoleta.perTri = formatStringPeriod(arrCasillas[j].perTri);
                        // boletas.addCasillasFormulario(casillasFormularioBoleta);
                    }
                    break;

                case "t7788cargapdt":
                    formularioBean.codTipfor = "12";
                    var arrCargaPdt = obj[key];
                    var cargaPdt = new CargaPdt();
                    cargaPdt.numCargaPdt = arrCargaPdt.numCargaPdt;
                    cargaPdt.codFor = arrCargaPdt.codFor;
                    cargaPdt.perTri = formatStringPeriod(arrCargaPdt.perTri);
                    cargaPdt.numRuc = arrCargaPdt.numRuc;
                    cargaPdt.numOrdFor = arrCargaPdt.numOrdFor;
                    cargaPdt.cntSegUnzc = arrCargaPdt.cntSegUnzc;
                    cargaPdt.cntSegTot = arrCargaPdt.cntSegTot;
                    cargaPdt.indEstRech = arrCargaPdt.indEstRech;
                    cargaPdt.fecCargaPdt = arrCargaPdt.fecCargaPdt; // validar
                    cargaPdt.desArchivo = arrCargaPdt.desArchivo;
                    cargaPdt.cntTamArch = arrCargaPdt.cntTamArch;
                    cargaPdt.cntSegDesc = arrCargaPdt.cntSegDesc;
                    cargaPdt.codDep = arrCargaPdt.codDep;
                    cargaPdt.indProc = arrCargaPdt.indProc;
                    formularioBean.numCargaPdt = arrCargaPdt.numCargaPdt;
                    formularioBean.cargaPdt = cargaPdt;

                    //TODO: 25Abril2017 realizando ajuste de boletas, verificar implementacion
                    var pdtBoletas = new Boletas();
                    pdtBoletas.numCargaPdt = arrCargaPdt.numCargaPdt;
                    formularioBean.addBoletas(pdtBoletas);
                    break;

                case "anexasFormularioList":
                    var arrAnexas = obj[key];
                    for (var j = 0; j < arrAnexas.length; j++) {
                        var anexasFormulario = new AnexasFormulario();
                        anexasFormulario.anexasFormularioPK.codExtanx = arrAnexas[j].codExtanx;
                        anexasFormulario.anexasFormularioPK.codNomanx = arrAnexas[j].codNomanx;
                        anexasFormulario.desTabanx = encodeURIComponent(arrAnexas[j].desTabanx);
                        anexasFormulario.perTri = formatStringPeriod(arrAnexas[j].perTri);
                        anexasFormulario.codNomanx = arrAnexas[j].codNomanx;

                        formularioBean.addAnexasFormulario(anexasFormulario);
                    }
                    break;

                case "pagosprevios":
                    var arrPagosPrevios = obj[key];
                    for (var j = 0; j < arrPagosPrevios.length; j++) {
                        var detallePagosPrevios = new DetallePagosPrevios();
                        //detallePagosPrevios.numSecPag = arrPagosPrevios[j].detallePagosPreviosPK.numSecPag;
                        detallePagosPrevios.numRucPag = arrPagosPrevios[j].numRucPag;
                        detallePagosPrevios.mtoPag = arrPagosPrevios[j].mtoPag;
                        detallePagosPrevios.detallePagosPreviosPK.numOrdPre = arrPagosPrevios[j].detallePagosPreviosPK.numOrdPre;
                        detallePagosPrevios.detallePagosPreviosPK.codForPre = arrPagosPrevios[j].detallePagosPreviosPK.codForPre;
                        detallePagosPrevios.perTriPag = formatStringPeriod(arrPagosPrevios[j].perTriPag);
                        detallePagosPrevios.detallePagosPreviosPK.codTriPag = arrPagosPrevios[j].detallePagosPreviosPK.codTriPag;
                        detallePagosPrevios.indSel = arrPagosPrevios[j].indSel;
                        detallePagosPrevios.fecPag = arrPagosPrevios[j].fecPag;
                        detallePagosPrevios.codDepPag = arrPagosPrevios[j].codDepPag;
                        formularioBean.addDetallePagosPrevios(detallePagosPrevios);
                    }
                    break;

                case "casillassugeridas":
                    var arrCasillasSugeridas = obj[key];
                    for (var j = 0; j < arrCasillasSugeridas.length; j++) {
                        var casillasSugeridasFinales = new CasillasSugeridasFinales();
                        casillasSugeridasFinales.casillasSugeridasFinalesPK.numCas = arrCasillasSugeridas[j].codigoCasilla;
                        casillasSugeridasFinales.casillasSugeridasFinalesPK.numOrd = "0";
                        console.log("desCassug==");
                        console.log(arrCasillasSugeridas[j]);
                        if (arrCasillasSugeridas[j].valorOriginal == 'undefined' || arrCasillasSugeridas[j].valorOriginal == undefined) {
                            casillasSugeridasFinales.desCassug = "";
                        } else {
                            casillasSugeridasFinales.desCassug = "" + arrCasillasSugeridas[j].valorOriginal + "";
                        }

                        casillasSugeridasFinales.indValDif = "0";
                        casillasSugeridasFinales.perTri = arrCasillasSugeridas[j].periodoCasilla;
                        casillasSugeridasFinales.desCasfin = "" + arrCasillasSugeridas[j].valorCasilla + "";
                        formularioBean.addCasillasSugeridasFinales(casillasSugeridasFinales);
                    }
                    break;

                case "coeficienteigv":
                    var arrCoeficienteIgv = obj[key];
                    for (var j = 0; j < arrCoeficienteIgv.length; j++) {
                        var coeficienteIGVPeriodo = new CoeficienteIGVPeriodo();
                        coeficienteIGVPeriodo.codTri = arrCoeficienteIgv[j].codigoTributo;
                        coeficienteIGVPeriodo.codFor = arrCoeficienteIgv[j].codigoFormulario;
                        coeficienteIGVPeriodo.perTri = arrCoeficienteIgv[j].periodoCasilla;
                        coeficienteIGVPeriodo.mtoExpdet = comunLibreria.obtenerValorDouble(arrCoeficienteIgv[j].montoExportaciones);
                        coeficienteIGVPeriodo.mtoVngdet = comunLibreria.obtenerValorDouble(arrCoeficienteIgv[j].montoVentasGravadas);
                        coeficienteIGVPeriodo.mtoVnogdet = comunLibreria.obtenerValorDouble(arrCoeficienteIgv[j].montoVentaNoGrabadas);
                        formularioBean.addCoeficienteIGVPeriodo(coeficienteIGVPeriodo);
                    }
                    break;

                case "pagosprevios621":
                    var arrPagosPrevios = obj[key];
                    extraerPagosPrevios("010101", arrPagosPrevios, formularioBean);
                    extraerPagosPrevios("030301", arrPagosPrevios, formularioBean);
                    extraerPagosPrevios("010106", arrPagosPrevios, formularioBean);
                    break;
                case "retePercIGVList":
//                    console.log("::::::::servicios::::::::::::::::::::: procesando retePercIGVList");
//                    formularioBean.addRetePercIGV(obj[key]);
                    break;
                default: // son valores simples:
                    break;
            }
        }
        jsonFormularios[i] = formularioBean;
    }
    console.log("=======COMUN SERVICIOS jsonFormularios=======" + jsonFormularios);
    jsonBandeja["formulario"] = jsonFormularios;
    return JSON.stringify(jsonBandeja);
};

var comunServiciosControlador = (function () {
    var urlServiceFormularios;
    var urlServiceFormulariosFrecuentes;
    var urlServiceSaveFrecuentes;
    var urlServiceRemoveFrecuentes;
    var urlServiceParametria;
    var urlServicePagosPrevios;
    var urlServicePeriodo;
    var urlServiceSaveAutoGuardado;
    var urlServiceGetAutoGuardado;
    var urlServiceObtenerCalculoInteres;
    var urlServiceSaveCasillasFrecuentes;
    var urlServiceObtenerReporteResumenTransacciones;
    var urlServiceObtenerReporteNps;
    var urlServiceObtenerReporteResumenTransaccionesDetalle;
    var urlServiceObtenerReporteConstanciaDetalle;
    var urlServiceEnviarCorreoReporteResumenTransacciones;
    var urlServiceEnviarCorreoReporteNps;
    var urlServiceEnviarCorreoReporteDetalleResumenTransacciones;
    var urlServiceEnviarCorreoReporteConstancia;
    var urlServiceEnviarCorreoReporteConstanciaBoleta;
    var urlServiceEnviarCorreoReporteConstanciaMasiva;
    var urlServletTransaccionesVisa;
    var urlServiceValidacionFormulario;
    var urlServiceCoeficiente;
    var urlServiceObtenerReporteResumenTransaccionesBoleta;
    var urlServiceObtenerReporteResumenTransaccionesMasiva;
    var urlServiceRegistrarLog;
    var urlServiceObtenerResumenCasillasLE;
    var urlServiceObtenerUbigeo;
    var urlServiceObtenerTasasVigentesPorTributo;
    var urlServiceObtenerTipoDeclaracion;
    var urlServiceObtenerExportacionesEmbarcadas;
    var urlServiceObtenerSaldoFavor;
    var urlServiceObtenerCoeficienteRenta;
    var urlServiceObtenerCoeficienteIGV;
    var urlServicePercepcionesMes;
    var urlServiceRetencionesMes;
    var urlServicedeterminarFormaDeclaracion;
    var urlServicePagosPrevios621;
    var urlServiceObtenerfechavencimiento;
    var urlServiceObtenerTributosAsociados;
    var urlServiceObtenerListTributosAfectos;
    var urlServiceObtenerIndicadorTipoMoneda;
    var urlServiceObtenerPorcentajeRentaTributo;
    var urlServiceTasaInteresMoratorio;
    var urlObtenerCasillasDeclaracionAnterior;
    var urlObtenerValidarcambioregimen;
    var urlObtenerDatosPeriodo;
    var urlObtenerDetalleParametros;
    //adicionales
    var urlObtenerIngresosAnuales;
    var urlValidacionCondicionesFraccionamiento;
    var urlServiceRegistrarLogMessage;

    var urlServicePadronParametro;
    
    var urlServiceObtenerLinkDevolucion;
    var urlServiceObtenerLinkFraccionamiento;

    urlServiceFormularios = "/v1/recaudacion/tributaria/t/consulta/listFormularios/";
    urlServiceFormulariosFrecuentes = "/v1/recaudacion/tributaria/formulariofrecuente/t/consulta/listFormularioFrecuente/";
    urlServiceSaveFrecuentes = "/v1/recaudacion/tributaria/formulariofrecuente/e/formulariofrecuente/registrarFormularioFrecuente/";
    urlServiceSaveCasillasFrecuentes = "/v1/recaudacion/tributaria/formulariofrecuente/e/formulariofrecuente/registrarCasillaFrecuente/";
    urlServiceRemoveFrecuentes = "/v1/recaudacion/tributaria/formulariofrecuente/e/formulariofrecuente/eliminarFormularioFrecuente/";
    urlServicePagosPrevios = "/v1/recaudacion/tributaria/consultalegacy/t/consulta/obtenerpagosprevios/";
    urlServicePeriodo = "/v1/recaudacion/tributaria/retencionigv/t/retencion/obtenerDatosPeriodo/"; //"/plataformaunica/json-modelos/LLENADO-periodo-original.json"; //la url y los parametros viene de la parametria
    urlServiceCoeficiente = "/v1/recaudacion/tributaria/t/consulta/obtenerCoeficienteIGV/";
    urlServiceSaveAutoGuardado = "/v1/recaudacion/tributaria/autoguardadoform/e/autoguardadoformulario/insertarAutoguardadoFormulario/";
    urlServiceGetAutoGuardado = "/v1/recaudacion/tributaria/autoguardadoform/e/autoguardadoformulario/getAutoguardadoFormulario/";
    urlServiceObtenerCalculoInteres = "/v1/recaudacion/tributaria/consultalegacy/t/consulta/calcularInteres/";
    urlServiceParametria = "/v1/recaudacion/tributaria/parametriaformularios/t/consulta/obtenerParametrosFormulario/";
    urlServiceObtenerReporteResumenTransacciones = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaGenerarReporteResumenTransaccionesInternet/";
    urlServiceObtenerReporteNps = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaGenerarReporteNps/";
    urlServiceObtenerReporteResumenTransaccionesDetalle = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaGenerarReporteResumenTransaccionesDetalleInternet/";
    urlServiceObtenerReporteResumenTransaccionesBoleta = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaGenerarReporteResumenTransaccionesDetalleBoleta/";
    urlServiceObtenerReporteResumenTransaccionesMasiva = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaGenerarReporteResumenTransaccionesMasiva/"
    urlServiceObtenerReporteConstanciaDetalle = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaGenerarReporteDetalle/";
    urlServiceEnviarCorreoReporteResumenTransacciones = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaEnviarCorreoReporteResumenTransaccionesInternet/";
    urlServiceEnviarCorreoReporteNps = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaEnviarCorreoReporteNps/";
    urlServiceEnviarCorreoReporteDetalleResumenTransacciones = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaEnviarCorreoReporteDetalleResumenTransaccionesInternet/";
    urlServiceEnviarCorreoReporteConstancia = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaEnviarCorreoReporteConstanciaInternet/";
    urlServiceEnviarCorreoReporteConstanciaBoleta = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaEnviarCorreoReporteConstanciaBoleta/";
    urlServiceEnviarCorreoReporteConstanciaMasiva = "/v1/recaudacion/tributaria/consulta/t/visorconstancia/factoriaEnviarCorreoReporteConstanciaMasiva/";
    urlServletTransaccionesVisa = "/v1/recaudacion/tributaria/orquestacionprocesaendpointpago/t/transaccionvisa?";
    urlServiceValidacionFormulario = "/v1/recaudacion/tributaria/parametriaformularios/t/consulta/validacionFormulario/";
    urlServiceRegistrarLog = "/v1/recaudacion/tributaria/receptorlog/t/registro/registrarlog/";
    urlServiceObtenerResumenCasillasLE = "/v1/recaudacion/tributaria/t/formularioIgv/obtenerResumenCasillasLE/";
    urlServiceObtenerUbigeo = "/v1/recaudacion/tributaria/t/formularioIgv/obtenerUbigeo";
    urlServiceObtenerTasasVigentesPorTributo = "/v1/recaudacion/tributaria/consultalegacy/t/consulta/obtenerTasasVigentesPorTributo/";
    urlServiceObtenerTipoDeclaracion = "/v1/recaudacion/tributaria/t/consulta/obtenerTipoDeclaracion/";
    urlServiceObtenerExportacionesEmbarcadas = "/v1/recaudacion/tributaria/consultalegacy/t/consulta/obtenerExportacionesEmbarcadas/";
    urlServiceObtenerSaldoFavor = "/v1/recaudacion/tributaria/consultalegacy/t/consulta/obtenerSaldosAFavor/";
    urlServiceObtenerCoeficienteRenta = "/v1/recaudacion/tributaria/t/consulta/obtenerCoeficienteRenta/";
    urlServiceObtenerCoeficienteIGV = "/v1/recaudacion/tributaria/t/consulta/obtenerCoeficienteIGV/";
    urlServicePercepcionesMes = "/v1/recaudacion/tributaria/t/formularioIgv/obtenerPercepcionesPeriodo/";
    urlServiceRetencionesMes = "/v1/recaudacion/tributaria/t/formularioIgv/obtenerRetencionesPeriodo/";
    urlServicedeterminarFormaDeclaracion = "/v1/recaudacion/tributaria/t/formularioIgv/determinarFormaDeclaracion/";
    urlServicePagosPrevios621 = "/v1/recaudacion/tributaria/consultalegacy/t/consulta/obtenerpagosprevios621/";
    urlServiceObtenerfechavencimiento = "/v1/recaudacion/tributaria/consultalegacy/t/consulta/obtenerfechavencimiento/";
    urlServiceObtenerTributosAsociados = "/v1/recaudacion/tributaria/t/formularioIgv/obtenertributosasociados/";
    urlServiceObtenerListTributosAfectos = "/v1/recaudacion/tributaria/t/formularioIgv/listTributosAfectos/";
    urlServiceObtenerIndicadorTipoMoneda = "/v1/recaudacion/tributaria/t/formularioIgv/obtenerIndicadorTipoMoneda";
    urlServiceObtenerPorcentajeRentaTributo = "/v1/recaudacion/tributaria/t/formularioIgv/obtenerPorcentajeRentaTributo/";
    urlServiceTasaInteresMoratorio = "/v1/recaudacion/tributaria/parametriaformularios/t/consulta/factoriaExternosDetalle/3005?hash_id=0.0849771440641458";
    urlObtenerCasillasDeclaracionAnterior = "/v1/recaudacion/tributaria/t/formularioIgv/obtenercasillasdeclaracionanterior/";
    urlObtenerValidarcambioregimen = "/v1/recaudacion/tributaria/t/formularioIgv/validarcambioregimen/";
    urlObtenerDatosPeriodo = "/v1/recaudacion/tributaria/t/formularioIgv/obtenerDatosPeriodo/";
    urlObtenerDetalleParametros = "/v1/recaudacion/tributaria/t/formularioIgv/obtenerdetalleparametros/";
    urlObtenerIngresosAnuales = "/v1/recaudacion/tributaria/t/consulta/obtenerdetalleingresosdeclarados/";
    urlValidacionCondicionesFraccionamiento = "/v1/recaudacion/tributaria/t/consulta/validarCondicionesFraccionamiento/";
    urlServiceRegistrarLogMessage = "/v1/recaudacion/tributaria/receptorlog/t/registro/registrarlogmensaje/";

    urlServicePadronParametro = "/v1/recaudacion/tributaria/parametriaformularios/t/consulta/obtenerPadronParametro0621";
    urlServiceObtenerLinkDevolucion = "/v1/recaudacion/tributaria/t/fraccionamiento/generaLinkDevolucion";
    urlServiceObtenerLinkFraccionamiento = "/v1/recaudacion/tributaria/t/fraccionamiento/generaLinkFraccionamiento";

    return {
        commonLogic: comunLibreria,
        validarCondicionesFraccionamiento: function (parametros) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlValidacionCondicionesFraccionamiento, parametros, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404)
                // {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
//                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerIngresosAnuales: function (parametros) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlObtenerIngresosAnuales, parametros, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerReporteResumenTransacciones: function (numeroBandeja) {
            return this.commonLogic.callGetBinaryService(
                    urlServiceObtenerReporteResumenTransacciones, numeroBandeja, "ResumenTransacciones");
        },
        obtenerReporteNps: function (numeroBandeja) {
            return this.commonLogic.callGetBinaryService(
                    urlServiceObtenerReporteNps, numeroBandeja, "ReporteNps");
        },
        obtenerReporteResumenTransaccionesDetalle: function (numeroOrden) {
            return this.commonLogic.callGetBinaryService(
                    urlServiceObtenerReporteResumenTransaccionesDetalle, numeroOrden, "ConstanciaDeclaracionJurada");
        },
        obtenerReporteResumenTransaccionesBoleta: function (numerosOrden) {
            return this.commonLogic.callGetBinaryService(
                    urlServiceObtenerReporteResumenTransaccionesBoleta, numerosOrden, "ConstanciaBoleta");
        },
        obtenerReporteResumenTransaccionesMasiva: function (numBandeja) {
            return this.commonLogic.callGetBinaryService(
                    urlServiceObtenerReporteResumenTransaccionesMasiva, numBandeja, "ConstanciaMasiva");
        },
        obtenerReporteConstanciaDetalle: function (parametros) {
            return this.commonLogic.callGetBinaryService(
                    urlServiceObtenerReporteConstanciaDetalle, parametros, "ConstanciaDetalle");
        },
        enviarCorreoReporteResumenTransacciones: function (numeroBandeja, email) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceEnviarCorreoReporteResumenTransacciones, numeroBandeja + '/' + email, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                //_ocultarMensajeCorreo();				
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404){
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        enviarCorreoReporteNps: function (numeroBandeja, email) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceEnviarCorreoReporteNps, numeroBandeja + '/' + email, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                _ocultarMensajeCorreo();
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404){
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        enviarCorreoReporteDetalleResumenTransacciones: function (numeroOrden, numeroBandeja, email) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceEnviarCorreoReporteDetalleResumenTransacciones, numeroOrden + "/" + numeroBandeja + '/' + email, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        enviarCorreoReporteConstanciaMasiva: function (numeroBandeja, email) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceEnviarCorreoReporteConstanciaMasiva, numeroBandeja + '/' + email, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        enviarCorreoReporteConstancia: function (numeroOrden, email) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceEnviarCorreoReporteConstancia, numeroOrden + '/' + email, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        enviarCorreoReporteConstanciaBoleta: function (numeroOrden, numeroOrdenB, email) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceEnviarCorreoReporteConstanciaBoleta, numeroOrden + '/' + numeroOrdenB + '/' + email, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerPadronParametro: function () {
//            urlServicePadronParametro
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(
                    urlServicePadronParametro, '', function (data) {
                        dataResult = data;
                    }, function (xhr, ajaxOptions, thrownError) {

                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                } else if (xhr.status == 404) {
                    //
                } else {
                    //
                }
            });
            return dataResult;
        },
        obtenerContenidoHtmlTransaccionesVisa: function (params) {
            var dataResult = null;
            this.commonLogic.callGetHtmlService(
                    urlServletTransaccionesVisa, params, function (data) {
                        dataResult = data;
                    }, function (xhr, ajaxOptions, thrownError) {

                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                } else if (xhr.status == 404) {
                    //
                } else {
                    //
                }
            });
            return dataResult;
        },
        obtenerTodosFormularios: function () {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceFormularios, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {

                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);

                comunServiciosControlador.registrarLog(comunLibreria.generarInformacionLog("Error en obtener todos los Formularios " + xhr.status));

                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerTodosFrecuentes: function () {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceFormulariosFrecuentes, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {

                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);

                comunServiciosControlador.registrarLog(comunLibreria.generarInformacionLog("Error en obtener Formularios Frecuentes " + xhr.status));

                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerTasaInteres: function () {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceTasaInteresMoratorio, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerParametria: function (codigoFormulario, version) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceParametria, codigoFormulario + "/" + version, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerPagosPrevios: function (params, showModal, iniciarCalculoInteresPagoPrevios, codigoFormulario, codigoTributo) {
            var dataResult = null;
            var inputCont = 1;
            var jsonPagosPreviosFromStorage;

            $('#tblPagosPrevios tbody').empty();

            var pagosPreviosFromStorage = comunBandeja.getKeyDataStorage("SUNAT.AreaTemporal1.PagosPrevios");
            console.log(">>> pagosPreviosFromStorage " + pagosPreviosFromStorage);
            if (pagosPreviosFromStorage == 'null' || pagosPreviosFromStorage == '' || pagosPreviosFromStorage == '[]') {
                this.commonLogic.callGetJsonServiceWithControlAsync(urlServicePagosPrevios, params, false, function (data) {
                    console.log("obtenerPagosPrevios::success!");
                    dataResult = data;

                    if (data != null) {
                        //Almacenando data en localstorage para que luego sea enviado como parte de la declaracion
                        comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.PagosPrevios", JSON.stringify(data));
                        console.log(JSON.stringify(data));
                        $.each(data, function (index, item) {
                            var fechaPago = moment.utc(item.fecPag);
                            var diaPago = fechaPago.format('L');
                            var horaPago = fechaPago.format('LTS');
                            var montoPagoPrevio = "" + item.mtoPag;
                            var valorPagoId = "valorpago" + inputCont;
                            inputCont++;
                            localStorage.setItem("SUNAT.MontoPagoPrevio" + item.detallePagosPreviosPK.numOrdPre, item.mtoPag);
                            $('#tblPagosPrevios > tbody:last').append('<tr> <td>' + item.detallePagosPreviosPK.codForPre + '</td> <td>' + item.detallePagosPreviosPK.numOrdPre + '</td> <td>' + item.detallePagosPreviosPK.codTriPag + '</td> <td>' + diaPago + '</td> <td>' + horaPago + '</td> <td><input maxlength="15" id="' + valorPagoId + '" name="valorpago" size="17" data-idpagoprevioedit="' + item.detallePagosPreviosPK.numOrdPre + '" type="text" value="' + comunLibreria.obtenerMontoFormateadoInteger(montoPagoPrevio) + '" /></td> <td><input data-idpagoprevio="' + item.detallePagosPreviosPK.numOrdPre + '" value="' + item.mtoPag + '" type=\"checkbox\" id=\"lstCheck\" checked></td> </tr>');
                            $('#' + valorPagoId).inputmask({
                                "alias": "decimal",
                                "groupSeparator": ",",
                                "autoGroup": true,
                                "autoUnmask": true,
                                "noshift": true,
                                "digits": 2,
                                "allowPlus": false,
                                "allowMinus": false
                            });
                            $('#' + valorPagoId).keyup(function () {

                                var valorpago1 = $(this).val();
                                if (valorpago1 < 0) {
                                    $(this).val("");
                                }

                            });
                        });
                        if (showModal) {
                            $('#modalPagosPrevios').modal('show');

                        }
                    }
                    comunIntegrador.iniciarCalculoInteresPagosPrevios(codigoFormulario, codigoTributo, iniciarCalculoInteresPagoPrevios);
                }, function (xhr, ajaxOptions, thrownError) {
                    console.log("status http: " + xhr.status);
                    console.log("status: " + xhr.responseText);
                    if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                        $('#modalErrorIdCache').modal('show');
                    } else if (xhr.status == 404) {
                        //TODO: 22May2017 Evaluar codigo
                        $('*[data-casilla="402"]').val("0");
                        $('*[data-casilla="404"]').val("0");
                        if (showModal) {
                            $('#modalCeroRegistros').modal('show');
                        }
                        // Utilizado para calcular interes automaticamente al ingresar al formulario
                        comunIntegrador.iniciarCalculoInteresPagosPrevios(codigoFormulario, codigoTributo, iniciarCalculoInteresPagoPrevios);
                    } else {
                        $('#modalErrorSinServicio').modal('show');
                    }
                });
            } else {
                jsonPagosPreviosFromStorage = JSON.parse(pagosPreviosFromStorage);

                $.each(jsonPagosPreviosFromStorage, function (index, item) {
                    var fechaPago = moment.utc(item.fecPag);
                    var diaPago = fechaPago.format('L');
                    var horaPago = fechaPago.format('LTS');
                    var montoPagoPrevio = "" + item.mtoPag;
                    var valorPagoId = "valorpago" + inputCont;

                    inputCont++;
                    if (item.indSel == "1") {
                        $('#tblPagosPrevios > tbody:last').append('<tr> <td>' + item.detallePagosPreviosPK.codForPre + '</td> <td>' + item.detallePagosPreviosPK.numOrdPre + '</td> <td>' + item.detallePagosPreviosPK.codTriPag + '</td> <td>' + diaPago + '</td> <td>' + horaPago + '</td> <td><input maxlength="15" id="' + valorPagoId + '" name="valorpago" size="17" data-idpagoprevioedit="' + item.detallePagosPreviosPK.numOrdPre + '" type="text" value="' + comunLibreria.obtenerMontoFormateadoInteger(montoPagoPrevio) + '" </td> <td><input data-idpagoprevio="' + item.detallePagosPreviosPK.numOrdPre + '" value="' + item.mtoPag + '" type=\"checkbox\" id=\"lstCheck\" checked></td> </tr>');
                    } else {
                        $('#tblPagosPrevios > tbody:last').append('<tr> <td>' + item.detallePagosPreviosPK.codForPre + '</td> <td>' + item.detallePagosPreviosPK.numOrdPre + '</td> <td>' + item.detallePagosPreviosPK.codTriPag + '</td> <td>' + diaPago + '</td> <td>' + horaPago + '</td> <td><input maxlength="15" id="' + valorPagoId + '" name="valorpago" size="17" data-idpagoprevioedit="' + item.detallePagosPreviosPK.numOrdPre + '" type="text" value="' + comunLibreria.obtenerMontoFormateadoInteger(montoPagoPrevio) + '" </td> <td><input data-idpagoprevio="' + item.detallePagosPreviosPK.numOrdPre + '" value="' + item.mtoPag + '" type=\"checkbox\" id=\"lstCheck\"></td> </tr>');
                    }
                    $('#' + valorPagoId).inputmask({
                        "alias": "decimal",
                        "groupSeparator": ",",
                        "autoGroup": true,
                        "autoUnmask": true,
                        "noshift": true,
                        "digits": 2,
                        "allowPlus": false,
                        "allowMinus": false
                    });
                });

                comunIntegrador.iniciarCalculoInteresPagosPrevios(codigoFormulario, codigoTributo, iniciarCalculoInteresPagoPrevios);

                if (showModal) {
                    $('#modalPagosPrevios').modal('show');
                }
            }

            return dataResult;
        },
        obtenerPeriodo: function (params) {
            var dataResult = null;

            this.commonLogic.callGetJsonServiceWithControl(urlServicePeriodo, params, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1))
                {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerParametrosValidacionFormulario: function (params) {
            var dataResult = null;

            this.commonLogic.callGetJsonServiceWithControl(urlServiceValidacionFormulario, params, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1))
                {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerCoeficiente: function (params) {
            var dataResult = null;

            this.commonLogic.callGetJsonServiceWithControl(urlServiceCoeficiente, params, function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1))
                {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                    //$('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        enviarFrecuentes: function (jsonSend) {
            var dataResult = null;
            ;
            this.commonLogic.callPostJsonServiceWithControl(urlServiceSaveFrecuentes, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            }, jsonSend);
            return dataResult;
        },
        enviarCasillasFrecuentes: function (jsonSend) {
            var dataResult = null;
            ;
            this.commonLogic.callPostJsonServiceWithControl(urlServiceSaveCasillasFrecuentes, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            }, jsonSend);
            return dataResult;
        },
        eliminarFrecuentes: function (jsonSend) {
            var dataResult = null;
            ;
            this.commonLogic.callDeleteJsonServiceWithControl(urlServiceRemoveFrecuentes, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            }, jsonSend);
            return dataResult;
        },
        extraerAutoGuardado: function (formulario, periodo) {
            var dataResult = null;
            var params = formulario + "/" + periodo;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceGetAutoGuardado, params, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1))
                {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        enviarAutoGuardado: function (jsonSend) {
            var dataResult = null;
            this.commonLogic.callPostJsonServiceWithControlAsync(urlServiceSaveAutoGuardado, "", function (data) {
                console.log("enviarAutoGuardado::data " + data);
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
            }, jsonSend);
            return dataResult;
        },
        obtenerCalculoInteres: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerCalculoInteres, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404)
                // {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        registrarLog: function (jsonSend) {
            var dataResult = null;
            ;
            this.commonLogic.callPostJsonServiceWithControlAsync(urlServiceRegistrarLog, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
            }, jsonSend);
            return dataResult;
        },
        registrarLogMessage: function (jsonSend) {
            var dataResult = null;
            ;
            this.commonLogic.callPostJsonServiceWithControlAsync(urlServiceRegistrarLogMessage, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
            }, jsonSend);
            return dataResult;
        },
        obtenerFechaHoraServidor: function () {
            obtenerFechaHora();
        },
        obtenerResumenCasillasLE: function (params) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerResumenCasillasLE, params, function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                    //$('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerUbigeo: function () {
            var dataResult = null;

            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerUbigeo, "", function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                    //$('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerTasasVigentesPorTributo: function (params) {
            var dataResult = null;

            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerTasasVigentesPorTributo, params, function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                }
            });
            return dataResult;
        },
        obtenerPagosPrevios621: function (params) {

            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServicePagosPrevios621, params, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {

                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('*[data-casilla="402"]').val("0");
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerTipoDeclaracion: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerTipoDeclaracion, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerExportacionesEmbarcadas: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerExportacionesEmbarcadas, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerSaldoFavor: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerSaldoFavor, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerCoeficienteRenta: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerCoeficienteRenta, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerCoeficienteIGV: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerCoeficienteIGV, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerPercepcionesMes: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServicePercepcionesMes, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerRetencionesMes: function (parameters) {
            var dataResult = null;
            console.log("-<<<::::: " + parameters);
            this.commonLogic.callGetJsonServiceWithControl(urlServiceRetencionesMes, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        determinarFormaDeclaracion: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServicedeterminarFormaDeclaracion, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerfechavencimiento: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerfechavencimiento, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerTributosAsociados: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerTributosAsociados, parameters, function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerListTributosAfectos: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerListTributosAfectos, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerIndicadorTipoMoneda: function () {
            var dataResult = null;

            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerIndicadorTipoMoneda, "", function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                    //$('#modalErrorSinServicio').modal('show');

                }
            });
            return dataResult;
        },
        obtenerPorcentajeRentaTributo: function (params) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerPorcentajeRentaTributo, params, function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                    //$('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        obtenerCasillasDeclaracionAnterior: function (params) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlObtenerCasillasDeclaracionAnterior, params, function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                    //$('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        ObtenerValidarcambioregimen: function (params) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlObtenerValidarcambioregimen, params, function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                }
            });
            return dataResult;
        },
        ObtenerDatosPeriodo: function (params) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlObtenerDatosPeriodo, params, function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    console.log("Sin Servicio!");
                }
            });
            return dataResult;
        },
        obtenerDetalleParametros: function () {
//            urlObtenerDetalleParametros
            console.log(":::::::::: llamando a la url: " + urlObtenerDetalleParametros);
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlObtenerDetalleParametros, "", function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                console.log("Code http: " + xhr.status);
                console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                } else {
                    console.log("Sin Servicio!");
                }
            });
            return dataResult;
        },
        obtenerLinkDevolucion: function (jsonSend) {
            var dataResult = null;
            this.commonLogic.callPostJsonServiceWithControl(urlServiceObtenerLinkDevolucion, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                $("#myModal25").modal('hide');
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
                dataResult = JSON.parse(xhr.responseText);
            }, jsonSend);

            return dataResult;
        },
        obtenerLinkFraccionamiento: function (jsonSend) {
            var dataResult = null;
            this.commonLogic.callPostJsonServiceWithControl(urlServiceObtenerLinkFraccionamiento, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                $("#myModal25").modal('hide');
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
                dataResult = JSON.parse(xhr.responseText);
            }, jsonSend);

            return dataResult;
        }
    };
})();

var comunServiciosBandeja = (function () {
    var urlServicePresenta;
    var urlServicePagos;
    var urlServiceBancos;
    var urlServicePresentaMayorZero;
    var urlServicePresentacionObtenerResultadoPagoRedis;
    var urlValidarArchivo;
    var urlServiceVerificarBandeja;
    var urlObtenerNumerodeOperacion;
    var numPasarela = 1;  // Constante se configura manualmente según lo definido en Parametrías de Plataforma Unica.
    var numAplPas = 1;    // Constante se configura manualmente según lo definido en Parametrías de Plataforma Unica.

    urlServicePresenta = "/v1/recaudacion/tributaria/orquestacionpresentacion/t/consulta/procesarPresentarPagar";
    urlServicePresentaMayorZero = "/v1/recaudacion/tributaria/orquestacionpresentacion/t/consulta/validarPresentacion";
    urlServiceBancos = "/v1/recaudacion/tributaria/parametriapasarela/t/consulta/obtenerParametriaPasarela/";
    urlServicePagos = "/v1/recaudacion/tributaria/orquestacionproxypago/e/registro/realizarPago";
    urlValidarArchivo = '/v1/recaudacion/tributaria/receptorpdt/t/validararchivo';
    urlServicePresentacionObtenerResultadoPagoRedis = "/v1/recaudacion/tributaria/orquestacionpresentacion/t/consulta/obtenerresultadopagoredis/";
    urlServiceVerificarBandeja = "/v1/recaudacion/tributaria/orquestacionpresentacion/t/consulta/verificarBandeja";
    urlObtenerNumerodeOperacion = "/v1/recaudacion/tributaria/orquestacionproxypago/e/registro/numeroOperacion/";

    return {
        commonLogic: comunLibreria,
        enviarPresentaDeclaracion: function (jsonSend) {
            var dataResult = null;
            var jsonFechaHora = JSON.parse(sessionStorage.getItem('fecha_hora'));
            var Fecha = jsonFechaHora["fecha"];
            var Hora = jsonFechaHora["hora"];
            jsonSend = JSON.parse(jsonSend);
            var strBandeja = jsonSend["declaraciones"].replace(/\r\n/g, "\\r\\n").replace(",{}", "");
            jsonSend["declaraciones"] = ProcesarJson(strBandeja, Fecha, Hora);
            jsonSend = JSON.stringify(jsonSend);
            console.log("JSON a ser enviado: " + jsonSend);
            this.commonLogic.callPostJsonServiceWithControl(urlServicePresenta, "", function (data) {
                dataResult = data;
                console.log(dataResult + 'controller');
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                //TODO: 23May2017, pruebas de mensajes de error desde el backend
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                } else {
                    var msg = xhr.responseText;
                    if (comunLibreria.verificarFormatoJSON(msg)) {
                        var jsonData = JSON.parse(msg);
                        $("span.titleMensajeSinServicio").text(jsonData.msg);
                    } else {
                        $("span.titleMensajeSinServicio").text(comunMensajes.getMensaje("ERR002"));
                    }
                    $('#modalErrorSinServicio').modal('show');
                }

            }, jsonSend);

            return dataResult;
        },
        enviarValidarArchivo: function (jsonSend) {
            var dataResult = null;
            console.log("JSON a ser enviado: " + jsonSend);

            this.commonLogic.callPostJsonServiceWithControl(urlValidarArchivo, "", function (data) {
                dataResult = data;
                console.log(dataResult + 'controller');
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                dataResult = JSON.parse(xhr.responseText);

                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                // else if (xhr.status == 422) {
                //     console.log(xhr.status);
                // }
                /*else {     solo para prueba de pdt
                 $('#modalErrorSinServicio').modal('show');
                 }*/

            }, jsonSend);

            return dataResult;
        },
        enviarPresentaDeclaracionMayorZero: function (jsonSend) {

            var dataResult = null;
            var jsonFechaHora = JSON.parse(sessionStorage.getItem('fecha_hora'));
            var Fecha = jsonFechaHora["fecha"];
            var Hora = jsonFechaHora["hora"];
            jsonSend = JSON.parse(jsonSend);
            var strBandeja = jsonSend["declaraciones"].replace(/\r\n/g, "\\r\\n").replace(",{}", "");
            jsonSend["declaraciones"] = ProcesarJson(strBandeja, Fecha, Hora);
            jsonSend = JSON.stringify(jsonSend);
            console.log(jsonSend);
            this.commonLogic.callPostJsonServiceWithControl(urlServicePresentaMayorZero, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            }, jsonSend);
            return dataResult;
        },
        enviarPresentaDeclaracionVisa: function (parameters) {
            var dataResult = null;
            /*console.log(parameters);
             this.commonLogic.callGetJsonServiceWithControl(urlServletPresentaVisa, parameters, function (data) {
             dataResult = data;
             }, function (xhr, ajaxOptions, thrownError) {
             console.log("status http: " + xhr.status);
             console.log("status: " + xhr.responseText);
             
             if(xhr.status == 200){
             console.log("Se ejecuto con exito el Servlet");
             dataResult = xhr.responseText;
             }
             else if(xhr.status == 401 && ( xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1 )) {
             
             $('#modalPresentePague').modal('hide');
             $('#modalErrorIdCache').modal('show');
             }
             else if(xhr.status == 404){
             
             $('#modalPresentePague').modal('hide');
             $('#modalCeroRegistros').modal('show');
             
             }
             else{
             $('#modalPresentePague').modal('hide');
             $('#modalErrorSinServicio').modal('show');
             }
             });*/
            return dataResult;
        },
        obtenerListaBancos: function (jsonSend) {
            var dataResult = null;

            this.commonLogic.callPostJsonServiceWithControl(urlServiceBancos, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            }, jsonSend);

            console.log("Obtener datos obtenerListaBancos " + dataResult);

            return dataResult;
        },
        enviarPagoDeclaracion: function (jsonSend) {
            var dataResult = null;
            this.commonLogic.callPostJsonServiceWithControl(urlServicePagos, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                $("#myModal25").modal('hide');
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
                if (comunLibreria.verificarFormatoJSON(xhr.responseText)) {
                    dataResult = JSON.parse(xhr.responseText);
                }
            }, jsonSend);

            return dataResult;
        },
        obtenerResultadoPagoRedis: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonService(urlServicePresentacionObtenerResultadoPagoRedis, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                $("#myModal25").modal('hide');
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
                dataResult = JSON.parse(xhr.responseText);
            });

            return dataResult;
        },
        verificarBandeja: function (jsonSend) {
            var dataResult = null;
            this.commonLogic.callPostJsonServiceWithControl(urlServiceVerificarBandeja, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                $("#myModal25").modal('hide');
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
                dataResult = JSON.parse(xhr.responseText);
            }, jsonSend);

            return dataResult;
        },
        obtenerNumeroOperacion: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonService(urlObtenerNumerodeOperacion, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                $("#myModal25").modal('hide');
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
                dataResult = JSON.parse(xhr.responseText);
            });
            return dataResult;
        }
    };
})();

var comunServiciosSesion = (function () {
    var urlServiceGestorSesion;
    var urlServiceGestorSesionTimbre;
    urlServiceGestorSesion = "/gestor-sesiones/api/v1/token";
    urlServiceGestorSesionTimbre = "/v1/gestor-sesiones/recurso";

    return {
        commonLogic: comunLibreria,
        obtenerIdCache: function (jsonSend) {
            var dataResult = null;
            this.commonLogic.getIdCache(urlServiceGestorSesion, function (data) {
                dataResult = data;
                console.log("data codigo: " + data.codigo);
                console.log("data mensaje: " + data.mensaje);

            }, function (xhr, ajaxOptions, thrownError) {

                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            }, jsonSend);
            return dataResult;

        },
        obtenerTimbre: function (idCache) {

            var dataResult = null;
            this.commonLogic.getTimbre(urlServiceGestorSesionTimbre, function (data) {
                dataResult = data;
                console.log("data codigo: " + data.codigo);
                console.log("data mensaje: " + data.mensaje);

            }, function (xhr, ajaxOptions, thrownError) {

                console.log("status http: " + xhr.status);
                console.log("status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }
            }, idCache);
            return dataResult;
        }
    };
})();

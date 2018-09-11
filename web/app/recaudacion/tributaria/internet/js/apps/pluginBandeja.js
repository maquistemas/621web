String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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
                    detallePagosPrevios.mtoPag = parseInt(datapg[j].crtImptri) + parseInt(datapg[j].crtImpint);
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
    //console.log("ProcesarJson(v2)::");
    //console.log(jsonBandeja);

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
                    //console.log(obj[key]);
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
                    if (banco != null) {
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
                case "detallesCoeficienteIGVList":
                    console.log(":::::::::::::::::: detallesCoeficienteIGVList");
                    console.log(obj[key]);
                    $.each(obj[key], function (k, v) {
                        console.log(k);
                        console.log(v);
                        console.log(".\n");
                        formularioBean.addDetallesCoeficienteIGV(v);
                    });
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
                                    || (arrayCasillas[idx].codigoCasilla == 307 && (arrTributos[j].codigoTributo == "030301" ||
                                            arrTributos[j].codigoTributo == "033101" || arrTributos[j].codigoTributo == "031101" ||
                                            arrTributos[j].codigoTributo == "034101" || arrTributos[j].codigoTributo == "031201"))
                                    || (arrayCasillas[idx].codigoCasilla == 345 && arrTributos[j].codigoTributo == "010106")
                                    || arrayCasillas[idx].codigoCasilla == 100) {

                                var casillasFormularioBoleta = new CasillasFormulario();
                                //casillasFormularioBoleta.desValcas = encodeURIComponent(arrayCasillas[idx].valorCasilla);
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
                        //casillasSugeridasFinales.desCassug = "" + arrCasillasSugeridas[j].valorOriginal + "";
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
                    if (obj[key] != null) {
                        $.each(obj[key], function (k, v) {
                            var obj = {};
                            for (var x in v) {
                                if (x == 'arcImp') {
                                    var cadena = '';
                                    v[x].forEach(function (v1, k1) {
                                        for (var x1 in v1) {
                                            cadena = cadena + v1[x1] + "|";
                                        }
                                    });
                                    obj[x] = cadena;
                                } else {
                                    obj[x] = v[x];
                                }
                            }
                            formularioBean.addRetePercIGV(obj);
                        });
                    }
                    break;
                default: // son valores simples:
                    break;
            }
        }
        jsonFormularios[i] = formularioBean;
    }
    console.log("=======COMUN SERVICIOS jsonFormularios=======");
    console.log(jsonFormularios);
    console.log("\n\n");
    jsonBandeja["formulario"] = jsonFormularios;
    return JSON.stringify(jsonBandeja);
};

///////////////////////////////////////////////////////////////////////////////
//comunLibreria,
//comunIntegrador
//comunServicios,
//comunPresentar,
//comunPasarela,
//comunBandeja
//comunMensajes

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

    return {
        getUrlIniciarSesion: function () {
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
                    fileName = fileName + ".pdf";

                    if (window.navigator.msSaveOrOpenBlob) { // para internet explorer
                        window.navigator.msSaveOrOpenBlob(blobResult, fileName);

                    } else {
                        var url = URL.createObjectURL(blobResult);
                        var a = document.createElement('a');
                        a.href = url;
                        a.download = fileName;
                        a.target = '_blank';
                        document.body.appendChild(a);
                        a.click();
                        window.setTimeout(function () {
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
        setBeginToken: function () {
            var token = sessionStorage.getItem('token');
            //console.log("setBeginToken: " + token);
            if (token != null) {
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
                    } else {
                        //console.log("setBeginToken: Error al acceder al gestor de sesiones!" );
                    }
                }
            } else {
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
            var cas = $(item);
//            var cas = $('*[data-' + formulario0621.obtenerNivelDeclaracion() + 'casilla="' + $(item).data(formulario0621.obtenerNivelDeclaracion() + 'casilla') + '"]');
            var val = $(cas).val();
            var tipo = "c";//c = casilla, r=radio
            var atributo = "value";

            if ($(cas).attr("type") == "radio") {
                tipo = "r";
                val = $(cas).is(":checked");
//                //console.log("\n....." + $(cas).attr("codtri") + " ---- " + val + "\n");
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

//        var shaCasillas = sha1.hash(casillasHash);
//        //console.log("casillasHash:" + casillasHash);
//        //console.log("shaCasillas:" + shaCasillas);

        var nameTag = "###casillas###";
        nameTag = nameTag.replace(new RegExp("###", 'g'), "\\\"");
        var casillasJson = JSON.stringify(casillasArray);
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
        //console.log("===mostrar_panel-error 3.2 ====");

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
//        //console.log("===mostrar_panel-error 3.4 ====");

        return messagesArray;
    };
    _validarFormulario621Simplificado = function () {
        var multi = $('.data-sunat');
        var messagesArray = [];
        $.each(multi, function (index, item) {
            var controlUI = $('*[data-s-casilla="' + $(item).data('-casilla') + '"]');
            if (controlUI.prop("required") && controlUI.attr("codhtmcnttip") == "01") {
                var valueUI = controlUI.val();
                if (valueUI == "")
                    messagesArray.push($.trim($(item).data('-casilla'))); //401
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
        console.log("******expresionCalculo result**** " + result);
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

            if (controlUI != null) {
                controlUI.attr('numRubCas', item.numRubCas);
                controlUI.attr('numSecCas', item.numSecCas);
                controlUI.attr('numColCas', item.numColCas);
                controlUI.attr('numLinCas', item.numLinCas);


                if (item.codHtmCntTip == "01") { //input, select, span, hidden, datepicker
                    controlUI.attr('codHtmCntTip', item.codHtmCntTip);
                    if (item.codHtmCntVal != undefined) {
                        if (item.codHtmCntVal != "") {
                            controlUI.val(item.codHtmCntVal);
                            controlUI.attr("data-originalvalor", item.codHtmCntVal);
                        }
                    }
                    controlUI.prop('maxlength', item.valLonMax);
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
                            if ($(this).val() != null && $(this).val() != "") {
                                var res = Number($(this).val()).toFixed(0);
                                $(this).val(res);
                            }

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
                                    var res = Number($(this).val()).toFixed(item.cntDec);
                                    $(this).val(res);
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
                    if (casilla_editable == null) {
                        casilla_editable = item.indEdi == "1";
                    }

                    if (casilla_editable == false) {
                        controlUI.attr('readonly', true);
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
        $.each(dataJson.casillas, function (index, item) {
            if (item.numCas == 102) {
//                //console.log(".......::::: item: " + JSON.stringify(item));
            }
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
                    console.log("======KEY UP ========>");
                    if (item.numCas != 189 && item.numCas != 307 && item.numCas != 345) {
                        comunIntegrador.setValue(formulario0621.obtenerCasilla("189"), formulario0621.obtenerValorCasilla("188"));
                        comunIntegrador.setValue(formulario0621.obtenerCasilla("307"), formulario0621.obtenerValorCasilla("324"));
                        comunIntegrador.setValue(formulario0621.obtenerCasilla("345"), formulario0621.obtenerValorCasilla("344"));
                    }
                    $("#muestraTotalaPagar").find("strong").text("s/. " + comunIntegrador.obtenerValorCalculoExpresion621("C189+C307+C345"));
                });
                if (formulario0621.verificarCasillaTasaVariable(item.numCas) != null) {
                    controlUI.focusout(function () {
                        formulario0621.calcularTasaVariable(item.numCas, item.expresionCalculo.substr(item.expresionCalculo.indexOf("C") + 1, 3), item.expresionCalculo);
                    });
                }
            }
        });
//        //console.log("-.--------------" + JSON.stringify(jsonDependencias));
        comunBandeja.addKeyDataStorage(nombreJsonDependencia, JSON.stringify(jsonDependencias));
    };
    return {
        setValue: function (txt, valor) {
            txt.val(valor).change();
        },
        cargarInformacionAutoGuadado: function () {
            return _cargarInformacionAutoGuadado();
        },
        parsearDecoracionCasillas621: function (dataJson, detParamentros) {
            detalleParamentros = detParamentros;
            _parsearDecoracionCasillas(dataJson, "");
            _validacionDefinicionCasilla(dataJson, "");

            _parsearDecoracionCasillas(dataJson, "s-");
            _validacionDefinicionCasilla(dataJson, "s-");

            _setearActivacionCambioCasillas("false");
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
                console.log("******obtenerValorCalculoExpresion621 1****");
                console.log("******expresionCalculo****");

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
             * 1: calcular total
             * 2: no calcula total
             * 3: calcula_tasa_variable
             * */
            if (validar == null) {
                validar = 3;
            }

            var seleccionIgv = $('input[name="casilla887"]');
            if (formulario0621.obtenerNivelDeclaracion() == "s-") {
                seleccionIgv = $('input[name="casilla-s-887"]');
            }
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
            }
        },
        validacionTipoCampo: function (txt, codTipCam, valor) {
            if (valor != null && valor != "") {
                switch (parseInt(codTipCam)) {
                    case 6:
                    case 9:
                        if (valor < 0) {
                            valor = 0;
                        }
                        break;
                    case 7:
                    case 10:
                        if (valor > 0) {
                            valor = 0;
                        }
                        break;
                    case 8:
                        valor = parseInt(valor);
                        break;
                    case 11:
                        valor = parseFloat(valor);
                        break;
                }
            }
//            txt.val(valor).change();
            comunIntegrador.setValue(txt, valor);

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
//                //console.log(validacion + ".......... "
//                        + defCas.numCas + " ... "
//                        + formulario0621.verificarCasillaTasaVariable(defCas.numCas)
//                        + " .:::: "+defCas.indCal);

                if (expre != null && txt != null && entra &&
                        (validacion == 2
                                || formulario0621.verificarCasillaTasaVariable(defCas.numCas) == null
                                )) {
//                            //console.log(".... entraaaa");
                    var montoCalc = 0;
                    var montoActual = $(txt).val();

                    if (defCas.indCal != 0 && defCas.numExpCal != null && defCas.numExpCal != 0) {
//                        //console.log("...... 1");
                        if (comunIntegrador.igvSeleccionado(expre)) {
//                            //console.log("...... 1.1: "+expre+" ---- "+comunIntegrador.obtenerValorCalculoExpresion621(expre));
                            montoCalc = comunIntegrador.obtenerValorCalculoExpresion621(expre);
//                            //console.log('::::: '+montoCalc+" ---- casilla: "+defCas.numCas);
//                            txt.val(montoCalc).change();
                            comunIntegrador.setValue(txt, montoCalc);
                        } else {
//                            //console.log("...... 1.2");
                            txt.val("0");
                        }
                    } else if ((defCas.indCon == 1 && defCas.indCal == 1) ||
                            (defCas.indCon == 0 && defCas.indCal == 1)) {
//                        //console.log("...... 2");
                        var valExpresion = comunIntegrador.obtenerValorCalculoExpresion621(defCas.condicionCalculos.expCalInfijo);

                        var valActualCasilla = txt.val();

                        if (comunIntegrador.cumpleListaCondicion(valActualCasilla, valExpresion,
                                defCas.condicionCalculos.codCon)) {
//                                    //console.log("...... 2.1");
                            switch (parseInt(defCas.condicionCalculos.indAccSi)) {
                                case 1: //calcula
                                    try {
                                        if (comunIntegrador.igvSeleccionado(expre)) {
                                            montoCalc = comunIntegrador.obtenerValorCalculoExpresion621(expre);
//                                            txt.val(montoCalc).change();
                                            comunIntegrador.setValue(txt, montoCalc);
                                        } else {
                                            txt.val("0");
                                        }
                                    } catch (e) {
                                    }
                                    break;
                                case 2: // acepta el valor
                                    break;
                                case 3: //tomar valor de error asociado
                                    txt.val("");
                                    var sms = defCas.condicionCalculos.desErrorSi;
                                    if (sms != null) {
                                        formulario0621.mostrarMensajeGeneral(sms);
                                    }
                                    break;
                                case 4: // asigan 0 al valor
                                    txt.val("");
                                    break;
                            }
                        } else {
                            switch (parseInt(defCas.condicionCalculos.indAccNo)) {
                                case 1: //calcula
                                    try {
                                        if (comunIntegrador.igvSeleccionado(expre)) {
                                            montoCalc = comunIntegrador.obtenerValorCalculoExpresion621(expre);
//                                            txt.val(montoCalc).change();
                                            comunIntegrador.setValue(txt, montoCalc);
                                        } else {
                                            txt.val("0");
                                        }
                                    } catch (e) {
                                    }
                                    break;
                                case 2: // acepta el valor
                                    break;
                                case 3: //tomar valor de error asociado
                                    txt.val("");
                                    var sms = defCas.condicionCalculos.desErrorNo;
                                    if (sms != null) {
//                                        //console.log("............:::: error no");
                                        formulario0621.mostrarMensajeGeneral(sms);
                                    }
                                    break;
                                case 4: // asigan 0 al valor
                                    txt.val("");
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
                    if (validacion == true) {
                        /*para que no ejecute una funcion de las ultimas casilla, logica esta para agregar*/
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
                    }
                }
            } catch (e) {
            }
        }
    };
})();

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
    return {
        commonLogic: comunLibreria,
        validarCondicionesFraccionamiento: function (parametros) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlValidacionCondicionesFraccionamiento, parametros, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
        obtenerIngresosAnuales: function (parametros) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlObtenerIngresosAnuales, parametros, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
        obtenerContenidoHtmlTransaccionesVisa: function (params) {
            var dataResult = null;
            this.commonLogic.callGetHtmlService(
                    urlServletTransaccionesVisa, params, function (data) {
                        dataResult = data;
                    }, function (xhr, ajaxOptions, thrownError) {

                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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

                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);

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

                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);

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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
            //console.log(">>> pagosPreviosFromStorage " + pagosPreviosFromStorage);
            if (pagosPreviosFromStorage == 'null' || pagosPreviosFromStorage == '' || pagosPreviosFromStorage == '[]') {
                this.commonLogic.callGetJsonServiceWithControlAsync(urlServicePagosPrevios, params, false, function (data) {
                    //console.log("obtenerPagosPrevios::success!");
                    dataResult = data;

                    if (data != null) {
                        //Almacenando data en localstorage para que luego sea enviado como parte de la declaracion
                        comunBandeja.addKeyDataStorage("SUNAT.AreaTemporal1.PagosPrevios", JSON.stringify(data));
                        //console.log(JSON.stringify(data));
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
                    //console.log("status http: " + xhr.status);
                    //console.log("status: " + xhr.responseText);
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1))
                {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1))
                {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1))
                {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1))
                {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
                    $('#modalErrorSinServicio').modal('show');
                }
            });
            return dataResult;
        },
        enviarAutoGuardado: function (jsonSend) {
            var dataResult = null;
            this.commonLogic.callPostJsonServiceWithControlAsync(urlServiceSaveAutoGuardado, "", function (data) {
                //console.log("enviarAutoGuardado::data " + data);
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
            }, jsonSend);
            return dataResult;
        },
        obtenerCalculoInteres: function (parameters) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServiceObtenerCalculoInteres, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
            }, jsonSend);
            return dataResult;
        },
        registrarLogMessage: function (jsonSend) {
            var dataResult = null;
            ;
            this.commonLogic.callPostJsonServiceWithControlAsync(urlServiceRegistrarLogMessage, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    //console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    //console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    //console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
                }
            });
            return dataResult;
        },
        obtenerPagosPrevios621: function (params) {

            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlServicePagosPrevios621, params, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {

                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
            //console.log("-<<<::::: " + parameters);
            this.commonLogic.callGetJsonServiceWithControl(urlServiceRetencionesMes, parameters, function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    //console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    //console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    //console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
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
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    //console.log("Error de cache!");
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
                }
            });
            return dataResult;
        },
        ObtenerDatosPeriodo: function (params) {
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlObtenerDatosPeriodo, params, function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                else {
                    //console.log("Sin Servicio!");
                }
            });
            return dataResult;
        },
        obtenerDetalleParametros: function () {
//            urlObtenerDetalleParametros
            //console.log(":::::::::: llamando a la url: " + urlObtenerDetalleParametros);
            var dataResult = null;
            this.commonLogic.callGetJsonServiceWithControl(urlObtenerDetalleParametros, "", function (data) {
                dataResult = data;

            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("Code http: " + xhr.status);
                //console.log("Message status: " + xhr.responseText);
                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                } else {
                    //console.log("Sin Servicio!");
                }
            });
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
            //console.log("JSON a ser enviado: " + jsonSend);
            this.commonLogic.callPostJsonServiceWithControl(urlServicePresenta, "", function (data) {
                dataResult = data;
                //console.log(dataResult + 'controller');
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
            //console.log("JSON a ser enviado: " + jsonSend);

            this.commonLogic.callPostJsonServiceWithControl(urlValidarArchivo, "", function (data) {
                dataResult = data;
                //console.log(dataResult + 'controller');
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
                dataResult = JSON.parse(xhr.responseText);

                if (xhr.status == 401 && (xhr.responseText.indexOf("Gestor de Sesiones") != -1 || xhr.responseText.indexOf("Ha ocurrido un error en la validación del IdCache") != -1)) {
                    $('#modalErrorIdCache').modal('show');
                }
                // else if (xhr.status == 404) {
                //     $('#modalCeroRegistros').modal('show');
                // }
                // else if (xhr.status == 422) {
                //     //console.log(xhr.status);
                // }
                else {
                    $('#modalErrorSinServicio').modal('show');
                }

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
            //console.log(jsonSend);
            this.commonLogic.callPostJsonServiceWithControl(urlServicePresentaMayorZero, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
            /*//console.log(parameters);
             this.commonLogic.callGetJsonServiceWithControl(urlServletPresentaVisa, parameters, function (data) {
             dataResult = data;
             }, function (xhr, ajaxOptions, thrownError) {
             //console.log("status http: " + xhr.status);
             //console.log("status: " + xhr.responseText);
             
             if(xhr.status == 200){
             //console.log("Se ejecuto con exito el Servlet");
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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

            //console.log("Obtener datos obtenerListaBancos " + dataResult);

            return dataResult;
        },
        enviarPagoDeclaracion: function (jsonSend) {
            var dataResult = null;
            this.commonLogic.callPostJsonServiceWithControl(urlServicePagos, "", function (data) {
                dataResult = data;
            }, function (xhr, ajaxOptions, thrownError) {
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("data codigo: " + data.codigo);
                //console.log("data mensaje: " + data.mensaje);

            }, function (xhr, ajaxOptions, thrownError) {

                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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
                //console.log("data codigo: " + data.codigo);
                //console.log("data mensaje: " + data.mensaje);

            }, function (xhr, ajaxOptions, thrownError) {

                //console.log("status http: " + xhr.status);
                //console.log("status: " + xhr.responseText);
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

var comunPresentar = (function () {

    var dataJsonResult;
    dataJsonResult = "";

    _obtenerTributosParaBancos = function () {
        var jsonSend = '{ "numPas" : 1, "numAplPas" : "001", "formularios" : [';
        var keyDeclaracion = "";
        var formTotal = localStorage.getItem("SUNAT.FormularioTotal");

        if (parseInt(formTotal) != 0) {
            var guuid = localStorage.getItem("SUNAT.FormularioGuuid");
            for (var idxLS = 0, lenLS = localStorage.length; idxLS < lenLS; idxLS++) {
                var key = localStorage.key(idxLS);
                ////console.log("_obtenerTributosParaBancos:key: " + key);
                if (comunLibreria.contieneCadena(key, guuid) && (!comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    var dataJson = $.parseJSON("" + localStorage.getItem(key));
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
        //console.log("_obtenerTributosParaBancos::"+jsonSend);
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
            if (totalFormularios == undefined) {
                console.log("Total Items(bandeja-pre):" + totalFormularios);
                totalFormularios = formTotal;
            }
            console.log("Total Items(bandeja):" + totalFormularios);
            var datafinal = "";
            var guuid = localStorage.getItem("SUNAT.FormularioGuuid");
            jsonSend = jsonSend + '{ "identificadorPresentacion": "' + guuid + '", "versionBrowser":"' + comunLibreria.getVersionBrowser() + '", "versionSO":"' + comunLibreria.getVersionSO() + '", "direccionIP":"' + comunLibreria.getAddressIP() + '", "cantidadFormularios": "' + totalFormularios + '", "montoTotalPagar": ' + comunBandeja.obtenerTotalaPagar() + ', "fechaEnvio" :  "' + moment().format("DD/MM/YYYY HH:mm:ss") + '", "ruc":"' + numeroRUC + '", "razonSocial":"' + razonSocial + '", "declaraciones": "{';
            var i = 0;

            var keyGuuidArray = new Array();
            var localStorageArray = localStorage;
            console.log("Total localStorageArray:" + localStorageArray.length);
            for (var idxLS = 0, lenLS = localStorageArray.length; idxLS < lenLS; idxLS++) {
                var key = localStorageArray.key(idxLS);
                console.log("_empezarPago:key: " + key + " idxLS:" + idxLS);
                if (comunLibreria.contieneCadena(key, guuid) && (!comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                    console.log("Encontro JSON en LOCAL");

                    console.log("Verificando integrida de elementos.");
                    if (!comunLibreria.encontrarElementoArray(keyGuuidArray, key)) {
                        console.log("No se encontro key:" + key + " adicionando a vector.");
                        keyGuuidArray.push(key);

                        datafinal = "";
                        var data = localStorageArray.getItem(key);
                        if (i == 0) {
                            datafinal = ' "formulario" :[' + data;
                        } else {
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
            comunBandeja.addKeyDataStorage("SUNAT.CopiaDeclaracion.FormularioTotal", formTotal);
            comunBandeja.addKeyDataStorage("SUNAT.CopiaDeclaracion.FormularioGuuid", guuid);
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
            //console.log("empezarPago");
            var jsonSend = _empezarPago();
            dataJsonResult = comunServiciosBandeja.enviarPresentaDeclaracion(jsonSend);
            //console.log("jsonprueba2016"+dataJsonResult);
        },
        empezarPagoMayorZero: function () {
            //console.log("empezarPagoMayorZero");
            var jsonSend = _empezarPago();
            dataJsonResult = comunServiciosBandeja.enviarPresentaDeclaracionMayorZero(jsonSend);
        },
        empezarPagoVisa: function () {
            //console.log("empezarPagoVisa");
            var parameters = _empezarPagoVisa();
            var htmlPagosVisa = comunServiciosBandeja.enviarPresentaDeclaracionVisa(parameters);

            //console.log("htmlPagosVisa " + htmlPagosVisa);
            $('#frame').contents().find('#respuestaServlet').html(htmlPagosVisa);

            //console.log("=================> Otro Input DOM : "+ window.frames['frame'].document.getElementById('nombrePillin').value);
            //console.log("=================> Otro Input jquery : " + $("#frame").contents().find('#nombrePillin').val());
            //console.log("================> Boton Div DOM : " + window.frames['frame'].document.getElementById('btnAceptarPagar2').value);
            //console.log("=================> Boton Div jquery : "+ $("#frame").contents().find('#btnAceptarPagar2').text());
            //console.log("=========================================");
            //console.log("=================> idConstancia Div DOM : " + window.frames['frame'].document.getElementById('idConstancia').value);
            //console.log("=================> idConstancia Div jquery : "+ $("#frame").contents().find('#idConstancia').val());

            var jsonPagosVisaServlet = $("#frame").contents().find('#idConstancia').val();
            var jsonPagosVisa = JSON.stringify(eval('(' + jsonPagosVisaServlet + ')'));
            var obj = JSON.parse(jsonPagosVisa);

            //console.log("=============================");
            //console.log("JSON.stringify: " + jsonPagosVisa);
            //console.log("obj: " + obj);
            //console.log("=============================");

            //console.log("obj['msg']: " + obj['msg']);
            //console.log("=============================");

            var msjRpta = obj['msg'];
            var objMsjRpta = JSON.parse(msjRpta);
            //console.log("msjRpta :" + msjRpta);

            //console.log("resultado : " + objMsjRpta['resultadoPago']);
            //console.log("codigo Banco : " + objMsjRpta['resultadoPago']['codigoBanco']);
            //console.log("Descripcion Banco : " + objMsjRpta['resultadoPago']['descripcionBanco']);

            $('#frame').contents().find('#formVisa').hide();

            $('#rptaServletVisa').html("Descripcion Banco : " + objMsjRpta['resultadoPago']['descripcionBanco']);

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

        if (data.resultado != undefined) {

            if (data.resultado.msjCabecera != undefined) {
                $("span.titleCabeceraFormulario").text(data.resultado.msjCabecera);
                $("span.titlePieFormulario").text(data.resultado.msjPie);
            }

            $("body").data("ListBancos", data);
            //console.log(data);
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
                        //console.log("datos cod_ent_fin: " + item2.codEntFin);
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
                    if (deshabilitarMedioPago) {
                        var contenidoMediosPagos = $('#codMedPag' + item.codMedPag);
                        var inputRadioMedioPagos = contenidoMediosPagos.find("[name='banco']");
                        var rowContieneBancos = contenidoMediosPagos.find("div[class='row']");
                        var imgMedioPagos = contenidoMediosPagos.find("img");
                        //console.log(imgMedioPagos);
                        $.each(inputRadioMedioPagos, function (index4, item4) {
                            item4.disabled = true;
                        });

                        $.each(imgMedioPagos, function (index5, item5) {
                            item5.setAttribute("disabled", "disabled");
                        });

                        rowContieneBancos[0].style.background = "#dddddd";
                        rowContieneBancos[0].style.border = "1px solid #ddd";
                        rowContieneBancos[0].style.borderRadius = "5px";
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
        //console.log("pago:" + QAHabilitado);
        //if (QAHabilitado=="1") {
        jsonQA = '"tramaQA":{ "numeroPago" : "' + $.trim(QAnumeropago) + '", "codEntFinan" : "' + $.trim(QAentfinanciera) + '", "tipoOpera" : "' + $.trim(QAtipooperacion) + '", "numOperaBanco" : "' + $.trim(QAnumerooperacionbanco) + '", "fecPago" : "' + $.trim(QAfechapago) + '", "horaPago" : "' + $.trim(QAhorapago) + '", "numRuc" : "' + $.trim(QAnumeroruc) + '", "impPago" : "' + comunLibreria.padLeft($.trim(QAimportepagar), 12, '0') + '", "codRespBanco" : "' + $.trim(QArespuestabanco) + '", "tipoServicio" : "' + $.trim(QAtiposervicio) + '"}';
        //}
        //console.log("pago:" + jsonQA);
        var jsonSend = '{ "numTransApliCli": "' + numeroOperacionSunat + '", "numPas" : "' + "1" + '", "numMedPagPas" : "1", "codTipmon" : "01", "codMedpag" : "' + medioPago + '", "codEntFin": "' + banco + '", "tipoOperacion": "1", "codTipSer" : "01", "mtoOpe": "' + comunBandeja.obtenerTotalaPagar() + '", "habilitaQA" : "' + QAHabilitado + '", "codMedPre" : "01", "codAplCli" : "01" , "tipoTrama":"' + $.trim(tipoTrama) + '" ' + "," + jsonQA + ' }';
        //console.log('jsonSend==> ' + jsonSend);
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
        //console.log("_limpiarLocalStorage");
        var guuid = localStorage.getItem("SUNAT.FormularioGuuid");
        var localStorageArray = localStorage;
        for (var idxLS = 0, lenLS = localStorageArray.length; idxLS < lenLS; idxLS++) {
            var key = localStorageArray.key(idxLS);
            if (comunLibreria.contieneCadena(key, guuid) && (!comunLibreria.contieneCadena(key, "SUNAT.CopiaDeclaracion."))) {
                //console.log("_limpiarLocalStorage: eliminando!-->"+key);
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

            //console.log("_agregarBandeja");
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
            //console.log("Se detecto tributos: " + length + ", monto de declaracion en cero.");
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

            console.log("plugin-sumando items");
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

        //console.log("Datos devueltos del Servlet: " + dataJson);

        if (dataJson == null) {
            iframeMenu.postMessage("PAGOS-REINTENTAR-OPERACION", "*"); //Enviando mensaje a pagos.js
        } else {
            if (dataJson.resultado != undefined) {
                if (dataJson.resultado != null) {
                    //console.log("Codigo Retorno: " + dataJson.cod + " indicadorMonto:" + indicadorMonto);
                    if (dataJson.cod == "1") //operacion con exito
                    {
                        if (indicadorMonto == "MONTO-MAYOR-ZERO") {
                            pasarelaLogic.setearNumeroOperacionSunat(dataJson.resultado.numeroOperacionSunat);
                            pasarelaLogic.enviarDatosPago();
                            var dataJsonPago = pasarelaLogic.obtenerResultado();

                            if (dataJsonPago == null) {
                                iframeMenu.postMessage("PAGOS-REINTENTAR-OPERACION", "*"); //Enviando mensaje a pagos.js
                            } else if (dataJsonPago.cod != undefined && dataJsonPago.cod != null) {
                                //console.log("Analizando codigo de respuesta de pago");
                                if (dataJsonPago.cod == "1") {
                                    //console.log("dataJsonPago.cod:" + dataJsonPago.msg);
                                    _addDataStorage("SUNAT.AreaTemporal1.Constancia1", JSON.stringify(dataJsonPago));

                                    // _addDataStorage("SUNAT.AreaTemporal1.Constancia1", JSON.stringify(dataJson));
                                    // //console.log("constancia:" + dataJsonPago.resultado.constancia);
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
                                    //console.log("Mostrar mensaje de error, volver a intentar el pago");
                                    iframeMenu.postMessage("PAGOS-REINTENTAR-OPERACION-" + dataJsonPago.msg, "*"); //Enviando mensaje a pagos.js
                                }
                            }
                        } else if (indicadorMonto == "MONTO-IGUAL-ZERO") {
                            //console.log("Mostrando constancia igual a cero");
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

                            //console.log("====================montoOperacion2==============" + montoOperacion)
                            //console.log("banco:" + banco + " medioPago:" + medioPago + " numeroCaso:" + numeroCaso + " tipoTrama:" + tipoTrama);
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
                        //console.log("Mostrar mensaje de error, volver a intentar el pago");
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
                ////console.log("inicializarLocalStorage:key: " + key);
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
            //console.log("obtenerFormularioIdOAuth1:" + enlaceUrl);
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
            //console.log("obtenerFormularioIdOAuth2:" + idOAuthForm);
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

var comunMensajes = (function () {

    function _getMensaje(codigoMensaje, paramAlternativo) {
        if (paramAlternativo == null) {
            paramAlternativo = "";
        }
        var mensaje = "";
        switch (codigoMensaje) {
            case "EXC003":
                mensaje = "Sr.  Contribuyente,  para  periodos  anteriores  a " + paramAlternativo + ", Deberá  presentar  la Declaración Jurada Simplificada 621 o el PDT 621, regrese al menú para la selección del formulario según corresponda";
                break;
            case "EXC004" :
                mensaje = "Sr. Contribuyente, el Periodo Ingresado esta fuera del rango de vigencia del formulario " + paramAlternativo;
                break;
            case "EXC005" :
                mensaje = "Sr. Contribuyente el período no debe ser mayor o igual al " + paramAlternativo + " de la fecha actual";
                break;
            case "NOE001" :
                mensaje = "Sr.contribuyente si modifica el período tributario ingresado, se perderá toda la información registrada hasta el momento y se volverán a realizar las validaciones considerando el nuevo período tributario.Confirma que desea modificar el período tributario?";
                break;
            case "NOE008":
                mensaje = "Sr. contribuyente, debe ingresar el período tributario de la declaración.";
                break;
            case "NOE009":
                mensaje = "Sr. Contribuyente, usted debe elegir un régimen de renta a declarar para continuar elaborando la declaración";
                break;
            case "INF008":
                mensaje = "Sr. Contribuyente, seleccione el tributo o tributos a sustituir/rectificar.";
                break;
            case "INF007":
                mensaje = "Sr. Contribuyente, seleccione los tributos a declarar.";
                break;
            case "INF001":
                mensaje = "Sr. Contribuyente a fin de validar su información es necesario que tenga una conexión a internet; si no la tiene la información que se mostrará y que usted ingrese será validada al momento de enviar la declaración a la Bandeja de Pagos.";
                break;
            case "INFNPS":
                mensaje = "Sr. Contribuyente, ¿Confirma que desea presentar/pagar los formularios?";
                break;
            case "INFNPSCERO":
                mensaje = "Sr. Contribuyente, la bandeja solamente contiene formularios con monto a pagar igual a cero. Por favor presione aceptar para continuar con el proceso de presentación de formularios.";
                break;
            case "NOE002":
                mensaje = "Sr. Contribuyente, de acuerdo a lo verificado, usted no se encuentra afecto a algún régimen de renta. A continuación se le mostrará la declaración simplificada y en ésta declaración sólo se permite declarar el Régimen General, el Régimen Especial de Renta o el  Régimen MYPE Tributario; sin embargo, también se le puede mostrar la DJ IGV Renta Completa si fuera a declarar otros régimenes. Seleccione usted la DJ que desea presentar.";
                break;
            case "INF005":
                mensaje = "Sr.Contribuyente, al no haber presentado por el período a declarar sus Libros Electrónicos y al haber presentado su Declaración original completa (no es simplificada), deberá utilizar el Formulario 621 del Aplicativo PC.";
                break;
            case "NOE003":
                mensaje = "Sr. contribuyente según los datos de sus Libros Electrónicos usted debe presentar la declaración jurada simplificada, sin embargo también puede  presentar  la  declaración  jurada  completa.  Por  favor  indique que  declaración jurada que desea visualizar.";
                break;
            case "INF004":
                mensaje = "Sr. Contribuyente al no haber presentado sus Libros Electrónicos por el período a declarar, se le mostrará la declaración simplificada. Si la declaración que se muestra no tuviera las casillas que requiere deberá utilizar el Formulario 621 del Aplicativo PC.";
                break;
            case "INF003":
                mensaje = "Sr. Contribuyente, de acuerdo a lo verificado, usted no se encuentra afecto a algún régimen de renta.  A continuación se le mostrará la declaración simplificada y en ésta declaración sólo se permite declarar el Régimen General, el Régimen Especial de Renta y el Régimen MYPE Tributario (tributo 3121); por lo que puede utilizar el formulario 621 del Aplicativo PC para declarar otros regímenes de renta distintos a los señalados.";
                break
            case "INF002":
                mensaje = "Sr. Contribuyente, de acuerdo a lo verificado, usted se encuentra afecto al régimen de renta" + paramAlternativo + ". Por lo tanto, debe utilizar el Formulario 621 del Aplicativo PC para declarar dicho régimen de renta.";
                break
            case "INF006":
                mensaje = "Sr.Contribuyente, de acuerdo a su información de Libros Electrónicos usted tiene operaciones afectas al IVAP por lo que debe afectarse a dicho tributo 1016 – IVAP.De no hacerlo, no se trasladará el valor de la casilla 340.";
                break
            case "DECLAFECHMAYOR":
                mensaje = "Sr. Contribuyente para seleccionar Sustitutoria la fecha de presentación de esta declaración debe ser anterior o igual a la fecha de vencimiento.";
                break
            case "DECLAFECHMENOR":
                mensaje = "Sr. Contribuyente para seleccionar Rectificatoria la fecha de presentación de esta declaración debe ser mayor a la fecha de vencimiento.";
                break
            case "ERR001":
                mensaje = "!Error, Sr. contribuyente, ha sucedio un error inesperado, vuelva a intentar nuevamente!";
                break
            case "ERR002":
                mensaje = "!Error. Sr. contribuyente disculpe la molestia, se produjo error al acceder a los formularios";
                break
            case "ERR003":
                mensaje = "!Error. Sr. contribuyente, su sesión de acceso no es válida. Por favor vuelva a Autenticarse.";
                break
            case "INF009":
                mensaje = "Sr. Contribuyente,  sus ingresos netos acumulados del ejercicio superan el límite de las 300 UIT por lo que el cálculo del pago a cuenta se realizará conforme a lo previsto en el artículo 85° de la Ley del Impuesto a la Renta";
                break;
            case "MENSAJE_1_301":
                mensaje = "Sr. Contribuyente, sus ingresos netos acumulados del ejercicio, superan las 300 UIT, por lo que el cálculo del pago a cuenta que le corresponde abonar se realizará conforme a lo previsto en el artículo 85° de la Ley del Impuesto a la Renta.";
                break;
            case "MENSAJE_2_301":
                mensaje = "Sr. Contribuyente, sus ingresos netos acumulados del ejercicio, superan las 1700 UIT, por lo que le corresponde declarar en el Régimen General, para continuar confirme que cambiará el régimen de renta de la declaración.";
                break;
            case "MENSAJE_PRESENTACION_FORMULARIO_625_SUSPENSION_PAGO":
                mensaje = "Sr. Contribuyente, se ha verificado la presentación del formulario 625 para la suspensión del pago a cuenta del período, motivo por el cual se calcula cero (S./0.00) de impuesto como pago a cuenta del período.";
                break;
            case "MENSAJE_INGRESOS_SUPERAN_1700_UIT":
                mensaje = "Sr. Contribuyente, sus ingresos netos anuales acumulados del ejercicio  superan las 1700 UIT, por lo que le corresponde declarar en el Régimen General.";
                break;
            case "MENSAJE_AFECTACION_REGIMEN":
                mensaje = "Afectación/Régimen de Renta";
                break;
            case "MENSAJE_AFECTACION_REGIMEN_TRIBUTOS":
                mensaje = "Afectación/Régimen de Renta/Tributos a Sustituir-Rectificar";
                break;
            case "EXC001_2":
                mensaje = "Sr. Contribuyente, el importe del impuesto calculado debe ser menor al importe de los ingresos Netos.";
                break;
        }
        return mensaje;
    }
    ;
    return {
        getMensaje: function (codigoMensaje, paramAlternativo) {
            return _getMensaje(codigoMensaje, paramAlternativo);
        }
    };
})();

///////////////////////////////////////////////////////////////////////////////
var pluginBandeja = (function () {
    _casillasEditarBandeja = function (esEditable, dataJsonParse) {

        if (esEditable == "si" && (dataJsonParse != undefined && dataJsonParse != null)) {

            var casillas = $('.data-sunat');

            $('*[data-casilla="7"]').val(dataJsonParse["detalle"].periodoTributo);


            $.each(casillas, function (indexCasilla, itemCasilla) {

                var codigoCasilla = $(itemCasilla).data('casilla');

                $.each(dataJsonParse["casillas"], function (index, item) {
                    var codigoCasillaJson = item.codigoCasilla;
                    if (codigoCasilla == codigoCasillaJson && codigoCasillaJson != "7") {
                        $('*[data-casilla="' + $(itemCasilla).data('casilla') + '"]').val(item.valorCasilla);
                    }
                });
            });

            var retenciones = $('*[data-casilla="401"]').val();
            $('#inputRentenciones401').val(retenciones);
            localStorage.removeItem('form0633');
            localStorage.removeItem('SE-EDITA-0633');
        }

    };
    insertCodeCarritoMethod = function () {
        var arrhtml = [];
        arrhtml.push('');
        arrhtml.push('    <a href="#" class="colRojo" data-toggle="dropdown" aria-expanded="false"');
        arrhtml.push('       style="background-color:#AB1440 !important;color: white !important;    margin-top: 6.2px;">');
        arrhtml.push('        <span class="Icono-Carrito glyphicon glyphicon-shopping-cart">');
        arrhtml.push('            <i class="Icono-Carrito__Cantidad">0</i>');
        arrhtml.push('        </span><span id="trbpPagos">Bandeja de Presentaci&oacute;n/Pagos</span>');
        arrhtml.push('        <span class="caret"></span>');
        arrhtml.push('    </a>');
        arrhtml.push('    <ul class="dropdown-menu dropdown-menu-blanco" id="carrito-lista_">');
        arrhtml.push('        <li class="li_perfil_carrito">');
        arrhtml.push('            <div>');
        arrhtml.push('                <div class="text-center">');
        arrhtml.push('                    <h4 style="margin:0;margin-bottom: 5px;"><small>Monto total:</small> S/. <span id="montototal" style="display:inline;">0</span></h4>');
        arrhtml.push('                    <span><span class="Icono-Carrito__Cantidad2">0</span> item(s)</span>');
        arrhtml.push('                </div>');
        arrhtml.push('            </div>');
        arrhtml.push('            <hr style="margin: 15px 0px;">');
        arrhtml.push('            <div style="position:relative">');
        arrhtml.push('                <ul id="Lista-Pagos" class="list-group Lista-Pagos">');
        arrhtml.push('                </ul>');
        arrhtml.push('            </div>');
        arrhtml.push('            <br>');
        arrhtml.push('            <div class="text-center">');
        arrhtml.push('                <button type="button" class="btn btn-primary" id="tbtnPagar2b">');
        arrhtml.push('Presente/Pague/NPS');
        arrhtml.push('</button>');
        arrhtml.push('            </div>');
        arrhtml.push('        </li>');
        arrhtml.push('    </ul>');
        arrhtml.push('');
        var o1 = document.getElementById("Presente_Pague");
        if (o1 != null) {
            o1.innerHTML = arrhtml.join('');
        }
    };
    return {
        insertCodeCarrito: function () {
            insertCodeCarritoMethod();
        },
        retornaCarrito: function () {
            var resultado = document.getElementById("Presente_Pague");
            return resultado;
        },
        casillasEditarBandeja: function (esEditable, dataJsonParse) {
            _casillasEditarBandeja(esEditable, dataJsonParse);
        }
    };
})();

//
//
$(document).ready(function () {

    $("#Presente_Pague").on('mouseenter', function () {
        $(this).addClass('open');
    });
    $("#Presente_Pague").on('mouseleave', function () {
        $(this).removeClass('open');
    });

    $(document).on('click', '#tbtnPagar2b', function () {
        //console.log("enviando web message");
        var _frames = window.frames || window.document.frames;
        var _iframeMenu = _frames["frame"];
        _iframeMenu.postMessage("DESACTIVAR-PANEL-PRESENTARPAGAR", "*");

        _iframeMenu.postMessage("PAGAR-DESDE-BANDEJA", "*");

        /*var montoPagar = comunBandeja.obtenerTotalaPagar();
         
         if (montoPagar != -1) {
         if(montoPagar > 0){
         comunLibreria.cambiarTextoBontonesModalPresentarPagar("SI","NO");
         comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPS",""));
         }
         else{
         comunLibreria.cambiarTextoBontonesModalPresentarPagar("ACEPTAR","CANCELAR");
         comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPSCERO",""));
         }
         }*/
    });

    $('#btnPresentarPagar').click(function () {
        comunBandeja.evaluarTipoPago("mainMenu");
    });

});
//
// Create IE + others compatible event handler
// Registrando Listener para los WebMessages
var eventMethod = window.addEventListener ? "addEventListener" : "attachEvent";
var eventer = window[eventMethod];
var messageEvent = eventMethod == "attachEvent" ? "onmessage" : "message";
// Listen to message from child window
var contador = 0;
eventer(messageEvent, function (e) {

    if (e.data == "INICIALIZAR-BANDEJA") {
        comunBandeja.inicializarBandeja();
        comunBandeja.limpiarLocalStorage();
    } else if (e.data == "PRESENTAR-PAGAR") {
        comunBandeja.iniciarProcesoPago("MONTO-MAYOR-ZERO");
    } else if (e.data == "PRESENTAR-PAGAR-VISA") {
        //console.log("PRESENTAR_PAGAR_VISA");
        comunBandeja.iniciarProcesoPago("MONTO-VISA");
    } else if (e.data.indexOf("AGREGAR-BANDEJA-DE-CARRITO-") == 0) {
        var dataJsonOriginal = e.data.substring(27, e.data.length);
        comunBandeja.agregarBandeja(dataJsonOriginal);
//       if(contador==1 && e.data != 'MOSTRAR-CONSTANCIA-ZERO'){
//           comunBandeja.agregarBandeja(e.data);
//       }else{
//           comunBandeja.iniciarProcesoPago("MONTO-IGUAL-ZERO");
//        }
    }
}, false);

function displayMessageCarrito(evt) {
    ////console.log("PLUGIN.JS::displayMessagePlugin:" + evt.data);
    if (evt.data == "MOSTRAR-CONSTANCIA-ZERO") {
        //$('#btnPaso04').trigger('click'); //evento de carrito.js
        var framesBandeja = window.frames || window.document.frames;
        var iframeMenuBandeja = framesBandeja["frame"];
        iframeMenuBandeja.postMessage("MOSTRAR-CONSTANCIA-ZERO", "*"); //Enviando mensaje a carrito.js
    }
}
if (window.addEventListener) {
    window.addEventListener("message", displayMessageCarrito, false);
} else {
    window.attachEvent("onmessage", displayMessageCarrito);
}
//
window.addEventListener('beforeunload', function (e) {
    //console.log("Se ha detectado cierre de windows");
    localStorage.clear();
}, false);

//Boton Salir del Index
function confirmarSalida() {
    //console.log("Boton Salir");
    //document.frame.carrito.value
    //$('#myModal-exit').modal('show');
    //document.frame.carrito("myDialog").modal('show')
    //$("#myModal-exit",self.frame.document).modal();
    var frames = window.frames || window.document.frames;
    var iframeMenu = frames["frame"];
    iframeMenu.postMessage("MOSTRAR-SALIDA", "*"); //Enviando mensaje a carrito.js
}

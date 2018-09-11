var BoletaBean = function() {
//	this.nroOrden = 0;
//	this.importePago = 0;
//	this.formularioNombre = "";
//	this.formularioCodigo = "";
//	this.totalDueda = 0;
//	this.tributoNombre = "";
//	this.tributoCodigo = "";
//
//	this.json = function() {
//		return JSON.stringify(this);
//	}
    this.numOrd = 0;
    this.numRuc = "";
    this.numRucSec ="";
    this.fecPres = "";
    this.horPres = "";
    this.perTri = "";
    this.semFor = "";
    this.codIndrec = "";
    this.codOrifor = "";
    this.codOriPres ="";
    this.codTipfor = "";
    this.numValPag =0;
    this.mtoPag = 0;
    this.codTipdetrac = "";
    this.codEstado = "";
    this.codEtapa = "";
    this.numIdConstancia = 0;
    this.numIdResumen = 0;
    this.numIdReporte = 0;
    this.numNabono = "";
    this.numResrec = "";
    this.indValLib = "";
    this.numPedPro = "";
    this.numPedAnu = "";
    this.indForAut = "";
    this.codEntFin = "";
    this.numOpebco = "";
    this.numBandeja = 0;
    this.numCargaPdt = 0;
    this.codMedpag = "";
    this.nomEntFin = "";
    this.fecPago ="";
    this.codFor = "";
    this.numVerFor = "";

    this.casillasFormularioList = [];
    this.addCasillasFormulario = function (CasillasFormulario) {
        this.casillasFormularioList.push(CasillasFormulario);
    };
    this.tributosDeclaradosPagadosList = [];
    this.addTributosDeclaradosPagados = function (TributosDeclaradosPagados) {
        this.tributosDeclaradosPagadosList.push(TributosDeclaradosPagados);
    };
    this.json = function() {
        return JSON.stringify(this);
    };

};

var TributodecpagBean = function () {
    this.numOrd = 0;
    this.mtoImpres = 0; // Monto impuesto resultante
    this.mtoPagtot = 0;
    this.mtoTri = 0;
    this.mtoPagint = 0;
    this.indVig = "1";
    this.codTri = "";
    this.mtoPagtri = 0;
    this.mtoBasimp = 0;
    this.perTri = "";
    this.porTasa = 0;
    this.json = function() {
        return JSON.stringify(this);
    }
};

var RectitributoBean = function () {
    this.numOrd = 0;
    this.perTri = "";
    this.mtoImpres = 0;
    this.codForant = "";
    this.indVig = "1";
    this.numRectif = "";
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
    this.json = function() {
        return JSON.stringify(this);
    }
}

var CoefigvperBean = function () {
    this.numOrd = 0;
    this.codFor = "";
    this.perTri = "";
    this.indReccoe = 0;
    this.codEstrec = "";
    this.mtoExpdet = 0;
    this.indVig = "1";
    this.codTri = "";
    this.mtoVnogdet = 0;
    this.mtoVngdet = 0;
    this.json = function() {
        return JSON.stringify(this);
    }
};

var CargapdtBean = function () {
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
    this.json = function() {
        return JSON.stringify(this);
    }
};

var AutoguardformBean = function () {
    this.numRuc = "";
    this.codFor = "";
    this.perTri = "";
    this.arcAutoguar = "";
    this.indProc = "";
    this.valHash = "";
    this.json = function() {
        return JSON.stringify(this);
    }
};

var CasillaformBean = function () {
    this.numOrd = 0;
    this.numCas = 0;
    this.codTipcas = "";
    this.perTri = "";
    this.desValcas = "";
    this.json = function() {
        return JSON.stringify(this);
    }
};

var CasillasugfinBean = function() {
    this.numOrd = 0;
    this.numCas = 0;
    this.indValDif = "";
    this.desCasfin = "";
    this.desCassug = "";
    this.perTri = "";
    this.json = function() {
        return JSON.stringify(this);
    }
};

var DetapagoprevBean = function() {
    this.numOrd = 0;
    this.numSecPag = 0;
    this.numRucPag = "";
    this.mtoPag = 0;
    this.numOrdPre = 0;
    this.codForPre = "";
    this.perTriPag = "";
    this.codTriPag = "";
    this.codDepPag = "";
    this.indSel = "";
    this.fecPag = null;
    this.json = function() {
        return JSON.stringify(this);
    }
};

var AnexaformBean = function() {
    this.numOrd = 0;
    this.desTabanx = "";
    this.perTri = "";
    this.codNomanx = "";
    this.codExtanx = "";
    this.json = function() {
        return JSON.stringify(this);
    }
};

var CoefigvdetBean = function() {
    this.numOrd = 0;
    this.perTri = "";
    this.mtoExpdet = 0;
    this.codTri = "";
    this.mtoVnogdet = 0;
    this.mtoVngdet = 0;
    this.codPerdet = "";
    this.json = function() {
        return JSON.stringify(this);
    }
};

var FormularioBean = function T7778formulario () {
    this.identificadorFormulario = "";
    this.numOrd = 0;
    this.numRuc = "";
    this.perTri = "";
    this.codFor = "";
    this.numVerFor = "1";
    this.fecPres = "";
    this.horPres = "";
    this.mtoPag = 0;
    this.numBandeja = 0;
    this.codOrifor = "00"; // 01 = Tributos Internos, 02 = Tributos Aduaneros, 03 = Detracciones
    this.codTipfor = "000"; /* 100  DDJJ., 101  Original., 102  Rectificatoria del Contribuyente., 103  De Balance (F.124, F.125).
	 104  Rectificatoria de Oficio., 105  Suspensión de Pagos a Cuenta., 200  Boletas., 201  Arrendamiento.
	 202  BERT/PERT, 203  Documentos Valorados Pago simple., 204  Pago Multiple., 205  Fraccionamiento Especial
	 206  Compensación IEAN., 207  General., 300  Solicitudes., 301  Modificación de Datos., 302  Fraccionamiento.
	 303  Devolución., 304  Modificación de Actos SUNAT., 400    Anexos., 401 Fraccionamiento., 402 Documentos Valorados	*/
    this.indValLib = "0"; // Indicador valida libros electronicos: 0 = No, 1 = Si
    this.codTipdetrac = "0"; // Tipo de detraccion, solo en caso de deposito de detracciones: I = Individual, M = Masivo. Para otros formularios considerar el valor "0"
    this.desArchivoPdt = ""; //
    this.codEtapa = "00"; /* Etapa de formulario en los procesos de cuadre y nota de abono:
	 01 = Operacion pendiente de cuadre (pago cero)
	 02 = Operacion pendiente de cuadre (pago mayor a cero)
	 03 = Operacion incluida en cuadre definitivo
	 04 = Operacion Incluida en nota de abono  */

    this.indForAut = ""; // Indicador de formulario autogenerado: 0 = No, 1 = Si
    this.numNabono = "";
    this.codEntFin = "000";
    this.numPedAnu = "";
    this.semFor = "";
    this.numIdResumen = 0;
    this.numRucSec = "";
    this.numValPag = 0; // Numero de valor a pagar, en caso el formulario sea una boleta 1662 Pago de Valores. En otros casos considerar valor "0"
    this.numCargaPdt = "";
    this.numIdConstancia = 0;
    this.numOpebco = 0;
    this.codIndrec = "";
    this.codEstado = "90";// Estado de formulario: 00 = Presentado OK, 97 = Rechazado, 90 = Registro Inicial
    this.numResrec = "";
    this.numIdReporte = 0;
    this.numPedPro = "";
    this.codOriPres = "01"; // 01 = En esta primera fase sera solo De Parte, debido que lo registra el contribuyente
    this.tamArchPdt = 0;

    this.ArrayBoletaBean = [];
    this.addBoletaBean = function (BoletaBean) {
        this.ArrayBoletaBean.push(BoletaBean);
    }
    this.ArrayTributodecpagBean = [];
    this.addTributodecpagBean = function (TributodecpagBean) {
        this.ArrayTributodecpagBean.push(TributodecpagBean);
    }
    this.ArrayRectitributoBean = [];
    this.addRectitributoBean = function (RectitributoBean) {
        this.ArrayRectitributoBean.push(RectitributoBean);
    }
    this.ArrayCoefigvperBean = [];
    this.addCoefigvperBean = function (CoefigvperBean) {
        this.ArrayCoefigvperBean.push(BoletaBean);
    }

    this.ArrayCargapdtBean = [];
    this.addCargapdtBean = function (CargapdtBean) {
        this.ArrayCargapdtBean.push(CargapdtBean);
    }
    this.ArrayAutoguardformBean = [];
    this.addAutoguardformBean = function (AutoguardformBean) {
        this.ArrayAutoguardformBean.push(AutoguardformBean);
    }
    this.ArrayCasillaformBean = [];
    this.addCasillaformBean = function (CasillaformBean) {
        this.ArrayCasillaformBean.push(CasillaformBean);
    }
    this.ArrayCasillasugfinBean = [];
    this.addCasillasugfinBean = function (CasillasugfinBean) {
        this.ArrayCasillasugfinBean.push(CasillasugfinBean);
    }
    this.ArrayDetapagoprevBean = [];
    this.addDetapagoprevBean = function (DetapagoprevBean) {
        this.ArrayDetapagoprevBean.push(DetapagoprevBean);
    }
    this.ArrayAnexaformBean = [];
    this.addAnexaformBean = function (AnexaformBean) {
        this.ArrayAnexaformBean.push(AnexaformBean);
    }

    this.ArrayCoefigvdetBean = [];
    this.addCoefigvdetBean = function (CoefigvdetBean) {
        this.ArrayCoefigvdetBean.push(CoefigvdetBean);
    }

    this.json = function() {
        return JSON.stringify(this);
    }
}

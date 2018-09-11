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
	this.json = function () {
		return JSON.stringify(this);
	};
};
(function(obj) {
	var requestFileSystem = obj.webkitRequestFileSystem || obj.mozRequestFileSystem || obj.requestFileSystem;
	var URL_UPLOAD_SERVICE = '/v1/recaudacion/tributaria/ReceptorPDT/t/guardarArchivo';
	var URL_UPLOAD_CHUNKED_SERVICE = '/v1/recaudacion/tributaria/ReceptorPDT/t/guardarArchivo/chunked';
	var URL_GET_KEY_SERVICE = '/v1/recaudacion/tributaria/ReceptorPDT/t/key/';
	var URL_GET_HASH_SERVICE = '/v1/recaudacion/tributaria/ReceptorPDT/t/hash';
    // Invocación para obtener la Fecha y Hora del Servidor
    var URL_OBTENER_FECHA = '/v1/recaudacion/tributaria/t/consulta/obtenerFechaHora';
	var URL_VALIDAR_ARCHIVO = '/v1/recaudacion/tributaria/receptorpdt/t/validararchivo';
	var SIZE_MAX = 500 * 1024; // 500KB
  //var SIZE_MAX = 10 * 1024;  //TEMPORAL PRUEBA
    var tokenKeyAuth;
    var tokenValueAuth;
    tokenKeyAuth = "idCache";
	// Se debe obtener el Token desde el Session Storage:
	var token = sessionStorage.getItem('token');
    tokenValueAuth = token; //"F020E691-0B05-45A6-A6B6-D373415E235A";
    var tokenKeyUsuarioBean = "UsuarioBean";
	var IdFormulario = "IdFormulario";
	var valIdFormulario = "*MENU*";
	var numRUC = sessionStorage.getItem("RUC_Login");
	var timbre = sessionStorage.getItem("RUC_" + numRUC);
	var tokenValueUsuarioBean = timbre;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      Response = xhr.responseText;
      console.log("Fecha Hora: " + Response);
      $("body").data("fecha_hora", Response);
      };
    xhr.ontimeout = function (e) {
      Response = "";
      console.log("timeout");
    };
    xhr.open('GET', URL_OBTENER_FECHA, true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.setRequestHeader(tokenKeyAuth, tokenValueAuth); // completar luego
    xhr.setRequestHeader(IdFormulario, valIdFormulario); // completar luego
    //xhr.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean); // completar luego
	xhr.send();
	console.log("invocacion... fecha hora.")
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Presenta mensaje de error al usuario final }
	 */
   
  function cerrar(){
     $("#myAlert").css("display", "none");
  } 
   
	function onerror(message) {
		console.log('Error: ' + message);
    $("#msgPdt").replaceWith("<div id='msgPdt'>"+ message + "</div>");
    $("#modalMensajePdt").modal('show');
    
    fileInput.disabled = false;
	}
  
  
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Calcula hash único por contenido de archivo a ser enviado al servidor }
	 */
	function calculaHash(dataFile) {
		var hash = CryptoJS.SHA1(dataFile);
	
		return hash.toString().toUpperCase(); 
	}
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Obtiene milisegundos actuales }
	 */
	function getMiliSegActuales(){
		var mseg = new Date().getTime(); // milisegundos
		
		return mseg;
	}
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Inicializa milisegundos iniciales para cálculo de tiempo transcurrido en proceso }
	 */
	function inicializaTimer(sNombreTimer){
		var msegInicio = getMiliSegActuales();
		$("body").data(sNombreTimer, msegInicio);
	}
	function detieneTimer(sNombreTimer){
		var msegTranscurridos = getMiliSegsTranscurridos(sNombreTimer);
		$("body").data(sNombreTimer, msegTranscurridos);
	}
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Obtiene número de milisegundos transcurridos }
	 */
	function getMiliSegsTranscurridos(sNombreTimer) {
		var msegActual = getMiliSegActuales();
		var msegInicio = $("body").data(sNombreTimer);
		// Se calcula milisegundos totales transcurridos
		return msegActual - msegInicio;
	}
	
	
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Invocación de método de generación de Hash en Servidor, para verificar que retorna el mismo valor que método javascript. }
	 */
	function calculaHash2(dataFile) {
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				isPaused = false;
				Response = xhr.response; // readBody(xhr);
				//console.log(Response);
			}
		}
		xhr.onload = function () {
			isPaused = false;
			Response = xhr.response; // readBody(xhr);
			$("body").data("hashFile2", Response);
			//console.log("hashFile2:" + $("body").data("hashFile2"));
			
			};
		xhr.ontimeout = function (e) {
			isPaused = false;
			Response = "";
			console.log("timeout");
		};
		xhr.open('POST', URL_GET_HASH_SERVICE, true);
		
		//xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		xhr.setRequestHeader("Content-Type", "application/octet-stream");
		xhr.setRequestHeader(tokenKeyAuth, tokenValueAuth);
		xhr.setRequestHeader(IdFormulario, valIdFormulario);
		//xhr.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean); // completar luego
		
		return xhr.send(dataFile);		
		
	}
	
	
	
	
	var sNomArchBase = "";
	var sNomArchEnZip = "";
	
	var iNumEnviosTotal = 0;
	var iNumEnviosAcum = 0;
	// Se inicializa valor para ProgressBar
	$("body").data("stepProgressBar", 0);
	var STEP_VAL = 10; 
	var step = 0;
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que permite liberar variables creadas en $("body") }
	 */
	function limpiaDataTemporal(){
		jQuery.removeData($("body"), "stepProgressBar");
		jQuery.removeData($("body"), "CAB_FileName");
		jQuery.removeData($("body"), "CAB_File");
		jQuery.removeData($("body"), "resultado");
		jQuery.removeData($("body"), "DET_FileName");
		jQuery.removeData($("body"), "DET_File");
		jQuery.removeData($("body"), "nomZipFile");
		jQuery.removeData($("body"), "iv");
		jQuery.removeData($("body"), "CAB_FlatFile");
		jQuery.removeData($("body"), "DET_FlatFile");
		jQuery.removeData($("body"), "jsonResult");
		jQuery.removeData($("body"), "dataFile");
		jQuery.removeData($("body"), "hashFile");
		jQuery.removeData($("body"), "filename");
		jQuery.removeData($("body"), "header_base1");
		jQuery.removeData($("body"), "header_base2");
		jQuery.removeData($("body"), "header_base3");
		jQuery.removeData($("body"), "Envio_guid");
		jQuery.removeData($("body"), "key");
		jQuery.removeData($("body"), "arrKey");
		jQuery.removeData($("body"), "NomArchBase");
    jQuery.removeData($("body"), "NArch_CON");
		
		$("body").data("sizeFile", 0);
		var i = $("body").data("numEnvios");
		if(i != "" && i > 0){
			for(var j=0; j < i; j++){
				jQuery.removeData($("body"), "Envio_" + j);
				jQuery.removeData($("body"), "BytesEnvio_" + j);
				jQuery.removeData($("body"), "EstadoEnvio_" + j);
			}
			
		}
		jQuery.removeData($("body"), "numEnvios");
		
	}
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Permite avanzar ProgressBar }
	 */
	function addStepProgressBar(){
		step = 	$("body").data("stepProgressBar");
		step += STEP_VAL;
		$("body").data("stepProgressBar", step);
		return step;
	}
	
	/**
	 * @autor: BTG [05/09/2016]
	 * @descripción: { Crea Archivo temporal}
	 */
	function createTempFile(callback) {
		var tmpFilename = "tmp.dat";
		requestFileSystem(TEMPORARY, 4 * 1024 * 1024 * 1024, function(filesystem) {
			function create() {
				filesystem.root.getFile(tmpFilename, {
					create : true
				}, function(zipFile) {
					callback(zipFile);
				});
			}
			filesystem.root.getFile(tmpFilename, null, function(entry) {
				entry.remove(create, create);
			}, create);
		});
	}
	/**
	 * @autor: BTG [05/09/2016]
	 * @descripción: { Permite generar URL para descargar Archivo. }
	 */
	var textFile = null,
    makeTextFile = function (text) {
		//console.log(text);
		var data = new Blob([text], {type: 'text/plain'});
		if (textFile !== null) {
			window.URL.revokeObjectURL(textFile);
		}
		textFile = window.URL.createObjectURL(data);
		return textFile;
	};
	
	/**
	 * @autor: BTG [05/09/2016]
	 * @descripción: { Crea método que permite obtener contenido de archivo .Zip }
	 */
	var model = (function() {
		var URL = obj.URL || obj.webkitURL || obj.mozURL;
		return {
			getEntries : function(file, onend) {
				zip.createReader(new zip.BlobReader(file), function(zipReader) {
					zipReader.getEntries(onend);
				}, onerror);
			},
			getEntryFile : function(entry, creationMethod, onend, onprogress) {
				var writer, zipFileEntry;
				function getData() {
					entry.getData(writer, function(blob) {
						var blobURL = creationMethod == "Blob" ? URL.createObjectURL(blob) : zipFileEntry.toURL();
						onend(blobURL);
					}, onprogress);
				}
				
				if (creationMethod == "Blob") {
					writer = new zip.BlobWriter();
					getData();
				} else {
					createTempFile(function(fileEntry) {
						zipFileEntry = fileEntry;
						writer = new zip.FileWriter(zipFileEntry);
						getData();
					});
				}
			}
		};
	})();
	
	//***********************************************************************************************
	// Métodos para Invocación de Algoritmo AES CTS
	//***********************************************************************************************
	var Crypt = CapyCrypta.createEncrypter({
			cipher: 'AES',
			moo: 'CBC'
	});
	var plaintextArray = "";
	var file;
	/**
	 * @autor: BTG [05/09/2016]
	 * @descripción: { Función que permite encriptar utilizando Algoritmo AES}
	 * @key: contraseña		
	 * @IV: Inicialization Vector
	 * @plain: String, CLOB, Contenido de Archivo Binario a ser encriptado
	 */
	function encrypt(key, IV, plain) {
		var encrypt_value = Crypt.encrypt(plain,key,IV);
		return encrypt_value;
	}
 
	/**
	 * @autor: BTG [05/09/2016]
	 * @descripción: { Función que permite desencriptar utilizando Algoritmo AES}
	 * @key: contraseña		
	 * @IV: Inicialization Vector
	 * @plain: String, CLOB, Contenido de Archivo Binario a ser desencriptada
	 */
	function decrypt(encrypt, key, IV) {
		var plain_value = Crypt.decrypt(encrypt,key,IV);
		return plain_value;
	}
	
	/**
	 * @autor: BTG [05/09/2016]
	 * @descripción: { Función que permite convertir una cadena hexadecimal a Array }
	 * @hex: String hexadecimal
	 */
	function hexToBytes(hex) {
		var len = hex.length;
		var data = new Int8Array(len / 2);
		for (var i = 0; i < len; i += 2) {
			data[i / 2] = ((parseInt(hex.substr(i, 1), 16) << 4)
								 + parseInt(hex.substr(i+1, 1), 16));
		}
		return data;
	}
	//***********************************************************************************************
	
			
	var result;
	var arrIV = []; 
	var crypttext = []; 
	var iv = [];	
	var readerArchivoCAB = new FileReader();
	var readerArchivoDET = new FileReader();
	var arrKey;
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que realiza proceso de Desencriptación }
	 */
	function desencriptaArchivoContenido(NombreArchivo) {
		inicializaTimer("proceso_desencripta");
		var readerArchivo = new FileReader();
		readerArchivo.onload = function(e) {
			// Se sobreescribe el objeto con la cadena desencriptada:
			$("body").data(NombreArchivo, e.target.result);
			$("body").data("resultado", $("body").data(NombreArchivo));
			//console.log($("body").data(NombreArchivo));
			desencriptaArchivo(NombreArchivo);
			unzip(NombreArchivo);
		};
		readerArchivo.onerror = function(e) {
			onerror(e.target.error.name);
		};
		var data = $("body").data(NombreArchivo);
		// se envía a FileReader
		var dataBlob = new Blob([data], {type: 'application/octet-stream'});
		readerArchivo.readAsBinaryString(dataBlob);
		detieneTimer("proceso_desencripta");
	}
	 	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método general de desencriptación con algorimo AES }
	 */
	function desencriptaArchivo(fileName) {
		
		var arrData = $("body").data("resultado");
		var arrTexto = new Int8Array(arrData.length - 16);
		var arrIV1 = new Int8Array(16);
		for (var i = 0; i < 16; ++i) {
			arrIV1[i] = arrData[i].charCodeAt(0);
		}
		for(var i=16; i < arrData.length; i++)
			arrTexto[i-16] = arrData[i].charCodeAt(0);
		crypttext = arrTexto;
		iv = arrIV1;
		$("body").data("iv", iv);
		
		// Se realiza la desencriptación:
		plaintextArray = decrypt(crypttext, arrKey, iv);
		// Se modifica tipo de dato del resulado desencriptado de Int8Array a Uint8Array:
		var arrDataDec = new Uint8Array(plaintextArray.length);
		for(var i=0; i < arrDataDec.length; i++) {
			arrDataDec[i] = plaintextArray[i];
		}
		plaintextArray = arrDataDec;
		// Se almacena en objeto HTML el texto desencriptado (.zip), a ser utilizado por función "unzip"
		$("body").data(fileName, plaintextArray);
		
	}
	
	
	function VerificaAnexasControl() {

		var arrFiles = $("body").data("LST_Files").split("|");
    var NombreArchivoCON = "";
    var NombreArchivoDET = "";
    var NombreArchivoCAB = "";
    var AnexasArrayValidador = [];
		for(var i = 0; i < arrFiles.length; i++) {
			if(arrFiles[i].indexOf(".CON") > 0) {
				NombreArchivoCON = arrFiles[i];
			}
      if(arrFiles[i].indexOf(".CAB") > 0) {
        NombreArchivoCAB = arrFiles[i];
      }
      if(arrFiles[i].indexOf(".DET") > 0) {
        NombreArchivoDET = arrFiles[i];
      }
      if(!(arrFiles[i].indexOf(".CAB") > 0 || arrFiles[i].indexOf(".DET") > 0 || arrFiles[i].indexOf(".CON") > 0)){
        var nombreAnexa = arrFiles[i];
        if(nombreAnexa.length > 0){
        var archivo = $("body").data(nombreAnexa);
        var arrDataANEXA = archivo.split("\r");
        
        var cantidadRegistros = arrDataANEXA.length - 1;
        var nombreArch = nombreAnexa.split("_");
        var extensionArch = nombreAnexa.split(".");
        var nombreAnexa = nombreArch[0] + "." + extensionArch[1]; 
        console.log("Nombre ArchivoAnex : "+nombreAnexa);
        console.log("tamano ArchivoAnex : "+cantidadRegistros);
        AnexasArrayValidador.push({ nombreAnexa: nombreAnexa, cantidadRegistros: cantidadRegistros});
        }
      }
		}
    
    $("body").data("Anexas_Array",AnexasArrayValidador);
		
		$("body").data("NArch_CON", NombreArchivoCON);
    /*$("body").data("NArch_DET", NombreArchivoDET);
    $("body").data("NArch_CAB", NombreArchivoCAB);  */
    detieneTimer("proceso_unzip");
    if(NombreArchivoCON=="" || NombreArchivoDET=="" || NombreArchivoCAB==""){  //MTM2017
      onerror("Sr. Contribuyente el archivo ZIP no ha sido generado por el PDT o su contenido ha sido alterado");
      limpiaDataTemporal();
      var fileInput = document.getElementById("file");
					fileInput.disabled = false;
					fileInput.value = "";
      return;
    }else{     
		  // luego de obtener el contenido del archivo DET, se procede a 
		  // generar JSON a ser enviado a la Bandeja
		  generaJSON_Bandeja();
    }		
	}
	
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que permite concatenar cadena de texto, LPAD }
	 */
	function pad2(n) { 
		return n < 10 ? '0' + n : n ;
	}
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método permite obtener la Fecha y Hora actuales. }
	 */
	function getCurrentDateFormat() {
		var date = new Date();
		//2016-10-10 12:22:31
		return  date.getFullYear().toString() + "-" + pad2(date.getMonth() + 1) + "-" + pad2( date.getDate()) + " " + 
				pad2( date.getHours() ) + ":" + pad2( date.getMinutes() ) + ":" + pad2( date.getSeconds() ) ;
	}
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que permite generar cadena en formato JSON para ser agregado a la Bandeja }
	 */
	function generaJSON_Bandeja() {
		var JSONBandeja = "";
		var CAB_Data = $("body").data("CAB_FlatFile");
		var DET_Data = $("body").data("DET_FlatFile");

		/*
			Estructura Archivo CAB:
			Tipo de Documento del declarante|
			Número de Documento del declarante|
			Periodo|
			Formulario|
			Semana|
			Fecha de creación de la declaración|
			Banco|
			Numero de cheque|
			efectivo|
			cheque|
			Rectifica:1=Rectifica,0=NoRectifica|
			Fecha de envio|
			Estado:0=NoEnviada,1=Enviada,9=Pendiente|
			Checksum del registro|
 
			Ejemplo:
			6|10086426591|201603|0615|0|20160928|||93||0|20160928|1|815034|
		*/		
		//console.log(CAB_Data);
		var arrDataCAB = CAB_Data.split("|");
		var sTipDoc = arrDataCAB[0]; // Tipo de Documento del declarante|
		var sNumDoc = arrDataCAB[1]; // Número de Documento del declarante|
		var sPeriodo = arrDataCAB[2]; // Periodo|
		var sNumForm = arrDataCAB[3]; // Formulario|
		var sSemana = arrDataCAB[4]; // Semana|
		var sFecDeclaracion = arrDataCAB[5]; // Fecha de creación de la declaración|
		var sBanco = arrDataCAB[6]; // Banco|
		var sNumCheque = arrDataCAB[7]; // Numero de cheque|
		var sEfectivo = arrDataCAB[8]; // efectivo| 
		var sCheque = arrDataCAB[9]; // cheque|
		var sRectifica = arrDataCAB[10]; // Rectifica:1=Rectifica,0=NoRectifica|
		var sFecEnvio = arrDataCAB[11]; // Fecha de envio|
		var sEstado = arrDataCAB[12]; // Estado:0=NoEnviada,1=Enviada,9=Pendiente|
		var sChecksum = arrDataCAB[13]; // Checksum del registro|
		//addStepProgressBar();
		//console.log("Contenido de Archivo 'CON':");
		//console.log($("body").data("CON_FlatFile"));
		$("#preRUC").text(sNumDoc);
		$("#prePeriodo").text(sPeriodo);
		$("#preSemana").text(sSemana);
		if(sRectifica == "1") {
			$("#preRectifica").text("Si");
		}
		else {
			$("#preRectifica").text("No");
		}
		
		
		/*
			Estructura Archivo DET:
			Tipo de Documento del declarante|
			Número de Documento del declarante|
			Periodo del Formulario|
			Tipo de Formulario|
			Semana|
			Numero de Casilla|
			Valor de la casilla|
			idcasilla|
			estado|
			Checksum del registro|
			
			Ejemplos:
			6|10086426591|201603|0615|0|002|10086426591|01|0|817657|
			6|10086426591|201603|0615|0|005|0|01|0|820242|
		*/
		var casillasArray = [];
		var casillasOKArray = [];
		var tributosArray = [];
		var nMontoPagar = 500.00;
		var nMontoDeuda = 0;
		var arrDataDET = DET_Data.split("\r");
		var casillasFormularioList = [];
		for(var i=0; i<arrDataDET.length;i++){
			var arrDataDETLinea = arrDataDET[i].split("|");
			
			var sTipDoc1 = arrDataDETLinea[0]; 		// Tipo de Documento del declarante|
			var sNumDoc1 = arrDataDETLinea[1]; 		// Número de Documento del declarante|
			var sPeriodo1 = arrDataDETLinea[2]; 	// Periodo|
			var sNumForm1 = arrDataDETLinea[3]; 	// Tipo de Formulario|
			var sSemana1 = arrDataDETLinea[4]; 		// Semana|
			var sNumCasilla1 = arrDataDETLinea[5]; 	// Numero de Casilla|
			var sValCasilla1 = arrDataDETLinea[6]; 	// Valor de la casilla|
			var sIdCasilla1 = arrDataDETLinea[7]; 	// idcasilla|
			//console.log(">>>>>>>>>>>> antes del Hash sNumCasilla1>>>>>> " + sNumCasilla1);
			//console.log(">>>>>>>>>>>> antes del Hash sIdCasilla1 >>>>>> " + sIdCasilla1);
			var sEstado1 = arrDataDETLinea[8]; 		// estado|
			var sChecksum1 = arrDataDETLinea[9]; 	// Checksum del registro|
			if(sNumCasilla1 != undefined) {
				//console.log(">>>>>>>>>>>> INGRESA  Hash sIdCasilla1 >>>>>> " + sNumCasilla1);
				//MTM
        casillasArray.push({ codigoCasilla: parseInt(sNumCasilla1), valorCasilla: sValCasilla1,  tipoCasilla: sIdCasilla1});
        //casillasArray.push({ codigoCasilla: parseInt(sNumCasilla1), valorCasilla: sValCasilla1,  tipoCasilla: sIdCasilla1, codtipcamCasilla : '00'});
				/*t7779casillaform*/
				casillasOKArray.push({ numOrd: 0, numCas: sNumCasilla1, perTri: sPeriodo1, desValCas: sValCasilla1, codTipcas:  sIdCasilla1});
				
				var casillasFormulario = new CasillasFormulario();
				casillasFormulario.casillasFormularioPK.numCas = parseInt(sNumCasilla1);
				casillasFormulario.desValcas = encodeURIComponent(sValCasilla1);
				casillasFormulario.codTipcas = "" + sIdCasilla1;
				casillasFormulario.perTri = formatStringPeriod(sPeriodo1);
			}
			/*
			if(sNumCasilla1 == "410") {
				nMontoPagar = sValCasilla1;
			}
			if(sNumCasilla1 == "405") {
				nMontoDeuda = sValCasilla1;
			}*/
			
            casillasFormularioList.push(casillasFormulario);			
		}
		

		var jsonCasillasHash = ' "casillaFormularioList": ' + JSON.stringify(casillasFormularioList);
		//console.log(">>>>>>>>>>>> antes del Hash >>>>>> ");
		console.log(">>>>>>>>>>>> antes del Hash lista >>>>>> " + jsonCasillasHash);
		$("body").data("hashFile", calculaHash(jsonCasillasHash));
		console.log(">>>>>>>>>>>> se Llego al Hash >>>>>> :" + $("body").data("hashFile"));
		
		var jsonCasillas = ' "casillas": ' + JSON.stringify(casillasArray);
		$("body").data("jsonHash", jsonCasillas);
		var AnexasArray = [];  
    var size = $("body").data("sizeFile");
    var NombreArchivoCON = $("body").data("NArch_CON");	
  	var sCONFile = $("body").data(NombreArchivoCON);	
    var arrDataCON = sCONFile.split("\r");
		if(size < SIZE_MAX){
  		// 6|10097503201|2007|0659|0|0659200700017110125239157171419717616619825.CAB|T471CRB|62|20822081977019312341227371262172401674220134169215|||000000|1|
  		for(var i=0; i<arrDataCON.length - 1;i++){
        var arrDataCONLinea = arrDataCON[i].split("|");
  			var sTipDoc1 = arrDataCONLinea[0]; // Tipo de Documento del declarante|
  			var sNumDoc1 = arrDataCONLinea[1]; // Número de Documento del declarante|
  			var sPeriodo1 = arrDataCONLinea[2]; // Periodo|
  			var sNumForm1 = arrDataCONLinea[3]; // Tipo de Formulario|
  			var sSemana1 = arrDataCONLinea[4]; // Semana|
  			var sNomArchContenido = arrDataCONLinea[5] + ""; // Nombre de Archivo|
  			var sNomTabla = arrDataCONLinea[6]; // Nombre de Tabla relacionada|
  			var sTipo = sNomArchContenido.substring(sNomArchContenido.length-3);
  			sNomArchContenido = sNomArchContenido.substring(0, sNomArchContenido.indexOf(".")) + "_" + sTipo + "." + sTipo;
  			var sDataAnexa = $("body").data(sNomArchContenido);	
  			
  			/*t7782anexaform*/
  			AnexasArray.push({ numOrd: 0, codExtanx: sTipo, codNomanx: sNomTabla, perTri: sPeriodo1, desTabanx:  sDataAnexa});
  			
  		}
    }
		//////////////////////////////////////////////////
		// Al completar casuísticas retirar:
		////sNumForm = "0626"; // por ahora se asume que siempre es el formulario 0626
		//////////////////////////////////////////////////
		var sDesFormulario = "Retencion";
		comunBandeja.setearFormularioActivo(sNumForm);
		comunBandeja.inicializarLocalStorage();
        if (!comunBandeja.existeFormulario(sNumForm,sPeriodo)) {
			/*
            var casillas = $('.data-sunat');
            var casillasArray = [];
            $.each(casillas, function (index, item) {
                casillasArray.push({ codigoCasilla: $(item).data('casilla'), valorCasilla: $('*[data-casilla="' + $(item).data('casilla') + '"]').val() });
            });
			
            var tributos = $('[data-codigoTributo]');
            $.each(tributos, function (index1, item1) {
                tributosArray.push({ codigoTributo: item1.attributes["data-codigoTributo"].value, descripcionTributo: item1.attributes["data-descripcionTributo"].value, valorTributo: item1.value });
            });*/
			// Se detiene contador de tiempo
			detieneTimer("proceso_total");
			var segsUnz = $("body").data("proceso_unzip") / 1000;
			var segsDes = $("body").data("proceso_desencripta") / 1000;
			var segsTot = $("body").data("proceso_total") / 1000;
      var sNomArchivo = $("body").data("nomZipFile");
			var sizeFile = $("body").data("sizeFile");
			var jsonFechaHora = JSON.parse($("body").data("fecha_hora"));
			var Fecha = jsonFechaHora["fecha"];
			var Hora = jsonFechaHora["hora"];
			var FechaHora = Fecha + " " + Hora;
			////////////////////////////////////////////////////////////////////////////////
			// TODO: Realizar validación previo al envío a la Bandeja y envío (upload)
			//Validar Archivo INICIO
			//Estructura CabBean
			var tipdocd = arrDataCAB[0];    // Tipo de Documento del declarante|
			var docidd = arrDataCAB[1];     // Número de Documento del declarante|
			var periodo = arrDataCAB[2];    // Periodo|
			var formulario = arrDataCAB[3]; // Formulario|
			var semana = arrDataCAB[4];     // Semana|
			var fecpro = arrDataCAB[5];     // Fecha de creación de la declaración|
			var bcolibrad = arrDataCAB[6];  // Banco|
			var nrocheque = arrDataCAB[7];  // Numero de cheque|
			var efectivo = arrDataCAB[8];   // efectivo| 
			var cheque = arrDataCAB[9];     // cheque|
			var rectifica = arrDataCAB[10]; // Rectifica:1=Rectifica,0=NoRectifica|
			var fecEnv = arrDataCAB[11];    // Fecha de envio|
			var estado = arrDataCAB[12];    // Estado:0=NoEnviada,1=Enviada,9=Pendiente|
			var cnumero = arrDataCAB[13];   // Checksum del registro|
			
			var cabBean = '"cabBean": {"tipdocd":"'+ tipdocd +'", "docidd":"'+ docidd +'", "periodo":"'+ periodo +'", "formulario":"'+ formulario +'", "semana":"'+ semana +'", "fecpro":"'+ fecpro +'", "bcolibrad":"'+ bcolibrad +'", "nrocheque":"'+ nrocheque +'", "efectivo":"'+ efectivo +'", "cheque":"'+ cheque +'", "rectifica":"'+ rectifica +'", "fecEnv":"'+ fecEnv +'", "estado":"'+ estado +'", "cnumero":"'+ cnumero +'"}';
			
      //Estructura DetBean
			var casillasArrayValidar = [];
			for(var i=0; i<arrDataDET.length;i++){
				var arrDataDETLinea = arrDataDET[i].split("|");
				var tipdocd = arrDataDETLinea[0].replace(/(\r\n|\n|\r)/gm,"");  // Tipo de Documento del declarante|
				var docidd = arrDataDETLinea[1];                                // Número de Documento del declarante|
				var periodo = arrDataDETLinea[2];                               // Periodo|
				var formulario = arrDataDETLinea[3];                            // Tipo de Formulario|
				var semana = arrDataDETLinea[4];                                // Semana|
				var casilla = arrDataDETLinea[5];                               // Numero de Casilla|
				var iValor = arrDataDETLinea[6];                                // Valor de la casilla|
				var idcasilla = arrDataDETLinea[7];                             // idcasilla|
				var estado = arrDataDETLinea[8];                                // estado|
				var cnumero = arrDataDETLinea[9];                               // Checksum del registro|
				
				if(casilla != "" && tipdocd != "") {
					casillasArrayValidar.push({ tipdocd: tipdocd, docidd: docidd, periodo: periodo, formulario: formulario, semana: semana, casilla: casilla, iValor: iValor, idcasilla: idcasilla, estado: estado, cnumero: cnumero});
				}				
			}
			
			//Extructura de Anexas
			var AnexasArrayValidador = [];
      AnexasArrayValidador = $("body").data("Anexas_Array");
      
			//Estructura CON
			var ConArrayValidador = [];
			for(var i=0; i<arrDataCON.length - 1;i++){
				var arrDataCONLinea = arrDataCON[i].split("|");
				var tipdocd = arrDataCONLinea[0].replace(/(\r\n|\n|\r)/gm,""); // Tipo de Documento del declarante|
				var docidd = arrDataCONLinea[1];                               // Número de Documento del declarante|
				var periodo = arrDataCONLinea[2];                              // Periodo|
				var formulario = arrDataCONLinea[3];                           // Tipo de Formulario|
				var semana = arrDataCONLinea[4];                               // Semana|
				var nomarc = arrDataCONLinea[5] + "";                          // Nombre de Archivo|
				var tabD = arrDataCONLinea[6];                                 // Nombre de Tabla relacionada|
				var indice = arrDataCONLinea[10];                              // indice|
				var cnum = arrDataCONLinea[11];                                // Numero de control|
				var numTuplas = arrDataCONLinea[12];                           // Numero de tuplas|
				if(numTuplas==""){
          numTuplas = "0";
        }
				ConArrayValidador.push({ tipdocd: tipdocd, docidd: docidd, periodo: periodo, formulario: formulario, semana: semana, nomarc: nomarc, tabD: tabD, indice: indice, cnum: cnum, numTuplas: numTuplas});
				
			}
            var filename = $("body").data("filename");
			var listDetBean = ' "listDetBean": ' + JSON.stringify(casillasArrayValidar);
			var listConBean = ' "listConBean": ' + JSON.stringify(ConArrayValidador);
			var listAnexaBean = ' "listAnexaBean": ' + JSON.stringify(AnexasArrayValidador);
			var nombreArchivo = ' "nombreArchivo": "'+filename+'"';
      var cntTamArch = ' "cntTamArch": "'+$("body").data("sizeFile")+'"';
			var jsonEnvioValidador = '{"pDTBean": {'+ cabBean +','+ listDetBean +','+ listConBean +','+ listAnexaBean +'},'+ nombreArchivo +','+ cntTamArch + '}';
			var versionForm = "1.0" ;
      var actualUIT = "";
      var codDependencia = "";
      var fechPres = "";
      var fechVen = "";
      var tipPer = "";
			var jsonRes = comunServiciosBandeja.enviarValidarArchivo(jsonEnvioValidador);
			console.log("ESTO RETORNA EL VALIDAR ARCHIVO" + jsonRes);
			
			if(jsonRes != null){
				if(jsonRes.cod != "200"){
					if(jsonRes.errors!=undefined){
						$.each(jsonRes.errors,function(index,item){
              $("#msgPdt").replaceWith("<div id='msgPdt'>"+ item.msg + "</div>");
              $("#modalMensajePdt").modal('show');
						});
					}
					
					var fileInput = document.getElementById("file");
					fileInput.disabled = false;
					fileInput.value = "";
					
				}else{
					$("#preRazSoc").text(" " + jsonRes.razonSocial);
				  sPeriodo = jsonRes.periodo;
          $("#prePeriodo").text(sPeriodo);
          console.log("periodo "+sPeriodo);
          actualUIT = jsonRes.valorUIT;
          codDependencia = jsonRes.codDep;
          fechPres = jsonRes.fechPres;
          fechVen = jsonRes.fechaVen;
          tipPer = jsonRes.tipPer;
					if(jsonRes.lstTributos!=undefined)
					{
            var montoDeudaTributariaTotal = 0;
            var valorTributo = 0;
						$.each(jsonRes.lstTributos,function(index,item){
							//console.log("Cosapi 1--------->"+item.codigoTributo);
							tributosArray.push({ codigoTributo: item.codigoTributo, descripcionTributo: item.descripcionTributo,valorTributo: item.valorTributo , montoDeudaTributaria: item.montoDeudaTributaria, baseImponible: item.baseImponible, impuestoResultante: item.impuestoResultante});
							
							// Se actualiza la tabla correspondiente a la Constancia preliminar:
							$('#detTributo tbody').append('<tr><td>' + item.descripcionTributo 
							+'</td><td>S/. ' + comunLibreria.obtenerMontoFormateado2(item.montoDeudaTributaria) + '</td><td>S/. ' + comunLibreria.obtenerMontoFormateado2(item.valorTributo) 
							+ '</td></tr>');
              
              montoDeudaTributariaTotal = montoDeudaTributariaTotal + item.montoDeudaTributaria*1;
              valorTributo = valorTributo + item.valorTributo*1; 
						});
            	$('#detTributo tbody').append('<tr><td>Total a pagar</td><td>S/. ' + comunLibreria.obtenerMontoFormateado2(montoDeudaTributariaTotal) + '</td><td>S/. ' + comunLibreria.obtenerMontoFormateado2(valorTributo) +  '</td></tr>');
              nMontoPagar = valorTributo;
              console.log("prueba "+montoDeudaTributariaTotal.toLocaleString());
						
					}
          if(jsonRes.lstCasillas!=undefined){
            casillasArray = [];
            var flagIndCas = "0";
            var numTrabajador = "0";
            var numPensionista = "0";
            var num4taCategoria = "0";
            var numNorEspecial = "0";
            var numModFormativa = "0";
            var numTercero = "0";
            $.each(jsonRes.lstCasillas,function(index,item){
              console.log("casillas -->"+item.codigoCasilla);
              if(sNumForm == "0601" && item.codigoCasilla == "720"){
                numTrabajador = item.valorCasilla;
              }
              if(sNumForm == "0601" && item.codigoCasilla == "724"){
                numPensionista = item.valorCasilla;
              }
              if(sNumForm == "0601" && item.codigoCasilla == "733"){
                num4taCategoria = item.valorCasilla;
              }
              if(sNumForm == "0601" && item.codigoCasilla == "737"){
                numNorEspecial = item.valorCasilla;
              }
              if(sNumForm == "0601" && item.codigoCasilla == "738"){
                numModFormativa = item.valorCasilla;
              }
              if(sNumForm == "0601" && item.codigoCasilla == "739"){
                numTercero = item.valorCasilla;
              }
              if(item.codigoCasilla == "007"){
                flagIndCas = "1";                                              
                casillasArray.push({codigoCasilla: 7, valorCasilla: sPeriodo,  tipoCasilla: "01", codtipcamCasilla : "03"});
              }else{
                if(item.codigoCasilla == "005" && item.valorCasilla > 0){
                  casillasArray.push({codigoCasilla: parseInt(item.codigoCasilla), valorCasilla: "1",  tipoCasilla: item.tipoCasilla, codtipcamCasilla : item.codtipcamCasilla});             
                }else{
                  casillasArray.push({codigoCasilla: parseInt(item.codigoCasilla), valorCasilla: item.valorCasilla,  tipoCasilla: item.tipoCasilla, codtipcamCasilla : item.codtipcamCasilla});             
                }
              }   
            });
            if(flagIndCas == "0"){
              casillasArray.push({codigoCasilla: 7, valorCasilla: sPeriodo,  tipoCasilla: "01", codtipcamCasilla : "03"});
            }
            casillasArray.push({codigoCasilla: 13, valorCasilla: moment().format("YYYY-MM-DD"),  tipoCasilla: "01", codtipcamCasilla : "02"});
            casillasArray.push({codigoCasilla: 58, valorCasilla: moment().format("HH:mm:ss"),  tipoCasilla: "01", codtipcamCasilla : "04"});
            jsonCasillas = ' "casillas": ' + JSON.stringify(casillasArray);
          }
					
					var jsonCargaPdt = ' "t7788cargapdt": { "numCargaPdt": "0", "codFor": "' + sNumForm + '", "perTri": "' + sPeriodo + '", "numRuc": "' + docidd + '", "numOrdFor": "0", "cntSegUnzc": "' + parseInt(segsUnz)+ '", "cntSegTot": "' + parseInt(segsTot) + '", "indEstRech": "", "fecCargaPdt": "' + Hora + '", "desArchivo": "' + filename + '", "cntTamArch": "' + parseInt(sizeFile) + '", "cntSegDesc": "' + parseInt(segsDes) + '",  "codDep": "", "indProc": "0"}';
					if(sNumForm == "0601"){
            var jsonDetalle = ' "detalle" : { "identificadorFormulario": "##__##__##",   "numRuc":"' + docidd + '", "codFormulario": "' + sNumForm + '", "numeroVersionFormulario": "' + jsonRes.versionForm + '", "descripcionFormulario": "' + jsonRes.desForm + '", "montoPago": "' + nMontoPagar + '", "periodoTributo": "' + sPeriodo + '", "rectificatoria":"' + rectifica + '", "numTrabajador":"' + numTrabajador + '", "numPensionista":"' + numPensionista + '", "num4taCategoria":"' + num4taCategoria + '", "numModFormativa":"' + numModFormativa + '", "numTercero":"' + numTercero + '", "numNorEspecial":"' + numNorEspecial + '"}';
          }else{
            var jsonDetalle = ' "detalle" : { "identificadorFormulario": "##__##__##",   "numRuc":"' + docidd + '", "codFormulario": "' + sNumForm + '", "numeroVersionFormulario": "' + jsonRes.versionForm + '", "descripcionFormulario": "' + jsonRes.desForm + '", "montoPago": "' + nMontoPagar + '", "periodoTributo": "' + sPeriodo + '", "rectificatoria":"' + rectifica + '", "numTrabajador":"' + numTrabajador + '", "numPensionista":"' + numPensionista + '", "num4taCategoria":"' + num4taCategoria + '", "numModFormativa":"' + numModFormativa + '", "numTercero":"' + numTercero + '", "numNorEspecial":"' + numNorEspecial + '", "actualUIT":"' + actualUIT + '", "codDependencia":"' + codDependencia + '", "fechPres":"' + fechPres + '", "fechVen":"' + fechVen + '", "tipPer":"' + tipPer + '"}';
          }
					var jsonTributo = ' "tributos": ' + JSON.stringify(tributosArray);
					var cabPos,detPos,conPos;
          var flagCab = "0";
          var flagDet = "0";
          var flagCon = "0";
          var AnexasArrayNew = [];
          $.each(AnexasArray,function(index,item){
            AnexasArray[index].perTri = sPeriodo;
            if(AnexasArray[index].codExtanx != "CAB" && AnexasArray[index].codExtanx != "DET" && AnexasArray[index].codExtanx != "CON"){
               AnexasArrayNew.push(AnexasArray[index]);  
            }
          });

					var jsonAnexasArray = ' "anexasFormularioList": ' + JSON.stringify(AnexasArrayNew);
					
					var jsonResult = '{' + jsonDetalle + ',' + jsonTributo + ',' + jsonCasillas + ',' + jsonCargaPdt + ',' + jsonAnexasArray + '}';
					$("body").data("jsonResult", jsonResult);

                    //$("body").data("hashFile", calculaHash(jsonCasillas));

					console.log("JSON Bandeja:" + jsonResult);
					
					var enviarPDT = document.getElementById("Enviar-pdt");
					// Se asume que es correcto
					// Se envía Archivo al servidor
					$("#progress1").css({width:"0%"});
					$("#progress1").text("0% Declaración PDT");
          $("body").data("NumForm", sNumForm);
					$("body").data("Periodo", sPeriodo);
					enviarPDT.onclick = muestraSiguientePaso;
					enviarPDT.disabled = false;
					
					document.getElementById("img").style.visibility="visible";
					document.getElementById("spanimagen").style.visibility="visible";
					var enviarPDT1 = document.getElementById("enviarPDT");
					
					
					enviarPDT1.onclick = ejecutaUploadArchivoBase;
				}
				
			}
			
			//Validar Archivo TERMINA
			// Aquí se finaliza la validación, el ProgressBar inicial debe estar al 100%
			////////////////////////////////////////////////////////////////////////////////
			//console.log("valor del step final: " + step);
			
		}	
		else {
			console.log("Existe Form " + sNumForm + " en Bandeja.");		
			
			/*$("#myAlert").replaceWith("<div  class='alert alert-danger fade in' id='myAlert2'> <button id='btnAlerta' type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;</button> <strong>Error!</strong> Ya existe el formulario PDT en la Bandeja. </div>");
			$("#myAlert").css("display", ""); */
      $('#modalFormularioExiste2').modal('show');
      var fileInput = document.getElementById("file");
					fileInput.disabled = false;
					fileInput.value = "";
		}
		
	}
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que permite filtrar acción incorrecta, caso contrario continuar con el flujo de Upload. }
	 */
	function muestraSiguientePaso(){
		var size = $("body").data("sizeFile");
		if(size <= 0) {
			//console.log("reintento inválido");
			onerror("Reintento Inválido.")
			return;
		}
    var form = $("body").data("NumForm");
    var periodo = $("body").data("Periodo");
    var desForm = $("body").data("desForm");
    if (comunBandeja.existeFormulario(form, periodo)) {
      $('#modalFormularioExiste2').modal('show');
      return;
    }
    
	}
	
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que realiza Upload del archivo ZIP base. }
	 */
	function ejecutaUploadArchivoBase() {
		var dataFile = $("body").data("dataFile");
		var size = $("body").data("sizeFile");
		var enviarPDT = document.getElementById("Enviar-pdt");
		enviarPDT.disabled = true;
		if(size <= 0) {
			//console.log("reintento inválido");
			onerror("Reintento Inválido.")
			return;
		}
		if(size < SIZE_MAX)
		{
			// Si el archivo es menor de 500KB se debe generar Hash Key
			console.log("Archivo < 500kb");
			// Luego se procede al envío de todo el archivo
			var resultado = enviaDataBackup(dataFile);
			//console.log("resultado upload: " + resultado);
			limpiaDataTemporal();
			}
		else{
			// Si el tamaño del archivo es >= 500KB 
			// Se procede a partir el archivo
			console.log("Archivo >= 500kb");
			var resultado = enviaDataProceso(dataFile);
			limpiaDataTemporal();
		}
	}
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que envía archivo de tamaño menor a 500KB al Servidor para ser almacenado en el FS Backup }
	 */
	function enviaDataBackup(dataFile) {

		console.log(">>> ANTES DE hashFile ");
		var hashFile = $("body").data("hashFile");
        console.log(">>> ANTES DE hashFile " + hashFile);

		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4) {
				isPaused = false;
				Response = xhr.response; 
				//console.log(Response);
			}
		}
		xhr.onload = function () {
			isPaused = false;
			Response = xhr.response; 
			$("body").data("Response", Response);
			$("#progress1").css({width:"100%"});
			$("#progress1").text("100% Declaración PDT");
			var Listo = document.getElementById("Listo");
			Listo.disabled = false;
			console.log("Response = " + Response);
			enviarPDT();
		};
		xhr.ontimeout = function (e) {
			isPaused = false;
			Response = "";
			$("body").data("Response", Response);
			console.log("timeout");
		};
		xhr.open('POST', URL_UPLOAD_SERVICE, true);
		
		//xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8080");
		xhr.setRequestHeader("Content-Type", "application/octet-stream");
		xhr.setRequestHeader(tokenKeyAuth, tokenValueAuth);
		xhr.setRequestHeader(IdFormulario, valIdFormulario);
		//xhr.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean); // completar luego
		
		$("#progress1").css({width:"50%"});
		$("#progress1").text("50% Declaración PDT");
		
		var rowData = new Int8Array(dataFile.length);
		for(var i = 0; i < dataFile.length; i++){
			rowData[i] = dataFile.charCodeAt(i);
		}			
		var arrData = new Int8Array(rowData.length + 1024);
		var size = $("body").data("sizeFile");
		var filename = $("body").data("filename");
		var sNumForm = $("body").data("NumForm");
		var sPeriodo = $("body").data("Periodo");
		var header = '{"filename":"' + filename + '","size":"' + size + '","numenvio":"1","total":"1","guid":"","hash":"' + hashFile + '","numform":"' + sNumForm + '","periodo":"' + sPeriodo + '"}';
		//console.log("header: " + header);
		for(var i = 0; i < 1024; i++){
			if(i < header.length) {
				arrData[i] = header.charCodeAt(i);
			}
			else {
				arrData[i] = 0;
			}
		}
		for(var i = 1024; i < rowData.length + 1024; i++){
			arrData[i] = rowData[i-1024];
		}
		console.log("enviando...");
		$("#progress1").css({width:"70%"});
		$("#progress1").text("70% Declaración PDT");
		return xhr.send(arrData);
	}
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que envía archivo de tamaño mayor a 500KB al Servidor para ser almacenado en el FS de Trabajo }
	 */
	function enviaDataProceso(dataFile) {
		var hashFile = $("body").data("hashFile");
		var Response = "";
		var isPaused = true;
		var TAMANIO_MAX_BLOQUE_ENVIO = 1*1024*1024;
		var TAMANIO_HEADER = 1024;
		var step = addStepProgressBar();
		$("#progress1").css({width:(step +"%")});
		$("#progress1").text(step +"% Declaración PDT");
		var rowData = new Int8Array(dataFile.length);
		for(var i = 0; i < dataFile.length; i++){
			rowData[i] = dataFile.charCodeAt(i);
		}			
		var size = $("body").data("sizeFile");
		var filename = $("body").data("filename");
		var sNumForm = $("body").data("NumForm");
		var sPeriodo = $("body").data("Periodo");
		if(size < TAMANIO_MAX_BLOQUE_ENVIO - TAMANIO_HEADER){
			
			var arrData = new Int8Array(rowData.length + TAMANIO_HEADER);
			var header = '{"filename":"' + filename + '","size":"' + size + '","numenvio":"1","total":"1","guid":"","hash":"' + hashFile + '","numform":"' + sNumForm + '","periodo":"' + sPeriodo + '"}';
			console.log("header: " + header);
			for(var i = 0; i < TAMANIO_HEADER; i++){
				if(i < header.length) {
					arrData[i] = header.charCodeAt(i);
				}
				else {
					arrData[i] = 0;
				}
			}
			for(var i = TAMANIO_HEADER; i < rowData.length + TAMANIO_HEADER; i++){
				arrData[i] = rowData[i-TAMANIO_HEADER];
			}
			console.log("enviando...");
			var xhr = new XMLHttpRequest();
			isPaused = true;
			xhr.onreadystatechange = function() {
				if (xhr.readyState == 4) {
					isPaused = false;
					Response = xhr.response; // readBody(xhr);
					//console.log(Response);
				}
			}
			xhr.onload = function () {
				isPaused = false;
				Response = xhr.response; 
				$("#progress1").css({width:"100%"});
				$("#progress1").text("100% Declaración PDT");
				var Listo = document.getElementById("Listo");
				Listo.disabled = false;
				$("body").data("Response", Response);
				console.log("Response2 = " + Response);
				enviarPDT();
			};
			xhr.ontimeout = function (e) {
				isPaused = false;
				Response = "";
				$("body").data("Response", Response);
				console.log("timeout");
			};
			xhr.open('POST', URL_UPLOAD_CHUNKED_SERVICE, true);
			
			//xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8080");
			xhr.setRequestHeader("Content-Type", "application/octet-stream");
			xhr.setRequestHeader(tokenKeyAuth, tokenValueAuth);
			xhr.setRequestHeader(IdFormulario, valIdFormulario);
			//xhr.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean); // completar luego
			var sRetorno = xhr.send(arrData);
			if(Response != "TERMINADO") {
				console.log("Respuesta XHR: " + Response);
				return "Error"
			}
			else {
				$("#progress1").css({width:"80%"});
				$("#progress1").text("80% Declaración PDT");
				console.log("Respuesta XHR: " + Response);
				return "Exito"
			}
		}
		else {
			var tamTotalArchivo = rowData.length;
			var tamTotalEnviado = 0;
			var iNumEnvios = Math.floor(size / (TAMANIO_MAX_BLOQUE_ENVIO - TAMANIO_HEADER));
			if ((size % (TAMANIO_MAX_BLOQUE_ENVIO - TAMANIO_HEADER))  > 0 ) {
				iNumEnvios ++;
			}
			var header = "";
			var count = 0;
			var sGuid = "";
			
			$("body").data("numEnvios", iNumEnvios);
			var step = addStepProgressBar();
			$("#progress1").css({width:(step +"%")});
			$("#progress1").text(step +"% Declaración PDT");
			iNumEnviosTotal = iNumEnvios;
			while(count < iNumEnvios){
				count++;
				var tamBloqueEnvio = 0;
				if(tamTotalArchivo > (TAMANIO_MAX_BLOQUE_ENVIO - TAMANIO_HEADER)){
					tamBloqueEnvio = TAMANIO_MAX_BLOQUE_ENVIO;
					tamTotalArchivo -= (TAMANIO_MAX_BLOQUE_ENVIO - TAMANIO_HEADER);
				}
				else {
					tamBloqueEnvio = tamTotalArchivo + TAMANIO_HEADER;
					tamTotalArchivo = 0;
				}
				var arrData = new Int8Array(tamBloqueEnvio);
				for(var i = TAMANIO_HEADER; i < tamBloqueEnvio; i++){
					arrData[i] = rowData[tamTotalEnviado + (i - TAMANIO_HEADER)];
				}
				
				$("body").data("Envio_" + count, arrData);
				console.log("pre-carga: " + count + " - " + (tamBloqueEnvio - TAMANIO_HEADER) + " bytes");
				$("body").data("BytesEnvio_" + count, (tamBloqueEnvio - TAMANIO_HEADER));
				$("body").data("EstadoEnvio_" + count, 0);
				tamTotalEnviado += (tamBloqueEnvio - TAMANIO_HEADER);
			}
			// Se ejecuta primer envío para poder obtener el GUID:
			arrData = new Int8Array($("body").data("Envio_1"));
			header = '{"filename":"' + filename + '","size":"' + size + '","numenvio":"' + 1 + '","total":"' + iNumEnvios + '","guid":"' + sGuid + '","hash":"' + hashFile  + '","numform":"' + sNumForm + '","periodo":"' + sPeriodo +  '"}';
			
			$("body").data("header_base1", '{"filename":"' + filename + '","size":"' + size + '","numenvio":"');
			$("body").data("header_base2", '","total":"' + iNumEnvios + '","guid":"');
			$("body").data("header_base3", '"}');
			var step = addStepProgressBar();
			$("#progress1").css({width:(step +"%")});
			$("#progress1").text(step +"% Declaración PDT");
			//console.log("header: " + header);
			for(var i = 0; i < TAMANIO_HEADER; i++){
				if(i < header.length) {
					arrData[i] = header.charCodeAt(i);
				}
				else {
					arrData[i] = 0;
				}
			}
			var xhr = new XMLHttpRequest();
			xhr.onload = function () {
				iNumEnviosAcum++;
				Response = xhr.responseText; 
				// Se obtiene GUID
				$("body").data("Envio_guid", Response);
				$("body").data("EstadoEnvio_" + 1, 1);
				console.log("Se procede a enviar la Data Pendiente");
				enviaDataPendiente();
			};
			xhr.ontimeout = function (e) {
				Response = "";
				console.log("timeout");
			};
			xhr.open('POST', URL_UPLOAD_CHUNKED_SERVICE, true);
			
			//xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8080");
			xhr.setRequestHeader("Content-Type", "application/octet-stream");
			xhr.setRequestHeader(tokenKeyAuth, tokenValueAuth);
			xhr.setRequestHeader(IdFormulario, valIdFormulario);
			//xhr.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean); // completar luego
			xhr.send(arrData);
		}
	}
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que envía archivo de tamaño mayor a 500KB al Servidor para ser almacenado en el FS de Trabajo }
	 */
	function enviaDataPendiente(){
		
		var TAMANIO_HEADER = 1024;
		var iNumEnvios = $("body").data("numEnvios");
		var guid = $("body").data("Envio_guid");
		var hashFile = $("body").data("hashFile");
		var sNumForm = $("body").data("NumForm");
		var sPeriodo = $("body").data("Periodo");
		console.log("numEnvios=" + iNumEnvios);
		for(var k = 2; k <= iNumEnvios; k++){
			
			var arrData = new Int8Array($("body").data("Envio_" + k));
			var header = $("body").data("header_base1") + k + $("body").data("header_base2") + guid + '","hash":"' + hashFile + '","numform":"' + sNumForm + '","periodo":"' + sPeriodo + $("body").data("header_base3");
			
			for(var i = 0; i < TAMANIO_HEADER; i++){
				if(i < header.length) {
					arrData[i] = header.charCodeAt(i);
				}
				else {
					arrData[i] = 0;
				}
			}
			var xhr = new XMLHttpRequest();
			xhr.onload = function () {
				Response = xhr.responseText; 
				$("body").data("EstadoEnvio_" + k, 1);
				iNumEnviosAcum++;
				var step = addStepProgressBar();
				$("#progress1").css({width:(step +"%")});
				$("#progress1").text(step +"% Declaración PDT");
				if(iNumEnviosAcum == iNumEnviosTotal){
					$("#progress1").css({width:"100%"});
					$("#progress1").text("100% Declaración PDT");
					
					var Listo = document.getElementById("Listo");
					Listo.disabled = false;
					console.log("Response3 = " + Response);
					$("body").data("Response", Response);
					enviarPDT();
					
				}
			};
			xhr.ontimeout = function (e) {
				Response = "";
				$("body").data("EstadoEnvio_" + k, 2);
				console.log("timeout");
			};
			xhr.open('POST', URL_UPLOAD_CHUNKED_SERVICE, true);
			// Verificar:
			xhr.timeout = 20000; // time in milliseconds
			// Se sugiere otro mecanismo por ejemplo:
			//    Realizar envíos en grupos de 10 en 10
			//    Si iNumEnvios > 10 entonces
			//    El envío 1 desencadene el envío 11, el 2 desencadene el 12... etc
			//       Validar casos en que archivos sean mucho mayores.
			// Esto pues se detecta problema con los envíos 12 y 13 (en ejemplo realizado)
			
			
			//xhr.setRequestHeader("Access-Control-Allow-Origin", "http://localhost:8080");
			xhr.setRequestHeader("Content-Type", "application/octet-stream");
			xhr.setRequestHeader(tokenKeyAuth, tokenValueAuth);
			xhr.setRequestHeader(IdFormulario, valIdFormulario);
			//xhr.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean); // completar luego
			xhr.send(arrData);
			console.log("Enviando: " + k);
		}
	}
	
	/**
	 * @autor: BTG [11/10/2016]
	 * @descripción: { Método que envía trama JSON a la Bandeja }
	 */
	function enviarPDT(){
		// Si envío es correcto, se procede a agregar a la Bandeja, se modifica JSON para agregar valor real de numCargaPdt
		var Respuesta = $("body").data("Response");
		console.log("Respuesta = " + Respuesta);
		var response = JSON.parse(Respuesta);
		var numCargaPdt = response["codGenerado"];
		console.log("numCargaPdt = " + numCargaPdt);
		var jsonResult = $("body").data("jsonResult");
		var jsonRes = JSON.parse(jsonResult);
		
		jsonRes["t7788cargapdt"].numCargaPdt = numCargaPdt;
		jsonResult = JSON.stringify(jsonRes);
		console.log("EnviarPDT: " + jsonResult);
		//comunBandeja.addKeyInStorage(jsonResult);
		// Se calcula Hash para asegurar integridad de contenido JSON
		//$("body").data("hashFile", calculaHash(jsonResult));
		$("body").data("jsonResult", jsonResult);
		
		
		//window.parent.postMessage($("body").data("jsonResult"), "*");
		var enviarPDT = document.getElementById("Enviar-pdt");
		enviarPDT.disabled = true;
	}
	
	/**
	 * @autor: BTG [05/09/2016]
	 * @descripción: { Método que permite desencriptar, a partir de objetos HTML }
	 * @tipoProcesoZip: Indicador de tipo de Archivo a procesar
	 */
	var unzip = (function(NombreArchivo) {
		var file1 = $("body").data(NombreArchivo);
		// Se convierte a Blob:
		var data = new Blob([file1], {type: 'application/octet-stream'});
		model.getEntries(data, function(entries) {
			if (entries.length) {
				// Se asume que contiene sólo 1 archivo a ser descomprimido
				entries[0].getData(new zip.BlobWriter("application/octet-stream"), function(text) {
					var cargaArchivo = new FileReader();
					cargaArchivo.onload = function(e) {
						$("body").data(NombreArchivo, e.target.result);
						//console.log(NombreArchivo);
						//console.log($("body").data(NombreArchivo));
						if(NombreArchivo.indexOf(".CAB") > 0) {
							$("body").data("CAB_FlatFile", $("body").data(NombreArchivo));
						}
						if(NombreArchivo.indexOf(".DET") > 0) {
							$("body").data("DET_FlatFile", $("body").data(NombreArchivo));
						}
						if(NombreArchivo.indexOf(".CON") > 0) {
							$("body").data("CON_FlatFile", $("body").data(NombreArchivo));
						}
						var x = $("body").data("NumProcesados");
						x++;
						$("body").data("NumProcesados", x);
						// Si es el último archivo en procesarse:
							
						if($("body").data("NumProcesados") == $("body").data("TotalArchivos")) {
							VerificaAnexasControl();
						}
					};
					cargaArchivo.onerror = function(e) {
						onerror(e.target.error.name);
						limpiaDataTemporal();
					};
					cargaArchivo.readAsBinaryString(text);
				}, function(current, total) {
						// onprogress callback
			  });
			}
		});
	});
	
	
	
	
	//*******************************************************************************************************
	// Sección donde se define comportamiento inicial de objeto FILE (Al seleccionar archivo ZIP - PDT)
	//*******************************************************************************************************




	
	var fileInput = document.getElementById("file");
	var creationMethodInput = 'File'; 
	console.log("ZIP_BASE...");
  
  fileInput.addEventListener('click', function(){
    console.log("ingreso a click");
    $("#nameFile").val("");
  });
	
	fileInput.addEventListener('change', function() {
    console.log("ingreso a change");
    //$("#myAlert").replaceWith("");
		inicializaTimer("proceso_unzip");
		inicializaTimer("proceso_total");
    document.getElementById("img").style.visibility="hidden";
    $("#myAlert").text("");
    
    $("#myAlert2").css("display", "none");
		// ***********************************************************************************************
		// Se procesa el archivo .ZIP inicial, a efecto de ser ejecutado el Upload hacia el servidor.
		// Carga el archivo y lo deja disponible en memoria
		
    //$("#myAlert").css("display", "none");
		var file = fileInput.files[0];
    var pdtname = file.name;
    
    $("#nameFile").val(pdtname);
    
	  var vfile = /^((\w+)((\w+.zip)|(\w+.ZIP)))$/;
    
    if(!vfile.test(pdtname)){
      onerror("Sr. Contribuyente verifique el nombre del archivo, no debe tener espacios en blanco, ni caracteres extraños y debe tener solo una extensión .ZIP");
      return;
    }
    vfile = /^(06|07)/;
    if(!vfile.test(pdtname)){
      onerror("Sr. Contribuyente los archivos no fueron generados por el PDT. El archivo no ha sido generado por el PDT o ha sido alterado. Genere el PDT nuevamente, e intente otra vez");
      return;
    }

    if(file.size <= 0){
      onerror("Sr. Contribuyente el archivo no tiene ninguna declaración o ha sido alterado. Genere el PDT nuevamente e intente otra vez");
      return;
    }
    if(pdtname.length>60){
      onerror("Sr. Contribuyente falta algún archivo o el tamaño no corresponde al generado por el programa de captura del PDT");
      return;
    }
    
    
    fileInput.disabled = true;
    
		$("body").data("sizeFile", file.size);
		var cargaArchivoZip = new FileReader();
		cargaArchivoZip.onload = function(e) {
			$("body").data("dataFile", e.target.result);
			$("body").data("filename", file.name);
		};
		cargaArchivoZip.onerror = function(e) {
			onerror(e.target.error.name);
		};
		cargaArchivoZip.readAsBinaryString(file);
		// ***********************************************************************************************

		var xhr1 = new XMLHttpRequest();
		var sNomArchivo = file.name;
		xhr1.onload = function () {
			Response = xhr1.responseText; 
			if(Response.length != 32 || isNaN(Response)) {
				limpiaDataTemporal();
				onerror("Sr. Contribuyente ha ocurrido un error al procesar la declaración. Por favor intente nuevamente");
				return;
			}
			$("body").data("key", Response);
			model.getEntries(file, function(entries) {
				if (entries.length) {
				  var i = 0;
					
					key = $("body").data("key");
					// Se transforma el String a Bytes (Array)
					arrKey = hexToBytes(key);
					$("body").data("arrKey", arrKey);
					console.log("iniciando...");
					
				    $("body").data("LST_Files", "");
					$("body").data("procesados", 0);
					// Se procede a Desencriptar la entrada seleccionada (archivo)
					function getData(j) {
						entries[j].getData(new zip.BlobWriter("application/octet-stream"), function(text) {
								//console.log($("body").data("FileName_" + j));
								$("body").data($("body").data("FileName_" + j), text);
								
								desencriptaArchivoContenido($("body").data("FileName_" + j));
							}, function(current, total) {
							// onprogress callback
						});
					}
					$("body").data("NumProcesados", 0);
					if($("body").data("sizeFile") <  SIZE_MAX ) {
						$("body").data("TotalArchivos", entries.length);
						while(i<entries.length){
							// Se obtiene el nombre del archivo (contiene ruta relativa, por ejemplo: "SUNATPDT/tmp/xxxxx":
              if(entries[i].filename.substring(0,4) == "0601"){
                var sNomArchivo2 = entries[i].filename;
              }else{
                var sNomArchivo2 = entries[i].filename.substring(13);
              }
							var lstFiles = $("body").data("LST_Files");
							lstFiles = lstFiles + "|" + sNomArchivo2;
							$("body").data("LST_Files", lstFiles);
							$("body").data("FileName_" + i, sNomArchivo2);
              if(sNomArchivo2 == ""){
                onerror("Sr. Contribuyente falta algún archivo o el tamaño no corresponde al generado por el programa de captura del PDT");
                return;
              }
              if(sNomArchivo2.substring(0,10) != sNomArchivo.substring(0,10)){
                onerror("Sr. Contribuyente falta algún archivo o el tamaño no corresponde al generado por el programa de captura del PDT");
                return;
              } 
							getData(i);
							i++;
						}
					}
					else {
						$("body").data("TotalArchivos", 3);
						while(i<entries.length){
							var iCount = 0;
							// Se obtiene el nombre del archivo (contiene ruta relativa, por ejemplo: "SUNATPDT/tmp/xxxxx":
              console.log("archivo nombre "+entries[i].filename);
              if(entries[i].filename.substring(0,4) == "0601"){
                var sNomArchivo2 = entries[i].filename;
              }else{
                var sNomArchivo2 = entries[i].filename.substring(13);
              }
							/*var lstFiles = $("body").data("LST_Files");
							lstFiles = lstFiles + "|" + sNomArchivo;
							$("body").data("LST_Files", lstFiles); */
							if(sNomArchivo2 == ""){
                onerror("Sr. Contribuyente falta algún archivo o el tamaño no corresponde al generado por el programa de captura del PDT");
                return;
              }
              if(sNomArchivo2.substring(0,10) != sNomArchivo.substring(0,10)){
                onerror("Sr. Contribuyente falta algún archivo o el tamaño no corresponde al generado por el programa de captura del PDT");
                return;
              }
							if(sNomArchivo2.indexOf(".CAB") > 0 || sNomArchivo2.indexOf(".DET") > 0 || sNomArchivo2.indexOf(".CON") > 0 ) {
								iCount++;
                var lstFiles = $("body").data("LST_Files");
							  lstFiles = lstFiles + "|" + sNomArchivo2;
							  $("body").data("LST_Files", lstFiles);
                
								$("body").data("FileName_" + i, sNomArchivo2);
								getData(i);
							} 
							i++;
						}
					}
				}else{
          onerror("Sr. Contribuyente falta algún archivo o el tamaño no corresponde al generado por el programa de captura del PDT");
          return;
        }
			});
			
		};
		
		xhr1.ontimeout = function (e) {
			Response = "";
			console.log("timeout");
		};
		$("body").data("NomArchBase", sNomArchBase);
    console.log("nombre archivo antes de obtener key: "+sNomArchivo.substring(11,56));
    var sNomArchivo3 = sNomArchivo.substring(11,56);
		xhr1.open('GET', URL_GET_KEY_SERVICE + sNomArchivo3, true);
		
		xhr1.setRequestHeader("Content-Type", "application/JSON");
		xhr1.setRequestHeader(tokenKeyAuth, tokenValueAuth);
		xhr1.setRequestHeader(IdFormulario, valIdFormulario);
		//xhr1.setRequestHeader(tokenKeyUsuarioBean, tokenValueUsuarioBean); // completar luego
		xhr1.send();
	}, false);
	
	
	
	
	
	
	document.getElementById("img").style.visibility="hidden";
	document.getElementById("spanimagen").style.visibility="show";
	
	// Primera Ejecución (variable tipoProcesoZip = ZIP_BASE)
	//unzip("ZIP_BASE");
})(this);
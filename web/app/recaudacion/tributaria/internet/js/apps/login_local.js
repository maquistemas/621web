//Gestor de sesiones
 /*
 **************************************************************************************************************************
 */
 
 
    _post = function (path, params, method, target) {
        method = method || "post"; // Set method to post by default if not specified.

        // The rest of this code assumes you are not using a library.
        // It can be made less wordy if you use one.
        var form = document.createElement("form");
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("target", "_self");
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                var hiddenField = document.createElement("input");
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }
        }

        document.body.appendChild(form);
        form.submit();
    }



    _authWebLocal = function (login, clave, target) {
		var URL_SERVLET_ACCESO = 'http://internet.qa.pu.sunat.gob.pe/servletAcceso';
		//_post(url, target);
        _post(URL_SERVLET_ACCESO, {"plataforma":"desktop", "rucUsuario": login, "password": clave, "tipoOperacion":4,"idFormulario":"01","recurso":"/plataformaUnica"}, target);
    }
	
 
function AutenticarValido() {

	 //var URL_GESTOR_SESIONES = 'http://192.168.1.159/v1/gestor-sesiones/cache';
	 var URL_SERVLET_ACCESO = '    http://internet.qa.pu.sunat.gob.pe/servletAcceso';
	 
	 console.log("Ingresar al Gestor de Sesion");
	 var numRUC = document.getElementById("txtRuc").value;
	 var usuarioSOL = document.getElementById("txtUsuario").value;
	 var passwordSOL = document.getElementById("txtContrasena").value;
	 

	 console.log("Numero de RUC: " + numRUC);
	 console.log("Usuario SOL: "+ usuarioSOL);
	 

	 //var timbre = getTimbre(numRUC) ;
	 var xhr = new XMLHttpRequest();

	 xhr.onload = function () {

		 Response = xhr.responseText;
		 $("body").data("resultado", Response);

		 console.log("Codigo status: " + xhr.status);
		 console.log("Mensaje status: " + xhr.responseText);

		 if(xhr.status == 200){
			ProcesarAutenticacion();
		 }else{
			 console.log("Se produjo Error en Gestor de Sesiones.");
			 $('#modalErrorSinServicio').modal('show');
		 }
		 console.log("Fin de consultar Gestor de Sesion");

	 };

	 xhr.ontimeout = function (e) {
	 Response = "";
	 console.log("timeout");
	 };

	 

	 //xhr.open('GET', URL_SERVLET_ACCESO, true);
	 xhr.open('GET', "http://internet.qa.pu.sunat.gob.pe/servletAcceso?plataforma=desktop&rucUsuario=20100113610N769&password=12345678&tipoOperacion=4&idFormulario=01&recurso=/plataformaUnica", true);

	 xhr.setRequestHeader("Content-Type", "application/json");
	 /*
	 xhr.setRequestHeader("secretKey", "passw0rd");
	 xhr.setRequestHeader("clientId", "plataforma.sunat.peru.oauthclientprofile");
	 xhr.setRequestHeader("user", "MenuSol");
	 xhr.setRequestHeader("userKey", "Passw0rdUsr");
	 xhr.setRequestHeader("scope", "/getToken");
	*/
	// Temporalmente se genera token como si fuera Desktop
	console.log("Enviando...");

	// xhr.send({"plataforma":"desktop", "rucUsuario": numRUC + usuarioSOL, "password": passwordSOL, "tipoOperacion":4,"idFormulario":"01","recurso":"/plataformaUnica"});
	xhr.send();
	 xhr.onerror = function(){
		 console.log("Codigo status: " + xhr.status);
		 console.log("Mensaje status: " + xhr.responseText);
		 console.log("Se produjo Error en Gestor de Sesiones.");
		 $('#modalErrorSinServicio').modal('show');
	 }
 
 }


 function ProcesarAutenticacion() {
	 var jsonResultado = $("body").data("resultado");

	 console.log("ProcesarAutenticacion: " + jsonResultado);

	 if(jsonResultado.length > 0 && jsonResultado.indexOf("codigo") > 0) {
		 var obj = $.parseJSON(jsonResultado);
		 if(obj["codigo"] == "200") {
			 var jsonDato = obj["dato"];
			 var token = jsonDato.token;
			 sessionStorage.setItem('token', "");
			 sessionStorage.setItem('token', token);
			 console.log("Token generado: " + token);
			 //location.href="index.html";
			 console.log("Se ejecuto con exito el Gestor de Sesiones.");
		 }
		 else { // hubo un error.
			 console.log("Error controlado al generar Token.")
			 $('#modalErrorSinServicio').modal('show');
		 }
	 }
	 else { // error en retorno de invocaciOn de generaciOn de token.
	 console.log("Error no controlado al generar Token.")
	 }


 }
function Ingresar1() {
	var token = document.getElementById("idCache").value;
	console.log("AutenticarValido..." + token);
	
	location.href="index2.html?token=" + token;
}	
function IngresarOld() {
	console.log("AutenticarValido...");
	//AutenticarValido();
	var numRUC = document.getElementById("txtRuc").value;
	 var usuarioSOL = document.getElementById("txtUsuario").value;
	 var passwordSOL = document.getElementById("txtContrasena").value;
	 
	 url = "http://internet.qa.pu.sunat.gob.pe/servletAcceso?plataforma=desktop&rucUsuario=" + numRUC + usuarioSOL + "&password=" + passwordSOL + "&tipoOperacion=4&idFormulario=01&recurso=/plataformaUnica";
	alert(url);
	//_authWebLocal(numRUC + usuarioSOL, passwordSOL, "auth");
	document.getElementById('auth').src = url;

}


function procesaContenido(strContenido){
	console.log("Contenido: " + strContenido);
	
}

$(document).ready(function() {
    sessionStorage.clear();

    iniciaVariables();
    //obtieneDominio();
    inciaBotones();
    //verificaFails();
    txtRuc.focus();
    console.log("Se cargo a la pagina del Login");

});

window.onunload = function(){
    //console.log("Se esta recargando la pagina del Login con reload");

};
window.onbeforeunload = function() {
    //Se ejecuta cuando se presiona un boton back y reload
    //console.log("Se esta abandonando la pagina del Login");
    //clean();
    return undefined;
    //return "Cerrando sesi�n";
};

function login(){
    if ( !esrucok( txtRuc.val() ) ){
        alerta("Debe ingresar un Nro. de RUC correcto, posiblemente el campo este vac&#237;o o el RUC no es vAlido.");
        txtRuc.focus();
        return false;
    }else if ( esnulo( txtUsuario.val() ) || !longitudcorrecta( txtUsuario.val() , 8) ){
        alerta("Debe ingresar un usuario, posiblemente el campo esta vacIo o no cumple con el m&#237;nimo de ocho (8) caracteres.");
        txtUsuario.focus();
        return false;
    }else if ( esnulo( txtContrasena.val() ) || !eslongcontrasenhaok( txtContrasena.val() )){
        alerta("Clave incorrecta, posiblemente el campo esta vacIo o no cumple con el m&#237;nimo de seis (6) caracteres.");
        txtContrasena.focus();
        return false;
    }else{

        return true;
    }
    /*if ( captcha && (esnulo( txtCaptcha.val() ) || txtCaptcha.val().length<4) ){
     alerta("Ingrese el valor que aparece en la imagen");
     txtCaptcha.focus();
     return;
     }*/

    //$("#username").val(txtRuc.val() + txtUsuario.val());
    //$("#password").val(txtContrasena.val());
    /*if(captcha){
     $("#captcha").val(txtCaptcha.val());
     }*/

    //alertaReinicia();
    //document.formauth.submit();
}
function alerta(texto){
    spanMensajeError.html(texto);
    divMensajeError.removeClass("hidden");
}
/* function alertaReinicia(){
 spanMensajeError.html("");
 divMensajeError.addClass("hidden");
 }*/
function onPressEnter(myfield,e){
    var keycode;
    if (window.event) keycode = window.event.keyCode;else if (e) keycode = e.which;else return true;
    if (keycode == 13){

        var resLogin=login();
        console.log("Devolvio del Login " + resLogin);
        if(resLogin == true){
            console.log("Paso la restriccion de ingreso")
            Ingresar();
        }
        event.preventDefault();
        event.stopPropagation();
        txtRuc.focus();
        return false;

    }  else return true;
}
//Utiles
function trim(cadena){
    cadena2 = "";
    len = cadena.length;
    for ( var i=0; i <= len ; i++ ) if ( cadena.charAt(i) != " " ){cadena2+=cadena.charAt(i); }
    return cadena2;
}
function esnulo(campo){ return (campo == null||campo=="");}
function esnumero(campo){ return (!(isNaN( campo )));}
function eslongrucok(ruc){return ( ruc.length == 11 );}
function esrucok(ruc){
    return (!( esnulo(ruc) || !esnumero(ruc) || !eslongrucok(ruc) /*|| !valruc(ruc)*/ ));
}
/*     function valruc(valor){
 valor = trim(valor);
 if ( esnumero( valor ) ) {
 if ( valor.length == 8 ){
 suma = 0;
 for (i=0; i<valor.length-1;i++){
 digito = valor.charAt(i) - '0';
 if ( i==0 ) suma += (digito*2)
 else suma += (digito*(valor.length-i))
 }
 resto = suma % 11;
 if ( resto == 1) resto = 11;
 if ( resto + ( valor.charAt( valor.length-1 ) - '0' ) == 11 ){
 return true;
 }
 } else if ( valor.length == 11 ){
 suma = 0;
 x = 6;
 for (i=0; i<valor.length-1;i++){
 if ( i == 4 ) x = 8
 digito = valor.charAt(i) - '0';
 x--;
 if ( i==0 ) suma += (digito*x)
 else suma += (digito*x)
 }
 resto = suma % 11;
 resto = 11 - resto;

 if ( resto >= 10) resto = resto - 10;
 if ( resto == valor.charAt( valor.length-1 ) - '0' ){
 return true;
 }
 }
 }
 return false;
 }*/


function longitudcorrecta( campo, len ){
    if ( campo != null ) return ( campo.length == len );
    else return false;
}
function eslongcontrasenhaok(contrasenha){
    return (contrasenha.length >= 6);
}

//Inicia botones y variables
function iniciaVariables(){
    txtRuc=$("#txtRuc");
    txtUsuario=$("#txtUsuario");
    txtContrasena=$("#txtContrasena");
    btnAceptar=$("#btnAceptar");
    divFails=$("#divFails");
    divMensajeError=$("#divMensajeError");
    spanMensajeError=$("#spanMensajeError");
}

function inciaBotones(){
    btnAceptar.bind('click',function(event){
        var resLogin = login();
        if(resLogin == true){
            console.log("Los datos ingresados cumplen la restricciOn: " + resLogin);
            Ingresar();
        }else{
            console.log("Los datos ingresados no cumplen la restricciOn: " + resLogin);
        }
        event.preventDefault();
        event.stopPropagation();
        return false;
    });
}



var txtRuc=null;
var txtUsuario=null;
var txtContrasena=null;
var txtCaptcha=null;
var btnAceptar=null;
var divFails=null;
var divMensajeError=null;
var spanMensajeError=null;

var request1=null;
var request2=null;
var captcha = false;


function convertir_ymd_To_dmy(ymd){
    var datearray = ymd.split("-");
    var newdate =  datearray[2] + '-' +  datearray[1] + '-' +  datearray[0];
    return newdate;
}

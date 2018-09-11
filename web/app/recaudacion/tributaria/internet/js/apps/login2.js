//Gestor de sesiones
/*  function Ingresar() {

 var URL_GESTOR_SESIONES = 'http://192.168.1.159/gestor-sesiones/api/v1/token';

 console.log("Ingresar al Gestor de Sesion");
 //var numRUC = $("#ruc").text();// document.getElementById("ruc").value;
 //var numRUC = $("#txtRuc").text();
 var numRUC = document.getElementById("txtRuc").value;

 //var usuarioSOL = $("#usuario").text();//document.getElementById("usuario").value;
 //var usuarioSOL = $("#txtUsuario").text();
 var usuarioSOL = document.getElementById("txtUsuario").value;

 console.log("Numero de RUC: " + numRUC);
 console.log("Usuario SOL: "+ usuarioSOL);


 //Se simula la invocaciOn a servicio que realiza la autenticaciOn y retorna el usuarioBean:

 var timbre = "{ \"id\": \"12345678\", \"ticket\": \"12345678\", \"correo\":\"prueba@hotmail.com\", \"nombres\":\"Juan\", \"apePaterno\":\"Perez\", \"apeMaterno\":\"Castillo\", \"nombreCompleto\":\"Juan Perez Castillo\", \"codUO\":\"000\", \"codCate\":\"000\", \"numRUC\":\"" + numRUC +"\", \"usuarioSOL\":\"" + usuarioSOL + "\", \"codDepend\":\"PRICO\", \"idCelular\":\"999444443\"}";

 var xhr = new XMLHttpRequest();

 xhr.onload = function () {

 Response = xhr.responseText;
 //console.log("Response Text: "Response);
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


 xhr.open('POST', URL_GESTOR_SESIONES, true);

 xhr.setRequestHeader("Content-Type", "application/json");
 xhr.setRequestHeader("appKey", "passw0rd");
 xhr.setRequestHeader("appId", "plataforma.sunat.peru.oauthclientprofile");
 xhr.setRequestHeader("user", "MenuSol");
 xhr.setRequestHeader("userKey", "Passw0rdUsr");
 xhr.setRequestHeader("scope", "/getToken");
 xhr.send(timbre);

 xhr.onerror = function(){
 console.log("Codigo status: " + xhr.status);
 console.log("Mensaje status: " + xhr.responseText);
 console.log("Se produjo Error en Gestor de Sesiones.");
 $('#modalErrorSinServicio').modal('show');
 }
 //    xhr.upload.onerror = function(){
 //      console.log("error upload status " + xhr.status)
 //      console.log("Se produjo Error en Gestor de Sesiones.");
 //      $('#modalErrorSinServicio').modal('show');
 }


 }

 function ProcesarAutenticacion() {
 var jsonResultado = $("body").data("resultado");
 //var jsonResultado = "{\"codigo\":200, \"mensaje\":\"OK\", \"dato\":{\"token\":\"TOKEN123\", \"vigencia\":1476919258871, \"estado\":\"VIGENTE\", \"alcance\":\"/getToken\", \"refreshToken\":\"REFRESH123\", \"tokenType\": \"tokenType\"}, \"errores\": {\"errores\": [0]}}";

 console.log("ProcesarAutenticacion: " + jsonResultado);
 //location.href="index.html";
 //window.location.assign("/index.html")

 if(jsonResultado.length > 0 && jsonResultado.indexOf("codigo") > 0) {
 //alert(jsonResultado);
 var obj = $.parseJSON(jsonResultado);
 if(obj["codigo"] == "200") {
 var jsonDato = obj["dato"];
 var token = jsonDato.token;
 sessionStorage.setItem('token', "");
 sessionStorage.setItem('token', token);
 console.log("Token generado: " + token);
 location.href="index.html";
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
 */

function Ingresar() {

    inicializaUsuarioBean();

    console.log("Inicio a consultar del Gestor de Sesion");
    //var numRUC = $("#ruc").text();// document.getElementById("ruc").value;
    var numRUC = $('#txtRuc').val();
    //var numRUC = document.getElementById("txtRuc").value;

    //var usuarioSOL = $("#usuario").text();//document.getElementById("usuario").value;
    var usuarioSOL = $('#txtUsuario').val();
    //var usuarioSOL = document.getElementById("txtUsuario").value;

    console.log("Numero de RUC: " + numRUC);
    console.log("Usuario SOL: "+ usuarioSOL);

    var arregloRUC = ["20334766714", "20391323381", "20414766308", "20504126103", "20510205376", "20522547957", "20600016211", "10214184473", "20100008239", "20100066603", "20100087945", "20100114187", "20100128218", "10214184473", "20100002621", "20100004322", "20100007348", "20100008239", "20100035121", "20100046084"];
    var encontradoRUC = false;

    var timbre = sessionStorage.getItem("RUC_" + numRUC);
    console.log("Timbre:" + timbre);
    if(timbre == null || timbre == "") {
        numRUC = "20100049181";
        console.log("RUC asignado por defecto ya que no se encontro en Lista predefinida: " + numRUC);
        timbre = sessionStorage.getItem("RUC_" + numRUC);
        console.log("Timbre2:" + timbre);
    }
    else
    {
        timbre = sessionStorage.getItem("RUC_" + numRUC);

    }
    encontradoRUC = true;
    sessionStorage.setItem("RUC_Login", numRUC);

    /*******
     //  var i = 0;

     console.log("Cantidades de RUC : " + arregloRUC.length);

     for (var ele in arregloRUC) {
      console.log("RUCs asociados: " + arregloRUC);
      if( arregloRUC[ele] == numRUC ){
          console.log("RUC encontrado en arreglo: " + numRUC);
          numRUC = arregloRUC[ele];
          encontradoRUC = true;break;
      }
    }

     if(encontradoRUC == false){
      numRUC = "20334766714";
      console.log("RUC asignado por defecto ya que no se encontro en arreglo: " + numRUC);

    }
     ******/


    /*
     while (i < arregloRUC.length) {
     console.log("RUC asociado: " + arregloRUC[i]);

     if( arregloRUC[i] == numRUC){
     encontradoRUC = true;break;
     }
     i++;

     }*/

//    if(encontradoRUC == true){

    //Se simula la invocaciOn a servicio que realiza la autenticaciOn y retorna el usuarioBean:
    ///////// ******* var timbre = "{ \"id\": \"12345678\", \"ticket\": \"12345678\", \"correo\":\"prueba@hotmail.com\", \"nombres\":\"Juan\", \"apePaterno\":\"Perez\", \"apeMaterno\":\"Castillo\", \"nombreCompleto\":\"Juan Perez Castillo\", \"codUO\":\"000\", \"codCate\":\"000\", \"numRUC\":\"" + numRUC +"\", \"usuarioSOL\":\"" + usuarioSOL + "\", \"codDepend\":\"PRICO\", \"idCelular\":\"999444443\"}";

    //timbre = timbre.replace(/"/g, '\\"');

    console.log("timbre3: " + timbre);


    // var responseGS = comunServiciosSesion.obtenerIdCache(timbre);
    //
    // if(responseGS != null && responseGS.codigo == 200){
    //
    //     var token = responseGS.dato.token;
    //     console.log("Token generado: " + token);
    //     sessionStorage.setItem('token', "");
    //     sessionStorage.setItem('token', token);
    //     console.log("Se ejecuto con exito el Gestor de Sesiones.");
    //     location.href="index.html";
    // }else{
    //       $('#modalErrorSinServicio').modal('show');
    // }

    var token = "bbFzdH6ieH-Nca0uZ9A2ckrM3a0icO_vdawvZ8_vdHwze9AWZ8w4BHo7BXwveICzck3QcH8da3kE8du4r1TTzNLzxPq.i9dhRefUAAxbvhB0PH8GS3xG98SLB7EC33k1eD4b5mXto0h0b5My89FlPT";
    sessionStorage.setItem('token', "");
    sessionStorage.setItem('token', token);
    location.href="index.html";
    console.log("Fin de consultar Gestor de Sesion");

    /*    }else{

     console.log("RUC no esta registrado en arreglo: " + numRUC);

     $('#modalErrorRUC').modal('show');

     }*/

}




/*
 function obtieneDominio(){
 try{
 $.ajax({
 url: '/a/dominio.txt',
 type: 'GET',
 cache: false,
 timeout: 25000,
 async:false,
 success: function (response) {
 dominio="https://"+response+".sunat.gob.pe";
 subdominio=response;

 $("#aLinkOlvidaste").attr("href",dominio+"/ol-ti-itmantpregrespsec/MantPregResp.htm");
 },
 error: function (xhr, ajaxOptions, thrownError) {
 }
 });
 }catch(err){
 }
 }
 */

function inicializaUsuarioBean() {

    // Se inicializa data temporal preparada para pruebas:
    sessionStorage.setItem("RUC_15553732724", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"15553732724JLOAYZAE\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JUAN PABLO  \",\"apePaterno\":\"ZAMORA \",\"apeMaterno\":\"HERNANDEZ \",\"nombreCompleto\":\"ZAMORA HERNANDEZ JUAN PABLO  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"15553732724\",\"usuarioSOL\":\"JLOAYZAE\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20534223812", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20534223812CNEYRA  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"Vargas Francisco          \",\"apePaterno\":\"SAIS \",\"apeMaterno\":\"Villalta \",\"nombreCompleto\":\"SAIS Villalta Vargas Francisco          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20534223812\",\"usuarioSOL\":\"CNEYRA\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20523367243", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20523367243CNEYRA  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"HILDA       \",\"apePaterno\":\"GONZALES \",\"apeMaterno\":\"NAVARRO \",\"nombreCompleto\":\"GONZALES NAVARRO HILDA       \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20523367243\",\"usuarioSOL\":\"CNEYRA\",\"codDepend\":\"0231\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20405186145", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20405186145MSALAZA1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"VICTORIA YMELDA\",\"apePaterno\":\"MAMANI \",\"apeMaterno\":\"MOROCO \",\"nombreCompleto\":\"MAMANI MOROCO VICTORIA YMELDA\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20405186145\",\"usuarioSOL\":\"MSALAZA1\",\"codDepend\":\"0053\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10276664412", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10276664412RARROYO \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LEONCIO        \",\"apePaterno\":\"BARBOZA \",\"apeMaterno\":\"PEREZ \",\"nombreCompleto\":\"BARBOZA PEREZ LEONCIO        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10276664412\",\"usuarioSOL\":\"RARROYO\",\"codDepend\":\"0161\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10224259153", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10224259153CNEYRA  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"VICTOR EDUARDO          \",\"apePaterno\":\"ARZAPALO \",\"apeMaterno\":\"PAYANO \",\"nombreCompleto\":\"ARZAPALO PAYANO VICTOR EDUARDO          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10224259153\",\"usuarioSOL\":\"CNEYRA\",\"codDepend\":\"0231\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10194183491", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10194183491CNEYRA  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ERNESTO ISIDRO          \",\"apePaterno\":\"ACUNA \",\"apeMaterno\":\"DOMINGUEZ \",\"nombreCompleto\":\"ACUNA DOMINGUEZ ERNESTO ISIDRO          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10194183491\",\"usuarioSOL\":\"CNEYRA\",\"codDepend\":\"0231\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10229682488", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10229682488CNEYRA  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"EDILBERTO     \",\"apePaterno\":\"ACUNA \",\"apeMaterno\":\"TARRILLO \",\"nombreCompleto\":\"ACUNA TARRILLO EDILBERTO     \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10229682488\",\"usuarioSOL\":\"CNEYRA\",\"codDepend\":\"0231\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20117917194", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20117917194CNEYRA  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"EDINSON JAVIER \",\"apePaterno\":\"ACUNA \",\"apeMaterno\":\"HUACCHA \",\"nombreCompleto\":\"ACUNA HUACCHA EDINSON JAVIER \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20117917194\",\"usuarioSOL\":\"CNEYRA\",\"codDepend\":\"0231\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10403233353", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10403233353CNEYRA  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MILTON EDUARDO \",\"apePaterno\":\"ACUNA \",\"apeMaterno\":\"HUACCHA \",\"nombreCompleto\":\"ACUNA HUACCHA MILTON EDUARDO \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10403233353\",\"usuarioSOL\":\"CNEYRA\",\"codDepend\":\"0231\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10002206230", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10002206230REGPRI3 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MARCHAN MARIA SOLEDAD\",\"apePaterno\":\"RUIZ \",\"apeMaterno\":\"DE \",\"nombreCompleto\":\"RUIZ DE MARCHAN MARIA SOLEDAD\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10002206230\",\"usuarioSOL\":\"REGPRI3\",\"codDepend\":\"0081\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10004089770", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10004089770H4BAHECS\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JULIANA JUANA   \",\"apePaterno\":\"TORRES \",\"apeMaterno\":\"LAURA \",\"nombreCompleto\":\"TORRES LAURA JULIANA JUANA   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10004089770\",\"usuarioSOL\":\"H4BAHECS\",\"codDepend\":\"0111\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10004778729", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10004778729JORDONEZ\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"EDUARDO HENRY   \",\"apePaterno\":\"VARGAS \",\"apeMaterno\":\"LUQUE \",\"nombreCompleto\":\"VARGAS LUQUE EDUARDO HENRY   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10004778729\",\"usuarioSOL\":\"JORDONEZ\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10028719596", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10028719596GLOPEZV \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"FLOR DE MARIA\",\"apePaterno\":\"RISHING \",\"apeMaterno\":\"MENDOZA \",\"nombreCompleto\":\"RISHING MENDOZA FLOR DE MARIA\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10028719596\",\"usuarioSOL\":\"GLOPEZV\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10028918041", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10028918041NTOROC  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"TEODORO        \",\"apePaterno\":\"PALACIOS \",\"apeMaterno\":\"PENA \",\"nombreCompleto\":\"PALACIOS PENA TEODORO        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10028918041\",\"usuarioSOL\":\"NTOROC\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10033105181", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10033105181RERUMEP9\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LUIS EDUARDO      \",\"apePaterno\":\"MADRID \",\"apeMaterno\":\"PAZ \",\"nombreCompleto\":\"MADRID PAZ LUIS EDUARDO      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10033105181\",\"usuarioSOL\":\"RERUMEP9\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10035685257", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10035685257RERPF343\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CARLOS GILBERTO\",\"apePaterno\":\"VILLALTA \",\"apeMaterno\":\"VEGA \",\"nombreCompleto\":\"VILLALTA VEGA CARLOS GILBERTO\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10035685257\",\"usuarioSOL\":\"RERPF343\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10035788528", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10035788528RERUPRI1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JOSE WALTER\",\"apePaterno\":\"ZAPATA \",\"apeMaterno\":\"VALDIVIEZO \",\"nombreCompleto\":\"ZAPATA VALDIVIEZO JOSE WALTER\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10035788528\",\"usuarioSOL\":\"RERUPRI1\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10044162925", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10044162925GRRDKG3P\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DIMAS         \",\"apePaterno\":\"SALAS \",\"apeMaterno\":\"INFANTES \",\"nombreCompleto\":\"SALAS INFANTES DIMAS         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10044162925\",\"usuarioSOL\":\"GRRDKG3P\",\"codDepend\":\"0111\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10046233064", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10046233064REGPRI3 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ABRAN \",\"apePaterno\":\"LUNA \",\"apeMaterno\":\"MAMANI \",\"nombreCompleto\":\"LUNA MAMANI ABRAN \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10046233064\",\"usuarioSOL\":\"REGPRI3\",\"codDepend\":\"0111\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10060016670", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10060016670RECI0204\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"INES    \",\"apePaterno\":\"CASAHUAMAN \",\"apeMaterno\":\"IZAGUIRRE \",\"nombreCompleto\":\"CASAHUAMAN IZAGUIRRE INES    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10060016670\",\"usuarioSOL\":\"RECI0204\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10060488474", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10060488474CCQTPEYC\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"RONALD ROMULO\",\"apePaterno\":\"VENERO \",\"apeMaterno\":\"BOCANGEL \",\"nombreCompleto\":\"VENERO BOCANGEL RONALD ROMULO\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10060488474\",\"usuarioSOL\":\"CCQTPEYC\",\"codDepend\":\"0131\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10065569073", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10065569073SIDCOT08\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"FERNANDO RUBEN  \",\"apePaterno\":\"INGA \",\"apeMaterno\":\"CACERES \",\"nombreCompleto\":\"INGA CACERES FERNANDO RUBEN  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10065569073\",\"usuarioSOL\":\"SIDCOT08\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10068852884", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10068852884RERUF333\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SEGUNDO GERMAN         \",\"apePaterno\":\"LAZARO \",\"apeMaterno\":\"COLLANTES \",\"nombreCompleto\":\"LAZARO COLLANTES SEGUNDO GERMAN         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10068852884\",\"usuarioSOL\":\"RERUF333\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10072656631", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10072656631DARCE   \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ROBERTO IVAN    \",\"apePaterno\":\"MENA \",\"apeMaterno\":\"VILCHEZ \",\"nombreCompleto\":\"MENA VILCHEZ ROBERTO IVAN    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10072656631\",\"usuarioSOL\":\"DARCE\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10077117615", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10077117615JCGY5PB6\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"GILMER WILSON \",\"apePaterno\":\"HORNA \",\"apeMaterno\":\"CORRALES \",\"nombreCompleto\":\"HORNA CORRALES GILMER WILSON \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10077117615\",\"usuarioSOL\":\"JCGY5PB6\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10078108229", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10078108229RECIF302\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"HENRY NILS A.  \",\"apePaterno\":\"FINSETH \",\"apeMaterno\":\"SUITO \",\"nombreCompleto\":\"FINSETH SUITO HENRY NILS A.  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10078108229\",\"usuarioSOL\":\"RECIF302\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10078112251", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10078112251RECI1689\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"FERNANDO ANTONIO        \",\"apePaterno\":\"CORNEJO \",\"apeMaterno\":\"HERRERA \",\"nombreCompleto\":\"CORNEJO HERRERA FERNANDO ANTONIO        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10078112251\",\"usuarioSOL\":\"RECI1689\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10078292275", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10078292275RBARRON \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JUAN ANTONIO \",\"apePaterno\":\"GAINZA \",\"apeMaterno\":\"MORGANTE \",\"nombreCompleto\":\"GAINZA MORGANTE JUAN ANTONIO \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10078292275\",\"usuarioSOL\":\"RBARRON\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10079987765", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10079987765RECI1667\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"RICARDO MIGUEL TEIKO  \",\"apePaterno\":\"SHIROTA \",\"apeMaterno\":\"NISHIHIRA \",\"nombreCompleto\":\"SHIROTA NISHIHIRA RICARDO MIGUEL TEIKO  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10079987765\",\"usuarioSOL\":\"RECI1667\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10005127560", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10005127560MCANDIA \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"RICARDO        \",\"apePaterno\":\"LAURA \",\"apeMaterno\":\"ZEGARRA \",\"nombreCompleto\":\"LAURA ZEGARRA RICARDO        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10005127560\",\"usuarioSOL\":\"MCANDIA\",\"codDepend\":\"0093\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10008334477", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10008334477OPEROZ18\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"HUMBERTO     \",\"apePaterno\":\"GONZALES \",\"apeMaterno\":\"YDROGO \",\"nombreCompleto\":\"GONZALES YDROGO HUMBERTO     \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10008334477\",\"usuarioSOL\":\"OPEROZ18\",\"codDepend\":\"0183\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10011222043", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10011222043MVARGASR\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"NANCY AMPARITO         \",\"apePaterno\":\"SAAVEDRA \",\"apeMaterno\":\"RENGIFO \",\"nombreCompleto\":\"SAAVEDRA RENGIFO NANCY AMPARITO         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10011222043\",\"usuarioSOL\":\"MVARGASR\",\"codDepend\":\"0183\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10023076808", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10023076808MGUTIER1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CATIOSCA      \",\"apePaterno\":\"QUISPE \",\"apeMaterno\":\"ESPETIA \",\"nombreCompleto\":\"QUISPE ESPETIA CATIOSCA      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10023076808\",\"usuarioSOL\":\"MGUTIER1\",\"codDepend\":\"0093\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10035710189", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10035710189INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CORTEZ BRIGIDA      \",\"apePaterno\":\"ROMAN \",\"apeMaterno\":\"DE \",\"nombreCompleto\":\"ROMAN DE CORTEZ BRIGIDA      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10035710189\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0083\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10061343127", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10061343127MLLANOSG\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DORA AMELIA   \",\"apePaterno\":\"SANCHEZ \",\"apeMaterno\":\"RAFAEL \",\"nombreCompleto\":\"SANCHEZ RAFAEL DORA AMELIA   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10061343127\",\"usuarioSOL\":\"MLLANOSG\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10087289694", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10087289694INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LUIS EDUARDO   \",\"apePaterno\":\"CHERRES \",\"apeMaterno\":\"SORIA \",\"nombreCompleto\":\"CHERRES SORIA LUIS EDUARDO   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10087289694\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10107067201", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10107067201RAVILESM\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"RUTH EVELYN   \",\"apePaterno\":\"ESCOBEDO \",\"apeMaterno\":\"TAFUR \",\"nombreCompleto\":\"ESCOBEDO TAFUR RUTH EVELYN   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10107067201\",\"usuarioSOL\":\"RAVILESM\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10156373678", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10156373678RERMG104\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LLAVE DORIS ADELA  \",\"apePaterno\":\"ORTEGA \",\"apeMaterno\":\"DE \",\"nombreCompleto\":\"ORTEGA DE LLAVE DORIS ADELA  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10156373678\",\"usuarioSOL\":\"RERMG104\",\"codDepend\":\"0173\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10159824549", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10159824549INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CRUZ MIRTHA ESTHER          \",\"apePaterno\":\"NARIO \",\"apeMaterno\":\"SANTA \",\"nombreCompleto\":\"NARIO SANTA CRUZ MIRTHA ESTHER          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10159824549\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0173\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10165984396", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10165984396ASANCHE1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MARIA FRANCISCA       \",\"apePaterno\":\"ZAVALETA \",\"apeMaterno\":\"MARTINEZ \",\"nombreCompleto\":\"ZAVALETA MARTINEZ MARIA FRANCISCA       \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10165984396\",\"usuarioSOL\":\"ASANCHE1\",\"codDepend\":\"0233\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10215008733", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10215008733RERPF184\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JORGE ALBERTO   \",\"apePaterno\":\"RAMOS \",\"apeMaterno\":\"CORTEZ \",\"nombreCompleto\":\"RAMOS CORTEZ JORGE ALBERTO   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10215008733\",\"usuarioSOL\":\"RERPF184\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10218615215", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10218615215HBEDRINA\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JORGE EDUARDO    \",\"apePaterno\":\"MATTA \",\"apeMaterno\":\"DONGO \",\"nombreCompleto\":\"MATTA DONGO JORGE EDUARDO    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10218615215\",\"usuarioSOL\":\"HBEDRINA\",\"codDepend\":\"0103\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10222893742", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10222893742REGMEP3 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JOSE RODOLFO    \",\"apePaterno\":\"QUIROZ \",\"apeMaterno\":\"URETA \",\"nombreCompleto\":\"QUIROZ URETA JOSE RODOLFO    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10222893742\",\"usuarioSOL\":\"REGMEP3\",\"codDepend\":\"0103\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10304316476", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10304316476REGPRI2 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ENRIQUE CAMILO         \",\"apePaterno\":\"ESCALANTE \",\"apeMaterno\":\"ARENAS \",\"nombreCompleto\":\"ESCALANTE ARENAS ENRIQUE CAMILO         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10304316476\",\"usuarioSOL\":\"REGPRI2\",\"codDepend\":\"0053\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10408402374", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10408402374RERMG257\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MIGUEL FERNANDO  \",\"apePaterno\":\"MERA \",\"apeMaterno\":\"LOZANO \",\"nombreCompleto\":\"MERA LOZANO MIGUEL FERNANDO  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10408402374\",\"usuarioSOL\":\"RERMG257\",\"codDepend\":\"0183\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10427023791", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10427023791ASANCHE1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"HILDA GUSMILE \",\"apePaterno\":\"CALVO \",\"apeMaterno\":\"MONTANEZ \",\"nombreCompleto\":\"CALVO MONTANEZ HILDA GUSMILE \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10427023791\",\"usuarioSOL\":\"ASANCHE1\",\"codDepend\":\"0233\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100008239", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100008239GMONTES \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DE PETROLEO SAC\",\"apePaterno\":\"EMPRESA \",\"apeMaterno\":\"COMERCIALIZADORA \",\"nombreCompleto\":\"EMPRESA COMERCIALIZADORA DE PETROLEO SAC\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100008239\",\"usuarioSOL\":\"GMONTES\",\"codDepend\":\"0073\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100642361", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100642361RECI1668\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S A\",\"apePaterno\":\"LUBECA \",\"apeMaterno\":\"PERUANA \",\"nombreCompleto\":\"LUBECA PERUANA S A\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100642361\",\"usuarioSOL\":\"RECI1668\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101451471", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101451471AKBRLF3J\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SANTA CATALINA S\",\"apePaterno\":\"EMPRESA \",\"apeMaterno\":\"CINEMATOGRAFICA \",\"nombreCompleto\":\"EMPRESA CINEMATOGRAFICA SANTA CATALINA S\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101451471\",\"usuarioSOL\":\"AKBRLF3J\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10094240986", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10094240986RECIF772\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"NIVALDO     \",\"apePaterno\":\"ORTIZ \",\"apeMaterno\":\"TALAVERANO \",\"nombreCompleto\":\"ORTIZ TALAVERANO NIVALDO     \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10094240986\",\"usuarioSOL\":\"RECIF772\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100123763", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100123763REG0935 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"       \",\"apePaterno\":\"CETCO \",\"apeMaterno\":\"S.A. \",\"nombreCompleto\":\"CETCO S.A.        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100123763\",\"usuarioSOL\":\"REG0935\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101049397", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101049397RECI6069\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"R LTDA   \",\"apePaterno\":\"BLEXIM \",\"apeMaterno\":\"S \",\"nombreCompleto\":\"BLEXIM S R LTDA   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101049397\",\"usuarioSOL\":\"RECI6069\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101156631", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101156631RECOPR21\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"Y COMERC.S.A.C. \",\"apePaterno\":\"TRANSFORMADORA \",\"apeMaterno\":\"METALICA \",\"nombreCompleto\":\"TRANSFORMADORA METALICA Y COMERC.S.A.C. \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101156631\",\"usuarioSOL\":\"RECOPR21\",\"codDepend\":\"0021\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101425984", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101425984REGMEV0C\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"R L      \",\"apePaterno\":\"PERNOS \",\"apeMaterno\":\"S \",\"nombreCompleto\":\"PERNOS S R L      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101425984\",\"usuarioSOL\":\"REGMEV0C\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101945040", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101945040RECI1668\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"Y CRED PROMOCION TAHUANTINSUYO  \",\"apePaterno\":\"COOP \",\"apeMaterno\":\"AH \",\"nombreCompleto\":\"COOP AH Y CRED PROMOCION TAHUANTINSUYO  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101945040\",\"usuarioSOL\":\"RECI1668\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20102002297", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20102002297RECI5028\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ESMERALDA S.A.C.  \",\"apePaterno\":\"JOYERIA \",\"apeMaterno\":\"LA \",\"nombreCompleto\":\"JOYERIA LA ESMERALDA S.A.C.  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20102002297\",\"usuarioSOL\":\"RECI5028\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20131312955", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20131312955REG1630 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DE ADM. TRIBUTARIA\",\"apePaterno\":\"SUPERINTENDENCIA \",\"apeMaterno\":\"NAC. \",\"nombreCompleto\":\"SUPERINTENDENCIA NAC. DE ADM. TRIBUTARIA\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20131312955\",\"usuarioSOL\":\"REG1630\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20364404141", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20364404141INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S.A.C.      \",\"apePaterno\":\"DESMOTADORA \",\"apeMaterno\":\"INCA \",\"nombreCompleto\":\"DESMOTADORA INCA S.A.C.      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20364404141\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0021\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20431165334", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20431165334QV10    \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SAC  \",\"apePaterno\":\"HEXA \",\"apeMaterno\":\"QUIMICA \",\"nombreCompleto\":\"HEXA QUIMICA SAC  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20431165334\",\"usuarioSOL\":\"QV10\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20103795631", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20103795631KOCHOA2 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DE SERV PUBLICO DE ELECTRICIDAD \",\"apePaterno\":\"EMP \",\"apeMaterno\":\"REG \",\"nombreCompleto\":\"EMP REG DE SERV PUBLICO DE ELECTRICIDAD \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20103795631\",\"usuarioSOL\":\"KOCHOA2\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20121111935", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20121111935INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LIBIA VIRGINIA         \",\"apePaterno\":\"ZEVALLOS \",\"apeMaterno\":\"MERCADO \",\"nombreCompleto\":\"ZEVALLOS MERCADO LIBIA VIRGINIA         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20121111935\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20408971943", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20408971943MNHZSMKL\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S.A.C.         \",\"apePaterno\":\"GLP \",\"apeMaterno\":\"AMAZONICO \",\"nombreCompleto\":\"GLP AMAZONICO S.A.C.         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20408971943\",\"usuarioSOL\":\"MNHZSMKL\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20409082859", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20409082859RERUA225\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S.A.C. TRIMASA\",\"apePaterno\":\"TRIPLAY \",\"apeMaterno\":\"MARTIN \",\"nombreCompleto\":\"TRIPLAY MARTIN S.A.C. TRIMASA\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20409082859\",\"usuarioSOL\":\"RERUA225\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20450131891", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20450131891RERM6586\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S.R.L.    \",\"apePaterno\":\"SERVICENTRO \",\"apeMaterno\":\"ALICIA \",\"nombreCompleto\":\"SERVICENTRO ALICIA S.R.L.    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20450131891\",\"usuarioSOL\":\"RERM6586\",\"codDepend\":\"0183\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20450818187", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20450818187RERU7477\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SAC    \",\"apePaterno\":\"NEGOCIOS \",\"apeMaterno\":\"CORPORATIVOS \",\"nombreCompleto\":\"NEGOCIOS CORPORATIVOS SAC    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20450818187\",\"usuarioSOL\":\"RERU7477\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20451319800", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20451319800DSRQ6FK5\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JUAN SAC\",\"apePaterno\":\"COMERCIALIZADORA \",\"apeMaterno\":\"SAN \",\"nombreCompleto\":\"COMERCIALIZADORA SAN JUAN SAC\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20451319800\",\"usuarioSOL\":\"DSRQ6FK5\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20451415515", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20451415515BD9AQSEN\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"Y COMERCIO EIRL         \",\"apePaterno\":\"TOPES \",\"apeMaterno\":\"SERVICIOS \",\"nombreCompleto\":\"TOPES SERVICIOS Y COMERCIO EIRL         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20451415515\",\"usuarioSOL\":\"BD9AQSEN\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20484479616", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20484479616RERUME31\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"PIEDRAS S.A.C.  \",\"apePaterno\":\"FORESTAL \",\"apeMaterno\":\"RIO \",\"nombreCompleto\":\"FORESTAL RIO PIEDRAS S.A.C.  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20484479616\",\"usuarioSOL\":\"RERUME31\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20283701728", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20283701728RERPA817\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"FORESTAL SRL      \",\"apePaterno\":\"INDUSTRIAL \",\"apeMaterno\":\"DESARROLLO \",\"nombreCompleto\":\"INDUSTRIAL DESARROLLO FORESTAL SRL      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20283701728\",\"usuarioSOL\":\"RERPA817\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20309889143", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20309889143RERMA132\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"Y CONEXOS S.R.LTDA.\",\"apePaterno\":\"SERVICIOS \",\"apeMaterno\":\"FORESTALES \",\"nombreCompleto\":\"SERVICIOS FORESTALES Y CONEXOS S.R.LTDA.\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20309889143\",\"usuarioSOL\":\"RERMA132\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20329436323", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20329436323INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SAC      \",\"apePaterno\":\"DESARROLLO \",\"apeMaterno\":\"FORESTAL \",\"nombreCompleto\":\"DESARROLLO FORESTAL SAC      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20329436323\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20352141357", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20352141357SIDCOT08\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SERV. FORESTALES SELVA S.C.R.L\",\"apePaterno\":\"TRANSF. \",\"apeMaterno\":\"Y \",\"nombreCompleto\":\"TRANSF. Y SERV. FORESTALES SELVA S.C.R.L\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20352141357\",\"usuarioSOL\":\"SIDCOT08\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20352166007", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20352166007REGMEP2 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"HUAYRURO S.A.C       \",\"apePaterno\":\"INDUSTRIA \",\"apeMaterno\":\"FORESTAL \",\"nombreCompleto\":\"INDUSTRIA FORESTAL HUAYRURO S.A.C       \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20352166007\",\"usuarioSOL\":\"REGMEP2\",\"codDepend\":\"0000\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20352185729", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20352185729REGMEP3 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"FERNANDO E.I.R.L\",\"apePaterno\":\"FORESTAL \",\"apeMaterno\":\"SAN \",\"nombreCompleto\":\"FORESTAL SAN FERNANDO E.I.R.L\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20352185729\",\"usuarioSOL\":\"REGMEP3\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20362106487", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20362106487INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"FORESTAL SELVA VIRGEN S.R.L.  \",\"apePaterno\":\"CORP. \",\"apeMaterno\":\"BIO \",\"nombreCompleto\":\"CORP. BIO FORESTAL SELVA VIRGEN S.R.L.  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20362106487\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0183\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20393786125", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20393786125INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"E.I.R.L.    \",\"apePaterno\":\"FORESTAL \",\"apeMaterno\":\"ATALAYA \",\"nombreCompleto\":\"FORESTAL ATALAYA E.I.R.L.    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20393786125\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20397484107", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20397484107RERUF240\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SERVICIOS FORESTALES S.A.C\",\"apePaterno\":\"INVERSIONES \",\"apeMaterno\":\"Y \",\"nombreCompleto\":\"INVERSIONES Y SERVICIOS FORESTALES S.A.C\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20397484107\",\"usuarioSOL\":\"RERUF240\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20449487533", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20449487533REGPF599\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DEL SUR E.I.R.L.      \",\"apePaterno\":\"FORESTAL \",\"apeMaterno\":\"MADERERA \",\"nombreCompleto\":\"FORESTAL MADERERA DEL SUR E.I.R.L.      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20449487533\",\"usuarioSOL\":\"REGPF599\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10072745294", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10072745294CNAVARRO\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MARCO AURELIO          \",\"apePaterno\":\"PESCHIERA \",\"apeMaterno\":\"ALFARO \",\"nombreCompleto\":\"PESCHIERA ALFARO MARCO AURELIO          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10072745294\",\"usuarioSOL\":\"CNAVARRO\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10084348720", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10084348720RECI1689\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JESUS NATALIA        \",\"apePaterno\":\"MALDONADO \",\"apeMaterno\":\"ZEVALLOS \",\"nombreCompleto\":\"MALDONADO ZEVALLOS JESUS NATALIA        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10084348720\",\"usuarioSOL\":\"RECI1689\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10084475951", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10084475951RERML751\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"RAMIRO EDGARDO        \",\"apePaterno\":\"ALZAMORA \",\"apeMaterno\":\"CARRASCO \",\"nombreCompleto\":\"ALZAMORA CARRASCO RAMIRO EDGARDO        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10084475951\",\"usuarioSOL\":\"RERML751\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10181185894", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10181185894LMERINO2\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SILVIA PILAR         \",\"apePaterno\":\"VALDERRAMA \",\"apeMaterno\":\"VASQUEZ \",\"nombreCompleto\":\"VALDERRAMA VASQUEZ SILVIA PILAR         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10181185894\",\"usuarioSOL\":\"LMERINO2\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10432779721", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"1043277972199678899\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"HILARIO       \",\"apePaterno\":\"MAMANI \",\"apeMaterno\":\"SANCHEZ \",\"nombreCompleto\":\"MAMANI SANCHEZ HILARIO       \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10432779721\",\"usuarioSOL\":\"99678899\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100629004", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100629004REGI0523\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DE METAL Y MADERA S.A. \",\"apePaterno\":\"FCA.DE \",\"apeMaterno\":\"AMBIENTES \",\"nombreCompleto\":\"FCA.DE AMBIENTES DE METAL Y MADERA S.A. \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100629004\",\"usuarioSOL\":\"REGI0523\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100712599", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100712599REGPRI1 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"      \",\"apePaterno\":\"EPLI \",\"apeMaterno\":\"S.A.C. \",\"nombreCompleto\":\"EPLI S.A.C.       \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100712599\",\"usuarioSOL\":\"REGPRI1\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20102762925", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20102762925RERUPRI1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SS.DE SANEAM. GRAU S.A.\",\"apePaterno\":\"ENTIDAD \",\"apeMaterno\":\"PREST.DE \",\"nombreCompleto\":\"ENTIDAD PREST.DE SS.DE SANEAM. GRAU S.A.\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20102762925\",\"usuarioSOL\":\"RERUPRI1\",\"codDepend\":\"0081\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20125667512", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20125667512IZAGAL  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"V & ASOCIADOS S.A.C.    \",\"apePaterno\":\"V \",\"apeMaterno\":\"DE \",\"nombreCompleto\":\"V DE V & ASOCIADOS S.A.C.    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20125667512\",\"usuarioSOL\":\"IZAGAL\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20130740384", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20130740384RERPG350\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SACRAFAMILIA LTDA 13 \",\"apePaterno\":\"COPERATIVA \",\"apeMaterno\":\"COMUNAL \",\"nombreCompleto\":\"COPERATIVA COMUNAL SACRAFAMILIA LTDA 13 \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20130740384\",\"usuarioSOL\":\"RERPG350\",\"codDepend\":\"0193\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20131138408", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20131138408OVALLADA\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"TRANSPORTES TRANSPORTISTAS UN\",\"apePaterno\":\"EMPRESA \",\"apeMaterno\":\"DE \",\"nombreCompleto\":\"EMPRESA DE TRANSPORTES TRANSPORTISTAS UN\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20131138408\",\"usuarioSOL\":\"OVALLADA\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20154727826", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20154727826RECIBE0K\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SERVICIOS  RODEMA E.I.R.L\",\"apePaterno\":\"CONSTRUCTORA \",\"apeMaterno\":\"Y \",\"nombreCompleto\":\"CONSTRUCTORA Y SERVICIOS  RODEMA E.I.R.L\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20154727826\",\"usuarioSOL\":\"RECIBE0K\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20255322363", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20255322363LVBJELUS\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S.A.       \",\"apePaterno\":\"CORPORACION \",\"apeMaterno\":\"MISKI \",\"nombreCompleto\":\"CORPORACION MISKI S.A.       \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20255322363\",\"usuarioSOL\":\"LVBJELUS\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20305058085", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20305058085VMUNOA  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"      \",\"apePaterno\":\"INDURA \",\"apeMaterno\":\"S.A. \",\"nombreCompleto\":\"INDURA S.A.       \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20305058085\",\"usuarioSOL\":\"VMUNOA\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20325346435", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20325346435RERPF184\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DON LUIS S.A.         \",\"apePaterno\":\"SOCIEDAD \",\"apeMaterno\":\"AGRICOLA \",\"nombreCompleto\":\"SOCIEDAD AGRICOLA DON LUIS S.A.         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20325346435\",\"usuarioSOL\":\"RERPF184\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20330822661", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20330822661ET24BUT5\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S.A.          \",\"apePaterno\":\"HENKEL \",\"apeMaterno\":\"PERUANA \",\"nombreCompleto\":\"HENKEL PERUANA S.A.          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20330822661\",\"usuarioSOL\":\"ET24BUT5\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20334931189", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20334931189RECI6400\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"& ASOCIADOS S.R.L.    \",\"apePaterno\":\"ESTUDIO \",\"apeMaterno\":\"PEDRESCHI \",\"nombreCompleto\":\"ESTUDIO PEDRESCHI & ASOCIADOS S.R.L.    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20334931189\",\"usuarioSOL\":\"RECI6400\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20399483469", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20399483469RERMD563\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"\",\"apePaterno\":\"AUTOBACKS \",\"apeMaterno\":\"\",\"nombreCompleto\":\"AUTOBACKS E.I.R.L.\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20399483469\",\"usuarioSOL\":\"RERMD563\",\"codDepend\":\"0081\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20430929101", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20430929101TGARAYAR\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"        \",\"apePaterno\":\"BUCYRUS \",\"apeMaterno\":\"INTERNATIONAL(PERU)S.A. \",\"nombreCompleto\":\"BUCYRUS INTERNATIONAL(PERU)S.A.         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20430929101\",\"usuarioSOL\":\"TGARAYAR\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20481271267", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20481271267RERUD453\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"EIRL         \",\"apePaterno\":\"NEGOCIOS \",\"apeMaterno\":\"LOSSON \",\"nombreCompleto\":\"NEGOCIOS LOSSON EIRL         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20481271267\",\"usuarioSOL\":\"RERUD453\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20486348268", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20486348268INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"PERU SCRL      \",\"apePaterno\":\"HERMANOS \",\"apeMaterno\":\"HUES \",\"nombreCompleto\":\"HERMANOS HUES PERU SCRL      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20486348268\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0131\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20504508642", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20504508642MZBWETBN\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SOCIEDAD ANONIMA CERRA\",\"apePaterno\":\"NEGOCIACIONES \",\"apeMaterno\":\"KAO \",\"nombreCompleto\":\"NEGOCIACIONES KAO SOCIEDAD ANONIMA CERRA\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20504508642\",\"usuarioSOL\":\"MZBWETBN\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20507380515", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20507380515MAS7BEPY\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"BOSQUE SOCIEDAD ANONIMA CERR\",\"apePaterno\":\"HOTELERA \",\"apeMaterno\":\"EL \",\"nombreCompleto\":\"HOTELERA EL BOSQUE SOCIEDAD ANONIMA CERR\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20507380515\",\"usuarioSOL\":\"MAS7BEPY\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20510957238", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20510957238RRUIZD  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"C G SURPASS SAC         \",\"apePaterno\":\"DISTRIBUIDORA \",\"apeMaterno\":\"J \",\"nombreCompleto\":\"DISTRIBUIDORA J C G SURPASS SAC         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20510957238\",\"usuarioSOL\":\"RRUIZD\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20514262820", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20514262820RECID712\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"TUERCAS JGD SOCIEDAD ANONIMA CE\",\"apePaterno\":\"PERNOS \",\"apeMaterno\":\"Y \",\"nombreCompleto\":\"PERNOS Y TUERCAS JGD SOCIEDAD ANONIMA CE\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20514262820\",\"usuarioSOL\":\"RECID712\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20516325161", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20516325161CZORRILL\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S.A.C    \",\"apePaterno\":\"INVERSIONES \",\"apeMaterno\":\"RODALFA \",\"nombreCompleto\":\"INVERSIONES RODALFA S.A.C    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20516325161\",\"usuarioSOL\":\"CZORRILL\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20521398648", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20521398648LACOSTA \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CORPORATION  SAC  \",\"apePaterno\":\"ARMABRAES \",\"apeMaterno\":\" \",\"nombreCompleto\":\"ARMABRAES  CORPORATION  SAC  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20521398648\",\"usuarioSOL\":\"LACOSTA\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20526998279", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20526998279RECIJ638\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S.A.C   \",\"apePaterno\":\"EKO \",\"apeMaterno\":\"HOTEL \",\"nombreCompleto\":\"EKO HOTEL S.A.C   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20526998279\",\"usuarioSOL\":\"RECIJ638\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10078495451", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10078495451IZARATE \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"IMPRENTA TOMAS      \",\"apePaterno\":\"GRAFICA \",\"apeMaterno\":\" \",\"nombreCompleto\":\"GRAFICA  IMPRENTA TOMAS      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10078495451\",\"usuarioSOL\":\"IZARATE\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10082664705", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10082664705RECI0254\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DE ZAMORA MARIA GERTRUDES\",\"apePaterno\":\"FERNANDEZ \",\"apeMaterno\":\"DIAZ \",\"nombreCompleto\":\"FERNANDEZ DIAZ DE ZAMORA MARIA GERTRUDES\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10082664705\",\"usuarioSOL\":\"RECI0254\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10214184473", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10214184473RECID678\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JORGE ANDRES \",\"apePaterno\":\"SAMANDER \",\"apeMaterno\":\"CAMPOS \",\"nombreCompleto\":\"SAMANDER CAMPOS JORGE ANDRES \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10214184473\",\"usuarioSOL\":\"RECID678\",\"codDepend\":\"0073\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10295385265", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10295385265JMUNOZ  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ULISES DIONICIO \",\"apePaterno\":\"GAMARRA \",\"apeMaterno\":\"MENA \",\"nombreCompleto\":\"GAMARRA MENA ULISES DIONICIO \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10295385265\",\"usuarioSOL\":\"JMUNOZ\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10308369442", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10308369442RERML865\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ELARD OSCAR     \",\"apePaterno\":\"BEJAR \",\"apeMaterno\":\"VALDEZ \",\"nombreCompleto\":\"BEJAR VALDEZ ELARD OSCAR     \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10308369442\",\"usuarioSOL\":\"RERML865\",\"codDepend\":\"0053\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10802648648", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"108026486486GVWTQTA\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"WASHINGTON VICTOR         \",\"apePaterno\":\"TORRES \",\"apeMaterno\":\"QUISPE \",\"nombreCompleto\":\"TORRES QUISPE WASHINGTON VICTOR         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10802648648\",\"usuarioSOL\":\"6GVWTQTA\",\"codDepend\":\"0053\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_15122077273", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"15122077273DHDVCUT8\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LUIGI \",\"apePaterno\":\"ASCOLI \",\"apeMaterno\":\"PIER \",\"nombreCompleto\":\"ASCOLI PIER LUIGI \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"15122077273\",\"usuarioSOL\":\"DHDVCUT8\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100025672", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100025672OPERUC  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DE ASESORIA EMPRE\",\"apePaterno\":\"CENTRO \",\"apeMaterno\":\"LATINOAMERICANO \",\"nombreCompleto\":\"CENTRO LATINOAMERICANO DE ASESORIA EMPRE\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100025672\",\"usuarioSOL\":\"OPERUC\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100041287", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100041287RECI1689\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"EN LIQUIDACION          \",\"apePaterno\":\"BANCO \",\"apeMaterno\":\"REPUBLICA \",\"nombreCompleto\":\"BANCO REPUBLICA EN LIQUIDACION          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100041287\",\"usuarioSOL\":\"RECI1689\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100059739", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100059739REGI0523\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"A COMERCIAL INDUSTRIAL PERUA    \",\"apePaterno\":\"SACIP \",\"apeMaterno\":\"S \",\"nombreCompleto\":\"SACIP S A COMERCIAL INDUSTRIAL PERUA    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100059739\",\"usuarioSOL\":\"REGI0523\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000518471", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000518471INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.853141365133424\",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"18934 \",\"nombreCompleto\":\"REU04 18934 0.853141365133424\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000518471\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000618336", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000618336REGPRI3 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"GELBER         \",\"apePaterno\":\"JONES \",\"apeMaterno\":\"RENGIFO \",\"nombreCompleto\":\"JONES RENGIFO GELBER         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000618336\",\"usuarioSOL\":\"REGPRI3\",\"codDepend\":\"0151\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000699654", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000699654INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.319166462063148\",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"86673 \",\"nombreCompleto\":\"REU04 86673 0.319166462063148\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000699654\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000734921", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000734921RERUMEP3\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"PAUL AUGUSTO   \",\"apePaterno\":\"OLIVER \",\"apeMaterno\":\"FLORES \",\"nombreCompleto\":\"OLIVER FLORES PAUL AUGUSTO   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000734921\",\"usuarioSOL\":\"RERUMEP3\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000763409", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000763409REGPRI3 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ENRIQUE     \",\"apePaterno\":\"MALPARTIDA \",\"apeMaterno\":\"SALAS \",\"nombreCompleto\":\"MALPARTIDA SALAS ENRIQUE     \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000763409\",\"usuarioSOL\":\"REGPRI3\",\"codDepend\":\"0151\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000786107", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000786107INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JUSTINO      \",\"apePaterno\":\"PORRAS \",\"apeMaterno\":\"ESPINOZA \",\"nombreCompleto\":\"PORRAS ESPINOZA JUSTINO      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000786107\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000803311", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000803311INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.883928022305788\",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"46725 \",\"nombreCompleto\":\"REU04 46725 0.883928022305788\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000803311\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000822162", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000822162INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.563941891163442\",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"19061 \",\"nombreCompleto\":\"REU04 19061 0.563941891163442\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000822162\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000856784", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000856784SHAMOLOT\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MARCIAL         \",\"apePaterno\":\"LANDEO \",\"apeMaterno\":\"ROJAS \",\"nombreCompleto\":\"LANDEO ROJAS MARCIAL         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000856784\",\"usuarioSOL\":\"SHAMOLOT\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000905378", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000905378RERUMEP1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MARCO ANTONIO  \",\"apePaterno\":\"ACOSTA \",\"apeMaterno\":\"ALDANA \",\"nombreCompleto\":\"ACOSTA ALDANA MARCO ANTONIO  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000905378\",\"usuarioSOL\":\"RERUMEP1\",\"codDepend\":\"0083\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_00000810193", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"00000810193CONBAN06\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"VIII - ICA         \",\"apePaterno\":\"INTENDENCIA \",\"apeMaterno\":\"REGIONAL \",\"nombreCompleto\":\"INTENDENCIA REGIONAL VIII - ICA         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"00000810193\",\"usuarioSOL\":\"CONBAN06\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000006390", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000006390MRP243  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DANIEL CARLOS  \",\"apePaterno\":\"PERALTA \",\"apeMaterno\":\"ROJAS \",\"nombreCompleto\":\"PERALTA ROJAS DANIEL CARLOS  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000006390\",\"usuarioSOL\":\"MRP243\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000012756", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000012756RERUMEP3\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"AGUILA CARLOS     \",\"apePaterno\":\"GODIER \",\"apeMaterno\":\"DEL \",\"nombreCompleto\":\"GODIER DEL AGUILA CARLOS     \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000012756\",\"usuarioSOL\":\"RERUMEP3\",\"codDepend\":\"0153\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000017791", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000017791AVALLES \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ANGEL        \",\"apePaterno\":\"BENAVIDES \",\"apeMaterno\":\"VILLA \",\"nombreCompleto\":\"BENAVIDES VILLA ANGEL        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000017791\",\"usuarioSOL\":\"AVALLES\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000044607", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000044607REGPRI3 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"TEOFILO      \",\"apePaterno\":\"MATIAS \",\"apeMaterno\":\"VALENTIN \",\"nombreCompleto\":\"MATIAS VALENTIN TEOFILO      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000044607\",\"usuarioSOL\":\"REGPRI3\",\"codDepend\":\"0151\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000064641", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000064641INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ERNESTO        \",\"apePaterno\":\"LOPEZ \",\"apeMaterno\":\"RENGIFO \",\"nombreCompleto\":\"LOPEZ RENGIFO ERNESTO        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000064641\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000080107", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000080107RERUMEP4\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JAVIER RUBEN   \",\"apePaterno\":\"MEDINA \",\"apeMaterno\":\"DAVILA \",\"nombreCompleto\":\"MEDINA DAVILA JAVIER RUBEN   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000080107\",\"usuarioSOL\":\"RERUMEP4\",\"codDepend\":\"0123\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000083807", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000083807INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.450422269689686\",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"42767 \",\"nombreCompleto\":\"REU04 42767 0.450422269689686\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000083807\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000111304", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000111304MRUIZ3  \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JORGE JUAN  \",\"apePaterno\":\"COQUIS \",\"apeMaterno\":\"SARMIENTO \",\"nombreCompleto\":\"COQUIS SARMIENTO JORGE JUAN  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000111304\",\"usuarioSOL\":\"MRUIZ3\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000196083", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000196083INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.193236257852188\",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"56149 \",\"nombreCompleto\":\"REU04 56149 0.193236257852188\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000196083\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000210086", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000210086RECIJ670\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MANUEL    \",\"apePaterno\":\"FERNANDEZ \",\"apeMaterno\":\"IBARGUEN \",\"nombreCompleto\":\"FERNANDEZ IBARGUEN MANUEL    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000210086\",\"usuarioSOL\":\"RECIJ670\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000229208", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000229208FQUINONE\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"      \",\"apePaterno\":\"PUMA \",\"apeMaterno\":\"PRUEBA \",\"nombreCompleto\":\"PUMA PRUEBA       \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000229208\",\"usuarioSOL\":\"FQUINONE\",\"codDepend\":\"0021\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000284004", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000284004RERMA108\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CESAR ALEJANDRO        \",\"apePaterno\":\"ARANA \",\"apeMaterno\":\"MENDOCILLA \",\"nombreCompleto\":\"ARANA MENDOCILLA CESAR ALEJANDRO        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000284004\",\"usuarioSOL\":\"RERMA108\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000314604", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000314604SIDCOT08\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"IVAN          \",\"apePaterno\":\"SIKIC \",\"apeMaterno\":\"KNEZEVIC \",\"nombreCompleto\":\"SIKIC KNEZEVIC IVAN          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000314604\",\"usuarioSOL\":\"SIDCOT08\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000357842", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000357842INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.644565271886168 \",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"8570 \",\"nombreCompleto\":\"REU04 8570 0.644565271886168 \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000357842\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000370857", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000370857OZAMORAB\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"YNES          \",\"apePaterno\":\"BARRANTES \",\"apeMaterno\":\"RIOS \",\"nombreCompleto\":\"BARRANTES RIOS YNES          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000370857\",\"usuarioSOL\":\"OZAMORAB\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000375689", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000375689RERUMEP1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MANUEL        \",\"apePaterno\":\"RAMIREZ \",\"apeMaterno\":\"MELENA \",\"nombreCompleto\":\"RAMIREZ MELENA MANUEL        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000375689\",\"usuarioSOL\":\"RERUMEP1\",\"codDepend\":\"0000\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000433131", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000433131INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.525361129750213\",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"18370 \",\"nombreCompleto\":\"REU04 18370 0.525361129750213\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000433131\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000434316", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000434316INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.0279221854898468          \",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"38580 \",\"nombreCompleto\":\"REU04 38580 0.0279221854898468          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000434316\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000462182", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000462182REGMEP3 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DORIS GERENARDA         \",\"apePaterno\":\"GARCIA \",\"apeMaterno\":\"GUILLENA \",\"nombreCompleto\":\"GARCIA GUILLENA DORIS GERENARDA         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000462182\",\"usuarioSOL\":\"REGMEP3\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10061022711", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10061022711FDELACR1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"VICTOR EDUARDO          \",\"apePaterno\":\"ARZAPALO \",\"apeMaterno\":\"PAYANO \",\"nombreCompleto\":\"ARZAPALO PAYANO VICTOR EDUARDO          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10061022711\",\"usuarioSOL\":\"FDELACR1\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10061081769", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10061081769CNAVARRO\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"VICTOR HUGO\",\"apePaterno\":\"VASQUEZ \",\"apeMaterno\":\"RODRIGUEZ \",\"nombreCompleto\":\"VASQUEZ RODRIGUEZ VICTOR HUGO\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10061081769\",\"usuarioSOL\":\"CNAVARRO\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10061090598", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10061090598FDELACR1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ANA LUISA        \",\"apePaterno\":\"SOTO \",\"apeMaterno\":\"GUZMAN \",\"nombreCompleto\":\"SOTO GUZMAN ANA LUISA        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10061090598\",\"usuarioSOL\":\"FDELACR1\",\"codDepend\":\"0063\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100066603", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100066603MODDATOS\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"TOMAS S-   \",\"apePaterno\":\"GRAFICAa \",\"apeMaterno\":\"IMPRENTA \",\"nombreCompleto\":\"GRAFICAa IMPRENTA TOMAS S-   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100066603\",\"usuarioSOL\":\"MODDATOS\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100303311", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100303311CNAVARRO\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S A\",\"apePaterno\":\"LADRILLERA \",\"apeMaterno\":\"KAR \",\"nombreCompleto\":\"LADRILLERA KAR S A\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100303311\",\"usuarioSOL\":\"CNAVARRO\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101027822", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101027822RECI1647\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S A      \",\"apePaterno\":\"EPESA \",\"apeMaterno\":\"EDIFICACIONES \",\"nombreCompleto\":\"EPESA EDIFICACIONES S A      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101027822\",\"usuarioSOL\":\"RECI1647\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101158412", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101158412REGPRI1 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LOS TOLMOS S.A          \",\"apePaterno\":\"COMPANIA \",\"apeMaterno\":\"MINERA \",\"nombreCompleto\":\"COMPANIA MINERA LOS TOLMOS S.A          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101158412\",\"usuarioSOL\":\"REGPRI1\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101158501", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101158501RECI1689\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S.A.     \",\"apePaterno\":\"INVERSIONES \",\"apeMaterno\":\"TULIPAN \",\"nombreCompleto\":\"INVERSIONES TULIPAN S.A.     \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101158501\",\"usuarioSOL\":\"RECI1689\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101649319", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101649319RECI1683\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DEL PERU         \",\"apePaterno\":\"CONGREGACION \",\"apeMaterno\":\"SALESIANA \",\"nombreCompleto\":\"CONGREGACION SALESIANA DEL PERU         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101649319\",\"usuarioSOL\":\"RECI1683\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10293048385", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10293048385DDELCARP\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JUSTO GERMAN\",\"apePaterno\":\"VILLENA \",\"apeMaterno\":\"VALDIVIA \",\"nombreCompleto\":\"VILLENA VALDIVIA JUSTO GERMAN\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10293048385\",\"usuarioSOL\":\"DDELCARP\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10307702601", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10307702601OCUENTAS\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"EUGENIO ALEJANDRINO    \",\"apePaterno\":\"VILLENA \",\"apeMaterno\":\"VALDIVIA \",\"nombreCompleto\":\"VILLENA VALDIVIA EUGENIO ALEJANDRINO    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10307702601\",\"usuarioSOL\":\"OCUENTAS\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10018207058", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10018207058MRUELASA\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"FELIX ANGEL \",\"apePaterno\":\"GARNICA \",\"apeMaterno\":\"BUSTINZA \",\"nombreCompleto\":\"GARNICA BUSTINZA FELIX ANGEL \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10018207058\",\"usuarioSOL\":\"MRUELASA\",\"codDepend\":\"0063\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10085816093", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10085816093RECI6069\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JOSE GUADALUPE \",\"apePaterno\":\"EFIO \",\"apeMaterno\":\"SENMACHE \",\"nombreCompleto\":\"EFIO SENMACHE JOSE GUADALUPE \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10085816093\",\"usuarioSOL\":\"RECI6069\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10166598015", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10166598015RERPF856\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LORENZO MOISES    \",\"apePaterno\":\"REAL \",\"apeMaterno\":\"VALLE \",\"nombreCompleto\":\"REAL VALLE LORENZO MOISES    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10166598015\",\"usuarioSOL\":\"RERPF856\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100000092", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100000092LQUIJAND\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"VUELO DOCAMPO S.A.C.          \",\"apePaterno\":\"COCINA \",\"apeMaterno\":\"DE \",\"nombreCompleto\":\"COCINA DE VUELO DOCAMPO S.A.C.          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100000092\",\"usuarioSOL\":\"LQUIJAND\",\"codDepend\":\"0021\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100007348", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100007348DKWR9UTH\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"S A      \",\"apePaterno\":\"LIMA \",\"apeMaterno\":\"GAS \",\"nombreCompleto\":\"LIMA GAS S A      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100007348\",\"usuarioSOL\":\"DKWR9UTH\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100087945", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100087945RERU0679\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"NACIONAL S.A.- EPEN\",\"apePaterno\":\"EMPRESA \",\"apeMaterno\":\"PERIODISTICA \",\"nombreCompleto\":\"EMPRESA PERIODISTICA NACIONAL S.A.- EPEN\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100087945\",\"usuarioSOL\":\"RERU0679\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100114187", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100114187REGPRI1 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"Y CONTRATISTAS GENERA\",\"apePaterno\":\"INGENIEROS \",\"apeMaterno\":\"CIVILES \",\"nombreCompleto\":\"INGENIEROS CIVILES Y CONTRATISTAS GENERA\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100114187\",\"usuarioSOL\":\"REGPRI1\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100128218", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100128218JDG9DPDV\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"PERU PETROPERU SA         \",\"apePaterno\":\"PETROLEOS \",\"apeMaterno\":\"DEL \",\"nombreCompleto\":\"PETROLEOS DEL PERU PETROPERU SA         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100128218\",\"usuarioSOL\":\"JDG9DPDV\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10180145406", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10180145406REGMEP1 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ANSELMO        \",\"apePaterno\":\"ASMAD \",\"apeMaterno\":\"VERGARA \",\"nombreCompleto\":\"ASMAD VERGARA ANSELMO        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10180145406\",\"usuarioSOL\":\"REGMEP1\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100002621", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100002621REGPRI1 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"TRIUNFO S A        \",\"apePaterno\":\"MOLINO \",\"apeMaterno\":\"EL \",\"nombreCompleto\":\"MOLINO EL TRIUNFO S A        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100002621\",\"usuarioSOL\":\"REGPRI1\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100004322", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100004322MCGKDCYC\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ENVASE S A    \",\"apePaterno\":\"INDUSTRIAS \",\"apeMaterno\":\"DEL \",\"nombreCompleto\":\"INDUSTRIAS DEL ENVASE S A    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100004322\",\"usuarioSOL\":\"MCGKDCYC\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001014159", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001014159INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"0.516113024734278\",\"apePaterno\":\"REU04 \",\"apeMaterno\":\"86279 \",\"nombreCompleto\":\"REU04 86279 0.516113024734278\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001014159\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001046191", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001046191INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"SILVIA VIOLETA        \",\"apePaterno\":\"FERNANDEZ \",\"apeMaterno\":\"DELGADO \",\"nombreCompleto\":\"FERNANDEZ DELGADO SILVIA VIOLETA        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001046191\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0121\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001076553", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001076553RERMA817\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"FELIX          \",\"apePaterno\":\"RIBEIRO \",\"apeMaterno\":\"PEREZ \",\"nombreCompleto\":\"RIBEIRO PEREZ FELIX          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001076553\",\"usuarioSOL\":\"RERMA817\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001090165", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001090165INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"BARBARAN SILVIA   \",\"apePaterno\":\"DEL \",\"apeMaterno\":\"AGUILA \",\"nombreCompleto\":\"DEL AGUILA BARBARAN SILVIA   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001090165\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001098468", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001098468INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"BORIS BORMAN \",\"apePaterno\":\"ORTEGA \",\"apeMaterno\":\"GONZALES \",\"nombreCompleto\":\"ORTEGA GONZALES BORIS BORMAN \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001098468\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001107726", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001107726JCALENZA\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"NESTOR MAXIMO  \",\"apePaterno\":\"VILLAR \",\"apeMaterno\":\"QUINTO \",\"nombreCompleto\":\"VILLAR QUINTO NESTOR MAXIMO  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001107726\",\"usuarioSOL\":\"JCALENZA\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10000994931", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10000994931ASANCHE1\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"GUILLERMO       \",\"apePaterno\":\"DAVILA \",\"apeMaterno\":\"LOPEZ \",\"nombreCompleto\":\"DAVILA LOPEZ GUILLERMO       \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10000994931\",\"usuarioSOL\":\"ASANCHE1\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001165190", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001165190BANKAMIS\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CARMELON    \",\"apePaterno\":\"SORAS \",\"apeMaterno\":\"HUANCACURI \",\"nombreCompleto\":\"SORAS HUANCACURI CARMELON    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001165190\",\"usuarioSOL\":\"BANKAMIS\",\"codDepend\":\"0093\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001174377", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001174377MVILLANT\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"VLADIMIR         \",\"apePaterno\":\"ALCA \",\"apeMaterno\":\"GAMBOA \",\"nombreCompleto\":\"ALCA GAMBOA VLADIMIR         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001174377\",\"usuarioSOL\":\"MVILLANT\",\"codDepend\":\"0103\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001184569", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001184569ACRINGAR\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"JOSE LUIS    \",\"apePaterno\":\"PICHARDE \",\"apeMaterno\":\"ZUNIGA \",\"nombreCompleto\":\"PICHARDE ZUNIGA JOSE LUIS    \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001184569\",\"usuarioSOL\":\"ACRINGAR\",\"codDepend\":\"0093\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001195315", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001195315VCACERES\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ZENON\",\"apePaterno\":\"ARISTA \",\"apeMaterno\":\"LOPEZ \",\"nombreCompleto\":\"ARISTA LOPEZ ZENON\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001195315\",\"usuarioSOL\":\"VCACERES\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001207321", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001207321RERUMEP6\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DANNAL MANUEL          \",\"apePaterno\":\"ARAMBURU \",\"apeMaterno\":\"VENEGAS \",\"nombreCompleto\":\"ARAMBURU VENEGAS DANNAL MANUEL          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001207321\",\"usuarioSOL\":\"RERUMEP6\",\"codDepend\":\"0103\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001278245", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001278245INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"OLIVIA LUCINDA          \",\"apePaterno\":\"PENA \",\"apeMaterno\":\"ALTAMIRANO \",\"nombreCompleto\":\"PENA ALTAMIRANO OLIVIA LUCINDA          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001278245\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0183\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001848645", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001848645RECID692\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DEMETRIO        \",\"apePaterno\":\"LUQUE \",\"apeMaterno\":\"VARGAS \",\"nombreCompleto\":\"LUQUE VARGAS DEMETRIO        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001848645\",\"usuarioSOL\":\"RECID692\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10001850941", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10001850941SIDCOT07\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ROMAN     \",\"apePaterno\":\"ESPINOZA \",\"apeMaterno\":\"ALBENGRIN \",\"nombreCompleto\":\"ESPINOZA ALBENGRIN ROMAN     \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10001850941\",\"usuarioSOL\":\"SIDCOT07\",\"codDepend\":\"0183\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10002422994", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10002422994REGM4014\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LELIS FERNANDO         \",\"apePaterno\":\"CALDERON \",\"apeMaterno\":\"CORNEJO \",\"nombreCompleto\":\"CALDERON CORNEJO LELIS FERNANDO         \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10002422994\",\"usuarioSOL\":\"REGM4014\",\"codDepend\":\"0253\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10002423249", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10002423249KRUIZ   \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MATEA JAKELINE   \",\"apePaterno\":\"MENA \",\"apeMaterno\":\"GARCIA \",\"nombreCompleto\":\"MENA GARCIA MATEA JAKELINE   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10002423249\",\"usuarioSOL\":\"KRUIZ\",\"codDepend\":\"0253\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10002463721", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10002463721RERMG698\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"EDWIN JABSER     \",\"apePaterno\":\"CRUZ \",\"apeMaterno\":\"ZARATE \",\"nombreCompleto\":\"CRUZ ZARATE EDWIN JABSER     \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10002463721\",\"usuarioSOL\":\"RERMG698\",\"codDepend\":\"0253\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10002490515", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10002490515CPALOMIN\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"RUBEN        \",\"apePaterno\":\"JARAMILLO \",\"apeMaterno\":\"VALLE \",\"nombreCompleto\":\"JARAMILLO VALLE RUBEN        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10002490515\",\"usuarioSOL\":\"CPALOMIN\",\"codDepend\":\"0253\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10002494197", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10002494197WGALINDE\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"TRANSPORTES MI JAIME S.C.R.L.\",\"apePaterno\":\"AGENCIA \",\"apeMaterno\":\"DE \",\"nombreCompleto\":\"AGENCIA DE TRANSPORTES MI JAIME S.C.R.L.\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10002494197\",\"usuarioSOL\":\"WGALINDE\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10002497773", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10002497773KRUIZ   \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ALEJANDRINA DEL ROSARIO \",\"apePaterno\":\"ARCA \",\"apeMaterno\":\"BARRIENTOS \",\"nombreCompleto\":\"ARCA BARRIENTOS ALEJANDRINA DEL ROSARIO \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10002497773\",\"usuarioSOL\":\"KRUIZ\",\"codDepend\":\"0253\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10026160320", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10026160320INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"EDUARDO      \",\"apePaterno\":\"RIOFRIO \",\"apeMaterno\":\"REUSCHE \",\"nombreCompleto\":\"RIOFRIO REUSCHE EDUARDO      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10026160320\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10026690370", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10026690370INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"DEMETRIO      \",\"apePaterno\":\"JUAREZ \",\"apeMaterno\":\"PULACHE \",\"nombreCompleto\":\"JUAREZ PULACHE DEMETRIO      \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10026690370\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10027006251", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10027006251INFORMIX\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"PEDRO          \",\"apePaterno\":\"LOPEZ \",\"apeMaterno\":\"PASACHE \",\"nombreCompleto\":\"LOPEZ PASACHE PEDRO          \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10027006251\",\"usuarioSOL\":\"INFORMIX\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_10034648234", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"10034648234REGMEP1 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"HILDA\",\"apePaterno\":\"PERICHE \",\"apeMaterno\":\"VITE \",\"nombreCompleto\":\"PERICHE VITE HILDA\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"10034648234\",\"usuarioSOL\":\"REGMEP1\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100010217", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100010217RERUPRI7\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"NEPTUNIA S.A.                           \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"NEPTUNIA S.A.                           \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100010217\",\"usuarioSOL\":\"RERUPRI7\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100010489", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100010489REGI1351\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"ENVASES INDUSTRIALES S A.             \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"ENVASES INDUSTRIALES S A.             \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100010489\",\"usuarioSOL\":\"REGI1351\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100017149", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100017149JPACHASI\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"PANAMERICANA TELEVISION S A             \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"PANAMERICANA TELEVISION S A             \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100017149\",\"usuarioSOL\":\"JPACHASI\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100113610", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100113610N769    \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"UNION DE CERVECERIAS PERUANAS BACKUS Y J\",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"UNION DE CERVECERIAS PERUANAS BACKUS Y J\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100113610\",\"usuarioSOL\":\"N769\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100177421", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100177421TGARAYAR\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"COMPANIA MINERA SAN IGNACIO DE MOROCOCHA\",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"COMPANIA MINERA SAN IGNACIO DE MOROCOCHA\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100177421\",\"usuarioSOL\":\"TGARAYAR\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101024645", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101024645RERUPRI6\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CORPORACION LINDLEY S.A.                \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"CORPORACION LINDLEY S.A.                \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101024645\",\"usuarioSOL\":\"RERUPRI6\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100024862", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100024862REG1630 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"A. TARRILLO BARBA S.A.                  \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"A. TARRILLO BARBA S.A.                  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100024862\",\"usuarioSOL\":\"REG1630\",\"codDepend\":\"0023\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20101266819", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20101266819TIFULANA\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CAMARA DE COMERCIO DE LIMA              \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"CAMARA DE COMERCIO DE LIMA              \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20101266819\",\"usuarioSOL\":\"TIFULANA\",\"codDepend\":\"0021\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20105685875", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20105685875UNPRGOTG\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"UNIVERSIDAD NACIONAL PEDRO RUIZ GALLO   \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"UNIVERSIDAD NACIONAL PEDRO RUIZ GALLO   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20105685875\",\"usuarioSOL\":\"UNPRGOTG\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20109072177", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20109072177ERX82DBM\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CENCOSUD RETAIL PERU S.A.               \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"CENCOSUD RETAIL PERU S.A.               \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20109072177\",\"usuarioSOL\":\"ERX82DBM\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20142829551", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20142829551FLOPEZ2 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"MONTES  'HNOS.  S.R.L.                  \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"MONTES   HNOS.  S.R.L.                  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20142829551\",\"usuarioSOL\":\"FLOPEZ2\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20170072465", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20170072465GCBPPXBB\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"AGRICOLA ANDREA S.A.C.                  \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"AGRICOLA ANDREA S.A.C.                  \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20170072465\",\"usuarioSOL\":\"GCBPPXBB\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20261180937", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20261180937RERUPRIN\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"BRITISH AMERICAN TOBACCO DEL PERU S.A.C.\",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"BRITISH AMERICAN TOBACCO DEL PERU S.A.C.\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20261180937\",\"usuarioSOL\":\"RERUPRIN\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20268523821", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20268523821REG0288 \",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"IMPORT Y EXPORT GOLD SUN SOCIEDAD ANONIM\",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"IMPORT Y EXPORT GOLD SUN SOCIEDAD ANONIM\",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20268523821\",\"usuarioSOL\":\"REG0288\",\"codDepend\":\"0021\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20314548249", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20314548249CNAVARRO\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"LAHI E.I.R.LTDA.                        \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"LAHI E.I.R.LTDA.                        \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20314548249\",\"usuarioSOL\":\"CNAVARRO\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20391323381", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20391323381RERUPRI8\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"CORP.TRANSCONTINENTAL DEL PERU S.A.C.   \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"CORP.TRANSCONTINENTAL DEL PERU S.A.C.   \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20391323381\",\"usuarioSOL\":\"RERUPRI8\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20100049181", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20100049181PEHFYMCG\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"TAI LOY S.A.                            \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"TAI LOY S.A.                            \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20100049181\",\"usuarioSOL\":\"PEHFYMCG\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20330791412", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20330791412EQUALLOR\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"EDEGEL S.A.A.                           \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"EDEGEL S.A.A.                           \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20330791412\",\"usuarioSOL\":\"EQUALLOR\",\"codDepend\":\"0071\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");
    sessionStorage.setItem("RUC_20334766714", "{\"id\":\"\",\"ticket\":\"\",\"login\":\"20334766714RERU0679\",\"correo\":\"cggutierrezc@grupodelaware.com; psilva@cosapidata.com.pe\",\"nombres\":\"INVERSIONES LA RIOJA S.A.               \",\"apePaterno\":\"\",\"apeMaterno\":\"\",\"nombreCompleto\":\"INVERSIONES LA RIOJA S.A.               \",\"nroRegistro\":\"\",\"codUO\":\"\",\"codCate\":\"\",\"numRUC\":\"20334766714\",\"usuarioSOL\":\"RERU0679\",\"codDepend\":\"0011\",\"idCelular\":\"\",\"codTOpeComer\":\"\"}");

}

$(document).ready(function() {
    /*$.ajaxSetup({ scriptCharset: "utf-8" , contentType: "application/x-www-form-urlencoded; charset=utf-8"});//application/json;
     jQuery.support.cors = true;*/
    // asegura limpieza de sesiones:
    var jsonFechaHora = JSON.parse(sessionStorage.getItem('fecha_hora'));
    sessionStorage.clear();

    iniciaVariables();
    //obtieneDominio();
    inciaBotones();
    //verificaFails();
    txtRuc.focus();
    getFechaLogin(jsonFechaHora);
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

/*        function verificaFails(){
 var formData = {action:"fails"};
 request1 = $.ajax({
 url: 'AutenticaMenuInternet.htm',
 type: 'POST',
 data: formData,
 cache: false,
 timeout: 25000,
 dataType: 'json',
 complete: function () {
 },
 success: function (response) {
 try {
 if (response.fallas>=3){
 captcha = true;
 divFails.html(
 '<span>Ingrese las letras que aparecen en la imagen:</span><br>'+
 '<img id="imgCaptcha" src="Captcha.htm"> '+
 '<input type="text" id="txtCaptcha" class="form-control" maxlength="4" '+
 ' onKeyPress="return onPressEnter(this,event)" '+
 ' onChange="this.value=this.value.toUpperCase();">');
 txtCaptcha=$("#txtCaptcha");
 } else if (response.fallas == 0) {
 clean();
 }
 } catch (err) {
 alert('Error procesando resultado: '+ err);
 }
 },
 error: function (xhr, ajaxOptions, thrownError) {
 //alert('[1] Ha ocurrido el siguiente error: '+ thrownError);
 }
 });
 }
 */

/*        function clean() {
 var formData = {action:"invalidate"};
 request2 = $.ajax({
 url: 'AutenticaMenuInternet.htm',
 type: 'POST',
 data: formData,
 cache: false,
 timeout: 25000,
 dataType: 'json',
 async:false,
 complete: function () {
 },
 success: function (response) {
 },
 error: function (xhr, ajaxOptions, thrownError) {
 //alert('[2] Ha ocurrido el siguiente error: '+ thrownError);
 }
 });
 }
 */
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

//       Varios
//       var dominio="https://ww1.sunat.gob.pe/";
//       var subdominio="ww1";


function getFechaLogin(jsonFechaHora){
    var Fecha = jsonFechaHora["fecha"];
    $('#spanFecha').text(convertir_ymd_To_dmy(Fecha));
}


function convertir_ymd_To_dmy(ymd){
    var datearray = ymd.split("-");
    var newdate =  datearray[2] + '-' +  datearray[1] + '-' +  datearray[0];
    return newdate;
}

function iniciaHover() {
    //Opcion Menu
    $("#ulMenu01").on('mouseenter', '#liOpcionFavorito', function () {
        $(this).addClass('open');
    });
    $("#ulMenu01").on('mouseleave', '#liOpcionFavorito', function () {
        $(this).removeClass('open');
    });

    //Servicio
    $("body").on('mouseenter', '.divOpcionServicio', function () {
        if ($(this).hasClass("divOpcionServicioActivo") === false) {
            $(this).append('<span class="glyphicon glyphicon-chevron-right pull-right flecha hidden-xs" aria-hidden="true"></span>');
        }
    });
    $("body").on('mouseleave', '.divOpcionServicio', function () {
        if ($(this).hasClass("divOpcionServicioActivo") === false) {
            $(this).children('span.flecha').remove();
        }
    });
    //Nivel 4
    //Quita estrella o flecha dependiendo si esta en el menu o submenu
    $("body").on('mouseenter', '.nivel4', function () {
        if ($(this).hasClass("subMenu") === true) {
            if ($(this).hasClass("nivelActivo") === false) {
                $(this).append('<span class="glyphicon glyphicon-chevron-right pull-right flecha" aria-hidden="true"></span>');
            }
        } else {
            $(this).append('<span class="glyphicon glyphicon-chevron-right pull-right flecha" aria-hidden="true"></span>');
            $(this).append('<span class="glyphicon glyphicon-star-empty pull-right estrella" aria-hidden="true" title="Agregar a favoritos">&nbsp;</span>');
        }
    });
    $("body").on('mouseleave', '.nivel4', function () {
        if ($(this).hasClass("subMenu") === true) {
            if ($(this).hasClass("nivelActivo") === false) {
                $(this).children('span.flecha').remove();
            }
        } else {
            $(this).children('span.estrella').remove();
            $(this).children('span.flecha').remove();
        }
    });
    //Favoritos
    $("#ulOpcionesFavorito").on('mouseenter', '.aFavorito', function () {
        $(this).append('<span class="glyphicon glyphicon-trash tacho" aria-hidden="true" title="Borrar favoritos" ' +
                'data-index="' + $(this).parent().attr("data-index") + '"></span>');
    });
    $("#ulOpcionesFavorito").on('mouseleave', '.aFavorito', function () {
        $(this).children('span.tacho').remove();
    });
}
function iniciaVariables() {
    //Barra navegaci�n
    spanFecha = $(".spanFecha");
    imgLogo = $("#imgLogo");
    divNavPrinicipal = $("#divNavPrinicipal");
    btnNavbar = $("#btnNavbar");
    aOpcionInicio = $(".aOpcionInicio");
    aOpcionInicioBuzon = $(".aOpcionInicioBuzon");
    aOpcionBuzon = $("#aOpcionBuzon");
    liOpcionUsuario2 = $("#liOpcionUsuario2");
    aOpcionFavorito = $("#aOpcionFavorito");
    aOpcionUsuario1 = $("#aOpcionUsuario1");
    aOpcionUsuario2 = $("#aOpcionUsuario2");
    aOpcionSalir = $(".aOpcionSalir");
    btnSalir = $("#tbtnSalir");
    divBreadcrumb = $("#divBreadcrumb");
    liBreadNivelHome = $("#liBreadNivelHome");
    liBreadNivel4 = $("#liBreadNivel4");
    //Perfil
    aUsuarioDatos = $(".aUsuarioDatos");
    aUsuarioClave = $("#aUsuarioClave");
    aUsuarioPregunta = $(".aUsuarioPregunta");
    aUsuarioAdministrar = $(".aUsuarioAdministrar");
    aUsuarioCambiar = $(".aUsuarioCambiar");
    btnFichaRuc = $(".btnFichaRuc");
    iframeTime = $("#iframeTime");
    iframeAnterior = $("#iframeAnterior");

    //Campa�a
    divModalCampanaBak = $("#divModalCampanaBak");
    divModalCampana = $("#divModalCampana");
    ifrVCE = $("#ifrVCE");

    //Menu
    divContainerMenu = $("#divContainerMenu");
    divContainerAplicacion = $("#divContainerAplicacion");
    footerLinks = $("#footerLinks");
    footerPrincipal = $("#footerPrincipal");
    iDivApplication = $("#iDivApplication");
    divSubMenuIzquierda = $("#divSubMenuIzquierda");

    //Opciones
    divServicios = $("#divServicios");
    divOpcionServicio = $(".divOpcionServicio");
    divTodasOpciones = $("#divTodasOpciones");
    divOpciones = $(".divOpciones");
    divOpcionesIzquierda = $("#divOpcionesIzquierda");
    divOpcionesDerecha = $("#divOpcionesDerecha");
    nivel1 = $(".nivel1");
    nivel1Cuerpo = $(".nivel1Cuerpo");
    ulSubmenu = $("#ulSubmenu");

    opcionTributo = $(".opcionTributo");
    opcionAduana = $(".opcionAduana");
    opcionInsumos = $(".opcionInsumos");

    divAccesos = $(".divAccesos");
    divAccesosPersonas = $(".divAccesosPersonas");
    divAccesosEmpresas = $(".divAccesosEmpresas");
    divAccesosAduanas = $(".divAccesosAduanas");

    //Buscador
    txtBusca = $("#txtBusca");
    spanBotonBuscar = $("#spanBotonBuscar");
    divResultadoBusqueda = $("#divResultadoBusqueda");
    spanTextoBusqueda = $("#spanTextoBusqueda");

}

//Barra navegaci�n
var spanFecha = null;
var imgLogo = null;
var divNavPrinicipal = null;
var btnNavbar = null
var aOpcionInicio = null;
var aOpcionInicioBuzon = null;
var aOpcionBuzon = null;
var liOpcionUsuario2 = null;
var aOpcionFavorito = null;
var aOpcionUsuario1 = null;
var aOpcionUsuario2 = null;
var aOpcionSalir = null;
var btnSalir = null;
var divBreadcrumb = null;
var liBreadNivelHome = null;
var liBreadNivel4 = null;

//Perfil
var aUsuarioDatos = null;
var aUsuarioClave = null;
var aUsuarioPregunta = null;
var aUsuarioAdministrar = null;
var aUsuarioCambiar = null;
var btnFichaRuc = null;
var iframeTime = null;
var iframeAnterior = null;

//Campa�a
var divModalCampanaBak = null;
var divModalCampana = null;
var ifrVCE = null;

//Menu
var divContainerMenu = null;
var divContainerAplicacion = null;
var footerLinks = null;
var footerPrincipal = null;
var iDivApplication = null;
var divSubMenuIzquierda = null;

//Opciones
var divServicios = null;
var divOpcionServicio = null;
var divTodasOpciones = null;
var divOpciones = null;
var divOpcionesIzquierda = null;
var divOpcionesDerecha = null;
var nivel1 = null;
var nivel1Cuerpo = null;
var ulSubmenu = null;


var divAccesos = null;
var divAccesosPersonas = null;
var divAccesosEmpresas = null;
var divAccesosAduanas = null;

//Buscador
var txtBusca = null;
var spanBotonBuscar = "";
var divResultadoBusqueda = null;
var spanTextoBusqueda = "";

//Favoritos y Ultimos
var lastSlctd;
var lastSlctdFav;

//Varios
var listaOpciones = [];//Contiene nivel1, 2, 3 y 4
var threadKey = null;
var l = "10106460006CQUISPES";
var dominio = "https://www.sunat.gob.pe";
var ie2 = false;
var exe = "";

$("#Cerrar-Menu__principal").click(function () {
    $(".Icono-Menu__principal").removeClass("hidden");
    $("#divSubMenuIzquierda").addClass("Salir");
});

$(".Icono-Menu__principal").click(function () {
    $(".Icono-Menu__principal").addClass("hidden");
    $("#divSubMenuIzquierda").removeClass("Salir");
});

function setKeyEditBandeja(keyBandeja) {
    var ventanaActiva = localStorage.getItem("ventana");

    console.log("setKeyEditBandeja: " + keyBandeja);
    console.log("setKeyEditBandeja: ventana => " + ventanaActiva);

    var dataJson = localStorage.getItem(keyBandeja);
    if (dataJson != null) {
        console.log("Se obtuvo informacion del localstorage: " + keyBandeja);
        var dataJsonParse = JSON.parse(dataJson);
        if (dataJsonParse != null && dataJsonParse != undefined) {
            console.log("Se obtuvo informacion JSON!");

            var codFormulario = dataJsonParse.detalle.codFormulario;
            var codFormoAuth = comunLibreria.getEnumListaFormularios().F0626.codeOAuth;

            switch (codFormulario) {
                case comunLibreria.getEnumListaFormularios().F0621.code:
                    codFormoAuth = comunLibreria.getEnumListaFormularios().F0621.codeOAuth;
                    break;
                case comunLibreria.getEnumListaFormularios().F0626.code:
                    codFormoAuth = comunLibreria.getEnumListaFormularios().F0626.codeOAuth;
                    break;
                case comunLibreria.getEnumListaFormularios().F0633.code:
                    codFormoAuth = comunLibreria.getEnumListaFormularios().F0633.codeOAuth;
                    break;
                case comunLibreria.getEnumListaFormularios().F0697.code:
                    codFormoAuth = comunLibreria.getEnumListaFormularios().F0697.codeOAuth;
                    break;
            }

            console.log("setKeyEditBandeja: codFormulario => " + codFormulario);
            localStorage.setItem("SUNAT.Edicion.Formulario"+codFormulario+".Accion", "SI");
            localStorage.setItem("SUNAT.Edicion.Formulario"+codFormulario+".Data", dataJson);

            if (ventanaActiva == "OTRO_FORMULARIO") {
                console.log("setKeyEditBandeja: OTRO_FORMULARIO ");
                eliminarItemEditBandeja(keyBandeja);
                oAuthEditar(codFormoAuth);
            } else if (ventanaActiva.indexOf(codFormulario) > 0) {
                console.log("setKeyEditBandeja: LA VENTANA ES ACTIVA ");
                eliminarItemEditBandeja(keyBandeja);
                
//                    if(codFormulario == "0621"){
//                        console.log('### ok 0621 funcion casilla301');
//                    }else{
                        var frames = window.frames || window.document.frames;
                        var iframeMenu = frames["frame"];
                        iframeMenu.postMessage("EDITAR-" + codFormulario, "*");
//                    }
                
            } else {
                console.log("setKeyEditBandeja: ENTRO AL ELSE ");
                eliminarItemEditBandeja(keyBandeja);
                oAuthEditar(codFormoAuth);
            }
        }
    }
    console.log("Termino setKeyEditBandeja...");
}

function postEditar(path, params, method) {
    method = method || "post";
    var formEdit = document.createElement("form");
    formEdit.setAttribute("method", method);
    formEdit.setAttribute("action", path);
    formEdit.setAttribute("target", "frame");
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);

            formEdit.appendChild(hiddenField);
        }
    }
    document.body.appendChild(formEdit);
    formEdit.submit();
}

function oAuthEditar(idForm) {
    var token = sessionStorage.getItem('token_SUNAT');
    var URL_PLATAFORMA_UNICA_LOCAL = 'http://internet.local.pu.sunat.gob.pe';
    var URL_PLATAFORMA_UNICA_DESA = 'http://internet.desa.pu.sunat.gob.pe';
    var URL_PLATAFORMA_UNICA_QA = 'http://internet.qa.pu.sunat.gob.pe';
    var URL_PLATAFORMA_UNICA = "";//URL_PLATAFORMA_UNICA_DESA;
    postEditar(URL_PLATAFORMA_UNICA + '/servletAcceso?plataforma=web&tipoOperacion=5&idFormulario=' + idForm + '&recurso=/plataformaUnica&idCache=' + token, "");
}

function eliminarItemEditBandeja(keyBandeja) {
    var lis = document.querySelectorAll('#Lista-Pagos li');
    for (var i = 0; li = lis[i]; i++) {
        if (li.id == keyBandeja) {
            li.parentNode.removeChild(li);
        }
    }
    localStorage.removeItem(keyBandeja);
    comunBandeja.actualizandoTotalItems();

    var montoTotal = comunBandeja.obtenerTotalaPagar();
    if (montoTotal==-1)  { montoTotal=0; }
    $("#montototal").html("" + montoTotal.toLocaleString(2) + "");
    $(".Icono-Carrito__Cantidad").html("" + comunBandeja.obtenerTotaItemsParaBandeja() + "");
    $(".Icono-Carrito__Cantidad2").html("" + comunBandeja.obtenerTotaItemsParaBandeja() + "");
}

function setKeyRemoveBandeja(keyBandeja, codigoFormulario) {
    console.log("setKeyRemoveBandeja" + keyBandeja + " codigoFormulario:" + codigoFormulario);
    //$("span.bandeja-codigoformulario-eliminar").text(comunBandeja.obtenerFormularioActivoDescripcion());
    $("span.bandeja-codigoformulario-eliminar").text(comunBandeja.obtenerDescripcionFormularioByKey(keyBandeja));
    var controlUI = $('#btnEliminarBandeja');
    controlUI.attr("data-remove", keyBandeja);
}

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
}


$(document).ready(function () {

    // Esta parte debe ser inicializada en el servidor de SUNAT:
    var token = sessionStorage.getItem('token_SUNAT');
    console.log("token_sunat: " + token);
    $('#token').text(token);
    console.log("hidden: " + $('#token').text());

    //****************************************
    //PLUGIN-BANDEJA::Carrito de Declaraciones
    pluginBandeja.insertCodeCarrito();
    var resultado = pluginBandeja.retornaCarrito();
    console.log("index::ready::resultado:" + resultado);
    if (resultado == null) {
        $("#frame").attr("src", "error.html");
    }

    var responseGS = comunServiciosSesion.obtenerTimbre(token);
    console.log("token: " + token);
    console.log("respuesta: " + responseGS);
    var numRUC = "";
    var timbre = null;
    if (responseGS != null && responseGS.codigo == "200") {

        numRUC = responseGS.usuarioBean["numRUC"];
        timbre = responseGS.usuarioBean;
        /*
         var token = responseGS.dato.token;
         console.log("Token generado: " + token);
         */
        sessionStorage.setItem('token', "");
        sessionStorage.setItem('token', token);
        console.log("Se ejecuto con exito el Gestor de Sesiones.");
        //location.href="index.html";
    } else {
        $('#modalErrorSinServicio').modal('show');
    }
    console.log("Fin de consultar Gestor de Sesion");


    console.log("timbre: " + JSON.stringify(timbre));

    /*
     var numRUC = sessionStorage.getItem("RUC_Login");
     var timbre = sessionStorage.getItem("RUC_" + numRUC);
     */
    var jsonTimbre = timbre; //JSON.parse(timbre);
    if (timbre != null) {
        var usuarioBean = new UsuarioBean();

        usuarioBean.id = jsonTimbre.id;
        usuarioBean.ticket = jsonTimbre.ticket;
        usuarioBean.login = jsonTimbre.login;
        usuarioBean.correo = jsonTimbre.correo;
        usuarioBean.nombres = jsonTimbre.nombres;
        usuarioBean.apePaterno = jsonTimbre.apePaterno;
        usuarioBean.apeMaterno = jsonTimbre.apeMaterno;
        usuarioBean.nombreCompleto = jsonTimbre.nombreCompleto;
        usuarioBean.nroRegistro = jsonTimbre.nroRegistro;
        usuarioBean.codUO = jsonTimbre.codUO;
        usuarioBean.codCate = jsonTimbre.codCate;
        usuarioBean.numRUC = jsonTimbre.numRUC;
        usuarioBean.usuarioSOL = jsonTimbre.usuarioSOL;
        usuarioBean.codDepend = jsonTimbre.codDepend;
        usuarioBean.idCelular = jsonTimbre.idCelular;
        usuarioBean.codTOpeComer = jsonTimbre.codTOpeComer;

        sessionStorage.setItem("RUC_Login", jsonTimbre.numRUC);
        sessionStorage.setItem("RUC_" + jsonTimbre.numRUC, usuarioBean.json());
        $("#nombreUsuario").text(jsonTimbre.nombreCompleto);
        console.log("usuario2:" + $("#nombreUsuario").text());
    }

    //TODO:24Feb2017 PARA EFECTOS DE PRUEBAS
    var usuarioBean = comunLibreria.obtenerUsuarioBean();
    if (usuarioBean != null) {
        $("#nombreUsuario").text(usuarioBean.nombreCompleto);
    }

    //****************************************

    $("#btnEliminarBandeja").click(function () {
        console.log("Boton Eliminar");
        var controlUI = $('#btnEliminarBandeja');
        var keyBandeja = controlUI[0].attributes["data-remove"].value;

        console.log("keyBandeja:" + keyBandeja);
        var lis = document.querySelectorAll('#Lista-Pagos li');
        for (var i = 0; li = lis[i]; i++) {
            if (li.id == keyBandeja) {
                li.parentNode.removeChild(li);
            }
        }
        localStorage.removeItem(keyBandeja);
        comunBandeja.actualizandoTotalItems();

        var montoTotal = comunBandeja.obtenerTotalaPagar();
        if (montoTotal==-1)  { montoTotal=0; }
        $("#montototal").html("" + montoTotal.toLocaleString(2) + "");
        $(".Icono-Carrito__Cantidad").html("" + comunBandeja.obtenerTotaItemsParaBandeja() + "");
        $(".Icono-Carrito__Cantidad2").html("" + comunBandeja.obtenerTotaItemsParaBandeja() + "");
    });

    $(".nivel5_").bind("click", function () {
        $("#frame").contents().find("#A�adir-Bandeja").addClass("hidden");
        $("#frame").contents().find("#StartTour").addClass("hidden");
    });

    // Window Scroll
    $(window).scroll(function () {
        if ($(window).scrollTop() > 30) {
            $('.box-float').addClass("sombra-box");
        } else {
            $('.box-float').removeClass("sombra-box");
        }
    })

});

window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.log("Error Controlado index.js!");
    console.log("msg:" + msg);
    console.log("url:" + url);
    console.log("lineNo:" + lineNo);
    console.log("columnNo:" + columnNo);
    if (error!=null) {
        console.log("error:" + error);
        if (error.stack!=undefined) {
            console.log("error stack:"+error.stack);
        }
    }
    comunServiciosControlador.registrarLogMessage(comunLibreria.generarInformacionLogMessage(msg, url, lineNo, columnNo, error));

    return false;
};


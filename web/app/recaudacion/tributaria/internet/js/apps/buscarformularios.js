//$('input').placeholder();

var formularios = comunIntegrador.obtenerTodosFormularios();
if (formularios != null) {
    var options = {
        data: formularios,
        getValue: "desFor",
        template: {
            type: "links",
            fields: {
                link: "carritoHtml"
            }
        }
    };
    $("#country_v1-query").easyAutocomplete(options);
}

comunIntegrador.obtenerValoresFormularioFrecuentes();

$('.date-picker').datepicker({format: "mm-yyyy", viewMode: "months", minViewMode: "months", autoclose: true});

$(document).ready(function () {

    $("#btnEliminarFormularioFrecuente").click(function () {
        comunIntegrador.eliminarFrecuente();
        comunIntegrador.obtenerValoresFormularioFrecuentes();
    });

    $("#btnSalirErrorIdCache").click(function () {
        sessionStorage.setItem('token', "");
        window.parent.location.href = 'https://e-menu.sunat.gob.pe/internet_qa.html';
    });

    $("#btnSalirXErrorIdCache").click(function () {
        sessionStorage.setItem('token', "");
        window.parent.location.href = 'https://e-menu.sunat.gob.pe/internet_qa.html';
    });
});
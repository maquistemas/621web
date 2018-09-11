
$("#enviar-correo-1").click(function(){
  $("#error-correo").toggleClass("hidden");
});


$('#pdffile').change(function(){
    $('#magicsuggest3 .ms-sel-ctn input').val($(this).val());
  });


$("#buscar-resultados, #buscar-resultado2").click(function(){
  $("#sin-resultados").toggleClass("hidden");
});

$("#buscar-resultados3").click(function(){
  $("#sin-resultados-usuario, #sin-resultados-usuario2").toggleClass("hidden");
});

  //$('input').placeholder();
  
$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})


var options = {
  data: ["0621 - IGV RENTA mensual", "0626 - Retenciones IGV", "0633 - Percepciones IGV - Ventas Internas", " 0697 - Percepciones IGV - Hidrocarburos"]
};

$("#country_v1-query, #country_v2-query").easyAutocomplete(options);



$(document).ready( function ()
{
  /* we are assigning change event handler for select box */
    /* it will run when selectbox options are changed */
    $('#criterios').change(function()
    {
        /* setting currently changed option value to option variable */
        var option = $(this).find('option:selected').val();
         if (option === "2") {
            $("#general").addClass("hidden");
            $("#usuariosunat-tabla").addClass("hidden");
            $("#usuariosunat").addClass("hidden");

            $("#especifica").removeClass("hidden");
            $("#general-especifica").removeClass("hidden");

         };
         if (option === "1") {
            $("#especifica").addClass("hidden");
            $("#usuariosunat-tabla").addClass("hidden");
            $("#usuariosunat").addClass("hidden");

            $("#general").removeClass("hidden");
            $("#general-especifica").removeClass("hidden");
         };
         if (option === "4") {
            $("#especifica").addClass("hidden");
            $("#general").addClass("hidden");
            $("#general-especifica").addClass("hidden");
            $("#sin-resultados").addClass("hidden");

            $("#usuariosunat").removeClass("hidden");
            $("#usuariosunat-tabla").removeClass("hidden");
         };
    });
});
  $('.date-picker').datepicker({
    format: "mm-yyyy",
    viewMode: "months",
    minViewMode: "months",
    autoclose: true
  });
  $('.date-picker2').datepicker({
    format: "dd-mm-yyyy",
    viewMode: "days",
    minViewMode: "days",
    autoclose: true
  });


  $(function() {
    $('#magicsuggest').magicSuggest({
        placeholder: 'Escribir',
        data: ['0621 - IGV RENTA mensual', '0626 - Retenciones IGV', '0633 - Percepciones IGV - Ventas Internas', '0697 - Percepciones IGV - Hidrocarburos']
    });
  });

  $(function() {
    $('#magicsuggest2').magicSuggest({
        placeholder: 'Escribir',
        data: ['0621 - IGV RENTA mensual', '0626 - Retenciones IGV', '0633 - Percepciones IGV - Ventas Internas', '0697 - Percepciones IGV - Hidrocarburos']
    });
  });

    $(function() {
      $('#magicsuggest3').magicSuggest({
          placeholder: 'Escribir',
          data: ['20543314529', '20543373615', '20543381532']
      });
    });


    $(function() {
      $('#magicsuggest4').magicSuggest({
          placeholder: 'Escribir',
          data: ['20543314529', '20543373615', '20543381532']
      });
    });

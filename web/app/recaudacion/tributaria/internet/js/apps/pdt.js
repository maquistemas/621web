$("#exampleInputFile").click(function(){
    $(this).removeClass("input-file_css");
  });
  $('.btnPaso').removeClass("current");
  $('#btnPaso02').addClass("current");
  $("#stop-pdt").click(function(){
    $("#Paso-01-pdt").addClass("hidden");
    $("#Paso-02-pdt").removeClass("hidden");
  });
  $("#enviarPDT").click(function(){
    $("#Paso-01-pdt").addClass("hidden");
    $("#Paso-02-pdt").removeClass("hidden");
    $("#Paso-03-pdt").addClass("hidden");
	
  });
  
  $("#Listo").click(function(){
    var jsonResult = $("body").data("jsonResult");
    var newJsonResult = comunBandeja.addKeyInStorage(jsonResult);
    window.parent.postMessage("AGREGAR-BANDEJA-DE-CARRITO-" + newJsonResult, "*");
    $("#Paso-02-pdt").addClass("hidden");
    $("#Paso-03-pdt").removeClass("hidden");
  });
  
  
  /*$("#Presentar-Pagar").click(function(){
    $("#btnPaso03").trigger("click");
    $(".modal-backdrop").addClass("hidden");
  });*/
  $("#Presentar-PagarPDT").click(function () {
      //Boton de Presentar/Pagar desde la UI, invocando evento click de objeto btnPaso03 de carrito.js
      var montoPagar = comunBandeja.obtenerTotalaPagar();
      if (montoPagar != -1) {
          if (montoPagar > 0) {
              comunLibreria.cambiarTextoBontonesModalPresentarPagar("SI", "NO");
              comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPS", ""));
          }
          else {
              comunLibreria.cambiarTextoBontonesModalPresentarPagar("ACEPTAR", "CANCELAR");
              comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPSCERO", ""));
          }
      }
  });
  $('#btnPresentarPagarPDT').click(function (){
      $("#btnPaso03").trigger("click");
      $(".myModal-40").modal("hide");
      $(".modal-backdrop").addClass("hidden");
  });
  
  $("#Otro-Formulario").click(function(){
    $("#btnPaso01").trigger("click");
    $(".modal-backdrop").addClass("hidden");
  });
  
/*
  $("#Pagar-pdt").click(function(){
    $("#btnPaso03").trigger("click");
    $(".modal-backdrop.fade.in").addClass("hidden");
  }); */

//webMessage para el formulario PDT
function displayMessageFormPDT(evt) {

    if (evt.data == "DESACTIVAR-PANEL-PRESENTARPAGAR") {
        $('#myModal-40').modal('hide');
    }
    if (evt.data == "PAGAR-DESDE-BANDEJA") {
        var montoPagar = comunBandeja.obtenerTotalaPagar();

        if (montoPagar != -1) {
            if (montoPagar > 0) {
                comunLibreria.cambiarTextoBontonesModalPresentarPagar("SI", "NO");
                comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPS", ""));
            }
            else {
                comunLibreria.cambiarTextoBontonesModalPresentarPagar("ACEPTAR", "CANCELAR");
                comunLibreria.mostrarModalPresentarPagar(comunMensajes.getMensaje("INFNPSCERO", ""));
            }
        }
    }
}
if (window.addEventListener) {
    window.addEventListener("message", displayMessageFormPDT, false);
}
else {
    window.attachEvent("onmessage", displayMessageFormPDT);
}

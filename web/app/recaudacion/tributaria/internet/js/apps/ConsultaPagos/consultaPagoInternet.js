appMainAngular.controller('consultaPagoInternetController', function($scope, $location, $uibModal, $log, $timeout, ConsultaPagoResource, ConsultaPagoEspecificaResource, FormularioPagoResource, FechaVigenciaPagoResource, ReporteGeneralPagoResource, ReporteGeneralExcelPagoResource, ReporteEspecificoPagoResource, ReporteEspecificoExcelPagoResource,$http) {
    //ConsultaPagoResource ConsultaResource
    /** funcion que se utiliza para abrir pantallas modal */
    $scope.$on('$viewContentLoaded', function() {window.scrollTo(0,90);});

    $scope.alerta = { type: '', msg: '' };

    $scope.openModal = function (tmpl, ctrl, estilo) {

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: tmpl,//'modalContentLinea.html',
            controller: ctrl,//'modalControllerLinea',
            windowClass: estilo,
            resolve: {
                item: function () {
                    //envio el $scope al controler indicado
                    return $scope;
                }
            }
        });


        modalInstance.result.then(function () {
            $log.info("prueba");
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

	/**************************************************/

    var today = new Date();

	/**************************************************/
    $scope.currentPage = 0;
    $scope.totalItems = 0;
    $scope.pageSize = 5;

    $scope.pages = [];

    $scope.configPages = function(cantidadElementos, filasPorPagina) {
        $scope.totalItems = cantidadElementos;
        $scope.pageSize = filasPorPagina;
        $scope.pages.length = 0;

        var noOfPages = Math.ceil($scope.totalItems / $scope.pageSize);

        for (var i = 1; i <= noOfPages; i++) {
            $scope.pages.push({no: i});
        }

        if ($scope.currentPage >= $scope.pages.length)
            $scope.currentPage = $scope.pages.length - 1;
    }

    $scope.setPage = function(index) {
      //  $scope.jsRemoveClassRow();
        $scope.currentPage = index - 1;
    };

    
	/**************************************************/

    $scope.isGeneral = true;
    $scope.resumenGeneral = false;

    $scope.isEspecifica = false;
    $scope.resumenEspecifica = false;

    $scope.validaGeneral = false;
    $scope.sinResultado = false;

    $scope.resultado = false;
    $scope.resultadoEspecifico=false;
    $scope.constancias = [];
    $scope.constanciasGeneral = [];
    $scope.correoHabilitado=false;
    $scope.imprimirHabilitado=false;
    $scope.perMFAFHabilitado=false;
    $scope.mayorResultado="0";
    $scope.numOrdenEnabled=false;
    $scope.numOperaEnabled=false;
    $scope.mostrarPresentacion = true;
    $scope.mostrarPeriodo=true;

    //
    $scope.consultaBean={};
    $scope.consultaBean.criterio = "G";
    $scope.consultaBean.numerosFormularios=[];
    $scope.consultaBean.rangoDeFechaPresentacionInicio=null;
    $scope.consultaBean.rangoDeFechaPresentacionFin=null;
    $scope.consultaBean.rangoPeriodoTributarioInicioMes="00";
    $scope.consultaBean.rangoPeriodoTributarioInicioAnio =  'A\u00d1O';
    $scope.consultaBean.rangoPeriodoTributarioFinMes="00";
    $scope.consultaBean.rangoPeriodoTributarioFinAnio =  'A\u00d1O';
    $scope.consultaBean.consideraFechaPresentacion = false;
    $scope.consultaBean.consideraPeriodoTributario = false;
    $scope.consultaBean.fechaInicio=null;
    $scope.consultaBean.fechaFin=null;
    $scope.consultaBean.perInicioMes="00";
    $scope.consultaBean.perInicioAnio="A\u00d1O";
    $scope.consultaBean.perFinMes="00";
    $scope.consultaBean.perFinAnio="A\u00d1O";

    //
    $scope.consultaBean.numeroFormulario = "";
    $scope.consultaBean.numeroOrden = "";
    $scope.consultaBean.numeroOperacionBancaria = "";

    $scope.consultaBean.mapaMedioPres=null;
    $scope.consultaBean.mapaTipoForm=null;

    $scope.resultadoConsulta={};
    $scope.resultadoConsulta.ruc="";
    $scope.resultadoConsulta.razonSocial="";
    $scope.resultadoConsulta.formulario="";
   //agregar nuevos parametros
   $scope.resultadoConsulta.numOrd="";
   $scope.resultadoConsulta.numOpebco="";

   // Registrar Auditoria
   var ParametroConsulta = function(){
        this.criterioConsulta="";
        this.tipoConsulta="2";
        this.json = function () {
            return JSON.stringify(this);
        };
   }
   //auditoria
   var CGeneral = function () {
        this.fechaInicio="";
        this.fechaFin="";
        this.periodoInicio="";
        this.periodoFin="";
        this.json = function () {
            return JSON.stringify(this);
        };
   }
   var CEspecifica = function(){    
        this.numOrden="";
        this.numOpera="";
        this.json = function () {
            return JSON.stringify(this);
        };
   }

   var CriterioConsulta = function(){
        this.criterio="";
        this.general=null;
        this.especifico=null;
        this.nroFormularios="";
        this.json = function () {
            return JSON.stringify(this);
        };
   }
    //************************* calendario para las fechas con angular ****************************************//

    $scope.maxDate = new Date(today.getFullYear(),today.getMonth() , today.getDate());

    $scope.dateOptions = {
        formatYear: 'yy',
        maxDate: $scope.maxDate,
        minDate: null,
        showWeeks: false,
        startingDay: 1
    };

    $scope.dateOptions2 = {
        formatYear: 'yy',
        maxDate: $scope.maxDate,
        minDate: new Date($scope.fechaVigenciaP),
        showWeeks: false,
        startingDay: 1
    };

    $scope.toggleMin2 = function() {
        $scope.dateOptions2.minDate = new Date($scope.fechaVigenciaP);
    };

    /** calendario fecha ini */
    $scope.open1 = function() {
        $scope.toggleMin1();
        $scope.popup1.opened = true;
    };

    /** calendario fecha fin */
    $scope.open2 = function() {
        $scope.popup2.opened = true;
        $scope.toggleMin2();
    };

    // formato d fecha
    $scope.formato = 'dd/MM/yyyy';

    $scope.popup1 = {
        opened: false
    };

    $scope.popup2 = {
        opened: false
    };
    //***************************** fecha fin calendario angular

    /******************************************************** GENERAL *************************************************************/

    $scope.fechaVigenciaP = FechaVigenciaPagoResource.get({codigo:"XX"}, function(){
        var dateString = $scope.fechaVigenciaP.fecha;
        var dateParts = dateString.split("-");
        $scope.listarAniosPeriodoTributario(parseInt(dateParts[2]));
        $scope.fechaVigenciaP =  new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);
    });

    $scope.validarFechaVigenciaFechaPI = function(){
        var fechaCompleta = $scope.consultaBean.rangoDeFechaPresentacionInicio;
        if(fechaCompleta!=null){
                var dia = fechaCompleta.getDate();
                var mes = fechaCompleta.getMonth()+1;
                var ano = fechaCompleta.getFullYear();
                var  isFechaPIValida = $scope.isValidDate(dia, mes-1, ano);
            if(isFechaPIValida){
                if($scope.fechaVigenciaP.getTime()>fechaCompleta){
                        $scope.consultaBean.rangoDeFechaPresentacionInicio=null;
                }
                    return true;
            }                
        }
        if(fechaCompleta == undefined){
            $scope.consultaBean.rangoDeFechaPresentacionInicio=null;
        }
    }

    $scope.validarFechaFinal = function(){
        if($scope.consultaBean.rangoDeFechaPresentacionFin== undefined || $scope.consultaBean.rangoDeFechaPresentacionFin==null){
            $scope.consultaBean.rangoDeFechaPresentacionFin=null;
        }
    }

    $scope.toggleMin1 = function() {
        $scope.dateOptions.minDate = $scope.fechaVigenciaP;
    };

    $scope.seleccionarCriterio = function(){
        if($scope.consultaBean.criterio == "G"){
            $scope.isGeneral = true;
            $scope.isEspecifica = false;
        }else if($scope.consultaBean.criterio == "E"){
            $scope.isGeneral = false;
            $scope.isEspecifica = true;
        }

        $scope.limpiar();
    }

    $scope.parametroDetallePlataformaEntity = [];

    $scope.cargarListaFormularios = function(){
        FormularioPagoResource.query().$promise.then(function(data){
        if(data!=null){
            $.each( data, function( key, value ) {
                    var option="";
                    if(value.desFor=='Todos'){
                        option = new Option(value.codFor, value.codFor);
                    }else{
                        option = new Option(value.codFor+"-"+value.desFor, value.codFor);
                        $scope.parametroDetallePlataformaEntity.push({'codFor':value.codFor,'desFor':value.desFor});
                    }
                    $("#numFormulario").append(option);
                    $("#numFormulario").trigger("change");
                });
            $timeout(function() {
                $("#numFormulario").select2('val', 'Todos');
                }, 1000);
            }
        },function(error){});
    }

    $scope.cargarListaFormularios();

    $scope.validarFechaYPeriodoCompleto = function(){
        //No es necesario validar ya que se esta manejando con angular que esto se cumpla.
    }

    $scope.limpiar = function(){
        if("G" == $scope.consultaBean.criterio){
            $scope.consultaBean.numerosFormularios=[];

            $timeout(function() {
                $("#numFormulario").select2('val', 'Todos');
            }, 0);

            $scope.consultaBean.rangoDeFechaPresentacionInicio=null;
            $scope.consultaBean.rangoDeFechaPresentacionFin=null;
            $scope.consultaBean.rangoPeriodoTributarioInicioMes="00";
            $scope.consultaBean.rangoPeriodoTributarioInicioAnio= 'A\u00d1O';
            $scope.consultaBean.rangoPeriodoTributarioFinMes="00";
            $scope.consultaBean.rangoPeriodoTributarioFinAnio= 'A\u00d1O';

            //Oculto los mensajes de advertencia
            $scope.validaGeneral = false;

        }else if("E" == $scope.consultaBean.criterio){
            $scope.consultaBean.numeroFormulario = "";
            $scope.consultaBean.numeroOrden = "";
            $scope.consultaBean.numeroOperacionBancaria = "";
            $scope.numOrdenEnabled=false;
            $scope.numOperaEnabled=false;
            $("#especifica li.select2-search-choice").remove();
        }

        $scope.sinResultado = false;
        $scope.resumenGeneral = false;
        $scope.resumenEspecifica = false;
        $scope.resultado = false;
        $scope.resultadoOpcion = false;
        $scope.imprimirHabilitado=false;
        $scope.perMFAFHabilitado=false;
        $scope.correoHabilitado=false;
    }

    $scope.validarExcluyeNumOrden = function(){
        if($scope.consultaBean.numeroOrden=="" || $scope.consultaBean.numeroOrden ==null){
            $scope.numOperaEnabled=false;
        }else{
            $scope.numOperaEnabled=true;
        }
    }

    $scope.validarExcluyeNumOpera = function(){
        if($scope.consultaBean.numeroOperacionBancaria=="" || $scope.consultaBean.numeroOperacionBancaria ==null){
            $scope.numOrdenEnabled=false;
        }else{
            $scope.numOrdenEnabled=true;
        }
    }

    $scope.anios = [];
    $scope.listarAniosPeriodoTributario = function(anioInicio){
        $scope.anioPlataforma = anioInicio;
        $scope.anioActualSistema = today.getFullYear();

        $scope.anios.push($scope.anioPlataforma);

        if($scope.consultaBean.criterio == "G"){
            for(var i=$scope.anioPlataforma; i < $scope.anioActualSistema; i++){
                $scope.anios.push(i + 1);
            }
            $scope.anios.push('A\u00d1O');
        }
    }

    /**
     * Funcion que devuelve true o false dependiendo de si la fecha es correcta.
     * Tiene que recibir el dia, mes y año
     */
    $scope.isValidDate = function (day,month,year){
        var dteDate;

        // En javascript, el mes empieza en la posicion 0 y termina en la 11
        //   siendo 0 el mes de enero
        // Por esta razon, tenemos que restar 1 al mes
       // month=month-1;
        // Establecemos un objeto Data con los valore recibidos
        // Los parametros son: año, mes, dia, hora, minuto y segundos
        // getDate(); devuelve el dia como un entero entre 1 y 31
        // getDay(); devuelve un num del 0 al 6 indicando siel dia es lunes,
        //   martes, miercoles ...
        // getHours(); Devuelve la hora
        // getMinutes(); Devuelve los minutos
        // getMonth(); devuelve el mes como un numero de 0 a 11
        // getTime(); Devuelve el tiempo transcurrido en milisegundos desde el 1
        //   de enero de 1970 hasta el momento definido en el objeto date
        // setTime(); Establece una fecha pasandole en milisegundos el valor de esta.
        // getYear(); devuelve el año
        // getFullYear(); devuelve el año
        dteDate=new Date(year,month,day);

        //Devuelva true o false...
        return ((day==dteDate.getDate()) && (month==dteDate.getMonth()) && (year==dteDate.getFullYear()));
    }


    $scope.valirdarAnioRangosFechaPresentacion = function(){

        //Fecha de presentacion

        // Si la fecha es correcta, calculamos la edad
        var rptaRangoTrib=true;
        
        if(($scope.consultaBean.rangoDeFechaPresentacionInicio == null
            &&  $scope.consultaBean.rangoDeFechaPresentacionFin !=null ) ||
           ($scope.consultaBean.rangoDeFechaPresentacionInicio!= null  
            && $scope.consultaBean.rangoDeFechaPresentacionFin == null)) {
           // document.getElementById("tipoRango").innerHTML ="Rango de Fecha de presentaci\u00F3n";
        alert("Modificar Fecha de Presentacion");
            return false;   
        }
        if($scope.consultaBean.rangoDeFechaPresentacionInicio == null &&
         $scope.consultaBean.rangoDeFechaPresentacionFin == null){
            rptaRangoTrib=$scope.valirdarAnioRangosPeriodoTributario();
           
          //  if(rptaRangoTrib==false){
                return rptaRangoTrib;
            //}
        }else{
        
        var dia = $scope.consultaBean.rangoDeFechaPresentacionFin.getDate();
        var mes = $scope.consultaBean.rangoDeFechaPresentacionFin.getMonth()+1;
        var ano = $scope.consultaBean.rangoDeFechaPresentacionFin.getFullYear();

        // cogemos los valores actuales
        var ahora_ano = $scope.consultaBean.rangoDeFechaPresentacionInicio.getFullYear();
        var ahora_mes = $scope.consultaBean.rangoDeFechaPresentacionInicio.getMonth()+1;
        var ahora_dia = $scope.consultaBean.rangoDeFechaPresentacionInicio.getDate();
        
        var  isFechaPIValida = $scope.isValidDate(ahora_dia, ahora_mes-1, ahora_ano);
        var  isFechaPFValida = $scope.isValidDate(dia, mes-1, ano);

        if(isFechaPIValida== false){
            alert("La fecha de Inicio es invalida");
            return false;
        }
        if(isFechaPFValida == false){
            alert("La fecha de Fin es invalida");
            return false;
        }

        if((ahora_ano>ano) || (ahora_ano ==  ano && ahora_mes > mes) || (ahora_ano == ano && ahora_mes == mes && ahora_dia > dia) )
        {
            alert("Modificar la Fecha de Presentacion");
            return false;
        }
        // realizamos el calculo
        var edad = (ahora_ano) - ano;
        if ( ahora_mes < mes )
        {
            edad--;
        }
        if ((mes == ahora_mes) && (ahora_dia < dia))
        {
            edad--;
        }

        // calculamos los meses
        var meses=0;
        if(ahora_mes>mes)
            meses=ahora_mes-mes;
        if(ahora_mes<mes)
            meses=12-(mes-ahora_mes);
        if(ahora_mes==mes && dia>ahora_dia)
            meses=11;

        var totalMeses = (edad*12 + meses)*-1;

        if(totalMeses > 12){
            //mensaje de error
            //El rango de entre las fechas de presentacion no puede ser mayor a 12 meses
            document.getElementById("tipoRango").innerHTML =" las fechas registradas."
            $scope.validaGeneral = true;
            return false;
        }
            $scope.consultaBean.consideraFechaPresentacion = true;
            if($scope.valirdarAnioRangosPeriodoTributario() == false){
                return false;
            }
            return true;
        }
    }

    $scope.validarInicioRangoTrib=function(){
        if($scope.consultaBean.rangoPeriodoTributarioInicioMes != "00"  &&
            $scope.consultaBean.rangoPeriodoTributarioInicioAnio!="AÑO" && $scope.consultaBean.rangoPeriodoTributarioFinMes != "00" && 
             $scope.consultaBean.rangoPeriodoTributarioFinAnio!="AÑO"){
            if(parseInt($scope.consultaBean.rangoPeriodoTributarioInicioAnio) > parseInt($scope.consultaBean.rangoPeriodoTributarioFinAnio)){
                 alert("Modificar el periodo tributario");
                  return false;
            }
            if(parseInt($scope.consultaBean.rangoPeriodoTributarioInicioAnio) == parseInt($scope.consultaBean.rangoPeriodoTributarioFinAnio)&&
               parseInt($scope.consultaBean.rangoPeriodoTributarioInicioMes)>parseInt($scope.consultaBean.rangoPeriodoTributarioFinMes) ){
                alert("Modificar el periodo tributario");
                return false;   
            }
            return true;
        }
            
        if($scope.consultaBean.rangoPeriodoTributarioInicioMes == "00" ){
            alert("Modificar el periodo tributario");
            return false;
        }

        if( $scope.consultaBean.rangoPeriodoTributarioInicioAnio =="AÑO"){
            alert("Modificar el periodo tributario");
            return false;
        }

        if($scope.consultaBean.rangoPeriodoTributarioFinMes == "00"){
            alert("Modificar el periodo tributario");
            return false;
        }

        if($scope.consultaBean.rangoPeriodoTributarioFinAnio =="AÑO"){
            alert("Modificar el periodo tributario");
            return false;
        }
    }

    $scope.valirdarAnioRangosPeriodoTributario = function(){

        //Fecha de periodo tributario
        if(($scope.consultaBean.rangoPeriodoTributarioInicioMes == "00"
            && $scope.consultaBean.rangoPeriodoTributarioInicioAnio=="AÑO") 
        && ($scope.consultaBean.rangoPeriodoTributarioFinMes == "00" 
            && $scope.consultaBean.rangoPeriodoTributarioFinAnio=="AÑO") && $scope.consultaBean.rangoDeFechaPresentacionInicio!=null &&
            $scope.consultaBean.rangoDeFechaPresentacionFin!=null ){
            //alert("Modificar el periodo tributario");
        $scope.consultaBean.consideraPeriodoTributario = false;
            return true;
        }

        if(!$scope.validarInicioRangoTrib()){
            return false;
        }

        var yearD = $scope.consultaBean.rangoPeriodoTributarioFinAnio - $scope.consultaBean.rangoPeriodoTributarioInicioAnio;
        var monthD = $scope.consultaBean.rangoPeriodoTributarioFinMes - $scope.consultaBean.rangoPeriodoTributarioInicioMes;
        var mesesTotal = yearD*12 + monthD;

        if(mesesTotal > 12){
            //mensaje de error
            //El rango de entre las fechas del periodo tributario no puede ser mayor a 12 meses
            document.getElementById("tipoRango").innerHTML=" los per\u00EDodos registrados.";
            $scope.validaGeneral = true;
            return false;
        }

        $scope.consultaBean.consideraPeriodoTributario = true;
        return true;
    }

    $scope.formatearPago=function(pago){
        var respuestaPago="S/. 0.00";
        if(pago!=null && pago !="" && pago != undefined &&
            pago!="0" &&pago!=0){
            if (typeof pago == 'number') {
                pago = "" + pago.toString();
                //pago = pago.replace(/,/g, '');
                var montoTotal = parseFloat(pago);
                pago = montoTotal.toLocaleString('en-US', {minimumFractionDigits: 2});
                respuestaPago ="S/. "+pago;
            }
        }
        return respuestaPago;
    }

    $scope.mostrarFecPresPeriodo = function(){
        $scope.mostrarPresentacion = true;
        $scope.mostrarPeriodo=true;
        if(!$scope.consultaBean.consideraFechaPresentacion){
            $scope.mostrarPresentacion = false;
        }
        if(!$scope.consultaBean.consideraPeriodoTributario){
            $scope.mostrarPeriodo=false;
        }
    }

    $scope.validarAnual = function(){
        
        if($scope.consultaBean.rangoPeriodoTributarioInicioMes==13 && ($scope.consultaBean.rangoPeriodoTributarioInicioAnio!='AÑO'
            && $scope.consultaBean.rangoPeriodoTributarioInicioAnio!="" && $scope.consultaBean.rangoPeriodoTributarioInicioAnio!=undefined 
            && $scope.consultaBean.rangoPeriodoTributarioInicioAnio !=null)){
            $scope.perMFAFHabilitado=true;
            
            $scope.consultaBean.rangoPeriodoTributarioFinMes =  $scope.consultaBean.rangoPeriodoTributarioInicioMes;  
            $scope.consultaBean.rangoPeriodoTributarioFinAnio = $scope.consultaBean.rangoPeriodoTributarioInicioAnio;
        }else{
            $scope.perMFAFHabilitado=false;
        }
        
    }

     $scope.crearRegistroAuditoria = function(){
        var parametroConsulta = new ParametroConsulta();
        var cConsulta = new CriterioConsulta();

        var cTxtGeneral = "General";
        var cTxtEspecifico ="Especifico";

        if($scope.consultaBean.criterio == "G"){
            cConsulta.criterio = cTxtGeneral;
            
            var cg = new CGeneral();
            //Fecha Presentacion
            if($scope.consultaBean.rangoDeFechaPresentacionInicio != null && 
                $scope.consultaBean.rangoDeFechaPresentacionFin !=null ){
                cg.fechaInicio= $scope.padStr($scope.consultaBean.rangoDeFechaPresentacionInicio.getDate())+"/"+$scope.padStr(1 + $scope.consultaBean.rangoDeFechaPresentacionInicio.getMonth())+"/"+$scope.padStr($scope.consultaBean.rangoDeFechaPresentacionInicio.getFullYear()); 
                cg.fechaFin= $scope.padStr($scope.consultaBean.rangoDeFechaPresentacionFin.getDate()) +"/" + $scope.padStr(1 + $scope.consultaBean.rangoDeFechaPresentacionFin.getMonth())+"/"+$scope.padStr($scope.consultaBean.rangoDeFechaPresentacionFin.getFullYear()); 
            }

            if($scope.consultaBean.rangoPeriodoTributarioInicioMes !="00" &&
             $scope.consultaBean.rangoPeriodoTributarioInicioAnio!="AÑO" &&
                $scope.consultaBean.rangoPeriodoTributarioFinMes !="00" && 
                $scope.consultaBean.rangoPeriodoTributarioFinAnio !="AÑO"){
                cg.periodoInicio = $scope.consultaBean.rangoPeriodoTributarioInicioMes +"/"+$scope.consultaBean.rangoPeriodoTributarioInicioAnio;
                cg.periodoFin = $scope.consultaBean.rangoPeriodoTributarioFinMes +"/"+ $scope.consultaBean.rangoPeriodoTributarioFinAnio;
            }
            cConsulta.nroFormularios = $scope.consultaBean.numerosFormularios;
            cConsulta.general = cg;
        }else{
            cConsulta.criterio = cTxtEspecifico;
              var ce= new CEspecifica();
            if($scope.consultaBean.numeroOrden != ""){
                ce.numOrden = $scope.consultaBean.numeroOrden;
            }
            if($scope.consultaBean.numeroOperacionBancaria  !=""){
                ce.numOpera = $scope.consultaBean.numeroOperacionBancaria;
            }
            cConsulta.nroFormularios=$scope.consultaBean.numeroFormulario;
            cConsulta.especifico= ce;
        }

        
        parametroConsulta.criterioConsulta=cConsulta;
        var contextPathAuditoria = urlProtocol + urlDomain + "/v1/recaudacion/tributaria/consultaauditoria/t/auditoria/registrarauditoria";

        $http.post(contextPathAuditoria,JSON.stringify(parametroConsulta), {headers: {'idCache': sessionStorage.getItem('token'), 'idFormulario': '*MENU*'}})
            .success( function(response) {
                             console.log("Todo Correcto auditoria");
            })
            .error(function(data) {
                
             console.log("Todo incorrecto auditoria");
            });

    }

    $scope.buscarConstancia =  function(){
        
        //validar datos obligatorios
        $scope.validaGeneral=false;
        $scope.sinResultado=false;
        $scope.resumenGeneral = false;
        $scope.resultado = false;
        $scope.resultadoOpcion = false;
        $scope.resumenEspecifica = false;
        $scope.correoHabilitado=false;
        $scope.imprimirHabilitado=false;
        $scope.resultadoExceso = false;
        $scope.mayorResultado="0";
        $scope.consultaBean.consideraPeriodoTributario = false;
        $scope.consultaBean.consideraFechaPresentacion = false;
        $scope.consultaBean.numerosFormularios = [];

        var busGenerarlForm = $("#numFormulario").select2("val");
        if($.inArray("Todos",busGenerarlForm)!=-1){
                $.each($scope.parametroDetallePlataformaEntity, function( index, value ) {
                    $scope.consultaBean.numerosFormularios.push(value.codFor);
                });
        }else{
            $.each(busGenerarlForm, function( index, value ) {
                    $scope.consultaBean.numerosFormularios.push(value);
                });
        }
        if($scope.consultaBean.numerosFormularios.length == 0){
            alert("Debe de seleccionar un o unos formularios");
            return false;
        }
        if(($scope.consultaBean.rangoPeriodoTributarioInicioMes == "00" 
        && $scope.consultaBean.rangoPeriodoTributarioFinMes=="00" &&
        $scope.consultaBean.rangoPeriodoTributarioInicioAnio=="AÑO" && $scope.consultaBean.rangoPeriodoTributarioFinAnio=="AÑO")
        && ($scope.consultaBean.rangoDeFechaPresentacionInicio == null && $scope.consultaBean.rangoDeFechaPresentacionFin ==null )){
            alert("Debe Seleccionar un rango de fecha o periodo");
            return false;
        }

         rangoFechaPresenCorrecta = $scope.valirdarAnioRangosFechaPresentacion();

        if(rangoFechaPresenCorrecta ){// || rangoFechaPeriTribCorrecta){
            
            $scope.consultaBean.fechaInicio="-";
            $scope.consultaBean.fechaFin="-";
            if($scope.consultaBean.rangoDeFechaPresentacionInicio!=null &&  $scope.consultaBean.rangoDeFechaPresentacionFin!=null){
               $scope.consultaBean.fechaInicio=$scope.padStr($scope.consultaBean.rangoDeFechaPresentacionInicio.getFullYear()) + $scope.padStr(1 + $scope.consultaBean.rangoDeFechaPresentacionInicio.getMonth()) + $scope.padStr($scope.consultaBean.rangoDeFechaPresentacionInicio.getDate())
               $scope.consultaBean.fechaFin=$scope.padStr($scope.consultaBean.rangoDeFechaPresentacionFin.getFullYear()) + $scope.padStr(1 + $scope.consultaBean.rangoDeFechaPresentacionFin.getMonth()) + $scope.padStr($scope.consultaBean.rangoDeFechaPresentacionFin.getDate());
                
            }
            $scope.consultaBean.perInicioMes= $scope.consultaBean.rangoPeriodoTributarioInicioMes;
            $scope.consultaBean.perInicioAnio = $scope.consultaBean.rangoPeriodoTributarioInicioAnio;
            $scope.consultaBean.perFinMes = $scope.consultaBean.rangoPeriodoTributarioFinMes;
            $scope.consultaBean.perFinAnio = $scope.consultaBean.rangoPeriodoTributarioFinAnio;
            $scope.crearRegistroAuditoria();
            $scope.constanciasGeneral = ConsultaPagoResource.query({
                numeroFormularios:$scope.consultaBean.numerosFormularios,
                rangoDeFechaPresentacionInicio: $scope.consultaBean.fechaInicio ,
                rangoDeFechaPresentacionFin:$scope.consultaBean.fechaFin ,
                rangoPeriodoTributarioInicioMes: $scope.consultaBean.perInicioMes,
                rangoPeriodoTributarioInicioAnio: $scope.consultaBean.perInicioAnio,
                rangoPeriodoTributarioFinMes: $scope.consultaBean.perFinMes,
                rangoPeriodoTributarioFinAnio: $scope.consultaBean.perFinAnio,
                consideraFechaPresentacion: $scope.consultaBean.consideraFechaPresentacion,
                consideraPeriodoTributario: $scope.consultaBean.consideraPeriodoTributario
            }, function(){

                if($scope.constanciasGeneral.length == 0){
                    $scope.sinResultado = true;
                    $scope.resultado = false;

                    $scope.resumenGeneral = false;
                    $scope.resumenEspecifica = false;
                }else{
                    $scope.sinResultado = false;
                    $scope.resultadoOpcion = true;

                    //$scope.resumenGeneral = true;
                    $scope.resumenEspecifica = false;

                    if($scope.constanciasGeneral[0].cantidad !=null){
                        $scope.resumenGeneral = false;
                        $scope.resultadoExceso = true;
                        $scope.correoHabilitado =true;
                        $scope.imprimirHabilitado=true;
                        $scope.mayorResultado="1";
                        $scope.resultado=false;
                    }else{
                        $scope.mostrarFecPresPeriodo();
                        $scope.resultado=true;
                        $scope.resumenGeneral = true;
                        $scope.constancias = $scope.constanciasGeneral;
                        $scope.consultaBean.mapaMedioPres = $scope.constancias[0].mapMedioPres;
                        $scope.consultaBean.mapaTipoForm = $scope.constancias[0].mapTipoForm;

                        $scope.resultadoConsulta.ruc=$scope.constancias[0].numRuc;
                        $scope.resultadoConsulta.razonSocial=$scope.constancias[0].strNumRuc;
                        $scope.formulario = $scope.consultaBean.numerosFormularios.length > 1 ? "M\u00faltiples" : $scope.constancias[0].parametriaFormulario.codFor+" - "+$scope.constancias[0].parametriaFormulario.desFor;    
                        
                         if($scope.consultaBean.consideraFechaPresentacion){
                        $scope.fechaPresentacionInicio = $scope.padStr($scope.consultaBean.rangoDeFechaPresentacionInicio.getDate()) + "/" + $scope.padStr(1 + $scope.consultaBean.rangoDeFechaPresentacionInicio.getMonth())+ "/" + $scope.padStr($scope.consultaBean.rangoDeFechaPresentacionInicio.getFullYear());
                        $scope.fechaPresentacionFin = $scope.padStr($scope.consultaBean.rangoDeFechaPresentacionFin.getDate()) + "/" + $scope.padStr(1 + $scope.consultaBean.rangoDeFechaPresentacionFin.getMonth())+ "/" + $scope.padStr($scope.consultaBean.rangoDeFechaPresentacionFin.getFullYear());
                        $scope.showFechaPresentacion = true;
                        }else{
                            $scope.fechaPresentacionInicio = "";
                            $scope.fechaPresentacionFin = "";
                            $scope.showFechaPresentacion = false;
                        }
                        if($scope.consultaBean.consideraPeriodoTributario){
                            $scope.periodoTributarioInicio = $scope.consultaBean.rangoPeriodoTributarioInicioMes + "/" + $scope.consultaBean.rangoPeriodoTributarioInicioAnio;
                            $scope.periodoTributarioFin = $scope.consultaBean.rangoPeriodoTributarioFinMes + "/" + $scope.consultaBean.rangoPeriodoTributarioFinAnio;
                        }else{
                            $scope.periodoTributarioInicio = "";
                            $scope.periodoTributarioFin = "";
                        }
                         //$scope.noOfPages();
                        $scope.configPages($scope.constancias.length,50);//configuracion del paginado
                    }
                    
                }

            });

        }//else{
           // $scope.validaGeneral = true;
        //}

    }

    $scope.padStr = function (i) {
        return (i < 10) ? "0" + i : "" + i;
    };

    $scope.fechaActual = $scope.padStr(today.getDate()) + "/" + $scope.padStr((today.getMonth() + 1)) + "/" + $scope.padStr(today.getFullYear());

    /******************************************************** ESPECIFICO *************************************************************/

    $scope.buscarConstanciaEspecifica =  function(){
        //validar datos obligatorios
        $scope.validaGeneral=false;
        $scope.sinResultado=false
        $scope.resumenEspecifica = false;
        $scope.resultado = false;
        $scope.resultadoOpcion=false;
        $scope.resumenGeneral= false;
        $scope.imprimirHabilitado=false;
        $scope.correoHabilitado=false;
        
       if($scope.consultaBean.numeroFormulario == ""){
            alert("Debe de ingresar un numero de formulario.");
            return false;
        }

        if($scope.consultaBean.numeroOrden == "" && $scope.consultaBean.numeroOperacionBancaria == ""){
            alert("Debe de ingresar al menos un numero de orden o un numero de operacion bancaria.");
            return false;
        }

        $scope.crearRegistroAuditoria();
        $scope.constancias = ConsultaPagoEspecificaResource.query({
            numeroFormulario: $scope.consultaBean.numeroFormulario,
            numeroOrden: $scope.consultaBean.numeroOrden,
            numeroOperacionBancaria: ($scope.consultaBean.numeroOperacionBancaria != "" ? $scope.consultaBean.numeroOperacionBancaria : null)
        }, function(){
            
                    
            if($scope.constancias.length == 0){

                $scope.sinResultado = true;
                $scope.resultado = false;

                $scope.resumenGeneral = false;
                $scope.resumenEspecifica = false;
            }else{
                
                $scope.resultadoConsulta.ruc=$scope.constancias[0].numRuc;
                $scope.resultadoConsulta.razonSocial=$scope.constancias[0].strNumRuc;
                $scope.resultadoConsulta.numOrd=  $scope.constancias[0].numOrd;
                $scope.resultadoConsulta.numOpebco= $scope.constancias[0].numOpebco;
                $scope.formulario =  $scope.constancias[0].parametriaFormulario.codFor+" - "+$scope.constancias[0].parametriaFormulario.desFor;
                $scope.consultaBean.mapaMedioPres = $scope.constancias[0].mapMedioPres;
                $scope.consultaBean.mapaTipoForm = $scope.constancias[0].mapTipoForm;
                $scope.sinResultado = false;
                $scope.resultado = true;
                $scope.resultadoOpcion=true;

                $scope.resumenGeneral = false;
                $scope.resumenEspecifica = true;


                $scope.configPages($scope.constancias.length,50);//configuracion del paginado
            }

        });

    };

    $scope.mostrarDetalle = function(constancia){
        // Por el momento solo esta mostrando el formulario 0621
        // Mas adelante segun el codigo de formulario que venga se mostrara la pantalla indicada
        // constancia.parametriaFormulario.codFor

        $scope.constancia = constancia;
        $scope.openModal('modalDetalleInternet.html','modalDetallePagoInternetController', 'large-Modal');
    };

    $scope.mostrarConstancia = function(constancia){
        $scope.constancia = constancia;
        $scope.openModal('modalConstanciaPagoInternet.html','modalConstanciaPagoInternetController', '');
    };

    $scope.mostrarConstanciaBoleta = function(constancia){
        $scope.constancia = constancia;
        $scope.openModal('modalBoletaInternet.html','modalConstanciaBoletaInternetController', '');   
    };


    $scope.generarReportePdf = function(){

        if($scope.consultaBean.criterio == "G"){

            if($scope.mayorResultado == "1" || $scope.mayorResultado== "2"){
                $scope.correoHabilitado=false;
                $scope.mayorResultado="1";
                return false;
            }

            var pdfGeneral = ReporteGeneralPagoResource.$getPdf({
                numeroFormularios:$scope.consultaBean.numerosFormularios,
                rangoDeFechaPresentacionInicio: $scope.consultaBean.fechaInicio,
                rangoDeFechaPresentacionFin: $scope.consultaBean.fechaFin,
                rangoPeriodoTributarioInicioMes: $scope.consultaBean.perInicioMes,//$scope.consultaBean.rangoPeriodoTributarioInicioMes,
                rangoPeriodoTributarioInicioAnio: $scope.consultaBean.perInicioAnio,//$scope.consultaBean.rangoPeriodoTributarioInicioAnio,
                rangoPeriodoTributarioFinMes: $scope.consultaBean.perFinMes,//$scope.consultaBean.rangoPeriodoTributarioFinMes,
                rangoPeriodoTributarioFinAnio: $scope.consultaBean.perFinAnio,//$scope.consultaBean.rangoPeriodoTributarioFinAnio,
                consideraFechaPresentacion: $scope.consultaBean.consideraFechaPresentacion,
                consideraPeriodoTributario: $scope.consultaBean.consideraPeriodoTributario

            });
            pdfGeneral.$promise.then(function() {
                var blobObject = new Blob([pdfGeneral.response] , {type:'application/pdf'});
                var fileName = "declaraciones_pagos.pdf";
                if(window.navigator.msSaveOrOpenBlob) { // para internet explorer
                    window.navigator.msSaveOrOpenBlob(blobObject, fileName);

                } else { 
                    var url = URL.createObjectURL(blobObject);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.target = '_blank';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }
                
            }, function(){
                alert("Ha ocurrido un error en el reporte");
            });

        }else{

            var pdfEspecifico = ReporteEspecificoPagoResource.$getPdf({
                numeroFormulario: $scope.consultaBean.numeroFormulario,
                numeroOrden: $scope.consultaBean.numeroOrden,
                numeroOperacionBancaria: ($scope.consultaBean.numeroOperacionBancaria != "" ? $scope.consultaBean.numeroOperacionBancaria : null)
            });
            pdfEspecifico.$promise.then(function() {
                var blobObject = new Blob([pdfEspecifico.response] , {type:'application/pdf'});
                var fileName = "declaraciones_pagos.pdf";

                if(window.navigator.msSaveOrOpenBlob) { // para internet explorer
                    window.navigator.msSaveOrOpenBlob(blobObject, fileName);

                } else { 
                    var url = URL.createObjectURL(blobObject);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.target = '_blank';
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                }

                
            }, function(){
                alert("Ha ocurrido un error en el reporte");
            });

        }
    };

    $scope.generarReporteExcel = function(){

        if($scope.consultaBean.criterio == "G"){

            if($scope.mayorResultado == "1" || $scope.mayorResultado=="2"){
                $scope.correoHabilitado=false;
                $scope.mayorResultado="2";
                return false;
            }

            var excelGeneral = ReporteGeneralExcelPagoResource.$getExcel({
                numeroFormularios:$scope.consultaBean.numerosFormularios,
                rangoDeFechaPresentacionInicio: $scope.consultaBean.fechaInicio,
                rangoDeFechaPresentacionFin: $scope.consultaBean.fechaFin,
                rangoPeriodoTributarioInicioMes: $scope.consultaBean.perInicioMes,//$scope.consultaBean.rangoPeriodoTributarioInicioMes,
                rangoPeriodoTributarioInicioAnio: $scope.consultaBean.perInicioAnio,//$scope.consultaBean.rangoPeriodoTributarioInicioAnio,
                rangoPeriodoTributarioFinMes: $scope.consultaBean.perFinMes,//$scope.consultaBean.rangoPeriodoTributarioFinMes,
                rangoPeriodoTributarioFinAnio: $scope.consultaBean.perFinAnio,//$scope.consultaBean.rangoPeriodoTributarioFinAnio,
                consideraFechaPresentacion: $scope.consultaBean.consideraFechaPresentacion,
                consideraPeriodoTributario: $scope.consultaBean.consideraPeriodoTributario
            });
            excelGeneral.$promise.then(function() {
                var blobObject = new Blob([excelGeneral.response] , {type:'application/vnd.ms-excel'});
                var fileName = "declaraciones_pagos.xls";

                if(window.navigator.msSaveOrOpenBlob) { // para internet explorer
                    window.navigator.msSaveOrOpenBlob(blobObject, fileName);

                } else {
                    var url = URL.createObjectURL(blobObject);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = fileName;
                    a.target = '_blank';
                    document.body.appendChild(a);
                        a.click();
                    document.body.removeChild(a);    
                }
            }, function(){
                alert("Ha ocurrido un error en el reporte");
            });

        }else{

            var excelEspecifico = ReporteEspecificoExcelPagoResource.$getExcel({
                numeroFormulario: $scope.consultaBean.numeroFormulario,
                numeroOrden: $scope.consultaBean.numeroOrden,
                numeroOperacionBancaria: ($scope.consultaBean.numeroOperacionBancaria != "" ? $scope.consultaBean.numeroOperacionBancaria : null)
            });
            excelEspecifico.$promise.then(function() {
                var blobObject = new Blob([excelEspecifico.response] , {type:'application/vnd.ms-excel'});
                var fileName = "declaraciones_pagos.xls";

                if(window.navigator.msSaveOrOpenBlob) { // para internet explorer
                    window.navigator.msSaveOrOpenBlob(blobObject, fileName);

                } else {
                    var url = URL.createObjectURL(blobObject);
                    var a = document.createElement('a');
                    a.href = url;
                    a.download = "declaraciones_pagos.xls";
                    a.target = '_blank';
                    document.body.appendChild(a);
                        a.click();
                    document.body.removeChild(a);    
                }
                
            }, function(){
                alert("Ha ocurrido un error en el reporte");
            });

        }
    };



    $scope.enviarCorreo = function(){

        $scope.openModal('modalEMailPagoInternet.html','modalEMailPagoInternetController', '');
    };
    //constancia


});


/** controlers para las ventanas modal */
appMainAngular.controller('modalDetallePagoInternetController', function(DetallePagoFormularioResource, ReporteDetallePagoResource, $scope, $uibModalInstance, item) {

    $scope.formulario = item.constancia;
    $scope.formulario.plataforma="";

    $scope.casilla = DetallePagoFormularioResource.get({
        numeroOrden: $scope.formulario.numOrd
    });

    $scope.casilla.$promise.then(function (result) {
        $scope.casilla = result;
    });

    //recorrer
    if(item.consultaBean.mapaMedioPres !=null){
        $.each( item.consultaBean.mapaMedioPres, function( key, value ) {
            if(key==$scope.formulario.medioPres){
                $scope.formulario.plataforma = value;
            }
        });
    }

    if(item.consultaBean.mapaTipoForm !=null){
        $.each( item.consultaBean.mapaTipoForm, function( key, value ) {
            if(key==$scope.formulario.tipoForm){
                $scope.formulario.plataforma = $scope.formulario.plataforma+" - "+value;
            }
        });
    }

    $scope.guardarDeclaracion = function () {
        var pdfDetalle = ReporteDetallePagoResource.$getPdf({
            numeroOrden: $scope.formulario.numOrd,
            periodoTributario: $scope.formulario.strPerTri,
            numeroRuc: $scope.formulario.numRuc,
            descRuc: $scope.formulario.strNumRuc != null ? $scope.formulario.strNumRuc : "S/N",
            origen: $scope.formulario.codOrifor
        });
        pdfDetalle.$promise.then(function() {
            var blobObject = new Blob([pdfGeneral.response] , {type:'application/pdf'});
            var fileName = "detalle_declaracion_pago.pdf";

            if(window.navigator.msSaveOrOpenBlob) { // para internet explorer
                    window.navigator.msSaveOrOpenBlob(blobObject, fileName);

            } else { 
                var url = URL.createObjectURL(blobObject);
                var a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.target = '_blank';
                document.body.appendChild(a);
                    a.click();
                document.body.removeChild(a);
            }
            
        }, function(){
                alert("Ha ocurrido un error en el reporte");
        });
    };

    $scope.closeModal = function () {
        $uibModalInstance.dismiss('closeModal');
    };

});

appMainAngular.controller('modalConstanciaPagoInternetController', function(ConstanciaPagoFormularioResource, ReporteConstanciaPagoResource, $scope, $http,$uibModal, $uibModalInstance,$log, item) {

    $scope.crearIframe = function () {
        var idIframeConstanciaPago = "iframeConstanciaPago";
        var idDivConstanciaPago = "constancia";
        var iframeConstanciaPago = document.getElementById(idIframeConstanciaPago);
        var noExisteIframeConstanciaPago = (iframeConstanciaPago == null);
        if (noExisteIframeConstanciaPago) {
            var hilo = setInterval(function () {
                var divConstanciaPago = $('div#' + idDivConstanciaPago)[0];
                var existeDivConstanciaPago = (divConstanciaPago != undefined | divConstanciaPago != null);
                if (existeDivConstanciaPago) {
                    iframeConstanciaPago = document.createElement('iframe');
                    iframeConstanciaPago.id = idIframeConstanciaPago;
                    document.body.appendChild(iframeConstanciaPago);

                    var styleConstanciaPagoOrigen = divConstanciaPago.ownerDocument.head.children;
                    for (var i = 0; i < styleConstanciaPagoOrigen.length; i++) {
                        if (styleConstanciaPagoOrigen[i].localName === "link") {
                            var styleCopy = styleConstanciaPagoOrigen[i].cloneNode(true);
                            var cssLink = document.createElement("link");
                            var existInString = styleCopy.href.indexOf("bootstrap.min.css") > 0;
                            if (existInString) {
                                cssLink.href = styleCopy.href;
                                cssLink.rel = "stylesheet";
                                cssLink.type = "text/css";
                                iframeConstanciaPago.contentDocument.head.appendChild(cssLink);
                            }
                        }
                    }
                    iframeConstanciaPago.style.display = "none";
                    clearInterval(hilo);
                }
            }, 300);
        }
    };

    $scope.crearIframe();

    $scope.formulario = item.constancia;
    $scope.formulario.plataforma="";
    $scope.formulario.nomEntFin ="";
    $scope.formulario.numOpebco ="";
    $scope.formulario.descMedpag="";
    $scope.formulario.strfecPago="";
    $scope.formulario.codIndrec="";
    $scope.tributoDeuda=false;
    $scope.mostrarRectificatoria=false;
    if($scope.formulario.descTipoDecla==2){
        $scope.mostrarRectificatoria=true;
    }
    
    $scope.openModal = function (tmpl, ctrl, estilo) {

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: tmpl,//'modalContentLinea.html',
            controller: ctrl,//'modalControllerLinea',
            windowClass: estilo,
            resolve: {
                item: function () {
                    //envio el $scope al controler indicado
                    return $scope;
                }
            }
        });

        modalInstance.result.then(function () {
            $log.info("prueba");
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };

    ConstanciaPagoFormularioResource.query({
        numeroOrden: $scope.formulario.numOrd
    }).$promise.then(function(data){
        if(data!=null){
            if(data.tributos!=null){
                $scope.tributos = data.tributos;

                $.each($scope.tributos, function( index, value ) {
                    if(value.mtoResPag!=0){
                        $scope.tributoDeuda=true;
                    }
                });    
            }
            $scope.formulario.semFor = data.semana;
            $scope.formulario.nomEntFin = data.banco;
            $scope.formulario.numOpebco = data.numeroOperacion;
            $scope.formulario.descMedpag = data.formaPago;
            $scope.formulario.codIndrec = data.tipoDeclaracion;
            $scope.formulario.strfecPago= data.fechaPago;
            if(data.form0601){
                $scope.formulario.form0601=data.form0601;
                $scope.formulario.trabajadores = data.trabajadores;
                $scope.formulario.pensionistas = data.pensionistas;
                $scope.formulario.personalCuarta =data.personalCuarta;
                $scope.formulario.modalidadForm =  data.modalidadForm;
                $scope.formulario.normasEspeciales =data.normasEspeciales;
                $scope.formulario.terceros =data.terceros;
            }    
        }
    },function(error){});

    $scope.formatearPago=function(pago){
        var respuestaPago="S/. 0.00";
        if(pago!=null && pago !="" && pago != undefined &&
            pago!="0" &&pago!=0){
            if (typeof pago == 'number') {
                pago = "" + pago.toString();
                //pago = pago.replace(/,/g, '');
                var montoTotal = parseFloat(pago);
                pago = montoTotal.toLocaleString('en-US', {minimumFractionDigits: 2});
                respuestaPago ="S/. "+pago;
            }
        }
        return respuestaPago;
    }

    //recorrer
    if(item.consultaBean.mapaMedioPres !=null){
        $.each( item.consultaBean.mapaMedioPres, function( key, value ) {
            if(key==$scope.formulario.medioPres){
                $scope.formulario.plataforma = value;
            }
        });
    }

    if(item.consultaBean.mapaTipoForm !=null){
        $.each( item.consultaBean.mapaTipoForm, function( key, value ) {
            if(key==$scope.formulario.tipoForm){
                $scope.formulario.plataforma = $scope.formulario.plataforma+" - "+value;
            }
        });
    }

    $scope.enviarCorreoCompuesto = function(){

        $scope.constancia = item.constancia;
        $scope.openModal('modalEMailPagoInternet.html','modalEMailDJInternetController', '');
    };
    $scope.exportarConstancia= function () {
        if($scope.formulario.ecmFormulario==null || $scope.formulario.ecmFormulario=="" || $scope.formulario.ecmFormulario==undefined){
            alert("Ha ocurrido un error");
            return false;
        }

        var pdfConstancia = ReporteConstanciaPagoResource.$getPdf({
            numeroOrden: $scope.formulario.numOrd,
            codigoEcm: $scope.formulario.ecmFormulario
        });
        pdfConstancia.$promise.then(function(data) {
            if(data.cantidad==0){
                alert("Ha ocurrido un error");
                return false;
            }

            var blobObject = new Blob([pdfConstancia.response] , {type:'application/pdf'});
            var fileName = "constancia_pago.pdf";

            if(window.navigator.msSaveOrOpenBlob) { // para internet explorer
                    window.navigator.msSaveOrOpenBlob(blobObject, fileName);
            } else {
                var url = URL.createObjectURL(blobObject);
                var a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.target = '_blank';
                document.body.appendChild(a);
                    a.click();
                document.body.removeChild(a);    
            } 
            
        }, function(){
                alert("Ha ocurrido un error en el reporte");
        });
    };





    $scope.closeModal = function () {
        $uibModalInstance.dismiss('closeModal');
    };

    $scope.printDetalleConstancia = function (idDivConstanciaPago) {
        var iframeConstanciaPago = document.getElementById("iframeConstanciaPago");
        var divConstanciaPago = $('div#'+idDivConstanciaPago)[0];
        var cloneDivConstanciaPago = divConstanciaPago.cloneNode(true);
        var isNullIframeConstanciaPago = (iframeConstanciaPago == null);
        if(!isNullIframeConstanciaPago){
            var divConstanciaPago = iframeConstanciaPago.contentDocument.getElementById(idDivConstanciaPago);
            if(divConstanciaPago != null){
                iframeConstanciaPago.contentDocument.body.removeChild(divConstanciaPago);
            }
            iframeConstanciaPago.contentDocument.body.appendChild(cloneDivConstanciaPago);
            iframeConstanciaPago.contentWindow.print();
        }
    };

});

//Controlador de Boletas
appMainAngular.controller('modalConstanciaBoletaInternetController', function(ConstanciaPagoBoletaResource, ReporteConstanciaPagoResource, $scope, $http,$uibModal, $uibModalInstance,$log, item) {

    $scope.crearIframe = function () {
        var idIframeConstanciaBoleta = "iframeConstanciaBoleta";
        var idDivConstanciaBoleta = "modalBoleta";
        var iframeConstanciaBoleta = document.getElementById(idIframeConstanciaBoleta);
        var noExisteIframeConstanciaPago = (iframeConstanciaBoleta == null);
        if (noExisteIframeConstanciaPago) {
            var hilo = setInterval(function () {
                var divConstanciaBoleta = $('div#' + idDivConstanciaBoleta)[0];
                var existeDivConstanciaBoleta = (divConstanciaBoleta != undefined | divConstanciaBoleta != null);
                if (existeDivConstanciaBoleta) {
                    iframeConstanciaBoleta = document.createElement('iframe');
                    iframeConstanciaBoleta.id = idIframeConstanciaBoleta;
                    document.body.appendChild(iframeConstanciaBoleta);
                    var styleConstanciaBoletaOrigen = divConstanciaBoleta.ownerDocument.head.children;
                    for (var i = 0; i < styleConstanciaBoletaOrigen.length; i++) {
                        if (styleConstanciaBoletaOrigen[i].localName === "link") {
                            var styleCopy = styleConstanciaBoletaOrigen[i].cloneNode(true);
                            var cssLink = document.createElement("link");
                            var existInString = styleCopy.href.indexOf("bootstrap.min.css") > 0;
                            if (existInString) {
                                cssLink.href = styleCopy.href;
                                cssLink.rel = "stylesheet";
                                cssLink.type = "text/css";
                                iframeConstanciaBoleta.contentDocument.head.appendChild(cssLink);
                            }
                        }
                    }
                    iframeConstanciaBoleta.style.display = "none";
                    clearInterval(hilo);
                }
            }, 300);
        }
    };

    $scope.crearIframe();

    $scope.formulario = item.constancia;
    $scope.boleta={};
    $scope.boleta.codFor="";
    $scope.boleta.tributo="";
    $scope.formulario.plataforma="";
    
    $scope.openModal = function (tmpl, ctrl, estilo) {

        var modalInstance = $uibModal.open({
            animation: true,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: tmpl,//'modalContentLinea.html',
            controller: ctrl,//'modalControllerLinea',
            windowClass: estilo,
            resolve: {
                item: function () {
                    //envio el $scope al controler indicado
                    return $scope;
                }
            }
        });

        modalInstance.result.then(function () {
            $log.info("prueba");
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });

    };
    
    ConstanciaPagoBoletaResource.query({
        numeroOrden: $scope.formulario.numOrdOri,
        numeroOrdenBoleta:$scope.formulario.numOrd
    }).$promise.then(function(data){
        
        if(data!=null){
            if(data.objeto!=null){
                $scope.formulario.descMedpag = data.objeto.formaPago;
                $scope.boleta.codFor = data.objeto.codFor;
                $scope.boleta.tributo = data.objeto.tributo;
            }   
        }
    },function(error){});
     
    
   
    if(item.consultaBean.mapaMedioPres !=null){
        $.each( item.consultaBean.mapaMedioPres, function( key, value ) {
            if(key==$scope.formulario.medioPres){
                $scope.formulario.plataforma = value;
            }
        });
    }

    if(item.consultaBean.mapaTipoForm !=null){
        $.each( item.consultaBean.mapaTipoForm, function( key, value ) {
            if(key==$scope.formulario.tipoForm){
                $scope.formulario.plataforma = $scope.formulario.plataforma+" - "+value;
            }
        });
    }

    $scope.formatearPago=function(pago){
        var respuestaPago="S/. 0.00";
        if(pago!=null && pago !="" && pago != undefined &&
            pago!="0" &&pago!=0){
            if (typeof pago == 'number') {
                pago = "" + pago.toString();
                //pago = pago.replace(/,/g, '');
                var montoTotal = parseFloat(pago);
                pago = montoTotal.toLocaleString('en-US', {minimumFractionDigits: 2});
                respuestaPago ="S/. "+pago;
            }
        }
        return respuestaPago;
    }

    $scope.enviarCorreoCompuesto = function(){
        $scope.constancia = item.constancia;
        $scope.openModal('modalEMailInternet.html','modalEMailDJInternetController', '');
    };
    $scope.exportarConstancia = function () {
        if($scope.formulario.ecmFormulario==null || $scope.formulario.ecmFormulario=="" || $scope.formulario.ecmFormulario==undefined){
            alert("Ha ocurrido un error");
            return false;
        }

        var pdfConstancia = ReporteConstanciaPagoResource.$getPdf({
            numeroOrden: $scope.formulario.numOrd,
            codigoEcm: $scope.formulario.ecmFormulario
        });
        pdfConstancia.$promise.then(function(data) {
            if(data.cantidad==0){
                alert("Ha ocurrido un error");
                return false;
            }
            var blobObject = new Blob([pdfConstancia.response] , {type:'application/pdf'});
            var fileName = "boleta_pago.pdf";
            if(window.navigator.msSaveOrOpenBlob) { // para internet explorer
                    window.navigator.msSaveOrOpenBlob(blobObject, fileName);

            } else {
                var url = URL.createObjectURL(blobObject);
                var a = document.createElement('a');
                a.href = url;
                a.download = fileName;
                a.target = '_blank';
                document.body.appendChild(a);
                    a.click();
                document.body.removeChild(a);    
            }
            
        }, function(){
                alert("Ha ocurrido un error en el reporte");
        });
    };

    $scope.closeModal = function () {
        $uibModalInstance.dismiss('closeModal');
    };

    $scope.printDetalleConstancia = function (idDivConstanciaBoleta) {
        var iframeConstanciaBoleta = document.getElementById("iframeConstanciaBoleta");
        var divConstanciaBoleta = $('#'+idDivConstanciaBoleta)[0];
        var cloneDivConstanciaBoleta = divConstanciaBoleta.cloneNode(true);
        var isNullIframeConstanciaBoleta = (iframeConstanciaBoleta == null);
        if(!isNullIframeConstanciaBoleta){
            var divConstanciaBoleta = iframeConstanciaBoleta.contentDocument.getElementById(idDivConstanciaBoleta);
            if(divConstanciaBoleta != null){
                iframeConstanciaBoleta.contentDocument.body.removeChild(divConstanciaBoleta);
            }
            iframeConstanciaBoleta.contentDocument.body.appendChild(cloneDivConstanciaBoleta);
            iframeConstanciaBoleta.contentWindow.print();
        }
    };

});

appMainAngular.controller('modalEMailPagoInternetController', function(EnviarCorreoPagosGeneralDeclaIt, EnviarCorreoPagosEspecificoDeclaIt, $scope, $uibModalInstance, item) {

    $scope.isEmailError=false;

    $scope.validarCorreo=function(){
       if($scope.correo=="" || $scope.correo==undefined){
            $scope.isEmailError=false;
        }
    }

    $scope.enviarDatosAdjuntos = function () {
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
        if(!regexEmail.test($scope.correo)){
            $scope.isEmailError=true;
            return false;
        }
        if(item.consultaBean.criterio == "G"){

            EnviarCorreoPagosGeneralDeclaIt.get({
                numeroFormularios:item.consultaBean.numerosFormularios,
                rangoDeFechaPresentacionInicio: item.consultaBean.fechaInicio,
                rangoDeFechaPresentacionFin: item.consultaBean.fechaFin,
                rangoPeriodoTributarioInicioMes: item.consultaBean.perInicioMes,//$scope.consultaBean.rangoPeriodoTributarioInicioMes,
                rangoPeriodoTributarioInicioAnio: item.consultaBean.perInicioAnio,//$scope.consultaBean.rangoPeriodoTributarioInicioAnio,
                rangoPeriodoTributarioFinMes: item.consultaBean.perFinMes,//$scope.consultaBean.rangoPeriodoTributarioFinMes,
                rangoPeriodoTributarioFinAnio: item.consultaBean.perFinAnio,//$scope.consultaBean.rangoPeriodoTributarioFinAnio,
                consideraFechaPresentacion: item.consultaBean.consideraFechaPresentacion,
                consideraPeriodoTributario: item.consultaBean.consideraPeriodoTributario,
                email: $scope.correo
            }).$promise.then(
                //success
                function( value ){/*Do something with value*/
//		        	$scope.alerta.type = "warning";
//					$scope.alerta.msg = 'Los datos se grabaron correctamente.';
//					$scope.openModal('mensajeInfo.html','modalAlert');
//					$location.url("/crear-banco");
                    $scope.closeModal();
                },
                //error
                function( error ){/*Do something with error*/
//		        	$scope.alerta.type = "danger";
//		    		$scope.alerta.msg = $scope.exc001;
//		    		$scope.openModal('mensajeInfo.html','modalAlert');
                }
            );

        }else{

            EnviarCorreoPagosEspecificoDeclaIt.get({
                numeroFormulario: item.consultaBean.numeroFormulario,
                numeroOrden: item.consultaBean.numeroOrden,
                numeroOperacionBancaria: (item.consultaBean.numeroOperacionBancaria != "" ? item.consultaBean.numeroOperacionBancaria : null),
                email: $scope.correo
            }).$promise.then(
                //success
                function( value ){/*Do something with value*/
//		        	$scope.alerta.type = "warning";
//					$scope.alerta.msg = 'Los datos se grabaron correctamente.';
//					$scope.openModal('mensajeInfo.html','modalAlert');
//					$location.url("/crear-banco");
                    $scope.closeModal();
                },
                //error
                function( error ){/*Do something with error*/
//		        	$scope.alerta.type = "danger";
//		    		$scope.alerta.msg = $scope.exc001;
//		    		$scope.openModal('mensajeInfo.html','modalAlert');
                }
            );

        }

    };

    $scope.closeModal = function () {
        $uibModalInstance.dismiss('closeModal');
    };

});

appMainAngular.controller('modalEMailDJInternetController', function(EnviarCorreoDJDeclaIt, $scope, $uibModalInstance, item) {

    $scope.isEmailError=false;

    $scope.formulario = item.constancia;
    $scope.validarCorreo=function(){
        if($scope.correo=="" || $scope.correo==undefined){
            $scope.isEmailError=false;
        }
    }
    /**Modificar 09032017*/
    $scope.enviarDatosAdjuntos = function (constancia) {
        var regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
        if(!regexEmail.test($scope.correo)){
            $scope.isEmailError=true;
            return false;
        }
        EnviarCorreoDJDeclaIt.get({
            numeroOrden: $scope.formulario.numOrd,
            email: $scope.correo
        }).$promise.then(
            //success
            function( value ){/*Do something with value*/
//              $scope.alerta.type = "warning";
//              $scope.alerta.msg = 'Los datos se grabaron correctamente.';
//              $scope.openModal('mensajeInfo.html','modalAlert');
//              $location.url("/crear-banco");
                $scope.closeModal();
            },
            //error
            function( error ){/*Do something with error*/
//              $scope.alerta.type = "danger";
//              $scope.alerta.msg = $scope.exc001;
//              $scope.openModal('mensajeInfo.html','modalAlert');
            }
        );

    };

    $scope.closeModal = function () {
        $uibModalInstance.dismiss('closeModal');
    };

});



var scopeAngular;
var abc = "hola";
var appMainAngular = angular.module('mainApp', [ 'ngRoute', 'ui.bootstrap', 'ngResource' ]);


appMainAngular.config([ '$routeProvider', function($routeProvider) {

    //$routeProvider
////	// Home
////
////    // DECLARACIONES Y PAGOS
////    // INTERNET
////
////	// Home
////
////    // DECLARACIONES Y PAGOS
////    // INTERNET
//	.when("/", {
//	templateUrl : "consultaprueba.html",
//		controller : "consultaDeclaracionInternetController"
//	})
    // INTRANET

} ]);

appMainAngular.controller('MainCtrl', function($scope,$sce) {


    $scope.verIframe=true;
    $scope.verDecl=false;
    $scope.verconsulta=false;
    $scope.verDeclaraciones=function()
    {
        $scope.verIframe=false;
        $scope.verDecl=true;
        $scope.verconsulta=false;


    };
    $scope.verConstancia=function()
    {
        $scope.verIframe=false;
        $scope.verDecl=false;
        $scope.verconsulta=true;


    };



    $scope.currentUrl = "gui/carrito2.html";

    $scope.urls = [
        {
            label:"IGV RENTA Mensual",
            name:"gui/carrito2.html#f0621.html"
        },
        {
            label:"Agentes de Retención IGV",
            name:"gui/carrito2.html#f0626.html"
        }
        ,
        {
            label:"Agentes de Percepción Hidrocarburos",
            name:"gui/carrito2.html#f0633.html"
        }
        ,
        {
            label:"Agentes de Percepción Ventas Internas",
            name:"gui/carrito2.html#f0697.html"
        }
        ,
        {
            label:"PDT",
            name:"gui/carrito2.html#pdt.html"
        }


    ];



    $scope.setCurrentUrl = function(url)
    {
        $scope.currentUrl = url;
        $scope.verIframe=true;
        $scope.verDecl=false;
        $scope.verconsulta=false;
    }

    $scope.getUrl = function()
    {
        console.log($scope.currentUrl);
        localStorage.setItem("ventana",$scope.currentUrl);
        return $sce.trustAsResourceUrl($scope.currentUrl);
    }

    scopeAngular = $scope;


    $scope.post=function(path, params, method)
    {
        method = method || "post";

        $scope.form=document.createElement("form");
        var form=  angular.element($scope.form);
        form.setAttribute("method", method);
        form.setAttribute("action", path);
        form.setAttribute("target", "frame");
        for(var key in params) {
            if(params.hasOwnProperty(key)) {
                $scope.hiddenField = document.createElement("input");
                var hiddenField=angular.element($scope.hiddenField);
                hiddenField.setAttribute("type", "hidden");
                hiddenField.setAttribute("name", key);
                hiddenField.setAttribute("value", params[key]);

                form.appendChild(hiddenField);
            }

        }

        document.body.appendChild(form);
        form.submit();
    }
    $scope.oAuth= function(idForm) {
        var token = sessionStorage.getItem('token_SUNAT');
        var URL_PLATAFORMA_UNICA_LOCAL = 'http://internet.local2.pu.sunat.gob.pe';
        var URL_PLATAFORMA_UNICA_DESA = 'http://internet.desa.pu.sunat.gob.pe';
        var URL_PLATAFORMA_UNICA = ""; //URL_PLATAFORMA_UNICA_DESA;
        $scope.post(URL_PLATAFORMA_UNICA + '/servletAcceso?plataforma=web&tipoOperacion=5&idFormulario=' + idForm + '&recurso=/plataformaUnica&idCache=' + token, "");
    }
});



/** funcion que se utiliza para la paginacion */
appMainAngular.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

function printDirective() {
    var printSection = document.getElementById('printSection');
    // if there is no printing section, create one
    if (!printSection) {
        printSection = document.createElement('div');
        printSection.id = 'printSection';
        document.body.appendChild(printSection);
    }
    function link(scope, element, attrs) {
        element.on('click', function () {
            var elemToPrint = document.getElementById(attrs.printElementId);
            if (elemToPrint) {
                printElement(elemToPrint);
            }
        });

        if (window.matchMedia) {
            var mediaQueryList = window.matchMedia('print');
            mediaQueryList.addListener(function(mql) {
                if (!mql.matches) {
                    afterPrint();
                } else {
                    // before print (currently does nothing)
                }
            });
        }

        window.onafterprint = afterPrint;
    }
    function afterPrint() {
        // clean the print section before adding new content
        printSection.innerHTML = '';
    }
    function printElement(elem) {
        // clones the element you want to print
        
        var domClone = elem.cloneNode(true);
        //printSection.innerHTML = '';
        printSection.appendChild(domClone);
        window.print();
    }
    return {
        link: link,
        restrict: 'A'
    };
}

appMainAngular.directive('ngPrint', [printDirective]);


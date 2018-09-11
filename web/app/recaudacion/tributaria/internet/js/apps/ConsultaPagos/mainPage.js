var scopeAngular;
var abc = "hola";
var appMainAngular = angular.module('mainApp', [ 'ngRoute', 'ui.bootstrap', 'ngResource' ]);


/*appMainAngular.config([ '$routeProvider', function($routeProvider) {

 $routeProvider
 // Home

 // DECLARACIONES Y PAGOS
 // INTERNET

 .when("/declaracion-pago-internet", {
 templateUrl : "gui/consultaDeclaracionInternet.html",
 controller : "consultaDeclaracionInternetController"
 })


 // CONSTANCIA DE PAGO
 // INTERNET
 .when("/constancia-pago-internet", {
 templateUrl : "gui/consultaPagoInternet.html",
 controller : "consultaPagoInternetController"
 })
 // INTRANET

 } ]);*/

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



    $scope.currentUrl = "app/recaudacion/tributaria/internet/html/carrito.html";

    $scope.urls = [
        {
            label:"IGV RENTA Mensual",
            name:"app/recaudacion/tributaria/internet/html/carrito.html#f0621.html"
        },
        {
            label:"Agentes de Retención IGV",
            name:"app/recaudacion/tributaria/internet/html/carrito.html#f0626.html"
        }
        ,
        {
            label:"Agentes de Percepción Hidrocarburos",
            name:"app/recaudacion/tributaria/internet/html/carrito.html#f0633.html"
        }
        ,
        {
            label:"Agentes de Percepción Ventas Internas",
            name:"app/recaudacion/tributaria/internet/html/carrito.html#f0697.html"
        }
        ,
        {
            label:"PDT",
            name:"app/recaudacion/tributaria/internet/html/carrito.html#pdt.html"
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
});



/** funcion que se utiliza para la paginacion */
appMainAngular.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

function printDirective() {
    // var printSection = document.getElementById('printSection');
    // // if there is no printing section, create one
    // if (!printSection) {
    //     printSection = document.createElement('div');
    //     printSection.id = 'printSection';
    //     document.body.appendChild(printSection);
    // }
    // function link(scope, element, attrs) {
    //     element.on('click', function () {
    //         var elemToPrint = document.getElementById(attrs.printElementId);
    //         if (elemToPrint) {
    //             printElement(elemToPrint);
    //         }
    //     });
    //
    //     if (window.matchMedia) {
    //         var mediaQueryList = window.matchMedia('print');
    //         mediaQueryList.addListener(function(mql) {
    //             if (!mql.matches) {
    //                 afterPrint();
    //             } else {
    //                 // before print (currently does nothing)
    //             }
    //         });
    //     }
    //
    //     window.onafterprint = afterPrint;
    // }
    // function afterPrint() {
    //     // clean the print section before adding new content
    //     printSection.innerHTML = '';
    // }
    // function printElement(elem) {
    //     // clones the element you want to print
    //     var domClone = elem.cloneNode(true);
    //     printSection.innerHTML = '';
    //     printSection.appendChild(domClone);
    //     window.print();
    // }
    // return {
    //     link: link,
    //     restrict: 'A'
    // };
}

appMainAngular.directive('ngPrint', [printDirective]);


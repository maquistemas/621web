//********************************************** CONSULTA GENERAL ***********************************************//
var urlProtocol = ""; //"http://";
var urlDomain = ""; //"192.168.1.159";
//var urlDomain1="localhost:9070"
var contextPathDeclaracionIt = urlProtocol+ urlDomain+"/v1/recaudacion/tributaria/consultadeclaracion/t/internet/declaracion";
var contextPathReports=urlProtocol+ urlDomain+"/v1/recaudacion/tributaria/consulta/t/visorconstancia";
//var contextPathDeclaracionIt = "http://localhost:9082/declaracion/internet";
//var contextPathReports="http://localhost:9070/visorconstancia";

var tokenKeyAuth = comunLibreria.getTokenKeyAuth();
var tokenValueAuth = comunLibreria.getTokenValueAuth();
var tokenKeyIdFormulario = "IdFormulario"; //comunLibreria.gettokenKeyIdFormulario();
var tokenValueIdFormulario = "*MENU*"; //comunLibreria.gettokenValueIdFormulario();

appMainAngular.factory('ConsultaDeclaInterResource', function($resource) {
    return $resource(contextPathDeclaracionIt + '/factoriaConsulta/:numeroFormularios/:rangoDeFechaPresentacionInicio/:rangoDeFechaPresentacionFin/:rangoPeriodoTributarioInicioMes/:rangoPeriodoTributarioInicioAnio/:rangoPeriodoTributarioFinMes/:rangoPeriodoTributarioFinAnio/:consideraFechaPresentacion/:consideraPeriodoTributario/:numeroFormulario/:numeroOrden/:numeroOperacionBancaria',
        {
            numeroFormularios: '@numeroFormularios',
            rangoDeFechaPresentacionInicio: '@rangoDeFechaPresentacionInicio',
            rangoDeFechaPresentacionFin: '@rangoDeFechaPresentacionFin',
            rangoPeriodoTributarioInicioMes: '@rangoPeriodoTributarioInicioMes',
            rangoPeriodoTributarioInicioAnio: '@rangoPeriodoTributarioInicioAnio',
            rangoPeriodoTributarioFinMes: '@rangoPeriodoTributarioFinMes',
            rangoPeriodoTributarioFinAnio: '@rangoPeriodoTributarioFinAnio',
            consideraFechaPresentacion: '@consideraFechaPresentacion',
            consideraPeriodoTributario: '@consideraPeriodoTributario',
            numeroFormulario: '@numeroFormulario',
            numeroOrden: '@numeroOrden',
            numeroOperacionBancaria: '@numeroOperacionBancaria'
        },
        {'query':  {
            method:'GET',
            isArray:true,
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        }
    );
});

appMainAngular.factory('ConsultaDeclaInterEspecificaResource', function($resource) {
    return $resource(contextPathDeclaracionIt + '/factoriaEspecificaConsulta/',
        {},
        {'query':  {
            method:'GET',
            isArray:true,
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});

appMainAngular.factory('DetalleFormularioDeclaInterResource', function($resource) {
    return $resource(contextPathDeclaracionIt + '/factoriaDetalleFormulario/:numeroOrden',
        {
            numeroOrden: '@numeroOrden'
        },
        {'get':  {
            method:'GET',
            isArray:false,
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});
appMainAngular.factory('ConstanciaDeclaInterFormularioResource', function($resource) {
    return $resource(contextPathDeclaracionIt + '/factoriaConstanciaFormulario/:numeroOrden',
        {
            numeroOrden: '@numeroOrden'
        },
        {'query':  {
            method:'GET',
            isArray:false,
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});

appMainAngular.factory('ConstanciaDeclaInterBoletaResource', function($resource) {
    return $resource(contextPathDeclaracionIt + '/factoriaConstanciaBoleta/:numeroOrden/:numeroOrdenBoleta',
        {
            numeroOrden: '@numeroOrden',
            numeroOrdenBoleta: '@numeroOrdenBoleta'
        },
        {'query':  {
            method:'GET',
            isArray:false,
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});

//Se agrego un enpoint para las anexas
appMainAngular.factory('DescargarAnexasResource', function($resource) {
    return $resource(contextPathReports + '/factoriaDescargarAnexasFormulario/',
        {
		  numeroOrden: '@numeroOrden'	
		},
        {
            $getText: {
                method: 'GET',
                headers: {
                    accept: 'application/zip',
                    IdCache: tokenValueAuth,
                    IdFormulario: tokenValueIdFormulario
                },
                scope: true,
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function (data, headersGetter) {
                    var text=0;
                    var cantidad=data.byteLength;
                    if (data && data.byteLength!=0) {
                        text = new Blob([data], {
                            type: 'application/zip'
                        });
                        
                    }
                    return {
                        response: text,'cantidad':cantidad
                    };
                }
            }
        }
    );
});

appMainAngular.factory('FormularioDeclaInterResource', function($resource) {
    return $resource(contextPathDeclaracionIt + '/factoriaFormulario/',
        {},
        {'query':  {
            method:'GET',
            isArray:true,
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});

appMainAngular.factory('FechaVigenciaDeclaInterResource', function($resource) {
    return $resource(contextPathDeclaracionIt + '/factoriaFechaVigencia/:codigo',
        {
            codigo: '@codigo'
        },
        {'get':  {
            method:'GET',
            isArray:false,
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});

//------------------------------
appMainAngular.factory('ReporteGeneralDeclaInterResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReporteGeneral/',
        {},
        {
            $getPdf: {
                method: 'GET',
                headers: {
                    accept: 'application/pdf',
                    IdCache: tokenValueAuth,
                    IdFormulario: tokenValueIdFormulario
                },
                scope: true,
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function (data, headersGetter) {
                    var pdf;
                    if (data) {
                        pdf = new Blob([data], {
                            type: 'application/pdf'
                        });
                    }
                    return {
                        response: pdf
                    };
                }
            }
        }
    );
});

appMainAngular.factory('ReporteGeneralExcelDeclaInterResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReporteGeneralExcel/',
        {},
        {
            $getExcel: {
                method: 'GET',
                headers: {
                    accept: 'application/vnd.ms-excel',
                    IdCache: tokenValueAuth,
                    IdFormulario: tokenValueIdFormulario
                },
                scope: true,
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function (data, headersGetter) {
                    var excel;
                    if (data) {
                        excel = new Blob([data], {
                            type: 'application/vnd.ms-excel'
                        });
                    }
                    return {
                        response: excel
                    };
                }
            }
        }
    );
});

appMainAngular.factory('ReporteEspecificoDeclaInterResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReporteEspecifico/',
        {},
        {
            $getPdf: {
                method: 'GET',
                headers: {
                    accept: 'application/pdf',
                    IdCache: tokenValueAuth,
                    IdFormulario: tokenValueIdFormulario
                },
                scope: true,
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function (data, headersGetter) {
                    var pdf;
                    if (data) {
                        pdf = new Blob([data], {
                            type: 'application/pdf'
                        });
                    }
                    return {
                        response: pdf
                    };
                }
            }
        }
    );
});

appMainAngular.factory('ReporteEspecificoExcelDeclaInterResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReporteEspecificoExcel/',
        {},
        {
            $getExcel: {
                method: 'GET',
                headers: {
                    accept: 'application/vnd.ms-excel',
                    IdCache: tokenValueAuth,
                    IdFormulario: tokenValueIdFormulario
                },
                scope: true,
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function (data, headersGetter) {
                    var excel;
                    if (data) {
                        excel = new Blob([data], {
                            type: 'application/vnd.ms-excel'
                        });
                    }
                    return {
                        response: excel
                    };
                }
            }
        }
    );
});

appMainAngular.factory('ReporteDetalleDeclaInterResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReporteDetallepdf/',
        {},
        {
            $getPdf: {
                method: 'GET',
                headers: {
                    accept: 'application/pdf',
                    IdCache: tokenValueAuth,
                    IdFormulario: tokenValueIdFormulario
                },
                scope: true,
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function (data, headersGetter) {
                    var cantidad=data.byteLength;
                    var pdf;
                    if (data) {
                        pdf = new Blob([data], {
                            type: 'application/pdf'
                        });
                    }
                    return {
                        response: pdf , 'cantidad':cantidad
                    };
                }
            }
        }
    );
});

appMainAngular.factory('ReporteConstanciaDeclaInterResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReporteConstancia/',
        {},
        {
            $getPdf: {
                method: 'GET',
                headers: {
                    accept: 'application/pdf',
                    IdCache: tokenValueAuth,
                    IdFormulario: tokenValueIdFormulario
                },
                scope: true,
                responseType: 'arraybuffer',
                cache: true,
                transformResponse: function (data, headersGetter) {
                    var cantidad=data.byteLength;
                    var pdf;
                    if (data) {
                        pdf = new Blob([data], {
                            type: 'application/pdf'
                        });
                    }
                    return {
                        response: pdf,'cantidad':cantidad
                    };
                }
            }
        }
    );
});

appMainAngular.factory('EnviarCorreoGeneralDeclaIt', function($resource) {
    return $resource(contextPathReports + '/factoriaEnviarCorreoGeneralIt/',
        {},
        {'get':  {
            method:'GET',
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});

appMainAngular.factory('EnviarCorreoEspecificoDeclaIt', function($resource) {
    return $resource(contextPathReports + '/factoriaEnviarCorreoEspecificoIt/',
        {},
        {'get':  {
            method:'GET',
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});

appMainAngular.factory('EnviarCorreoCompuestoDeclaIt', function($resource) {
    return $resource(contextPathReports + '/factoriaEnviarCorreoCompuestoIt/',
        {},
        {'get':  {
            method:'GET',
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});
appMainAngular.factory('EnviarCorreoDJDeclaIt', function($resource) {
    return $resource(contextPathReports + '/factoriaEnviarCorreoReporteDJInternet/',
        {},
        {'get':  {
            method:'GET',
            headers: {
                IdCache: tokenValueAuth,
                IdFormulario: tokenValueIdFormulario
            }
        }
        });
});

//********************************************** CONSULTA GENERAL ***********************************************//
var urlProtocol = ""; //"http://";
var urlDomain = ""; //"192.168.1.159";
//var urlDomain1="localhost:9070"
var contextPathIt = urlProtocol+urlDomain+ "/v1/recaudacion/tributaria/consultapago/t/internet/pago";
var contextPathReports=urlProtocol+urlDomain+"/v1/recaudacion/tributaria/consulta/t/visorconstancia";

var tokenKeyAuth = comunLibreria.getTokenKeyAuth();
var tokenValueAuth = comunLibreria.getTokenValueAuth();
var tokenKeyIdFormulario = "IdFormulario"; //comunLibreria.gettokenKeyIdFormulario();
var tokenValueIdFormulario = "*MENU*"; //comunLibreria.gettokenValueIdFormulario();

appMainAngular.factory('ConsultaPagoResource', function($resource) {
    return $resource(contextPathIt + '/factoriaConsultaPago/:numeroFormularios/:rangoDeFechaPresentacionInicio/:rangoDeFechaPresentacionFin/:rangoPeriodoTributarioInicioMes/:rangoPeriodoTributarioInicioAnio/:rangoPeriodoTributarioFinMes/:rangoPeriodoTributarioFinAnio/:consideraFechaPresentacion/:consideraPeriodoTributario/:numeroFormulario/:numeroOrden/:numeroOperacionBancaria?hash_id='+Math.random(),
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

appMainAngular.factory('ConsultaPagoEspecificaResource', function($resource) {
    return $resource(contextPathIt + '/factoriaEspecificaConsultaPago/',
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

appMainAngular.factory('DetallePagoFormularioResource', function($resource) {
    return $resource(contextPathIt + '/factoriaDetallePagoFormulario/:numeroOrden',
        {
            numeroOrden: '@numeroOrden'
        },
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

appMainAngular.factory('ConstanciaPagoFormularioResource', function($resource) {
    return $resource(contextPathIt + '/factoriaConstanciaPagoFormulario/:numeroOrden',
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

appMainAngular.factory('ConstanciaPagoBoletaResource', function($resource) {
    return $resource(contextPathIt + '/factoriaConstanciaBoleta/:numeroOrden/:numeroOrdenBoleta',
        {
            numeroOrden: '@numeroOrden',
            numeroOrdenBoleta: '@numeroOrdenBoleta'
        },
        {'query':  {
            method:'GET',
            isArray:false,
            headers: {
                'IdCache': tokenValueAuth,
                'IdFormulario': tokenValueIdFormulario
            }
        }
        });
});

appMainAngular.factory('FormularioPagoResource', function($resource) {
    return $resource(contextPathIt + '/factoriaFormularioPago/',
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

appMainAngular.factory('FechaVigenciaPagoResource', function($resource) {
    return $resource(contextPathIt + '/factoriaPagoFechaVigencia/:codigo',
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
appMainAngular.factory('ReporteGeneralPagoResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReporteGeneralPago/',
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

appMainAngular.factory('ReporteGeneralExcelPagoResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReporteGeneralPagoExcel/',
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

appMainAngular.factory('ReporteEspecificoPagoResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReportePagoEspecifico/',
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

appMainAngular.factory('ReporteEspecificoExcelPagoResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReportePagoEspecificoExcel/',
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

appMainAngular.factory('ReporteDetallePagoResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReportePagoDetalle/',
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

appMainAngular.factory('ReporteConstanciaPagoResource', function($resource) {
    return $resource(contextPathReports + '/factoriaGenerarReporteConstanciaPago/',
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
                        response: pdf, 'cantidad':cantidad
                    };
                }
            }
        }
    );
});


appMainAngular.factory('EnviarCorreoPagosGeneralDeclaIt', function($resource) {
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

appMainAngular.factory('EnviarCorreoPagosEspecificoDeclaIt', function($resource) {
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

// JavaScript Document
$(document).ready(function (e) {
    'use strict';

    var data = sessionStorage.getItem('key');
    if (data === null) {
        if (data != "es") {
            TraducirIdioma(data);
        }
        $('#modalIdiomas').modal('show');
    }
    else {
        if (data != "es") {TraducirIdioma(data);}
    }
});

function Aceptar() {
    'use strict';
    var idioma = $('#modalIdiomas').find('.language option:selected').val();
    sessionStorage.setItem('key', idioma);

    TraducirIdioma(idioma);

    $('#modalIdiomas').modal('hide');
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) {
            return pair[1];
        }
    }
    return false;
}
function TraducirIdioma(langParam) {
    'use strict';
    var i18n = $.i18n();

    if (langParam != 'es') {
        i18n.locale = langParam;
		if( i18n.locale!=null)
		{
        window.parent.TraducirIdiomaPadre(i18n);
        TraducirIdiomaHijos(i18n);
		}
    }
}

function TraducirIdiomaHijos(i18n) {
    
	
		
		
	$.getJSON("json-modelos/demo-" + i18n.locale + ".json", function (data) {
            $.each(data, function (key, value) {
                RecorrerElementosHtml(key, value);
            });
        }
    );
	
}

function RecorrerElementosHtml(key, value) {
    'use strict';

    $('body div span').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });
    $('body div fieldset div span').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });
    $('body div fieldset div').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });

    $('body div label span').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();

            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });

    $('body div button').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });

    $('body div ul li button').each(function () {
        var control = $(this).attr("id");

        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                var valortitulo = $(this).attr("title");
                if (valortitulo != undefined) {
                    var valortitulofinal = valortitulo.toString();
                    if (valortitulofinal == key) {
                        $(this).attr("title", value).tooltip('fixTitle').tooltip('show');
                    }
                }
            }
        }
    });

    $('body div :input').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).attr('placeholder') == key) {
                    $(this).attr("placeholder", value);
                }
            }
        }
    });

    $('body div STRONG').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });

    $('body div p').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });

    $('body div th').each(function () {
        //  alert($(this).find('span').text());

        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();

            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);


                }
            }
        }
    });
    $('body div td').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });

    $('body div td a').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });

    $('body div small').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });

    $('body div label').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });
    $('body li a').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                //alert(controlCadena);
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });
    $('body div legend').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });
    $('body div option').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });
    $('body div fieldset legend').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();
            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);
                }
            }
        }
    });

    $('body div li div').each(function () {
        var control = $(this).attr("id");
        if (control != undefined) {
            var controlCadena = control.toString();

            if (controlCadena.substring(0, 1) == "t") {
                if ($(this).text().trim() == key) {
                    $(this).text(value);

                }
            }
        }

    });
}

function getLanguage() {
    // Variable para guardar el idioma
    var lang;

    var nav = navigator.userAgent.toLowerCase();
    if (nav.indexOf("msie") != -1 || nav.indexOf("rv") != -1) { // msi for IE and rv for IE11+
        var req = new XMLHttpRequest();
        req.open('GET', 'resources/inspect-headers.py?filter_name=accept-language', false);
        req.send(null);
        var headers = req.getAllResponseHeaders().toLowerCase();
        var contentLanguage = headers.match(/^content-language\:(.*)$/gm);
        if (contentLanguage[0]) {
            lang = contentLanguage[0].split(": ")[1];
        }
    } else {
        if (navigator.languages == undefined) {
            if (navigator.language == undefined) {
                // Internet Explorer Compatibility
                lang = navigator.userLanguage.slice(0, 2);
            } else {
                // Old navigator compatibility
                lang = navigator.language.slice(0, 2);
            }
        } else {
            lang = navigator.languages[0].slice(0, 2);
        }
    }
    return lang;
}
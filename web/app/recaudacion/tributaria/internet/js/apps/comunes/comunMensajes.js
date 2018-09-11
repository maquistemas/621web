var comunMensajes = (function () {

    function _getMensaje(codigoMensaje, paramAlternativo) {
        if (paramAlternativo == null) {
            paramAlternativo = "";
        }
        var mensaje = "";
        switch (codigoMensaje) {
            case "EXC003":
                mensaje = "Sr.  Contribuyente,  para  periodos  anteriores  a " + paramAlternativo + ", Deberá  presentar  la Declaración Jurada Simplificada 621 o el PDT 621, regrese al menú para la selección del formulario según corresponda";
                break;
            case "EXC004" :
                mensaje = "Sr. Contribuyente, el Periodo Ingresado esta fuera del rango de vigencia del formulario " + paramAlternativo;
                break;
            case "EXC005" :
                mensaje = "Sr. Contribuyente el período no debe ser mayor o igual al " + paramAlternativo + " de la fecha actual";
                break;
            case "NOE001" :
                mensaje = "Sr.contribuyente si modifica el período tributario ingresado, se perderá toda la información registrada hasta el momento y se volverán a realizar las validaciones considerando el nuevo período tributario.Confirma que desea modificar el período tributario?";
                break;
            case "NOE008":
                mensaje = "Sr. contribuyente, debe ingresar el período tributario de la declaración.";
                break;
            case "NOE009":
                mensaje = "Sr. Contribuyente, usted debe elegir un régimen de renta a declarar para continuar elaborando la declaración";
                break;
            case "INF008":
                mensaje = "Sr. Contribuyente, seleccione el tributo o tributos a sustituir/rectificar.";
                break;
            case "INF007":
                mensaje = "Sr. Contribuyente, seleccione los tributos a declarar.";
                break;
            case "INF001":
                mensaje = "Sr. Contribuyente a fin de validar su información es necesario que tenga una conexión a internet; si no la tiene la información que se mostrará y que usted ingrese será validada al momento de enviar la declaración a la Bandeja de Pagos.";
                break;
            case "INFNPS":
                mensaje = "Sr. Contribuyente, ¿Confirma que desea presentar/pagar los formularios?";
                break;
            case "INFNPSCERO":
                mensaje = "Sr. Contribuyente, la bandeja solamente contiene formularios con monto a pagar igual a cero. Por favor presione aceptar para continuar con el proceso de presentación de formularios.";
                break;
            case "NOE002":
                mensaje = "Sr. Contribuyente, de acuerdo a lo verificado, usted no se encuentra afecto a algún régimen de renta. A continuación se le mostrará la declaración simplificada y en ésta declaración sólo se permite declarar el Régimen General, el Régimen Especial de Renta o el  Régimen MYPE Tributario; sin embargo, también se le puede mostrar la DJ IGV Renta Completa si fuera a declarar otros régimenes. Seleccione usted la DJ que desea presentar.";
                break;
            case "INF005":
                mensaje = "Sr.Contribuyente, al no haber presentado por el período a declarar sus Libros Electrónicos y al haber presentado su Declaración original completa (no es simplificada), deberá utilizar el Formulario 621 del Aplicativo PC.";
                break;
            case "NOE003":
                mensaje = "Sr. contribuyente según los datos de sus Libros Electrónicos usted debe presentar la declaración jurada simplificada, sin embargo también puede  presentar  la  declaración  jurada  completa.  Por  favor  indique que  declaración jurada que desea visualizar.";
                break;
            case "INF004":
                mensaje = "Sr. Contribuyente al no haber presentado sus Libros Electrónicos por el período a declarar, se le mostrará la declaración simplificada. Si la declaración que se muestra no tuviera las casillas que requiere deberá utilizar el Formulario 621 del Aplicativo PC.";
                break;
            case "INF003":
                mensaje = "Sr. Contribuyente, de acuerdo a lo verificado, usted no se encuentra afecto a algún régimen de renta.  A continuación se le mostrará la declaración simplificada y en ésta declaración sólo se permite declarar el Régimen General, el Régimen Especial de Renta y el Régimen MYPE Tributario (tributo 3121); por lo que puede utilizar el formulario 621 del Aplicativo PC para declarar otros regímenes de renta distintos a los señalados.";
                break
            case "INF002":
                mensaje = "Sr. Contribuyente, de acuerdo a lo verificado, usted se encuentra afecto al régimen de renta" + paramAlternativo + ". Por lo tanto, debe utilizar el Formulario 621 del Aplicativo PC para declarar dicho régimen de renta.";
                break
            case "INF006":
                mensaje = "Sr.Contribuyente, de acuerdo a su información de Libros Electrónicos usted tiene operaciones afectas al IVAP por lo que debe afectarse a dicho tributo 1016 – IVAP.De no hacerlo, no se trasladará el valor de la casilla 340.";
                break
            case "DECLAFECHMAYOR":
                mensaje = "Sr. Contribuyente para seleccionar Sustitutoria la fecha de presentación de esta declaración debe ser anterior o igual a la fecha de vencimiento.";
                break
            case "DECLAFECHMENOR":
                mensaje = "Sr. Contribuyente para seleccionar Rectificatoria la fecha de presentación de esta declaración debe ser mayor a la fecha de vencimiento.";
                break
            case "ERR001":
                mensaje = "!Error, Sr. contribuyente, ha sucedio un error inesperado, vuelva a intentar nuevamente!";
                break
            case "ERR002":
                mensaje = "!Error. Sr. contribuyente disculpe la molestia, se produjo error al acceder a los formularios";
                break
            case "ERR003":
                mensaje = "!Error. Sr. contribuyente, su sesión de acceso no es válida. Por favor vuelva a Autenticarse.";
                break
            case "INF009":
                mensaje = "Sr. Contribuyente,  sus ingresos netos acumulados del ejercicio superan el límite de las 300 UIT por lo que el cálculo del pago a cuenta se realizará conforme a lo previsto en el artículo 85° de la Ley del Impuesto a la Renta";
                break;
            case "MENSAJE_1_301":
                mensaje = "Sr. Contribuyente, sus ingresos netos acumulados del ejercicio, superan las 300 UIT, por lo que el cálculo del pago a cuenta que le corresponde abonar se realizará conforme a lo previsto en el artículo 85° de la Ley del Impuesto a la Renta.";
                break;
            case "MENSAJE_2_301":
                mensaje = "Sr. Contribuyente, sus ingresos netos acumulados del ejercicio, superan las 1700 UIT, por lo que le corresponde declarar en el Régimen General, para continuar confirme que cambiará el régimen de renta de la declaración.";
                break;
            case "MENSAJE_PRESENTACION_FORMULARIO_625_SUSPENSION_PAGO":
                mensaje = "Sr. Contribuyente, se ha verificado la presentación del formulario 625 para la suspensión del pago a cuenta del período, motivo por el cual se calcula cero (S./0.00) de impuesto como pago a cuenta del período.";
                break;
            case "MENSAJE_INGRESOS_SUPERAN_1700_UIT":
                mensaje = "Sr. Contribuyente, sus ingresos netos anuales acumulados del ejercicio  superan las 1700 UIT, por lo que le corresponde declarar en el Régimen General.";
                break;
            case "MENSAJE_AFECTACION_REGIMEN":
                mensaje = "Afectación/Régimen de Renta";
                break;
            case "MENSAJE_AFECTACION_REGIMEN_TRIBUTOS":
                mensaje = "Afectación/Régimen de Renta/Tributos a Sustituir-Rectificar";
                break;
            case "EXC001_2":
                mensaje = "Sr. Contribuyente, el importe del impuesto calculado debe ser menor al importe de los ingresos Netos.";
                break;
            case "MENSAJE_NO_TIENE_LIBRO_ELECTRONICO":
                mensaje = " Sr.Contribuyente, esta declaración podrá utilizarla si Usted lleva Libros Electrónicos y de acuerdo a la información para el periodo tributario ingresado, por lo que debe utilizar el PDT 0621 o el Formulario 621 Simplificado.";
                break;
            case "MENSAJE_PAGO_DOLARES":
                mensaje = "Sr. Contribuyente su declaración jurada se está presentando en dólares; se grabará la declaración con los importes a pagar en cero. Para efectuar el pago de la deuda usted debe generar una boleta de pagos varios Nro. 1662 por cada tributo a pagar";
                break;
        }
        return mensaje;
    }
    ;
    return {
        getMensaje: function (codigoMensaje, paramAlternativo) {
            return _getMensaje(codigoMensaje, paramAlternativo);
        }
    };
})();


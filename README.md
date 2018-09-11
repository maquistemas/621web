# Proyecto Web E-Plataforma Única Internet

Esta interfaz consume servicios web dela parte edge de la plataforma.

Reemplazar:
/Users/leonardo/DevSource/cosapigit/

Por tu directorio donde has bajado el proyecto

Configuracion del HOSTS
127.0.0.1 e-plataformaunica.sunat.gob.pe img1.sunat.gob.pe jslibs1.sunat.gob.pe

Configuracion del NGINX
Agregar las siguientes directivas en el archivos de configuracion nginx.conf

A nivel de HTTP poner la siguiente directiva:
     server_names_hash_bucket_size 64;
     
    # -- Configuración del servidor WEB :: NEGOCIO
    server {
        listen       80;
        server_name  e-plataformaunica.sunat.gob.pe;

        location / {
            root   /Users/leonardo/DevSource/cosapigit/e-plataformaunica-internet/web;
            index  index.html index.htm;
        }
        location /v1/recaudacion/tributaria/parametriaformularios {
            proxy_pass http://192.168.1.177:7100/v1/recaudacion/tributaria/parametriaformularios;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/t/consulta/ {
            proxy_pass http://192.168.1.177:7101/v1/recaudacion/tributaria/t/consulta/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/consultalegacy/t/consulta/ {
            proxy_pass http://192.168.1.177:7102/v1/recaudacion/tributaria/consultalegacy/t/consulta/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/formulariofrecuente/ {
            proxy_pass http://192.168.1.177:7104/v1/recaudacion/tributaria/formulariofrecuente/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/autoguardadoform/e/autoguardadoformulario/ {
            proxy_pass http://192.168.1.177:7105/v1/recaudacion/tributaria/autoguardadoform/e/autoguardadoformulario/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/orquestacionpresentacion/t/consulta/ {
            proxy_pass http://192.168.1.177:7109/v1/recaudacion/tributaria/orquestacionpresentacion/t/consulta/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }							
		location /v1/recaudacion/tributaria/orquestacionproxypago/e/registro/ {
            proxy_pass http://192.168.1.177:7121/v1/recaudacion/tributaria/orquestacionproxypago/e/registro/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
		location /v1/recaudacion/tributaria/orquestacionprocesaendpointpago/ {
            proxy_pass http://192.168.1.177:7121/v1/recaudacion/tributaria/orquestacionprocesaendpointpago/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/parametriapasarela/ {
            proxy_pass http://192.168.1.177:7092/v1/recaudacion/tributaria/parametriapasarela/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/retencionigv/t/retencion/obtenerDatosPeriodo/ {
            proxy_pass http://192.168.1.177:7126/v1/recaudacion/tributaria/retencionigv/t/retencion/obtenerDatosPeriodo/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/consulta/t/visorconstancia/{
            proxy_pass http://192.168.1.177:7133/v1/recaudacion/tributaria/consulta/t/visorconstancia/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/consultadeclaracion/t/internet/declaracion/{
            proxy_pass http://192.168.1.177:7129/v1/recaudacion/tributaria/consultadeclaracion/t/internet/declaracion/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/consultapago/t/internet/pago/{
            proxy_pass http://192.168.1.177:7131/v1/recaudacion/tributaria/consultapago/t/internet/pago/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/receptorlog/{
            proxy_pass http://192.168.1.177:7136/v1/recaudacion/tributaria/receptorlog/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/receptorlogmensaje/{
            proxy_pass http://192.168.1.177:7136/v1/recaudacion/tributaria/receptorlogmensaje/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/recaudacion/tributaria/t/formularioIgv/{
            proxy_pass http://192.168.1.177:7125/v1/recaudacion/tributaria/t/formularioIgv/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /pago/ {
            proxy_pass http://192.168.1.177:9084/pago/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /TarjetaCreditoWeb/ {
            proxy_pass http://192.168.1.177:8084/TarjetaCreditoWeb/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /v1/gestor-sesiones/ {
            proxy_pass http://192.168.251.24:7082/v1/gestor-sesiones/;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
        location /servletAcceso {
            proxy_pass http://192.168.251.24:7081/servletAcceso;
            proxy_set_header Host $http_host;
            proxy_set_header X-Forwarded-For $remote_addr;
        }
    }
    
    # -- Configuración del servidor CDN :: IMAGENES 1
    server {
        listen       80;
        # -- Configuración del nombre del servidor
        server_name img1.sunat.gob.pe;
        
        # -- Configuración del CDN
        location / {
            root /Users/leonardo/DevSource/cosapigit/e-plataformaunica-internet/cdn/publico/img;
        }
    }
    
    # -- Configuración del servidor CDN :: JAVASCRIPTS 1
    server {
        listen       80;
        # -- Configuración del nombre del servidor
        server_name jslibs1.sunat.gob.pe;
        
        # -- Configuración del CDN
        location / {
            root /Users/leonardo/DevSource/cosapigit/e-plataformaunica-internet/cdn/publico/js;
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Credentials' 'true';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
        }
    }

Probando pagina:
http://e-plataformaunica.sunat.gob.pe/login1.html

RUC de pruebas:
RUC: 20100049181
USR: PEHFYMCG
PWD: 12345678

Para generar ID Cache:
http://internet.desa.pu.sunat.gob.pe/servletAcceso?plataforma=desktop&rucUsuario=20100049181PEHFYMCG&password=12345678&tipoOperacion=4&idFormulario=01&recurso=/plataformaUnica

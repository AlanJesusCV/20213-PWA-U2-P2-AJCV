let principal = $('#principal');
let notice = $('#notice');

let url = window.location.href;
let swDirect = '/20213-PWA-U2-P2-AJCV/sw.js';

// Preguntamos si navegador y/o el sitio dispone de sw
if(navigator.serviceWorker){
    console.log('si, esta disponible');
    // Registrar el service worker 
    if (url.includes('localhost')){
        swDirect='/sw.js'
    } 
    navigator.serviceWorker.register(swDirect);
}else{
    console.log('no, esta disponible')
}


$('.btn-seguir').on('click', function(e){
    e.preventDefault();
    console.log(
        'Pulsaste ver mas'
    );
    // Mostrar la noticia

    principal.fadeOut(function(){
        notice.slideDown(1000);
    });

    /* notice.fadeIn('slow', function(){
        principal.slideUp(1000);
    }); */
})
/* 
$('.btn-regresar').on('click', function(e){
    e.preventDefault();
    principal.fadeIn('slow', function(){
        notice.slideUp(1000);
    });
}) */

$('.btn-regresar').on('click', function(e){
    e.preventDefault();
    notice.fadeOut('slow', function(){
        principal.slideDown(1000);
    });
})

/* console.log('hola mundo app.js')
let url =window.location.href;
let swDirect = '/pwa_sw_instalation/sw.js';

// Preguntamos si navegador y/o el sitio dispone de sw
if(navigator.serviceWorker){
    console.log('si, esta disponible');
    // Registrar el service worker
    if (url.includes('localhost')){
        swDirect='/sw.js'
    }
    navigator.serviceWorker.register(swDirect);
}else{
    console.log('no, esta disponible')
}
 */
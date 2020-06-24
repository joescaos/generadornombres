document.querySelector('#generar-nombre').addEventListener('submit', cargarNombres);

// llamar ajax e imprimir resultados
function cargarNombres(e){
    e.preventDefault()
    // leer variaables
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.querySelector('#numero').value;

    let url = '';
    url += 'https://randomuser.me/api/?'
    // si hay origen seleccionado agregarlo a la URL
    if(origenSeleccionado !== ''){
        url += `nat=${origenSeleccionado}&`
    }

    // si hay un genero agregarlo a la URL
    if(generoSeleccionado !== ''){
        url += `gender=${generoSeleccionado}&`
    }

    // si hay una cantidad agregarla a la URL
    if(cantidad !== ''){
        url += `results=${cantidad}&`
    }

    // conectar con ajax
    // iniciar xmlhttprequest

    const xhr = new XMLHttpRequest();

    // abrir conexion
    xhr.open('GET', url, true);

    // datos e impresion del template
    xhr.onload = function(){
        if(this.status === 200){
            const nombres = JSON.parse(this.responseText).results;
            
            // generar el HTML
            let htmlNombres = '<h2>Nombres generados</h2>'

            htmlNombres += '<ul class="lista">';
            
            // imprimir cada nombre
            nombres.forEach(function(nombre){
                htmlNombres += `
                        <li>${nombre.name.first}</li>
                `;
                
            });

            htmlNombres += '</ul>';

            document.querySelector('#resultado').innerHTML = htmlNombres;
        }
    }

    // enviar el request
    xhr.send();

    
}
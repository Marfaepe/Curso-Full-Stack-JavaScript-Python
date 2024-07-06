fetch("https://api.open-meteo.com/v1/forecast?latitude=43.2627&longitude=-2.9253&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=Europe%2FBerlin")
    .then(data => data.json())
    .then(miFuncion);


function miFuncion(rutaJson) {
    let temperature_2m_min = rutaJson.daily.temperature_2m_min;
    let temperature_2m_max = rutaJson.daily.temperature_2m_max;
    let dias = rutaJson.daily.time;
    let weather = rutaJson.daily.weather_code;

    for (let i = 0; i < dias.length; i++) {

        let articulo = document.createElement('article');
        articulo.classList.add('tiempo-articulo');

        let titulo = document.createElement('h3');
        titulo.classList.add('tiempo-titulo');
        titulo.textContent = `${dias[i]}`;
        articulo.appendChild(titulo);

        let fecha = new Date(dias[i]);
        let nombreDia = document.createElement('h3');
        nombreDia.classList.add('tiempo-titulo');
        nombreDia.textContent = GetWeekDay(fecha);
        articulo.appendChild(nombreDia);

        let minTemp = document.createElement('p');
        minTemp.classList.add('temp-min');
        minTemp.textContent = `Temperatura minima: ${temperature_2m_min[i]} °C`;
        articulo.appendChild(minTemp);

        let maxTemp = document.createElement('p');
        maxTemp.classList.add('temp-max');
        maxTemp.textContent = `Temperatura máxima: ${temperature_2m_max[i]} °C`;
        articulo.appendChild(maxTemp);

        let tiempo = document.createElement('p');
        tiempo.classList.add('tiempo');
        tiempo.textContent = `Código ${weather[i]} %`;
        articulo.appendChild(tiempo);

        var img = document.createElement("img");
        img.classList.add('lluvia');
        img.src = RelacionWeatherImagen(weather[i]); 
        img.alt = 'imagen lluvia';
        articulo.appendChild(img);

        document.body.appendChild(articulo);
    }
};


function RelacionWeatherImagen(code) {

    let ruta;

    if (code >= 0 && code <= 20) {
        ruta = 'imagenes/sol.png';

    } else if (code >= 21 && code <= 40) {
        ruta = 'imagenes/nube.png';

    } else if (code >= 41 && code <= 60) {
        ruta = 'imagenes/lluvia.png';

    } else {
        ruta = 'imagenes/viento.png';
    }

    return ruta;
}


function GetWeekDay(date){
    let days = ['DOMINGO', 'LUNES', 'MARTES', 'MIÉRCOLES', 'JUEVES', 'VIERNES', 'SÁBADO'];
    return days[date.getDay()];
}


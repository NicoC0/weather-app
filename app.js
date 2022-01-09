const API_KEY = '1f00855b83c4f5a37a2f6f053475ad91'

const fetchData = position => {
    const {latitude, longitude} = position.coords
    // Hace una solicitud para obtener los datos
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`)
        // Cuando hay respuesta: 
        .then(response => response.json())
        .then(data => setWeatherData(data))
}

const setWeatherData = data => {
    console.log(data)

    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: data.main.temp + '°',
        date: getDate()
    }

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key]
        cleanUp()
    })   
}

const cleanUp = () => {
    let container = document.getElementById('container')
    let loader = document.getElementById('loader')

    loader.style.display = 'none'
    container.style.display = 'flex'
}

const getDate = () => {
    let date = new Date()
    return `${date.getDate()}-${( '0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData)
}

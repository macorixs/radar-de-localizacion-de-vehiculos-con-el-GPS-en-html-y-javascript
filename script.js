// Inicializa el mapa
const map = L.map('map').setView([40.4168, -3.7038], 13); // Centro en Madrid (puedes cambiar las coordenadas)

// Añade un mapa base
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Agrega un marcador para el vehículo
const vehicleMarker = L.marker([40.4168, -3.7038]).addTo(map).bindPopup('Vehículo en movimiento');

// Simula el movimiento actualizando la posición del marcador cada 2 segundos
let latitude = 40.4168; // Coordenada inicial
let longitude = -3.7038;

setInterval(() => {
    // Simula un movimiento aleatorio
    latitude += (Math.random() - 0.5) * 0.01;
    longitude += (Math.random() - 0.5) * 0.01;

    // Actualiza la posición del marcador
    vehicleMarker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude], 13); // Opcional: centra el mapa en el vehículo
}, 2000);

// Añade un círculo simulando el área de detección del radar
const radarCircle = L.circle([40.4168, -3.7038], {
    color: 'blue',
    fillColor: '#30f',
    fillOpacity: 0.2,
    radius: 500 // Radio en metros
}).addTo(map);

// Actualiza la posición del radar junto con el marcador
setInterval(() => {
    radarCircle.setLatLng([latitude, longitude]);
}, 2000);


setInterval(async () => {
    const response = await fetch('https://api.tuservidor.com/vehiculos/1'); // URL de tu API
    const data = await response.json();
    const { lat, lng } = data;

    // Actualiza el marcador y el radar
    vehicleMarker.setLatLng([lat, lng]);
    radarCircle.setLatLng([lat, lng]);
    map.setView([lat, lng], 13);
}, 2000);
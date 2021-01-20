import mapboxgl from 'mapbox-gl';

const geoCodeForm = document.getElementById("geoCodeForm");
const addressGiven = document.getElementById("addressGiven");


const resultsApi = (event) => {
  event.preventDefault();
  const publicKey = 'pk.eyJ1IjoiY2hyaXN0aWFuemFtIiwiYSI6ImNraDVieGRiczA2NGkzMnIyMnoxbTRxMGMifQ.GFDmIkVLaxVCBuPDz9omzQ';
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${addressGiven.value}.json?access_token=${publicKey}`;
  fetch(url)
    .then(response => response.json())
    .then((data) => {
      const result = document.getElementById("coordinatesOutPut");
      result.innerHTML = `<p>${data.features[0].center[0]},  ${data.features[0].center[1]}</p>`;
      const longLat = data.features[0].center;
      mapboxgl.accessToken = publicKey;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        center: longLat,
        zoom: 12
      });
      new mapboxgl.Marker()
        .setLngLat(longLat)
        .addTo(map);
    });
};
geoCodeForm.addEventListener('submit', resultsApi);

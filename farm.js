const mapOptions = {
  center: [31.096669, 30.950029],
  zoom: 17
};

const tileLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  attribution: '&copy; Stadia Maps'
});

// Dummy heatmap data for each disease
const heatData = {
  "disease1-map": [
    [31.0968, 30.9501, 0.7],
    [31.0966, 30.9503, 0.8],
    [31.0969, 30.9502, 0.9],
  ],
  "disease2-map": [
    [31.0967, 30.9502, 0.5],
    [31.0965, 30.9504, 0.9],
    [31.0971, 30.9501, 0.4]
  ],
  "disease3-map": [
    [31.0969, 30.9501, 0.9],
    [31.0964, 30.9502, 0.8],
    [31.0970, 30.9503, 0.7]
  ],
  "disease4-map": [
    [31.0965, 30.9500, 0.7],
    [31.0963, 30.9502, 0.8],
    [31.0968, 30.9503, 0.6]
  ]
};

const maps = {};

function initMap(id, points) {
  const map = L.map(id, mapOptions);
  tileLayer.addTo(map);
  L.heatLayer(points, {
    radius: 25,
    maxZoom: 18,
    blur: 15,
    max: 1.0,
    gradient: { 0.4: 'blue', 0.6: 'lime', 0.8: 'red' }
  }).addTo(map);
  maps[id] = map;
}

// Load the first tab map immediately
initMap("disease1-map", heatData["disease1-map"]);

// Load other maps when tabs are shown
document.addEventListener('shown.bs.tab', function (event) {
  const targetId = event.target.getAttribute('data-bs-target');
  const mapId = targetId.replace("#", "") + "-map";

  if (!maps[mapId]) {
    initMap(mapId, heatData[mapId]);
  }

  setTimeout(() => {
    maps[mapId]?.invalidateSize();
  }, 300);
});

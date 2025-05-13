// --- Gauge Chart Initialization ---
////////  Apexcharts package
document.addEventListener("DOMContentLoaded", function () {
  const createGauge = (elementId, label, value, color) => {
    const options = {
      chart: {
        type: "radialBar",
        height: 200,
      },
      series: [value],
      labels: [label],
      plotOptions: {
        radialBar: {
          hollow: {
            size: "50%",
          },
          dataLabels: {
            name: {
              fontSize: "16px",
            },
            value: {
              fontSize: "20px",
              formatter: function (val) {
                return val + " ppm";
              },
            },
          },
        },
      },
      colors: [color],
    };

    const chart = new ApexCharts(
      document.querySelector(`#${elementId}`),
      options
    );
    chart.render();
  };

  // Create the 3 gauges
  createGauge("gaugeNitrogen", "Nitrogen", 10, "#00E396");
  createGauge("gaugePhosphorus", "Phosphorus", 20, "#FEB019");
  createGauge("gaugePotassium", "Potassium", 15, "#FF4560");
});

document.addEventListener("DOMContentLoaded", function () {
  // --- NPK Bar Chart Initialization ---

  const barChartCtx = document
    .getElementById("npkBarChart")
    .getContext("2d");
  const npkBarChart = new Chart(barChartCtx, {
    type: "bar",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [
        {
          label: "Nitrogen",
          backgroundColor: "rgba(0, 227, 150, 0.5)",
          borderColor: "rgba(0, 227, 150, 1)",
          borderWidth: 1,
          data: [65, 59, 80, 81],
        },
        {
          label: "Phosphorus",
          backgroundColor: "rgba(254, 176, 25, 0.5)",
          borderColor: "rgba(254, 176, 25, 1)",
          borderWidth: 1,
          data: [28, 48, 40, 19],
        },
        {
          label: "Potassium",
          backgroundColor: "rgba(255, 69, 96, 0.5)",
          borderColor: "rgba(255, 69, 96, 1)",
          borderWidth: 1,
          data: [35, 23, 56, 78],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      plugins: {
        title: { display: true, text: "NPK Levels Over Time" },
      },
    },
  });
});
  //- HEATMAP ,Leaflet Map Initialization --
  const mapOptions = {
    center: [31.096669, 30.950029],
    zoom: 17
  };

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // SAMPLE HEATMAP DATA (Placeholder) for each disease NEEDED to be replaced with real data
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

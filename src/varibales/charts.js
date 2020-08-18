
let chartExample3 = {
  options: {
    maintainAspectRatio: false,
    legend: {
      display: true
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#666",
      bodyFontColor: "#333",
      xPadding: 12,
      mode: "nearest",
      intersect: 0,
      position: "nearest",
      bodyFontSize: 16,
      titleFontSize: 16,
      callbacks: {
        label: function (tooltipItem) {
          return tooltipItem.yLabel.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
        }
      }
    },
    responsive: true,
    scales: {
      yAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"

          },
          ticks: {
            suggestedMin: 60,
            suggestedMax: 120,
            padding: 20,
            fontColor: "#9e9e9e",
            callback: function (value) {
              if (value > 1000000) {
                return value / 1e6 + 'M';
              } else if (value > 10000) {
                return value / 1e3 + 'k'
              }
              return value
            }
          }
        }
      ],
      xAxes: [
        {
          gridLines: {
            drawBorder: false,
            color: "rgba(225,78,202,0.1)",
            zeroLineColor: "transparent"
          },
          ticks: {
            padding: 20,
            fontColor: "#9e9e9e"
          }
        }
      ]
    }
  }
};

const chartExample4 = {
  options: {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: 'right',
      labels: {
        boxWidth: 30,
      }
    },
    tooltips: {
      backgroundColor: "#f5f5f5",
      titleFontColor: "#333",
      bodyFontColor: "#666",
      bodySpacing: 4,
      xPadding: 12,
      intersect: 0,
      position: "nearest",
      titleFontSize: 22,
      bodyFontSize: 16,
      callbacks: {
        label: function (tooltipItem, data) {
          var dataset = data.datasets[tooltipItem.datasetIndex];
          let currentValue = dataset.data[tooltipItem.index];
          let cureentValueTitle = (data.labels[tooltipItem.index])
          return ' ' + currentValue.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + ' ' + cureentValueTitle
        }
      }
    },
    title: {
      display: true,
    },
    animation: {
      animateScale: true,
      animateRotate: true
    },
    responsive: true,
  }
};

module.exports = {
  chartExample3, // in src/views/Dashboard.js
  chartExample4 // in src/views/Dashboard.js
};

const chart = document.getElementById('myChart');
const earning = document.getElementById('earning');
new Chart(chart, {
  type: 'polarArea',
  data: {
    labels: ['Fenty', 'Rare', 'Rhode', 'Lipsticks', 'Foundations', 'Mascaras'],
    datasets: [{
      label: '# of purchases',
      data: [12, 19, 8, 5, 2, 3],
      backgroundColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(153,102,255,0.2)',
        'rgba(255,159,64,0.2)'

      ],
      borderColor:[
        'rgba(255,99,132,0.2)',
        'rgba(54,162,235,0.2)',
        'rgba(255,206,86,0.2)',
        'rgba(75,192,192,0.2)',
        'rgba(153,102,255,0.2)',
        'rgba(255,159,64,0.2)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      y: {
        responsive: true,
      }
    }
  }
});


  new Chart(earning, {
    type: 'line',
    data: {
      labels: ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
      datasets: [{
        label: 'user interactivity',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor:[
          'rgba(255,99,132,0.2)',
          'rgba(54,162,235,0.2)',
          'rgba(255,206,86,0.2)',
          'rgba(75,192,192,0.2)',
          'rgba(153,102,255,0.2)',
          'rgba(255,159,64,0.2)'
  
        ],
        borderWidth: 1
      }] 
    },

    options: {
      scales: {
        y: {
          responsive: true,
        }
      }
    }
  });
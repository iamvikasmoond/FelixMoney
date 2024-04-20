document.addEventListener('DOMContentLoaded', function() {
    // Retrieve transactions from localStorage
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

    // Prepare data for chart
    const labels = transactions.map(transaction => new Date(transaction.date));
    const data = transactions.map(transaction => transaction.amount);

    // Chart.js data
    const chartData = {
        labels: labels,
        datasets: [{
            label: 'Balance (₹)',
            data: data,
            borderColor: '#4D7EA8',
            backgroundColor: 'transparent',
            fill: false,
        }],
    };

    // Chart.js options
    const options = {
        scales: {
            xAxes: [{
                type: 'time',
                time: {
                    unit: 'day', // Set the time unit for X-Axis
                },
                scaleLabel: {
                    display: true,
                    labelString: 'Time',
                },
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Money (₹)',
                },
            }],
        },
    };

    // Create Chart.js instance
    const ctx = document.getElementById('myChart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: chartData,
        options: options,
    });
});

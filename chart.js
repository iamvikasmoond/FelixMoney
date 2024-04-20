document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate available balance
    function calculateAvailableBalance(expenses) {
        let totalIncome = 0;
        let totalExpense = 0;

        expenses.forEach(expense => {
            const amount = parseFloat(expense.amount);
            if (amount > 0) {
                totalIncome += amount;
            } else {
                totalExpense += amount;
            }
        });

        return totalIncome + totalExpense;
    }

    // Function to get dates and available balances for chart
    function getChartData() {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const chartData = {
            labels: [],
            availableBalances: []
        };

        let availableBalance = 0;

        expenses.forEach(expense => {
            chartData.labels.push(expense.date);
            availableBalance += parseFloat(expense.amount);
            chartData.availableBalances.push(availableBalance.toFixed(2));
        });

        return chartData;
    }

    // Function to create and render the chart
    function renderChart() {
        const chartData = getChartData();

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Available Balance',
                    data: chartData.availableBalances,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });
    }

    // Render the chart on page load
    renderChart();
});


// new


document.addEventListener("DOMContentLoaded", function() {
    // Function to calculate available balance
    function calculateAvailableBalance(expenses) {
        let totalIncome = 0;
        let totalExpense = 0;

        expenses.forEach(expense => {
            const amount = parseFloat(expense.amount);
            if (amount > 0) {
                totalIncome += amount;
            } else {
                totalExpense += amount;
            }
        });

        return totalIncome + totalExpense;
    }

    // Function to get dates and available balances for chart
    function getChartData() {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const chartData = {
            labels: [],
            availableBalances: []
        };

        let availableBalance = 0;

        expenses.forEach(expense => {
            chartData.labels.push(expense.date);
            availableBalance += parseFloat(expense.amount);
            chartData.availableBalances.push(availableBalance.toFixed(2));
        });

        return chartData;
    }

    // Function to create and render the chart
    function renderChart() {
        const chartData = getChartData();

        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartData.labels,
                datasets: [{
                    label: 'Available Balance',
                    data: chartData.availableBalances,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: false
                        }
                    }]
                }
            }
        });

        // Predict upcoming transactions
        const predictedLabels = [...chartData.labels];
        const predictedData = chartData.availableBalances.map(balance => parseFloat(balance) + 100); // Example prediction, adjust as needed

        myChart.data.datasets.push({
            label: 'Predicted Balance',
            data: predictedData,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
            borderDash: [5, 5] // Dotted line
        });

        myChart.update();
    }

    // Render the chart on page load
    renderChart();
});

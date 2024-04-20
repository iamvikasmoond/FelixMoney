document.addEventListener("DOMContentLoaded", function() {
    const totalIncomeElement = document.getElementById("total-income");
    const totalExpenseElement = document.getElementById("total-expense");
    const availableBalanceElement = document.getElementById("available-balance");

    // Function to calculate total income, total expense, and available balance
    function calculateBudget() {
        let totalIncome = 0;
        let totalExpense = 0;

        // Loop through each row in the expense table
        document.querySelectorAll("#expense-list tr").forEach(row => {
            const amount = parseFloat(row.querySelector(".amount").textContent);
            if (amount > 0) {
                totalIncome += amount;
            } else {
                totalExpense -= amount; // Convert negative expense to positive
            }
        });

        // Update the DOM with the calculated values
        totalIncomeElement.textContent = totalIncome.toFixed(2);
        totalExpenseElement.textContent = totalExpense.toFixed(2);
        availableBalanceElement.textContent = (totalIncome - totalExpense).toFixed(2);
    }

    // Calculate budget on page load
    calculateBudget();
});



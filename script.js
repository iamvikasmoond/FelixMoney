document.addEventListener("DOMContentLoaded", function() {
    // Get form elements
    const transactionForm = document.getElementById("transaction-form");
    const transactionNameInput = document.getElementById("transaction-name");
    const transactionAmountInput = document.getElementById("transaction-amount");
    const expenseList = document.getElementById("expense-list");
    const totalIncomeElement = document.getElementById("total-income");
    const totalExpenseElement = document.getElementById("total-expense");
    const availableBalanceElement = document.getElementById("available-balance");

    // Function to create a new row in the expense table
    function createExpenseRow(name, amount, date, time) {
        const newRow = document.createElement("tr");
        newRow.innerHTML = `
            <td>${name}</td>
            <td class="amount">${amount}</td>
            <td>${date}</td>
            <td>${time}</td>
            <td><button class="delete-btn">Delete</button></td>
        `;
        expenseList.appendChild(newRow);
    }

    // Function to save expenses to localStorage
    function saveExpensesToLocalStorage() {
        const expenses = Array.from(expenseList.children).map(row => ({
            name: row.children[0].textContent,
            amount: row.children[1].textContent,
            date: row.children[2].textContent,
            time: row.children[3].textContent
        }));
        localStorage.setItem("expenses", JSON.stringify(expenses));
    }

    // Function to load expenses from localStorage
    function loadExpensesFromLocalStorage() {
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.forEach(expense => {
            createExpenseRow(expense.name, expense.amount, expense.date, expense.time);
        });
    }

    // Function to calculate total income, total expense, and available balance
    function calculateBudgetSummary() {
        let totalIncome = 0;
        let totalExpense = 0;

        Array.from(expenseList.children).forEach(row => {
            const amount = parseFloat(row.querySelector(".amount").textContent);
            if (amount > 0) {
                totalIncome += amount;
            } else {
                totalExpense += amount;
            }
        });

        const availableBalance = totalIncome + totalExpense;

        totalIncomeElement.textContent = totalIncome.toFixed(2);
        totalExpenseElement.textContent = totalExpense.toFixed(2);
        availableBalanceElement.textContent = availableBalance.toFixed(2);
    }

    // Load expenses from localStorage on page load
    loadExpensesFromLocalStorage();

    // Calculate budget summary on page load
    calculateBudgetSummary();

    // Function to handle adding income
    function addIncome() {
        const name = transactionNameInput.value;
        const amount = parseFloat(transactionAmountInput.value);
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        if (name && !isNaN(amount)) {
            createExpenseRow(name, `<span class="income">${amount}</span>`, date, time);
            transactionNameInput.value = "";
            transactionAmountInput.value = "";
            saveExpensesToLocalStorage();
            calculateBudgetSummary();
        } else {
            alert("Please enter valid transaction details.");
        }
    }

    // Function to handle adding expense
    function addExpense() {
        const name = transactionNameInput.value;
        const amount = parseFloat(transactionAmountInput.value);
        const date = new Date().toLocaleDateString();
        const time = new Date().toLocaleTimeString();

        if (name && !isNaN(amount)) {
            createExpenseRow(name, `<span class="expense">${-amount}</span>`, date, time);
            transactionNameInput.value = "";
            transactionAmountInput.value = "";
            saveExpensesToLocalStorage();
            calculateBudgetSummary();
        } else {
            alert("Please enter valid transaction details.");
        }
    }

    // Event listener for the Income button
    document.getElementById("income-btn").addEventListener("click", addIncome);

    // Event listener for the Expense button
    document.getElementById("expense-btn").addEventListener("click", addExpense);

    // Event listener for deleting expenses
    expenseList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            event.target.closest("tr").remove();
            saveExpensesToLocalStorage();
            calculateBudgetSummary();
        }
    });
});


// scroll 

document.addEventListener("DOMContentLoaded", function() {
    // Get button elements
    const transactionButton = document.querySelector(".btn_Transaction");
    const budgetButton = document.querySelector(".btn_Budget");
    const insightsButton = document.querySelector(".btn_Insights");
    const accountButton = document.querySelector(".btn_Account");

    // Function to scroll to a section
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: "smooth" });
        }
    }

    // Event listeners for button clicks
    transactionButton.addEventListener("click", function() {
        scrollToSection("transaction-section");
    });

    budgetButton.addEventListener("click", function() {
        scrollToSection("budget-section");
    });

    insightsButton.addEventListener("click", function() {
        scrollToSection("insights-section");
    });

    accountButton.addEventListener("click", function() {
        scrollToSection("account-section");
    });
});

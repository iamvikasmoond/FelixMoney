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


// chart




// account 

document.addEventListener("DOMContentLoaded", function() {
    const fullNameSpan = document.getElementById("full-name");
    const custIdSpan = document.getElementById("cust-id");
    const bankAccountSpan = document.getElementById("bank-account");
    const passwordSpan = document.getElementById("password");
    const upiIdSpan = document.getElementById("upi-id");

    const viewDetailsBtn = document.getElementById("view-details-btn");
    const modifyDetailsBtn = document.getElementById("modify-details-btn");

    // Check if data is available
    function isDataAvailable() {
        return fullNameSpan.textContent !== "hidden" ||
            custIdSpan.textContent !== "hidden" ||
            bankAccountSpan.textContent !== "hidden" ||
            upiIdSpan.textContent !== "hidden";
    }

    // Function to show user data
    function showUserData() {
        viewDetailsBtn.disabled = true;
        fullNameSpan.textContent = "John Doe"; // Example data, replace with actual data
        custIdSpan.textContent = "123456789";
        bankAccountSpan.textContent = "1234567890";
        upiIdSpan.textContent = "john.doe@bank";
        modifyDetailsBtn.disabled = false;
    }

    // Event listener for the "View Details" button
    viewDetailsBtn.addEventListener("click", function() {
        if (!isDataAvailable()) {
            // Ask user to enter data
            const fullName = prompt("Enter your full name:");
            const custId = prompt("Enter your customer ID:");
            const bankAccount = prompt("Enter your bank account number:");
            const upiId = prompt("Enter your UPI ID:");

            // Update displayed data if provided
            if (fullName && custId && bankAccount && upiId) {
                fullNameSpan.textContent = fullName;
                custIdSpan.textContent = custId;
                bankAccountSpan.textContent = bankAccount;
                upiIdSpan.textContent = upiId;
                modifyDetailsBtn.disabled = false;
            } else {
                alert("Please provide all details.");
            }
        }
    });

    // Event listener for the "Modify Details" button
    modifyDetailsBtn.addEventListener("click", function() {
        // Implement modification functionality here
        alert("Contact Administrator.");
    });
});



// update 



// ==========================================
// SPENDWISE BUDGET TRACKER
// ==========================================


// ------------------------------------------
// 1. VARIABLES
// ------------------------------------------

// Store the user's budget
let budget = 0;

// Array for storing multiple expenses
let expenses = [];


// ------------------------------------------
// 2. GET HTML ELEMENTS FROM THE DOM
// ------------------------------------------

const budgetForm = document.getElementById("budgetForm");
const budgetInput = document.getElementById("budgetInput");

const expenseForm = document.getElementById("expenseForm");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const expenseCategory = document.getElementById("expenseCategory");

const budgetDisplay = document.getElementById("budgetDisplay");
const expenseDisplay = document.getElementById("expenseDisplay");
const balanceDisplay = document.getElementById("balanceDisplay");

const expenseTableBody =
    document.getElementById("expenseTableBody");

const message =
    document.getElementById("message");


// ------------------------------------------
// 3. SET BUDGET
// ------------------------------------------

budgetForm.addEventListener("submit", function(event) {

    // Prevent page from refreshing
    event.preventDefault();

    // Get budget from input
    const enteredBudget = Number(budgetInput.value);


    // --------------------------------------
    // CONDITIONAL STATEMENT
    // --------------------------------------

    if (enteredBudget <= 0 || isNaN(enteredBudget)) {

        message.textContent =
            "Please enter a valid budget amount.";

        return;
    }


    // Store budget
    budget = enteredBudget;


    // Update budget on webpage
    budgetDisplay.textContent =
        `KSh ${budget.toLocaleString()}`;


    message.textContent =
        "Budget successfully set.";


    // Update dashboard
    updateDashboard();


    // Clear input
    budgetInput.value = "";

});


// ------------------------------------------
// 4. ADD EXPENSE
// ------------------------------------------

expenseForm.addEventListener("submit", function(event) {

    // Prevent page refresh
    event.preventDefault();


    // Get user input
    const name = expenseName.value.trim();

    const amount = Number(expenseAmount.value);

    const category = expenseCategory.value;


    // --------------------------------------
    // INPUT VALIDATION USING CONDITIONALS
    // --------------------------------------

    if (name === "") {

        message.textContent =
            "Please enter an expense name.";

        return;
    }


    if (amount <= 0 || isNaN(amount)) {

        message.textContent =
            "Please enter a valid expense amount.";

        return;
    }


    // --------------------------------------
    // CREATE EXPENSE RECORD
    // --------------------------------------

    const expense = {

        name: name,

        amount: amount,

        category: category

    };


    // --------------------------------------
    // ADD RECORD TO ARRAY
    // --------------------------------------

    expenses.push(expense);


    // Clear form
    expenseForm.reset();


    message.textContent =
        "Expense added successfully.";


    // Update dashboard
    updateDashboard();

});


// ------------------------------------------
// 5. CALCULATE TOTAL EXPENSES
// ------------------------------------------

function calculateTotalExpenses() {

    let total = 0;


    // --------------------------------------
    // LOOP THROUGH EXPENSE ARRAY
    // --------------------------------------

    for (let i = 0; i < expenses.length; i++) {

        total += expenses[i].amount;

    }


    return total;
}


// ------------------------------------------
// 6. UPDATE DASHBOARD
// ------------------------------------------

function updateDashboard() {

    // Calculate total expenses
    const totalExpenses =
        calculateTotalExpenses();


    // Calculate remaining balance
    const balance =
        budget - totalExpenses;


    // --------------------------------------
    // DOM MANIPULATION
    // --------------------------------------

    expenseDisplay.textContent =
        `KSh ${totalExpenses.toLocaleString()}`;


    balanceDisplay.textContent =
        `KSh ${balance.toLocaleString()}`;


    // --------------------------------------
    // CONDITIONAL BUDGET FEEDBACK
    // --------------------------------------

    if (budget === 0) {

        message.textContent =
            "Please set a budget first.";

    }

    else if (balance < 0) {

        message.textContent =
            "Warning: You have exceeded your budget.";

    }

    else if (balance === 0) {

        message.textContent =
            "Your budget has been fully used.";

    }

    else if (balance <= budget * 0.2) {

        message.textContent =
            "Warning: You have less than 20% of your budget remaining.";

    }

    else {

        message.textContent =
            "You are within your budget.";

    }


    // Display expense records
    displayExpenses();

}


// ------------------------------------------
// 7. DISPLAY EXPENSES
// ------------------------------------------

function displayExpenses() {

    // Clear old table records
    expenseTableBody.innerHTML = "";


    // --------------------------------------
    // LOOP THROUGH ARRAY
    // --------------------------------------

    for (let i = 0; i < expenses.length; i++) {

        const expense = expenses[i];


        // Create table row
        const row = document.createElement("tr");


        // Create number cell
        const numberCell =
            document.createElement("td");

        numberCell.textContent = i + 1;


        // Create name cell
        const nameCell =
            document.createElement("td");

        nameCell.textContent =
            expense.name;


        // Create amount cell
        const amountCell =
            document.createElement("td");

        amountCell.textContent =
            `KSh ${expense.amount.toLocaleString()}`;


        // Create category cell
        const categoryCell =
            document.createElement("td");

        categoryCell.textContent =
            expense.category;


        // Add cells to row
        row.appendChild(numberCell);

        row.appendChild(nameCell);

        row.appendChild(amountCell);

        row.appendChild(categoryCell);


        // Add row to table
        expenseTableBody.appendChild(row);

    }

}
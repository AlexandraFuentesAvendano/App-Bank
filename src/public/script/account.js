// function that receives the data from the api and return a json with the accounts
// fect account afrom API
const getAccounts = async () => {
  const response = await fetch("http://localhost:3000/accounts");

  if (!response.ok) {
    throw new Error("something gone wrong while getting accounts");
  }

  return response.json();
};


//01 Function to add an account option to the dropdown
const addAccountOption = (account) => {
  const accountSelect = $("#account");

  const option = $(`
                <option value="${account.id}">${account.username}</option>
            `);
  accountSelect.append(option);
};

//02 Function to render account data in a table
const renderAccountData = (account) => {
  const totalBalance = account.transactions.reduce(
    (prev, curr) => prev + curr.amount,
    0
  );

  const accountList = document.getElementById("accountList");
  const row = document.createElement("tr");
  row.classList.add(`account-item-${account.id}`);
  const item = `
        <td>${account.username}</td>
        <td>$${totalBalance.toFixed(2)}</td>
    `;
  row.innerHTML = item;

  accountList.append(row);
};

//Function to fetch accounts data from the API
fetchAccounts();
async function fetchAccounts() {
  const response = await fetch("http://localhost:3000/accounts");

  if (!response.ok) {
    throw new error("some thing wrong");
  }

  const accounts = await response.json();
  const accountList = document.getElementById("accountList");
  accountList.innerHTML = "";

//03function to add a new account
  async function addAccount(event) {
    event.preventDefault();
    const username = document.getElementById("usernameInput").value.trim();

    if (username === "") {
      alert("Please enter a username");
      return;
    }

    const response = await fetch("http://localhost:3000/accounts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newAccount: username }),
    });

    if (response.ok) {
      const account = await response.json();
      fillDataIntoAccountSelect()
      renderAccountData(account);
      addAccountOption(account);
    } else {
      const errorMessage = await response.text();
      alert(`Failed to add account: ${errorMessage}`);
    }
  }

  // Call getAccounts() to fetch account data from the API and handle the response
$(() => {
  
    getAccounts().then((data) => {
      // Iterate through each account in the data and add an option in the dropdown and render account data
      data.forEach((account) => {
        addAccountOption(account);
        renderAccountData(account);
      });
    });
  });
  
// Event listener for adding a new account
  document
    .getElementById("addAccountForm")
    .addEventListener("submit", addAccount);

  return accounts;
}

// grab the element to be updated
// tr element with class `account-item-${accountId}:last`
// add the amount to the amount existing on the dom
// Function to recalculate total amount when a deposit is made
export const recalculateTotalAmount = (accountId, amount) => {
  const accountAmount = $(`.account-item-${accountId} td:last`);
  const newAmount = parseFloat(accountAmount.html().split("$")[1]) + amount;
  accountAmount.html(`$${newAmount.toFixed(2)}`);
};
// Function to recalculate total amount when a withdrawal is made
export const recalculateTotalAmountwithdraw = (accountId, amount) => {
  const accountAmount = $(`.account-item-${accountId} td:last`);
  const newAmountwithdraw = parseFloat(accountAmount.html().split("$")[1]) - amount;
  accountAmount.html(`$${newAmountwithdraw.toFixed(2)}`);
};
// Function to recalculate total amount when a transfer is made
export const recalculateTotalTranfer = (accountId, amount) => {
    const accountAmount = $(`.account-item-${accountId} td:last`);
    const newAmountwithdraw = parseFloat(accountAmount.html().split("$")[1]) + amount;
    accountAmount.html(`$${newAmountwithdraw.toFixed(2)}`);
};


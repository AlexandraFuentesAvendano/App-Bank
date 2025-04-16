import { recalculateTotalAmount } from "./account.js";
import { recalculateTotalAmountwithdraw } from "./account.js";
import { recalculateTotalTranfer } from "./account.js";

$(() => {

  initializeForm();
  initializeTable();
});

const initializeTable = async () => {
  const transactions = await getTransactions();
  renderNewTransactionToTable(transactions.flat());
};

const initializeForm = () => {
  const form = $(".Newtransaction");

  // when submit event happens
  form.on("submit", handleFormSubmission);
};
//After pushed submit button
const handleFormSubmission = async (event) => {
  event.preventDefault();
  

  // grab info from dom
  const account = $("#account");
  const accountTo = $("#accountTo");
  const amount = $("#amount");
  const description = $("#description");
  const category = $("#category");
  const transactionType = $(`.radiobutton input[type=radio]:checked`).val();

  // create object for new transaction
  let transaction = {
    newTransaction: {}
  };

  if (transactionType === "Deposit") {
    transaction.newTransaction.accountId = parseInt(account.val());
    transaction.newTransaction.accountIdFrom = parseInt(account.val());
    transaction.newTransaction.accountIdTo = parseInt(accountTo.val());
    transaction.newTransaction.type = transactionType;
    transaction.newTransaction.amount = parseFloat(amount.val()).toFixed(2);
    if (isNaN(amount.val())) {
      alert("Please enter a valid number for the amount.");
      return; 
    }
    transaction.newTransaction.amount = parseFloat(amount.val());
    transaction.newTransaction.categoryId = parseFloat(category.val());
    transaction.newTransaction.description = description.val();
  } else if (transactionType === "Withdraw") {
    transaction.newTransaction.accountId = parseInt(account.val());
    transaction.newTransaction.accountIdFrom = parseInt(account.val());
    transaction.newTransaction.accountIdTo = parseInt(accountTo.val());
    transaction.newTransaction.type = transactionType;
    transaction.newTransaction.amount = parseFloat(amount.val()).toFixed(2);
    if (isNaN(amount.val())) {
      alert("Please enter a valid number for the amount.");
      return; 
    }
    transaction.newTransaction.amount = parseFloat(amount.val());
    transaction.newTransaction.categoryId = parseFloat(category.val());
    transaction.newTransaction.description = description.val();
  } else {
    transaction.newTransaction.accountId = parseInt(account.val());
    transaction.newTransaction.accountIdFrom = parseInt(account.val());
    transaction.newTransaction.accountIdTo = parseInt(accountTo.val());
    transaction.newTransaction.type = transactionType;
    transaction.newTransaction.amount = parseFloat(amount.val());
    transaction.newTransaction.categoryId = parseFloat(category.val());
    transaction.newTransaction.description = description.val();
  }

  if(amount === 'string') {
    alert("please enter the number");
    console.log("string")
  }

  // create transaction to the backend and once return render
  try {
    const newTransaction = await createTransaction(transaction);
    renderNewTransactionToTable(newTransaction);
    if (transactionType === "Deposit") {
    recalculateTotalAmount(
      newTransaction[0].accountId,
      newTransaction[0].amount
    );
    } else if (transactionType === "Withdraw"){
      recalculateTotalAmountwithdraw(
        newTransaction[0].accountId,
        newTransaction[0].amount
        );
    } else {
      recalculateTotalTranfer(
        newTransaction[0].accountIdFrom,
        -newTransaction[0].amount
      );
      recalculateTotalTranfer(
        newTransaction[0].accountIdTo,
        newTransaction[0].amount
      )
    }
  } catch (err) {
    // render error message
    console.log(err);
  }
};

const renderNewTransactionToTable = (transactions) => {
  const table = $(".items table");

  transactions.forEach(
    ({
      accountId,
      accountIdFrom,
      accountIdTo,
      type,
      amount,
      categoryId,
      description
    }) => {
      const accountUsername = $(`#account option[value=${accountId}]`).html();
      const categoryName = $(`#category option[value=${categoryId}]`).html();
      const item = $(`
            <tr>
                <td>#${accountId}</td>
                <td>${accountUsername}</td>
                <td>${type}</td>
                <td>${categoryName}</td>
                <td>${description}</td>
                <td>$${amount}</td>
                <td>${accountIdFrom}</td>
                <td>${accountIdTo}</td>
            </tr>
            `);

      table.append(item);
    }
  );
};

const getTransactions = async () => {
  const response = await fetch("http://localhost:3000/transactions");

  if (!response.ok) {
    throw new Error("something went wrong while get all transactions");
  }

  return response.json();
};

const createTransaction = async (transaction) => {
  const response = await fetch("http://localhost:3000/transactions", {
    method: "POST",
    body: JSON.stringify(transaction),
    headers: {
      "Content-Type": "application/json"
    },
  });

  if (!response.ok) {
    throw new Error("Something went wrong while creating transaction");
  }

  return response.json();
};



const transactions = [
  {
    title: "Pizza",
    date: "2021-08-01",
    amount: "-51"
  },
  {
    title: "Bolsa estágio",
    date: "2021-08-03",
    amount: "510"
  }
]

function addTransaction(event) {
  event.preventDefault()

  const transactionTitle = document.querySelector('#transaction-title').value
  const transactionDate = document.querySelector('#transaction-date').value
  const transactionAmount = document.querySelector('#transaction-amount').value

  const transaction = {
    id: Date.now(),
    title: transactionTitle,
    date: transactionDate,
    amount: transactionAmount
  }

  transactions.push(transaction)
  Form.clearFields()
  App.reload()

  //console.log(transactions)
}

const Form = {
  clearFields() {
    document.querySelector('#transaction-title').value = ""
    document.querySelector('#transaction-date').value = ""
    document.querySelector('#transaction-amount').value = ""
  }
}

const Modal = {
  open() {
    $('#add-transaction-modal').modal('show')
  }
}

const Document = {
  createTransactionRow(transaction, index) {
    const transactionRow = document.createElement('tr')
    transactionRow.dataset.index = index
  
    transactionRow.innerHTML = `
      <td>${index + 1}</td>
      <td>${transaction.title}</td>
      <td>${transaction.date}</td>
      <td class=${Number(transaction.amount) > 0 ? 'income' : 'outcome'}>R$ ${transaction.amount}</td>
    `
  
    const transactionsContainer = document.querySelector('#transactions-container')
    transactionsContainer.appendChild(transactionRow)
  },

  clearTransactions() {
    const transactionsContainer = document.querySelector('#transactions-container')
    transactionsContainer.innerHTML = ""
  }
}

const App = {
  init() {
    transactions.forEach((transaction, index) => {
      Document.createTransactionRow(transaction, index)
    })
  },

  reload() {
    Document.clearTransactions()
    this.init()
  }

}

App.init()




const transactions = []

const Transaction = {
  add(newTransaction) {
    transactions.push(newTransaction)
    App.reload()
  }
}

const Utils = {
  formatDate(date) {
    const splittedDate = date.split('-')
    return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
  },

  formatCurrency(amount) {
    amount = amount.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    return amount
  }
}

const Form = {
  title: document.querySelector('#transaction-title'),
  date: document.querySelector('#transaction-date'),
  amount: document.querySelector('#transaction-amount'),

  handleSubmit(event) {
    event.preventDefault()

    const newTransaction = this.getFormattedData()
    Transaction.add(newTransaction)
    this.clearFields()
  },

  getFormattedData() {
    return {
      title: this.title.value,
      date: Utils.formatDate(this.date.value),
      amount: Number(this.amount.value)
    }
  },

  clearFields() {
    document.querySelector('#transaction-title').value = ""
    document.querySelector('#transaction-date').value = ""
    document.querySelector('#transaction-amount').value = ""
  }
}

const Balance = {
  getIncomes() {
    let incomes = transactions.reduce((acc, transaction) => {
      if (transaction.amount >= 0) {
        acc += transaction.amount
      }
      return acc
    }, 0)

    return incomes
  },

  getExpenses() {
    let expenses = transactions.reduce((acc, transaction) => {
      if (transaction.amount < 0) {
        acc += transaction.amount
      }
      return acc
    }, 0)

    return expenses
  },

  getTotal() {
    const total = this.getIncomes() + this.getExpenses()
    return total
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

    const formattedAmount = Utils.formatCurrency(transaction.amount)
  
    transactionRow.innerHTML = `
      <td>${index + 1}</td>
      <td>${transaction.title}</td>
      <td>${transaction.date}</td>
      <td class=${transaction.amount > 0 ? 'income' : 'outcome'}>${formattedAmount}</td>
    `
  
    const transactionsContainer = document.querySelector('#transactions-container')
    transactionsContainer.appendChild(transactionRow)
  },

  

  clearTransactions() {
    const transactionsContainer = document.querySelector('#transactions-container')
    transactionsContainer.innerHTML = ""
  },

  updateBalance() {
    document
      .querySelector('#incomes')
      .textContent = Utils.formatCurrency(Balance.getIncomes())
    document
      .querySelector('#expenses')
      .textContent = Utils.formatCurrency(Balance.getExpenses())
    document
      .querySelector('#total')
      .textContent = Utils.formatCurrency(Balance.getTotal())
  }
}

const App = {
  init() {
    transactions.forEach((transaction, index) => {
      Document.createTransactionRow(transaction, index)
    })

    Document.updateBalance()
  },

  reload() {
    Document.clearTransactions()
    this.init()
  }

}

App.init()




function openModal() {
  $('#add-transaction-modal').modal('show')
}

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

  console.log(transaction)
}
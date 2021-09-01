const repositoryList = document.querySelector('#list-root')


fetch('https://api.github.com/users/algadev/repos')
  .then(response => response.json())
  .then(myRepositories => {
    myRepositories.forEach((repository) => {
      const repositoryItem = document.createElement('li')
      repositoryItem.innerHTML = `
      <h2>${repository.name}</h2>
      <p>${repository?.description || ''}</p>
      <a href=${repository.html_url} target='_blank'>
        See on Github
        <i class="fas fa-external-link-square-alt"></i>
      </a>
      `

      repositoryList.appendChild(repositoryItem)
    })
  })

const repositoriesRoot = document.querySelector('#repositories-root')

async function getRepositories() {
	const response = await fetch('https://api.github.com/users/algadev/repos');
	const repositories = response.json();

	return repositories;
}

async function renderRepositories() {
	const repositories = await getRepositories();

	repositories.forEach((repository) => {
		const repositoryItem = document.createElement('li');
		repositoryItem.innerHTML = `
			<h2>${repository.name}</h2>
			<p>${repository?.description || ''}</p>
			<a href=${repository.html_url} target='_blank'>
				See on Github
				<i class='fas fa-external-link-square-alt'></i>
			</a>
		`
		repositoriesRoot.appendChild(repositoryItem);
	});
}
renderRepositories();

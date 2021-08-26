// Get github data
fetch('https://api.github.com/users/algadev/repos')
  .then(response => response.json())
  .then(data => console.log(data))
function Links() {
  const url = `https://api.github.com/users/olssonik/repos`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Data contains an array of repositories
      data.forEach((repo) => {
        const repourl = `https://github.com/olssonik/${repo.name}`;

        const newDiv = `
          <div class="item">
            <div class="icon">
              <i class="fa fa-github" style="font-size:94px;color:red"></i>
            </div>
            <div class="text">
              <div ><a class="text-top" href="${repourl}">${repo.name}</a></div>
              <div class="text-bottom">${repo.description}</div>
            </div>
          </div>
          `;

        const containDiv = document.getElementById("contain");
        containDiv.innerHTML += newDiv;
      });
    })
    .catch((error) => {
      console.error("There was a problem with your fetch operation:", error);
    });

  return (
    <>
      <div id="contain"></div>
    </>
  );
}

export default Links;

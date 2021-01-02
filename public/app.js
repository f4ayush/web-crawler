const main = document.getElementById("main");
let titles = [];
let updatedOns = [];
let techs = [];

async function fetchData() {
  await fetch("/repo/title")
    .then((response) => response.json())
    .then((data) => {
      // data.forEach((title) => {
      // let heading = document.createElement("h2");
      // heading.innerText = title;
      // main.appendChild(heading);
      // });
      titles = data;
    })
    .catch((error) => console.log(error));

  await fetch("/repo/last-updated")
    .then((response) => response.json())
    .then((data) => {
      updatedOns = data;
    })
    .catch((error) => console.log(error));

  await fetch("/repo/tech-stack")
    .then((response) => response.json())
    .then((data) => {
      techs = data;
    })
    .catch((error) => console.log(error));
}

fetchData().then(() => {
  for (let i = 0; i < titles.length; i++) {
    let card = document.createElement("div");
    card.className = "card";
    let heading = document.createElement("h2");
    let lastUpdated = document.createElement("p");
    let techStack = document.createElement("p");
    heading.innerText = titles[i];
    lastUpdated.innerText = updatedOns[i];
    techStack.innerText = techs[i];

    card.appendChild(heading);
    card.appendChild(techStack);
    card.appendChild(lastUpdated);
    main.appendChild(card);
  }
});

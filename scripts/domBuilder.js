import { countries, reset, search } from "./countries.js";
import { getData, likedCountries, updateData } from "./storage.js";

const cards = document.querySelector("#cards");
const searchInput = document.querySelector("#search");

searchInput.addEventListener("keyup", (event) => {
  reset();
  cards.innerHTML = "";
  if (!event.target.value || event.target.value == "") {
    cards.innerHTML = "";
    return createCardList();
  }
  search(event.target.value);
  createCardList();
});

const cardsDiv = document.getElementById("cards");

export const createCard = (country) => {
  const card = document.createElement("div");
  card.className = "card shadow m-2 col-md-3 col-sm-12";

  const cardImg = document.createElement("img");
  cardImg.className = "card-img-top mt-2 border rounded";
  cardImg.src = country.flags.png;

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = country.name.common;

  const population = document.createElement("p");
  population.className = "card-text";
  population.textContent = `Population: ${country.population}`;

  const cardFooter = document.createElement("div");
  cardFooter.className = "card-footer d-flex justify-content-center mb-2";

  const heart = document.createElement("i");
  heart.className = "fa fa-heart";

  heart.addEventListener("click", () => {
    updateData(country.name.common);
    if (heart.classList[heart.classList.length - 1] == "text-dark") {
      heart.className = `fa fa-heart text-danger`;
    } else {
      heart.className = `fa fa-heart text-dark`;
    }
  });
  let isLiked = false;
  getData();
  if (likedCountries.includes(country.name.common)) {
    isLiked = true;
  }

  heart.className = `fa fa-heart ${isLiked ? "text-danger" : "text-dark"}`;

  card.appendChild(cardImg);
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(population);
  cardFooter.appendChild(heart);
  card.appendChild(cardBody);
  card.appendChild(cardFooter);

  cardsDiv.appendChild(card);
};

export const createCardList = () => {
  for (const iterator of countries) {
    createCard(iterator);
  }
};

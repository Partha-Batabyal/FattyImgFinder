const input = document.querySelector("input");
const btn = document.querySelector(".icon");
const hero = document.querySelector(".hero");
const key = "KZOIJz1bkmv0apaUh3j1Ti9dHtTmGRRkNNx4K_v-szU";

input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    btn.click();
  } else if (
    input.value === "" ||
    e.key === "Escape" ||
    e.key === "Backspace" ||
    e.key === "Delete"
  ) {
    hero.innerHTML = "";
    input.value = "";
  }
});

async function getPicture() {
  const url = `https://api.unsplash.com/search/photos?page=1&query=${input.value}&client_id=${key}&per_page=40`;
  const response = await fetch(url);
  const data = await response.json();

  // Clear existing images
  hero.innerHTML = "";

  let result = data.results;
  result.forEach((item) => {
    let img = document.createElement("img");
    img.src = item.urls.regular;

    hero.appendChild(img);
  });
}

btn.addEventListener("click", getPicture);

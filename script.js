document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const btn = document.querySelector(".icon");
  const hero = document.querySelector(".hero");
  const key = "acYlKxI6WWpG3MTBUQY1oiQc87yEoC48WouYKLcSt4c";
  let pagesToFetch = 10;

  // Display the current number of pages to fetch
  const pagesDisplay = document.createElement("div");
  pagesDisplay.className = "pages-display";
  pagesDisplay.textContent = `Pages to Fetch: ${pagesToFetch}`;
  document.body.appendChild(pagesDisplay);



  // Function to handle image click events
  function handleImageClick(img) {
    img.addEventListener("click", () => {
      img.classList.toggle("full-screen");
      document.querySelector(".wrapper").style.display = img.classList.contains(
        "full-screen"
      )
        ? "none"
        : "flex";
    });
  }

  // Function to display images
  function displayImages(data) {
    // Clear existing images
    hero.innerHTML = "";

    data.forEach((item) => {
      const img = document.createElement("img");
      img.classList.add("IMG");
      img.src = item.urls.regular;
      hero.appendChild(img);
      handleImageClick(img);
    });
  }

  // Function to fetch pictures from Unsplash
  async function getPicture() {
    const query = input.value.trim();
    if (!query) {
      hero.innerHTML = "Please enter a search term.";
      return;
    }

    let allImages = [];

    for (let page = 1; page <= pagesToFetch; page++) {
      const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=${key}&per_page=40`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.total === 0 && page === 1) {
          throw new Error("Sorry, no image found 🤷‍♂️");
        }
        allImages = allImages.concat(data.results);
      } catch (error) {
        if (page === 1) {
          hero.innerHTML = `${error.message}`;
          return;
        }
      }
    }
    displayImages(allImages);
  }

  // Event listener for input keyup
  input.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      btn.click();
    } else if (["Escape", "Backspace", "Delete"].includes(e.key)) {
      hero.innerHTML = "";
      input.value = "";
    }
  });

  // Event listener for button click
  btn.addEventListener("click", getPicture);
});

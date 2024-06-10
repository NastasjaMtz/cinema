function mod(n, m) {
      return ((n % m) + m) % m;
    }

const movieCarousel = document.getElementById('movies');
const movieCarouselItems = movieCarousel.querySelectorAll('.carousel-item');
const movieCarouselItemsLength = movieCarouselItems.length;
const movieCarouselIndex = 0;

const carouselItemCallback = (item, index) => {
      item.classList.add('active');
      movieCarouselItems.forEach((carouselItem, carouselItemIndex) => {
            if (carouselItemIndex !== index) {
                  carouselItem.classList.remove('active');
            }
            if (carouselItemIndex == mod(index + 1, movieCarouselItemsLength)) {
                  carouselItem.classList.add('next');
            } else {
                  carouselItem.classList.remove('next');
            }
            if (carouselItemIndex == mod(index - 1, movieCarouselItemsLength)) {
                  carouselItem.classList.add('previous');
            } else {
                  carouselItem.classList.remove('previous');
            }
      });
}

movieCarouselItems.forEach((item, index) => {
      if (index === movieCarouselIndex) {
            item.classList.add('active');
      }
      if (index === mod(movieCarouselIndex + 1, movieCarouselItemsLength)) {
            item.classList.add('next')
      }

      if (index === mod(movieCarouselIndex - 1, movieCarouselItemsLength)) {
            item.classList.add('previous')
      }
      item.addEventListener('click', () => {
            carouselItemCallback(item, index);
      });
});

const snackContainer = document.getElementById("snack-selection").getElementsByClassName("snack-selection-screen")[0];

const snackConfig = {
      Popcorn: {
            name: "Popcorn",
            taste: "Süß",
            price: "6€",
      },
      Sweets: {
            name: "Süßigkeiten",
            taste: "Süß",
            price: "6€",
      },
      Chips: {
            name: "Chips",
            taste: "Salzig",
            price: "6€"
      },
      Nachos: {
            name: "Nachos",
            taste: "Salzig",
            price: "6€"
      },
}

const constructSnackInfo = (snack) => {
      const container = document.createElement("div");
      container.classList.add("snack-info-container");
      const info = document.createElement("div");
      info.classList.add("snack-info");
      info.innerHTML = `<p class="snack-name"><b><span class="name">${snack.name}</span></b></p>
      <p class="snack-taste"><b>Geschmack</b>&nbsp;<span class="taste">${snack.taste}</span></p>
      <p class="snack-price"><b>Preis</b>&nbsp;<span class="price">${snack.price}</span></p>`;
      container.appendChild(info);
      return container;
}

const snacks = document.getElementById("snacks").getElementsByClassName("snack-selection")[0].getElementsByClassName("snack");
const selectedSnacks = [];
const snackInfos = Array.from(snacks).map((item) => {
      const img = item.getElementsByTagName("img")[0];
      const snackName = img.alt;
      return [snackName, constructSnackInfo(snackConfig[snackName])];
});
snackInfos.forEach(([, container]) => snackContainer.appendChild(container));
Array.from(snacks).forEach((item) => {
      item.addEventListener("click", () => {
            const img = item.getElementsByTagName("img")[0];
            const snackName = img.alt;
            if (item.classList.contains("active")) {
                  item.classList.remove("active");
                  selectedSnacks.splice(selectedSnacks.indexOf(snackName), 1);
                  snackInfos.find((info) => info[0] == snackName)[1].classList.remove("active");
            } else {
                  item.classList.add("active");
                  selectedSnacks.push(snackName);
                  snackInfos.find((info) => info[0] == snackName)[1].classList.add("active");
            }

            snackInfos.filter(([, info]) => info.classList.contains("active")).forEach(([, info], i) => {
                  if((i+1) % 2 === 0) {
                        info.classList.add("pl");
                        info.classList.remove("pr");
                  } else {
                        info.classList.add("pr");
                        info.classList.remove("pl");
                  }
            });

            const snackSelection = document.getElementById("snack-selection");
            snackSelection.style.display = snackInfos.filter(([, info]) => info.classList.contains("active")).length ? "block" : "none";
      });
});

const seatConfig = [8, 8, 10, 10];
const seatsContainer = document.getElementById("seats").getElementsByClassName("seats-container")[0];
const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const selectedSeats = [];
const seats = seatConfig.map((seatsInRow, rowInd) => {
      const row = document.createElement("div");
      row.classList.add("row");
      Array.apply(null, Array(seatsInRow)).map((_, i) => {
            const seatDiv = document.createElement("div");
            seatDiv.dataset.seat = `${alphabet.charAt(rowInd)}${i+1}`;
            seatDiv.classList.add("seat");

            seatDiv.addEventListener("click", () => {
                  if (seatDiv.classList.contains("active")) {
                        seatDiv.classList.remove("active");
                        selectedSeats.splice(selectedSeats.indexOf(seatDiv.dataset.seat), 1);
                  } else {
                        seatDiv.classList.add("active");
                        selectedSeats.push(seatDiv.dataset.seat);
                  }
                  const seatSelectionScreen = document.getElementById("seats-selection").getElementsByClassName("seat-selection-screen")[0];
                  seatSelectionScreen.innerHTML = selectedSeats.sort().join(", ");

                  const movieButton = document.getElementById("movie-button");
                  movieButton.style.display = selectedSeats.length ? "block" : "none";

                  const helperText = document.getElementById("seat-helper-text");
                  helperText.style.display = selectedSeats.length ? "block" : "none";
            });

            row.appendChild(seatDiv);
      });
      seatsContainer.appendChild(row);
});

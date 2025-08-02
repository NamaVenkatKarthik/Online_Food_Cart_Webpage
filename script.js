document.getElementById("searchBox").addEventListener("input", function () {
    const query = this.value.toLowerCase();
    const cards = document.querySelectorAll(".card, .swiper-slide");

    cards.forEach((card) => {
      const title = card.querySelector("h3").textContent.toLowerCase();
      card.style.display = title.includes(query) ? "block" : "none";
    });
  });
document.addEventListener("DOMContentLoaded", function () {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 20,
    centeredSlides: false,
    grabCursor: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 10
      },
      480: {
        slidesPerView: 1.5,
        spaceBetween: 15
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 25
      }
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    speed: 600,
    keyboard: {
      enabled: true,
    },
    mousewheel: {
      invert: false,
    }
  });

  document.addEventListener("click", function(e) {
    if (e.target.classList.contains("plus")) {
      e.preventDefault();
      e.stopPropagation();
      
      const button = e.target;
      const buttonsContainer = button.closest(".buttons");
      
      if (buttonsContainer) {
        const quantitySpan = buttonsContainer.querySelector(".quantity-display");
        if (quantitySpan) {
          let quantity = parseInt(quantitySpan.textContent) || 0;
          quantity++;
          quantitySpan.textContent = quantity;
        }
      }
      
      button.style.transform = "scale(0.9)";
      setTimeout(() => {
        button.style.transform = "scale(1)";
      }, 150);
    }
  });

  const video = document.getElementById("promoVideo");
  const playBtn = document.getElementById("playButton");

  if (video && playBtn) {
    playBtn.addEventListener("click", () => {
      video.play();
      playBtn.style.display = "none";
    });

    video.addEventListener("click", () => {
      if (!video.paused) {
        video.pause();
        playBtn.style.display = "flex";
      } else {
        video.play();
        playBtn.style.display = "none";
      }
    });
  }

  const searchIcon = document.getElementById("searchIcon");
  const searchPopup = document.getElementById("searchPopup");
  const searchBox = document.getElementById("searchBox");
  const closeBtn = document.getElementById("searchCloseBtn");

  if (searchIcon && searchPopup && searchBox && closeBtn) {
    searchIcon.addEventListener("click", () => {
      searchPopup.style.display = "flex";
      searchBox.focus();
    });

    closeBtn.addEventListener("click", () => {
      searchPopup.style.display = "none";
      searchBox.value = "";
    });

    window.addEventListener("click", (e) => {
      if (e.target === searchPopup) {
        searchPopup.style.display = "none";
      }
    });
  }

  let cart = {};

function updateCartUI() {
  const cartItemsContainer = document.getElementById("cartItems");
  const cartTotal = document.getElementById("cartTotal");
  cartItemsContainer.innerHTML = "";
  let total = 0;

  for (const [name, item] of Object.entries(cart)) {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <span class="cart-item-name">${name}</span>
      <span>₹${item.price} × ${item.quantity}</span>
    `;
    total += item.price * item.quantity;
    cartItemsContainer.appendChild(itemElement);
  }

  cartTotal.textContent = total;
}

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("plus")) {
    const card = e.target.closest(".card, .swiper-slide");
    const name = card.querySelector("h3")?.textContent || "Item";
    const priceText = card.querySelector(".price")?.textContent?.replace(/[^\d]/g, "") || "0";
    const price = parseInt(priceText);

    if (!cart[name]) {
      cart[name] = { price, quantity: 1 };
    } else {
      cart[name].quantity += 1;
    }

    updateCartUI();
  }
});

const cartIcon = document.getElementById("cartIcon");
const cartPopup = document.getElementById("cartPopup");
const closeCartBtn = document.getElementById("closeCartBtn");

if (cartIcon && cartPopup && closeCartBtn) {
  cartIcon.addEventListener("click", () => {
    cartPopup.style.display = "flex";
  });

  closeCartBtn.addEventListener("click", () => {
    cartPopup.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === cartPopup) {
      cartPopup.style.display = "none";
    }
  });
}


  const requestModal = document.getElementById("requestModal");
  const openRequestBtn = document.getElementById("requestDishBtn");
  const closeRequestBtn = document.getElementById("closeModalBtn");
  const requestForm = document.getElementById("requestDishForm");

  if (requestModal && openRequestBtn && closeRequestBtn && requestForm) {
    openRequestBtn.addEventListener("click", () => {
      requestModal.style.display = "flex";
    });

    closeRequestBtn.addEventListener("click", () => {
      requestModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
      if (e.target === requestModal) {
        requestModal.style.display = "none";
      }
    });

    requestForm.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Your dish request has been submitted!");
      requestForm.reset();
      requestModal.style.display = "none";
    });
  }

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const formData = new FormData(contactForm);
      const name = formData.get("name");
      const email = formData.get("email");
      const message = formData.get("message");
      
      if (!name || !email || !message) {
        alert("Please fill in all fields.");
        return;
      }
      
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
      }
      
      alert("Thank you for your message! We'll get back to you within 48 hours.");
      contactForm.reset();
    });
  }

  document.querySelectorAll("a[href^=\"#\"]").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });

  const images = document.querySelectorAll("img[loading=\"lazy\"]");
  images.forEach(img => {
    img.addEventListener("load", function() {
      this.style.opacity = "1";
    });
  });
});
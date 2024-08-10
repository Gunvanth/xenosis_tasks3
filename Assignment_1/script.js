/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  if(toggle && nav){
      toggle.addEventListener('click', ()=>{
          nav.classList.toggle('show')
      })
  }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))




document.querySelectorAll('.button').forEach(button => button.addEventListener('click', e => {
  if(!button.classList.contains('loading')) {

      button.classList.add('loading');

      setTimeout(() => button.classList.remove('loading'), 3700);

  }
  e.preventDefault();
}));





// script.js
document.addEventListener('DOMContentLoaded', () => {
  const cartIcon = document.querySelector('.cart-icon');
  const cartModal = document.getElementById('cart-modal');
  const closeCart = document.getElementById('close-cart');
  const addToCartButtons = document.querySelectorAll('.add-to-cart');
  const cartItemsList = document.getElementById('cart-items');
  const cartCount = document.getElementById('cart-count');
  const cartTotalValue = document.getElementById('cart-total-value');
  const checkoutButton = document.getElementById('checkout');

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  const updateCartCount = () => {
      cartCount.textContent = cart.length;
  };

  const updateCartTotal = () => {
      const total = cart.reduce((sum, item) => sum + (parseFloat(item.price.replace('₹', '')) * item.quantity), 0);
      cartTotalValue.textContent = total.toFixed(2);
  };

  const saveCart = () => {
      localStorage.setItem('cart', JSON.stringify(cart));
  };

  const addToCart = (product) => {
      const existingProductIndex = cart.findIndex(item => item.id === product.id);
      if (existingProductIndex !== -1) {
          cart[existingProductIndex].quantity += 1;
      } else {
          cart.push(product);
      }
      saveCart();
      updateCartCount();
      updateCartTotal();
  };

  const showCart = () => {
      cartItemsList.innerHTML = '';
      cart.forEach(item => {
          const li = document.createElement('li');
          li.innerHTML = `
              <img src="${item.image}" alt="${item.name}" class="cart-item-image">
              <span>${item.name}</span> <span>${item.price}</span>
              <div class="quantity-control">
                  <button class="decrease-quantity" data-id="${item.id}">-</button>
                  <span class="quantity">${item.quantity}</span>
                  <button class="increase-quantity" data-id="${item.id}">+</button>
              </div>
          `;
          cartItemsList.appendChild(li);
      });

      document.querySelectorAll('.increase-quantity').forEach(button => {
          button.addEventListener('click', (event) => {
              const id = event.target.dataset.id;
              const product = cart.find(item => item.id === id);
              product.quantity += 1;
              saveCart();
              showCart();
              updateCartTotal();
          });
      });

      document.querySelectorAll('.decrease-quantity').forEach(button => {
          button.addEventListener('click', (event) => {
              const id = event.target.dataset.id;
              const product = cart.find(item => item.id === id);
              if (product.quantity > 1) {
                  product.quantity -= 1;
              } else {
                  cart = cart.filter(item => item.id !== id);
              }
              saveCart();
              showCart();
              updateCartTotal();
          });
      });

      updateCartTotal();
      cartModal.style.display = 'flex';
  };

  addToCartButtons.forEach(button => {
      button.addEventListener('click', () => {
          const card = button.closest('.product-card');
          const id = card.dataset.id;
          const name = card.querySelector('.product-name').textContent;
          const price = card.querySelector('.product-price').textContent;
          const image = card.querySelector('img').src;

          const product = { id, name, price, image, quantity: 1 };
          addToCart(product);
      });
  });

  cartIcon.addEventListener('click', showCart);
  closeCart.addEventListener('click', () => {
      cartModal.style.display = 'none';
  });

  checkoutButton.addEventListener('click', () => {
      alert('Proceed to checkout');
      // Add your checkout logic here
  });

  // Initial cart count and total update
  updateCartCount();
  updateCartTotal();
});


document.addEventListener('DOMContentLoaded', () => {
    // Select the main image element
    const mainImage = document.querySelector('.product__thumb-main');
  
    // Handle thumbnail clicks
    const thumbnails = document.querySelectorAll('.product__thumb');
    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', (event) => {
        // Change the main image source to the clicked thumbnail's source
        mainImage.src = event.target.src;
      });
    });
  
    // Add to Cart functionality
    const addToCartButton = document.querySelector('.add-to-cart');
    addToCartButton.addEventListener('click', () => {
      const productId = document.querySelector('.product-card1').dataset.id;
      const productName = document.querySelector('.product__name').innerText;
      const productPrice = document.querySelector('.product__price').innerText;
  
      // Add product to the cart (in this example, we're using localStorage)
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ id: productId, name: productName, price: productPrice });
      localStorage.setItem('cart', JSON.stringify(cart));
  
    });
  
    // Favourite button functionality
    const favouriteButton = document.querySelector('.favourite');
    favouriteButton.addEventListener('click', () => {
      favouriteButton.classList.toggle('favourited');
      if (favouriteButton.classList.contains('favourited')) {
      }
    });
  });
  



// Event listener for size buttons
document.querySelectorAll('.size__btn').forEach(button => {
    button.addEventListener('click', () => {
      // Remove 'selected' class from all size buttons
      document.querySelectorAll('.size__btn').forEach(btn => btn.classList.remove('selected'));
      // Add 'selected' class to the clicked button
      button.classList.add('selected');
      const selectedSize = button.getAttribute('data-size');
      console.log('Selected size:', selectedSize);
    });
  });
  
  // Event listener for favourite button
  document.querySelector('.favourite').addEventListener('click', function() {
    // Toggle 'selected' class
    this.classList.toggle('selected');
  });
  




  document.addEventListener('DOMContentLoaded', function() {
    loadReviewsFromStorage();

    document.getElementById('review-form').addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent default form submission

        // Get form values
        const name = document.getElementById('review-name').value;
        const product = document.getElementById('review-product').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;
        const text = document.getElementById('review-text').value;

        // Add the new review to the grid and save it to local storage
        addReviewToGrid(name, product, rating, text);
        saveReviewToStorage(name, product, rating, text);

        // Show the overlay
        const overlay = document.getElementById('thankyou-overlay');
        overlay.classList.add('show');

        // Handle "Continue" button click
        document.getElementById('continue-button').addEventListener('click', function() {
            overlay.classList.remove('show');

            // Scroll to 4cm above the reviews section
            const reviewsSection = document.getElementById('reviews-section');
            const offset = reviewsSection.getBoundingClientRect().top + window.scrollY - 4 * 37.795275591; // 4cm in pixels
            window.scrollTo({ top: offset, behavior: 'smooth' });
        });

        // Clear form fields after submission
        document.getElementById('review-form').reset();
    });
});

function addReviewToGrid(name, product, rating, text) {
    const reviewGrid = document.querySelector('.review-grid');

    const reviewItem = document.createElement('div');
    reviewItem.className = 'review-item';

    const reviewDP = document.createElement('a');
    reviewDP.className = 'review-dp';
    reviewDP.innerHTML = '<i class="fa-solid fa-user"></i>';

    const productRating = generateStarRating(rating);

    const reviewName = document.createElement('p');
    reviewName.className = 'review-name';
    reviewName.textContent = name;

    const reviewProduct = document.createElement('p');
    reviewProduct.className = 'review-product';
    reviewProduct.textContent = product;

    const reviewText = document.createElement('p');
    reviewText.className = 'review-text';
    reviewText.textContent = text;

    reviewItem.appendChild(reviewDP);
    reviewItem.appendChild(productRating);
    reviewItem.appendChild(reviewName);
    reviewItem.appendChild(reviewProduct);
    reviewItem.appendChild(reviewText);

    // Prepend the new review to the top of the review grid
    reviewGrid.prepend(reviewItem);
}

function generateStarRating(rating) {
    const ratingDiv = document.createElement('div');
    ratingDiv.className = 'product__rating';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
        const star = document.createElement('i');
        star.className = 'fa-solid fa-star';
        ratingDiv.appendChild(star);
    }

    if (halfStar) {
        const halfStarElement = document.createElement('i');
        halfStarElement.className = 'fa-solid fa-star-half-stroke';
        ratingDiv.appendChild(halfStarElement);
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        const star = document.createElement('i');
        star.className = 'fa-regular fa-star';
        ratingDiv.appendChild(star);
    }

    return ratingDiv;
}

function saveReviewToStorage(name, product, rating, text) {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.unshift({ name, product, rating, text });
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

function loadReviewsFromStorage() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.forEach(function(review) {
        addReviewToGrid(review.name, review.product, review.rating, review.text);
    });
}




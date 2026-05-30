const data = [
    {
        place: 'Heritage Pork / England',
        title: 'BERK',
        title2: 'SHIRE',
        price: '$450 / Piglet',
        specs: 'Meat Quality: Exceptional | Temperament: Docile',
        description: 'Renowned for its rich, heavily marbled dark meat that is exceptionally juicy and tender. A premium choice for high-end restaurants and direct-to-consumer sales.',
        image: './images/berkshire.png'
    },
    {
        place: 'Terminal Sire / USA',
        title: 'DU',
        title2: 'ROC',
        price: '$380 / Piglet',
        specs: 'Growth Rate: Fast | Yield: Very High',
        description: 'Famous for its reddish-brown color, fast growth rate, and excellent feed efficiency. Duroc genetics yield high carcass cutout value and juicy, high-quality pork.',
        image: './images/duroc.png'
    },
    {
        place: 'Lean Carcass / England',
        title: 'HAMP',
        title2: 'SHIRE',
        price: '$350 / Piglet',
        specs: 'Lean Meat %: Superior | Foraging: Excellent',
        description: 'The "Belted Breed" is widely known for producing exceptionally lean carcasses with minimal fat cover. High muscle percentage and hardy performance in pasture setups.',
        image: './images/hampshire.png'
    },
    {
        place: 'Maternal Breed / England',
        title: 'YORK',
        title2: 'SHIRE',
        price: '$400 / Piglet',
        specs: 'Litter Size: 11-14 | Mothering: Outstanding',
        description: 'Known as the "Mother Breed," Yorkshires are white with erect ears, celebrated for large litter sizes, superb milking ability, and exceptional mothering instincts.',
        image: './images/yorkshire.png'
    },
    {
        place: 'Premium Bacon / England',
        title: 'TAM',
        title2: 'WORTH',
        price: '$420 / Piglet',
        specs: 'Bacon Quality: Elite | Grazing: Excellent',
        description: 'A heritage ginger-colored breed renowned for yielding the finest bacon. Exceptional foragers that thrive on pasture and woodland, making them a favorite for organic farms.',
        image: './images/tamworth.png'
    },
    {
        place: 'Maternal & Bacon / Denmark',
        title: 'LAND',
        title2: 'RACE',
        price: '$390 / Piglet',
        specs: 'Milking Yield: High | Body Length: Extra Long',
        description: 'White pigs with distinctive large, drooping ears and a very long body. Highly prized for crossbreeding to produce hybrid commercial mothers with high milk yield and longevity.',
        image: './images/landrace.png'
    },
    {
        place: 'Hybrid Sire / SG Afrika',
        title: 'SG -',
        title2: '11',
        price: '$490 / Piglet',
        specs: 'Conformation: Extreme Muscling | Color: White',
        description: 'A breakthrough hybrid sire line combining the clean, solid white color of the Large White with the extreme muscularity and high lean yield of the Pietrain breed.',
        image: './images/sg11.png'
    },
    {
        place: 'Terminal Sire / Belgium',
        title: 'PIE',
        title2: 'TRAIN',
        price: '$460 / Piglet',
        specs: 'Muscling: Extreme | Lean Yield: Maximum',
        description: 'A medium-sized spotted breed renowned for its unparalleled muscle development and high yield of lean meat. Excellent for producing top-grade terminal market pigs.',
        image: './images/pietrain.png'
    },
    {
        place: 'Maternal Breed / England',
        title: 'LARGE',
        title2: 'WHITE',
        price: '$410 / Piglet',
        specs: 'Litter Size: 12-16 | Growth: Excellent',
        description: 'The foundation of modern commercial pig breeding. Features erect ears, a large white frame, rapid growth, and outstanding mothering performance.',
        image: './images/largewhite.png'
    }
]

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`).join('')



const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>

</div>`).join('')


const sildeNumbers = data.map((_, index)=>`<div class="item" id="slide-item-${index}" >${index+1}</div>`).join('')
_('demo').innerHTML =  cards + cardContents
_('slide-numbers').innerHTML =  sildeNumbers


const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}
function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  document.querySelector(`${detailsActive} .place-box .text`).textContent = data[active].place;
  document.querySelector(`${detailsActive} .title-1`).textContent = data[active].title;
  document.querySelector(`${detailsActive} .title-2`).textContent = data[active].title2;
  document.querySelector(`${detailsActive} .price-tag`).textContent = data[active].price;
  document.querySelector(`${detailsActive} .specs-tag`).textContent = data[active].specs;
  document.querySelector(`${detailsActive} .desc`).textContent = data[active].description;

  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .price-tag`, { y: 80, opacity: 0 });
  gsap.set(`${detailsInactive} .specs-tag`, { y: 80, opacity: 0 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        startAutoLoop();
      }, 500);
    },
  });
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let isAnimating = false;
let currentTimer = null;

function resetTimer() {
  if (currentTimer) {
    currentTimer.kill();
  }
  gsap.set(".indicator", { x: -window.innerWidth });
}

async function startAutoLoop() {
  if (isAnimating) return;
  resetTimer();
  currentTimer = gsap.timeline({
    onComplete: async () => {
      await step("next");
      startAutoLoop();
    }
  });
  currentTimer.to(".indicator", { x: 0, duration: 4, ease: "none" });
  currentTimer.to(".indicator", { x: window.innerWidth, duration: 0.8, ease: "none" });
}

function step(direction = "next") {
  return new Promise((resolve) => {
    isAnimating = true;
    if (direction === "next") {
      order.push(order.shift());
    } else {
      order.unshift(order.pop());
    }
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .price-tag`).textContent =
      data[order[0]].price;
    document.querySelector(`${detailsActive} .specs-tag`).textContent =
      data[order[0]].specs;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .price-tag`, {
      y: 0,
      opacity: 1,
      delay: 0.2,
      duration: 0.6,
      ease,
    });
    gsap.to(`${detailsActive} .specs-tag`, {
      y: 0,
      opacity: 1,
      delay: 0.25,
      duration: 0.6,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = direction === "next" ? rest[rest.length - 1] : rest[0];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    if (direction === "next") {
      gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    }
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      rotation: 0,
      boxShadow: "none",
      onComplete: () => {
        const xNew = direction === "next" ? offsetLeft + (rest.length - 1) * (cardWidth + gap) : offsetLeft;
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
          rotation: 0,
          boxShadow: "none",
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          scale: 1,
          rotation: 0,
        });
        gsap.set(getSliderItem(prv), { x: direction === "next" ? rest.length * numberSize : 1 * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .price-tag`, { y: 80, opacity: 0 });
        gsap.set(`${detailsInactive} .specs-tag`, { y: 80, opacity: 0 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        
        isAnimating = false;
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          rotation: 0,
          boxShadow: "none",
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          scale: 1,
          rotation: 0,
          ease,
          delay: 0.1 * (index + 1),
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

function jumpTo(targetIdx) {
  return new Promise((resolve) => {
    isAnimating = true;
    const idxInOrder = order.indexOf(targetIdx);
    if (idxInOrder === 0) {
      isAnimating = false;
      resolve();
      return;
    }
    
    const steps = idxInOrder;
    const oldActive = order[0];
    for (let i = 0; i < steps; i++) {
      order.push(order.shift());
    }
    
    detailsEven = !detailsEven;
    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .price-tag`).textContent =
      data[order[0]].price;
    document.querySelector(`${detailsActive} .specs-tag`).textContent =
      data[order[0]].specs;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .price-tag`, {
      y: 0,
      opacity: 1,
      delay: 0.2,
      duration: 0.6,
      ease,
    });
    gsap.to(`${detailsActive} .specs-tag`, {
      y: 0,
      opacity: 1,
      delay: 0.25,
      duration: 0.6,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;

    // Set z-indices
    gsap.set(getCard(oldActive), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });

    // Animate old active card shrinking to its new preview position
    const oldActiveNewIndex = rest.indexOf(oldActive);
    const xOldActive = offsetLeft + oldActiveNewIndex * (cardWidth + gap);
    
    gsap.to(getCard(oldActive), {
      x: xOldActive,
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      borderRadius: 10,
      scale: 1,
      rotation: 0,
      boxShadow: "none",
      ease,
      duration: 0.8
    });
    
    gsap.to(getCardContent(oldActive), {
      x: xOldActive,
      y: offsetTop + cardHeight - 100,
      opacity: 1,
      zIndex: 40,
      scale: 1,
      rotation: 0,
      ease,
      duration: 0.8
    });
    
    gsap.to(getSliderItem(oldActive), {
      x: (oldActiveNewIndex + 1) * numberSize,
      ease,
      duration: 0.8
    });

    // Hide active card content
    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease, duration: 0.8 });
    
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
      duration: 0.8
    });

    // Animate new active card expanding to full screen
    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      rotation: 0,
      boxShadow: "none",
      duration: 0.8,
      onComplete: () => {
        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .price-tag`, { y: 80, opacity: 0 });
        gsap.set(`${detailsInactive} .specs-tag`, { y: 80, opacity: 0 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        
        isAnimating = false;
        resolve();
      },
    });

    // Animate other preview cards to their new positions
    rest.forEach((i, index) => {
      if (i !== oldActive) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          borderRadius: 10,
          scale: 1,
          rotation: 0,
          boxShadow: "none",
          ease,
          duration: 0.8
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          scale: 1,
          rotation: 0,
          ease,
          duration: 0.8
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease, duration: 0.8 });
      }
    });
  });
}

let swipeStartX = 0;
let swipeStartY = 0;
let swipeIsDragging = false;

function setupSwipeEvents() {
  // Touch Events (for mobile)
  window.addEventListener("touchstart", (e) => {
    if (e.target.closest("#cart-drawer") || e.target.closest("#order-modal")) return;
    swipeStartX = e.touches[0].clientX;
    swipeStartY = e.touches[0].clientY;
    swipeIsDragging = true;
  }, { passive: true });

  window.addEventListener("touchend", (e) => {
    if (!swipeIsDragging) return;
    swipeIsDragging = false;
    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;
    handleSwipe(swipeStartX, swipeStartY, endX, endY);
  }, { passive: true });

  // Mouse Events (for dragging on desktop)
  window.addEventListener("mousedown", (e) => {
    // Only drag on left click and not inside cart/modal/buttons
    if (e.button !== 0) return;
    if (e.target.closest("#cart-drawer") || e.target.closest("#order-modal")) return;
    if (e.target.closest("button") || e.target.closest(".bookmark") || e.target.closest(".discover")) return;
    
    swipeStartX = e.clientX;
    swipeStartY = e.clientY;
    swipeIsDragging = true;
  });

  window.addEventListener("mouseup", (e) => {
    if (!swipeIsDragging) return;
    swipeIsDragging = false;
    const endX = e.clientX;
    const endY = e.clientY;
    handleSwipe(swipeStartX, swipeStartY, endX, endY);
  });
}

async function handleSwipe(startX, startY, endX, endY) {
  if (isAnimating) return;
  
  const diffX = endX - startX;
  const diffY = endY - startY;
  
  // Minimum horizontal swipe distance of 60px, and swipe must be horizontal
  if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 60) {
    resetTimer();
    if (diffX < 0) {
      // Swiped left -> Next slide
      await step("next");
    } else {
      // Swiped right -> Previous slide
      await step("prev");
    }
    startAutoLoop();
  }
}

// Cart System
let cart = [];
const cartBadge = document.querySelector(".cart-badge");

function addToCart(breed) {
  const breedId = data.indexOf(breed);
  const existingItem = cart.find(item => item.id === breedId);
  
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    // Extract price number from price string (e.g. "$450 / Piglet" -> 450)
    const priceNum = parseInt(breed.price.replace(/[^0-9]/g, '')) || 0;
    cart.push({
      id: breedId,
      title: breed.title + breed.title2,
      price: priceNum,
      priceStr: breed.price.split(' / ')[0], // "$450"
      image: breed.image,
      quantity: 1
    });
  }
  
  updateCartBadge();
  renderCart();
  openCartDrawer();
  showToast(`${breed.title}${breed.title2} genetics added to cart.`);
}

function updateCartBadge() {
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartBadge.textContent = totalQty;
  if (totalQty > 0) {
    cartBadge.classList.add("active");
  } else {
    cartBadge.classList.remove("active");
  }
}

function updateCartItemQty(breedId, delta) {
  const itemIndex = cart.findIndex(item => item.id === breedId);
  if (itemIndex === -1) return;
  
  cart[itemIndex].quantity += delta;
  
  if (cart[itemIndex].quantity <= 0) {
    cart.splice(itemIndex, 1);
  }
  
  updateCartBadge();
  renderCart();
}

function removeCartItem(breedId) {
  const itemIndex = cart.findIndex(item => item.id === breedId);
  if (itemIndex !== -1) {
    cart.splice(itemIndex, 1);
    updateCartBadge();
    renderCart();
  }
}

// Expose functions globally for HTML inline onclick handlers
window.updateCartItemQty = updateCartItemQty;
window.removeCartItem = removeCartItem;

function renderCart() {
  const container = document.querySelector(".cart-items-container");
  const checkoutBtn = document.getElementById("checkout-btn");
  const totalDisplay = document.querySelector(".cart-total-price");
  
  if (cart.length === 0) {
    container.innerHTML = `<div class="cart-empty-state">Your cart is empty. Add breeds below to start!</div>`;
    checkoutBtn.disabled = true;
    totalDisplay.textContent = "$0.00";
    return;
  }
  
  checkoutBtn.disabled = false;
  let total = 0;
  
  const itemsHtml = cart.map(item => {
    const itemSubtotal = item.price * item.quantity;
    total += itemSubtotal;
    
    return `
      <div class="cart-item">
        <div class="cart-item-img" style="background-image: url(${item.image})"></div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.title}</div>
          <div class="cart-item-price">$${item.price} each</div>
        </div>
        <div class="cart-item-controls">
          <div class="cart-item-qty">
            <button class="qty-btn dec-qty-btn" onclick="updateCartItemQty(${item.id}, -1)">-</button>
            <span class="qty-num">${item.quantity}</span>
            <button class="qty-btn inc-qty-btn" onclick="updateCartItemQty(${item.id}, 1)">+</button>
          </div>
          <button class="remove-item" onclick="removeCartItem(${item.id})">Remove</button>
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = itemsHtml;
  totalDisplay.textContent = `$${total.toLocaleString()}`;
}

// GSAP Drawer Animations
function openCartDrawer() {
  resetTimer();
  gsap.to("#cart-drawer", { right: 0, duration: 0.5, ease: "power3.out" });
  gsap.to("#cart-backdrop", { opacity: 1, pointerEvents: "all", duration: 0.3 });
}

function closeCartDrawer() {
  gsap.to("#cart-drawer", { right: -420, duration: 0.4, ease: "power3.in" });
  gsap.to("#cart-backdrop", { opacity: 0, pointerEvents: "none", duration: 0.3 });
  if (cart.length === 0) {
    startAutoLoop();
  } else {
    // If items are left in the cart, let's also restart loop
    startAutoLoop();
  }
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  container.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 300);
  }, 2700);
}

// Modal Order System
const modal = document.getElementById("order-modal");
const modalTitle = document.getElementById("modal-title");
const orderForm = document.getElementById("order-form");
const orderSuccess = document.getElementById("order-success");
let isCartCheckout = false;

function openOrderModal(breed = null) {
  orderForm.style.display = "block";
  orderSuccess.style.display = "none";
  orderForm.reset();
  
  // Reset fulfillment dynamic state
  const addressGroup = document.getElementById("delivery-address-group");
  const addressInput = document.getElementById("delivery-address");
  if (addressGroup && addressInput) {
    addressGroup.style.display = "none";
    addressInput.required = false;
  }
  
  const summaryGroup = document.getElementById("cart-summary-group");
  const qtyGroup = document.getElementById("order-qty-group");
  
  if (breed) {
    isCartCheckout = false;
    modalTitle.textContent = `Order ${breed.title}${breed.title2} Genetics`;
    document.getElementById("modal-subtitle").textContent = "Reserve genetics or request stock from SG Afrika Farms.";
    summaryGroup.style.display = "none";
    qtyGroup.style.display = "block";
    document.getElementById("order-qty").required = true;
  } else {
    isCartCheckout = true;
    modalTitle.textContent = "Reserve Genetics Order";
    document.getElementById("modal-subtitle").textContent = "Provide your details to submit your inquiry for all cart items.";
    summaryGroup.style.display = "block";
    qtyGroup.style.display = "none";
    document.getElementById("order-qty").required = false;
    
    let subtotal = 0;
    const summaryItemsHtml = cart.map(item => {
      const sub = item.price * item.quantity;
      subtotal += sub;
      return `${item.quantity}x ${item.title} ($${item.price} ea) - $${sub.toLocaleString()}`;
    }).join("<br>");
    
    document.getElementById("cart-summary-items").innerHTML = summaryItemsHtml;
    document.getElementById("cart-summary-total").textContent = `Total: $${subtotal.toLocaleString()}`;
  }
  modal.classList.add("active");
}

function closeOrderModal() {
  modal.classList.remove("active");
}

function setupEvents() {
  document.querySelector(".arrow-right").addEventListener("click", async () => {
    if (isAnimating) return;
    resetTimer();
    await step("next");
    startAutoLoop();
  });

  document.querySelector(".arrow-left").addEventListener("click", async () => {
    if (isAnimating) return;
    resetTimer();
    await step("prev");
    startAutoLoop();
  });

  // Nav Arrows GSAP Hover & Click Feedback
  document.querySelectorAll(".arrow").forEach(arrow => {
    const isRight = arrow.classList.contains("arrow-right");
    const arrowIcon = arrow.querySelector("svg");
    
    arrow.addEventListener("mouseenter", () => {
      gsap.to(arrow, {
        scale: 1.15,
        borderColor: "#ecad29",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(arrowIcon, {
        x: isRight ? 4 : -4,
        color: "#ecad29",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    arrow.addEventListener("mouseleave", () => {
      gsap.to(arrow, {
        scale: 1,
        borderColor: "rgba(255, 255, 255, 0.33)",
        duration: 0.3,
        ease: "power2.out"
      });
      gsap.to(arrowIcon, {
        x: 0,
        color: "rgba(255, 255, 255, 0.6)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    arrow.addEventListener("mousedown", () => {
      gsap.to(arrow, { scale: 0.9, duration: 0.1 });
    });
    
    arrow.addEventListener("mouseup", () => {
      gsap.to(arrow, { scale: 1.15, duration: 0.2, ease: "back.out(2)" });
    });
  });

  // Discover CTA ("Order Breed") Hover/Click
  document.querySelectorAll(".discover").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.08,
        backgroundColor: "#ecad29",
        color: "#1a1a1a",
        borderColor: "#ecad29",
        boxShadow: "0 8px 20px rgba(236, 173, 41, 0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        backgroundColor: "transparent",
        color: "#ffffff",
        borderColor: "#ffffff",
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener("mousedown", () => {
      gsap.to(btn, { scale: 0.95, duration: 0.1 });
    });
    
    btn.addEventListener("mouseup", () => {
      gsap.to(btn, { scale: 1.08, duration: 0.2, ease: "back.out(2)" });
    });
    
    btn.addEventListener("click", () => {
      const activeBreed = data[order[0]];
      addToCart(activeBreed);
    });
  });

  // Cart Add Button ("Bookmark") Hover/Click
  document.querySelectorAll(".bookmark").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, {
        scale: 1.2,
        rotation: 12,
        boxShadow: "0 8px 20px rgba(236, 173, 41, 0.5)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, {
        scale: 1,
        rotation: 0,
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    btn.addEventListener("mousedown", () => {
      gsap.to(btn, { scale: 0.8, duration: 0.1 });
    });
    
    btn.addEventListener("mouseup", () => {
      gsap.to(btn, { scale: 1.2, duration: 0.2, ease: "back.out(2)" });
    });
    
    btn.addEventListener("click", () => {
      const activeBreed = data[order[0]];
      addToCart(activeBreed);
    });
  });

  // Cart icon click opens the cart drawer
  document.querySelector(".cart-icon-nav").addEventListener("click", () => {
    openCartDrawer();
  });

  // Cart Drawer close button and backdrop click
  document.querySelector(".close-cart-btn").addEventListener("click", closeCartDrawer);
  document.getElementById("cart-backdrop").addEventListener("click", closeCartDrawer);

  // Cart Drawer Checkout Button Click
  document.getElementById("checkout-btn").addEventListener("click", () => {
    closeCartDrawer();
    openOrderModal(); // Open modal in Cart mode (no arguments)
  });

  // Navigation Links Hover Animations
  document.querySelectorAll("nav > div:last-child > div").forEach(link => {
    if (link.classList.contains("active")) return;
    
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        y: -2,
        color: "#ecad29",
        duration: 0.2,
        ease: "power1.out"
      });
    });
    
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        y: 0,
        color: "", // restores default color from stylesheet
        duration: 0.2,
        ease: "power1.out"
      });
    });
  });

  let startClickX = 0;
  let startClickY = 0;

  // Card hover & click navigation
  data.forEach((_, idx) => {
    const cardEl = document.getElementById(`card${idx}`);
    const contentEl = document.getElementById(`card-content-${idx}`);
    if (cardEl && contentEl) {
      // Track start of click/drag
      cardEl.addEventListener("mousedown", (e) => {
        startClickX = e.clientX;
        startClickY = e.clientY;
      });

      // Hover Enter
      cardEl.addEventListener("mouseenter", () => {
        if (order[0] === idx) return; // ignore if it's the active full-screen card
        gsap.to(cardEl, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "none",
          overwrite: "auto"
        });
        gsap.to(contentEl, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      });

      // Hover Leave
      cardEl.addEventListener("mouseleave", () => {
        if (order[0] === idx) return;
        gsap.to(cardEl, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          boxShadow: "none",
          overwrite: "auto"
        });
        gsap.to(contentEl, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: "auto"
        });
      });

      // Click to navigate directly to this card (if not a drag)
      cardEl.addEventListener("click", async (e) => {
        if (isAnimating) return;
        if (order[0] === idx) return; // already active
        
        // Ignore if click was part of a drag/swipe gesture (moved > 10px)
        const moveDist = Math.sqrt(
          Math.pow(e.clientX - startClickX, 2) + 
          Math.pow(e.clientY - startClickY, 2)
        );
        if (moveDist > 10) return;
        
        resetTimer();
        await jumpTo(idx);
        startAutoLoop();
      });
    }
  });

  // Modal Submit Button Hover/Click
  const submitBtn = document.querySelector(".submit-order-btn");
  if (submitBtn) {
    submitBtn.addEventListener("mouseenter", () => {
      gsap.to(submitBtn, {
        scale: 1.04,
        backgroundColor: "#f3be4c",
        boxShadow: "0 8px 20px rgba(236, 173, 41, 0.3)",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    submitBtn.addEventListener("mouseleave", () => {
      gsap.to(submitBtn, {
        scale: 1,
        backgroundColor: "#ecad29",
        boxShadow: "none",
        duration: 0.3,
        ease: "power2.out"
      });
    });
    
    submitBtn.addEventListener("mousedown", () => {
      gsap.to(submitBtn, { scale: 0.98, duration: 0.1 });
    });
    
    submitBtn.addEventListener("mouseup", () => {
      gsap.to(submitBtn, { scale: 1.04, duration: 0.2, ease: "back.out(2)" });
    });
  }

  // Fulfillment method toggle
  const fulfillmentSelect = document.getElementById("fulfillment-method");
  if (fulfillmentSelect) {
    fulfillmentSelect.addEventListener("change", (e) => {
      const addressGroup = document.getElementById("delivery-address-group");
      const addressInput = document.getElementById("delivery-address");
      if (addressGroup && addressInput) {
        if (e.target.value === "delivery") {
          addressGroup.style.display = "block";
          addressInput.required = true;
          addressInput.focus();
        } else {
          addressGroup.style.display = "none";
          addressInput.required = false;
          addressInput.value = "";
        }
      }
    });
  }

  document.querySelector(".close-modal").addEventListener("click", closeOrderModal);
  
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeOrderModal();
    }
  });
  
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault();
    orderForm.style.display = "none";
    orderSuccess.style.display = "block";
    
    if (isCartCheckout) {
      const itemsSummaryList = cart.map(item => `${item.quantity}x ${item.title}`).join(", ");
      showToast(`Order request submitted for: ${itemsSummaryList}!`);
      
      // Clear the cart
      cart = [];
      updateCartBadge();
      renderCart();
    } else {
      const breedName = data[order[0]].title + data[order[0]].title2;
      showToast(`Order request submitted for ${breedName}!`);
    }
  });
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
    setupEvents();
    setupSwipeEvents();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

start();
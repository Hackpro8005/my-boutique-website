let cart = [];
let totalPrice = 0;
let stripe, elements, card;

function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    totalPrice += productPrice;
    updateCartUI();
}

function updateCartUI() {
    const cartItemsList = document.getElementById('cart-items');
    cartItemsList.innerHTML = ''; 
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - $${item.price}`;
        cartItemsList.appendChild(listItem);
    });
    document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    showCart();
}

function showCart() {
    document.getElementById('cart-popup').style.display = 'flex';
}

function closeCart() {
    document.getElementById('cart-popup').style.display = 'none';
}

function showCheckout() {
    document.getElementById('checkout-popup').style.display = 'flex';
    initStripe();
}

function closeCheckout() {
    document.getElementById('checkout-popup').style.display = 'none';
}

function initStripe() {
    stripe = Stripe('your-public-key'); // Replace with your Stripe public key
    elements = stripe.elements();
    card = elements.create('card');
    card.mount('#card-element');
}

document.getElementById('checkout-form').addEventListener('submit', async function (event) {
    event.preventDefault();
    const { token, error } = await stripe.createToken(card);
    
    if (error) {
        alert(error.message);
    } else {
        processPayment(token);
    }
});

function processPayment(token) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    alert(`Payment Successful!\n\nName: ${name}\nEmail: ${email}\nAddress: ${address}\nAmount: $${totalPrice.toFixed(2)}`);

    cart = [];
    totalPrice = 0;
    updateCartUI();
    closeCheckout();
}

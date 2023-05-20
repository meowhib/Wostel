const currency = document.getElementById('currency');
const price = document.getElementById('price');
const arrivalDate = document.getElementById('arrivalDate');
const departureDate = document.getElementById('departureDate');

const totalPrice = document.getElementById('total-price');

function calculatePrice(){
  const arrivalDate = new Date(document.getElementById('arrivalDate').value);
  const departureDate = new Date(document.getElementById('departureDate').value);
  const duration = (departureDate - arrivalDate) / (1000 * 3600 * 24);
  const price = document.getElementById('price').value;

  if (duration <= 0 || price <= 0 || isNaN(duration) || isNaN(price)) {
    return 0;
  } else {
    return duration * price;
  }
}

currency.addEventListener('change', (e) => {
  const currency = document.getElementById('currency').value;
  const currencies = {
    USD: '$',
    EUR: '€',
    TND: 'TND',
  };

  if (currency == 'TND') {
    totalPrice.innerHTML = `${calculatePrice()} ${currencies[currency]}`;
  } else {
    totalPrice.innerHTML = `${currencies[currency]} ${calculatePrice()}`;
  }
});

price.addEventListener('input', (e) => {
  const currency = document.getElementById('currency').value;

  const currencies = {
    USD: '$',
    EUR: '€',
    TND: 'TND',
  };

  if (currency == 'TND') {
    totalPrice.innerHTML = `${calculatePrice()} ${currencies[currency]}`;
  } else {
    totalPrice.innerHTML = `${currencies[currency]} ${calculatePrice()}`;
  }
});

arrivalDate.addEventListener('changeDate', (e) => {
  const currency = document.getElementById('currency').value;
  const arrivalDate = document.getElementById('arrivalDate');
  const departureDate = document.getElementById('departureDate');

  console.log("Heyy")

  const currencies = {
    USD: '$',
    EUR: '€',
    TND: 'TND',
  };

  if (currency == 'TND') {
    totalPrice.innerHTML = `${calculatePrice()} ${currencies[currency]}`;
  } else {
    totalPrice.innerHTML = `${currencies[currency]} ${calculatePrice()}`;
  }
});

departureDate.addEventListener('changeDate', (e) => {
  const currency = document.getElementById('currency').value;

  console.log("Hello departure date")

  const currencies = {
    USD: '$',
    EUR: '€',
    TND: 'TND',
  };

  if (currency == 'TND') {
    totalPrice.innerHTML = `${calculatePrice()} ${currencies[currency]}`;
  } else {
    totalPrice.innerHTML = `${currencies[currency]} ${calculatePrice()}`;
  }
});
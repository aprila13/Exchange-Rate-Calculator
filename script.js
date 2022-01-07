//HTML Elements
const currencyEl_one = document.getElementById('currency-one'); //select option
const amountEl_one = document.getElementById('amount-one'); //input
const currencyEl_two = document.getElementById('currency-two'); //select option
const amountEl_two = document.getElementById('amount-two'); //input
const rateEl = document.getElementById('rate'); //empty div
const swap = document.getElementById('swap'); //btn

//Fetch exchange rate and update DOM
function calculate() {
  const currency_one = currencyEl_one.value;  //USD
  const currency_two = currencyEl_two.value; //EUR


  fetch(`https://v6.exchangerate-api.com/v6/7ae582e05edefdbdba6c148d/latest/${currency_one}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);

      const rate = data.conversion_rates[currency_two];
      // console.log(rate)

      rateEl.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
};

//Event listeners
//input event listener runs when something is typed into input or arrows used
currencyEl_one.addEventListener('change', calculate);
amountEl_one.addEventListener('input', calculate);
currencyEl_two.addEventListener('change', calculate);
amountEl_two.addEventListener('input', calculate);


swap.addEventListener('click', () => {
  const temp = currencyEl_one.value;
  currencyEl_one.value = currencyEl_two.value;
  currencyEl_two.value = temp;
  calculate();
})

calculate();


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const location = search.value;
  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';
  fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.err) {
        messageTwo.textContent = data.err;
      } else {
        const { location, forecast } = data;
        const { summary, temperature, precipProbability } = forecast;
        messageOne.textContent = location;
        messageTwo.textContent = `${summary} It's currently ${temperature} degrees with a ${precipProbability *
          100}% chance of rain.`;
      }
    });
  });
});

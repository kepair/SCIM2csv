const got = require('got');

(async () => {
  try {
    const response = await got('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true });
    console.log(response.body.url);
    console.log(response.body.explanation);
  } catch (error) {
    console.log(error.response.body);
  }
})();
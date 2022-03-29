const fs = require('fs');
const sass = require('sass');

const result = sass.compile('./src/css/main.scss');

fs.writeFile('./app.css', result.css, (err) => {
    if (err) throw err;
    console.log('Assets compiled');
});
const express = require('express');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8080;

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/troc-angular/browser'));
console.log(__dirname + '/dist/troc-angular/browser');

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname + '/dist/troc-angular/browser/index.html'));
});

// Start the app by listening on the default Heroku port or 3000 for local development
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

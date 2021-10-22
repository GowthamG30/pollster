const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const path = require("path");
const cors = require('cors');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// app.use(express.static(path.join(__dirname,'frontend\\build')));

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,'frontend\\build','index.html'));
// });

// app.get('/polls', (req, res) => {
//   console.log("yeayy");
//   // res.sendFile(path.join(__dirname,'frontend\\build','index.html'));
// });

// server.listen(port, () => {
//   console.log('listening on ' + port);
// });

app.listen(port, () => {
  console.log('listening on ' + port);
});
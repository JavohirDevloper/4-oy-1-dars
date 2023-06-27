const express = require('express');
const config = require('./shared/config');
const userRoute = require('./modules/users/api');

const app = express();

app.use(express.json());

app.use(userRoute);

app.listen(config.port, () => {
  console.log(`Server ${config.port}-portda ishlayapti.`);
});

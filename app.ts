const express = require('express');
import router from './src/routes/index';

const app = express();
const port = 3000;

app.use(express.json());
app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
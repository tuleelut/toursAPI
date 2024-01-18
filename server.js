//viskas, kas susiję su serveriu yra viename faile
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const app = require('./app');


// console.log(process.env);
const port = process.env.PORT || 3000;
const dbURI = process.env.DATABASE_URL;

//jungiamės prie duomenų bazės
async function main() {
  await mongoose.connect(dbURI);
  console.log('Database connected');
}
main().catch((err) => console.log(err));

// start server
app.listen(port, () => {
  console.log(`Server started on port ${port} and listening requests`);
});

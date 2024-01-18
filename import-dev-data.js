//scriptas, importuojantis duomenis iš json failo į duomenų bazę, jis yra nepriklausomas nuo mūsų aplikacijos
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const Tour = require('./models/tourModel');

// console.log(process.env);
const dbURI = process.env.DATABASE_URL;

//jungiamės prie duomenų bazės
async function main() {
  await mongoose.connect(dbURI);
  console.log('Database connected');
}
main().catch((err) => console.log(err));

//read JSON file
const tours = fs.readFileSync('./dev-data/tours-simple.json', 'utf-8');

//import data to database
const importData = async () => {
  try {
    //metodas create gali priimti vieną objektą ir įrašyti į DB arba visą masyvą
    await Tour.create(JSON.parse(tours));
    console.log('Data successfully loaded');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//Delete all data from database
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted');
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

//process.argv yra objektas - masyvas, kuris parodo
// console.log(process.argv);
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

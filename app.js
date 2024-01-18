//viskas, kas susiję su express yra viename faile, šis failas labiau yra skirtas middlewares, kurios prieinamos visiems requests

const express = require("express");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// create server
const app = express();

// Middleware, that only parses json and only looks at requests where the Content-Type header matches the type option.
app.use(express.json());

// //our custom middlewares, working for any request
// app.use((req, res, next) => {
//   console.log('Hello from the middleware for any route');

//   //jei nerarašysime next(), request response cycle sustos ir mes neprieisime prie router handlerio ir response neišsisiųs
//   next();
// });

//we add request time on every request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// ROUTES
//naudojame tourRouter, procesas vadinasi "mounting the router"
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);
module.exports = app;

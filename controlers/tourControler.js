// importuojame Mongoose modulį
const Tour = require("../models/tourModel");

// 1. get all tours with or without query params
exports.getAllTours = async (req, res) => {
  // console.log(req.query);

  try {
    const queryObj = { ...req.query };

    //remove fields from query
    const excludedFields = ["page", "sort", "limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    // put $gt, $gte, $lt, $lte
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    // build query
    console.log(queryStr);
    let query = Tour.find(JSON.parse(queryStr));
    // {difficulty: "easy", duration: {$gte: 5}}

    // sort implementation
    if (req.query.sort) {
      // single parameter
      // query = query.sort(req.query.sort);

      // multiple sort parameters we need : query = query.sort('price ratingsAverage difficulty') ;
      // remove ,
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // pagination
    // postman query: 127.0.0.1:3000/api/v1/tours/?page=2&limit=5
    // 1-10 page1; 11-20 page2; 21-30 page3
    //skip(10) page2; skip(20) page3 ...
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 10;
    const skipValue = (page - 1) * limit;

    query = query.skip(skipValue).limit(limit);

    //write what hapens if user selects not existing page
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skipValue >= numTours) throw new Error("This page does not exist");
    }

    // execute query
    const tours = await query;

    res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 2. get tour by id
exports.getTour = async (req, res) => {
  // console.log(req.params);
  try {
    const { id } = req.params;

    const ftour = await Tour.findById(id);
    //tas pats: Tour.findOne({_id: id});

    res.status(200).json({
      status: "success",
      data: {
        tour: ftour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 3. post tour
exports.createTour = async (req, res) => {
  // console.log(req.body);
  // const newTour = new Tour(req.body);
  // newTour.save();

  // grąžina promiss
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: "success",
      data: { tour: newTour },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 4. update tour, method patch, užklausa turi body it id
exports.updateTour = async (req, res) => {
  try {
    //request body nurodo į ką keičiame, kadangi metodas patch, tai body atsineša ne visą objektą, o tik keičiamus laukus
    const newTour = req.body;
    const { id } = req.params;
    const updatedTour = await Tour.findByIdAndUpdate(id, newTour, {
      //kad grąžintų atnaujintą dokumentą
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: { tour: updatedTour },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// 5. delete tour, klientui nesiunčiame jokių duomenų response
exports.deleteTour = async (req, res) => {
  try {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

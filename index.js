const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const port = process.env.port || 5000;

// routers

const bannerRouter = require("./routes/bannerRoutes");
const contactRouter = require("./routes/contactRoutes");
const impactSection = require("./routes/impactSectionRoute");
const impacts = require("./routes/impactsRoute");
const logoRouter = require("./routes/logoRoutes");
const clientBannerRouter = require("./routes/clientBannerRoutes");
const clients = require("./routes/clientsRoute");
const aboutRouter = require("./routes/aboutRoutes");
const productRouter = require("./routes/productRoutes");
const careerBannerRouter = require("./routes/careerBannerRoutes");
const careerFormRouter = require("./routes/careerFormRoutes");
const newsEventRouter = require("./routes/newsEventRoute");

const categoryRouter = require("./routes/categoriesRoutes");
const subCategoryRouter = require("./routes/subCategoriesRoute");
const subSubCategoryRouter = require("./routes/subSubCategoriesRoute");
const newsCategoryRouter = require("./routes/newsCategoriesRoute");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// Connect Database
mongoose.connect(process.env.DB_URL).then(() => {
  console.log("Database connection is successful");
});

app.use("/banner", bannerRouter);
app.use("/about", aboutRouter);
app.use("/impactSection", impactSection);
app.use("/impacts", impacts);
app.use("/logo", logoRouter);
app.use("/clientBanner", clientBannerRouter);
app.use("/clients", clients);
app.use("/contact", contactRouter);
app.use("/product", productRouter);
app.use("/careerBanners", careerBannerRouter);
app.use("/careerForms", careerFormRouter);
app.use("/news-events", newsEventRouter);

app.use("/category", categoryRouter);
app.use("/sub-category", subCategoryRouter);
app.use("/sub-sub-category", subSubCategoryRouter);
app.use("/news-category", newsCategoryRouter);

app.get("/", (req, res) => {
  res.send(`Server is Running on port ${port}`);
});

app.listen(port, () => {
  console.log(`Server is Running on port ${port}`);
});

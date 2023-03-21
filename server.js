var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const methodOverride = require('method-override');
const logger = require("../logger/logger-index");
const SDC = require('statsd-client');
app.use(bodyParser.json());

const userRoutes = require('./api-routes/userRoutes');
const productRoutes = require('./api-routes/productRoutes');

const db = require('./config/dbSetup');
db.user.hasMany(db.product, {foreignKey: "owner_user_id"});
db.product.hasMany(db.image, {foreignKey: "product_id"});
db.sequelize.sync({force: false})
  .then(() => console.log("Database setup complete."))
  .catch((err) => console.log("Database setup failed.", err))

app.get('/healthz',function(req, res) {
  logger.info("/health running fine");
  sdc.timing('health.timeout', start);
    res.status(200).send(); 
    sdc.increment('endpoint.health');
});

app.use('/v1/user',userRoutes);
app.use('/v1/product',productRoutes);

app.use(methodOverride())
app.use((err, req, res, next) => {
  return res.status(400).json({message: "Bad Request"});
})

module.exports = app;
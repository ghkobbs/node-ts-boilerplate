import express from 'express'
import { db } from '../Config/db.config'
import MongoStore from 'connect-mongo';
import indexRouter from '../Routes/index.route';
import session from 'express-session';
import methodOverride from 'method-override';
import path from 'path';
import formatMoney from '../Utils/formatMoney';

const app = express()

//middlewares
app.locals.moment = require("moment");
app.use(
  session({
    secret: "keyboard cat",
    store: MongoStore.create({
      mongoUrl: process.env.DATABASE_URL as string,
			touchAfter: 24 * 3600,
		}),
    resave: true,
    saveUninitialized: true,
  })
);

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true })); //set key=value pair
app.use(express.static(path.join(__dirname, "Assets"))); // Allow to serve static filesapp.use(flash());
app.use(async function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  res.locals.formatMoney = formatMoney;
  return next();
});

app.set("view engine", "pug");
app.set("views", "../Views");
app.enable("trust proxy");

//routes
app.use('/', indexRouter)

//db connection then server connection
db.then(() => {
	app.listen(9000, () => console.log('Server is listening on port 9000	'))
})

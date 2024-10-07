import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//accept the request from... (Here we accept the request from everywhere)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
//This middleware parses JSON payloads(data) in the request body and makes them available under req.body, 16kb is max limit of payloads if it exceeds this limit then server will reject the request
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//When forms are submitted using application/x-www-form-urlencoded (which is the default for HTML forms), this middleware is used to parse the data. "extended: true" allows for rich objects and arrays to be encoded into the URL-encoded format.
app.use(express.static("public"));
//If your server has any static assets (like HTML files, images, CSS, or JavaScript files), this middleware serves them directly to the client. It allows you to serve files in the public folder at the root of your server’s URL, without needing to create separate routes. If there’s a file public/style.css, it will be accessible at http://localhost:8000/style.css.
app.use(cookieParser());
//This middleware makes it easy to read cookies sent by the client and access them through req.cookies. It can be useful when dealing with things like authentication tokens or session management, where the server needs to check or manipulate cookies.

//routes import
import userRouter from "./routes/user.route.js";

//routes declaration

app.use("/api/v1/users", userRouter);
//http://localhost:8000/api/v1/user/register

export { app };

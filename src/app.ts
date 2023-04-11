import express, { Application } from "express";
import { startDatabase } from "./database";
import { createMovies, deleteMovies, listMovies, retrieveMovies, updateMovies } from "./logic";
import { ensureMoviesExistsMiddleware, ensureListmovieNameExist } from "./middlewares";

const app: Application = express();
app.use(express.json())

app.post("/movies",ensureListmovieNameExist, createMovies);
app.get("/movies", listMovies);
app.get("/movies/:id", ensureMoviesExistsMiddleware, retrieveMovies);
app.patch("/movies/:id",ensureMoviesExistsMiddleware,ensureListmovieNameExist, updateMovies);
app.delete("/movies/:id",ensureListmovieNameExist, ensureMoviesExistsMiddleware, deleteMovies);

app.listen(3000,async () => {
  await startDatabase() 
  console.log(`Server is running`);
});

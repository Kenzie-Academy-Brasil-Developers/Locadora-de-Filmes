import { Request, Response } from "express";
import { client } from "./database";
import { QueryConfig, QueryResult } from "pg";
import { Tmovies, TmoviesRequest } from "./interfaces";
import format from "pg-format";

const createMovies = async (req: Request, res: Response): Promise<Response> => {
  const moviesData: TmoviesRequest = req.body;
  const checkMovieExists = await client.query(
    `SELECT * FROM movies WHERE name = $1`,
    [moviesData.name]
  );

  const queryString: string = format(
    `
       INSERT INTO movies(%I)
       VALUES (%L)
       RETURNING *;
    `,
    Object.keys(moviesData),
    Object.values(moviesData)
  );
  const queryResult: QueryResult<Tmovies> = await client.query(queryString);
  return res.status(201).json(queryResult.rows[0]);
};

const listMovies = async (req: Request, res: Response): Promise<Response> => {
  const category: any = req.query.category;
  let queryString: string = "";
  let queryResult: QueryResult;
  if (category) {
    queryString = `
    SELECT * FROM movies
    WHERE category = $1;
    `;
    const queryConfig: QueryConfig = {
      text: queryString,
      values: [category],
    };
    queryResult = await client.query(queryConfig);
  } else {
    queryString = `
    SELECT * FROM movies;
    `;
    queryResult = await client.query(queryString);
  }
  return res.json(queryResult.rows);
};

const retrieveMovies = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const movies: Tmovies = res.locals.movies;
  return res.json(movies);
};

const updateMovies = async (req: Request, res: Response): Promise<Response> => {
  const moviesData: Partial<Tmovies> = req.body;
  const id: number = parseInt(req.params.id);
  const queryString: string = format(
    `
    UPDATE movies 
    SET(%I) = ROW(%L)
    WHERE id = $1
    RETURNING *;
    `,
    Object.keys(moviesData),
    Object.values(moviesData)
  );
  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  const queryResult: QueryResult<Tmovies> = await client.query(QueryConfig);
  return res.json(queryResult.rows[0]);
};

const deleteMovies = async (req: Request, res: Response): Promise<Response> => {
  const id: number = parseInt(req.params.id);
  const queryString: string = `
  DELETE FROM movies
  WHERE id = $1;
  `;
  const QueryConfig: QueryConfig = {
    text: queryString,
    values: [id],
  };
  await client.query(QueryConfig);
  return res.status(204).send();
};

export { createMovies, listMovies, retrieveMovies, updateMovies, deleteMovies };

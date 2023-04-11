import { NextFunction } from "express";
import { QueryConfig, QueryResult } from "pg";
import { client } from "./database";
import { Tmovies } from "./interfaces";
import { Request, Response } from "express";

const ensureMoviesExistsMiddleware = async (
    req: Request, res: Response, next: NextFunction): Promise<Response | void> =>{
        const id: number = parseInt(req.params.id)
        const queryString: string = `
        SELECT * FROM movies WHERE id = $1;
        `
        const queryConfig: QueryConfig = {
          text: queryString,
          values: [id],
        }
        const queryResult: QueryResult<Tmovies> = await client.query(queryConfig)
        if(queryResult.rowCount === 0){
            return res.status(404).json({
                error:"Movie not found!"
            })
        }
        res.locals.movies = queryResult.rows[0]

        return next()
    }

    const ensureListmovieNameExist = async (
        req: Request, res: Response, next: NextFunction): Promise<Response | void> =>{
            const name = req.body.name
            const queryString = `
            SELECT * FROM movies WHERE name = $1;
            `
            const queryConfig: QueryConfig = {
            text: queryString,
            values: [name],
        }
        const queryResult: QueryResult<Tmovies> = await client.query(queryConfig)
        const query = queryResult.rows
        if(query.length !== 0){
            return res.status(409).json({ error: "Movie name already exists!" })
        }
        return next()
    }

export { ensureMoviesExistsMiddleware, ensureListmovieNameExist }
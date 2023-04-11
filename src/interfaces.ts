type Tmovies = {
    id: number;
    name: string;
    category: string;
    duration: number;
    price: number;
  }

type TmoviesRequest = Omit<Tmovies, "id">;

export { Tmovies, TmoviesRequest }
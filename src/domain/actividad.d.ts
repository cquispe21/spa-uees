export type PokemonListItem = { name: string; url: string };

export type PokemonApiResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      ["official-artwork"]?: { front_default: string | null };
    };
  };
  types: { type: { name: string } }[];
};

export type PokemonViewModel = {
  id: number;
  name: string;
  height: number;
  weight: number;
  imageUrl: string | null;
  types: string[];
};

export type FormValues = {
  query: string;
};


export interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}



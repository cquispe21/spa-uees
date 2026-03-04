import React, { createContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { PokemonApiResponse, PokemonListItem, PokemonResponse, PokemonViewModel } from "../../domain/actividad";

export interface IActividad1Context {
  loading: boolean;
  statusText: string;
  error: string;
  result: PokemonViewModel | null;
  allPokemon: PokemonListItem[];
  listReady: boolean;
  isOpen: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setStatusText: React.Dispatch<React.SetStateAction<string>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  setResult: React.Dispatch<React.SetStateAction<PokemonViewModel | null>>;
  setAllPokemon: React.Dispatch<React.SetStateAction<PokemonListItem[]>>;
  setListReady: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  fetchPokemonByNameOrId: (nameOrId: string) => Promise<PokemonViewModel>;
}

const Actividad1Context = createContext({});

export const Actividad1Provider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState<PokemonViewModel | null>(null);

  const [allPokemon, setAllPokemon] = useState<PokemonListItem[]>([]);
  const [listReady, setListReady] = useState(false);

  const [isOpen, setIsOpen] = useState(false);


  const APIURL = import.meta.env.VITE_API_URL

  const containerRef = useRef<HTMLDivElement | null>(null);

  async function loadList(

  ) {
    try {
      setListReady(false);
      const res = await fetch(
        APIURL,
      );
      const data: PokemonResponse = await res.json();
      setAllPokemon(data.results);

    } catch (e) {

      setError(e instanceof Error ? e.message : "Error cargando lista.");
      setListReady(false);

    }
  }

    async function fetchPokemonByNameOrId(
      nameOrId: string,
    ): Promise<PokemonViewModel> {
      const key = nameOrId.trim().toLowerCase();
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${key}`);
      if (!res.ok)
        throw new Error("No encontrado. Prueba con otro nombre o número.");
  
      const data = (await res.json()) as PokemonApiResponse;
      const official =
        data.sprites.other?.["official-artwork"]?.front_default ?? null;
  
      return {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        imageUrl: official ?? data.sprites.front_default ?? null,
        types: data.types.map((t) => t.type.name),
      };
    }
















  useEffect(() => {
    loadList();
  }, []);
  const storage: IActividad1Context = {
    loading,
    fetchPokemonByNameOrId,
    statusText,
    error,
    result,
    allPokemon,
    listReady,
    isOpen,
    setAllPokemon,
    setListReady,
    setIsOpen,
    setLoading,
    setStatusText,
    setError,
    setResult,
    containerRef
  };

  return (
    <Actividad1Context.Provider value={storage}>
      {children}
    </Actividad1Context.Provider>
  );
};

export default Actividad1Context;

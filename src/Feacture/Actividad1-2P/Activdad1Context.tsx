import React, { createContext, useState, type ReactNode } from "react";
import type { PokemonListItem, PokemonViewModel } from "../../domain/actividad";

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
  






  
  const storage: IActividad1Context = {
   

  loading,
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

  };

  return (
    <Actividad1Context.Provider value={storage}>{children}</Actividad1Context.Provider>
  );
};

export default Actividad1Context;
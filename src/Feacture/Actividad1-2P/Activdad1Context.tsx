import React, {
  createContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { PokemonListItem, PokemonViewModel } from "../../domain/actividad";
import PokemonService from "../../services/PokemonService";

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
  fetchPokemonByNameOrId: (nameOrId: string) => Promise<PokemonViewModel>;
  SearchPokemonName: (name: string) => Promise<void>;
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


  const { fetchPokemonByNameOrId, loadList } = PokemonService();



  async function PokemonListAsync() {
    try {
      setListReady(false);
      const res = await loadList();
      setAllPokemon(res);
      setListReady(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error cargando lista.");
      setListReady(false);
    }
  }



 async function SearchPokemonName(name: string) {
    setIsOpen(false);
    setError("");
    setResult(null);

    setLoading(true);
    setStatusText(`Buscando información de "${name}"...`);

    try {
      const pokemon = await fetchPokemonByNameOrId(name);
      setResult(pokemon);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setLoading(false);
      setStatusText("");
    }
  }


  useEffect(() => {
    PokemonListAsync();
  }, []);



  
  const storage: IActividad1Context = {
    loading,
    SearchPokemonName,
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
  };

  return (
    <Actividad1Context.Provider value={storage}>
      {children}
    </Actividad1Context.Provider>
  );
};

export default Actividad1Context;

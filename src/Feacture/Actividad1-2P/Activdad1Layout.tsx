import { useContext, useEffect, useMemo, useRef } from "react";
import Actividad1Context, { type IActividad1Context } from "./Activdad1Context";
import { useForm } from "react-hook-form";
import type { FormValues, PokemonApiResponse, PokemonListItem, PokemonViewModel } from "../../domain/actividad";
import ResultSearchApi from "./Components/ResultSearchApi";
function toTitleCase(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s;
}
export default function Activdad1Layout() {
  const {
    loading,
    statusText,
    error,
    result,
    allPokemon,
    listReady,
    isOpen,
    setLoading,
    setStatusText,
    setError,
    setResult,
    setAllPokemon,
    setListReady,
    setIsOpen,
  } = useContext(Actividad1Context) as IActividad1Context;

  const containerRef = useRef<HTMLDivElement | null>(null);

  const { register, handleSubmit, watch, reset, setValue } =
    useForm<FormValues>({
      defaultValues: { query: "" },
    });

  const query = watch("query") ?? "";

  useEffect(() => {
    let cancelled = false;

    async function loadList() {
      try {
        setListReady(false);
        const res = await fetch(
          "https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0",
        );
        if (!res.ok) throw new Error("No se pudo cargar la lista de Pokémon.");
        const data = (await res.json()) as { results: PokemonListItem[] };

        if (!cancelled) {
          setAllPokemon(data.results ?? []);
          setListReady(true);
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : "Error cargando lista.");
          setListReady(false);
        }
      }
    }

    loadList();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    function onDocMouseDown(e: MouseEvent) {
      const target = e.target as Node;
      if (containerRef.current && !containerRef.current.contains(target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocMouseDown);
    return () => document.removeEventListener("mousedown", onDocMouseDown);
  }, []);

  const trimmed = useMemo(() => query.trim(), [query]);
  const normalized = useMemo(() => trimmed.toLowerCase(), [trimmed]);

  const suggestions = useMemo(() => {
    if (!normalized || !listReady) return [];
    const matches = allPokemon.filter((p) => p.name.includes(normalized));
    return matches.slice(0, 8);
  }, [normalized, listReady, allPokemon]);

  useEffect(() => {
    if (!normalized || suggestions.length === 0) {
      setIsOpen(false);
      return;
    }
    setIsOpen(true);
  }, [normalized, suggestions.length]);

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

  const onSubmit = async (values: FormValues) => {
    setError("");
    setResult(null);

    const q = (values.query ?? "").trim();
    if (!q) {
      setError("Escribe un nombre o número.");
      return;
    }

    setIsOpen(false);
    setLoading(true);
    setStatusText(`Buscando información de "${q}"...`);

    try {
      const pokemon = await fetchPokemonByNameOrId(q);
      setResult(pokemon);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setLoading(false);
      setStatusText("");
    }
  };

  function clearAll() {
    reset({ query: "" });
    setError("");
    setResult(null);
    setStatusText("");
    setLoading(false);
    setIsOpen(false);
  }

  async function pickSuggestion(name: string) {
    setIsOpen(false);
    setValue("query", name, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: false,
    });
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

  const showMainUi = !loading;

  return (
    <div className="mx-auto max-w-3xl p-4 font-sans">
      <h1 className="text-3xl font-semibold">Actividad 1 - 2P</h1>
      <p className="text-2xl ">
        Sistema de búsqueda de Pokémon API, con comportamiento async y
        comportamientos UI
      </p>

      {loading && (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-2 font-semibold text-gray-900">{statusText}</div>
          <div className="flex items-center gap-2 text-gray-700">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-400 border-t-transparent" />
            <span className="text-sm">Cargando data...</span>
          </div>
        </div>
      )}

      {showMainUi && (
        <>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex items-start gap-3"
          >
            <div ref={containerRef} className="relative flex-1">
              <input
                type="text"
                placeholder={
                  listReady
                    ? "Ej: pikachu o 25"
                    : "Cargando lista... (puedes buscar igual)"
                }
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-base outline-none focus:border-gray-900"
                {...register("query", {
                  onChange: () => setIsOpen(true),
                })}
                onFocus={() => {
                  if (normalized && suggestions.length > 0) setIsOpen(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Escape") setIsOpen(false);
                }}
              />

              {listReady && isOpen && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-[calc(100%+0.375rem)] z-10 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
                  {suggestions.map((s) => (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => pickSuggestion(s.name)}
                      className="w-full dark:text-black px-4 py-2 text-left text-sm hover:bg-gray-50"
                    >
                      {toTitleCase(s.name)}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              className="rounded-xl border border-gray-900 bg-gray-900 px-4 py-3 text-sm font-semibold text-white hover:bg-black"
            >
              Buscar
            </button>

            <button
              type="button"
              onClick={clearAll}
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Limpiar
            </button>
          </form>

          {!listReady && (
            <div className="mt-3 text-sm text-gray-600">
              Tip: mientras carga la lista, igual puedes buscar exacto por
              nombre/id (ej: <span className="font-semibold">pikachu</span>).
            </div>
          )}

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          {result && (
           <ResultSearchApi/>
          )}
        </>
      )}
    </div>
  );
}

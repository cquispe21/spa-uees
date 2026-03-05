import { useContext, useEffect,  useState } from "react";
import Actividad1Context, { type IActividad1Context } from "./Activdad1Context";
import { useForm } from "react-hook-form";
import Select from "react-select";

import type {
  FormValues,

} from "../../domain/actividad";
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
    setLoading,
    setStatusText,
    setError,
    setResult,
    setIsOpen,
    fetchPokemonByNameOrId,
    SearchPokemonName,
  } = useContext(Actividad1Context) as IActividad1Context;

  const { handleSubmit, reset} = useForm<FormValues>({
    defaultValues: { query: "" },
  });

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
    setSelectedPokemon(null);
  }



  const showMainUi = !loading;

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)",
    );
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e: any) => {
      setIsDarkMode(e.matches);
    };

    darkModeMediaQuery.addEventListener("change", handleChange);
    return () => darkModeMediaQuery.removeEventListener("change", handleChange);
  }, []);
  const [search, setSearch] = useState("");

  const [selectedPokemon, setSelectedPokemon] = useState(
    null as { value: string; label: string } | null,
  );

  const normalized = search.trim().toLowerCase();

  const options = allPokemon
    .filter((p) => p.name.toLowerCase().includes(normalized))
    .slice(0, 8)
    .map((p) => ({
      value: p.name,
      label: toTitleCase(p.name),
    }));

  return (
    <div className="mx-auto max-w-3xl p-4 font-sans">
      <h1 className="text-3xl font-semibold">Actividad 1 - 2P</h1>
      <p className="text-2xl ">
        Sistema de búsqueda de Pokémon API
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
            <div className="relative flex-1">
              <Select
                options={options}
                value={selectedPokemon}
                inputValue={search}
                placeholder="Escribe el nombre  de un Pokémon..."
                onInputChange={(value) => setSearch(value)}
                onChange={(option) => {
                  setSelectedPokemon(option);
                  if (option) SearchPokemonName(option.value);
                }}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: isDarkMode
                      ? state.isFocused
                        ? "#374151"
                        : "#1f2937"
                      : state.isFocused
                        ? "#f0f0f0"
                        : "#fff",
                    borderColor: isDarkMode
                      ? state.isFocused
                        ? "#6b7280"
                        : "#4b5563"
                      : state.isFocused
                        ? "#ccc"
                        : "#ddd",
                    color: isDarkMode ? "white" : "black",
                    textTransform: "uppercase",
                  }),
                  menu: (baseStyles) => ({
                    ...baseStyles,
                    backgroundColor: isDarkMode ? "#1f2937" : "#fff",
                    color: isDarkMode ? "white" : "black",
                  }),
                  option: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: isDarkMode
                      ? state.isSelected
                        ? "#4b5563"
                        : state.isFocused
                          ? "#6b7280"
                          : "#1f2937"
                      : state.isSelected
                        ? "#e0e0e0"
                        : state.isFocused
                          ? "#f0f0f0"
                          : "#fff",
                    color: isDarkMode ? "white" : "black",
                  }),
                  singleValue: (baseStyles) => ({
                    ...baseStyles,
                    color: isDarkMode ? "white" : "black",
                  }),
                  input: (baseStyles) => ({
                    ...baseStyles,
                    color: isDarkMode ? "white" : "black", // Aquí agregamos el color del texto en el input
                  }),
                }}
              />
            </div>

            <button
              type="button"
              onClick={clearAll}
              className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-900 hover:bg-gray-50"
            >
              Limpiar
            </button>
          </form>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}

          {result && <ResultSearchApi />}
        </>
      )}
    </div>
  );
}

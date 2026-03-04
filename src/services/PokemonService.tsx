import type {
  PokemonApiResponse,
  PokemonResponse,
  PokemonViewModel,
} from "../domain/actividad";

export default function PokemonService() {
  const APIURL = import.meta.env.VITE_API_URL;

  async function loadList() {
    try {
      const res = await fetch(APIURL + "?limit=2000&offset=0");
      const data: PokemonResponse = await res.json();
      return data.results;
    } catch (e) {
      throw new Error(
        "Error al cargar la lista de Pokémon." +
          (e instanceof Error ? e.message : ""),
      );
    }
  } 

  async function fetchPokemonByNameOrId(
    nameOrId: string,
  ): Promise<PokemonViewModel> {
    const key = nameOrId.trim().toLowerCase();
    const res = await fetch(`${APIURL}/${key}`);
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

  return {
    fetchPokemonByNameOrId,
    loadList,
  };
}

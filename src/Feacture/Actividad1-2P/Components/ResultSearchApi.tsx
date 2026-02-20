import { useContext } from "react";
import Actividad1Context, { type IActividad1Context } from "../Activdad1Context";
function toTitleCase(s: string) {
  return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : s;
}
export default function ResultSearchApi() {
     const {
   
    result,

  } = useContext(Actividad1Context) as IActividad1Context;
  return (
     <div className="mt-5 flex gap-4 rounded-2xl border border-gray-200 bg-white p-4">
              <div className="grid h-36 w-36 place-items-center rounded-2xl border border-gray-100 bg-gray-50">
                {result!.imageUrl ? (
                  <img
                    src={result!.imageUrl}
                    alt={result!.name}
                    className="max-h-[90%] max-w-[90%]"
                  />
                ) : (
                  <span className="text-sm text-gray-500">Sin imagen</span>
                )}
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {toTitleCase(result!.name)}{" "}
                  <span className="font-normal text-gray-500">
                    #{result!.id}
                  </span>
                </h3>

                <div className="mt-2 flex flex-wrap gap-2">
                  {result!.types.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs text-gray-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-3 text-sm text-gray-700">
                  <div>
                    Altura:{" "}
                    <span className="font-semibold">{result!.height}</span>{" "}
                    (decímetros)
                  </div>
                  <div>
                    Peso: <span className="font-semibold">{result!.weight}</span>{" "}
                    (hectogramos)
                  </div>
                </div>
              </div>
            </div>
  );
}
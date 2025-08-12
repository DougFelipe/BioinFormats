import React from "react";
import { useSearchParams } from "react-router-dom";
import glossaryJSON from "../data/glossary.json";
import type { GlossaryTerm } from "../types";
import { searchGlossary, highlightMatch } from "../utils/searchUtils";
import GlossaryListItem from "../components/GlossaryListItem";
import SearchBar from "../components/SearchBar";

const glossary = glossaryJSON as GlossaryTerm[];

const norm = (s: string) =>
  (s ?? "")
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

export default function Glossary() {
  const [params, setParams] = useSearchParams();

  const [query, setQuery] = React.useState(params.get("q") ?? "");
  const [selectedLetter, setSelectedLetter] = React.useState<string | null>(
    params.get("letter") ? params.get("letter")!.toUpperCase() : null
  );

  React.useEffect(() => {
    const next: Record<string, string> = {};
    if (query) next.q = query;
    if (selectedLetter) next.letter = selectedLetter;
    setParams(next, { replace: true });
  }, [query, selectedLetter, setParams]);

  const filteredByLetter = React.useMemo(() => {
    if (!selectedLetter) return glossary;
    const target = selectedLetter.toLowerCase();
    return glossary.filter(t => norm(t.term).startsWith(target));
  }, [selectedLetter]);

  const results = React.useMemo(
    () => (query ? searchGlossary(filteredByLetter, query) : filteredByLetter),
    [filteredByLetter, query]
  );

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(prev => (prev === letter ? null : letter));
  };

  const clearAll = () => {
    setQuery("");
    setSelectedLetter(null);
  };

  const LetterButton: React.FC<{ letter: string }> = ({ letter }) => {
    const active = selectedLetter === letter;
    return (
      <button
        type="button"
        onClick={() => handleLetterClick(letter)}
        aria-pressed={active}
        aria-label={`Filtrar por termos iniciados com ${letter}`}
        className={[
          "w-full h-8 rounded-md text-xs sm:text-sm font-medium transition",
          "border border-slate-200 dark:border-slate-700",
          active
            ? "bg-blue-600 text-white dark:bg-blue-500"
            : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700"
        ].join(" ")}
      >
        {letter}
      </button>
    );
  };

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold">Glossário</h1>
        <p className="mt-1 text-slate-600 dark:text-slate-300">
          Termos essenciais de bioinformática. Pesquise e/ou filtre pela letra inicial.
        </p>
      </header>

      {/* Linha: barra de busca (flex-1) + ações à direita */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        {/* Coluna esquerda: SearchBar + Alfabeto (mesma largura) */}
        <div className="flex-1">
          <SearchBar
            placeholder="Buscar por termo ou alias..."
            value={query}
            onChange={(v: string) => setQuery(v)}
            ariaLabel="Buscar no glossário"
          />

          {/* Alfabeto em uma única linha com 26 colunas iguais, mesmo width do SearchBar */}
          <div className="mt-3">
            <div
              className="grid gap-1"
              style={{ gridTemplateColumns: "repeat(26, minmax(0, 1fr))" }}
              aria-label="Filtro por letra inicial"
              role="group"
            >
              {ALPHABET.map(l => (
                <LetterButton key={l} letter={l} />
              ))}
            </div>
            {selectedLetter && (
              <p className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                Filtrando por termos que começam com <span className="font-semibold">{selectedLetter}</span>.
              </p>
            )}
          </div>
        </div>

        {/* Coluna direita: ações */}
        <div className="shrink-0 self-end sm:self-start">
          {(query || selectedLetter) && (
            <button
              className="text-sm text-slate-700 dark:text-slate-200 hover:underline"
              onClick={clearAll}
            >
              Limpar filtros
            </button>
          )}
        </div>
      </div>

      {/* Resultados */}
      <section className="mt-6">
        {results.length === 0 ? (
          <div className="text-slate-600 dark:text-slate-300">
            Nenhum resultado. Tente outra busca ou selecione outra letra.
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {results.map(term => (
              <GlossaryListItem
                key={term.id}
                term={term}
                query={query}
                renderHighlight={highlightMatch}
              />
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

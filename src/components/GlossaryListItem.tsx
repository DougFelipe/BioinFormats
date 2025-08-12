import React from "react";
import type { GlossaryTerm } from "../types";

type Props = {
  term: GlossaryTerm;
  query: string;
  renderHighlight: (text: string, q: string) => JSX.Element;
};

export default function GlossaryListItem({ term, query, renderHighlight }: Props) {
  // pega só a primeira frase/linha como resumo curto
  const shortDef = term.definition.split(/(?<=\.)\s|[\n\r]/)[0] ?? term.definition;

  return (
    <li className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 hover:shadow-sm transition">
      <h3 className="text-lg font-semibold">
        {renderHighlight(term.term, query)}
      </h3>
      <p className="mt-2 text-sm text-slate-700 dark:text-slate-300 line-clamp-2">
        {renderHighlight(shortDef, query)}
      </p>
    </li>
  );
}

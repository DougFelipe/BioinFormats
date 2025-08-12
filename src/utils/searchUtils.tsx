/* eslint-disable @typescript-eslint/ban-ts-comment */
// src/utils/searchUtils.tsx

import React from "react";
import type { FileFormat, GlossaryTerm } from "../types";

/** Normaliza strings: minúsculas, remove acentos, trim. */
const norm = (s: string) =>
  (s ?? "")
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .trim();

/** Divide a query em termos; respeita aspas simples/dobras para termos compostos. */
const tokenize = (q: string): string[] => {
  const n = norm(q);
  if (!n) return [];
  const tokens: string[] = [];
  const re = /"([^"]+)"|'([^']+)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(n))) {
    tokens.push((m[1] ?? m[2] ?? m[3]).trim());
  }
  return tokens.filter(Boolean);
};

const joinArr = (arr?: string[], sep = " • ") => (arr && arr.length ? arr.join(sep) : "");

/** Pontuação helper: +score se começa com, +score2 se inclui. */
const scoreStartsIncludes = (value: string, tokens: string[], wStart: number, wIn: number) => {
  const v = norm(value);
  let s = 0;
  for (const tok of tokens) {
    if (!tok) continue;
    if (v.startsWith(tok)) s += wStart;
    else if (v.includes(tok)) s += wIn;
  }
  return s;
};

/** Busca e filtra formatos por texto e área (nome ou id). */
export const searchFormats = (
  formats: FileFormat[],
  query: string,
  selectedAreaName?: string
): FileFormat[] => {
  let filtered = formats ?? [];
  const tokens = tokenize(query);

  // Filtro por área
  if (selectedAreaName && selectedAreaName.trim()) {
    const sel = norm(selectedAreaName);
    filtered = filtered.filter(f => {
      const byName = (f.area ?? []).some(a => norm(a) === sel || norm(a).includes(sel));
      // @ts-expect-error — alguns projetos já usam area_ids
      const byId = (f.area_ids ?? []).some((id: string) => norm(id) === sel || norm(id).includes(sel));
      return byName || byId;
    });
  }

  if (!tokens.length) return [...filtered].sort((a, b) => a.name.localeCompare(b.name));

  type Scored = { f: FileFormat; score: number };
  const scored: Scored[] = filtered.map(f => {
    let s = 0;

    s += scoreStartsIncludes(f.extension ?? "", tokens, 140, 60);
    s += scoreStartsIncludes(f.name ?? "", tokens, 120, 50);
    s += scoreStartsIncludes(f.description ?? "", tokens, 40, 20);

    s += scoreStartsIncludes(joinArr(f.area), tokens, 80, 35);
    // @ts-expect-error opcional
    s += scoreStartsIncludes(joinArr(f.area_ids), tokens, 80, 35);

    s += scoreStartsIncludes(joinArr(f.tools), tokens, 60, 30);
    s += scoreStartsIncludes(f.encoding_type ?? "", tokens, 25, 15);
    s += scoreStartsIncludes(joinArr(f.used_in_repositories), tokens, 35, 20);

    s += scoreStartsIncludes(joinArr(f.example_filenames), tokens, 30, 18);
    s += scoreStartsIncludes(f.example_file_content ?? "", tokens, 20, 12);
    s += scoreStartsIncludes(joinArr(f.example_file_explanation), tokens, 22, 12);

    const pipelines = (f.pipeline_examples ?? []).map(p => `${p.pipeline} — ${p.explanation}`);
    s += scoreStartsIncludes(joinArr(pipelines), tokens, 40, 22);

    const refs = (f.references ?? []).map(r => `${r.title} ${r.url} ${r.type ?? ""}`);
    s += scoreStartsIncludes(joinArr(refs), tokens, 18, 10);

    const qn = norm(query);
    if (norm(f.name) === qn) s += 200;
    if (norm(f.extension) === qn) s += 160;

    return { f, score: s };
  });

  return scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || a.f.name.localeCompare(b.f.name))
    .map(x => x.f);
};

/** Lista única de nomes de áreas (compatível com `area` atual). */
export const getUniqueAreas = (formats: FileFormat[]): string[] => {
  const set = new Set<string>();
  (formats ?? []).forEach(f => (f.area ?? []).forEach(a => set.add(a)));
  return Array.from(set).sort((a, b) => a.localeCompare(b));
};

/* ===================== GLOSSÁRIO ===================== */

/** Busca no glossário com ranking simples (termo > alias > definição). */
export function searchGlossary(terms: GlossaryTerm[], query: string): GlossaryTerm[] {
  const tokens = tokenize(query);
  if (!tokens.length) return terms ?? [];

  const scored = (terms ?? []).map(t => {
    let s = 0;
    s += scoreStartsIncludes(t.term, tokens, 120, 40);
    s += scoreStartsIncludes(joinArr(t.aliases), tokens, 90, 35);
    s += scoreStartsIncludes(t.definition, tokens, 40, 20);

    const qn = norm(query);
    if (norm(t.term) === qn) s += 180;

    return { t, score: s };
  });

  return scored
    .filter(x => x.score > 0)
    .sort((a, b) => b.score - a.score || a.t.term.localeCompare(b.t.term))
    .map(x => x.t);
}

/**
 * Destaque diacrítico-insensível de TODAS as ocorrências.
 * Retorna JSX, por isso este arquivo precisa ser .tsx.
 */
export function highlightMatch(text: string, query: string): JSX.Element {
  const q = norm(query);
  if (!q) return <>{text}</>;
  const original = text ?? "";
  const chars = Array.from(original);

  // Mapa original->normalizado e normalizado concatenado
  const normPieces: string[] = [];
  const normToOrigIndex: number[] = [];
  for (let i = 0; i < chars.length; i++) {
    const n = norm(chars[i]);
    for (let k = 0; k < n.length; k++) normToOrigIndex.push(i);
    normPieces.push(n);
  }
  const normalized = normPieces.join("");

  // Encontrar todas as ocorrências
  const matches: Array<{ start: number; end: number }> = [];
  let pos = 0;
  while (true) {
    const idx = normalized.indexOf(q, pos);
    if (idx === -1) break;
    matches.push({ start: idx, end: idx + q.length });
    pos = idx + q.length;
  }
  if (!matches.length) return <>{original}</>;

  // Converter ranges normalizados para índices na string original
  const ranges: Array<{ start: number; end: number }> = matches.map(m => {
    const startOrig = normToOrigIndex[m.start] ?? 0;
    const endOrig = (normToOrigIndex[m.end - 1] ?? chars.length - 1) + 1; // exclusivo
    return { start: startOrig, end: endOrig };
  });

  // Mesclar ranges que se tocam/sobrepõem
  ranges.sort((a, b) => a.start - b.start);
  const merged: typeof ranges = [];
  for (const r of ranges) {
    const last = merged[merged.length - 1];
    if (!last || r.start > last.end) merged.push(r);
    else last.end = Math.max(last.end, r.end);
  }

  // Montar JSX
  const parts: JSX.Element[] = [];
  let last = 0;
  merged.forEach((r, i) => {
    if (r.start > last) parts.push(<span key={`t-${i}-pre`}>{original.slice(last, r.start)}</span>);
    parts.push(
      <mark key={`m-${i}`} className="bg-yellow-200 dark:bg-yellow-700 rounded px-0.5">
        {original.slice(r.start, r.end)}
      </mark>
    );
    last = r.end;
  });
  if (last < original.length) parts.push(<span key="t-tail">{original.slice(last)}</span>);

  return <>{parts}</>;
}

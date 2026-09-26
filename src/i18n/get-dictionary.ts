import "server-only";
import type { Locale } from "./config";

const dictionaries = {
  ar: () => import("./dictionaries/ar.json").then((m) => m.default),
  en: () => import("./dictionaries/en.json").then((m) => m.default),
  tr: () => import("./dictionaries/tr.json").then((m) => mergeDictionary(m.default)),
  ru: () => import("./dictionaries/ru.json").then((m) => mergeDictionary(m.default)),
  ur: () => import("./dictionaries/ur.json").then((m) => mergeDictionary(m.default)),
  hi: () => import("./dictionaries/hi.json").then((m) => mergeDictionary(m.default)),
  bn: () => import("./dictionaries/bn.json").then((m) => mergeDictionary(m.default)),
};

export type Dictionary = Awaited<ReturnType<(typeof dictionaries)["ar"]>>;

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  (dictionaries[locale] ?? dictionaries.ar)();

function mergeDictionary(overrides: Record<string, unknown>) {
  const base = require("./dictionaries/en.json") as Record<string, unknown>;
  const merge = (left: Record<string, unknown>, right: Record<string, unknown>): Record<string, unknown> => Object.fromEntries(
    Object.keys(left).map((key) => [key, isObject(left[key]) && isObject(right[key]) ? merge(left[key] as Record<string, unknown>, right[key] as Record<string, unknown>) : right[key] ?? left[key]])
  );
  return merge(base, overrides) as Dictionary;
}

function isObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

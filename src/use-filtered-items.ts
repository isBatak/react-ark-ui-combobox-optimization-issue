import { useCallback, useMemo } from "react";
import { Item } from "./types";
import Fuse, { IFuseOptions } from "fuse.js";

const fuseOptions: IFuseOptions<Item> = {
  keys: [{ name: "label", weight: 2 }, "description"],
  threshold: 0.4,
  distance: 500,
};

export const useFilteredItems = (data: Item[], inputValue: string) => {
  const fuse = useMemo(() => new Fuse(data, fuseOptions), [data]);

  const filter = useCallback(
    (value: string): Item[] => {
      if (!value) return data;

      return fuse.search(value).map((result) => result.item);
    },
    [data, fuse]
  );
  const matches = useMemo(() => filter(inputValue), [inputValue, filter]);

  return matches;
};

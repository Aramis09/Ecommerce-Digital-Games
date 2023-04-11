import { filtersGeneralType } from "./Filters";

export const inititalStateFilters:filtersGeneralType = {
  name: "",
  filters: {
    genres: [],
    platform: [],
    priceRange: [0, 1000],
  },
  order: {
    alphabetic: "DESC",
    price: "",
  },
}
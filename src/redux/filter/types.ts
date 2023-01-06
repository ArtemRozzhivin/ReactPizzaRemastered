export type SortingType = {
  sort: string;
  name: string;
  order: string;
};

export type SetFilltersType = {
  category: number;
  sortBy: SortingType;
};

export interface FilterSliceType {
  activeCategory: number;
  searchValue: string;
  activeSorting: SortingType;
}

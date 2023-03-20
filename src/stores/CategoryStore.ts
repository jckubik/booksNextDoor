import { defineStore } from "pinia";
import { CategoryItem } from "@/types";
import { apiUrl } from "@/services/ApiService";

export const useCategoryStore = defineStore("CategoryStore", {
  state: () => ({
    categoryList: [] as CategoryItem[],
    selectedCategoryName: "Fiction",
  }),
  getters: {
    selectedCategory(): string {
      return this.selectedCategoryName;
    },
  },
  actions: {
    async fetchCategories() {
      const url = apiUrl + "categories";

      this.categoryList = await fetch(url).then((response) => response.json());
    },
    updateSelectedCategoryName(name: string) {
      console.log("new category:", name);
      this.selectedCategoryName = name;
    },
  },
});

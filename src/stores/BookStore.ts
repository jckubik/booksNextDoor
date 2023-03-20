import { defineStore } from "pinia";
import { BookItem } from "@/types";
import { useCategoryStore } from "@/stores/CategoryStore";
import { apiUrl } from "@/services/ApiService";

export const useBookStore = defineStore("BookStore", {
  state: () => ({
    bookList: [] as BookItem[],
  }),
  actions: {
    async fetchBooks(categoryName: string) {
      const categoryStore = useCategoryStore();

      let selectedCategoryName = categoryName;

      const selectedCategory = categoryStore.categoryList?.find(
        (category) => category.name === categoryName
      );
      if (selectedCategory) {
        selectedCategoryName = selectedCategory.name;
      }

      const url =
        apiUrl + "categories/name/" + selectedCategoryName + "/books/";
      this.bookList = await fetch(url).then((response) => response.json());
    },
  },
});

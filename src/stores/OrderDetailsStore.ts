import { defineStore } from "pinia";
import { BookItem, Customer, LineItem, Order, OrderDetails } from "@/types";

const ORDER_DETAILS_STORAGE_KEY = "Order Details";

export const useOrderDetailsStore = defineStore("OrderDetailsStore", {
  state: () => {
    const orderDetails = {} as OrderDetails;
    const orderString = sessionStorage.getItem(ORDER_DETAILS_STORAGE_KEY);
    if (orderString !== null) {
      // orderString is a string
      const orderDetailsFromStorage = JSON.parse(orderString) as OrderDetails;
      Object.assign(orderDetails, orderDetailsFromStorage);
    }
    if (orderDetails !== null) {
      return {
        order: orderDetails.order,
        customer: orderDetails.customer,
        books: orderDetails.books,
        lineItems: orderDetails.lineItems,
      };
    } else {
      return {
        order: null as Order | null,
        customer: null as Customer | null,
        books: null as BookItem[] | null,
        lineItems: null as LineItem[] | null,
      };
    }
  },
  actions: {
    clearOrderDetails() {
      sessionStorage.setItem(ORDER_DETAILS_STORAGE_KEY, JSON.stringify(null));
      this.order = null;
      this.customer = null;
      this.books = null;
      this.lineItems = null;
    },
    setOrderDetails(details: OrderDetails) {
      const { order, customer, books, lineItems } = details;
      sessionStorage.setItem(
        ORDER_DETAILS_STORAGE_KEY,
        JSON.stringify(details)
      );
      this.order = order;
      this.customer = customer;
      this.books = books;
      this.lineItems = lineItems;
    },
  },
});

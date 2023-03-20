<script setup lang="ts">
import ConfirmationDetail from "@/components/ConfirmationDetail.vue";
import { useOrderDetailsStore } from "@/stores/OrderDetailsStore";
import { useCategoryStore } from "@/stores/CategoryStore";

const categoryStore = useCategoryStore();
const { order, customer, books, lineItems } = useOrderDetailsStore();
const detailsExist = order && customer && books && lineItems;
</script>

<template>
  <ConfirmationDetail v-if="detailsExist"></ConfirmationDetail>
  <div class="continue-shopping-empty" v-else>
    <h4>There is currently no order information available.</h4>
    <div class="continue-shopping">
      <button
        class="button primary-button"
        @click="
          () => $router.push(`/category/${categoryStore.selectedCategory}`)
        "
      >
        Continue Shopping
      </button>
    </div>
  </div>
</template>

<style scoped>
.primary-button {
  background-color: var(--primary-color);
  border: 0;
  border-radius: 10px;
  width: 100%;
}

.continue-shopping-empty {
  margin: 1em auto;
  width: fit-content;
}
</style>

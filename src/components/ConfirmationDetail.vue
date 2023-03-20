<script setup lang="ts">
import ConfirmationTable from "@/components/ConfirmationTable";
import { useOrderDetailsStore } from "@/stores/OrderDetailsStore";

const { order, customer, books, lineItems } = useOrderDetailsStore();
</script>

<template>
  <div id="confirmationView">
    <div id="customer-info">
      <h2 class="title">Your Order Details</h2>
      <ul class="confirmation-info">
        <li>Your Confirmation #: {{ order.confirmationNumber }}</li>
        <li>
          Time:
          {{ new Date(order.dateCreated).toTimeString() }}
        </li>
      </ul>
      <ul>
        <li class="bold">Your Info:</li>
        <li>{{ customer.name }}</li>
        <li>{{ customer.address }}</li>
        <li>{{ customer.email }}</li>
        <li>{{ customer.phone }}</li>
        <li>
          **** **** ****
          {{ customer.ccNumber.substring(12) }} ({{
            new Date(customer.ccExpDate).getMonth() + 2
          }}-{{ new Date(customer.ccExpDate).getFullYear() }})
        </li>
      </ul>
    </div>
    <confirmation-table> </confirmation-table>
  </div>
</template>

<style scoped>
#confirmationView {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 1em auto;
  gap: 1em;
}

#customer-info {
  display: flex;
  flex-direction: column;
  gap: 1em;
}

ul {
  text-align: left;
}
ul > li {
  margin: 0.25em;
}

.bold {
  font-weight: bold;
}

.confirmation-info {
  font-weight: bold;
}
</style>

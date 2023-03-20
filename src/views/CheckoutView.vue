<script setup lang="ts">
import { reactive, Ref } from "vue";
import useVuelidate from "@vuelidate/core";
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from "@vuelidate/validators";
import { useCartStore } from "@/stores/CartStore";
import { useCategoryStore } from "@/stores/CategoryStore";
import { asDollarsAndCents } from "@/main";

const cartStore = useCartStore();
const categoryStore = useCategoryStore();
const cart = cartStore.cart;
import { isCreditCard, isMobilePhone } from "@/utils";
import router from "@/router";

const months: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const years: number[] = (() => {
  const yearArr = [];
  for (let i = 0; i < 16; i++) {
    yearArr.push(yearFrom(i));
  }

  return yearArr;
})();

const form = reactive({
  name: "",
  address: "",
  phone: "",
  email: "",
  ccNumber: "",
  ccExpiryMonth: new Date().getMonth() + 1,
  ccExpiryYear: new Date().getFullYear(),
  checkoutStatus: "",
});

const checkPhone = (param: string) =>
  helpers.withParams({ type: "phone", value: param }, (value) => {
    if (value) {
      return isMobilePhone(value as string);
    } else {
      return true;
    }
  });

const checkCC = (param: string) =>
  helpers.withParams({ type: "ccNumber", value: param }, (value) => {
    if (value) {
      return isCreditCard(value as string);
    } else {
      return true;
    }
  });

const rules = {
  name: {
    required: helpers.withMessage("Please provide a name.", required),
    minLength: helpers.withMessage(
      "Name must have at least 4 letters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Name can have at most 45 letters.",
      maxLength(45)
    ),
  },
  address: {
    required: helpers.withMessage("Please provide an address.", required),
    minLength: helpers.withMessage(
      "Address must have at least 4 characters.",
      minLength(4)
    ),
    maxLength: helpers.withMessage(
      "Address can have at most 45 letters.",
      maxLength(45)
    ),
  },
  phone: {
    required: helpers.withMessage("Please provide a phone number.", required),
    isMobilePhone: helpers.withMessage(
      "Phone number is invalid.",
      checkPhone(form.phone)
    ),
  },
  email: {
    required: helpers.withMessage("Please provide an email address.", required),
    isEmail: helpers.withMessage("Email is invalid.", email),
  },
  ccNumber: {
    required: helpers.withMessage(
      "Please provide a credit card number.",
      required
    ),
    isCreditCard: helpers.withMessage(
      "Credit card number is invalid.",
      checkCC(form.ccNumber)
    ),
  },
  ccExpiryMonth: {
    required: helpers.withMessage("Please provide expiration month.", required),
  },
  ccExpiryYear: {
    required: helpers.withMessage("Please provide expiration year.", required),
  },
};

const $v = useVuelidate(rules, form);

async function submitOrder() {
  console.log("Submit order");
  const isFormCorrect = await $v.value.$validate();
  if (!isFormCorrect) {
    form.checkoutStatus = "ERROR";
  } else {
    form.checkoutStatus = "PENDING";
    await cartStore
      .placeOrder({
        name: form.name,
        address: form.address,
        phone: form.phone,
        email: form.email,
        ccNumber: form.ccNumber,
        ccExpiryMonth: form.ccExpiryMonth,
        ccExpiryYear: form.ccExpiryYear,
      })
      .then(() => {
        form.checkoutStatus = "OK";
        router.push({ name: "confirmation-view" });
      })
      .catch((reason) => {
        form.checkoutStatus = "SERVER_ERROR";
        console.log("Error placing order", reason);
      });
  }
}

/* NOTE: For example yearFrom(0) == <current_year> */
function yearFrom(index: number) {
  return new Date().getFullYear() + index;
}
</script>

<style scoped>
.checkout-page {
  color: var(--primary-color-dark);
}
.checkout-page-body {
  display: flex;
  justify-content: center;
  padding: 1em;
}

form > div > div > input,
form > div > div > select {
  margin-left: 0.5em;
}

form .error {
  color: red;
  text-align: right;
  font-style: italic;
  font-size: small;
  margin: -0.5em 0 0.25em 0;
}

.checkoutStatusBox {
  margin: 1em;
  padding: 0.5em;
  color: var(--primary-color-dark);
  text-align: center;
}

.primary-button {
  background-color: var(--primary-color);
  border: 0;
  border-radius: 10px;
  width: 100%;
}

.primary-button:disabled {
  background-color: #656c71;
  cursor: default;
}

.continue-shopping-empty {
  margin: 1em auto;
  width: fit-content;
}

.empty-cart-message {
  text-align: center;
  margin: 5em auto;
}

.complete-purchase-button {
  width: fit-content;
}

.checkout-form {
  align-items: flex-start;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2em;
}

.inputs-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5em;
}

.cost-container {
  display: flex;
  flex-direction: row;
  gap: 0.5em;
}

.price-and-submit-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  width: fit-content;
}

.total {
  font-weight: bold;
}

.price-labels {
  text-align: start;
}

.price {
  text-align: end;
  width: 100%;
}

.error-status {
  color: red;
}
</style>

<template>
  <div class="checkout-page">
    <section v-if="cart.empty" class="empty-cart-message">
      <div class="continue-shopping-empty">
        <h4>Oops your cart is empty! Please add an item to checkout.</h4>
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
    </section>

    <section class="checkout-page-body" v-if="!cart.empty">
      <form @submit.prevent="submitOrder" class="checkout-form">
        <div class="inputs-container">
          <div>
            <label for="name">Name</label>
            <input
              type="text"
              size="20"
              id="name"
              name="name"
              v-model.lazy="$v.name.$model"
            />
          </div>
          <template v-if="$v.name.$error">
            <span
              class="error"
              v-for="error of $v.name.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>
          <div>
            <label for="address">Address</label>
            <input
              class="textField"
              type="text"
              size="20"
              id="address"
              name="phone"
              v-model.lazy="$v.address.$model"
            />
          </div>
          <template v-if="$v.address.$error">
            <span
              class="error"
              v-for="error of $v.address.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>
          <div>
            <label for="phone">Phone</label>
            <input
              class="textField"
              type="text"
              size="20"
              id="phone"
              name="phone"
              v-model.lazy="$v.phone.$model"
            />
          </div>
          <template v-if="$v.phone.$error">
            <span
              class="error"
              v-for="error of $v.phone.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>
          <div>
            <label for="email">Email</label>
            <input
              type="text"
              size="20"
              id="email"
              name="email"
              v-model.lazy="$v.email.$model"
            />
          </div>
          <template v-if="$v.email.$error">
            <span
              class="error"
              v-for="error of $v.email.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>
          <div>
            <label for="ccNumber">Credit card</label>
            <input
              type="text"
              size="20"
              id="ccNumber"
              name="ccNumber"
              v-model.lazy="$v.ccNumber.$model"
            />
          </div>
          <template v-if="$v.ccNumber.$error">
            <span
              class="error"
              v-for="error of $v.ccNumber.$errors"
              :key="error.$uid"
              >{{ error.$message }}</span
            >
          </template>

          <div>
            <label>Exp Date</label>
            <select v-model="$v.ccExpiryMonth.$model" class="month-select">
              <option
                v-for="(month, index) in months"
                :key="index"
                :value="index + 1"
              >
                {{ month }} ({{ index + 1 }})
              </option>
            </select>

            <select v-model="$v.ccExpiryYear.$model">
              <option v-for="(year, index) in years" :key="index" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
        </div>

        <div class="price-and-submit-container">
          <div class="cost-container">
            <div class="price-labels">
              <p>Items:</p>
              <p>Shipping:</p>
              <p><span class="total">Total:</span></p>
            </div>
            <div class="price">
              <p>{{ asDollarsAndCents(cart.subtotal) }}</p>
              <p>{{ asDollarsAndCents(cart.surcharge) }}</p>
              <p>
                <span class="total">{{ asDollarsAndCents(cart.total) }}</span>
              </p>
            </div>
          </div>
          <input
            type="submit"
            name="submit"
            class="button primary-button complete-purchase-button"
            :disabled="form.checkoutStatus === 'PENDING'"
            value="Complete Purchase"
          />
        </div>
      </form>
    </section>
    <section v-show="form.checkoutStatus !== ''" class="checkoutStatusBox">
      <div v-if="form.checkoutStatus === 'ERROR'" class="error-status">
        Error: Please fix the problems above and try again.
      </div>

      <div v-else-if="form.checkoutStatus === 'PENDING'">Processing...</div>

      <div v-else-if="form.checkoutStatus === 'OK'">Order placed...</div>

      <div v-else>An unexpected error occurred, please try again.</div>
    </section>
  </div>
</template>

<template>
  <v-sheet
    class="mx-auto d-flex flex-1-1 justify-center align-center w-100"
    max-width="400"
  >
    <v-card class="w-100">
      <v-card-title>Login</v-card-title>
      <v-form
        validate-on="submit lazy"
        @submit.prevent="submit"
        aria-autocomplete="none"
      >
        <v-container>
          <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="field.userName"
                label="Username"
                type="email"
                autocomplete="off"
                :rules="[required]"
            /></v-col>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="field.password"
                type="password"
                label="Password"
                autocomplete="off"
                :rules="[required]"
              />
            </v-col>
            <v-col cols="12">
              <v-btn :loading="loading" text="Submit" type="submit" block />
            </v-col> </v-row
        ></v-container>
      </v-form> </v-card
  ></v-sheet>
</template>

<script lang="ts" setup>
const { login } = useAuth();

const field = ref({
  userName: "",
  password: "",
});

const required = (v: string) => !!v || "Field is required";

const loading = ref(false);

const submit = async () => {
  const { userName, password } = field.value;
  loading.value = true;
  try {
    await login(userName, password);
  } catch (error) {
    console.log(error);
  }
  loading.value = false;
};
</script>

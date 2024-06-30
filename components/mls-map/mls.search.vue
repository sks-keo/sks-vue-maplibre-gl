<script setup lang="ts">
import { MglCustomControl } from "@indoorequal/vue-maplibre-gl";
import { debounce, capitalize } from "lodash";

const state = useState<{
  loading: boolean;
  search: string;
  results: Record<string, unknown>[];
  adminGeoJson: GeoJSON.GeoJSON | null;
}>("search", () => ({
  loading: false,
  search: "",
  results: [],
  adminGeoJson: null,
}));

const config = useRuntimeConfig();
const apiDomain = config.public.apiDomain;
const { $api } = useNuxtApp();

const mapResults = (results: Record<string, string>[]) => {
  return results.map(
    ({
      com_name = "",
      dis_name = "",
      dis_code,
      pro_id,
      pro_name = "",
      com_code,
      ...res
    }) => {
      let subItems = [pro_name];
      const _index = res._index;
      let adminCode = pro_id;
      let label = pro_name;
      if (_index.includes("communes")) {
        label = com_name;
        subItems = [pro_name, dis_name, com_name];
        adminCode = dis_code;
      } else if (_index.includes("districts")) {
        label = dis_name;
        subItems = [pro_name, dis_name];
        adminCode = com_code;
      }

      return {
        ...res,
        title: capitalize(label),
        subItems,
        adminCode,
      };
    }
  );
};

const handleSearch = debounce(async (query: string) => {
  state.value.loading = true;
  try {
    const { data } = await $api<{ data: Record<string, string>[] }>(
      `${apiDomain}/2024-06/places/full-text-search`,
      {
        method: "GET",
        params: { query },
      }
    );
    const results = mapResults(data);
    state.value.results = results;
  } catch (err) {
    state.value.results = [];
    console.error(err);
  }
  state.value.loading = false;
}, 300);

const position = "top-left";

const onClick = async (item: Record<string, unknown>) => {
  state.value.loading = true;
  state.value.adminGeoJson = null;
  try {
    const { data } = await $api<{ data: GeoJSON.GeoJSON }>(
      `${apiDomain}/2024-06/places/detail`,
      {
        method: "GET",
        params: { admin_code: item.adminCode },
      }
    );
    state.value.adminGeoJson = data;
  } catch (err) {
    console.error(err);
    state.value.adminGeoJson = null;
  }
  state.value.loading = false;
};

const onClear = () => {
  state.value.results = [];
  state.value.adminGeoJson = null;
};
</script>

<template>
  <mgl-custom-control :position="position">
    <template #default>
      <v-card
        class="mx-auto search-control"
        color="surface-light"
        min-width="300"
      >
        <v-autocomplete
          :items="state.results"
          class="mx-auto"
          density="comfortable"
          menu-icon=""
          placeholder="Search admin boundaries"
          prepend-inner-icon="mdi-magnify"
          clearable
          theme="light"
          variant="solo"
          :loading="state.loading"
          item-props
          no-filter
          @update:search="handleSearch"
          @click:clear="onClear"
        >
          <template v-slot:item="{ item, index, props }">
            <v-list-item
              v-bind="props"
              class="custom-item"
              @click="onClick(item.props)"
            >
              <v-list-item-content>
                <v-list-item-subtitle>
                  {{ item.props.subItems.join(" > ") }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-autocomplete>
      </v-card>
    </template>
  </mgl-custom-control>
  <mls-admin-layer v-if="state.adminGeoJson" :geoJson="state.adminGeoJson" />
</template>
<style lang="scss">
.search-control {
  background-color: red;
  .v-input__details {
    display: none;
  }
}
</style>

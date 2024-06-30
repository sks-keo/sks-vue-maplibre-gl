<script setup lang="ts">
import {
  MglNavigationControl,
  MglCustomControl,
  useMap,
} from "@indoorequal/vue-maplibre-gl";
import type { ControlPosition } from "maplibre-gl";
import { MapTypeEnum } from "~/constants/map.enums";

const { layer: mapLayer, setLayer } = useMapLayerSwitch();

type Props = {
  position?: ControlPosition;
};

const props = defineProps<Props>();
const position = props.position || "bottom-right";
const items = [
  { title: "Satellite", value: MapTypeEnum.HYBRID },
  { title: "Street", value: MapTypeEnum.ROAD },
  { title: "Open Street Map", value: MapTypeEnum.OSM },
];
const layerName = mapLayer.value;

const onSwitchLayer = (value: MapTypeEnum) => {
  setLayer(value);
};

const { map } = useMap();
// resize map when window size changes
const resizeHandler = () => {
  map?.resize();
};

onMounted(() => {
  window.addEventListener("resize", resizeHandler);
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeHandler);
});
</script>

<template>
  <mgl-navigation-control :position="position" />
  <mgl-custom-control :position="position">
    <template #default>
      <div class="mapboxgl-ctrl layer-ctrl d-flex justify-space-around">
        <v-menu>
          <template v-slot:activator="{ props }">
            <v-btn size="small" color="primary" v-bind="props"> Maps </v-btn>
          </template>
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
              :selected="item.value === layerName"
              @click="() => onSwitchLayer(item.value)"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
        <v-menu activator="#menu-activator">
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </template>
  </mgl-custom-control>
</template>

<style lang="scss">
.layer-ctrl {
  position: absolute;
  left: -105px;
}
.maplibregl-ctrl-bottom-right {
  .layer-ctrl {
    bottom: -95px;
  }
}
.maplibregl-ctrl-top-right {
  .layer-ctrl {
    top: -95px;
  }
}
</style>

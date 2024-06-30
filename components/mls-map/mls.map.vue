<script setup lang="ts">
import { MglMap } from "@indoorequal/vue-maplibre-gl";
import { mapBlankStyle, getMapStyle } from "~/utils/mapStyles";
import { MapTypeEnum } from "~/constants";
import type { LngLatLike } from "maplibre-gl";

type Props = {
  zoom?: number;
  center?: LngLatLike;
};
const props = defineProps<Props>();
const { layer: mapLayer, getDefaultLayer } = useMapLayerSwitch();

// use in future
const blankStyle = false;
const layerName = getDefaultLayer();
const mapStyle = blankStyle ? mapBlankStyle : getMapStyle(layerName);

const center = props.center || [104.9038566, 11.5774552];
const zoom = props.zoom;
</script>

<template>
  <mgl-map
    :attribution-control="false"
    :map-style="mapStyle"
    :center="center"
    :zoom="zoom"
    height="100%"
    width="100%"
  >
    <mls-search />
    <mls-control />
  </mgl-map>
</template>

<style lang="scss">
@import "maplibre-gl/dist/maplibre-gl.css";
</style>

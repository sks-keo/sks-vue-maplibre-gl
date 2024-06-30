<template>
  <mgl-geo-json-source :source-id="sourceId" :data="geoJson">
    <mgl-line-layer
      :layer-id="sourceId"
      :layout="{ 'line-cap': 'round', 'line-join': 'round' }"
      :paint="layerPaint"
    />
  </mgl-geo-json-source>
</template>
<script lang="ts" setup>
import {
  MglGeoJsonSource,
  MglLineLayer,
  useMap,
} from "@indoorequal/vue-maplibre-gl";
import * as turf from "@turf/turf";

type Props = {
  geoJson: GeoJSON.GeoJSON;
};
const { map } = useMap();
const { geoJson } = defineProps<Props>();
const sourceId = "place-detail";
const layerPaint = {
  "line-color": "red",
  "line-width": 2,
  "line-opacity": 1,
  "line-dasharray": [2, 1.5],
};
const bbox = turf.bbox(geoJson);
console.log("bbox::: ", bbox);
map?.fitBounds(bbox, {
  padding: { top: 65, bottom: 10, left: 10, right: 20 },
});
</script>

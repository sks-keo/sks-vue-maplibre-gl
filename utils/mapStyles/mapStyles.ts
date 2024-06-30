import { GLOBAL_MAPLIBRE_STYLE } from "./layerTile";
import { getRasterMap } from "./helper";
import { MapTypeEnum } from "~/constants";

export const mapRoadStyle = getRasterMap(
  {
    ...GLOBAL_MAPLIBRE_STYLE,
    sources: {},
  },
  MapTypeEnum.ROAD
);
export const mapHybridStyle = getRasterMap(
  {
    ...GLOBAL_MAPLIBRE_STYLE,
    sources: {},
  },
  MapTypeEnum.HYBRID
);

export const mapOsmStyle: any = getRasterMap(
  {
    ...GLOBAL_MAPLIBRE_STYLE,
    sources: {},
  },
  MapTypeEnum.OSM
);
export const mapTerrainStyle: any = getRasterMap(
  {
    ...GLOBAL_MAPLIBRE_STYLE,
    sources: {},
  },
  MapTypeEnum.TERRAIN
);
export const mapBlankStyle: any = getRasterMap(
  {
    ...GLOBAL_MAPLIBRE_STYLE,
    sources: {},
  },
  MapTypeEnum.BLANK
);

export const getMapStyle = (type?: MapTypeEnum) => {
  if (type === MapTypeEnum.ROAD) {
    return mapRoadStyle;
  } else if (type === MapTypeEnum.HYBRID) {
    return mapHybridStyle;
  } else if (type === MapTypeEnum.OSM) {
    return mapOsmStyle;
  } else if (type === MapTypeEnum.TERRAIN) {
    return mapTerrainStyle;
  } else {
    return mapHybridStyle;
  }
};
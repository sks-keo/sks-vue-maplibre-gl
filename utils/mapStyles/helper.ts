import { filter, cloneDeep } from "lodash";
import {
  GOOLE_MAP_ROAD_TILES,
  GOOLE_MAP_HYBRID_TILES,
  OSM_MAP_TILES,
  TERRAIN_MAIN,
} from "./layerTile";
import { MapTypeEnum } from "~/constants";
import {
  mapRoadStyle,
  mapHybridStyle,
  mapOsmStyle,
  mapTerrainStyle,
  mapBlankStyle,
} from "./mapStyles";

export const getMapTile = (type?: MapTypeEnum) => {
  if (type === MapTypeEnum.ROAD) {
    return GOOLE_MAP_ROAD_TILES;
  } else if (type === MapTypeEnum.HYBRID) {
    return GOOLE_MAP_HYBRID_TILES;
  } else if (type === MapTypeEnum.OSM) {
    return OSM_MAP_TILES;
  } else if (type === MapTypeEnum.TERRAIN) {
    return TERRAIN_MAIN;
  } else if (type === MapTypeEnum.BLANK) {
    return [];
  } else {
    return GOOLE_MAP_HYBRID_TILES;
  }
};
export const getMapStyle = (type?: MapTypeEnum) => {
  if (type === MapTypeEnum.ROAD) {
    return mapRoadStyle;
  } else if (type === MapTypeEnum.HYBRID) {
    return mapHybridStyle;
  } else if (type === MapTypeEnum.OSM) {
    return mapOsmStyle;
  } else if (type === MapTypeEnum.TERRAIN) {
    return mapTerrainStyle;
  } else if (type === MapTypeEnum.BLANK) {
    return mapBlankStyle;
  } else {
    return mapHybridStyle;
  }
};
export const getRasterMap = (layerStyle: any = {}, type?: MapTypeEnum) => {
  const { sources, layers, ...res }: any = cloneDeep(layerStyle);
  sources.gl = {
    type: "raster",
    tiles: getMapTile(type),
    tileSize: 256,
  };

  const newLayers = filter(layers, (layer) => layer.id !== "gl-tiles");
  if (type === MapTypeEnum.BLANK) {
    return { sources, layers: [...newLayers], ...res };
  }

  return {
    sources,
    layers: [
      {
        id: "gl-tiles",
        type: "raster",
        source: "gl",
        minzoom: 0,
        maxzoom: 24,
      },
      ...newLayers,
    ],
    ...res,
  };
};
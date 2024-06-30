
  export const GLOBAL_MAPLIBRE_STYLE = {
    version: 8,
    glyphs:
      "https://sks-layer.github.io/msl-fonts/fonts/{fontstack}/{range}.pbf?v=2",
    sprite: "https://sks-layer.github.io/msl-fonts/sprite/sprite",
  };
  
  export const GOOLE_MAP_ROAD_TILES = [
    // 'https://www.google.com/maps/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}&apistyle=s.t:2%7Cs.e:l%7Cp.v:off,s.t:4%7Cp.v:off,s.t:1%7Cp.v:off',
    // %7Cp.v:off
    // 'https://www.google.com/maps/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}',
    "https://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
    "https://mt1.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
    "https://mt2.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
    "https://mt3.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}",
  ];
  
  export const GOOLE_MAP_HYBRID_TILES = [
    // 'https://www.google.com/maps/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}&apistyle=s.t:2%7Cs.e:l%7Cp.v:off,s.t:4%7Cp.v:off,s.t:1%7Cp.v:off',
    // 'https://www.google.com/maps/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}',
    "https://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
    "https://mt1.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
    "https://mt2.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
    "https://mt3.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}",
  ];
  export const TERRAIN_MAIN = [
    "https://mt0.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
    "https://mt1.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
    "https://mt2.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
    "https://mt3.google.com/vt/lyrs=p&hl=en&x={x}&y={y}&z={z}",
  ];
  
  export const OSM_MAP_TILES = [
    "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
    "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
  ];
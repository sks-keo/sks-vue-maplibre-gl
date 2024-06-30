import { useMap } from "@indoorequal/vue-maplibre-gl";
import { MapTypeEnum } from "~/constants/map.enums";
import { getMapStyle } from "~/utils/mapStyles";

export const useMapLayerSwitch = () => {
  const { map } = useMap();
  const layer = useState<MapTypeEnum>("layer", () => MapTypeEnum.HYBRID);

  const setLayer = (name: MapTypeEnum) => {
    layer.value = name;
    localStorage.setItem("mapLayer", JSON.stringify({ name: layer.value }));
    const mapStyle = getMapStyle(name);
    map?.setStyle(mapStyle);
  };

  const getDefaultLayer = () => {
    let name = MapTypeEnum.HYBRID;
    try {
      const mapLayerState = JSON.parse(localStorage.getItem("mapLayer") || "");
      if (mapLayerState) {
        name = mapLayerState.name;
      }
    } catch (err) {
      console.error(err);
    }
    return name;
  };

  return { layer, setLayer, getDefaultLayer };
};

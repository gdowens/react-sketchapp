import type { SketchLayer } from '../types';

export default (layer: SketchLayer) => {
  // protect against empty top layer
  if (!layer.containsLayers()) {
    return;
  }

  const childLayers = layer.children().objectEnumerator();
  let nextChild = childLayers.nextObject();
  while (nextChild) {
    const isLayerGroup = layer.addLayers !== undefined;
    // only remove layers that contain one or no layers
    if (isLayerGroup && nextChild.containsNoOrOneLayers()) {
      if (nextChild.containsOneLayer()) {
        if (
          NSStringFromClass(nextChild.class()).isEqualToString('MSLayerGroup')
        ) {
          nextChild.ungroup();
        }
      }
      // Some LayerGroups do not always behave as expected when empty
      if (
        NSStringFromClass(nextChild.class()).isEqualToString('MSLayerGroup')
      ) {
        if (nextChild.firstLayer() === null) {
          nextChild.removeFromParent();
        }
      }
    }
    nextChild = childLayers.nextObject();
  }
};

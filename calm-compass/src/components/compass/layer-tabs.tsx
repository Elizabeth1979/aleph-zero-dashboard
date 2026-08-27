type LayerTabsProps<T extends string> = {
  layers: readonly T[];
  selectedLayer?: T;
  onSelect: (layer: T) => void;
  className?: string;
};

export function LayerTabs<T extends string>({
  layers,
  selectedLayer = layers[0],
  onSelect,
  className,
}: LayerTabsProps<T>) {
  return (
    <nav className={className} aria-label="Compass layers">
      {layers.map((layer) => (
        <button
          key={layer}
          type="button"
          aria-pressed={layer === selectedLayer}
          onClick={() => onSelect(layer)}
        >
          {layer}
        </button>
      ))}
    </nav>
  );
}

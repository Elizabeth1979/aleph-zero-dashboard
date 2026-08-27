export type CompassViewBox = {
  width: number;
  height: number;
};

export type CompassNodeDefinition = {
  label: string;
  value: string;
};

export type CompassRingDefinition = {
  label: "Today" | "Your world" | "Setup";
  radius: number;
  startAngle: number;
  nodes: readonly CompassNodeDefinition[];
};

export type CompassNode = CompassNodeDefinition & {
  angle: number;
  radius: number;
  x: number;
  y: number;
};

export type CompassLayout = {
  centre: { x: number; y: number };
  nodeRadius: number;
  rings: Array<{
    label: CompassRingDefinition["label"];
    radius: number;
    nodes: CompassNode[];
  }>;
};

export const RING_DEFINITIONS: readonly CompassRingDefinition[] = [
  {
    label: "Today",
    radius: 145,
    startAngle: -90,
    nodes: [
      { label: "To-dos", value: "Open tasks" },
      { label: "Calendar", value: "Today and tomorrow" },
      { label: "Email", value: "Actionable messages" },
      { label: "New resources", value: "Saved for review" },
      { label: "System health", value: "Clear" },
      { label: "Someday", value: "Parked ideas" },
    ],
  },
  {
    label: "Your world",
    radius: 245,
    startAngle: -72,
    nodes: [
      { label: "Projects", value: "Next steps" },
      { label: "Knowledge", value: "Saved resources" },
      { label: "Portfolio", value: "Published work" },
      { label: "Progress", value: "Weekly review" },
      { label: "Ideas and learnings", value: "Captured insights" },
      { label: "Personal patterns", value: "What is working" },
    ],
  },
  {
    label: "Setup",
    radius: 340,
    startAngle: -82,
    nodes: [
      { label: "Automations", value: "Schedules" },
      { label: "Workers", value: "Planner, builder, reviewer" },
      { label: "Models", value: "Fallback routing" },
      { label: "Memory", value: "Synchronization" },
      { label: "Integrations", value: "Connected services" },
      { label: "Skills", value: "Reusable workflows" },
      { label: "Gateway", value: "Mac and VPS status" },
      { label: "Private access", value: "Protected" },
    ],
  },
];

const nodeRadius = 38;

export function calculateCompassLayout(viewBox: CompassViewBox): CompassLayout {
  const centre = { x: viewBox.width / 2, y: viewBox.height / 2 };

  return {
    centre,
    nodeRadius,
    rings: RING_DEFINITIONS.map((ring) => ({
      label: ring.label,
      radius: ring.radius,
      nodes: ring.nodes.map((node, index) => {
        const angle = ring.startAngle + (index * 360) / ring.nodes.length;
        const radians = (angle * Math.PI) / 180;

        return {
          ...node,
          angle,
          radius: nodeRadius,
          x: centre.x + ring.radius * Math.cos(radians),
          y: centre.y + ring.radius * Math.sin(radians),
        };
      }),
    })),
  };
}

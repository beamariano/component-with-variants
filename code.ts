// Figma Plugin Script to Create Navigation Component Variants
// Copy this entire code and paste it into Figma's plugin console

// --- Helpers ---

function rgb(r: number, g: number, b: number) {
  return { r: r / 255, g: g / 255, b: b / 255 };
}

// --- Color Palette ---

const palette = {
  light: {
    text: rgb(13, 13, 13),
    textDisabled: rgb(171, 171, 171),
    hoverBg: rgb(240, 240, 240),
    activeBg: rgb(229, 229, 229),
    iconBg: rgb(26, 63, 97),
    iconBgHover: rgb(37, 79, 115),
    iconBgActive: rgb(18, 47, 74),
    iconBgDisabled: rgb(163, 179, 194),
    iconStroke: rgb(123, 187, 191),
    iconStrokeDisabled: rgb(181, 207, 207),
    orangeAccent: rgb(237, 124, 48),
  },
  dark: {
    text: rgb(186, 216, 221),
    textHover: rgb(208, 232, 236),
    textDisabled: rgb(94, 130, 136),
    defaultBg: rgb(22, 54, 82),
    hoverBg: rgb(29, 68, 104),
    activeBg: rgb(15, 42, 64),
    disabledBg: rgb(26, 45, 63),
    iconBg: rgb(2, 102, 145),
    iconBgDisabled: rgb(26, 80, 101),
    iconStroke: rgb(123, 187, 191),
    iconStrokeDisabled: rgb(90, 144, 149),
    orangeAccent: rgb(237, 124, 48),
  },
};

// --- Variant Styles ---

const variantStyles = [
  {
    name: "Mode=Light, State=Default",
    bgColor: null,
    iconBg: palette.light.iconBg,
    iconStroke: palette.light.iconStroke,
    textColor: palette.light.text,
    yPos: 0,
  },
  {
    name: "Mode=Light, State=Hover",
    bgColor: palette.light.hoverBg,
    iconBg: palette.light.iconBgHover,
    iconStroke: palette.light.iconStroke,
    textColor: palette.light.text,
    yPos: 50,
  },
  {
    name: "Mode=Light, State=Active",
    bgColor: palette.light.activeBg,
    iconBg: palette.light.iconBgActive,
    iconStroke: palette.light.iconStroke,
    textColor: palette.light.text,
    isActive: true,
    accentColor: palette.light.orangeAccent,
    yPos: 100,
  },
  {
    name: "Mode=Light, State=Disabled",
    bgColor: null,
    iconBg: palette.light.iconBgDisabled,
    iconStroke: palette.light.iconStrokeDisabled,
    textColor: palette.light.textDisabled,
    yPos: 150,
  },
  {
    name: "Mode=Dark, State=Default",
    bgColor: palette.dark.defaultBg,
    iconBg: palette.dark.iconBg,
    iconStroke: palette.dark.iconStroke,
    textColor: palette.dark.text,
    yPos: 200,
  },
  {
    name: "Mode=Dark, State=Hover",
    bgColor: palette.dark.hoverBg,
    iconBg: palette.dark.iconBg,
    iconStroke: palette.dark.iconStroke,
    textColor: palette.dark.textHover,
    yPos: 250,
  },
  {
    name: "Mode=Dark, State=Active",
    bgColor: palette.dark.activeBg,
    iconBg: palette.dark.iconBg,
    iconStroke: palette.dark.iconStroke,
    textColor: palette.dark.text,
    isActive: true,
    accentColor: palette.dark.orangeAccent,
    yPos: 300,
  },
  {
    name: "Mode=Dark, State=Disabled",
    bgColor: palette.dark.disabledBg,
    iconBg: palette.dark.iconBgDisabled,
    iconStroke: palette.dark.iconStrokeDisabled,
    textColor: palette.dark.textDisabled,
    yPos: 350,
  },
];

// --- Icon SVG Paths (10x10 viewbox, stroke-based) ---

const iconPaths: Record<string, string> = {
  Home: "M 1 6 L 5 2 L 9 6 M 3 5.5 L 3 8.5 L 7 8.5 L 7 5.5",
  Featured: "M 5 1 L 6 4 L 9 4 L 7 6 L 8 9 L 5 7 L 2 9 L 3 6 L 1 4 L 4 4 Z",
  Popular: "M 1 7 L 3 5 L 5 6 L 7 3 M 5.5 3 L 7 3 L 7 4.5",
  "Recent uploads": "M 5 8 L 5 2 M 3 4 L 5 2 L 7 4",
  Categories:
    "M 1 1 L 4 1 L 4 4 L 1 4 Z M 6 1 L 9 1 L 9 4 L 6 4 Z M 1 6 L 4 6 L 4 9 L 1 9 Z M 6 6 L 9 6 L 9 9 L 6 9 Z",
  Topics: "M 3.5 1 L 2.5 9 M 6.5 1 L 5.5 9 M 1 3.5 L 9 3.5 M 1 6.5 L 9 6.5",
  Languages:
    "M 1 3 L 5 3 L 5 1 M 3 3 L 3 8 M 1.5 8 L 4.5 8 M 6 2 L 7.5 8 L 9 2 M 6.5 6 L 8.5 6",
  Countries: "M 2 1 L 2 9 M 2 1 L 8 3 L 2 5",
  Members:
    "M 3.5 3.5 C 3.5 2 6.5 2 6.5 3.5 C 6.5 5 3.5 5 3.5 3.5 M 2 9 C 2 6.5 8 6.5 8 9",
  Playlists: "M 1 2 L 7 2 M 1 5 L 7 5 M 1 8 L 5 8 M 7.5 7 L 9 8 L 7.5 9",
  Blog: "M 2 1 L 8 1 L 8 9 L 2 9 Z M 3.5 3.5 L 6.5 3.5 M 3.5 5.5 L 6.5 5.5 M 3.5 7.5 L 5 7.5",
  "Curator Voices": "M 1 1.5 L 8 1.5 L 8 6.5 L 4 6.5 L 2 8.5 L 2 6.5 L 1 6.5 Z",
  Partners:
    "M 1 5 L 4.5 5 L 5.5 5 L 9 5 M 2.5 3.5 C 2.5 2 4.5 2 4.5 3.5 M 5.5 3.5 C 5.5 2 7.5 2 7.5 3.5",
  "Upload media": "M 5 9 L 5 4 M 3 6 L 5 4 L 7 6 M 1 1 L 9 1",
  "My media": "M 1 1 L 9 1 L 9 9 L 1 9 Z M 4 3.5 L 4 6.5 L 7 5 Z",
  "My playlists":
    "M 1 2 L 6 2 M 1 5 L 6 5 M 1 8 L 6 8 M 8 5 L 8 7 C 8 8.5 9.5 8.5 9.5 7.5",
  "My history":
    "M 5 3 L 5 5 L 7 5 M 5 1 C 7.5 1 9 3 9 5 C 9 7 7.5 9 5 9 C 2.5 9 1 7 1 5 C 1 3 2.5 1 5 1",
  "My favorites":
    "M 5 3 C 4 1 1 1.5 1 4 C 1 6.5 5 9 5 9 C 5 9 9 6.5 9 4 C 9 1.5 6 1 5 3 Z",
  "About Cinemata":
    "M 5 1 C 7.5 1 9 3 9 5 C 9 7 7.5 9 5 9 C 2.5 9 1 7 1 5 C 1 3 2.5 1 5 1 M 5 4.5 L 5 7 M 5 3 L 5 3.5",
  "Editorial policy": "M 2.5 1 L 7.5 1 L 7.5 9 L 2.5 9 Z M 4 5.5 L 5 6.5 L 7 4",
  Contact: "M 1 2 L 9 2 L 9 8 L 1 8 Z M 1 2 L 5 5.5 L 9 2",
  "Help & Resources":
    "M 5 1 C 7.5 1 9 3 9 5 C 9 7 7.5 9 5 9 C 2.5 9 1 7 1 5 C 1 3 2.5 1 5 1 M 3.5 4 C 3.5 2.5 6.5 2.5 6.5 4 C 6.5 5.5 5 5 5 6.5 M 5 7.5 L 5 8",
  Donate:
    "M 5 3 C 4 1 1 1.5 1 4 C 1 6.5 5 9 5 9 C 5 9 9 6.5 9 4 C 9 1.5 6 1 5 3 Z M 3.5 5.5 L 6.5 5.5 M 5 4 L 5 7",
};

// --- Component Definitions ---

const componentNames = [
  "Home",
  "Featured",
  "Popular",
  "Recent uploads",
  "Categories",
  "Topics",
  "Languages",
  "Countries",
  "Members",
  "Playlists",
  "Blog",
  "Curator Voices",
  "Partners",
  "Upload media",
  "My media",
  "My playlists",
  "My history",
  "My favorites",
  "About Cinemata",
  "Editorial policy",
  "Contact",
  "Help & Resources",
  "Donate",
];

// --- Main ---

async function createAllComponentSets() {
  await figma.loadFontAsync({ family: "Inter", style: "Regular" });

  for (let i = 0; i < componentNames.length; i++) {
    const componentName = componentNames[i];
    const xOffset = 100 + i * 300;
    const svgPath = iconPaths[componentName];
    const createdFrames = [];

    for (const variant of variantStyles) {
      const frame = figma.createComponent();
      frame.name = variant.name;
      frame.resize(240, 40);
      frame.x = xOffset;
      frame.y = variant.yPos;

      if (variant.bgColor) {
        frame.fills = [{ type: "SOLID", color: variant.bgColor }];
      } else {
        frame.fills = [];
      }

      // Icon background circle
      const iconCircle = figma.createEllipse();
      iconCircle.name = "Icon Circle";
      iconCircle.resize(16, 16);
      iconCircle.fills = [{ type: "SOLID", color: variant.iconBg }];
      frame.appendChild(iconCircle);

      // Icon vector
      const icon = figma.createVector();
      icon.name = "Icon";
      icon.resize(10, 10);
      icon.vectorPaths = [{ windingRule: "NONE", data: svgPath }];
      icon.strokes = [{ type: "SOLID", color: variant.iconStroke }];
      icon.strokeWeight = 1.2;
      icon.fills = [];
      frame.appendChild(icon);

      // Text label
      const text = figma.createText();
      text.name = "Label";
      text.fontName = { family: "Inter", style: "Regular" };
      text.fontSize = 13;
      text.characters = componentName;
      text.fills = [{ type: "SOLID", color: variant.textColor }];
      frame.appendChild(text);

      // Auto-layout
      frame.layoutMode = "HORIZONTAL";
      frame.primaryAxisAlignItems = "CENTER";
      frame.counterAxisAlignItems = "CENTER";
      frame.itemSpacing = 6;
      frame.paddingLeft = 12;
      frame.paddingRight = 12;

      // Active state: 4px orange left border
      if (variant.isActive && variant.accentColor) {
        frame.strokes = [{ type: "SOLID", color: variant.accentColor }];
        frame.strokeTopWeight = 0;
        frame.strokeRightWeight = 0;
        frame.strokeBottomWeight = 0;
        frame.strokeLeftWeight = 4;
        frame.strokesIncludedInLayout = true;
      }

      // Lock size to 240x40
      frame.resize(240, 40);
      frame.primaryAxisSizingMode = "FIXED";
      frame.counterAxisSizingMode = "FIXED";

      createdFrames.push(frame);
      figma.currentPage.appendChild(frame);
    }

    const componentSet = figma.combineAsVariants(
      createdFrames,
      figma.currentPage,
    );
    componentSet.name = componentName;
  }

  figma.notify(
    `✓ Created ${componentNames.length} component sets with ${variantStyles.length} variants each!`,
  );
  figma.closePlugin();
}

createAllComponentSets();

// Figma Plugin Script to Create "Popular" Component Variants
// Copy this entire code and paste it into Figma's plugin console

async function createPopularComponentSet() {
  // Define all 6 variants
  const variants = [
    {
      name: "Mode=Light, State=Default",
      bgColor: null, // transparent
      iconBg: { r: 26 / 255, g: 63 / 255, b: 97 / 255 },
      iconStroke: { r: 123 / 255, g: 187 / 255, b: 191 / 255 },
      textColor: { r: 13 / 255, g: 13 / 255, b: 13 / 255 },
      yPos: 0,
    },
    {
      name: "Mode=Light, State=Hover",
      bgColor: { r: 240 / 255, g: 240 / 255, b: 240 / 255 },
      iconBg: { r: 37 / 255, g: 79 / 255, b: 115 / 255 },
      iconStroke: { r: 123 / 255, g: 187 / 255, b: 191 / 255 },
      textColor: { r: 13 / 255, g: 13 / 255, b: 13 / 255 },
      yPos: 50,
    },
    {
      name: "Mode=Light, State=Active",
      bgColor: { r: 229 / 255, g: 229 / 255, b: 229 / 255 },
      iconBg: { r: 18 / 255, g: 47 / 255, b: 74 / 255 },
      iconStroke: { r: 123 / 255, g: 187 / 255, b: 191 / 255 },
      textColor: { r: 13 / 255, g: 13 / 255, b: 13 / 255 },
      yPos: 100,
    },
    {
      name: "Mode=Dark, State=Default",
      bgColor: { r: 22 / 255, g: 54 / 255, b: 82 / 255 },
      iconBg: { r: 2 / 255, g: 102 / 255, b: 145 / 255 },
      iconStroke: { r: 123 / 255, g: 187 / 255, b: 191 / 255 },
      textColor: { r: 186 / 255, g: 216 / 255, b: 221 / 255 },
      yPos: 150,
    },
    {
      name: "Mode=Dark, State=Hover",
      bgColor: { r: 29 / 255, g: 68 / 255, b: 104 / 255 },
      iconBg: { r: 2 / 255, g: 102 / 255, b: 145 / 255 },
      iconStroke: { r: 123 / 255, g: 187 / 255, b: 191 / 255 },
      textColor: { r: 208 / 255, g: 232 / 255, b: 236 / 255 },
      yPos: 200,
    },
    {
      name: "Mode=Dark, State=Active",
      bgColor: { r: 15 / 255, g: 42 / 255, b: 64 / 255 },
      iconBg: { r: 2 / 255, g: 102 / 255, b: 145 / 255 },
      iconStroke: { r: 123 / 255, g: 187 / 255, b: 191 / 255 },
      textColor: { r: 186 / 255, g: 216 / 255, b: 221 / 255 },
      yPos: 250,
    },
  ];

  const createdFrames = [];

  // Create each variant frame
  for (const variant of variants) {
    // Create the main frame
    const frame = figma.createComponent();
    frame.name = variant.name;
    frame.resize(240, 40);
    frame.x = 100;
    frame.y = variant.yPos;

    // Set background color
    if (variant.bgColor) {
      frame.fills = [{ type: "SOLID", color: variant.bgColor }];
    } else {
      frame.fills = []; // transparent
    }

    // Create icon circle
    const iconCircle = figma.createEllipse();
    iconCircle.name = "Icon Circle";
    iconCircle.resize(16, 16);
    iconCircle.x = 12;
    iconCircle.y = 12;
    iconCircle.fills = [{ type: "SOLID", color: variant.iconBg }];
    frame.appendChild(iconCircle);

    // Create chart icon (simplified as vector)
    const chartIcon = figma.createVector();
    chartIcon.name = "Chart Icon";
    chartIcon.x = 15;
    chartIcon.y = 15;
    chartIcon.resize(10, 10);

    // Create SVG path for chart (line with arrow)
    const svgPath = "M 1 7 L 3 5 L 5 6 L 7 3 M 5.5 3 L 7 3 L 7 4.5";
    chartIcon.vectorPaths = [
      {
        windingRule: "NONE",
        data: svgPath,
      },
    ];
    chartIcon.strokes = [{ type: "SOLID", color: variant.iconStroke }];
    chartIcon.strokeWeight = 1.2;
    frame.appendChild(chartIcon);

    // Create text label
    const text = figma.createText();
    text.name = "Label";

    // Load Inter font
    await figma.loadFontAsync({ family: "Inter", style: "Regular" });
    text.fontName = { family: "Inter", style: "Regular" };
    text.fontSize = 13;
    text.characters = "Popular";
    text.fills = [{ type: "SOLID", color: variant.textColor }];
    text.x = 34;
    text.y = 13.5;
    frame.appendChild(text);

    // Add auto-layout for better alignment
    frame.layoutMode = "HORIZONTAL";
    frame.primaryAxisAlignItems = "CENTER";
    frame.counterAxisAlignItems = "CENTER";
    frame.itemSpacing = 6;
    frame.paddingLeft = 12;
    frame.paddingRight = 12;

    createdFrames.push(frame);

    // Add to current page
    figma.currentPage.appendChild(frame);
  }

  // Create component set from all frames
  const componentSet = figma.combineAsVariants(
    createdFrames,
    figma.currentPage,
  );
  componentSet.name = "Popular";

  figma.notify("✓ Created 'Popular' component set with 6 variants!");
  figma.closePlugin();
}

// Run the function
createPopularComponentSet();

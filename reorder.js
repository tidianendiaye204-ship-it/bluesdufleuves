import fs from "fs";
import path from "path";

const file = path.join(process.cwd(), "src", "data", "festival-content.ts");
let content = fs.readFileSync(file, "utf8");

// Find where galleryImages starts
const match = content.match(/export const galleryImages = \[\s*([\s\S]*?)\];/);
if (match) {
  const inner = match[1];

  // Split into individual object blocks
  // Since objects are formatted nicely with { ... }, we can split by '},'
  let blocks = inner
    .split("},")
    .map((b) => b.trim() + (b.trim() !== "" ? " }," : ""))
    .filter((b) => b.length > 5);

  // Also fix the last block which might just end in '}'
  const lastBlockIndex = blocks.length - 1;
  if (blocks[lastBlockIndex].endsWith(" }, },")) {
    blocks[lastBlockIndex] = blocks[lastBlockIndex].replace(" }, },", " }");
  } else if (blocks[lastBlockIndex].endsWith(" } },")) {
    blocks[lastBlockIndex] = blocks[lastBlockIndex].replace(" } },", " }");
  }

  // A better approach is to use eval since it's a simple array of objects
  // Wait, `fleuveImg` is a variable. eval will fail. Let's just do a regex to extract objects.
  const objectRegex = /\{[^}]+\}/g;
  let items = [];
  let m;
  while ((m = objectRegex.exec(inner)) !== null) {
    items.push(m[0]);
  }

  // We separate the new ones (gal10 to gal39, id 16 to 45) from the rest
  const newImages = items.filter((item) => {
    const idMatch = item.match(/id:\s*(\d+)/);
    if (idMatch) {
      const id = parseInt(idMatch[1]);
      return id >= 16;
    }
    return false;
  });

  const oldImages = items.filter((item) => {
    const idMatch = item.match(/id:\s*(\d+)/);
    if (idMatch) {
      const id = parseInt(idMatch[1]);
      return id < 16;
    }
    return true;
  });

  // Recombine: new images first, then old images
  const reordered = [...newImages, ...oldImages].map((i) => "  " + i).join(",\n") + "\n";

  const newContent = content.replace(match[1], "\n" + reordered);
  fs.writeFileSync(file, newContent, "utf8");
  console.log("Reordered successfully.");
} else {
  console.log("Could not find galleryImages array.");
}

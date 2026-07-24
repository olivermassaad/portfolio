import { readdir, readFile, rename, stat, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const detailsPath = path.join(root, "lib", "home-details.js");
const galleryPath = path.join(root, "public", "gallery");
const deleteOriginals = process.argv.includes("--delete-originals");

async function collectImages(dir, prefix = "") {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    const absolute = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "fillers") continue;
      files.push(...(await collectImages(absolute, relative)));
      continue;
    }

    if (/\.(?:png|jpe?g)$/i.test(entry.name)) {
      files.push(relative.replace(/\\/g, "/"));
    }
  }

  return files;
}

let details = await readFile(detailsPath, "utf8");
const relativeSources = await collectImages(galleryPath);

let beforeBytes = 0;
let afterBytes = 0;
let converted = 0;
const failed = [];

for (const relativeSource of relativeSources) {
  const inputPath = path.join(galleryPath, relativeSource);
  const relativeOutput = relativeSource.replace(/\.(?:png|jpe?g)$/i, ".webp");
  const outputPath = path.join(galleryPath, relativeOutput);
  const temporaryPath = `${outputPath}.tmp`;

  try {
    const inputStats = await stat(inputPath);

    await sharp(inputPath, { limitInputPixels: false })
      .rotate()
      .resize({
        width: 1600,
        height: 1600,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 78,
        effort: 5,
        smartSubsample: true,
      })
      .toFile(temporaryPath);

    const outputStats = await stat(temporaryPath);
    await unlink(outputPath).catch(() => {});
    await rename(temporaryPath, outputPath);

    beforeBytes += inputStats.size;
    afterBytes += outputStats.size;
    converted += 1;

    details = details
      .split(`/gallery/${relativeSource}`)
      .join(`/gallery/${relativeOutput}`);

    if (deleteOriginals && inputPath !== outputPath) {
      await unlink(inputPath).catch((error) => {
        console.warn(`Could not remove ${relativeSource}: ${error.code}`);
      });
    }
  } catch (error) {
    failed.push(`${relativeSource} (${error.code || error.message})`);
    await unlink(temporaryPath).catch(() => {});
  }
}

await writeFile(detailsPath, details);

const savedBytes = beforeBytes - afterBytes;
const percentage = beforeBytes ? Math.round((savedBytes / beforeBytes) * 100) : 0;

console.log(
  `Optimized ${converted} gallery images: ${(beforeBytes / 1024 / 1024).toFixed(1)} MB → ${(afterBytes / 1024 / 1024).toFixed(1)} MB (${percentage}% smaller).`,
);

if (failed.length) {
  console.warn(`Failed ${failed.length} files: ${failed.join(", ")}`);
}

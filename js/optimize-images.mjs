import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const jobs = [
  {
    input: 'IMG/imagen1.jpg',
    outputs: [
      { width: 768, suffix: '768', quality: 78 },
      { width: 1280, suffix: '1280', quality: 78 },
    ],
  },
  {
    input: 'IMG/PagServicios/ImagenServicios.jpg',
    outputs: [
      { width: 768, suffix: '768', quality: 76 },
      { width: 1280, suffix: '1280', quality: 76 },
    ],
  },
  {
    input: 'IMG/imagenprincipal.jpeg',
    outputs: [
      { width: 1200, suffix: '1200', quality: 78 },
    ],
  },
];

for (const job of jobs) {
  if (!fs.existsSync(job.input)) continue;

  for (const output of job.outputs) {
    const parsed = path.parse(job.input);
    const target = path.join(parsed.dir, `${parsed.name}-${output.suffix}.webp`);

    await sharp(job.input)
      .resize({ width: output.width, withoutEnlargement: true })
      .webp({ quality: output.quality, effort: 5 })
      .toFile(target);

    console.log(`optimized: ${target}`);
  }
}

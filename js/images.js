// Committed display variants; full-resolution originals remain available in the viewer.
const variants = {
  'pigmie-current.webp': [480],
  'talentrank.webp': [480, 960],
  'agroconnect.webp': [480, 960],
};

export function imageSources(filename, width, prefix = 'assets/projects/') {
  if (!variants[filename]) return '';
  return [
    ...variants[filename].map(size => `${prefix}${filename.replace('.webp', `-${size}.webp`)} ${size}w`),
    `${prefix}${filename} ${width}w`,
  ].join(', ');
}

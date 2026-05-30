const d3 = require('d3-geo');

const projection = d3.geoMercator()
  .scale(145)
  .center([11, 20])
  .translate([500, 250]);

const points = {
  na: [-100, 48],     // USA & Canada middle
  eu: [14, 48],       // Europe middle
  ru: [95, 60],       // Russia middle
  cn: [104, 35],      // China middle
  kr: [128, 36],      // South Korea middle
  nz: [174, -41]      // New Zealand middle
};

console.log("PROJECTED COORDINATES (1000 x 500):");
for (const [name, coords] of Object.entries(points)) {
  const projected = projection(coords);
  console.log(`${name}: x = ${projected[0].toFixed(2)}, y = ${projected[1].toFixed(2)}`);
}

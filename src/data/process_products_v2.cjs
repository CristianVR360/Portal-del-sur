const fs = require('fs');

const rawReference = {
    "AJI CREMA": ["180 g", "800 g"],
    "AJI ORO": ["100 g", "350 g", "400 g", "300 g"],
    "AJI SALSA": ["180 g", "800 g"],
    "AJO EN POLVO": ["15 g", "40 g", "30 g"],
    "ALIÑO COMPLETO": ["15 g", "40 g", "80 g", "30 g"],
    "ALMENDRAS": ["70 g"],
    "ALMIDON DE MAIZ": ["220 g", "400 g", "800 g"],
    "BICARBONATO": ["40 g", "100 g"],
    "BOLSA AVENA INSTANTANEA": ["400 g", "700 g"],
    "BOLSA AVENA MACHACADA": ["400 g", "800 g"],
    "BOLSA AVENA TRADICIONAL": ["400 g"],
    "BOLSA OREGANO ENTERO": ["250 g"],
    "PEPINILLO": ["180 g", "300 g", "400 g"],
    "PICKLES": ["180 g", "400 g", "800 g", "500 g"],
    "LINAZA MOLIDA": ["180 g", "400 g"],
    "MANI SALADO": ["130 g", "350 g"],
    "MANI SIN SAL": ["130 g", "350 g"],
    "MERKEN": ["15 g", "40 g"],
    "MOSTACILLA PALITO": ["20 g", "80 g"],
    "MOSTACILLA REDONDA": ["20 g", "80 g"],
    "OREGANO ENTERO": ["15 g", "35 g", "150 g"],
    "P.NEGRA ENTERA": ["15 g", "35 g", "45 g"],
    "P.NEGRA MOLIDA": ["15 g", "35 g", "45 g"]
};

// Normalize names for matching
function normalize(str) {
    if (!str) return "";
    return str.toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[.,]/g, "")
        .replace(/\bBOLSA \b|\bCAJA \b|\bFRASCO \b|\bPOTE \b/g, "")
        .replace(/\bDE \b|\bCON \b|\bY \b/g, " ")
        .replace(/\s+/g, " ")
        .replace("AJI SALSA", "SALSA AJI")
        .replace(" AJI", " AJI")
        .trim();
}

// Group reference by base name
const processedReference = {};
for (const key in rawReference) {
    let base = normalize(key);
    if (base === "SALSA AJI") base = "SALSA AJI"; // Placeholder for specific logic if needed
    if (!processedReference[base]) processedReference[base] = new Set();
    rawReference[key].forEach(f => processedReference[base].add(f));
}

const productsFile = 'c:/Users/eugenio/Desktop/ASTRA360/Github/portal-del-sur/Portal-del-sur/src/data/products.js';
const content = fs.readFileSync(productsFile, 'utf8');

const productBlocksRegex = /\{[\s\S]*?id:\s*(\d+),[\s\S]*?\}/g;

const updates = [];
let match;
while ((match = productBlocksRegex.exec(content)) !== null) {
    const block = match[0];
    const idStr = match[1];

    const nameMatch = block.match(/name:\s*'([\s\S]*?)'/);
    const formatMatch = block.match(/format:\s*'([\s\S]*?)'/);
    const descMatch = block.match(/description:\s*'([\s\S]*?)'/);

    if (!nameMatch || !formatMatch || !descMatch) continue;

    const name = nameMatch[1];
    const format = formatMatch[1];
    const description = descMatch[1];

    const normName = normalize(name);
    let matchingBase = null;

    // Custom heuristics
    let searchName = normName;
    if (normName.includes("PIMIENTA NEGRA ENTERA")) searchName = "P NEGRA ENTERA";
    if (normName.includes("PIMIENTA NEGRA MOLIDA")) searchName = "P NEGRA MOLIDA";
    if (normName.includes("MERQUEN")) searchName = "MERKEN";

    for (const base in processedReference) {
        if (searchName === base || searchName.includes(base) || base.includes(searchName)) {
            matchingBase = base;
            break;
        }
    }

    if (matchingBase) {
        const allFormats = Array.from(processedReference[matchingBase]);

        // Extract gramaje from current product (from format field preferably)
        const currentG = (format.match(/(\d+)/) || name.match(/(\d+)/) || [])[1];

        const others = allFormats.filter(f => {
            const g = f.match(/(\d+)/)[1];
            return g !== currentG;
        });

        if (others.length > 0) {
            // Sort formats numerically for better presentation
            others.sort((a, b) => parseInt(a) - parseInt(b));

            const newDesc = `${description}\\n\\nTambién disponible en: ${others.join(", ")}`;
            updates.push({
                id: idStr,
                oldLine: `description: '${description}',`,
                newLine: `description: '${newDesc}',`
            });
        }
    }
}

// Since multiple products might have the same description line, 
// we need to be careful with replace. 
// We should find the line number for each block.
const lines = content.split('\n');
const finalChanges = [];

for (const update of updates) {
    // Find the block starting with id: update.id
    let lineIdx = -1;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`id: ${update.id},`) || lines[i].includes(`id: ${update.id}`)) {
            // Find the description line in this block (next few lines)
            for (let j = i; j < i + 10 && j < lines.length; j++) {
                if (lines[j].includes(update.oldLine)) {
                    lineIdx = j;
                    break;
                }
            }
        }
        if (lineIdx !== -1) break;
    }

    if (lineIdx !== -1) {
        finalChanges.push({
            startLine: lineIdx + 1,
            endLine: lineIdx + 1,
            targetContent: lines[lineIdx].trim(),
            replacementContent: update.newLine.padStart(update.newLine.length + lines[lineIdx].indexOf('description'))
        });
    }
}

console.log(JSON.stringify(finalChanges, null, 2));

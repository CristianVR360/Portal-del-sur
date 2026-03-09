const fs = require('fs');

const reference = {
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

// Map reference keys to normalized base names
const baseMap = {};
for (const key in reference) {
    let normalized = key.toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace("BOLSA ", "")
        .replace("CAJA ", "")
        .replace("FRASCO ", "")
        .replace("POTE ", "")
        .trim();

    // Custom mappings for consistency
    if (normalized === "P.NEGRA ENTERA") normalized = "PIMIENTA NEGRA ENTERA";
    if (normalized === "P.NEGRA MOLIDA") normalized = "PIMIENTA NEGRA MOLIDA";
    if (normalized === "MERKEN") normalized = "MERQUEN";
    if (normalized === "AJI SALSA") normalized = "SALSA DE AJI";

    if (!baseMap[normalized]) baseMap[normalized] = [];
    baseMap[normalized].push(key);
}

const productsFile = 'c:/Users/eugenio/Desktop/ASTRA360/Github/portal-del-sur/Portal-del-sur/src/data/products.js';
const content = fs.readFileSync(productsFile, 'utf8');

// Regex to find each product block
const productRegex = /\{\s*id:\s*(\d+),[\s\S]*?name:\s*'([\s\S]*?)',[\s\S]*?description:\s*'([\s\S]*?)',[\s\S]*?format:\s*'([\s\S]*?)'[\s\S]*?\}/g;

function normalize(str) {
    return str.toUpperCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace("BOLSA ", "")
        .replace("CAJA ", "")
        .replace("FRASCO ", "")
        .replace("POTE ", "")
        .trim();
}

function extractGramaje(str) {
    const m = str.match(/(\d+)\s*(g|gr|grs|cc|un)/i);
    return m ? m[1] : null;
}

const updates = [];
let match;
while ((match = productRegex.exec(content)) !== null) {
    const id = match[1];
    const name = match[2];
    const description = match[3];
    const format = match[4];

    const normName = normalize(name);
    // Find matching base in baseMap
    let foundBaseKey = null;
    for (const base in baseMap) {
        if (normName.includes(base) || base.includes(normName)) {
            // Pick the first one for simplicity, or handle multiples
            foundBaseKey = baseMap[base][0];
            break;
        }
    }

    if (foundBaseKey) {
        const currentGramaje = extractGramaje(format) || extractGramaje(name);
        if (currentGramaje) {
            const allFormats = reference[foundBaseKey];
            // Filter out current format
            const others = allFormats.filter(f => {
                const fg = extractGramaje(f);
                return fg !== currentGramaje;
            });

            if (others.length > 0) {
                updates.push({
                    id,
                    targetContent: `description: '${description}',`,
                    replacementContent: `description: '${description}\\n\\nTambién disponible en: ${others.join(", ")}',`
                });
            }
        }
    }
}

console.log(JSON.stringify(updates, null, 2));

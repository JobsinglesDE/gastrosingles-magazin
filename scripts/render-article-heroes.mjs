#!/usr/bin/env node
/**
 * render-article-heroes.mjs — Featured-Images für Article-Pillars
 * FLUX.2-pro + Filter 1+3 (Warm Classic + Film Grain), 1200x640.
 *
 * Usage: render-article-heroes.mjs [slug1 slug2 ...]
 *   ohne args → alle articles ohne featuredImage rendern
 */
import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import sharp from 'sharp';

const REPO = '/docker/projects/gastrosingles-magazin';
const W = 1200, H = 640;
const KEY = process.env.TOGETHER_API_KEY;
if (!KEY) { console.error('TOGETHER_API_KEY fehlt'); process.exit(1); }

const BASE = 'photorealistic, Canon R5 85mm f/1.4, natural skin texture with visible pores and subtle wrinkles, golden hour warm light, shallow depth of field, no plastic look, documentary photography style, character faces with personality, no AI smoothness';

const PROMPTS = {
  'sommelier-sucht-frau': `Elegant German Sommelier in dark vest and apron pouring red wine for a smiling woman at a candlelit fine-dining restaurant table, intimate eye contact between them, vintage wine bottles softly blurred in background, warm amber lighting from candle and pendant lamps, wooden interior. ${BASE}. No text, no logos, no readable labels.`,
  'sous-chef-sucht-frau': `Sous Chef in white kitchen jacket (slightly stained, authentic) leaning over restaurant pass talking to female partner who is waiting at the kitchen counter after service, dim warm kitchen light, stainless steel surfaces softly reflecting, tired but happy expressions, late night atmosphere. ${BASE}. No text, no logos, no chef hat cliché.`,
  'wirt-sucht-frau': `German Landgasthof innkeeper (Wirt) mid-40s with rolled up shirt sleeves behind a wooden bar counter in a traditional Bavarian or Swabian Gasthaus, talking warmly to a woman sitting on a bar stool with a glass of wine, deer antlers and old beer mugs on rustic wood walls, evening warm lamp light, near-empty pub after service. ${BASE}. No text, no readable signage, authentic rural German interior.`,
  'hochzeit-im-restaurant': `Newlywed couple sharing a quiet moment at a beautifully set wedding dinner table inside an upscale restaurant in Germany, bride in elegant white dress, groom in dark suit, candles and flower arrangements on long table, blurred wedding guests in background, warm golden chandelier light, restaurant kitchen visible through open pass with chefs working. ${BASE}. No text, no logos.`,
  'beziehung-mit-koch-realitaet': `Female partner in casual home clothes sitting alone at a small kitchen table in a German apartment after midnight, half-eaten dinner cold on plate, looking quietly at phone, warm lamp light, view through window to dark street, intimate domestic scene of waiting partner, melancholic but not sad atmosphere. ${BASE}. No text, no logos.`,
  'dating-im-schichtdienst-gastro': `Young chef in white kitchen jacket sitting alone on the back steps of a restaurant after midnight, holding smartphone in one hand, exhausted but reading message with subtle smile, dimly lit alley behind him with warm window light spilling out, late-night urban German city scene, authentic post-service atmosphere. ${BASE}. No text, no logos, no readable screens.`,
  'kennenlernen-online-dating-gastronomie': `Young restaurant service woman in dark uniform during her break, sitting on a wooden bench inside a cozy restaurant interior, smiling while looking at her smartphone, warm pendant lighting, blurred kitchen pass in background with one chef working, intimate moment of texting between shifts. ${BASE}. No text, no readable screens, no logos.`,
  'erstes-date-gastronomie-schichten': `Young German couple sitting across from each other at a small cafe table on a quiet weekday morning, large windows with soft daylight, two coffees and pastries on table, intimate first-date conversation atmosphere, woman in casual dress and man in plain clothes (not in chef uniform), warm cozy German cafe interior with wooden tables. ${BASE}. No text, no logos, daytime light.`,
};

async function flux(prompt, a = 0) {
  const res = await fetch('https://api.together.xyz/v1/images/generations', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'black-forest-labs/FLUX.2-pro', prompt, width: W, height: H, n: 1 }),
  });
  if (res.status === 429 && a < 6) { await new Promise(r => setTimeout(r, 4000 * Math.pow(1.6, a) + Math.random()*2000)); return flux(prompt, a+1); }
  if (!res.ok) throw new Error(`Together ${res.status}: ${(await res.text()).slice(0,200)}`);
  const d = await res.json();
  const url = d.data?.[0]?.url;
  if (!url) throw new Error('No URL');
  return Buffer.from(await (await fetch(url)).arrayBuffer());
}

// Filter 1+3: Warm Classic + Film Grain
async function filter(buf) {
  const { width: w, height: h } = await sharp(buf).metadata();
  const g = Buffer.alloc(w * h * 3);
  for (let i = 0; i < g.length; i++) g[i] = 128 + Math.floor((Math.random()-0.5)*35);
  const grain = await sharp(g, { raw: { width: w, height: h, channels: 3 } }).png().toBuffer();
  return sharp(buf)
    .modulate({ brightness: 1.03, saturation: 0.80 })
    .tint({ r: 255, g: 228, b: 192 })
    .gamma(1.05)
    .composite([{ input: grain, blend: 'overlay', opacity: 0.13 }])
    .webp({ quality: 85 }).toBuffer();
}

const args = process.argv.slice(2);
const slugs = args.length ? args : Object.keys(PROMPTS);

(async () => {
  for (const slug of slugs) {
    const prompt = PROMPTS[slug];
    if (!prompt) { console.error(`✗ ${slug}: no prompt defined`); continue; }
    const outDir = path.join(REPO, 'public/images/articles', slug);
    const outPath = path.join(outDir, 'featuredImage.webp');
    if (fs.existsSync(outPath)) { console.log(`= ${slug} (exists)`); continue; }
    try {
      console.log(`→ ${slug} rendering ...`);
      const raw = await flux(prompt);
      const styled = await filter(raw);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(outPath, styled);
      console.log(`✓ ${slug} (${(fs.statSync(outPath).size/1024).toFixed(0)} KB)`);
    } catch (e) {
      console.error(`✗ ${slug}: ${e.message}`);
    }
  }
})();

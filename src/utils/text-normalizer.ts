/**
 * Text normalization utilities for language detection
 */

/**
 * Normalize text for language detection
 * @param text - Raw input text
 * @returns Normalized text
 */
export function normalizeText(text: string | null | undefined): string {
   if (!text || typeof text !== 'string') {
      return '';
   }

   return (
      text
         // Convert to lowercase
         .toLowerCase()
         // Remove URLs
         .replace(/https?:\/\/\S+/g, '')
         // Remove email addresses
         .replace(/\S+@\S+\.\S+/g, '')
         // Remove phone numbers
         .replace(/\+?[\d\s-]{10,}/g, '')
         // Remove emojis
         .replace(/[\u{1F600}-\u{1F64F}]/gu, '')
         .replace(/[\u{1F300}-\u{1F5FF}]/gu, '')
         .replace(/[\u{1F680}-\u{1F6FF}]/gu, '')
         .replace(/[\u{2600}-\u{26FF}]/gu, '')
         .replace(/[\u{1F900}-\u{1F9FF}]/gu, '')
         // Normalize whitespace
         .replace(/\s+/g, ' ')
         .trim()
   );
}

/**
 * Augment text with common variations for training
 * @param text - Original text
 * @param lang - Language code
 * @returns Array of text variations
 */
export function augmentText(text: string, lang: string): string[] {
   const variations: string[] = [text];
   const normalized = normalizeText(text);

   if (normalized !== text && normalized.length > 0) {
      variations.push(normalized);
   }

   // Remove punctuation variant
   const noPunctuation = text.replace(/[^\w\s]/g, '');
   if (noPunctuation !== text && noPunctuation.length > 0) {
      variations.push(noPunctuation);
   }

   // Language-specific abbreviations
   if (lang === 'es') {
      const abbreviated = text
         .replace(/\bque\b/gi, 'q')
         .replace(/\bpor\b/gi, 'x')
         .replace(/\bporque\b/gi, 'xq')
         .replace(/\bpara\b/gi, 'pa')
         .replace(/\btambién\b/gi, 'tmb');

      if (abbreviated !== text) {
         variations.push(abbreviated);
      }
   }

   if (lang === 'en') {
      const abbreviated = text
         .replace(/\byou\b/gi, 'u')
         .replace(/\bare\b/gi, 'r')
         .replace(/\bfor\b/gi, '4')
         .replace(/\bbefore\b/gi, 'b4')
         .replace(/\btomorrow\b/gi, 'tmrw');

      if (abbreviated !== text) {
         variations.push(abbreviated);
      }
   }

   if (lang === 'fr') {
      const abbreviated = text
         .replace(/\bsalut\b/gi, 'slt')
         .replace(/\bbonjour\b/gi, 'bjr')
         .replace(/\bbonsoir\b/gi, 'bsr')
         .replace(/\bje ne sais pas\b/gi, 'jsp')
         .replace(/\bje t'aime\b/gi, 'jtm')
         .replace(/\bt'inquiète\b/gi, 'tkt')
         .replace(/\bmaintenant\b/gi, 'mtn')
         .replace(/\btoujours\b/gi, 'tjrs')
         .replace(/\bs'il te plaît\b/gi, 'stp')
         .replace(/\bs'il vous plaît\b/gi, 'svp')
         .replace(/\bpourquoi\b/gi, 'pk')
         .replace(/\bbeaucoup\b/gi, 'bcp');

      if (abbreviated !== text) {
         variations.push(abbreviated);
      }
   }

   if (lang === 'it') {
      const abbreviated = text
         .replace(/\bcomunque\b/gi, 'cmq')
         .replace(/\bperché\b/gi, 'xké')
         .replace(/\bperche\b/gi, 'xche')
         .replace(/\bnon\b/gi, 'nn')
         .replace(/\bche\b/gi, 'ke')
         .replace(/\bquando\b/gi, 'qnd')
         .replace(/\bquanto\b/gi, 'qnt')
         .replace(/\bqualcosa\b/gi, 'qlc')
         .replace(/\bqualcuno\b/gi, 'qlcn')
         .replace(/\btutto\b/gi, 'tt')
         .replace(/\bti voglio bene\b/gi, 'tvb')
         .replace(/\bgrazie\b/gi, 'grz');

      if (abbreviated !== text) {
         variations.push(abbreviated);
      }
   }

   if (lang === 'pt') {
      const abbreviated = text
         .replace(/\bvoce\b/gi, 'vc')
         .replace(/\bvocê\b/gi, 'vc')
         .replace(/\btambem\b/gi, 'tb')
         .replace(/\btambém\b/gi, 'tb')
         .replace(/\bporque\b/gi, 'pq')
         .replace(/\bquando\b/gi, 'qnd')
         .replace(/\bquanto\b/gi, 'qnt')
         .replace(/\bmuito\b/gi, 'mt')
         .replace(/\bnada\b/gi, 'nd')
         .replace(/\btudo\b/gi, 'td')
         .replace(/\bagora\b/gi, 'agr')
         .replace(/\bhoje\b/gi, 'hj')
         .replace(/\bdepois\b/gi, 'dps')
         .replace(/\bbeleza\b/gi, 'blz')
         .replace(/\bvaleu\b/gi, 'vlw')
         .replace(/\bobrigado\b/gi, 'obg')
         .replace(/\bobrigada\b/gi, 'obg');

      if (abbreviated !== text) {
         variations.push(abbreviated);
      }
   }

   if (lang === 'de') {
      const abbreviated = text
         .replace(/\bliebe grüße\b/gi, 'lg')
         .replace(/\bliebe gruesse\b/gi, 'lg')
         .replace(/\bhab dich lieb\b/gi, 'hdl')
         .replace(/\bhab dich ganz doll lieb\b/gi, 'hdgdl')
         .replace(/\bgute nacht\b/gi, 'gn8')
         .replace(/\bvielleicht\b/gi, 'vllt')
         .replace(/\beventuell\b/gi, 'evtl')
         .replace(/\beigentlich\b/gi, 'eigtl')
         .replace(/\birgendwie\b/gi, 'iwie')
         .replace(/\birgendwann\b/gi, 'iwann')
         .replace(/\birgendwo\b/gi, 'iwo')
         .replace(/\birgendwas\b/gi, 'iwas')
         .replace(/\bkeine ahnung\b/gi, 'ka')
         .replace(/\bkein plan\b/gi, 'kp')
         .replace(/\bkein bock\b/gi, 'kb')
         .replace(/\bdanke\b/gi, 'thx')
         .replace(/\bübrigens\b/gi, 'btw')
         .replace(/\bauf jeden fall\b/gi, 'auf jeden');

      if (abbreviated !== text) {
         variations.push(abbreviated);
      }
   }

   return variations;
}

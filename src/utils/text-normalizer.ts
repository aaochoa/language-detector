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

   return variations;
}

export function hash(pws) {
  let hash = 0, i, chr, len;
  if (pws.length === 0) return hash;
  for (i = 0, len = pws.length; i < len; i++) {
     chr   = pws.charCodeAt(i);
     hash  = ((hash << 5) - hash) + chr;
     hash |= 0; // Convert to 32bit integer
   }
   return hash;
}

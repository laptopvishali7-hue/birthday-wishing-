import { WishData, DEFAULT_WISH_DATA } from '../types';

const STORAGE_KEY_PREFIX = 'birthday_wish_';
const MY_WISHES_KEY = 'my_created_wishes_list';

// Save wish to localStorage
export function saveWishToStorage(wish: WishData): void {
  try {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${wish.id}`, JSON.stringify(wish));
    
    // Also add to created list
    const existingList = getCreatedWishesList();
    const updated = [wish, ...existingList.filter(w => w.id !== wish.id)];
    localStorage.setItem(MY_WISHES_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('LocalStorage error:', err);
  }
}

export function getWishFromStorage(id: string): WishData | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_PREFIX}${id}`);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

export function getCreatedWishesList(): WishData[] {
  try {
    const raw = localStorage.getItem(MY_WISHES_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return [DEFAULT_WISH_DATA];
}

export function deleteWishFromStorage(id: string): WishData[] {
  try {
    localStorage.removeItem(`${STORAGE_KEY_PREFIX}${id}`);
    const existingList = getCreatedWishesList();
    const updated = existingList.filter((w) => w.id !== id);
    localStorage.setItem(MY_WISHES_KEY, JSON.stringify(updated));
    return updated.length > 0 ? updated : [DEFAULT_WISH_DATA];
  } catch (err) {
    console.warn('LocalStorage error:', err);
    return [DEFAULT_WISH_DATA];
  }
}

// Compress WishData to base64 string for URL sharing
export function encodeWishToHash(wish: WishData): string {
  try {
    const jsonStr = JSON.stringify(wish);
    // encode UTF-8 safely
    const bytes = new TextEncoder().encode(jsonStr);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  } catch (e) {
    console.error('Encode hash error:', e);
    return '';
  }
}

// Decode WishData from base64 string
export function decodeWishFromHash(hashStr: string): WishData | null {
  try {
    const cleaned = hashStr.replace(/^#wish=/, '').replace(/^#/, '');
    if (!cleaned) return null;
    const binary = atob(cleaned);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const jsonStr = new TextDecoder().decode(bytes);
    return JSON.parse(jsonStr) as WishData;
  } catch (e) {
    console.error('Decode hash error:', e);
    return null;
  }
}

// Generate direct link with custom name query param (e.g., index.html?name=Rahul or ?name=Rahul)
export function getCustomizedNameUrl(name: string): string {
  const cleanName = name.trim() || 'Friend';
  const baseUrl = window.location.origin + window.location.pathname;
  return `${baseUrl}?name=${encodeURIComponent(cleanName)}`;
}

// Generate direct full wish link
export function getShareableWishUrl(wish: WishData): string {
  saveWishToStorage(wish);
  const hash = encodeWishToHash(wish);
  const baseUrl = window.location.origin + window.location.pathname;
  const nameParam = wish.recipientName ? `&name=${encodeURIComponent(wish.recipientName)}` : '';
  return `${baseUrl}?id=${wish.id}${nameParam}#wish=${hash}`;
}

// WhatsApp Share link for customized name
export function getWhatsAppShareNameUrl(name: string): string {
  const link = getCustomizedNameUrl(name);
  const text = `🎉 Happy Birthday ${name}! 🎁✨ I created a special interactive birthday surprise for you!\n\nTap to unwrap your gift: ${link}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

// WhatsApp Share link
export function getWhatsAppShareUrl(wish: WishData): string {
  const link = getShareableWishUrl(wish);
  const text = `🎉 I created a special interactive Birthday Surprise for you, ${wish.recipientName}! 🎁✨\n\nTap the link to unwrap your gift: ${link}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

// Simple SVG QR Code Generator
export function generateQrCodeSvg(url: string): string {
  // Simple visual SVG barcode/QR box representation for share dialogs
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="160" height="160" class="rounded-xl bg-white p-3 shadow-md">
      <rect width="200" height="200" fill="#ffffff"/>
      <!-- QR Corner Markers -->
      <path d="M20,20 h50 v50 h-50 z M30,30 h30 v30 h-30 z M37,37 h16 v16 h-16 z" fill="#120c18"/>
      <path d="M130,20 h50 v50 h-50 z M140,30 h30 v30 h-30 z M147,37 h16 v16 h-16 z" fill="#120c18"/>
      <path d="M20,130 h50 v50 h-50 z M30,140 h30 v30 h-30 z M37,147 h16 v16 h-16 z" fill="#120c18"/>
      <!-- Random Decorative QR Data Dots -->
      <rect x="80" y="20" width="12" height="12" fill="#ec4899"/>
      <rect x="100" y="20" width="12" height="24" fill="#120c18"/>
      <rect x="80" y="45" width="24" height="12" fill="#120c18"/>
      <rect x="110" y="55" width="12" height="12" fill="#ec4899"/>
      <rect x="20" y="80" width="24" height="12" fill="#120c18"/>
      <rect x="55" y="80" width="12" height="30" fill="#ec4899"/>
      <rect x="80" y="80" width="40" height="40" fill="#120c18"/>
      <rect x="90" y="90" width="20" height="20" fill="#ffffff"/>
      <rect x="95" y="95" width="10" height="10" fill="#ec4899"/>
      <rect x="135" y="80" width="25" height="12" fill="#120c18"/>
      <rect x="170" y="80" width="10" height="25" fill="#ec4899"/>
      <rect x="135" y="105" width="15" height="15" fill="#120c18"/>
      <rect x="160" y="115" width="20" height="15" fill="#120c18"/>
      <rect x="80" y="130" width="15" height="25" fill="#120c18"/>
      <rect x="105" y="130" width="25" height="12" fill="#ec4899"/>
      <rect x="100" y="150" width="30" height="30" fill="#120c18"/>
      <rect x="140" y="140" width="40" height="15" fill="#ec4899"/>
      <rect x="140" y="165" width="15" height="15" fill="#120c18"/>
      <rect x="165" y="165" width="15" height="15" fill="#ec4899"/>
      <rect x="20" y="110" width="12" height="10" fill="#ec4899"/>
    </svg>
  `;
}

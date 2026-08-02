export type ThemeId = 
  | 'classic' 
  | 'galaxy' 
  | 'emerald' 
  | 'frost' 
  | 'midnight' 
  | 'party' 
  | 'floating_hearts' 
  | 'neon_hearts' 
  | 'sparkle_hearts' 
  | 'two_hearts';

export type GiftType = '3d_box' | 'envelope';

export type GiftColorId = 
  | 'classic_pink' 
  | 'royal_gold' 
  | 'mint_silver' 
  | 'rainbow_pop' 
  | 'classic_cream' 
  | 'rose_gold';

export type CakeTypeId = 
  | 'classic_pink' 
  | 'chocolate' 
  | 'vanilla_cream' 
  | 'rainbow_funfetti' 
  | 'red_velvet';

export type SongId = 'dooron_dooron' | 'soft_warm' | 'gentle_upbeat' | 'custom';

export type MemoriesLayout = 'polaroid' | 'cinema' | 'scrapbook';

export type GameType = 'sliding_puzzle' | 'memory_match';

export interface MemoryItem {
  id: string;
  url: string;
  caption: string;
  type?: 'image' | 'video';
  videoUrl?: string;
}

export interface WishData {
  id: string;
  recipientName: string;
  birthDate: string; // YYYY-MM-DD
  pin: string; // 4 digits
  pinHint: string;
  theme: ThemeId;
  giftType: GiftType;
  giftColor: GiftColorId;
  cakeType: CakeTypeId;
  introTitle: string;
  introSubtitle: string;
  song: SongId;
  customSongUrl?: string;
  musicDurationMinutes?: number; // 0.5 to 4 minutes
  backgroundVideoUrl?: string;
  memoriesLayout: MemoriesLayout;
  memories: MemoryItem[];
  gameType: GameType;
  puzzleImage: string;
  wishes: string[];
  scratchCard: {
    title: string;
    message: string;
    revealImage: string;
  };
  letter: {
    greeting: string;
    body: string;
    signOff: string;
  };
  createdAt: number;
}

// Default initial wish data preset for quick creation
export const DEFAULT_WISH_DATA: WishData = {
  id: 'demo-wish-123',
  recipientName: 'Vishal bhoi',
  birthDate: '2006-05-01',
  pin: '1234',
  pinHint: 'e.g. Simple PIN 1234 💖',
  theme: 'classic',
  giftType: '3d_box',
  giftColor: 'royal_gold',
  cakeType: 'chocolate',
  introTitle: "There's something special I want to tell you...",
  introSubtitle: "You are a very special friend 💖",
  song: 'soft_warm',
  memoriesLayout: 'polaroid',
  memories: [
    {
      id: 'm1',
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
      caption: 'Our first adventure together 🌸'
    },
    {
      id: 'm2',
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800',
      caption: 'Stargazing till midnight ✨'
    },
    {
      id: 'm3',
      url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      caption: 'Ice cream & sunshine ☀️'
    },
    {
      id: 'm4',
      url: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800',
      caption: 'Cherry blossoms & you 🌺'
    }
  ],
  gameType: 'sliding_puzzle',
  puzzleImage: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
  wishes: [
    'You make my whole world brighter 🌟',
    'Thank you for every single laugh 😊',
    'You are my favourite person, always 💖',
    'Here is to so many more years together 🥂',
    'You deserve the entire universe and more ✨',
    'I am the luckiest, because of you 🌸'
  ],
  scratchCard: {
    title: 'Happy Birthday! 🎉',
    message: 'You found the hidden surprise 💖',
    revealImage: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=800'
  },
  letter: {
    greeting: 'My dearest,',
    body: 'On this very special day, I want you to know how deeply you are loved. Every single moment I spend with you feels like a beautiful dream I never want to wake up from.\n\nYou make every ordinary day feel extraordinary. Your smile is my favourite thing in the entire world, and your laugh — oh, your laugh — is the most beautiful sound I have ever heard.\n\nThank you for being you. Thank you for choosing me every single day. I promise to always be there, to hold your hand through every storm, and to celebrate every little joy with you.\n\nHappy Birthday, my love. You deserve every good thing the universe has to offer. Today and always. 🌸',
    signOff: 'Forever yours, with all my heart 💖'
  },
  createdAt: Date.now()
};

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  signature: string;
  signedInAt: number;
}

const USER_KEY = 'birthday_wish_user_profile';

export function getUserProfile(): UserProfile | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function saveUserProfile(profile: Omit<UserProfile, 'signedInAt'>): UserProfile {
  const fullProfile: UserProfile = {
    ...profile,
    signedInAt: Date.now(),
  };
  try {
    localStorage.setItem(USER_KEY, JSON.stringify(fullProfile));
  } catch (err) {
    console.warn('Error saving user profile:', err);
  }
  return fullProfile;
}

export function signOutUser(): void {
  try {
    localStorage.removeItem(USER_KEY);
  } catch (err) {
    console.warn('Error signing out:', err);
  }
}

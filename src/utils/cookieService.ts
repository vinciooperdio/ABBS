interface CookieOptions {
  expires?: Date | number | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

interface CookieSettings {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
}

const defaultSettings: CookieSettings = {
  necessary: true,
  analytics: false,
  marketing: false
};

export const CookieService = {
  /**
   * Imposta un cookie con nome, valore e opzioni
   */
  setCookie(name: string, value: string, options: CookieOptions = {}): void {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (options.expires) {
      if (typeof options.expires === 'number') {
        const days = options.expires;
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        options.expires = date;
      }
      
      if (options.expires instanceof Date) {
        cookieString += `; expires=${options.expires.toUTCString()}`;
      } else {
        cookieString += `; expires=${options.expires}`;
      }
    }
    
    if (options.path) cookieString += `; path=${options.path}`;
    if (options.domain) cookieString += `; domain=${options.domain}`;
    if (options.secure) cookieString += '; secure';
    if (options.sameSite) cookieString += `; samesite=${options.sameSite}`;
    
    document.cookie = cookieString;
  },
  
  /**
   * Ottiene il valore di un cookie dal suo nome
   */
  getCookie(name: string): string | null {
    const matches = document.cookie.match(new RegExp(
      '(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
  },
  
  /**
   * Elimina un cookie impostando la data di scadenza nel passato
   */
  deleteCookie(name: string, options: CookieOptions = {}): void {
    this.setCookie(name, '', {
      ...options,
      expires: -1
    });
  },
  
  /**
   * Ottiene le impostazioni dei cookie salvate
   */
  getSettings(): CookieSettings {
    const storedSettings = localStorage.getItem('cookie-consent');
    if (storedSettings) {
      try {
        return JSON.parse(storedSettings);
      } catch (e) {
        console.error('Invalid cookie settings stored', e);
      }
    }
    return defaultSettings;
  },
  
  /**
   * Salva le impostazioni dei cookie
   */
  saveSettings(settings: CookieSettings): void {
    localStorage.setItem('cookie-consent', JSON.stringify(settings));
  },
  
  /**
   * Verifica se una categoria di cookie è consentita
   */
  isAllowed(category: keyof CookieSettings): boolean {
    const settings = this.getSettings();
    return settings[category];
  },
  
  /**
   * Resetta tutte le impostazioni dei cookie
   */
  resetSettings(): void {
    localStorage.removeItem('cookie-consent');
  }
};

export default CookieService; 
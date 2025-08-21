import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './AuthCallback.scss';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
});

export default function AuthCallback() {
  const navigate = useNavigate();
  const { search, hash } = useLocation();
  const [status, setStatus] = useState('processing');
  const ran = useRef(false);
  const timeoutId = useRef<number | null>(null);

  useEffect(() => {
    if (ran.current) return;
    ran.current = true;

    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const next = url.searchParams.get('next') || '/';
    const wantWeb = url.searchParams.get('web') === '1';           // se passata, completi sessione sul web
    const appScheme = url.searchParams.get('app_scheme') || 'abbsone://auth-callback';
    const appNext = url.searchParams.get('app_next') || next;       // dove andare in app

    const openApp = () => {
      setStatus('opening-app');

      // inoltra SOLO la query "pulita" (niente hash con token legacy)
      const qs = new URLSearchParams();
      if (code) qs.set('code', code);
      if (appNext) qs.set('next', appNext);

      const deepLink = `${appScheme}?${qs.toString()}`;

      // Se l’app si apre, la pagina tipicamente va in background
      const onHidden = () => {
        // stop fallback se la pagina non è più visibile
        if (document.visibilityState === 'hidden') {
          if (timeoutId.current !== null) {
            window.clearTimeout(timeoutId.current);
          }
          document.removeEventListener('visibilitychange', onHidden);
        }
      };
      document.addEventListener('visibilitychange', onHidden);

      // prova ad aprire l’app
      window.location.href = deepLink;

      // fallback dopo ~1.2s
      timeoutId.current = window.setTimeout(() => {
        document.removeEventListener('visibilitychange', onHidden);
        setStatus('fallback');
        // pulisci URL per non mantenere parametri sensibili
        window.history.replaceState({}, document.title, '/auth/callback-clean');
      }, 1200);
    };

    (async () => {
      try {
        // 1) Se vuoi **sessione web**, completa qui
        if (wantWeb) {
          if (code) {
            setStatus('exchanging');
            const { error } = await supabase.auth.exchangeCodeForSession(code);
            if (error) throw error;
          } else if (hash.includes('access_token')) {
            setStatus('setting-session');
            const h = new URLSearchParams(hash.slice(1));
            const access_token = h.get('access_token');
            const refresh_token = h.get('refresh_token');
            if (!access_token || !refresh_token) throw new Error('Token mancanti');
            const { error } = await supabase.auth.setSession({ access_token, refresh_token });
            if (error) throw error;
          } else {
            throw new Error('Parametri di callback non trovati.');
          }

          // 2) Ripulisci URL
          window.history.replaceState({}, document.title, '/auth/callback-clean');

          // 3) Vai dove vuoi sul web
          navigate(next, { replace: true });
          return;
        }

        // 4) Altrimenti, apri l’app (custom scheme) e NON trattare l’hash qui
        openApp();
      } catch (e) {
        console.error('Auth callback error:', e);
        setStatus('error');
        setTimeout(() => navigate('/', { replace: true }), 1500);
      }
    })();

    return () => {
      if (timeoutId.current !== null) {
        window.clearTimeout(timeoutId.current);
      }
    };
  }, [navigate, search, hash]);

  // UI super semplice
  return (
    <div className="auth-callback">
      <div className="auth-callback-container">
        <div className="loading-spinner" />
        {status === 'processing' && (<><h1>Elaborazione…</h1><p>Analisi del callback</p></>)}
        {status === 'exchanging' && (<><h1>Accesso…</h1><p>Scambio del codice in corso</p></>)}
        {status === 'setting-session' && (<><h1>Accesso…</h1><p>Impostazione sessione</p></>)}
        {status === 'opening-app' && (<><h1>Apertura app…</h1><p>Tentativo di aprire Abbsone</p></>)}
        {status === 'fallback' && (
          <>
            <h1>Apri l’app</h1>
            <p>L’app non si è aperta automaticamente.</p>
            <div className="fallback-options">
              <button
                className="btn-primary"
                onClick={() => {
                  const url = new URL(window.location.href);
                  const code = url.searchParams.get('code');
                  const appScheme = url.searchParams.get('app_scheme') || 'abbsone://auth-callback';
                  const appNext = url.searchParams.get('app_next') || '/home';
                  const qs = new URLSearchParams();
                  if (code) qs.set('code', code);
                  if (appNext) qs.set('next', appNext);
                  window.location.href = `${appScheme}?${qs.toString()}`;
                }}>
                Apri nell’app
              </button>
              <button
                className="btn-secondary"
                onClick={() => {
                  if (/iPhone|iPad|iPod/.test(navigator.userAgent)) {
                    window.open('https://apps.apple.com/app/abbsone/id123456789', '_blank');
                  } else {
                    window.open('https://play.google.com/store/apps/details?id=com.example.abbsone', '_blank');
                  }
                }}>
                Scarica l’app
              </button>
              <button className="btn-tertiary" onClick={() => navigate('/', { replace: true })}>
                Continua sul web
              </button>
            </div>
          </>
        )}
        {status === 'error' && (<><h1>Errore</h1><p>Problema durante l’autenticazione</p></>)}
      </div>
    </div>
  );
}
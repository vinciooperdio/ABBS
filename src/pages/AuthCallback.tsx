import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createClient } from '@supabase/supabase-js';
import './AuthCallback.scss';

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
    // Universal Links only: nessun custom scheme

    // Rimosso: nessun tentativo di aprire app via custom scheme

    (async () => {
      try {
        // 1) Se vuoi **sessione web**, completa qui
        if (wantWeb) {
          // Inizializza il client Supabase SOLO se serve e se le env sono presenti
          const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string | undefined;
          const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
          if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
            throw new Error('Supabase env vars mancanti: VITE_SUPABASE_URL/VITE_SUPABASE_ANON_KEY');
          }
          const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
            auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: false },
          });
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

        // 4) Solo Universal Links: lato web non fa nulla.
        setStatus('info');
        timeoutId.current = window.setTimeout(() => {
          window.history.replaceState({}, document.title, '/');
          navigate('/', { replace: true });
        }, 1200);
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
        {status === 'info' && (<><h1>Universal Link</h1><p>Se l’app è installata, il link si apre direttamente nell’app.</p></>)}
        {status === 'error' && (<><h1>Errore</h1><p>Problema durante l’autenticazione</p></>)}
      </div>
    </div>
  );
}
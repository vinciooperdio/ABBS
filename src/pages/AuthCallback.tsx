import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AuthCallback.scss';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Gestisci i parametri dell'URL per Supabase
        const urlParams = new URLSearchParams(window.location.search);
        const hash = window.location.hash;
        
        console.log('🔧 Auth callback detected');
        console.log('🔧 URL params:', urlParams.toString());
        console.log('🔧 Hash:', hash);
        
        // Se hai access_token e refresh_token nell'hash
        if (hash && hash.includes('access_token')) {
          const hashParams = new URLSearchParams(hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const refreshToken = hashParams.get('refresh_token');
          
          if (accessToken && refreshToken) {
            console.log('🔧 Tokens found in hash');
            // Qui puoi gestire la sessione Supabase
            // await supabase.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
          }
        }
        
        // Se hai un code nei parametri
        const code = urlParams.get('code');
        if (code) {
          console.log('🔧 Code found in params');
          // Qui puoi gestire il code per Supabase
          // await supabase.auth.exchangeCodeForSession(code);
        }
        
        // Redirect alla home dopo aver gestito l'auth
        setTimeout(() => {
          navigate('/', { replace: true });
        }, 2000);
        
      } catch (error) {
        console.error('🔧 Auth callback error:', error);
        navigate('/', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="auth-callback">
      <div className="auth-callback-container">
        <div className="loading-spinner"></div>
        <h1>Verifica in corso...</h1>
        <p>Gestione callback di autenticazione</p>
        <div className="auth-status">
          <p>✅ URL rilevato correttamente</p>
          <p>🔄 Elaborazione in corso...</p>
          <p>⏱️ Reindirizzamento automatico tra 2 secondi</p>
        </div>
      </div>
    </div>
  );
}

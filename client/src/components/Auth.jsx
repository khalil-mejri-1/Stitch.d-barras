import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  
  const navigate = useNavigate();

  const handleGoogleLoginResponse = async (response) => {
    const idToken = response.credential;
    try {
      const res = await fetch(`${API_BASE_URL}/api/google-login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: idToken })
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Connexion Google échouée.');
        return;
      }
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      // Dispatch storage event so App.jsx hears it immediately
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (err) {
      console.error(err);
      setErrorMsg("Impossible de contacter le serveur d'authentification pour Google.");
    }
  };

  useEffect(() => {
    /* global google */
    const initGoogleGSI = () => {
      if (window.google) {
        google.accounts.id.initialize({
          client_id: "1009149258614-7mssvk5u2tm0o562qj26mi99j3g0nb47.apps.googleusercontent.com",
          callback: handleGoogleLoginResponse
        });
        google.accounts.id.renderButton(
          document.getElementById("google-signin-btn"),
          { theme: "outline", size: "large", width: "100%" }
        );
      }
    };

    initGoogleGSI();
    const interval = setInterval(() => {
      if (window.google) {
        initGoogleGSI();
        clearInterval(interval);
      }
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    
    const endpoint = isLogin ? 'login' : 'register';
    const bodyData = isLogin 
      ? { email, password } 
      : { firstName, lastName, email, password };
      
    try {
      const response = await fetch(`${API_BASE_URL}/api/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        setErrorMsg(data.error || 'Une erreur est survenue.');
        return;
      }
      
      // Successfully authenticated
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (err) {
      console.error(err);
      setErrorMsg("Impossible de contacter le serveur d'authentification.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-[#F3F6F9] pt-32 pb-12 px-4 reveal-hidden">

      {/* Friendly Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-gradient-to-br from-[#00d26a]/20 to-[#5d3077]/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-gradient-to-tl from-[#5d3077]/20 to-[#00d26a]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-[20%] right-[15%] w-32 h-32 bg-yellow-400/20 rounded-full blur-2xl animate-bounce"></div>

      {/* Main Glassmorphic Auth Card */}
      <div className="relative z-10 w-full max-w-5xl bg-white/80 backdrop-blur-xl rounded-[3rem] shadow-[0_20px_50px_rgba(30,10,45,0.05)] border border-white flex flex-col md:flex-row overflow-hidden transform transition-all duration-700">

        {/* Left Side: Illustration / Welcome Message */}
        <div className="w-full md:w-5/12 bg-gradient-to-br from-[#1e0a2d] to-[#3a1555] p-8 md:p-12 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative rings */}
          <div className="absolute -top-20 -left-20 w-64 h-64 border-[30px] border-white/5 rounded-full"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 border-[40px] border-white/5 rounded-full"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8 md:mb-12">
              <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center border border-white/25 shadow-[0_0_20px_rgba(0,210,106,0.2)]">
                <svg className="w-6 h-6" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M30 20 C45 5, 55 5, 70 20 C85 35, 75 50, 50 50 C25 50, 15 65, 30 80 C45 95, 55 95, 70 80" stroke="url(#auth-stitch-grad)" strokeWidth="12" strokeLinecap="round" fill="none" />
                  <defs>
                    <linearGradient id="auth-stitch-grad" x1="15" y1="15" x2="85" y2="85" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#00d26a" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="text-2xl font-bold tracking-tight">Stitch<span className="text-[#00d26a]">.</span>débarras</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-black font-h2 leading-tight mb-4 md:mb-6">
              {isLogin ? (
                <>Ravi de vous <br /><span className="text-[#00d26a]">revoir !</span> 
                  <svg className="w-8 h-8 inline-block ml-2 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </>
              ) : (
                <>Prêt à <br /><span className="text-[#00d26a]">commencer ?</span> 
                  <svg className="w-8 h-8 inline-block ml-2 text-[#00d26a]" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </h2>

            <p className="text-white/80 font-body-md text-lg leading-relaxed">
              {isLogin
                ? "Connectez-vous pour retrouver vos réservations, vos devis en cours et vos factures Stitch."
                : "Rejoignez Stitch aujourd'hui et réservez votre débarras écoresponsable en quelques secondes !"}
            </p>
          </div>

          <div className="relative z-10 mt-8 md:mt-12 bg-white/10 backdrop-blur-sm p-6 rounded-3xl border border-white/10">
            <p className="text-white/90 italic font-medium text-sm">
              "L'intervention s'est déroulée en un temps record. Équipe professionnelle, tout a été trié."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-sm font-bold text-[#1e0a2d]">S</div>
              <span className="text-sm font-bold">Sophie L.</span>
            </div>
          </div>
        </div>

        {/* Right Side: The Form */}
        <div className="w-full md:w-7/12 p-6 md:p-16 flex flex-col justify-center bg-white relative">

          {/* Toggle Login / Register */}
          <div className="flex bg-gray-100 p-1.5 rounded-full mb-8 relative max-w-sm mx-auto w-full">
            <div
              className={`absolute top-1.5 bottom-1.5 w-[calc(50%-6px)] bg-white rounded-full shadow-md transition-all duration-300 ease-in-out ${isLogin ? 'left-1.5' : 'left-[calc(50%+4.5px)]'}`}
            ></div>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 text-sm font-bold rounded-full relative z-10 transition-colors ${isLogin ? 'text-[#1e0a2d]' : 'text-gray-500 hover:text-[#1e0a2d]'}`}
            >
              Se connecter
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 text-sm font-bold rounded-full relative z-10 transition-colors ${!isLogin ? 'text-[#1e0a2d]' : 'text-gray-500 hover:text-[#1e0a2d]'}`}
            >
              S'inscrire
            </button>
          </div>

          <div className="text-center mb-8">
            <h3 className="text-3xl font-black text-[#1e0a2d] mb-2">
              {isLogin ? "Bon retour ! " : "Créez votre compte "}
            </h3>
            <p className="text-gray-500 font-medium">
              {isLogin ? "Veuillez entrer vos identifiants pour continuer." : "C'est rapide, gratuit et super facile."}
            </p>
          </div>

          {/* Social Auth Buttons */}
          <div className="mb-8 flex justify-center">
            <div id="google-signin-btn" className="w-full"></div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-gray-400 text-sm font-medium">Ou avec votre email</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 text-red-650 rounded-2xl text-sm font-bold text-center">
              ⚠️ {errorMsg}
            </div>
          )}

          {/* Form */}
          <form className="space-y-5" onSubmit={handleAuthSubmit}>
            {!isLogin && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1e0a2d] pl-1">Prénom</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Ex: Jean"
                    required
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00d26a] focus:bg-white rounded-2xl px-5 py-4 outline-none transition-all font-medium text-[#1e0a2d] placeholder-gray-400"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-[#1e0a2d] pl-1">Nom</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Ex: Dupont"
                    required
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00d26a] focus:bg-white rounded-2xl px-5 py-4 outline-none transition-all font-medium text-[#1e0a2d] placeholder-gray-400"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1e0a2d] pl-1">Adresse Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="coucou@exemple.com"
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00d26a] focus:bg-white rounded-2xl px-5 py-4 outline-none transition-all font-medium text-[#1e0a2d] placeholder-gray-400"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center pl-1">
                <label className="text-sm font-bold text-[#1e0a2d]">Mot de passe</label>
                {isLogin && (
                  <a href="#" className="text-xs font-bold text-[#00d26a] hover:underline">Mot de passe oublié ?</a>
                )}
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-gray-50 border-2 border-transparent focus:border-[#00d26a] focus:bg-white rounded-2xl px-5 py-4 outline-none transition-all font-medium text-[#1e0a2d] placeholder-gray-400"
              />
            </div>

            <button type="submit" className="w-full bg-[#1e0a2d] hover:bg-[#5d3077] text-white rounded-2xl px-5 py-4 font-black text-lg mt-6 transform transition-all duration-300 hover:scale-[1.02] shadow-xl hover:shadow-[#5d3077]/30 flex items-center justify-center gap-2 group cursor-pointer">
              {isLogin ? "C'est parti !" : "Créer mon compte"}
              <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Auth;

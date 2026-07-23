import React from 'react';
import { useNavigate } from 'react-router-dom';

const Reviews = ({ data, isAdmin, onEdit }) => {
  const navigate = useNavigate();
  const testimonials = data?.items || [
    {
      name: "Sophie L.",
      role: "Particulier - Débarras Maison",
      rating: 5,
      content: "Une équipe incroyable ! Rapides, polis, et d'une efficacité redoutable. Ils ont trié tous les objets et donné une grande partie à des associations. Je recommande à 100% !",
      avatar: "👩"
    },
    {
      name: "Jean-Marc P.",
      role: "Professionnel - Vente Entrepôt",
      rating: 5,
      content: "Excellent service professionnel. Devis clair et respecté. Intervention propre et dans les temps. La dimension écoresponsable est un vrai plus.",
      avatar: "👨"
    }
  ];

  const cardColors = [
    "from-blue-100 to-blue-50",
    "from-yellow-100 to-yellow-50",
    "from-purple-100 to-purple-50",
    "from-green-100 to-green-50"
  ];

  // Duplicate for smooth infinite scrolling
  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section className="relative min-h-[700px] flex flex-col py-24 overflow-hidden">
      {/* Admin Edit Button */}
      {isAdmin && (
        <div className="absolute top-4 right-6 z-50">
          <button
            onClick={onEdit}
            className="px-4 py-2 bg-[#00d26a] hover:bg-[#00b95c] text-white font-bold rounded-xl shadow-[0_0_15px_rgba(0,210,106,0.4)] transition-all flex items-center gap-2 text-sm group"
          >
            <span>✏️</span> Modifier Section Avis
          </button>
        </div>
      )}

      {/* Friendly Background with Soft Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=2000"
          alt="Artisans souriants"
          className="w-full h-full object-cover grayscale-[30%] opacity-90 scale-105 transform hover:scale-110 transition-transform duration-[10s]"
        />
        {/* Playful gradients overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e0a2d] via-[#1e0a2d]/85 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e0a2d] via-transparent to-transparent opacity-60"></div>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full">

        <div className="max-w-[1400px] mx-auto px-gutter mb-20">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

            {/* Main Title Area */}
            <div className="max-w-xl text-center lg:text-left flex-1">
              <h2 className="text-3xl lg:text-7xl font-black font-h1 text-white leading-[1.1] mb-6">
                {data?.title ? (
                  <span dangerouslySetInnerHTML={{
                    __html: data.title.replace(/convaincre/g, '<span class="text-transparent bg-clip-text bg-gradient-to-r from-[#00d26a] to-emerald-300">convaincre</span>')
                  }} />
                ) : (
                  <>
                    Laissez-vous <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d26a] to-emerald-300">convaincre.</span>
                  </>
                )}
              </h2>
              <p className="text-gray-300 text-xl font-body-md leading-relaxed">
                {data?.subtitle || "Des centaines de milliers de projets réussis. Derrière chaque avis, il y a un sourire et une maison transformée !"}
                <svg className="w-6 h-6 inline-block ml-2 text-[#00d26a]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
                </svg>
              </p>
            </div>

            {/* Extracted CTA Card */}
            <div className="flex-1 w-full max-w-md">
              <div className="bg-white/10 backdrop-blur-xl p-10 rounded-[3rem] border border-white/20 text-center flex flex-col items-center justify-center space-y-6 shadow-[0_0_50px_rgba(0,210,106,0.15)] hover:bg-white/15 hover:shadow-[0_0_60px_rgba(0,210,106,0.25)] transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10">
                  <h3 className="text-2xl lg:text-3xl font-black text-white mb-3">À vous de jouer !</h3>
                  <p className="text-gray-300 font-medium text-lg">Rejoignez nos milliers de clients satisfaits et réalisez vos projets.</p>
                </div>
                <button 
                  onClick={() => navigate('/quote-request')}
                  className="relative z-10 bg-white text-[#1e0a2d] hover:bg-[#00d26a] hover:text-white px-10 py-5 rounded-full font-black text-lg transition-all transform hover:scale-105 active:scale-95 shadow-xl w-full mt-4 flex items-center justify-center gap-3 group/btn"
                >
                  Publier un projet
                  <svg className="w-6 h-6 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Animated Marquee of Chat Bubbles */}
        <div className="relative w-full overflow-hidden flex pt-8 pb-12">
          {/* Fading edges for marquee */}
          <div className="absolute top-0 left-0 bottom-0 w-32 bg-gradient-to-r from-[#1e0a2d] to-transparent z-20 pointer-events-none"></div>

          <div className="flex gap-8 w-max animate-marquee hover:pause px-4">
            {duplicatedTestimonials.map((t, idx) => {
              const bgClass = cardColors[idx % cardColors.length];
              const authorName = t.name || t.author || "Client";
              const authorRole = t.role || t.category || "Débarras";
              const contentText = t.content || t.text || "";
              return (
                <div
                  key={idx}
                  className={`flex-shrink-0 w-[360px] transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-grab active:cursor-grabbing ${idx % 2 === 1 ? 'mt-8' : 'mt-0'}`}
                >
                  {/* Chat Bubble Design */}
                  <div className={`relative bg-gradient-to-br ${bgClass} p-8 rounded-[2.5rem] rounded-bl-none shadow-[0_20px_40px_rgba(0,0,0,0.3)] border-2 border-white/80 backdrop-blur-sm h-[260px] flex flex-col`}>

                    {/* Decorative Icon */}
                    <div className="absolute -top-6 -right-6 w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-3xl transform rotate-12 transition-transform duration-500">
                      {t.avatar || t.icon || "👤"}
                    </div>

                    <div className="space-y-4 flex-grow">
                      <div>
                        <h3 className="font-black text-[#1e0a2d] text-xl mb-1 truncate pr-6">{authorName}</h3>
                        <div className="inline-block px-3 py-1 bg-white/70 rounded-full text-xs font-bold text-[#1e0a2d] uppercase tracking-wider shadow-sm">
                          {authorRole}
                        </div>
                      </div>

                      {/* Glowing Stars */}
                      <div className="flex gap-1">
                        {[...Array(t.rating || 5)].map((_, i) => (
                          <svg key={i} className="w-5 h-5 text-yellow-500 drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>

                      <p className="text-[#1e0a2d]/80 text-base font-medium leading-relaxed italic relative line-clamp-3">
                        <span className="text-4xl text-[#1e0a2d]/20 absolute -top-4 -left-4 font-serif">"</span>
                        {contentText}
                        <span className="text-4xl text-[#1e0a2d]/20 absolute -bottom-6 -right-2 font-serif">"</span>
                      </p>
                    </div>
                  </div>

                  {/* Author Area (Below the bubble) */}
                  <div className="mt-5 flex items-center gap-4 pl-4">
                    <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center font-black text-[#1e0a2d] text-xl shadow-lg border-2 border-white/50">
                      {authorName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-white text-base shadow-sm drop-shadow-md">{authorName}</p>
                      <p className="text-[#00d26a] text-sm font-bold flex items-center gap-1 drop-shadow-md">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
                        Client vérifié
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Reviews;

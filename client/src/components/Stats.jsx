import React from 'react';

const Stats = () => {
  return (
    <section className="bg-white py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
      
      <div className="max-w-[1280px] mx-auto px-gutter grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Artisans', value: '62,766' },
          { label: 'Catégories métiers', value: '+ de 30' },
          { label: 'Avis vérifiés', value: '205,586' }
        ].map((stat, idx) => (
          <div key={idx} className="group p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300 flex items-center gap-8">
            <div className="w-2 h-16 bg-gradient-to-b from-[#00d26a] to-[#00d26a]/20 rounded-full group-hover:scale-y-110 transition-transform origin-top"></div>
            <div>
              <div className="text-3xl lg:text-4xl font-black font-h2 tracking-tighter text-[#1e0a2d] mb-1 group-hover:text-[#00d26a] transition-colors">
                {stat.value}
              </div>
              <div className="text-gray-500 font-bold font-body-md uppercase tracking-[0.2em] text-xs">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Stats;

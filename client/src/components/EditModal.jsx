import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, sectionName, initialData, onSave }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(JSON.parse(JSON.stringify(initialData)));
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleInputChange = (path, value) => {
    setFormData(prev => {
      const copy = { ...prev };
      const keys = path.split('.');
      let current = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const handleArrayChange = (arrayName, index, field, value) => {
    setFormData(prev => {
      const copy = { ...prev };
      if (!copy[arrayName]) copy[arrayName] = [];
      if (!copy[arrayName][index]) copy[arrayName][index] = {};
      copy[arrayName][index][field] = value;
      return copy;
    });
  };

  const handleImageUpload = (e, path, isArray = false, arrayName = '', index = 0) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (isArray) {
          handleArrayChange(arrayName, index, path, reader.result);
        } else {
          handleInputChange(path, reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  const renderImageField = (label, path, value, isArray = false, arrayName = '', index = 0) => {
    return (
      <div className="space-y-2 border border-white/5 p-4 rounded-xl bg-white/5">
        <label className="block text-sm font-bold text-gray-300">{label}</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <span className="block text-xs text-gray-400 mb-1">Entrer l'URL de l'image</span>
            <input
              type="text"
              className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
              value={value || ''}
              onChange={(e) => {
                if (isArray) {
                  handleArrayChange(arrayName, index, path, e.target.value);
                } else {
                  handleInputChange(path, e.target.value);
                }
              }}
              placeholder="https://..."
            />
          </div>
          <div>
            <span className="block text-xs text-gray-400 mb-1">Ou importer un fichier</span>
            <input
              type="file"
              accept="image/*"
              className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#00d26a]/20 file:text-[#00d26a] hover:file:bg-[#00d26a]/30 cursor-pointer"
              onChange={(e) => handleImageUpload(e, path, isArray, arrayName, index)}
            />
          </div>
        </div>
        {value && (
          <div className="mt-3">
            <span className="block text-xs text-gray-400 mb-1">Aperçu :</span>
            <img src={value} alt="Preview" className="h-20 w-auto object-cover rounded-lg border border-white/10" />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#1e0a2d] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl animate-reveal">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#1e0a2d] to-[#2e1245]">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            ⚙️ Modifier la Section : <span className="text-[#00d26a] capitalize">{sectionName}</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl font-bold">×</button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {sectionName === 'hero' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Badge</label>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.hero?.badge || ''}
                  onChange={(e) => handleInputChange('hero.badge', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Titre</label>
                <textarea
                  rows="3"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.hero?.title || ''}
                  onChange={(e) => handleInputChange('hero.title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Description (Sous-titre)</label>
                <textarea
                  rows="3"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.hero?.subtitle || ''}
                  onChange={(e) => handleInputChange('hero.subtitle', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-1">Bouton Particulier - Titre</label>
                  <input
                    type="text"
                    className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                    value={formData.hero?.button1Title || ''}
                    onChange={(e) => handleInputChange('hero.button1Title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-1">Bouton Particulier - Description</label>
                  <input
                    type="text"
                    className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                    value={formData.hero?.button1Sub || ''}
                    onChange={(e) => handleInputChange('hero.button1Sub', e.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-1">Bouton Professionnel - Titre</label>
                  <input
                    type="text"
                    className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                    value={formData.hero?.button2Title || ''}
                    onChange={(e) => handleInputChange('hero.button2Title', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-1">Bouton Professionnel - Description</label>
                  <input
                    type="text"
                    className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                    value={formData.hero?.button2Sub || ''}
                    onChange={(e) => handleInputChange('hero.button2Sub', e.target.value)}
                  />
                </div>
              </div>
              {renderImageField("Image de fond", "hero.image", formData.hero?.image)}
            </div>
          )}

          {sectionName === 'stats' && (
            <div className="space-y-6">
              {formData.stats?.items?.map((item, idx) => (
                <div key={idx} className="border border-white/10 p-4 rounded-xl bg-white/5 space-y-3">
                  <h4 className="font-bold text-[#00d26a]">Statistique #{idx + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Valeur (ex: 15k+)</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                        value={item.number || ''}
                        onChange={(e) => handleArrayChange('items', idx, 'number', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Label Principal</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                        value={item.label || ''}
                        onChange={(e) => handleArrayChange('items', idx, 'label', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Sous-Label</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                        value={item.sublabel || ''}
                        onChange={(e) => handleArrayChange('items', idx, 'sublabel', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sectionName === 'howItWorks' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Titre de la section</label>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.howItWorks?.title || ''}
                  onChange={(e) => handleInputChange('howItWorks.title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Sous-titre de la section</label>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.howItWorks?.subtitle || ''}
                  onChange={(e) => handleInputChange('howItWorks.subtitle', e.target.value)}
                />
              </div>
              {formData.howItWorks?.steps?.map((step, idx) => (
                <div key={idx} className="border border-white/10 p-4 rounded-xl bg-white/5 space-y-3">
                  <h4 className="font-bold text-[#00d26a]">Étape #{idx + 1}</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label className="block text-xs text-gray-400 mb-1">Icon/Emoji</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a] text-center"
                        value={step.icon || ''}
                        onChange={(e) => handleArrayChange('steps', idx, 'icon', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs text-gray-400 mb-1">Titre de l'étape</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                        value={step.title || ''}
                        onChange={(e) => handleArrayChange('steps', idx, 'title', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      rows="2"
                      className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                      value={step.description || ''}
                      onChange={(e) => handleArrayChange('steps', idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {sectionName === 'categories' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Titre de la section</label>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.categories?.title || ''}
                  onChange={(e) => handleInputChange('categories.title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Sous-titre de la section</label>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.categories?.subtitle || ''}
                  onChange={(e) => handleInputChange('categories.subtitle', e.target.value)}
                />
              </div>
              {formData.categories?.items?.map((item, idx) => (
                <div key={idx} className="border border-white/10 p-4 rounded-xl bg-white/5 space-y-3">
                  <h4 className="font-bold text-[#00d26a]">Domaine #{idx + 1}</h4>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1">
                      <label className="block text-xs text-gray-400 mb-1">Icon/Emoji</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a] text-center"
                        value={item.icon || ''}
                        onChange={(e) => handleArrayChange('items', idx, 'icon', e.target.value)}
                      />
                    </div>
                    <div className="col-span-3">
                      <label className="block text-xs text-gray-400 mb-1">Titre</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                        value={item.title || ''}
                        onChange={(e) => handleArrayChange('items', idx, 'title', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description</label>
                    <textarea
                      rows="2"
                      className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                      value={item.description || ''}
                      onChange={(e) => handleArrayChange('items', idx, 'description', e.target.value)}
                    />
                  </div>
                  {renderImageField("Image du domaine", "image", item.image, true, 'items', idx)}
                </div>
              ))}
            </div>
          )}

          {sectionName === 'reviews' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Titre de la section</label>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.reviews?.title || ''}
                  onChange={(e) => handleInputChange('reviews.title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Sous-titre de la section</label>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.reviews?.subtitle || ''}
                  onChange={(e) => handleInputChange('reviews.subtitle', e.target.value)}
                />
              </div>
              {formData.reviews?.items?.map((item, idx) => (
                <div key={idx} className="border border-white/10 p-4 rounded-xl bg-white/5 space-y-3">
                  <h4 className="font-bold text-[#00d26a]">Avis #{idx + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Nom</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                        value={item.name || ''}
                        onChange={(e) => handleArrayChange('items', idx, 'name', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Rôle/Service</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                        value={item.role || ''}
                        onChange={(e) => handleArrayChange('items', idx, 'role', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-gray-400 mb-1">Avatar (Emoji)</label>
                      <input
                        type="text"
                        className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                        value={item.avatar || ''}
                        onChange={(e) => handleArrayChange('items', idx, 'avatar', e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Commentaire</label>
                    <textarea
                      rows="2"
                      className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                      value={item.content || ''}
                      onChange={(e) => handleArrayChange('items', idx, 'content', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {sectionName === 'b2b' && (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Titre de la section</label>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.b2b?.title || ''}
                  onChange={(e) => handleInputChange('b2b.title', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Sous-titre de la section</label>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.b2b?.subtitle || ''}
                  onChange={(e) => handleInputChange('b2b.subtitle', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-300 mb-1">Description principale</label>
                <textarea
                  rows="3"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={formData.b2b?.description || ''}
                  onChange={(e) => handleInputChange('b2b.description', e.target.value)}
                />
              </div>
              {formData.b2b?.points?.map((point, idx) => (
                <div key={idx} className="border border-white/10 p-4 rounded-xl bg-white/5 space-y-3">
                  <h4 className="font-bold text-[#00d26a]">Point Fort #{idx + 1}</h4>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Titre du Point</label>
                    <input
                      type="text"
                      className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                      value={point.title || ''}
                      onChange={(e) => handleArrayChange('points', idx, 'title', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-400 mb-1">Description du Point</label>
                    <textarea
                      rows="2"
                      className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                      value={point.description || ''}
                      onChange={(e) => handleArrayChange('points', idx, 'description', e.target.value)}
                    />
                  </div>
                </div>
              ))}
              {renderImageField("Image de la section", "b2b.image", formData.b2b?.image)}
            </div>
          )}

          {/* Footer actions */}
          <div className="pt-6 border-t border-white/10 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-white/10 text-white font-bold hover:bg-white/5 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00d26a] text-white font-bold hover:bg-[#00b95c] transition-colors shadow-[0_0_15px_rgba(0,210,106,0.3)]"
            >
              Enregistrer les modifications
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditModal;

import React, { useState, useEffect } from 'react';

const PageEditModal = ({ isOpen, onClose, pageId, initialContent, onSave }) => {
  const [content, setContent] = useState({});

  useEffect(() => {
    if (initialContent) {
      setContent(JSON.parse(JSON.stringify(initialContent)));
    }
  }, [initialContent, isOpen]);

  if (!isOpen) return null;

  const handleFieldChange = (keys, value) => {
    setContent(prev => {
      const copy = { ...prev };
      let current = copy;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = value;
      return copy;
    });
  };

  const handleImageUpload = (e, keys) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleFieldChange(keys, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleArrayItemChange = (arrayKeys, index, field, value) => {
    setContent(prev => {
      const copy = { ...prev };
      let current = copy;
      for (let i = 0; i < arrayKeys.length; i++) {
        current = current[arrayKeys[i]];
      }
      if (current && current[index]) {
        current[index][field] = value;
      }
      return copy;
    });
  };

  const handleArrayImageUpload = (e, arrayKeys, index, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleArrayItemChange(arrayKeys, index, field, reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addArrayItem = (arrayKeys, template) => {
    setContent(prev => {
      const copy = { ...prev };
      let current = copy;
      for (let i = 0; i < arrayKeys.length; i++) {
        if (!current[arrayKeys[i]]) current[arrayKeys[i]] = [];
        current = current[arrayKeys[i]];
      }
      current.push(JSON.parse(JSON.stringify(template)));
      return copy;
    });
  };

  const removeArrayItem = (arrayKeys, index) => {
    setContent(prev => {
      const copy = { ...prev };
      let current = copy;
      for (let i = 0; i < arrayKeys.length; i++) {
        current = current[arrayKeys[i]];
      }
      if (current) {
        current.splice(index, 1);
      }
      return copy;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(content);
    onClose();
  };

  // Helper to determine if a key name suggests an image
  const isImageKey = (key) => {
    const k = key.toLowerCase();
    return k.includes('image') || k.includes('avatar') || k.includes('photo') || k.includes('logo');
  };

  // Helper to render field labels cleanly
  const formatLabel = (key) => {
    // Convert camelCase or snake_case to Space Separated Title Case
    const result = key.replace(/([A-Z])/g, " $1").replace(/[_-]/g, ' ');
    return result.charAt(0).toUpperCase() + result.slice(1);
  };

  const renderRecursiveFields = (obj, pathKeys = []) => {
    return Object.keys(obj).map(key => {
      const value = obj[key];
      const currentPath = [...pathKeys, key];
      const fieldId = currentPath.join('.');

      // Ignore metadata fields like _id or __v or pageId
      if (key === '_id' || key === '__v' || key === 'pageId') return null;

      // Handle null/undefined
      if (value === null || value === undefined) return null;

      // Handle arrays
      if (Array.isArray(value)) {
        // Find object template for new items
        const itemTemplate = value.length > 0 ? Object.keys(value[0]).reduce((acc, k) => {
          acc[k] = typeof value[0][k] === 'number' ? 0 : typeof value[0][k] === 'boolean' ? false : '';
          return acc;
        }, {}) : { title: '', description: '' };

        return (
          <div key={fieldId} className="border border-white/10 p-6 rounded-2xl bg-white/5 space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <h4 className="font-bold text-[#00d26a] text-lg">{formatLabel(key)}</h4>
              <button
                type="button"
                onClick={() => addArrayItem(currentPath, itemTemplate)}
                className="px-3 py-1 text-xs bg-[#00d26a] text-white font-bold rounded-lg hover:bg-[#00b95c] transition-colors"
              >
                + Ajouter
              </button>
            </div>
            
            <div className="space-y-6">
              {value.map((item, idx) => (
                <div key={`${fieldId}.${idx}`} className="p-4 border border-white/5 bg-[#250f38]/40 rounded-xl space-y-4 relative">
                  <button
                    type="button"
                    onClick={() => removeArrayItem(currentPath, idx)}
                    className="absolute top-3 right-3 text-red-400 hover:text-red-500 font-bold text-sm"
                  >
                    Supprimer
                  </button>
                  <span className="text-xs font-bold text-gray-400">Élément #{idx + 1}</span>
                  
                  <div className="grid grid-cols-1 gap-4 mt-2">
                    {Object.keys(item).map(subKey => {
                      const subVal = item[subKey];
                      const subId = `${fieldId}.${idx}.${subKey}`;
                      
                      if (subKey === '_id') return null;

                      if (isImageKey(subKey)) {
                        return (
                          <div key={subId} className="space-y-2 border border-white/5 p-3 rounded-lg bg-black/10">
                            <label className="block text-xs font-bold text-gray-300">{formatLabel(subKey)}</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <input
                                type="text"
                                className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#00d26a]"
                                value={subVal || ''}
                                onChange={(e) => handleArrayItemChange(currentPath, idx, subKey, e.target.value)}
                                placeholder="Lien URL de l'image"
                              />
                              <input
                                type="file"
                                accept="image/*"
                                className="w-full text-xs text-gray-400 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#00d26a]/20 file:text-[#00d26a] cursor-pointer"
                                onChange={(e) => handleArrayImageUpload(e, currentPath, idx, subKey)}
                              />
                            </div>
                            {subVal && (
                              <img src={subVal} alt="Preview" className="h-14 w-auto object-cover rounded-lg border border-white/10 mt-2" />
                            )}
                          </div>
                        );
                      }

                      return (
                        <div key={subId}>
                          <label className="block text-xs font-bold text-gray-300 mb-1">{formatLabel(subKey)}</label>
                          {typeof subVal === 'string' && subVal.length > 80 ? (
                            <textarea
                              rows="2"
                              className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00d26a]"
                              value={subVal || ''}
                              onChange={(e) => handleArrayItemChange(currentPath, idx, subKey, e.target.value)}
                            />
                          ) : (
                            <input
                              type="text"
                              className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-1.5 text-white text-xs focus:outline-none focus:border-[#00d26a]"
                              value={subVal || ''}
                              onChange={(e) => handleArrayItemChange(currentPath, idx, subKey, e.target.value)}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      }

      // Handle objects
      if (typeof value === 'object') {
        return (
          <div key={fieldId} className="border border-white/10 p-6 rounded-2xl bg-white/5 space-y-6">
            <h4 className="font-bold text-[#00d26a] text-lg border-b border-white/5 pb-2">{formatLabel(key)}</h4>
            <div className="space-y-4">
              {renderRecursiveFields(value, currentPath)}
            </div>
          </div>
        );
      }

      // Handle strings, numbers, booleans
      if (isImageKey(key)) {
        return (
          <div key={fieldId} className="space-y-2 border border-white/5 p-4 rounded-xl bg-white/5">
            <label className="block text-sm font-bold text-gray-300">{formatLabel(key)}</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <span className="block text-xs text-gray-400 mb-1">Entrer l'URL de l'image</span>
                <input
                  type="text"
                  className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
                  value={value || ''}
                  onChange={(e) => handleFieldChange(currentPath, e.target.value)}
                  placeholder="https://..."
                />
              </div>
              <div>
                <span className="block text-xs text-gray-400 mb-1">Ou importer un fichier</span>
                <input
                  type="file"
                  accept="image/*"
                  className="w-full text-xs text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-[#00d26a]/20 file:text-[#00d26a] hover:file:bg-[#00d26a]/30 cursor-pointer"
                  onChange={(e) => handleImageUpload(e, currentPath)}
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
      }

      return (
        <div key={fieldId} className="space-y-1">
          <label className="block text-sm font-bold text-gray-300">{formatLabel(key)}</label>
          {typeof value === 'string' && value.length > 80 ? (
            <textarea
              rows="3"
              className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
              value={value || ''}
              onChange={(e) => handleFieldChange(currentPath, e.target.value)}
            />
          ) : (
            <input
              type={typeof value === 'number' ? 'number' : 'text'}
              className="w-full bg-[#2a133d] border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-[#00d26a]"
              value={value || ''}
              onChange={(e) => handleFieldChange(currentPath, typeof value === 'number' ? Number(e.target.value) : e.target.value)}
            />
          )}
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-[#1e0a2d] border border-white/10 rounded-3xl w-full max-w-3xl max-h-[85vh] overflow-y-auto shadow-2xl animate-reveal">
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex justify-between items-center bg-gradient-to-r from-[#1e0a2d] to-[#2e1245]">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            ⚙️ Modifier le Contenu : <span className="text-[#00d26a] capitalize">{pageId}</span>
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors text-2xl font-bold">×</button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-6">
            {renderRecursiveFields(content)}
          </div>

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

export default PageEditModal;

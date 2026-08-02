import React, { useState } from 'react';
import { WishData, MemoriesLayout, MemoryItem } from '../../types';
import { Plus, Trash2, Upload, Image as ImageIcon, Sparkles } from 'lucide-react';

interface Step7MemoriesProps {
  wish: WishData;
  onChange: (updated: Partial<WishData>) => void;
  onNext: () => void;
}

export const Step7Memories: React.FC<Step7MemoriesProps> = ({ wish, onChange, onNext }) => {
  const [activeTab, setActiveTab] = useState<MemoriesLayout>(wish.memoriesLayout);

  const handleLayoutChange = (layout: MemoriesLayout) => {
    setActiveTab(layout);
    onChange({ memoriesLayout: layout });
  };

  const handleAddMemory = () => {
    const newMemory: MemoryItem = {
      id: `m_${Date.now()}`,
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800',
      caption: 'Best moment together 🌟'
    };
    onChange({ memories: [...wish.memories, newMemory] });
  };

  const handleRemoveMemory = (id: string) => {
    onChange({ memories: wish.memories.filter((m) => m.id !== id) });
  };

  const handleUpdateMemory = (id: string, partial: Partial<MemoryItem>) => {
    onChange({
      memories: wish.memories.map((m) => (m.id === id ? { ...m, ...partial } : m)),
    });
  };

  const handleFileUpload = (id: string, file: File) => {
    const isVideo = file.type.startsWith('video/');
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        handleUpdateMemory(id, {
          url: e.target.result as string,
          type: isVideo ? 'video' : 'image',
          videoUrl: isVideo ? (e.target.result as string) : undefined,
        });
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6 animate-fadeIn pb-12">
      <div className="space-y-1">
        <h2 className="text-3xl font-display font-semibold text-white tracking-wide">
          Your favorite <span className="font-script text-pink-400 font-normal">memories</span>
        </h2>
        <p className="text-sm text-pink-200/70">
          Photos with little captions — drag your finger to swipe through them.
        </p>
      </div>

      {/* Memory Card Preview */}
      {wish.memories.length > 0 && (
        <div className="p-6 rounded-2xl border border-pink-500/30 bg-[#160c22] shadow-xl flex flex-col items-center justify-center relative">
          <div className="flex items-center gap-1.5 mb-3 self-start">
            <Sparkles className="w-4 h-4 text-pink-400" />
            <span className="text-xs font-semibold text-pink-300 uppercase">
              {wish.memoriesLayout} Preview
            </span>
          </div>

          {/* Polaroid Frame Preview */}
          <div className="w-56 p-3 pb-8 bg-white text-slate-900 rounded-sm shadow-2xl transform -rotate-2 transition-all">
            <div className="w-full h-44 bg-slate-200 rounded-sm overflow-hidden mb-3">
              <img
                src={wish.memories[0].url}
                alt="Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800';
                }}
              />
            </div>
            <p className="font-handwriting text-xl text-center text-slate-800 leading-tight">
              {wish.memories[0].caption || 'Our special memory'}
            </p>
          </div>
        </div>
      )}

      {/* Memories Layout Selector */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-pink-300">
          MEMORIES LAYOUT
        </label>
        <div className="flex gap-2 p-1.5 bg-[#160c22] border border-pink-500/20 rounded-xl">
          {(['polaroid', 'cinema', 'scrapbook'] as MemoriesLayout[]).map((layout) => (
            <button
              key={layout}
              type="button"
              onClick={() => handleLayoutChange(layout)}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                activeTab === layout
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                  : 'text-pink-200/60 hover:text-white'
              }`}
            >
              {layout}
            </button>
          ))}
        </div>
      </div>

      {/* Memory Items List */}
      <div className="space-y-4">
        {wish.memories.map((item, index) => (
          <div
            key={item.id}
            className="p-4 rounded-2xl border border-pink-500/20 bg-[#160c22] space-y-3 relative group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-pink-300 uppercase">
                Photo {index + 1}
              </span>
              {wish.memories.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMemory(item.id)}
                  className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Caption */}
            <div>
              <label className="block text-[10px] font-bold uppercase text-pink-300/70 mb-1">
                CAPTION {index + 1}
              </label>
              <input
                type="text"
                value={item.caption}
                onChange={(e) => handleUpdateMemory(item.id, { caption: e.target.value })}
                placeholder="Write a sweet memory caption..."
                className="w-full px-3.5 py-2.5 bg-[#12071a] border border-pink-500/30 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            </div>

            {/* Image URL / Upload */}
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase text-pink-300/70">
                IMAGE URL OR UPLOAD
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  value={item.url}
                  onChange={(e) => handleUpdateMemory(item.id, { url: e.target.value })}
                  placeholder="https://..."
                  className="flex-1 px-3.5 py-2.5 bg-[#12071a] border border-pink-500/30 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-pink-500/20"
                />
                <label className="px-4 py-2.5 bg-pink-500/20 hover:bg-pink-500/30 border border-pink-500/40 rounded-xl text-xs font-semibold text-pink-200 flex items-center gap-1.5 cursor-pointer transition-all active:scale-95">
                  <Upload className="w-3.5 h-3.5" />
                  Upload Photo/Video
                  <input
                    type="file"
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        handleFileUpload(item.id, e.target.files[0]);
                      }
                    }}
                  />
                </label>
              </div>
            </div>

            {/* Image Thumbnail */}
            {item.url && (
              <div className="flex items-center gap-3 pt-1">
                <img
                  src={item.url}
                  alt="Thumbnail"
                  className="w-12 h-12 object-cover rounded-lg border border-pink-500/30 bg-slate-800"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                <span className="text-xs text-pink-200/60 truncate flex-1">
                  {item.url.startsWith('data:') ? 'Uploaded local image' : item.url}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add Memory Button */}
      <button
        type="button"
        onClick={handleAddMemory}
        className="w-full py-3 border-2 border-dashed border-pink-500/40 hover:border-pink-500/70 rounded-2xl text-pink-300 hover:text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer bg-white/5 hover:bg-white/10"
      >
        <Plus className="w-4 h-4" />
        Add memory
      </button>

      <div className="pt-2 flex justify-between items-center">
        <button
          type="button"
          onClick={onNext}
          className="text-xs font-semibold text-pink-300/70 hover:text-white transition-colors"
        >
          Skip
        </button>
        <button
          type="button"
          onClick={onNext}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white font-semibold shadow-lg shadow-pink-500/25 active:scale-95 transition-all cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
};

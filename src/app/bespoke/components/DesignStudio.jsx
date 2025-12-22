// src/app/bespoke/components/DesignStudio.js
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Palette,
  Ruler,
  Layers,
  Grid,
  Sliders,
  Droplets,
  Sparkles,
  Settings,
  Eye
} from 'lucide-react';
import { HexColorPicker } from 'react-colorful';
import * as Slider from '@radix-ui/react-slider';

const DesignStudio = ({ 
  activeTab, 
  customization, 
  onCustomizationChange,
  materials,
  features,
  onMaterialSelect
}) => {
  const [color, setColor] = useState(customization.color);

  const handleColorChange = (newColor) => {
    setColor(newColor);
    onCustomizationChange('color', newColor);
  };

  const handleDimensionChange = (dimension, value) => {
    onCustomizationChange('dimensions', {
      ...customization.dimensions,
      [dimension]: value
    });
  };

  const toggleFeature = (featureId) => {
    const currentFeatures = customization.features;
    const newFeatures = currentFeatures.includes(featureId)
      ? currentFeatures.filter(id => id !== featureId)
      : [...currentFeatures, featureId];
    onCustomizationChange('features', newFeatures);
  };

  return (
    <div className="h-full">
      {/* Studio Header */}
      <div className="border-b border-zinc-800 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-light">Design Studio</h3>
            <p className="text-zinc-400 text-sm">Customize every detail of your piece</p>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 border border-amber-600/30 rounded-full text-sm hover:bg-amber-900/20 transition-all">
              <Eye className="w-4 h-4 inline mr-2" />
              Preview
            </button>
            <button className="px-4 py-2 border border-amber-600/30 rounded-full text-sm hover:bg-amber-900/20 transition-all">
              <Settings className="w-4 h-4 inline mr-2" />
              Settings
            </button>
          </div>
        </div>
      </div>

      {/* Studio Content */}
      <div className="p-6">
        {activeTab === 'design' && (
          <div className="space-y-8">
            {/* Color Picker */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Palette className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-light">Color Selection</h4>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <HexColorPicker 
                    color={color} 
                    onChange={handleColorChange}
                    className="!w-full"
                  />
                </div>
                <div>
                  <div className="text-sm text-zinc-400 mb-2">Selected Color</div>
                  <div className="flex items-center space-x-4">
                    <div 
                      className="w-16 h-16 rounded-lg border border-zinc-700"
                      style={{ backgroundColor: color }}
                    />
                    <div>
                      <div className="text-lg font-light">HEX: {color}</div>
                      <div className="text-sm text-zinc-400">Custom color</div>
                    </div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="text-sm text-zinc-400">Color Families</div>
                    <div className="flex space-x-2">
                      {['#8B4513', '#654321', '#D4AF37', '#000000', '#FFFFFF'].map(shade => (
                        <button
                          key={shade}
                          onClick={() => handleColorChange(shade)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            color === shade ? 'border-amber-400' : 'border-zinc-700'
                          }`}
                          style={{ backgroundColor: shade }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dimensions */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Ruler className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-light">Dimensions</h4>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: 'Width', key: 'width', value: customization.dimensions.width, unit: 'cm' },
                  { label: 'Depth', key: 'depth', value: customization.dimensions.depth, unit: 'cm' },
                  { label: 'Height', key: 'height', value: customization.dimensions.height, unit: 'cm' }
                ].map(dim => (
                  <div key={dim.key} className="space-y-4">
                    <div className="flex justify-between">
                      <div className="text-sm text-zinc-400">{dim.label}</div>
                      <div className="text-lg font-light">{dim.value}{dim.unit}</div>
                    </div>
                    <Slider.Root
                      className="relative flex items-center select-none touch-none w-full h-5"
                      value={[dim.value]}
                      onValueChange={([value]) => handleDimensionChange(dim.key, value)}
                      max={400}
                      step={5}
                    >
                      <Slider.Track className="bg-zinc-800 relative grow rounded-full h-2">
                        <Slider.Range className="absolute bg-gradient-to-r from-amber-600 to-amber-800 rounded-full h-full" />
                      </Slider.Track>
                      <Slider.Thumb className="block w-5 h-5 bg-amber-600 rounded-full focus:outline-none focus:shadow-lg hover:scale-110 transition-transform" />
                    </Slider.Root>
                  </div>
                ))}
              </div>
            </div>

            {/* Finish Options */}
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Droplets className="w-5 h-5 text-amber-400" />
                <h4 className="text-lg font-light">Finish & Details</h4>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 'matte', label: 'Matte', description: 'Soft, non-reflective' },
                  { id: 'gloss', label: 'High-Gloss', description: 'Mirror-like shine' },
                  { id: 'satin', label: 'Satin', description: 'Subtle sheen' },
                  { id: 'patina', label: 'Patina', description: 'Aged appearance' }
                ].map(finish => (
                  <button
                    key={finish.id}
                    onClick={() => onCustomizationChange('finish', finish.id)}
                    className={`p-4 rounded-xl border transition-all ${
                      customization.finish === finish.id
                        ? 'border-amber-600 bg-amber-900/20'
                        : 'border-zinc-800 hover:border-amber-600/30'
                    }`}
                  >
                    <div className="text-left">
                      <div className="font-light mb-1">{finish.label}</div>
                      <div className="text-xs text-zinc-400">{finish.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'materials' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Layers className="w-5 h-5 text-amber-400" />
              <h4 className="text-lg font-light">Select Material</h4>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {materials.map(material => (
                <button
                  key={material.id}
                  onClick={() => onMaterialSelect(material)}
                  className={`p-4 rounded-xl border transition-all text-left ${
                    customization.material === material.id
                      ? 'border-amber-600 bg-amber-900/20'
                      : 'border-zinc-800 hover:border-amber-600/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="font-light text-lg mb-1">{material.name}</div>
                      <div className="text-sm text-zinc-400">{material.type}</div>
                    </div>
                    <div className="text-amber-400 font-light">{material.price}</div>
                  </div>
                  <p className="text-sm text-zinc-400 mb-4 line-clamp-2">{material.description}</p>
                  <div className="flex space-x-2">
                    {material.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border border-zinc-700"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'features' && (
          <div className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h4 className="text-lg font-light">Additional Features</h4>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {features.map(feature => (
                <button
                  key={feature.id}
                  onClick={() => toggleFeature(feature.id)}
                  className={`p-4 rounded-xl border transition-all ${
                    customization.features.includes(feature.id)
                      ? 'border-amber-600 bg-amber-900/20'
                      : 'border-zinc-800 hover:border-amber-600/30'
                  }`}
                >
                  <div className="text-2xl mb-2">{feature.icon}</div>
                  <div className="text-left">
                    <div className="font-light text-sm mb-1">{feature.name}</div>
                    <div className="text-xs text-zinc-400 capitalize">{feature.category}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Feature Categories */}
            <div className="pt-8 border-t border-zinc-800">
              <h5 className="font-light mb-4">Feature Categories</h5>
              <div className="flex space-x-4 overflow-x-auto pb-2">
                {['all', 'comfort', 'tech', 'luxury', 'function'].map(category => (
                  <button
                    key={category}
                    className="px-4 py-2 border border-zinc-800 rounded-full text-sm capitalize whitespace-nowrap hover:border-amber-600/30 transition-all"
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Design Summary */}
        <div className="mt-8 pt-8 border-t border-zinc-800">
          <h5 className="font-light mb-4">Design Summary</h5>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 border border-zinc-800 rounded-xl">
              <div className="text-xs text-zinc-400 mb-1">Color</div>
              <div className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border border-zinc-700"
                  style={{ backgroundColor: customization.color }}
                />
                <span className="text-sm">Custom</span>
              </div>
            </div>
            <div className="p-3 border border-zinc-800 rounded-xl">
              <div className="text-xs text-zinc-400 mb-1">Material</div>
              <div className="text-sm">
                {materials.find(m => m.id === customization.material)?.name || 'Select material'}
              </div>
            </div>
            <div className="p-3 border border-zinc-800 rounded-xl">
              <div className="text-xs text-zinc-400 mb-1">Features</div>
              <div className="text-sm">{customization.features.length} selected</div>
            </div>
            <div className="p-3 border border-zinc-800 rounded-xl">
              <div className="text-xs text-zinc-400 mb-1">Size</div>
              <div className="text-sm">
                {customization.dimensions.width} × {customization.dimensions.depth}cm
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignStudio;


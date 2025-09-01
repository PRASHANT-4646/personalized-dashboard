'use client';
import { useState } from 'react';
import { useWidgets } from '@/context/WidgetContext';
import { WidgetType } from '@/context/WidgetContext';
import { WIDGET_CONFIGS } from '@/utils/constants';

export const AddWidgetMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { dispatch } = useWidgets();

  const addWidget = (type: WidgetType) => {
    const id = `${type}-${Date.now()}`;
    dispatch({ type: 'ADD_WIDGET', payload: { id, type } });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        aria-label="Add widget"
      >
        <span>Add Widget</span>
        {/* <Plus size={18} /> */}
        Add Task
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20 text-gray-800">
            {Object.entries(WIDGET_CONFIGS).map(([type, config]) => (
              <button
                key={type}
                onClick={() => addWidget(type as WidgetType)}
                className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              >
                {config.title}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
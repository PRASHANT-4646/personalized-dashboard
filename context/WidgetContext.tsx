'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export type WidgetType = 'weather' | 'news' | 'crypto' | 'dog';

interface WidgetConfig {
  location?: string;
  currency?: string;
  refreshInterval?: number;
}
interface Widget {
  id: string;
  type: WidgetType;
  config?: WidgetConfig;
}
interface WidgetState {
  widgets: Widget[];
}
type WidgetAction =
  | { type: 'ADD_WIDGET'; payload: Widget }
  | { type: 'REMOVE_WIDGET'; payload: string }
  | { type: 'REORDER_WIDGETS'; payload: Widget[] };
const WidgetContext = createContext<{
  state: WidgetState;
  dispatch: React.Dispatch<WidgetAction>;
} | null>(null);
const widgetReducer = (state: WidgetState, action: WidgetAction): WidgetState => {
  switch (action.type) {
    case 'ADD_WIDGET':
      return {
        ...state,
        widgets: [...state.widgets, action.payload],
      };
    case 'REMOVE_WIDGET':
      return {
        ...state,
        widgets: state.widgets.filter(widget => widget.id !== action.payload),
      };
    case 'REORDER_WIDGETS':
      return {
        ...state,
        widgets: action.payload,
      };
    default:
      return state;
  }
};
export const WidgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(widgetReducer, {
    widgets: [],
  });
  return (
    <WidgetContext.Provider value={{ state, dispatch }}>
      {children}
    </WidgetContext.Provider>
  );
};
export const useWidgets = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgets must be used within a WidgetProvider');
  }
  return context;
};
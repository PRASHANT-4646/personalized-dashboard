'use client';
import { useWidgets } from '@/context/WidgetContext';
import { WeatherWidget } from './widgets/WeatherWidget';
import { NewsWidget } from './widgets/NewsWidget';
import { CryptoWidget } from './widgets/CryptoWidget';
import { DogWidget } from './widgets/DogWidget';
const widgetComponents = {
  weather: WeatherWidget,
  news: NewsWidget,
  crypto: CryptoWidget,
  dog: DogWidget,
};
export const WidgetContainer = () => {
  const { state, dispatch } = useWidgets();
  const removeWidget = (id: string) => {
    dispatch({ type: 'REMOVE_WIDGET', payload: id });
  };
  if (state.widgets.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <p className="text-gray-500">Click The button and Add the Task here</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {state.widgets.map(widget => {
        const WidgetComponent = widgetComponents[widget.type];
        return (
          <div key={widget.id} className="relative bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
            <button
              onClick={() => removeWidget(widget.id)}
              className=" top-2 right-2  text-blue-500 bg-blue-200 hover:bg-gray-400 transition-colors z-10"
              aria-label="Remove widget"
            >
             
                   Remove task
            </button>
            <WidgetComponent />
          </div>
        );
      })}
    </div>
  );
};
import { WidgetContainer } from './WidgetContainer';
export const Dashboard = () => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Dashboard</h1>
      </div>
      <WidgetContainer />
    </div>
  );
};
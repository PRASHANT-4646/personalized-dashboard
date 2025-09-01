import { Dashboard } from  '../components/Dashboard' 
import { Navbar } from '../components/Navbar'
import { Sidebar } from '../components/Sidebar'

export default function DashboardPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          <div className="container mx-auto px-4 py-6">
            <Dashboard />
          </div>
        </main>
      </div>
    </div>
  );
}
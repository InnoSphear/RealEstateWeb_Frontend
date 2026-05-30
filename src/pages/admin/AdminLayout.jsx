import { useState } from 'react';
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const sidebarLinks = [
  { name: 'Dashboard', path: '/admin', icon: '◆' },
  { name: 'Properties', path: '/admin/properties', icon: '🏠' },
  { name: 'Inquiries', path: '/admin/inquiries', icon: '✉' },
  { name: 'Testimonials', path: '/admin/testimonials', icon: '★' },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? 'w-16' : 'w-60'} bg-black text-white transition-all duration-200 flex flex-col`}>
        <div className={`p-4 border-b border-white/10 ${collapsed ? 'text-center' : ''}`}>
          {collapsed ? (
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mx-auto">
              <span className="text-black text-sm font-bold">S</span>
            </div>
          ) : (
            <div>
              <p className="font-serif text-lg font-bold">Shivam</p>
              <p className="text-[8px] tracking-[0.3em] text-gray-400 uppercase">International</p>
              <p className="text-[10px] text-gray-500 mt-2 uppercase tracking-wider">Admin Panel</p>
            </div>
          )}
        </div>

        <nav className="flex-1 py-4">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center ${collapsed ? 'justify-center px-2' : 'px-4'} py-3 text-sm transition-colors ${
                  isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
                title={collapsed ? link.name : undefined}
              >
                <span className={collapsed ? '' : 'mr-3'}>{link.icon}</span>
                {!collapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-400 hover:text-white text-xs mb-2 block w-full text-left"
          >
            {collapsed ? '→' : 'Collapse'}
          </button>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-white text-xs block w-full text-left"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

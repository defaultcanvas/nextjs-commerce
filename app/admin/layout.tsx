import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import Header from '../../components/admin/Header';

export const metadata = { title: 'Admin Hub' };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          <aside style={{ width: 260, borderRight: '1px solid #e6e6e6' }}>
            <Sidebar />
          </aside>
          <div style={{ flex: 1 }}>
            <Header />
            <main style={{ padding: 20 }}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}

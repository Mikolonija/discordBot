import React, { ReactNode } from 'react';
import { LayoutStyle } from '@/components/Layout/style';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <LayoutStyle>
      <Header />
      {children}
      <Footer />
    </LayoutStyle>
  );
};

export default Layout;

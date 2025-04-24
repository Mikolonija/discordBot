import { ReactNode } from 'react';
import { LayoutStyle } from '@/components/Layout/style';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

interface IProps {
  children: ReactNode;
}

const Layout = (props: IProps) => {
  const { children } = props;

  return (
    <LayoutStyle>
      <Header />
      {children}
      <Footer />
    </LayoutStyle>
  );
};

export default Layout;

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DefaultStyle } from '@/styles/global-default';
import { GlobalPosition } from '@/styles/global-position';
import { ThemeProvider } from 'styled-components';
import { themeLight } from '@/styles/global-colors';
import { GlobalVariables } from '@/styles/global-veriables';
import Layout from '@/components/Layout';
import { IRouterType } from '@/utils/interface/router';
import { routers } from '@/router/routes';
import { GlobalFonts } from '@/styles/global-fonts';
import { GlobalButtons } from '@/styles/global-btn';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeLight}>
        <Layout>
          <Routes>
            {routers.map((route: IRouterType) => (
              <Route key={route.id} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </Layout>
        <GlobalPosition />
        <GlobalVariables />
        <GlobalFonts />
        <GlobalButtons />
        <DefaultStyle />
        <ToastContainer />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

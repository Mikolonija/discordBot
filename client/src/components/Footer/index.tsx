import { FooterStyle } from '@/components/Footer/style';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterStyle>
      <div className="g-container g-right">
        <p className="g-font-normal14">© {currentYear} Modys. All rights reserved.</p>
      </div>
    </FooterStyle>
  );
};

export default Footer;

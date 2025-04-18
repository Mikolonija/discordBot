import { media } from '@/utils/media/devices_media';
import styled from 'styled-components';

export const HeaderStyle = styled.header`
  background: ${(props) => props.theme.navBarBgColor};
  color: ${(props) => props.theme.textColor};

  .nav {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr auto;
    text-transform: capitalize;
    &-pages-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--min-spacing);
    }
    @media ${media.mobileL} {
      grid-template-columns: 1fr;
      &-pages-list {
        justify-content: center;
        width: 100%;
        margin: var(--md-spacing) 0;
      }
    }
  }
`;

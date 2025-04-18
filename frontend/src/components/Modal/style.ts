import styled from 'styled-components';
import { media } from '@/utils/media/devices_media';

export const ModalStyle = styled.div`
  position: fixed;
  z-index: 10000;
  background: ${(props) => props.theme.modalOutsideBgColor};
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  @media ${media.mobileL} {
    min-width: 100%;
  }

  .dialog {
    color: ${(props) => props.theme.textColor};
    width: 600px;
    border-radius: var(--min-radius);
    padding: var(--md-spacing);
    background-color: ${(props) => props.theme.modalBgColor};
    @media ${media.tablet} {
      width: auto;
      height: 100%;
      position: relative;
      display: grid;
      border-radius: 0;
      grid-template-rows: auto 1fr auto;
      top: 0;
      left: 0;
      bottom: 0;
      transform: none;
    }
    &-header {
      display: grid;
      height: 40px;
      grid-template-columns: 1fr auto;
      border-bottom: solid 1px ${(props) => props.theme.modalBorderColor};
      padding: 0 var(--md-spacing) var(--md-spacing) var(--md-spacing);
      margin: 0 calc(-1 * var(--md-spacing));
    }
    &-main {
      padding: var(--md-spacing) 0;
      @media ${media.tablet} {
        overflow-y: auto;
        overflow-x: hidden;
      }
    }
    &-footer {
      width: 100%;
      padding: var(--md-spacing) var(--md-spacing) 0 var(--md-spacing);
      margin: 0 calc(-1 * var(--md-spacing));
      display: flex;
      border-top: solid 1px #131419;
      grid-gap: var(--md-spacing);
      button {
        width: 130px;
      }
      @media ${media.tablet} {
        display: grid;
        grid-template-columns: 1fr;
        gap: var(--min-spacing);
        padding-bottom: var(--big-spacing);
        button {
          width: 100%;
        }
      }
    }
  }

  .close-icon-disable {
    cursor: not-allowed;
  }
  .close-icon {
    cursor: pointer;
  }
`;

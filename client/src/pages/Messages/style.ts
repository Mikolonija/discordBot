import { media } from '@/utils/media/devices_media';
import styled from 'styled-components';

export const MessagesStyle = styled.main`
  .page-layout {
    display: grid;
    gap: var(--md-spacing);
    grid-template-columns: 1fr auto;
    grid-template-rows: auto 1fr;
    @media ${media.tablet} {
      display: flex;
      flex-wrap: wrap;
    }
  }
  .loader-position {
    grid-row: 1;
    margin: 0 auto;
  }

  .message-search-container {
    grid-row: 1;
    display: grid;
    grid-template-columns: 1fr auto;
    gap: var(--md-spacing);
    button {
      min-width: 130px;
    }
    @media ${media.tablet} {
      width: 100%;
      margin-bottom: var(--sm-spacing);
    }
  }

  .message-table {
    grid-row: 2;
    width: 100%;
    margin-bottom: var(--big-spacing);
    @media ${media.tablet} {
      width: 100%;
      margin-bottom: var(--md-spacing);
    }
  }

  .profile-card {
    grid-row: 1/3;
    @media ${media.tablet} {
      width: 100%;
    }
  }
  .message-text {
    word-break: break-word;
  }
  .message-gif {
    margin: var(--md-spacing) 0 0 0;
    max-height: 180px;
    height: auto;
    object-fit: contain;
  }
`;

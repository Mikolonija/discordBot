import { media } from '@/utils/media/devices_media';
import styled from 'styled-components';

export const ProfileCardStyle = styled.div`
  width: 300px;
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: var(--min-radius);
  color: ${(props) => props.theme.textColor};
  @media ${media.tablet} {
    width: 100%;
  }
  .header {
    border-radius: var(--min-radius) var(--min-radius) 0 0;
    background-color: ${(props) => props.theme.avatarBgColor};
    height: 80px;
    position: relative;
  }

  .body {
    padding: var(--big-max-spacing) var(--md-spacing) var(--md-spacing) var(--md-spacing);
  }

  .profile-info {
    padding: 0 0 var(--md-max-spacing) 0;
    display: grid;
    gap: var(--min-max-spacing);
  }

  .action {
    padding: 18px var(--md-spacing) 0 var(--md-spacing);
    margin: 0 calc(-1 * var(--md-spacing));
    border-top: solid 1px ${(props) => props.theme.cardBorderColor};
    display: grid;
    gap: var(--min-spacing);
  }

  .avatar {
    background-color: ${(props) => props.theme.avatarBgColor};
    position: absolute;
    border: solid var(--min-radius) ${(props) => props.theme.avatarBorderColor};
    border-radius: 50%;
    padding: var(--min-spacing);
    margin-left: var(--md-spacing);
    bottom: -35px;
  }

  .action-title-position {
    margin: 0 0 var(--min-spacing) 0;
  }

  .input-block {
    display: grid;
    gap: var(--min-max-spacing);
  }

  .btn-submit-position {
    margin: var(--min-spacing) 0 0 0;
  }
`;

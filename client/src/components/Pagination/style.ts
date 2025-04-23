import styled from 'styled-components';

export const PaginationStyle = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--min-spacing);
  .not-allow {
    cursor: not-allowed;
  }
  .pages {
    display: flex;
    gap: var(--min-max-spacing);
    button {
      min-width: 40px;
    }
  }
`;

import styled from 'styled-components';

export const SprintsStyle = styled.main`
  .btn-add-position {
    width: 130px;
    padding: var(--md-spacing) 0 var(--big-spacing) 0;
  }

  .sprint-form {
    display: grid;
    width: 100%;
    gap: var(--md-spacing);
    grid-template-columns: 1fr;
    &-label {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: var(--md-spacing);
      margin-bottom: var(--min-spacing);
    }
  }
`;

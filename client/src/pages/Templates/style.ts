import styled from 'styled-components';

export const TemplatesStyle = styled.main`
  .btn-add-position {
    width: 130px;
  }

  .template-footer {
    display: flex;
    padding: var(--md-spacing) 0 var(--big-spacing) 0;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .template-form {
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

  .tags {
    padding: var(--md-spacing) 0 0 0;
  }
`;

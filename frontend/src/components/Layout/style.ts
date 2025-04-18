import styled from 'styled-components';

export const LayoutStyle = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;

  header {
    padding: var(--min-spacing);
    flex-shrink: 0;
    background-color: ${(props) => props.theme.navBarBgColor};
  }

  footer {
    padding: var(--min-spacing);
    flex-shrink: 0;
    height: 60px;
    background-color: ${(props) => props.theme.navBarBgColor};
  }

  main {
    padding: var(--big-spacing) var(--min-spacing);
    background-color: ${(props) => props.theme.mainBgColor};
    height: 100%;
    overflow: auto;
  }
`;

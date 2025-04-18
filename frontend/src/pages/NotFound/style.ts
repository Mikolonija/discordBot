import styled from 'styled-components';

export const NotFoundStyle = styled.main`
  .card {
    width: 600px;
    max-width: 95%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    color: ${(props) => props.theme.textColor};
  }
  .not-found {
    max-width: 300px;
    max-height: 300px;
  }
  h1 {
    padding-bottom: 10px;
  }
  button {
    margin: 32px 0;
    max-width: 130px;
  }
`;

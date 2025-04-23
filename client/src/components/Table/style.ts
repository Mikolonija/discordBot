import styled from 'styled-components';
export const TableStyle = styled.table`
  border-collapse: collapse;
  width: 100%;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.cardBgColor};
  border-radius: var(--min-radius);

  td.hide-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .hide-text {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    width: 100%;
  }
  thead {
    text-align: center;
    background-color: ${(props) => props.theme.tableTheadBgColor};
  }
  tbody {
    display: block;
    height: auto;
    max-height: 500px;
    overflow: auto;
  }
  td:first-child {
    width: 60px;
  }
  th:first-child {
    width: 60px;
  }

  thead,
  tbody tr {
    display: table;
    width: 100%;
    height: auto;
    table-layout: fixed;
  }

  tr {
    height: 40px;
  }

  thead {
    border-radius: var(--min-radius) var(--min-radius) 0 0;
  }

  th,
  td {
    height: 40px;
    padding: var(--min-spacing) var(--min-max-spacing);
    text-align: left;
    vertical-align: middle;
    border-bottom: 1px solid ${(props) => props.theme.tableBorderColor};
  }

  td:first-child {
    text-align: left;
    padding: 0 0 0 var(--min-spacing);
  }

  th:first-child {
    text-align: left;
    padding: 0 0 0 var(--min-spacing);
  }

  th:last-child {
    text-align: right;
    padding: 0 var(--min-spacing) 0 0;
  }

  td:last-child {
    text-align: right;
    padding: 0 var(--min-spacing) 0 0;
  }

  tr:last-child td,
  th {
    border-bottom: none;
  }

  th:last-child,
  td:last-child {
    width: 130px;
  }
  .btn-positions {
    display: flex;
    min-width: 130px;
    gap: var(--min-spacing);
  }

  .default-row {
    padding: var(--min-spacing) var(--min-max-spacing) !important;
    text-align: center !important;
  }
  .skeleton-loader {
    width: 100%;
    height: 280px;
    border-radius: var(--min-radius);
    animation: pulse 1.5s infinite ease-in-out;
  }

  @keyframes pulse {
    0% {
      background-color: ${(props) => props.theme.skeletonBgColor1};
    }
    50% {
      background-color: ${(props) => props.theme.skeletonBgColor2};
    }
    100% {
      background-color: ${(props) => props.theme.skeletonBgColor1};
    }
  }
`;

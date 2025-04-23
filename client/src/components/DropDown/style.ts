import styled from 'styled-components';

export const DropDownStyle = styled.div`
  text-align: left;
  position: relative;
  width: 100%;
  color: ${(props) => props.theme.textColor};

  .dropdown {
    cursor: pointer;
    &-input {
      min-height: 40px;
      background-color: ${(props) => props.theme.inputBkg};
      display: flex;
      padding: 0 var(--min-spacing);
      align-items: center;
      justify-content: space-between;
      border-radius: var(--min-radius);
    }
    &-current-value {
      padding: var(--min-spacing) 0;
    }
    &-row-rotate {
      transform: rotate(180deg);
    }
    &-menu {
      position: absolute;
      transform: translateY(4px);
      width: 100%;
      border-radius: var(--min-radius);
      overflow: auto;
      max-height: 150px;
      background-color: ${(props) => props.theme.dropdownMenuBgColor};
      z-index: 100;
    }
    &-item {
      padding: var(--min-spacing);
    }
    &-item:hover {
      background-color: ${(props) => props.theme.dropdownHoverBgColor};
    }
    &-item.selected {
      background-color: ${(props) => props.theme.dropdownSelectedBgColor};
    }
  }
`;

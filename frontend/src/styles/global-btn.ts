import { createGlobalStyle } from 'styled-components';

export const GlobalButtons = createGlobalStyle`
.g-btn-submit {
    border: solid 2px transparent; 
    background-color: ${(props) => props.theme.btnBgColor}; 
    padding: var(--min-spacing);
    border-radius: var(--min-radius);
	height: 40px;
    cursor: pointer;
    width: 100%;
    color: ${(props) => props.theme.textColor}; 
}

.g-btn-submit:hover{
    opacity: 0.8;
}

.g-btn-submit:disabled{
    opacity: 0.5;
    cursor: not-allowed;
}
.g-btn-delete-confirm{
    background-color: ${(props) => props.theme.btnDeleteBgColor}; 
    padding: var(--min-spacing);
    border-radius: var(--min-radius);
    border: none;
	height: 40px;
    cursor: pointer;
    width: 100%;
    color:  ${(props) => props.theme.textColor}; 
}
.g-btn-delete-confirm:disabled{
    opacity: 0.5;
    cursor: not-allowed;
}

.g-btn-delete-confirm:hover{
    opacity: 0.8;
}
.g-btn-delete {
    border: solid 2px ${(props) => props.theme.btnDeleteBgColor}; 
    padding: var(--min-spacing);
    border-radius: var(--min-radius);
	height: 40px;
    cursor: pointer;
    background-color: transparent;
    width: 100%;
    color:  ${(props) => props.theme.textColor}; 
}

.g-btn-delete:disabled{
    opacity: 0.5;
    cursor: not-allowed;
}

.g-btn-delete:hover{
    opacity: 0.8;
}
.g-btn-cancel {
    border: solid 2px ${(props) => props.theme.btnBgColor}; 
    padding: var(--min-spacing);
    border-radius: var(--min-radius);
	height: 40px;
    cursor: pointer;
    background-color: transparent;
    width: 100%;
    color:  ${(props) => props.theme.textColor}; 
}

.g-btn-cancel:disabled{
    opacity: 0.5;
    cursor: not-allowed;
}

.g-btn-cancel:hover{
    opacity: 0.8;
}
`;

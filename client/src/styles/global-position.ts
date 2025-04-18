import { createGlobalStyle } from 'styled-components';

export const GlobalPosition = createGlobalStyle`

.g-right {
    display: flex;
    justify-self: right;
    justify-content: right;
    align-items: center;
    align-self: center;
}

.g-left {
    display: flex;
    justify-self: left;
    justify-content: left;
    align-items: center;
    align-self: center;
}
.g-left-center{
    display: flex;
    justify-self: left;
    justify-content: center;
    align-items: center;
    align-self: center;
}
.g-center{
    display: center;
    justify-self: center;
    justify-content: center;
    align-items: center;
    align-self: center;
}

.g-center-in-all-window{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
`;

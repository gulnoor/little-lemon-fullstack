import styled from "@emotion/styled";
import { Select, TextField } from "@mui/material";

export const MyForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  margin: auto;
  padding: 32px;
  justify-content: space-between;
  width: 100%;
  @media screen and (min-width: 601px) {
    width: 80%;
  }
  @media screen and (min-width: 841px) {
    width: 55%;
  }
`;

export const StyledTextField = styled(TextField)`
  margin-bottom: 1rem;
  width: ${(props) =>
    props.name === "date" ||
    props.name === "time" ||
    props.name === "firstName" ||
    props.name === "lastName"
      ? "49%"
      : "100%"};

  & .MuiOutlinedInput-root > fieldset {
    border-width: 2px;
  }

  & Input {
    color: var(--md-sys-color-on-surface);
    color-scheme: ${(props) => (props.theme === "light" ? "light" : "dark")};
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px var(--md-sys-color-secondary-container)
        inset;
      -webkit-text-fill-color: var(--md-sys-color-on-secondary-container);
    }
  }

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
export const StyledSelect = styled(Select)`
  margin-bottom: 1rem;
  width: ${(props) =>
    props.name === "date" || props.name === "time" ? "49%" : "100%"};

  & .MuiOutlinedInput-root > fieldset {
    border-width: 2px;
  }

  & Input {
    color: var(--md-sys-color-on-surface);
    color-scheme: ${(props) => (props.theme === "light" ? "light" : "dark")};
    &:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px var(--md-sys-color-secondary-container)
        inset;
      -webkit-text-fill-color: var(--md-sys-color-on-secondary-container);
    }
  }
`;

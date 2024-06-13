import { TextField } from "@mui/material";

function camelCase(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

export const MyTextField = ({
  label,
  formik,
  type,
  theme,
  style,
  className,
}) => {
  const name = camelCase(label);

  return (
    <TextField
      id={name}
      name={name}
      label={label}
      error={formik.touched[name] && Boolean(formik.errors[name])}
      helperText={formik.touched[name] && formik.errors[name]}
      type={type}
      theme={theme}
      {...formik.getFieldProps(name)}
      InputLabelProps={label === "Date" ? { shrink: true } : null}
      multiline={type === "textarea" ? true : false}
      minRows={type === "textarea" ? 3 : null}
      sx={{
        maxWidth: "600px",
        "& .MuiInputBase-root": {
          backgroundColor: "var(--md-sys-color-surface-container-highest)",
        },
        " & .MuiOutlinedInput-root > fieldset": {
          borderWidth: "2px",
        },
        ...style,
      }}
      className={className}
    ></TextField>
  );
};

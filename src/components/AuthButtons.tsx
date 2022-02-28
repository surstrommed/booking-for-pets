import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export default function AuthButtons() {
  return (
    <Stack spacing={2} direction="row">
      <Button variant="contained" color="secondary">
        Войти
      </Button>
      <Button variant="contained" color="secondary">
        Зарегистрироваться
      </Button>
    </Stack>
  );
}

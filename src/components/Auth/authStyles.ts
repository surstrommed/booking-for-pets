export const authFormStyles = {
  main: {
    border: "1px solid black",
    borderRadius: 20,
    width: "50%",
    margin: "5% auto",
    padding: "3%",
    boxSizing: "border-box" as const,
  },
  inputsBox: {
    width: 500,
    maxWidth: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    "& div": {
      margin: "1vh 0",
    },
  },
  centerText: {
    textAlign: "center",
  },
  signButton: {
    marginTop: "2vh",
  },
};

export const authModalStyles = {
  main: {
    borderRadius: 20,
    margin: "3% auto",
    boxSizing: "border-box" as const,
  },
  inputsBox: {
    width: 500,
    maxWidth: "100%",
  },
  centerText: {
    textAlign: "center",
  },
  signButton: {
    marginTop: "5vh",
  },
};

import { theme } from "./../../assets/theme";

export const headerBar = {
  typography: {
    mr: 2,
    display: { xs: "none", md: "flex" },
  },
  account: { flexGrow: 1, display: { xs: "flex", md: "none" } },
  menuXs: {
    display: { xs: "block", md: "none" },
  },
  logoXs: {
    flexGrow: 1,
    display: { xs: "flex", md: "none" },
  },
  searchBox: {
    flexGrow: 1,
    display: { xs: "none", md: "flex", marginLeft: "35%" },
  },
  searchLine: {
    margin: 0,
    width: "30%",
    marginLeft: "30%",
  },
  searchFields: {
    marginTop: "15%",
    position: "absolute",
    left: "5%",
    display: {
      xs: "none",
      md: "block",
      lg: "block",
    },
  },
  headerButtons: {
    borderRadius: 25,
    marginRight: 1,
  },
};

export const searchBar = {
  buttonGroup: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: "1vh 2vh",
    "& .MuiFilledInput-root": {
      borderRadius: 10,
    },
    "& button": {
      backgroundColor: theme.palette.secondary.main,
      margin: "0 5px",
    },
    "& button:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
      borderRadius: 10,
    },
    "& .MuiOutlinedInput-root.Mui-focused": {
      borderColor: "#fff !important",
    },
    "& label.Mui-focused": {
      marginTop: 1,
      color: theme.palette.secondary.main,
    },
  },
  location: {
    borderRadius: 10,
    width: "40vh",
    backgroundColor: "#fff",
  },
  divider: { margin: "0 2vh" },
  numberField: { width: "20vh" },
  searchButton: {
    borderRadius: 10,
    backgroundColor: "rgb(236, 130, 148);",
    height: "8vh",
    margin: "0 2vh",
    overflow: "hidden",
  },
};

export const profileIconStyles = {
  main: {
    color: "grey",
    borderRadius: 25,
    border: "1px solid grey",
    height: 40,
  },
  menuIcon: {
    fontSize: "20px",
    margin: "auto 1vh auto 0",
  },
  avatarIcon: {
    width: "24px",
    height: "32px",
    backgroundColor: "#fff",
  },
  fontWeight: { fontWeight: "bold" },
  flexGrow: {
    flexGrow: 0,
  },
  marginProfileMenu: { mt: "45px" },
};

export const dialogCurrencyStyles = {
  tab: {
    p: 3,
  },
  tabs: {
    display: "flex",
    marginTop: "5vh",
  },
  tabBoxMain: {
    padding: "3vh 0 3vh 3vh",
    borderBottom: 1,
    borderColor: "divider",
  },
  tabBoxWidth: {
    width: "100%",
  },
};

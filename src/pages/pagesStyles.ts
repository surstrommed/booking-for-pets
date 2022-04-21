export const pagesStyles = {
  page404: {
    main: { textAlign: "center", marginTop: "10%" },
  },
  profile: {
    main: {
      flexGrow: 1,
      display: "flex",
    },
    tabs: {
      borderRight: 1,
      borderColor: "divider",
      height: "100%",
    },
    tabPanel: { marginLeft: "auto", marginRight: "auto" },
  },
  wishlists: {
    main: { padding: "5vh 0 5vh 5vh" },
    cards: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "flex-start",
    },
    card: { flexBasis: "30%", margin: "2vh" },
  },
};

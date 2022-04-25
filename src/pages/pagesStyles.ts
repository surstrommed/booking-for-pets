export const pagesStyles = {
  page404: {
    main: { textAlign: "center" as const, marginTop: "10%" },
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
  forOwners: {
    saveButton: {
      display: "block",
      marginRight: "auto",
      marginLeft: "auto",
      marginTop: "3vh",
      width: "50%",
    },
    formField: {
      marginTop: 3,
    },
    form: {
      marginTop: "5vh",
      marginRight: "auto",
      marginLeft: "auto",
      width: "70%",
      padding: "5vh",
    },
    main: {
      display: "flex",
    },
    leftBlock: {
      flex: 1,
      minHeight: "100vh",
      background: "linear-gradient(45deg, #fab699,#ffa5bd,#eea8fb)",
    },
    leftBlockText: {
      color: "#fff",
      textAlign: "center",
      marginTop: "30%",
    },
    rightBlock: { flex: 1, minHeight: "100vh" },
    viewHotelButton: {
      color: "pink",
      borderRadius: "20px",
      display: "block",
      marginRight: "auto",
      marginLeft: "auto",
      "&:hover": {
        color: "#fff",
        backgroundColor: "transparent",
      },
    },
    iconCenter: { verticalAlign: "middle" },
  },
  ownersHotels: {
    hotelCard: {
      display: "flex",
      width: "75%",
      margin: 5,
      marginLeft: "auto",
      marginRight: "auto",
    },
    width100: { width: 100 },
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

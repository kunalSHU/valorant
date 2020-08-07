export default theme => ({
  root: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    outline: "none",
    boxShadow: theme.shadows[20],
    width: 700,
    maxHeight: "100%",
    overflowY: "auto",
    maxWidth: "100%"
  },
  field: {
    marginTop: theme.spacing(3)
  },
  cancelButton: {
    marginLeft: "auto"
  },
  confirmButton: {
    color: theme.palette.white,
    backgroundColor: theme.palette.success.main,
    "&:hover": {
      backgroundColor: theme.palette.success.dark,
      color: theme.palette.white
    }
  },
  form: {
    margin: theme.spacing(3)
  },
  actions: {
    padding: 0,
    marginTop: theme.spacing(4),
  }
});
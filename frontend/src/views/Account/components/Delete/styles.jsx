export default theme => ({
  root: {},
  form: {},
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2)
  },
  deleteButton: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color: theme.palette.common.white,
    backgroundColor: theme.palette.danger.main,
    "&:hover": {
      backgroundColor: theme.palette.danger.dark,
    }
  }
});

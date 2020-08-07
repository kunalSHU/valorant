export default theme => ({
  root: {},
  field: {
    margin: theme.spacing(3)
  },
  textField: {
    width: '420px',
    maxWidth: '100%',
    marginRight: theme.spacing(3)
  },
  portletFooter: {
    display: 'flex',
    flexDirectory: 'row',
    alignItems: 'center',
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  status: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(1)
  },
  statusContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center' 
  }
});

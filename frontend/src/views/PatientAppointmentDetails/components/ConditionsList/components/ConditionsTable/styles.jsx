export default theme => ({
  root: {},
  tableRow: {
    height: '64px'
  },
  tableCell: {
    whiteSpace: 'nowrap'
  },
  tableCellInner: {
    display: 'flex',
    alignItems: 'center'
  },
  noWrap: {
    whiteSpace: 'normal',
    wordWrap: 'break-word'
  },
  nameText: {
    display: 'inline-block',
    marginLeft: theme.spacing(2),
    fontWeight: 500,
    cursor: 'pointer'
  }
});

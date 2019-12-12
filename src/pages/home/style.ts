import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      paddingTop: theme.spacing(10),
      paddingBottom: theme.spacing(2),
    },
  })
);
export default useStyles; 
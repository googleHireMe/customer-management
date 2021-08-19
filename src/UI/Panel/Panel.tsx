import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    padding: '24px 32px'
  }
}));

interface Props {
  children: JSX.Element | JSX.Element[],
  className?: string
}
export function Panel({ children, className: inputClassName }: Props) {
  const classes = useStyles();

  return (
    <div className={`${classes.container} ${inputClassName}`}>
      {children}
    </div>
  )
}
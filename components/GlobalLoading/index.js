import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import useToggleOverlay from '../../hooks/useToggleOverlay';
import { makeStyles } from '@mui/styles';

const useStyle = makeStyles(() => ({
  root: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    zIndex: 9999,

    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  icon: {
    color: 'secondary',
    marginBottom: '1.2rem',
  },
  text: {
    fontSize: '1.5rem',
    color: 'secondary',
  },
}));

function GlobalLoading({ title }) {
  const classes = useStyle();
  useToggleOverlay();

  return (
    <div className={classes.root}>
      <CircularProgress className={classes.icon} size="2rem" />
      <h2 className={classes.text}>{title}</h2>
    </div>
  );
}

GlobalLoading.propTypes = {
  title: PropTypes.string,
};

GlobalLoading.defaultProps = {
  title: 'Data is loading ...',
};

export default GlobalLoading;

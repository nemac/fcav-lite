import Button from '@material-ui/core/Button';
import StopIcon from '@material-ui/icons/Stop';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PropTypes from 'prop-types';

export const AnimateButton = ({animating, setAnimating}) => {
    const onAnimate = (e, v) => {
        setAnimating(!animating);
      }

    return (
      <Button
        letiant="contained"
        color="secondary"
        startIcon={ animating ? <StopIcon /> : <PlayArrowIcon />}
        onClick={onAnimate}
        >{ animating ? "Stop" : "Play" }
      </Button>
    )
};

AnimateButton.propTypes = {
    animating: PropTypes.bool.isRequired,
    setAnimating: PropTypes.func.isRequired
};

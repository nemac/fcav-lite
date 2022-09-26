import propTypes from "prop-types";
import { DropDownSelector } from "./DropDownSelector";

export const AnimationTimeSelect = ({animationTime, setAnimationTime}) => {

    const timesList = [1, 3, 5];

    const onTimeChange = (event) => {
        const index = event.target.value;
        setAnimationTime(timesList[index]);
    };

    return <DropDownSelector buttonText={'Time'} labelId={'fcav-animation-time-select-label'} id={'fcav-animation-time-select'} 
            value={timesList.indexOf(animationTime)} onChange={onTimeChange} options={timesList} />
};

AnimationTimeSelect.propTypes = {
    animationTime: propTypes.number.isRequired,
    setAnimationTime: propTypes.func.isRequired  
};

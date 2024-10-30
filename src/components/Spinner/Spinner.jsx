
import { ClipLoader } from "react-spinners";
import classes from "./Spinner.module.css";

const Spinner = ({ loading, size = 100, color = "var(--brand-color)" }) => {
	return (
		<div className={classes.spinnerContainer} role="status" aria-live="polite" aria-label="Loading">
			<ClipLoader size={size} color={color} loading={loading} />
		</div>
	);
};

export default Spinner;

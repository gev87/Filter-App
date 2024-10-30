import classes from "./RangeInput.module.css";

const RangeInput = ({ id, name, label, min, max, step, value, onChange, formatLabel }) => {
	const displayLabel = formatLabel ? formatLabel(value) : `${label}: ${value}`;

	return (
		<div className={classes.rangeWrapper}>
			<label htmlFor={id} className={classes.label}>
				{displayLabel}
			</label>
			<input
				type="range"
				id={id}
				name={name}
				min={min}
				max={max}
				step={step}
				value={value}
				onChange={onChange}
				className={classes.rangeInput}
			/>
		</div>
	);
};

export default RangeInput;

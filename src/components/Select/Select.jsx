import classes from "./Select.module.css";

const Select = ({ id, name, label, value, options, onChange, defaultOption }) => {
	return (
		<div className={classes.selectWrapper}>
			<label htmlFor={id} className={classes.label}>
				{label}
			</label>
			<select id={id} name={name} value={value} onChange={onChange} className={classes.select}>
				{defaultOption && <option value={defaultOption.value}>{defaultOption.label}</option>}
				{options.map((option) => (
					<option key={option.value || option} value={option.value || option}>
						{option.label || option}
					</option>
				))}
			</select>
		</div>
	);
};

export default Select;

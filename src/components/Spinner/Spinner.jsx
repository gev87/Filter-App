// src/components/Spinner.jsx
import React from "react";
import { ClipLoader } from "react-spinners";
import styles from "./Spinner.module.css";

const Spinner = ({ loading, size = 100, color = "var(--brand-color)" }) => {
	return (
		<div className={styles.spinnerContainer} role="status" aria-live="polite" aria-label="Loading">
			<ClipLoader size={size} color={color} loading={loading} />
		</div>
	);
};

export default Spinner;

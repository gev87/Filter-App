import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RangeInput from "./RangeInput";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("RangeInput Component", () => {
	test("renders RangeInput component with label and input", () => {
		const props = {
			id: "priceRange",
			name: "priceRange",
			label: "Price Range",
			min: 0,
			max: 1000,
			step: 10,
			value: 500,
			onChange: vi.fn(),
		};

		render(<RangeInput {...props} />);

		
		expect(screen.getByLabelText("Price Range: 500")).toBeInTheDocument();

		
		const input = screen.getByRole("slider");
		expect(input).toBeInTheDocument();

		
		expect(input).toHaveAttribute("type", "range");
		expect(input).toHaveAttribute("id", "priceRange");
		expect(input).toHaveAttribute("name", "priceRange");
		expect(input).toHaveAttribute("min", "0");
		expect(input).toHaveAttribute("max", "1000");
		expect(input).toHaveAttribute("step", "10");
		expect(input).toHaveValue("500");
	});

	test("uses formatLabel to customize the label", () => {
		const formatLabel = (value) => `Value is ${value}`;
		const props = {
			id: "rating",
			name: "rating",
			label: "Rating",
			min: 0,
			max: 5,
			step: 0.5,
			value: 3.5,
			onChange: vi.fn(),
			formatLabel,
		};

		render(<RangeInput {...props} />);

		
		expect(screen.getByLabelText("Value is 3.5")).toBeInTheDocument();
	});



	test("handles min, max, and step attributes correctly", () => {
		const props = {
			id: "customRange",
			name: "customRange",
			label: "Custom Range",
			min: 10,
			max: 50,
			step: 5,
			value: 30,
			onChange: vi.fn(),
		};

		render(<RangeInput {...props} />);

		const input = screen.getByRole("slider");

	
		expect(input).toHaveAttribute("min", "10");
		expect(input).toHaveAttribute("max", "50");
		expect(input).toHaveAttribute("step", "5");
		expect(input).toHaveValue("30");
	});

	test("renders correctly without formatLabel prop", () => {
		const props = {
			id: "rating",
			name: "rating",
			label: "Rating",
			min: 0,
			max: 5,
			step: 0.5,
			value: 2.5,
			onChange: vi.fn(),
		};

		render(<RangeInput {...props} />);

		expect(screen.getByLabelText("Rating: 2.5")).toBeInTheDocument();
	});
});

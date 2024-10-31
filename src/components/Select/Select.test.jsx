import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Select from "./Select";
import "@testing-library/jest-dom";
import { vi } from "vitest";

describe("Select Component", () => {
	test("renders Select component with label and options", () => {
		const props = {
			id: "category",
			name: "category",
			label: "Category",
			value: "",
			onChange: vi.fn(),
			options: [
				{ value: "electronics", label: "Electronics" },
				{ value: "clothing", label: "Clothing" },
				{ value: "books", label: "Books" },
			],
		};

		render(<Select {...props} />);

		// Check that the label is rendered
		expect(screen.getByLabelText("Category")).toBeInTheDocument();

		// Check that the select element is rendered
		expect(screen.getByRole("combobox")).toBeInTheDocument();

		// Check that all options are rendered
		props.options.forEach((option) => {
			expect(screen.getByRole("option", { name: option.label })).toBeInTheDocument();
		});
	});

	test("displays the default option when provided", () => {
		const props = {
			id: "brand",
			name: "brand",
			label: "Brand",
			value: "",
			onChange: vi.fn(),
			defaultOption: { value: "", label: "All Brands" },
			options: ["Brand A", "Brand B", "Brand C"],
		};

		render(<Select {...props} />);

		// Check that the default option is rendered
		expect(screen.getByRole("option", { name: "All Brands" })).toBeInTheDocument();

		// Check that the default option is selected
		expect(screen.getByRole("combobox")).toHaveValue("");
	});

	test("calls onChange handler when selection changes", () => {
		const handleChange = vi.fn();
		const props = {
			id: "category",
			name: "category",
			label: "Category",
			value: "",
			onChange: handleChange,
			options: [
				{ value: "electronics", label: "Electronics" },
				{ value: "clothing", label: "Clothing" },
			],
		};

		render(<Select {...props} />);

		// Simulate changing the selection
		fireEvent.change(screen.getByLabelText("Category"), {
			target: { value: "electronics" },
		});

		// Verify that onChange was called once
		expect(handleChange).toHaveBeenCalledTimes(1);

		// Verify that onChange was called with an event
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object));

		// Optionally, check the event target value
		const event = handleChange.mock.calls[0][0];
		expect(event.target.value).toBe("electronics");
	});

	test("renders options correctly when options are provided as strings", () => {
		const props = {
			id: "brand",
			name: "brand",
			label: "Brand",
			value: "",
			onChange: vi.fn(),
			options: ["Brand A", "Brand B", "Brand C"],
		};

		render(<Select {...props} />);

		// Check that all options are rendered
		props.options.forEach((option) => {
			expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
		});
	});

	test("renders without defaultOption prop", () => {
		const props = {
			id: "brand",
			name: "brand",
			label: "Brand",
			value: "Brand A",
			onChange: vi.fn(),
			options: ["Brand A", "Brand B"],
		};

		render(<Select {...props} />);

		// Check that the select has the correct value
		expect(screen.getByRole("combobox")).toHaveValue("Brand A");

		// Check that options are rendered
		props.options.forEach((option) => {
			expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
		});
	});
});

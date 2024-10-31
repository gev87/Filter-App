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

		
		expect(screen.getByLabelText("Category")).toBeInTheDocument();

		
		expect(screen.getByRole("combobox")).toBeInTheDocument();

	
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

	
		expect(screen.getByRole("option", { name: "All Brands" })).toBeInTheDocument();

	
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

		
		fireEvent.change(screen.getByLabelText("Category"), {
			target: { value: "electronics" },
		});

		
		expect(handleChange).toHaveBeenCalledTimes(1);

		
		expect(handleChange).toHaveBeenCalledWith(expect.any(Object));

		
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

		
		expect(screen.getByRole("combobox")).toHaveValue("Brand A");

	
		props.options.forEach((option) => {
			expect(screen.getByRole("option", { name: option })).toBeInTheDocument();
		});
	});
});

export const PRODUCTS = [
	{
		id: 1,
		name: "Wireless Headphones",
		category: "Electronics",
		brand: "Brand A",
		price: 99.99,
		rating: 4.5,
		imageUrl:
			"https://images.unsplash.com/photo-1648447269269-f6f3c1635c55?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 2,
		name: "Bluetooth Speaker",
		category: "Electronics",
		brand: "Brand B",
		price: 49.99,
		rating: 2.0,
		imageUrl:
			"https://images.unsplash.com/photo-1675319245480-215961c129f1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 3,
		name: "Running Shoes",
		category: "Footwear",
		brand: "Brand C",
		price: 59.99,
		rating: 4.2,
		imageUrl:
			"https://images.unsplash.com/photo-1460353581641-37baddab0fa2?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 4,
		name: "Smartphone",
		category: "Electronics",
		brand: "Brand D",
		price: 499.99,
		rating: 4.8,
		imageUrl:
			"https://images.unsplash.com/photo-1517765371796-5bd3a7d30a29?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 5,
		name: "Leather Jacket",
		category: "Clothing",
		brand: "Brand E",
		price: 199.99,
		rating: 4.7,
		imageUrl:
			"https://plus.unsplash.com/premium_photo-1661313817350-1fa759c43a3b?q=80&w=2117&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
];


	// Define initial filter values
	export const INITIAL_FILTERS = {
		category: "",
		brand: "",
		priceRange: 1000,
		rating: 0,
		sortBy: "",
	};

	// Extract unique categories and brands from the product data
	export const CATEGORIES = [...new Set(PRODUCTS.map((product) => product.category))];
	export const BRANDS = [...new Set(PRODUCTS.map((product) => product.brand))];
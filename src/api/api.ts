export interface IProduct {
	id: number;
	title: string;
	description: string;
	category: string;
	price: number;
	stock: number;
	rating: number;
}

const selectedFields = [
	'title',
	'description',
	'category',
	'price',
	'stock',
	'rating',
] satisfies (keyof IProduct)[];

export interface GetProductsResponse {
	products: IProduct[];
	total: number;
	skip: number;
	limit: number;
}

export interface GetProductsParams {
	limit?: number;
	skip?: number;
}
export async function getProducts(
	params: GetProductsParams
): Promise<GetProductsResponse> {
	return fetchJson(
		'https://dummyjson.com/products?' +
			new URLSearchParams({
				...params,
				select: selectedFields.join(','),
			} as Record<string, any>) // as используется потому что URLSearchParams прекрасно себе сам конвертирует number в string
		// ?limit=10&skip=10&select='
	);
}

export async function getProductById(id: number) {
	return fetchJson(
		`https://dummyjson.com/products/${id}?` +
			new URLSearchParams({ select: selectedFields.join(',') })
	);
}

export async function searchProduct(query: string) {
	return fetchJson(
		`https://dummyjson.com/products/search?` +
			new URLSearchParams({
				q: query,
				select: selectedFields.join(','),
			})
	);
}

export async function updateProductById(
	id: number,
	fields: Partial<Omit<IProduct, 'id'>>
): Promise<IProduct> {
	return fetchJson(
		`https://dummyjson.com/products/${id}?` +
			new URLSearchParams({ select: selectedFields.join(',') }),
		'PUT',
		fields
	);
}

export async function createProduct(
	fields: Omit<IProduct, 'id'>
): Promise<IProduct> {
	return fetchJson(
		`https://dummyjson.com/products/add?` +
			new URLSearchParams({ select: selectedFields.join(',') }),
		'POST',
		fields
	);
}

export async function deleteProductById(
	id: number
): Promise<IProduct & { isDeleted: true }> {
	return fetchJson(
		`https://dummyjson.com/products/${id}?` +
			new URLSearchParams({ select: selectedFields.join(',') }),
		'DELETE'
	);
}

async function fetchJson(
	url: string,
	method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET',
	body?: Record<string, any>
) {
	return fetch(url, {
		method: method,
		...(body
			? {
					body: JSON.stringify(body),
					headers: { 'Content-Type': 'application/json' },
				}
			: {}),
	}).then(res => res.json());
}

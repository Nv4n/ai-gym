export async function POST(req: Request) {
	const { productId, quantity } = await req.json();

	// store cart in session / cookie
}

export async function POST(req: Request) {
	const { goal } = await req.json();

	// call Gemma / mock
	return Response.json({
		plan: "3-day workout plan based on goal",
	});
}

import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

/**
 * Health check API endpoint for Next.js
 * This endpoint will check all services are working
 * and return for each health check if it is working
 */
export default async function healthCheck(
	req: NextRequest,
	res: NextResponse<{
		[serviceName: string]: { status: "ok" | "error"; message?: string };
	}>
) {
	const services: {
		[serviceName: string]: () => Promise<{
			status: "ok" | "error";
			message?: string;
		}>;
	} = {
		// Add your services health checks here
	};

	const results = await Promise.all(
		Object.entries(services).map(async ([serviceName, service]) => {
			try {
				const result = await service();
				return [serviceName, result];
			} catch (error) {
				return [
					serviceName,
					{
						status: "error",
						message: (error as Error).message ?? "Unknown error",
					},
				];
			}
		})
	);

	return NextResponse.json({ results });
}

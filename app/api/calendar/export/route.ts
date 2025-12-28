export async function GET() {
	const ics = `
BEGIN:VCALENDAR
BEGIN:VEVENT
SUMMARY:Gym Activity
END:VEVENT
END:VCALENDAR
`;

	return new Response(ics, {
		headers: {
			"Content-Type": "text/calendar",
			"Content-Disposition": "attachment; filename=activity.ics",
		},
	});
}

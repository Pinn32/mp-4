export async function GET(): Promise<Response> {
    const API_KEY = process.env.API_KEY;

    // Make API request
    const res = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`, {
        headers: {
            Authorization: `Bearer ${API_KEY}`,
        },
    });

    // Parse JSON data from API Response
    const data = await res.json();

    // Return the parsed JSON data
    return Response.json(data);  // Response: Web API, HTTP Response
}

import { NextRequest, NextResponse } from "next/server";

const FLOWISE_URL = "http://flowise:3000/api/v1/prediction/a3fc2d43-e520-4dd1-abff-686d1ca09dec";
const FLOWISE_API_KEY = "O2fvKFt0aqivIVXvNEkCuNqpXVnMFA_WIp9b0CMga-M";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    const response = await fetch(FLOWISE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${FLOWISE_API_KEY}`,
      },
      body: JSON.stringify({
        question: message,
      }),
    });

    if (!response.ok) {
      const errorBody = await response.text();
      console.error("Flowise API Error:", errorBody);
      return NextResponse.json({ error: `Flowise API returned status ${response.status}` }, { status: response.status });
    }

    const data = await response.json();
    console.log("Received full response from Flowise:", data);
    
    // La réponse de Flowise peut être directement le JSON que vous attendez
    // ou un objet contenant un champ "text".
    // S'il est juste du texte, data.text sera undefined, donc on prend data.
    const text = data.text ?? data;

    return NextResponse.json({ text });

  } catch (error) {
    console.error("Internal Server Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized Security Check Failed', { status: 401 });
  }

  try {
    const matchContext = "Match: Real Madrid vs Barcelona. Venue: Bernabéu. Form: Madrid won last 4 games, Barcelona missing top striker due to injury.";

    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: `Act as an expert football statistician. Analyze this match dataset and provide an outcome prediction, estimated final score, and a confidence percentage: ${matchContext}`,
    });

    return NextResponse.json({ success: true, dailyPredictions: text });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

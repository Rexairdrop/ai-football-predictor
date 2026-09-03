import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function GET(request: Request) {
  // 1. Enforce strict cron security signature validation
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized Security Check Failed', { status: 401 });
  }

  try {
    // 2. Fetch today's live scheduled matches from Football-Data.org
    const apiResponse = await fetch('https://football-data.org', {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_DATA_KEY || '', // Uses your saved token
      },
    });

    if (!apiResponse.ok) {
      throw new Error(`Sports API responded with status: ${apiResponse.status}`);
    }

    const data = await apiResponse.json();

    // 3. Filter down raw data fields so we don't exceed AI token limits
    const matchesToday = data.matches?.map((m: any) => ({
      competition: m.competition?.name,
      homeTeam: m.homeTeam?.name,
      awayTeam: m.awayTeam?.name,
      status: m.status,
    })) || [];

    if (matchesToday.length === 0) {
      return NextResponse.json({ success: true, message: "No football matches scheduled for today." });
    }

    // 4. Request analytical processing via Vercel AI SDK using the live match context
    const matchContext = JSON.stringify(matchesToday);
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: `
        Act as a professional algorithmic sports handicapper. Analyze these daily fixtures: ${matchContext}.
        Generate premium daily picks ONLY across these precise betting categories:
        
        1. Premium Over 1.5 Goals: (CRITICAL: Be extremely strict. Select matches ONLY where both teams average a combined >2.5 goals in their last 5 fixtures, and H2H shows a 90%+ history of at least 2 goals).
        2. Over 2.5 Goals / Away Win.
        3. GG (Both Teams to Score).
        4. GG2+ (Both Teams to Score 2 or More Goals Each).
        5. Home/Away Win (Both Teams to Score but NOT a draw).
        6. Straight Wins (1 or 2).

        Format the output cleanly. Do not provide raw code blocks or markdown commentary.
      `,
    });

    return NextResponse.json({ success: true, dailyPredictions: text });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

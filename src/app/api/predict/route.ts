import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function GET(request: Request) {
  // 1. Allow internal website frontend checks or enforce strict cron parameters
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const isInternal = url.hostname === 'localhost' || url.hostname.endsWith('.vercel.app');

  if (!isInternal && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized Security Check Failed', { status: 401 });
  }

  try {
    // 2. Fetch daily scheduled matches with standardized headers
    const apiResponse = await fetch('https://football-data.org', {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_DATA_KEY || '',
      },
      next: { revalidate: 0 } // Bypass aggressive caching during debugging
    });

    if (!apiResponse.ok) {
      return NextResponse.json({ 
        success: true, 
        dailyPredictions: JSON.stringify([
          { match: "Sports Server Syncing", league: "System Notice", market: `API Response Code: ${apiResponse.status}. Retrying connection...`, confidence: "100%", status: "Refresh" }
        ])
      });
    }

    const data = await apiResponse.json();

    // 3. Filter raw data safely to protect against internal loop breaks
    const matchesToday = [];
    if (data && Array.isArray(data.matches)) {
      for (const m of data.matches) {
        matchesToday.push({
          competition: m.competition?.name || 'Global',
          homeTeam: m.homeTeam?.name || 'Home Team',
          awayTeam: m.awayTeam?.name || 'Away Team',
          status: m.status || 'SCHEDULED'
        });
      }
    }

    // Fallback if there are truly no matches available today
    if (matchesToday.length === 0) {
      return NextResponse.json({ 
        success: true, 
        dailyPredictions: JSON.stringify([
          { match: "No Elite Matches Scheduled", league: "Notice", market: "There are no major tier-1 league matches scheduled for today. Check back tomorrow!", confidence: "100%", status: "Break" }
        ])
      });
    }

    // 4. Fire prompt parameters over to OpenAI
    const matchContext = JSON.stringify(matchesToday.slice(0, 8)); // Cap at 8 games to save credit balance
    const { text } = await generateText({
      model: openai('gpt-4o'),
      prompt: `
        Analyze these daily fixtures: ${matchContext}.
        Generate premium daily picks. You MUST reply with a valid JSON array matching this exact format string, with no markdown tags or wrapper comments:
        [{"match": "Team A vs Team B", "league": "Premier League", "market": "Premium Over 1.5 Goals", "confidence": "95%", "status": "Near Perfect"}]
      `,
    });

    const cleanJsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    return NextResponse.json({ success: true, dailyPredictions: cleanJsonString });

  } catch (error: any) {
    // Prints the literal error text to your home page so you can read what failed instantly
    return NextResponse.json({ 
      success: true, 
      dailyPredictions: JSON.stringify([
        { 
          match: "System Status Log", 
          league: "Error Caught", 
          market: `Diagnostic Report: ${error?.message || String(error)}`, 
          confidence: "0.0%", 
          status: "Debug Info" 
        }
      ])
    });
  }
}

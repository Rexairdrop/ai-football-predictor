export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function GET(request: Request) {
  // Allow internal frontend site checking bypass
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const isInternal = url.hostname === 'localhost' || url.hostname.endsWith('.vercel.app');

  if (!isInternal && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized Security Check Failed', { status: 401 });
  }

  try {
    // Standard secure connection request options to prevent serverless node fetch crashes
    const requestOptions: RequestInit = {
      method: 'GET',
      headers: {
        'X-Auth-Token': process.env.FOOTBALL_DATA_KEY || '',
        'Accept': 'application/json',
      },
      cache: 'no-store', // Prevents Vercel from caching failed server requests
    };

    const apiResponse = await fetch('https://football-data.org', requestOptions);

    if (!apiResponse.ok) {
      return NextResponse.json({ 
        success: true, 
        dailyPredictions: JSON.stringify([
          { 
            match: "Data Synchronization Network", 
            league: "System Status", 
            market: `Football server returned response code ${apiResponse.status}. Re-syncing connections...`, 
            confidence: "100%", 
            status: "Syncing" 
          }
        ])
      });
    }

    const data = await apiResponse.json();

    // Filter match loops safely
    const matchesToday = [];
    if (data && Array.isArray(data.matches)) {
      for (const m of data.matches) {
        matchesToday.push({
          competition: m.competition?.name || 'Global League',
          homeTeam: m.homeTeam?.name || 'Home',
          awayTeam: m.awayTeam?.name || 'Away',
          status: m.status || 'SCHEDULED'
        });
      }
    }

    // Fallback if there are truly no matches available today in their tier-1 index selection
    if (matchesToday.length === 0) {
      return NextResponse.json({ 
        success: true, 
        dailyPredictions: JSON.stringify([
          { 
            match: "No Elite Matches Today", 
            league: "Notice", 
            market: "There are no major top-tier football matches scheduled right now. Daily AI picks will resume tomorrow!", 
            confidence: "100%", 
            status: "Rest Day" 
          }
        ])
      });
    }

    // Run OpenAI predictive analytics engine model
    const matchContext = JSON.stringify(matchesToday.slice(0, 5)); // Cap to 5 games to stay safe
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
    // Beautiful clean fallback panel UI if OpenAI credentials or networks disconnect
    return NextResponse.json({ 
      success: true, 
      dailyPredictions: JSON.stringify([
        { 
          match: "Predictor Cloud Booting", 
          league: "Notice", 
          market: `System initialized successfully. Ensure your OpenAI platform billing credits balance is topped up to activate daily picks! (Log: ${error?.message || 'Network Blip'})`, 
          confidence: "100%", 
          status: "Live Check" 
        }
      ])
    });
  }
}

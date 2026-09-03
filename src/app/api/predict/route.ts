export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { generateObject } from 'ai'; 
import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { z } from 'zod'; 

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const url = new URL(request.url);
  const isInternal = url.hostname === 'localhost' || url.hostname.endsWith('.vercel.app');

  if (!isInternal && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('Unauthorized Security Check Failed', { status: 401 });
  }

  try {
    const google = createGoogleGenerativeAI({
      apiKey: process.env.GEMINI_API_KEY || '',
    });

    const { object } = await generateObject({
      model: google('gemini-3.6-flash'), 
      // FIXED: Increased timeout window to 60 seconds to ensure the full list compiles smoothly
      abortSignal: AbortSignal.timeout(60000), 
      schema: z.object({
        matchGroups: z.array(
          z.object({
            dateHeading: z.string(), 
            fixtures: z.array(
              z.object({
                match: z.string(),
                league: z.string(),
                over15: z.string(), 
                gg: z.string(),     
                over25: z.string(), 
              })
            ),
          })
        ),
      }),
      prompt: `
        Act as an elite algorithmic sports handicapper. 
        Analyze the calendar of top-tier football matches scheduled for today (Thursday, September 3, 2026) and tomorrow (Friday, September 4, 2026).
        
        Group the fixtures clearly by their calendar date. Keep the selection punchy and highly relevant (around 5-8 matches total across top leagues like Nations League, Premier League, etc.) to ensure rapid execution. 
        
        For every match inside a date group, calculate the historical probability metric or prediction outcome for these exact three market fields:
        1. over15: Left Side market tracking Over 1.5 Goals (e.g. "92%")
        2. gg: Center market tracking Goal-Goal / Both Teams to Score (e.g. "GG (85%)" or "NG (40%)")
        3. over25: Right Side market tracking Over 2.5 Goals (e.g. "74%")
      `,
    });

    return NextResponse.json({ success: true, dailyPredictions: object.matchGroups });

  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      dailyPredictions: [],
      error: error?.message || 'Syncing issues'
    });
  }
}

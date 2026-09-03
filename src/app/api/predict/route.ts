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

    Format the output cleanly as a structured JSON array containing match names, selected market types, and a calculated confidence metrics score. Do not provide commentary.
  `,
});

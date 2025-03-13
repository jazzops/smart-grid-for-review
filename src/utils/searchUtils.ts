export interface TFIDFResult {
  text: string;
  score: number;
}

export function calculateTFIDF(query: string, documents: string[]): TFIDFResult[] {
  const terms = query.toLowerCase().split(' ');
  const results: TFIDFResult[] = [];

  // Calculate term frequency for each document
  documents.forEach((doc) => {
    let score = 0;
    const docTerms = doc.toLowerCase().split(' ');
    
    terms.forEach(term => {
      const tf = docTerms.filter(t => t === term).length / docTerms.length;
      const df = documents.filter(d => d.toLowerCase().includes(term)).length;
      const idf = Math.log(documents.length / (df + 1));
      score += tf * idf;
    });

    results.push({
      text: doc,
      score: score
    });
  });

  return results.sort((a, b) => b.score - a.score);
}
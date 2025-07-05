const fs = require('fs');
const readline = require('readline');

const mp_gemini = require('./minimal_pairs_gemini.json');
const mp_claude = require('./minimal_pairs_claude.json');

// Helper: prompt user to choose which entry to keep
async function promptUserForChoice(duplicateEntries) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (text) =>
    new Promise((resolve) => rl.question(text, resolve));

  const [entryA, entryB] = duplicateEntries;

  console.log('\n❗ Duplicate ID found:', entryA.id);
  console.log('\n--- A ---\n', JSON.stringify(entryA, null, 2));
  console.log('\n--- B ---\n', JSON.stringify(entryB, null, 2));

  let answer = await question('\n👉 Keep entry A or B? [a/b]: ');
  rl.close();
  return answer.trim().toLowerCase() === 'a' ? entryA : entryB;
}

(async () => {
  console.log(`🔍 Gemini pairs: ${mp_gemini.length}`);
  console.log(`🔍 Claude pairs: ${mp_claude.length}`);

  const merged = [...mp_gemini, ...mp_claude];
  const mergedMap = new Map();
  const duplicates = new Map();

  for (const entry of merged) {
    if (mergedMap.has(entry.id)) {
      const prev = mergedMap.get(entry.id);
      duplicates.set(entry.id, [prev, entry]);
    } else {
      mergedMap.set(entry.id, entry);
    }
  }

  console.log(`🔁 Duplicates found: ${duplicates.size}`);

  // Resolve duplicates
  for (const [id, entries] of duplicates.entries()) {
    const chosen = await promptUserForChoice(entries);
    mergedMap.set(id, chosen);
  }

  // Sort by difficulty: hard > medium > easy
  const difficultyOrder = { hard: 0, medium: 1, easy: 2 };
  const sorted = Array.from(mergedMap.values()).sort(
    (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
  );

  // Add incremental index
  sorted.forEach((entry, index) => {
    entry.index = index + 1;
  });

  // Save to file
  fs.writeFileSync('minimal_pairs.json', JSON.stringify(sorted, null, 2), 'utf-8');

  console.log(`✅ Final count: ${sorted.length} entries saved to minimal_pairs.json`);
})();

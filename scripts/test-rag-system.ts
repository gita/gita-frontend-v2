import { config } from "dotenv";
import * as path from "path";
config({ path: path.resolve(__dirname, "../.env.local") });

import { searchGitaContent } from "../src/lib/ai/retrieval";

const testQueries = [
  { query: "What does verse 1.1 say?", expected: "Dhritarashtra", category: "Verse Ref" },
  { query: "Explain verse 1.26", expected: "Arjuna", category: "Verse Ref (NEW!)" },
  { query: "What did Arjuna see when he looked at the armies?", expected: "relatives", category: "Event" },
  { query: "What is dharma-kshetra?", expected: "dharma", category: "Keyword" },
  { query: "Who is Dhritarashtra?", expected: "Dhritarashtra", category: "Character" },
  { query: "Tell me about Chapter 1", expected: "Arjun", category: "Chapter" },
  { query: "What is the meaning of Achyuta?", expected: "Achyuta", category: "Sanskrit" },
  { query: "Why was Arjuna confused?", expected: "Arjuna", category: "Psychology" },
  { query: "How to overcome fear of duty?", expected: "duty", category: "Practical" },
  { query: "Radhey Radhey", expected: "Krishna", category: "Greeting" },
];

async function runTests() {
  console.log("\n🧪 GitaGPT RAG - Automated Testing");
  console.log("Testing with real devotee queries\n");
  console.log("=".repeat(80) + "\n");

  let passed = 0;
  let failed = 0;

  for (const test of testQueries) {
    console.log(`📝 ${test.category}: "${test.query}"`);
    
    try {
      const results = await searchGitaContent(test.query, 5);
      
      if (results.length === 0) {
        console.log(`   ❌ FAIL: No results\n`);
        failed++;
        continue;
      }

      const top = results[0];
      const score = top.rerankScore || top.similarity || 0;
      const hasContent = top.content.toLowerCase().includes(test.expected.toLowerCase());

      console.log(`   📊 Top: Ch ${top.metadata.chapter}.${top.metadata.verse} (${(score * 100).toFixed(1)}%)`);
      console.log(`   ${hasContent ? '✅ PASS' : '❌ FAIL'}: Contains "${test.expected}"`);
      
      if (hasContent) {
        passed++;
      } else {
        failed++;
        console.log(`   💡 Got: ${top.content.substring(0, 100)}...`);
      }
    } catch (error) {
      console.log(`   ❌ ERROR: ${error}`);
      failed++;
    }
    
    console.log();
  }

  console.log("=".repeat(80));
  console.log(`\n📊 RESULTS: ${passed}/${testQueries.length} passed (${((passed/testQueries.length)*100).toFixed(0)}%)`);
  console.log(`   ✅ Passed: ${passed}`);
  console.log(`   ❌ Failed: ${failed}\n`);

  if (passed >= 8) {
    console.log("🎉 EXCELLENT! RAG system is production-ready!");
  } else if (passed >= 6) {
    console.log("✅ GOOD! System working well, minor improvements possible");
  } else {
    console.log("⚠️  Needs improvement - check data and migrations");
  }
  
  console.log();
}

runTests().catch(console.error);


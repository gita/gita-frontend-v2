# Custom Text Snippets for GitaGPT

Add custom Q&A pairs, FAQs, or any information not available in Gita verses or website pages.

## How to Add Snippets

Create `.txt` files in this folder (`data/snippets/`) with Q&A format or plain text.

### Example 1: Q&A Format

**File**: `faq-app.txt`

```
Q: How do I download the Bhagavad Gita app?
A: Download from Google Play Store or Apple App Store. Search for "Bhagavad Gita" by Ved Vyas Foundation. The app is completely free.

---

Q: Can I listen to Gita audio?
A: Yes! The app includes Sanskrit audio recitations for all 700 verses by renowned reciters.

---

Q: Is GitaGPT available offline?
A: No, GitaGPT requires internet connection as it uses AI to generate responses. However, you can download the mobile app for offline verse reading.
```

### Example 2: Plain Information

**File**: `glossary.txt`

```
Dharma: Righteousness, duty, moral law. The eternal principles that uphold the universe and guide right conduct.

Karma: Action and its consequences. The law of cause and effect governing all actions.

Yoga: Union with the Divine. Also means spiritual discipline or practice.

Moksha: Liberation from the cycle of birth and death. The ultimate goal of spiritual practice.
```

## Format Rules

- ✅ **Q&A**: Use `Q:` and `A:` on separate lines
- ✅ **Separator**: Use `---` between multiple Q&As
- ✅ **Language**: English or Hindi (auto-detected)
- ✅ **Length**: Any size (auto-chunks if >3500 chars)
- ✅ **Format**: Plain text, simple markdown okay

## File Naming

Use descriptive names:

- `faq-general.txt`
- `faq-app.txt`
- `glossary-terms.txt`
- `teaching-points.txt`
- `meditation-guide.txt`

Filename becomes the `snippet_id` in database.

## Ingestion

```bash
# 1. Enable snippets in training-sources.json
"custom_snippets": { "enabled": true }

# 2. Run ingestion
npm run ingest:snippets

# 3. Check status
npm run ingest:status
```

## What Gets Indexed

Each snippet becomes:

```typescript
{
  content: "Q: ... A: ...",
  metadata: {
    type: "custom_snippet",
    snippet_id: "faq-app",
    source: "text_file",
    file_name: "faq-app.txt",
    language: "en"
  }
}
```

## Duplicate Prevention

✅ System checks by `snippet_id` (filename)
✅ Running again skips already-trained files
✅ Only new/changed files get indexed

---

Radhey Radhey! 🙏

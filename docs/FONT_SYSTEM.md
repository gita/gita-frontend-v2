# Font System Guide

Radhey Radhey! 🙏

This document explains our multi-script font strategy for the Bhagavad Gita web application.

## Philosophy

**Separate fonts per script family** - Each script has unique characteristics. A font designed for Devanagari will render Sanskrit beautifully, while a "universal" font often compromises on quality.

---

## Available Fonts

### English / Latin Script

| Font            | Usage                              | Tailwind Class |
| --------------- | ---------------------------------- | -------------- |
| **Crimson Pro** | Body text, Translation, Commentary | `font-crimson` |
| **Inter**       | UI elements, buttons, labels       | `font-inter`   |

### Devanagari (Hindi, Sanskrit, Marathi)

| Font                         | Usage                        | Tailwind Class          |
| ---------------------------- | ---------------------------- | ----------------------- |
| **Tiro Devanagari Sanskrit** | Sanskrit verses (primary)    | `font-sanskrit`         |
| **Noto Serif Devanagari**    | Hindi/Marathi text, fallback | `font-devanagari-serif` |
| **Mukta**                    | UI elements                  | `font-devanagari-sans`  |

### Tamil

| Font                 | Usage             | Tailwind Class     |
| -------------------- | ----------------- | ------------------ |
| **Noto Serif Tamil** | Verses, body text | `font-tamil-serif` |

### Telugu

| Font                  | Usage             | Tailwind Class      |
| --------------------- | ----------------- | ------------------- |
| **Noto Serif Telugu** | Verses, body text | `font-telugu-serif` |

### Gujarati

| Font                    | Usage             | Tailwind Class        |
| ----------------------- | ----------------- | --------------------- |
| **Noto Serif Gujarati** | Verses, body text | `font-gujarati-serif` |

---

## How to Use

### Method 1: Automatic Language Detection (Preferred)

The font system automatically applies the correct font based on the `lang` attribute:

```tsx
// Devanagari content
<div lang="hi">यह हिंदी टेक्स्ट है</div>
<div lang="sa">संस्कृत श्लोक</div>

// Tamil content
<div lang="ta">தமிழ் உள்ளடக்கம்</div>

// Telugu content
<div lang="te">తెలుగు కంటెంట్</div>

// Gujarati content
<div lang="gu">ગુજરાતી સામગ્રી</div>
```

### Method 2: CSS Classes

Use utility classes when `lang` attribute isn't appropriate:

```tsx
// Devanagari
<div className="devanagari">संस्कृत श्लोक</div>

// Tamil
<div className="tamil">தமிழ்</div>

// Telugu
<div className="telugu">తెలుగు</div>

// Gujarati
<div className="gujarati">ગુજરાતી</div>
```

### Method 3: Tailwind Classes

For explicit font control:

```tsx
// English/Latin
<p className="font-crimson">Translation text</p>
<button className="font-inter">Click me</button>

// Devanagari
<p className="font-devanagari-serif">संस्कृत श्लोक</p>
<button className="font-devanagari-sans">बटन</button>

// Tamil
<p className="font-tamil-serif">தமிழ்</p>

// Telugu
<p className="font-telugu-serif">తెలుగు</p>

// Gujarati
<p className="font-gujarati-serif">ગુજરાતી</p>
```

---

## Semantic Classes

Use these semantic classes for consistent typography across all languages:

### Sanskrit Verses

```tsx
<div className="sanskrit-verse" lang="sa">
  धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।
</div>
```

- **Font**: Tiro Devanagari Sanskrit (primary), Noto Serif Devanagari (fallback)
- **Weight**: 400 (Regular) - Tiro Devanagari is designed for classical texts
- **Features**: Beautiful ligatures and traditional feel
- **Automatically applied** with `lang="sa"` attribute or `.sanskrit-verse` class

### Transliteration

```tsx
<div className="transliteration">
  dharma-kṣetre kuru-kṣetre samavetā yuyutsavaḥ
</div>
```

- **Font**: Crimson Pro Italic
- **Style**: Italic

### Translation

```tsx
<div className="translation" lang="en">
  In the field of righteousness...
</div>

<div className="translation" lang="hi">
  धर्म के क्षेत्र में...
</div>
```

- **Font**: Crimson Pro (English) or language-specific serif
- **Weight**: 500 (Medium)

### Commentary

```tsx
<div className="commentary" lang="en">
  This verse introduces the setting...
</div>

<div className="commentary" lang="hi">
  यह श्लोक परिचय देता है...
</div>
```

- **Font**: Crimson Pro (English) or language-specific serif
- **Weight**: 400 (Regular)

---

## Font Pairing Matrix

| Element             | English            | Devanagari/Sanskrit            | Tamil                  | Telugu                  | Gujarati                  |
| ------------------- | ------------------ | ------------------------------ | ---------------------- | ----------------------- | ------------------------- |
| **Sanskrit Verse**  | -                  | Tiro Devanagari Sanskrit (400) | Noto Serif Tamil (600) | Noto Serif Telugu (600) | Noto Serif Gujarati (600) |
| **Transliteration** | Crimson Pro Italic | -                              | -                      | -                       | -                         |
| **Translation**     | Crimson Pro (500)  | Noto Serif Devanagari (500)    | Noto Serif Tamil (500) | Noto Serif Telugu (500) | Noto Serif Gujarati (500) |
| **Commentary**      | Crimson Pro (400)  | Noto Serif Devanagari (400)    | Noto Serif Tamil (400) | Noto Serif Telugu (400) | Noto Serif Gujarati (400) |
| **UI Elements**     | Inter              | Mukta                          | Inter                  | Inter                   | Inter                     |

---

## Examples in Practice

### Verse Component

```tsx
function VerseDisplay({ verse, locale }: Props) {
  return (
    <div className="space-y-4">
      {/* Sanskrit verse - automatically styled */}
      <div className="sanskrit-verse" lang="sa">
        {verse.sanskrit_text}
      </div>

      {/* Transliteration */}
      <div className="transliteration">{verse.transliteration}</div>

      {/* Translation - adapts to locale */}
      <div className="translation" lang={locale}>
        {verse.translation[locale]}
      </div>

      {/* Commentary - adapts to locale */}
      <div className="commentary" lang={locale}>
        {verse.commentary[locale]}
      </div>
    </div>
  );
}
```

### Chapter Header

```tsx
function ChapterHeader({ chapterData, locale }: Props) {
  return (
    <div className="space-y-3">
      {/* Title - uses Crimson Pro by default */}
      <h1 className="font-crimson text-2xl font-semibold">
        Chapter {chapterData.number}: {chapterData.name}
      </h1>

      {/* Summary - adapts to locale */}
      <p className="font-crimson text-lg" lang={locale}>
        {chapterData.summary[locale]}
      </p>
    </div>
  );
}
```

### Navigation/UI Elements

```tsx
function Navigation() {
  return (
    <nav className="font-inter">
      <button className="rounded-lg px-4 py-2 font-inter">Next Chapter</button>
    </nav>
  );
}
```

---

## Performance Tips

### 1. Conditional Font Loading

Load fonts conditionally based on user's language selection to improve performance:

```tsx
// Only the fonts needed for the current locale are loaded
// via Next.js font optimization
```

### 2. Font Display Strategy

All fonts use `display: swap` strategy:

- Text is immediately visible with fallback font
- Custom font swaps in when loaded
- No FOIT (Flash of Invisible Text)

### 3. Subset Loading

Only relevant character subsets are loaded:

- Latin fonts: `latin` subset only
- Devanagari fonts: `devanagari` subset only
- Tamil fonts: `tamil` subset only
- etc.

---

## Migration Guide

### From Old System to New System

**Before:**

```tsx
// Old approach
<div className="font-dev">संस्कृत</div>
<p className="font-serif">Text</p>
```

**After:**

```tsx
// New approach with language detection
<div lang="sa">संस्कृत</div>
<p className="font-crimson">Text</p>

// Or with semantic classes
<div className="sanskrit-verse" lang="sa">संस्कृत</div>
<div className="translation" lang="en">Translation</div>
```

---

## Troubleshooting

### Font not applying correctly?

1. **Check lang attribute**: Ensure the correct `lang` attribute is set

   ```tsx
   <div lang="hi">हिंदी</div>
   ```

2. **Check CSS specificity**: Some styles may override font settings

   ```tsx
   // ❌ Bad - overriding with inline style
   <div lang="hi" style={{ fontFamily: 'Arial' }}>...</div>

   // ✅ Good - let the system handle it
   <div lang="hi">...</div>
   ```

3. **UI elements**: Buttons/nav explicitly use Inter
   ```tsx
   // This is correct - UI elements use Inter
   <button>Click me</button>
   ```

### Wrong font weight?

Use semantic classes or Tailwind's font-weight utilities:

```tsx
// Semantic (preferred)
<div className="sanskrit-verse">श्लोक</div>

// Manual
<div className="font-devanagari-serif font-semibold">श्लोक</div>
```

---

## Best Practices

### ✅ DO

- Use `lang` attributes for proper language detection
- Use semantic classes (`sanskrit-verse`, `translation`, `commentary`)
- Let the system automatically apply fonts based on language
- Use Inter for all UI elements (buttons, navigation, labels)
- Use Crimson Pro for English body text

### ❌ DON'T

- Don't hardcode font families in component styles
- Don't use generic system fonts for scripture text
- Don't forget `lang` attributes on multilingual content
- Don't override font families unnecessarily
- Don't use serif fonts for UI elements

---

## CSS Variable Reference

All fonts are available as CSS variables:

```css
--font-inter              /* Inter (UI elements) */
--font-crimson            /* Crimson Pro (English body) */
--font-sanskrit           /* Tiro Devanagari Sanskrit (for verses) */
--font-devanagari-serif   /* Noto Serif Devanagari (Hindi/Marathi) */
--font-devanagari-sans    /* Mukta (UI elements) */
--font-tamil-serif        /* Noto Serif Tamil */
--font-telugu-serif       /* Noto Serif Telugu */
--font-gujarati-serif     /* Noto Serif Gujarati */
```

---

## Resources

- [Google Fonts - Crimson Pro](https://fonts.google.com/specimen/Crimson+Pro)
- [Google Fonts - Inter](https://fonts.google.com/specimen/Inter)
- [Google Fonts - Tiro Devanagari Sanskrit](https://fonts.google.com/specimen/Tiro+Devanagari+Sanskrit) - _Designed specifically for classical Sanskrit texts_
- [Google Fonts - Noto Serif Devanagari](https://fonts.google.com/specimen/Noto+Serif+Devanagari)
- [Google Fonts - Noto Serif Tamil](https://fonts.google.com/specimen/Noto+Serif+Tamil)
- [Google Fonts - Noto Serif Telugu](https://fonts.google.com/specimen/Noto+Serif+Telugu)
- [Google Fonts - Noto Serif Gujarati](https://fonts.google.com/specimen/Noto+Serif+Gujarati)

---

Jai Shri Krishna! 🙏

Radhey Radhey

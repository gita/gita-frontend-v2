export default function splitIntoParagraphs(
  textData: GitaLanguage[] | undefined,
): string[] | undefined {
  if (textData) {
    const sentences = textData[0].description.split(" ");

    const paragraphs: string[] = [];
    let currentParagraph = "";

    for (const sentence of sentences) {
      currentParagraph += sentence + " ";

      if (currentParagraph.length >= 400) {
        paragraphs.push(currentParagraph.trim());
        currentParagraph = "";
      }
    }

    if (currentParagraph.length < 150 && paragraphs.length > 0) {
      paragraphs[paragraphs.length - 1] += " " + currentParagraph.trim();
    } else if (currentParagraph) {
      paragraphs.push(currentParagraph.trim());
    }

    return paragraphs;
  }
}

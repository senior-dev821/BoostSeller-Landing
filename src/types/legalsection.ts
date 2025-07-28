export type LegalSection = {
  id: string;
  title: string;
  content: string;         // Rich intro text (can be HTML or markdown)
  list?: string[];         // Optional bullet points
};

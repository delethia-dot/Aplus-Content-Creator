export const COMPLIANCE_RULES = [
  {
    label: 'Pricing or promotions',
    trigger: 'Any mention of price, sale, discount, deal, free, or promotional language',
    resolution: 'Remove. A+ is for storytelling, not transactions.',
  },
  {
    label: 'External links or QR codes',
    trigger: 'URLs, web addresses, QR codes, or off-Amazon links',
    resolution: 'Remove. A+ must keep shoppers on Amazon.',
  },
  {
    label: 'Superlative claims',
    trigger: "'Best,' 'top-rated,' '#1,' 'leading' without substantiation",
    resolution: 'Remove or replace with specific verifiable language.',
  },
  {
    label: 'Competitor names',
    trigger: 'Any named competitor brand, author, or product',
    resolution: 'Remove entirely.',
  },
  {
    label: 'Customer review quotes',
    trigger: 'Any quote from a regular customer review or testimonial',
    resolution: 'Remove. Only up to 4 endorsements from recognized publications/public figures with clear attribution are allowed.',
  },
  {
    label: 'Non-evergreen language',
    trigger: "'New,' 'this year,' 'just released,' 'holiday special'",
    resolution: 'Replace with evergreen alternatives.',
  },
  {
    label: 'Off-brand imagery',
    trigger: 'Images not owned by author/publisher, third-party logos',
    resolution: 'Replace with original owned assets only.',
  },
  {
    label: 'Calls to action off Amazon',
    trigger: "'Buy on my website,' 'Follow me on Instagram,' 'Join my newsletter'",
    resolution: 'Remove. A+ cannot drive traffic off Amazon.',
  },
  {
    label: 'Content contradicting main listing',
    trigger: 'A+ claims that conflict with product description or genre labels',
    resolution: 'Align A+ with the main listing before publishing.',
  },
];

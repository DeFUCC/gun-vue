const stressMark = '&#x301;'

export const langParts = {
  noun: {
    en: 'noun',
    ru: 'сущ',
    underline: 'solid',
  },
  adj: {
    en: 'adjective',
    ru: 'прил',
    underline: 'wavy',
  },
  verb: {
    en: 'verb',
    ru: 'глаг',
    underline: 'double',
  },
  adv: {
    en: 'adverb',
    ru: 'нареч',
    underline: 'dotted',
  },
}

export function renderWord({ text, stress } = {}) {
  if (!text) return;
  let str = text.slice(0, stress + 1) + stressMark + text.slice(stress + 1);
  return str[0].toUpperCase() + str.slice(1);
}
// Pedigree data — language-neutral. Each chart is one PedigreeNode tree.
// Add a new pedigree by exporting another PedigreeNode object here.

export type PedigreeRole = 'subject' | 'sire' | 'dam' | 'gsire' | 'gdam' | 'ggs' | 'ggd';

export interface PedigreeNode {
  role: PedigreeRole;
  name: string;
  meta?: string[];
  photo?: string;
  children?: PedigreeNode[];
}

// Standard pedigree-chart role labels — English on every locale.
export const ROLE_LABELS: Record<PedigreeRole, string> = {
  subject: 'Subject',
  sire: 'Sire',
  dam: 'Dam',
  gsire: 'Grand Sire',
  gdam: 'Grand Dam',
  ggs: 'GGS',
  ggd: 'GGD',
};

export const PEDIGREE_2234: PedigreeNode = {
  role: 'subject',
  name: '2234',
  meta: ['Ear Tag #: RD2234', 'DOB: 01.06.2022', 'Breed: Благородный олень', 'Sex: Buck'],
  photo: '/enhanced_deer_1.webp',
  children: [
    {
      role: 'sire',
      name: '1406',
      meta: ['A.S.: 270 5/8'],
      photo: '/pedigree-2234-sire-1406.webp',
      children: [
        {
          role: 'gsire',
          name: 'Charles 4 Warnham Farm',
          photo: '/pedigree-2234-charles4.webp',
          children: [
            { role: 'ggs', name: 'GGS' },
            { role: 'ggd', name: 'GGD' },
          ],
        },
        {
          role: 'gdam',
          name: 'Y1247 Warnham Farm',
          children: [
            { role: 'ggs', name: 'Bartholemu', photo: '/pedigree-2234-bartholemu.webp' },
            { role: 'ggd', name: 'Y419' },
          ],
        },
      ],
    },
    {
      role: 'dam',
      name: '1719',
      children: [
        {
          role: 'gsire',
          name: '011/10 Woburn Farm',
          photo: '/pedigree-2234-011-10.webp',
          children: [
            { role: 'ggs', name: 'Sackville', photo: '/pedigree-2234-sackville.webp' },
            { role: 'ggd', name: 'R35' },
          ],
        },
        {
          role: 'gdam',
          name: '1525',
          children: [
            { role: 'ggs', name: '011/09 Woburn Farm', photo: '/pedigree-2234-011-09.webp' },
            { role: 'ggd', name: 'Y1282 Warnham Park' },
          ],
        },
      ],
    },
  ],
};

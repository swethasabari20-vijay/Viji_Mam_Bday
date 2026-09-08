/**
 * =========================================================================
 * 🎂 VIJI MA'AM'S BIRTHDAY EXPERIENCE CONFIGURATION & CONTENT
 * =========================================================================
 * 
 * Hey Swetha! You can easily customize this entire experience right here:
 * 
 * 1. 📷 TO REPLACE THE PHOTO:
 *    - Simply replace the file at `src/assets/viji-maam.jpg` with your photo.
 *    - OR click the "📷 Photo" button in the app header to upload it directly!
 * 
 * 2. ♫ TO REPLACE THE MUSIC:
 *    - Replace `src/assets/birthday-music.mp3` with your favorite audio track.
 *    - If no MP3 is provided, the app automatically plays a gentle, luxury
 *      harp/music-box acoustic birthday melody using the Web Audio API.
 * 
 * 3. ✍️ TO EDIT ANY TEXT OR MESSAGES:
 *    - All headings, quotes, paragraphs, and sign-offs are in `BIRTHDAY_CONFIG` below.
 * =========================================================================
 */

import vijiPhoto1 from '../assets/viji-photo-1.jpeg';
import vijiPhoto2 from '../assets/viji-photo-2.jpeg';

export interface BirthdayContent {
  meta: {
    recipientName: string;
    senderName: string;
    dateBadge: string;
  };
  photos: {
    photo1: {
      src: string;
      alt: string;
      label: string;
      subtitle: string;
      objectPosition: string;
    };
    photo2: {
      src: string;
      alt: string;
      label: string;
      subtitle: string;
      objectPosition: string;
    };
  };
  screen1: {
    teaserBadge: string;
    heading: string;
    description: string;
    buttonText: string;
  };
  screen2: {
    editionBadge: string;
    title: string;
    quoteLines: string[];
    roleSubtitle: string;
    buttonText: string;
  };
  screen3: {
    heading: string;
    paragraphs: string[];
    buttonText: string;
  };
  screen4: {
    motto: string;
    wishText: string;
    closingGreeting: string;
    senderSignoff: string;
    celebrateButton: string;
  };
}

export const BIRTHDAY_CONFIG: BirthdayContent = {
  meta: {
    recipientName: "Viji Ma’am",
    senderName: "Swetha",
    dateBadge: "SEPTEMBER 8",
  },
  photos: {
    photo1: {
      // 📷 Corporate blazer portrait (Viji Mam Photo 1.jpeg)
      src: vijiPhoto1,
      alt: "CEO Viji Ma’am - Executive Portrait",
      label: "Executive Portrait",
      subtitle: "The Leader & Visionary",
      objectPosition: "50% 18%",
    },
    photo2: {
      // 📷 Saree celebration portrait (Viji Mam Photo 2.jpeg)
      src: vijiPhoto2,
      alt: "CEO Viji Ma’am - Celebration Portrait",
      label: "Celebration Portrait",
      subtitle: "The Inspiration",
      objectPosition: "50% 14%",
    },
  },
  screen1: {
    teaserBadge: "A LITTLE SURPRISE AWAITS…",
    heading: "For Someone Extraordinary ❤️",
    description: "I couldn't be at the office to wish you in person today, so I thought of doing something a little different.",
    buttonText: "Open Your Surprise ✨",
  },
  screen2: {
    editionBadge: "SEPTEMBER 8 • BIRTHDAY EDITION",
    title: "Happy Birthday,\nViji Ma’am! 🎂",
    quoteLines: [
      "“Some people lead a company.",
      "Some people inspire the people inside it.",
      "The rare ones do both.”"
    ],
    roleSubtitle: "A leader. A mentor. An inspiration.",
    buttonText: "There's Something More… →",
  },
  screen3: {
    heading: "A Few Words From Someone Who's Learning From You…",
    paragraphs: [
      "Working with you has given me more than professional experience. It has given me the opportunity to observe, learn and grow from a leader I genuinely admire.",
      "Your dedication, confidence, vision and the way you handle different responsibilities have inspired me a lot.",
      "I'm truly grateful for everything I continue to learn from you, and I hope I get many more opportunities to learn from you in the coming years."
    ],
    buttonText: "One Last Surprise 🎁",
  },
  screen4: {
    motto: "KEEP LEADING. KEEP INSPIRING. KEEP SHINING. ✨",
    wishText: "May the year ahead bring you bigger dreams, greater achievements, beautiful moments and countless reasons to smile.",
    closingGreeting: "Happy Birthday, Ma’am! ❤️",
    senderSignoff: "With warm wishes,\nSwetha",
    celebrateButton: "Celebrate 🎉",
  },
};

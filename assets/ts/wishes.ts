// ✨ The wishlist itself. Add, remove or reorder wishes here, then run `npm run build`.
//
// Images live in /assets/images/wishlist/. Use transparent PNG/WebP cut-outs so they
// float on the background. Until a wish has an `image`, an emoji placeholder is shown.

export type Category = "wardrobe" | "kitchen" | "dorm" | "books" | "lab" | "fun";

export type Backdrop = "paper" | "gingham";

/** A small decorative image that drifts away from the product on hover. */
export interface Decoration {
  src: string;
  alt?: string;
  /** Position inside the picture area, as percentages (0–100). */
  x: number;
  y: number;
  /** Width as a percentage of the picture area. */
  width: number;
  /** Resting rotation in degrees. */
  rotate?: number;
  /** How far it moves on hover, in px. */
  driftX?: number;
  driftY?: number;
}

export interface Wish {
  id: string;
  title: string;
  /** Why you want it: shown on the note card. */
  why: string;
  category: Category;
  /** Main product cut-out. */
  image?: string;
  /** Emoji shown while there is no image yet. */
  placeholder: string;
  decorations?: Decoration[];
  /** Which background this slide sits on. Defaults to alternating. */
  backdrop?: Backdrop;
  /** Optional link to where it can be bought. */
  link?: string;
  /** Flip to true when someone makes it come true 🎉 */
  granted?: boolean;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  wardrobe: "👟 Wardrobe",
  kitchen: "☕ Kitchen",
  dorm: "🛏️ Dorm",
  books: "📚 Books",
  lab: "🧪 Lab",
  fun: "🎀 Just for fun",
};

export const WISHES: Wish[] = [
  {
    id: "anta-tt-shoes",
    title: "Anta TT shoes",
    why: "In desperate need of new shoes for this summer!",
    category: "wardrobe",
    placeholder: "👟",
  },
  {
    id: "cute-glassware",
    title: "Cute Glassware",
    why:
      "The pretty glass I had broke last semester (after me putting hot water in it, *ahem*). " +
      "So, I will be needing new ones for the optimal drinking experience.",
    category: "kitchen",
    placeholder: "🥛",
  },
  {
    id: "coffee-set",
    title: "Coffee set",
    why:
      "I want to save money as much as possible, so I want to strive to make my coffee " +
      "and matcha in my dorm with a coffee set.",
    category: "kitchen",
    placeholder: "☕",
  },
];

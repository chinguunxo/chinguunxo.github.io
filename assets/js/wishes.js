// ✨ The wishlist itself. Add, remove or reorder wishes here, then run `npm run build`.
//
// Images live in /assets/images/wishlist/. Use transparent PNG/WebP cut-outs so they
// float on the background. Until a wish has an `image`, an emoji placeholder is shown.
export const CATEGORY_LABELS = {
    wardrobe: "👟 Wardrobe",
    kitchen: "☕ Kitchen",
    dorm: "🛏️ Dorm",
    books: "📚 Books",
    lab: "🧪 Lab",
    fun: "🎀 Just for fun",
};
export const WISHES = [
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
        why: "The pretty glass I had broke last semester (after me putting hot water in it, *ahem*). " +
            "So, I will be needing new ones for the optimal drinking experience.",
        category: "kitchen",
        placeholder: "🥛",
    },
    {
        id: "coffee-set",
        title: "Coffee set",
        why: "I want to save money as much as possible, so I want to strive to make my coffee " +
            "and matcha in my dorm with a coffee set.",
        category: "kitchen",
        placeholder: "☕",
    },
];

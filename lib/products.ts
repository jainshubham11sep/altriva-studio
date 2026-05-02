export interface Product {
  id: string;
  name: string;
  displayName: string;
  category: string;
  price: number;
  priceInr: number;
  colors?: number;
  image: string;
  hoverImage?: string;
  badge?: "New" | "Coming soon" | "Exclusive" | "Sold out";
  slug: string;
  aspect: "portrait" | "square";
}

const _i = [
  "/images/product-1.webp",
  "/images/product-2.webp",
  "/images/product-3.webp",
  "/images/product-4.webp",
  "/images/product-5.webp",
  "/images/product-6.webp",
  "/images/product-7.webp",
  "/images/product-8.webp",
  "/images/product-9.webp",
  "/images/product-10.webp",
  "/images/product-11.webp",
  "/images/product-12.webp",
  "/images/campaign-1.webp",
  "/images/campaign-2.webp",
  "/images/lifestyle-1.jpg",
  "/images/lifestyle-2.jpg",
  "/images/lifestyle-3.jpg",
];
const pi = (n: number) => _i[(n - 1) % _i.length];
const ph = (n: number) => _i[n % _i.length];

export const products: Product[] = [
  { id:"1",  name:"WOMENS SHEER FAIRISLE TOP IN COBALT",                              displayName:"womens sheer fairisle top in cobalt",                              category:"KNITTED TOPS",          price:550,  priceInr:67700,  colors:2, image:pi(1),  hoverImage:ph(1),  badge:"New",         slug:"womens-sheer-fairisle-top-in-cobalt",                              aspect:"portrait" },
  { id:"2",  name:"WOMENS CONTRASTING LEATHER COIL SLIDE IN BLUE & YELLOW",           displayName:"womens contrasting leather coil slide in blue & yellow",           category:"SLIDES",                price:650,  priceInr:80300,  colors:3, image:pi(2),  hoverImage:ph(2),  badge:"New",         slug:"womens-contrasting-leather-coil-slide-blue-yellow",               aspect:"portrait" },
  { id:"3",  name:"LEATHER BEETLE CHARM IN GREEN & BLACK",                             displayName:"leather beetle charm in green & black",                             category:"CHARMS",                price:360,  priceInr:44500,           image:pi(3),  hoverImage:ph(3),  badge:"New",         slug:"leather-beetle-charm-green-black",                                 aspect:"portrait" },
  { id:"4",  name:"WOMENS SNOWDROP DETAIL CROCHET DRESS IN BLACK",                    displayName:"womens snowdrop detail crochet dress in black",                    category:"KNITTED DRESSES",       price:840,  priceInr:326400,          image:pi(4),  hoverImage:ph(4),  badge:"New",         slug:"womens-snowdrop-detail-crochet-dress-black",                      aspect:"portrait" },
  { id:"5",  name:"WOMENS CAPE SILK DRESS IN RED & BUBBLEGUM PINK",                   displayName:"womens cape silk dress in red & bubblegum pink",                   category:"DRESSES",               price:1050, priceInr:277300,          image:pi(5),  hoverImage:ph(5),  badge:"New",         slug:"womens-cape-silk-dress-red-bubblegum-pink",                       aspect:"portrait" },
  { id:"6",  name:"WOMENS WOVEN LEATHER SANDAL IN GREEN & BRIGHT YELLOW",             displayName:"womens woven leather sandal in green & bright yellow",             category:"SANDALS",               price:550,  priceInr:67700,  colors:2, image:pi(6),  hoverImage:ph(6),  badge:"New",         slug:"womens-woven-leather-sandal-green-bright-yellow",                 aspect:"portrait" },
  { id:"7",  name:"SMALL BEADED BULB BAG IN YELLOW",                                  displayName:"small beaded bulb bag in yellow",                                  category:"BULB BAGS",             price:490,  priceInr:67700,  colors:3, image:pi(7),  hoverImage:ph(7),  badge:"New",         slug:"small-beaded-bulb-bag-yellow",                                    aspect:"portrait" },
  { id:"8",  name:"HAND-CROCHETED CHAMELEON CHARM",                                   displayName:"hand-crocheted chameleon charm",                                   category:"CHARMS",                price:450,  priceInr:55800,           image:pi(8),  hoverImage:ph(8),  badge:"New",         slug:"hand-crocheted-chameleon-charm",                                  aspect:"portrait" },
  { id:"9",  name:"WOMENS SLIPPER MULES IN SAGE-GREEN WOVEN LEATHER",                 displayName:"womens slipper mules in sage-green woven leather",                 category:"FLATS",                 price:690,  priceInr:80300,  colors:2, image:pi(9),  hoverImage:ph(9),                       slug:"womens-slipper-mules-sage-green-woven-leather",                   aspect:"square"   },
  { id:"10", name:"WOMENS KNOTTED WAIST LONGLINE DRESS IN FLURO YELLOW",              displayName:"womens knotted waist longline dress in fluro yellow",              category:"DRESSES",               price:950,  priceInr:166500, colors:4, image:pi(10), hoverImage:ph(10), badge:"New",         slug:"womens-knotted-waist-longline-dress-fluro-yellow",                aspect:"portrait" },
  { id:"11", name:"CHAIN-LINK SUNGLASSES STRAP IN GOLD TONE",                         displayName:"chain-link sunglasses strap in gold tone",                         category:"ACCESSORIES",           price:190,  priceInr:23300,           image:pi(11), hoverImage:ph(11), badge:"Coming soon", slug:"chain-link-sunglasses-strap-gold-tone",                           aspect:"portrait" },
  { id:"12", name:"SMALL BEADED BULB BAG IN BLUE",                                    displayName:"small beaded bulb bag in blue",                                    category:"BULB BAGS",             price:490,  priceInr:67700,  colors:3, image:pi(12), hoverImage:ph(12), badge:"Sold out",    slug:"small-beaded-bulb-bag-blue",                                      aspect:"portrait" },
  { id:"13", name:"WOMENS ANIMAL STARS GRAPHIC PRINT T-SHIRT IN MID GREY MELANGE",    displayName:"womens animal stars graphic print t-shirt in mid grey melange",    category:"T-SHIRTS & TOPS",       price:195,  priceInr:23900,  colors:2, image:pi(13), hoverImage:ph(13), badge:"New",         slug:"womens-animal-stars-graphic-t-shirt-mid-grey-melange",            aspect:"portrait" },
  { id:"14", name:"MENS LEATHER LEAF SLIDES IN LIME",                                 displayName:"mens leather leaf slides in lime",                                 category:"SLIDES",                price:550,  priceInr:67700,  colors:2, image:pi(14), hoverImage:ph(14), badge:"New",         slug:"mens-leather-leaf-slides-lime",                                   aspect:"portrait" },
  { id:"15", name:"MENS CABLE FRONT ZIP JUMPER IN BRIGHT YELLOW",                     displayName:"mens cable front zip jumper in bright yellow",                     category:"KNITWEAR",              price:955,  priceInr:117400,          image:pi(15), hoverImage:ph(15), badge:"New",         slug:"mens-cable-front-zip-jumper-bright-yellow",                       aspect:"portrait" },
  { id:"16", name:"WOMENS RUFFLE DRESS IN SAPPHIRE BLUE",                             displayName:"womens ruffle dress in sapphire blue",                             category:"DRESSES",               price:1395, priceInr:171200,          image:pi(16), hoverImage:ph(16), badge:"New",         slug:"womens-ruffle-dress-sapphire-blue",                               aspect:"portrait" },
  { id:"17", name:"WOMENS MINI DRESS IN DARK NAVY",                                   displayName:"womens mini dress in dark navy",                                   category:"KNITTED DRESSES",       price:755,  priceInr:92900,  colors:2, image:pi(17), hoverImage:ph(17), badge:"New",         slug:"womens-mini-dress-dark-navy",                                     aspect:"portrait" },
  { id:"18", name:"WOMENS WOVEN HEELED LEATHER PLOT SANDAL IN RED & BUBBLEGUM PINK",  displayName:"womens woven heeled leather plot sandal in red & bubblegum pink",  category:"SANDALS",               price:755,  priceInr:92900,  colors:2, image:pi(18), hoverImage:ph(18), badge:"New",         slug:"womens-woven-heeled-leather-plot-sandal-red-bubblegum-pink",      aspect:"portrait" },
  { id:"19", name:"MENS STAR MAN SWEATSHIRT IN ECRU",                                 displayName:"mens star man sweatshirt in ecru",                                 category:"HOODIES & SWEATSHIRTS", price:350,  priceInr:43200,           image:pi(19), hoverImage:ph(19), badge:"Coming soon", slug:"mens-star-man-sweatshirt-ecru",                                   aspect:"portrait" },
  { id:"20", name:"LOAFER BAG IN TAUPE WOVEN LEATHER",                                displayName:"loafer bag in taupe woven leather",                                category:"LOAFER BAGS",           price:1555, priceInr:191100, colors:5, image:pi(20), hoverImage:ph(20), badge:"New",         slug:"loafer-bag-taupe-woven-leather",                                  aspect:"square"   },
  { id:"21", name:"SMALL BULB BAG IN NATURAL BROWN",                                  displayName:"small bulb bag in natural brown",                                  category:"BULB BAGS",             price:385,  priceInr:47100,           image:pi(21), hoverImage:ph(21), badge:"New",         slug:"small-bulb-bag-natural-brown",                                    aspect:"portrait" },
  { id:"22", name:"MENS DAMASK WOVEN SHORTS IN EMERALD",                              displayName:"mens damask woven shorts in emerald",                              category:"SHORTS",                price:1950, priceInr:239500, colors:3, image:pi(22), hoverImage:ph(22), badge:"Exclusive",   slug:"mens-damask-woven-shorts-emerald",                                aspect:"portrait" },
  { id:"23", name:"JWA07 BUMPER SUNGLASSES IN WHITE & BLUE",                          displayName:"jwa07 bumper sunglasses in white & blue",                          category:"SUNGLASSES",            price:280,  priceInr:34500,  colors:3, image:pi(23), hoverImage:ph(23),                      slug:"jwa07-bumper-sunglasses-white-blue",                              aspect:"portrait" },
  { id:"24", name:"HAND-CROCHETED PERSIMMON CHARM",                                   displayName:"hand-crocheted persimmon charm",                                   category:"CHARMS",                price:255,  priceInr:31200,           image:pi(24), hoverImage:ph(24), badge:"New",         slug:"hand-crocheted-persimmon-charm",                                  aspect:"portrait" },
  { id:"25", name:"LOAFER BAG IN SAGE WOVEN LEATHER",                                 displayName:"loafer bag in sage woven leather",                                 category:"LOAFER BAGS",           price:1555, priceInr:191100, colors:5, image:pi(25), hoverImage:ph(25), badge:"New",         slug:"loafer-bag-sage-woven-leather",                                   aspect:"portrait" },
  { id:"26", name:"LEATHER SNOWDROP CHARM IN WHITE & GREEN",                          displayName:"leather snowdrop charm in white & green",                          category:"CHARMS",                price:360,  priceInr:44500,           image:pi(26), hoverImage:ph(26), badge:"New",         slug:"leather-snowdrop-charm-white-green",                              aspect:"portrait" },
  { id:"27", name:"WOMENS SHEER FAIRISLE TOP IN SOFT LEMON",                          displayName:"womens sheer fairisle top in soft lemon",                          category:"KNITTED TOPS",          price:550,  priceInr:67700,  colors:2, image:pi(27), hoverImage:ph(27), badge:"New",         slug:"womens-sheer-fairisle-top-soft-lemon",                            aspect:"portrait" },
  { id:"28", name:"WOMENS ANIMAL STARS GRAPHIC PRINT T-SHIRT IN ECRU",                displayName:"womens animal stars graphic print t-shirt in ecru",                category:"T-SHIRTS & TOPS",       price:195,  priceInr:23900,  colors:2, image:pi(28), hoverImage:ph(28), badge:"New",         slug:"womens-animal-stars-graphic-t-shirt-ecru",                        aspect:"portrait" },
  { id:"29", name:"SMALL BEADED BULB BAG IN GREEN",                                   displayName:"small beaded bulb bag in green",                                   category:"BULB BAGS",             price:490,  priceInr:67700,  colors:3, image:pi(29), hoverImage:ph(29), badge:"Coming soon", slug:"small-beaded-bulb-bag-green",                                     aspect:"portrait" },
  { id:"30", name:"WOMENS CONTRASTING LEATHER COIL SLIDE IN BROWN & CHESTNUT",        displayName:"womens contrasting leather coil slide in brown & chestnut",        category:"SLIDES",                price:650,  priceInr:80300,  colors:3, image:pi(30), hoverImage:ph(30), badge:"New",         slug:"womens-contrasting-leather-coil-slide-brown-chestnut",            aspect:"square"   },
  { id:"31", name:"MENS LOAFER RUFFLE SUEDE BOAT SHOES IN CHOCOLATE BROWN",           displayName:"mens loafer ruffle suede boat shoes in chocolate brown",           category:"SHOES",                 price:795,  priceInr:97500,  colors:2, image:pi(31), hoverImage:ph(31), badge:"New",         slug:"mens-loafer-ruffle-suede-boat-shoes-chocolate-brown",             aspect:"portrait" },
  { id:"32", name:"LEATHER BLUEBELL CHARM IN BLUE & GREEN",                           displayName:"leather bluebell charm in blue & green",                           category:"CHARMS",                price:360,  priceInr:44500,           image:pi(32), hoverImage:ph(32), badge:"New",         slug:"leather-bluebell-charm-blue-green",                               aspect:"portrait" },
  { id:"33", name:"WOMENS MINI DRESS IN WHITE",                                       displayName:"womens mini dress in white",                                       category:"KNITTED DRESSES",       price:755,  priceInr:92900,  colors:2, image:pi(33), hoverImage:ph(33), badge:"New",         slug:"womens-mini-dress-white",                                         aspect:"portrait" },
  { id:"34", name:"LOAFER BAG IN CHOCOLATE BROWN WOVEN LEATHER",                      displayName:"loafer bag in chocolate brown woven leather",                      category:"LOAFER BAGS",           price:1555, priceInr:191100, colors:5, image:pi(34), hoverImage:ph(34), badge:"New",         slug:"loafer-bag-chocolate-brown-woven-leather",                        aspect:"portrait" },
  { id:"35", name:"HAND-CROCHETED LEMON CHARM",                                       displayName:"hand-crocheted lemon charm",                                       category:"CHARMS",                price:255,  priceInr:31200,           image:pi(35), hoverImage:ph(35), badge:"New",         slug:"hand-crocheted-lemon-charm",                                      aspect:"portrait" },
  { id:"36", name:"WOMENS FUSSBETT LOAFER SUEDE SLIDES IN BROWN",                     displayName:"womens fussbett loafer suede slides in brown",                     category:"FLATS",                 price:595,  priceInr:73000,  colors:3, image:pi(36), hoverImage:ph(36), badge:"New",         slug:"womens-fussbett-loafer-suede-slides-brown",                       aspect:"square"   },
  { id:"37", name:"WOMENS WOVEN LEATHER SANDAL IN BLUE & GREEN",                      displayName:"womens woven leather sandal in blue & green",                      category:"SANDALS",               price:550,  priceInr:67700,  colors:2, image:pi(37), hoverImage:ph(37), badge:"New",         slug:"womens-woven-leather-sandal-blue-green",                          aspect:"square"   },
  { id:"38", name:"MENS PICKING FRUIT GRAPHIC PRINT T-SHIRT IN ECRU",                 displayName:"mens picking fruit graphic print t-shirt in ecru",                 category:"T-SHIRTS & TOPS",       price:195,  priceInr:23900,           image:pi(38), hoverImage:ph(38), badge:"New",         slug:"mens-picking-fruit-graphic-t-shirt-ecru",                         aspect:"portrait" },
  { id:"39", name:"MENS LEATHER LEAF SLIDES IN BROWN",                                displayName:"mens leather leaf slides in brown",                                category:"SLIDES",                price:550,  priceInr:67700,  colors:2, image:pi(39), hoverImage:ph(39), badge:"New",         slug:"mens-leather-leaf-slides-brown",                                  aspect:"portrait" },
  { id:"40", name:"LOAFER BAG IN CORAL WOVEN LEATHER",                                displayName:"loafer bag in coral woven leather",                                category:"LOAFER BAGS",           price:1555, priceInr:191100, colors:5, image:pi(40), hoverImage:ph(40), badge:"New",         slug:"loafer-bag-coral-woven-leather",                                  aspect:"portrait" },
  { id:"41", name:"LOAFER BAG IN BLACK WOVEN LEATHER",                                displayName:"loafer bag in black woven leather",                                category:"LOAFER BAGS",           price:1555, priceInr:191100, colors:5, image:pi(41), hoverImage:ph(41), badge:"New",         slug:"loafer-bag-black-woven-leather",                                  aspect:"square"   },
  { id:"42", name:"HAND-CROCHETED BROCCOLI CHARM",                                    displayName:"hand-crocheted broccoli charm",                                    category:"CHARMS",                price:295,  priceInr:35900,           image:pi(42), hoverImage:ph(42), badge:"New",         slug:"hand-crocheted-broccoli-charm",                                   aspect:"portrait" },
  { id:"43", name:"MENS CAMP COLLARED SHIRT IN SAPPHIRE BLUE",                        displayName:"mens camp collared shirt in sapphire blue",                        category:"SHIRTS",                price:655,  priceInr:80300,           image:pi(43), hoverImage:ph(43), badge:"New",         slug:"mens-camp-collared-shirt-sapphire-blue",                          aspect:"portrait" },
  { id:"44", name:"LARGE BULB BAG IN NATURAL BROWN",                                  displayName:"large bulb bag in natural brown",                                  category:"BULB BAGS",             price:490,  priceInr:60400,           image:pi(44), hoverImage:ph(44), badge:"New",         slug:"large-bulb-bag-natural-brown",                                    aspect:"portrait" },
  { id:"45", name:"WOMENS SIDE TIE BIKINI BRIEFS IN BLACK & ORANGE",                  displayName:"womens side tie bikini briefs in black & orange",                  category:"SWIMWEAR",              price:175,  priceInr:21300,           image:pi(45), hoverImage:ph(45), badge:"New",         slug:"womens-side-tie-bikini-briefs-black-orange",                      aspect:"portrait" },
  { id:"46", name:"WOMENS WOVEN HEELED LEATHER PLOT SANDAL IN BRIGHT GREEN & YELLOW", displayName:"womens woven heeled leather plot sandal in bright green & yellow", category:"SANDALS",               price:755,  priceInr:92900,  colors:2, image:pi(46), hoverImage:ph(46), badge:"New",         slug:"womens-woven-heeled-leather-plot-sandal-bright-green-yellow",     aspect:"portrait" },
  { id:"47", name:"MENS HAWAIIAN PRINT SWIM SHORTS IN SAPPHIRE",                      displayName:"mens hawaiian print swim shorts in sapphire",                      category:"SHORTS",                price:490,  priceInr:60400,           image:pi(47), hoverImage:ph(47), badge:"New",         slug:"mens-hawaiian-print-swim-shorts-sapphire",                        aspect:"portrait" },
  { id:"48", name:"MENS FUSSBETT LOAFER LEATHER SLIDES IN BLACK",                     displayName:"mens fussbett loafer leather slides in black",                     category:"SLIDES",                price:595,  priceInr:73000,  colors:3, image:pi(48), hoverImage:ph(48),                      slug:"mens-fussbett-loafer-leather-slides-black",                       aspect:"portrait" },
  { id:"49", name:"MENS SHORTS IN OFF WHITE & BLUE",                                  displayName:"mens shorts in off white & blue",                                  category:"SHORTS",                price:650,  priceInr:79600,           image:pi(49), hoverImage:ph(49), badge:"New",         slug:"mens-shorts-off-white-blue",                                      aspect:"portrait" },
  { id:"50", name:"MENS FRONT ZIP BLOUSON IN NAVY & BLUE",                            displayName:"mens front zip blouson in navy & blue",                            category:"COATS & JACKETS",       price:755,  priceInr:92900,  colors:2, image:pi(50), hoverImage:ph(50), badge:"New",         slug:"mens-front-zip-blouson-navy-blue",                                aspect:"portrait" },
  { id:"51", name:"WOMENS BIKINI TOP IN BLACK & ORANGE",                              displayName:"womens bikini top in black & orange",                              category:"SWIMWEAR",              price:175,  priceInr:21300,           image:pi(51), hoverImage:ph(51), badge:"New",         slug:"womens-bikini-top-black-orange",                                  aspect:"portrait" },
  { id:"52", name:"WOMENS LEATHER LEAF SLIDES IN LIME",                               displayName:"womens leather leaf slides in lime",                               category:"SLIDES",                price:550,  priceInr:67700,  colors:2, image:pi(52), hoverImage:ph(52), badge:"New",         slug:"womens-leather-leaf-slides-lime",                                 aspect:"portrait" },
  { id:"53", name:"JWA02 RECTANGULAR SUNGLASSES IN MARBLE",                           displayName:"jwa02 rectangular sunglasses in marble",                           category:"SUNGLASSES",            price:250,  priceInr:30600,  colors:5, image:pi(53), hoverImage:ph(53),                      slug:"jwa02-rectangular-sunglasses-marble",                             aspect:"square"   },
  { id:"54", name:"MENS FUSSBETT LOAFER SUEDE SLIDES IN RUST",                        displayName:"mens fussbett loafer suede slides in rust",                        category:"SLIDES",                price:595,  priceInr:73000,  colors:3, image:pi(54), hoverImage:ph(54), badge:"New",         slug:"mens-fussbett-loafer-suede-slides-rust",                          aspect:"portrait" },
  { id:"55", name:"HAND-CROCHETED RHUBARB CHARM",                                     displayName:"hand-crocheted rhubarb charm",                                     category:"CHARMS",                price:255,  priceInr:31200,           image:pi(55), hoverImage:ph(55), badge:"New",         slug:"hand-crocheted-rhubarb-charm",                                    aspect:"portrait" },
  { id:"56", name:"JWA07 BUMPER SUNGLASSES IN BROWN & GREEN",                         displayName:"jwa07 bumper sunglasses in brown & green",                         category:"SUNGLASSES",            price:280,  priceInr:34500,  colors:3, image:pi(56), hoverImage:ph(56),                      slug:"jwa07-bumper-sunglasses-brown-green",                             aspect:"square"   },
  { id:"57", name:"JWA07 BUMPER SUNGLASSES IN GREEN & ORANGE",                        displayName:"jwa07 bumper sunglasses in green & orange",                        category:"SUNGLASSES",            price:280,  priceInr:34500,  colors:3, image:pi(57), hoverImage:ph(57),                      slug:"jwa07-bumper-sunglasses-green-orange",                            aspect:"square"   },
  { id:"58", name:"MENS CONTRASTING LEATHER COIL SLIDE IN BLACK",                     displayName:"mens contrasting leather coil slide in black",                     category:"SLIDES",                price:650,  priceInr:80300,           image:pi(58), hoverImage:ph(58), badge:"New",         slug:"mens-contrasting-leather-coil-slide-black",                       aspect:"portrait" },
  { id:"59", name:"MENS DAMASK WOVEN SHORTS IN AIRFORCE BLUE",                        displayName:"mens damask woven shorts in airforce blue",                        category:"SHORTS",                price:1950, priceInr:239500, colors:3, image:pi(59), hoverImage:ph(59), badge:"Exclusive",   slug:"mens-damask-woven-shorts-airforce-blue",                          aspect:"portrait" },
  { id:"60", name:"MENS DAMASK WOVEN SHORTS IN CITRINE",                              displayName:"mens damask woven shorts in citrine",                              category:"SHORTS",                price:1950, priceInr:239500, colors:3, image:pi(60), hoverImage:ph(60), badge:"Exclusive",   slug:"mens-damask-woven-shorts-citrine",                                aspect:"portrait" },
];

export function getCollectionProducts(slug: string): Product[] {
  switch (slug) {
    case "summer-series":      return products;
    case "new-in":             return products.filter(p => p.badge === "New");
    case "mens-new-in":        return products.filter(p => p.name.startsWith("MENS"));
    case "womens-new-in":      return products.filter(p => p.name.startsWith("WOMENS"));
    case "loafer-bags":        return products.filter(p => p.category === "LOAFER BAGS");
    case "all-bags":           return products.filter(p => ["BULB BAGS","LOAFER BAGS"].includes(p.category));
    case "bag-charms":         return products.filter(p => p.category === "CHARMS");
    case "all-home":           return products.filter(p => ["CHARMS","SUNGLASSES","ACCESSORIES"].includes(p.category));
    case "collaborations":     return products.filter(p => p.badge === "Exclusive");
    case "coming-soon":        return products.filter(p => p.badge === "Coming soon");
    case "sunglasses":         return products.filter(p => p.category === "SUNGLASSES");
    case "shoes": case "flats":return products.filter(p => ["FLATS","SLIDES","SHOES"].includes(p.category));
    case "sandals":            return products.filter(p => p.category === "SANDALS");
    case "knitwear":           return products.filter(p => ["KNITWEAR","KNITTED TOPS","KNITTED DRESSES"].includes(p.category));
    case "dresses":            return products.filter(p => ["DRESSES","KNITTED DRESSES"].includes(p.category));
    case "t-shirts-tops":      return products.filter(p => p.category === "T-SHIRTS & TOPS");
    case "shorts":             return products.filter(p => p.category === "SHORTS");
    case "shirts":             return products.filter(p => p.category === "SHIRTS");
    case "hoodies-sweatshirts":return products.filter(p => p.category === "HOODIES & SWEATSHIRTS");
    case "coats-jackets":      return products.filter(p => p.category === "COATS & JACKETS");
    case "swim":               return products.filter(p => p.category === "SWIMWEAR");
    case "totes": case "shoulder-bags": return products.filter(p => p.category === "BULB BAGS");
    default:                   return products.slice(0, 24);
  }
}

export const collectionTitles: Record<string, string> = {
  "summer-series":       "Summer Series",
  "new-in":              "New In",
  "mens-new-in":         "Men's New In",
  "womens-new-in":       "Women's New In",
  "loafer-bags":         "Loafer Bags",
  "all-bags":            "All Bags",
  "bag-charms":          "Bag Charms",
  "all-home":            "All Home",
  "collaborations":      "Collaborations",
  "coming-soon":         "Coming Soon",
  "sunglasses":          "Sunglasses",
  "shoes":               "Shoes",
  "flats":               "Flats",
  "sandals":             "Sandals",
  "knitwear":            "Knitwear",
  "dresses":             "Dresses",
  "t-shirts-tops":       "T-Shirts & Tops",
  "shorts":              "Shorts",
  "shirts":              "Shirts",
  "hoodies-sweatshirts": "Hoodies & Sweatshirts",
  "coats-jackets":       "Coats & Jackets",
  "swim":                "Swim",
  "totes":               "Totes",
  "shoulder-bags":       "Shoulder Bags",
};

export const announcements = [
  { text: "Stay up to date with JW ANDERSON. Subscribe.", href: "#" },
  { text: "GUINNESS X JW ANDERSON - Shop Now", href: "#" },
  { text: "Complimentary UK Shipping on orders above £300", href: "#" },
];

export const mainNavLinks = [
  { label: "Men's New In",   href: "/collections/mens-new-in"   },
  { label: "Women's New In", href: "/collections/womens-new-in" },
  { label: "All Home",       href: "/collections/all-home"      },
];

export const footerLinks = {
  About: [
    { label: "Jonathan",            href: "/pages/about-us"            },
    { label: "Stores",              href: "/pages/store-locations"      },
    { label: "Careers",             href: "/pages/careers"              },
    { label: "Sign Up",             href: "/pages/sign-up"              },
    { label: "Your privacy choices",href: "/pages/privacy-policy"       },
  ],
  Assistance: [
    { label: "Contact",             href: "/pages/contact-us"           },
    { label: "Customer Support",    href: "/pages/customer-support"     },
    { label: "Delivery & Returns",  href: "/pages/delivery-and-returns" },
    { label: "Privacy",             href: "/pages/privacy-policy"       },
    { label: "Terms & Conditions",  href: "/pages/terms-conditions"     },
    { label: "Book an appointment", href: "/pages/book-appointment"     },
  ],
};

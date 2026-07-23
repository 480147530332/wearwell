// ======================================================
// Centralized product catalog for the whole storefront.
// Every product has 3 images, a category, rating info and
// full details so the same data can power Home, Women, Men,
// Shop and the Product Detail page consistently.
// ======================================================

const FALLBACK_IMG = "https://via.placeholder.com/700x700.png?text=WearWell";

const p = (id, title, category, price, mrp, rating, ratingCount, images, description, highlights, sizes, brand) => ({
  id,
  title,
  category, // 'women' | 'men' | 'electronics' | 'footwear' | 'accessories'
  brand,
  price,
  mrp,
  discount: Math.round(((mrp - price) / mrp) * 100),
  rating,
  ratingCount,
  images: images && images.length ? images : [FALLBACK_IMG, FALLBACK_IMG, FALLBACK_IMG],
  description,
  highlights,
  sizes: sizes || null,
});

const products = [
  p(1, "Elegant Floral Wrap Dress", "women", 1499, 2999, 4.2, 2318,
    [
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1583496661160-fb5886a13d77?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&q=80&auto=format",
    ],
    "A breathable floral wrap dress cut for an easy, flattering silhouette. Perfect for daywear or a summer evening out.",
    ["100% breathable rayon", "Machine washable", "Regular fit", "Wrap-tie waist"],
    ["XS", "S", "M", "L", "XL"], "WearWell"),

  p(2, "Classic Shoulder Bag", "women", 3599, 6999, 4.4, 987,
    [
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80&auto=format",
    ],
    "A structured shoulder bag in vegan leather with gold-tone hardware. Roomy enough for daily essentials.",
    ["Vegan leather", "Magnetic snap closure", "Adjustable strap", "Interior zip pocket"],
    null, "WearWell"),

  p(3, "Smart Casual Midi Dress", "women", 1299, 2199, 4.0, 1542,
    [
      "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?w=800&q=80&auto=format",
    ],
    "A versatile midi dress that moves easily from the office to dinner. Soft stretch fabric keeps you comfortable all day.",
    ["4-way stretch fabric", "Knee-length", "Machine wash cold", "Slim fit"],
    ["XS", "S", "M", "L", "XL"], "WearWell"),

  p(4, "Stylish Black Skinny Jeans", "women", 1342, 2499, 4.1, 3021,
    [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1475178626620-a4d074967452?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?w=800&q=80&auto=format",
    ],
    "High-rise skinny jeans with just the right amount of stretch. A wardrobe staple that pairs with everything.",
    ["High-rise fit", "Stretch denim", "5-pocket styling", "Machine washable"],
    ["26", "28", "30", "32", "34"], "WearWell"),

  p(5, "Women's Analog Rose Gold Watch", "women", 2199, 4499, 4.5, 764,
    [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1526045431048-f857369baa09?w=800&q=80&auto=format",
    ],
    "A minimalist analog watch with a rose gold case and genuine leather strap. Water resistant up to 30m.",
    ["Quartz movement", "Genuine leather strap", "Water resistant 30m", "1 year warranty"],
    null, "WearWell"),

  p(6, "Essentials Makeup Kit", "women", 899, 1499, 3.9, 452,
    [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&q=80&auto=format",
    ],
    "A complete 5-piece starter makeup kit with skin-friendly, dermatologically tested formulas.",
    ["5 pieces included", "Dermatologically tested", "Long-lasting finish", "Travel friendly pouch"],
    null, "WearWell"),

  p(7, "Women's Strappy High Heels", "women", 1899, 3400, 3.8, 641,
    [
      "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?w=800&q=80&auto=format",
    ],
    "Strappy block heels designed for comfort with cushioned insoles — perfect for parties and evenings out.",
    ["Cushioned insole", "3 inch block heel", "Ankle strap with buckle", "Non-slip sole"],
    ["4", "5", "6", "7", "8"], "WearWell"),

  p(8, "Oversized Graphic Tee", "women", 799, 1299, 4.0, 1122,
    [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1503341960582-b45751874cf0?w=800&q=80&auto=format",
    ],
    "A relaxed, oversized fit graphic tee made from soft cotton jersey. Easy to dress up or down.",
    ["100% cotton", "Oversized fit", "Pre-shrunk fabric", "Machine washable"],
    ["S", "M", "L", "XL"], "WearWell"),

  p(9, "Premium Leather Wallet", "men", 799, 1499, 4.3, 2871,
    [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1517254797898-04edd251b0b3?w=800&q=80&auto=format",
    ],
    "A slim genuine leather bi-fold wallet with RFID-blocking lining and multiple card slots.",
    ["Genuine leather", "RFID protected", "6 card slots", "Slim bi-fold design"],
    null, "WearWell"),

  p(10, "Men's Slim Fit Formal Shirt", "men", 999, 1799, 4.1, 1654,
    [
      "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&q=80&auto=format",
    ],
    "A crisp cotton-blend formal shirt with a slim tailored fit, ideal for office wear or formal occasions.",
    ["Cotton-blend fabric", "Slim fit", "Wrinkle resistant", "Machine washable"],
    ["S", "M", "L", "XL", "XXL"], "WearWell"),

  p(11, "Eco Denim Jacket", "men", 1800, 2999, 4.2, 987,
    [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=800&q=80&auto=format",
    ],
    "A rugged denim jacket made from recycled cotton denim, built to last and get better with age.",
    ["Recycled denim", "Button-front closure", "Chest pockets", "Regular fit"],
    ["S", "M", "L", "XL"], "WearWell"),

  p(12, "Sustainable Pullover Hoodie", "men", 1500, 2499, 4.0, 1211,
    [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1509942774463-acf339cf87d5?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80&auto=format",
    ],
    "An everyday hoodie made from organic cotton fleece — soft on the inside, durable on the outside.",
    ["Organic cotton fleece", "Kangaroo pocket", "Ribbed cuffs", "Machine washable"],
    ["S", "M", "L", "XL", "XXL"], "WearWell"),

  p(13, "Men's Chronograph Watch", "men", 3499, 6999, 4.4, 1876,
    [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?w=800&q=80&auto=format",
    ],
    "A rugged chronograph watch with a stainless steel case and luminous hands, built for everyday wear.",
    ["Chronograph movement", "Stainless steel case", "Water resistant 50m", "2 year warranty"],
    null, "WearWell"),

  p(14, "Men's Slim Fit Chino Trousers", "men", 1199, 2199, 3.9, 843,
    [
      "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&q=80&auto=format",
    ],
    "Tailored slim-fit chinos in a stretch cotton blend, sharp enough for the office and relaxed enough for weekends.",
    ["Stretch cotton blend", "Slim fit", "Mid-rise", "Machine washable"],
    ["30", "32", "34", "36", "38"], "WearWell"),

  p(15, "Air Cushion Running Shoes", "footwear", 3499, 6999, 4.3, 4210,
    [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=800&q=80&auto=format",
    ],
    "Lightweight running shoes with responsive air-cushion soles for long runs and daily training.",
    ["Breathable mesh upper", "Air-cushion sole", "Lightweight design", "Anti-slip outsole"],
    ["6", "7", "8", "9", "10", "11"], "WearWell"),

  p(16, "Classic White Sneakers", "footwear", 2599, 3999, 4.1, 3305,
    [
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1596460107916-430662021049?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80&auto=format",
    ],
    "Timeless white sneakers that go with everything — from denim to dresses. Cushioned for all-day comfort.",
    ["Genuine leather upper", "Cushioned footbed", "Rubber outsole", "Lace-up closure"],
    ["6", "7", "8", "9", "10", "11"], "WearWell"),

  p(17, "Formal Oxford Lace-Ups", "footwear", 2899, 4999, 4.0, 1189,
    [
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1614253429340-98120bd6d753?w=800&q=80&auto=format",
    ],
    "Polished Oxford lace-ups crafted from premium leather — a sharp choice for formal occasions.",
    ["Genuine leather", "Cushioned insole", "Lace-up closure", "Non-slip outsole"],
    ["6", "7", "8", "9", "10", "11"], "WearWell"),

  p(18, "Wireless Over-Ear Headphones", "electronics", 2499, 4999, 4.3, 6210,
    [
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&q=80&auto=format",
    ],
    "Over-ear wireless headphones with active noise cancellation and up to 30 hours of battery life.",
    ["Active noise cancellation", "30 hour battery life", "Bluetooth 5.0", "Foldable design"],
    null, "WearWell Audio"),

  p(19, "Smart Fitness Watch", "electronics", 4899, 7999, 4.2, 5023,
    [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&q=80&auto=format",
    ],
    "Track your workouts, heart rate, sleep and notifications with this all-day smart fitness watch.",
    ["Heart rate monitor", "7-day battery life", "Water resistant", "Bluetooth calling"],
    null, "WearWell Tech"),

  p(20, "Bluetooth Portable Speaker", "electronics", 1599, 2999, 4.1, 2894,
    [
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1589003077984-894e133dabab?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&q=80&auto=format",
    ],
    "A compact, punchy Bluetooth speaker with 12 hours of playtime and IPX7 water resistance.",
    ["12 hour battery life", "IPX7 waterproof", "Bluetooth 5.0", "Built-in mic for calls"],
    null, "WearWell Audio"),

  p(21, "Recycled Canvas Backpack", "accessories", 2300, 3499, 4.2, 1543,
    [
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1547949003-9792a18a2645?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&q=80&auto=format",
    ],
    "A durable everyday backpack made from recycled canvas, with a padded laptop sleeve and multiple compartments.",
    ["Fits up to 15.6\" laptop", "Water-resistant fabric", "Padded shoulder straps", "Multiple compartments"],
    null, "WearWell"),

  p(22, "Aviator Sunglasses", "accessories", 999, 1999, 4.0, 921,
    [
      "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1508296695146-257a814070b4?w=800&q=80&auto=format",
    ],
    "Classic aviator sunglasses with polarized lenses and UV400 protection.",
    ["Polarized lenses", "UV400 protection", "Metal frame", "Includes protective case"],
    null, "WearWell"),

  p(23, "Everyday Leather Belt", "accessories", 649, 1199, 4.1, 1287,
    [
      "https://images.unsplash.com/photo-1624222247344-550fb60583dc?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1553143820-6bb68bc34679?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1620625515032-6ed0c1790c75?w=800&q=80&auto=format",
    ],
    "A genuine leather belt with a classic buckle — a versatile addition to any wardrobe.",
    ["Genuine leather", "Classic pin buckle", "Available in multiple sizes", "1 year warranty"],
    ["30", "32", "34", "36", "38"], "WearWell"),

  p(24, "Women's Cropped Denim Jacket", "women", 1999, 3499, 4.1, 1032,
    [
      "https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&q=80&auto=format",
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=800&q=80&auto=format",
    ],
    "A cropped denim jacket with a relaxed fit — layers perfectly over dresses or tees.",
    ["100% cotton denim", "Cropped fit", "Button-front closure", "Machine washable"],
    ["XS", "S", "M", "L", "XL"], "WearWell"),
];

export const getAllProducts = () => products;

export const getProductById = (id) =>
  products.find((prod) => String(prod.id) === String(id));

export const getProductsByCategory = (category) =>
  products.filter((prod) => prod.category === category);

export const getRelatedProducts = (product, limit = 4) =>
  products
    .filter((p2) => p2.category === product.category && p2.id !== product.id)
    .slice(0, limit);

export const CATEGORIES = [
  { key: "women", label: "Women" },
  { key: "men", label: "Men" },
  { key: "footwear", label: "Footwear" },
  { key: "electronics", label: "Electronics" },
  { key: "accessories", label: "Accessories" },
];

export default products;

export const mockProducts = [
    {
        _id: "fake-1",
        name: "Classic White Sneakers",
        brand: "Nike",
        price: "₹3,499",
        discount: "30% OFF",
        images: ["https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&auto=format&fit=crop"],
        category: "Men",
        description: "Premium white sneakers for everyday wear.",
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"]
    },
    {
        _id: "fake-2",
        name: "Blue Denim Jacket",
        brand: "Levis",
        price: "₹2,499",
        discount: "40% OFF",
        images: ["https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=500&auto=format&fit=crop"],
        category: "Men",
        description: "Classic denim jacket with a modern fit.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        _id: "fake-3",
        name: "Black Leather Jacket",
        brand: "Zara",
        price: "₹4,999",
        discount: "20% OFF",
        images: ["https://images.unsplash.com/photo-1551028919-ac66c5f8b9b9?w=500&auto=format&fit=crop"],
        category: "Men",
        description: "Stylish black leather jacket.",
        sizes: ["S", "M", "L", "XL"]
    },
    {
        _id: "fake-4",
        name: "Checkered Shirt",
        brand: "Roadster",
        price: "₹899",
        discount: "50% OFF",
        images: ["https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&auto=format&fit=crop"],
        category: "Men",
        description: "Casual checkered shirt within breathable fabric.",
        sizes: ["S", "M", "L", "XL", "XXL"]
    },
    {
        _id: "fake-5",
        name: "Slim Fit Chinos",
        brand: "H&M",
        price: "₹1,299",
        discount: "10% OFF",
        images: ["https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop"],
        category: "Men",
        description: "Comfortable slim fit chinos in beige.",
        sizes: ["28", "30", "32", "34", "36"]
    },
    {
        _id: "fake-6",
        name: "Running Shoes",
        brand: "Adidas",
        price: "₹3,999",
        discount: "25% OFF",
        images: ["https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500&auto=format&fit=crop"],
        category: "Men",
        description: "High-performance running shoes.",
        sizes: ["UK 6", "UK 7", "UK 8", "UK 9", "UK 10"]
    },
    {
        _id: "fake-7",
        name: "Aviator Sunglasses",
        brand: "Ray-Ban",
        price: "₹5,999",
        discount: "15% OFF",
        images: ["https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&auto=format&fit=crop"],
        category: "Men",
        description: "Classic aviator sunglasses.",
        sizes: ["One Size"]
    },

    // WOMEN
    {
        _id: "fake-8",
        name: "Floral Summer Dress",
        brand: "Forever 21",
        price: "₹1,499",
        discount: "35% OFF",
        images: ["https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&auto=format&fit=crop"],
        category: "Women",
        description: "Light and breezy floral dress.",
        sizes: ["XS", "S", "M", "L"]
    },
    {
        _id: "fake-9",
        name: "Red Stiletto Heels",
        brand: "Steve Madden",
        price: "₹3,299",
        discount: "45% OFF",
        images: ["https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=500&auto=format&fit=crop"],
        category: "Women",
        description: "Elegant red stilettos for parties.",
        sizes: ["UK 4", "UK 5", "UK 6", "UK 7"]
    },
    {
        _id: "fake-10",
        name: "Silk Scarf",
        brand: "Gucci",
        price: "₹12,499",
        discount: "5% OFF",
        images: ["https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?w=500&auto=format&fit=crop"],
        category: "Women",
        description: "Luxurious silk scarf.",
        sizes: ["One Size"]
    },
    {
        _id: "fake-11",
        name: "Leather Handbag",
        brand: "Michael Kors",
        price: "₹8,999",
        discount: "20% OFF",
        images: ["https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&auto=format&fit=crop"],
        category: "Women",
        description: "Classy leather handbag.",
        sizes: ["One Size"]
    },
    {
        _id: "fake-12",
        name: "Gold Plated Earrings",
        brand: "Swarovski",
        price: "₹4,499",
        discount: "10% OFF",
        images: ["https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&auto=format&fit=crop"],
        category: "Women",
        description: "Beautiful gold plated earrings.",
        sizes: ["One Size"]
    },
    {
        _id: "fake-13",
        name: "Crop Top",
        brand: "Zara",
        price: "₹799",
        discount: "30% OFF",
        images: ["https://images.unsplash.com/photo-1503342394128-c104d54dba01?w=500&auto=format&fit=crop"],
        category: "Women",
        description: "Trendy crop top.",
        sizes: ["XS", "S", "M", "L"]
    },
    {
        _id: "fake-14",
        name: "Skinny Jeans",
        brand: "Levis",
        price: "₹1,999",
        discount: "25% OFF",
        images: ["https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&auto=format&fit=crop"],
        category: "Women",
        description: "Classic skinny jeans.",
        sizes: ["26", "28", "30", "32"]
    },

    // KIDS
    {
        _id: "fake-15",
        name: "Cartoon T-Shirt",
        brand: "Disney",
        price: "₹499",
        discount: "15% OFF",
        images: ["https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=500&auto=format&fit=crop"],
        category: "Kids",
        description: "Fun cartoon print t-shirt.",
        sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"]
    },
    {
        _id: "fake-16",
        name: "Denim Overalls",
        brand: "Gap Kids",
        price: "₹1,199",
        discount: "20% OFF",
        images: ["https://images.unsplash.com/photo-1519238263496-61437aeb11ea?w=500&auto=format&fit=crop"],
        category: "Kids",
        description: "Cute denim overalls.",
        sizes: ["2-3Y", "4-5Y", "6-7Y"]
    },
    {
        _id: "fake-17",
        name: "Kids Sneakers",
        brand: "Puma",
        price: "₹1,599",
        discount: "30% OFF",
        images: ["https://images.unsplash.com/photo-1514989940723-e8875ea2d056?w=500&auto=format&fit=crop"],
        category: "Kids",
        description: "Comfortable sneakers for kids.",
        sizes: ["UK 10K", "UK 11K", "UK 12K", "UK 13K"]
    },
    {
        _id: "fake-18",
        name: "Party Frock",
        brand: "Mothercare",
        price: "₹2,299",
        discount: "10% OFF",
        images: ["https://images.unsplash.com/photo-1621452773781-0f992fd1f5cb?w=500&auto=format&fit=crop"],
        category: "Kids",
        description: "Lovely party frock for girls.",
        sizes: ["2-3Y", "4-5Y", "6-7Y"]
    },
    {
        _id: "fake-19",
        name: "School Bag",
        brand: "Skybags",
        price: "₹999",
        discount: "40% OFF",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop"],
        category: "Kids",
        description: "Durable school bag.",
        sizes: ["One Size"]
    },

    // BEAUTY
    {
        _id: "fake-20",
        name: "Matte Lipstick",
        brand: "MAC",
        price: "₹1,800",
        discount: "5% OFF",
        images: ["https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&auto=format&fit=crop"],
        category: "Beauty",
        description: "Long-lasting matte lipstick.",
        sizes: ["Standard"]
    },
    {
        _id: "fake-21",
        name: "Face Serum",
        brand: "L'Oreal",
        price: "₹799",
        discount: "15% OFF",
        images: ["https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&auto=format&fit=crop"],
        category: "Beauty",
        description: "Hydrating face serum.",
        sizes: ["30ml"]
    },
    {
        _id: "fake-22",
        name: "Perfume",
        brand: "Chanel",
        price: "₹8,500",
        discount: "10% OFF",
        images: ["https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&auto=format&fit=crop"],
        category: "Beauty",
        description: "Classic floral fragrance.",
        sizes: ["50ml", "100ml"]
    },
    {
        _id: "fake-23",
        name: "Eyeshadow Palette",
        brand: "Huda Beauty",
        price: "₹4,500",
        discount: "20% OFF",
        images: ["https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&auto=format&fit=crop"],
        category: "Beauty",
        description: "Vibrant eyeshadow palette.",
        sizes: ["Standard"]
    },
    {
        _id: "fake-24",
        name: "Hair Dryer",
        brand: "Philips",
        price: "₹1,299",
        discount: "25% OFF",
        images: ["https://images.unsplash.com/photo-1522338242992-e1a54906a8e6?w=500&auto=format&fit=crop"],
        category: "Beauty",
        description: "Powerful hair dryer.",
        sizes: ["Standard"]
    },

    // ELECTRONICS / GADGETS
    {
        _id: "fake-25",
        name: "Smart Watch",
        brand: "Apple",
        price: "₹29,900",
        discount: "5% OFF",
        images: ["https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop"],
        category: "Gadgets",
        description: "Latest Apple Watch.",
        sizes: ["40mm", "44mm"]
    },
    {
        _id: "fake-26",
        name: "Wireless Headphones",
        brand: "Sony",
        price: "₹14,990",
        discount: "15% OFF",
        images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&auto=format&fit=crop"],
        category: "Gadgets",
        description: "Noise cancelling headphones.",
        sizes: ["One Size"]
    },
    {
        _id: "fake-27",
        name: "Laptop Backpack",
        brand: "Samsonite",
        price: "₹3,500",
        discount: "30% OFF",
        images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&auto=format&fit=crop"],
        category: "Accessories",
        description: "Sturdy laptop backpack.",
        sizes: ["One Size"]
    },
    {
        _id: "fake-28",
        name: "Digital Camera",
        brand: "Canon",
        price: "₹45,000",
        discount: "10% OFF",
        images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500&auto=format&fit=crop"],
        category: "Gadgets",
        description: "DSLR camera for professionals.",
        sizes: ["Standard"]
    },
    {
        _id: "fake-29",
        name: "Gaming Mouse",
        brand: "Logitech",
        price: "₹2,500",
        discount: "20% OFF",
        images: ["https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&auto=format&fit=crop"],
        category: "Gadgets",
        description: "High precision gaming mouse.",
        sizes: ["Standard"]
    },
    {
        _id: "fake-30",
        name: "Fitness Band",
        brand: "Fitbit",
        price: "₹8,999",
        discount: "15% OFF",
        images: ["https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&auto=format&fit=crop"],
        category: "Gadgets",
        description: "Track your fitness daily.",
        sizes: ["Standard"]
    }
];

export const mockCategories = [
    {
        _id: "cat-1",
        name: "Men",
        image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=500&auto=format&fit=crop",
        subcategory: ["T-Shirts", "Shirts", "Jeans", "Trousers", "Suits", "Activewear"],
        productId: mockProducts.filter(p => p.category === "Men")
    },
    {
        _id: "cat-2",
        name: "Women",
        image: "https://images.unsplash.com/photo-1618244972963-dbad0c4abf18?w=500&auto=format&fit=crop",
        subcategory: ["Dresses", "Tops", "Ethnic Wear", "Western Wear", "Activewear"],
        productId: mockProducts.filter(p => p.category === "Women")
    },
    {
        _id: "cat-3",
        name: "Kids",
        image: "https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&auto=format&fit=crop",
        subcategory: ["Boys Clothing", "Girls Clothing", "Infants", "Toys", "School Essentials"],
        productId: mockProducts.filter(p => p.category === "Kids")
    },
    {
        _id: "cat-4",
        name: "Beauty",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500&auto=format&fit=crop",
        subcategory: ["Makeup", "Skincare", "Haircare", "Fragrances", "Personal Care"],
        productId: mockProducts.filter(p => p.category === "Beauty")
    },
    {
        _id: "cat-5",
        name: "Gadgets",
        image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop",
        subcategory: ["Smart Watches", "Headphones", "Cameras", "Accessories"],
        productId: mockProducts.filter(p => p.category === "Gadgets")
    },
    {
        _id: "cat-6",
        name: "Accessories",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop",
        subcategory: ["Watches", "Bags", "Jewellery", "Sunglasses", "Belts"],
        productId: mockProducts.filter(p => p.category === "Accessories")
    }
];

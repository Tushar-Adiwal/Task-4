 const products = [
      { id: 1, name: "Smartphone", category: "electronics", price: 130000, rating: 4.6, img: "assest/SmartPhone-2.jpg" },
      { id: 2, name: "Laptop", category: "electronics", price: 45000, rating: 4.8, img: "assest/Laptop-1.jpg" },
      { id: 3, name: "T-Shirt", category: "fashion", price: 500, rating: 4.2, img: "assest/T-shirt.jpg" },
      { id: 4, name: "Sofa", category: "home", price: 25000, rating: 4.7, img: "assest/Sofa.jpg" },
      { id: 5, name: "Shoes", category: "fashion", price: 1200, rating: 4.4, img: "assest/shoes.jpg" },
      { id: 6, name: "Mixer Grinder", category: "home", price: 3500, rating: 4.1, img: "assest/mixer-grinder.jpg" }
    ];

    function renderProducts(list) {
      const grid = document.getElementById("productGrid");
      grid.innerHTML = "";

      list.forEach(p => {
        const item = document.createElement("div");
        item.className = "product";
        item.innerHTML = `
          <img src="${p.img}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <p class="price">₹${p.price}</p>
          <p>Rating: ${p.rating}</p>
        `;
        grid.appendChild(item);
      });
    }

    function applyFilters() {
      let filtered = [...products];

      const category = document.getElementById("categoryFilter").value;
      const maxPrice = document.getElementById("priceFilter").value;
      const sort = document.getElementById("sortOption").value;

      if (category !== "all") {
        filtered = filtered.filter(p => p.category === category);
      }

      if (maxPrice) {
        filtered = filtered.filter(p => p.price <= Number(maxPrice));
      }

      if (sort === "price_low") filtered.sort((a,b) => a.price - b.price);
      if (sort === "price_high") filtered.sort((a,b) => b.price - a.price);
      if (sort === "rating_high") filtered.sort((a,b) => b.rating - a.rating);

      renderProducts(filtered);
    }

    renderProducts(products);
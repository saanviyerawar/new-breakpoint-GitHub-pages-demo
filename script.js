const menuItems = [
  { name: "Tomato Basil Soup", category: "starters", price: "$7", description: "Creamy soup with toasted sourdough." },
  { name: "Citrus Garden Salad", category: "starters", price: "$9", description: "Seasonal greens, orange segments, and vinaigrette." },
  { name: "Lemon Herb Chicken", category: "mains", price: "$18", description: "Roasted chicken with garlic potatoes." },
  { name: "Mushroom Truffle Pasta", category: "mains", price: "$17", description: "Tagliatelle with mushrooms and truffle cream." },
  { name: "Grilled Salmon Plate", category: "mains", price: "$21", description: "Salmon with quinoa and roasted vegetables." },
  { name: "Chocolate Lava Cake", category: "desserts", price: "$8", description: "Warm cake with vanilla bean ice cream." },
  { name: "Seasonal Fruit Tart", category: "desserts", price: "$7", description: "Butter crust tart with fresh fruit." },
  { name: "House Lemonade", category: "drinks", price: "$4", description: "Fresh squeezed lemon juice and mint." },
  { name: "Cold Brew Coffee", category: "drinks", price: "$5", description: "Slow-steeped coffee served over ice." }
];

const menuList = document.getElementById("menu-list");
const resultsCount = document.getElementById("results-count");
const searchInput = document.getElementById("menu-search");
const filterButtons = Array.from(document.querySelectorAll(".filter-button"));

let activeCategory = "all";

function createMenuCard(item) {
  const li = document.createElement("li");
  li.className = "menu-item";

  const header = document.createElement("div");
  header.className = "menu-item-header";

  const title = document.createElement("h3");
  title.textContent = item.name;

  const price = document.createElement("span");
  price.className = "price";
  price.textContent = item.price;

  header.append(title, price);

  const description = document.createElement("p");
  description.textContent = item.description;

  const category = document.createElement("p");
  category.className = "category";
  category.textContent = `${item.category.charAt(0).toUpperCase()}${item.category.slice(1)}`;

  li.append(header, description, category);

  return li;
}

function getFilteredItems() {
  const searchValue = searchInput.value.trim().toLowerCase();

  return menuItems.filter((item) => {
    const categoryMatch = activeCategory === "all" || item.category === activeCategory;
    const textMatch =
      item.name.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue);

    return categoryMatch && textMatch;
  });
}

function renderMenu() {
  const filteredItems = getFilteredItems();
  menuList.replaceChildren(...filteredItems.map(createMenuCard));
  resultsCount.textContent =
    filteredItems.length === 1 ? "1 item available." : `${filteredItems.length} items available.`;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeCategory = button.dataset.filter || "all";
    filterButtons.forEach((currentButton) => currentButton.classList.remove("is-active"));
    button.classList.add("is-active");
    renderMenu();
  });
});

searchInput.addEventListener("input", renderMenu);

renderMenu();

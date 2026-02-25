let categories = [];
let tools = [];
let currentCategory = "All";

const categoryList = document.getElementById("categoryList");
const toolGrid = document.getElementById("toolGrid");
const toolCount = document.getElementById("toolCount");
const searchInput = document.getElementById("searchInput");

/* Load JSON */
fetch("data.json")
    .then(res => res.json())
    .then(data => {
        categories = ["All", ...data.categories];
        tools = data.tools;
        renderCategories();
        renderTools();
    });

function renderCategories(){
    categoryList.innerHTML = "";
    categories.forEach(cat=>{
        const div = document.createElement("div");
        div.className = "category";
        if(cat === currentCategory) div.classList.add("active");
        div.innerText = cat;
        div.onclick = () => {
            currentCategory = cat;
            renderCategories();
            renderTools();
        };
        categoryList.appendChild(div);
    });
}

function renderTools(){
    toolGrid.innerHTML = "";

    let filtered = tools.filter(tool=>{
        const matchCategory = currentCategory === "All" || tool.category === currentCategory;
        const matchSearch = tool.name.toLowerCase().includes(searchInput.value.toLowerCase());
        return matchCategory && matchSearch;
    });

    filtered.forEach(tool=>{
        const card = document.createElement("div");
        card.className = "tool-card";
        card.onclick = () => window.open(tool.url, "_blank");

        card.innerHTML = `
            <div class="tool-icon">
                <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M12 7v5l3 2"></path>
                </svg>
            </div>
            <div class="tool-category">${tool.category.toUpperCase()}</div>
            <div class="tool-title">${tool.name}</div>
        `;
        toolGrid.appendChild(card);
    });

    toolCount.innerText = filtered.length + " tools available";
}

searchInput.addEventListener("input", renderTools);
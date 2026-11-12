function initBlogFeatures() {
  const postContent = document.querySelector(".post-content");
  const postHeader = document.querySelector(".post-header");

  if (postContent && postHeader) {
    const text = postContent.innerText || "";
    const words = text.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 200));

    const badge = document.createElement("span");
    badge.innerText = ` • ⏱️ ${minutes} min read (${words} words)`;
    badge.style.color = "#81c784";
    badge.style.fontSize = "0.9rem";
    badge.style.fontWeight = "bold";

    const meta = postHeader.querySelector(".post-meta");
    if (meta) {
      meta.appendChild(badge);
    } else {
      postHeader.appendChild(badge);
    }
  }

  const postList = document.querySelector(".post-list");

  if (postList) {
    const searchWrapper = document.createElement("div");
    searchWrapper.style.marginBottom = "24px";

    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.placeholder = "🔍 Search Bloxd.io posts, codes, or updates...";
    searchInput.style.width = "100%";
    searchInput.style.padding = "12px 16px";
    searchInput.style.backgroundColor = "#111314";
    searchInput.style.color = "#e8e6e3";
    searchInput.style.border = "2px solid #4CAF50";
    searchInput.style.borderRadius = "6px";
    searchInput.style.fontFamily = "inherit";
    searchInput.style.fontSize = "1rem";
    searchInput.style.boxSizing = "border-box";
    searchInput.style.outline = "none";

    const noResults = document.createElement("p");
    noResults.innerText = "No matching posts found.";
    noResults.style.display = "none";
    noResults.style.color = "#aaaaaa";
    noResults.style.marginTop = "12px";

    searchWrapper.appendChild(searchInput);
    searchWrapper.appendChild(noResults);

    const homeContainer = document.querySelector(".home") || postList.parentElement;
    homeContainer.insertBefore(searchWrapper, homeContainer.firstChild);

    const posts = Array.from(postList.querySelectorAll("li"));

    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      let visibleCount = 0;

      posts.forEach((post) => {
        const content = post.innerText.toLowerCase();
        if (content.includes(query)) {
          post.style.display = "";
          visibleCount++;
        } else {
          post.style.display = "none";
        }
      });

      noResults.style.display = visibleCount === 0 ? "block" : "none";
    });
  }
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBlogFeatures);
} else {
  initBlogFeatures();
}

document.getElementById("commentForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = {
      name: form.name.value,
      comment: form.comment.value
    };
  
    const res = await fetch("/.netlify/functions/submit-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  
    const result = await res.json();
    document.getElementById("statusMsg").textContent = result.message;
  });
  
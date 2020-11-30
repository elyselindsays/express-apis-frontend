console.log("Hello from index.js!");
document.addEventListener("DOMContentLoaded", async () => {
    try{

      const res = await fetch("http://localhost:8080/tweets", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            "TWITTER_LITE_ACCESS_TOKEN"
          )}`,}});

        const { tweets } = await res.json();

        if (res.status === 401) {
          window.location.href = "/log-in";
          return;
        }
        
        const tweetsContainer = document.querySelector("#tweets-container");
        const tweetsHtml = await tweets.map(
            ({ name }) => `
            <div class="card">
              <div class="card-body">
                <p class="card-text">${name}</p>
              </div>
            </div>
          `
          );
          tweetsContainer.innerHTML = tweetsHtml.join("");
    }catch(err) {
        console.error(err);
    }
});
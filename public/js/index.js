console.log("Hello from index.js!");
document.addEventListener("DOMContentLoaded", async () => {
    try{
        const res = await fetch("http://localhost:8080/tasks");
        const { tasks } = await res.json();

        const tasksContainer = document.querySelector("#tasks-container");
        const tasksHtml = await tasks.map(
            ({ name }) => `
            <div class="card">
              <div class="card-body">
                <p class="card-text">${name}</p>
              </div>
            </div>
          `
          );
          tasksContainer.innerHTML = tasksHtml.join("");
    }catch(err) {
        console.error(err);
    }
});
const signUpForm = document.querySelector(".sign-up-form");

signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(signUpForm);
    const email = formData.get("email");
    const password = formData.get("password");
    const username = formData.get("username");

    const body = { email, password, username };

    try {
        const res = await fetch("http://locahost:8080/users", {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json",
            }
        });
        if (!res.ok) {
            throw (res);
        }
        const { token, user: { id } } = await res.json();
            // storage access_token in localStorage:
        localStorage.setItem("TWITTER_LITE_ACCESS_TOKEN", token);
        localStorage.setItem("TWITTER_LITE_CURRENT_USER_ID", id);
            // redirect to home page to see all tweets:
        window.location.href = "/";
    } catch (err) {
        if (err.status >= 400 && err.status < 600) {
            const errorJSON = await err.json()
            const errorsContainer = document.querySelector(".errors-container")
            //TODO generate and render errors
            let errorsHtml = [
                `
                <div class="alert alert-danger">
                    Something went wrong. Please try again.
                </div>
                `,
            ];
            if (errors && Array.isArray(errors)) {
                errorsHtml = errors.map((message) => `
                    <div class="alert alert-danger">
                        ${message}
                    </div>
                    `
                );
            }
            errorsContainer.innerHTML = errorsHtml.join("");
        } else {
            //TODO
            alert(
                "Something went wrong. Please check your internet and try agian."
            );
        }
    }
});
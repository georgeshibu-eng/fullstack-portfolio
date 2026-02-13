<script>
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const responseBox = document.getElementById("response");

    if (!form) {
        console.error("contactForm not found");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const data = {
            name: document.getElementById("name").value.trim(),
            email: document.getElementById("email").value.trim(),
            message: document.getElementById("message").value.trim()
        };

        try {
            const response = await fetch("http://localhost:5000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error("Server error");
            }

            const result = await response.json();
            responseBox.innerText = result.message || "Message sent successfully!";
            form.reset();

        } catch (error) {
            console.error(error);
            responseBox.innerText = "Error sending message. Please try again.";
        }
    });
});
</script>

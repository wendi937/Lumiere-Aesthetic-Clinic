$(function(){
    $("#contactForm").on("submit", function(e){
        e.preventDefault();

        // collect and trim values
        const name = $("#name").val().trim();
        const email = $("#email").val().trim();
        const message = $("#message").val().trim();

        // simple validation
        if (!name || !email || !message) {
            $("#successMsg").text("Please fill in all fields.")
                .removeClass("text-success").addClass("text-danger").fadeIn(200);
            setTimeout(() => { $("#successMsg").fadeOut(300); }, 3000);
            return;
        }

        const entry = { name, email, message, time: new Date().toISOString() };

        try {
            const stored = JSON.parse(localStorage.getItem("lumiereMessages") || "[]");
            stored.push(entry);
            localStorage.setItem("lumiereMessages", JSON.stringify(stored));
        } catch (err) {
            console.error("Failed to save message:", err);
        }

        // show success and reset
        $("#successMsg").text("Thank you! Your message has been saved.")
            .removeClass("text-danger").addClass("text-success").fadeIn(250);

        $("#contactForm")[0].reset();

        setTimeout(() => { $("#successMsg").fadeOut(400); }, 3500);
    });
});

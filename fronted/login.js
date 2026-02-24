const form = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");
const successMessage = document.getElementById("successMessage");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    errorMessage.textContent = "";
    successMessage.textContent = "";

    // email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   
    // Contra
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

    if (!emailRegex.test(email)) {
        errorMessage.textContent = "El correo no es válido.";
        return;
    }

    if (!passwordRegex.test(password)) {
        errorMessage.textContent = 
        "La contraseña debe tener al menos: 1 mayúscula, 1 número y 1 carácter especial.";
        return;
    }

    try {
  const res = await fetch("http://localhost:4000/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();

  if (!res.ok) {
    errorMessage.textContent = data.message || "Error.";
    return;
  }

  successMessage.textContent = "Token listo.";
  console.log("JWT:", data.token);

  localStorage.setItem("token", data.token);

} catch (err) {
  errorMessage.textContent = "No se conectó el backend.";
}
});
export default {
    darkMode: "class",
    content: ["./index.html", "./src/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                ink: "#0c1222",
                mist: "#e7edf9",
                mint: "#86efac",
                cyan: "#67e8f9"
            },
            boxShadow: {
                panel: "0 10px 35px rgba(12, 18, 34, 0.12)"
            }
        }
    },
    plugins: []
};

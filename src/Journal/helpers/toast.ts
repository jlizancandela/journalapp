import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

export const toast = (message: string) => {
  Toastify({
    text: message,
    duration: 3000,
    newWindow: false,
    close: false,
    gravity: "bottom", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(to right, #1A237E,#311B92,#4527A0)",
      borderRadius: "5px",
      color: "white",
      textAlign: "center",
      fontWeight: "bold",
      boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)",
    },
  }).showToast();
};

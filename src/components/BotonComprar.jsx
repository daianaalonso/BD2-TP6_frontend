import { useState } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

BotonComprar.propTypes = {
  selectedProductos: PropTypes.array,
  selectedTarjeta: PropTypes.number,
};

export default function BotonComprar({ selectedProductos, selectedTarjeta }) {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCompra = async () => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(
        `http://localhost:8080/venta?idCliente=1&idTarjeta=${selectedTarjeta}`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(selectedProductos),
        }
      );

      if (response.ok) {
        const json = await response.json();
        setSuccessMessage(json.result);
        console.log("Compra exitosa");
      } else {
        const json = await response.json();
        setErrorMessage(json.error);
        console.error("Error en la compra.");
      }
    } catch (error) {
      console.error("Error en la solicitud POST:", error);
    }
  };

  const handleComprarClick = (e) => {
    e.preventDefault();
    fetchCompra();
  };

  return (
    <Stack spacing={2}>
      <Button variant="outlined" color="secondary" onClick={handleComprarClick}>
        Comprar
      </Button>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Stack>
  );
}

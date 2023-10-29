import { useState } from "react";
import PropTypes from "prop-types";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";

BotonMonto.propTypes = {
  selectedProductos: PropTypes.array,
  selectedTarjeta: PropTypes.number,
};

export default function BotonMonto({ selectedProductos, selectedTarjeta }) {
  const [errorMessage, setErrorMessage] = useState("");
  const [monto, setMonto] = useState(null);

  console.log(selectedProductos, selectedTarjeta);

  const fetchMonto = async () => {
    setErrorMessage("");
    setMonto(null);

    try {
      const response = await fetch(
        `http://localhost:8080/venta?productos=${selectedProductos.join(
          ","
        )}&idTarjeta=${selectedTarjeta}`
      );
      if (response.ok) {
        const json = await response.json();
        setMonto(json);
      } else {
        const json = await response.json();
        setErrorMessage(json.error);
      }
    } catch (error) {
      console.error("Error al calcular el monto.", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    fetchMonto();
  };

  return (
    <Stack spacing={2}>
      <Button variant="outlined" color="secondary" onClick={handleClick}>
        Monto Total
      </Button>
      {monto && (
        <Alert icon={false} severity="success">
          El monto total es ${monto}
        </Alert>
      )}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Stack>
  );
}

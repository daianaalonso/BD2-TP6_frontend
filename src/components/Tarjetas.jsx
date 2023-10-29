import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "@mui/material/Select";
import { Box, MenuItem, InputLabel, FormControl } from "@mui/material";

Tarjetas.propTypes = {
  selectedTarjeta: PropTypes.number,
  setSelectedTarjeta: PropTypes.func,
};

export default function Tarjetas({ selectedTarjeta, setSelectedTarjeta }) {
  const [tarjetas, setTarjetas] = useState([]);

  useEffect(() => {
    const fetchTarjeta = async () => {
      try {
        const response = await fetch("http://localhost:8080/cliente?id=1");
        if (response.ok) {
          const json = await response.json();
          setTarjetas(json);
        } else {
          console.error("Error al cargar las tarjetas del cliente");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchTarjeta();
  }, []);

  const handleTarjetaSelect = (idTarjeta) => {
    setSelectedTarjeta(parseInt(idTarjeta));
  };

  return (
    <Box sx={{ minWidth: 120, paddingY: 2 }}>
      <FormControl fullWidth>
        <InputLabel id="label-tarjetas" color="secondary">
          Tarjetas
        </InputLabel>
        <Select
          labelId="label-tarjetas"
          value={selectedTarjeta}
          label="Tarjetas"
          color="secondary"
          onChange={(e) => handleTarjetaSelect(e.target.value)}
        >
          <MenuItem value={0}>Seleccionar una tarjeta</MenuItem>
          {tarjetas.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              {t.nombre}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Alert,
  Box,
  Grid,
} from "@mui/material";

export default function EditarProducto() {
  const { id } = useParams();
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [formData, setFormData] = useState({
    descripcion: "",
    codigo: "",
    precio: 0,
    marca: "",
    idCategoria: 0,
    version: 0,
  });

  useEffect(() => {
    fetch(`http://localhost:8080/producto/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          descripcion: data.descripcion ? data.descripcion : "",
          codigo: data.codigo ? data.codigo : "",
          precio: data.precio ? data.precio : 0,
          marca: data.marca ? data.marca : "",
          idCategoria: data.idCategoria ? data.idCategoria : 0,
          version: data.version ? data.version : 0,
        });
      })
      .catch((error) => console.error("Error al obtener el producto:", error));

    fetch("http://localhost:8080/categorias")
      .then((response) => response.json())
      .then((data) => setCategorias(data))
      .catch((error) =>
        console.error("Error al obtener las categorias:", error)
      );
  }, [id]);

  function handleChange(e) {
    const inputName = e.target.name;
    const inputValue = e.target.value;

    setFormData((formData) => ({
      ...formData,
      [inputName]: inputValue,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:8080/producto/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            setSuccessMessage(data.result);
          });
        } else {
          return response.json().then((data) => {
            setErrorMessage(data.error);
          });
        }
      })
      .catch((error) => {
        setErrorMessage("Error al modificar: " + error.message);
      });
  }

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ paddingTop: 4 }}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        <TextField
          id="codigo"
          name="codigo"
          label="Código"
          value={formData.codigo}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          id="descripcion"
          name="descripcion"
          label="Descripción"
          value={formData.descripcion}
          onChange={handleChange}
        />
        <TextField
          id="precio"
          name="precio"
          label="Precio"
          type="number"
          value={formData.precio}
          onChange={handleChange}
        />
        <TextField
          id="marca"
          name="marca"
          label="Marca"
          value={formData.marca}
          onChange={handleChange}
        />
        <FormControl>
          <InputLabel id="idCategoria">Categoria</InputLabel>
          <Select
            labelId="idCategoria"
            id="idCategoria"
            name="idCategoria"
            label="Categoria"
            value={formData.idCategoria}
            onChange={handleChange}
          >
            <MenuItem value={0}>Seleccionar categoria</MenuItem>
            {categorias.map((c) => (
              <MenuItem key={c.id} value={c.id}>
                {c.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Grid container spacing={2} sx={{ marginY: 1 }}>
        <Grid item xs={6}>
          <NavLink to="/">
            <Button variant="outlined" color="secondary" fullWidth>
              Volver
            </Button>
          </NavLink>
        </Grid>
        <Grid item xs={6}>
          <Button variant="outlined" type="submit" color="secondary" fullWidth>
            Guardar
          </Button>
        </Grid>
      </Grid>
      {successMessage && <Alert severity="success">{successMessage}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Box>
  );
}

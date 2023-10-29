import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import EditIcon from "@mui/icons-material/Edit";
import { NavLink } from "react-router-dom";
import { Container } from "@mui/material";

Productos.propTypes = {
  selectedProductos: PropTypes.array,
  setSelectedProductos: PropTypes.func,
};

export default function Productos({ selectedProductos, setSelectedProductos }) {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await fetch("http://localhost:8080/producto");
        if (response.ok) {
          const json = await response.json();
          setProductos(json);
        } else {
          console.error("Error al cargar los productos");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchProducto();
  }, []);

  const handleProductoSelect = (idProducto) => {
    if (selectedProductos.includes(idProducto)) {
      setSelectedProductos(selectedProductos.filter((id) => id !== idProducto));
    } else {
      setSelectedProductos([...selectedProductos, idProducto]);
    }
  };

  return (
    <Container sx={{ paddingY: 1 }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={6}
                sx={{ backgroundColor: "#f3e5f5" }}
              >
                Productos
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Editar</TableCell>
              <TableCell align="center">Código</TableCell>
              <TableCell align="center">Descripción</TableCell>
              <TableCell align="center">Marca</TableCell>
              <TableCell align="center">Precio</TableCell>
              <TableCell align="right">Agregar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productos.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  <NavLink to={`/producto/${p.id}`}>
                    <EditIcon />
                  </NavLink>
                </TableCell>
                <TableCell align="center">{p.codigo}</TableCell>
                <TableCell align="center">{p.descripcion}</TableCell>
                <TableCell align="center">{p.marca.nombre}</TableCell>
                <TableCell align="center">{p.precio}</TableCell>
                <TableCell align="right">
                  <Checkbox
                    value={p.id}
                    color="secondary"
                    checked={selectedProductos.includes(p.id)}
                    onChange={() => handleProductoSelect(p.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

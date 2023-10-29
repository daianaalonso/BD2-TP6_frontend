import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

export default function UltimasVentas() {
  const [ventas, setVentas] = useState([]);

  const formatFecha = (fechaArray) => {
    const date = new Date(
      fechaArray[0],
      fechaArray[1] - 1,
      fechaArray[2],
      fechaArray[3],
      fechaArray[4],
      fechaArray[5]
    );
    return date.toLocaleString();
  };

  useEffect(() => {
    const fetchVentas = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/venta/compras?id=1"
        );
        if (response.ok) {
          const json = await response.json();
          setVentas(json);
        } else {
          console.error("Error al cargar las ultimas ventas del cliente");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchVentas();
  }, []);

  return (
    <Container sx={{ padding: 1 }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={3}
                sx={{ backgroundColor: "#f3e5f5" }}
              >
                Mis compras
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Código</TableCell>
              <TableCell align="center">Fecha</TableCell>
              <TableCell align="center">Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ventas.map((v) => (
              <TableRow key={v.id}>
                <TableCell align="center">{v.codigo}</TableCell>
                <TableCell align="center">{formatFecha(v.fecha)}</TableCell>
                <TableCell align="center">${v.montoTotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

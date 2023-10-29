import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Container } from "@mui/material";

export default function Descuentos() {
  const [descuentos, setDescuentos] = useState([]);

  useEffect(() => {
    const fetchDescuentos = async () => {
      try {
        const response = await fetch("http://localhost:8080/promocion");
        if (response.ok) {
          const json = await response.json();
          setDescuentos(json);
        } else {
          console.error("Error al cargar las promociones");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchDescuentos();
  }, []);

  return (
    <Container sx={{ paddingY: 1 }}>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="center"
                colSpan={3}
                sx={{ backgroundColor: "#f3e5f5" }}
              >
                Promociones
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center">Inicia</TableCell>
              <TableCell align="center">Finaliza</TableCell>
              <TableCell align="center">Tipo de descuento</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {descuentos.map((d) => (
              <TableRow key={d.id}>
                <TableCell align="center">{d.fechaInicio}</TableCell>
                <TableCell align="center">{d.fechaFin}</TableCell>
                <TableCell align="center">
                  {d.descripcion} - {d.porcentaje * 100}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

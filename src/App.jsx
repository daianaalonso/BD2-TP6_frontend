import { Route, Routes } from "react-router-dom";
import Descuentos from "./components/Descuentos";
import Productos from "./components/Productos";
import Tarjetas from "./components/Tarjetas";
import BotonComprar from "./components/BotonComprar";
import BotonMonto from "./components/BotonMonto";
import { useState } from "react";
import EditarProducto from "./components/EditarProducto";
import UltimasVentas from "./components/UltimasVentas";
import Navbar from "./components/Navbar";
import { Container, Grid } from "@mui/material";

function App() {
  const [selectedProductos, setSelectedProductos] = useState([]);
  const [selectedTarjeta, setSelectedTarjeta] = useState(0);

  return (
    <>
      <Navbar />
      <Container>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Descuentos />
                <Productos
                  selectedProductos={selectedProductos}
                  setSelectedProductos={setSelectedProductos}
                />
                <Tarjetas
                  selectedTarjeta={selectedTarjeta}
                  setSelectedTarjeta={setSelectedTarjeta}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <BotonMonto
                      selectedProductos={selectedProductos}
                      selectedTarjeta={selectedTarjeta}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <BotonComprar
                      selectedProductos={selectedProductos}
                      selectedTarjeta={selectedTarjeta}
                    />
                  </Grid>
                </Grid>
              </>
            }
          />
          <Route path="/producto/:id" element={<EditarProducto />} />
          <Route path="/venta/:id" element={<UltimasVentas />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

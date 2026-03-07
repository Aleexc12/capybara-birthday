import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Hub from "./pages/Hub";
import Memories from "./pages/Memories";
import NotFound from "./pages/NotFound";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/hub" element={<Hub />} />
      <Route path="/memories" element={<Memories />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;

import { Routes, Route } from "react-router-dom";
import { AppShell } from "./components/layout/AppShell";
import TimelinePage from "./pages/TimelinePage";
import NewEntryPage from "./pages/NewEntryPage";
import EntryDetailPage from "./pages/EntryDetailPage";
import CalendarPage from "./pages/CalendarPage";

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<TimelinePage />} />
        <Route path="/new" element={<NewEntryPage />} />
        <Route path="/entries/:id" element={<EntryDetailPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Route>
    </Routes>
  );
}

export default App;

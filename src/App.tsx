import { useState } from "react";
import { ThemeProvider } from "@/themes/themeContext";
import { TabBar } from "@/showcase/TabBar";
import { ThemeSelector } from "@/showcase/ThemeSelector";
import { DataDisplayPage } from "@/showcase/pages/DataDisplayPage";
import { FormControlsPage } from "@/showcase/pages/FormControlsPage";
import { NavigationPage } from "@/showcase/pages/NavigationPage";
import { CardsPanelsPage } from "@/showcase/pages/CardsPanelsPage";
import { ChartsVizPage } from "@/showcase/pages/ChartsVizPage";
import { InteractivePage } from "@/showcase/pages/InteractivePage";
import { FeedbackPage } from "@/showcase/pages/FeedbackPage";
import { AnimationsPage } from "@/showcase/pages/AnimationsPage";
import "@/themes/themes.css";
import "./App.css";

const TABS = [
  { id: "data-display",   label: "Data Display" },
  { id: "form-controls",  label: "Form Controls" },
  { id: "navigation",     label: "Navigation" },
  { id: "cards-panels",   label: "Cards & Panels" },
  { id: "charts-viz",     label: "Charts & Viz" },
  { id: "interactive",    label: "Interactive" },
  { id: "feedback",       label: "Feedback" },
  { id: "animations",     label: "Animations" },
];

function App() {
  const [activeTab, setActiveTab] = useState("data-display");

  return (
    <ThemeProvider>
      <div className="app">
        <header className="app-header">
          <TabBar tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />
          <ThemeSelector />
        </header>
        <main className="app-content">
          {activeTab === "data-display"  && <DataDisplayPage />}
          {activeTab === "form-controls" && <FormControlsPage />}
          {activeTab === "navigation"    && <NavigationPage />}
          {activeTab === "cards-panels"  && <CardsPanelsPage />}
          {activeTab === "charts-viz"    && <ChartsVizPage />}
          {activeTab === "interactive"   && <InteractivePage />}
          {activeTab === "feedback"      && <FeedbackPage />}
          {activeTab === "animations"    && <AnimationsPage />}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;

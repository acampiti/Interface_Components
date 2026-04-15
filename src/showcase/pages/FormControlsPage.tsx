import { useState } from "react";
import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import { RadioButtonGroup } from "@/components/form-controls/RadioButtonGroup";
import { CheckboxFilter } from "@/components/form-controls/CheckboxFilter";
import { CheckboxSelection } from "@/components/form-controls/CheckboxSelection";
import { TagChipInput } from "@/components/form-controls/TagChipInput";
import { SearchInput } from "@/components/form-controls/SearchInput";
import { DropdownSelect } from "@/components/form-controls/DropdownSelect";
import { RangeSlider } from "@/components/form-controls/RangeSlider";
import { ToggleSwitch } from "@/components/form-controls/ToggleSwitch";
import { NumberStepper } from "@/components/form-controls/NumberStepper";
import { Textarea } from "@/components/form-controls/Textarea";
import { FileDropZone } from "@/components/form-controls/FileDropZone";
import { RichTextEditor } from "@/components/form-controls/RichTextEditor";
import { CHECKBOX_ITEMS } from "@/data/testData";

// ── Test data ──────────────────────────────────────────

const RADIO_OPTIONS = [
  { label: "Auto", value: "auto" },
  { label: "2.4 GHz", value: "2.4", info: true },
  { label: "5 GHz", value: "5", info: true },
  { label: "6 GHz", value: "6", info: true },
  { label: "Off", value: "off" },
];

const FILTER_ITEMS = [
  { label: "Switch", count: 4 },
  { label: "Access Point", count: 5 },
  { label: "Gateway", count: 2 },
  { label: "Camera", count: 8 },
  { label: "Doorbell", count: 1 },
  { label: "Smart Plug", count: 3 },
  { label: "Sensor", count: 6 },
];

const DROPDOWN_OPTIONS = [
  { label: "All Networks", value: "all" },
  { label: "Default (LAN)", value: "default" },
  { label: "IoT Devices", value: "iot" },
  { label: "Guest Network", value: "guest" },
  { label: "Management", value: "mgmt" },
  { label: "DMZ", value: "dmz" },
];

const SLIDER_LABELS = ["Low", "Med-Low", "Medium", "Med-High", "High"];

export function FormControlsPage() {
  // Radio state
  const [radioValue, setRadioValue] = useState("auto");

  // Checkbox filter state
  const [filterSelected, setFilterSelected] = useState<Set<string>>(
    new Set(["Switch", "Access Point"])
  );

  // Checkbox selection state (use first 12 CHECKBOX_ITEMS for grid)
  const gridItems = CHECKBOX_ITEMS.slice(0, 12);
  const [gridSelected, setGridSelected] = useState<Set<string>>(
    new Set(["Apple AirPlay", "Google Cast", "HomeKit", "Sonos"])
  );

  // Search state
  const [searchValue, setSearchValue] = useState("");

  // Dropdown state
  const [dropdownValue, setDropdownValue] = useState("default");

  // Range slider state
  const [sliderValue, setSliderValue] = useState(2);

  // Toggle states
  const [toggle1, setToggle1] = useState(true);
  const [toggle2, setToggle2] = useState(false);
  const [toggle3, setToggle3] = useState(true);

  // Number stepper state
  const [stepperValue, setStepperValue] = useState(5);

  // Textarea state
  const [textareaValue, setTextareaValue] = useState("Sample notes about this network configuration...");

  return (
    <ShowcasePage
      title="Form Controls"
      description="Radio buttons, checkboxes, inputs, dropdowns, sliders, and tag chips."
    >
      <ShowcaseGroup
        title="Radio Button Group"
        componentName="RadioButtonGroup"
        description="Horizontal radio buttons with custom circle indicators. Supports info icon per option."
      >
        <RadioButtonGroup
          options={RADIO_OPTIONS}
          value={radioValue}
          onChange={setRadioValue}
        />
        <p style={{ margin: "12px 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
          Selected: <strong style={{ color: "var(--color-text-primary)" }}>{radioValue}</strong>
        </p>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Checkbox Filter"
        componentName="CheckboxFilter"
        description="Square checkboxes with count badges on the right. Useful for filtering lists."
      >
        <div style={{ maxWidth: 280 }}>
          <CheckboxFilter
            items={FILTER_ITEMS}
            selected={filterSelected}
            onChange={setFilterSelected}
          />
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
          Selected: <strong style={{ color: "var(--color-text-primary)" }}>{Array.from(filterSelected).join(", ") || "none"}</strong>
        </p>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Checkbox Selection Grid"
        componentName="CheckboxSelection"
        description="Blue-filled checkboxes in a grid layout. Each item toggles independently."
      >
        <CheckboxSelection
          items={gridItems}
          selected={gridSelected}
          onChange={setGridSelected}
        />
        <p style={{ margin: "12px 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
          {gridSelected.size} of {gridItems.length} selected
        </p>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Tag Chip Input"
        componentName="TagChipInput"
        description="Type text and press Enter to create tags. Click X to remove. Backspace removes the last tag."
      >
        <div style={{ maxWidth: 420 }}>
          <TagChipInput initialTags={["VLAN 10", "IoT", "Guest", "Management"]} />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Search Input"
        componentName="SearchInput"
        description="Search field with magnifying glass icon and clear button."
      >
        <div style={{ maxWidth: 320 }}>
          <SearchInput
            value={searchValue}
            onChange={setSearchValue}
            placeholder="Search devices..."
          />
        </div>
        {searchValue && (
          <p style={{ margin: "8px 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
            Searching for: <strong style={{ color: "var(--color-text-primary)" }}>{searchValue}</strong>
          </p>
        )}
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Dropdown Select"
        componentName="DropdownSelect"
        description="Custom dropdown with click-outside-to-close behavior. Arrow indicator rotates on open."
      >
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <DropdownSelect
            options={DROPDOWN_OPTIONS}
            value={dropdownValue}
            onChange={setDropdownValue}
          />
        </div>
        <p style={{ margin: "12px 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
          Selected: <strong style={{ color: "var(--color-text-primary)" }}>{DROPDOWN_OPTIONS.find((o) => o.value === dropdownValue)?.label}</strong>
        </p>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Range Slider"
        componentName="RangeSlider"
        description="Discrete range slider with labeled stops, custom track, and snap-to-step behavior."
      >
        <div style={{ maxWidth: 400 }}>
          <RangeSlider
            min={0}
            max={4}
            step={1}
            value={sliderValue}
            onChange={setSliderValue}
            labels={SLIDER_LABELS}
          />
        </div>
        <p style={{ margin: "4px 0 0", fontSize: 12, color: "var(--color-text-muted)" }}>
          Value: <strong style={{ color: "var(--color-text-primary)" }}>{sliderValue} ({SLIDER_LABELS[sliderValue]})</strong>
        </p>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Toggle Switch"
        componentName="ToggleSwitch"
        description="On/off toggle switches for binary settings."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <ToggleSwitch checked={toggle1} onChange={setToggle1} label="Enable mDNS Reflector" />
          <ToggleSwitch checked={toggle2} onChange={setToggle2} label="Block LAN to WLAN" />
          <ToggleSwitch checked={toggle3} onChange={setToggle3} label="Auto-optimize Network" />
          <ToggleSwitch checked={false} onChange={() => {}} label="Disabled toggle" disabled />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Number Stepper"
        componentName="NumberStepper"
        description="Increment/decrement number input with min/max boundaries."
      >
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
          <NumberStepper value={stepperValue} onChange={setStepperValue} min={1} max={24} label="Port Count" />
          <NumberStepper value={1} onChange={() => {}} min={1} max={10} step={1} label="VLAN Priority" />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Textarea"
        componentName="Textarea"
        description="Multi-line text input with optional character counter."
      >
        <div style={{ maxWidth: 420 }}>
          <Textarea
            value={textareaValue}
            onChange={setTextareaValue}
            placeholder="Enter configuration notes..."
            maxLength={500}
            rows={4}
          />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="File Drop Zone"
        componentName="FileDropZone"
        description="Drag-and-drop file upload area with click-to-browse fallback."
      >
        <FileDropZone
          accept=".json,.csv,.conf"
          label="Drop config files here or click to browse"
          onFiles={(files) => alert(`Selected: ${files.map(f => f.name).join(", ")}`)}
        />
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Rich Text Editor"
        componentName="RichTextEditor"
        description="WYSIWYG text editor with formatting toolbar — bold, italic, fonts, colors, lists, alignment, and more."
      >
        <RichTextEditor
          placeholder="Type your notes here — select text and use the toolbar to format..."
          initialHTML="<p><b>Network Change Log</b></p><p>Updated VLAN 10 to include IoT subnet. Enabled <i>mDNS reflector</i> across all VLANs for device discovery.</p><p>TODO: Review firewall rules for guest network isolation.</p>"
        />
      </ShowcaseGroup>
    </ShowcasePage>
  );
}

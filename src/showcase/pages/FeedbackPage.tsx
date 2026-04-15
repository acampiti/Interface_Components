import { useState } from "react";
import { ShowcasePage, ShowcaseGroup } from "../ShowcasePage";
import { Toast } from "@/components/feedback/Toast";
import { Modal } from "@/components/feedback/Modal";
import { Spinner } from "@/components/feedback/Spinner";
import { SkeletonLoader } from "@/components/feedback/SkeletonLoader";
import { EmptyState } from "@/components/feedback/EmptyState";
import { ProgressSteps } from "@/components/feedback/ProgressSteps";

export function FeedbackPage() {
  const [toastInfo, setToastInfo] = useState(true);
  const [toastSuccess, setToastSuccess] = useState(true);
  const [toastWarning, setToastWarning] = useState(true);
  const [toastError, setToastError] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(2);

  const resetToasts = () => {
    setToastInfo(true);
    setToastSuccess(true);
    setToastWarning(true);
    setToastError(true);
  };

  return (
    <ShowcasePage
      title="Feedback"
      description="Toasts, modals, spinners, skeleton loaders, empty states, and progress indicators."
    >
      <ShowcaseGroup
        title="Toast / Snackbar"
        componentName="Toast"
        description="Transient notification bars with variant colors and dismiss action."
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Toast message="Network settings saved successfully." variant="success" visible={toastSuccess} onClose={() => setToastSuccess(false)} />
          <Toast message="mDNS reflector is now active on all VLANs." variant="info" visible={toastInfo} onClose={() => setToastInfo(false)} />
          <Toast message="Firmware update requires a reboot within 24 hours." variant="warning" visible={toastWarning} onClose={() => setToastWarning(false)} />
          <Toast message="Failed to connect to WAN. Check cable." variant="error" visible={toastError} onClose={() => setToastError(false)} />
        </div>
        {(!toastInfo || !toastSuccess || !toastWarning || !toastError) && (
          <button
            onClick={resetToasts}
            style={{
              marginTop: 12,
              padding: "6px 16px",
              fontSize: 12,
              background: "var(--color-bg-tertiary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-text-primary)",
              cursor: "pointer",
            }}
          >
            Reset All Toasts
          </button>
        )}
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Modal / Dialog"
        componentName="Modal"
        description="Overlay dialog box with header, body, and action buttons."
      >
        <button
          onClick={() => setModalOpen(true)}
          style={{
            padding: "8px 20px",
            fontSize: 13,
            background: "var(--color-accent)",
            border: "none",
            borderRadius: "var(--radius-sm)",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Open Modal
        </button>
        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Confirm Restart"
          actions={
            <>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  padding: "6px 16px",
                  fontSize: 12,
                  background: "var(--color-bg-tertiary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  color: "var(--color-text-primary)",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => setModalOpen(false)}
                style={{
                  padding: "6px 16px",
                  fontSize: 12,
                  background: "var(--color-accent)",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Restart Now
              </button>
            </>
          }
        >
          <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-secondary)" }}>
            Are you sure you want to restart the UDM Pro Max? All clients will be temporarily disconnected.
            This typically takes 2–3 minutes.
          </p>
        </Modal>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Spinner / Loading"
        componentName="Spinner"
        description="Animated loading indicators in multiple sizes."
      >
        <div style={{ display: "flex", gap: 40, alignItems: "flex-end", flexWrap: "wrap" }}>
          <Spinner size="sm" />
          <Spinner size="md" label="Loading..." />
          <Spinner size="lg" label="Fetching devices" />
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Skeleton Loader"
        componentName="SkeletonLoader"
        description="Animated placeholder shapes for loading content."
      >
        <div style={{ display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-start" }}>
          <div style={{ flex: "1 1 200px", maxWidth: 300 }}>
            <div style={{ marginBottom: 8, fontSize: 11, color: "var(--color-text-muted)" }}>Text lines</div>
            <SkeletonLoader variant="text" lines={4} />
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div>
              <div style={{ marginBottom: 8, fontSize: 11, color: "var(--color-text-muted)" }}>Circle</div>
              <SkeletonLoader variant="circle" width={48} height={48} />
            </div>
            <div>
              <div style={{ marginBottom: 8, fontSize: 11, color: "var(--color-text-muted)" }}>Rectangle</div>
              <SkeletonLoader variant="rect" width={160} height={80} />
            </div>
          </div>
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Empty State"
        componentName="EmptyState"
        description="Placeholder for areas with no content."
      >
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 240px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
            <EmptyState
              title="No Devices Found"
              description="Connect a device to your network or adopt one from the discovery list."
              action={{ label: "Discover Devices", onClick: () => alert("Discovering...") }}
            />
          </div>
          <div style={{ flex: "1 1 240px", border: "1px solid var(--color-border)", borderRadius: "var(--radius-md)" }}>
            <EmptyState
              icon="📊"
              title="No Data Yet"
              description="Statistics will appear here once traffic is detected."
            />
          </div>
        </div>
      </ShowcaseGroup>

      <ShowcaseGroup
        title="Progress Steps"
        componentName="ProgressSteps"
        description="Horizontal multi-step progress indicator with completed/current/future states."
      >
        <div style={{ maxWidth: 500 }}>
          <ProgressSteps
            steps={["Connect", "Configure", "Adopt", "Verify", "Complete"]}
            currentStep={currentStep}
          />
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
          <button
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            style={{
              padding: "4px 12px",
              fontSize: 12,
              background: "var(--color-bg-tertiary)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-sm)",
              color: "var(--color-text-primary)",
              cursor: currentStep === 0 ? "default" : "pointer",
              opacity: currentStep === 0 ? 0.4 : 1,
            }}
          >
            Back
          </button>
          <button
            onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
            disabled={currentStep === 4}
            style={{
              padding: "4px 12px",
              fontSize: 12,
              background: "var(--color-accent)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              color: "#fff",
              cursor: currentStep === 4 ? "default" : "pointer",
              opacity: currentStep === 4 ? 0.4 : 1,
            }}
          >
            Next
          </button>
        </div>
      </ShowcaseGroup>
    </ShowcasePage>
  );
}

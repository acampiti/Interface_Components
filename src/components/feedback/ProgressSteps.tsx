import "./ProgressSteps.css";

interface ProgressStepsProps {
  steps: string[];
  currentStep: number;
}

export function ProgressSteps({ steps, currentStep }: ProgressStepsProps) {
  return (
    <div className="progress-steps">
      {steps.map((label, i) => {
        const isCompleted = i < currentStep;
        const isCurrent = i === currentStep;
        const isLast = i === steps.length - 1;

        return (
          <div className="progress-steps__segment" key={i} style={isLast ? { flex: "0 0 auto" } : undefined}>
            <div className="progress-steps__step">
              <div
                className={[
                  "progress-steps__circle",
                  isCompleted && "progress-steps__circle--completed",
                  isCurrent && "progress-steps__circle--current",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {isCompleted && <span className="progress-steps__checkmark">✓</span>}
                {isCurrent && <span className="progress-steps__dot" />}
              </div>
              <span
                className={[
                  "progress-steps__label",
                  (isCompleted || isCurrent) && "progress-steps__label--active",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {label}
              </span>
            </div>
            {!isLast && (
              <div
                className={[
                  "progress-steps__line",
                  isCompleted && "progress-steps__line--completed",
                ]
                  .filter(Boolean)
                  .join(" ")}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

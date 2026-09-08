"use client";

type MobileStepFooterProps = {
  className: string;
  currentStep: number;
  onNext: () => void;
  onPrevious: () => void;
  onSubmit: () => void;
};

/** Mobile has its own compact step navigation instead of reflowing the desktop footer. */
export default function MobileStepFooter({ className, currentStep, onNext, onPrevious, onSubmit }: MobileStepFooterProps) {
  const isLastStep = currentStep === 3;

  return (
    <footer className={className} aria-label="모바일 단계 이동">
      <div>
        {currentStep > 1 ? <button type="button" onClick={onPrevious}><span aria-hidden="true">←</span> 이전</button> : <span className="mobileStepStart">행사 설정</span>}
        <strong>{currentStep} / 3</strong>
        <button className={`mobileStepPrimary ${isLastStep ? "mobileStepSubmit" : ""}`} type="button" onClick={isLastStep ? onSubmit : onNext}>{isLastStep ? "플랜 만들기" : "다음"}<span aria-hidden="true">→</span></button>
      </div>
    </footer>
  );
}

export interface PoolCreateStepsProps {
  steps: number;
  currentStep: number;
  onStepClick?: (index: number) => void;
}

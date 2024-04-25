export interface IncineratorTableRowProps {
  index: number;
  coin: string;
  isChecked: boolean;
  qtyAvailable: number | null;
  qtyToIncinerate: number | null;
  denyEdition: (index: number) => void;
  approveEdition: (index: number) => void;
}

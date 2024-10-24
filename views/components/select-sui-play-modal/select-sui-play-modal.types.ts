export interface SuiPlayModalItemProps {
  image: string;
  holders: number;
  updatedAt: number;
  selected: boolean;
  onClick: () => void;
  tier: 'The Exalted' | 'The Mythics' | 'All';
}

export interface SelectSuiPlayModalProps {
  closeModal: () => void;
  onSelect: (tier: 'The Exalted' | 'The Mythics' | 'All') => void;
}

export interface SelectSuiPlayModalBodyProps {
  handleSelectTier: (tier: 'The Exalted' | 'The Mythics' | 'All') => void;
}

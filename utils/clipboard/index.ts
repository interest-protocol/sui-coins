import toast from 'react-hot-toast';

export const copyToClipboard = (content: string, successMessage?: string) => {
  window.navigator.clipboard.writeText(content || '');
  toast(successMessage || 'Copied to clipboard');
};

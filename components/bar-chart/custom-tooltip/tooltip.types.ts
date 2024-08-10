interface PayloadProps {
  description: string;
}

export interface CustomTooltipProps {
  payload?: Array<{
    value: number;
    dataKey: string;
    day: string;
    payload?: PayloadProps;
  }>;
}

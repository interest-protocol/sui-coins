export interface TableWrapperProps extends TableWrapperHeaderProps {
  title: string;
}

export interface TableWrapperHeaderProps {
  options: ReadonlyArray<string>;
}

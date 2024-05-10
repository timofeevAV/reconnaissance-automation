export interface TripsContextMenuProps {
  selectMode: boolean;
  popoverOpen: boolean;
  setSelectMode: React.Dispatch<React.SetStateAction<boolean>>;
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
}

import { AlertCircle } from "@tamagui/lucide-icons";
import { Text, Tooltip } from "tamagui";
import { BaseTooltipProps } from "../base-tooltip-props";

export const DefaultTooltip = ({ text, ...props }: BaseTooltipProps) => {
  return (
    <Tooltip {...props}>
      <Tooltip.Trigger>
        <AlertCircle />
      </Tooltip.Trigger>
      <Tooltip.Content>
        <Tooltip.Arrow />
        <Text>{text}</Text>
      </Tooltip.Content>
    </Tooltip>
  );
};

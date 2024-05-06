import { AlertCircle } from "@tamagui/lucide-icons";
import { Text, Theme, Tooltip } from "tamagui";
import { BaseTooltipProps } from "../base-tooltip-props";

export const ErrorTooltip = ({ text, ...props }: BaseTooltipProps) => {
  return (
    <Theme name={"red"}>
      <Tooltip {...props}>
        <Tooltip.Trigger>
          <AlertCircle />
        </Tooltip.Trigger>
        <Tooltip.Content>
          <Tooltip.Arrow />
          <Text>{text}</Text>
        </Tooltip.Content>
      </Tooltip>
    </Theme>
  );
};

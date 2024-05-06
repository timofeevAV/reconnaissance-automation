import { config } from "@tamagui/config/v3";
import { createFont, createTamagui } from "tamagui";

const involve = {
  normal: { normal: "Involve-Regular", italic: "Involve-Oblique" },
  bold: { normal: "Involve-Bold", italic: "Involve-BoldOblique" },
  400: { normal: "Involve-Regular", italic: "Involve-Oblique" },
  500: { normal: "Involve-Medium", italic: "Involve-MediumOblique" },
  600: { normal: "Involve-SemiBold", italic: "Involve-SemiBoldOblique" },
  700: { normal: "Involve-Bold", italic: "Involve-BoldOblique" },
};

const headingFont = createFont({
  size: config.fonts.heading.size,
  lineHeight: config.fonts.heading.lineHeight,
  weight: config.fonts.heading.weight,
  letterSpacing: config.fonts.heading.letterSpacing,
  face: involve,
});

const bodyFont = createFont({
  size: config.fonts.body.size,
  lineHeight: config.fonts.body.lineHeight,
  weight: config.fonts.body.weight,
  letterSpacing: config.fonts.body.letterSpacing,
  face: involve,
});

export const tamaguiConfig = createTamagui({
  ...config,
  fonts: { heading: headingFont, body: bodyFont },
});

export default tamaguiConfig;

export type Conf = typeof tamaguiConfig;

declare module "tamagui" {
  interface TamaguiCustomConfig extends Conf {}
}

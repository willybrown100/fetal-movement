import Typography from "./Typography";

interface BoldTextProps {
  text: string;
  size?: number;
  weight?: "400" | "500" | "600" | "700";
}

/**
 * Component to render text with bold weight
 * Usage: <BoldText text="This text will be bold" />
 */
const BoldText = ({ text, size = 14, weight = "700" }: BoldTextProps) => {
  return (
    <Typography size={size} weight={weight}>
      {text}
    </Typography>
  );
};

export default BoldText;

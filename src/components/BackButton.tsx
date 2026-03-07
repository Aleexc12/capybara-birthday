import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface BackButtonProps {
  to?: string;
  onClick?: (e?: React.MouseEvent) => void;
}

const BackButton = ({ to, onClick }: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <motion.button
      className="fixed top-10 left-6 z-50 text-muted-foreground font-semibold text-sm"
      onClick={(e) => onClick ? onClick(e) : (to && navigate(to))}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ x: -3 }}
      whileTap={{ scale: 0.95 }}
    >
      ← back
    </motion.button>
  );
};

export default BackButton;

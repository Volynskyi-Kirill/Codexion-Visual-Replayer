import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import type { CoderState } from '../utils/types';
import { polarToCartesian, getCoderAngle } from '../utils/geometry';
import { CODER_RADIUS, NODE_SIZE, COLORS } from '../utils/constants';

interface CoderNodeProps {
  coder: CoderState;
  totalCoders: number;
  currentTime: number;
  timeToBurnout: number;
}

const getStatusColor = (status: CoderState['status']) => {
  switch (status) {
    case 'IDLE': return COLORS.IDLE;
    case 'WAITING': return COLORS.WAITING;
    case 'COMPILING': return COLORS.COMPILING;
    case 'DEBUGGING': return COLORS.DEBUGGING;
    case 'REFACTORING': return COLORS.REFACTORING;
    case 'BURNOUT': return COLORS.BURNOUT;
    default: return COLORS.IDLE;
  }
};

export const CoderNode: React.FC<CoderNodeProps> = ({ 
  coder, 
  totalCoders, 
  currentTime,
  timeToBurnout 
}) => {
  const angle = getCoderAngle(coder.id, totalCoders);
  const { x, y } = polarToCartesian(angle, CODER_RADIUS);
  
  const timeLeft = coder.deadline > 0 ? Math.max(0, coder.deadline - currentTime) : timeToBurnout;
  const progress = timeLeft / timeToBurnout;
  const strokeDasharray = 2 * Math.PI * (NODE_SIZE / 2);
  const strokeDashoffset = strokeDasharray * (1 - progress);

  return (
    <motion.g
      initial={false}
      animate={{ x, y }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      {/* Burnout Radial Bar */}
      <circle
        r={NODE_SIZE / 2 + 5}
        fill="none"
        stroke={COLORS.LINE}
        strokeWidth="4"
      />
      <motion.circle
        r={NODE_SIZE / 2 + 5}
        fill="none"
        stroke={coder.status === 'BURNOUT' ? COLORS.BURNOUT : COLORS.COMPILING}
        strokeWidth="4"
        strokeDasharray={strokeDasharray}
        animate={{ strokeDashoffset }}
        style={{ rotate: -90 }}
      />

      {/* Coder Background */}
      <circle
        r={NODE_SIZE / 2}
        fill="#1e293b"
        stroke={getStatusColor(coder.status)}
        strokeWidth="3"
      />

      {/* Icon */}
      <foreignObject
        x={-NODE_SIZE / 2}
        y={-NODE_SIZE / 2}
        width={NODE_SIZE}
        height={NODE_SIZE}
      >
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          height: '100%',
          color: getStatusColor(coder.status)
        }}>
          <User size={32} />
        </div>
      </foreignObject>

      {/* ID Label */}
      <text
        y={NODE_SIZE / 2 + 25}
        textAnchor="middle"
        fill="white"
        fontSize="12"
        fontWeight="bold"
      >
        Coder {coder.id}
      </text>
    </motion.g>
  );
};

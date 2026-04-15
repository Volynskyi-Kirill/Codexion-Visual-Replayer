import { motion } from 'framer-motion';
import { Usb } from 'lucide-react';
import type { DongleState } from '../utils/types';
import { polarToCartesian, getDongleAngle } from '../utils/geometry';
import { DONGLE_RADIUS, DONGLE_SIZE, COLORS } from '../utils/constants';

interface DongleNodeProps {
    dongle: DongleState;
    totalDongles: number;
    currentTime: number;
    cooldownDuration: number;
}

export const DongleNode: React.FC<DongleNodeProps> = ({
    dongle,
    totalDongles,
    currentTime,
    cooldownDuration,
}) => {
    const angle = getDongleAngle(dongle.id, totalDongles);
    const { x, y } = polarToCartesian(angle, DONGLE_RADIUS);
    const isActive = dongle.current_owner_id !== null;
    const stateTransition = { duration: 0.25, ease: 'easeOut' as const };

    const timeLeft = Math.max(0, dongle.cooldown_until - currentTime);
    const isCoolingDown = timeLeft > 0;
    const progress = cooldownDuration > 0 ? timeLeft / cooldownDuration : 0;

    const strokeDasharray = 2 * Math.PI * (DONGLE_SIZE / 2 + 3);
    const strokeDashoffset = strokeDasharray * (1 - progress);

    return (
        <motion.g
            initial={false}
            animate={{ x, y }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        >
            {/* Cooldown Radial Bar */}
            {isCoolingDown && (
                <motion.circle
                    r={DONGLE_SIZE / 2 + 3}
                    fill='none'
                    stroke={COLORS.LINE_WAITING}
                    strokeWidth='3'
                    strokeDasharray={strokeDasharray}
                    animate={{ strokeDashoffset }}
                    style={{ rotate: -90, transformOrigin: 'center' }}
                    transition={stateTransition}
                />
            )}

            {/* Background circle */}
            <motion.circle
                r={DONGLE_SIZE / 2}
                fill='#1e293b'
                stroke={
                    isActive
                        ? COLORS.DONGLE_ACTIVE
                        : isCoolingDown
                          ? COLORS.LINE_WAITING
                          : COLORS.DONGLE_IDLE
                }
                strokeWidth='2'
                animate={{
                    stroke: isActive
                        ? COLORS.DONGLE_ACTIVE
                        : isCoolingDown
                          ? COLORS.LINE_WAITING
                          : COLORS.DONGLE_IDLE,
                }}
                transition={stateTransition}
            />

            {/* USB Icon */}
            <foreignObject
                x={-DONGLE_SIZE / 2}
                y={-DONGLE_SIZE / 2}
                width={DONGLE_SIZE}
                height={DONGLE_SIZE}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        color: isActive
                            ? COLORS.DONGLE_ACTIVE
                            : isCoolingDown
                              ? COLORS.LINE_WAITING
                              : COLORS.DONGLE_IDLE,
                    }}
                >
                    <Usb size={20} />
                </div>
            </foreignObject>

            {/* Cooldown Timer Text */}
            {isCoolingDown && (
                <text
                    y={-DONGLE_SIZE / 2 - 10}
                    textAnchor='middle'
                    fill={COLORS.LINE_WAITING}
                    fontSize='9'
                    fontWeight='bold'
                >
                    {timeLeft < 1000
                        ? `${Math.ceil(timeLeft)}ms`
                        : `${(timeLeft / 1000).toFixed(1)}s`}
                </text>
            )}

            {/* Queue size indicator */}
            {dongle.queue.length > 0 && (
                <motion.g
                    transform={`translate(${DONGLE_SIZE / 2}, -${DONGLE_SIZE / 2})`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={stateTransition}
                >
                    <circle r='8' fill={COLORS.WAITING} />
                    <text
                        y='3'
                        textAnchor='middle'
                        fill='#1e293b'
                        fontSize='9'
                        fontWeight='bold'
                    >
                        {dongle.queue.length}
                    </text>
                </motion.g>
            )}

            {/* ID Label */}
            <text
                y={DONGLE_SIZE / 2 + 15}
                textAnchor='middle'
                fill='white'
                fontSize='10'
                opacity='0.6'
            >
                D{dongle.id}
            </text>
        </motion.g>
    );
};

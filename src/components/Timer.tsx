interface TimerProps {
  timeLeft: number;
}

const Timer = ({ timeLeft }: TimerProps) => {
  return (
    <div style={{
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#dc2626',
      marginBottom: '1rem'
    }}>
      Time: {timeLeft}s
    </div>
  );
};

export default Timer; 
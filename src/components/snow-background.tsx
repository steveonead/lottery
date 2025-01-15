import Snowfall from 'react-snowfall';

const moneyIcon = document.createElement('img');
moneyIcon.src = '/money-bill-wave.svg';

export default function SnowBackground({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-onead bg-cover bg-center">
      <div className="absolute inset-0 bg-black/65"></div>
      <Snowfall
        radius={[25, 35]}
        images={[moneyIcon]}
        snowflakeCount={40}
        wind={[-0.5, 3.0]}
      />
      <div className="relative z-[2] grid size-full place-items-center">
        {children}
      </div>
    </div>
  );
}

export default function WeatherCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex flex-col items-center p-3 bg-gray-50 rounded-md">
      <div className="text-blue-500 mb-1">{icon}</div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

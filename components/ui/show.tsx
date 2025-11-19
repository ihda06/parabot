export default function Show({
  when,
  children,
  fallback,
}: {
  when: boolean;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return when ? children : fallback;
}

import { Sparkles, KeyRound, Shirt, ShoppingBag, Layers, Bath, Waves, Archive, Gem, Sparkle, type LucideIcon } from "lucide-react"

const iconMap: Record<string, LucideIcon> = {
  Sparkles,
  KeyRound,
  Shirt,
  ShoppingBag,
  Layers,
  Bath,
  Waves,
  Archive,
  Gem,
  Sparkle,
}

export function CategoryIcon({
  name,
  className,
}: {
  name: string
  className?: string
}) {
  const Icon = iconMap[name] ?? Sparkles
  return <Icon className={className} />
}

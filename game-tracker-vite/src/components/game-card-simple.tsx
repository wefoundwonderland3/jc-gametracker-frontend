'use client'

import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Star, Play, Clock } from 'lucide-react'

interface GameCardProps {
  game: {
    id: string
    title: string
    description?: string
    coverImage?: string
    genre?: string
    platform?: string
    rating?: number
    completed?: boolean
    hoursPlayed?: number
    reviews?: Array<{ rating: number }>
  }
  onClick?: () => void
}

export function GameCard({ game, onClick }: GameCardProps) {
  const averageRating =
    game.reviews?.length
      ? game.reviews.reduce((acc, review) => acc + review.rating, 0) /
        game.reviews.length
      : game.rating || 0

  return (
    <Card
      className="bg-card border-border hover:bg-accent/50 transition-all duration-300 cursor-pointer group"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={game.coverImage || '/placeholder-game.jpg'}
            alt={game.title}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Overlay superior */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/10 to-transparent" />

          {/* Hover info */}
          <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex items-center gap-2 mb-2">
              {game.completed && (
                <Badge className="bg-green-600 text-white text-xs">Completado</Badge>
              )}

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                <span className="text-white text-sm font-medium">
                  {averageRating.toFixed(1)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-white/80 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{game.hoursPlayed || 0}h</span>
              </div>

              <div className="flex items-center gap-1">
                <Play className="w-4 h-4" />
                <span>{game.genre || 'N/A'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Texto */}
        <div className="p-4">
          <h3 className="text-foreground font-semibold text-lg mb-2 line-clamp-2">
            {game.title}
          </h3>

          <div className="flex items-center gap-2 mb-3">
            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
              {game.genre || 'Sin género'}
            </Badge>

            <Badge variant="outline" className="text-xs border-border text-muted-foreground">
              {game.platform || 'Sin plataforma'}
            </Badge>
          </div>

          {game.description && (
            <p className="text-muted-foreground text-sm line-clamp-3">
              {game.description}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

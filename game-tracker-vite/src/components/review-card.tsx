'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Star, Calendar, MessageSquare, Edit, Trash2 } from 'lucide-react'

interface ReviewCardProps {
  review: any
  currentUserId?: string
  onEdit?: (review: any) => void
  onDelete?: (reviewId: string) => void
  onReply?: (reviewId: string) => void
}

export function ReviewCard({
  review,
  currentUserId,
  onEdit,
  onDelete,
  onReply
}: ReviewCardProps) {
  const formatDate = (date: Date | string | undefined) => {
    if (!date) return 'Fecha desconocida'

    try {
      const dateObj = new Date(date)
      if (isNaN(dateObj.getTime())) return 'Fecha inválida'

      return new Intl.DateTimeFormat('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj)
    } catch {
      return 'Fecha desconocida'
    }
  }

  const user = review.user || {
    id: 'unknown',
    name: 'Usuario Anónimo',
    avatar: '/placeholder-avatar.jpg'
  }

  const game = review.game || {
    id: review.gameId || 'unknown',
    title: 'Juego Desconocido',
    coverImage: '/placeholder-game.jpg'
  }

  const canEdit = currentUserId && user.id && currentUserId === user.id
  const canDelete = currentUserId && user.id && currentUserId === user.id

  return (
    <Card className="bg-card border-border hover:bg-accent/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          
          {/* USER INFO */}
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-muted text-foreground">
                {user.name
                  ? user.name
                      .split(' ')
                      .map((n: string) => n[0])
                      .join('')
                      .toUpperCase()
                  : 'U'}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="text-foreground font-semibold">{user.name}</h4>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(review.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* RATING + ACTIONS */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating
                      ? 'text-yellow-500 fill-yellow-500'
                      : 'text-muted-foreground'
                  }`}
                />
              ))}
            </div>

            {(canEdit || canDelete) && (
              <div className="flex gap-1">
                {canEdit && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent"
                    onClick={() => onEdit?.(review)}
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                )}

                {canDelete && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete?.(review.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* TITLE + GAME */}
        <div className="mt-3">
          <h3 className="text-foreground font-semibold text-lg mb-1">{review.title}</h3>

          <Badge
            variant="outline"
            className="text-xs border-border text-muted-foreground mb-3"
          >
            {game.title}
          </Badge>
        </div>

        {/* CONTENT */}
        <p className="text-muted-foreground leading-relaxed">{review.content}</p>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-4">
          <span className="text-sm text-muted-foreground">
            Calificación: {review.rating}/5
          </span>

          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground hover:bg-accent"
            onClick={() => onReply?.(review.id)}
          >
            <MessageSquare className="w-4 h-4 mr-1" />
            Responder
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

interface ReviewListProps {
  reviews: Array<any>
  currentUserId?: string
  onEditReview?: (review: any) => void
  onDeleteReview?: (reviewId: string) => void
  onReplyToReview?: (reviewId: string) => void
}

export function ReviewList({
  reviews,
  currentUserId,
  onEditReview,
  onDeleteReview,
  onReplyToReview
}: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400 text-lg">No hay reseñas aún</p>
        <p className="text-gray-500 text-sm mt-2">
          Sé el primero en compartir tu opinión
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {reviews.map((review, index) => (
        <ReviewCard
          key={review.id || `review-${index}`}
          review={review}
          currentUserId={currentUserId}
          onEdit={onEditReview}
          onDelete={onDeleteReview}
          onReply={onReplyToReview}
        />
      ))}
    </div>
  )
}

'use client'

import { Navbar } from '@/components/navbar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Separator } from '@/components/ui/separator'
import { 
  Trophy, 
  Clock, 
  Star, 
  Target, 
  Gamepad2, 
  TrendingUp, 
  Calendar,
  Award,


  Flame,

  Crown
} from 'lucide-react'

// Datos de ejemplo
const userProfile = {
  name: 'Gamer Pro',
  email: 'gamer@pro.com',
  avatar: '/placeholder-avatar.jpg',
  memberSince: 'Enero 2023',
  level: 15,
  totalHours: 379,
  completedGames: 24,
  totalGames: 45,
  favoriteGenre: 'RPG',
  favoritePlatform: 'PC'
}

const achievements = [
  {
    id: 1,
    name: 'Novato Gamer',
    description: 'Juega tu primer juego',
    icon: Gamepad2,
    color: 'bg-green-600',
    unlocked: true,
    unlockedAt: 'Enero 2023'
  },
  {
    id: 2,
    name: 'Maratón Gamer',
    description: 'Acumula 100 horas de juego',
    icon: Clock,
    color: 'bg-blue-600',
    unlocked: true,
    unlockedAt: 'Marzo 2023'
  },
  {
    id: 3,
    name: 'Coleccionista',
    description: 'Añade 20 juegos a tu biblioteca',
    icon: Trophy,
    color: 'bg-purple-600',
    unlocked: true,
    unlockedAt: 'Junio 2023'
  },
  {
    id: 4,
    name: 'Crítico Experto',
    description: 'Escribe 10 reseñas',
    icon: Star,
    color: 'bg-yellow-600',
    unlocked: true,
    unlockedAt: 'Agosto 2023'
  },
  {
    id: 5,
    name: 'Explorador de Géneros',
    description: 'Juega juegos de 5 géneros diferentes',
    icon: Target,
    color: 'bg-red-600',
    unlocked: true,
    unlockedAt: 'Octubre 2023'
  },
  {
    id: 6,
    name: 'Leyenda Gaming',
    description: 'Alcanza 500 horas de juego',
    icon: Crown,
    color: 'bg-orange-600',
    unlocked: false,
    progress: 379 / 500 * 100
  }
]

const recentActivity = [
  { game: 'Baldur\'s Gate 3', action: 'Completado', hours: 120, date: 'Hace 2 días' },
  { game: 'Elden Ring', action: 'Jugando', hours: 67, date: 'Hace 1 semana' },
  { game: 'God of War: Ragnarök', action: 'Completado', hours: 35, date: 'Hace 2 semanas' }
]

const genreStats = [
  { genre: 'RPG', hours: 180, games: 12 },
  { genre: 'Acción', hours: 95, games: 8 },
  { genre: 'Aventura', hours: 65, games: 10 },
  { genre: 'Roguelike', hours: 39, games: 6 }
]

export default function Perfil() {
  const completionRate = (userProfile.completedGames / userProfile.totalGames) * 100
  const nextLevelProgress = (userProfile.totalHours % 50) / 50 * 100

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      
      <div className="px-8 py-8">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white/20">
              <AvatarImage src={userProfile.avatar} />
              <AvatarFallback className="text-3xl bg-gray-800 text-white">
                {userProfile.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-white text-3xl md:text-4xl font-bold mb-2">{userProfile.name}</h1>
              <p className="text-white/80 mb-4">{userProfile.email}</p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>Miembro desde {userProfile.memberSince}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  <span>Nivel {userProfile.level}</span>
                </div>
              </div>
            </div>
            
            <Button variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
              Editar Perfil
            </Button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Hours - Large Card */}
          <Card className="bg-gray-900 border-gray-800 col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-500" />
                Horas Totales
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{userProfile.totalHours}h</div>
              <Progress value={nextLevelProgress} className="h-2 mb-2" />
              <p className="text-gray-400 text-sm">Próximo nivel en {50 - (userProfile.totalHours % 50)}h</p>
            </CardContent>
          </Card>

          {/* Games Completed */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-green-500" />
                Juegos Completados
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white mb-2">{userProfile.completedGames}</div>
              <p className="text-gray-400 text-sm">de {userProfile.totalGames} juegos</p>
              <Progress value={completionRate} className="h-2 mt-3" />
            </CardContent>
          </Card>

          {/* Favorite Genre */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Género Favorito
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">{userProfile.favoriteGenre}</div>
              <p className="text-gray-400 text-sm">180 horas jugadas</p>
            </CardContent>
          </Card>

          {/* Platform Stats */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <Gamepad2 className="w-5 h-5 text-purple-500" />
                Plataforma Principal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white mb-2">{userProfile.favoritePlatform}</div>
              <p className="text-gray-400 text-sm">25 juegos</p>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <Card className="bg-gray-900 border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" />
              Logros y Insignias
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => {
                const Icon = achievement.icon
                return (
                  <div 
                    key={achievement.id}
                    className={`relative p-4 rounded-lg border ${
                      achievement.unlocked 
                        ? 'bg-gray-800 border-gray-700' 
                        : 'bg-gray-900/50 border-gray-800'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${achievement.unlocked ? achievement.color : 'bg-gray-800'}`}>
                        <Icon className={`w-6 h-6 ${achievement.unlocked ? 'text-white' : 'text-gray-600'}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-1 ${achievement.unlocked ? 'text-white' : 'text-gray-500'}`}>
                          {achievement.name}
                        </h3>
                        <p className={`text-sm mb-2 ${achievement.unlocked ? 'text-gray-400' : 'text-gray-600'}`}>
                          {achievement.description}
                        </p>
                        {achievement.unlocked ? (
                          <Badge variant="secondary" className="text-xs bg-green-600/20 text-green-400 border-green-600/30">
                            Desbloqueado {achievement.unlockedAt}
                          </Badge>
                        ) : (
                          <div>
                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                              <span>Progreso</span>
                              <span>{achievement.progress?.toFixed(0)}%</span>
                            </div>
                            <Progress value={achievement.progress || 0} className="h-1" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Genre Statistics */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-500" />
                Estadísticas por Género
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {genreStats.map((stat) => (
                  <div key={stat.genre}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-medium">{stat.genre}</span>
                      <span className="text-gray-400 text-sm">{stat.hours}h • {stat.games} juegos</span>
                    </div>
                    <Progress value={(stat.hours / userProfile.totalHours) * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Flame className="w-5 h-5 text-red-500" />
                Actividad Reciente
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="text-white font-medium">{activity.game}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <span>{activity.action}</span>
                          <span>•</span>
                          <span>{activity.hours}h</span>
                        </div>
                      </div>
                      <span className="text-gray-500 text-sm">{activity.date}</span>
                    </div>
                    {index < recentActivity.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
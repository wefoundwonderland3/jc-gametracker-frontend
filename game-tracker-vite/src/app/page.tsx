'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { Navbar } from '@/components/navbar'
import { GameCarousel } from '@/components/game-carousel'
import { GameCard } from '@/components/game-card'
import { GameForm } from '@/components/game-form'
import { GameDetailModal } from '@/components/game-detail-modal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Star, Search, Filter, Grid, List, Eye, X } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

/**
 * Tipos
 */
type Review = { rating: number; id?: string; createdAt?: Date }
type Game = {
  id: string
  title: string
  description?: string
  coverImage?: string
  genre?: string
  platform?: string
  rating?: number
  completed?: boolean
  hoursPlayed?: number
  userId?: string
  createdAt?: Date
  updatedAt?: Date
  reviews?: Review[]
}

/**
 * Datos de ejemplo
 */
const featuredGames: Game[] = [
  {
    id: '1',
    title: 'The Legend of Zelda: Tears of the Kingdom',
    description: 'La aventura épica continúa en el vasto mundo de Hyrule.',
    coverImage: '/placeholder-game.jpg',
    genre: 'Aventura',
    platform: 'Nintendo Switch',
    rating: 4.8,
    completed: false,
    hoursPlayed: 45,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }, { rating: 4 }]
  },
  {
    id: '2',
    title: "Baldur's Gate 3",
    description: 'Una RPG épica con decisiones que moldean tu destino.',
    coverImage: '/placeholder-game.jpg',
    genre: 'RPG',
    platform: 'PC',
    rating: 4.9,
    completed: true,
    hoursPlayed: 120,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: '3',
    title: 'Elden Ring',
    description: 'Explora un mundo oscuro y desafiante lleno de secretos.',
    coverImage: '/placeholder-game.jpg',
    genre: 'RPG',
    platform: 'PC',
    rating: 4.7,
    completed: false,
    hoursPlayed: 67,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }]
  },
  {
    id: '4',
    title: 'God of War: Ragnarök',
    description: 'La conclusión épica de la saga nórdica.',
    coverImage: '/placeholder-game.jpg',
    genre: 'Acción',
    platform: 'PS5',
    rating: 4.6,
    completed: true,
    hoursPlayed: 35,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 4 }]
  },
  {
    id: '5',
    title: 'Hades',
    description: 'Escapa del inframundo en este roguelike adictivo.',
    coverImage: '/placeholder-game.jpg',
    genre: 'Roguelike',
    platform: 'PC',
    rating: 4.9,
    completed: true,
    hoursPlayed: 89,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }, { rating: 5 }]
  }
]

const recentlyPlayed: Game[] = [
  {
    id: '6',
    title: 'Cyberpunk 2077',
    coverImage: '/placeholder-game.jpg',
    genre: 'RPG',
    platform: 'PC',
    rating: 4.2,
    completed: false,
    hoursPlayed: 45,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 4 }]
  },
  {
    id: '7',
    title: 'Forza Horizon 5',
    coverImage: '/placeholder-game.jpg',
    genre: 'Carreras',
    platform: 'Xbox',
    rating: 4.5,
    completed: false,
    hoursPlayed: 23,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }]
  },
  {
    id: '8',
    title: 'Minecraft',
    coverImage: '/placeholder-game.jpg',
    genre: 'Sandbox',
    platform: 'PC',
    rating: 4.7,
    completed: false,
    hoursPlayed: 156,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }]
  },
  {
    id: '9',
    title: 'Apex Legends',
    coverImage: '/placeholder-game.jpg',
    genre: 'Battle Royale',
    platform: 'PC',
    rating: 4.3,
    completed: false,
    hoursPlayed: 78,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 4 }]
  },
  {
    id: '10',
    title: 'FIFA 24',
    coverImage: '/placeholder-game.jpg',
    genre: 'Deportes',
    platform: 'PS5',
    rating: 4.1,
    completed: false,
    hoursPlayed: 34,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 4 }]
  }
]

const topRated: Game[] = [
  {
    id: '11',
    title: 'Disco Elysium',
    coverImage: '/placeholder-game.jpg',
    genre: 'RPG',
    platform: 'PC',
    rating: 4.8,
    completed: false,
    hoursPlayed: 23,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }]
  },
  {
    id: '12',
    title: 'Red Dead Redemption 2',
    coverImage: '/placeholder-game.jpg',
    genre: 'Acción',
    platform: 'PC',
    rating: 4.9,
    completed: true,
    hoursPlayed: 89,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }, { rating: 5 }]
  },
  {
    id: '13',
    title: 'The Witcher 3: Wild Hunt',
    coverImage: '/placeholder-game.jpg',
    genre: 'RPG',
    platform: 'PC',
    rating: 4.8,
    completed: true,
    hoursPlayed: 124,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }]
  },
  {
    id: '14',
    title: 'Portal 2',
    coverImage: '/placeholder-game.jpg',
    genre: 'Puzzle',
    platform: 'PC',
    rating: 4.7,
    completed: true,
    hoursPlayed: 15,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }]
  },
  {
    id: '15',
    title: 'Half-Life 2',
    coverImage: '/placeholder-game.jpg',
    genre: 'FPS',
    platform: 'PC',
    rating: 4.6,
    completed: true,
    hoursPlayed: 18,
    userId: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    reviews: [{ rating: 5 }]
  }
]

const initialMyGames: Game[] = []

export default function Home() {
  const [games, setGames] = useState<Game[]>(initialMyGames)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isGameFormOpen, setIsGameFormOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isGameDetailOpen, setIsGameDetailOpen] = useState(false)
  const [addingToList, setAddingToList] = useState<string | null>(null) // Para animaciones
  const { toast } = useToast()

  // 👉 activeTab debe declararse antes de usarlo en useEffect
  const [activeTab, setActiveTab] = useState<'discover' | 'mylist'>('discover')

  useEffect(() => {
    const handleOpenGameForm = () => {
      setIsGameFormOpen(true)
    }

    const handleGlobalSearch = (event: Event) => {
      // custom event detail puede venir de string
      const detail = (event as CustomEvent<string>).detail
      if (typeof detail === 'string') {
        setSearchTerm(detail)
        setActiveTab('mylist')
      }
    }

    window.addEventListener('openGameForm', handleOpenGameForm)
    window.addEventListener('globalSearch', handleGlobalSearch as EventListener)

    return () => {
      window.removeEventListener('openGameForm', handleOpenGameForm)
      window.removeEventListener('globalSearch', handleGlobalSearch as EventListener)
    }
  }, [])

  const genres = ['all', 'Aventura', 'RPG', 'Acción', 'Roguelike']
  const platforms = ['all', 'PC', 'Nintendo Switch', 'PS5', 'Xbox']
  
  const filteredGames = games.filter(game => {
    const title = (game.title || '').toLowerCase()
    const matchesSearch = title.includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre
    const matchesPlatform = selectedPlatform === 'all' || game.platform === selectedPlatform
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'completed' && !!game.completed) ||
      (selectedStatus === 'playing' && !game.completed)

    return matchesSearch && matchesGenre && matchesPlatform && matchesStatus
  })

  // Función para filtrar juegos basados en búsqueda global
  const filterGamesBySearch = (gamesList: Game[]) => {
    if (!searchTerm) return gamesList
    return gamesList.filter(game =>
      (game.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (game.genre || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (game.platform || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  // Filtrar juegos para las secciones de descubrimiento
  const filteredFeaturedGames = filterGamesBySearch(featuredGames)
  const filteredRecentlyPlayed = filterGamesBySearch(recentlyPlayed)
  const filteredTopRated = filterGamesBySearch(topRated)

  const totalHours = games.reduce((acc, g) => acc + (g.hoursPlayed || 0), 0)
  const completedGames = games.filter(g => !!g.completed).length

  const clearSearch = () => {
    setSearchTerm('')
  }

  // Verificar si un juego ya está en la lista
  const isGameInList = (gameId: string) => {
    return games.some(game => game.id === gameId)
  }

  // Añadir juego a la lista con animación
  const addGameToList = async (game: Game) => {
    if (isGameInList(game.id)) {
      toast({
        title: "Juego ya en tu lista",
        description: `"${game.title}" ya está en tu biblioteca.`,
        variant: "destructive",
      })
      return // Ya está en la lista
    }

    setAddingToList(game.id)

    // Simular delay para la animación
    await new Promise(resolve => setTimeout(resolve, 800))

    const newGame: Game = {
      ...game,
      id: game.id,
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      reviews: [],
      completed: false,
      hoursPlayed: 0
    }

    setGames(prev => [newGame, ...prev])
    setAddingToList(null)

    // Mostrar notificación de éxito
    toast({
      title: "¡Juego añadido!",
      description: `"${game.title}" ha sido añadido a tu biblioteca.`,
    })
  }

  // Remover juego de la lista con animación
  const removeGameFromList = async (gameId: string, gameTitle: string) => {
    setGames(prev => prev.filter(game => game.id !== gameId))

    // Mostrar notificación de confirmación
    toast({
      title: "Juego removido",
      description: `"${gameTitle}" ha sido removido de tu biblioteca.`,
      variant: "default",
    })
  }

  const handleGameClick = (game: Game) => {
    setSelectedGame(game)
    setIsGameDetailOpen(true)
  }

  const handleGameSubmit = async (gameData: Partial<Game>) => {
    try {
      // Validar datos básicos
      if (!gameData.title || !gameData.platform || !gameData.genre) {
        toast({
          title: "Error de validación",
          description: "Por favor completa todos los campos requeridos.",
          variant: "destructive",
        })
        return
      }

      // Generar ID único (más robusto que Date.now())
      const uniqueId = `game_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

      const newGame: Game = {
        id: uniqueId,
        title: gameData.title,
        description: gameData.description || '',
        coverImage: gameData.coverImage || '/placeholder-game.jpg',
        genre: gameData.genre,
        platform: gameData.platform,
        rating: gameData.rating || 0,
        completed: false,
        hoursPlayed: 0,
        userId: '1',
        createdAt: new Date(),
        updatedAt: new Date(),
        reviews: []
      }

      setGames(prev => [newGame, ...prev])

      toast({
        title: "¡Juego agregado!",
        description: `"${gameData.title}" ha sido agregado a tu biblioteca.`,
      })
    } catch (error) {
      console.error('Error adding game:', error)
      toast({
        title: "Error",
        description: "No se pudo agregar el juego. Intenta nuevamente.",
        variant: "destructive",
      })
    }
  }

  const handleAddReview = (reviewData: { gameId: string; rating: number; comment?: string }) => {
    try {
      const newReview: Review = {
        rating: reviewData.rating,
        id: Date.now().toString(),
        createdAt: new Date()
      }

      setGames(prev =>
        prev.map(game =>
          game.id === reviewData.gameId
            ? {
                ...game,
                reviews: [...(game.reviews || []), newReview],
                rating:
                  ((game.reviews?.reduce((acc, r) => acc + (r.rating || 0), 0) || 0) +
                    reviewData.rating) /
                  ((game.reviews?.length || 0) + 1)
              }
            : game
        )
      )

      if (selectedGame && selectedGame.id === reviewData.gameId) {
        setSelectedGame(prev =>
          prev
            ? {
                ...prev,
                reviews: [...(prev.reviews || []), newReview],
                rating:
                  ((prev.reviews?.reduce((acc, r) => acc + (r.rating || 0), 0) || 0) +
                    reviewData.rating) /
                  ((prev.reviews?.length || 0) + 1)
              }
            : null
        )
      }
    } catch (error) {
      console.error('Error adding review:', error)
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/placeholder-hero.jpg"
            alt="Featured Game"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-2xl px-8">
            <h1 className="text-foreground text-5xl md:text-6xl font-bold mb-4">
              The Legend of Zelda: Tears of the Kingdom
            </h1>
            <p className="text-foreground/80 text-lg mb-6 max-w-xl">
              Explora un vasto mundo lleno de misterios, resuelve puzzles complicados y enfréntate a enemigos épicos en esta aventura sin igual.
            </p>
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="text-foreground font-semibold">4.8</span>
              </div>
              <span className="text-foreground/60">•</span>
              <span className="text-foreground/60">Aventura</span>
              <span className="text-foreground/60">•</span>
              <span className="text-foreground/60">Nintendo Switch</span>
            </div>
            <div className="flex gap-4">
              <Button
                size="lg"
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => handleGameClick(featuredGames[0])}
              >
                <Eye className="w-5 h-5 mr-2" />
                Ver más
              </Button>
              <Button
                size="lg"
                variant="secondary"
                className="bg-muted hover:bg-muted/80 text-foreground"
                onClick={() => {
                  if (isGameInList(featuredGames[0]?.id || '')) {
                    removeGameFromList(featuredGames[0]?.id || '', featuredGames[0]?.title || '')
                  } else {
                    addGameToList(featuredGames[0])
                  }
                }}
                disabled={addingToList === featuredGames[0]?.id}
              >
                {addingToList === featuredGames[0]?.id ? (
                  <div className="animate-spin w-5 h-5 border-2 border-current border-t-transparent rounded-full mr-2" />
                ) : isGameInList(featuredGames[0]?.id || '') ? (
                  <X className="w-5 h-5 mr-2" />
                ) : (
                  <Plus className="w-5 h-5 mr-2" />
                )}
                {isGameInList(featuredGames[0]?.id || '') ? 'Remover de Mi Lista' : 'Añadir a Mi Lista'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-8">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'discover' | 'mylist')} className="w-full">
          <TabsList className="bg-gray-900 border-gray-800 mb-8">
            <TabsTrigger value="discover" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/80">
              Descubrir
            </TabsTrigger>
            <TabsTrigger value="mylist" className="data-[state=active]:bg-red-600 data-[state=active]:text-white text-white/80">
              Mi Lista
            </TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-12">
            {searchTerm && (
              <div className="text-center py-4">
                <p className="text-foreground/60">
                  Buscando: <span className="text-foreground font-semibold">"{searchTerm}"</span>
                </p>
              </div>
            )}

            <GameCarousel
              title="Lo Nuevo"
              games={filteredFeaturedGames}
              onGameClick={handleGameClick}
              onAddToList={addGameToList}
              gamesInList={games.map(g => g.id)}
              addingToList={addingToList}
            />

            <GameCarousel
              title="Jugados Recientemente"
              games={filteredRecentlyPlayed}
              onGameClick={handleGameClick}
              onAddToList={addGameToList}
              gamesInList={games.map(g => g.id)}
              addingToList={addingToList}
            />

            <GameCarousel
              title="Mejor Valorados"
              games={filteredTopRated}
              onGameClick={handleGameClick}
              onAddToList={addGameToList}
              gamesInList={games.map(g => g.id)}
              addingToList={addingToList}
            />

            {searchTerm && filteredFeaturedGames.length === 0 && filteredRecentlyPlayed.length === 0 && filteredTopRated.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-foreground text-xl font-semibold mb-2">No se encontraron juegos</h3>
                <p className="text-muted-foreground">Intenta con otra búsqueda o navega por las categorías</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="mylist" className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div>
                <h2 className="text-foreground text-3xl font-bold mb-2">Mi Lista</h2>
                {searchTerm && (
                  <div className="flex items-center gap-2 mb-2">
                    <Search className="w-4 h-4 text-muted-foreground" />
                    <span className="text-muted-foreground text-sm">
                      Buscando: <span className="text-foreground font-semibold">"{searchTerm}"</span>
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearSearch}
                      className="text-muted-foreground hover:text-foreground h-6 px-2"
                    >
                      ×
                    </Button>
                  </div>
                )}
                <div className="flex gap-4 text-foreground/60">
                  <span>{filteredGames.length} {searchTerm ? 'resultados' : 'juegos'}</span>
                  {!searchTerm && (
                    <>
                      <span>•</span>
                      <span>{completedGames} completados</span>
                      <span>•</span>
                      <span>{totalHours.toFixed(1)} horas jugadas</span>
                    </>
                  )}
                </div>
              </div>

              <Button onClick={() => setIsGameFormOpen(true)} className="bg-red-600 hover:bg-red-700 text-white">
                <Plus className="w-5 h-5 mr-2" />
                Agregar Juego
              </Button>
            </div>

            {/* Filters */}
            <div className="bg-card rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Filter className="w-5 h-5 text-foreground" />
                <h3 className="text-foreground font-semibold">Filtros</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Buscar juegos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-10 bg-muted border-border text-foreground placeholder-muted-foreground"
                  />
                  {searchTerm && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={clearSearch}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
                    >
                      ×
                    </Button>
                  )}
                </div>

                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="bg-muted border-border text-foreground">
                    <SelectValue placeholder="Género" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {genres.map(genre => (
                      <SelectItem key={genre} value={genre} className="text-foreground hover:bg-accent">
                        {genre === 'all' ? 'Todos los géneros' : genre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="bg-muted border-border text-foreground">
                    <SelectValue placeholder="Plataforma" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {platforms.map(platform => (
                      <SelectItem key={platform} value={platform} className="text-foreground hover:bg-accent">
                        {platform === 'all' ? 'Todas las plataformas' : platform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="bg-muted border-border text-foreground">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    <SelectItem value="all" className="text-foreground hover:bg-accent">Todos</SelectItem>
                    <SelectItem value="completed" className="text-foreground hover:bg-accent">Completados</SelectItem>
                    <SelectItem value="playing" className="text-foreground hover:bg-accent">Jugando</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('grid')}
                    className={viewMode === 'grid' ? 'bg-red-600 hover:bg-red-700' : 'bg-muted border-border text-foreground hover:bg-accent'}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="icon"
                    onClick={() => setViewMode('list')}
                    className={viewMode === 'list' ? 'bg-red-600 hover:bg-red-700' : 'bg-muted border-border text-foreground hover:bg-accent'}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Games Grid/List */}
            {filteredGames.length === 0 ? (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-foreground text-xl font-semibold mb-2">
                  {searchTerm ? 'No se encontraron juegos' : 'No hay juegos en tu lista'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {searchTerm
                    ? `No se encontraron juegos que coincidan con "${searchTerm}"`
                    : 'Comienza agregando juegos a tu biblioteca'
                  }
                </p>
                {searchTerm && (
                  <Button onClick={clearSearch} variant="outline" className="border-border text-foreground hover:bg-accent">
                    Limpiar búsqueda
                  </Button>
                )}
              </div>
            ) : (
              <div className={viewMode === 'grid'
                ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6"
                : "space-y-4"
              }>
                {filteredGames.map((game) => (
                  viewMode === 'grid' ? (
                    <div key={game.id} onClick={() => handleGameClick(game)}>
                      <GameCard
                        game={game}
                        // GameCard props adjusted to accept onClick instead of onRemoveFromList if needed
                        onClick={() => handleGameClick(game)}
                      />
                    </div>
                  ) : (
                    <div key={game.id} className="bg-card rounded-lg p-4 flex gap-4 hover:bg-accent transition-colors cursor-pointer" onClick={() => handleGameClick(game)}>
                      <div className="w-20 h-28 relative flex-shrink-0">
                        <Image src={game.coverImage || '/placeholder-game.jpg'} alt={game.title} fill sizes="80px" className="object-cover rounded" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-foreground font-semibold text-lg mb-1">{game.title}</h3>
                        <div className="flex gap-2 mb-2">
                          <Badge variant="outline" className="border-border text-muted-foreground">{game.genre || '—'}</Badge>
                          <Badge variant="outline" className="border-border text-muted-foreground">{game.platform || '—'}</Badge>
                          {game.completed && (
                            <Badge className="bg-green-600 text-white">Completado</Badge>
                          )}
                        </div>
                        <p className="text-muted-foreground text-sm mb-2">{game.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>⭐ {game.rating?.toFixed(1) ?? '—'}</span>
                            <span>🕐 {game.hoursPlayed ?? 0}h</span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeGameFromList(game.id, game.title)
                            }}
                            className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
                          >
                            <X className="w-4 h-4 mr-1" />
                            Remover
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <GameForm
        isOpen={isGameFormOpen}
        onClose={() => setIsGameFormOpen(false)}
        onSubmit={handleGameSubmit}
      />

      {selectedGame && (
        <GameDetailModal
          game={selectedGame}
          isOpen={isGameDetailOpen}
          onClose={() => {
            setIsGameDetailOpen(false)
            setSelectedGame(null)
          }}
          onAddReview={(data) => handleAddReview(data)}
        />
      )}

      <Toaster />

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h3 className="text-foreground font-semibold text-lg mb-2">GameTracker</h3>
              <p className="text-muted-foreground text-sm">
                Tu biblioteca personal de videojuegos
              </p>
            </div>
            <div className="text-center md:text-right">
              <p className="text-foreground font-medium">
                Layla Sarmiento
              </p>
              <p className="text-muted-foreground text-sm">
                Ecuador
              </p>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-muted-foreground text-xs">
              © 2025 GameTracker. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

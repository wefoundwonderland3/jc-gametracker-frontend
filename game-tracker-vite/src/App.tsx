'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
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
import { Plus, Search, Grid, List, Eye} from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { Toaster } from '@/components/ui/toaster'

/* ---------------------------
   Tipos
   ---------------------------*/
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

/* ---------------------------
   Datos de ejemplo (mínimos)
   ---------------------------*/
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
  }
]

const recentlyPlayed: Game[] = [
  {
    id: '3',
    title: 'Elden Ring',
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
  }
]

const topRated: Game[] = [
  {
    id: '5',
    title: 'Hades',
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

const initialMyGames: Game[] = []

/* ---------------------------
   Componente Page (Home)
   ---------------------------*/
export default function Home() {
  const [games, setGames] = useState<Game[]>(initialMyGames)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('all')
  const [selectedPlatform, setSelectedPlatform] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'completed' | 'playing'>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isGameFormOpen, setIsGameFormOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<Game | null>(null)
  const [isGameDetailOpen, setIsGameDetailOpen] = useState(false)
  const [addingToList, setAddingToList] = useState<string | null>(null)
  const { toast } = useToast()

  // activeTab declarado antes del useEffect (evita errores)
  const [activeTab, setActiveTab] = useState<'discover' | 'mylist'>('discover')

  useEffect(() => {
    const handleOpenGameForm = () => setIsGameFormOpen(true)

    const handleGlobalSearch = (event: Event) => {
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

  const genres = ['all', 'Aventura', 'RPG', 'Acción', 'Estrategia', 'Deportes', 'Puzzle', 'Terror', 'Simulación', 'Roguelike']
  const platforms = ['all', 'PC', 'Nintendo Switch', 'PS5', 'Xbox']
  // statuses usado arriba como selectedStatus (evita warning)
  const statuses = ['all', 'completed', 'playing'] as const

  /* ---------------------------
     Filtrado y métricas
     ---------------------------*/
  const normalize = (s?: string) => (s || '').toLowerCase()
  const filteredGames = games.filter(game => {
    const matchesSearch = normalize(game.title).includes(searchTerm.toLowerCase())
    const matchesGenre = selectedGenre === 'all' || game.genre === selectedGenre
    const matchesPlatform = selectedPlatform === 'all' || game.platform === selectedPlatform
    const matchesStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'completed' && !!game.completed) ||
      (selectedStatus === 'playing' && !game.completed)

    return matchesSearch && matchesGenre && matchesPlatform && matchesStatus
  })

  const filterGamesBySearch = (list: Game[]) => {
    if (!searchTerm) return list
    const q = searchTerm.toLowerCase()
    return list.filter(g =>
      (g.title || '').toLowerCase().includes(q) ||
      (g.genre || '').toLowerCase().includes(q) ||
      (g.platform || '').toLowerCase().includes(q)
    )
  }

  const filteredFeaturedGames = filterGamesBySearch(featuredGames)
  const filteredRecentlyPlayed = filterGamesBySearch(recentlyPlayed)
  const filteredTopRated = filterGamesBySearch(topRated)

  const totalHours = games.reduce((acc, g) => acc + (g.hoursPlayed || 0), 0)
  const completedGames = games.filter(g => !!g.completed).length

  /* ---------------------------
     Helpers: add / remove / submit / review
     ---------------------------*/
  const clearSearch = () => {
    setSearchTerm('')
    setActiveTab('discover')
  }

  const isGameInList = (id: string) => games.some(g => g.id === id)

  const addGameToList = async (game: Game) => {
    if (isGameInList(game.id)) {
      toast({ title: 'Juego ya en tu lista', description: `"${game.title}" ya está en tu biblioteca.`, variant: 'destructive' })
      return
    }
    setAddingToList(game.id)
    await new Promise(r => setTimeout(r, 600)) // animación
    const newGame: Game = {
      ...game,
      id: game.id,
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      reviews: game.reviews ?? [],
      completed: game.completed ?? false,
      hoursPlayed: game.hoursPlayed ?? 0
    }
    setGames(prev => [newGame, ...prev])
    setAddingToList(null)
    toast({ title: '¡Juego añadido!', description: `"${game.title}" ha sido añadido a tu biblioteca.` })
  }

  const removeGameFromList = (id: string, title: string) => {
    setGames(prev => prev.filter(g => g.id !== id))
    toast({ title: 'Juego removido', description: `"${title}" ha sido removido de tu biblioteca.`, variant: 'default' })
  }

  const handleGameClick = (game: Game) => {
    setSelectedGame(game)
    setIsGameDetailOpen(true)
  }

  const handleGameSubmit = async (gameData: Partial<Game>) => {
    if (!gameData.title || !gameData.platform || !gameData.genre) {
      toast({ title: 'Error de validación', description: 'Por favor completa todos los campos requeridos.', variant: 'destructive' })
      return
    }
    const id = `game_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`
    const newGame: Game = {
      id,
      title: gameData.title,
      description: gameData.description ?? '',
      coverImage: gameData.coverImage ?? '/placeholder-game.jpg',
      genre: gameData.genre,
      platform: gameData.platform,
      rating: gameData.rating ?? 0,
      completed: false,
      hoursPlayed: 0,
      userId: '1',
      createdAt: new Date(),
      updatedAt: new Date(),
      reviews: []
    }
    setGames(prev => [newGame, ...prev])
    toast({ title: '¡Juego agregado!', description: `"${gameData.title}" ha sido agregado a tu biblioteca.` })
  }

  const handleAddReview = (payload: { gameId: string; rating: number; comment?: string }) => {
    const newReview: Review = { rating: payload.rating, id: Date.now().toString(), createdAt: new Date() }
    setGames(prev =>
      prev.map(game => {
        if (game.id !== payload.gameId) return game
        const reviews = [...(game.reviews ?? []), newReview]
        const rating = reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length
        return { ...game, reviews, rating }
      })
    )
    // actualizar selectedGame si corresponde
    if (selectedGame && selectedGame.id === payload.gameId) {
      setSelectedGame(prev => {
        if (!prev) return prev
        const reviews = [...(prev.reviews ?? []), newReview]
        const rating = reviews.reduce((a, r) => a + (r.rating || 0), 0) / reviews.length
        return { ...prev, reviews, rating }
      })
    }
    toast({ title: '¡Reseña agregada!', description: 'Gracias por tu opinión.' })
  }

  /* ---------------------------
     Render
     ---------------------------*/
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <Image src="/placeholder-hero.jpg" alt="Hero" fill sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">GameTracker</h1>
            <p className="max-w-2xl text-muted-foreground mb-6">Tu biblioteca personal de videojuegos. Agrega, puntúa y guarda tus favoritos.</p>
            <div className="flex gap-3">
              <Button onClick={() => handleGameClick(featuredGames[0])} className="bg-red-600 hover:bg-red-700 text-white" size="lg">
                <Eye className="w-5 h-5 mr-2" /> Ver más
              </Button>
              <Button onClick={() => addGameToList(featuredGames[0])} className="bg-muted text-foreground" size="lg">
                <Plus className="w-4 h-4 mr-2" /> Añadir a Mi Lista
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="container mx-auto px-6 py-10">
        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'discover' | 'mylist')}>
          <TabsList className="mb-6">
            <TabsTrigger value="discover">Descubrir</TabsTrigger>
            <TabsTrigger value="mylist">Mi Lista</TabsTrigger>
          </TabsList>

          <TabsContent value="discover" className="space-y-8">
            {/* Search + filters row */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-3 w-full md:w-2/3">
                <Input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Buscar juegos..." className="w-full" />
                <Button variant="ghost" onClick={clearSearch}>Limpiar</Button>
              </div>

              <div className="flex items-center gap-2">
                <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                  <SelectTrigger className="min-w-[150px]"><SelectValue placeholder="Género" /></SelectTrigger>
                  <SelectContent>
                    {genres.map(g => <SelectItem key={g} value={g}>{g === 'all' ? 'Todos los géneros' : g}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                  <SelectTrigger className="min-w-[150px]"><SelectValue placeholder="Plataforma" /></SelectTrigger>
                  <SelectContent>
                    {platforms.map(p => <SelectItem key={p} value={p}>{p === 'all' ? 'Todas las plataformas' : p}</SelectItem>)}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={(v) => setSelectedStatus(v as 'all' | 'completed' | 'playing')}>
                  <SelectTrigger className="min-w-[150px]"><SelectValue placeholder="Estado" /></SelectTrigger>
                  <SelectContent>
                    {statuses.map(s => <SelectItem key={s} value={s as any}>{s}</SelectItem>)}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <Button variant={viewMode === 'grid' ? 'default' : 'outline'} onClick={() => setViewMode('grid')} size="icon"><Grid className="w-4 h-4" /></Button>
                  <Button variant={viewMode === 'list' ? 'default' : 'outline'} onClick={() => setViewMode('list')} size="icon"><List className="w-4 h-4" /></Button>
                </div>
              </div>
            </div>

            {/* Carousels */}
            <GameCarousel title="Lo Nuevo" games={filteredFeaturedGames} onGameClick={handleGameClick} onAddToList={addGameToList} gamesInList={games.map(g => g.id)} addingToList={addingToList} />
            <GameCarousel title="Jugados Recientemente" games={filteredRecentlyPlayed} onGameClick={handleGameClick} onAddToList={addGameToList} gamesInList={games.map(g => g.id)} addingToList={addingToList} />
            <GameCarousel title="Mejor Valorados" games={filteredTopRated} onGameClick={handleGameClick} onAddToList={addGameToList} gamesInList={games.map(g => g.id)} addingToList={addingToList} />
          </TabsContent>

          <TabsContent value="mylist" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">Mi Lista</h2>
                <p className="text-sm text-muted-foreground">{filteredGames.length} {filteredGames.length === 1 ? 'juego' : 'juegos'} • {completedGames} completados • {totalHours.toFixed(1)} horas</p>
              </div>
              <Button onClick={() => setIsGameFormOpen(true)} className="bg-red-600 hover:bg-red-700 text-white"><Plus className="w-4 h-4 mr-2" /> Agregar Juego</Button>
            </div>

            {filteredGames.length === 0 ? (
              <div className="text-center py-12">
                <Search className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No hay juegos en tu lista</h3>
                <p className="text-muted-foreground">Agrega tu primer juego para empezar.</p>
              </div>
            ) : (
              viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredGames.map(g => (
                    <div key={g.id} onClick={() => handleGameClick(g)}>
                      <GameCard game={g} onClick={() => handleGameClick(g)} />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredGames.map(g => (
                    <div key={g.id} className="flex gap-4 bg-card p-4 rounded-lg items-center">
                      <div className="w-20 h-28 relative">
                        <Image src={g.coverImage || '/placeholder-game.jpg'} alt={g.title} fill sizes="80px" className="object-cover rounded" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{g.title}</h3>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="outline">{g.genre || '—'}</Badge>
                          <Badge variant="outline">{g.platform || '—'}</Badge>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-muted-foreground">⭐ {g.rating?.toFixed(1) ?? '—'}</div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => removeGameFromList(g.id, g.title)}>Remover</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
            )}
          </TabsContent>
        </Tabs>
      </main>

      {/* Modals / Forms */}
      <GameForm isOpen={isGameFormOpen} onClose={() => setIsGameFormOpen(false)} onSubmit={handleGameSubmit} />

      {selectedGame && (
        <GameDetailModal game={selectedGame} isOpen={isGameDetailOpen} onClose={() => { setIsGameDetailOpen(false); setSelectedGame(null) }} onAddReview={handleAddReview} />
      )}

      <Toaster />

      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="container mx-auto px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">© 2025 GameTracker. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}

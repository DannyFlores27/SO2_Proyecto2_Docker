import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard.jsx'
import { GestionUsuarios } from './GestionUsuarios.jsx'

const users = [
  {
    userName: 'freeCodeCamp',
    name: 'FreeCodeCamp',
    isFollowing: true
  },
  {
    userName: 'realmadrid',
    name: 'Real Madrid C.F.',
    isFollowing: false
  },
  {
    userName: 'fcbarcelona',
    name: 'FC Barcelona 🔵🔴',
    isFollowing: false
  }
]

export function App () {
  return (
    <section className="App">
      <GestionUsuarios />
      <h1>¿A quién seguir?</h1>
      {
        users.map(({ userName, name, isFollowing }) => (
          <TwitterFollowCard
            key={userName}
            userName={userName}
            initialIsFollowing={isFollowing}
          >
            {name}
          </TwitterFollowCard>
        ))
      }
    </section>
  )
}
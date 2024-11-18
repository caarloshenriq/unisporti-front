interface Route {
  path: string
  label: string
  permission: string
}

export const routes: Route[] = [
  { path: '/financeiro', label: 'Financeiro', permission: 'user' },
  { path: '/lugares', label: 'Lugares', permission: 'admin' },
  { path: '/enquetes', label: 'Enquetes', permission: 'admin' },
  { path: '/admin/modalidades', label: 'Modalidades', permission: 'admin' },
  { path: '/admin/planos', label: 'Planos', permission: 'admin' },
  { path: '/usuarios', label: 'Usuarios', permission: 'admin' },
  { path: '/nova-aula', label: 'Nova Aula', permission: 'instructor' },
  { path: '/minhas-modalidades', label: 'Nova Aula', permission: 'user' },
]

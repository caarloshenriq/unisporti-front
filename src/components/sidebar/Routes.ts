interface Route {
  path: string
  label: string
  permission: string
}

export const routes: Route[] = [
  { path: '/financeiro', label: 'Financeiro', permission: 'U' },
  { path: '/lugares', label: 'Lugares', permission: 'A' },
  // { path: '/enquetes', label: 'Enquetes', permission: 'admin' },
  { path: '/admin/modalidades', label: 'Modalidades', permission: 'A' },
  { path: '/admin/planos', label: 'Planos', permission: 'A' },
  { path: '/usuarios', label: 'Usuarios', permission: 'A' },
  { path: '/nova-aula', label: 'Nova Aula', permission: 'I' },
  { path: '/minhas-modalidades', label: 'Minhas modalidades', permission: 'U' },
  {
    path: '/admin/usuario-modalidade',
    label: 'Matriculas',
    permission: 'A',
  },
  {
    path: '/admin/treinamentos',
    label: 'Treinamentos',
    permission: 'A',
  },
]

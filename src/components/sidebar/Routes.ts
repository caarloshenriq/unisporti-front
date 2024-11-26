interface Route {
  path: string
  label: string
  permission: string | string[]
}

export const routes: Route[] = [
  { path: '/financeiro', label: 'Financeiro', permission: 'U' },
  { path: '/lugares', label: 'Lugares', permission: 'A' },
  // { path: '/enquetes', label: 'Enquetes', permission: 'admin' },
  { path: '/admin/modalidades', label: 'Modalidades', permission: 'A' },
  { path: '/admin/planos', label: 'Planos', permission: 'A' },
  { path: '/usuarios', label: 'Usuários', permission: 'A' },
  { path: '/nova-aula', label: 'Novo treinamento', permission: 'I' },
  {
    path: '/minhas-modalidades',
    label: 'Minhas modalidades',
    permission: ['U', 'I'],
  },
  {
    path: '/admin/usuario-modalidade',
    label: 'Matrículas',
    permission: 'A',
  },
  {
    path: '/admin/treinamentos',
    label: 'Treinamentos',
    permission: 'A',
  },
]

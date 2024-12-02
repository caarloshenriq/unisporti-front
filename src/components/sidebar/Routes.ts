interface Route {
  path: string
  label: string
  permission: string | string[]
}

export const routes: Route[] = [
  { path: '/financeiro', label: 'Financeiro', permission: 'U' },
  { path: '/lugares', label: 'Lugares', permission: ['A', 'M'] },
  { path: '/admin/modalidades', label: 'Modalidades', permission: ['A', 'M'] },
  { path: '/admin/planos', label: 'Planos', permission: ['A', 'M'] },
  { path: '/usuarios', label: 'Usuários', permission: ['A', 'M'] },
  {
    path: '/minhas-modalidades',
    label: 'Minhas modalidades',
    permission: ['U', 'I'],
  },
  {
    path: '/admin/usuario-modalidade',
    label: 'Matrículas',
    permission: ['A', 'M'],
  },
  {
    path: '/admin/treinamentos',
    label: 'Treinamentos',
    permission: ['A', 'M'],
  },
  {
    path: '/instrutor/alunos',
    label: 'Alunos',
    permission: 'I',
  },
]

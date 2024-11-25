export type Instructor = {
  id_instructor: number // Correspondente ao id_instructor
  id_user: number // Correspondente ao id_user
  name: string // Correspondente ao degree_name
  educational_institution: string // Correspondente ao educational_institution
  start_date: string // Correspondente ao start_date (ISO 8601 format)
  end_date: string | null // Correspondente ao end_date, podendo ser null
  active: boolean // Correspondente ao active
}

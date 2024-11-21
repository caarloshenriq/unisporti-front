export function formatCpf(cpf: string): string {
  return cpf
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatPhone(phone: string): string {
  return phone
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d{4})$/, '$1-$2')
    .slice(0, 15)
}

export function formatCurrency(value: string): string {
  const sanitizedValue = value.replace(/\D/g, '')
  const numericValue = (parseInt(sanitizedValue) / 100).toFixed(2)
  return numericValue.replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

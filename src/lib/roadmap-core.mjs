export function calculateProgress(tasks = []) {
  if (!tasks.length) return 0
  const total = tasks.reduce((sum, task) => sum + Number(task.progress || 0), 0)
  return Math.round(total / tasks.length)
}

export function calculatePaymentSummary(payments = []) {
  const total = payments.reduce((sum, payment) => sum + Number(payment.amount || 0), 0)
  const paid = payments.filter((p) => p.status === 'paid').reduce((sum, p) => sum + Number(p.amount || 0), 0)
  const due = payments.filter((p) => p.status === 'due').reduce((sum, p) => sum + Number(p.amount || 0), 0)
  const pending = payments.filter((p) => p.status === 'pending').reduce((sum, p) => sum + Number(p.amount || 0), 0)
  return { total, paid, due, pending, remaining: total - paid }
}

export function weekBand(week) {
  return Number(week) <= 10 ? 'delivery' : 'uat'
}

/**
 * Formata uma data para o formato "dd/mm/yyyy".
 *
 * @param {string | number | Date} date - A data a ser formatada. Pode ser uma string, número ou objeto Date.
 * @returns {string} A data formatada no formato "dd/mm/yyyy".
 */
export const formatDate = (date: string | number | Date): string => {
  // Converte para um objeto Date caso não seja
  const dateObj = new Date(date);

  // Verifica se a data é válida
  if (isNaN(dateObj.getTime())) {
    return "Data inválida";
  }

  // Extrai dia, mês e ano
  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0"); // Mês começa do 0
  const year = dateObj.getFullYear();

  // Retorna a data formatada
  return `${day}/${month}/${year}`;
};

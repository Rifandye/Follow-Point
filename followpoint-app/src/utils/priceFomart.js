export const formatRupiah = (number) => {
  const format = number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  return `Rp ${format}`;
};

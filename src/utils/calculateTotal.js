export const calculateTotal = (items) => {
  if (!items || !items.length) return 0;

  return items.reduce((sum, item) => {
    const quantity = Number(item.quantity) || 0;
    const price = Number(item.price) || 0;
    return sum + quantity * price;
  }, 0);
};

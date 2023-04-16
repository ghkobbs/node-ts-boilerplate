
export default function formatMoney(currency: string, amount = 0) {
  
  const options = {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  };

  const formatter = Intl.NumberFormat('en-UK', options);

  return formatter.format(amount);
}
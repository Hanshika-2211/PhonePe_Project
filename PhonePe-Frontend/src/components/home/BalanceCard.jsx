function BalanceCard({ balance }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2 text-black">Total Balance</h3>  {/* Dark Gray for the title */}
      <p className="text-2xl font-bold">₹{balance?.toLocaleString('en-IN', { maximumFractionDigits: 2 }) || '0.00'}</p>  {/* PhonePe Pink for the balance */}
</div>
  );
}

export default BalanceCard;
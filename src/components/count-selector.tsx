type Props = {
  prizeAmountRemain: number;
  count: number;
  onCountChange: (count: number) => void;
};

export default function CountSelector({ prizeAmountRemain, count, onCountChange }: Props) {
  return (
    <div className="flex items-center justify-center gap-3 p-2 text-white">
      <span>抽出</span>
      <select
        value={count}
        onChange={(e) => onCountChange(+e.target.value)}
        className="w-16 scale-150 cursor-pointer appearance-none rounded-[0.5rem] bg-transparent text-center text-onead-orange"
      >
        <option value="1" disabled={prizeAmountRemain < 1}>1</option>
        <option value="3" disabled={prizeAmountRemain < 3}>3</option>
        <option value="5" disabled={prizeAmountRemain < 5}>5</option>
      </select>
      <span>人</span>
    </div>
  );
}

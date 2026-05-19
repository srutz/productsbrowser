import { memo, useDeferredValue, useState } from "react";

const items = Array.from({ length: 15_000_000 }, (_, i) => `Item ${i + 1}`);

export function Filter() {
  "use no memo";
  const [text, setText] = useState("");
  const deferredText = useDeferredValue(text);

  return (
    <div className="overflow-y-auto grow self-stretch flex flex-col items-start gap-2 bg-green-300 p-8">
      <input
        className="p-2 border rounded"
        placeholder="Type to filter..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <ItemList filter={deferredText} />
    </div>
  );
}

const ItemList = memo(ItemList_);

function ItemList_({ filter }: { filter: string }) {
  "use no memo";
  console.time("filtering items");
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(filter.toLowerCase()),
  );
  console.timeEnd("filtering items");
  // only show the first n items in the ui
  const n = 50;
  const itemsToShow = filteredItems.slice(0, n);
  return (
    <div className="flex flex-col self-stretch overflow-y-auto border rounded p-2 bg-red-300">
      {itemsToShow.map((item) => (
        <div key={item} className="p-1 border-b">
          {item}
        </div>
      ))}
      {filteredItems.length > 50 && (
        <div className="p-1 text-gray-500">
          ...and {filteredItems.length - n} more
        </div>
      )}
    </div>
  );
}

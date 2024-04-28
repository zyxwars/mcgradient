import { useEffect, useState } from "react";
import {
  Block,
  allBlocks,
  getBlockByName,
  getSimiliarBlocks,
  prettifyName,
} from "./lib/blocks";

function App() {
  const [selectedBlock, setSelectedBlock] = useState<Block | null>(null);
  const [maxColorDistance, setMaxColorDistance] = useState<number>(6);
  const [similiarBlocks, setSimiliarBlocks] = useState<Block[]>([]);

  const [searchedBlockName, setSearchedBlockName] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const [hoveringOverBlock, setHoveringOverBlock] = useState<Block | null>(
    null
  );

  useEffect(() => {
    setSelectedBlock(getBlockByName("stone"));
  }, []);

  useEffect(() => {
    setIsSearching(false);
  }, [selectedBlock]);

  useEffect(() => {
    if (!selectedBlock) return;
    setSearchedBlockName("");

    setSimiliarBlocks(getSimiliarBlocks(selectedBlock, maxColorDistance));
  }, [selectedBlock, maxColorDistance]);

  function showSearchResults() {
    const matchingBlocks = allBlocks.filter((b) => {
      const nameParts = b.name.toLowerCase().split("_");

      for (const namePart of nameParts) {
        if (namePart.startsWith(searchedBlockName.toLowerCase())) return true;
      }

      return false;
    });

    if (matchingBlocks.length === 0)
      return <div className="font-semibold text-xl">No blocks found</div>;

    return matchingBlocks.map((b) => (
      <div
        key={b.fileName}
        className="w-20 aspect-square object-contain flex-shrink-0 flex-grow-0"
        onMouseEnter={() => {
          setHoveringOverBlock(b);
        }}
        onClick={() => {
          // use for adding to blacklist fast
          // console.log(b.name);
          setSelectedBlock(b);
        }}
      >
        <img
          className={`pixelated w-full h-full`}
          src={"block/" + b.fileName}
          alt=""
        />
      </div>
    ));
  }

  return (
    <div className="h-screen flex-col flex">
      {/* Selected block */}
      {selectedBlock && (
        <div className="flex-shrink-0 flex justify-center items-center gap-4 my-4">
          <div
            className="w-20 aspect-square object-contain flex-shrink-0 flex-grow-0"
            onMouseEnter={() => setHoveringOverBlock(selectedBlock)}
            onClick={() => setIsSearching(true)}
          >
            <img
              className={`pixelated w-full h-full`}
              src={"block/" + selectedBlock.fileName}
              alt=""
            />
          </div>

          <div className="flex flex-col justify-center items-center">
            <div className="flex justify-between gap-4 text-slate-400 text-xl">
              Similiarity
              <div>{maxColorDistance}</div>
              <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={maxColorDistance}
                onChange={(e) => setMaxColorDistance(Number(e.target.value))}
              />
            </div>
          </div>
        </div>
      )}

      {/* Similiar blocks */}
      <div className="overflow-scroll rounded-md bg-white p-4 shadow-sm m-4 border-slate-300 flex-grow flex flex-col">
        <div className="flex flex-wrap justify-center gap-2">
          {similiarBlocks.map((similiarBlock) => (
            <div
              key={similiarBlock.fileName}
              className="w-20 aspect-square object-contain flex-shrink-0 flex-grow-0"
              onMouseEnter={() => setHoveringOverBlock(similiarBlock)}
              onClick={() => setSelectedBlock(similiarBlock)}
            >
              <img
                className={`pixelated w-full h-full`}
                src={"block/" + similiarBlock.fileName}
                alt=""
              />
            </div>
          ))}
        </div>
      </div>

      {/* Search */}
      {isSearching && (
        <div className="absolute top-0 left-0 right-0 bottom-0 p-4 bg-white flex flex-col">
          <div className="flex-shrink-0 flex justify-center pb-4">
            <input
              value={searchedBlockName}
              onChange={(e) => {
                setSearchedBlockName(e.target.value);
              }}
              className="p-2 text-2xl border-b-2 border-slate-300"
              placeholder="Search block..."
            />
          </div>

          <div className="overflow-y-scroll h-full">
            <div className="flex flex-wrap justify-center gap-2">
              {showSearchResults()}
            </div>
          </div>

          <button
            onClick={() => setIsSearching(false)}
            className="absolute top-4 right-4 text-slate-400"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      )}

      {hoveringOverBlock && (
        <div className="absolute top-0 left-0 bg-neutral-400 text-white font-semibold py-1 px-2">
          {prettifyName(hoveringOverBlock.name)}
        </div>
      )}
    </div>
  );
}

export default App;

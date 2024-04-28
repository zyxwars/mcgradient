<script lang="ts">
  import { blocks, getBlockByName, type Block } from "./lib/blocks";

  let currentBlock: Block = getBlockByName("granite");

  let searchedBlockName = "";
  function setCurrentBlockName(name: string) {
    currentBlock = getBlockByName(name);
    searchedBlockName = "";

    updateSimiliar();
  }

  let maxHDiff = "0.1";
  let maxSDiff = "0.1";
  let maxLDiff = "0.2";

  let similiarBlocks: Block[] = [];

  function updateSimiliar() {
    similiarBlocks = blocks.filter((b) => {
      if (b.name === currentBlock.name) return false;

      const hDiff = Math.abs(b.color.hue - currentBlock.color.hue);
      const sDiff = Math.abs(
        b.color.saturation - currentBlock.color.saturation
      );
      const lDiff = Math.abs(b.color.lightness - currentBlock.color.lightness);

      return (
        hDiff < Number(maxHDiff) &&
        sDiff < Number(maxSDiff) &&
        lDiff < Number(maxLDiff)
      );
    });
  }

  // TODO:
  function compareBlocks(a: Block, b: Block) {
    return a.color.saturation - b.color.saturation;
  }

  let hoveringOverBlock: Block | null = null;
  function setHoveringOverBlock(block: Block) {
    hoveringOverBlock = block;
  }

  setCurrentBlockName("granite");
</script>

<div class="h-screen flex flex-col justify-start p-8 gap-8 relative">
  <input
    class="w-full px-2 py-4"
    bind:value={searchedBlockName}
    placeholder="Search block..."
  />

  {#if currentBlock != null}
    <div class="flex-shrink-0 flex justify-center items-center gap-4">
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <!-- svelte-ignore a11y-click-events-have-key-events -->
      <div
        class="w-20 aspect-square object-contain flex-shrink-0 flex-grow-0"
        on:mouseenter={() => setHoveringOverBlock(currentBlock)}
      >
        <img
          class={`pixel-image w-full h-full`}
          src={"block/" + currentBlock.fileName}
          alt=""
        />
      </div>

      <div class="flex flex-col justify-center items-center">
        <div class="flex justify-between gap-4">
          Hue difference
          <div>
            {maxHDiff}
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            bind:value={maxHDiff}
            on:input={() => updateSimiliar()}
          />
        </div>
        <div class="flex justify-between gap-4">
          <div>
            {maxSDiff}
          </div>
          Saturation difference
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            bind:value={maxSDiff}
            on:input={() => updateSimiliar()}
          />
        </div>
        <div class="flex justify-between gap-4">
          Lightness difference
          <div>
            {maxLDiff}
          </div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            bind:value={maxLDiff}
            on:input={() => updateSimiliar()}
          />
        </div>
      </div>
    </div>

    <div class="w-full gap-2 overflow-scroll flex flex-wrap justify-center">
      {#each similiarBlocks.sort(compareBlocks) as block}
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <div
          class="w-20 aspect-square object-contain flex-shrink-0 flex-grow-0"
          on:mouseenter={() => setHoveringOverBlock(block)}
          on:click={() => setCurrentBlockName(block.name)}
        >
          <img
            class={`pixel-image w-full h-full`}
            src={"block/" + block.fileName}
            alt=""
          />
        </div>
      {/each}
    </div>
  {/if}

  <!-- Search -->
  {#if searchedBlockName.length > 0}
    <div
      class="absolute top-24 right-8 left-8 bottom-8 gap-4 flex flex-col bg-white"
    >
      <div class="w-full gap-2 overflow-scroll flex flex-wrap justify-center">
        {#each blocks.filter( (b) => b.name.includes(searchedBlockName) ) as block}
          <!-- svelte-ignore a11y-no-static-element-interactions -->
          <!-- svelte-ignore a11y-click-events-have-key-events -->
          <div
            class="w-20 aspect-square object-contain flex-shrink-0 flex-grow-0"
            on:mouseenter={() => setHoveringOverBlock(block)}
            on:click={() => setCurrentBlockName(block.name)}
          >
            <img
              class={`pixel-image w-full h-full`}
              src={"block/" + block.fileName}
              alt=""
            />
          </div>
        {/each}
      </div>
    </div>
  {/if}

  {#if hoveringOverBlock != null}
    <div class="absolute top-0 left-0 bg-[rgba(0,0,0,0.5)] text-white">
      {hoveringOverBlock.name} (H: {hoveringOverBlock.color.hue}, S: {hoveringOverBlock
        .color.saturation}, L: {hoveringOverBlock.color.lightness})
    </div>
  {/if}
</div>

<style>
  .pixel-image {
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }
</style>

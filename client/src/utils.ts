export type Region = { start: number; end: number };
export const getRegions = (text: string): Region[] | undefined => {
  const regionReg = new RegExp(/(['|"|`]\s*{{)([\s\S]+?)}}\s*['|"|`]/g);
  const regionIter: IterableIterator<RegExpMatchArray> =
    text.matchAll(regionReg);
  let currentRegion = regionIter.next();
  const result: Array<Region> = [];
  while (currentRegion && currentRegion.done === false) {
    const value = currentRegion.value;
    const strOffset = value.index || 0;
    const suffixLength = value[1]?.length || 0;
    const expressionLength = value[2]?.length || 0;
    result.push({
      start: strOffset + suffixLength,
      end: strOffset + suffixLength + expressionLength,
    });
    currentRegion = regionIter.next();
  }
  return result;
};
export const isExpressionExist = (text: string): Boolean => {
  const regionReg = new RegExp(/(['|"|`]\s*{{)([\s\S]+?)}}\s*['|"|`]/g);
  const regionIter: IterableIterator<RegExpMatchArray> =
    text.matchAll(regionReg);
  if ([...regionIter].length > 0) return true;
  return false;
};
export const getCurrentRegion = (
  text: string,
  offset: number
): Region | undefined => {
  const regions = getRegions(text);
  if (!regions || regions.length === 0) return;
  for (const region of regions) {
    if (region.start <= offset && offset <= region.end) {
      return region;
    }
  }
  return undefined;
};

export const getCurrentRegionCode = (text: string, region: Region): string => {
  let content = text
    .split("\n")
    .map((line) => {
      return " ".repeat(line.length);
    })
    .join("\n");

  content =
    content.slice(0, region.start) +
    text.slice(region.start, region.end) +
    content.slice(region.end);
  return content;
};
